/**
 * Utility function to access information on heroes.
 *
 */

import {
  CounterItem,
  CounterItems,
  IHeroBuild,
  IHeroContent,
  heroBuilds,
} from "../content/heroBuilds";
import { DOTA_COACH_GUIDE_ROLE } from "../utilities/playerRoles";

export interface IHeroesWithItem {
  localizedHeroName: string;
  builds: IBuildsWithItem[];
}

export interface IBuildsWithItem {
  roles: DOTA_COACH_GUIDE_ROLE[];
  tooltip?: string;
}

/**
 * Function returns all heroes that have the item in their build. It also returns the and also tooltips
 *
 *
 * @item item name, e.g. quelling_blade
 */
export function getHeroesWithItem(item: string): IHeroesWithItem[] {
  console.log(`heroUtils.getHeroesWithItem(item: ${item}): Called`);

  const result: IHeroesWithItem[] = [];

  for (const [localizedHeroName, heroContent] of Object.entries(heroBuilds)) {
    const buildsWithItem: IBuildsWithItem[] = [];
    for (const build of heroContent.builds) {
      const containsItem = buildContainsItem(build, item);
      if (containsItem) {
        const heroWithItem: IBuildsWithItem = {
          roles: build.roles,
        };
        const tooltip = getTooltip(heroContent, build, item);
        if (tooltip) {
          heroWithItem.tooltip = tooltip;
        }
        buildsWithItem.push(heroWithItem);
      }
    }
    if (buildsWithItem.length) {
      result.push({
        localizedHeroName,
        builds: buildsWithItem,
      });
    }
  }

  return result;
}

export interface ICoreHero {
  localizedName: string;
  tooltips?: {
    tooltip: string;
    roles?: DOTA_COACH_GUIDE_ROLE[];
    type?: string; // For Invoker, QW & QE
  }[];
}

/**
 * Returns all heroes for which the given item is core.
 *
 * It also returns all the assocaited tooltips.
 *
 * @params itemKey, e.g. "margic_wand"
 */
export function getCoreHeroes(itemKey: string): ICoreHero[] {
  const result: ICoreHero[] = [];

  for (const [localizedName, heroContent] of Object.entries(heroBuilds)) {
    const oneResult: ICoreHero = {
      localizedName: "",
    };

    // Add global tooltips
    const tooltip = heroContent.item_tooltips?.[itemKey];
    if (tooltip) {
      oneResult.tooltips = [];
      oneResult.tooltips.push({
        tooltip,
      });
    }

    for (const build of heroContent.builds) {
      let hasItem = false;
      for (const [phase, itemBuild] of Object.entries(build.items)) {
        if (phase.includes("core")) {
          for (const item of itemBuild) {
            if (item === itemKey) {
              hasItem = true;
              break;
            }
          }
          if (hasItem) break;
        }
      }
      if (hasItem) {
        //console.log(`hasItem: `, itemKey);
        oneResult.localizedName = localizedName;

        // Add build-specific tooltips
        const tooltip = build.item_tooltips?.[itemKey];
        if (tooltip) {
          if (!oneResult.tooltips) oneResult.tooltips = [];
          oneResult.tooltips.push({
            tooltip,
            roles: build.roles,
            type: build.type,
          });
        }
        //console.log(`oneResult: `, JSON.stringify(oneResult));
      }
    }

    if (oneResult.localizedName) result.push(oneResult);
  }
  return result;
}

/**
 * Returns all heroes that are countered by the given item.
 *
 * It also returns all the assocaited tooltips.
 *
 * @params itemKey, e.g. "margic_wand"
 */
export function getHeroesCounteredBy(itemKey: string): ICoreHero[] {
  const result: ICoreHero[] = [];

  for (const [localizedName, heroContent] of Object.entries(heroBuilds)) {
    const oneResult: ICoreHero = {
      localizedName: "",
    };

    let hasItem: boolean | string = false;
    for (const [phase, counterItems] of Object.entries(
      heroContent.counter_items
    )) {
      for (const [role, counterItem] of Object.entries<CounterItem[]>(
        counterItems as any
      )) {
        const item = counterItem.find((item) => item.item === itemKey);
        if (item) {
          if (item.info) {
            hasItem = item.info;
          } else {
            hasItem = true;
          }
          break;
        }
        if (hasItem) break;
      }
    }

    if (hasItem) {
      //console.log(`hasItem: `, itemKey);
      oneResult.localizedName = localizedName;
      if (typeof hasItem === "string") {
        oneResult.tooltips = [
          {
            tooltip: hasItem,
          },
        ];
      }
    }

    if (oneResult.localizedName) result.push(oneResult);
  }
  return result;
}

/**
 * Iterates through all the items an the hero guides.
 *
 */
function* itemIterator(role?: DOTA_COACH_GUIDE_ROLE): Generator<string, void> {
  for (const { heroBuild } of heroBuildIterator()) {
    if (!role || heroBuild.roles.includes(role)) {
      for (const [category, items] of Object.entries(heroBuild.items)) {
        // Remove duplicates (e.g. branches)
        // Remove "core", "core_bear" and "situational" (as it is a repetition)
        if (
          category.includes("core") ||
          category.includes("situational") ||
          category.includes("neutral")
        ) {
          // These are duplicated items, remove
        } else {
          //console.log(`items: `, items);
          const releventItems = (items as string[]).filter(
            (item: string, i) => (items as string[]).indexOf(item) === i
          );
          for (const item of releventItems) {
            yield item;
          }
        }
      }
    }
  }
}

