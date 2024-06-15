/**
 * heroBuilds.ts contains the ability and items builds for all Dota 2 heroes. This infromation is used across Dota Caoch, i.e. in the app, on the website and in the in-game guides.
 *
 * Note that each hero can have several builds.
 *
 * Rules for abilities:
 *     - Each build needs to provide the fist 25 abilities to be skilled
 *     - The ability "special_bonus_attributes" should be used to skill attributes
 *
 * Consistency requirements:
 *     - Each ability needs to exist in the file 'dota2Abilits.json'
 *     - Each item needs to exist in the file 'dota2Items.json'
 *
 * Attention:
 *     - Steam guides can't have the character "'". Instead we need to use "`"
 * 	   - The order of the talent build needs to be 10, 15, 20 and then 25. Any other order will cause the guide to fail in Dota 2
 *
 * Storage of steam guide files on PC:
 *   - C:\Program Files (x86)\Steam\userdata\361606936\570\remote\guides
 *   - D:\Program Files (x86)\Steam\userdata\361606936\570\remote\guides
 *
 * (C) Dota Coach, 2024. All rights reserved.
 */
import { IntlShape } from "react-intl";
import {
  DOTA_COACH_GUIDE_ROLE,
  STEAM_GUIDE_ROLE,
  getRolesString,
} from "../utilities/playerRoles";

export enum ContentCreator {
  //TBD = "TBD",
  //ZoGraF = "ZoGraF",
  //AlexDota = "AlexDota",
  //TNTCNz = "TNTCNz",
  YoonA = "YoonA",
  eidandota = "eidandota",
  yongy146 = "yongy146",
}

export interface IContentCreatorLink {
  image: string; // Image is used in Dota Coach app, but no long in guides, as Dota 2 banned images
  text: string;
  link_http: string;
  //link_text: string;
}

// Links provided by content creators to promote their own brand and activites
export const ContentCreatorLinks: Record<ContentCreator, IContentCreatorLink> =
  {
    /*TBD: {
    image: "https://i.imgur.com/QZzNRhz.png",
    text: "This guide was written by 9k Professional Coach ZoGraF.",
    link_http: "https://www.gamersensei.com/senseis/zograf",
    link_text: "Click here to be coached by him.",
  },

  /*  AlexDota: {
    image: "https://i.imgur.com/QZzNRhz.png", // Create imgur file ...
    text: "This guide was written by 10k Professional Player AlexDota.",
    link_http: "https://www.gamersensei.com/senseis/alexxo",
    link_text: "Click here to be coached by him.",
  },*/
    eidandota: {
      image: "https://i.imgur.com/BLWOWSp.jpg",
      text: "This guide was written by 8k MMR player and coach eidandota:",
      link_http: "https://skelly.gg/g/Eidan",
      //link_text: "Click here to book a coaching session with eidandota.",
    },
    /*TNTCNz: {
    image: "https://i.imgur.com/MvM6s5B.jpeg",
    text: "This guide was written by 8k MMR player TNTCN:",
    link_http: "https://skelly.gg/g/TNTCN",
    //link_http: "https://www.gamersensei.com/senseis/tntcn",
    //link_text: "Click here to book a coaching session with him.",
  },*/
    YoonA: {
      image: "https://i.imgur.com/TZpRwOK.jpeg",
      text: "This guide was written by Hammad:",
      //link_http: "https://www.fiverr.com/share/k0bmRk",
      link_http: "https://skelly.gg/g/YoonA",
      //link_text: "Click here to book a coaching session with him.",
    },
    yongy146: {
      image: "https://i.imgur.com/pPXOkj8.png",
      text: "This guide was written by BaLLooN, a 7.8k DotA 2 player based in SEA with 17 years of experience:",
      link_http: "https://www.fiverr.com/yongy146",
    },
    /*ZoGraF: {
    image: "https://i.imgur.com/QZzNRhz.png",
    text: "This guide was written by 9k Professional Coach ZoGraF.",
    link_http: "https://www.gamersensei.com/senseis/zograf",
    link_text: "Click here to be coached by him.",
  },*/
  };

export enum DamageType {
  neutral = "neutral", // Combination of physical, magical and pure
  physical = "physical",
  magical = "magical",
  pure = "pure",
}

/**
 * Data structure for the hero builds of a given hero
 *
 *
 *
 */
export interface IHeroContent {
  creator: ContentCreator; // Owner of the guide (e.g. ContentCreator.YoonA)
  /**
   * True if guide is under review or needs to be reviewed,
   * e.g., after major patch release.
   *
   * This field is updated by Dota Coach.
   */
  under_review: boolean;
  damage_type: DamageType;
  builds: IHeroBuild[]; // The first build is seen as the "standard build" by the app
  combo: string[]; // Main spell, item and "attack" combo for the hero ; this combo is shown in the app (infoboxes) and in the dota guides ; use the same keywords as for ability builds and item buids - on top of that you can also use the word "attack" for right-clicking
  counter_items: {
    laning_phase: CounterItems;
    mid_game: CounterItems;
    late_game: CounterItems;
  };
}

/**
 * Data structure for each hero build
 *
 */
export interface IHeroBuild {
  roles: DOTA_COACH_GUIDE_ROLE[]; // These roles are used in the Dota Coach App and in title of Steam Guide
  type?: string; // Type currently only used for Invoker mid (types: 'QW' & 'QE')
  steam_guide_workshop_ids: {
    en: number;
    es: number;
  }; // Link to steam web buids, e.g., "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915996",
  steam_guide_role: STEAM_GUIDE_ROLE; // Role used to classify steam guides (this role is displayed in yellow in Dota 2). Available values are: Core, Offlane, Support, Jungle, Initiator, Roamer. If there is no value proivded, then it there is no role shown in Dota 2
  dota_fire_id: number; // Guide number on Dota Fire
  power_level: [number, number, number, number];
  /**
   * Recommended facet for build.
   *
   * Numbering: The first facet shown in the game
   * (or in dota2Heroes.json) has the number 1,
   * the next number 2, etc.
   *
   * If several facets are good, then you can also
   * specify an array fo facets, e.g. [1, 2]
   *
   */
  facet?: number | number[];
  abilities: string[];
  items: ItemBuild;
  combo?: string[]; // Combo specific to this hero build
}

export function getSteamGuideLink(id: number) {
  return `https://steamcommunity.com/sharedfiles/filedetails/?id=${id}`;
}

/**
 * Illustration of talent orders in dota2Heroes.json:
 *
 *                    Left  |  Right
 * Talent level 25     #7   |    #6  <=== Index in array "talents" (dota2Heroes.json)
 * Talent level 20     #5   |    #4
 * Talent level 15     #3   |    #2
 * Talent level 10     #1   |    #0
 *
 */

/**
 * Returns a localized string of the roles & type of the build.
 *
 * Sample return of values:
 *   - Carry
 *   - Mid
 *   - Offlane
 *   - Support
 *   - Mid QE (Invoker)
 *   - Mid QW (Invoker)
 *
 */
export function getRoleName(heroBuild: IHeroBuild, intl: IntlShape): string {
  return `${getRolesString(heroBuild.roles, intl)}${
    Object.prototype.hasOwnProperty.call(heroBuild, "type")
      ? " " + heroBuild.type
      : ""
  }`;
}

export interface ItemBuild {
  // Total costs for starting & starting_bear should be below 600. If the are below 550, then there needs to be a good reason why not all gold is used
  starting: string[]; // For all heroes
  starting_bear?: string[]; // Only for Lone Druid's Bear
  early_game?: string[]; // For all heroes, except for Lone Druid
  mid_game?: string[]; // For all heroes, except for Lone Druid
  late_game?: string[]; // For all heroes, except for Lone Druid
  situational: string[]; // For all heroes
  situational_bear?: string[]; // Only for Lone Druid's Bear
  core: string[]; // Selected items from starting, early_game, mid_game, late_game and situational; note: Lone Druid has no early, mid and late game items, oncl starting, core and neutral
  core_bear?: string[]; // Only for Lone Druid's Bear
  neutral: string[]; // For all heroes
  neutral_bear?: string[]; // Only for Lone Druid's Bear
}

/**
 * Counter items for a given hero.
 *
 */
export interface CounterItems {
  all: string[]; // Items for all players (i.e., support and core players)
  support: string[]; // Items for support players only
  core: string[]; // Items for core players only
}

/**
 * Function returns 'true' if an item is core in the given build.
 *
 * @param heroBuild
 * @param item e.g., 'nullifier'
 */
export function isCoreItem(heroBuild: IHeroBuild, item: string): boolean {
  if (heroBuild.items.core.includes(item)) return true;
  if (heroBuild.items.core_bear?.includes(item)) return true;
  return false;
}

export const heroBuilds: { [key: string]: IHeroContent } = {
  // YoonA plays hero
  abaddon: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2698376898, es: 3160070996 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40437,
        power_level: [1.6, 1.8, 1.9, 1.6],
        facet: 2,
        abilities: [
          "abaddon_aphotic_shield", // 1
          "abaddon_frostmourne", // 2, equals to `curse of avernus`
          `abaddon_aphotic_shield`, // 3
          `abaddon_death_coil`, // 4
          "abaddon_aphotic_shield", // 5
          "abaddon_borrowed_time", // 6
          "abaddon_aphotic_shield", // 7
          "abaddon_death_coil", // 8
          "abaddon_death_coil", // 9
          `abaddon_death_coil`, // 10
          `special_bonus_unique_abaddon_7`, // 11
          "abaddon_borrowed_time", // 12
          "abaddon_frostmourne", // 13
          "abaddon_frostmourne", // 14
          "special_bonus_unique_abaddon_2", // 15
          "abaddon_frostmourne", // 16
          "special_bonus_attributes", // 17
          "abaddon_borrowed_time", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_abaddon", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_abaddon_4", // 25
          //25 levels, no need for more than that as they are automatic afterwards
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            "enchanted_mango",
            `enchanted_mango`,
            `branches`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            "magic_wand",
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `pavise`,
            `solar_crest`,
            `holy_locket`,
            `force_staff`,
          ],
          late_game: [
            "ultimate_scepter",
            `guardian_greaves`,
            `assault`,
            `overwhelming_blink`,
          ],
          situational: [
            `orb_of_venom`,
            `tranquil_boots`,
            `glimmer_cape`,
            `ghost`,
            `spirit_vessel`,
            `heavens_halberd`,
            `lotus_orb`,
            `aether_lens`,
            `crimson_guard`,
            `pipe`,
            `ancient_janggo`,
            `boots_of_bearing`,
            `vladmir`,
            `blade_mail`,
            `cyclone`,
            "aghanims_shard",
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `solar_crest`,
            `holy_locket`,
            `force_staff`,
            `ultimate_scepter`,
            `guardian_greaves`,
            `assault`,
          ],
          neutral: [
            `trusty_shovel`,
            `royal_jelly`,
            `pupils_gift`,
            `philosophers_stone`,
            `ogre_seal_totem`,
            `psychic_headband`,
            "spy_gadget",
            `martyrs_plate`,
            "force_field",
            `giants_ring`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2971195954, es: 3160071344 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40436,
        power_level: [1.6, 2.3, 2.2, 1.9],
        facet: 2,
        abilities: [
          "abaddon_aphotic_shield", // 1
          "abaddon_frostmourne", // 2, equals to `curse of avernus`
          `abaddon_aphotic_shield`, // 3
          `abaddon_frostmourne`, // 4
          "abaddon_aphotic_shield", // 5
          "abaddon_borrowed_time", // 6
          "abaddon_aphotic_shield", // 7
          `abaddon_frostmourne`, // 8
          `abaddon_frostmourne`, // 9
          `special_bonus_unique_abaddon_6`, // 10
          `abaddon_death_coil`, // 11
          "abaddon_borrowed_time", // 12
          `abaddon_death_coil`, // 13
          `abaddon_death_coil`, // 14
          `special_bonus_unique_abaddon_5`, // 15
          `abaddon_death_coil`, // 16
          "special_bonus_attributes", // 17
          "abaddon_borrowed_time", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_abaddon_immolation`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_abaddon_3`, // 25
          //25 levels, no need for more than that as they are automatic afterwards
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `wraith_band`,
            `bracer`,
            `phase_boots`,
            `magic_wand`,
            `orb_of_corrosion`,
          ],
          mid_game: [
            `echo_sabre`,
            `manta`,
            `harpoon`,
            `blink`,
            `aghanims_shard`,
          ],
          late_game: [`basher`, `skadi`, `assault`, `abyssal_blade`],
          situational: [
            `orb_of_venom`,
            `solar_crest`,
            `hand_of_midas`,
            `crimson_guard`,
            `pipe`,
            `eternal_shroud`,
            `boots_of_bearing`,
            `heavens_halberd`,
            `vladmir`,
            `blade_mail`,
            `diffusal_blade`,
            `radiance`,
            `monkey_king_bar`,
            `mjollnir`,
            `ultimate_scepter`,
            `sphere`,
            `lotus_orb`,
            `black_king_bar`,
            `overwhelming_blink`,
            `orchid`,
            `bloodthorn`,
            `silver_edge`,
            `greater_crit`,
            `nullifier`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `phase_boots`,
            `echo_sabre`,
            `manta`,
            `harpoon`,
            `blink`,
            `aghanims_shard`,
            `basher`,
            `assault`,
          ],
          neutral: [
            `broom_handle`,
            `unstable_wand`,
            `pupils_gift`,
            `dragon_scale`,
            `defiant_shell`,
            `vindicators_axe`,
            `mind_breaker`,
            `havoc_hammer`,
            `apex`,
            `giants_ring`,
          ],
        },
      },
    ],
    //ability_tooltips
    // Optional, used for Dota 2 Guides
    /* special_bonus_unique_abaddon:
        "If you have Aghanim`s Scepter or about to have it, take the other talent.", */
    // Question, should we have info for each build at each level, or the infos be generic to the skills / telents, and only showed with first build?
    //item_tooltips:
    // wraith_pact: `A core item that buffs the tankiness of your entire team.`,
    combo: [
      `abaddon_aphotic_shield`,
      `attack`,
      `abaddon_death_coil`,
      `abaddon_aphotic_shield`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "blight_stone", "wind_lace", "boots"],
        support: [],
        core: ["orb_of_corrosion"],
        // Comment for Alex: On the screen in the game only 5 items are shows, on the second screen there are 6. The items in the catrogy `all` are shonw first, then either `support` or `core`. Any additional items are discarded.
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape", "force_staff", "cyclone"],
        core: ["silver_edge"],
      },
      late_game: {
        all: [],
        support: [],
        core: ["shivas_guard", "skadi", "butterfly"],
      },
    },
  },

  // eidendota plays hero
  alchemist: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2698377018, es: 3160071434 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40438,
        power_level: [1.1, 2.5, 2.6, 2.2],
        abilities: [
          "alchemist_unstable_concoction",
          "alchemist_acid_spray",
          "alchemist_acid_spray",
          "alchemist_unstable_concoction",
          "alchemist_acid_spray",
          "alchemist_chemical_rage",
          "alchemist_acid_spray",
          "alchemist_unstable_concoction",
          "alchemist_unstable_concoction",
          "special_bonus_unique_alchemist",
          "alchemist_corrosive_weaponry",
          "alchemist_chemical_rage",
          "alchemist_corrosive_weaponry",
          "alchemist_corrosive_weaponry",
          "special_bonus_unique_alchemist_7",
          "alchemist_corrosive_weaponry",
          "special_bonus_attributes",
          "alchemist_chemical_rage",
          "special_bonus_attributes",
          "special_bonus_unique_alchemist_8",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_alchemist_6",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "magic_stick",
            "branches",
          ],
          early_game: ["power_treads", "soul_ring", "magic_wand", "radiance"],
          mid_game: ["blink", "black_king_bar", "assault"],
          late_game: [
            "abyssal_blade",
            "bloodthorn",
            "overwhelming_blink",
            "ultimate_scepter",
          ],
          situational: [
            "manta",
            "swift_blink",
            "nullifier",
            "monkey_king_bar",
            "aghanims_shard",
            "sphere",
          ],
          core: [
            "power_treads",
            "radiance",
            "black_king_bar",
            "blink",
            "assault",
            "basher",
          ],
          neutral: [
            "broom_handle",
            "duelist_gloves",
            "orb_of_destruction",
            "vambrace",
            "elven_tunic",
            "vindicators_axe",
            "ninja_gear",
            "mind_breaker",
            "pirate_hat",
            "mirror_shield",
            "desolator_2",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2730985550, es: 3160071508 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40439,
        power_level: [1.3, 2.5, 2.5, 2.2],
        abilities: [
          "alchemist_unstable_concoction",
          "alchemist_acid_spray",
          "alchemist_acid_spray",
          "alchemist_unstable_concoction",
          "alchemist_acid_spray",
          "alchemist_chemical_rage",
          "alchemist_acid_spray",
          "alchemist_unstable_concoction",
          "alchemist_unstable_concoction",
          "special_bonus_unique_alchemist",
          "alchemist_corrosive_weaponry",
          "alchemist_chemical_rage",
          "alchemist_corrosive_weaponry",
          "alchemist_corrosive_weaponry",
          "special_bonus_unique_alchemist_7",
          "alchemist_corrosive_weaponry",
          "special_bonus_attributes",
          "alchemist_chemical_rage",
          "special_bonus_attributes",
          "special_bonus_unique_alchemist_8",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_alchemist_6",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "branches",
            "gauntlets",
            "gauntlets",
            "ward_observer",
          ],
          early_game: ["bottle", "phase_boots", "soul_ring", "radiance"],
          mid_game: ["blink", "black_king_bar", "manta"],
          late_game: [
            "assault",
            "bloodthorn",
            "abyssal_blade",
            "overwhelming_blink",
            "ultimate_scepter",
          ],
          situational: [
            "aghanims_shard",
            "swift_blink",
            "monkey_king_bar",
            "nullifier",
            "sphere",
            "mjollnir",
          ],
          core: ["phase_boots", "radiance", "blink", "black_king_bar"],
          neutral: [
            "broom_handle",
            "duelist_gloves",
            "vambrace",
            "orb_of_corrosion",
            "elven_tunic",
            "vindicators_axe",
            "ninja_gear",
            "mind_breaker",
            "pirate_hat",
            "mirror_shield",
            "desolator_2",
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "urn_of_shadows"],
        support: ["ward_sentry"],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["spirit_vessel"],
        support: [
          "ward_dispenser",
          "ghost",
          "glimmer_cape",
          "force_staff",
          "cyclone",
        ],
        core: ["desolator"],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk"],
        support: [],
        core: [
          "shivas_guard",
          "skadi",
          "assault",
          "abyssal_blade",
          "butterfly",
          "bloodthorn",
        ],
      },
    },
  },

  // YoonA plays hero
  ancient_apparition: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2698377158, es: 3160071578 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40441,
        power_level: [1.8, 2, 2, 2.1],
        facet: 1,
        abilities: [
          "ancient_apparition_chilling_touch",
          "ancient_apparition_cold_feet",
          `ancient_apparition_ice_vortex`,
          `ancient_apparition_ice_vortex`,
          `ancient_apparition_ice_vortex`,
          "ancient_apparition_ice_blast",
          `ancient_apparition_ice_vortex`,
          `ancient_apparition_cold_feet`,
          `ancient_apparition_cold_feet`,
          `ancient_apparition_cold_feet`,
          `special_bonus_unique_ancient_apparition_8`,
          "ancient_apparition_ice_blast",
          `ancient_apparition_chilling_touch`,
          `ancient_apparition_chilling_touch`,
          `special_bonus_unique_ancient_apparition_3`,
          `ancient_apparition_chilling_touch`,
          "special_bonus_attributes",
          "ancient_apparition_ice_blast",
          "special_bonus_attributes",
          `special_bonus_unique_ancient_apparition_ice_vortex_duration`,
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_ancient_apparition_5",
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            "magic_wand",
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `mekansm`,
            `guardian_greaves`,
            `aghanims_shard`,
            `glimmer_cape`,
            `force_staff`,
          ],
          late_game: [
            `sheepstick`,
            `octarine_core`,
            `ethereal_blade`,
            `wind_waker`,
          ],
          situational: [
            `hand_of_midas`,
            `urn_of_shadows`,
            `ghost`,
            `pavise`,
            `solar_crest`,
            `aether_lens`,
            `rod_of_atos`,
            `hurricane_pike`,
            `boots_of_bearing`,
            `cyclone`,
            `aeon_disk`,
            `lotus_orb`,
            `ultimate_scepter`,
            `revenants_brooch`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `guardian_greaves`,
            `aghanims_shard`,
            `glimmer_cape`,
            `sheepstick`,
            `octarine_core`,
            `wind_waker`,
          ],
          neutral: [
            `arcane_ring`,
            `trusty_shovel`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ogre_seal_totem`,
            `spy_gadget`,
            `timeless_relic`,
            "seer_stone",
            `book_of_shadows`,
          ],
        },
      },
    ],
    combo: [
      `ancient_apparition_ice_vortex`,
      `ancient_apparition_cold_feet`,
      `ancient_apparition_chilling_touch`,
      `ancient_apparition_ice_blast`,
    ],
    counter_items: {
      laning_phase: {
        all: ["infused_raindrop", "wind_lace", "boots", "cloak"],
        support: [],
        core: ["headdress"],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape", "force_staff", "cyclone"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
        ],
      },
      late_game: { all: [], support: ["black_king_bar"], core: [] },
    },
  },

  // eidendota plays hero
  antimage: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2698377261, es: 3160071948 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40442,
        power_level: [0.9, 1.6, 2.7, 2.7],
        abilities: [
          "antimage_mana_break", // 1
          "antimage_blink", // 2
          "antimage_mana_break", // 3
          "antimage_counterspell", // 4
          "antimage_mana_break", // 5
          "antimage_mana_void", // 6
          "antimage_blink", // 7
          "antimage_blink", // 8
          "antimage_blink", // 9
          "special_bonus_unique_antimage_4", // 10
          "antimage_mana_break", // 11
          "antimage_mana_void", // 12
          "antimage_counterspell", // 13
          "antimage_counterspell", // 14
          "antimage_counterspell", // 15
          "special_bonus_unique_antimage_7", // 16
          "special_bonus_attributes", // 17
          "antimage_mana_void", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_antimage", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_antimage_2", // 25
        ],
        items: {
          starting: [
            "quelling_blade",
            "tango",
            "circlet",
            "ring_of_protection",
            "branches",
            //"branches",  Removed as costs were 620
          ],
          early_game: ["power_treads", "orb_of_corrosion", "magic_wand"],
          mid_game: ["bfury", "manta", "skadi"],
          late_game: ["butterfly", "abyssal_blade", "disperser"],
          situational: [
            "ultimate_scepter",
            "black_king_bar",
            "monkey_king_bar",
            "sphere",
            "aghanims_shard",
            "assault",
          ],
          core: ["power_treads", "bfury", "manta", "abyssal_blade"],
          neutral: [
            "broom_handle",
            "occult_bracelet",
            //"ring_of_aquila",
            "pupils_gift",
            "vambrace",
            //"titan_sliver",
            "elven_tunic",
            "vindicators_axe",
            "mind_breaker",
            "ninja_gear",
            "mirror_shield",
            "pirate_hat",
          ],
        },
      },
    ],
    combo: [
      `antimage_blink`,
      `abyssal_blade`,
      `manta`,
      `attack`,
      `antimage_mana_void`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "enchanted_mango", "arcane_boots"],
        support: [],
        core: ["soul_ring"],
      },
      mid_game: {
        all: ["rod_of_atos"],
        support: ["ward_dispenser", "glimmer_cape", "ghost"],
        core: [
          "orchid",
          "desolator",
          "invis_sword",
          "diffusal_blade",
          "hurricane_pike",
          "travel_boots",
          "gungir",
        ],
      },
      late_game: {
        all: ["sheepstick", "sphere", "aeon_disk"],
        support: ["travel_boots"],
        core: ["abyssal_blade", "butterfly", "assault"],
      },
    },
  },

  arc_warden: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2698377376, es: 3160072364 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40443,
        // Carry: 1	1.4	2.6	2.9 | 10% of matches
        // Mid: 1.3	1.4	2.6	2.9 | 80% of matches
        power_level: [1.3, 1.4, 2.6, 2.9],
        abilities: [
          "arc_warden_spark_wraith", // 1
          "arc_warden_flux", // 2
          "arc_warden_flux", // 3
          "arc_warden_spark_wraith", // 4
          "arc_warden_flux", // 5
          "arc_warden_tempest_double", // 6
          "arc_warden_flux", // 7
          "arc_warden_spark_wraith", // 8
          "arc_warden_spark_wraith", // 9
          "special_bonus_unique_arc_warden_5", // 10
          "arc_warden_magnetic_field", // 11
          "arc_warden_tempest_double", // 12
          "arc_warden_magnetic_field", // 13
          "arc_warden_magnetic_field", // 14
          `special_bonus_unique_arc_warden_3`, // 15
          "arc_warden_magnetic_field", // 16
          "special_bonus_attributes", // 17
          "arc_warden_tempest_double", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_arc_warden_9`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_arc_warden_7`, // 25
        ],
        items: {
          starting: [
            "ward_observer",
            "slippers",
            "branches",
            "branches",
            "tango",
          ],
          early_game: ["bottle", "magic_wand", `hand_of_midas`, "boots"],
          mid_game: [
            `maelstrom`,
            `travel_boots`,
            `gungir`,
            `orchid`,
            `blink`,
            `bloodthorn`,
          ],
          late_game: [
            "sheepstick",
            `aghanims_shard`,
            `black_king_bar`,
            `greater_crit`,
            "swift_blink",
          ],
          situational: [
            `spirit_vessel`,
            `monkey_king_bar`,
            `manta`,
            `dragon_lance`,
            `hurricane_pike`,
            `silver_edge`,
            `skadi`,
            `nullifier`,
            `octarine_core`,
            `ultimate_scepter`,
            `ethereal_blade`,
            `dagon_5`,
            "travel_boots_2",
          ],
          core: [
            "hand_of_midas",
            "maelstrom",
            "travel_boots",
            `gungir`,
            `bloodthorn`,
            `blink`,
            `sheepstick`,
            `greater_crit`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `arcane_ring`,
            "grove_bow",
            `orb_of_destruction`,
            "enchanted_quiver",
            `elven_tunic`,
            `mind_breaker`,
            `ninja_gear`,
            `pirate_hat`,
            `desolator_2`,
          ],
        },
      },
    ],
    //ability_tooltips
    //special_bonus_unique_arc_warden_7: `You can go for this talent over the suggested one if you go for the ethereal blade and dagon item build.`,
    combo: [
      `arc_warden_tempest_double`,
      `gungir`,
      `arc_warden_flux`,
      `arc_warden_spark_wraith`,
      `arc_warden_magnetic_field`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "wind_lace", "boots", "infused_raindrop"],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: {
        all: ["blink", "cloak"],
        support: ["ward_dispenser", "glimmer_cape", "force_staff", "ghost"],
        core: [
          "invis_sword",
          "heavens_halberd",
          "gungir",
          "travel_boots",
          "witch_blade",
        ],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk"],
        support: [],
        core: [
          "abyssal_blade",
          "monkey_king_bar",
          "bloodthorn",
          "butterfly",
          "satanic",
        ],
      },
    },
  },

  axe: {
    // TNTCN updating this
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699915204, es: 3160072615 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40444,
        power_level: [1.9, 2.3, 2.4, 2.3],
        abilities: [
          "axe_battle_hunger", // 1
          "axe_counter_helix", // 2
          "axe_counter_helix", // 3
          "axe_berserkers_call", // 4
          "axe_counter_helix", // 5
          "axe_culling_blade", // 6
          "axe_counter_helix", // 7
          "axe_berserkers_call", // 8
          "axe_berserkers_call", // 9
          "axe_berserkers_call", // 10
          `special_bonus_unique_axe_8`, // 11
          "axe_culling_blade", // 12
          "axe_battle_hunger", // 13
          "axe_battle_hunger", // 14
          "axe_battle_hunger", // 15
          `special_bonus_unique_axe_4`, // 16
          "special_bonus_attributes", // 17
          "axe_culling_blade", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_axe_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_axe_2`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `ring_of_protection`,
            `gauntlets`,
            `branches`,
          ],

          early_game: [
            `bracer`,
            `phase_boots`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            `blink`,
            `blade_mail`,
            `eternal_shroud`,
            "black_king_bar",
            "aghanims_shard",
          ],
          late_game: [
            `travel_boots`,
            `shivas_guard`,
            `overwhelming_blink`,
            "refresher",
            "heart",
          ],
          situational: [
            `pipe`,
            `manta`,
            `invis_sword`,
            `sphere`,
            `ultimate_scepter`,
            `crimson_guard`,
            "lotus_orb",
            `heavens_halberd`,
            `travel_boots_2`,
          ],
          core: [
            `phase_boots`,
            `blade_mail`,
            `blink`,
            `eternal_shroud`,
            `black_king_bar`,
            `aghanims_shard`,
            `bloodstone`,
            `refresher`,
          ],
          neutral: [
            "occult_bracelet",
            `broom_handle`,
            `safety_bubble`,
            `seeds_of_serenity`,
            `vambrace`,
            `dragon_scale`,
            `bullwhip`,
            `vampire_fangs`,
            `cloak_of_flames`,
            `ogre_seal_totem`,
            `craggy_coat`,
            `havoc_hammer`,
            `trickster_cloak`,
            `martyrs_plate`,
            "giants_ring",
            //`fallen_sky`,
          ],
        },
      },
    ],
    //item_tooltips:
    /* platemail:
        "A core item that fixes armor issues. You can upgrade it to either Assault Cuirass, Lotus Orb or Shiva`s Guard down the road.", */
    combo: [
      `blink`,
      `axe_berserkers_call`,
      `blade_mail`,
      `axe_battle_hunger`,
      `axe_culling_blade`,
    ],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "wind_lace", "boots"],
        support: [],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["cyclone"],
        support: ["spirit_vessel"],
        core: ["mage_slayer", `sange_and_yasha`, "silver_edge"],
      },
      late_game: {
        all: [],
        support: [],
        core: ["satanic"],
      },
    },
  },

  // YoonA plays hero
  bane: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699915293, es: 3160072696 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40445,
        power_level: [2.1, 2, 2.1, 1.9],
        facet: [1, 2],
        abilities: [
          "bane_brain_sap", // 1
          "bane_nightmare", // 2
          "bane_brain_sap", // 3
          `bane_nightmare`, // 4
          `bane_brain_sap`, // 5
          "bane_fiends_grip", // 6
          `bane_nightmare`, // 7
          `bane_nightmare`, // 8
          `bane_enfeeble`, // 9
          `bane_enfeeble`, // 10
          `bane_enfeeble`, // 11
          "bane_fiends_grip", // 12
          `bane_enfeeble`, // 13
          `special_bonus_unique_bane_11`, // 14
          `special_bonus_unique_bane_9`, // 15 | Enfeeble Cast Range Reduction
          `bane_brain_sap`, // 16
          "special_bonus_attributes", // 17
          "bane_fiends_grip", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_bane_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_bane_3`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `aether_lens`,
            `force_staff`,
            `glimmer_cape`,
            `blink`,
          ],
          late_game: [
            `ultimate_scepter`,
            `aghanims_shard`,
            `octarine_core`,
            `aeon_disk`,
          ],
          situational: [
            `spirit_vessel`,
            `pavise`,
            `solar_crest`,
            `lotus_orb`,
            `ghost`,
            `cyclone`,
            `phylactery`,
            `ethereal_blade`,
            `black_king_bar`,
            `wind_waker`,
            `refresher`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            `force_staff`,
            `glimmer_cape`,
            `blink`,
            `ultimate_scepter`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `faded_broach`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            `ninja_gear`,
            "seer_stone",
            `force_boots`,
          ],
        },
      },
    ],
    combo: [
      `bane_nightmare`,
      `bane_enfeeble`,
      `attack`,
      `bane_fiends_grip`,
      `glimmer_cape`,
      `bane_brain_sap`,
    ],
    counter_items: {
      laning_phase: {
        all: [`magic_stick`, `ring_of_regen`],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["glimmer_cape"],
        core: [`sange_and_yasha`, `black_king_bar`],
      },
      late_game: {
        all: ["sphere", "wind_waker"],
        support: ["black_king_bar"],
        core: [],
      },
    },
  },

  batrider: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699915391, es: 3160072786 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40446,
        power_level: [2.4, 2.4, 2.3, 2],
        abilities: [
          "batrider_sticky_napalm", // 1
          "batrider_flamebreak", // 2
          "batrider_sticky_napalm", // 3
          "batrider_firefly", // 4
          "batrider_sticky_napalm", // 5
          "batrider_flaming_lasso", // 6
          "batrider_sticky_napalm", // 7
          "batrider_firefly", // 8
          "batrider_firefly", // 9
          "batrider_firefly", // 10
          `batrider_flamebreak`, // 11
          "batrider_flaming_lasso", // 12
          "batrider_flamebreak", // 13
          "batrider_flamebreak", // 14
          `special_bonus_unique_batrider_7`, // 15
          `special_bonus_movement_speed_20`, // 16
          "special_bonus_attributes", // 17
          "batrider_flaming_lasso", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_batrider_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_batrider_2`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            "branches",
            `branches`,
            "ward_observer",
            "enchanted_mango",
          ],
          early_game: [
            `bottle`,
            `boots`,
            `magic_wand`,
            `wind_lace`,
            "veil_of_discord",
          ],
          mid_game: [
            `travel_boots`,
            `black_king_bar`,
            "shivas_guard",
            `octarine_core`,
            `blink`,
          ],
          late_game: [
            "devastator",
            "aghanims_shard",
            `refresher`,
            "overwhelming_blink",
          ],
          situational: [
            `ultimate_scepter`,
            `sphere`,
            `cyclone`,
            `travel_boots_2`,
            "sheepstick",
          ],
          core: [
            "bottle",
            "travel_boots",
            "veil_of_discord",
            `black_king_bar`,
            `blink`,
            `octarine_core`,
            "shivas_guard",
            `aghanims_shard`,
            "devastator",
          ],
          neutral: [
            `mysterious_hat`,
            //"pogo_stick",
            `pupils_gift`,
            `vambrace`,
            //`quickening_charm`,
            `ceremonial_robe`,
            //`spell_prism`,
            `timeless_relic`,
            //`fallen_sky`,
            `force_boots`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2719253341, es: 3160072841 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40447,
        power_level: [2.2, 2.4, 2.3, 2],
        abilities: [
          "batrider_sticky_napalm", // 1
          "batrider_flamebreak", // 2
          "batrider_sticky_napalm", // 3
          "batrider_firefly", // 4
          "batrider_sticky_napalm", // 5
          "batrider_flaming_lasso", // 6
          "batrider_sticky_napalm", // 7
          "batrider_firefly", // 8
          "batrider_firefly", // 9
          "batrider_firefly", // 10
          `batrider_flamebreak`, // 11
          "batrider_flaming_lasso", // 12
          "batrider_flamebreak", // 13
          "batrider_flamebreak", // 14
          `special_bonus_unique_batrider_7`, // 15
          `special_bonus_movement_speed_20`, // 16
          "special_bonus_attributes", // 17
          "batrider_flaming_lasso", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_batrider_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_batrider_2`, // 25
        ],
        items: {
          starting: [
            `tango`,
            "gauntlets",
            `circlet`,
            "branches",
            "branches",
            "branches",
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `boots`,
            `magic_wand`,
            `wind_lace`,
            "veil_of_discord",
          ],
          mid_game: [
            `travel_boots`,
            `black_king_bar`,
            "shivas_guard",
            `octarine_core`,
            `blink`,
          ],
          late_game: [
            "devastator",
            "aghanims_shard",
            `refresher`,
            "overwhelming_blink",
          ],
          situational: [
            `ultimate_scepter`,
            `sphere`,
            `cyclone`,
            `travel_boots_2`,
            "sheepstick",
          ],
          core: [
            `bracer`,
            "travel_boots",
            "veil_of_discord",
            `black_king_bar`,
            `blink`,
            `octarine_core`,
            "shivas_guard",
            `aghanims_shard`,
            "devastator",
          ],
          neutral: [
            `mysterious_hat`,
            //`pogo_stick`,
            `pupils_gift`,
            `vambrace`,
            //`quickening_charm`,
            `ceremonial_robe`,
            //`spell_prism`,
            `timeless_relic`,
            //`fallen_sky`,
            `force_boots`,
          ],
        },
      },
    ],
    combo: [
      `batrider_firefly`,
      `black_king_bar`,
      `blink`,
      `batrider_flaming_lasso`,
      `batrider_sticky_napalm`,
      `batrider_flamebreak`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_wand", "wind_lace", "boots", "cloak"],
        support: [],
        core: ["phase_boots"],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["force_staff", "glimmer_cape"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          `sange_and_yasha`,
        ],
      },
      late_game: {
        all: ["sphere", "sheepstick"],
        support: ["black_king_bar"],
        core: ["abyssal_blade"],
      },
    },
  },

  beastmaster: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699915480, es: 3160072900 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40448,
        power_level: [1.8, 2.1, 2.4, 2.2],
        abilities: [
          "beastmaster_wild_axes",
          `beastmaster_call_of_the_wild_boar`,
          `beastmaster_wild_axes`,
          `beastmaster_call_of_the_wild_boar`,
          `beastmaster_wild_axes`,
          "beastmaster_primal_roar",
          `beastmaster_wild_axes`,
          `beastmaster_call_of_the_wild_boar`,
          `beastmaster_call_of_the_wild_boar`,
          `beastmaster_inner_beast`,
          `special_bonus_unique_beastmaster_9`,
          `beastmaster_primal_roar`,
          `beastmaster_inner_beast`,
          `beastmaster_inner_beast`,
          `special_bonus_unique_beastmaster_5`,
          `beastmaster_inner_beast`,
          "special_bonus_attributes",
          "beastmaster_primal_roar",
          "special_bonus_attributes",
          "special_bonus_unique_beastmaster_6",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_beastmaster_7",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `circlet`,
            `sobi_mask`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `veil_of_discord`,
            `wind_lace`,
          ],
          mid_game: [
            `arcane_boots`,
            `ultimate_scepter`,
            `shivas_guard`,
            `aghanims_shard`,
            `blink`,
          ],
          late_game: [
            `octarine_core`,
            `black_king_bar`,
            `assault`,
            `refresher`,
          ],
          situational: [
            `vanguard`,
            `guardian_greaves`,
            `heavens_halberd`,
            `ancient_janggo`,
            `crimson_guard`,
            `helm_of_the_overlord`,
            `vladmir`,
            `lotus_orb`,
            `force_staff`,
            `pipe`,
            `eternal_shroud`,
            `boots_of_bearing`,
            `kaya_and_sange`,
            `aeon_disk`,
            `sheepstick`,
            `wind_waker`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `veil_of_discord`,
            `arcane_boots`,
            `ultimate_scepter`,
            `shivas_guard`,
            `aghanims_shard`,
            `blink`,
            `octarine_core`,
            `assault`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            `cloak_of_flames`,
            `ceremonial_robe`,
            `havoc_hammer`,
            `timeless_relic`,
            `giants_ring`,
            "demonicon",
          ],
        },
      },
    ],
    //ability_tooltips:
    /* beastmaster_wild_axes:
        "If you are laning against Chen or Enchantress, you might want to skill Wild Axes over Call of the Wild.", */
    //item_tooltips:
    /* helm_of_iron_will:
        "Solves your HP sustain issues and builds into Helm of the Dominator. Get it as early as possible.", */
    combo: [
      `beastmaster_call_of_the_wild_hawk`,
      `beastmaster_call_of_the_wild_boar`,
      `beastmaster_primal_roar`,
      `beastmaster_wild_axes`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: ["armor", "blight_stone", "wind_lace", "boots"],
        support: [],
        core: ["orb_of_corrosion", "vanguard"],
      },
      mid_game: {
        all: [],
        support: [`ghost`, `force_staff`, `glimmer_cape`],
        core: [`crimson_guard`, `sange_and_yasha`, `gungir`],
      },
      late_game: {
        all: ["sphere"],
        support: [],
        core: ["assault"],
      },
    },
  },

  // eidendota plays hero
  bloodseeker: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699915618, es: 3160072964 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40449,
        power_level: [1.9, 2.1, 2.5, 2.3],
        abilities: [
          "bloodseeker_blood_bath",
          "bloodseeker_thirst",
          "bloodseeker_thirst",
          "bloodseeker_bloodrage",
          "bloodseeker_thirst",
          "bloodseeker_rupture",
          "bloodseeker_bloodrage",
          "bloodseeker_bloodrage",
          "bloodseeker_bloodrage",
          "special_bonus_unique_bloodseeker_5",
          "bloodseeker_thirst",
          "bloodseeker_rupture",
          "bloodseeker_blood_bath",
          "bloodseeker_blood_bath",
          "special_bonus_unique_bloodseeker_7",
          "bloodseeker_blood_bath",
          "special_bonus_attributes",
          "bloodseeker_rupture",
          "special_bonus_attributes",
          "special_bonus_unique_bloodseeker_3",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bloodseeker_rupture_charges",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            "slippers",
            "branches",
          ],
          early_game: ["wraith_band", "phase_boots", "magic_wand", "maelstrom"],
          mid_game: ["black_king_bar", "mjollnir", "basher", "blink"],
          late_game: [
            "ultimate_scepter",
            "abyssal_blade",
            "satanic",
            "swift_blink",
            "butterfly",
          ],
          situational: [
            "silver_edge",
            "skadi",
            "monkey_king_bar",
            "sphere",
            "rod_of_atos",
            "gungir",
          ],
          core: [
            "phase_boots",
            "maelstrom",
            "black_king_bar",
            "mjollnir",
            "basher",
            "blink",
          ],
          neutral: [
            "broom_handle",
            "lance_of_pursuit",
            //"ring_of_aquila",
            "pupils_gift",
            "orb_of_destruction",
            "elven_tunic",
            //"titan_sliver",
            "paladin_sword",
            //"penta_edged_sword",
            "mind_breaker",
            //"spell_prism",
            "ninja_gear",
            "mirror_shield",
            "pirate_hat",
            "apex",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2706431682, es: 3160073015 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40450,
        power_level: [1.7, 2.1, 2.3, 2.2],
        abilities: [
          "bloodseeker_blood_bath",
          "bloodseeker_thirst",
          "bloodseeker_blood_bath",
          "bloodseeker_thirst",
          "bloodseeker_blood_bath",
          "bloodseeker_rupture",
          "bloodseeker_blood_bath",
          "bloodseeker_bloodrage",
          "bloodseeker_thirst",
          "special_bonus_unique_bloodseeker_5",
          "bloodseeker_bloodrage",
          "bloodseeker_rupture",
          "bloodseeker_bloodrage",
          "bloodseeker_bloodrage",
          "special_bonus_unique_bloodseeker_7",
          "bloodseeker_thirst",
          "special_bonus_attributes",
          "bloodseeker_rupture",
          "special_bonus_attributes",
          "special_bonus_unique_bloodseeker_3",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bloodseeker_rupture_charges",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            "slippers",
            "branches",
          ],
          early_game: [
            "wraith_band",
            "phase_boots",
            "magic_wand",
            "blade_mail",
          ],
          mid_game: [
            "rod_of_atos",
            "black_king_bar",
            "gungir",
            "ultimate_scepter",
            "blink",
          ],
          late_game: ["abyssal_blade", "satanic", "swift_blink", "butterfly"],
          situational: ["silver_edge", "skadi", "monkey_king_bar", "sphere"],
          core: [
            "phase_boots",
            "blade_mail",
            "rod_of_atos",
            "black_king_bar",
            "gungir",
            "ultimate_scepter",
            "blink",
          ],
          neutral: [
            "broom_handle",
            "unstable_wand",
            //"ring_of_aquila",
            "pupils_gift",
            "ogre_seal_totem",
            //`quickening_charm`,
            "paladin_sword",
            "mind_breaker",
            //"penta_edged_sword",
            //"spell_prism",
            "mirror_shield",
            "pirate_hat",
            //`fallen_sky`,
            //`ex_machina`,
          ],
        },
      },
    ],
    combo: [
      "bloodseeker_bloodrage",
      "bloodseeker_rupture",
      "bloodseeker_blood_bath",
      "attack",
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["cyclone", "lotus_orb"],
        support: ["force_staff", "glimmer_cape", "ghost"],
        core: [`blade_mail`, `sange_and_yasha`],
      },
      late_game: {
        all: ["sphere", "sheepstick"],
        support: [],
        core: ["satanic", "abyssal_blade"],
      },
    },
  },

  bounty_hunter: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699915719, es: 3160073135 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40451,
        power_level: [1.7, 1.9, 2, 1.8],
        facet: [1, 2],
        abilities: [
          `bounty_hunter_wind_walk`,
          `bounty_hunter_jinada`,
          `bounty_hunter_shuriken_toss`,
          "bounty_hunter_shuriken_toss",
          `bounty_hunter_shuriken_toss`,
          "bounty_hunter_track",
          `bounty_hunter_shuriken_toss`,
          `bounty_hunter_jinada`,
          `bounty_hunter_jinada`,
          `bounty_hunter_jinada`,
          `bounty_hunter_wind_walk`,
          "bounty_hunter_track",
          `bounty_hunter_wind_walk`,
          `bounty_hunter_wind_walk`,
          `special_bonus_unique_bounty_hunter_5`,
          `special_bonus_unique_bounty_hunter_9`,
          "special_bonus_attributes",
          "bounty_hunter_track",
          "special_bonus_attributes",
          `special_bonus_unique_bounty_hunter_8`,
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_unique_bounty_hunter_2`,
        ],
        items: {
          starting: [
            `tango`,
            `orb_of_venom`,
            `blood_grenade`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `tranquil_boots`,
            `magic_wand`,
            `urn_of_shadows`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `spirit_vessel`,
            `ancient_janggo`,
            `aghanims_shard`,
            `boots_of_bearing`,
            `ultimate_scepter`,
          ],
          late_game: [
            `sheepstick`,
            `octarine_core`,
            `wind_waker`,
            `ethereal_blade`,
          ],
          situational: [
            `orb_of_corrosion`,
            `pavise`,
            `solar_crest`,
            `phylactery`,
            `angels_demise`,
            `guardian_greaves`,
            `pipe`,
            `crimson_guard`,
            `black_king_bar`,
            `heavens_halberd`,
            `orchid`,
            `lotus_orb`,
            `cyclone`,
            `bloodthorn`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            "tranquil_boots",
            `spirit_vessel`,
            `aghanims_shard`,
            `boots_of_bearing`,
            `ultimate_scepter`,
            `sheepstick`,
            `wind_waker`,
          ],
          neutral: [
            `broom_handle`,
            `faded_broach`,
            `philosophers_stone`,
            "bullwhip",
            `psychic_headband`,
            `ceremonial_robe`,
            `timeless_relic`,
            `ascetic_cap`,
            `seer_stone`,
            `force_boots`,
          ],
        },
      },
    ],
    combo: [
      `bounty_hunter_wind_walk`,
      `bounty_hunter_track`,
      `bounty_hunter_jinada`,
      `bounty_hunter_shuriken_toss`,
      `urn_of_shadows`,
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: ["ward_sentry", "dust"],
        core: [],
      },
      mid_game: {
        all: ["cyclone", "lotus_orb"],
        support: ["SentryDustGem", "ghost"],
        core: ["manta"],
      },
      late_game: {
        all: ["sheepstick", "black_king_bar"],
        support: ["SentryDustGem"],
        core: ["assault", "abyssal_blade", "butterfly"],
      },
    },
  },

  brewmaster: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699915806, es: 3160073238 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40452,
        power_level: [1.5, 1.9, 2.4, 2.3],
        abilities: [
          "brewmaster_thunder_clap",
          "brewmaster_cinder_brew",
          `brewmaster_cinder_brew`,
          `brewmaster_drunken_brawler`,
          `brewmaster_cinder_brew`,
          "brewmaster_primal_split",
          `brewmaster_cinder_brew`,
          `brewmaster_drunken_brawler`,
          `brewmaster_drunken_brawler`,
          `brewmaster_drunken_brawler`,
          `special_bonus_unique_brewmaster_2`,
          "brewmaster_primal_split",
          `brewmaster_thunder_clap`,
          `brewmaster_thunder_clap`,
          `special_bonus_unique_brewmaster_8`,
          `brewmaster_thunder_clap`,
          "special_bonus_attributes",
          "brewmaster_primal_split",
          "special_bonus_attributes",
          "special_bonus_unique_brewmaster",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_unique_brewmaster_4`,
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `gauntlets`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `urn_of_shadows`,
            `boots`,
            `bracer`,
            `bracer`,
            `magic_wand`,
          ],
          mid_game: [
            `spirit_vessel`,
            `radiance`,
            `veil_of_discord`,
            `shivas_guard`,
            `aghanims_shard`,
            `travel_boots`,
          ],
          late_game: [
            `assault`,
            `octarine_core`,
            `refresher`,
            `overwhelming_blink`,
          ],
          situational: [
            `vanguard`,
            `phase_boots`,
            `arcane_boots`,
            `hand_of_midas`,
            `meteor_hammer`,
            `crimson_guard`,
            `pipe`,
            `blink`,
            `force_staff`,
            `guardian_greaves`,
            `boots_of_bearing`,
            `vladmir`,
            `black_king_bar`,
            `sphere`,
            `lotus_orb`,
            `aeon_disk`,
            `ultimate_scepter`,
            `travel_boots_2`,
          ],
          core: [
            `urn_of_shadows`,
            `boots`,
            `spirit_vessel`,
            `radiance`,
            `shivas_guard`,
            `aghanims_shard`,
            `travel_boots`,
            `assault`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            `defiant_shell`,
            `cloak_of_flames`,
            `ascetic_cap`,
            `havoc_hammer`,
            `giants_ring`,
            `apex`,
          ],
        },
      },
    ],
    //ability_tooltips
    /* brewmaster_drunken_brawler: `You can put a point in this spell on level 1 to survive the first few creep waves against a tough lane match-up.`,
      special_bonus_hp_350: `It is important that you get ulti off and extra HP can help with that. The other level fifteen does not see much play as you spend most of the fight in Primal Split.`, */
    combo: [
      `brewmaster_cinder_brew`,
      `urn_of_shadows`,
      `blink`,
      `brewmaster_thunder_clap`,
      `brewmaster_primal_split`,
    ],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "magic_stick", "wind_lace", "boots"],
        support: [],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["cloak"],
        support: ["force_staff", "glimmer_cape", "ghost"],
        core: ["orchid", "black_king_bar", "witch_blade"],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: ["abyssal_blade", "monkey_king_bar", "bloodthorn", "butterfly"],
      },
    },
  },

  // YoonA plays hero (eidendota would play him as well, but YoonA had him already in the past)
  bristleback: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699915905, es: 3160073323 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40453,
        power_level: [2.1, 2.6, 2.5, 2.4],
        abilities: [
          "bristleback_quill_spray",
          "bristleback_bristleback",
          "bristleback_quill_spray",
          "bristleback_viscous_nasal_goo",
          "bristleback_quill_spray",
          "bristleback_warpath",
          "bristleback_quill_spray",
          "bristleback_bristleback",
          "bristleback_bristleback",
          `bristleback_bristleback`,
          `special_bonus_mp_regen_150`,
          "bristleback_warpath",
          "bristleback_viscous_nasal_goo",
          "bristleback_viscous_nasal_goo",
          `special_bonus_unique_bristleback_6`,
          "bristleback_viscous_nasal_goo",
          "special_bonus_attributes",
          "bristleback_warpath",
          "special_bonus_attributes",
          `special_bonus_unique_bristleback_2`,
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_spell_lifesteal_12`,
        ],
        items: {
          starting: [
            "tango",
            `branches`,
            `branches`,
            "quelling_blade",
            `gauntlets`,
            `gauntlets`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `soul_ring`,
            `phase_boots`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            `ultimate_scepter`,
            `bloodstone`,
            `eternal_shroud`,
            `aghanims_shard`,
            `kaya_and_sange`,
          ],
          late_game: [`shivas_guard`, `travel_boots`, `heart`, `assault`],
          situational: [
            `arcane_boots`,
            `veil_of_discord`,
            `cloak`,
            `pipe`,
            `blade_mail`,
            `crimson_guard`,
            `satanic`,
            `abyssal_blade`,
            `greater_crit`,
            `black_king_bar`,
            `heavens_halberd`,
            `guardian_greaves`,
            `lotus_orb`,
            `sphere`,
            `octarine_core`,
            `overwhelming_blink`,
            `travel_boots_2`,
          ],
          core: [
            "vanguard",
            `soul_ring`,
            `phase_boots`,
            `ultimate_scepter`,
            `bloodstone`,
            `eternal_shroud`,
            `aghanims_shard`,
            `kaya_and_sange`,
            `shivas_guard`,
            `heart`,
          ],
          neutral: [
            `arcane_ring`,
            `spark_of_courage`,
            `vambrace`,
            `vampire_fangs`,
            `cloak_of_flames`,
            `ogre_seal_totem`,
            `havoc_hammer`,
            `rattlecage`,
            `giants_ring`,
            `force_field`,
          ],
        },
      },
    ],
    //ability_tooltips:
    /* special_bonus_unique_bristleback_3:
        "You should generally be looking to transition to right-clicker in late game and this talent helps with that.", */
    combo: [
      `bristleback_hairball`,
      `bristleback_quill_spray`,
      `bristleback_viscous_nasal_goo`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_wand",
          "armor",
          "ring_of_regen",
          "wind_lace",
          "boots",
          "urn_of_shadows",
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          "spirit_vessel",
          /*"medallion_of_courage",*/
          "solar_crest",
          "mekansm",
        ],
        support: ["glimmer_cape", "force_staff", "ghost"],
        core: ["diffusal_blade", "silver_edge", "hurricane_pike"],
      },
      late_game: {
        all: [],
        support: [],
        core: ["assault", "bloodthorn", "skadi", "butterfly"],
      },
    },
  },

  broodmother: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699915996, es: 3160073393 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40454,
        // Mid: 1.5	2.6	2.5	2.1 [58%]
        // Offlane:1.7	2.7	2.5	2.1 [25%]
        power_level: [1.5, 2.6, 2.5, 2.1], // Mid
        abilities: [
          "broodmother_spin_web", // 1
          `broodmother_incapacitating_bite`, // 2
          `broodmother_insatiable_hunger`, // 3
          `broodmother_spin_web`, // 4
          "broodmother_spin_web", // 5
          "broodmother_spawn_spiderlings", // 6
          `broodmother_spin_web`, // 7
          `broodmother_incapacitating_bite`, // 8
          `broodmother_incapacitating_bite`, // 9
          `special_bonus_unique_broodmother_6`, // 10
          `broodmother_incapacitating_bite`, // 11
          "broodmother_spawn_spiderlings", // 12
          `broodmother_insatiable_hunger`, // 13
          `broodmother_insatiable_hunger`, // 14
          `special_bonus_unique_broodmother_5`, // 15
          `broodmother_insatiable_hunger`, // 16
          "special_bonus_attributes", // 17
          "broodmother_spawn_spiderlings", // 18
          "special_bonus_attributes", // 19
          `special_bonus_attack_speed_35`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_broodmother_1`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [
            `wraith_band`,
            `wraith_band`,
            `power_treads`,
            `magic_wand`,
            `soul_ring`,
          ],
          mid_game: [
            `orchid`,
            `bloodthorn`,
            `manta`,
            `aghanims_shard`,
            `black_king_bar`,
          ],
          late_game: [
            `echo_sabre`,
            `harpoon`,
            `sheepstick`,
            `skadi`,
            `butterfly`,
          ],
          situational: [
            `spirit_vessel`,
            `orb_of_corrosion`,
            `arcane_boots`,
            `diffusal_blade`,
            `disperser`,
            `lotus_orb`,
            `phylactery`,
            `vladmir`,
            `crimson_guard`,
            `pipe`,
            `guardian_greaves`,
            `blink`,
            `desolator`,
            `monkey_king_bar`,
            `silver_edge`,
            `basher`,
            `abyssal_blade`,
            `nullifier`,
            `ultimate_scepter`,
            `swift_blink`,
            `overwhelming_blink`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            `soul_ring`,
            `bloodthorn`,
            `manta`,
            `aghanims_shard`,
            `black_king_bar`,
            `harpoon`,
            `sheepstick`,
          ],
          neutral: [
            "arcane_ring",
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            `elven_tunic`,
            `defiant_shell`,
            `ancient_guardian`,
            `mind_breaker`,
            "desolator_2",
            `apex`,
          ],
        },
      },
    ],
    //ability_tooltips:
    /* special_bonus_unique_broodmother_3:
        "On level 15, take the level 15 talent before this level 10 talent. On level 16 take this level 10 talent. The dota2 client disallows me to indicate that in the leveling table above.", */
    //item_tooltips:
    /* Replaced 31.8.2023
      harpoon: `An upgrade to echo sabre that lets you catch up to enemy heroes and not get kited.`,*/
    combo: [
      `orchid`,
      `broodmother_spawn_spiderlings`,
      `broodmother_silken_bola`,
      `broodmother_insatiable_hunger`,
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor", "urn_of_shadows"],
        support: ["ward_sentry"],
        core: ["ring_of_health", "vanguard"],
      },
      mid_game: {
        all: ["spirit_vessel"],
        support: ["glimmer_cape", "ghost", "force_staff"],
        core: ["crimson_guard", "hurricane_pike", "witch_blade"],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk"],
        support: [],
        core: [
          "monkey_king_bar",
          "abyssal_blade",
          "bloodthorn",
          "skadi",
          "butterfly",
          "satanic",
        ],
      },
    },
  },

  centaur: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699916073, es: 3160073458 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40455,
        power_level: [2, 2.1, 2.4, 2.3],
        abilities: [
          "centaur_hoof_stomp", // 1
          `centaur_double_edge`, // 2
          `centaur_double_edge`, // 3
          `centaur_hoof_stomp`, // 4
          `centaur_return`, // 5
          "centaur_stampede", // 6
          `centaur_double_edge`, // 7
          `centaur_double_edge`, // 8
          `centaur_hoof_stomp`, // 9
          `centaur_hoof_stomp`, // 10
          `special_bonus_hp_regen_4`, // 11
          "centaur_stampede", // 12
          `centaur_return`, // 13
          `centaur_return`, // 14
          `special_bonus_unique_centaur_4`, // 15
          `centaur_return`, // 16
          "special_bonus_attributes", // 17
          "centaur_stampede", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_centaur_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_centaur_2`, // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `branches`,
            `ring_of_protection`,
            `ring_of_protection`,
            `ward_observer`,
          ],
          early_game: [
            `helm_of_iron_will`,
            `phase_boots`,
            `veil_of_discord`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            `blink`,
            `shivas_guard`,
            `eternal_shroud`,
            `heart`,
            `aghanims_shard`,
          ],
          late_game: [
            `kaya_and_sange`,
            `black_king_bar`,
            `overwhelming_blink`,
            `octarine_core`,
          ],
          situational: [
            `bracer`,
            `vanguard`,
            "heavens_halberd",
            `ultimate_scepter`,
            `guardian_greaves`,
            `force_staff`,
            `lotus_orb`,
            `crimson_guard`,
            `pipe`,
            `blade_mail`,
            `sphere`,
            `assault`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `veil_of_discord`,
            `blink`,
            `shivas_guard`,
            `eternal_shroud`,
            `heart`,
            `aghanims_shard`,
            `kaya_and_sange`,
            `overwhelming_blink`,
          ],
          neutral: [
            `occult_bracelet`,
            `seeds_of_serenity`,
            "dragon_scale",
            "vambrace",
            "cloak_of_flames",
            `ogre_seal_totem`,
            `rattlecage`,
            `havoc_hammer`,
            "giants_ring",
            `apex`,
          ],
        },
      },
    ],
    //ability_tooltips
    //special_bonus_unique_centaur_5: `Stacks up well with the Aghanims Scepter on Centaur.`,
    //item_tooltips:
    /* hood_of_defiance:
        "A core item that allows tanks you up against magical damage. Reduces the self-damage taken from Double Edge.", */
    combo: [
      `centaur_stampede`,
      `blink`,
      `centaur_hoof_stomp`,
      `centaur_double_edge`,
    ],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "wind_lace", "boots", "urn_of_shadows"],
        support: [],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["spirit_vessel"],
        support: ["glimmer_cape", "force_staff", "cyclone"],
        core: ["black_king_bar"],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["abyssal_blade", "bloodthorn"],
      },
    },
  },

  // eidendota plays hero
  chaos_knight: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699916165, es: 3160073526 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40456,
        power_level: [2.2, 2.3, 2.5, 2.2],
        abilities: [
          "chaos_knight_chaos_bolt", // 1
          "chaos_knight_reality_rift", // 2
          "chaos_knight_chaos_strike", // 3
          "chaos_knight_chaos_strike", // 4
          "chaos_knight_chaos_strike", // 5
          "chaos_knight_phantasm", // 6
          "chaos_knight_chaos_strike", // 7
          "chaos_knight_reality_rift", // 8
          "chaos_knight_reality_rift", // 9
          "special_bonus_unique_chaos_knight_6", // 10
          "chaos_knight_reality_rift", // 11
          "chaos_knight_phantasm", // 12
          "chaos_knight_chaos_bolt", // 13
          "chaos_knight_chaos_bolt", // 14
          "special_bonus_strength_12", // 15
          "chaos_knight_chaos_bolt", // 16
          "special_bonus_attributes", // 17
          "chaos_knight_phantasm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_chaos_knight", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_chaos_knight_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "circlet",
            "branches",
            "branches",
          ],
          early_game: [
            "power_treads",
            "bracer",
            "magic_stick",
            "helm_of_iron_will",
          ],
          mid_game: ["armlet", "echo_sabre", "blink"],
          late_game: [
            "bloodthorn",
            "disperser",
            "harpoon",
            "assault",
            "overwhelming_blink",
          ],
          situational: [
            "infused_raindrop",
            "aghanims_shard",
            "black_king_bar",
            "ultimate_scepter",
            "mage_slayer",
            "manta",
            "sphere",
            "silver_edge",
            "heart",
          ],
          core: ["power_treads", "armlet", "echo_sabre", "blink"],
          neutral: [
            "occult_bracelet",
            "duelist_gloves",
            "broom_handle",
            "vambrace",
            "orb_of_destruction",
            "elven_tunic",
            "vindicators_axe",
            "mind_breaker",
            "ninja_gear",
            "pirate_hat",
            "force_boots",
            "desolator_2",
          ],
        },
        // item_tooltips:
        /*flicker:
            "Can be really good in the late game if your enemies are controlling you with slows,silences etc.",
            */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2708440963, es: 3160073751 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40457,
        power_level: [2.2, 2.4, 2.4, 2.1],
        abilities: [
          "chaos_knight_chaos_bolt", // 1
          "chaos_knight_reality_rift", // 2
          "chaos_knight_chaos_strike", // 3
          "chaos_knight_chaos_strike", // 4
          "chaos_knight_chaos_strike", // 5
          "chaos_knight_phantasm", // 6
          "chaos_knight_chaos_strike", // 7
          "chaos_knight_reality_rift", // 8
          "chaos_knight_reality_rift", // 9
          "special_bonus_unique_chaos_knight_6", // 10
          "chaos_knight_reality_rift", // 11
          "chaos_knight_phantasm", // 12
          "chaos_knight_chaos_bolt", // 13
          "chaos_knight_chaos_bolt", // 14
          "special_bonus_unique_chaos_knight_8", // 15
          "chaos_knight_chaos_bolt", // 16
          "special_bonus_attributes", // 17
          "chaos_knight_phantasm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_chaos_knight_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_chaos_knight_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            "gauntlets",
            "branches",
            "branches",
          ],
          early_game: [
            "power_treads",
            "bracer",
            "magic_wand",
            "helm_of_iron_will",
          ],
          mid_game: ["armlet", "echo_sabre", "blink", "aghanims_shard"],
          late_game: ["assault", "overwhelming_blink", "bloodthorn", "harpoon"],
          situational: [
            "heavens_halberd",
            "black_king_bar",
            "manta",
            "silver_edge",
            "abyssal_blade",
            "heart",
          ],
          core: ["power_treads", "armlet", "blink", "aghanims_shard"],
          neutral: [
            "duelist_gloves",
            "broom_handle",
            "vambrace",
            "orb_of_destruction",
            "elven_tunic",
            "vindicators_axe",
            //"spell_prism",
            "mind_breaker",
            "ninja_gear",
            "pirate_hat",
            "force_boots",
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: [/*"medallion_of_courage",*/ "solar_crest", "lotus_orb"],
        support: ["glimmer_cape", "ghost", "force_staff"],
        core: [
          "crimson_guard",
          "bfury",
          "maelstrom",
          "gungir",
          "black_king_bar",
        ],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk"],
        support: [],
        core: ["mjollnir", "shivas_guard", "radiance", "butterfly"],
      },
    },
  },

  chen: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699916263, es: 3160073829 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40577,
        power_level: [1.6, 1.9, 1.7, 1.5],
        abilities: [
          `chen_penitence`, // 1
          `chen_holy_persuasion`, // 2
          "chen_holy_persuasion", // 3
          `chen_divine_favor`, // 4
          "chen_holy_persuasion", // 5
          "chen_hand_of_god", // 6
          "chen_holy_persuasion", // 7
          "chen_penitence", // 8
          "chen_penitence", // 9
          `chen_penitence`, // 10
          `special_bonus_unique_chen_11`, // 11
          "chen_hand_of_god", // 12
          "chen_divine_favor", // 13
          "chen_divine_favor", // 14
          `special_bonus_unique_chen_8`, // 15
          `chen_divine_favor`, // 16
          "special_bonus_attributes", // 17
          "chen_hand_of_god", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_chen_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_chen_12`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [`vladmir`, `boots`, `magic_wand`, `infused_raindrop`],
          mid_game: [
            `pavise`,
            `solar_crest`,
            `mekansm`,
            `pipe`,
            `aghanims_shard`,
          ],
          late_game: [
            `boots_of_bearing`,
            `force_staff`,
            `ultimate_scepter`,
            `assault`,
          ],
          situational: [
            `blight_stone`,
            `arcane_boots`,
            `glimmer_cape`,
            `guardian_greaves`,
            `holy_locket`,
            `aeon_disk`,
            `phylactery`,
            `ghost`,
            `lotus_orb`,
            `helm_of_the_overlord`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            `vladmir`,
            `boots`,
            `solar_crest`,
            `mekansm`,
            `pipe`,
            `aghanims_shard`,
            `boots_of_bearing`,
            `ultimate_scepter`,
            `assault`,
          ],
          neutral: [
            `arcane_ring`,
            `seeds_of_serenity`,
            "philosophers_stone",
            `pupils_gift`,
            `ogre_seal_totem`,
            `ceremonial_robe`,
            "spy_gadget",
            `ascetic_cap`,
            `force_field`,
            `demonicon`,
          ],
        },
      },
    ],
    // ability_tooltips
    // special_bonus_unique_chen_2: `You can take the strong dispel level 25 talent over this suggested one if they have strong AoE disables like Magnus RP or Tidehunter Ravage.`,
    combo: [], // There is no particular combo for Chen
    counter_items: {
      laning_phase: {
        all: [],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: { all: ["spirit_vessel"], support: [], core: [] },
      late_game: { all: [], support: [], core: [] },
    },
  },

  clinkz: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699916348, es: 3160073923 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40581,
        power_level: [2, 2.3, 2.5, 2.4],
        abilities: [
          "clinkz_tar_bomb", // 1
          "clinkz_death_pact", // 2
          "clinkz_tar_bomb", // 3
          `clinkz_death_pact`, // 4
          `clinkz_death_pact`, // 5
          "clinkz_wind_walk", // 6
          "clinkz_tar_bomb", // 7
          `clinkz_tar_bomb`, // 8
          "clinkz_strafe", // 9
          "special_bonus_unique_clinkz_1", // 10
          "clinkz_strafe", // 11
          "clinkz_wind_walk", // 12
          `clinkz_strafe`, // 13
          `clinkz_strafe`, // 14
          "special_bonus_attack_range_75", // 15
          "clinkz_death_pact", // 16
          "special_bonus_attributes", // 17
          "clinkz_wind_walk", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_clinkz_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_clinkz_3`, // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            `wraith_band`,
            `ring_of_basilius`,
            `arcane_boots`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            `desolator`,
            `dragon_lance`,
            `greater_crit`,
            `aghanims_shard`,
          ],
          late_game: [
            `hurricane_pike`,
            `black_king_bar`,
            `skadi`,
            `sheepstick`,
          ],
          situational: [
            `power_treads`,
            `falcon_blade`,
            `phylactery`,
            `blink`,
            `mage_slayer`,
            `diffusal_blade`,
            `disperser`,
            `maelstrom`,
            `gungir`,
            `angels_demise`,
            `orchid`,
            `bloodthorn`,
            "monkey_king_bar",
            "sphere",
            "ultimate_scepter",
            `nullifier`,
            `swift_blink`,
            `refresher`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `desolator`,
            `dragon_lance`,
            `greater_crit`,
            `aghanims_shard`,
            `hurricane_pike`,
            `black_king_bar`,
          ],
          neutral: [
            "lance_of_pursuit",
            `unstable_wand`,
            "grove_bow",
            `specialists_array`,
            "enchanted_quiver",
            "elven_tunic",
            "mind_breaker",
            `ancient_guardian`,
            `desolator_2`,
            "apex",
          ],
        },
      },
    ],
    combo: [
      `clinkz_death_pact`,
      `clinkz_wind_walk`,
      `orchid`,
      `clinkz_tar_bomb`,
      `clinkz_strafe`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: ["armor", "ring_of_regen"],
        support: ["ward_sentry", "dust"],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["blink"],
        support: ["SentryDust", "glimmer_cape", "ghost", "force_staff"],
        core: ["blade_mail", "heavens_halberd"],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk"],
        support: ["SentryDustGem"],
        core: ["abyssal_blade", "butterfly"],
      },
    },
  },

  // Clockwerk
  rattletrap: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699916434, es: 3160073992 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40467,
        power_level: [1.8, 1.9, 2, 1.8],
        facet: 2,
        abilities: [
          `rattletrap_power_cogs`, // 1
          `rattletrap_battery_assault`, // 2
          `rattletrap_power_cogs`, // 3
          `rattletrap_battery_assault`, // 4
          `rattletrap_power_cogs`, // 5
          "rattletrap_hookshot", // 6
          `rattletrap_power_cogs`, // 7
          "rattletrap_rocket_flare", // 8
          `rattletrap_battery_assault`, // 9
          `special_bonus_unique_clockwerk_9`, // 10
          `rattletrap_battery_assault`, // 11
          "rattletrap_hookshot", // 12
          `rattletrap_rocket_flare`, // 13
          `rattletrap_rocket_flare`, // 14
          `special_bonus_unique_clockwerk_5`, // 15
          `rattletrap_rocket_flare`, // 16
          "special_bonus_attributes", // 17
          "rattletrap_hookshot", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_clockwerk_flare_damage`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_clockwerk_6`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `wind_lace`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `tranquil_boots`,
            "urn_of_shadows",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `pavise`,
            `solar_crest`,
            `blade_mail`,
            `force_staff`,
            `ultimate_scepter`,
          ],
          late_game: [
            `aghanims_shard`,
            `boots_of_bearing`,
            `shivas_guard`,
            `wind_waker`,
          ],
          situational: [
            `ring_of_basilius`,
            `spirit_vessel`,
            `glimmer_cape`,
            `pipe`,
            `ancient_janggo`,
            `cyclone`,
            `ghost`,
            `vladmir`,
            `guardian_greaves`,
            `lotus_orb`,
            `aeon_disk`,
            `orchid`,
            `heavens_halberd`,
            `octarine_core`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `urn_of_shadows`,
            `solar_crest`,
            `blade_mail`,
            `force_staff`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `boots_of_bearing`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            `pupils_gift`,
            `philosophers_stone`,
            `ogre_seal_totem`,
            `craggy_coat`,
            `rattlecage`,
            `havoc_hammer`,
            `giants_ring`,
            `force_field`,
          ],
        },
      },
    ],
    // ability_tooltips
    /*special_bonus_unique_clockwerk_2: `The leash makes sure an enemy hero cannot get out of Power Cogs with their mobility spells, such as Mirana Leap or Phoenix Dive.`,*/
    combo: [
      `rattletrap_overclocking`,
      `rattletrap_rocket_flare`,
      `rattletrap_hookshot`,
      `rattletrap_battery_assault`,
      `rattletrap_power_cogs`,
    ],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "wind_lace", "boots", "cloak"],
        support: ["ward_observer"],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: [],
        support: ["force_staff", "glimmer_cape"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "hurricane_pike",
          "black_king_bar",
        ],
      },
      late_game: { all: [], support: ["black_king_bar"], core: [] },
    },
  },

  // YoonA plays hero
  crystal_maiden: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699916517, es: 3160074062 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40468,
        power_level: [1.8, 1.9, 2, 2.1],
        facet: 1,
        abilities: [
          "crystal_maiden_crystal_nova", // 1
          "crystal_maiden_frostbite", // 2
          "crystal_maiden_brilliance_aura", // 3
          "crystal_maiden_frostbite", // 4
          "crystal_maiden_frostbite", // 5
          `crystal_maiden_freezing_field`, // 6
          "crystal_maiden_frostbite", // 7
          `crystal_maiden_brilliance_aura`, // 8
          `crystal_maiden_crystal_nova`, // 9
          `special_bonus_hp_200`, // 10
          `crystal_maiden_crystal_nova`, // 11
          "crystal_maiden_freezing_field", // 12
          "crystal_maiden_crystal_nova", // 13
          `crystal_maiden_brilliance_aura`, // 14
          `special_bonus_unique_crystal_maiden_frostbite_castrange`, // 15
          `crystal_maiden_brilliance_aura`, // 16
          "special_bonus_attributes", // 17
          "crystal_maiden_freezing_field", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_crystal_maiden_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_crystal_maiden_1", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `clarity`,
            `enchanted_mango`,
            `enchanted_mango`,
            `blood_grenade`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "tranquil_boots",
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            "glimmer_cape",
            "force_staff",
            `aghanims_shard`,
            `ancient_janggo`,
            `boots_of_bearing`,
          ],
          late_game: [
            `blink`,
            `black_king_bar`,
            `ultimate_scepter`,
            `wind_waker`,
          ],
          situational: [
            `ring_of_basilius`,
            `arcane_boots`,
            `lotus_orb`,
            `ghost`,
            `cyclone`,
            `shivas_guard`,
            `pavise`,
            `solar_crest`,
            `sheepstick`,
            `ethereal_blade`,
            `octarine_core`,
            `aeon_disk`,
            "travel_boots",
          ],
          core: [
            `tranquil_boots`,
            `glimmer_cape`,
            `force_staff`,
            `aghanims_shard`,
            `boots_of_bearing`,
            `blink`,
            `black_king_bar`,
            `ultimate_scepter`,
          ],
          neutral: [
            `faded_broach`,
            `trusty_shovel`,
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            `timeless_relic`,
            "seer_stone",
            `force_boots`,
          ],
        },
      },
    ],
    combo: [
      `crystal_maiden_frostbite`,
      `crystal_maiden_crystal_nova`,
      `crystal_maiden_freezing_field`,
      `glimmer_cape`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "ring_of_regen", "headdress", "infused_raindrop"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["cloak"],
        support: ["force_staff", "glimmer_cape"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "manta",
        ],
      },
      late_game: { all: [], support: ["black_king_bar"], core: [] },
    },
  },

  dark_seer: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699916602, es: 3160074125 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40469,
        power_level: [1.6, 1.8, 2.3, 1.9],
        facet: [1, 2],
        abilities: [
          "dark_seer_ion_shell", // 1
          `dark_seer_vacuum`, // 2
          "dark_seer_ion_shell", // 3
          `dark_seer_surge`, // 4
          "dark_seer_ion_shell", // 5
          "dark_seer_wall_of_replica", // 6
          "dark_seer_ion_shell", // 7
          "dark_seer_surge", // 8
          "dark_seer_surge", // 9
          `dark_seer_surge`, // 10
          `dark_seer_vacuum`, // 11
          "dark_seer_wall_of_replica", // 12
          "dark_seer_vacuum", // 13
          `dark_seer_vacuum`, // 14
          `special_bonus_unique_dark_seer_7`, // 15
          `special_bonus_unique_dark_seer_2`, // 16
          "special_bonus_attributes", // 17
          "dark_seer_wall_of_replica", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_dark_seer_13`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_dark_seer_3`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `gauntlets`,
            `gauntlets`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `bracer`,
            `boots`,
            `ring_of_basilius`,
            `arcane_boots`,
            `magic_wand`,
            `soul_ring`,
          ],
          mid_game: [
            `mekansm`,
            `guardian_greaves`,
            `veil_of_discord`,
            `blink`,
            `shivas_guard`,
            `pipe`,
          ],
          late_game: [
            `ultimate_scepter`,
            `aghanims_shard`,
            `sheepstick`,
            `refresher`,
          ],
          situational: [
            `vanguard`,
            `spirit_vessel`,
            `crimson_guard`,
            `cyclone`,
            `sphere`,
            `helm_of_the_dominator`,
            `eternal_shroud`,
            `black_king_bar`,
            `aeon_disk`,
            `heavens_halberd`,
            `solar_crest`,
            `force_staff`,
            `lotus_orb`,
            `octarine_core`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `arcane_boots`,
            `soul_ring`,
            `guardian_greaves`,
            `blink`,
            `shivas_guard`,
            `pipe`,
            `ultimate_scepter`,
          ],
          neutral: [
            "arcane_ring",
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            `ceremonial_robe`,
            `cloak_of_flames`,
            `havoc_hammer`,
            "trickster_cloak",
            `demonicon`,
            `force_field`,
          ],
        },
      },
    ],
    // ability_tooltips
    /* special_bonus_unique_dark_seer_7:
        "On level fifteen, you should take the level fifteen talent before this level ten one. The dota client disallows me to set it up in such order in graphics above.", */
    //item_tooltips:
    // null_talisman: `A couple of Null Talismans provide you with mana regen to spam Ion Shell.`,
    combo: [
      `dark_seer_ion_shell`,
      `dark_seer_surge`,
      `blink`,
      `dark_seer_normal_punch`,
      `dark_seer_vacuum`,
      `dark_seer_wall_of_replica`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "ring_of_regen"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["cloak"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "black_king_bar",
        ],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["nullifier", "abyssal_blade", "shivas_guard"],
      },
    },
  },

  // YoonA plays hero
  dark_willow: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699916714, es: 3160074195 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40470,
        power_level: [1.9, 2, 2.1, 2.3],
        abilities: [
          "dark_willow_bramble_maze", // 1
          "dark_willow_shadow_realm", // 2
          `dark_willow_bramble_maze`, // 3
          `dark_willow_cursed_crown`, // 4
          "dark_willow_bramble_maze", // 5
          "dark_willow_bedlam", // 6
          "dark_willow_bramble_maze", // 7
          `dark_willow_shadow_realm`, // 8
          `dark_willow_shadow_realm`, // 9
          `dark_willow_shadow_realm`, // 10
          `special_bonus_unique_dark_willow_5`, // 11
          "dark_willow_bedlam", // 12
          `dark_willow_cursed_crown`, // 13
          `dark_willow_cursed_crown`, // 14
          `special_bonus_unique_dark_willow_4`, // 15
          `dark_willow_cursed_crown`, // 16
          "special_bonus_attributes", // 17
          "dark_willow_bedlam", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_dark_willow_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_dark_willow_bedlam_targets", // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `circlet`,
            `faerie_fire`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `tranquil_boots`,
            `urn_of_shadows`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`cyclone`, `aghanims_shard`, `blink`, `force_staff`],
          late_game: [
            `ultimate_scepter`,
            `octarine_core`,
            `sheepstick`,
            `moon_shard`,
          ],
          situational: [
            `ring_of_basilius`,
            `arcane_boots`,
            `hand_of_midas`,
            `glimmer_cape`,
            `pavise`,
            `aether_lens`,
            `ghost`,
            `solar_crest`,
            "spirit_vessel",
            `lotus_orb`,
            `boots_of_bearing`,
            `wind_waker`,
            `aeon_disk`,
            `revenants_brooch`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `urn_of_shadows`,
            `cyclone`,
            "aghanims_shard",
            `blink`,
            `ultimate_scepter`,
            `octarine_core`,
            `sheepstick`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            "philosophers_stone",
            `pupils_gift`,
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            `timeless_relic`,
            "seer_stone",
            `pirate_hat`,
          ],
        },
      },
    ],
    // ability_tooltips:
    /*special_bonus_unique_dark_willow_2: `You can take the attack speed talent over this one if you have the Aghanims Scepter.`,*/
    combo: [
      `dark_willow_cursed_crown`,
      `cyclone`,
      `dark_willow_shadow_realm`,
      `dark_willow_bramble_maze`,
      `dark_willow_bedlam`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "ring_of_regen", "infused_raindrop", "cloak"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["glimmer_cape", "force_staff", "cyclone"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "blade_mail",
          "black_king_bar",
          `sange_and_yasha`,
          "manta",
        ],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["butterfly", "satanic"],
      },
    },
  },

  dawnbreaker: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699917167, es: 3160074247 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40471,
        power_level: [1.3, 1.9, 2.1, 2.2],
        abilities: [
          `dawnbreaker_celestial_hammer`, // 1
          `dawnbreaker_fire_wreath`, // 2
          "dawnbreaker_celestial_hammer", // 3
          "dawnbreaker_fire_wreath", // 4   equals to `starbreaker`
          "dawnbreaker_celestial_hammer", // 5
          "dawnbreaker_solar_guardian", // 6
          "dawnbreaker_celestial_hammer", // 7
          "dawnbreaker_fire_wreath", // 8
          "dawnbreaker_fire_wreath", // 9
          "special_bonus_unique_dawnbreaker_celestial_hammer_slow", // 10
          "dawnbreaker_luminosity", // 11
          "dawnbreaker_solar_guardian", // 12
          "dawnbreaker_luminosity", // 13
          "dawnbreaker_luminosity", // 14
          "special_bonus_unique_dawnbreaker_solar_guardian_cooldown", // 15
          "dawnbreaker_luminosity", // 16
          "special_bonus_attributes", // 17
          "dawnbreaker_solar_guardian", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dawnbreaker_solar_guardian_radius", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_dawnbreaker_celestial_hammer_cast_range`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `faerie_fire`,
            `blood_grenade`,
            `enchanted_mango`,
            `orb_of_venom`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `guardian_greaves`,
            `ultimate_scepter`,
            `holy_locket`,
            `pipe`,
          ],
          late_game: [`lotus_orb`, `octarine_core`, `assault`, `refresher`],
          situational: [
            `spirit_vessel`,
            `aghanims_shard`,
            `glimmer_cape`,
            `force_staff`,
            `cyclone`,
            `pavise`,
            `solar_crest`,
            `black_king_bar`,
            `crimson_guard`,
            `boots_of_bearing`,
            `heavens_halberd`,
            `aeon_disk`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `guardian_greaves`,
            `ultimate_scepter`,
            `holy_locket`,
            `pipe`,
            `octarine_core`,
            `assault`,
          ],
          neutral: [
            `arcane_ring`,
            `trusty_shovel`,
            `bullwhip`,
            `philosophers_stone`,
            `cloak_of_flames`,
            `ogre_seal_totem`,
            `havoc_hammer`,
            `ascetic_cap`,
            `desolator_2`,
            `giants_ring`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2715224221, es: 3160074296 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40472,
        power_level: [2.1, 2.2, 2.5, 2.5],
        abilities: [
          `dawnbreaker_celestial_hammer`, // 1
          `dawnbreaker_fire_wreath`, // 2   equals to `starbreaker`
          `dawnbreaker_celestial_hammer`, // 3
          `dawnbreaker_luminosity`, // 4
          `dawnbreaker_celestial_hammer`, // 5
          "dawnbreaker_solar_guardian", // 6
          `dawnbreaker_celestial_hammer`, // 7
          `dawnbreaker_luminosity`, // 8
          `dawnbreaker_fire_wreath`, // 9
          `dawnbreaker_fire_wreath`, // 10
          `dawnbreaker_fire_wreath`, // 11
          "dawnbreaker_solar_guardian", // 12
          `special_bonus_unique_dawnbreaker_fire_wreath_swipe`, // 13
          "dawnbreaker_luminosity", // 14
          "special_bonus_unique_dawnbreaker_luminosity_crit", // 15
          "dawnbreaker_luminosity", // 16
          "special_bonus_attributes", // 17
          "dawnbreaker_solar_guardian", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dawnbreaker_luminosity_attack_count", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_dawnbreaker_fire_wreath_cooldown", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `branches`,
            `branches`,
            `gauntlets`,
            `gauntlets`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `phase_boots`,
            `soul_ring`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            `echo_sabre`,
            `desolator`,
            `aghanims_shard`,
            `black_king_bar`,
            `blink`,
          ],
          late_game: [`harpoon`, `assault`, `greater_crit`, `satanic`],
          situational: [
            `orb_of_corrosion`,
            `vanguard`,
            `armlet`,
            `spirit_vessel`,
            `crimson_guard`,
            `blade_mail`,
            `ultimate_scepter`,
            `pipe`,
            `guardian_greaves`,
            `heavens_halberd`,
            `bloodthorn`,
            `silver_edge`,
            `abyssal_blade`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `soul_ring`,
            `echo_sabre`,
            `desolator`,
            `aghanims_shard`,
            `black_king_bar`,
            `harpoon`,
            `assault`,
          ],
          neutral: [
            `arcane_ring`,
            `spark_of_courage`,
            `orb_of_destruction`,
            `dragon_scale`,
            "cloak_of_flames",
            `paladin_sword`,
            `havoc_hammer`,
            `trickster_cloak`,
            `desolator_2`,
            `giants_ring`,
          ],
        },
        // ability_tooltips:
        // dawnbreaker_celestial_hammer: `If you can play for a kill, you can put a second point in this spell on level 3 and get Luminosity on Level 4.`,
      },
    ],
    combo: [
      `dawnbreaker_solar_guardian`,
      `dawnbreaker_celestial_hammer`,
      `dawnbreaker_fire_wreath`,
    ],
    counter_items: {
      laning_phase: {
        all: ["urn_of_shadows", "wind_lace", "boots", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          "spirit_vessel",
          /*"medallion_of_courage",*/
          "solar_crest",
          "mekansm",
          "vladmir",
        ],
        support: ["ghost", "glimmer_cape", "force_staff", "cyclone"],
        core: ["silver_edge", "hurricane_pike"],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["shivas_guard", "skadi", "assault", "bloodthorn"],
      },
    },
  },

  // YoonA plays hero
  dazzle: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699917255, es: 3160074371 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40473,
        power_level: [1.8, 1.7, 1.9, 2],
        facet: [1, 2],
        abilities: [
          "dazzle_poison_touch", // 1
          "dazzle_shadow_wave", // 2
          "dazzle_poison_touch", // 3
          "dazzle_shallow_grave", // 4
          `dazzle_shadow_wave`, // 5
          "dazzle_bad_juju", // 6
          `dazzle_shadow_wave`, // 7
          `dazzle_shadow_wave`, // 8
          `dazzle_shallow_grave`, // 9
          `dazzle_shallow_grave`, // 10
          `special_bonus_mp_regen_175`, // 11
          "dazzle_bad_juju", // 12
          `dazzle_shallow_grave`, // 13
          `dazzle_poison_touch`, // 14
          `special_bonus_unique_dazzle_2`, // 15
          `dazzle_poison_touch`, // 16
          "special_bonus_attributes", // 17
          "dazzle_bad_juju", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dazzle_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_dazzle_4", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `wind_lace`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `pavise`,
            `solar_crest`,
            `glimmer_cape`,
            `aghanims_shard`,
            `force_staff`,
          ],
          late_game: [`aether_lens`, `blink`, `aeon_disk`, `wind_waker`],
          situational: [
            `spirit_vessel`,
            `hand_of_midas`,
            `cyclone`,
            `ghost`,
            `mekansm`,
            `boots_of_bearing`,
            `holy_locket`,
            `guardian_greaves`,
            `pipe`,
            `lotus_orb`,
            `sheepstick`,
            `ultimate_scepter`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `solar_crest`,
            `glimmer_cape`,
            `aghanims_shard`,
            `force_staff`,
            `aether_lens`,
            `blink`,
          ],
          neutral: [
            "trusty_shovel",
            `arcane_ring`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ogre_seal_totem`,
            "spy_gadget",
            `trickster_cloak`,
            `seer_stone`,
            `book_of_shadows`,
          ],
        },
      },
    ],
    combo: [], // There is no particular combo for Dazzle
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "wind_lace",
          "boots",
          "armor",
          "urn_of_shadows",
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel", "blink"],
        support: [],
        core: [],
      },
      late_game: {
        all: [],
        support: [],
        core: ["shivas_guard", "skadi"],
      },
    },
  },

  // eidendota plays hero
  death_prophet: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_workshop_ids: { en: 2699917391, es: 3160074440 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40474,
        power_level: [2.1, 2.3, 2.5, 2.4],
        abilities: [
          "death_prophet_carrion_swarm", // 1
          "death_prophet_spirit_siphon", // 2
          "death_prophet_carrion_swarm", // 3 can pick spirit siphon if high kill potential at level 3
          "death_prophet_spirit_siphon", // 4
          "death_prophet_carrion_swarm", // 5
          "death_prophet_exorcism", // 6
          "death_prophet_spirit_siphon", // 7
          "death_prophet_carrion_swarm", // 8
          "death_prophet_silence", // 9 can level silence earlier if required to silence enemy hero
          "death_prophet_spirit_siphon", // 10
          "special_bonus_attack_speed_40", // 11 Talent
          "death_prophet_exorcism", // 12
          "death_prophet_silence", // 13
          "death_prophet_silence", // 14
          "special_bonus_unique_death_prophet_2", // 15 talent
          "death_prophet_silence", // 16
          "special_bonus_attributes", // 17
          "death_prophet_exorcism", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_death_prophet_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_death_prophet", // 25
        ],
        items: {
          starting: [
            "tango",
            "ward_observer",
            "branches",
            "branches",
            "branches",
          ],
          early_game: [
            "bottle",
            "magic_wand", // can consider if enemy midlaner spams spells in lane
            "infused_raindrop", // can consider if enemy has magic bursts
            "arcane_boots",
            "falcon_blade",
            "veil_of_discord",
          ],
          mid_game: ["black_king_bar", "shivas_guard"],
          late_game: [
            "octarine_core",
            "aghanims_shard",
            "blink",
            "wind_waker",
            "travel_boots",
          ],
          situational: [
            "guardian_greaves",
            "force_staff",
            "refresher",
            "sheepstick",
            "overwhelming_blink",
            "sphere",
            "ghost",
          ],
          core: [
            "black_king_bar",
            "shivas_guard",
            "octarine_core",
            "wind_waker",
            "blink",
            "aghanims_shard",
          ],
          neutral: [
            //`quickening_charm`,
            //`spell_prism`,
            //`ex_machina`,
            //tier 1
            "arcane_ring",
            "mysterious_hat",
            "unstable_wand",
            "safety_bubble",
            "occult_bracelet",
            "faded_broach",

            //tier 2
            "dragon_scale",
            "pupils_gift",
            "vambrace",
            "bullwhip",
            "eye_of_the_vizier",

            //tier 3
            "dandelion_amulet",
            "elven_tunic",
            "cloak_of_flames",
            "ceremonial_robe",
            "psychic_headband",
            "ogre_seal_totem",

            //tier 4
            "timeless_relic",
            "ascetic_cap",
            "avianas_feather",
            "stormcrafter",
            "havoc_hammer",
            "rattlecage",

            //tier 5
            "force_boots",
            "seer_stone",
            "mirror_shield",
            "demonicon",
            "giants_ring",
            "panic_button",
          ],
        },
      },
    ],

    combo: [
      "death_prophet_exorcism",
      "black_king_bar",
      "shivas_guard",
      "blink",
      `death_prophet_silence`,
      `death_prophet_spirit_siphon`,
      `death_prophet_carrion_swarm`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "boots", "wind_lace", "infused_raindrop"],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          "lotus_orb",
          "spirit_vessel",
          "force_staff",
          "pipe",
          "blade_mail",
        ],
        support: ["glimmer_cape"],
        core: [
          "black_king_bar",
          "mage_slayer",
          //"hood_of_defiance",
          "eternal_shroud",
          "manta",
          "invis_sword",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: ["abyssal_blade", "shivas_guard", "skadi"],
      },
    },
  },

  // YoonA plays hero
  disruptor: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2700561304, es: 3160076056 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40475,
        power_level: [1.8, 1.9, 2.2, 2.2],
        facet: 1,
        abilities: [
          `disruptor_thunder_strike`, // 1
          `disruptor_glimpse`, // 2
          `disruptor_glimpse`, // 3
          `disruptor_kinetic_field`, // 4
          "disruptor_glimpse", // 5
          "disruptor_static_storm", // 6
          "disruptor_glimpse", // 7
          `disruptor_kinetic_field`, // 8
          `disruptor_kinetic_field`, // 9
          `disruptor_kinetic_field`, // 10
          `special_bonus_unique_disruptor_2`, // 11
          "disruptor_static_storm", // 12
          `disruptor_thunder_strike`, // 13
          `disruptor_thunder_strike`, // 14
          "special_bonus_unique_disruptor_7", // 15
          `disruptor_thunder_strike`, // 16
          "special_bonus_attributes", // 17
          "disruptor_static_storm", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_disruptor_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_disruptor_8", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `clarity`,
            "enchanted_mango",
            `enchanted_mango`,
            `blood_grenade`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `glimmer_cape`,
            `ultimate_scepter`,
            `force_staff`,
            `blink`,
          ],
          late_game: [
            `aghanims_shard`,
            `refresher`,
            `octarine_core`,
            `aeon_disk`,
          ],
          situational: [
            `guardian_greaves`,
            `aether_lens`,
            `lotus_orb`,
            `boots_of_bearing`,
            `pavise`,
            `solar_crest`,
            `ghost`,
            `cyclone`,
            `sheepstick`,
            `ethereal_blade`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `glimmer_cape`,
            `ultimate_scepter`,
            `force_staff`,
            `blink`,
            `refresher`,
            `octarine_core`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ogre_seal_totem`,
            "spy_gadget",
            `ninja_gear`,
            "seer_stone",
            `book_of_shadows`,
          ],
        },
      },
    ],
    combo: [
      `disruptor_thunder_strike`,
      `disruptor_glimpse`,
      `disruptor_kinetic_field`,
      `disruptor_static_storm`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "ring_of_regen", "cloak"],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "blade_mail",
          "black_king_bar",
        ],
      },
      late_game: {
        all: ["wind_waker"],
        support: ["black_king_bar"],
        core: [],
      },
    },
  },

  doom_bringer: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2700561417, es: 3160076106 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40476,
        power_level: [1.4, 1.9, 2.4, 2.5],
        abilities: [
          `doom_bringer_scorched_earth`, // 1
          `doom_bringer_devour`, // 2
          `doom_bringer_scorched_earth`, // 3
          `doom_bringer_infernal_blade`, // 4
          "doom_bringer_scorched_earth", // 5
          "doom_bringer_doom", // 6
          "doom_bringer_scorched_earth", // 7
          `doom_bringer_devour`, // 8
          "doom_bringer_devour", // 9
          `doom_bringer_devour`, // 10
          `special_bonus_unique_doom_4`, // 11
          "doom_bringer_doom", // 12
          "doom_bringer_infernal_blade", // 13
          "doom_bringer_infernal_blade", // 14
          `special_bonus_unique_doom_6`, // 15
          "doom_bringer_infernal_blade", // 16
          "special_bonus_attributes", // 17
          "doom_bringer_doom", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_doom_9`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_doom_10", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `circlet`,
            `magic_stick`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [`phase_boots`, `veil_of_discord`, `magic_wand`],
          mid_game: [`black_king_bar`, `blink`, `shivas_guard`],
          late_game: [
            `octarine_core`,
            `refresher`,
            `overwhelming_blink`,
            "travel_boots",
          ],
          situational: [
            "hand_of_midas",
            "soul_ring",
            `bracer`,
            `ultimate_scepter`,
            `lotus_orb`,
            `pipe`,
            "blade_mail",
            "heavens_halberd",
            `travel_boots_2`,
          ],
          core: [
            `phase_boots`,
            `veil_of_discord`,
            `blink`,
            `black_king_bar`,
            `shivas_guard`,
          ],
          neutral: [
            `arcane_ring`,
            `occult_bracelet`,
            `vambrace`,
            `dragon_scale`,
            `craggy_coat`,
            `cloak_of_flames`,
            "timeless_relic",
            `ninja_gear`,
            "giants_ring",
            `force_boots`,
          ],
        },
      },
    ],
    combo: [
      `doom_bringer_scorched_earth`,
      `blink`,
      `doom_bringer_doom`,
      `doom_bringer_infernal_blade`,
    ],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "wind_lace", "boots"],
        support: [],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["spirit_vessel", "lotus_orb", "cloak"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "black_king_bar",
          `sange_and_yasha`,
        ],
      },
      late_game: {
        all: ["sphere", "wind_waker"],
        support: ["black_king_bar"],
        core: [],
      },
    },
  },

  dragon_knight: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2700561505, es: 3160076186 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40477,
        power_level: [1.5, 2.3, 2.5, 2.4],
        abilities: [
          "dragon_knight_breathe_fire", // 1
          "dragon_knight_dragon_blood", // 2
          "dragon_knight_dragon_blood", // 3
          "dragon_knight_breathe_fire", // 4
          "dragon_knight_dragon_tail", // 5
          "dragon_knight_elder_dragon_form", // 6
          "dragon_knight_breathe_fire", // 7
          "dragon_knight_breathe_fire", // 8
          "dragon_knight_dragon_blood", // 9
          "special_bonus_attack_damage_15", // 10
          "dragon_knight_dragon_blood", // 11
          "dragon_knight_elder_dragon_form", // 12
          "dragon_knight_dragon_tail", // 13
          "dragon_knight_dragon_tail", // 14
          "special_bonus_hp_300", // 15
          "dragon_knight_dragon_tail", // 16
          "special_bonus_attributes", // 17
          "dragon_knight_elder_dragon_form", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dragon_knight_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_dragon_knight_8", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "gauntlets",
            "circlet",
          ],
          early_game: [
            "bracer",
            "soul_ring",
            "power_treads",
            "magic_wand",
            "hand_of_midas",
          ],
          mid_game: ["blink", "aghanims_shard", "black_king_bar"],
          late_game: [
            "ultimate_scepter",
            "assault",
            "greater_crit",
            "overwhelming_blink",
            "octarine_core",
          ],
          situational: ["heavens_halberd", "silver_edge", "mjollnir"],
          core: [
            "power_treads",
            "soul_ring",
            "hand_of_midas",
            "blink",
            "aghanims_shard",
            "black_king_bar",
            "ultimate_scepter",
          ],
          neutral: [
            "duelist_gloves",
            "broom_handle",
            "vambrace",
            "gossamer_cape",
            //"titan_sliver",
            "ogre_seal_totem",
            "ninja_gear",
            //"spell_prism",
            //`fallen_sky`,
            "giants_ring",
          ],
        },
      },
    ],
    combo: [
      "soul_ring",
      "dragon_knight_elder_dragon_form",
      "blink",
      "dragon_knight_dragon_tail",
      "attack",
      "dragon_knight_breathe_fire",
    ],
    counter_items: {
      laning_phase: {
        all: ["infused_raindrop"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel"],
        support: ["glimmer_cape", "force_staff"],
        core: [`maelstrom`, `silver_edge`, `sange_and_yasha`],
      },
      late_game: {
        all: ["sphere"],
        support: [],
        core: ["mjollnir", "skadi", "monkey_king_bar"],
      },
    },
  },

  // eidendota plays hero
  drow_ranger: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2700561590, es: 3160076241 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40478,
        power_level: [1.7, 1.8, 2.6, 2.7],
        abilities: [
          "drow_ranger_frost_arrows", // 1
          "drow_ranger_multishot", // 2
          "drow_ranger_frost_arrows", // 3
          "drow_ranger_wave_of_silence", // 4
          "drow_ranger_multishot", // 5
          "drow_ranger_marksmanship", // 6
          "drow_ranger_multishot", // 7
          "drow_ranger_multishot", // 8
          "drow_ranger_frost_arrows", // 9
          "special_bonus_unique_drow_ranger_2", // 10
          "drow_ranger_frost_arrows", // 11
          "drow_ranger_marksmanship", // 12
          "drow_ranger_wave_of_silence", // 13
          "drow_ranger_wave_of_silence", // 14
          "special_bonus_unique_drow_ranger_6", // 15
          "drow_ranger_wave_of_silence", // 16
          "special_bonus_attributes", // 17
          "drow_ranger_marksmanship", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_drow_ranger_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_drow_ranger_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "slippers",
            "branches",
            "circlet",
            "quelling_blade",
          ],
          early_game: [
            "wraith_band",
            "power_treads",
            "ring_of_basilius",
            "magic_wand",
            "dragon_lance",
          ],
          mid_game: [
            "ultimate_scepter",
            "hurricane_pike",
            "black_king_bar",
            "butterfly",
            "aghanims_shard",
          ],
          late_game: ["swift_blink", "skadi", "satanic"],
          situational: [
            "greater_crit",
            "sphere",
            "mjollnir",
            "hand_of_midas",
            "manta",
            "blink",
          ],
          core: [
            "power_treads",
            "hurricane_pike",
            "ultimate_scepter",
            "black_king_bar",
          ],
          neutral: [
            "lance_of_pursuit",
            "unstable_wand",
            "grove_bow",
            //"ring_of_aquila",
            //"titan_sliver",
            "elven_tunic",
            "ninja_gear",
            "mind_breaker",
            "apex",
            "force_boots",
            "mirror_shield",
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["blink"],
        support: ["glimmer_cape", "force_staff", "ghost"],
        core: ["heavens_halberd", "invis_sword", "manta"],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk"],
        support: [],
        core: ["abyssal_blade"],
      },
    },
  },

  earth_spirit: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2700561679, es: 3160076311 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40561,
        power_level: [1.2, 1.8, 2.1, 2.1],
        facet: 1,
        abilities: [
          `earth_spirit_boulder_smash`, // 1
          `earth_spirit_rolling_boulder`, // 2
          "earth_spirit_boulder_smash", // 3
          `earth_spirit_rolling_boulder`, // 4
          `earth_spirit_boulder_smash`, // 5
          "earth_spirit_magnetize", // 6
          `earth_spirit_geomagnetic_grip`, // 7
          `earth_spirit_rolling_boulder`, // 8
          `earth_spirit_rolling_boulder`, // 9
          "special_bonus_unique_earth_spirit_4", // 10
          `earth_spirit_boulder_smash`, // 11
          "earth_spirit_magnetize", // 12
          "earth_spirit_geomagnetic_grip", // 13
          `earth_spirit_geomagnetic_grip`, // 14
          `special_bonus_unique_earth_spirit_8`, // 15
          `earth_spirit_geomagnetic_grip`, // 16
          "special_bonus_attributes", // 17
          "earth_spirit_magnetize", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_earth_spirit_6`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_earth_spirit_2`, // 25
        ],
        items: {
          starting: [
            "tango",
            `faerie_fire`,
            `blood_grenade`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `urn_of_shadows`,
            "tranquil_boots",
            "magic_wand",
            `infused_raindrop`,
          ],
          mid_game: [
            `spirit_vessel`,
            `veil_of_discord`,
            `aghanims_shard`,
            `black_king_bar`,
            `cyclone`,
          ],
          late_game: [
            `shivas_guard`,
            `blink`,
            `ultimate_scepter`,
            `wind_waker`,
          ],
          situational: [
            `arcane_boots`,
            `pavise`,
            `ghost`,
            `force_staff`,
            `glimmer_cape`,
            `kaya_and_sange`,
            "lotus_orb",
            "heavens_halberd",
            `pipe`,
            `solar_crest`,
            `ethereal_blade`,
            `aeon_disk`,
            `octarine_core`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `urn_of_shadows`,
            `spirit_vessel`,
            `veil_of_discord`,
            `aghanims_shard`,
            `black_king_bar`,
            `shivas_guard`,
            `blink`,
            `ultimate_scepter`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            `dragon_scale`,
            `bullwhip`,
            `ceremonial_robe`,
            `craggy_coat`,
            "timeless_relic",
            `havoc_hammer`,
            `giants_ring`,
            `force_field`,
          ],
        },
      },
    ],
    combo: [
      `earth_spirit_rolling_boulder`,
      `black_king_bar`,
      `earth_spirit_geomagnetic_grip`,
      `earth_spirit_magnetize`,
      `earth_spirit_boulder_smash`,
      `earth_spirit_rolling_boulder`,
      `cyclone`,
      `earth_spirit_rolling_boulder`,
    ],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "cloak"],
        support: ["ward_observer", "tranquil_boots"],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["cyclone", "lotus_orb"],
        support: ["glimmer_cape"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "mage_slayer",
          "black_king_bar",
          "manta",
        ],
      },
      late_game: { all: [], support: ["black_king_bar"], core: [] },
    },
  },

  earthshaker: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2700561769, es: 3160076368 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40586,
        power_level: [0.7, 2.1, 2.4, 2.4],
        abilities: [
          "earthshaker_fissure", // 1
          "earthshaker_enchant_totem", // 2
          `earthshaker_aftershock`, // 3
          `earthshaker_fissure`, // 4
          `earthshaker_fissure`, // 5
          "earthshaker_echo_slam", // 6
          `earthshaker_aftershock`, // 7
          "earthshaker_aftershock", // 8
          `earthshaker_aftershock`, // 9
          `earthshaker_fissure`, // 10
          "special_bonus_unique_earthshaker_4", // 11
          "earthshaker_echo_slam", // 12
          "earthshaker_enchant_totem", // 13
          "earthshaker_enchant_totem", // 14
          `special_bonus_unique_earthshaker_3`, // 15
          "earthshaker_enchant_totem", // 16
          "special_bonus_attributes", // 17
          "earthshaker_echo_slam", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_earthshaker_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_earthshaker`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `clarity`,
            `wind_lace`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `blink`,
            `aghanims_shard`,
            `force_staff`,
            `cyclone`,
          ],
          late_game: [
            `octarine_core`,
            `refresher`,
            `ultimate_scepter`,
            `overwhelming_blink`,
          ],
          situational: [
            `soul_ring`,
            `tranquil_boots`,
            `aether_lens`,
            `boots_of_bearing`,
            `aeon_disk`,
            `black_king_bar`,
            `invis_sword`,
            `ghost`,
            `ethereal_blade`,
            `lotus_orb`,
            `greater_crit`,
            `arcane_blink`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `blink`,
            `aghanims_shard`,
            `force_staff`,
            `cyclone`,
            `octarine_core`,
            `refresher`,
            `ultimate_scepter`,
          ],
          neutral: [
            `faded_broach`,
            `arcane_ring`,
            "philosophers_stone",
            "bullwhip",
            `ogre_seal_totem`,
            `ceremonial_robe`,
            "timeless_relic",
            `ninja_gear`,
            `force_boots`,
            "giants_ring",
          ],
        },
      },
    ],
    // item_tooltips: {
    //smoke_of_deceit: `Lets your roam between lanes to ward and find kills across the map.`,
    combo: [
      `earthshaker_enchant_totem`,
      `earthshaker_fissure`,
      `blink`,
      `attack`,
      `earthshaker_echo_slam`,
      `earthshaker_enchant_totem`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: ["cloak"],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: [],
      },
    },
  },

  elder_titan: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2700561834, es: 3160076447 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40595,
        power_level: [1.6, 1.7, 2.2, 2.1],
        abilities: [
          "elder_titan_ancestral_spirit", // 1
          "elder_titan_natural_order", // 2
          `elder_titan_ancestral_spirit`, // 3
          "elder_titan_echo_stomp", // 4
          "elder_titan_echo_stomp", // 5
          "elder_titan_earth_splitter", // 6
          "elder_titan_echo_stomp", // 7
          `elder_titan_echo_stomp`, // 8
          "elder_titan_natural_order", // 9
          "elder_titan_natural_order", // 10
          `elder_titan_natural_order`, // 11
          "elder_titan_earth_splitter", // 12
          "elder_titan_ancestral_spirit", // 13
          "elder_titan_ancestral_spirit", // 14
          `special_bonus_attack_speed_25`, // 15
          "special_bonus_unique_elder_titan", // 16
          "special_bonus_attributes", // 17
          "elder_titan_earth_splitter", // 18
          "special_bonus_attributes", // 19
          "special_bonus_cleave_100", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_elder_titan_3`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `wind_lace`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `tranquil_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `pavise`,
            `solar_crest`,
            `boots_of_bearing`,
            `vladmir`,
            `ultimate_scepter`,
          ],
          late_game: [
            `aghanims_shard`,
            `greater_crit`,
            `abyssal_blade`,
            `assault`,
          ],
          situational: [
            `orb_of_venom`,
            `phase_boots`,
            `spirit_vessel`,
            `force_staff`,
            `pipe`,
            `guardian_greaves`,
            `glimmer_cape`,
            `ghost`,
            `cyclone`,
            `lotus_orb`,
            `shivas_guard`,
            `heavens_halberd`,
            `refresher`,
            `octarine_core`,
            `sheepstick`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `solar_crest`,
            `boots_of_bearing`,
            `vladmir`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `greater_crit`,
            `abyssal_blade`,
          ],
          neutral: [
            `arcane_ring`,
            `faded_broach`,
            "bullwhip",
            `philosophers_stone`,
            `ogre_seal_totem`,
            `cloak_of_flames`,
            `havoc_hammer`,
            `trickster_cloak`,
            "pirate_hat",
            "desolator_2",
          ],
        },
      },
    ],
    combo: [
      `elder_titan_ancestral_spirit`,
      `elder_titan_echo_stomp`,
      `elder_titan_earth_splitter`,
      `elder_titan_return_spirit`,
    ],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "wind_lace", "boots", "armor"],
        support: [],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: [/*"medallion_of_courage",*/ "solar_crest"],
        support: ["force_staff", "glimmer_cape"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
        ],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["assault", "butterfly"],
      },
    },
  },

  // eidendota plays hero
  ember_spirit: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2700561902, es: 3160076515 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40607,
        power_level: [1.6, 2.1, 2.5, 2.3],
        abilities: [
          "ember_spirit_flame_guard", // 1
          "ember_spirit_sleight_of_fist", // 2
          "ember_spirit_sleight_of_fist", // 3
          "ember_spirit_flame_guard", // 4
          "ember_spirit_sleight_of_fist", // 5
          "ember_spirit_fire_remnant", // 6
          "ember_spirit_sleight_of_fist", // 7
          "ember_spirit_searing_chains", // 8
          "ember_spirit_searing_chains", // 9
          "ember_spirit_searing_chains", // 10
          "ember_spirit_searing_chains", // 11
          "ember_spirit_flame_guard", // 12
          "ember_spirit_flame_guard", // 13
          "ember_spirit_fire_remnant", // 14
          "special_bonus_unique_ember_spirit_1", // 15
          "special_bonus_unique_ember_spirit_3", // 16
          "special_bonus_attributes", // 17
          "ember_spirit_fire_remnant", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_ember_spirit_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_ember_spirit_4", // 25
        ],
        items: {
          starting: [
            "quelling_blade",
            "branches",
            "branches",
            "faerie_fire",
            "tango",
            "ward_observer",
          ],
          early_game: [
            "bottle",
            "blight_stone",
            "phase_boots",
            "magic_wand",
            "mage_slayer",
          ],
          mid_game: [
            "maelstrom",
            "black_king_bar",
            "shivas_guard",
            "aghanims_shard",
          ],
          late_game: [
            "octarine_core",
            "gungir",
            "refresher",
            "ultimate_scepter",
          ],
          situational: [
            "sphere",
            "sheepstick",
            "travel_boots",
            "kaya_and_sange",
          ],
          core: [
            "phase_boots",
            "mage_slayer",
            "maelstrom",
            "black_king_bar",
            "shivas_guard",
            "aghanims_shard",
            "octarine_core",
          ],
          neutral: [
            "arcane_ring",
            "unstable_wand",
            //"ring_of_aquila",
            "orb_of_destruction",
            //`quickening_charm`,
            "cloak_of_flames",
            "mind_breaker",
            //"spell_prism",
            //"penta_edged_sword",
            "desolator_2",
            "mirror_shield",
            //`ex_machina`,
          ],
        },
      },
    ],
    combo: [
      "ember_spirit_flame_guard",
      "ember_spirit_fire_remnant",
      "ember_spirit_searing_chains",
      "ember_spirit_sleight_of_fist",
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "magic_stick"],
        support: [],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["cyclone", "mekansm", "rod_of_atos"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          //"hood_of_defiance",
          "orchid",
          "black_king_bar",
          "manta",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: ["abyssal_blade"],
      },
    },
  },

  enchantress: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2700561968, es: 3160076582 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40565,
        power_level: [2.3, 2, 2.1, 1.8],
        facet: 2,
        abilities: [
          `enchantress_enchant`, // 1
          `enchantress_impetus`, // 2
          "enchantress_enchant", // 3
          `enchantress_natures_attendants`, // 4
          `enchantress_enchant`, // 5
          `enchantress_impetus`, // 6
          `enchantress_enchant`, // 7
          `enchantress_impetus`, // 8
          `enchantress_impetus`, // 9
          `enchantress_untouchable`, // 10
          `enchantress_natures_attendants`, // 11
          "enchantress_untouchable", // 12
          `enchantress_natures_attendants`, // 13
          `enchantress_natures_attendants`, // 14
          `special_bonus_unique_enchantress_6`, // 15
          `special_bonus_attack_damage_45`, // 16
          "special_bonus_attributes", // 17
          "enchantress_untouchable", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_enchantress_3`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_enchantress_4`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `null_talisman`,
            `power_treads`,
            `magic_wand`,
            `infused_raindrop`,
            `fluffy_hat`,
          ],
          mid_game: [
            `force_staff`,
            `dragon_lance`,
            `hurricane_pike`,
            `aghanims_shard`,
            `eternal_shroud`,
          ],
          late_game: [
            `ultimate_scepter`,
            `black_king_bar`,
            `sheepstick`,
            `monkey_king_bar`,
          ],
          situational: [
            `ring_of_basilius`,
            `tranquil_boots`,
            `spirit_vessel`,
            `witch_blade`,
            `mage_slayer`,
            `pavise`,
            `solar_crest`,
            `holy_locket`,
            `ancient_janggo`,
            `glimmer_cape`,
            `cyclone`,
            `ghost`,
            `pipe`,
            `boots_of_bearing`,
            `lotus_orb`,
            `shivas_guard`,
            `bloodthorn`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `power_treads`,
            `hurricane_pike`,
            `aghanims_shard`,
            `eternal_shroud`,
            `ultimate_scepter`,
            `black_king_bar`,
            `sheepstick`,
          ],
          neutral: [
            "trusty_shovel",
            `seeds_of_serenity`,
            `grove_bow`,
            `pupils_gift`,
            `enchanted_quiver`,
            `vindicators_axe`,
            "spy_gadget",
            `trickster_cloak`,
            `pirate_hat`,
            `demonicon`,
          ],
        },
      },
    ],
    combo: [
      `enchantress_natures_attendants`,
      `enchantress_enchant`,
      `enchantress_impetus`,
    ],
    counter_items: {
      laning_phase: {
        all: ["ring_of_regen"],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel"],
        support: ["glimmer_cape", "ghost"],
        core: ["black_king_bar", "silver_edge"],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["butterfly"],
      },
    },
  },

  enigma: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2700562081, es: 3160076644 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40575,
        power_level: [1.5, 1.9, 2.6, 2.8],
		facet: 1,
        abilities: [
          `enigma_demonic_conversion`, // 1
          `enigma_malefice`, // 2
          "enigma_demonic_conversion", // 3
          "enigma_malefice", // 4
          "enigma_demonic_conversion", // 5
          "enigma_black_hole", // 6
          "enigma_demonic_conversion", // 7
          `enigma_malefice`, // 8
          `enigma_malefice`, // 9
          `special_bonus_unique_enigma_4`, // 10
          `enigma_midnight_pulse`, // 11
          `enigma_black_hole`, // 12
          `enigma_midnight_pulse`, // 13
          `enigma_midnight_pulse`, // 14
          `special_bonus_hp_250`, // 15
          `enigma_midnight_pulse`, // 16
          "special_bonus_attributes", // 17
          "enigma_black_hole", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_enigma_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_enigma`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
			`magic_wand`,
			`ring_of_basilius`,
			`vladmir`,
            `boots`,
            `wind_lace`,
          ],
          mid_game: [
            `ancient_janggo`,
            `tranquil_boots`,
			`boots_of_bearing`,
            `blink`,
            `aghanims_shard`,
          ],
          late_game: [
            `black_king_bar`,
            `refresher`,
            `octarine_core`,
            `ultimate_scepter`,
          ],
          situational: [
            `urn_of_shadows`,
			`spirit_vessel`,
			`arcane_boots`,
            `veil_of_discord`,
            `hand_of_midas`,
            `soul_ring`,
			`mekansm`,
            `sphere`,
            `aeon_disk`,
            `invis_sword`,
            `helm_of_the_overlord`,
            `shivas_guard`,
			`guardian_greaves`,
            `pipe`,
            `aether_lens`,
            `force_staff`,
            `ethereal_blade`,
            `overwhelming_blink`,
            `arcane_blink`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `vladmir`,
            `boots_of_bearing`,
			`blink`,
            `aghanims_shard`,
            `black_king_bar`,
            `refresher`,
          ],
          neutral: [
            `faded_broach`,
            `arcane_ring`,
            "philosophers_stone",
            `bullwhip`,
            `psychic_headband`,
            `ceremonial_robe`,
            `ninja_gear`,
            `timeless_relic`,
            `seer_stone`,
            `panic_button`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2712384931, es: 3160076706 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40576,
        power_level: [1.3, 1.8, 2.3, 2.6],
		facet: 1,
        abilities: [
          "enigma_demonic_conversion", // 1
          "enigma_malefice", // 2
          "enigma_demonic_conversion", // 3
          "enigma_malefice", // 4
          "enigma_demonic_conversion", // 5
          "enigma_black_hole", // 6
          `enigma_demonic_conversion`, // 7
          `enigma_malefice`, // 8
          `enigma_malefice`, // 9
          `special_bonus_unique_enigma_6`, // 10
          `enigma_midnight_pulse`, // 11
          `enigma_black_hole`, // 12
          `enigma_midnight_pulse`, // 13
          `enigma_midnight_pulse`, // 14
          `special_bonus_hp_250`, // 15
          `enigma_midnight_pulse`, // 16
          "special_bonus_attributes", // 17
          "enigma_black_hole", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_enigma_9`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_enigma_2`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
			`faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `urn_of_shadows`,
            `wind_lace`,
          ],
          mid_game: [
            `arcane_boots`,
			`mekansm`,
            `blink`,
			`guardian_greaves`,
            `vladmir`,
            `black_king_bar`,
          ],
          late_game: [
            `aghanims_shard`,
			`refresher`,
            `octarine_core`,
            `ultimate_scepter`,
          ],
          situational: [
            `spirit_vessel`,
            `hand_of_midas`,
            `pavise`,
            `solar_crest`,
			`ancient_janggo`,
            `sphere`,
			`aeon_disk`,
            `invis_sword`,
            `shivas_guard`,
            `pipe`,
            `force_staff`,
            `aether_lens`,
            `overwhelming_blink`,
            `arcane_blink`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `blink`,
			`guardian_greaves`,
            `vladmir`,
            `black_king_bar`,
            `aghanims_shard`,
            `refresher`,
          ],
          neutral: [
            `faded_broach`,
            `arcane_ring`,
            `philosophers_stone`,
            `bullwhip`,
            `psychic_headband`,
            `ceremonial_robe`,
            `ninja_gear`,
            `timeless_relic`,
            `seer_stone`,
            `panic_button`,
          ],
        },
      },
    ],
    combo: [
      `enigma_demonic_conversion`,
      `black_king_bar`,
      `blink`,
      `enigma_midnight_pulse`,
      `enigma_black_hole`,
      `enigma_malefice`,
    ],
    counter_items: {
      laning_phase: {
        all: ["blight_stone"],
        support: ["ward_sentry"],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["cloak"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
        ],
      },
      late_game: {
        all: ["aeon_disk", "sheepstick", "wind_waker"],
        support: [],
        core: ["abyssal_blade"],
      },
    },
  },

  // eidendota plays hero
  faceless_void: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2700562159, es: 3160076795 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40599,
        power_level: [1.1, 1.7, 2.7, 2.9],
        abilities: [
          "faceless_void_time_walk", // 1
          "faceless_void_time_lock", // 2
          "faceless_void_time_lock", // 3
          "faceless_void_time_dilation", // 4
          "faceless_void_time_lock", // 5
          "faceless_void_chronosphere", // 6
          "faceless_void_time_lock", // 7
          "faceless_void_time_walk", // 8
          "faceless_void_time_walk", // 9
          "faceless_void_time_walk", // 10
          "faceless_void_time_dilation", // 11
          "faceless_void_chronosphere", // 12
          "faceless_void_time_dilation", // 13
          "faceless_void_time_dilation", // 14
          "special_bonus_unique_faceless_void_7", // 15
          "special_bonus_unique_faceless_void_3", // 16
          "special_bonus_attributes", // 17
          "faceless_void_chronosphere", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_faceless_void", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_faceless_void_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "slippers",
            "circlet",
          ],
          early_game: [
            "wraith_band",
            "power_treads",
            "magic_wand",
            "mask_of_madness",
          ],
          mid_game: [
            `maelstrom`,
            `yasha`,
            `black_king_bar`,
            `manta`,
            `aghanims_shard`,
          ],
          late_game: [
            `mjollnir`,
            `butterfly`,
            `skadi`,
            "refresher",
            "greater_crit",
          ],
          situational: [
            "hand_of_midas",
            "sphere",
            "monkey_king_bar",
            `sange_and_yasha`,
            `blink`,
            `silver_edge`,
            `diffusal_blade`,
            `ultimate_scepter`,
            `satanic`,
            `nullifier`,
            `disperser`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            "power_treads",
            "mask_of_madness",
            `maelstrom`,
            "black_king_bar",
            `aghanims_shard`,
            `mjollnir`,
            `butterfly`,
            `skadi`,
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "lance_of_pursuit",
            "broom_handle",
            //"misericorde",
            //"dagger_of_ristul", Removed in 7.33
            //"ring_of_aquila",
            "vambrace",
            "elven_tunic",
            //"titan_sliver",
            "mind_breaker",
            "ninja_gear",
            "pirate_hat",
            "apex",
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["blink", "spirit_vessel", "cyclone", "rod_of_atos"],
        support: ["glimmer_cape", "ghost"],
        core: ["manta"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "aeon_disk", "wind_waker"],
        support: [],
        core: ["abyssal_blade", "butterfly"],
      },
    },
  },

  grimstroke: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2700562245, es: 3160076873 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40596,
        power_level: [2, 2, 2.2, 2],
        facet: 1,
        abilities: [
          "grimstroke_dark_artistry", // 1   equals to `stroke of faith`
          "grimstroke_spirit_walk", // 2   equals to `ink swell`
          "grimstroke_spirit_walk", // 3
          "grimstroke_ink_creature", // 4   equals to `phantom`s embrace`
          "grimstroke_spirit_walk", // 5
          `grimstroke_soul_chain`, // 6
          "grimstroke_spirit_walk", // 7
          `grimstroke_ink_creature`, // 8
          `grimstroke_ink_creature`, // 9
          `special_bonus_unique_grimstroke_7`, // 10
          `grimstroke_dark_artistry`, // 11
          "grimstroke_soul_chain", // 12
          `grimstroke_dark_artistry`, // 13
          `grimstroke_dark_artistry`, // 14
          `special_bonus_unique_grimstroke_6`, // 15
          "grimstroke_ink_creature", // 16
          "special_bonus_attributes", // 17
          "grimstroke_soul_chain", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_grimstroke_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_grimstroke_1", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            "enchanted_mango",
            `enchanted_mango`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            "magic_wand",
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `aether_lens`,
            "aghanims_shard",
            `force_staff`,
            `blink`,
          ],
          late_game: [
            "ultimate_scepter",
            `sheepstick`,
            `octarine_core`,
            `ethereal_blade`,
          ],
          situational: [
            `guardian_greaves`,
            `aeon_disk`,
            `boots_of_bearing`,
            `cyclone`,
            `glimmer_cape`,
            `ghost`,
            `dagon_5`,
            `phylactery`,
            `lotus_orb`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            `aghanims_shard`,
            `force_staff`,
            `blink`,
            `ultimate_scepter`,
            `sheepstick`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            `philosophers_stone`,
            `eye_of_the_vizier`,
            `ogre_seal_totem`,
            `psychic_headband`,
            `timeless_relic`,
            `spy_gadget`,
            `force_boots`,
            `seer_stone`,
          ],
        },
      },
    ],
    combo: [
      `grimstroke_soul_chain`,
      `ethereal_blade`,
      `grimstroke_ink_creature`,
      `grimstroke_spirit_walk`,
      `grimstroke_dark_artistry`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "wind_lace",
          "boots",
          "headdress",
          "infused_raindrop",
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["cyclone", "lotus_orb", "cloak"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
        ],
      },
      late_game: {
        all: ["sphere"],
        support: ["black_king_bar"],
        core: [],
      },
    },
  },

  // YoonA plays hero
  gyrocopter: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2700562334, es: 3160076933 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40597,
        power_level: [1.8, 1.9, 2.6, 2.8],
        facet: 2,
        abilities: [
          `gyrocopter_flak_cannon`, // 1
          `gyrocopter_rocket_barrage`, // 2
          `gyrocopter_rocket_barrage`, // 3
          `gyrocopter_homing_missile`, // 4
          `gyrocopter_rocket_barrage`, // 5
          "gyrocopter_call_down", // 6
          `gyrocopter_rocket_barrage`, // 7
          `gyrocopter_flak_cannon`, // 8
          `gyrocopter_flak_cannon`, // 9
          `gyrocopter_flak_cannon`, // 10
          `special_bonus_hp_175`, // 11
          "gyrocopter_call_down", // 12
          `gyrocopter_homing_missile`, // 13
          `gyrocopter_homing_missile`, // 14
          "special_bonus_unique_gyrocopter_flak_cannon_bonus_damage", // 15
          `special_bonus_attributes`, // 16
          `special_bonus_attributes`, // 17
          "gyrocopter_call_down", // 18
          `special_bonus_attributes`, // 19
          "special_bonus_unique_gyrocopter_2", // 20
          `special_bonus_attributes`, // 21
          `special_bonus_attributes`, // 22
          `special_bonus_attributes`, // 23
          `special_bonus_attributes`, // 24
          "special_bonus_unique_gyrocopter_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            `wraith_band`,
            `falcon_blade`,
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `lesser_crit`,
            "ultimate_scepter",
            `satanic`,
            `black_king_bar`,
          ],
          late_game: [`greater_crit`, `butterfly`, `swift_blink`, `rapier`],
          situational: [
            `ring_of_basilius`,
            `mask_of_madness`,
            `maelstrom`,
            `diffusal_blade`,
            `dragon_lance`,
            `hurricane_pike`,
            `monkey_king_bar`,
            `silver_edge`,
            `mjollnir`,
            `sange_and_yasha`,
            `manta`,
            `skadi`,
            `blink`,
            `sphere`,
            `aghanims_shard`,
            `nullifier`,
            `disperser`,
            `travel_boots`,
          ],
          core: [
            `falcon_blade`,
            `power_treads`,
            `lesser_crit`,
            `ultimate_scepter`,
            `satanic`,
            `greater_crit`,
            `butterfly`,
          ],
          neutral: [
            `duelist_gloves`,
            "unstable_wand",
            "grove_bow",
            `specialists_array`,
            "paladin_sword",
            "elven_tunic",
            "mind_breaker",
            `ancient_guardian`,
            `apex`,
            `pirate_hat`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2712385902, es: 3160077008 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40598,
        power_level: [1.8, 2.1, 2.1, 2],
        facet: [1, 2],
        abilities: [
          `gyrocopter_rocket_barrage`, // 1
          `gyrocopter_homing_missile`, // 2
          "gyrocopter_rocket_barrage", // 3
          "gyrocopter_homing_missile", // 4
          "gyrocopter_rocket_barrage", // 5
          "gyrocopter_call_down", // 6
          "gyrocopter_rocket_barrage", // 7
          "gyrocopter_homing_missile", // 8
          "gyrocopter_homing_missile", // 9
          `special_bonus_unique_gyrocopter_homing_missile_damage`, // 10
          `special_bonus_attributes`, // 11
          "gyrocopter_call_down", // 12
          `special_bonus_attributes`, // 13
          `special_bonus_attributes`, // 14
          "special_bonus_unique_gyrocopter_6", // 15
          `special_bonus_attributes`, // 16
          "special_bonus_attributes", // 17
          "gyrocopter_call_down", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_gyrocopter_3", // 20
          `gyrocopter_flak_cannon`, // 21
          `gyrocopter_flak_cannon`, // 22
          `gyrocopter_flak_cannon`, // 23
          `gyrocopter_flak_cannon`, // 24
          "special_bonus_unique_gyrocopter_5", // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `mekansm`,
            `guardian_greaves`,
            `aghanims_shard`,
            `force_staff`,
            `aether_lens`,
          ],
          late_game: [`ethereal_blade`, `blink`, `octarine_core`, `refresher`],
          situational: [
            `tranquil_boots`,
            `spirit_vessel`,
            `veil_of_discord`,
            `pavise`,
            `solar_crest`,
            `glimmer_cape`,
            `cyclone`,
            `ancient_janggo`,
            `vladmir`,
            `boots_of_bearing`,
            `phylactery`,
            `lotus_orb`,
            `sheepstick`,
            `shivas_guard`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `guardian_greaves`,
            `aghanims_shard`,
            `force_staff`,
            `ethereal_blade`,
            `blink`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `faded_broach`,
            "philosophers_stone",
            `bullwhip`,
            `psychic_headband`,
            `ceremonial_robe`,
            "timeless_relic",
            `spy_gadget`,
            `force_boots`,
            `seer_stone`,
          ],
        },
      },
    ],
    combo: [
      `gyrocopter_call_down`,
      `gyrocopter_homing_missile`,
      `gyrocopter_rocket_barrage`,
      `gyrocopter_flak_cannon`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "wind_lace", "boots", "headdress"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["mekansm", "lotus_orb", "cloak"],
        support: ["glimmer_cape", "force_staff", "ghost", "cyclone"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
        ],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["assault", "butterfly"],
      },
    },
  },

  hoodwink: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2700562407, es: 3160077075 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40600,
        power_level: [2.1, 2.1, 2.2, 2.1],
        facet: 1,
        abilities: [
          `hoodwink_acorn_shot`, // 1
          `hoodwink_bushwhack`, // 2
          `hoodwink_acorn_shot`, // 3
          "hoodwink_scurry", // 4
          "hoodwink_bushwhack", // 5
          "hoodwink_sharpshooter", // 6
          `hoodwink_acorn_shot`, // 7
          "hoodwink_acorn_shot", // 8
          `hoodwink_bushwhack`, // 9
          `hoodwink_bushwhack`, // 10
          `special_bonus_unique_hoodwink_bushwhack_cooldown`, // 11
          "hoodwink_sharpshooter", // 12
          "hoodwink_scurry", // 13
          "hoodwink_scurry", // 14
          `special_bonus_unique_hoodwink_acorn_shot_bounces`, // 15
          "hoodwink_scurry", // 16
          "special_bonus_attributes", // 17
          "hoodwink_sharpshooter", // 18
          "special_bonus_attributes", // 19
          `special_bonus_corruption_4`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_hoodwink_acorn_shot_charges`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            "branches",
            "branches",
            "circlet",
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `rod_of_atos`,
            `gungir`,
            `force_staff`,
            `aghanims_shard`,
          ],
          late_game: [`blink`, `greater_crit`, `hurricane_pike`, `sheepstick`],
          situational: [
            `veil_of_discord`,
            `spirit_vessel`,
            `aether_lens`,
            `maelstrom`,
            `mage_slayer`,
            `glimmer_cape`,
            `pavise`,
            `solar_crest`,
            `mekansm`,
            `ghost`,
            `guardian_greaves`,
            `lotus_orb`,
            `cyclone`,
            `aeon_disk`,
            `octarine_core`,
            `ethereal_blade`,
            `wind_waker`,
            `desolator`,
            `ultimate_scepter`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `gungir`,
            `force_staff`,
            `aghanims_shard`,
            `blink`,
            `greater_crit`,
            `sheepstick`,
          ],
          neutral: [
            `arcane_ring`,
            `mysterious_hat`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            `ceremonial_robe`,
            "psychic_headband",
            `timeless_relic`,
            `spy_gadget`,
            "seer_stone",
            `desolator_2`,
          ],
        },
      },
    ],
    combo: [
      `hoodwink_scurry`,
      `hoodwink_acorn_shot`,
      `hoodwink_bushwhack`,
      `hoodwink_sharpshooter`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "quelling_blade",
          "infused_raindrop",
          "cloak",
          "blade_mail",
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          /* "hood_of_defiance", */
          "pipe",
          "mekansm",

          "rod_of_atos",
          "blink",
        ],
        support: ["glimmer_cape", "SentryDustGem"],
        core: [`orchid`, `black_king_bar`, `witch_blade`],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          "abyssal_blade",
          "skadi",
          "assault",
          "bloodthorn",
          "monkey_king_bar",
          "sheepstick",
        ],
      },
    },
  },

  huskar: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [
          DOTA_COACH_GUIDE_ROLE.CARRY,
          DOTA_COACH_GUIDE_ROLE.MID,
          DOTA_COACH_GUIDE_ROLE.OFFLANE,
        ],
        steam_guide_workshop_ids: { en: 2700562484, es: 3160077143 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40603,
        power_level: [2.6, 2.7, 2.4, 1.9],
        abilities: [
          `huskar_inner_fire`, // 1
          "huskar_berserkers_blood", // 2
          "huskar_burning_spear", // 3
          `huskar_burning_spear`, // 4
          `huskar_berserkers_blood`, // 5
          "huskar_life_break", // 6
          `huskar_berserkers_blood`, // 7
          `huskar_burning_spear`, // 8
          `huskar_burning_spear`, // 9
          `huskar_berserkers_blood`, // 10
          "huskar_inner_fire", // 11
          `huskar_life_break`, // 12
          "huskar_inner_fire", // 13
          `huskar_inner_fire`, // 14
          `special_bonus_unique_huskar_3`, // 15
          `special_bonus_unique_huskar_2`, // 16
          "special_bonus_attributes", // 17
          "huskar_life_break", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_huskar_7`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_huskar_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "gauntlets",
            "gauntlets",
            `gauntlets`,
            `ward_observer`,
          ],
          early_game: [`boots`, `magic_wand`, `helm_of_iron_will`, `armlet`],
          mid_game: [
            "sange",
            `black_king_bar`,
            `ultimate_scepter`,
            `travel_boots`,
            `heavens_halberd`,
          ],
          late_game: [`satanic`, `blink`, `aghanims_shard`, `assault`],
          situational: [
            `bracer`,
            `power_treads`,
            `phase_boots`,
            `mage_slayer`,
            `dragon_lance`,
            `hurricane_pike`,
            `octarine_core`,
            `sange_and_yasha`,
            `heart`,
            `monkey_king_bar`,
            `silver_edge`,
            `lotus_orb`,
            `sphere`,
            `overwhelming_blink`,
            `travel_boots_2`,
          ],
          core: [
            `boots`,
            `armlet`,
            `sange`,
            `black_king_bar`,
            `ultimate_scepter`,
            `travel_boots`,
            `heavens_halberd`,
            `satanic`,
          ],
          neutral: [
            `safety_bubble`,
            `spark_of_courage`,
            "grove_bow",
            `vampire_fangs`,
            "paladin_sword",
            `elven_tunic`,
            "trickster_cloak",
            `mind_breaker`,
            "giants_ring",
            `apex`,
          ],
        },
      },
    ],
    combo: [`armlet`, `huskar_life_break`, `attack`, `huskar_inner_fire`],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "wind_lace", "boots", "urn_of_shadows", "cloak"],
        support: [],
        core: ["orb_of_corrosion", "ring_of_health"],
      },
      mid_game: {
        all: ["spirit_vessel"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "blade_mail",
          "pipe",
          "eternal_shroud",
          "heavens_halberd",
          "hurricane_pike",
          "black_king_bar",
          "silver_edge",
          "manta",
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          "skadi",
          "shivas_guard",
          "bloodthorn",
          "butterfly",
          "abyssal_blade",
        ],
      },
    },
  },

  invoker: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        // Midlane Quas Wex Invoker build | If an app user choses to play Invoker on non-mid role, this guide should be suggested over the other one
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "QW",
        steam_guide_workshop_ids: { en: 2700562552, es: 3160077198 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40632,
        power_level: [1.8, 2.1, 2.4, 2.8],
        facet: 2,
        abilities: [
          `invoker_wex`, // 1
          `invoker_quas`, // 2
          `invoker_wex`, // 3
          `invoker_quas`, // 4
          "invoker_wex", // 5
          `invoker_exort`, // 6
          "invoker_wex", // 7
          "invoker_quas", // 8
          "invoker_wex", // 9
          `invoker_quas`, // 10
          `invoker_wex`, // 11
          "invoker_exort", // 12
          `invoker_wex`, // 13
          "invoker_exort", // 14
          "invoker_exort", // 15
          "invoker_exort", // 16
          `invoker_exort`, // 17
          `invoker_exort`, // 18
          `special_bonus_unique_invoker_3`, // 19
          `special_bonus_unique_invoker_11`, // 20
          `special_bonus_unique_invoker_additional_chaos_meteors`, // 21
          `invoker_quas`, // 22
          "invoker_quas", // 23
          "invoker_quas", // 24
          "special_bonus_unique_invoker_13", // 25
        ],
        items: {
          starting: [
            "tango",
            `faerie_fire`,
            `circlet`,
            "circlet",
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: [
            `bracer`,
            `boots`,
            `magic_wand`,
            `urn_of_shadows`,
            `wind_lace`,
          ],
          mid_game: [
            `spirit_vessel`,
            `hand_of_midas`,
            `travel_boots`,
            `hurricane_pike`,
            `black_king_bar`,
          ],
          late_game: [
            `aghanims_shard`,
            `blink`,
            `sheepstick`,
            `ultimate_scepter`,
            `refresher`,
          ],
          situational: [
            `blood_grenade`,
            `power_treads`,
            `veil_of_discord`,
            `falcon_blade`,
            `mage_slayer`,
            `witch_blade`,
            `devastator`,
            `maelstrom`,
            `gungir`,
            `orchid`,
            `bloodthorn`,
            `ancient_janggo`,
            `pavise`,
            `solar_crest`,
            `force_staff`,
            `cyclone`,
            `revenants_brooch`,
            `ethereal_blade`,
            `manta`,
            `shivas_guard`,
            `sphere`,
            `aeon_disk`,
            `skadi`,
            `mjollnir`,
            `greater_crit`,
            `swift_blink`,
            `overwhelming_blink`,
            `travel_boots_2`,
          ],
          core: [
            `bracer`,
            `boots`,
            `spirit_vessel`,
            `hand_of_midas`,
            `travel_boots`,
            `black_king_bar`,
            `aghanims_shard`,
            `blink`,
            `sheepstick`,
          ],
          neutral: [
            `unstable_wand`,
            `arcane_ring`,
            "grove_bow",
            `pupils_gift`,
            `enchanted_quiver`,
            `ceremonial_robe`,
            `timeless_relic`,
            `stormcrafter`,
            `pirate_hat`,
            `apex`,
          ],
        },
      },
      {
        // Midlane Quas Exort Invoker build
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "QE",
        steam_guide_workshop_ids: { en: 2711948373, es: 3160077282 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40631,
        power_level: [1.7, 1.9, 2.6, 2.8],
        facet: 2,
        abilities: [
          "invoker_exort", // 1
          "invoker_quas", // 2
          "invoker_exort", // 3
          "invoker_quas", // 4
          "invoker_exort", // 5
          `invoker_wex`, // 6
          "invoker_exort", // 7
          `invoker_quas`, // 8
          "invoker_exort", // 9
          `invoker_quas`, // 10
          "invoker_exort", // 11
          "invoker_wex", // 12
          "invoker_exort", // 13
          "invoker_wex", // 14
          "invoker_wex", // 15
          "invoker_wex", // 16
          "invoker_wex", // 17
          "invoker_wex", // 18
          `special_bonus_unique_invoker_3`, // 19
          `special_bonus_unique_invoker_11`, // 20
          `special_bonus_unique_invoker_additional_chaos_meteors`, // 21
          `invoker_quas`, // 22
          "invoker_quas", // 23
          "invoker_quas", // 24
          `special_bonus_unique_invoker_13`, // 25
        ],
        items: {
          starting: [
            "tango",
            `faerie_fire`,
            `circlet`,
            "circlet",
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: [
            `bracer`,
            `bracer`,
            `boots`,
            `magic_wand`,
            `hand_of_midas`,
          ],
          mid_game: [
            `travel_boots`,
            `witch_blade`,
            `hurricane_pike`,
            `black_king_bar`,
            `aghanims_shard`,
          ],
          late_game: [`blink`, `sheepstick`, `ultimate_scepter`, `refresher`],
          situational: [
            `wraith_band`,
            `power_treads`,
            `falcon_blade`,
            `mage_slayer`,
            `devastator`,
            `orchid`,
            `bloodthorn`,
            `spirit_vessel`,
            `manta`,
            `maelstrom`,
            `gungir`,
            `cyclone`,
            `revenants_brooch`,
            `ethereal_blade`,
            `sphere`,
            `aeon_disk`,
            `shivas_guard`,
            `skadi`,
            `mjollnir`,
            `greater_crit`,
            `swift_blink`,
            `overwhelming_blink`,
            `travel_boots_2`,
          ],
          core: [
            `bracer`,
            `boots`,
            `hand_of_midas`,
            `travel_boots`,
            `witch_blade`,
            `hurricane_pike`,
            `black_king_bar`,
            `aghanims_shard`,
            `blink`,
            `sheepstick`,
          ],
          neutral: [
            `unstable_wand`,
            `arcane_ring`,
            `grove_bow`,
            `pupils_gift`,
            `enchanted_quiver`,
            `ceremonial_robe`,
            `timeless_relic`,
            `stormcrafter`,
            `pirate_hat`,
            `apex`,
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "enchanted_mango",
          "wind_lace",
          "boots",
          "arcane_boots",
          "cloak",
        ],
        support: ["dust", "ward_sentry"],
        core: ["soul_ring", "DamageItems"],
      },
      mid_game: {
        all: ["cyclone"],
        support: ["SentryDust", "force_staff", "glimmer_cape"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "blade_mail",
          "orchid",
          "black_king_bar",
          "manta",
        ],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk", "wind_waker"],
        support: ["SentryDustGem", "black_king_bar"],
        core: ["abyssal_blade", "satanic"],
      },
    },
  },

  // YoonA plays hero
  // IO
  wisp: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699957619, es: 3160077340 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40618,
        power_level: [1.5, 1.9, 2, 2.2],
        facet: 1,
        abilities: [
          "wisp_tether", // 1
          "wisp_overcharge", // 2
          "wisp_overcharge", // 3
          "wisp_tether", // 4
          "wisp_overcharge", // 5
          "wisp_relocate", // 6
          "wisp_overcharge", // 7
          "wisp_tether", // 8
          "wisp_tether", // 9
          `special_bonus_unique_wisp_8`, // 10
          "wisp_spirits", // 11
          "wisp_relocate", // 12
          "wisp_spirits", // 13
          "wisp_spirits", // 14
          "special_bonus_unique_wisp_3", // 15
          "wisp_spirits", // 16
          "special_bonus_attributes", // 17
          "wisp_relocate", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_wisp_10`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_wisp_4", // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `bracer`,
            `magic_wand`,
            `mekansm`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `holy_locket`,
            `pavise`,
            `solar_crest`,
            `aghanims_shard`,
            `glimmer_cape`,
          ],
          late_game: [
            `guardian_greaves`,
            `heart`,
            `desolator`,
            `ultimate_scepter`,
          ],
          situational: [
            `bottle`,
            `spirit_vessel`,
            `cyclone`,
            `force_staff`,
            `ghost`,
            `pipe`,
            `vladmir`,
            `lotus_orb`,
            `heavens_halberd`,
            `helm_of_the_overlord`,
            `boots_of_bearing`,
          ],
          core: [
            `mekansm`,
            `holy_locket`,
            `solar_crest`,
            `aghanims_shard`,
            `glimmer_cape`,
            `heart`,
          ],
          neutral: [
            `royal_jelly`,
            `seeds_of_serenity`,
            "philosophers_stone",
            `bullwhip`,
            `craggy_coat`,
            `ogre_seal_totem`,
            "ascetic_cap",
            `martyrs_plate`,
            "book_of_shadows",
            `desolator_2`,
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["ring_of_regen", "wind_lace", "boots", "urn_of_shadows"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel", "blink"],
        support: ["glimmer_cape", "force_staff"],
        core: [],
      },
      late_game: {
        all: ["sheepstick"],
        support: [],
        core: ["shivas_guard", "skadi", "abyssal_blade"],
      },
    },
  },

  // YoonA plays hero
  jakiro: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699957843, es: 3160077399 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40566,
        power_level: [2, 2, 2.1, 2],
        facet: [1, 2],
        abilities: [
          "jakiro_dual_breath", // 1
          "jakiro_double_trouble", // 2
          "jakiro_dual_breath", // 3
          "jakiro_ice_path", // 4
          "jakiro_dual_breath", // 5
          "jakiro_macropyre", // 6
          "jakiro_dual_breath", // 7
          "jakiro_ice_path", // 8
          "jakiro_ice_path", // 9
          `jakiro_ice_path`, // 10
          `special_bonus_attack_range_200`, // 11
          "jakiro_macropyre", // 12
          "jakiro_double_trouble", // 13
          "jakiro_double_trouble", // 14
          "jakiro_double_trouble", // 15
          `special_bonus_unique_jakiro_6`, // 16
          "special_bonus_attributes", // 17
          "jakiro_macropyre", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_jakiro_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_jakiro_3`, // 25
        ],
        items: {
          starting: [
            "tango",
            "tango",
            "enchanted_mango",
            "enchanted_mango",
            `blood_grenade`,
            `faerie_fire`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            "wind_lace",
            "infused_raindrop",
          ],
          mid_game: [
            `arcane_boots`,
            `cyclone`,
            `force_staff`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          late_game: [
            `wind_waker`,
            `refresher`,
            `octarine_core`,
            `ethereal_blade`,
          ],
          situational: [
            `veil_of_discord`,
            `pavise`,
            `solar_crest`,
            "pipe",
            `ghost`,
            `glimmer_cape`,
            `lotus_orb`,
            `blink`,
            `aether_lens`,
            `kaya_and_sange`,
            `aeon_disk`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `cyclone`,
            `force_staff`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `wind_waker`,
            `refresher`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            "ceremonial_robe",
            "spy_gadget",
            `timeless_relic`,
            "seer_stone",
            `force_boots`,
          ],
        },
      },
    ],
    combo: [
      "cyclone",
      "jakiro_macropyre",
      "jakiro_ice_path",
      "jakiro_dual_breath",
      "jakiro_double_trouble",
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "headdress",
          "wind_lace",
          "boots",
          "cloak",
        ],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "blade_mail",
          "black_king_bar",
        ],
      },
      late_game: { all: [], support: ["black_king_bar"], core: [] },
    },
  },

  // eidendota plays hero
  juggernaut: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699957943, es: 3160077460 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40610,
        power_level: [1.9, 2.3, 2.6, 2.7],
        abilities: [
          "juggernaut_blade_fury", // 1
          "juggernaut_blade_dance", // 2
          "juggernaut_blade_fury", // 3
          "juggernaut_healing_ward", // 4
          "juggernaut_blade_fury", // 5
          "juggernaut_omni_slash", // 6
          "juggernaut_blade_fury", // 7
          `juggernaut_healing_ward`, // 8
          `juggernaut_blade_dance`, // 9
          `special_bonus_unique_juggernaut_3`, // 10
          `juggernaut_blade_dance`, // 11
          "juggernaut_omni_slash", // 12
          `juggernaut_blade_dance`, // 13
          `juggernaut_healing_ward`, // 14
          `special_bonus_unique_juggernaut_5`, // 15
          `juggernaut_healing_ward`, // 16
          "special_bonus_attributes", // 17
          "juggernaut_omni_slash", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_juggernaut_blade_dance_lifesteal", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_juggernaut_omnislash_duration`, // 25
        ],
        items: {
          starting: [
            "tango",
            `branches`,
            "quelling_blade",
            `slippers`,
            `circlet`,
          ],
          early_game: ["wraith_band", `phase_boots`, "magic_wand"],
          mid_game: ["bfury", `manta`, "blink", "ultimate_scepter"],
          late_game: [
            `butterfly`,
            `abyssal_blade`,
            "skadi",
            "swift_blink",
            "aghanims_shard",
          ],
          situational: [
            "maelstrom",
            `mjollnir`,
            `diffusal_blade`,
            `sange_and_yasha`,
            `black_king_bar`,
            `monkey_king_bar`,
            `nullifier`,
          ],
          core: [`phase_boots`, `bfury`, `manta`, `blink`, "ultimate_scepter"],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "broom_handle",
            "duelist_gloves",
            `orb_of_destruction`,
            //"ring_of_aquila",
            "elven_tunic",
            //"titan_sliver",
            "mind_breaker",
            //`penta_edged_sword`,
            //`flicker`,
            "pirate_hat",
            `apex`,
          ],
        },
      },
    ],
    combo: [
      "blink",
      "juggernaut_omni_slash",
      `juggernaut_blade_fury`,
      `juggernaut_healing_ward`,
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["glimmer_cape", "ghost"],
        core: ["crimson_guard", "invis_sword", "manta"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "aeon_disk", "wind_waker"],
        support: [],
        core: ["abyssal_blade", "silver_edge", "assault"],
      },
    },
  },

  // YoonA plays hero
  keeper_of_the_light: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699958059, es: 3160077523 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40563,
        power_level: [1.8, 2, 1.9, 1.7],
        facet: 1,
        abilities: [
          `keeper_of_the_light_illuminate`, // 1  "keeper_of_the_light_radiant_bind" equals to `solar bind`
          `keeper_of_the_light_chakra_magic`, // 2
          `keeper_of_the_light_blinding_light`, // 3
          `keeper_of_the_light_illuminate`, // 4
          `keeper_of_the_light_illuminate`, // 5
          "keeper_of_the_light_spirit_form", // 6
          `keeper_of_the_light_illuminate`, // 7
          `keeper_of_the_light_chakra_magic`, // 8
          `keeper_of_the_light_chakra_magic`, // 9
          `keeper_of_the_light_chakra_magic`, // 10
          `special_bonus_unique_keeper_of_the_light_illuminate_cooldown`, // 11
          "keeper_of_the_light_spirit_form", // 12
          `keeper_of_the_light_blinding_light`, // 13
          `keeper_of_the_light_blinding_light`, // 14
          `special_bonus_unique_keeper_of_the_light_7`, // 15
          `keeper_of_the_light_blinding_light`, // 16
          "special_bonus_attributes", // 17
          "keeper_of_the_light_spirit_form", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_keeper_of_the_light_11", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_keeper_of_the_light`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `branches`,
            `branches`,
            `branches`,
            "circlet",
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            "tranquil_boots",
            "magic_wand",
            `urn_of_shadows`,
            "infused_raindrop",
          ],
          mid_game: [
            `spirit_vessel`,
            `glimmer_cape`,
            `force_staff`,
            `cyclone`,
            `ultimate_scepter`,
          ],
          late_game: [`aghanims_shard`, `sheepstick`, `wind_waker`, `dagon_5`],
          situational: [
            `veil_of_discord`,
            `pavise`,
            `solar_crest`,
            `mekansm`,
            `aether_lens`,
            `ghost`,
            `octarine_core`,
            "lotus_orb",
            `blink`,
            `ethereal_blade`,
            `aeon_disk`,
            `refresher`,
            "travel_boots",
          ],
          core: [
            `tranquil_boots`,
            `spirit_vessel`,
            `force_staff`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `sheepstick`,
            `wind_waker`,
          ],
          neutral: [
            `mysterious_hat`,
            `trusty_shovel`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ogre_seal_totem`,
            "spy_gadget",
            "timeless_relic",
            "seer_stone",
            `book_of_shadows`,
          ],
        },
      },
    ],
    // ability_tooltips:
    /* special_bonus_unique_keeper_of_the_light_illuminate_cooldown:
        "Skill this level 10 talent on level 16 and the suggested level 15 talent on level 15. The dota client disallows me to present that order in graphics above.", */
    combo: [
      `keeper_of_the_light_spirit_form`,
      `keeper_of_the_light_illuminate`,
      `keeper_of_the_light_radiant_bind`,
      `keeper_of_the_light_will_o_wisp`,
      `keeper_of_the_light_blinding_light`,
      `dagon`,
      `keeper_of_the_light_chakra_magic`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "headdress",
          "infused_raindrop",
          "urn_of_shadows",
          "cloak",
        ],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "sphere",
          "witch_blade",
          "manta",
        ],
      },
      late_game: {
        all: ["aeon_disk"],
        support: ["black_king_bar"],
        core: ["monkey_king_bar"],
      },
    },
  },

  // eidendota plays hero
  kunkka: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699958147, es: 3160077591 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40658,
        power_level: [2, 2.4, 2.5, 2.2],
        abilities: [
          "kunkka_tidebringer", // 1
          "kunkka_torrent", // 2
          "kunkka_tidebringer", // 3
          "kunkka_x_marks_the_spot", // 4
          "kunkka_tidebringer", // 5
          "kunkka_ghostship", // 6
          "kunkka_tidebringer", // 7
          "kunkka_x_marks_the_spot", // 8
          "kunkka_x_marks_the_spot", // 9
          `kunkka_x_marks_the_spot`, // 10
          "special_bonus_unique_kunkka_6", // 11
          "kunkka_ghostship", // 12
          "kunkka_torrent", // 13
          "kunkka_torrent", // 14
          `special_bonus_unique_kunkka_7`, // 15
          "kunkka_torrent", // 16
          "special_bonus_attributes", // 17
          "kunkka_ghostship", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_kunkka_torrent_cooldown", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_kunkka_3", // 25
        ],
        items: {
          starting: [
            `gauntlets`,
            `quelling_blade`,
            `branches`,
            `branches`,
            `faerie_fire`,
            "tango",
            `ward_observer`,
          ],
          early_game: ["bottle", "bracer", "phase_boots", "magic_wand"],
          mid_game: [
            `blade_mail`,
            "aghanims_shard",
            `ultimate_scepter`,
            "black_king_bar",
          ],
          late_game: ["shivas_guard", "refresher", "travel_boots"],
          situational: [
            "infused_raindrop",
            `bloodstone`,
            "octarine_core",
            "sheepstick",
            "sphere",
            "radiance",
            "orchid",
            `heavens_halberd`,
            `blink`,
          ],
          core: [
            `blade_mail`,
            `aghanims_shard`,
            "ultimate_scepter",
            `black_king_bar`,
          ],
          neutral: [
            "broom_handle",
            `unstable_wand`,
            "vambrace",
            "dragon_scale",
            `craggy_coat`,
            `ogre_seal_totem`,
            "timeless_relic",
            `havoc_hammer`,
            "force_boots",
            "giants_ring",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2715010750, es: 3160077674 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40665,
        power_level: [1.8, 2.4, 2.5, 2.2],
        abilities: [
          "kunkka_tidebringer", // 1
          "kunkka_torrent", // 2
          "kunkka_tidebringer", // 3
          "kunkka_x_marks_the_spot", // 4
          "kunkka_tidebringer", // 5
          "kunkka_ghostship", // 6
          "kunkka_tidebringer", // 7
          "kunkka_x_marks_the_spot", // 8
          "kunkka_x_marks_the_spot", // 9
          "kunkka_x_marks_the_spot", // 10
          `special_bonus_unique_kunkka_6`, // 11
          "kunkka_ghostship", // 12
          "kunkka_torrent", // 13
          "kunkka_torrent", // 14
          `special_bonus_unique_kunkka_7`, // 15
          `kunkka_torrent`, // 16
          "special_bonus_attributes", // 17
          "kunkka_ghostship", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_kunkka_torrent_cooldown", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_kunkka_3", // 25
        ],
        items: {
          starting: [
            `tango`,
            "quelling_blade",
            `gauntlets`,
            `gauntlets`,
            `branches`,
            "branches",
          ],
          early_game: ["bracer", "bracer", "phase_boots", `magic_wand`],
          mid_game: ["blade_mail", `aghanims_shard`, "ultimate_scepter"],
          late_game: [
            "black_king_bar",
            "shivas_guard",
            `refresher`,
            `travel_boots`,
          ],
          situational: [
            `bloodstone`,
            "octarine_core",
            `sheepstick`,
            `heavens_halberd`,
            "pipe",
            `bloodthorn`,
            "lotus_orb",
          ],
          core: [
            `blade_mail`,
            `aghanims_shard`,
            "ultimate_scepter",
            "black_king_bar",
            "shivas_guard",
          ],
          neutral: [
            "broom_handle",
            `unstable_wand`,
            "vambrace",
            "dragon_scale",
            `craggy_coat`,
            `ogre_seal_totem`,
            "timeless_relic",
            `havoc_hammer`,
            "force_boots",
            "giants_ring",
          ],
        },
      },
    ],
    combo: [
      `kunkka_x_marks_the_spot`,
      `kunkka_ghostship`,
      `kunkka_return`,
      `kunkka_torrent`,
      `kunkka_tidebringer`,
    ],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "ring_of_regen", "armor"],
        support: [],
        core: ["orb_of_corrosion", "ring_of_health"],
      },
      mid_game: {
        all: ["cyclone", "spirit_vessel"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          // "hood_of_defiance",
          "pipe",
          "eternal_shroud",
          "black_king_bar",
        ],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["bloodthorn", "assault"],
      },
    },
  },

  legion_commander: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2301488685, es: 3160077746 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40609,
        power_level: [1.8, 2.1, 2.6, 2.7],
        abilities: [
          "legion_commander_overwhelming_odds", // 1
          "legion_commander_moment_of_courage", // 2
          `legion_commander_overwhelming_odds`, // 3
          `legion_commander_press_the_attack`, // 4
          `legion_commander_overwhelming_odds`, // 5
          "legion_commander_duel", // 6
          `legion_commander_overwhelming_odds`, // 7
          `legion_commander_moment_of_courage`, // 8
          "legion_commander_moment_of_courage", // 9
          "special_bonus_unique_legion_commander_9", // 10
          "legion_commander_moment_of_courage", // 11
          "legion_commander_duel", // 12
          `legion_commander_press_the_attack`, // 13
          `legion_commander_press_the_attack`, // 14
          `special_bonus_unique_legion_commander_4`, // 15
          `legion_commander_press_the_attack`, // 16
          "special_bonus_attributes", // 17
          "legion_commander_duel", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_legion_commander_3`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_legion_commander_8", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            `circlet`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [`bracer`, `phase_boots`, "soul_ring", `magic_wand`],
          mid_game: [
            `blade_mail`,
            `blink`,
            `black_king_bar`,
            "silver_edge",
            `aghanims_shard`,
          ],
          late_game: [
            `ultimate_scepter`,
            `assault`,
            `octarine_core`,
            `greater_crit`,
          ],
          situational: [
            `monkey_king_bar`,
            `heart`,
            `abyssal_blade`,
            `moon_shard`,
            `satanic`,
            "heavens_halberd",
            `swift_blink`,
            `overwhelming_blink`,
          ],
          core: [
            `phase_boots`,
            "soul_ring",
            `blade_mail`,
            `blink`,
            `black_king_bar`,
            "silver_edge",
            `aghanims_shard`,
            `ultimate_scepter`,
            `assault`,
            `octarine_core`,
          ],
          neutral: [
            `occult_bracelet`,
            `arcane_ring`,
            `dragon_scale`,
            `orb_of_destruction`,
            //`titan_sliver`,
            `elven_tunic`,
            `ninja_gear`,
            //`penta_edged_sword`,
            `giants_ring`,
            "desolator_2",
          ],
        },
      },
    ],
    combo: [
      "legion_commander_press_the_attack",
      "black_king_bar",
      "blade_mail",
      "blink",
      `legion_commander_duel`,
      `legion_commander_overwhelming_odds`,
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: [],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["cyclone"],
        support: ["ghost"],
        core: [`heavens_halberd`, `sange_and_yasha`],
      },
      late_game: {
        all: ["sphere", "aeon_disk", "ethereal_blade", "wind_waker"],
        support: [],
        core: ["satanic", "assault", "butterfly"],
      },
    },
  },

  // eidendota plays hero
  leshrac: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699958372, es: 3160077816 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40659,
        power_level: [1.8, 2.3, 2.5, 2.2],
        abilities: [
          "leshrac_split_earth", // 1
          "leshrac_lightning_storm", // 2
          "leshrac_lightning_storm", // 3
          "leshrac_split_earth", // 4
          "leshrac_lightning_storm", // 5
          "leshrac_pulse_nova", // 6
          "leshrac_lightning_storm", // 7
          "leshrac_diabolic_edict", // 8
          "leshrac_diabolic_edict", // 9
          "leshrac_diabolic_edict", // 10
          "leshrac_diabolic_edict", // 11
          "leshrac_pulse_nova", // 12
          "leshrac_split_earth", // 13
          "special_bonus_armor_4", // 14
          "special_bonus_unique_leshrac_6", // 15
          "leshrac_split_earth", // 16
          "special_bonus_attributes", // 17
          "leshrac_pulse_nova", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_leshrac_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_leshrac_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: ["bottle", "arcane_boots", "magic_wand", "kaya"],
          mid_game: ["kaya_and_sange", "shivas_guard", "aghanims_shard"],
          late_game: [
            "sheepstick",
            "black_king_bar",
            "overwhelming_blink",
            "wind_waker",
            "travel_boots",
          ],
          situational: [
            "ultimate_scepter",
            "bloodstone",
            "ghost",
            "cyclone",
            "eternal_shroud",
            "blink",
            "arcane_blink",
          ],
          core: [
            "kaya_and_sange",
            "shivas_guard",
            "black_king_bar",
            "aghanims_shard",
          ],
          neutral: [
            "mysterious_hat",
            "occult_bracelet",
            "whisper_of_the_dread",
            "vampire_fangs",
            "gossamer_cape",
            "ceremonial_robe",
            "dandelion_amulet",
            "timeless_relic",
            "stormcrafter",
            "force_field",
            "mirror_shield",
          ],
        },
      },
    ],
    // ability_tooltips:
    /*special_bonus_strength_20:
        "You can take this level 20 talent over the suggested one if you are burstable by opponents.",*/
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "wind_lace", "boots", "cloak", "infused_raindrop"],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape", "force_staff", "spirit_vessel"],
        core: [
          "mage_slayer",
          //"hood_of_defiance",
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "blade_mail",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: ["abyssal_blade"],
      },
    },
  },

  // YoonA plays hero
  lich: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699958474, es: 3160077898 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40568,
        power_level: [2.2, 2, 1.9, 1.6],
        facet: 1,
        abilities: [
          "lich_frost_nova", // 1
          "lich_frost_shield", // 2
          "lich_frost_nova", // 3
          "lich_sinister_gaze", // 4
          `lich_frost_nova`, // 5
          "lich_chain_frost", // 6
          `lich_frost_nova`, // 7
          "lich_frost_shield", // 8
          `lich_frost_shield`, // 9
          `lich_frost_shield`, // 10
          "lich_sinister_gaze", // 11
          "lich_chain_frost", // 12
          `lich_sinister_gaze`, // 13
          `lich_sinister_gaze`, // 14
          `special_bonus_unique_lich_8`, // 15
          `special_bonus_unique_lich_2`, // 16
          "special_bonus_attributes", // 17
          "lich_chain_frost", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_lich_7`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_lich_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            "enchanted_mango",
            `enchanted_mango`,
            `faerie_fire`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            "magic_wand",
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `glimmer_cape`,
            `force_staff`,
            `aghanims_shard`,
            `blink`,
          ],
          late_game: [
            `ultimate_scepter`,
            `wind_waker`,
            `refresher`,
            `octarine_core`,
          ],
          situational: [
            `tranquil_boots`,
            `pavise`,
            `solar_crest`,
            `ghost`,
            `aether_lens`,
            `phylactery`,
            `sheepstick`,
            `lotus_orb`,
            `mekansm`,
            `ancient_janggo`,
            `guardian_greaves`,
            `boots_of_bearing`,
            `aeon_disk`,
            `cyclone`,
            `ethereal_blade`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `glimmer_cape`,
            `force_staff`,
            `aghanims_shard`,
            `blink`,
            `ultimate_scepter`,
            `wind_waker`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            `timeless_relic`,
            "seer_stone",
            `book_of_shadows`,
          ],
        },
      },
    ],
    combo: [
      `lich_frost_shield`,
      `lich_frost_nova`,
      `lich_chain_frost`,
      `lich_sinister_gaze`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "wind_lace",
          "boots",
          "headdress",
          "infused_raindrop",
          "cloak",
        ],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "blade_mail",
          "black_king_bar",
        ],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["nullifier"],
      },
    },
  },

  // eidendota plays hero
  life_stealer: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699958609, es: 3160077964 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40608,
        power_level: [2.2, 2.3, 2.5, 2.3],
        abilities: [
          "life_stealer_feast", // 1
          "life_stealer_ghoul_frenzy", // 2
          "life_stealer_feast", // 3
          "life_stealer_rage", // 4
          "life_stealer_ghoul_frenzy", // 5
          "life_stealer_infest", // 6
          "life_stealer_ghoul_frenzy", // 7
          "life_stealer_ghoul_frenzy", // 8
          "life_stealer_feast", // 9
          "life_stealer_feast", // 10
          "life_stealer_rage", // 11
          "life_stealer_infest", // 12
          "life_stealer_rage", // 13
          "life_stealer_rage", // 14
          "special_bonus_unique_lifestealer_2", // 15
          "special_bonus_unique_lifestealer_5", // 16
          "special_bonus_attributes", // 17
          "life_stealer_infest", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lifestealer_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lifestealer", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "circlet",
            "branches",
          ],
          early_game: [
            "bracer",
            "phase_boots",
            "magic_wand",
            "orb_of_corrosion",
            "armlet",
          ],
          mid_game: ["desolator", "blink", "basher"],
          late_game: ["skadi", "assault", "aghanims_shard", "abyssal_blade"],
          situational: [
            "radiance",
            "heavens_halberd",
            "sange_and_yasha",
            "monkey_king_bar",
            "nullifier",
            "black_king_bar",
            "mjollnir",
            "greater_crit",
            "hand_of_midas",
          ],
          core: [
            "phase_boots",
            "armlet",
            "desolator",
            "blink",
            "basher",
            "assault",
            "aghanims_shard",
            "skadi",
          ],
          neutral: [
            "lance_of_pursuit",
            "broom_handle",
            //"dagger_of_ristul", Removed in 7.33
            //"misericorde",
            "orb_of_destruction",
            "vambrace",
            "paladin_sword",
            //"titan_sliver",
            "mind_breaker",
            //"penta_edged_sword",
            "havoc_hammer",
            "desolator_2",
            "pirate_hat",
          ],
        },
      },
    ],
    combo: ["phase_boots", "armlet", "life_stealer_rage", "blink", "attack"],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape", "force_staff", "ghost"],
        core: ["orchid"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade"],
        support: [],
        core: ["abyssal_blade", "skadi", "shivas_guard"],
      },
    },
  },

  // eidendota plays hero
  lina: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699958714, es: 3160078017 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40542,
        power_level: [2.2, 2.3, 2.6, 2.4],
        facet: 2,
        abilities: [
          "lina_dragon_slave", // 1
          `lina_light_strike_array`, // 2
          "lina_dragon_slave", // 3
          "lina_light_strike_array", // 4
          "lina_dragon_slave", // 5
          "lina_laguna_blade", // 6
          "lina_dragon_slave", // 7
          `lina_light_strike_array`, // 8
          `lina_light_strike_array`, // 9
          `special_bonus_unique_lina_1`, // 10
          `lina_fiery_soul`, // 11
          "lina_laguna_blade", // 12
          `lina_fiery_soul`, // 13
          `lina_fiery_soul`, // 14
          `special_bonus_unique_lina_3`, // 15
          `lina_fiery_soul`, // 16
          "special_bonus_attributes", // 17
          "lina_laguna_blade", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_lina_6`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_lina_7`, // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            `branches`,
            `branches`,
            "branches",
            "ward_observer",
          ],
          early_game: [
            `bottle`,
            `boots`,
            `magic_wand`,
            `null_talisman`,
            `wind_lace`,
          ],
          mid_game: [
            `travel_boots`,
            `aether_lens`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `blink`,
          ],
          late_game: [
            `ethereal_blade`,
            `black_king_bar`,
            `sheepstick`,
            `wind_waker`,
            `refresher`,
          ],
          situational: [
            `falcon_blade`,
            `yasha_and_kaya`,
            `kaya_and_sange`,
            `ghost`,
            `cyclone`,
            `dagon_5`,
            `octarine_core`,
            `sphere`,
            `aeon_disk`,
            `devastator`,
            `silver_edge`,
            `monkey_king_bar`,
            `bloodthorn`,
            `nullifier`,
            `assault`,
            `revenants_brooch`,
            `maelstrom`,
            `gungir`,
            `hurricane_pike`,
            `greater_crit`,
            `satanic`,
            `arcane_blink`,
            `travel_boots_2`,
          ],
          core: [
            `bottle`,
            `travel_boots`,
            `aether_lens`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `blink`,
            `ethereal_blade`,
            `sheepstick`,
          ],
          neutral: [
            "arcane_ring",
            `mysterious_hat`,
            "grove_bow",
            `vambrace`,
            `psychic_headband`,
            `ceremonial_robe`,
            `timeless_relic`,
            `stormcrafter`,
            `seer_stone`,
            `force_boots`,
          ],
        },
      },
      // NEW LINA GUIDE
      // TO BE UPDATED BY YOONA
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 3260328154, es: 3260329711 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40805,
        power_level: [2.2, 2.3, 2.6, 2.4],
        facet: 1,
        abilities: [
          `lina_light_strike_array`, // 1
          `lina_dragon_slave`, // 2
          "lina_dragon_slave", // 3
          `lina_fiery_soul`, // 4
          "lina_dragon_slave", // 5
          "lina_laguna_blade", // 6
          "lina_dragon_slave", // 7
          `lina_fiery_soul`, // 8
          `lina_fiery_soul`, // 9
          `special_bonus_attack_damage_25`, // 10
          `lina_fiery_soul`, // 11
          "lina_laguna_blade", // 12
          `lina_light_strike_array`, // 13
          `lina_light_strike_array`, // 14
          `special_bonus_unique_lina_4`, // 15
          `lina_light_strike_array`, // 16
          "special_bonus_attributes", // 17
          "lina_laguna_blade", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_lina_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_lina_crit_debuff`, // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            `mantle`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            `falcon_blade`,
            `boots`,
            `magic_wand`,
            `null_talisman`,
            `wind_lace`,
          ],
          mid_game: [`maelstrom`, `gungir`, `travel_boots`, `black_king_bar`],
          late_game: [
            `hurricane_pike`,
            `greater_crit`,
            `satanic`,
            `swift_blink`,
          ],
          situational: [
            `blink`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `yasha_and_kaya`,
            `sphere`,
            `aeon_disk`,
            `silver_edge`,
            `monkey_king_bar`,
            `bloodthorn`,
            `nullifier`,
            `sheepstick`,
            `revenants_brooch`,
            `assault`,
            `refresher`,
            `travel_boots_2`,
          ],
          core: [
            `falcon_blade`,
            `boots`,
            `gungir`,
            `travel_boots`,
            `black_king_bar`,
            `hurricane_pike`,
            `greater_crit`,
            `satanic`,
          ],
          neutral: [
            "arcane_ring",
            `mysterious_hat`,
            "grove_bow",
            `specialists_array`,
            `enchanted_quiver`,
            `paladin_sword`,
            `mind_breaker`,
            `avianas_feather`,
            `desolator_2`,
            `pirate_hat`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2715221904, es: 3160078116 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40737,
        power_level: [1.9, 2, 2.1, 2.2],
        facet: 2,
        abilities: [
          "lina_light_strike_array", // 1
          `lina_dragon_slave`, // 2
          "lina_dragon_slave", // 3
          `lina_light_strike_array`, // 4
          "lina_dragon_slave", // 5
          "lina_laguna_blade", // 6
          "lina_dragon_slave", // 7
          "lina_light_strike_array", // 8
          "lina_light_strike_array", // 9
          `special_bonus_unique_lina_1`, // 10
          `lina_fiery_soul`, // 11
          "lina_laguna_blade", // 12
          "lina_fiery_soul", // 13
          "lina_fiery_soul", // 14
          "special_bonus_unique_lina_3", // 15
          "lina_fiery_soul", // 16
          "special_bonus_attributes", // 17
          "lina_laguna_blade", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_lina_6`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_lina_7`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            `null_talisman`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `aether_lens`,
            `cyclone`,
            `blink`,
            `force_staff`,
          ],
          late_game: [
            `ultimate_scepter`,
            `aghanims_shard`,
            `sheepstick`,
            `ethereal_blade`,
          ],
          situational: [
            `glimmer_cape`,
            `black_king_bar`,
            `lotus_orb`,
            `ghost`,
            `yasha_and_kaya`,
            `wind_waker`,
            `gungir`,
            `octarine_core`,
            `aeon_disk`,
            `refresher`,
            `revenants_brooch`,
            `arcane_blink`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            "cyclone",
            `blink`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `sheepstick`,
          ],
          neutral: [
            `arcane_ring`,
            `mysterious_hat`,
            "philosophers_stone",
            `bullwhip`,
            "psychic_headband",
            `ceremonial_robe`,
            `spy_gadget`,
            `timeless_relic`,
            "seer_stone",
            `force_boots`,
          ],
        },
      },
    ],
    combo: [
      `cyclone`,
      `lina_light_strike_array`,
      `lina_dragon_slave`,
      `lina_laguna_blade`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "headdress",
          "infused_raindrop",
          "cloak",
        ],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          `black_king_bar`,
        ],
      },
      late_game: {
        all: ["sphere", "sheepstick"],
        support: ["black_king_bar"],
        core: ["abyssal_blade", "silver_edge", "assault", "butterfly"],
      },
    },
  },

  lion: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699958831, es: 3160078175 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40582,
        power_level: [1.6, 2.1, 2.1, 2.1],
		facet: 1,
        abilities: [
          "lion_impale", // 1
          "lion_mana_drain", // 2
          `lion_mana_drain`, // 3
          "lion_voodoo", // 4
          `lion_impale`, // 5
          "lion_finger_of_death", // 6
          "lion_impale", // 7
          `lion_impale`, // 8
          `lion_mana_drain`, // 9
          `lion_mana_drain`, // 10
          `special_bonus_unique_lion_3`, // 11
          "lion_finger_of_death", // 12
          `lion_voodoo`, // 13
          `lion_voodoo`, // 14
          `special_bonus_unique_lion_11`, // 15
          `lion_voodoo`, // 16
          "special_bonus_attributes", // 17
          "lion_finger_of_death", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_lion_10`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lion_4", // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            "tranquil_boots",
            "magic_wand",
            "wind_lace",
            `infused_raindrop`,
          ],
          mid_game: ["blink", `aether_lens`, `aghanims_shard`, `force_staff`],
          late_game: [
            `ethereal_blade`,
            `ultimate_scepter`,
            `octarine_core`,
            `aeon_disk`,
          ],
          situational: [
            `phylactery`,
            `glimmer_cape`,
            `ghost`,
			`ancient_janggo`,
            `boots_of_bearing`,
            `lotus_orb`,
            `cyclone`,
            `black_king_bar`,
			`wind_waker`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `blink`,
            `aether_lens`,
            `aghanims_shard`,
            `force_staff`,
            `ultimate_scepter`,
            `octarine_core`,
          ],
          neutral: [
            `faded_broach`,
            `mysterious_hat`,
            "philosophers_stone",
            `vambrace`,
            "psychic_headband",
            `ceremonial_robe`,
            "timeless_relic",
            "spy_gadget",
            "seer_stone",
            `force_boots`,
          ],
        },
      },
    ],
    // ability_tooltips
    // special_bonus_unique_lion_10: `Take this Mana restore talent over the suggested one when playing with mana dependent cores such as Storm Spirit or Leshrac.`,
    combo: [
      `blink`,
      `lion_voodoo`,
      `attack`,
      `lion_impale`,
      `lion_finger_of_death`,
	  `lion_mana_drain`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "enchanted_mango",
          "ring_of_regen",
          "infused_raindrop",
          "arcane_boots",
          "cloak",
        ],
        support: [],
        core: ["soul_ring"],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["glimmer_cape"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          `sange_and_yasha`,
        ],
      },
      late_game: {
        all: ["sphere", "aeon_disk"],
        support: ["black_king_bar"],
        core: [],
      },
    },
  },

  lone_druid: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699958939, es: 3160078300 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40683,
        power_level: [2.3, 2.3, 2.6, 2.5],
        abilities: [
          "lone_druid_spirit_bear", // 1
          "lone_druid_spirit_link", // 2
          "lone_druid_spirit_bear", // 3
          "lone_druid_spirit_link", // 4
          "lone_druid_spirit_bear", // 5
          "lone_druid_spirit_link", // 6
          "lone_druid_spirit_bear", // 7
          "lone_druid_spirit_link", // 8
          "lone_druid_true_form", // 9
          "lone_druid_savage_roar", // 10
          "lone_druid_savage_roar", // 11
          `lone_druid_savage_roar`, // 12
          `lone_druid_savage_roar`, // 13
          `special_bonus_hp_200`, // 14
          "special_bonus_unique_lone_druid_4", // 15
          `lone_druid_true_form`, // 16
          "special_bonus_attributes", // 17
          "lone_druid_true_form", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lone_druid_entangle_dps", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lone_druid_spirit_link_attack_speed", // 25
        ],
        items: {
          starting_bear: [`quelling_blade`, `branches`, `branches`, `branches`],
          starting: [
            "tango",
            `branches`,
            `branches`,
            "branches",
            "branches",
            "branches",
          ],
          core_bear: [
            `orb_of_corrosion`,
            `diffusal_blade`,
            `power_treads`,
            `echo_sabre`,
            `harpoon`,
            `basher`,
            `assault`,
            `disperser`,
            `abyssal_blade`,
            `nullifier`,
            `ultimate_scepter`,
          ],
          core: [
            `blight_stone`,
            `aghanims_shard`,
            `boots`,
            "wraith_band",
            "wraith_band",
            "wraith_band",
          ],
          situational_bear: [
            `orb_of_venom`,
            "hand_of_midas",
            `mask_of_madness`,
            `desolator`,
            `maelstrom`,
            `mage_slayer`,
            `bloodthorn`,
            `aghanims_shard`,
            "monkey_king_bar",
            "mjollnir",
            "black_king_bar",
            `radiance`,
            `skadi`,
            "moon_shard",
            "silver_edge",
            "butterfly",
          ],
          situational: [
            `magic_wand`,
            `cloak`,
            `glimmer_cape`,
            `hurricane_pike`,
            `pavise`,
            `solar_crest`,
            `ghost`,
            `black_king_bar`,
            `ultimate_scepter`,
            `refresher`,
          ],
          neutral_bear: [
            "broom_handle",
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            `defiant_shell`,
            "paladin_sword",
            `ancient_guardian`,
            "mind_breaker",
            "desolator_2",
            `apex`,
          ],
          neutral: [
            "unstable_wand",
            "trusty_shovel",
            `vambrace`,
            "philosophers_stone",
            `defiant_shell`,
            `ogre_seal_totem`,
            "trickster_cloak",
            "ascetic_cap",
            `panic_button`,
            "force_field",
          ],
        },
      },
    ],
    // item_tooltips:
    // phase_boots: "A core boots upgrade that allows Bear to gap-close faster.",
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "ring_of_regen", "armor"],
        support: [],
        core: ["ring_of_health", "vanguard"],
      },
      mid_game: {
        all: ["spirit_vessel"],
        support: ["glimmer_cape", "force_staff", "ghost"],
        core: ["crimson_guard", "hurricane_pike"],
      },
      late_game: {
        all: ["sheepstick", "travel_boots"],
        support: [],
        core: ["abyssal_blade", "assault", "bloodthorn", "butterfly"],
      },
    },
  },

  // eidendota plays hero
  luna: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_workshop_ids: { en: 2699959031, es: 3160078396 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40534,
        power_level: [1.5, 1.8, 2.6, 2.7],
        abilities: [
          "luna_lunar_blessing", // 1
          "luna_lucent_beam", // 2
          "luna_lunar_blessing", // 3
          "luna_lucent_beam", // 4
          "luna_moon_glaive", // 5
          "luna_moon_glaive", // 6
          "luna_lunar_blessing", // 7
          "luna_lunar_blessing", // 8
          "luna_moon_glaive", // 9
          "luna_moon_glaive", // 10
          "special_bonus_unique_luna_7", // 11
          "luna_eclipse", // 12
          "luna_eclipse", // 13
          "luna_lucent_beam", // 14
          "special_bonus_unique_luna_6", // 15
          "luna_lucent_beam", // 16
          "special_bonus_attributes", // 17
          "luna_eclipse", // 18
          "luna_lucent_beam", // 19
          "special_bonus_unique_luna_8", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_luna_5", // 25
        ],
        items: {
          starting: [
            "quelling_blade",
            "slippers",
            "circlet",
            "branches",
            "tango",
          ],
          early_game: [
            "tango", // send another tango and Wraith Band as first 2 items after laning begins
            "wraith_band", //send extra tango and Wraith Band as first 2 items after laning begins
            "power_treads",
            "magic_wand", // can consider if spell-casting lane, otherwise skip
            "mask_of_madness",
          ],
          mid_game: [
            "lesser_crit",
            "dragon_lance",
            "black_king_bar",
            "manta",
            "hurricane_pike",
            "aghanims_shard",
          ],
          late_game: [
            "angels_demise",
            "blink",
            "skadi",
            "swift_blink",
            "satanic",
            "butterfly",
          ],
          situational: [
            "silver_edge",
            "ultimate_scepter",
            "monkey_king_bar",
            "sphere",
            "greater_crit",
            "refresher",
          ],
          core: [
            "black_king_bar",
            "manta",
            "hurricane_pike",
            "angels_demise",
            "skadi",
            "butterfly",
            "satanic",
            "greater_crit",
          ],
          neutral: [
            //"ring_of_aquila",
            //"dagger_of_ristul", Removed in 7.33
            //"titan_sliver",
            //"possessed_mask", Removed in 7.33

            // tier 1
            "unstable_wand",
            "safety_bubble",
            "occult_bracelet",
            "duelist_gloves",

            // tier 2
            "grove_bow",
            "pupils_gift",
            "vambrace",
            "specialists_array",

            // tier 3
            "paladin_sword",
            "enchanted_quiver",
            "elven_tunic",

            // tier 4
            "avianas_feather",
            "ninja_gear",
            "mind_breaker",

            // tier 5
            "force_boots",
            "desolator_2",
            "mirror_shield",
            "apex",
            "pirate_hat",
          ],
        },
      },
    ],

    combo: [
      `black_king_bar`,
      `luna_eclipse`,
      `blink`,
      `manta`,
      `luna_lucent_beam`,
    ],

    counter_items: {
      laning_phase: {
        all: ["armor", "boots", "magic_stick", "infused_raindrop"],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: {
        all: [
          "spirit_vessel",
          "heavens_halberd",
          "force_staff",
          "pipe",
          "black_king_bar",
          "blade_mail",
        ],
        support: ["glimmer_cape"],
        core: [],
      },
      late_game: {
        all: ["sheepstick"],
        support: [],
        core: ["assault", "abyssal_blade", "skadi", "butterfly"],
      },
    },
  },

  lycan: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699959154, es: 3160078487 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40673,
        power_level: [1.4, 2.2, 2.3, 1.9],
        abilities: [
          "lycan_summon_wolves", // 1
          "lycan_feral_impulse", // 2
          "lycan_summon_wolves", // 3
          `lycan_howl`, // 4
          "lycan_summon_wolves", // 5
          "lycan_shapeshift", // 6
          "lycan_summon_wolves", // 7
          "lycan_feral_impulse", // 8
          "lycan_feral_impulse", // 9
          `lycan_feral_impulse`, // 10
          "special_bonus_unique_lycan_3", // 11
          "lycan_shapeshift", // 12
          "lycan_howl", // 13
          "lycan_howl", // 14
          `special_bonus_unique_lycan_8`, // 15
          `lycan_howl`, // 16
          "special_bonus_attributes", // 17
          "lycan_shapeshift", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lycan_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_lycan_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `helm_of_iron_will`,
            `magic_wand`,
            "helm_of_the_dominator",
            `vladmir`,
            `helm_of_the_overlord`,
          ],
          mid_game: [
            `ancient_janggo`,
            `assault`,
            `aghanims_shard`,
            `echo_sabre`,
            `harpoon`,
          ],
          late_game: [
            `ultimate_scepter`,
            `orchid`,
            `bloodthorn`,
            `nullifier`,
            `sheepstick`,
          ],
          situational: [
            `power_treads`,
            `black_king_bar`,
            `boots_of_bearing`,
            `manta`,
            "heavens_halberd",
            `sphere`,
            `skadi`,
            `satanic`,
            `abyssal_blade`,
            `travel_boots`,
          ],
          core: [
            `helm_of_the_dominator`,
            `vladmir`,
            `helm_of_the_overlord`,
            "ancient_janggo",
            `assault`,
            `aghanims_shard`,
            `harpoon`,
            `ultimate_scepter`,
          ],
          neutral: [
            "broom_handle",
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            `elven_tunic`,
            `defiant_shell`,
            `mind_breaker`,
            `havoc_hammer`,
            `apex`,
            "desolator_2",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2716646867, es: 3160078575 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40674,
        power_level: [1.5, 2.1, 2.5, 2.1],
        abilities: [
          "lycan_summon_wolves", // 1
          "lycan_feral_impulse", // 2
          "lycan_summon_wolves", // 3
          `lycan_howl`, // 4
          "lycan_summon_wolves", // 5
          "lycan_shapeshift", // 6
          "lycan_summon_wolves", // 7
          "lycan_feral_impulse", // 8
          "lycan_feral_impulse", // 9
          `lycan_feral_impulse`, // 10
          "special_bonus_unique_lycan_3", // 11
          "lycan_shapeshift", // 12
          "lycan_howl", // 13
          "lycan_howl", // 14
          `special_bonus_unique_lycan_8`, // 15
          `lycan_howl`, // 16
          "special_bonus_attributes", // 17
          "lycan_shapeshift", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lycan_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_lycan_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            "circlet",
            `circlet`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `wraith_band`,
            `bracer`,
            `power_treads`,
            `magic_wand`,
            `echo_sabre`,
          ],
          mid_game: [
            `harpoon`,
            `manta`,
            `aghanims_shard`,
            `orchid`,
            `black_king_bar`,
          ],
          late_game: [
            `bloodthorn`,
            `ultimate_scepter`,
            `abyssal_blade`,
            `assault`,
          ],
          situational: [
            `ring_of_basilius`,
            `helm_of_the_overlord`,
            `vladmir`,
            `ancient_janggo`,
            `boots_of_bearing`,
            `skadi`,
            `sheepstick`,
            `heavens_halberd`,
            `sphere`,
            `nullifier`,
            `satanic`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            `echo_sabre`,
            `harpoon`,
            `manta`,
            `aghanims_shard`,
            `black_king_bar`,
            `bloodthorn`,
            `ultimate_scepter`,
          ],
          neutral: [
            "broom_handle",
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            `elven_tunic`,
            `defiant_shell`,
            "mind_breaker",
            `havoc_hammer`,
            `apex`,
            `desolator_2`,
          ],
        },
      },
    ],

    combo: [],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "armor"],
        support: [],
        core: ["orb_of_corrosion", "phase_boots", "vanguard"],
      },
      mid_game: {
        all: ["rod_of_atos"],
        support: ["glimmer_cape", "ghost"],
        core: ["crimson_guard"],
      },
      late_game: {
        all: [],
        support: [],
        core: ["abyssal_blade", "assault"],
      },
    },
  },

  magnataur: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699959287, es: 3160078646 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40535,
        power_level: [1.5, 1.9, 2.6, 2.7],
        facet: 1,
        abilities: [
          "magnataur_shockwave", // 1
          `magnataur_skewer`, // 2
          `magnataur_empower`, // 3
          `magnataur_empower`, // 4
          `magnataur_empower`, // 5
          "magnataur_reverse_polarity", // 6
          `magnataur_empower`, // 7
          `magnataur_skewer`, // 8
          `magnataur_skewer`, // 9
          `magnataur_skewer`, // 10
          `magnataur_shockwave`, // 11
          "magnataur_reverse_polarity", // 12
          `magnataur_shockwave`, // 13
          `magnataur_shockwave`, // 14
          `special_bonus_unique_magnus_4`, // 15
          "special_bonus_unique_magnus_7", // 16
          "special_bonus_attributes", // 17
          "magnataur_reverse_polarity", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_magnus_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_magnus_5", // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `circlet`,
            `circlet`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `wraith_band`,
            `bracer`,
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `blink`,
            `ultimate_scepter`,
            `aether_lens`,
            `aghanims_shard`,
            `cyclone`,
          ],
          late_game: [
            `black_king_bar`,
            `refresher`,
            `wind_waker`,
            `octarine_core`,
            `arcane_blink`,
          ],
          situational: [
            `arcane_boots`,
            `vanguard`,
            `pipe`,
            `force_staff`,
            `solar_crest`,
            `crimson_guard`,
            `guardian_greaves`,
            `echo_sabre`,
            `harpoon`,
            `silver_edge`,
            `manta`,
            `heavens_halberd`,
            `sphere`,
            `aeon_disk`,
            `lotus_orb`,
            `greater_crit`,
            `assault`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            `blink`,
            `ultimate_scepter`,
            `aether_lens`,
            `aghanims_shard`,
            `black_king_bar`,
            "refresher",
          ],
          neutral: [
            `unstable_wand`,
            "arcane_ring",
            `pupils_gift`,
            `vambrace`,
            `paladin_sword`,
            `ceremonial_robe`,
            `timeless_relic`,
            `ninja_gear`,
            `giants_ring`,
            `apex`,
          ],
        },

        // ability_tooltips:
        /* magnataur_skewer:
            "You can skill this spell on level 2 if you see yourself being able to pull off a Shockwave into Skewer combo.", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2716646936, es: 3160078726 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40536,
        power_level: [1.5, 1.9, 2.6, 2.7],
        facet: 1,
        abilities: [
          "magnataur_shockwave", // 1
          `magnataur_skewer`, // 2
          `magnataur_shockwave`, // 3
          `magnataur_empower`, // 4
          `magnataur_shockwave`, // 5
          "magnataur_reverse_polarity", // 6
          `magnataur_shockwave`, // 7
          `magnataur_empower`, // 8
          `magnataur_empower`, // 9
          `magnataur_empower`, // 10
          `magnataur_skewer`, // 11
          "magnataur_reverse_polarity", // 12
          "magnataur_skewer", // 13
          `magnataur_skewer`, // 14
          `special_bonus_unique_magnus_4`, // 15
          `special_bonus_unique_magnus_7`, // 16
          "special_bonus_attributes", // 17
          "magnataur_reverse_polarity", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_magnus_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_magnus_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            `branches`,
            `branches`,
            `circlet`,
            "ward_observer",
          ],
          early_game: [
            `bottle`,
            `power_treads`,
            `wraith_band`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `blink`,
            `echo_sabre`,
            `harpoon`,
            `black_king_bar`,
            `aghanims_shard`,
          ],
          late_game: [
            `ultimate_scepter`,
            `refresher`,
            `wind_waker`,
            `octarine_core`,
            `arcane_blink`,
          ],
          situational: [
            `bracer`,
            `force_staff`,
            `crimson_guard`,
            `guardian_greaves`,
            `pipe`,
            `solar_crest`,
            `silver_edge`,
            `heavens_halberd`,
            `cyclone`,
            `sphere`,
            `lotus_orb`,
            `manta`,
            `sange_and_yasha`,
            `bloodthorn`,
            `greater_crit`,
            `assault`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            "bottle",
            "power_treads",
            `blink`,
            `echo_sabre`,
            `harpoon`,
            `black_king_bar`,
            `ultimate_scepter`,
            `refresher`,
          ],
          neutral: [
            `unstable_wand`,
            `arcane_ring`,
            `pupils_gift`,
            `vambrace`,
            `paladin_sword`,
            `vindicators_axe`,
            `mind_breaker`,
            `ninja_gear`,
            `giants_ring`,
            `apex`,
          ],
        },
        // ability_tooltips:
        /* magnataur_skewer:
            "You can skill this spell on level 2 if you see yourself being able to pull off a Shockwave into Skewer combo.", */
        // item_tooltips:
        /* bloodthorn:
            "A core item that allows you to burst heroes while they are stunned by Reverse Polarity. It silences, makes every attack crit and grants true strike on affected opponent.", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2716647043, es: 3160079724 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40537,
        power_level: [1, 1.8, 2.3, 2.5],
        facet: 1,
        abilities: [
          "magnataur_shockwave", // 1
          "magnataur_skewer", // 2
          `magnataur_skewer`, // 3
          `magnataur_shockwave`, // 4
          "magnataur_empower", // 5
          "magnataur_reverse_polarity", // 6
          "magnataur_empower", // 7
          `magnataur_empower`, // 8
          `magnataur_empower`, // 9
          `magnataur_skewer`, // 10
          `magnataur_skewer`, // 11
          "magnataur_reverse_polarity", // 12
          `special_bonus_unique_magnus_4`, // 13
          `magnataur_shockwave`, // 14
          `special_bonus_unique_magnus_7`, // 15
          `magnataur_shockwave`, // 16
          "special_bonus_attributes", // 17
          "magnataur_reverse_polarity", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_magnus_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_magnus_5", // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `wind_lace`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `blink`,
            `force_staff`,
            `aether_lens`,
            `aghanims_shard`,
          ],
          late_game: [
            `ultimate_scepter`,
            `refresher`,
            `wind_waker`,
            `octarine_core`,
          ],
          situational: [
            `glimmer_cape`,
            `ghost`,
            `pipe`,
            `guardian_greaves`,
            `cyclone`,
            `pavise`,
            `solar_crest`,
            `lotus_orb`,
            `aeon_disk`,
            `assault`,
            `invis_sword`,
            `arcane_blink`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "blink",
            `force_staff`,
            `aether_lens`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `refresher`,
            `octarine_core`,
          ],
          neutral: [
            `trusty_shovel`,
            "arcane_ring",
            `philosophers_stone`,
            "bullwhip",
            "psychic_headband",
            `ceremonial_robe`,
            `timeless_relic`,
            `ninja_gear`,
            `seer_stone`,
            `giants_ring`,
          ],
        },
      },
    ],
    // ability_tooltips:
    /* special_bonus_unique_magnus_4: `On level 15 take the suggested level 15 talent over this level 10 talent. Dota client disallows me to display the order properly in graphics above.`, */
    combo: [
      `magnataur_empower`,
      `blink`,
      `magnataur_reverse_polarity`,
      `magnataur_horn_toss`,
      `magnataur_skewer`,
      `magnataur_shockwave`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "armor"],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: {
        all: [],
        support: ["ward_dispenser", "glimmer_cape", "force_staff", "ghost"],
        core: [`sange_and_yasha`],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk", "ethereal_blade", "wind_waker"],
        support: [],
        core: ["abyssal_blade", "assault", "butterfly"],
      },
    },
  },

  marci: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699959380, es: 3160079977 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40538,
        power_level: [2, 2.1, 2.1, 2.1],
        facet: 1,
        abilities: [
          `marci_grapple`, // 1	equals to rebound
          `marci_companion_run`, // 2	 equals to dispose
          "marci_companion_run", // 3
          `marci_special_delivery`, // 4  equals to sidekick
          `marci_companion_run`, // 5
          "marci_unleash", // 6
          `marci_companion_run`, // 7
          `marci_special_delivery`, // 8
          `marci_special_delivery`, // 9
          `marci_special_delivery`, // 10
          `special_bonus_unique_marci_lunge_range`, // 11
          "marci_unleash", // 12
          `marci_grapple`, // 13
          `marci_grapple`, // 14
          `special_bonus_unique_marci_lunge_movespeed`, // 15
          `marci_grapple`, // 16
          "special_bonus_attributes", // 17
          "marci_unleash", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_marci_unleash_speed`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_marci_unleash_extend_duration`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `phase_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`black_king_bar`, `basher`, `aghanims_shard`, `blink`],
          late_game: [
            `ultimate_scepter`,
            `greater_crit`,
            `abyssal_blade`,
            `satanic`,
          ],
          situational: [
            `soul_ring`,
            `orb_of_corrosion`,
            `spirit_vessel`,
            `pavise`,
            `solar_crest`,
            `vladmir`,
            `force_staff`,
            `heavens_halberd`,
            `monkey_king_bar`,
            `pipe`,
            `lotus_orb`,
            `cyclone`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `black_king_bar`,
            `basher`,
            `aghanims_shard`,
            `blink`,
            `ultimate_scepter`,
            `greater_crit`,
          ],
          neutral: [
            `unstable_wand`,
            `arcane_ring`,
            `vambrace`,
            `pupils_gift`,
            `nemesis_curse`,
            `paladin_sword`,
            `mind_breaker`,
            `ancient_guardian`,
            `apex`,
            `desolator_2`,
          ],
        },
        // item_tooltips:
        /* arcane_boots:
            "A core item that helps with mana sustain. Can be disassembled and Energy Booster used for Aether Lens. Get Tranquil Boots afterwards.", */
        /* aether_lens:
            "A core item that Dispose and Rebound benefit the most from.", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2716647152, es: 3160080049 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40539,
        power_level: [1.9, 2.1, 2.5, 2.3],
        facet: 1,
        abilities: [
          "marci_grapple", // 1	equals to dispose
          `marci_special_delivery`, // 2	equals to rebound
          `marci_special_delivery`, // 3  equals to sidekick
          `marci_companion_run`, // 4
          `marci_special_delivery`, // 5
          "marci_unleash", // 6
          `marci_special_delivery`, // 7
          `marci_companion_run`, // 8
          `marci_companion_run`, // 9
          `marci_companion_run`, // 10
          `special_bonus_unique_marci_lunge_range`, // 11
          "marci_unleash", // 12
          "marci_grapple", // 13
          "marci_grapple", // 14
          `special_bonus_unique_marci_lunge_movespeed`, // 15
          `marci_grapple`, // 16
          "special_bonus_attributes", // 17
          "marci_unleash", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_marci_unleash_speed`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_marci_unleash_extend_duration`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `wraith_band`,
            `bracer`,
            `phase_boots`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            `armlet`,
            `ultimate_scepter`,
            `black_king_bar`,
            `basher`,
            `aghanims_shard`,
          ],
          late_game: [`blink`, `greater_crit`, `abyssal_blade`, `satanic`],
          situational: [
            `vanguard`,
            `spirit_vessel`,
            `orb_of_corrosion`,
            `power_treads`,
            `heavens_halberd`,
            `vladmir`,
            `diffusal_blade`,
            `manta`,
            `sphere`,
            `silver_edge`,
            `monkey_king_bar`,
            `nullifier`,
            `bloodthorn`,
            `harpoon`,
            `skadi`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `armlet`,
            `ultimate_scepter`,
            `black_king_bar`,
            `basher`,
            `aghanims_shard`,
            `greater_crit`,
          ],
          neutral: [
            `broom_handle`,
            `unstable_wand`,
            `vambrace`,
            `pupils_gift`,
            `paladin_sword`,
            `nemesis_curse`,
            `ancient_guardian`,
            `mind_breaker`,
            `desolator_2`,
            `apex`,
          ],
        },
        //item_tooltips:
        // soul_ring: "A core item that helps witn mana sutain.",
      },
    ],
    combo: [
      `marci_special_delivery`,
      `black_king_bar`,
      `marci_companion_run`,
      `marci_unleash`,
      `marci_grapple`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "infused_raindrop",
          "wind_lace",
          "boots",
          "urn_of_shadows",
          "ring_of_regen",
          "blight_stone",
          "cloak",
          "armor",
        ],
        support: [],
        core: ["ring_of_health", "vanguard", "orb_of_corrosion"],
      },
      mid_game: {
        all: [
          "spirit_vessel",
          "cyclone",
          "blink",
          "rod_of_atos",
          "solar_crest",
        ],
        support: ["glimmer_cape", "force_staff", "ghost"],
        core: [
          "heavens_halberd",
          "crimson_guard",
          "hurricane_pike",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "blade_mail",
          "black_king_bar",
          "invis_sword",
        ],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk", "ethereal_blade", "wind_waker"],
        support: ["black_king_bar"],
        core: [
          "abyssal_blade",
          "nullifier",
          "butterfly",
          "assault",
          "bloodthorn",
          "skadi",
          "shivas_guard",
        ],
      },
    },
  },

  mars: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699959474, es: 3160080136 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40540,
        power_level: [2.2, 2.3, 2.6, 2.7],
        facet: 2,
        abilities: [
          "mars_gods_rebuke", // 1
          "mars_spear", // 2
          "mars_spear", // 3
          "mars_gods_rebuke", // 4
          "mars_spear", // 5
          "mars_arena_of_blood", // 6
          "mars_spear", // 7
          "mars_gods_rebuke", // 8
          "mars_gods_rebuke", // 9
          "special_bonus_unique_mars_rebuke_radius", // 10
          "mars_bulwark", // 11
          "mars_arena_of_blood", // 12
          "mars_bulwark", // 13
          "mars_bulwark", // 14
          "special_bonus_unique_mars_rebuke_cooldown", // 15
          "mars_bulwark", // 16
          "special_bonus_attributes", // 17
          "mars_arena_of_blood", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_mars_spear_stun_duration", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_mars_gods_rebuke_extra_crit`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "gauntlets",
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `bracer`,
            `phase_boots`,
            `soul_ring`,
            `magic_wand`,
          ],
          mid_game: [
            `blink`,
            `black_king_bar`,
            `desolator`,
            `aghanims_shard`,
            `cyclone`,
          ],
          late_game: [
            `refresher`,
            `wind_waker`,
            `octarine_core`,
            `overwhelming_blink`,
          ],
          situational: [
            `veil_of_discord`,
            `vanguard`,
            `guardian_greaves`,
            `heavens_halberd`,
            `pipe`,
            `crimson_guard`,
            `solar_crest`,
            `lotus_orb`,
            `aether_lens`,
            `meteor_hammer`,
            `cyclone`,
            `desolator`,
            `ultimate_scepter`,
            `sheepstick`,
            `heart`,
            `shivas_guard`,
            `sphere`,
            `assault`,
            `satanic`,
            `nullifier`,
            `greater_crit`,
            `revenants_brooch`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `phase_boots`,
            `soul_ring`,
            `blink`,
            `black_king_bar`,
            `desolator`,
            `refresher`,
            `wind_waker`,
          ],
          neutral: [
            `occult_bracelet`,
            `arcane_ring`,
            `bullwhip`,
            `dragon_scale`,
            `ceremonial_robe`,
            `nemesis_curse`,
            `havoc_hammer`,
            `rattlecage`,
            `desolator_2`,
            `giants_ring`,
          ],
        },
      },
    ],
    // item_tooltips: {
    /* helm_of_iron_will:
        "You can rush this item for sustain on the lane. Upgrading it to Armlet is fine but usually you should make your way to Blink Dagger first. You can opt not to upgrade it at all.", */
    combo: [`blink`, `mars_arena_of_blood`, `mars_gods_rebuke`, `mars_spear`],
    counter_items: {
      laning_phase: {
        all: [
          "blight_stone",
          "lifesteal",
          "wind_lace",
          "boots",
          "infused_raindrop",
          "cloak",
        ],
        support: [],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "black_king_bar",
          "silver_edge",
          "desolator",
        ],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["bloodthorn", "wind_waker", "assault"],
      },
    },
  },

  // YoonA plays hero
  medusa: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699959648, es: 3160080228 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40541,
        power_level: [1.1, 1.7, 2.7, 2.9],
        facet: 1,
        abilities: [
          "medusa_mystic_snake", // 1
          `medusa_mana_shield`, // 2
          "medusa_mystic_snake", // 3
          "medusa_split_shot", // 4
          "medusa_mystic_snake", // 5
          "medusa_split_shot", // 6
          `medusa_mystic_snake`, // 7
          "medusa_split_shot", // 8
          `medusa_split_shot`, // 9
          `medusa_stone_gaze`, // 10
          `medusa_mana_shield`, // 11
          "medusa_mana_shield", // 12
          "medusa_mana_shield", // 13
          `special_bonus_unique_medusa_snake_damage`, // 14
          `special_bonus_unique_medusa_2`, // 15
          "medusa_stone_gaze", // 16
          "special_bonus_attributes", // 17
          "medusa_stone_gaze", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_medusa`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_medusa_4", // 25
        ],
        items: {
          starting: [`magic_wand`, `branches`, `branches`, `branches`],
          early_game: [
            `ring_of_basilius`,
            `arcane_boots`,
            `wind_lace`,
            `yasha`,
          ],
          mid_game: [
            `manta`,
            `diffusal_blade`,
            `butterfly`,
            `disperser`,
            `skadi`,
          ],
          late_game: [`greater_crit`, `sheepstick`, `swift_blink`, `rapier`],
          situational: [
            `power_treads`,
            `falcon_blade`,
            `mask_of_madness`,
            `dragon_lance`,
            `phylactery`,
            `angels_demise`,
            `hurricane_pike`,
            `sange_and_yasha`,
            `black_king_bar`,
            `blink`,
            `sphere`,
            "monkey_king_bar",
            `silver_edge`,
            `mjollnir`,
            `devastator`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `manta`,
            `butterfly`,
            `disperser`,
            `skadi`,
            `greater_crit`,
            `sheepstick`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            "grove_bow",
            `vambrace`,
            "elven_tunic",
            `enchanted_quiver`,
            `ancient_guardian`,
            `ninja_gear`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
    ],

    combo: [
      `medusa_split_shot`,
      `blink`,
      `medusa_stone_gaze`,
      `medusa_mystic_snake`,
    ],
    counter_items: {
      laning_phase: {
        all: ["ring_of_regen", "wind_lace", "boots"],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: {
        all: [],
        support: ["ward_dispenser", "glimmer_cape", "force_staff", "ghost"],
        core: ["crimson_guard", "diffusal_blade", "heavens_halberd"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade"],
        support: [],
        core: ["abyssal_blade", "assault", "butterfly", "bloodthorn"],
      },
    },
  },

  meepo: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699959764, es: 3160080304 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40578,
        // Mid: 1.4	2.6	2.3	1.9 [77%]
        // Carry: 1.3	2.6	2.3	1.9 [15%]
        power_level: [1.4, 2.6, 2.3, 1.9],
        abilities: [
          `meepo_poof`, // 1
          `meepo_ransack`, // 2
          `meepo_earthbind`, // 3
          "meepo_divided_we_stand", // 4
          "meepo_poof", // 5
          `meepo_poof`, // 6
          "meepo_poof", // 7
          `meepo_earthbind`, // 8
          `meepo_ransack`, // 9
          `special_bonus_unique_meepo_2`, // 10
          "meepo_divided_we_stand", // 11
          `meepo_ransack`, // 12
          "meepo_ransack", // 13
          `meepo_earthbind`, // 14
          `special_bonus_evasion_15`, // 15
          `meepo_earthbind`, // 16
          "special_bonus_attributes", // 17
          "meepo_divided_we_stand", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_meepo_6`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_meepo_poof_cast_point", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            `circlet`,
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [
            `wraith_band`,
            `wraith_band`,
            `power_treads`,
            "ultimate_scepter",
          ],
          mid_game: ["blink", "aghanims_shard", "diffusal_blade", "disperser"],
          late_game: [`sheepstick`, `swift_blink`, `heart`, "skadi"],
          situational: [`bloodthorn`, `travel_boots`, "nullifier"],
          core: [
            `wraith_band`,
            `power_treads`,
            `ultimate_scepter`,
            `blink`,
            `aghanims_shard`,
            "disperser",
          ],
          neutral: [
            "unstable_wand",
            `broom_handle`,
            "vambrace",
            `pupils_gift`,
            `elven_tunic`,
            `ogre_seal_totem`,
            "ninja_gear",
            `havoc_hammer`,
            "apex",
            //`fallen_sky`,
          ],
        },
      },
    ],

    combo: ["meepo_poof", `blink`, `meepo_earthbind`, "disperser", `attack`],
    counter_items: {
      laning_phase: {
        all: [],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel", "crimson_guard", "shivas_guard"],
        support: ["ward_dispenser"],
        core: ["black_king_bar", "manta"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "aeon_disk"],
        support: ["black_king_bar"],
        core: ["mjollnir", "bloodthorn", "assault"],
      },
    },
  },

  mirana: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699959872, es: 3160080374 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40591,
        power_level: [1.9, 1.9, 2.1, 2],
        facet: 1,
        abilities: [
          "mirana_arrow", // 1
          "mirana_leap", // 2
          "mirana_starfall", // 3
          "mirana_starfall", // 4
          "mirana_starfall", // 5
          "mirana_selemenes_faithful", // 6
          "mirana_starfall", // 7
          "mirana_arrow", // 8
          "mirana_arrow", // 9
          "mirana_arrow", // 10
          "special_bonus_unique_mirana_3", // 11
          "mirana_selemenes_faithful", // 12
          "mirana_leap", // 13
          "mirana_leap", // 14
          "special_bonus_unique_mirana_5", // 15
          "mirana_leap", // 16
          "special_bonus_attributes", // 17
          "mirana_selemenes_faithful", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_mirana_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_mirana_2", // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            "urn_of_shadows",
            `boots`,
            "magic_wand",
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `spirit_vessel`,
            `arcane_boots`,
            `cyclone`,
            `guardian_greaves`,
            `aghanims_shard`,
          ],
          late_game: [
            `gungir`,
            `hurricane_pike`,
            `ultimate_scepter`,
            `bloodthorn`,
          ],
          situational: [
            `wraith_band`,
            `power_treads`,
            `rod_of_atos`,
            `pavise`,
            `solar_crest`,
            `force_staff`,
            `ancient_janggo`,
            `heavens_halberd`,
            `pipe`,
            `boots_of_bearing`,
            `orchid`,
            `blink`,
            `ghost`,
            `sheepstick`,
            `octarine_core`,
            `aeon_disk`,
            `lotus_orb`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `boots`,
            `spirit_vessel`,
            `arcane_boots`,
            `cyclone`,
            `guardian_greaves`,
            `aghanims_shard`,
            `gungir`,
          ],
          neutral: [
            `unstable_wand`,
            `arcane_ring`,
            `philosophers_stone`,
            `pupils_gift`,
            `defiant_shell`,
            `ceremonial_robe`,
            `timeless_relic`,
            `ninja_gear`,
            `apex`,
            `demonicon`,
          ],
        },
      },
    ],

    combo: [
      `mirana_invis`,
      `mirana_leap`,
      `cyclone`,
      `mirana_arrow`,
      `mirana_leap`,
      `mirana_starfall`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: ["ring_of_regen", "infused_raindrop", "cloak"],
        support: ["ward_observer", "ward_sentry", "dust"],
        core: [],
      },
      mid_game: {
        all: [],
        support: ["SentryDust", "force_staff", "glimmer_cape"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["SentryDustGem", "black_king_bar"],
        core: ["abyssal_blade", "butterfly", "assault"],
      },
    },
  },

  // eidendota plays hero
  monkey_king: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699960030, es: 3160080496 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40620,
        power_level: [2, 2.1, 2.6, 2.6],
        abilities: [
          "monkey_king_boundless_strike", // 1
          "monkey_king_jingu_mastery", // 2
          "monkey_king_jingu_mastery", // 3
          "monkey_king_tree_dance", // 4
          "monkey_king_jingu_mastery", // 5
          "monkey_king_tree_dance", // 6
          "monkey_king_tree_dance", // 7
          "monkey_king_tree_dance", // 8
          "monkey_king_wukongs_command", // 9
          "monkey_king_boundless_strike", // 10
          "monkey_king_boundless_strike", // 11
          "monkey_king_wukongs_command", // 12
          "monkey_king_boundless_strike", // 13
          "special_bonus_unique_monkey_king_9", // 14
          "special_bonus_unique_monkey_king_2", // 15
          "monkey_king_jingu_mastery", // 16
          "special_bonus_attributes", // 17
          "monkey_king_wukongs_command", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_monkey_king_10", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_monkey_king_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "wraith_band",
            "magic_wand",
            "orb_of_corrosion",
          ],
          mid_game: ["bfury", "ultimate_scepter", "black_king_bar"],
          late_game: ["disperser", "skadi", "greater_crit"],
          situational: [
            "infused_raindrop",
            "aghanims_shard",
            "monkey_king_bar",
            "nullifier",
            "butterfly",
            "sphere",
            "abyssal_blade",
            "echo_sabre",
            "diffusal_blade",
            "mjollnir",
          ],
          core: [
            "power_treads",
            "bfury",
            "ultimate_scepter",
            "black_king_bar",
            "skadi",
          ],
          neutral: [
            "broom_handle",
            "occult_bracelet",
            "orb_of_destruction",
            "vambrace",
            "elven_tunic",
            "vindicators_axe",
            "mind_breaker",
            "ninja_gear",
            "desolator_2",
            "pirate_hat",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2718158708, es: 3160080582 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40626,
        power_level: [1.1, 1.7, 2.2, 2.3],
        abilities: [
          "monkey_king_tree_dance", // 1
          "monkey_king_boundless_strike", // 2
          "monkey_king_tree_dance", // 3
          "monkey_king_boundless_strike", // 4
          "monkey_king_tree_dance", // 5
          "monkey_king_wukongs_command", // 6
          "monkey_king_tree_dance", // 7
          "monkey_king_boundless_strike", // 8
          "monkey_king_boundless_strike", // 9
          "special_bonus_unique_monkey_king_9", // 10
          "monkey_king_jingu_mastery", // 11
          "monkey_king_wukongs_command", // 12
          "monkey_king_jingu_mastery", // 13
          "monkey_king_jingu_mastery", // 14
          "special_bonus_unique_monkey_king_7", // 15
          "monkey_king_jingu_mastery", // 16
          "special_bonus_attributes", // 17
          "monkey_king_wukongs_command", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_monkey_king_10", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_monkey_king_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "orb_of_venom",
            "blood_grenade",
            "branches",
            "branches",
            "ward_sentry",
          ],
          early_game: [
            "orb_of_corrosion",
            "boots",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: ["orchid", "power_treads", "mage_slayer"],
          late_game: ["black_king_bar", "gungir"],
          situational: [
            "sheepstick",
            "spirit_vessel",
            "heavens_halberd",
            "cyclone",
            "diffusal_blade",
            "rod_of_atos",
            "force_staff",
            "heavens_halberd",
          ],
          core: ["orb_of_corrosion", "orchid", "mage_slayer", "power_treads"],
          neutral: [
            "broom_handle",
            "duelist_gloves",
            "orb_of_destruction",
            "vambrace",
            "elven_tunic",
            "craggy_coat",
            "mind_breaker",
            "ninja_gear",
            "desolator_2",
            "pirate_hat",
            "mirror_shield",
          ],
        },
      },
    ],

    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          "wind_lace",
          "boots",
          "quelling_blade",
          "armor",
          "urn_of_shadows",
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel", "cyclone", "mekansm"],
        support: ["force_staff", "glimmer_cape"],
        core: ["crimson_guard", "hurricane_pike", "silver_edge", "basher"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade"],
        support: [],
        core: [
          "assault",
          "radiance",
          "skadi",
          "shivas_guard",
          "abyssal_blade",
          "butterfly",
          "bloodthorn",
          "nullifier",
        ],
      },
    },
  },

  // eidendota plays hero
  morphling: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699960135, es: 3160080663 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40643,
        // Mid: 1.1	1.5	2.7	2.9 [17%]
        // Carry: 1.2	1.6	2.7	2.9 [81%]
        power_level: [1.2, 1.6, 2.7, 2.9],
        abilities: [
          "morphling_morph_agi", // 1
          "morphling_adaptive_strike_agi", // 2
          "morphling_adaptive_strike_agi", // 3
          "morphling_waveform", // 4
          "morphling_adaptive_strike_agi", // 5
          "morphling_morph_agi", // 6
          "morphling_adaptive_strike_agi", // 7
          "morphling_waveform", // 8
          "morphling_waveform", // 9
          "morphling_waveform", // 10
          "special_bonus_unique_morphling_1", // 11
          "morphling_morph_agi", // 12
          "morphling_replicate", // 13
          "morphling_morph_agi", // 14
          "special_bonus_agility_15", // 15
          "morphling_replicate", // 16
          "special_bonus_attributes", // 17
          "morphling_replicate", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_morphling_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_morphling_waveform_cooldown", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            "branches",
            "branches",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "lifesteal",
            "magic_wand",
            "falcon_blade",
          ],
          mid_game: ["manta", "angels_demise", "black_king_bar"],
          late_game: ["skadi", "butterfly", "satanic", "travel_boots"],
          situational: [
            "sphere",
            "aghanims_shard",
            "hurricane_pike",
            "sange_and_yasha",
            "ultimate_scepter",
            "monkey_king_bar",
          ],
          core: ["manta", "angels_demise", "black_king_bar", "skadi"],
          neutral: [
            "occult_bracelet",
            "unstable_wand",
            "specialists_array",
            "grove_bow",
            "paladin_sword",
            "elven_tunic",
            "ninja_gear",
            "mind_breaker",
            "mirror_shield",
            "apex",
            "force_boots",
          ],
        },
      },
    ],

    combo: [],
    counter_items: {
      laning_phase: {
        all: ["infused_raindrop", "urn_of_shadows"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel"],
        support: ["glimmer_cape"],
        core: [
          "orchid",
          "diffusal_blade",
          "heavens_halberd",
          "black_king_bar",
          "mage_slayer",
          "basher",
        ],
      },
      late_game: {
        all: ["sheepstick", "shivas_guard", "sphere", "aeon_disk"],
        support: ["black_king_bar"],
        core: ["skadi", "abyssal_blade", "butterfly", "bloodthorn"],
      },
    },
  },

  muerta: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2943493038, es: 3160080750 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40646,
        power_level: [1.8, 1.9, 2.6, 2.7],
        facet: 1,
        abilities: [
          "muerta_dead_shot", // 1
          "muerta_the_calling", // 2
          "muerta_dead_shot", // 3
          `muerta_gunslinger`, // 4
          "muerta_dead_shot", // 5
          "muerta_pierce_the_veil", // 6
          `muerta_dead_shot`, // 7
          `muerta_gunslinger`, // 8
          `muerta_gunslinger`, // 9
          `muerta_gunslinger`, // 10
          `special_bonus_unique_muerta_dead_shot_range`, // 11
          "muerta_pierce_the_veil", // 12
          `muerta_the_calling`, // 13
          `muerta_the_calling`, // 14
          "special_bonus_unique_muerta_gunslinger_bonus_damage", // 15
          `muerta_the_calling`, // 16
          "special_bonus_attributes", // 17
          "muerta_pierce_the_veil", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_muerta_dead_shot_charges`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_muerta_gunslinger_double_shot_chance`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `mantle`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            `null_talisman`,
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
            `maelstrom`,
          ],
          mid_game: [
            `dragon_lance`,
            `mjollnir`,
            `black_king_bar`,
            `hurricane_pike`,
            `greater_crit`,
          ],
          late_game: [
            `aghanims_shard`,
            `moon_shard`,
            `swift_blink`,
            `refresher`,
          ],
          situational: [
            `hand_of_midas`,
            `falcon_blade`,
            `mask_of_madness`,
            `witch_blade`,
            `mage_slayer`,
            `manta`,
            `yasha_and_kaya`,
            `blink`,
            `ethereal_blade`,
            "monkey_king_bar",
            `sphere`,
            "satanic",
            `ultimate_scepter`,
            `gungir`,
            `silver_edge`,
            `skadi`,
            `bloodthorn`,
            `sheepstick`,
            `revenants_brooch`,
            `travel_boots`,
          ],
          core: [
            `power_treads`,
            `maelstrom`,
            `dragon_lance`,
            `mjollnir`,
            `black_king_bar`,
            `hurricane_pike`,
            `greater_crit`,
          ],
          neutral: [
            `arcane_ring`,
            `mysterious_hat`,
            `grove_bow`,
            `pupils_gift`,
            `elven_tunic`,
            `enchanted_quiver`,
            `mind_breaker`,
            `timeless_relic`,
            `pirate_hat`,
            `mirror_shield`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2943887000, es: 3160080818 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40647,
        power_level: [1.7, 1.9, 2, 2.2],
        facet: 1,
        abilities: [
          "muerta_dead_shot", // 1
          "muerta_the_calling", // 2
          "muerta_dead_shot", // 3
          `muerta_the_calling`, // 4
          "muerta_dead_shot", // 5
          "muerta_pierce_the_veil", // 6
          `muerta_dead_shot`, // 7
          `muerta_the_calling`, // 8
          `muerta_the_calling`, // 9
          `special_bonus_unique_muerta_dead_shot_range`, // 10
          `muerta_gunslinger`, // 11
          "muerta_pierce_the_veil", // 12
          `muerta_gunslinger`, // 13
          `muerta_gunslinger`, // 14
          `special_bonus_unique_muerta_gunslinger_bonus_damage`, // 15
          `muerta_gunslinger`, // 16
          "special_bonus_attributes", // 17
          "muerta_pierce_the_veil", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_muerta_dead_shot_charges`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_muerta_gunslinger_double_shot_chance`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `rod_of_atos`,
            `gungir`,
            `force_staff`,
            `aghanims_shard`,
          ],
          late_game: [
            `hurricane_pike`,
            `blink`,
            `sheepstick`,
            `black_king_bar`,
          ],
          situational: [
            `hand_of_midas`,
            `veil_of_discord`,
            `spirit_vessel`,
            `aether_lens`,
            `glimmer_cape`,
            `pavise`,
            `solar_crest`,
            `ancient_janggo`,
            `guardian_greaves`,
            `lotus_orb`,
            `ethereal_blade`,
            `cyclone`,
            `pipe`,
            `aeon_disk`,
            `mage_slayer`,
            `octarine_core`,
            `ultimate_scepter`,
            `bloodthorn`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `rod_of_atos`,
            `gungir`,
            `force_staff`,
            `aghanims_shard`,
            `blink`,
            `sheepstick`,
          ],
          neutral: [
            `mysterious_hat`,
            `faded_broach`,
            `bullwhip`,
            `grove_bow`,
            `psychic_headband`,
            `enchanted_quiver`,
            `spy_gadget`,
            `timeless_relic`,
            `force_boots`,
            `pirate_hat`,
          ],
        },

        // item_tooltips: {
        // greater_crit: `A core item that massively boosts your damage and kill threat on the map.`,
        // revenants_brooch: `A luxury late game item with similar usage as Pierce the Veil. Be careful not to use it when the enemy hero has active spell immunity.`,
        // skadi: `Another item that helps you stick on top of enemy heroes, similar to Gleipnir. Also effective against lifesteal and high HP regenerating heroes.`,
        // swift_blink: `A late game pick up that boosts your movement speed and right clicking ability. You can replace Power Treads with it once you have a full inventory.`,
      },
    ],
    combo: [`muerta_the_calling`, `muerta_dead_shot`, `muerta_pierce_the_veil`],
    counter_items: {
      laning_phase: {
        all: ["infused_raindrop", "boots", "wind_lace"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["magicResistance"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "black_king_bar",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "heavens_halberd",
          "mage_slayer",
        ],
      },
      late_game: {
        all: [],
        support: ["aeon_disk", "wind_waker"],
        core: ["sheepstick", "abyssal_blade", "satanic", "bloodthorn"],
      },
    },
  },

  // eidendota plays hero
  naga_siren: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699960208, es: 3160080903 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40644,
        power_level: [1.4, 2, 2.5, 2.4],
        abilities: [
          "naga_siren_mirror_image", // 1
          "naga_siren_eelskin", // 2
          "naga_siren_mirror_image", // 3
          "naga_siren_ensnare", // 4
          "naga_siren_mirror_image", // 5
          "naga_siren_eelskin", // 6
          "naga_siren_mirror_image", // 7
          "naga_siren_eelskin", // 8
          "naga_siren_eelskin", // 9
          "special_bonus_unique_naga_siren_2", // 10
          "naga_siren_song_of_the_siren", // 11
          "naga_siren_ensnare", // 12
          "naga_siren_ensnare", // 13
          "naga_siren_ensnare", // 14
          "special_bonus_unique_naga_siren_4", // 15
          "naga_siren_song_of_the_siren", // 16
          "special_bonus_attributes", // 17
          "naga_siren_song_of_the_siren", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_naga_siren", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_naga_siren_6", // 25
        ],
        items: {
          starting: [
            "quelling_blade",
            "tango",
            "branches",
            "branches",
            "slippers",
            "circlet",
          ],
          early_game: ["power_treads", "wraith_band", "yasha"],
          mid_game: ["manta", "orchid", "heart", "aghanims_shard"],
          late_game: [
            "butterfly",
            "disperser",
            "bloodthorn",
            "sheepstick",
            "travel_boots",
          ],
          situational: [
            "infused_raindrop",
            "hand_of_midas",
            "diffusal_blade",
            "black_king_bar",
            "ultimate_scepter",
            "abyssal_blade",
            "sphere",
          ],
          core: ["manta", "orchid", "heart", "butterfly"],
          neutral: [
            "unstable_wand",
            "occult_bracelet",
            "pupils_gift",
            "vambrace",
            "elven_tunic",
            "vindicators_axe",
            "avianas_feather",
            "mind_breaker",
            "ninja_gear",
            "apex",
            "mirror_shield",
            "pirate_hat",
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["armor"],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: {
        all: ["dagon"],
        support: ["ward_dispenser", "glimmer_cape", "force_staff", "ghost"],
        core: [
          "maelstrom",
          "bfury",
          "black_king_bar",
          "gungir",
          "travel_boots",
          "manta",
        ],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade"],
        support: ["black_king_bar", "travel_boots"],
        core: [
          "mjollnir",
          "shivas_guard",
          "radiance",
          "abyssal_blade",
          "butterfly",
          "bloodthorn",
          "overwhelming_blink",
          "satanic",
        ],
      },
    },
  },

  // eidendota plays hero
  // Nature's Prophet
  furion: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699960338, es: 3160081012 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40660,
        power_level: [2.1, 2.4, 2.4, 2.2],
        abilities: [
          `furion_sprout`, // 1
          "furion_teleportation", // 2
          `furion_sprout`, // 3
          `furion_teleportation`, // 4
          `furion_sprout`, // 5
          "furion_wrath_of_nature", // 6
          `furion_sprout`, // 7
          "furion_teleportation", // 8
          "furion_teleportation", // 9
          "special_bonus_unique_furion_5", // 10
          `furion_force_of_nature`, // 11
          "furion_wrath_of_nature", // 12
          `furion_force_of_nature`, // 13
          `furion_force_of_nature`, // 14
          "special_bonus_unique_furion_teleportation_barrier", // 15
          `furion_force_of_nature`, // 16
          "special_bonus_attributes", // 17
          "furion_wrath_of_nature", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_furion_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_furion_3", // 25
        ],
        items: {
          starting: [
            `tango`,
            `circlet`,
            "magic_stick",
            "branches",
            "branches",
            "branches",
          ],
          early_game: [`power_treads`, `magic_wand`, `orchid`],
          mid_game: [`mage_slayer`, `aghanims_shard`, `gungir`],
          late_game: [`black_king_bar`, `sheepstick`, `assault`, `bloodthorn`],
          situational: [
            "infused_raindrop",
            `ultimate_scepter`,
            `maelstrom`,
            `heavens_halberd`,
            `witch_blade`,
            `blink`,
            `hurricane_pike`,
            `monkey_king_bar`,
            `nullifier`,
            `sphere`,
            "spirit_vessel",
          ],
          core: [
            "power_treads",
            `orchid`,
            "mage_slayer",
            "aghanims_shard",
            `gungir`,
          ],
          neutral: [
            `duelist_gloves`,
            `lance_of_pursuit`,
            `specialists_array`,
            `grove_bow`,
            `elven_tunic`,
            `vindicators_axe`,
            `trickster_cloak`,
            `mind_breaker`,
            `desolator_2`,
            `pirate_hat`,
          ],
        },
        // item_tooltips:
        /* ancient_janggo:
            "If you are fighting and grouping a lot early on. The buff works on summons.", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2718666197, es: 3160081087 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40661,
        // Carry : 2.1	2.4	2.4	2.2 [3.2%]
        // Mid: 1.6	2.3	2.4	2.2 [14%]
        power_level: [1.6, 2.3, 2.4, 2.2],
        abilities: [
          `furion_teleportation`, // 1
          "furion_sprout", // 2
          `furion_sprout`, // 3
          `furion_teleportation`, // 4
          `furion_sprout`, // 5
          "furion_wrath_of_nature", // 6
          `furion_sprout`, // 7
          `furion_teleportation`, // 8
          `furion_teleportation`, // 9
          `special_bonus_unique_furion_5`, // 10
          `furion_force_of_nature`, // 11
          "furion_wrath_of_nature", // 12
          `furion_force_of_nature`, // 13
          `furion_force_of_nature`, // 14
          "special_bonus_unique_furion_teleportation_barrier", // 15
          `furion_force_of_nature`, // 16
          "special_bonus_attributes", // 17
          "furion_wrath_of_nature", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_furion_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_furion_3", // 25
        ],
        items: {
          starting: [
            `tango`,
            `circlet`,
            "magic_stick",
            "branches",
            "branches",
            "branches",
          ],
          early_game: [
            `power_treads`,
            `magic_wand`,
            "wraith_band",
            "maelstrom",
          ],
          mid_game: [`mage_slayer`, `aghanims_shard`, "witch_blade", `gungir`],
          late_game: [
            "black_king_bar",
            `devastator`,
            `satanic`,
            `butterfly`,
            `sheepstick`,
          ],
          situational: [
            "infused_raindrop",
            `mjollnir`,
            `hand_of_midas`,
            `bloodthorn`,
            `orchid`,
            `blink`,
            `hurricane_pike`,
            `monkey_king_bar`,
            `sphere`,
            "ultimate_scepter",
          ],
          core: [
            `power_treads`,
            `gungir`,
            `mage_slayer`,
            `aghanims_shard`,
            "black_king_bar",
          ],
          neutral: [
            `duelist_gloves`,
            `lance_of_pursuit`,
            `specialists_array`,
            `grove_bow`,
            `elven_tunic`,
            `vindicators_axe`,
            `trickster_cloak`,
            `mind_breaker`,
            `desolator_2`,
            `pirate_hat`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2718666233, es: 3160081186 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40662,
        power_level: [2.1, 1.9, 2.1, 1.9],
        abilities: [
          `furion_teleportation`, // 1
          "furion_sprout", // 2
          `furion_sprout`, // 3
          `furion_teleportation`, // 4
          `furion_sprout`, // 5
          "furion_wrath_of_nature", // 6
          `furion_sprout`, // 7
          `furion_teleportation`, // 8
          `furion_teleportation`, // 9
          "special_bonus_unique_furion_5", // 10
          `furion_force_of_nature`, // 11
          "furion_wrath_of_nature", // 12
          `furion_force_of_nature`, // 13
          `furion_force_of_nature`, // 14
          "special_bonus_unique_furion_teleportation_barrier", // 15
          `furion_force_of_nature`, // 16
          "special_bonus_attributes", // 17
          "furion_wrath_of_nature", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_furion_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_furion_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "circlet",
            `blood_grenade`,
            `branches`,
            `faerie_fire`,
            `ward_observer`,
            `ward_sentry`,
            "ward_sentry",
          ],
          early_game: [
            "blood_grenade",
            `urn_of_shadows`,
            `magic_wand`,
            `wind_lace`,
            `power_treads`,
          ],
          mid_game: ["spirit_vessel", `ultimate_scepter`, `aghanims_shard`],
          late_game: [`sheepstick`, `bloodthorn`, `assault`, "gungir"],
          situational: [
            "infused_raindrop",
            `glimmer_cape`,
            "rod_of_atos",
            `force_staff`,
            `octarine_core`,
            `blink`,
            `heavens_halberd`,
            `pipe`,
            `silver_edge`,
            `monkey_king_bar`,
          ],
          core: [
            "power_treads",
            "spirit_vessel",
            `aghanims_shard`,
            "ultimate_scepter",
          ],
          neutral: [
            `trusty_shovel`,
            `lance_of_pursuit`,
            `specialists_array`,
            `grove_bow`,
            `ogre_seal_totem`,
            `enchanted_quiver`,
            `trickster_cloak`,
            `mind_breaker`,
            `desolator_2`,
            `pirate_hat`,
          ],
        },
        // item_tooltips:
        // mekansm: "Rush this item on support natures prophet.",
      },
    ],
    combo: [
      `furion_wrath_of_nature`,
      `furion_teleportation`,
      `furion_sprout`,
      `furion_force_of_nature`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: ["ring_of_regen", "quelling_blade", "armor", "infused_raindrop"],
        support: [],
        core: ["ring_of_health", "phase_boots"],
      },
      mid_game: {
        all: ["quelling_blade"],
        support: ["force_staff", "glimmer_cape", "ghost"],
        core: [
          "crimson_guard",
          "bfury",
          "heavens_halberd",
          "basher",
          "travel_boots",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["travel_boots"],
        core: ["abyssal_blade", "assault", "butterfly"],
      },
    },
  },

  necrolyte: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699960447, es: 3160081250 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40654,
        power_level: [1.9, 2.1, 2.4, 2.2],
        abilities: [
          "necrolyte_death_pulse", // 1
          "necrolyte_heartstopper_aura", // 2
          "necrolyte_death_pulse", // 3
          "necrolyte_sadist", // 4   equals to `ghost shroud`
          "necrolyte_death_pulse", // 5
          "necrolyte_reapers_scythe", // 6
          "necrolyte_death_pulse", // 7
          "necrolyte_heartstopper_aura", // 8
          "necrolyte_heartstopper_aura", // 9
          "necrolyte_heartstopper_aura", // 10
          `special_bonus_unique_necrophos_6`, // 11
          "necrolyte_reapers_scythe", // 12
          "necrolyte_sadist", // 13
          "necrolyte_sadist", // 14
          `special_bonus_unique_necrophos_3`, // 15
          "necrolyte_sadist", // 16
          "special_bonus_attributes", // 17
          "necrolyte_reapers_scythe", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_necrophos_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_necrophos_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "circlet",
            "mantle",
            `ward_observer`,
          ],
          early_game: [
            `null_talisman`,
            `bracer`,
            "boots",
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: ["radiance", "travel_boots", "aghanims_shard"],
          late_game: [
            `heart`,
            `ultimate_scepter`,
            `octarine_core`,
            "wind_waker",
            "overwhelming_blink",
          ],
          situational: [
            "kaya_and_sange",
            `spirit_vessel`,
            `crimson_guard`,
            `heavens_halberd`,
            "shivas_guard",
            `eternal_shroud`,
            `black_king_bar`,
            `sphere`,
            `lotus_orb`,
            `sheepstick`,
            "cyclone",
          ],
          core: [
            `travel_boots`,
            `radiance`,
            `aghanims_shard`,
            `heart`,
            `ultimate_scepter`,
            "octarine_core",
          ],
          neutral: [
            `mysterious_hat`,
            `faded_broach`,
            `vambrace`,
            `pupils_gift`,
            `cloak_of_flames`,
            //`quickening_charm`,
            `trickster_cloak`,
            //`spell_prism`,
            //`fallen_sky`,
            //`ex_machina`,
            "havoc_hammer",
            "stormcrafter",
            "mirror_shield",
            "giants_ring",
          ],
        },
        // item_tooltips:
        /* power_treads:
            "A core item that tanks you up forther. Improves your attack speed signifcantly.", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2718666066, es: 3160081324 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40655,
        power_level: [2.1, 2.1, 2.3, 2.2],
        abilities: [
          "necrolyte_death_pulse", // 1
          "necrolyte_heartstopper_aura", // 2
          "necrolyte_death_pulse", // 3
          "necrolyte_sadist", // 4   equals to `ghost shroud`
          "necrolyte_death_pulse", // 5
          "necrolyte_reapers_scythe", // 6
          "necrolyte_death_pulse", // 7
          "necrolyte_heartstopper_aura", // 8
          "necrolyte_heartstopper_aura", // 9
          "necrolyte_heartstopper_aura", // 10
          `special_bonus_unique_necrophos_6`, // 11
          "necrolyte_reapers_scythe", // 12
          "necrolyte_sadist", // 13
          "necrolyte_sadist", // 14
          `special_bonus_unique_necrophos_3`, // 15
          "necrolyte_sadist", // 16
          "special_bonus_attributes", // 17
          "necrolyte_reapers_scythe", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_necrophos_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_necrophos_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "circlet",
            "mantle",
            `ward_observer`,
          ],
          early_game: [
            `null_talisman`,
            `bracer`,
            "boots",
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: ["radiance", "travel_boots", "aghanims_shard"],
          late_game: [
            `heart`,
            `ultimate_scepter`,
            `octarine_core`,
            "wind_waker",
            "overwhelming_blink",
          ],
          situational: [
            `spirit_vessel`,
            `crimson_guard`,
            `heavens_halberd`,
            "shivas_guard",
            `eternal_shroud`,
            `black_king_bar`,
            `sphere`,
            `lotus_orb`,
            `sheepstick`,
          ],
          core: [
            `travel_boots`,
            `radiance`,
            `aghanims_shard`,
            `heart`,
            `ultimate_scepter`,
            "octarine_core",
          ],
          neutral: [
            `mysterious_hat`,
            `faded_broach`,
            `vambrace`,
            `pupils_gift`,
            `cloak_of_flames`,
            //`quickening_charm`,
            `trickster_cloak`,
            //`spell_prism`,
            //`fallen_sky`,
            //`ex_machina`,
            "havoc_hammer",
            "stormcrafter",
            "mirror_shield",
            "giants_ring",
          ],
        },
      },
    ],
    // item_tooltips:
    /* hood_of_defiance:
        "A core item that makes you less susceptible to magical damage, especially under the effect of the Ghost Shroud.", */
    /* holy_locket:
        "If you feel your team doesnt need more damage but rather needs sustain. Amplifies all healing. Goes very well with your Death Pulse and its talent.", */
    combo: [
      `necrolyte_death_seeker`,
      `necrolyte_death_pulse`,
      "necrolyte_sadist",
      `necrolyte_reapers_scythe`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "infused_raindrop"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel"],
        support: ["glimmer_cape"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "orchid",
          "black_king_bar",
        ],
      },
      late_game: {
        all: ["aeon_disk", "wind_waker", "revenants_brooch"],
        support: ["black_king_bar"],
        core: ["skadi", "shivas_guard", "nullifier"],
      },
    },
  },

  // eidendota plays hero
  night_stalker: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699960635, es: 3160081415 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40656,
        power_level: [0.9, 1.9, 2.5, 2.2],
        abilities: [
          "night_stalker_void", // 1
          "night_stalker_hunter_in_the_night", // 2
          "night_stalker_void", // 3
          "night_stalker_hunter_in_the_night", // 4
          "night_stalker_void", // 5
          "night_stalker_darkness", // 6
          "night_stalker_void", // 7
          "night_stalker_crippling_fear", // 8
          "night_stalker_hunter_in_the_night", // 9
          `special_bonus_unique_night_stalker_7`, // 10
          `night_stalker_hunter_in_the_night`, // 11
          "night_stalker_darkness", // 12
          "night_stalker_crippling_fear", // 13
          "night_stalker_crippling_fear", // 14
          "special_bonus_unique_night_stalker_3", // 15
          "night_stalker_crippling_fear", // 16
          "special_bonus_attributes", // 17
          "night_stalker_darkness", // 18
          "special_bonus_attributes", // 19
          "special_bonus_strength_20", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_night_stalker`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `gauntlets`,
            `circlet`,
            `branches`,
          ],
          early_game: ["bracer", "phase_boots", "magic_wand", "echo_sabre"],
          mid_game: ["aghanims_shard", "black_king_bar", `blink`, `basher`],
          late_game: [
            "harpoon",
            "abyssal_blade",
            "assault",
            "overwhelming_blink",
          ],
          situational: [
            `heavens_halberd`,
            `silver_edge`,
            `sphere`,
            `ultimate_scepter`,
            "hand_of_midas",
            "nullifier",
          ],
          core: [
            "phase_boots",
            "echo_sabre",
            "aghanims_shard",
            "black_king_bar",
            "blink",
            "basher",
          ],
          neutral: [
            "broom_handle",
            `lance_of_pursuit`,
            //`dagger_of_ristul`,
            `vambrace`,
            "orb_of_destruction",
            //`titan_sliver`,
            "ogre_seal_totem",
            `mind_breaker`,
            //"penta_edged_sword",
            "desolator_2",
            `giants_ring`,
            "pirate_hat",
          ],
        },
      },
    ],
    combo: [
      `night_stalker_darkness`,
      `night_stalker_crippling_fear`,
      `blink`,
      `black_king_bar`,
      `night_stalker_void`,
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots"],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape", "force_staff", "ghost"],
        core: ["hurricane_pike", "silver_edge", "heavens_halberd"],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["aeon_disk"],
        core: ["abyssal_blade", "assault", "bloodthorn", "butterfly"],
      },
    },
  },

  nyx_assassin: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699960726, es: 3160081493 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40564,
        power_level: [0.7, 1.9, 2.2, 2.2],
        facet: 1,
        abilities: [
          "nyx_assassin_impale", // 1
          `nyx_assassin_jolt`, // 2
          "nyx_assassin_impale", // 3
          `nyx_assassin_spiked_carapace`, // 4
          "nyx_assassin_impale", // 5
          "nyx_assassin_vendetta", // 6
          "nyx_assassin_impale", // 7
          `nyx_assassin_jolt`, // 8
          `nyx_assassin_jolt`, // 9
          `nyx_assassin_jolt`, // 10
          `special_bonus_unique_nyx_vendetta_damage`, // 11
          "nyx_assassin_vendetta", // 12
          `nyx_assassin_spiked_carapace`, // 13
          `nyx_assassin_spiked_carapace`, // 14
          `special_bonus_unique_nyx_jolt_cooldown`, // 15
          `nyx_assassin_spiked_carapace`, // 16
          "special_bonus_attributes", // 17
          "nyx_assassin_vendetta", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_nyx_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_nyx`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `wind_lace`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `dagon_5`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `aether_lens`,
          ],
          late_game: [`blink`, `octarine_core`, `wind_waker`, `ethereal_blade`],
          situational: [
            `spirit_vessel`,
            `meteor_hammer`,
            `cyclone`,
            `ghost`,
            `force_staff`,
            `phylactery`,
            `kaya_and_sange`,
            `lotus_orb`,
            `guardian_greaves`,
            `sheepstick`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `dagon_5`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `blink`,
            `octarine_core`,
            `wind_waker`,
          ],
          neutral: [
            `arcane_ring`,
            `faded_broach`,
            `grove_bow`,
            `bullwhip`,
            `enchanted_quiver`,
            `ceremonial_robe`,
            `timeless_relic`,
            `ascetic_cap`,
            `seer_stone`,
            `force_boots`,
          ],
        },
      },
    ],
    // ability_tooltips:
    /*nyx_assassin_mana_burn: `You can skill this spell on level 4 if you are playing against a high intelligence enemy hero in lane. Use it off cd in that case.`,*/
    combo: [
      `nyx_assassin_vendetta`,
      `nyx_assassin_impale`,
      `ethereal_blade`,
      `dagon_5`,
      `nyx_assassin_jolt`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "arcane_boots", "infused_raindrop", "cloak"],
        support: ["ward_sentry", "dust"],
        core: ["soul_ring"],
      },
      mid_game: {
        all: [],
        support: ["SentryDust", "glimmer_cape"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["SentryDustGem", "black_king_bar"],
        core: ["abyssal_blade"],
      },
    },
  },

  // YoonA plays hero
  ogre_magi: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699960831, es: 3160081572 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40560,
        power_level: [1.7, 1.8, 1.8, 1.5],
        facet: 2,
        abilities: [
          "ogre_magi_ignite", // 1
          "ogre_magi_fireblast", // 2
          "ogre_magi_ignite", // 3
          `ogre_magi_bloodlust`, // 4
          "ogre_magi_ignite", // 5
          "ogre_magi_multicast", // 6
          "ogre_magi_ignite", // 7
          "ogre_magi_fireblast", // 8
          "ogre_magi_fireblast", // 9
          "special_bonus_unique_ogre_magi_4", // 10
          `ogre_magi_fireblast`, // 11
          "ogre_magi_multicast", // 12
          "ogre_magi_bloodlust", // 13
          "ogre_magi_bloodlust", // 14
          `special_bonus_unique_ogre_magi_dumb_luck_mana`, // 15
          `ogre_magi_bloodlust`, // 16
          "special_bonus_attributes", // 17
          "ogre_magi_multicast", // 18
          "special_bonus_attributes", // 19
          `special_bonus_strength_30`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_ogre_magi_2", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `branches`,
            `branches`,
            `branches`,
            `enchanted_mango`,
            `enchanted_mango`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            "magic_wand",
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `hand_of_midas`,
            `aether_lens`,
            `aghanims_shard`,
            `force_staff`,
          ],
          late_game: [
            `sheepstick`,
            `ultimate_scepter`,
            `octarine_core`,
            `wind_waker`,
          ],
          situational: [
            `orb_of_venom`,
            `soul_ring`,
            `veil_of_discord`,
            `spirit_vessel`,
            `pavise`,
            `glimmer_cape`,
            `cyclone`,
            "lotus_orb",
            `heavens_halberd`,
            "blink",
            `solar_crest`,
            `boots_of_bearing`,
            `phylactery`,
            `ghost`,
            `guardian_greaves`,
            `ethereal_blade`,
            `heart`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `hand_of_midas`,
            `aether_lens`,
            `aghanims_shard`,
            `force_staff`,
            `sheepstick`,
            `ultimate_scepter`,
            `wind_waker`,
          ],
          neutral: [
            `arcane_ring`,
            `trusty_shovel`,
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            `ogre_seal_totem`,
            "spy_gadget",
            `havoc_hammer`,
            "seer_stone",
            `giants_ring`,
          ],
        },
      },
    ],
    combo: [
      `ogre_magi_bloodlust`,
      `veil_of_discord`,
      `ogre_magi_ignite`,
      `ogre_magi_fireblast`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "ring_of_regen", "infused_raindrop", "cloak"],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
        ],
      },
      late_game: { all: [], support: ["black_king_bar"], core: [] },
    },
  },

  omniknight: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699955472, es: 3160081639 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40680,
        power_level: [1.3, 1.6, 2, 1.8],
        abilities: [
          "omniknight_hammer_of_purity", // 1
          `omniknight_purification`, // 2
          `omniknight_purification`, // 3
          `omniknight_martyr`, // 4
          `omniknight_purification`, // 5
          "omniknight_guardian_angel", // 6
          `omniknight_purification`, // 7
          `omniknight_martyr`, // 8
          `omniknight_martyr`, // 9
          `omniknight_martyr`, // 10
          `special_bonus_unique_omniknight_6`, // 11
          "omniknight_guardian_angel", // 12
          "omniknight_hammer_of_purity", // 13
          "omniknight_hammer_of_purity", // 14
          "special_bonus_unique_omniknight_7", // 15
          "omniknight_hammer_of_purity", // 16
          "special_bonus_attributes", // 17
          "omniknight_guardian_angel", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_omniknight_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_omniknight_1", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            "enchanted_mango",
            `branches`,
            `branches`,
            `clarity`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `pavise`,
            `solar_crest`,
            `aether_lens`,
            `force_staff`,
            `aghanims_shard`,
          ],
          late_game: [
            `guardian_greaves`,
            `ultimate_scepter`,
            `blink`,
            `octarine_core`,
          ],
          situational: [
            `orb_of_venom`,
            `boots_of_bearing`,
            `glimmer_cape`,
            `lotus_orb`,
            `holy_locket`,
            `ghost`,
            `vladmir`,
            `aeon_disk`,
            `pipe`,
            `cyclone`,
            `refresher`,
            `ethereal_blade`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `solar_crest`,
            `aether_lens`,
            `force_staff`,
            `guardian_greaves`,
            `ultimate_scepter`,
            `blink`,
          ],
          neutral: [
            "arcane_ring",
            `trusty_shovel`,
            `bullwhip`,
            "philosophers_stone",
            `ogre_seal_totem`,
            "psychic_headband",
            "spy_gadget",
            `martyrs_plate`,
            "seer_stone",
            "force_field",
          ],
        },
      },
    ],
    // item_tooltips:
    /* soul_ring:
        "Lets you use your Purification more frequently. Also if Purification is used on yourself, covers the HP loss from the soulring.", */
    /* wraith_pact: "Could be a useful item offensively or defensively placed.", */
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "wind_lace", "boots", "urn_of_shadows"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel", "cyclone"],
        support: ["glimmer_cape", "force_staff"],
        core: ["orchid", "diffusal_blade", "maelstrom"],
      },
      late_game: {
        all: ["sheepstick"],
        support: [],
        core: [
          "skadi",
          "shivas_guard",
          "nullifier",
          "bloodthorn",
          "mjollnir",
          "monkey_king_bar",
        ],
      },
    },
  },

  // YoonA plays hero
  oracle: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699960994, es: 3160081766 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40648,
        power_level: [1.7, 1.8, 2, 1.7],
        abilities: [
          "oracle_fortunes_end", // 1
          "oracle_purifying_flames", // 2
          "oracle_purifying_flames", // 3
          "oracle_fates_edict", // 4
          "oracle_purifying_flames", // 5
          "oracle_false_promise", // 6
          "oracle_purifying_flames", // 7
          "oracle_fates_edict", // 8
          `oracle_fates_edict`, // 9
          `oracle_fortunes_end`, // 10
          `special_bonus_unique_oracle_9`, // 11
          "oracle_false_promise", // 12
          "oracle_fortunes_end", // 13
          `oracle_fortunes_end`, // 14
          `special_bonus_unique_oracle_5`, // 15
          `oracle_fates_edict`, // 16
          "special_bonus_attributes", // 17
          "oracle_false_promise", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_oracle_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_oracle", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            "enchanted_mango",
            `enchanted_mango`,
            `faerie_fire`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `flask`,
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `aether_lens`,
            `glimmer_cape`,
            `force_staff`,
            `blink`,
          ],
          late_game: [
            `aghanims_shard`,
            `ultimate_scepter`,
            `aeon_disk`,
            `octarine_core`,
          ],
          situational: [
            `spirit_vessel`,
            `holy_locket`,
            `pavise`,
            `solar_crest`,
            `ghost`,
            `cyclone`,
            `boots_of_bearing`,
            `guardian_greaves`,
            `ethereal_blade`,
            `sheepstick`,
            "lotus_orb",
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            `glimmer_cape`,
            `force_staff`,
            `blink`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `aeon_disk`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ogre_seal_totem`,
            "spy_gadget",
            `ascetic_cap`,
            "seer_stone",
            `book_of_shadows`,
          ],
        },
      },
    ],
    // ability_tooltips:
    /* special_bonus_unique_oracle_5:
        "On level 15, take the suggested level 15 talent first and then on level 16 this level 10 talent. The dota client disallows me to indicate the order in graphics above.", */
    combo: [
      `oracle_purifying_flames`,
      `oracle_fortunes_end`,
      `oracle_purifying_flames`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "infused_raindrop",
          "urn_of_shadows",
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel", "blink", "cloak"],
        support: ["force_staff"],
        core: ["orchid", "black_king_bar"],
      },
      late_game: {
        all: [],
        support: [],
        core: ["skadi", "shivas_guard", "satanic"],
      },
    },
  },

  // Outworld Destroyer
  // Outworld Devourer
  obsidian_destroyer: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699961071, es: 3160081831 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40547,
        power_level: [2.2, 2.3, 2.6, 2.5],
        abilities: [
          "obsidian_destroyer_astral_imprisonment", // 1
          "obsidian_destroyer_arcane_orb", // 2
          "obsidian_destroyer_equilibrium", // 3
          "obsidian_destroyer_astral_imprisonment", // 4
          "obsidian_destroyer_astral_imprisonment", // 5
          "obsidian_destroyer_sanity_eclipse", // 6
          "obsidian_destroyer_arcane_orb", // 7
          "obsidian_destroyer_arcane_orb", // 8
          "obsidian_destroyer_arcane_orb", // 9
          "special_bonus_mp_250", // 10
          "obsidian_destroyer_equilibrium", // 11
          "obsidian_destroyer_sanity_eclipse", // 12
          "obsidian_destroyer_equilibrium", // 13
          "obsidian_destroyer_equilibrium", // 14
          "special_bonus_unique_outworld_devourer_astral_castrange", // 15
          "special_bonus_attributes", // 16
          "special_bonus_attributes", // 17
          "obsidian_destroyer_sanity_eclipse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_outworld_devourer_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_outworld_devourer", // 25
        ],
        items: {
          starting: [
            `mantle`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `tango`,
          ],
          early_game: [
            "null_talisman",
            "magic_wand",
            "power_treads",
            "witch_blade",
          ],
          mid_game: [
            `ultimate_scepter`,
            `black_king_bar`,
            `blink`,
            `devastator`,
          ],
          late_game: [`moon_shard`, `hurricane_pike`, "sheepstick"],
          situational: [
            `hand_of_midas`,
            `meteor_hammer`,
            `sphere`,
            `refresher`,
            `swift_blink`,
            `travel_boots`,
            `aghanims_shard`,
          ],
          core: [
            `power_treads`,
            `black_king_bar`,
            `blink`,
            `hurricane_pike`,
            `devastator`,
            `ultimate_scepter`,
            `sheepstick`,
          ],
          neutral: [
            //tier 1
            `arcane_ring`,
            `mysterious_hat`,
            `faded_broach`,

            //tier 2
            `pupils_gift`,
            `vambrace`,
            `grove_bow`,

            //tier 3
            `elven_tunic`,
            `psychic_headband`,
            `enchanted_quiver`,

            //tier 4
            `timeless_relic`,
            `avianas_feather`,
            `mind_breaker`,

            //tier 5
            `mirror_shield`,
            `pirate_hat`,
            `apex`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2719253915, es: 3160081889 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40548,
        power_level: [2.3, 2.3, 2.6, 2.5],
        abilities: [
          "obsidian_destroyer_astral_imprisonment", // 1
          "obsidian_destroyer_arcane_orb", // 2
          "obsidian_destroyer_equilibrium", // 3
          "obsidian_destroyer_astral_imprisonment", // 4
          "obsidian_destroyer_astral_imprisonment", // 5
          "obsidian_destroyer_sanity_eclipse", // 6
          "obsidian_destroyer_arcane_orb", // 7
          "obsidian_destroyer_arcane_orb", // 8
          "obsidian_destroyer_arcane_orb", // 9
          "special_bonus_mp_250", // 10
          "obsidian_destroyer_equilibrium", // 11
          "obsidian_destroyer_sanity_eclipse", // 12
          "obsidian_destroyer_equilibrium", // 13
          "obsidian_destroyer_equilibrium", // 14
          "special_bonus_unique_outworld_devourer_astral_castrange", // 15
          "obsidian_destroyer_astral_imprisonment", // 16
          "special_bonus_attributes", // 17
          "obsidian_destroyer_sanity_eclipse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_outworld_devourer_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_outworld_devourer", // 25
        ],
        items: {
          starting: [
            `mantle`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `tango`,
          ],
          early_game: [
            "null_talisman",
            "magic_wand",
            "power_treads",
            "witch_blade",
          ],
          mid_game: [
            `ultimate_scepter`,
            `black_king_bar`,
            `blink`,
            `devastator`,
          ],
          late_game: [`moon_shard`, `hurricane_pike`, "sheepstick"],
          situational: [
            `hand_of_midas`,
            `meteor_hammer`,
            `sphere`,
            `refresher`,
            `swift_blink`,
            `travel_boots`,
            `aghanims_shard`,
          ],
          core: [
            `power_treads`,
            `black_king_bar`,
            `blink`,
            `hurricane_pike`,
            `devastator`,
            `ultimate_scepter`,
            `sheepstick`,
          ],
          neutral: [
            //tier 1
            `arcane_ring`,
            `mysterious_hat`,
            `faded_broach`,

            //tier 2
            `pupils_gift`,
            `vambrace`,
            `grove_bow`,

            //tier 3
            `elven_tunic`,
            `psychic_headband`,
            `enchanted_quiver`,

            //tier 4
            `timeless_relic`,
            `avianas_feather`,
            `mind_breaker`,

            //tier 5
            `mirror_shield`,
            `pirate_hat`,
            `apex`,
          ],
        },
      },
    ],
    combo: [
      `obsidian_destroyer_astral_imprisonment`,
      `black_king_bar`,
      `meteor_hammer`,
      `obsidian_destroyer_sanity_eclipse`,
      `obsidian_destroyer_arcane_orb`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "infused_raindrop"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["black_king_bar", "blink", "ghost", "blade_mail"],
        support: ["force_staff", "glimmer_cape"],
        core: ["orchid", "heavens_halberd", "silver_edge"],
      },
      late_game: {
        all: [],
        support: [],
        core: ["skadi", "sheepstick", "abyssal_blade"],
      },
    },
  },

  pangolier: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699961166, es: 3160081959 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40585,
        power_level: [1.7, 2.1, 2.5, 2.4],
		facet: 1,
        abilities: [
          "pangolier_shield_crash", // 1
          "pangolier_swashbuckle", // 2
          "pangolier_shield_crash", // 3
          `pangolier_swashbuckle`, // 4
          `pangolier_shield_crash`, // 5
          "pangolier_gyroshell", // 6
          `pangolier_shield_crash`, // 7
          `pangolier_swashbuckle`, // 8
          `pangolier_swashbuckle`, // 9
          `pangolier_lucky_shot`, // 10
          `pangolier_lucky_shot`, // 11
          "pangolier_gyroshell", // 12
          "pangolier_lucky_shot", // 13
          "pangolier_lucky_shot", // 14
          `special_bonus_unique_pangolier_luckyshot_armor`, // 15
          `special_bonus_unique_pangolier_shield_crash_herostacks`, // 16
          "special_bonus_attributes", // 17
          "pangolier_gyroshell", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_pangolier_shield_crash_radius`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pangolier_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `circlet`,
            "circlet",
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `bracer`,
            `power_treads`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            `echo_sabre`,
            `blink`,
			`manta`,
			`aghanims_shard`,
          ],
          late_game: [
            `ultimate_scepter`,
            `shivas_guard`,
            `harpoon`,
            `abyssal_blade`,
          ],
          situational: [
            `wraith_band`,
			`ring_of_basilius`,
			`orb_of_corrosion`,
            `arcane_boots`,
            `veil_of_discord`,
            `spirit_vessel`,
            `guardian_greaves`,
			`cyclone`,
            `maelstrom`,
            `lotus_orb`,
			`sphere`,
            `aeon_disk`,
            `pipe`,
            `crimson_guard`,
			`assault`,
			`diffusal_blade`,
			`basher`,
            `heavens_halberd`,
            `disperser`,
            `octarine_core`,
            `black_king_bar`,
            `gungir`,
            `mjollnir`,
            `mage_slayer`,
			`skadi`,
            `monkey_king_bar`,
            `satanic`,
			`arcane_blink`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `power_treads`,
            `echo_sabre`,
            `blink`,
			`manta`,
			`aghanims_shard`,
            `ultimate_scepter`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `unstable_wand`,
            `pupils_gift`,
            `orb_of_destruction`,
            `defiant_shell`,
            `paladin_sword`,
            `ancient_guardian`,
            `havoc_hammer`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2719254096, es: 3160082045 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40584,
        power_level: [0.9, 1.8, 2, 2.1],
		facet: 1,
        abilities: [
          "pangolier_shield_crash", // 1
          "pangolier_swashbuckle", // 2
          "pangolier_shield_crash", // 3
          `pangolier_swashbuckle`, // 4
          "pangolier_shield_crash", // 5
          "pangolier_gyroshell", // 6
          "pangolier_shield_crash", // 7
          "pangolier_swashbuckle", // 8
          "pangolier_swashbuckle", // 9
          `special_bonus_unique_pangolier`, // 10
          `pangolier_lucky_shot`, // 11
          "pangolier_gyroshell", // 12
          "pangolier_lucky_shot", // 13
          "pangolier_lucky_shot", // 14
          "special_bonus_unique_pangolier_6", // 15
          "pangolier_lucky_shot", // 16
          "special_bonus_attributes", // 17
          "pangolier_gyroshell", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_pangolier_shield_crash_radius`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pangolier_5", // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_sentry`,
            `ward_observer`,
          ],
          early_game: [
            `boots`,
            "magic_wand",
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
			`mekansm`,
			`blink`,
            `guardian_greaves`,
            `cyclone`,
            `aghanims_shard`,
          ],
          late_game: [`pipe`, `gungir`,  `octarine_core`, `overwhelming_blink`],
          situational: [
            `blight_stone`,
			`orb_of_corrosion`,
            `spirit_vessel`,
            `pavise`,
            `ghost`,
            `glimmer_cape`,
			`force_staff`,
            `crimson_guard`,
            `vladmir`,
            `boots_of_bearing`,
            `heavens_halberd`,
            `solar_crest`,
            `lotus_orb`,
            `aeon_disk`,
            `wind_waker`,
            `diffusal_blade`,
            `basher`,
            `ultimate_scepter`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
			`blink`,
            `guardian_greaves`,
            `cyclone`,
            `aghanims_shard`,
            `pipe`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `trusty_shovel`,
            `pupils_gift`,
            `bullwhip`,
            `ogre_seal_totem`,
            `ceremonial_robe`,
            `havoc_hammer`,
            `timeless_relic`,
            `panic_button`,
            `force_field`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2719254316, es: 3160082122 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40570,
        power_level: [1.8, 2.2, 2.5, 2.4],
		facet: 1,
        abilities: [
          "pangolier_shield_crash", // 1
          "pangolier_swashbuckle", // 2
          `pangolier_shield_crash`, // 3
          `pangolier_swashbuckle`, // 4
          `pangolier_shield_crash`, // 5
          "pangolier_gyroshell", // 6
          `pangolier_shield_crash`, // 7
          `pangolier_swashbuckle`, // 8
          `pangolier_swashbuckle`, // 9
          `pangolier_lucky_shot`, // 10
          `pangolier_lucky_shot`, // 11
          "pangolier_gyroshell", // 12
          "pangolier_lucky_shot", // 13
          "pangolier_lucky_shot", // 14
          `special_bonus_unique_pangolier_luckyshot_armor`, // 15
          `special_bonus_unique_pangolier_shield_crash_herostacks`, // 16
          "special_bonus_attributes", // 17
          "pangolier_gyroshell", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_pangolier_shield_crash_radius`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_pangolier_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `faerie_fire`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            "bottle",
            `power_treads`,
            `magic_wand`,
            `blight_stone`,
            `infused_raindrop`,
          ],
          mid_game: [
            `echo_sabre`,
			`manta`,
			`desolator`,
            `blink`,
			`ultimate_scepter`,
          ],
          late_game: [
            `aghanims_shard`,
            `harpoon`,
			`assault`,
            `abyssal_blade`,
          ],
          situational: [
            `ring_of_basilius`,
			`orb_of_corrosion`,
            `arcane_boots`,
            `spirit_vessel`,
            `maelstrom`,
            `guardian_greaves`,
			`diffusal_blade`,
			`basher`,
            `bloodthorn`,
            `disperser`,
            `lotus_orb`,
            `black_king_bar`,
			`sphere`,
            `aeon_disk`,
            `cyclone`,
            `shivas_guard`,
            `mjollnir`,
            `gungir`,
            `mage_slayer`,
            `monkey_king_bar`,
            `satanic`,
			`greater_crit`,
            `octarine_core`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `power_treads`,
            `echo_sabre`,
			`manta`,
			`desolator`,
            `blink`,
			`ultimate_scepter`,
            `aghanims_shard`,
			`assault`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `unstable_wand`,
            `pupils_gift`,
            `orb_of_destruction`,
            `defiant_shell`,
            `paladin_sword`,
            `ancient_guardian`,
            `havoc_hammer`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
    ],
    combo: [
      `pangolier_swashbuckle`,
      `pangolier_gyroshell`,
      `blink`,
      `pangolier_shield_crash`,
      `pangolier_rollup`,
      `pangolier_swashbuckle`,
    ],
    counter_items: {
      laning_phase: {
        all: ["ring_of_regen", "wind_lace", "boots", "infused_raindrop"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["cloak"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "hurricane_pike",
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "orchid",
          `sange_and_yasha`,
          "manta",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: ["abyssal_blade", "bloodthorn", "nullifier", "satanic"],
      },
    },
  },

  // eidendota plays hero
  phantom_assassin: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699961303, es: 3160082187 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40639,
        power_level: [1.5, 1.9, 2.7, 2.8],
        abilities: [
          "phantom_assassin_stifling_dagger", // 1
          "phantom_assassin_phantom_strike", // 2
          "phantom_assassin_stifling_dagger", // 3
          "phantom_assassin_blur", // 4
          "phantom_assassin_stifling_dagger", // 5
          "phantom_assassin_coup_de_grace", // 6
          "phantom_assassin_phantom_strike", // 7
          "phantom_assassin_phantom_strike", // 8
          "phantom_assassin_phantom_strike", // 9
          "special_bonus_unique_phantom_assassin_4", // 10
          "phantom_assassin_stifling_dagger", // 11
          "phantom_assassin_coup_de_grace", // 12
          "phantom_assassin_blur", // 13
          "phantom_assassin_blur", // 14
          "special_bonus_unique_phantom_assassin_6", // 15
          "phantom_assassin_blur", // 16
          "special_bonus_attributes", // 17
          "phantom_assassin_coup_de_grace", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_phantom_assassin_strike_aspd", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_phantom_assassin", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "slippers",
            "circlet",
          ],
          early_game: [
            "wraith_band",
            "blight_stone",
            "power_treads",
            "magic_wand",
            "bfury",
            "lifesteal",
          ],
          mid_game: [
            "black_king_bar",
            "desolator",
            "ultimate_scepter",
            "basher",
          ],
          late_game: ["abyssal_blade", "satanic", "aghanims_shard"],
          situational: [
            "orb_of_corrosion",
            "sphere",
            "monkey_king_bar",
            "nullifier",
          ],
          core: [
            "power_treads",
            "bfury",
            "lifesteal",
            "black_king_bar",
            "desolator",
            "ultimate_scepter",
            "basher",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "broom_handle",
            "lance_of_pursuit",
            //"misericorde",
            //"dagger_of_ristul", Removed in 7.33
            //"ring_of_aquila",
            "orb_of_destruction",
            "paladin_sword",
            //"titan_sliver",
            //"penta_edged_sword",
            "mind_breaker",
            "desolator_2",
            "apex",
            //`ex_machina`,
          ],
        },
      },
    ],
    combo: [
      "black_king_bar",
      "phantom_assassin_stifling_dagger",
      "phantom_assassin_phantom_strike",
      "attack",
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_wand", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: ["ghost", "glimmer_cape", "force_staff"],
        core: [
          "hurricane_pike",
          "monkey_king_bar",
          "silver_edge",
          "witch_blade",
        ],
      },
      late_game: {
        all: [`sheepstick`, `ethereal_blade`, `aeon_disk`],
        support: [],
        core: ["bloodthorn"],
      },
    },
  },

  // eidendota plays hero
  phantom_lancer: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699961424, es: 3160082270 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40622,
        power_level: [1.2, 1.6, 2.7, 2.9],
        abilities: [
          "phantom_lancer_spirit_lance", // 1
          "phantom_lancer_phantom_edge", // 2
          "phantom_lancer_doppelwalk", // 3
          "phantom_lancer_phantom_edge", // 4
          "phantom_lancer_phantom_edge", // 5
          "phantom_lancer_juxtapose", // 6
          "phantom_lancer_phantom_edge", // 7
          "phantom_lancer_spirit_lance", // 8
          "phantom_lancer_spirit_lance", // 9
          "phantom_lancer_spirit_lance", // 10
          "special_bonus_unique_phantom_lancer_lance_damage", // 11
          "phantom_lancer_juxtapose", // 12
          "phantom_lancer_doppelwalk", // 13
          "phantom_lancer_doppelwalk", // 14
          "special_bonus_unique_phantom_lancer_5", // 15
          "phantom_lancer_doppelwalk", // 16
          "special_bonus_attributes", // 17
          "phantom_lancer_juxtapose", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_phantom_lancer_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_20_crit_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "branches",
            "slippers",
            "circlet",
          ],
          early_game: ["power_treads", "wraith_band", "magic_wand"],
          mid_game: [
            "ultimate_scepter",
            "diffusal_blade",
            "manta",
            "aghanims_shard",
          ],
          late_game: ["heart", "disperser", "butterfly", "bloodthorn", "skadi"],
          situational: [
            "abyssal_blade",
            "monkey_king_bar",
            "sphere",
            "octarine_core",
            "sange_and_yasha",
          ],
          core: [
            "ultimate_scepter",
            "diffusal_blade",
            "manta",
            "heart",
            "aghanims_shard",
          ],
          neutral: [
            "broom_handle",
            "lance_of_pursuit",
            "pupils_gift",
            "vambrace",
            "elven_tunic",
            "vindicators_axe",
            "mind_breaker",
            "ninja_gear",
            "mirror_shield",
            "apex",
            "pirate_hat",
          ],
        },
      },
    ],
    // ability_tooltips:
    /*special_bonus_strength_15:
        "Consider taking this talent if you need to survive a burst combo e.g. Tiny",*/
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["armor", "magic_stick"],

        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape", "ghost"],
        core: ["maelstrom", "bfury", "black_king_bar", "gungir"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade"],
        support: ["black_king_bar"],
        core: [
          "mjollnir",
          "shivas_guard",
          "radiance",
          "butterfly",
          "assault",
          "overwhelming_blink",
        ],
      },
    },
  },

  // YoonA plays hero
  phoenix: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699961589, es: 3160082651 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40590,
        power_level: [1.4, 2, 2.3, 2.3],
        facet: 1,
        abilities: [
          "phoenix_fire_spirits", // 1
          "phoenix_icarus_dive", // 2
          "phoenix_fire_spirits", // 3
          "phoenix_sun_ray", // 4
          "phoenix_fire_spirits", // 5
          "phoenix_supernova", // 6
          "phoenix_fire_spirits", // 7
          "phoenix_sun_ray", // 8
          "phoenix_sun_ray", // 9
          "phoenix_sun_ray", // 10
          `phoenix_icarus_dive`, // 11
          "phoenix_supernova", // 12
          "phoenix_icarus_dive", // 13
          "phoenix_icarus_dive", // 14
          `special_bonus_unique_phoenix_6`, // 15
          "special_bonus_unique_phoenix_3", // 16
          "special_bonus_attributes", // 17
          "phoenix_supernova", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_phoenix_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_phoenix_1`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `tranquil_boots`,
            `magic_wand`,
            `urn_of_shadows`,
            "infused_raindrop",
          ],
          mid_game: [
            `spirit_vessel`,
            `veil_of_discord`,
            `aghanims_shard`,
            `shivas_guard`,
          ],
          late_game: [`sheepstick`, `refresher`, `octarine_core`, `aeon_disk`],
          situational: [
            `pavise`,
            `solar_crest`,
            `hand_of_midas`,
            `guardian_greaves`,
            "lotus_orb",
            `holy_locket`,
            `cyclone`,
            `meteor_hammer`,
            `glimmer_cape`,
            `ghost`,
            `force_staff`,
            `wind_waker`,
            "heavens_halberd",
            `pipe`,
            `kaya_and_sange`,
            `boots_of_bearing`,
            `ultimate_scepter`,
            "radiance",
            `travel_boots`,
          ],
          core: [
            "tranquil_boots",
            `spirit_vessel`,
            `veil_of_discord`,
            `aghanims_shard`,
            `shivas_guard`,
            `sheepstick`,
            `refresher`,
          ],
          neutral: [
            `trusty_shovel`,
            `mysterious_hat`,
            "philosophers_stone",
            `vambrace`,
            `ogre_seal_totem`,
            `ceremonial_robe`,
            `ascetic_cap`,
            "timeless_relic",
            "book_of_shadows",
            `panic_button`,
          ],
        },
      },
    ],

    combo: [
      `phoenix_sun_ray`,
      `phoenix_fire_spirits`,
      `phoenix_icarus_dive`,
      `phoenix_supernova`,
      `phoenix_sun_ray`,
    ],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "ring_of_regen", "headdress", "cloak"],
        support: ["tranquil_boots"],
        core: [],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "orchid",
          "AttackSpeed",
        ],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["AttackSpeed"],
      },
    },
  },

  primal_beast: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE], // To be updated
        steam_guide_workshop_ids: { en: 2763260196, es: 3160082735 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40684,
        power_level: [1.9, 2.3, 2.4, 2.4],
        facet: 1,
        abilities: [
          `primal_beast_uproar`, // 1
          `primal_beast_trample`, // 2
          `primal_beast_trample`, // 3
          `primal_beast_onslaught`, // 4
          `primal_beast_trample`, // 5
          "primal_beast_pulverize", // 6
          `primal_beast_trample`, // 7
          `primal_beast_onslaught`, // 8
          `primal_beast_onslaught`, // 9
          `primal_beast_onslaught`, // 10
          `special_bonus_unique_primal_beast_onslaught_damage`, // 11
          `primal_beast_pulverize`, // 12
          `primal_beast_uproar`, // 13
          `primal_beast_uproar`, // 14
          `special_bonus_unique_primal_beast_roar_dispells`, // 15
          `primal_beast_uproar`, // 16
          "special_bonus_attributes", // 17
          "primal_beast_pulverize", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_primal_beast_trample_attack_damage", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_primal_beast_pulverize_duration", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `gauntlets`,
            `gauntlets`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `phase_boots`,
            `soul_ring`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `blade_mail`,
            `eternal_shroud`,
            `black_king_bar`,
            `blink`,
            `ultimate_scepter`,
          ],

          late_game: [
            `shivas_guard`,
            `wind_waker`,
            `aghanims_shard`,
            `refresher`,
          ],
          situational: [
            `veil_of_discord`,
            `vanguard`,
            `guardian_greaves`,
            `boots_of_bearing`,
            "lotus_orb",
            `ethereal_blade`,
            `kaya_and_sange`,
            `sange_and_yasha`,
            `crimson_guard`,
            "pipe",
            "heavens_halberd",
            `radiance`,
            `cyclone`,
            `sphere`,
            `heart`,
            `octarine_core`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `soul_ring`,
            `blade_mail`,
            `eternal_shroud`,
            `black_king_bar`,
            `blink`,
            `ultimate_scepter`,
            `shivas_guard`,
          ],
          neutral: [
            `occult_bracelet`,
            "arcane_ring",
            `bullwhip`,
            "vambrace",
            `cloak_of_flames`,
            `ceremonial_robe`,
            `havoc_hammer`,
            `timeless_relic`,
            "giants_ring",
            `mirror_shield`,
          ],
        },
        // item_tooltips:
        /* helm_of_iron_will:
            "Good laning sustain item that can go into Armlet down the road.", */
        /* armlet: "A good early game item that increases your damage output.", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT], // Update steam_guide_id and steam_guide_link for support guide
        steam_guide_workshop_ids: { en: 2765463290, es: 3160082808 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40685,
        power_level: [0.9, 1.9, 2.2, 2.1],
        facet: 1,
        abilities: [
          `primal_beast_trample`, // 1
          `primal_beast_onslaught`, // 2
          "primal_beast_trample", // 3
          "primal_beast_onslaught", // 4
          "primal_beast_trample", // 5
          "primal_beast_pulverize", // 6
          "primal_beast_trample", // 7
          "primal_beast_onslaught", // 8
          "primal_beast_onslaught", // 9
          `special_bonus_unique_primal_beast_onslaught_damage`, // 10
          `primal_beast_uproar`, // 11
          "primal_beast_pulverize", // 12
          "primal_beast_uproar", // 13
          "primal_beast_uproar", // 14
          `special_bonus_unique_primal_beast_roar_dispells`, // 15
          "primal_beast_uproar", // 16
          "special_bonus_attributes", // 17
          "primal_beast_pulverize", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_primal_beast_trample_attack_damage", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_primal_beast_pulverize_duration", // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `faerie_fire`,
            `wind_lace`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `blink`,
            "black_king_bar",
            `blade_mail`,
            `ultimate_scepter`,
          ],
          late_game: [
            `aghanims_shard`,
            `shivas_guard`,
            `wind_waker`,
            `refresher`,
          ],
          situational: [
            `soul_ring`,
            `veil_of_discord`,
            `tranquil_boots`,
            `phase_boots`,
            `spirit_vessel`,
            `cyclone`,
            `force_staff`,
            `ancient_janggo`,
            `guardian_greaves`,
            `boots_of_bearing`,
            `pipe`,
            `heavens_halberd`,
            `kaya_and_sange`,
            `ethereal_blade`,
            `octarine_core`,
            `lotus_orb`,
            `heart`,
            `aeon_disk`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `blink`,
            `black_king_bar`,
            `blade_mail`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `shivas_guard`,
          ],
          neutral: [
            `occult_bracelet`,
            `arcane_ring`,
            `bullwhip`,
            `vambrace`,
            `cloak_of_flames`,
            `ceremonial_robe`,
            `havoc_hammer`,
            `timeless_relic`,
            `giants_ring`,
            `mirror_shield`,
          ],
        },
      },
    ],
    // ability_tooltips:
    /* special_bonus_unique_primal_beast_roar_dispells:
        "You can take this talent over the suggested one if the dispel has great value in the game.", */

    combo: [
      `black_king_bar`,
      `blink`,
      `primal_beast_pulverize`,
      `primal_beast_onslaught`,
      `primal_beast_trample`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "boots"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["cloak"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "blade_mail",
          "eternal_shroud",
          "black_king_bar",
          "orchid",
          "hurricane_pike",
          `sange_and_yasha`,
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: ["bloodthorn", "sheepstick", "shivas_guard"],
      },
    },
  },

  puck: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699961683, es: 3160082883 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40549,
        power_level: [2.1, 2.3, 2.6, 2.7],
        facet: 1,
        abilities: [
          "puck_illusory_orb", // 1
          "puck_phase_shift", // 2
          "puck_illusory_orb", // 3
          "puck_waning_rift", // 4
          "puck_illusory_orb", // 5
          "puck_dream_coil", // 6
          "puck_illusory_orb", // 7
          "puck_waning_rift", // 8
          "puck_waning_rift", // 9
          "puck_waning_rift", // 10
          `special_bonus_unique_puck_orb_damage`, // 11
          `puck_dream_coil`, // 12
          "puck_phase_shift", // 13
          `puck_phase_shift`, // 14
          `puck_phase_shift`, // 15
          `special_bonus_unique_puck_6`, // 16
          "special_bonus_attributes", // 17
          "puck_dream_coil", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_puck_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_puck_5", // 25
        ],
        items: {
          starting: [
            "tango",
            `faerie_fire`,
            `circlet`,
            "branches",
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bottle`,
            `null_talisman`,
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
          ],

          mid_game: [
            `witch_blade`,
            `blink`,
            `kaya_and_sange`,
            `devastator`,
            `ultimate_scepter`,
          ],

          late_game: [
            `octarine_core`,
            `aghanims_shard`,
            `greater_crit`,
            `mjollnir`,
          ],
          situational: [
            `veil_of_discord`,
            `cyclone`,
            "sphere",
            `maelstrom`,
            "black_king_bar",
            `dagon_5`,
            `mage_slayer`,
            `bloodthorn`,
            "aeon_disk",
            `refresher`,
            `shivas_guard`,
            `ethereal_blade`,
            `sheepstick`,
            `revenants_brooch`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            "bottle",
            `power_treads`,
            `witch_blade`,
            "blink",
            "kaya_and_sange",
            `devastator`,
            `ultimate_scepter`,
            `octarine_core`,
          ],
          neutral: [
            "mysterious_hat",
            "arcane_ring",
            `vambrace`,
            "grove_bow",
            `enchanted_quiver`,
            `ceremonial_robe`,
            `mind_breaker`,
            "timeless_relic",
            `desolator_2`,
            `pirate_hat`,
          ],
        },
      },
    ],
    combo: [
      `blink`,
      `puck_dream_coil`,
      `puck_waning_rift`,
      `puck_illusory_orb`,
      `puck_phase_shift`,
      `puck_ethereal_jaunt`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "infused_raindrop", "cloak"],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "orchid",
          `sange_and_yasha`,
          "manta",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: ["abyssal_blade", "satanic", "assault", "butterfly"],
      },
    },
  },

  // eidendota plays hero
  pudge: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699961775, es: 3160082951 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40667,
        power_level: [0.8, 1.7, 2, 2],
        abilities: [
          "pudge_meat_hook", // 1
          "pudge_rot", // 2
          "pudge_rot", // 3
          "pudge_flesh_heap", // 4
          "pudge_rot", // 5
          "pudge_dismember", // 6
          "pudge_rot", // 7
          "pudge_flesh_heap", // 8
          "pudge_flesh_heap", // 9
          "pudge_flesh_heap", // 10
          "special_bonus_armor_5", // 11
          "pudge_dismember", // 12
          "pudge_meat_hook", // 13
          "pudge_meat_hook", // 14
          "special_bonus_unique_pudge_7", // 15
          "pudge_meat_hook", // 16
          "special_bonus_attributes", // 17
          "pudge_dismember", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_pudge_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pudge_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "blood_grenade",
            "wind_lace",
            "enchanted_mango",
            "branches",
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "tranquil_boots",
            "magic_wand",
            "urn_of_shadows",
            "smoke_of_deceit",
          ],
          mid_game: ["blink", "aether_lens", "aghanims_shard"],
          late_game: [
            "octarine_core",
            "shivas_guard",
            "ethereal_blade",
            "ultimate_scepter",
            "overwhelming_blink",
          ],
          situational: [
            /*"hood_of_defiance", Item removed from game */
            "black_king_bar",
            "glimmer_cape",
            "spirit_vessel",
            "force_staff",
            "rod_of_atos",
            "ghost",
            "pipe",
            "cyclone",
            "lotus_orb",
            "pavise",
          ],
          core: [
            "tranquil_boots",
            "magic_wand",
            "blink",
            "aether_lens",
            "black_king_bar",
            "aghanims_shard",
          ],
          neutral: [
            "seeds_of_serenity",
            "safety_bubble",
            "philosophers_stone",
            "eye_of_the_vizier",
            "bullwhip",
            "psychic_headband",
            "ogre_seal_totem",
            "spy_gadget",
            "trickster_cloak",
            "giants_ring",
            "force_field",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2713377028, es: 3160082999 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40668,
        power_level: [0.9, 1.8, 2.3, 2.1],
        abilities: [
          "pudge_meat_hook", // 1
          "pudge_rot", // 2
          "pudge_rot", // 3
          "pudge_flesh_heap", // 4
          "pudge_rot", // 5
          "pudge_dismember", // 6
          "pudge_rot", // 7
          "pudge_flesh_heap", // 8
          "pudge_flesh_heap", // 9
          "pudge_flesh_heap", // 10
          "special_bonus_unique_pudge_4", // 11
          "pudge_dismember", // 12
          "pudge_meat_hook", // 13
          "pudge_meat_hook", // 14
          "special_bonus_spell_lifesteal_8", // 15
          "pudge_meat_hook", // 16
          "special_bonus_attributes", // 17
          "pudge_dismember", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_pudge_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pudge_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "gauntlets",
            "ring_of_protection",
            "branches",
            "branches",
            "branches",
          ],
          early_game: [
            "veil_of_discord",
            "phase_boots",
            "magic_wand",
            "soul_ring",
          ],
          mid_game: [
            "ultimate_scepter",
            "shivas_guard",
            "blink",
            "black_king_bar",
          ],
          late_game: ["shivas_guard", "overwhelming_blink", "travel_boots"],
          situational: [
            "aghanims_shard",
            "eternal_shroud",
            "pipe",
            "lotus_orb",
            "aghanims_shard",
            "force_staff",
            "sheepstick",
            "spirit_vessel",
            "octarine_core",
            "heart",
            "blade_mail",
          ],
          core: [
            "veil_of_discord",
            "phase_boots",
            "ultimate_scepter",
            "black_king_bar",
            "blink",
            "shivas_guard",
          ],
          neutral: [
            "safety_bubble",
            "seeds_of_serenity",
            "occult_bracelet",
            "dragon_scale",
            "gossamer_cape",
            "cloak_of_flames",
            "craggy_coat",
            "trickster_cloak",
            "havoc_hammer",
            "ascetic_cap",
            "giants_ring",
            "force_field",
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "wind_lace", "boots", "urn_of_shadows"],
        support: ["ward_observer"],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["spirit_vessel", "lotus_orb"],
        support: ["glimmer_cape", "force_staff", "cyclone"],
        core: ["desolator", "mage_slayer", "hurricane_pike", `sange_and_yasha`],
      },
      late_game: {
        all: ["sphere", "wind_waker"],
        support: [],
        core: ["bloodthorn"],
      },
    },
  },

  pugna: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699961859, es: 3160083091 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40550,
        power_level: [2.1, 2.3, 2.3, 1.9],
        facet: 1,
        abilities: [
          "pugna_nether_blast", // 1
          "pugna_decrepify", // 2
          "pugna_nether_blast", // 3
          "pugna_decrepify", // 4
          "pugna_nether_blast", // 5
          "pugna_life_drain", // 6
          "pugna_nether_blast", // 7
          "pugna_decrepify", // 8
          "pugna_decrepify", // 9
          "special_bonus_hp_200", // 10
          "pugna_nether_ward", // 11
          "pugna_life_drain", // 12
          "pugna_nether_ward", // 13
          "pugna_nether_ward", // 14
          `special_bonus_unique_pugna_6`, // 15
          `pugna_nether_ward`, // 16
          "special_bonus_attributes", // 17
          "pugna_life_drain", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_pugna_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_pugna_3`, // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            `branches`,
            "branches",
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [
            `bottle`,
            `boots`,
            `null_talisman`,
            `magic_wand`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `aether_lens`,
            `kaya_and_sange`,
            `dagon_5`,
          ],
          late_game: [
            `blink`,
            `wind_waker`,
            `octarine_core`,
            `ultimate_scepter`,
          ],
          situational: [
            `glimmer_cape`,
            `cyclone`,
            `force_staff`,
            `ghost`,
            `ethereal_blade`,
            `lotus_orb`,
            `aghanims_shard`,
            "black_king_bar",
            "sphere",
            `aeon_disk`,
            `shivas_guard`,
            `overwhelming_blink`,
            `arcane_blink`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `arcane_boots`,
            `aether_lens`,
            `kaya_and_sange`,
            `dagon_5`,
            `blink`,
            `wind_waker`,
            `ultimate_scepter`,
          ],
          neutral: [
            "mysterious_hat",
            `arcane_ring`,
            `eye_of_the_vizier`,
            `vambrace`,
            "psychic_headband",
            `ceremonial_robe`,
            "timeless_relic",
            `spy_gadget`,
            "seer_stone",
            `mirror_shield`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2721136673, es: 3160083158 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40551,
        power_level: [1.9, 2.1, 1.9, 1.7],
        facet: 1,
        abilities: [
          "pugna_nether_blast", // 1
          `pugna_nether_ward`, // 2
          "pugna_nether_blast", // 3
          "pugna_decrepify", // 4
          "pugna_nether_blast", // 5
          "pugna_life_drain", // 6
          "pugna_nether_blast", // 7
          `pugna_decrepify`, // 8
          "pugna_decrepify", // 9
          `special_bonus_hp_200`, // 10
          `pugna_decrepify`, // 11
          "pugna_life_drain", // 12
          "pugna_nether_ward", // 13
          "pugna_nether_ward", // 14
          `special_bonus_unique_pugna_6`, // 15
          `pugna_nether_ward`, // 16
          "special_bonus_attributes", // 17
          "pugna_life_drain", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_pugna_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_pugna_3`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `aether_lens`,
            `glimmer_cape`,
            `force_staff`,
          ],
          late_game: [
            `aghanims_shard`,
            `wind_waker`,
            `octarine_core`,
            `ultimate_scepter`,
          ],
          situational: [
            `pavise`,
            `solar_crest`,
            `ghost`,
            `cyclone`,
            `lotus_orb`,
            `aeon_disk`,
            `sphere`,
            `boots_of_bearing`,
            `ethereal_blade`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `aether_lens`,
            `glimmer_cape`,
            `force_staff`,
            `aghanims_shard`,
            `wind_waker`,
            `octarine_core`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            `timeless_relic`,
            "seer_stone",
            `book_of_shadows`,
          ],
        },
        // item_tooltips:
        // wraith_pact: `A core item that makes your team more tanky with the damage reduction.`,
      },
    ],
    combo: [
      `pugna_nether_ward`,
      `pugna_nether_blast`,
      `pugna_decrepify`,
      `dagon`,
      `pugna_life_drain`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "headdress",
          "wind_lace",
          "boots",
          "infused_raindrop",
          "cloak",
          "urn_of_shadows",
        ],
        support: ["tranquil_boots"],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["force_staff", "glimmer_cape"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "orchid",
          "manta",
        ],
      },
      late_game: {
        all: ["sheepstick", "sphere"],
        support: ["black_king_bar"],
        core: ["abyssal_blade", "nullifier", "satanic"],
      },
    },
  },

  // eidendota plays hero
  queenofpain: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699961952, es: 3160083230 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40583,
        power_level: [2.2, 2.3, 2.5, 2.4],
        abilities: [
          "queenofpain_scream_of_pain", // 1
          "queenofpain_shadow_strike", // 2
          "queenofpain_scream_of_pain", // 3
          "queenofpain_blink", // 4
          "queenofpain_shadow_strike", // 5
          "queenofpain_sonic_wave", // 6
          "queenofpain_scream_of_pain", // 7
          "queenofpain_scream_of_pain", // 8
          "queenofpain_blink", // 9
          "queenofpain_blink", // 10
          "queenofpain_blink", // 11
          "queenofpain_sonic_wave", // 12
          "queenofpain_shadow_strike", // 13
          "queenofpain_shadow_strike", // 14
          "special_bonus_attack_damage_20", // 15
          "special_bonus_unique_queen_of_pain_4", // 16
          "special_bonus_attributes", // 17
          "queenofpain_sonic_wave", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_queen_of_pain_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_queen_of_pain_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: [
            "bottle",
            "magic_wand",
            "falcon_blade",
            "power_treads",
            "kaya",
          ],
          mid_game: [
            "aghanims_shard",
            "black_king_bar",
            "ultimate_scepter",
            "kaya_and_sange",
          ],
          late_game: [
            "aether_lens",
            "octarine_core",
            "shivas_guard",
            "sheepstick",
          ],
          situational: [
            "sphere",
            "devastator",
            "refresher",
            "bloodthorn",
            "mjollnir",
            "orchid",
          ],
          core: [
            "power_treads",
            "aghanims_shard",
            "black_king_bar",
            "ultimate_scepter",
            "kaya_and_sange",
            "aether_lens",
            "octarine_core",
          ],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "grove_bow",
            "vampire_fangs",
            "psychic_headband",
            "dandelion_amulet",
            //`quickening_charm`,
            //"spell_prism",
            "timeless_relic",
            //`ex_machina`,
            "mirror_shield",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2721136803, es: 3160083297 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40604,
        power_level: [1.8, 2, 2.4, 2.3], // Data needed
        abilities: [
          "queenofpain_scream_of_pain", // 1
          "queenofpain_shadow_strike", // 2
          "queenofpain_scream_of_pain", // 3
          "queenofpain_blink", // 4
          "queenofpain_shadow_strike", // 5
          "queenofpain_sonic_wave", // 6
          "queenofpain_scream_of_pain", // 7
          "queenofpain_scream_of_pain", // 8
          "queenofpain_blink", // 9
          "queenofpain_blink", // 10
          "queenofpain_blink", // 11
          "queenofpain_sonic_wave", // 12
          "queenofpain_shadow_strike", // 13
          "queenofpain_shadow_strike", // 14
          "special_bonus_attack_damage_20", // 15
          "special_bonus_unique_queen_of_pain_4", // 16
          "special_bonus_attributes", // 17
          "queenofpain_sonic_wave", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_queen_of_pain_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_queen_of_pain_6", // 25
        ],
        items: {
          starting: ["tango", "circlet", "branches", "faerie_fire", "mantle"],
          early_game: [
            "null_talisman",
            "magic_wand",
            "falcon_blade",
            "power_treads",
            "kaya",
          ],
          mid_game: [
            "aghanims_shard",
            "black_king_bar",
            "ultimate_scepter",
            "kaya_and_sange",
          ],
          late_game: [
            "aether_lens",
            "octarine_core",
            "shivas_guard",
            "sheepstick",
          ],
          situational: [
            "witch_blade",
            "sphere",
            "devastator",
            "refresher",
            "bloodthorn",
            "mjollnir",
            "orchid",
          ],
          core: [
            "power_treads",
            "aghanims_shard",
            "black_king_bar",
            "ultimate_scepter",
            "kaya_and_sange",
            "aether_lens",
            "octarine_core",
          ],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "grove_bow",
            "vampire_fangs",
            "psychic_headband",
            "dandelion_amulet",
            //`quickening_charm`,
            //"spell_prism",
            "timeless_relic",
            //`ex_machina`,
            "mirror_shield",
          ],
        },
      },
    ],
    // ability_tooltips:
    /*special_bonus_spell_block_18:
        "You can take this level 25 talent over the suggested one if you are in need for Linken`s sphere effect.",*/
    combo: [
      "queenofpain_blink",
      "queenofpain_scream_of_pain",
      "queenofpain_shadow_strike",
      "attack",
      "queenofpain_sonic_wave",
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick"],
        support: ["tranquil_boots"],
        core: [],
      },
      mid_game: {
        all: ["rod_of_atos", "cyclone"],
        support: ["glimmer_cape"],
        core: ["mage_slayer", "black_king_bar", "orchid", "manta"],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: ["abyssal_blade"],
      },
    },
  },

  // eidendota plays hero
  razor: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699962040, es: 3160083374 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40651,
        power_level: [2.1, 2.3, 2.5, 2.2],
        facet: 2,
        abilities: [
          "razor_static_link", // 1
          "razor_plasma_field", // 2
          "razor_static_link", // 3
          "razor_plasma_field", // 4
          "razor_plasma_field", // 5
          "razor_eye_of_the_storm", // 6
          "razor_plasma_field", // 7
          `razor_unstable_current`, // 8
          `razor_unstable_current`, // 9
          `special_bonus_spell_lifesteal_10`, // 10
          `razor_static_link`, // 11
          "razor_eye_of_the_storm", // 12
          `razor_unstable_current`, // 13
          "razor_unstable_current", // 14
          `special_bonus_unique_razor`, // 15
          `razor_static_link`, // 16
          "special_bonus_attributes", // 17
          "razor_eye_of_the_storm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_razor_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_razor_static_link_aspd`, // 25
        ],
        items: {
          starting: [
            "tango",
            `faerie_fire`,
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            `wraith_band`,
            `power_treads`,
            `falcon_blade`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `maelstrom`,
            `sange_and_yasha`,
            `black_king_bar`,
            `gungir`,
            `aghanims_shard`,
          ],
          late_game: [`satanic`, `butterfly`, `refresher`, `assault`],
          situational: [
            `phase_boots`,
            `hand_of_midas`,
            `mage_slayer`,
            `eternal_shroud`,
            `hurricane_pike`,
            `blink`,
            `cyclone`,
            `manta`,
            `sphere`,
            `heavens_halberd`,
            `sheepstick`,
            `nullifier`,
            `skadi`,
            `disperser`,
            `mjollnir`,
            `bloodthorn`,
            `shivas_guard`,
            `monkey_king_bar`,
            `ultimate_scepter`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            `power_treads`,
            `falcon_blade`,
            `maelstrom`,
            `sange_and_yasha`,
            `black_king_bar`,
            `gungir`,
            `aghanims_shard`,
            `satanic`,
          ],
          neutral: [
            `unstable_wand`,
            `arcane_ring`,
            `specialists_array`,
            `grove_bow`,
            `elven_tunic`,
            `paladin_sword`,
            `ancient_guardian`,
            `trickster_cloak`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2722413092, es: 3160083438 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40649,
        power_level: [2, 2.4, 2.4, 2.2],
        facet: 2,
        abilities: [
          `razor_plasma_field`, // 1
          `razor_static_link`, // 2
          `razor_static_link`, // 3
          `razor_plasma_field`, // 4
          "razor_plasma_field", // 5
          "razor_eye_of_the_storm", // 6
          "razor_plasma_field", // 7
          "razor_unstable_current", // 8
          `razor_unstable_current`, // 9
          `razor_unstable_current`, // 10
          `special_bonus_spell_lifesteal_10`, // 11
          "razor_eye_of_the_storm", // 12
          `razor_static_link`, // 13
          `razor_static_link`, // 14
          `special_bonus_unique_razor`, // 15
          `razor_unstable_current`, // 16
          "special_bonus_attributes", // 17
          "razor_eye_of_the_storm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_razor_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_razor_static_link_aspd`, // 25
        ],
        items: {
          starting: [
            "tango",
            `faerie_fire`,
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `wraith_band`,
            `null_talisman`,
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `black_king_bar`,
            `sange_and_yasha`,
            `aghanims_shard`,
            `satanic`,
          ],
          late_game: [`butterfly`, `sheepstick`, `refresher`, `assault`],
          situational: [
            `phase_boots`,
            `falcon_blade`,
            `veil_of_discord`,
            `hand_of_midas`,
            `mage_slayer`,
            `eternal_shroud`,
            `boots_of_bearing`,
            `cyclone`,
            `lotus_orb`,
            `crimson_guard`,
            `pipe`,
            `heavens_halberd`,
            `blink`,
            `manta`,
            `skadi`,
            `hurricane_pike`,
            `blade_mail`,
            `ultimate_scepter`,
            `nullifier`,
            `disperser`,
            `mjollnir`,
            `bloodthorn`,
            `monkey_king_bar`,
            `shivas_guard`,
            `sphere`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            `black_king_bar`,
            `sange_and_yasha`,
            `aghanims_shard`,
            `satanic`,
            `butterfly`,
          ],
          neutral: [
            `spark_of_courage`,
            `arcane_ring`,
            `specialists_array`,
            `grove_bow`,
            `elven_tunic`,
            `paladin_sword`,
            `ancient_guardian`,
            `trickster_cloak`,
            `desolator_2`,
            `apex`,
          ],
        },
        // item_tooltips:
        // bloodstone: `Try to rush Bloodstone to get it as early as possible before the 15 minute mark. It massively enhances your survivability with its active in the early game.`,
        // aghanims_shard: `Improves your damage output in fights and also improves your tankiness in combination with the Bloodstone active.`,
        // eternal_shroud: `Makes you extremely tanky in the mid game along with Bloodstone and Aghs shard. Once you have the three items, you can play extremely aggressive in fights.`,
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2722413152, es: 3160083491 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40650,
        power_level: [2.2, 2.4, 2.4, 2.2],
        facet: 2,
        abilities: [
          `razor_static_link`, // 1
          `razor_plasma_field`, // 2
          `razor_plasma_field`, // 3
          `razor_static_link`, // 4
          `razor_plasma_field`, // 5
          "razor_eye_of_the_storm", // 6
          "razor_plasma_field", // 7
          `razor_unstable_current`, // 8
          `razor_unstable_current`, // 9
          `razor_unstable_current`, // 10
          `special_bonus_spell_lifesteal_10`, // 11
          "razor_eye_of_the_storm", // 12
          `razor_static_link`, // 13
          `razor_static_link`, // 14
          `special_bonus_unique_razor`, // 15
          `razor_unstable_current`, // 16
          "special_bonus_attributes", // 17
          "razor_eye_of_the_storm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_razor_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_razor_static_link_aspd`, // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            `branches`,
            `branches`,
            `branches`,
            "circlet",
            `ward_observer`,
          ],
          early_game: [
            `bottle`,
            `power_treads`,
            `wraith_band`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `manta`,
            `black_king_bar`,
            `aghanims_shard`,
            `satanic`,
            `butterfly`,
          ],
          late_game: [`sheepstick`, `refresher`, `assault`, `swift_blink`],
          situational: [
            `phase_boots`,
            `falcon_blade`,
            `hand_of_midas`,
            `mage_slayer`,
            `eternal_shroud`,
            `sange_and_yasha`,
            `maelstrom`,
            `gungir`,
            `hurricane_pike`,
            `blade_mail`,
            `ultimate_scepter`,
            `blink`,
            `cyclone`,
            `sphere`,
            `heavens_halberd`,
            `skadi`,
            `nullifier`,
            `disperser`,
            `mjollnir`,
            `bloodthorn`,
            `shivas_guard`,
            `monkey_king_bar`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `power_treads`,
            `manta`,
            `black_king_bar`,
            `aghanims_shard`,
            `satanic`,
            `butterfly`,
            `refresher`,
          ],
          neutral: [
            `spark_of_courage`,
            `arcane_ring`,
            `specialists_array`,
            `grove_bow`,
            `elven_tunic`,
            `paladin_sword`,
            `ancient_guardian`,
            `trickster_cloak`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
    ],
    combo: [
      `razor_eye_of_the_storm`,
      `razor_plasma_field`,
      `blink`,
      `razor_static_link`,
      `black_king_bar`,
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "ring_of_regen", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["force_staff", "glimmer_cape", "ghost"],
        core: ["hurricane_pike"],
      },
      late_game: {
        all: ["sphere", "sheepstick"],
        support: [],
        core: ["abyssal_blade", "assault", "butterfly"],
      },
    },
  },

  riki: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699962133, es: 3160083546 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40675,
        power_level: [1.6, 2.2, 2.5, 2.3],
        abilities: [
          "riki_blink_strike", // 1
          "riki_tricks_of_the_trade", // 2
          "riki_blink_strike", // 3
          "riki_tricks_of_the_trade", // 4
          "riki_blink_strike", // 5
          "riki_backstab", // 6
          "riki_blink_strike", // 7
          "riki_smoke_screen", // 8
          "riki_tricks_of_the_trade", // 9
          `riki_tricks_of_the_trade`, // 10
          `riki_smoke_screen`, // 11
          "riki_backstab", // 12
          "riki_smoke_screen", // 13
          "riki_smoke_screen", // 14
          `special_bonus_unique_riki_7`, // 15
          `special_bonus_unique_riki_2`, // 16
          "special_bonus_attributes", // 17
          "riki_backstab", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_riki_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_riki_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            `wraith_band`,
            `wraith_band`,
            `power_treads`,
            `orb_of_corrosion`,
            `magic_wand`,
          ],
          mid_game: [
            `diffusal_blade`,
            `manta`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          late_game: [
            `greater_crit`,
            `disperser`,
            `abyssal_blade`,
            `nullifier`,
          ],
          situational: [
            `bfury`,
            `blink`,
            `basher`,
            `black_king_bar`,
            `butterfly`,
            `monkey_king_bar`,
            `skadi`,
            `desolator`,
            `sphere`,
            `satanic`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            "diffusal_blade",
            "manta",
            `ultimate_scepter`,
            `aghanims_shard`,
            `greater_crit`,
            `disperser`,
            `abyssal_blade`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `broom_handle`,
            `orb_of_destruction`,
            "vambrace",
            `elven_tunic`,
            `defiant_shell`,
            "mind_breaker",
            `ancient_guardian`,
            "apex",
            "desolator_2",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2722413235, es: 3160083609 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40676,
        power_level: [0.4, 1.4, 2, 2.1],
        abilities: [
          "riki_blink_strike", // 1
          "riki_tricks_of_the_trade", // 2
          "riki_blink_strike", // 3
          "riki_smoke_screen", // 4
          "riki_blink_strike", // 5
          "riki_backstab", // 6
          "riki_blink_strike", // 7
          "riki_smoke_screen", // 8
          "riki_smoke_screen", // 9
          `special_bonus_unique_riki_7`, // 10
          `riki_smoke_screen`, // 11
          "riki_backstab", // 12
          "riki_tricks_of_the_trade", // 13
          "riki_tricks_of_the_trade", // 14
          "special_bonus_unique_riki_3", // 15
          "riki_tricks_of_the_trade", // 16
          "special_bonus_attributes", // 17
          "riki_backstab", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_riki_9`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_riki_6`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `orb_of_venom`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `orb_of_corrosion`,
            `power_treads`,
            `wraith_band`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `diffusal_blade`,
            `aghanims_shard`,
            `blink`,
            `octarine_core`,
          ],
          late_game: [
            `disperser`,
            `nullifier`,
            `greater_crit`,
            `abyssal_blade`,
          ],
          situational: [
            `meteor_hammer`,
            `arcane_boots`,
            `tranquil_boots`,
            "lotus_orb",
            `boots_of_bearing`,
            `cyclone`,
            `pavise`,
            `solar_crest`,
            `force_staff`,
            `aeon_disk`,
            `ultimate_scepter`,
            `sheepstick`,
            `monkey_king_bar`,
            `travel_boots`,
          ],
          core: [
            `orb_of_corrosion`,
            `power_treads`,
            `diffusal_blade`,
            `aghanims_shard`,
            `octarine_core`,
            `disperser`,
            `nullifier`,
            `greater_crit`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `broom_handle`,
            `vambrace`,
            `orb_of_destruction`,
            `elven_tunic`,
            `defiant_shell`,
            `ancient_guardian`,
            `mind_breaker`,
            `apex`,
            `desolator_2`,
          ],
        },
      },
    ],
    combo: [
      `riki_blink_strike`,
      `riki_smoke_screen`,
      `diffusal_blade`,
      `riki_tricks_of_the_trade`,
      `riki_blink_strike`,
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: ["ward_sentry", "dust"],
        core: [],
      },
      mid_game: {
        all: ["rod_of_atos"],
        support: ["SentryDustGem", "force_staff", "ghost", "glimmer_cape"],
        core: ["crimson_guard", "hurricane_pike", "silver_edge", "witch_blade"],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk"],
        support: ["SentryDustGem"],
        core: [
          "abyssal_blade",
          "assault",
          "monkey_king_bar",
          "bloodthorn",
          "butterfly",
        ],
      },
    },
  },

  rubick: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699962219, es: 3160083662 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40629,
        power_level: [1.8, 1.9, 2, 1.9],
        abilities: [
          "rubick_fade_bolt", // 1
          "rubick_telekinesis", // 2
          "rubick_fade_bolt", // 3
          "rubick_arcane_supremacy", // 4
          "rubick_fade_bolt", // 5
          "rubick_spell_steal", // 6
          "rubick_fade_bolt", // 7
          `rubick_arcane_supremacy`, // 8
          `rubick_arcane_supremacy`, // 9
          `rubick_arcane_supremacy`, // 10
          `rubick_telekinesis`, // 11
          "rubick_spell_steal", // 12
          `rubick_telekinesis`, // 13
          `rubick_telekinesis`, // 14
          `special_bonus_unique_rubick_8`, // 15
          `special_bonus_unique_rubick_6`, // 16
          "special_bonus_attributes", // 17
          "rubick_spell_steal", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_rubick_3`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_rubick_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            "tango",
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `aether_lens`,
            `blink`,
            `force_staff`,
            `aghanims_shard`,
          ],
          late_game: [
            `ultimate_scepter`,
            `ethereal_blade`,
            `sheepstick`,
            `octarine_core`,
          ],
          situational: [
            `spirit_vessel`,
            `veil_of_discord`,
            `phylactery`,
            "lotus_orb",
            `ghost`,
            `glimmer_cape`,
            `cyclone`,
            `pavise`,
            `solar_crest`,
            `aeon_disk`,
            `boots_of_bearing`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `aether_lens`,
            `blink`,
            `force_staff`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `ethereal_blade`,
            `sheepstick`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            `ceremonial_robe`,
            "psychic_headband",
            "spy_gadget",
            `timeless_relic`,
            "seer_stone",
            `force_boots`,
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "ring_of_regen", "infused_raindrop"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["glimmer_cape", "force_staff"],
        core: ["black_king_bar"],
      },
      late_game: {
        all: ["sphere"],
        support: ["black_king_bar"],
        core: [],
      },
    },
  },

  sand_king: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699962310, es: 3160083765 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40652,
        power_level: [1.7, 2.1, 2.4, 2.1],
        facet: 2,
        abilities: [
          "sandking_burrowstrike", // 1
          `sandking_scorpion_strike`, // 2
          `sandking_scorpion_strike`, // 3
          `sandking_burrowstrike`, // 4
          `sandking_scorpion_strike`, // 5
          "sandking_epicenter", // 6
          `sandking_scorpion_strike`, // 7
          "sandking_burrowstrike", // 8
          "sandking_burrowstrike", // 9
          `sandking_sand_storm`, // 10
          `sandking_sand_storm`, // 11
          "sandking_epicenter", // 12
          `sandking_sand_storm`, // 13
          `sandking_sand_storm`, // 14
          `special_bonus_unique_sand_king_burrowstrike_stun`, // 15
          `special_bonus_unique_sand_king_scorpion_strike_damage`, // 16
          "special_bonus_attributes", // 17
          "sandking_epicenter", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_sand_king_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_sand_king_4", // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `bracer`,
            `phase_boots`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `blink`,
            `ultimate_scepter`,
            `eternal_shroud`,
            `bloodstone`,
            `aghanims_shard`,
          ],
          late_game: [
            `shivas_guard`,
            `wind_waker`,
            `octarine_core`,
            `black_king_bar`,
          ],
          situational: [
            `ring_of_basilius`,
            `arcane_boots`,
            `soul_ring`,
            `hand_of_midas`,
            `veil_of_discord`,
            `vanguard`,
            `meteor_hammer`,
            `guardian_greaves`,
            `heavens_halberd`,
            `crimson_guard`,
            `pipe`,
            `boots_of_bearing`,
            `ethereal_blade`,
            `cyclone`,
            `lotus_orb`,
            `sphere`,
            `aeon_disk`,
            `heart`,
            `radiance`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `phase_boots`,
            "blink",
            `ultimate_scepter`,
            `eternal_shroud`,
            `bloodstone`,
            `aghanims_shard`,
            `shivas_guard`,
          ],
          neutral: [
            `unstable_wand`,
            "arcane_ring",
            `bullwhip`,
            "vambrace",
            `ceremonial_robe`,
            `cloak_of_flames`,
            `havoc_hammer`,
            `timeless_relic`,
            "giants_ring",
            `force_boots`,
          ],
        },
      },
    ],
    combo: [
      `sandking_epicenter`,
      `blink`,
      `sandking_burrowstrike`,
      `sandking_sand_storm`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "blight_stone",
          "magic_stick",
          "lifesteal",
          "ring_of_health",
          "infused_raindrop",
          "cloak",
        ],
        support: ["ward_sentry", "dust"],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["SentryDust", "glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "blade_mail",
          "black_king_bar",
        ],
      },
      late_game: {
        all: ["sheepstick", "sphere"],
        support: ["SentryDustGem", "black_king_bar"],
        core: ["abyssal_blade"],
      },
    },
  },

  shadow_demon: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699962404, es: 3160083849 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40569,
        power_level: [2, 2, 2.2, 2.2],
        facet: 1,
        abilities: [
          `shadow_demon_disruption`, // 1
          `shadow_demon_shadow_poison`, // 2
          "shadow_demon_shadow_poison", // 3
          `shadow_demon_disseminate`, // 4
          "shadow_demon_shadow_poison", // 5
          "shadow_demon_demonic_purge", // 6
          "shadow_demon_shadow_poison", // 7
          "shadow_demon_disruption", // 8
          "shadow_demon_disruption", // 9
          `special_bonus_strength_10`, // 10
          `shadow_demon_disruption`, // 11
          "shadow_demon_demonic_purge", // 12
          `shadow_demon_disseminate`, // 13
          `shadow_demon_disseminate`, // 14
          `special_bonus_unique_shadow_demon_3`, // 15
          `shadow_demon_disseminate`, // 16
          "special_bonus_attributes", // 17
          "shadow_demon_demonic_purge", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_shadow_demon_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_shadow_demon_7`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            "enchanted_mango",
            `circlet`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `aether_lens`,
            `blink`,
            `force_staff`,
            `aghanims_shard`,
          ],
          late_game: [
            `ultimate_scepter`,
            `octarine_core`,
            `wind_waker`,
            `refresher`,
          ],
          situational: [
            `glimmer_cape`,
            `urn_of_shadows`,
            `aeon_disk`,
            `ancient_janggo`,
            `boots_of_bearing`,
            `guardian_greaves`,
            "lotus_orb",
            `ghost`,
            `cyclone`,
            `pavise`,
            `solar_crest`,
            `ethereal_blade`,
            `sheepstick`,
            `dagon_5`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "aether_lens",
            `blink`,
            `force_staff`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `refresher`,
          ],
          neutral: [
            `arcane_ring`,
            `trusty_shovel`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ogre_seal_totem`,
            "spy_gadget",
            `timeless_relic`,
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    combo: [
      `shadow_demon_demonic_purge`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_disruption`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_disseminate`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_shadow_poison_release`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_wand", "ring_of_regen", "cloak"],
        support: ["tranquil_boots"],
        core: [],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["glimmer_cape"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
        ],
      },
      late_game: {
        all: ["sphere"],
        support: ["black_king_bar"],
        core: [],
      },
    },
  },

  // eidendota plays hero
  nevermore: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        //type: "Physical", 1.
        steam_guide_workshop_ids: { en: 2699962485, es: 3160083948 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40606,
        power_level: [1.8, 2, 2.6, 2.6],
        abilities: [
          "nevermore_shadowraze1", // 1
          "nevermore_necromastery", // 2
          "nevermore_shadowraze1", // 3
          "nevermore_necromastery", // 4
          "nevermore_shadowraze1", // 5
          "nevermore_necromastery", // 6
          "nevermore_necromastery", // 7
          "nevermore_dark_lord", // 8
          "nevermore_requiem", // 9
          "special_bonus_unique_nevermore_7", // 10
          "nevermore_dark_lord", // 11
          "nevermore_dark_lord", // 12
          "nevermore_dark_lord", // 13
          "nevermore_shadowraze1", // 14
          "special_bonus_unique_nevermore_3", // 15
          "nevermore_requiem", // 16
          "special_bonus_attributes", // 17
          "nevermore_requiem", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_nevermore_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_nevermore_raze_procsattacks", // 25
        ],
        items: {
          starting: [
            "circlet",
            "tango",
            "slippers",
            "enchanted_mango",
            "enchanted_mango",
            "branches",
          ],
          early_game: [
            "wraith_band",
            "power_treads",
            "magic_wand",
            "mask_of_madness",
            "lesser_crit",
          ],
          mid_game: [
            "dragon_lance",
            "black_king_bar",
            "aghanims_shard",
            "manta",
          ],
          late_game: [
            "hurricane_pike",
            "blink",
            "greater_crit",
            "satanic",
            "swift_blink",
          ],
          situational: [
            "sphere",
            "assault",
            "silver_edge",
            "skadi",
            "butterfly",
          ],
          core: [
            "power_treads",
            "mask_of_madness",
            "lesser_crit",
            "dragon_lance",
            "black_king_bar",
            "aghanims_shard",
            "manta",
            "hurricane_pike",
          ],
          neutral: [
            //"pogo_stick",
            "occult_bracelet",
            //"ring_of_aquila",
            "grove_bow",
            "elven_tunic",
            //"titan_sliver",
            "mind_breaker",
            "ninja_gear",
            "desolator_2",
            "mirror_shield",
            "force_boots",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        //type: "Physical",
        steam_guide_workshop_ids: { en: 2724416695, es: 3160084014 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40605,
        power_level: [1.8, 2.1, 2.6, 2.6],
        abilities: [
          "nevermore_shadowraze1", // 1
          "nevermore_necromastery", // 2
          "nevermore_shadowraze1", // 3
          "nevermore_necromastery", // 4
          "nevermore_shadowraze1", // 5
          "nevermore_necromastery", // 6
          "nevermore_shadowraze1", // 7
          "nevermore_necromastery", // 8
          "nevermore_requiem", // 9
          "special_bonus_unique_nevermore_7", // 10
          "nevermore_dark_lord", // 11
          "nevermore_requiem", // 12
          "nevermore_dark_lord", // 13
          "nevermore_dark_lord", // 14
          "special_bonus_unique_nevermore_3", // 15
          "nevermore_dark_lord", // 16
          "special_bonus_attributes", // 17
          "nevermore_requiem", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_nevermore_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_nevermore_raze_procsattacks", // 25
        ],
        items: {
          starting: [
            "enchanted_mango",
            "enchanted_mango",
            "tango",
            "branches",
            "branches",
            "branches",
          ],
          early_game: [
            "bottle",
            "boots",
            "power_treads",
            "magic_wand",
            "wind_lace",
            "falcon_blade",
            "dragon_lance",
          ],
          mid_game: ["black_king_bar", "manta", "aghanims_shard"],
          late_game: [
            "hurricane_pike",
            "greater_crit",
            "swift_blink",
            "satanic",
            "butterfly",
          ],
          situational: [
            "mask_of_madness",
            "skadi",
            "monkey_king_bar",
            "sphere",
            "silver_edge",
          ],
          core: [
            "falcon_blade",
            "dragon_lance",
            "black_king_bar",
            "manta",
            "aghanims_shard",
            "hurricane_pike",
            "greater_crit",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "arcane_ring",
            "lance_of_pursuit",
            "grove_bow",
            "specialists_array",
            //"dagger_of_ristul", Removed in 7.33
            //"ring_of_aquila",
            //"titan_sliver",
            "elven_tunic",
            "mind_breaker",
            "ninja_gear",
            "desolator_2",
            "pirate_hat",
            "mirror_shield",
            "force_boots",
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "wind_lace", "boots", "infused_raindrop"],
        support: ["ward_sentry"],
        core: ["DamageItems"],
      },
      mid_game: {
        all: [/*"medallion_of_courage",*/ "solar_crest", "mekansm"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          //"hood_of_defiance",
          "black_king_bar",
          "heavens_halberd",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: ["butterfly", "satanic"],
      },
    },
  },

  shadow_shaman: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699962568, es: 3160084126 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40567,
        power_level: [1.7, 2, 2.1, 2.3],
        facet: 1,
        abilities: [
          "shadow_shaman_ether_shock", // 1
          "shadow_shaman_shackles", // 2
          `shadow_shaman_shackles`, // 3
          `shadow_shaman_voodoo`, // 4
          `shadow_shaman_voodoo`, // 5
          "shadow_shaman_mass_serpent_ward", // 6
          `shadow_shaman_voodoo`, // 7
          `shadow_shaman_voodoo`, // 8
          `shadow_shaman_shackles`, // 9
          `special_bonus_mp_regen_175`, // 10
          `shadow_shaman_shackles`, // 11
          "shadow_shaman_mass_serpent_ward", // 12
          `shadow_shaman_ether_shock`, // 13
          `shadow_shaman_ether_shock`, // 14
          `special_bonus_unique_shadow_shaman_2`, // 15
          `shadow_shaman_ether_shock`, // 16
          "special_bonus_attributes", // 17
          "shadow_shaman_mass_serpent_ward", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_shadow_shaman_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_shadow_shaman_4`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `wind_lace`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            "magic_wand",
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `blink`,
            `aether_lens`,
            `aghanims_shard`,
            `force_staff`,
          ],
          late_game: [
            `ultimate_scepter`,
            `refresher`,
            `octarine_core`,
            `aeon_disk`,
          ],
          situational: [
            `hand_of_midas`,
            `black_king_bar`,
            `ghost`,
            `glimmer_cape`,
            "lotus_orb",
            `cyclone`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `blink`,
            `aether_lens`,
            `aghanims_shard`,
            `force_staff`,
            `ultimate_scepter`,
            `refresher`,
          ],
          neutral: [
            `faded_broach`,
            `arcane_ring`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ogre_seal_totem`,
            "spy_gadget",
            `ninja_gear`,
            "seer_stone",
            `force_boots`,
          ],
        },
      },
    ],
    combo: [
      `shadow_shaman_voodoo`,
      `shadow_shaman_mass_serpent_ward`,
      `attack`,
      `shadow_shaman_shackles`,
      `shadow_shaman_ether_shock`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "ring_of_regen", "infused_raindrop", "armor"],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["force_staff", "glimmer_cape"],
        core: [`orchid`, `black_king_bar`, `sange_and_yasha`],
      },
      late_game: {
        all: ["sphere"],
        support: ["black_king_bar"],
        core: ["assault"],
      },
    },
  },

  // YoonA plays hero
  silencer: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699962648, es: 3160084222 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40571,
        power_level: [1.5, 1.6, 1.9, 1.9],
        facet: 2,
        abilities: [
          "silencer_glaives_of_wisdom", // 1
          "silencer_curse_of_the_silent", // 2
          "silencer_curse_of_the_silent", // 3
          "silencer_last_word", // 4
          "silencer_curse_of_the_silent", // 5
          "silencer_global_silence", // 6
          "silencer_curse_of_the_silent", // 7
          "silencer_last_word", // 8
          "silencer_last_word", // 9
          `special_bonus_unique_silencer`, // 10
          `silencer_last_word`, // 11
          "silencer_global_silence", // 12
          "silencer_glaives_of_wisdom", // 13
          "silencer_glaives_of_wisdom", // 14
          `special_bonus_unique_silencer_7`, // 15
          "silencer_glaives_of_wisdom", // 16
          "special_bonus_attributes", // 17
          "silencer_global_silence", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_silencer_arcane_curse_undispellable`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_silencer_arcane_curse_charges`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `force_staff`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          late_game: [
            `refresher`,
            `sheepstick`,
            `octarine_core`,
            `hurricane_pike`,
          ],
          situational: [
            `tranquil_boots`,
            `veil_of_discord`,
            `hand_of_midas`,
            `pavise`,
            `solar_crest`,
            `glimmer_cape`,
            `aether_lens`,
            `lotus_orb`,
            `ancient_janggo`,
            `boots_of_bearing`,
            `guardian_greaves`,
            `ghost`,
            `cyclone`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `force_staff`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `refresher`,
            `sheepstick`,
            `octarine_core`,
          ],
          neutral: [
            `trusty_shovel`,
            `mysterious_hat`,
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            `ogre_seal_totem`,
            `timeless_relic`,
            `spy_gadget`,
            `book_of_shadows`,
            `pirate_hat`,
          ],
        },
      },
    ],
    combo: [
      `silencer_curse_of_the_silent`,
      `silencer_global_silence`,
      `silencer_glaives_of_wisdom`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "ring_of_regen"],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["cyclone", "lotus_orb", `cloak`],
        support: ["glimmer_cape", "ghost", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "heavens_halberd",
          "orchid",
          "manta",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: ["butterfly"],
      },
    },
  },

  // YoonA plays hero
  skywrath_mage: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699962794, es: 3160084286 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40573,
        power_level: [1.9, 2.2, 2, 1.6],
        facet: 1,
        abilities: [
          "skywrath_mage_concussive_shot", // 1
          "skywrath_mage_arcane_bolt", // 2
          `skywrath_mage_concussive_shot`, // 3
          "skywrath_mage_ancient_seal", // 4
          `skywrath_mage_concussive_shot`, // 5
          "skywrath_mage_mystic_flare", // 6
          `skywrath_mage_ancient_seal`, // 7
          "skywrath_mage_ancient_seal", // 8
          "skywrath_mage_ancient_seal", // 9
          `special_bonus_mp_regen_150`, // 10
          `skywrath_mage_arcane_bolt`, // 11
          `skywrath_mage_mystic_flare`, // 12
          `skywrath_mage_arcane_bolt`, // 13
          `skywrath_mage_arcane_bolt`, // 14
          `special_bonus_unique_skywrath`, // 15
          `skywrath_mage_concussive_shot`, // 16
          "special_bonus_attributes", // 17
          "skywrath_mage_mystic_flare", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_skywrath_3`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_skywrath_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `null_talisman`,
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `rod_of_atos`,
            `aghanims_shard`,
            `blink`,
            `force_staff`,
          ],
          late_game: [
            "ultimate_scepter",
            `ethereal_blade`,
            `sheepstick`,
            `wind_waker`,
          ],
          situational: [
            `veil_of_discord`,
            `pavise`,
            `phylactery`,
            `aether_lens`,
            `cyclone`,
            `ghost`,
            `glimmer_cape`,
            `solar_crest`,
            `kaya_and_sange`,
            `aeon_disk`,
            `octarine_core`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `rod_of_atos`,
            `aghanims_shard`,
            `blink`,
            `ultimate_scepter`,
            `ethereal_blade`,
            `wind_waker`,
          ],
          neutral: [
            `arcane_ring`,
            `mysterious_hat`,
            `philosophers_stone`,
            `bullwhip`,
            `psychic_headband`,
            `ceremonial_robe`,
            `timeless_relic`,
            `spy_gadget`,
            `seer_stone`,
            `book_of_shadows`,
          ],
        },
      },
    ],
    // ability_tooltips:
    // special_bonus_unique_skywrath_6: `You can skill the other talent if there are no Black King Bar carriers on the enemy team.`,
    combo: [
      `rod_of_atos`,
      `skywrath_mage_ancient_seal`,
      `skywrath_mage_mystic_flare`,
      `skywrath_mage_arcane_bolt`,
      `skywrath_mage_concussive_shot`,
      `skywrath_mage_arcane_bolt`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "headdress",
          "infused_raindrop",
          "cloak",
        ],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["cyclone", "lotus_orb"],
        support: ["force_staff", "glimmer_cape"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "blade_mail",
          "black_king_bar",
          "manta",
        ],
      },
      late_game: {
        all: ["sphere", "sheepstick"],
        support: ["black_king_bar"],
        core: [],
      },
    },
  },

  slardar: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699962869, es: 3160084352 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40623,
        power_level: [1.8, 2.1, 2.5, 2.4],
        abilities: [
          "slardar_slithereen_crush", // 1
          "slardar_bash", // 2
          `slardar_bash`, // 3
          `slardar_sprint`, // 4
          "slardar_bash", // 5
          "slardar_amplify_damage", // 6
          "slardar_bash", // 7
          "slardar_sprint", // 8
          "slardar_sprint", // 9
          "slardar_sprint", // 10
          "special_bonus_unique_slardar_7", // 11
          "slardar_amplify_damage", // 12
          "slardar_slithereen_crush", // 13
          "slardar_slithereen_crush", // 14
          "special_bonus_unique_slardar_2", // 15
          "slardar_slithereen_crush", // 16
          "special_bonus_attributes", // 17
          "slardar_amplify_damage", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_slardar_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_slardar_4", // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `gauntlets`,
            `circlet`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [`bracer`, `power_treads`, `magic_wand`, `echo_sabre`],
          mid_game: [`aghanims_shard`, `blink`, `black_king_bar`],
          late_game: [`ultimate_scepter`, `harpoon`, `moon_shard`, `assault`],
          situational: [
            `mask_of_madness`,
            `hand_of_midas`,
            "heavens_halberd",
            `octarine_core`,
            `monkey_king_bar`,
            `nullifier`,
            "satanic",
          ],
          core: [
            `power_treads`,
            `echo_sabre`,
            `aghanims_shard`,
            `blink`,
            `black_king_bar`,
            `ultimate_scepter`,
            `harpoon`,
          ],
          neutral: [
            "broom_handle",
            `duelist_gloves`,
            `orb_of_destruction`,
            `vambrace`,
            `cloak_of_flames`,
            `elven_tunic`,
            `mind_breaker`,
            //`penta_edged_sword`,
            "desolator_2",
            "pirate_hat",
          ],
        },
      },
    ],
    combo: [
      `blink`,
      `slardar_slithereen_crush`,
      `slardar_amplify_damage`,
      `attack`,
      `slardar_bash`,
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          "lotus_orb",
          /*"medallion_of_courage",*/ "solar_crest",
          "heavens_halberd",
        ],
        support: ["force_staff", "ghost"],
        core: ["manta", "hurricane_pike"],
      },
      late_game: {
        all: ["ethereal_blade"],
        support: [],
        core: ["assault", "butterfly"],
      },
    },
  },

  // eidendota plays hero
  slark: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699962959, es: 3160084427 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40638,
        power_level: [1.7, 2, 2.6, 2.6],
        facet: 1,
        abilities: [
          "slark_essence_shift", // 1
          "slark_pounce", // 2
          "slark_dark_pact", // 3
          "slark_dark_pact", // 4
          "slark_dark_pact", // 5
          "slark_shadow_dance", // 6
          "slark_dark_pact", // 7
          "slark_pounce", // 8
          "slark_pounce", // 9
          `slark_pounce`, // 10
          `special_bonus_unique_slark_6`, // 11
          "slark_shadow_dance", // 12
          "slark_essence_shift", // 13
          "slark_essence_shift", // 14
          "special_bonus_unique_slark_2", // 15
          "slark_essence_shift", // 16
          "special_bonus_attributes", // 17
          "slark_shadow_dance", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_slark_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_slark_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            "wraith_band",
            `power_treads`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            `diffusal_blade`,
            `orchid`,
            "ultimate_scepter",
            "aghanims_shard",
            "black_king_bar",
          ],
          late_game: [`skadi`, `disperser`, "abyssal_blade", `bloodthorn`],
          situational: [
            "orb_of_venom",
            "orb_of_corrosion",
            `hand_of_midas`,
            `echo_sabre`,
            `harpoon`,
            `basher`,
            `blink`,
            "sange_and_yasha",
            "sphere",
            "monkey_king_bar",
            "nullifier",
            "mage_slayer",
            "silver_edge",
            `butterfly`,
            `moon_shard`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            "power_treads",
            "diffusal_blade",
            `orchid`,
            "ultimate_scepter",
            "aghanims_shard",
            `black_king_bar`,
            `skadi`,
            `abyssal_blade`,
          ],
          neutral: [
            "lance_of_pursuit",
            "occult_bracelet",
            `vambrace`,
            "orb_of_destruction",
            "elven_tunic",
            `nemesis_curse`,
            "mind_breaker",
            `ancient_guardian`,
            `apex`,
            `pirate_hat`,
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots"],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: {
        all: [`wind_waker`],
        support: ["force_staff", "glimmer_cape", "ghost", "ward_sentry"],
        core: ["hurricane_pike", "heavens_halberd", "basher"],
      },
      late_game: {
        all: [`sheepstick`, `ethereal_blade`, `wind_waker`],
        support: ["SentryGem"],
        core: ["abyssal_blade", "butterfly", "bloodthorn"],
      },
    },
  },

  snapfire: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699963037, es: 3160084532 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40601,
        power_level: [2.1, 2.1, 2, 2.1],
        facet: 2,
        abilities: [
          "snapfire_scatterblast", // 1
          "snapfire_firesnap_cookie", // 2
          "snapfire_scatterblast", // 3
          "snapfire_firesnap_cookie", // 4
          "snapfire_scatterblast", // 5
          "snapfire_mortimer_kisses", // 6
          "snapfire_scatterblast", // 7
          "snapfire_firesnap_cookie", // 8
          "snapfire_firesnap_cookie", // 9
          "special_bonus_unique_snapfire_7", // 10
          "snapfire_lil_shredder", // 11
          "snapfire_mortimer_kisses", // 12
          "snapfire_lil_shredder", // 13
          "snapfire_lil_shredder", // 14
          "special_bonus_unique_snapfire_3", // 15
          "snapfire_lil_shredder", // 16
          "special_bonus_attributes", // 17
          "snapfire_mortimer_kisses", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_snapfire_mortimer_kisses_impact_damage", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_snapfire_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "tango",
            "blood_grenade",
            `circlet`,
            `branches`,
            "branches",
            "branches",
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            "wind_lace",
            "infused_raindrop",
          ],
          mid_game: [
            `arcane_boots`,
            `mekansm`,
            `force_staff`,
            `aghanims_shard`,
            `guardian_greaves`,
          ],
          late_game: [
            `ultimate_scepter`,
            `blink`,
            `octarine_core`,
            `wind_waker`,
          ],
          situational: [
            `bracer`,
            `spirit_vessel`,
            `pavise`,
            `solar_crest`,
            `glimmer_cape`,
            `rod_of_atos`,
            `ghost`,
            `boots_of_bearing`,
            "lotus_orb",
            `heavens_halberd`,
            `pipe`,
            `cyclone`,
            `aeon_disk`,
            `gungir`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `mekansm`,
            `force_staff`,
            `aghanims_shard`,
            `guardian_greaves`,
            `ultimate_scepter`,
            `blink`,
          ],
          neutral: [
            `arcane_ring`,
            `trusty_shovel`,
            "philosophers_stone",
            `pupils_gift`,
            `ceremonial_robe`,
            `ogre_seal_totem`,
            "timeless_relic",
            `spy_gadget`,
            `apex`,
            `giants_ring`,
          ],
        },
      },
    ],
    combo: [
      `snapfire_firesnap_cookie`,
      `snapfire_scatterblast`,
      `snapfire_mortimer_kisses`,
      `snapfire_lil_shredder`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "headdress",
          "infused_raindrop",
          "cloak",
        ],
        support: ["tranquil_boots"],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["cyclone"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "blade_mail",
          "black_king_bar",
        ],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade"],
        support: ["black_king_bar"],
        core: ["assault", "butterfly"],
      },
    },
  },

  sniper: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699963139, es: 3160084609 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40552,
        // Carry: 2.2	2.2	2.7	3
        // Mid: 2.2	2.2	2.7	3
        power_level: [2.2, 2.2, 2.7, 3],
        facet: 1,
        abilities: [
          "sniper_headshot", // 1
          `sniper_take_aim`, // 2
          `sniper_headshot`, // 3
          `sniper_shrapnel`, // 4
          `sniper_shrapnel`, // 5
          "sniper_assassinate", // 6
          "sniper_shrapnel", // 7
          `sniper_shrapnel`, // 8
          `sniper_headshot`, // 9
          `sniper_headshot`, // 10
          `special_bonus_unique_sniper_headshot_damage`, // 11
          `sniper_assassinate`, // 12
          `sniper_take_aim`, // 13
          `sniper_take_aim`, // 14
          `special_bonus_attack_speed_30`, // 15
          `sniper_take_aim`, // 16
          "special_bonus_attributes", // 17
          "sniper_assassinate", // 18
          "special_bonus_attributes", // 19
          "special_bonus_attack_range_100", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_sniper_3", // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            "wraith_band",
            "wraith_band",
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `mask_of_madness`,
            `dragon_lance`,
            `maelstrom`,
            `hurricane_pike`,
            `diffusal_blade`,
            `disperser`,
          ],
          late_game: [
            `aghanims_shard`,
            `black_king_bar`,
            `greater_crit`,
            `mjollnir`,
            `satanic`,
          ],
          situational: [
            `hand_of_midas`,
            `angels_demise`,
            `desolator`,
            `silver_edge`,
            `sange_and_yasha`,
            `manta`,
            `skadi`,
            `monkey_king_bar`,
            `moon_shard`,
            `butterfly`,
            `ultimate_scepter`,
            `sphere`,
            `bloodthorn`,
            `nullifier`,
            `rapier`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            "dragon_lance",
            "maelstrom",
            `hurricane_pike`,
            `disperser`,
            `aghanims_shard`,
            `black_king_bar`,
          ],
          neutral: [
            `duelist_gloves`,
            `lance_of_pursuit`,
            `grove_bow`,
            `specialists_array`,
            `enchanted_quiver`,
            "elven_tunic",
            `mind_breaker`,
            `ancient_guardian`,
            "pirate_hat",
            `desolator_2`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2725332187, es: 3160084702 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 39830,
        power_level: [1.7, 1.8, 2.1, 2.3],
        facet: 1,
        abilities: [
          `sniper_shrapnel`, // 1
          `sniper_headshot`, // 2
          `sniper_shrapnel`, // 3
          `sniper_take_aim`, // 4
          "sniper_shrapnel", // 5
          "sniper_assassinate", // 6
          "sniper_shrapnel", // 7
          `sniper_headshot`, // 8
          `sniper_headshot`, // 9
          `special_bonus_unique_sniper_5`, // 10
          `sniper_headshot`, // 11
          "sniper_assassinate", // 12
          `sniper_take_aim`, // 13
          `sniper_take_aim`, // 14
          `special_bonus_attack_speed_30`, // 15
          `sniper_take_aim`, // 16
          "special_bonus_attributes", // 17
          "sniper_assassinate", // 18
          "special_bonus_attributes", // 19
          "special_bonus_attack_range_100", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_sniper_2", // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `tranquil_boots`,
            "magic_wand",
            `wraith_band`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `phylactery`,
            `ultimate_scepter`,
            `angels_demise`,
            `aghanims_shard`,
            `force_staff`,
          ],
          late_game: [`yasha_and_kaya`, `ethereal_blade`, `blink`, `aeon_disk`],
          situational: [
            `power_treads`,
            `spirit_vessel`,
            `ancient_janggo`,
            "glimmer_cape",
            `veil_of_discord`,
            `pavise`,
            `aether_lens`,
            `solar_crest`,
            `cyclone`,
            `ghost`,
            `hurricane_pike`,
            `boots_of_bearing`,
            `octarine_core`,
            `sheepstick`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "tranquil_boots",
            `phylactery`,
            `ultimate_scepter`,
            `angels_demise`,
            `aghanims_shard`,
            `force_staff`,
            `yasha_and_kaya`,
          ],
          neutral: [
            "mysterious_hat",
            `faded_broach`,
            "philosophers_stone",
            "bullwhip",
            `ogre_seal_totem`,
            `psychic_headband`,
            `timeless_relic`,
            `spy_gadget`,
            "seer_stone",
            "book_of_shadows",
          ],
        },
        // item_tooltips:
        /* urn_of_shadows:
            "A core item that provides you with useful stats and allows you to snowball off of first kill.", */
      },
    ],
    combo: [
      `sniper_shrapnel`,
      `sniper_take_aim`,
      `attack`,
      `sniper_assassinate`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "ring_of_regen",
          "wind_lace",
          "boots",
          "armor",
          "infused_raindrop",
        ],
        support: ["ward_sentry", "smoke_of_deceit"],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["blink"],
        support: ["force_staff", "smoke_of_deceit", "glimmer_cape", "ghost"],
        core: ["heavens_halberd", "invis_sword", "blade_mail"],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["smoke_of_deceit"],
        core: ["silver_edge", "assault", "butterfly"],
      },
    },
  },

  // eidendota plays hero
  spectre: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699963243, es: 3160084781 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40637,
        power_level: [0.8, 1.9, 2.7, 2.9],
        abilities: [
          "spectre_spectral_dagger", // 1
          "spectre_dispersion", // 2
          "spectre_dispersion", // 3
          "spectre_spectral_dagger", // 4
          "spectre_spectral_dagger", // 5
          "spectre_haunt_single", // 6
          "spectre_spectral_dagger", // 7
          "spectre_dispersion", // 8
          "spectre_dispersion", // 9
          "special_bonus_unique_spectre", // 10
          "spectre_desolate", // 11
          "spectre_haunt_single", // 12
          "spectre_desolate", // 13
          "spectre_desolate", // 14
          "special_bonus_unique_spectre_6", // 15
          "spectre_desolate", // 16
          "special_bonus_attributes", // 17
          "spectre_haunt_single", // 18
          "special_bonus_attributes", // 19
          "special_bonus_hp_350", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_spectre_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "circlet",
            "ring_of_regen",
          ],
          early_game: [
            "urn_of_shadows",
            "magic_wand",
            "power_treads",
            "blade_mail",
          ],
          mid_game: ["radiance", "spirit_vessel"],
          late_game: ["manta", "heart", "skadi", "abyssal_blade"],
          situational: [
            "orchid",
            "diffusal_blade",
            "hand_of_midas",
            "black_king_bar",
            "nullifier",
            "refresher",
            "ultimate_scepter",
            "aghanims_shard",
            "bloodthorn",
          ],
          core: [
            "power_treads",
            "blade_mail",
            "radiance",
            "spirit_vessel",
            "manta",
            "heart",
            "skadi",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "lance_of_pursuit",
            "broom_handle",
            "vambrace",
            //"dagger_of_ristul", Removed in 7.33
            //"ring_of_aquila",
            "pupils_gift",
            //"titan_sliver",
            "elven_tunic",
            "mind_breaker",
            "ninja_gear",
            "pirate_hat",
            "apex",
          ],
        },
      },
    ],
    combo: [
      `spectre_haunt`,
      `spectre_reality`,
      "spirit_vessel",
      "spectre_spectral_dagger",
      `manta`,
      "attack",
    ],
    counter_items: {
      laning_phase: { all: [], support: [], core: [] },
      mid_game: {
        all: ["mekansm"],
        support: ["glimmer_cape", "ghost"],
        core: ["hurricane_pike", "silver_edge"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "aeon_disk"],
        support: [],
        core: ["butterfly", "bloodthorn"],
      },
    },
  },

  spirit_breaker: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699963328, es: 3160084858 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40666,
        power_level: [1.4, 2.2, 2.3, 2.1],
        abilities: [
          "spirit_breaker_greater_bash", // 1
          "spirit_breaker_charge_of_darkness", // 2
          "spirit_breaker_greater_bash", // 3
          "spirit_breaker_bulldoze", // 4
          "spirit_breaker_greater_bash", // 5
          "spirit_breaker_nether_strike", // 6
          "spirit_breaker_greater_bash", // 7
          "spirit_breaker_charge_of_darkness", // 8
          "spirit_breaker_charge_of_darkness", // 9
          "spirit_breaker_charge_of_darkness", // 10
          "spirit_breaker_bulldoze", // 11
          "spirit_breaker_nether_strike", // 12
          "spirit_breaker_bulldoze", // 13
          "spirit_breaker_bulldoze", // 14
          "special_bonus_night_vision_500", // 15
          "special_bonus_unique_spirit_breaker_2", // 16
          "special_bonus_attributes", // 17
          "spirit_breaker_nether_strike", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_spirit_breaker_shield", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_spirit_breaker_4`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `wind_lace`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [`phase_boots`, `magic_wand`],
          mid_game: [`invis_sword`, `ancient_janggo`, `aghanims_shard`],
          late_game: [
            "black_king_bar",
            `ultimate_scepter`,
            `octarine_core`,
            `yasha_and_kaya`,
            `wind_waker`,
            "silver_edge",
          ],
          situational: [
            `infused_raindrop`,
            "orb_of_venom",
            `hand_of_midas`,
            `urn_of_shadows`,
            `spirit_vessel`,
            `heavens_halberd`,
            `lotus_orb`,
            `blade_mail`,
            `boots_of_bearing`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [`phase_boots`, `wind_lace`, `invis_sword`, `black_king_bar`],
          neutral: [
            "broom_handle",
            `faded_broach`,
            `gossamer_cape`,
            `vambrace`,
            `ceremonial_robe`,
            `dandelion_amulet`,
            `timeless_relic`,
            "ninja_gear",
            "force_boots",
            "giants_ring",
          ],
        },
        // item_tooltips: {
        // orb_of_corrosion: "If you can pressure on the lane.",
        // vladmir: "Amplifying your teams damage and grants them lifesteal.",
        /* aghanims_shard:
            `A late game luxury item to save your cores from single target burst, such as Lions Finger or Linas Laguna Blade.`, */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2726400030, es: 3160084941 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40736,
        power_level: [1.4, 2.3, 2.4, 2.2],
        abilities: [
          "spirit_breaker_greater_bash", // 1
          "spirit_breaker_charge_of_darkness", // 2
          "spirit_breaker_greater_bash", // 3
          `spirit_breaker_charge_of_darkness`, // 4
          "spirit_breaker_greater_bash", // 5
          "spirit_breaker_nether_strike", // 6
          "spirit_breaker_greater_bash", // 7
          `spirit_breaker_bulldoze`, // 8
          "spirit_breaker_charge_of_darkness", // 9
          "spirit_breaker_charge_of_darkness", // 10
          `spirit_breaker_bulldoze`, // 11
          "spirit_breaker_nether_strike", // 12
          "spirit_breaker_bulldoze", // 13
          "spirit_breaker_bulldoze", // 14
          `special_bonus_armor_4`, // 15
          "special_bonus_unique_spirit_breaker_2", // 16
          "special_bonus_attributes", // 17
          "spirit_breaker_nether_strike", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_spirit_breaker_shield", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_spirit_breaker_4`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `gauntlets`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `phase_boots`,
            "hand_of_midas",
            "magic_wand",
            `wind_lace`,
          ],
          mid_game: ["octarine_core", "invis_sword"],
          late_game: [
            `yasha_and_kaya`,
            `black_king_bar`,
            `wind_waker`,
            `silver_edge`,
          ],
          situational: [
            "ultimate_scepter",
            "aghanims_shard",
            `pipe`,
            `cyclone`,
            `heavens_halberd`,
            `lotus_orb`,
            `aghanims_shard`,
            `sphere`,
            `boots_of_bearing`,
            `blade_mail`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            "hand_of_midas",
            "invis_sword",
            `octarine_core`,
            `black_king_bar`,
          ],
          neutral: [
            `broom_handle`,
            `faded_broach`,
            `dragon_scale`,
            `vambrace`,
            `cloak_of_flames`,
            `craggy_coat`,
            `timeless_relic`,
            `ninja_gear`,
            `force_boots`,
            `giants_ring`,
          ],
        },
      },
    ],
    combo: [
      `spirit_breaker_charge_of_darkness`,
      `phase_boots`,
      `spirit_breaker_bulldoze`,
      `invis_sword`,
      `spirit_breaker_nether_strike`,
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots"],
        support: ["ward_observer"],
        core: [],
      },
      mid_game: {
        all: ["cyclone"],
        support: ["glimmer_cape", "force_staff", "ghost"],
        core: ["hurricane_pike"],
      },
      late_game: {
        all: ["sphere"],
        support: [],
        core: ["abyssal_blade", "butterfly"],
      },
    },
  },

  storm_spirit: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699963425, es: 3160084997 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40633,
        power_level: [1.7, 1.9, 2.6, 2.8],
        abilities: [
          "storm_spirit_static_remnant", // 1
          "storm_spirit_overload", // 2
          "storm_spirit_electric_vortex", // 3
          "storm_spirit_static_remnant", // 4
          "storm_spirit_overload", // 5
          "storm_spirit_ball_lightning", // 6
          "storm_spirit_static_remnant", // 7
          "storm_spirit_static_remnant", // 8
          "storm_spirit_overload", // 9
          `storm_spirit_overload`, // 10
          `special_bonus_mp_regen_150`, // 11
          "storm_spirit_ball_lightning", // 12
          "storm_spirit_electric_vortex", // 13
          "storm_spirit_electric_vortex", // 14
          "special_bonus_hp_250", // 15
          "storm_spirit_electric_vortex", // 16
          "special_bonus_attributes", // 17
          "storm_spirit_ball_lightning", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_storm_spirit`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_storm_spirit_7", // 25
        ],
        items: {
          starting: [
            `tango`,
            `faerie_fire`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: ["bottle", `boots`, `magic_wand`, `falcon_blade`],
          mid_game: [`power_treads`, `witch_blade`, `black_king_bar`],
          late_game: [
            `sheepstick`,
            "devastator",
            "aghanims_shard",
            "ultimate_scepter",
            "shivas_guard",
          ],
          situational: [
            `sphere`,
            `cyclone`,
            `orchid`,
            `refresher`,
            "kaya_and_sange",
            "bloodthorn",
          ],
          core: [
            `power_treads`,
            `falcon_blade`,
            `witch_blade`,
            "black_king_bar",
            "sheepstick",
            "devastator",
            "aghanims_shard",
            `ultimate_scepter`,
          ],
          neutral: [
            "mysterious_hat",
            "arcane_ring",
            "vambrace",
            "grove_bow",
            "ceremonial_robe",
            "psychic_headband",
            //"spell_prism",
            "timeless_relic",
            `apex`,
            //`ex_machina`,
          ],
        },
      },
    ],
    combo: [
      `storm_spirit_ball_lightning`,
      `attack`,
      `storm_spirit_static_remnant`,
      `attack`,
      `storm_spirit_electric_vortex`,
      `attack`,
      `storm_spirit_static_remnant`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "infused_raindrop"],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: {
        all: ["rod_of_atos"],
        support: ["glimmer_cape", "ghost"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "orchid",
          "black_king_bar",
          "manta",
        ],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk"],
        support: ["black_king_bar"],
        core: ["abyssal_blade"],
      },
    },
  },

  // eidendota plays hero
  sven: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699963505, es: 3160085070 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40587,
        power_level: [0.9, 1.7, 2.7, 2.6],
        abilities: [
          "sven_storm_bolt", // 1
          "sven_warcry", // 2
          "sven_great_cleave", // 3
          "sven_great_cleave", // 4
          "sven_great_cleave", // 5
          "sven_gods_strength", // 6
          "sven_great_cleave", // 7
          "sven_warcry", // 8
          "sven_warcry", // 9
          "special_bonus_attack_speed_20", // 10
          "sven_warcry", // 11
          "sven_gods_strength", // 12
          "sven_storm_bolt", // 13
          "sven_storm_bolt", // 14
          "special_bonus_unique_sven_3", // 15
          "sven_storm_bolt", // 16
          "special_bonus_attributes", // 17
          "sven_gods_strength", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_sven_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_sven_2", // 25
        ],
        items: {
          starting: [
            "quelling_blade",
            "tango",
            "branches",
            "circlet",
            "slippers",
          ],
          early_game: [
            "tango",
            "wraith_band",
            "boots",
            "magic_wand",
            "phase_boots",
            "mask_of_madness",
            "gloves",
            "echo_sabre",
          ],
          mid_game: ["black_king_bar", "harpoon", "lesser_crit", "blink"],
          late_game: [
            "greater_crit",
            "assault",
            "satanic",
            "swift_blink",
            "moon_shard",
          ],
          situational: [
            "aghanims_shard",
            "silver_edge",
            "sphere",
            "monkey_king_bar",
            "ultimate_scepter",
          ],
          core: [
            "mask_of_madness",
            "harpoon",
            "blink",
            "black_king_bar",
            "greater_crit",
          ],
          neutral: [
            //tier 1
            "unstable_wand",
            "broom_handle",
            "occult_bracelet",

            //tier 2
            "vambrace",
            "orb_of_destruction",
            "dragon_scale",

            //tier 3
            "paladin_sword",
            "elven_tunic",
            "vindicators_axe",

            //tier 4
            "mind_breaker",
            "havoc_hammer",
            "ninja_gear",

            //tier 5
            "pirate_hat",
            "mirror_shield",
            "giants_ring",
          ],
        },
      },
    ],
    combo: [
      `sven_gods_strength`,
      `sven_warcry`,
      `black_king_bar`,
      `blink`,
      `sven_storm_bolt`,
      `mask_of_madness`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: ["armor"],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: {
        all: ["lotus_orb", "blade_mail"],
        support: ["glimmer_cape", "ghost", "force_staff", "cyclone"],
        core: ["hurricane_pike", "heavens_halberd", "invis_sword"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "aeon_disk"],
        support: [],
        core: [
          "abyssal_blade",
          "assault",
          "shivas_guard",
          "butterfly",
          "skadi",
        ],
      },
    },
  },

  techies: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699933135, es: 3160085152 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40625,
        power_level: [2, 2.1, 2.1, 2.2],
        abilities: [
          "techies_sticky_bomb", // 1
          "techies_suicide", // 2
          "techies_sticky_bomb", // 3
          "techies_suicide", // 4
          "techies_sticky_bomb", // 5
          "techies_land_mines", // 6
          "techies_sticky_bomb", // 7
          `techies_reactive_tazer`, // 8
          "techies_suicide", // 9
          `techies_suicide`, // 10
          `special_bonus_magic_resistance_20`, // 11
          "techies_land_mines", // 12
          "techies_reactive_tazer", // 13
          "techies_reactive_tazer", // 14
          "special_bonus_unique_techies", // 15
          "techies_reactive_tazer", // 16
          "special_bonus_attributes", // 17
          "techies_land_mines", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_techies_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_techies_4", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `pavise`,
            `solar_crest`,
            `glimmer_cape`,
            `guardian_greaves`,
            `aether_lens`,
          ],
          late_game: [
            `ultimate_scepter`,
            `aghanims_shard`,
            `ethereal_blade`,
            `octarine_core`,
          ],
          situational: [
            `null_talisman`,
            `soul_ring`,
            `veil_of_discord`,
            `spirit_vessel`,
            `force_staff`,
            `cyclone`,
            `ghost`,
            "blink",
            `aeon_disk`,
            `sheepstick`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `solar_crest`,
            `glimmer_cape`,
            `guardian_greaves`,
            `aether_lens`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `ethereal_blade`,
          ],
          neutral: [
            "arcane_ring",
            `mysterious_hat`,
            "philosophers_stone",
            `bullwhip`,
            "psychic_headband",
            "ceremonial_robe",
            `spy_gadget`,
            "timeless_relic",
            `force_boots`,
            `seer_stone`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2776661467, es: 3160085277 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40624,
        power_level: [1.8, 2.1, 2.1, 2.3],
        abilities: [
          "techies_sticky_bomb", // 1
          "techies_suicide", // 2
          "techies_sticky_bomb", // 3
          "techies_suicide", // 4
          "techies_sticky_bomb", // 5
          "techies_land_mines", // 6
          "techies_sticky_bomb", // 7
          "techies_suicide", // 8
          "techies_suicide", // 9
          `special_bonus_magic_resistance_20`, // 10
          `techies_reactive_tazer`, // 11
          "techies_land_mines", // 12
          "techies_reactive_tazer", // 13
          "techies_reactive_tazer", // 14
          "special_bonus_unique_techies", // 15
          "techies_reactive_tazer", // 16
          "special_bonus_attributes", // 17
          "techies_land_mines", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_techies_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_techies_4", // 25
        ],
        items: {
          starting: [
            "tango",
            `faerie_fire`,
            `circlet`,
            `branches`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bottle`,
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `aether_lens`,
            `veil_of_discord`,
            `ethereal_blade`,
            `shivas_guard`,
          ],
          late_game: [
            `octarine_core`,
            `ultimate_scepter`,
            `sheepstick`,
            "overwhelming_blink",
          ],
          situational: [
            `wraith_band`,
            `soul_ring`,
            `glimmer_cape`,
            `guardian_greaves`,
            "black_king_bar",
            "aeon_disk",
            `sphere`,
            `pipe`,
            `cyclone`,
            `ghost`,
            `force_staff`,
            `dagon_5`,
            `bloodstone`,
            `aghanims_shard`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `arcane_boots`,
            `aether_lens`,
            `veil_of_discord`,
            `ethereal_blade`,
            `shivas_guard`,
            `octarine_core`,
            `ultimate_scepter`,
          ],
          neutral: [
            `arcane_ring`,
            `mysterious_hat`,
            `bullwhip`,
            `philosophers_stone`,
            `psychic_headband`,
            `ceremonial_robe`,
            `trickster_cloak`,
            `timeless_relic`,
            `force_boots`,
            `seer_stone`,
          ],
        },
      },
    ],
    // item_tooltips:
    /* moon_shard:
        "Only purchase this item if you take your last 252 damage talent as your right clicks become way stronger and you can right click enemies.", */
    combo: [
      `techies_reactive_tazer`,
      `techies_suicide`,
      `ethereal_blade`,
      `techies_sticky_bomb`,
      `techies_land_mines`,
      `techies_land_mines`,
    ],
    counter_items: {
      laning_phase: {
        all: ["quelling_blade", "headdress", "infused_raindrop", "cloak"],
        support: [
          /* "ward_sentry", */
          "tranquil_boots",
        ],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: [],
        support: [/* "SentryGem" , */ "glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "blade_mail",
          "eternal_shroud",
          "orchid",
          "black_king_bar",
          "manta",
        ],
      },
      late_game: {
        all: ["aeon_disk"],
        support: [/* "SentryGem", */ "black_king_bar"],
        core: ["heart", "satanic"],
      },
    },
  },

  // eidendota plays hero
  templar_assassin: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699963659, es: 3160085348 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40602,
        power_level: [1.8, 2.2, 2.7, 2.6],
        abilities: [
          "templar_assassin_psi_blades", // 1
          "templar_assassin_refraction", // 2
          "templar_assassin_refraction", // 3
          "templar_assassin_psi_blades", // 4
          "templar_assassin_refraction", // 5
          "templar_assassin_psionic_trap", // 6
          "templar_assassin_refraction", // 7
          "templar_assassin_meld", // 8
          "templar_assassin_meld", // 9
          "templar_assassin_meld", // 10
          "templar_assassin_meld", // 11
          "templar_assassin_psionic_trap", // 12
          "templar_assassin_psi_blades", // 13
          "special_bonus_unique_templar_assassin_refraction_damage", // 14
          "special_bonus_unique_templar_assassin_8", // 15
          "templar_assassin_psi_blades", // 16
          "special_bonus_attributes", // 17
          "templar_assassin_psionic_trap", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_templar_assassin_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_templar_assassin", // 25
        ],
        items: {
          starting: [
            "quelling_blade",
            "slippers",
            "circlet",
            "branches",
            "tango",
          ],
          early_game: ["wraith_band", "blight_stone", "power_treads"],
          mid_game: ["desolator", "black_king_bar", "blink", "dragon_lance"],
          late_game: [
            "ultimate_scepter",
            "aghanims_shard",
            "hurricane_pike",
            "greater_crit",
            "swift_blink",
            "satanic",
          ],
          situational: [
            "sheepstick",
            "sphere",
            "nullifier",
            "monkey_king_bar",
            "silver_edge",
          ],
          core: [
            "power_treads",
            "desolator",
            "black_king_bar",
            "blink",
            "dragon_lance",
            "ultimate_scepter",
          ],
          neutral: [
            // tier 1
            "unstable_wand",
            "occult_bracelet",
            "lance_of_pursuit",

            // tier 2
            "grove_bow",
            "specialists_array",
            "orb_of_destruction",

            // tier 3
            "elven_tunic",
            "enchanted_quiver",
            "paladin_sword",

            // tier 4
            "ninja_gear",
            "mind_breaker",
            "avianas_feather",

            // tier 5
            "pirate_hat",
            "desolator_2",
            "apex",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2726399928, es: 3160085420 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40613,
        power_level: [1.9, 2.2, 2.7, 2.6],
        abilities: [
          "templar_assassin_psi_blades", // 1
          "templar_assassin_refraction", // 2
          "templar_assassin_refraction", // 3
          "templar_assassin_psi_blades", // 4
          "templar_assassin_refraction", // 5
          "templar_assassin_psionic_trap", // 6
          "templar_assassin_refraction", // 7
          "templar_assassin_meld", // 8
          "templar_assassin_meld", // 9
          "templar_assassin_meld", // 10
          "templar_assassin_meld", // 11
          "templar_assassin_psionic_trap", // 12
          "templar_assassin_psi_blades", // 13
          "special_bonus_unique_templar_assassin_refraction_damage", // 14
          "special_bonus_unique_templar_assassin_8", // 15
          "templar_assassin_psi_blades", // 16
          "special_bonus_attributes", // 17
          "templar_assassin_psionic_trap", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_templar_assassin_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_templar_assassin", // 25
        ],
        items: {
          starting: [
            "branches",
            "branches",
            "tango",
            "faerie_fire",
            "ward_observer",
          ],
          early_game: ["bottle", "magic_wand", "blight_stone", "power_treads"],
          mid_game: ["desolator", "black_king_bar", "blink", "dragon_lance"],
          late_game: [
            "ultimate_scepter",
            "hurricane_pike",
            "aghanims_shard",
            "greater_crit",
            "swift_blink",
            "satanic",
          ],
          situational: [
            "sheepstick",
            "sphere",
            "nullifier",
            "monkey_king_bar",
            "silver_edge",
          ],
          core: [
            "power_treads",
            "desolator",
            "black_king_bar",
            "blink",
            "dragon_lance",
            "ultimate_scepter",
          ],
          neutral: [
            // tier 1
            "unstable_wand",
            "occult_bracelet",
            "lance_of_pursuit",

            // tier 2
            "grove_bow",
            "specialists_array",
            "orb_of_destruction",

            // tier 3
            "elven_tunic",
            "enchanted_quiver",
            "paladin_sword",

            // tier 4
            "ninja_gear",
            "mind_breaker",
            "avianas_feather",

            // tier 5
            "pirate_hat",
            "desolator_2",
            "apex",
          ],
        },
      },
    ],
    combo: [
      "templar_assassin_refraction",
      "black_king_bar",
      "blink",
      "templar_assassin_meld",
      "attack",
    ],
    counter_items: {
      laning_phase: {
        all: ["ward_sentry", "wind_lace", "boots", "urn_of_shadows", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel", "ward_sentry", "dust"],
        support: ["ghost", "glimmer_cape"],
        core: ["hurricane_pike", "witch_blade", "heavens_halberd", "javelin"],
      },
      late_game: {
        all: ["gem", "sheepstick", "ethereal_blade", "aeon_disk"],
        support: [],
        core: ["abyssal_blade", "assault", "butterfly", "radiance"],
      },
    },
  },

  // eidendota plays hero
  terrorblade: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699963755, es: 3160085502 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40645,
        power_level: [1.6, 2, 2.7, 2.8],
        abilities: [
          "terrorblade_reflection", // 1
          "terrorblade_metamorphosis", // 2
          "terrorblade_metamorphosis", // 3
          "terrorblade_conjure_image", // 4
          "terrorblade_conjure_image", // 5
          "terrorblade_conjure_image", // 6
          "terrorblade_conjure_image", // 7
          "terrorblade_sunder", // 8
          "terrorblade_metamorphosis", // 9
          "special_bonus_unique_terrorblade_4", // 10
          "terrorblade_metamorphosis", // 11
          "terrorblade_sunder", // 12
          "terrorblade_reflection", // 13
          "terrorblade_reflection", // 14
          "special_bonus_unique_terrorblade_metamorphosis_cooldown", // 15
          "terrorblade_reflection", // 16
          "special_bonus_attributes", // 17
          "terrorblade_sunder", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_terrorblade_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_terrorblade_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "magic_stick",
            "branches",
            "circlet",
          ],
          early_game: ["wraith_band", "power_treads", "magic_wand", "yasha"],
          mid_game: ["manta", "skadi", "black_king_bar"],
          late_game: ["butterfly", "greater_crit", "disperser", "satanic"],
          situational: [
            "hand_of_midas",
            "aghanims_shard",
            "infused_raindrop",
            "monkey_king_bar",
            "sange_and_yasha",
            "sphere",
            "diffusal_blade",
            "swift_blink",
            "hurricane_pike",
            "dragon_lance",
            "refresher",
          ],
          core: ["manta", "skadi", "black_king_bar", "butterfly"],
          neutral: [
            "unstable_wand",
            "broom_handle",
            "grove_bow",
            "vambrace",
            "elven_tunic",
            "vindicators_axe",
            "mind_breaker",
            "ninja_gear",
            "pirate_hat",
            "mirror_shield",
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["armor"],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: {
        all: [
          //"medallion_of_courage",
          "solar_crest",
          "lotus_orb",
          "sphere",
          "dagon",
        ],
        support: ["ward_dispenser", "glimmer_cape", "ghost"],
        core: [
          "maelstrom",
          "crimson_guard",
          "heavens_halberd",
          "orchid",
          "black_king_bar",
          "travel_boots",
          "manta",
        ],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade"],
        support: ["travel_boots"],
        core: [
          "mjollnir",
          "monkey_king_bar",
          "abyssal_blade",
          "assault",
          "bloodthorn",
          "butterfly",
          "overwhelming_blink",
          "satanic",
        ],
      },
    },
  },

  tidehunter: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699963852, es: 3160085580 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40621,
        power_level: [1.7, 2, 2.5, 2.6],
        abilities: [
          `tidehunter_gush`, // 1
          `tidehunter_anchor_smash`, // 2
          "tidehunter_anchor_smash", // 3
          `tidehunter_kraken_shell`, // 4
          "tidehunter_anchor_smash", // 5
          "tidehunter_ravage", // 6
          "tidehunter_anchor_smash", // 7
          "tidehunter_kraken_shell", // 8
          "tidehunter_kraken_shell", // 9
          `special_bonus_unique_tidehunter_9`, // 10
          `tidehunter_kraken_shell`, // 11
          "tidehunter_ravage", // 12
          "tidehunter_gush", // 13
          "tidehunter_gush", // 14
          `special_bonus_unique_tidehunter_2`, // 15
          `tidehunter_gush`, // 16
          "special_bonus_attributes", // 17
          "tidehunter_ravage", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_tidehunter_10`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tidehunter_7", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `gauntlets`,
            `gauntlets`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `phase_boots`,
            `soul_ring`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `vladmir`,
            `mage_slayer`,
            `blink`,
            `veil_of_discord`,
            `shivas_guard`,
          ],
          late_game: [
            `aghanims_shard`,
            `ultimate_scepter`,
            `refresher`,
            `octarine_core`,
          ],
          situational: [
            `bracer`,
            `arcane_boots`,
            `hand_of_midas`,
            `meteor_hammer`,
            `guardian_greaves`,
            `force_staff`,
            "heavens_halberd",
            `lotus_orb`,
            `pipe`,
            `eternal_shroud`,
            `black_king_bar`,
            `sphere`,
            `aeon_disk`,
            `assault`,
            `sheepstick`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `soul_ring`,
            `vladmir`,
            `mage_slayer`,
            `blink`,
            `shivas_guard`,
            `aghanims_shard`,
            "ultimate_scepter",
            `refresher`,
          ],
          neutral: [
            `occult_bracelet`,
            `arcane_ring`,
            `bullwhip`,
            `dragon_scale`,
            "cloak_of_flames",
            `ceremonial_robe`,
            `timeless_relic`,
            `ninja_gear`,
            `desolator_2`,
            `giants_ring`,
          ],
        },
      },
    ],
    // ability_tooltips:
    /* tidehunter_gush:
        "You can skill this spell on level 1 if you are fighting at the 0min rune or you can pressure on the lane.", */
    /* special_bonus_unique_tidehunter_6:
        "You can take this talent over the suggested one if opponents have a lot of stuns or debuffs that Kraken Shell can dispel off of you.", */
    //item_tooltips:
    /*  hood_of_defiance:
        "A core defensive item that negates magical damage. Kraken Shell protects Tidehunter from right-clicks and Hood against magical damage.", */
    combo: [
      `soul_ring`,
      `blink`,
      `tidehunter_ravage`,
      `tidehunter_gush`,
      `tidehunter_anchor_smash`,
      `refresher`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "blight_stone", "lifesteal", "armor"],
        support: [],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["mekansm"],
        support: ["glimmer_cape", "force_staff"],
        core: ["black_king_bar", "silver_edge", `sange_and_yasha`],
      },
      late_game: {
        all: ["wind_waker"],
        support: ["black_king_bar", "aeon_disk"],
        core: ["assault"],
      },
    },
  },

  // Timersaw
  shredder: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699963963, es: 3160085668 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40553,
        power_level: [2.4, 2.6, 2.4, 2.3],
        facet: 2,
        abilities: [
          "shredder_whirling_death", // 1
          "shredder_reactive_armor", // 2
          `shredder_timber_chain`, // 3
          `shredder_whirling_death`, // 4
          `shredder_timber_chain`, // 5
          "shredder_chakram", // 6
          "shredder_timber_chain", // 7
          "shredder_timber_chain", // 8
          `shredder_whirling_death`, // 9
          `special_bonus_mp_regen_150`, // 10
          `shredder_whirling_death`, // 11
          "shredder_chakram", // 12
          `shredder_reactive_armor`, // 13
          `shredder_reactive_armor`, // 14
          `special_bonus_unique_timbersaw_5`, // 15
          `shredder_reactive_armor`, // 16
          "special_bonus_attributes", // 17
          "shredder_chakram", // 18
          "special_bonus_attributes", // 19
          "special_bonus_magic_resistance_20", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_timbersaw_3`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            "gauntlets",
            "gauntlets",
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `arcane_boots`,
            `soul_ring`,
            "magic_wand",
            `wind_lace`,
          ],
          mid_game: [
            `kaya`,
            `eternal_shroud`,
            `kaya_and_sange`,
            `ultimate_scepter`,
            `shivas_guard`,
          ],
          late_game: [`blink`, `aghanims_shard`, `wind_waker`, `sheepstick`],
          situational: [
            "orb_of_corrosion",
            `veil_of_discord`,
            `vanguard`,
            `meteor_hammer`,
            `cyclone`,
            `bloodstone`,
            `crimson_guard`,
            `pipe`,
            `guardian_greaves`,
            `lotus_orb`,
            `heavens_halberd`,
            `black_king_bar`,
            `sphere`,
            `aeon_disk`,
            `octarine_core`,
            `heart`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `arcane_boots`,
            `soul_ring`,
            `eternal_shroud`,
            `kaya_and_sange`,
            `ultimate_scepter`,
            `shivas_guard`,
            `wind_waker`,
          ],
          neutral: [
            "arcane_ring",
            `occult_bracelet`,
            `vambrace`,
            `bullwhip`,
            `craggy_coat`,
            "cloak_of_flames",
            `rattlecage`,
            `havoc_hammer`,
            `giants_ring`,
            `mirror_shield`,
          ],
        },
      },
    ],
    // item_tooltips:
    /* hood_of_defiance:
        "A core defensive item. Reactive armor protects against physical damage and Hood covers the magical damage.", */
    combo: [
      `shredder_chakram`,
      `shredder_timber_chain`,
      `shredder_whirling_death`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_health",
          "wind_lace",
          "boots",
          "urn_of_shadows",
          "quelling_blade",
        ],
        support: ["tranquil_boots"],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel"],
        support: ["glimmer_cape", "force_staff"],
        core: ["mage_slayer", "black_king_bar", "silver_edge"],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: ["skadi", "abyssal_blade", "bloodthorn"],
      },
    },
  },

  tinker: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699964058, es: 3160085768 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40588,
        power_level: [2, 2.2, 2.7, 2.8],
		facet: 2,
        abilities: [
          "tinker_laser", // 1
          "tinker_march_of_the_machines", // 2
          `tinker_march_of_the_machines`, // 3
          `tinker_laser`, // 4
          `tinker_march_of_the_machines`, // 5
          "tinker_rearm", // 6   Note Michel: Use 'tinker_keen_teleport' instead of 'tinker_rearm'
          `tinker_march_of_the_machines`, // 7
          `tinker_laser`, // 8
          `tinker_laser`, // 9
          `special_bonus_unique_tinker_march_duration`, // 10
          `tinker_defense_matrix`, // 11
          "tinker_rearm", // 12
          "tinker_defense_matrix", // 13
          "tinker_defense_matrix", // 14
          `special_bonus_unique_tinker_4`, // 15
          `tinker_defense_matrix`, // 16
          "special_bonus_attributes", // 17
          "tinker_rearm", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_tinker_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tinker", // 25
        ],
        items: {
          starting: [
            `tango`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [`bottle`, `null_talisman`, `null_talisman`, `blink`],
          mid_game: [
            `ultimate_scepter`,
            `aether_lens`,
			`kaya_and_sange`,
            `black_king_bar`,
			`aghanims_shard`,
          ],
          late_game: [
            `ethereal_blade`,
			`arcane_blink`,
			`sheepstick`,
            `octarine_core`,
          ],
          situational: [
            `magic_wand`,
			`soul_ring`,
			`veil_of_discord`,
			`phylactery`,
			`angels_demise`,
            `force_staff`,
            `dagon_5`,
            `aeon_disk`,
			`bloodstone`,
			`shivas_guard`,
			`sphere`,
            `wind_waker`,
			`overwhelming_blink`,
          ],
          core: [
            "bottle",
            `null_talisman`,
			`blink`,
            `ultimate_scepter`,
            `aether_lens`,
			`kaya_and_sange`,
            `black_king_bar`,
            `arcane_blink`,
          ],
          neutral: [
            "mysterious_hat",
            `safety_bubble`,
            "philosophers_stone",
            `vambrace`,
            "psychic_headband",
            "ceremonial_robe",
            "timeless_relic",
            `spy_gadget`,
            "seer_stone",
            `force_boots`,
          ],
        },
      },
    ],
    combo: [
		`tinker_defense_matrix`,
		`tinker_laser`,
		`blink`,
		`tinker_march_of_the_machines`,
		`tinker_rearm`,
	],
    /*
    // Needs to be reviewed, tinker_heat_seeking_missile doens't exists anymore and rearm items was also removed
    combo: [
      `tinker_defense_matrix`,
      `tinker_rearm`,
      `tinker_laser`,
      `shivas_guard`,
      `blink`,
      `tinker_heat_seeking_missile`,
      `tinker_rearm`,
    ],*/
    counter_items: {
      laning_phase: {
        all: [`ring_of_regen`, `headdress`, `cloak`],
        support: [`tranquil_boots`],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb", "blink"],
        support: [`glimmer_cape`, `ward_observer`],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "blade_mail",
          "black_king_bar",
          "invis_sword",
          "travel_boots",
          "witch_blade",
        ],
      },
      late_game: {
        all: ["sheepstick", "sphere", "aeon_disk"],
        support: [
          "ward_observer",
          "black_king_bar",
          "travel_boots",
        ],
        core: ["monkey_king_bar", "abyssal_blade", "satanic", "heart"],
      },
    },
  },

  tiny: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699964139, es: 3160085852 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40554,
        power_level: [1, 1.9, 2.2, 2.2],
        facet: 1,
        abilities: [
          `tiny_tree_grab`, // 1
          "tiny_avalanche", // 2
          "tiny_toss", // 3
          "tiny_avalanche", // 4
          "tiny_avalanche", // 5
          `tiny_grow`, // 6
          "tiny_avalanche", // 7
          "tiny_toss", // 8
          `tiny_toss`, // 9
          `tiny_toss`, // 10
          `special_bonus_unique_tiny_4`, // 11
          "tiny_grow", // 12
          "tiny_tree_grab", // 13
          "tiny_tree_grab", // 14
          `special_bonus_unique_tiny`, // 15
          "tiny_tree_grab", // 16
          "special_bonus_attributes", // 17
          "tiny_grow", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_tiny_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tiny_2", // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `wind_lace`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [`arcane_boots`, `blink`, `force_staff`, `cyclone`],
          late_game: [
            `wind_waker`,
            `octarine_core`,
            `ethereal_blade`,
            `assault`,
          ],
          situational: [
            `tranquil_boots`,
            `soul_ring`,
            `spirit_vessel`,
            `glimmer_cape`,
            `ghost`,
            `invis_sword`,
            `lotus_orb`,
            `angels_demise`,
            `solar_crest`,
            `boots_of_bearing`,
            `heavens_halberd`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `black_king_bar`,
            `aeon_disk`,
            `sheepstick`,
            `arcane_blink`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            "blink",
            "force_staff",
            `wind_waker`,
            `octarine_core`,
            `assault`,
          ],
          neutral: [
            `arcane_ring`,
            `faded_broach`,
            "philosophers_stone",
            `bullwhip`,
            `ceremonial_robe`,
            "ogre_seal_totem",
            `timeless_relic`,
            `ninja_gear`,
            `giants_ring`,
            `demonicon`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2729200744, es: 3160085943 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40555,
        power_level: [1.7, 2.2, 2.6, 2.5],
        facet: 2,
        abilities: [
          "tiny_tree_grab", // 1
          "tiny_avalanche", // 2
          "tiny_avalanche", // 3
          "tiny_toss", // 4
          "tiny_avalanche", // 5
          "tiny_grow", // 6
          "tiny_avalanche", // 7
          "tiny_toss", // 8
          "tiny_toss", // 9
          "tiny_toss", // 10
          `special_bonus_strength_8`, // 11
          "tiny_grow", // 12
          "tiny_tree_grab", // 13
          "tiny_tree_grab", // 14
          "special_bonus_unique_tiny", // 15
          "tiny_tree_grab", // 16
          "special_bonus_attributes", // 17
          "tiny_grow", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_tiny_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tiny_2", // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `faerie_fire`,
            `branches`,
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: [
            `bottle`,
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `blink`,
            `echo_sabre`,
            `phylactery`,
            `lesser_crit`,
            `angels_demise`,
            `aghanims_shard`,
          ],
          late_game: [
            `black_king_bar`,
            `harpoon`,
            `ultimate_scepter`,
            `assault`,
          ],
          situational: [
            `hand_of_midas`,
            `silver_edge`,
            `sange_and_yasha`,
            `manta`,
            `force_staff`,
            `sphere`,
            `aeon_disk`,
            `octarine_core`,
            `moon_shard`,
            `bloodthorn`,
            `greater_crit`,
            `swift_blink`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `power_treads`,
            `blink`,
            `echo_sabre`,
            `angels_demise`,
            `aghanims_shard`,
            `black_king_bar`,
            `harpoon`,
            `ultimate_scepter`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            `ceremonial_robe`,
            `nemesis_curse`,
            `timeless_relic`,
            `ninja_gear`,
            `pirate_hat`,
            `desolator_2`,
          ],
        },
        // item_tooltips:
        /* orchid:
            "An situational item that gives you good stats as well as mana sustain. Can be taken against elusive heroes to prevent them to run away. Adds up a lot of damage with the Soul Burn. ", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2729201017, es: 3160086074 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40556,
        power_level: [1.7, 1.9, 2.7, 2.6],
        facet: 2,
        abilities: [
          "tiny_tree_grab", // 1
          "tiny_avalanche", // 2
          "tiny_tree_grab", // 3
          "tiny_toss", // 4
          "tiny_tree_grab", // 5
          "tiny_grow", // 6
          "tiny_tree_grab", // 7
          "tiny_avalanche", // 8
          "tiny_avalanche", // 9
          `special_bonus_strength_8`, // 10
          "tiny_avalanche", // 11
          "tiny_grow", // 12
          "tiny_toss", // 13
          "tiny_toss", // 14
          "special_bonus_unique_tiny_6", // 15
          "tiny_toss", // 16
          "special_bonus_attributes", // 17
          "tiny_grow", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_tiny_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tiny_2", // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            `power_treads`,
            `wraith_band`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `echo_sabre`,
            `invis_sword`,
            `aghanims_shard`,
            `black_king_bar`,
            `greater_crit`,
          ],
          late_game: [`harpoon`, `satanic`, `assault`, `swift_blink`],
          situational: [
            `hand_of_midas`,
            `silver_edge`,
            `blink`,
            `ultimate_scepter`,
            `sange_and_yasha`,
            `manta`,
            `moon_shard`,
            `skadi`,
            `sphere`,
            `monkey_king_bar`,
            `nullifier`,
            `bloodthorn`,
            `butterfly`,
            `travel_boots`,
          ],
          core: [
            `power_treads`,
            `echo_sabre`,
            `invis_sword`,
            `aghanims_shard`,
            `black_king_bar`,
            `greater_crit`,
            `harpoon`,
            `satanic`,
          ],
          neutral: [
            `broom_handle`,
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            `nemesis_curse`,
            `vindicators_axe`,
            `ninja_gear`,
            `mind_breaker`,
            `pirate_hat`,
            `desolator_2`,
          ],
        },
      },
    ],
    combo: [`blink`, `tiny_avalanche`, `tiny_toss`, `attack`],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "infused_raindrop", "armor", "cloak"],
        support: ["ward_sentry"],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: [/*"medallion_of_courage",*/ "solar_crest"],
        support: ["glimmer_cape"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "hurricane_pike",
          "black_king_bar",
        ],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "aeon_disk"],
        support: ["black_king_bar"],
        core: ["assault", "shivas_guard", "butterfly", "bloodthorn"],
      },
    },
  },

  // YoonA plays hero
  // Treant Protector
  treant: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699934294, es: 3160086154 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40580,
        power_level: [2, 2, 2.1, 2],
		facet: 2,
        abilities: [
          `treant_leech_seed`, // 1
          `treant_natures_grasp`, // 2
          `treant_leech_seed`, // 3
          `treant_living_armor`, // 4
          `treant_leech_seed`, // 5
          "treant_overgrowth", // 6
          `treant_natures_grasp`, // 7
          `treant_natures_grasp`, // 8
          `treant_natures_grasp`, // 9
          `treant_living_armor`, // 10
          `treant_living_armor`, // 11
          "treant_overgrowth", // 12
          `treant_living_armor`, // 13
          `special_bonus_unique_treant_12`, // 14
          `special_bonus_unique_treant_9`, // 15
          `treant_leech_seed`, // 16
          "special_bonus_attributes", // 17
          "treant_overgrowth", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_treant_13", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_treant_14`, // 25
        ],
        items: {
          starting: [
            "tango",
            `blood_grenade`,
            `enchanted_mango`,
            `wind_lace`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `aghanims_shard`,
            `pavise`,
            `solar_crest`,
            `blink`,
            `force_staff`,
          ],
          late_game: [
            `ultimate_scepter`,
            `refresher`,
            `octarine_core`,
            `overwhelming_blink`,
          ],
          situational: [
            `orb_of_venom`,
			`tranquil_boots`,
            `soul_ring`,
			`mekansm`,
            `holy_locket`,
            `guardian_greaves`,
            `meteor_hammer`,
            `boots_of_bearing`,
            `cyclone`,
            `ghost`,
            `pipe`,
            `lotus_orb`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `aghanims_shard`,
            `solar_crest`,
            `blink`,
            `ultimate_scepter`,
            `refresher`,
            `octarine_core`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            "philosophers_stone",
            "bullwhip",
            `ogre_seal_totem`,
            "ceremonial_robe",
            `timeless_relic`,
            `ascetic_cap`,
            `book_of_shadows`,
            `force_boots`,
          ],
        },
      },
    ],
    // item_tooltips:
    // wraith_pact: `An aura item that makes it hard for the enemy team to fight into your team.`,
    combo: [
      `blink`,
      `treant_overgrowth`,
      `meteor_hammer`,
      `treant_natures_grasp`,
      `treant_leech_seed`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "quelling_blade",
          "blight_stone",
          "ring_of_regen",
          "wind_lace",
          "boots",
        ],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb", "cyclone"],
        support: ["SentryDustGem", "glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "manta",
        ],
      },
      late_game: {
        all: [],
        support: ["SentryDustGem", "black_king_bar"],
        core: ["satanic"],
      },
    },
  },

  // eidendota plays hero
  troll_warlord: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699964271, es: 3160086778 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40634,
        power_level: [1.6, 1.7, 2.7, 2.6],
        abilities: [
          "troll_warlord_whirling_axes_ranged", // 1
          "troll_warlord_berserkers_rage", // 2
          "troll_warlord_fervor", // 3
          "troll_warlord_whirling_axes_ranged", // 4
          "troll_warlord_whirling_axes_ranged", // 5
          "troll_warlord_battle_trance", // 6
          "troll_warlord_whirling_axes_ranged", // 7
          "troll_warlord_fervor", // 8
          `troll_warlord_berserkers_rage`, // 9
          "troll_warlord_fervor", // 10
          "special_bonus_unique_troll_warlord_2", // 11
          "troll_warlord_battle_trance", // 12
          "troll_warlord_berserkers_rage", // 13
          "troll_warlord_berserkers_rage", // 14
          "special_bonus_unique_troll_warlord_5", // 15 Note Michel: Can't skill level 15 before level 10 in Dota 2 guides
          `troll_warlord_fervor`, // 16
          "special_bonus_attributes", // 17
          "troll_warlord_battle_trance", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_troll_warlord", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_troll_warlord_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "slippers",
            "circlet",
          ],
          early_game: ["wraith_band", "phase_boots", "magic_wand", "bfury"],
          mid_game: ["yasha", "black_king_bar", "sange_and_yasha", "blink"],
          late_game: [
            "abyssal_blade",
            "ultimate_scepter",
            "satanic",
            "butterfly",
            "swift_blink",
          ],
          situational: [
            `power_treads`,
            `diffusal_blade`,
            `maelstrom`,
            `monkey_king_bar`,
            `mjollnir`,
            `disperser`,
            "sphere",
            "silver_edge",
            "greater_crit",
            "aghanims_shard",
            "manta",
            "skadi",
            "refresher",
          ],
          core: [
            "phase_boots",
            "bfury",
            "sange_and_yasha",
            "black_king_bar",
            "blink",
            "abyssal_blade",
            "ultimate_scepter",
          ],
          neutral: [
            "broom_handle",
            "occult_bracelet",
            //"ring_of_aquila",
            "orb_of_destruction",
            "elven_tunic",
            //"titan_sliver",
            "paladin_sword",
            "ninja_gear",
            //"penta_edged_sword",
            "apex",
            "mirror_shield",
            "pirate_hat",
          ],
        },
      },
    ],
    combo: [
      "troll_warlord_berserkers_rage",
      "black_king_bar",
      "blink",
      "troll_warlord_battle_trance",
      "troll_warlord_whirling_axes_ranged",
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "wind_lace", "boots", "armor"],
        support: [],
        core: ["vanguard"],
      },
      mid_game: {
        all: ["cyclone", /*"medallion_of_courage",*/ "solar_crest"],
        support: ["force_staff", "ghost"],
        core: ["heavens_halberd", "hurricane_pike", "witch_blade"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "wind_waker"],
        support: [],
        core: ["assault", "abyssal_blade", "butterfly", "monkey_king_bar"],
      },
    },
  },

  tusk: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699964354, es: 3160086904 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40681,
        power_level: [1.8, 1.8, 2, 2.1],
        abilities: [
          `tusk_bitter_chill`, // 1
          `tusk_ice_shards`, // 2
          "tusk_snowball", // 3
          "tusk_bitter_chill", // 4
          "tusk_bitter_chill", // 5
          "tusk_walrus_punch", // 6
          "tusk_bitter_chill", // 7
          "tusk_snowball", // 8
          "tusk_snowball", // 9
          `tusk_snowball`, // 10
          `tusk_ice_shards`, // 11
          "tusk_walrus_punch", // 12
          "tusk_ice_shards", // 13
          "tusk_ice_shards", // 14
          `special_bonus_unique_tusk_7`, // 15
          "special_bonus_unique_tusk_2", // 16
          "special_bonus_attributes", // 17
          "tusk_walrus_punch", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_tusk_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tusk_6", // 25
        ],
        items: {
          starting: [
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `wind_lace`,
            `faerie_fire`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `tranquil_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `blink`,
            `aghanims_shard`,
            `vladmir`,
            `cyclone`,
            `force_staff`,
          ],
          late_game: [
            `ultimate_scepter`,
            `boots_of_bearing`,
            `octarine_core`,
            `assault`,
          ],
          situational: [
            `orb_of_venom`,
            `spirit_vessel`,
            `hand_of_midas`,
            `guardian_greaves`,
            `pavise`,
            `solar_crest`,
            `aether_lens`,
            `glimmer_cape`,
            `ghost`,
            `lotus_orb`,
            `black_king_bar`,
            `heavens_halberd`,
            `aeon_disk`,
            `wind_waker`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `blink`,
            `aghanims_shard`,
            `vladmir`,
            `cyclone`,
            `force_staff`,
            `ultimate_scepter`,
            `octarine_core`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            "bullwhip",
            `philosophers_stone`,
            `ceremonial_robe`,
            `ogre_seal_totem`,
            `ascetic_cap`,
            "trickster_cloak",
            `giants_ring`,
            `force_boots`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE], // NEW GUIDE
        steam_guide_workshop_ids: { en: 2776954201, es: 3160087008 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40682,
        power_level: [1.8, 1.9, 2.1, 2.1],
        abilities: [
          `tusk_ice_shards`, // 1
          `tusk_bitter_chill`, // 2
          `tusk_bitter_chill`, // 3
          `tusk_snowball`, // 4
          `tusk_bitter_chill`, // 5
          "tusk_walrus_punch", // 6
          `tusk_bitter_chill`, // 7
          "tusk_snowball", // 8
          "tusk_snowball", // 9
          `tusk_snowball`, // 10
          `tusk_ice_shards`, // 11
          "tusk_walrus_punch", // 12
          `tusk_ice_shards`, // 13
          `tusk_ice_shards`, // 14
          `special_bonus_unique_tusk_7`, // 15
          `special_bonus_unique_tusk_2`, // 16
          "special_bonus_attributes", // 17
          "tusk_walrus_punch", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_tusk", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tusk_4", // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            "gauntlets",
            `circlet`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `phase_boots`,
            `blight_stone`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `blink`,
            `desolator`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          late_game: [
            `black_king_bar`,
            `echo_sabre`,
            `harpoon`,
            `assault`,
            `octarine_core`,
          ],
          situational: [
            `orb_of_corrosion`,
            `veil_of_discord`,
            `falcon_blade`,
            `soul_ring`,
            `vanguard`,
            `hand_of_midas`,
            `crimson_guard`,
            `pipe`,
            `blade_mail`,
            `force_staff`,
            `silver_edge`,
            `heavens_halberd`,
            `lotus_orb`,
            `shivas_guard`,
            `sphere`,
            `aeon_disk`,
            `moon_shard`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `blink`,
            `desolator`,
            `ultimate_scepter`,
            `black_king_bar`,
            `harpoon`,
            `assault`,
          ],
          neutral: [
            `broom_handle`,
            `arcane_ring`,
            `orb_of_destruction`,
            `dragon_scale`,
            `cloak_of_flames`,
            `enchanted_quiver`,
            `mind_breaker`,
            `havoc_hammer`,
            `giants_ring`,
            `desolator_2`,
          ],
        },
      },
    ],
    combo: [],
    // To be reveiwed as 'tusk_tag_team' does no longer exist
    /*combo: [
      `tusk_tag_team`,
      `blink`,
      `tusk_walrus_punch`,
      `tusk_ice_shards`,
      `tusk_snowball`,
    ],*/
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: ["ward_observer"],
        core: [],
      },
      mid_game: {
        all: [/*"medallion_of_courage",*/ "solar_crest"],
        support: ["force_staff", "glimmer_cape", "ghost"],
        core: ["blink", "hurricane_pike"],
      },
      late_game: { all: [], support: [], core: ["assault"] },
    },
  },

  abyssal_underlord: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699964445, es: 3160087085 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40663,
        power_level: [1.9, 2.3, 2.3, 2.1],
        abilities: [
          `abyssal_underlord_firestorm`, // 1
          `abyssal_underlord_atrophy_aura`, // 2
          `abyssal_underlord_firestorm`, // 3
          `abyssal_underlord_pit_of_malice`, // 4
          "abyssal_underlord_firestorm", // 5
          "abyssal_underlord_dark_portal", // 6
          "abyssal_underlord_firestorm", // 7
          "abyssal_underlord_pit_of_malice", // 8
          "abyssal_underlord_pit_of_malice", // 9
          "abyssal_underlord_pit_of_malice", // 10
          "abyssal_underlord_atrophy_aura", // 11
          `abyssal_underlord_atrophy_aura`, // 12
          `abyssal_underlord_atrophy_aura`, // 13
          `special_bonus_unique_underlord_8`, // 14
          "special_bonus_unique_underlord_5", // 15
          `abyssal_underlord_dark_portal`, // 16
          "special_bonus_attributes", // 17
          "abyssal_underlord_dark_portal", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_underlord_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_underlord`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            "gauntlets",
            "gauntlets",
            "branches",
            `branches`,
          ],
          early_game: [
            "helm_of_iron_will",
            `soul_ring`,
            `arcane_boots`,
            `magic_wand`,
            `veil_of_discord`,
          ],
          mid_game: [`shivas_guard`, `aghanims_shard`, `guardian_greaves`],
          late_game: [`ultimate_scepter`, `black_king_bar`, `octarine_core`],
          situational: [
            "pipe",
            "rod_of_atos",
            `lotus_orb`,
            `sphere`,
            `blade_mail`,
            "radiance",
            `heavens_halberd`,
            `sheepstick`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `shivas_guard`,
            `soul_ring`,
            `arcane_boots`,
            `guardian_greaves`,
            `aghanims_shard`,
          ],
          neutral: [
            `occult_bracelet`,
            `arcane_ring`,
            `vambrace`,
            `dragon_scale`,
            "cloak_of_flames",
            "ogre_seal_totem",
            "craggy_coat",
            `havoc_hammer`,
            `trickster_cloak`,
            `giants_ring`,
            "force_boots",
          ],
        },
      },
    ],
    // ability_tooltips:
    /* abyssal_underlord_firestorm:
        "You can skill this spell on level 1 instead of the suggested Atrophy Aura if you have a tough match-up. Its very important that you use this before using Pit of Malice to get an extra wave hit.", */
    // item_tooltips:
    /* phase_boots:
        "A core item that fixes movement speed and armor issues of the hero.", */
    combo: [
      `abyssal_underlord_firestorm`,
      `abyssal_underlord_pit_of_malice`,
      `attack`,
      `rod_of_atos`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "headdress",
          "wind_lace",
          "boots",
          "urn_of_shadows",
        ],
        support: [],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: [
          /*"medallion_of_courage",*/
          "spirit_vessel",
          "solar_crest",
        ],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
        ],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["skadi", "bloodthorn"],
      },
    },
  },

  // YoonA plays hero
  undying: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699964521, es: 3160087158 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40664,
        power_level: [2.4, 2.1, 1.6, 1.5],
        abilities: [
          "undying_decay", // 1
          `undying_tombstone`, // 2
          `undying_decay`, // 3
          `undying_tombstone`, // 4
          `undying_decay`, // 5
          "undying_flesh_golem", // 6
          `undying_decay`, // 7
          `undying_tombstone`, // 8
          `undying_tombstone`, // 9
          `special_bonus_unique_undying_8`, // 10
          `undying_soul_rip`, // 11
          "undying_flesh_golem", // 12
          `undying_soul_rip`, // 13
          `undying_soul_rip`, // 14
          `undying_soul_rip`, // 15
          `special_bonus_unique_undying_6`, // 16
          "special_bonus_attributes", // 17
          "undying_flesh_golem", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_undying_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_undying_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `clarity`,
            `enchanted_mango`,
            `enchanted_mango`,
            `branches`,
            `branches`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `pavise`,
            `solar_crest`,
            `guardian_greaves`,
            `aghanims_shard`,
            `glimmer_cape`,
          ],
          late_game: [
            `force_staff`,
            `vladmir`,
            `boots_of_bearing`,
            `ultimate_scepter`,
          ],
          situational: [
            `veil_of_discord`,
            `spirit_vessel`,
            `pipe`,
            `lotus_orb`,
            `ghost`,
            `cyclone`,
            `holy_locket`,
            `blade_mail`,
            `crimson_guard`,
            `aeon_disk`,
            `octarine_core`,
            `refresher`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `solar_crest`,
            `guardian_greaves`,
            `aghanims_shard`,
            `glimmer_cape`,
            `force_staff`,
            `vladmir`,
            `boots_of_bearing`,
          ],
          neutral: [
            "trusty_shovel",
            `arcane_ring`,
            `philosophers_stone`,
            "bullwhip",
            `ogre_seal_totem`,
            `craggy_coat`,
            `trickster_cloak`,
            `ascetic_cap`,
            "force_field",
            `giants_ring`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2971195922, es: 3160087233 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40611,
        power_level: [2.4, 2.4, 1.9, 1.7],
        abilities: [
          "undying_decay", // 1
          `undying_tombstone`, // 2
          `undying_decay`, // 3
          `undying_tombstone`, // 4
          `undying_decay`, // 5
          "undying_flesh_golem", // 6
          `undying_decay`, // 7
          `undying_tombstone`, // 8
          `undying_tombstone`, // 9
          `special_bonus_unique_undying_8`, // 10
          `undying_soul_rip`, // 11
          "undying_flesh_golem", // 12
          `undying_soul_rip`, // 13
          `undying_soul_rip`, // 14
          `special_bonus_unique_undying`, // 15
          `undying_soul_rip`, // 16
          "special_bonus_attributes", // 17
          "undying_flesh_golem", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_undying_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_undying_4`, // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `gauntlets`,
            `gauntlets`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `veil_of_discord`,
            `boots`,
            `soul_ring`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
          ],
          mid_game: [
            `arcane_boots`,
            `shivas_guard`,
            `guardian_greaves`,
            `ultimate_scepter`,
          ],
          late_game: [
            `octarine_core`,
            `black_king_bar`,
            `assault`,
            `overwhelming_blink`,
          ],
          situational: [
            `bracer`,
            `phase_boots`,
            `vanguard`,
            `hand_of_midas`,
            `boots_of_bearing`,
            `pipe`,
            `eternal_shroud`,
            `vladmir`,
            `aghanims_shard`,
            `heavens_halberd`,
            `force_staff`,
            `lotus_orb`,
            `blade_mail`,
            `echo_sabre`,
            `harpoon`,
            `aeon_disk`,
            `heart`,
            `travel_boots`,
          ],
          core: [
            `veil_of_discord`,
            `soul_ring`,
            `arcane_boots`,
            `shivas_guard`,
            `guardian_greaves`,
            `ultimate_scepter`,
            `octarine_core`,
            `black_king_bar`,
          ],
          neutral: [
            `occult_bracelet`,
            `arcane_ring`,
            `vambrace`,
            `dragon_scale`,
            `ogre_seal_totem`,
            `cloak_of_flames`,
            `havoc_hammer`,
            `trickster_cloak`,
            `force_field`,
            `giants_ring`,
          ],
        },
      },
    ],
    // item_tooltips:
    // orb_of_venom: "If you can pressure on the lane.",
    // tranquil_boots: `You can upgrade Brown Boots to Tranquils once you have the Holy Locket.`,
    // wraith_pact: `An aura item that makes it hard for the enemy team to fight into your team.`,
    combo: [
      `undying_tombstone`,
      `undying_flesh_golem`,
      `undying_decay`,
      `undying_soul_rip`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "wind_lace",
          "boots",
          "urn_of_shadows",
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape", "force_staff"],
        core: ["AttackSpeed"],
      },
      late_game: {
        all: [],
        support: [],
        core: ["AttackSpeed"],
      },
    },
  },

  // eidendota plays hero
  ursa: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699964646, es: 3160087322 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40635,
        power_level: [1.9, 2.3, 2.6, 2.3],
        abilities: [
          "ursa_earthshock", // 1
          "ursa_fury_swipes", // 2
          "ursa_fury_swipes", // 3
          "ursa_overpower", // 4
          "ursa_fury_swipes", // 5
          "ursa_enrage", // 6
          "ursa_fury_swipes", // 7
          "ursa_overpower", // 8
          "ursa_overpower", // 9
          "ursa_overpower", // 10
          "special_bonus_unique_ursa_4", // 11
          "ursa_enrage", // 12
          "ursa_earthshock", // 13
          "ursa_earthshock", // 14
          "special_bonus_unique_ursa_earthshock_furyswipes", // 15
          "ursa_earthshock", // 16
          "special_bonus_attributes", // 17
          "ursa_enrage", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_ursa", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_ursa_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "circlet",
            "slippers",
          ],
          early_game: ["wraith_band", "magic_wand", "boots", "bfury"],
          mid_game: [
            "phase_boots",
            "lifesteal",
            "smoke_of_deceit",
            "black_king_bar",
            "blink",
            "aghanims_shard",
            "basher",
          ],
          late_game: [
            "abyssal_blade",
            "ultimate_scepter",
            "satanic",
            "swift_blink",
          ],
          situational: [
            "orb_of_venom",
            "orb_of_corrosion",
            "diffusal_blade",
            "monkey_king_bar",
            "nullifier",
            "sange_and_yasha",
            "sphere",
          ],
          core: [
            "phase_boots",
            "bfury",
            "lifesteal",
            "black_king_bar",
            "blink",
            "aghanims_shard",
            "basher",
            "abyssal_blade",
            "ultimate_scepter",
          ],
          neutral: [
            "broom_handle",
            "lance_of_pursuit",
            //"ring_of_aquila",
            "vambrace",
            "elven_tunic",
            //"titan_sliver",
            //"penta_edged_sword",
            "mind_breaker",
            "desolator_2",
            "force_boots",
            "mirror_shield",
          ],
        },
      },
    ],
    combo: [
      `ursa_overpower`,
      `blink`,
      `ursa_earthshock`,
      `attack`,
      `ursa_overpower`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["cyclone"],
        support: ["force_staff", "glimmer_cape", "ghost"],
        core: ["hurricane_pike", "heavens_halberd"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "aeon_disk", "wind_waker"],
        support: [],
        core: ["abyssal_blade", "assault", "butterfly"],
      },
    },
  },

  vengefulspirit: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699964761, es: 3160087397 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40557,
        power_level: [1.9, 2, 2.1, 2.1],
        facet: 1,
        abilities: [
          `vengefulspirit_wave_of_terror`, // 1
          `vengefulspirit_magic_missile`, // 2
          "vengefulspirit_magic_missile", // 3
          "vengefulspirit_wave_of_terror", // 4
          "vengefulspirit_magic_missile", // 5
          "vengefulspirit_nether_swap", // 6
          "vengefulspirit_magic_missile", // 7
          `vengefulspirit_wave_of_terror`, // 8
          "vengefulspirit_wave_of_terror", // 9
          `special_bonus_unique_vengeful_spirit_missile_castrange`, // 10
          `vengefulspirit_command_aura`, // 11
          "vengefulspirit_nether_swap", // 12
          "vengefulspirit_command_aura", // 13
          "vengefulspirit_command_aura", // 14
          `special_bonus_unique_vengeful_spirit_4`, // 15
          `vengefulspirit_command_aura`, // 16
          "special_bonus_attributes", // 17
          "vengefulspirit_nether_swap", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_vengeful_spirit_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_vengeful_spirit_9`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `tranquil_boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `pavise`,
            `solar_crest`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `boots_of_bearing`,
          ],
          late_game: [`hurricane_pike`, `angels_demise`, `skadi`, `butterfly`],
          situational: [
            `arcane_boots`,
            `aether_lens`,
            `spirit_vessel`,
            `ancient_janggo`,
            `cyclone`,
            `glimmer_cape`,
            `force_staff`,
            `blink`,
            `pipe`,
            `ghost`,
            `vladmir`,
            `guardian_greaves`,
            `heavens_halberd`,
            `lotus_orb`,
            `octarine_core`,
            `aeon_disk`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `ring_of_basilius`,
            `solar_crest`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `hurricane_pike`,
            `angels_demise`,
            `skadi`,
          ],
          neutral: [
            `trusty_shovel`,
            `unstable_wand`,
            "philosophers_stone",
            `pupils_gift`,
            `psychic_headband`,
            `ceremonial_robe`,
            `spy_gadget`,
            `ninja_gear`,
            `apex`,
            `desolator_2`,
          ],
        },
      },
    ],
    combo: [
      `vengefulspirit_wave_of_terror`,
      `vengefulspirit_nether_swap`,
      `vengefulspirit_magic_missile`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "ring_of_regen", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: [/*"medallion_of_courage",*/ "solar_crest"],
        support: ["glimmer_cape", "force_staff", "ghost"],
        core: ["heavens_halberd"],
      },
      late_game: {
        all: [],
        support: [],
        core: ["assault", "butterfly"],
      },
    },
  },

  // YoonA plays hero
  venomancer: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699964844, es: 3160087483 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40627,
        power_level: [1.7, 2.2, 2.2, 2],
        facet: 1,
        abilities: [
          `venomancer_venomous_gale`, // 1
          `venomancer_poison_sting`, // 2
          "venomancer_poison_sting", // 3
          `venomancer_plague_ward`, // 4
          "venomancer_plague_ward", // 5
          `venomancer_noxious_plague`, // 6
          "venomancer_plague_ward", // 7
          `venomancer_plague_ward`, // 8
          `venomancer_poison_sting`, // 9
          `venomancer_poison_sting`, // 10
          `special_bonus_unique_venomancer_poisonsting_regen_reduction`, // 11
          `venomancer_noxious_plague`, // 12
          `venomancer_venomous_gale`, // 13
          "venomancer_venomous_gale", // 14
          "special_bonus_unique_venomancer_2", // 15
          "venomancer_venomous_gale", // 16
          "special_bonus_attributes", // 17
          `venomancer_noxious_plague`, // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_venomancer_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_venomancer", // 25
        ],
        items: {
          starting: [
            "tango",
            `faerie_fire`,
            "circlet",
            `circlet`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `wraith_band`,
            `bracer`,
            `boots`,
            `magic_wand`,
            `urn_of_shadows`,
            `wind_lace`,
          ],
          mid_game: [
            `spirit_vessel`,
            `travel_boots`,
            `black_king_bar`,
            `hurricane_pike`,
            `aghanims_shard`,
          ],
          late_game: [`shivas_guard`, `blink`, `sheepstick`, `octarine_core`],
          situational: [
            `power_treads`,
            `veil_of_discord`,
            `vanguard`,
            `ring_of_basilius`,
            `arcane_boots`,
            `hand_of_midas`,
            `aether_lens`,
            `boots_of_bearing`,
            `lotus_orb`,
            `heavens_halberd`,
            `kaya_and_sange`,
            `rod_of_atos`,
            `eternal_shroud`,
            `pipe`,
            `crimson_guard`,
            `guardian_greaves`,
            `cyclone`,
            `aeon_disk`,
            `ethereal_blade`,
            `wind_waker`,
            `overwhelming_blink`,
            `mage_slayer`,
            `sange_and_yasha`,
            `manta`,
            `ultimate_scepter`,
            `sphere`,
            `gungir`,
            `skadi`,
            `butterfly`,
            `refresher`,
            `travel_boots_2`,
          ],
          core: [
            `bracer`,
            `boots`,
            `spirit_vessel`,
            `travel_boots`,
            `hurricane_pike`,
            `aghanims_shard`,
            `shivas_guard`,
            `sheepstick`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            "grove_bow",
            `pupils_gift`,
            "ceremonial_robe",
            `defiant_shell`,
            "timeless_relic",
            `ninja_gear`,
            `force_boots`,
            `apex`,
          ],
        },
        // ability_tooltips:
        /* venomancer_venomous_gale:
            "You can skill this spell on level 1 if you are fighting at the 0min rune. You can also put a second point into this spell at level 4 if you are able to play aggressively on the lane.", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2729605047, es: 3160087560 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40628,
        power_level: [1.9, 2, 2, 1.8],
        facet: 1,
        abilities: [
          `venomancer_venomous_gale`, // 1
          `venomancer_poison_sting`, // 2
          `venomancer_poison_sting`, // 3
          `venomancer_plague_ward`, // 4
          `venomancer_plague_ward`, // 5
          `venomancer_noxious_plague`, // 6
          `venomancer_plague_ward`, // 7
          `venomancer_plague_ward`, // 8
          `venomancer_poison_sting`, // 9
          `venomancer_poison_sting`, // 10
          `special_bonus_unique_venomancer_poisonsting_regen_reduction`, // 11
          `venomancer_noxious_plague`, // 12
          `venomancer_venomous_gale`, // 13
          "venomancer_venomous_gale", // 14
          "special_bonus_unique_venomancer_2", // 15
          "venomancer_venomous_gale", // 16
          "special_bonus_attributes", // 17
          `venomancer_noxious_plague`, // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_venomancer_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_venomancer", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `pavise`,
            `solar_crest`,
            `mekansm`,
            `guardian_greaves`,
            `aghanims_shard`,
          ],
          late_game: [`force_staff`, `blink`, `sheepstick`, `wind_waker`],
          situational: [
            `tranquil_boots`,
            `urn_of_shadows`,
            `spirit_vessel`,
            `glimmer_cape`,
            `veil_of_discord`,
            `lotus_orb`,
            `heavens_halberd`,
            `aether_lens`,
            `boots_of_bearing`,
            `pipe`,
            `ghost`,
            `cyclone`,
            `aeon_disk`,
            `octarine_core`,
            `ultimate_scepter`,
            `ethereal_blade`,
            `shivas_guard`,
            `refresher`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `solar_crest`,
            `guardian_greaves`,
            `aghanims_shard`,
            `force_staff`,
            `blink`,
            `sheepstick`,
          ],
          neutral: [
            `arcane_ring`,
            `trusty_shovel`,
            `philosophers_stone`,
            `bullwhip`,
            `ceremonial_robe`,
            `ogre_seal_totem`,
            `timeless_relic`,
            `spy_gadget`,
            `force_boots`,
            "seer_stone",
          ],
        },
        // ability_tooltips:
        /* venomancer_venomous_gale:
            "You can skill this spell on level 1 if you are fighting at the 0min rune.", */
      },
    ],
    combo: [
      `venomancer_venomous_gale`,
      `venomancer_noxious_plague`,
      `urn_of_shadows`,
      `venomancer_plague_ward`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "headdress",
          "wind_lace",
          "boots",
          "cloak",
        ],
        support: ["tranquil_boots"],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb", "cyclone"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "manta",
        ],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["satanic"],
      },
    },
  },

  viper: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699964923, es: 3160087638 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40558,
        power_level: [2.1, 2.5, 2.3, 2.3],
        facet: 1,
        abilities: [
          "viper_poison_attack", // 1
          "viper_corrosive_skin", // 2
          "viper_poison_attack", // 3
          `viper_nethertoxin`, // 4
          "viper_poison_attack", // 5
          "viper_viper_strike", // 6
          `viper_poison_attack`, // 7
          `viper_corrosive_skin`, // 8
          "viper_corrosive_skin", // 9
          `viper_corrosive_skin`, // 10
          `special_bonus_unique_viper_4`, // 11
          "viper_viper_strike", // 12
          `viper_nethertoxin`, // 13
          "viper_nethertoxin", // 14
          `special_bonus_unique_viper_6`, // 15
          "viper_nethertoxin", // 16
          "special_bonus_attributes", // 17
          "viper_viper_strike", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_viper_7`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_viper_5`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `circlet`,
            `circlet`,
            `enchanted_mango`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `wraith_band`,
            `wraith_band`,
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `mage_slayer`,
            `dragon_lance`,
            `hurricane_pike`,
            `manta`,
            `aghanims_shard`,
            `black_king_bar`,
          ],
          late_game: [`skadi`, `ultimate_scepter`, `assault`, `butterfly`],
          situational: [
            `ring_of_basilius`,
            `veil_of_discord`,
            "spirit_vessel",
            `eternal_shroud`,
            `pipe`,
            `crimson_guard`,
            `rod_of_atos`,
            `blink`,
            `bloodstone`,
            `kaya_and_sange`,
            `gungir`,
            `devastator`,
            `lotus_orb`,
            `sphere`,
            `aeon_disk`,
            `heavens_halberd`,
            `shivas_guard`,
            `bloodthorn`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            `mage_slayer`,
            `hurricane_pike`,
            `manta`,
            `aghanims_shard`,
            `black_king_bar`,
            `skadi`,
          ],
          neutral: [
            `mysterious_hat`,
            `arcane_ring`,
            "grove_bow",
            `vambrace`,
            "enchanted_quiver",
            `vindicators_axe`,
            `trickster_cloak`,
            `mind_breaker`,
            `pirate_hat`,
            `apex`,
          ],
        },
        // item_tooltips:
        /* urn_of_shadows:
            "A core item that allows you to snowball off of first kill. Provides you with useful stats, namely mana regeneration.", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2729605437, es: 3160087719 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40559,
        power_level: [2.3, 2.5, 2.3, 2.3],
        facet: 1,
        abilities: [
          "viper_poison_attack", // 1
          "viper_corrosive_skin", // 2
          "viper_poison_attack", // 3
          `viper_corrosive_skin`, // 4
          "viper_poison_attack", // 5
          "viper_viper_strike", // 6
          `viper_poison_attack`, // 7
          `viper_nethertoxin`, // 8
          "viper_corrosive_skin", // 9
          `special_bonus_unique_viper_4`, // 10
          `viper_corrosive_skin`, // 11
          "viper_viper_strike", // 12
          `viper_nethertoxin`, // 13
          "viper_nethertoxin", // 14
          `special_bonus_unique_viper_6`, // 15
          "viper_nethertoxin", // 16
          "special_bonus_attributes", // 17
          "viper_viper_strike", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_viper_7`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_viper_5`, // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            `circlet`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bottle`,
            `wraith_band`,
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `dragon_lance`,
            `hurricane_pike`,
            `manta`,
            `aghanims_shard`,
            `black_king_bar`,
          ],
          late_game: [`skadi`, `bloodthorn`, `ultimate_scepter`, `butterfly`],
          situational: [
            `ring_of_basilius`,
            `falcon_blade`,
            `hand_of_midas`,
            `veil_of_discord`,
            `orchid`,
            `blink`,
            `bloodstone`,
            `kaya_and_sange`,
            `pipe`,
            `eternal_shroud`,
            `silver_edge`,
            `monkey_king_bar`,
            `aeon_disk`,
            `sphere`,
            `lotus_orb`,
            `sheepstick`,
            `gungir`,
            `devastator`,
            `shivas_guard`,
            `assault`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `power_treads`,
            `hurricane_pike`,
            `manta`,
            `aghanims_shard`,
            `black_king_bar`,
            `skadi`,
            `bloodthorn`,
          ],
          neutral: [
            `mysterious_hat`,
            `arcane_ring`,
            `grove_bow`,
            `vambrace`,
            `enchanted_quiver`,
            `vindicators_axe`,
            `trickster_cloak`,
            `mind_breaker`,
            `pirate_hat`,
            `apex`,
          ],
        },
      },
    ],
    // item_tooltips:
    // dragon_lance: `A core item that improves attack range and tankiness.`,
    // ethereal_blade: `A situational item that provides you with a boost to your damage with urn and Viper Strike. Also has defensive capabilities.`,
    /*    skadi:
    "A core item that tanks you up but also makes you less kitable. Reduces healing of the affected hero by a significant amount.",*/
    combo: [
      `viper_viper_strike`,
      `viper_nose_dive`,
      `viper_nethertoxin`,
      `viper_poison_attack`,
    ],
    counter_items: {
      laning_phase: {
        all: ["ring_of_regen", "wind_lace", "boots", "cloak"],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["force_staff", "glimmer_cape"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "heavens_halberd",
        ],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["abyssal_blade", "butterfly"],
      },
    },
  },

  visage: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2699965007, es: 3160087777 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40572,
        power_level: [1.6, 2.4, 2.3, 2.1],
		facet: 1,
        abilities: [
          "visage_soul_assumption", // 1
          "visage_grave_chill", // 2
          `visage_grave_chill`, // 3
          `visage_gravekeepers_cloak`, // 4
          "visage_grave_chill", // 5
          "visage_summon_familiars", // 6
          "visage_grave_chill", // 7
          `visage_gravekeepers_cloak`, // 8
          `visage_gravekeepers_cloak`, // 9
          `special_bonus_unique_visage_8`, // 10
          `visage_gravekeepers_cloak`, // 11
          "visage_summon_familiars", // 12
          `visage_soul_assumption`, // 13
          `visage_soul_assumption`, // 14
          `special_bonus_unique_visage_grave_chill_duration`, // 15
          `visage_soul_assumption`, // 16
          "special_bonus_attributes", // 17
          "visage_summon_familiars", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_visage_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_visage_6", // 25
        ],
        items: {
          starting: [
            `tango`,
            `branches`,
            "branches",
            "circlet",
            `circlet`,
            `enchanted_mango`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `null_talisman`,
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
          ],
          mid_game: [
            `vladmir`,
            `rod_of_atos`,
			`maelstrom`,
			`gungir`,
			`assault`,
            `aghanims_shard`,
          ],
          late_game: [`ancient_janggo`, `boots_of_bearing`, `ultimate_scepter`, `sheepstick`, `bloodthorn`],
          situational: [
            `wraith_band`,
			`power_treads`,
			`tranquil_boots`,
            `blight_stone`,
            `veil_of_discord`,
            `spirit_vessel`,
            `phylactery`,
			`orchid`,
            `crimson_guard`,
            `guardian_greaves`,
            `pipe`,
            `blink`,
			`hurricane_pike`,
            `black_king_bar`,
            `aeon_disk`,
            `shivas_guard`,
			`nullifier`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `boots`,
            `vladmir`,
            `gungir`,
            `assault`,
            `aghanims_shard`,
			`boots_of_bearing`,
            `ultimate_scepter`,
          ],
          neutral: [
            `unstable_wand`,
            `spark_of_courage`,
            "grove_bow",
            `specialists_array`,
            `enchanted_quiver`,
            `nemesis_curse`,
            `mind_breaker`,
            `ancient_guardian`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2729605654, es: 3160087836 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40589,
        power_level: [1.4, 2.4, 2.4, 2.1],
		facet: 1,
        abilities: [
          "visage_grave_chill", // 1
          "visage_gravekeepers_cloak", // 2
          "visage_grave_chill", // 3
          `visage_gravekeepers_cloak`, // 4
          "visage_grave_chill", // 5
          "visage_summon_familiars", // 6
          "visage_grave_chill", // 7
          `visage_soul_assumption`, // 8
          `visage_gravekeepers_cloak`, // 9
          `special_bonus_unique_visage_8`, // 10
          `visage_gravekeepers_cloak`, // 11
          "visage_summon_familiars", // 12
          `visage_soul_assumption`, // 13
          `visage_soul_assumption`, // 14
          `special_bonus_unique_visage_grave_chill_duration`, // 15
          `visage_soul_assumption`, // 16
          "special_bonus_attributes", // 17
          "visage_summon_familiars", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_visage_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_visage_6", // 25
        ],
        items: {
          starting: [
            `tango`,
            `faerie_fire`,
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `null_talisman`,
            `boots`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `maelstrom`,
			`rod_of_atos`,
            `gungir`,
			`assault`,
            `aghanims_shard`,
			`travel_boots`,
          ],
          late_game: [`hurricane_pike`, `ultimate_scepter`, `sheepstick`, `bloodthorn`],
          situational: [
            `wraith_band`,
			`ring_of_basilius`,
			`power_treads`,
			`tranquil_boots`,
            `power_treads`,
            `blight_stone`,
            `veil_of_discord`,
			`vladmir`,
            `phylactery`,
            `crimson_guard`,
            `witch_blade`,
            `devastator`,
			`orchid`,
			`ancient_janggo`,
            `boots_of_bearing`,
            `pipe`,
            `blink`,
            `black_king_bar`,
            `aeon_disk`,
			`skadi`,
			`monkey_king_bar`,
			`nullifier`,
            `shivas_guard`,
            `travel_boots_2`,
          ],
          core: [
            `bracer`,
            `boots`,
            `gungir`,
			`assault`,
            `aghanims_shard`,
			`hurricane_pike`,
            `ultimate_scepter`,
			`sheepstick`,
          ],
          neutral: [
            `unstable_wand`,
            `spark_of_courage`,
            `grove_bow`,
            `specialists_array`,
            `enchanted_quiver`,
            `nemesis_curse`,
            `mind_breaker`,
            `ancient_guardian`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
    ],
    // item_tooltips:
    // boots: `A core item that can be upgraded to Tranquil Boots if you need sustain on the lane but usually you want to rush other core items.`,
    combo: [
      `visage_silent_as_the_grave`,
      `visage_grave_chill`,
      `attack`,
      `visage_soul_assumption`,
    ],
    counter_items: {
      laning_phase: {
        all: ["blight_stone", "armor", "urn_of_shadows"],
        support: [],
        core: ["vanguard"],
      },
      mid_game: {
        all: [
          "spirit_vessel",
          "lotus_orb",
          /*"medallion_of_courage",*/
          "solar_crest",
          `cloak`,
        ],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "crimson_guard",
          "black_king_bar",
          "javelin",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: ["assault", "bloodthorn", "satanic"],
      },
    },
  },

  void_spirit: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699965099, es: 3160087899 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40619,
        power_level: [1.7, 2.1, 2.6, 2.6],
        abilities: [
          "void_spirit_resonant_pulse", // 1
          "void_spirit_aether_remnant", // 2
          "void_spirit_resonant_pulse", // 3
          `void_spirit_aether_remnant`, // 4
          `void_spirit_resonant_pulse`, // 5
          "void_spirit_astral_step", // 6
          `void_spirit_resonant_pulse`, // 7
          "void_spirit_aether_remnant", // 8
          `void_spirit_aether_remnant`, // 9
          `special_bonus_unique_void_spirit_2`, // 10
          `void_spirit_dissimilate`, // 11
          "void_spirit_astral_step", // 12
          `void_spirit_dissimilate`, // 13
          `void_spirit_dissimilate`, // 14
          `special_bonus_unique_void_spirit_4`, // 15 Comment Michel: Talent level 1 has to come before talent level 2
          `void_spirit_dissimilate`, // 16
          "special_bonus_attributes", // 17
          "void_spirit_astral_step", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_void_spirit_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_void_spirit_8`, // 25
        ],
        items: {
          starting: [
            "tango",
            "circlet",
            `branches`,
            `branches`,
            "branches",
            "ward_observer",
          ],
          early_game: [
            `bottle`,
            `magic_wand`,
            `bracer`,
            `power_treads`,
            "mage_slayer",
          ],
          mid_game: ["manta", `ultimate_scepter`],
          late_game: ["skadi", "greater_crit", "satanic"],
          situational: [
            `aghanims_shard`,
            `sphere`,
            `black_king_bar`,
            `octarine_core`,
            `sheepstick`,
            `silver_edge`,
            "cyclone",
          ],
          core: [
            `power_treads`,
            "mage_slayer",
            `manta`,
            `ultimate_scepter`,
            `skadi`,
            `greater_crit`,
            "satanic",
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            `pupils_gift`,
            `orb_of_destruction`,
            `paladin_sword`,
            `enchanted_quiver`,
            //`penta_edged_sword`,
            `mind_breaker`,
            `apex`,
            `desolator_2`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2778135054, es: 3160087952 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40641,
        power_level: [1.4, 2, 2.5, 2.5],
        abilities: [
          "void_spirit_resonant_pulse", // 1
          "void_spirit_aether_remnant", // 2
          "void_spirit_resonant_pulse", // 3
          `void_spirit_dissimilate`, // 4
          `void_spirit_resonant_pulse`, // 5
          "void_spirit_astral_step", // 6
          `void_spirit_resonant_pulse`, // 7
          "void_spirit_aether_remnant", // 8
          `void_spirit_aether_remnant`, // 9
          `special_bonus_unique_void_spirit_2`, // 10
          `void_spirit_aether_remnant`, // 11
          "void_spirit_astral_step", // 12
          `void_spirit_dissimilate`, // 13
          `void_spirit_dissimilate`, // 14
          `special_bonus_unique_void_spirit_4`, // 15 Comment Michel: Talent level 1 has to come before talent level 2
          `void_spirit_dissimilate`, // 16
          "special_bonus_attributes", // 17
          "void_spirit_astral_step", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_void_spirit_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_void_spirit_8`, // 25
        ],
        items: {
          starting: [
            "tango",
            "circlet",
            "circlet",
            "gauntlets",
            "branches",
            "ward_observer",
          ],
          early_game: [
            `bracer`,
            `wraith_band`,
            `power_treads`,
            `magic_wand`,
            `urn_of_shadows`,
          ],
          mid_game: [`spirit_vessel`, `manta`, `ultimate_scepter`],
          late_game: ["skadi", "greater_crit", "satanic"],
          situational: [
            `aghanims_shard`,
            `sphere`,
            `black_king_bar`,
            `octarine_core`,
            `sheepstick`,
            `silver_edge`,
            "cyclone",
          ],
          core: [
            `bracer`,
            `wraith_band`,
            "power_treads",
            `spirit_vessel`,
            `manta`,
            `ultimate_scepter`,
            "skadi",
            `greater_crit`,
            "satanic",
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            `pupils_gift`,
            `orb_of_destruction`,
            `paladin_sword`,
            `enchanted_quiver`,
            //`penta_edged_sword`,
            `mind_breaker`,
            `apex`,
            `desolator_2`,
          ],
        },
      },
    ],
    // ability_tooltips:
    /* special_bonus_unique_void_spirit_2:
        "On level 15, take the suggested level 15 talent over this level 10 talent. Dota 2 client disallows me to indicate the order in graphics above. At level 16, take this level 10 talent.", */
    combo: [
      `void_spirit_astral_step`,
      `void_spirit_resonant_pulse`,
      "attack",
      `void_spirit_aether_remnant`,
      "attack",
      `void_spirit_astral_step`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "wind_lace", "boots", "infused_raindrop"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["rod_of_atos"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "orchid",
          "hurricane_pike",
          "black_king_bar",
          "manta",
        ],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk"],
        support: ["black_king_bar"],
        core: [
          "abyssal_blade",
          "assault",
          "invis_sword",
          "nullifier",
          "satanic",
        ],
      },
    },
  },

  warlock: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699965199, es: 3160088007 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40657,
        power_level: [1.7, 1.8, 2.1, 2.3],
        facet: 2,
        abilities: [
          `warlock_fatal_bonds`, // 1
          `warlock_upheaval`, // 2
          `warlock_fatal_bonds`, // 3
          `warlock_upheaval`, // 4
          `warlock_upheaval`, // 5
          "warlock_rain_of_chaos", // 6
          `warlock_upheaval`, // 7
          `warlock_fatal_bonds`, // 8
          `warlock_fatal_bonds`, // 9
          `special_bonus_unique_warlock_upheaval_aoe`, // 10
          `warlock_shadow_word`, // 11
          "warlock_rain_of_chaos", // 12
          `warlock_shadow_word`, // 13
          `warlock_shadow_word`, // 14
          `special_bonus_unique_warlock_10`, // 15
          `warlock_shadow_word`, // 16
          "special_bonus_attributes", // 17
          "warlock_rain_of_chaos", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_warlock_4`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_warlock_2", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `sobi_mask`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `ring_of_basilius`,
            `boots`,
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `pavise`,
            `solar_crest`,
            `aghanims_shard`,
            `glimmer_cape`,
            `ultimate_scepter`,
          ],
          late_game: [
            `refresher`,
            `octarine_core`,
            `aeon_disk`,
            `boots_of_bearing`,
          ],
          situational: [
            `tranquil_boots`,
            `hand_of_midas`,
            `holy_locket`,
            `ancient_janggo`,
            `guardian_greaves`,
            `vladmir`,
            `force_staff`,
            `aether_lens`,
            `ghost`,
            `blink`,
            `lotus_orb`,
            `cyclone`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `solar_crest`,
            `aghanims_shard`,
            `glimmer_cape`,
            `ultimate_scepter`,
            `refresher`,
            `octarine_core`,
          ],
          neutral: [
            "arcane_ring",
            `trusty_shovel`,
            "philosophers_stone",
            "bullwhip",
            `ogre_seal_totem`,
            `psychic_headband`,
            "spy_gadget",
            `timeless_relic`,
            `book_of_shadows`,
            "seer_stone",
          ],
        },
      },
    ],
    combo: [
      `warlock_fatal_bonds`,
      `warlock_rain_of_chaos`,
      `warlock_shadow_word`,
      `warlock_upheaval`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "ring_of_regen", "headdress"],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["lotus_orb", "cyclone"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "manta",
        ],
      },
      late_game: {
        all: [],
        support: ["black_king_bar"],
        core: ["satanic"],
      },
    },
  },

  // eidendota plays hero
  weaver: {
    under_review: true,
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699965288, es: 3160088086 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40669,
        power_level: [1.8, 1.9, 2.1, 2.1],
        abilities: [
          "weaver_shukuchi", // 1
          "weaver_geminate_attack", // 2
          `weaver_the_swarm`, // 3
          `weaver_shukuchi`, // 4
          "weaver_shukuchi", // 5
          "weaver_time_lapse", // 6
          "weaver_shukuchi", // 7
          "weaver_geminate_attack", // 8
          "weaver_geminate_attack", // 9
          `weaver_geminate_attack`, // 10
          `special_bonus_strength_8`, // 11
          "weaver_time_lapse", // 12
          "weaver_the_swarm", // 13
          "weaver_the_swarm", // 14
          "special_bonus_unique_weaver_4", // 15
          "weaver_the_swarm", // 16
          "special_bonus_attributes", // 17
          "weaver_time_lapse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_weaver_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_weaver_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "magic_stick",
            "blood_grenade",
            "branches",
            "faerie_fire",
            `ward_sentry`,
            "ward_sentry",
            "ward_observer",
          ],
          early_game: ["urn_of_shadows", "magic_wand"],
          mid_game: [
            "spirit_vessel",
            `rod_of_atos`,
            "aghanims_shard",
            "maelstrom",
          ],
          late_game: ["gungir", `black_king_bar`, `bloodthorn`, "sheepstick"],
          situational: [
            `orchid`,
            `heavens_halberd`,
            "lotus_orb",
            `travel_boots`,
            "sphere",
          ],
          core: ["spirit_vessel", `rod_of_atos`, "aghanims_shard", "maelstrom"],
          neutral: [
            "lance_of_pursuit",
            "trusty_shovel",
            `grove_bow`,
            "specialists_array",
            "enchanted_quiver",
            "ogre_seal_totem",
            "ascetic_cap",
            `stormcrafter`,
            "desolator_2",
            `mirror_shield`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2730987049, es: 3160088165 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40670,
        power_level: [2, 2.4, 2.6, 2.4],
        abilities: [
          "weaver_shukuchi", // 1
          "weaver_geminate_attack", // 2
          "weaver_the_swarm", // 3
          "weaver_shukuchi", // 4
          "weaver_shukuchi", // 5
          "weaver_time_lapse", // 6
          "weaver_shukuchi", // 7
          "weaver_geminate_attack", // 8
          "weaver_geminate_attack", // 9
          "weaver_geminate_attack", // 10
          `special_bonus_strength_8`, // 11
          "weaver_time_lapse", // 12
          "weaver_the_swarm", // 13
          "weaver_the_swarm", // 14
          "special_bonus_mana_break_20", // 15
          "weaver_the_swarm", // 16
          "special_bonus_attributes", // 17
          "weaver_time_lapse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_weaver_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_weaver_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            `branches`,
            "branches",
            "magic_stick",
            `circlet`,
          ],
          early_game: [
            `power_treads`,
            `magic_wand`,
            `wraith_band`,
            "falcon_blade",
          ],
          mid_game: [
            "dragon_lance",
            `desolator`,
            "aghanims_shard",
            `diffusal_blade`,
          ],
          late_game: [
            "disperser",
            "black_king_bar",
            "greater_crit",
            "hurricane_pike",
            "satanic",
            "butterfly",
            "travel_boots",
          ],
          situational: [
            `monkey_king_bar`,
            `gungir`,
            "sphere",
            `manta`,
            "nullifier",
            `skadi`,
          ],
          core: [
            `dragon_lance`,
            "desolator",
            "black_king_bar",
            `aghanims_shard`,
          ],
          neutral: [
            `lance_of_pursuit`,
            "occult_bracelet",
            "specialists_array",
            "grove_bow",
            "elven_tunic",
            "vindicators_axe",
            "mind_breaker",
            "ancient_guardian",
            "mirror_shield",
            "desolator_2",
            "pirate_hat",
          ],
        },
      },
    ],
    combo: [
      `weaver_shukuchi`,
      `weaver_the_swarm`,
      `weaver_geminate_attack`,
      `weaver_shukuchi`,
      `attack`,
      `weaver_time_lapse`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "blight_stone", "ring_of_regen", "armor"],
        support: ["ward_sentry", "dust"],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: [/*"medallion_of_courage",*/ "solar_crest"],
        support: ["SentryDustGem", "glimmer_cape", "ghost"],
        core: ["orchid", "heavens_halberd"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "aeon_disk"],
        support: ["SentryDustGem"],
        core: ["abyssal_blade", "assault", "butterfly", "silver_edge"],
      },
    },
  },

  // Wind ranger
  windrunner: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699965445, es: 3160088239 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40677,
        power_level: [1.7, 1.7, 1.9, 2],
        abilities: [
          `windrunner_powershot`, // 1
          `windrunner_windrun`, // 2
          "windrunner_powershot", // 3
          `windrunner_shackleshot`, // 4
          "windrunner_powershot", // 5
          `windrunner_focusfire`, // 6
          "windrunner_powershot", // 7
          `windrunner_shackleshot`, // 8
          `windrunner_shackleshot`, // 9
          `windrunner_shackleshot`, // 10
          "special_bonus_unique_windranger_9", // 11
          `windrunner_focusfire`, // 12
          `windrunner_windrun`, // 13
          `windrunner_windrun`, // 14
          `special_bonus_unique_windranger_4`, // 15
          `windrunner_windrun`, // 16
          "special_bonus_attributes", // 17
          "windrunner_focusfire", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_windranger_8`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_windranger_2`, // 25
        ],
        items: {
          starting: [
            `tango`,
            "blood_grenade",
            `circlet`,
            `circlet`,
            "branches",
            "branches",
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `bracer`,
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `mage_slayer`,
            `aghanims_shard`,
            `blink`,
            `force_staff`,
          ],
          late_game: [
            `maelstrom`,
            `gungir`,
            `orchid`,
            `bloodthorn`,
            `ultimate_scepter`,
            `greater_crit`,
          ],
          situational: [
            `power_treads`,
            `spirit_vessel`,
            `aether_lens`,
            "lotus_orb",
            `pavise`,
            `solar_crest`,
            `glimmer_cape`,
            `cyclone`,
            `rod_of_atos`,
            `guardian_greaves`,
            `hurricane_pike`,
            `meteor_hammer`,
            `octarine_core`,
            `aeon_disk`,
            `monkey_king_bar`,
            `travel_boots`,
          ],

          core: [
            `arcane_boots`,
            `mage_slayer`,
            `aghanims_shard`,
            `blink`,
            `force_staff`,
            `gungir`,
            `bloodthorn`,
            `ultimate_scepter`,
          ],
          neutral: [
            "arcane_ring",
            `unstable_wand`,
            `pupils_gift`,
            "grove_bow",
            `ceremonial_robe`,
            `enchanted_quiver`,
            `spy_gadget`,
            "spy_gadget",
            `desolator_2`,
            `apex`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2730986384, es: 3160091456 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40678,
        power_level: [2, 2.1, 2.5, 2.4],
        abilities: [
          "windrunner_powershot", // 1
          "windrunner_windrun", // 2
          "windrunner_powershot", // 3
          `windrunner_windrun`, // 4
          "windrunner_powershot", // 5
          "windrunner_focusfire", // 6
          `windrunner_windrun`, // 7
          "windrunner_windrun", // 8
          `windrunner_shackleshot`, // 9
          `windrunner_powershot`, // 10
          "windrunner_shackleshot", // 11
          "windrunner_focusfire", // 12
          `windrunner_shackleshot`, // 13
          `windrunner_shackleshot`, // 14
          `special_bonus_unique_windranger_9`, // 15
          `special_bonus_unique_windranger_4`, // 16
          "special_bonus_attributes", // 17
          "windrunner_focusfire", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_windranger_8", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_windranger_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            `circlet`,
            "branches",
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            "bottle",
            "power_treads",
            "bracer",
            "magic_wand",
            "maelstrom",
          ],
          mid_game: [
            `manta`,
            `blink`,
            `black_king_bar`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          late_game: [`greater_crit`, `gungir`, `nullifier`, `sphere`],
          situational: [
            `mage_slayer`,
            `dragon_lance`,
            `hurricane_pike`,
            `orchid`,
            `diffusal_blade`,
            `disperser`,
            `silver_edge`,
            `skadi`,
            `monkey_king_bar`,
            `mjollnir`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `power_treads`,
            `maelstrom`,
            `manta`,
            `blink`,
            "black_king_bar",
            `ultimate_scepter`,
            `greater_crit`,
            `gungir`,
          ],
          neutral: [
            "lance_of_pursuit",
            "unstable_wand",
            "grove_bow",
            `pupils_gift`,
            "enchanted_quiver",
            `paladin_sword`,
            "mind_breaker",
            `ninja_gear`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_workshop_ids: { en: 2730986473, es: 3160091707 },
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40679,
        power_level: [1.8, 1.9, 2.3, 2.3],
        abilities: [
          "windrunner_powershot", // 1
          "windrunner_windrun", // 2
          "windrunner_powershot", // 3
          "windrunner_shackleshot", // 4
          "windrunner_powershot", // 5
          "windrunner_focusfire", // 6
          "windrunner_powershot", // 7
          "windrunner_windrun", // 8
          "windrunner_windrun", // 9
          "windrunner_windrun", // 10
          "windrunner_shackleshot", // 11
          "windrunner_focusfire", // 12
          "windrunner_shackleshot", // 13
          "windrunner_shackleshot", // 14
          "special_bonus_unique_windranger_9", // 15
          "special_bonus_unique_windranger_4", // 16
          "special_bonus_attributes", // 17
          "windrunner_focusfire", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_windranger_8", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_windranger_2`, // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            "branches",
            "branches",
            "circlet",
            `circlet`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `bracer`,
            `power_treads`,
            `magic_wand`,
            `maelstrom`,
          ],
          mid_game: [
            `manta`,
            `black_king_bar`,
            `blink`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          late_game: [`greater_crit`, `gungir`, `nullifier`, `sphere`],
          situational: [
            `mage_slayer`,
            `dragon_lance`,
            `hurricane_pike`,
            `orchid`,
            `diffusal_blade`,
            `disperser`,
            `silver_edge`,
            `skadi`,
            `monkey_king_bar`,
            `mjollnir`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `power_treads`,
            `maelstrom`,
            `manta`,
            `black_king_bar`,
            `blink`,
            `ultimate_scepter`,
            `greater_crit`,
            `gungir`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `unstable_wand`,
            `grove_bow`,
            `pupils_gift`,
            `enchanted_quiver`,
            `paladin_sword`,
            `mind_breaker`,
            `ninja_gear`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
    ],
    combo: [
      `windrunner_shackleshot`,
      `windrunner_focusfire`,
      `windrunner_windrun`,
      `attack`,
      `windrunner_powershot`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "wind_lace",
          "boots",
          "armor",
          "infused_raindrop",
        ],
        support: [],
        core: ["ring_of_health", "vanguard"],
      },
      mid_game: {
        all: [`cyclone`, `ghost`],
        support: [`glimmer_cape`],
        core: [
          "blade_mail",
          "orchid",
          "heavens_halberd",
          `hurricane_pike`,
          "black_king_bar",
          "monkey_king_bar",
          "witch_blade",
        ],
      },
      late_game: {
        all: ["sphere", "sheepstick", "ethereal_blade", "aeon_disk"],
        support: ["SentryDustGem", "black_king_bar"],
        core: [
          "monkey_king_bar",
          "abyssal_blade",
          "bloodthorn",
          "assault",
          "butterfly",
          "nullifier",
        ],
      },
    },
  },

  // YoonA plays hero
  winter_wyvern: {
    under_review: true,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699965518, es: 3160101184 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40579,
        power_level: [1.6, 1.9, 1.9, 2],
        facet: 2,
        abilities: [
          "winter_wyvern_arctic_burn", // 1
          "winter_wyvern_splinter_blast", // 2
          "winter_wyvern_splinter_blast", // 3
          `winter_wyvern_cold_embrace`, // 4
          "winter_wyvern_splinter_blast", // 5
          "winter_wyvern_winters_curse", // 6
          "winter_wyvern_splinter_blast", // 7
          `winter_wyvern_arctic_burn`, // 8
          `winter_wyvern_cold_embrace`, // 9
          "winter_wyvern_cold_embrace", // 10
          `winter_wyvern_cold_embrace`, // 11
          "winter_wyvern_winters_curse", // 12
          `winter_wyvern_arctic_burn`, // 13
          "winter_wyvern_arctic_burn", // 14
          `special_bonus_unique_winter_wyvern_5`, // 15
          `special_bonus_unique_winter_wyvern_2`, // 16
          "special_bonus_attributes", // 17
          "winter_wyvern_winters_curse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_winter_wyvern_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_winter_wyvern_4", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `faerie_fire`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `blink`,
            `aether_lens`,
            `aghanims_shard`,
            `force_staff`,
          ],
          late_game: [`wind_waker`, `refresher`, `sheepstick`, `octarine_core`],
          situational: [
            `null_talisman`,
            `holy_locket`,
            `pavise`,
            `solar_crest`,
            `glimmer_cape`,
            `cyclone`,
            `lotus_orb`,
            `ghost`,
            `aeon_disk`,
            `ethereal_blade`,
            `hurricane_pike`,
            `witch_blade`,
            `mage_slayer`,
            `revenants_brooch`,
            `ultimate_scepter`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `blink`,
            `aether_lens`,
            `aghanims_shard`,
            `wind_waker`,
            `refresher`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `trusty_shovel`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            `ninja_gear`,
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    combo: [
      `winter_wyvern_arctic_burn`,
      `winter_wyvern_winters_curse`,
      `winter_wyvern_splinter_blast`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "blight_stone",
          "magic_stick",
          "ring_of_regen",
          "headdress",
          "infused_raindrop",
          "cloak",
        ],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          `sange_and_yasha`,
        ],
      },
      late_game: {
        all: [
          "sphere",
          "sheepstick",
          "ethereal_blade",
          "aeon_disk",
          "wind_waker",
        ],
        support: ["black_king_bar"],
        core: ["invis_sword"],
      },
    },
  },

  witch_doctor: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_workshop_ids: { en: 2699957031, es: 3160101465 },
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40574,
        power_level: [1.9, 2, 2.1, 1.9],
        facet: 2,
        abilities: [
          `witch_doctor_voodoo_restoration`, // 1
          `witch_doctor_maledict`, // 2
          `witch_doctor_voodoo_restoration`, // 3
          `witch_doctor_paralyzing_cask`, // 4
          `witch_doctor_voodoo_restoration`, // 5
          "witch_doctor_death_ward", // 6
          `witch_doctor_voodoo_restoration`, // 7
          `witch_doctor_maledict`, // 8
          `witch_doctor_maledict`, // 9
          `special_bonus_unique_witch_doctor_4`, // 10
          `witch_doctor_maledict`, // 11
          "witch_doctor_death_ward", // 12
          `witch_doctor_paralyzing_cask`, // 13
          `witch_doctor_paralyzing_cask`, // 14
          `witch_doctor_paralyzing_cask`, // 15
          `special_bonus_unique_witch_doctor_3`, // 16
          "special_bonus_attributes", // 17
          "witch_doctor_death_ward", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_witch_doctor_1`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_witch_doctor_5", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            "enchanted_mango",
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `mekansm`,
            `guardian_greaves`,
            `aghanims_shard`,
            `glimmer_cape`,
            `blink`,
          ],
          late_game: [
            `ultimate_scepter`,
            `black_king_bar`,
            `octarine_core`,
            `shivas_guard`,
          ],
          situational: [
            `veil_of_discord`,
            `pavise`,
            `solar_crest`,
            `spirit_vessel`,
            `force_staff`,
            `holy_locket`,
            `aether_lens`,
            `cyclone`,
            `ghost`,
            `kaya_and_sange`,
            `lotus_orb`,
            `aeon_disk`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `guardian_greaves`,
            `aghanims_shard`,
            `glimmer_cape`,
            `ultimate_scepter`,
            `black_king_bar`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `trusty_shovel`,
            "philosophers_stone",
            `pupils_gift`,
            `psychic_headband`,
            `ogre_seal_totem`,
            `timeless_relic`,
            `spy_gadget`,
            "seer_stone",
            `force_boots`,
          ],
        },
      },
    ],
    combo: [
      `witch_doctor_voodoo_restoration`,
      `witch_doctor_paralyzing_cask`,
      `witch_doctor_maledict`,
      `witch_doctor_death_ward`,
      `glimmer_cape`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "ring_of_regen",
          "wind_lace",
          "boots",
          /* "armor", */
          "infused_raindrop",
          `cloak`,
        ],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb" /*"medallion_of_courage", "solar_crest" */],
        support: ["glimmer_cape", "force_staff", "ghost"],
        core: [
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
        ],
      },
      late_game: { all: [], support: ["black_king_bar"], core: [] },
    },
  },

  // eidendota plays hero
  // Wraith King
  skeleton_king: {
    under_review: true,
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_workshop_ids: { en: 2699919868, es: 3160101827 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40640,
        power_level: [2, 2.1, 2.6, 2.5],
        abilities: [
          "skeleton_king_hellfire_blast", // 1
          "skeleton_king_vampiric_spirit", // 2
          "skeleton_king_vampiric_spirit", // 3
          "skeleton_king_mortal_strike", // 4
          "skeleton_king_vampiric_spirit", // 5
          "skeleton_king_reincarnation", // 6
          "skeleton_king_vampiric_spirit", // 7
          "skeleton_king_mortal_strike", // 8
          "skeleton_king_mortal_strike", // 9
          "special_bonus_unique_wraith_king_2", // 10
          "skeleton_king_mortal_strike", // 11
          "skeleton_king_reincarnation", // 12
          "skeleton_king_hellfire_blast", // 13
          "skeleton_king_hellfire_blast", // 14
          "special_bonus_hp_400", // 15
          "skeleton_king_hellfire_blast", // 16
          "special_bonus_attributes", // 17
          "skeleton_king_reincarnation", // 18
          "special_bonus_attributes", // 19
          "special_bonus_attack_speed_70", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_wraith_king_10", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "slippers",
            "circlet",
          ],
          early_game: [
            "wraith_band",
            "phase_boots",
            "magic_wand",
            "hand_of_midas",
          ],
          mid_game: ["radiance", "aghanims_shard", "blink", "black_king_bar"],
          late_game: ["assault", "abyssal_blade", "swift_blink"],
          situational: [
            "armlet",
            "desolator",
            "silver_edge",
            "skadi",
            "monkey_king_bar",
            "nullifier",
            "bloodthorn",
            "ultimate_scepter",
          ],
          core: [
            "phase_boots",
            "hand_of_midas",
            "radiance",
            "aghanims_shard",
            "blink",
            "black_king_bar",
            "assault",
          ],
          neutral: [
            "broom_handle",
            "lance_of_pursuit",
            "vambrace",
            "orb_of_destruction",
            "elven_tunic",
            //"titan_sliver",
            "paladin_sword",
            "mind_breaker",
            //"penta_edged_sword",
            "desolator_2",
            "pirate_hat",
            "mirror_shield",
          ],
        },
      },
    ],
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: ["ward_sentry"],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["spirit_vessel"],
        support: ["ward_dispenser", "glimmer_cape", "ghost", "force_staff"],
        core: ["hurricane_pike", "diffusal_blade"],
      },
      late_game: {
        all: ["ethereal_blade", "aeon_disk"],
        support: [],
        core: [
          "assault",
          "skadi",
          "shivas_guard",
          "silver_edge",
          "butterfly",
          "bloodthorn",
        ],
      },
    },
  },

  zuus: {
    under_review: false,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_workshop_ids: { en: 2699919737, es: 3164075836 },
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40636,
        power_level: [2, 2.1, 2.6, 2.7],
        facet: 1,
        abilities: [
          "zuus_arc_lightning", // 1
          "zuus_heavenly_jump", // 2
          "zuus_arc_lightning", // 3
          `zuus_lightning_bolt`, // 4
          "zuus_arc_lightning", // 5
          "zuus_thundergods_wrath", // 6
          "zuus_arc_lightning", // 7
          `zuus_lightning_bolt`, // 8
          `zuus_lightning_bolt`, // 9
          `zuus_lightning_bolt`, // 10
          `zuus_heavenly_jump`, // 11
          "zuus_thundergods_wrath", // 12
          `zuus_heavenly_jump`, // 13
          `zuus_heavenly_jump`, // 14
          `special_bonus_unique_zeus_jump_cooldown`, // 15
          `special_bonus_unique_zeus_jump_postjump_movespeed`, // 16
          "special_bonus_attributes", // 17
          "zuus_thundergods_wrath", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_zeus_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_zeus_5", // 25
        ],
        items: {
          starting: [
            `tango`,
            `faerie_fire`,
            `branches`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bottle`,
            `boots`,
            `ring_of_basilius`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `arcane_boots`,
            `phylactery`,
            `yasha_and_kaya`,
            `aether_lens`,
            `aghanims_shard`,
          ],
          late_game: [
            `ultimate_scepter`,
            `refresher`,
            `octarine_core`,
            `ethereal_blade`,
          ],
          situational: [
            `null_talisman`,
            `power_treads`,
            `force_staff`,
            `cyclone`,
            `blink`,
            `bloodstone`,
            `kaya_and_sange`,
            `dagon_5`,
            `sheepstick`,
            `sphere`,
            `aeon_disk`,
            `black_king_bar`,
            `angels_demise`,
            `wind_waker`,
            `witch_blade`,
            `devastator`,
            `hurricane_pike`,
            `moon_shard`,
            `assault`,
            `arcane_blink`,
            `travel_boots`,
          ],
          core: [
            "bottle",
            "arcane_boots",
            `phylactery`,
            `yasha_and_kaya`,
            `aether_lens`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `refresher`,
          ],
          neutral: [
            "mysterious_hat",
            "arcane_ring",
            `vambrace`,
            `bullwhip`,
            `ceremonial_robe`,
            "psychic_headband",
            "timeless_relic",
            `stormcrafter`,
            "seer_stone",
            `force_boots`,
          ],
        },
      },
    ],
    combo: [
      `zuus_heavenly_jump`,
      `zuus_lightning_bolt`,
      `zuus_arc_lightning`,
      `zuus_thundergods_wrath`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_wand",
          "blight_stone",
          "ring_of_regen",
          "headdress",
          "infused_raindrop",
          "cloak",
        ],
        support: ["tranquil_boots", "smoke_of_deceit"],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb", "blink"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          `orchid`,
        ],
      },
      late_game: {
        all: ["sheepstick", "sphere"],
        support: ["black_king_bar"],
        core: ["silver_edge"],
      },
    },
  },
};
