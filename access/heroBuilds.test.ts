/**
 * npx jest access/heroBuilds.test.ts
 *
 */
import { IntlShape } from "react-intl";
import {
  getAbilityBuild,
  getClosestHeroBuild,
  getItemTooltip,
  hasDefaultHeroBuild,
} from "./heroBuilds";
import { i18nLoader } from "@utilities/i18n/i18nLoader";
import * as PlayerRoles from "../utilities/playerRoles";

let intl: IntlShape | undefined;
beforeAll(async () => {
  intl = await i18nLoader();
  /*console.log(
    `intl.messages(): `,
    Object.entries(intl?.messages || {}).filter(([key, value]) =>
      key.includes("sniper")
    )
  );*/
});

test("heroBuilds-hasDefaultHeroBuild()", () => {
  let hasDefaultBuild = hasDefaultHeroBuild("sniper");
  expect(hasDefaultBuild).toBe(true);
  hasDefaultBuild = hasDefaultHeroBuild("sniper_");
  expect(hasDefaultBuild).toBe(false);
});

test("heroBuilds-getClosestHeroBuild()", () => {
  let heroBuild = getClosestHeroBuild(
    "sniper",
    PlayerRoles.DOTA_COACH_ROLE.HARD_SUPPORT
  );
  //console.log(`heroBuilds: `, heroBuild);
  expect(heroBuild?.heroBuild?.steam_guide_workshop_ids.en).toBe(2725332187);
});

test("heroBuilds-getTooltip(sniper, power_treads)", () => {
  const tooltip = getItemTooltip("sniper", 0, "power_treads", intl!);
  //console.log(`tooltip:\n`, tooltip);

  expect(tooltip).toBe(
    "A core Boots upgrade to improve your mobility and damage output with attack speed and stats. Helps in both farming and lane control. The attack speed gain lets you get off more Headshots during Take Aim."
  );
});

test("heroBuilds-getTooltip(zuus, bottle)", () => {
  const tooltip = getItemTooltip("zuus", 0, "bottle", intl!);
  //console.log(`tooltip:\n`, tooltip);

  expect(tooltip).toBe(
    "A core item to gain some HP and mana sustain. Also allows the potential to make plays with power runes past the 6 minute mark. Regeneration and arcane runes provide you the most value as they let you conserve mana for fighting and farming."
  );
});

test("heroBuilds-getTooltip(dummy, infused_raindrop)", () => {
  const tooltip = getItemTooltip("dummy", 0, "infused_raindrop", intl!);
  //console.log(`tooltip:\n`, tooltip);

  expect(tooltip).toBe(
    "An early to mid game item to defend against bursts of magical damage. Also provides some useful mana regeneration."
  );
});

test("heroBuilds-getAbilityBuild()", () => {
  const abilityBuild = getAbilityBuild("antimage", undefined, intl!);
  //console.log(`abilityBuild:\n`, abilityBuild);

  expect(abilityBuild[0].info).toBe(
    "Try to hit the enemy as much as possible as early as possible in order to burn their mana."
  );
});

// Test to review itemBuild object
/*test("heroBuilds-getItemBuild", () => {
  const itemBuild = getItemBuild("abaddon", 0, intl);

  console.log(`itemBuilds: `, JSON.stringify(itemBuild, null, 2));

  expect(true).toBe(true);
});*/
