/**
 * This module provides utility functions to process hero guides.
 *
 * (C) Dota Coach, 2024. All rights reserved.
 */
import { IntlShape } from "react-intl";
import {
  IHeroBuild,
  getSteamGuideLink,
  heroBuilds,
  isCoreItem,
} from "../content/heroBuilds";
import { getHeroContent } from "./heroContent";
import * as PlayerRoles from "../utilities/playerRoles";
import * as DotaLogger from "@utilities/log/log";

export interface IItemBuild {
  roles?: string;
  starting?: IPhaseItemBuild[];
  starting_bear?: IPhaseItemBuild[];
  core?: IPhaseItemBuild[]; // Only used for lone druid
  core_bear?: IPhaseItemBuild[];
  laning?: IPhaseItemBuild[]; // Only used for counter items (starting & early_game is used for own hero)
  early_game?: IPhaseItemBuild[];
  mid_game?: IPhaseItemBuild[];
  late_game?: IPhaseItemBuild[];
  situational?: IPhaseItemBuild[];
  situational_bear?: IPhaseItemBuild[];
  neutral?: IPhaseItemBuild[];
  neutral_bear?: IPhaseItemBuild[];
}

export interface IPhaseItemBuild {
  name: string;
  info?: string; // Info to be shown on the item ('tooltip')
  isCore?: boolean;
}

export interface IAbilityElement {
  name: string;
  info?: string; // Info to be shown on the item ('tooltip')
}

/**
 * Function validates if a default hero build exists
 *
 * @param heroName NPC short name, e.g., 'antimage'
 * @returns
 */
export function hasDefaultHeroBuild(npcShortName: string): boolean {
  return Object.prototype.hasOwnProperty.call(heroBuilds, npcShortName);
}

/**
 * Returns the closest hero build for a given hero and Dota Coach role.
 *
 * This function is used by the App to display a build when the user
 * selected his role in the game.
 *
 * @param npcShortName NPC short name, e.g., 'antimage'
 * @returns Hero build, or undefined if none is found
 */
export function getClosestHeroBuild(
  npcShortName: string,
  playerRole?: PlayerRoles.DOTA_COACH_ROLE
): { buildIndex: number; heroBuild: IHeroBuild } | undefined {
  //DotaLogger.log(`Dota2.getClosestHeroBuild(${heroName}, ${playerRole}): Called`);
  if (!heroBuilds[npcShortName]) return undefined;

  // Potential optimization: Get role most played by the hero across all games
  // Get those stats form server.dotacoach.gg
  const role: PlayerRoles.DOTA_COACH_GUIDE_ROLE =
    PlayerRoles.convertDotaCoachRoleToDotaCoachGuidRole(
      playerRole || PlayerRoles.DOTA_COACH_ROLE.MID
    );

  //DotaLogger.log(`heroBuilds.getClosestHeroBuild(): ${playerRole} => ${role}`);

  // Get all roles of guides
  const guides: Record<string, { buildIndex: number; heroBuild: IHeroBuild }> =
    {};
  for (let i = 0; i < heroBuilds[npcShortName].builds.length; i++) {
    const heroBuild = heroBuilds[npcShortName].builds[i];
    for (const role of heroBuild.roles) {
      guides[role] = {
        heroBuild: heroBuild,
        buildIndex: i,
      };
    }
  }
  /*DotaLogger.log(
      `Dota2.getClosestHeroBuild(): guides=${JSON.stringify(guides)}`
    );*/

  const guide_rules = {
    [PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY]: [
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT,
    ],
    [PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID]: [
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT,
    ],
    [PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE]: [
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT,
    ],
    [PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT]: [
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.SUPPORT,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.OFFLANE,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.MID,
      PlayerRoles.DOTA_COACH_GUIDE_ROLE.CARRY,
    ],
  };

  for (const role_ of guide_rules[role]) {
    //DotaLogger.log(`dota2.getClosestHeroBuild(): roleOfRules = ${role_}`);
    if (Object.prototype.hasOwnProperty.call(guides, role_)) {
      //DotaLogger.log(`dota2.getClosestHeroBuild(): ${playerRole} => ${role_}`);
      return guides[role_];
    }
  }

  //DotaLogger.log(`Dota2.getClosestHeroBuild(): nothing found`);
  return undefined;
}

/**
 * Returns the default hero build, which is the first build in heroBuild.ts
 * @param npcShortName Localized hero name
 * @param playerRole
 * @return null if there is no such build
 */