/**
 * Counter items mentioned for two roles, are only reported once.
 *
 * Supported roles: undefined (all), support, mid/carry/offlane (all seen as core)
 */
function* counterItemIterator(
  role?: DOTA_COACH_GUIDE_ROLE
): Generator<string, void> {
  for (const [localizedHeroName, heroContent] of Object.entries(heroBuilds)) {
    let counterItems_: CounterItem[] = [];
    for (const phase of Object.values(heroContent.counter_items)) {
      for (const [rolePlayer, counterItems] of Object.entries(
        phase as CounterItems
      )) {
        if (
          rolePlayer === "all" ||
          !role ||
          (rolePlayer === "support" &&
            role === DOTA_COACH_GUIDE_ROLE.SUPPORT) ||
          (rolePlayer === "core" && role !== DOTA_COACH_GUIDE_ROLE.SUPPORT)
        ) {
          //console.log(`rolePlayer: `, rolePlayer);
          //console.log(`counterItems: `, counterItems);
          //console.log(`typeof counterItems: `, typeof counterItems);
          for (const counterItem of counterItems) {
            counterItems_.push(counterItem);
          }
        }
      }
    }
    // Remove duplicates
    counterItems_ = counterItems_.filter(
      (item, i) => counterItems_.findIndex((i) => i.item === item.item) === i
    );

    for (const counterItem of counterItems_) {
      yield (counterItem as CounterItem).item;
    }
  }
}

/**
 * Function provides iterator through all hero builds.
 */
function* heroBuildIterator(): Generator<
  { localizedHeroName: string; heroBuild: IHeroBuild },
  void
> {
  for (const [localizedHeroName, heroContent] of Object.entries(heroBuilds)) {
    for (const heroBuild of heroContent.builds) {
      yield { localizedHeroName, heroBuild };
    }
  }
}

function buildContainsItem(build: IHeroBuild, item: string): boolean {
  for (const items of Object.values(build.items)) {
    if (items.includes(item)) return true;
  }
  return false;
}

function getTooltip(
  content: IHeroContent,
  build: IHeroBuild,
  item: string
): string | undefined {
  return build.item_tooltips?.[item] || content?.item_tooltips?.[item];
}

/**
 * Return the most recommended items for all heroes in the hero guides.
 *
 */
export function mostRecommendedItems(role?: DOTA_COACH_GUIDE_ROLE): {
  item: string;
  pct: number;
}[] {
  // Count the number of relevant guides
  let total = 0;
  for (const heroBuild of heroBuildIterator()) {
    if (role) {
      /*console.log(
        `role: ${role}; heroBuild.heroBuild.roles: ${JSON.stringify(
          heroBuild.heroBuild.roles
        )}`
      );*/
      if (heroBuild.heroBuild.roles.includes(role)) total++;
    } else {
      total++;
    }
  }
  //console.log(`heroBuilds: `, total);

  // Count the number of items in the relevant guides
  const counter: Record<string, number> = {};
  for (const item of itemIterator(role)) {
    // Only add
    counter[item] = (counter[item] || 0) + 1;
  }

  // Prepare and sort the results
  const preResult = Object.entries(counter)
    .map(([key, value]) => ({
      item: key,
      count: value,
    }))
    .sort((a, b) => b.count - a.count);

  // Return results in the proper format
  return preResult.map((counter) => ({
    item: counter.item,
    pct: counter.count / total,
  }));
}

/**
 * Return items countering most heroes.
 *
 *
 *
 */
export function mostCounteringItems(role?: DOTA_COACH_GUIDE_ROLE): {
  item: string;
  pct: number;
}[] {
  // Count the number of relevant heroes
  let total = Object.entries(heroBuilds).length;

  // Count the number of items in the relevant guides
  const counter: Record<string, number> = {};
  for (const item of counterItemIterator(role)) {
    // Only add
    counter[item] = (counter[item] || 0) + 1;
  }

  // Prepare and sort the results
  const preResult = Object.entries(counter)
    .map(([key, value]) => ({
      item: key,
      count: value,
    }))
    .sort((a, b) => b.count - a.count);

  // Return results in the proper format
  return preResult.map((counter) => ({
    item: counter.item,
    pct: counter.count / total,
  }));
}

export interface IItemCoreRecommendedStats {
  core: number;
  situational: number;
  not: number;
  total: number;
}

/**
 * Function returns stats per role (% or heroes, % core item for heroes) for an item.
 *
 */
export function getItemHeroRoleStats(
  itemKey: string
): Record<DOTA_COACH_GUIDE_ROLE, IItemCoreRecommendedStats> {
  const result = {} as Record<DOTA_COACH_GUIDE_ROLE, IItemCoreRecommendedStats>;

  for (const { heroBuild } of heroBuildIterator()) {
    const itemBuild = heroBuild.items;
    let hasItem = false;
    let isCore = false;

    // Iterate through all items
    // Can return as soon as core is found
    for (const [phase, items] of Object.entries(itemBuild)) {
      if (phase.includes("core")) {
        if (items.includes(itemKey)) {
          hasItem = true;
          isCore = true;
          break;
        }
      } else {
        if (items.includes(itemKey)) {
          hasItem = true;
        }
      }
    }

    for (const role of heroBuild.roles) {
      if (!result[role]) {
        result[role] = {
          core: 0,
          situational: 0,
          not: 0,
          total: 0,
        };
      }

      if (isCore) {
        result[role].core++;
      } else if (hasItem) {
        result[role].situational++;
      } else {
        result[role].not++;
      }
      result[role].total++;
    }
  }

  return result;
}