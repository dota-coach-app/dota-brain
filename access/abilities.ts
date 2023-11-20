/* eslint-disable @typescript-eslint/no-namespace */
/**
 * This library is used to access static Dota 2 data on Heroes, Items and Abilities.
 *
 * Dynamic data such as data from Open Dota are not covered by this module.
 *
 * (C) Dota Coach, 2023
 */
import { dispellableBuffs } from "../content/dispellableBuffs";
//import * as DotaLogger from "@utilities/log/log";
// disables should be removed once the second screen is redesigned and moved to react. Currently only used by the second screen
import {
  channeling_interrupts,
  silence,
  root,
  disables,
} from "../content/disables";

// Version node.js
/*import * as HeroBuilds from "./heroBuilds.js";
import { dispellableBuffs } from "./dispellableBuffs.js";
import dota2Abilities from "./dota2Abilities.json" assert { type: "json" };
import dota2Items from "./dota2Items.json" assert { type: "json" };
import dota2Heroes from "./dota2Heroes.json" assert { type: "json" };
import * as DotaLogger from "../../submodules/utilities/log.js";
import { channeling_interrupts, silence, root, disables } from "./disables.js";
import * as PlayerRoles from "./playerRoles.js";
import { UIItem, UIAbility } from "../../submodules/utilities/dotaCoachUI.js";
import * as DotaCoachUI from "../../submodules/utilities/dotaCoachUI.js";
*/

/**
 *
 * @param hero
 * @param disables
 * @returns All abilities of a given hero for given disables. Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
 */
export function getAbilitiesWithDisables(
  hero: string,
  disablesToScreen: string[]
): any[] {
  //DotaLogger.log("Dota2.hero.ability.getAbilitiesWithDisables(hero: '" + hero + "', disables: '" + JSON.stringify(disablesToScreen) + "'): Called")

  const heroDisables = disables[hero];
  if (heroDisables == null) {
    /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
    return [];
  }

  const result: any[] = [];

  // Iterate through all skills
  for (let i = 0; i < heroDisables.length; i++) {
    // Check if skill is a teleport interrupt
    let isDisabling = false;

    const skillDisables = heroDisables[i].disables;
    //DotaLogger.log("Dota2.hero.ability.getAbilitiesWithDisables(): skillDisables = '" + JSON.stringify(skillDisables) + "'")

    // Iterate through all disables of a given skil to see if it is a disable that interrupts TPs
    for (let j = 0; j < skillDisables.length; j++) {
      //DotaLogger.log("Dota2.hero.ability.getAbilitiesWithDisables(): disables = '" + JSON.stringify(disablesToScreen) + "', skillDisables[j] = '" + skillDisables[j] + "'")

      if (disablesToScreen.includes(skillDisables[j])) {
        isDisabling = true;
        break;
      }
    }

    if (isDisabling) {
      result.push(heroDisables[i]);
    }
  }

  //DotaLogger.log("getAbilitiesWithDisables(): Result = '" + JSON.stringify(result) + "'")

  return result;
}

export function getDispellableBuffs(hero: string): string[] {
  if (hero == "Outworld Devourer") hero = "Outworld Destroyer";
  if (dispellableBuffs[hero as keyof typeof dispellableBuffs] == null) {
    /* Check is used for the case Dota 2 adds heroes and the app is not updated yet */
    return [];
  }

  const result = dispellableBuffs[hero as keyof typeof dispellableBuffs];

  /* return copy of array, otherwise recipient can change content of dispellableBuffs */
  return [...result];
}
/**
 *
 * @param hero
 * @returns All abilities that interrupt channeling. Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
 * TASK MICHEL: CHECK IF WE CAN CHANGE FUNCTION TO ONLY RETURN ARRAY OF STRINGS WITH ABILITIES
 */
export function getChannelingInterrupts(hero: string): any[] {
  return getAbilitiesWithDisables(hero, channeling_interrupts);
}
/**
 *
 * @param hero
 * @returns All abilities that slience. Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
 */
export function getSilences(hero: string): any[] {
  return getAbilitiesWithDisables(hero, silence);
}

/**
 *
 * @param hero
 * @returns All abilities that root.  Format: {skill: "<name of skill>", affects: <"hero", "hero_area", "area">, disables: [<"stun", "leash", etc.>] }
 */
export function getRoots(hero: string): any[] {
  return getAbilitiesWithDisables(hero, root);
}