export function getDefaultHeroBuild(
  npcShortName: string
): { buildIndex: number; heroBuild: IHeroBuild } | undefined {
  if (!heroBuilds[npcShortName]) return undefined;

  const buildIndex = 0;
  const heroBuild = heroBuilds[npcShortName].builds[0];

  // Find hero build with right role
  return { buildIndex, heroBuild };
}

/**
 *
 * @param npcShortName e.g. "legion_commander" or "lone_druid"
 * @returns Array of abilites
 */
export function getStandardAbilityBuild(npcShortName: string): string[] {
  // We add the '[]' at the end for the case an new
  // hero was added by Dota 2 and the app does not yet have a build for it
  const abilityBuild = heroBuilds[npcShortName]?.builds[0].abilities || [];

  // Return copy of array to prevent changes to array to impact source data
  return [...abilityBuild];
}

/**
 *  Returns array with hero builds for a given hero
 *
 * @param npcShortName e.g. "legion_commander" or "lone_druid"
 * @return undefined if there is no such build
 */
export function getHeroBuildArray(
  npcShortName: string
): IHeroBuild[] | undefined {
  return heroBuilds[npcShortName]?.builds;
}

/**
 *
 * @param npcShortName npc short name, e.g. "legion_commander"
 * @param playerRole
 * @return undefined if there is no such build for the hero
 */
export function getHeroBuild(
  npcShortName: string,
  playerRole: PlayerRoles.DOTA_COACH_ROLE
): { buildIndex: number; heroBuild: IHeroBuild } | undefined {
  if (!heroBuilds[npcShortName]) return undefined;

  const r: PlayerRoles.DOTA_COACH_GUIDE_ROLE =
    PlayerRoles.convertDotaCoachRoleToDotaCoachGuidRole(playerRole);

  // Find hero build with the right role
  for (const heroBuild of heroBuilds[npcShortName].builds) {
    const buildIndex = heroBuild.roles.indexOf(r);
    if (buildIndex !== -1) {
      return { heroBuild, buildIndex };
    }
  }

  // No relevant guide found
  return undefined;
}

/**
 * Returns all items used across all hero builds.
 *
 */
export function getItemNames(): string[] {
  const result: any = {};
  for (const heroContent of Object.values(heroBuilds)) {
    for (const build of heroContent.builds) {
      for (const itemBuild of Object.values(build.items)) {
        for (const item of itemBuild) {
          if (result[item] === undefined) {
            result[item] = true;
          }
        }
      }
    }
    for (const phaseValues of Object.values(heroContent.counter_items)) {
      for (const roleValues of Object.values(phaseValues) as string[][]) {
        for (const item of roleValues) {
          result[item] = true;
        }
      }
    }
  }
  return Object.keys(result).sort();
}

/**
 * Returns all abilities and talents used across all hero guides.
 *
 */
export function getAbilityNames(): string[] {
  const result: any = {};
  for (const heroContent of Object.values(heroBuilds)) {
    for (const build of heroContent.builds) {
      for (const ability of build.abilities) {
        if (result[ability] === undefined) {
          result[ability] = true;
        }
      }
    }
  }
  return Object.keys(result).sort();
}

/**
 * Function returns the standard item build for a given hero.
 * The standard item build is the first build in the heroGuides.ts file.
 *
 * @param npcShortName npc short name, e.g. "legion_commander"
 * @returns Array of { item: string (e.g. sheepstick), isCore?: boolean, info?: string }
 */
export function getStandardItemBuild(
  npcShortName: string,
  intl?: IntlShape
): IPhaseItemBuild[] {
  //DotaLogger.log(`dota2.getStandardItemBuild(${h}): Called`);
  if (!hasDefaultHeroBuild(npcShortName)) {
    // Check is used for the case Dota 2 adds a new hero and the app is not yet updated
    return [];
  }

  const heroContent = heroBuilds[npcShortName];
  const heroBuild = heroContent.builds[0];

  //const mid_game = heroBuilds.builds[0].items.mid_game;
  //const late_game = heroBuilds.builds[0].items.late_game;
  //const late_game = heroBuilds.builds[0].items.core;

  /*DotaLogger.log(
      `dota2.getStandardItemBuild(${h}): contact ${JSON.stringify(
        mid_game
      )} ${JSON.stringify(late_game)}`
    );*/
  //const standard = mid_game.concat(late_game);
  const standard = heroBuild.items.core;

  const result: IPhaseItemBuild[] = [];
  for (const s of standard) {
    const r: { name: string; info?: string; isCore?: boolean } = { name: s };
    /*const tooltip = getItemTooltip(heroContent, heroBuild, s);
    if (tooltip) {
      r["info"] = tooltip;
    }*/
    const isCore = isCoreItem(heroBuild, s);
    if (isCore) {
      r["isCore"] = true;
    }
    result.push(r);
  }

  // return mid_game.concat(late_game)
  return result;
}

/**
 *
 *
 * @param npcShortName The name of the hero, e.g. 'abaddon' or 'legion_commander'
 * @param playerRole if null, then the fucntion takes the fist build
 * @returns object with the following attributes: starting, early_game, mid_game, later_game, situational, roles: string. Each has an array of the following element: { item, info?, isCore?, purchaseTime? }
 */
//export function getItemBuild(h: string): any {
export function getItemBuildForRole(
  npcShortName: string,
  playerRole: PlayerRoles.DOTA_COACH_ROLE | null | undefined,
  intl?: IntlShape
): IItemBuild | undefined {
  if (!heroBuilds[npcShortName]) {
    /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
    return undefined;
  }

  let heroBuild: IHeroBuild | undefined = undefined;
  let buildIndex: number | undefined = undefined;

  if (playerRole === undefined || playerRole === null) {
    ({ heroBuild, buildIndex } = getDefaultHeroBuild(npcShortName) || {});
  } else {
    ({ heroBuild, buildIndex } = getHeroBuild(npcShortName, playerRole) || {});
    if (heroBuild === undefined)
      heroBuild = getDefaultHeroBuild(npcShortName)?.heroBuild;
  }

  const heroContent = getHeroContent(npcShortName);
  if (heroContent !== undefined && buildIndex !== undefined) {
    return getItemBuild(npcShortName, buildIndex, intl);
  } else {
    return undefined;
  }
}

/**
 * Returns item build.
 *
 * Build includes tooltips if react-intl element is passed.
 *
 * @param heroBuild
 * @returns Object with UIItems and the associated roles.
 */
export function getItemBuild(
  npcShortName: string,
  buildIndex: number,
  intl?: IntlShape
): IItemBuild {
  const heroContent = heroBuilds[npcShortName];
  const heroBuild = heroContent.builds[buildIndex];

  const build = heroBuild;

  function transformItem(item: string, core_items: string[]): IPhaseItemBuild {
    const result: IPhaseItemBuild = { name: item };
    //if (item_tooltips[item]) result["info"] = item_tooltips[item];
    if (core_items.indexOf(item) !== -1) result["isCore"] = true;
    const tooltip =
      intl && getItemTooltip(npcShortName, buildIndex, item, intl);
    if (tooltip) result["info"] = tooltip;
    return result;
  }

  return {
    roles: intl && PlayerRoles.rolesToString(heroBuild.roles, intl),
    starting: build.items.starting.map((x) =>
      transformItem(x, build.items.core)
    ),
    starting_bear: build.items.starting_bear?.map((x) => transformItem(x, [])),
    // Only add core items for Lone Druid & Baer
    core: build.items.core_bear
      ? build.items.core.map((x) => transformItem(x, build.items.core))
      : undefined,
    core_bear: build.items.core_bear?.map((x) =>
      transformItem(x, build.items.core_bear!)
    ),
    early_game: build.items.early_game?.map((x) =>
      transformItem(x, build.items.core)
    ),
    mid_game: build.items.mid_game?.map((x) =>
      transformItem(x, build.items.core)
    ),
    late_game: build.items.late_game?.map((x) =>
      transformItem(x, build.items.core)
    ),
    situational: build.items.situational.map((x) =>
      transformItem(x, build.items.core)
    ),
    situational_bear: build.items.situational_bear?.map((x) =>
      transformItem(
        x,
        build.items.core_bear == undefined ? [] : build.items.core_bear
      )
    ),
    neutral: build.items.neutral.map((x) => transformItem(x, build.items.core)),
    neutral_bear: build.items.neutral_bear?.map((x) =>
      transformItem(
        x,
        build.items.core_bear == undefined ? [] : build.items.core_bear
      )
    ),
  };
}

/**
 * Returns the react-intl tooltip for a given hero, hero build and item.
 *
 * @param npcHeroName Short npc name, e.g. "antimage"
 * @param buildIndex index of hero build
 * @param item Item short name, e.g. "blink"
 */