export interface AnalyzedHeroAbilities {
  buffsBasicDispel: IAbility[];
  debuffsDisablesBasicDispel: IAbility[];
  debuffsDisablesStrongDispel: IAbility[];
  spellsNonDispellable: IAbility[];
  passivesBreakable: IAbility[];
  passivesNonBreakable: IAbility[];
}

/**
 * The function returns a summary of the abilities of a given set of heroes.
 *
 * This function is currently used by the Team Infobox in the in-game app.
 *
 */
export function analyzeHeroAbilities(heroIds: number[]): AnalyzedHeroAbilities {
  const result: AnalyzedHeroAbilities = {
    buffsBasicDispel: [],
    debuffsDisablesBasicDispel: [],
    debuffsDisablesStrongDispel: [],
    spellsNonDispellable: [],
    passivesBreakable: [],
    passivesNonBreakable: [],
  };
  /*
      DotaLogger.log(
        `Dota2.hero_abilities.analyzeHeroAbilities(heroIds: ${JSON.stringify(heroIds)}): Called`
      );
      */
  for (const heroId of heroIds) {
    const npcName = idToNPCName(heroId);
    const abilities = dota2Abilities[npcName as keyof typeof dota2Abilities];
    for (const [name, ability_] of Object.entries(abilities)) {
      const ability = ability_ as IAbility;

      if (ability.is_talent === true) continue;

      ability.key = name;
      ability.npcName = npcName;
      // Buffs
      if (ability.is_buff === true) {
        switch (ability.is_buff_dispellable) {
          case "strong": {
            // This should not exist
            console.error(
              `Dota2.analyzeHeroAbilities(): Found buff with strong dispel  (${ability.name})`
            );
            break;
          }
          case "basic": {
            result.buffsBasicDispel.push(ability);
            break;
          }
          case "no": {
            result.spellsNonDispellable.push(ability);
            break;
          }
          default: {
            console.error(
              `Dota2.analyzeHeroAbilities(): Unknow is_buff_dispellable value (${ability.is_buff_dispellable})`
            );
          }
        }
      }
      // Debuffs
      if (ability.is_debuff === true) {
        switch (ability.is_debuff_dispellable) {
          case "strong": {
            result.debuffsDisablesStrongDispel.push(ability);
            break;
          }
          case "basic": {
            result.debuffsDisablesBasicDispel.push(ability);
            break;
          }
          case "no": {
            result.spellsNonDispellable.push(ability);
            break;
          }
          default: {
            console.error(
              `Dota2.analyzeHeroAbilities(): Unknow is_debuff_dispellable value (${ability.is_buff_dispellable})`
            );
          }
        }
      }
      // Disables
      if (Array.isArray(ability.disable)) {
        // Translate disables into dispellability
        if (
          ability.disable.includes("cyclone") ||
          ability.disable.includes("stop") ||
          ability.disable.includes("leash") ||
          ability.disable.includes("taunt")
        ) {
          result.spellsNonDispellable.push(ability);
        } else if (
          ability.disable.includes("stun") ||
          ability.disable.includes("hex") ||
          ability.disable.includes("mute")
        ) {
          result.debuffsDisablesStrongDispel.push(ability);
        } else if (
          ability.disable.includes("sleep") ||
          ability.disable.includes("silence") ||
          ability.disable.includes("fear") ||
          ability.disable.includes("root")
        ) {
          result.debuffsDisablesBasicDispel.push(ability);
        } else {
          // Error
          console.error(
            `Dota2.analyzeHeroAbilities(): Disable not processd: ${JSON.stringify(
              ability.disable
            )}`
          );
        }
      }
      // Remove duplicates
      result.debuffsDisablesBasicDispel =
        result.debuffsDisablesBasicDispel.filter((item, pos) => {
          return result.debuffsDisablesBasicDispel.indexOf(item) === pos;
        });
      result.debuffsDisablesStrongDispel =
        result.debuffsDisablesStrongDispel.filter((item, pos) => {
          return result.debuffsDisablesStrongDispel.indexOf(item) === pos;
        });
      result.spellsNonDispellable = result.spellsNonDispellable.filter(
        (item, pos) => {
          return result.spellsNonDispellable.indexOf(item) === pos;
        }
      );

      // Passives
      if (ability.is_passive !== "no") {
        if (ability.is_breakable === true) {
          result.passivesBreakable.push(ability);
        } else {
          result.passivesNonBreakable.push(ability);
        }
      }
    }
  }
  /*
      DotaLogger.log(
        `Dota2.hero_abilities.analyzeHeroAbilities(heroIds: ${JSON.stringify(
          heroIds
        )}): Result: ${JSON.stringify(result)}`
      );
      */
  return result;
}