export function getItemTooltip(
  npcShortName: string,
  buildIndex: number,
  item: string,
  intl: IntlShape
): string | undefined {
  // Check build tooltip
  let id = `hero.${npcShortName}.builds.${buildIndex}.item_tooltips.${item}`;
  //console.log(`getItemTooltip(): id: `, id);
  if (intl.messages[id]) return intl.formatMessage({ id });

  // Check hero tooltip
  id = `hero.${npcShortName}.item_tooltips.${item}`;
  //console.log(`getItemTooltip(): id: `, id);
  if (intl.messages[id]) return intl.formatMessage({ id });

  // Check item tooltip
  id = `hero.base.item_tooltips.${item}`;
  //console.log(`getItemTooltip(): id: `, id);
  if (intl.messages[id]) return intl.formatMessage({ id });

  return undefined;
}

/**
 * Returns the react-intl tooltip for a counteritem for a given hero.
 *
 * @param npcHeroName Short npc name, e.g. "antimage"
 * @param item Item short name, e.g. "blink"
 */
export function getCounterItemTooltip(
  npcShortName: string,
  item: string,
  intl: IntlShape
): string | undefined {
  let description: string | undefined;
  for (const phase of ["laning_phase", "mid_game", "late_game"]) {
    for (const role of ["all", "support", "core"]) {
      const strg = `hero.${npcShortName}.counter_items.${phase}.${role}.${item}`;
      description = intl.messages[strg] as string;
      //console.log(`strg: ${strg} | description: ${description}`);
      if (description) break;
    }
    if (description) break;
  }

  return description;
}

/**
 * Returns the react-intl tooltip for a given hero, hero build and item.
 *
 * @param npcHeroName Short npc name, e.g. "antimage"
 * @param buildIndex index of hero build
 * @param item Item short name, e.g. "blink"
 */
export function getAbilityTooltip(
  npcShortName: string,
  buildIndex: number,
  ability: string,
  intl: IntlShape
): string | undefined {
  // Check build tooltip
  let id = `hero.${npcShortName}.builds.${buildIndex}.ability_tooltips.${ability}`;
  if (intl.messages[id]) return intl.formatMessage({ id });

  // Check hero tooltip
  id = `hero.${npcShortName}.ability_tooltips.${ability}`;
  if (intl.messages[id]) return intl.formatMessage({ id });

  // Check item tooltip
  id = `hero.base.ability_tooltips.${ability}`;
  if (intl.messages[id]) return intl.formatMessage({ id });

  return undefined;
}

//
// Ability builds
//

//export namespace hero_ability_builds {
/**
 *
 * @param heroBuild
 * @returns
 */
export function getAbilities(heroBuild: IHeroBuild): string[] {
  //const h_ = hero.name.localizedNameToNPCName(h)

  const abilityBuild = heroBuild.abilities;

  // Return copy of array, otherwise recipient can change content of this.laningItemTips
  return [...abilityBuild];
}

/**
 *
 * @param npcShortName npc short name, e.g. "legion_commander"
 * @param role optional, if not profivded, the function thakes that standard bility build (i.e. the first one)
 * @returns Array of abilites
 */
export function getAbilityBuild(
  npcShortName: string,
  playerRole?: PlayerRoles.DOTA_COACH_ROLE,
  intl?: IntlShape
): IAbilityElement[] {
  const heroBuilds = getHeroContent(npcShortName);
  let heroBuild: IHeroBuild | undefined;
  let buildIndex: number | undefined;

  if (playerRole === undefined) {
    const build = getDefaultHeroBuild(npcShortName);
    heroBuild = build?.heroBuild;
    buildIndex = build?.buildIndex;
  } else {
    const build = getClosestHeroBuild(npcShortName, playerRole);
    heroBuild = build?.heroBuild;
    buildIndex = build?.buildIndex;
  }

  if (heroBuild === undefined) {
    DotaLogger.error(
      `Dota2.getUIAbilityBuild(): No hero builds found for ${npcShortName} as ${playerRole}`
    );
    return [];
  }

  return heroBuild.abilities.map((ability) => {
    const result: IAbilityElement = {
      name: ability,
    };
    const info =
      buildIndex !== undefined &&
      intl &&
      getAbilityTooltip(npcShortName, buildIndex, ability, intl);
    if (info) {
      result["info"] = info;
    }
    return result;
  });
}
//}

/**
 * Returns an array with all HTTPS links to all guides for a given hero.
 *
 * @param npcShortName npc short name, e.g. "legion_commander"
 * @returns Returns empty array in case of error, i.e., hero is not found
 */
export function getHeroGuideLinks(
  npcShortName: string,
  language?: "en" | "es"
): string[] {
  language = language || "en";

  return (
    heroBuilds[npcShortName]?.builds.map((heroBuild) =>
      getSteamGuideLink(heroBuild.steam_guide_workshop_ids[language!])
    ) || []
  );
}
