/**
 * heroBuilds.ts contains the ability and items builds for all Dota 2 heroes. This infromation is used across Dota Caoch, i.e. in the app, on the website and in the in-game guides.
 * T
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
  TNTCNz = "TNTCNz",
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
    TNTCNz: {
      image: "https://i.imgur.com/MvM6s5B.jpeg",
      text: "This guide was written by 8k MMR player TNTCN:",
      link_http: "https://skelly.gg/g/TNTCN",
      //link_http: "https://www.gamersensei.com/senseis/tntcn",
      //link_text: "Click here to book a coaching session with him.",
    },
    YoonA: {
      image: "https://i.imgur.com/TZpRwOK.jpeg",
      text: "This guide was written by Hammad:",
      //link_http: "https://www.fiverr.com/share/k0bmRk",
      link_http: "https://skelly.gg/g/YoonA",
      //link_text: "Click here to book a coaching session with him.",
    },
    yongy146: {
      image: "https://i.imgur.com/TZpRwOK.jpeg",
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
  gameplay_version: string; // E.g. 7.30e or 7.31. This should only be updated once the guide is ready to be published
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
  steam_guide_link_id: number; // Link to steam web buids, e.g., "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915996",
  steam_guide_role?: STEAM_GUIDE_ROLE; // Role used to classify steam guides (this role is displayed in yellow in Dota 2). Available values are: Core, Offlane, Support, Jungle, Initiator, Roamer. If there is no value proivded, then it there is no role shown in Dota 2
  dota_fire_id?: number; // Guide number on Dota Fire
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2698376898,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40437,
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
            `glimmer_cape`,
            `force_staff`,
          ],
          late_game: [
            "ultimate_scepter",
            `lotus_orb`,
            `assault`,
            `overwhelming_blink`,
          ],
          situational: [
            `orb_of_venom`,
            `tranquil_boots`,
            `holy_locket`,
            `ghost`,
            `spirit_vessel`,
            `heavens_halberd`,
            `guardian_greaves`,
            `aether_lens`,
            `crimson_guard`,
            `pipe`,
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
            `glimmer_cape`,
            `force_staff`,
            `ultimate_scepter`,
            `lotus_orb`,
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
        steam_guide_link_id: 2971195954,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40436,
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
          late_game: [`basher`, `assault`, `sphere`, `abyssal_blade`],
          situational: [
            `orb_of_venom`,
            `solar_crest`,
            `hand_of_midas`,
            `crimson_guard`,
            `pipe`,
            `boots_of_bearing`,
            `heavens_halberd`,
            `vladmir`,
            `blade_mail`,
            `radiance`,
            `monkey_king_bar`,
            `mjollnir`,
            `ultimate_scepter`,
            `lotus_orb`,
            `black_king_bar`,
            `overwhelming_blink`,
            `skadi`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_link_id: 2698377018,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40438,
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
          "alchemist_corrosive_weaponry",
          "special_bonus_unique_alchemist_5",
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
            "gauntlets",
            "branches",
            "branches",
          ],
          early_game: ["soul_ring", "power_treads", "magic_wand", "radiance"],
          mid_game: ["blink", "black_king_bar", "assault", "basher"],
          late_game: [
            "abyssal_blade",
            "overwhelming_blink",
            "satanic",
            "ultimate_scepter",
            "moon_shard",
            "bloodthorn",
          ],
          situational: [
            "silver_edge",
            "nullifier",
            "mjollnir",
            "monkey_king_bar",
            "aghanims_shard",
            "sphere",
            "swift_blink",
            "manta",
            "heart",
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
            //"ring_of_aquila",
            "ogre_seal_totem",
            //"titan_sliver",
            //"penta_edged_sword",
            "ninja_gear",
            "pirate_hat",
            "desolator_2",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link_id: 2730985550,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40439,
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
          "alchemist_corrosive_weaponry",
          "special_bonus_unique_alchemist_5",
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
            "branches",
            "faerie_fire",
            "ward_observer",
          ],
          early_game: ["bottle", "power_treads", "magic_wand", "radiance"],
          mid_game: ["blink", "black_king_bar", "assault", "basher"],
          late_game: [
            "abyssal_blade",
            "overwhelming_blink",
            "heart",
            "ultimate_scepter",
          ],
          situational: [
            "aghanims_shard",
            "mjollnir",
            "monkey_king_bar",
            "silver_edge",
            "nullifier",
            "swift_blink",
            "sphere",
            "soul_ring",
          ],
          core: [
            "bottle",
            "power_treads",
            "radiance",
            "blink",
            "assault",
            "black_king_bar",
          ],
          neutral: [
            "broom_handle",
            "lance_of_pursuit",
            "duelist_gloves",
            "orb_of_corrosion",
            //"ring_of_aquila",
            "ogre_seal_totem",
            //"titan_sliver",
            //"penta_edged_sword",
            "ninja_gear",
            "pirate_hat",
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2698377158,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40441,
        abilities: [
          "ancient_apparition_chilling_touch",
          "ancient_apparition_cold_feet",
          `ancient_apparition_cold_feet`,
          `ancient_apparition_ice_vortex`,
          `ancient_apparition_ice_vortex`,
          "ancient_apparition_ice_blast",
          `ancient_apparition_ice_vortex`,
          `ancient_apparition_ice_vortex`,
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
            `enchanted_mango`,
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
            `glimmer_cape`,
            `aghanims_shard`,
            `force_staff`,
            `aether_lens`,
          ],
          late_game: [
            `sheepstick`,
            `octarine_core`,
            `ethereal_blade`,
            `ultimate_scepter`,
          ],
          situational: [
            `hand_of_midas`,
            `urn_of_shadows`,
            `ghost`,
            `pavise`,
            `solar_crest`,
            `rod_of_atos`,
            `hurricane_pike`,
            `boots_of_bearing`,
            `cyclone`,
            `guardian_greaves`,
            `aeon_disk`,
            `lotus_orb`,
            `revenants_brooch`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `glimmer_cape`,
            `aghanims_shard`,
            `force_staff`,
            `aether_lens`,
            `sheepstick`,
            `octarine_core`,
            `ethereal_blade`,
          ],
          neutral: [
            `mysterious_hat`,
            `trusty_shovel`,
            "philosophers_stone",
            `whisper_of_the_dread`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_link_id: 2698377261,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40442,
        abilities: [
          "antimage_mana_break",
          "antimage_blink",
          "antimage_mana_break",
          "antimage_counterspell",
          "antimage_blink",
          "antimage_mana_void",
          "antimage_blink",
          "antimage_blink",
          "antimage_mana_break",
          "special_bonus_strength_9",
          "antimage_mana_break",
          "antimage_mana_void",
          "antimage_counterspell",
          "antimage_counterspell",
          "antimage_counterspell",
          "special_bonus_unique_antimage",
          "special_bonus_attributes",
          "antimage_mana_void",
          "special_bonus_attributes",
          "special_bonus_unique_antimage_3",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_antimage_2",
        ],
        items: {
          starting: [
            "quelling_blade",
            "tango",
            "circlet",
            "slippers",
            "branches",
            "branches",
          ],
          early_game: [
            "wraith_band",
            "cornucopia",
            "power_treads",
            "magic_wand",
          ],
          mid_game: ["bfury", "manta", "basher"],
          late_game: ["skadi", "abyssal_blade", "satanic", "butterfly"],
          situational: [
            "vanguard",
            "black_king_bar",
            "monkey_king_bar",
            "sphere",
            "aghanims_shard",
            "assault",
            "radiance",
            "diffusal_blade",
            "blood_grenade",
            "heart",
            "ultimate_scepter",
            "orb_of_corrosion",
          ],
          core: ["power_treads", "bfury", "manta", "abyssal_blade"],
          neutral: [
            "broom_handle",
            "lance_of_pursuit",
            //"ring_of_aquila",
            "pupils_gift",
            "vambrace",
            //"titan_sliver",
            "elven_tunic",
            "ninja_gear",
            "mind_breaker",
            //"penta_edged_sword",
            "mirror_shield",
            "pirate_hat",
            "apex",
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
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link_id: 2698377376,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40443,
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
          "special_bonus_unique_arc_warden_4", // 15
          "arc_warden_magnetic_field", // 16
          "special_bonus_attributes", // 17
          "arc_warden_tempest_double", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_arc_warden", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_arc_warden_8", // 25
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
            "travel_boots",
            "maelstrom",
            `gungir`,
            `black_king_bar`,
            "blink",
          ],
          late_game: [
            "blink",
            "ultimate_scepter",
            "sheepstick",
            "octarine_core",
            "aghanims_shard",
            "swift_blink",
          ],
          situational: [
            "monkey_king_bar",
            `skadi`,
            `greater_crit`,
            `nullifier`,
            `travel_boots_2`,
            "manta",
            "silver_edge",
            "hurricane_pike",
          ],
          core: [
            "hand_of_midas",
            "maelstrom",
            "travel_boots",
            `gungir`,
            `black_king_bar`,
            "blink",
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
    // Comment to be deleted
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2699915204,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40444,
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
          `axe_battle_hunger`, // 11
          "axe_culling_blade", // 12
          "axe_battle_hunger", // 13
          "axe_battle_hunger", // 14
          `special_bonus_unique_axe_8`, // 15
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
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],

          early_game: [
            `vanguard`,
            `boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `blink`,
            `blade_mail`,
            "black_king_bar",
            "aghanims_shard",
            "travel_boots",
          ],
          late_game: [
            "octarine_core",
            `overwhelming_blink`,
            "heart",
            "refresher",
          ],
          situational: [
            `pipe`,
            `assault`,
            `shivas_guard`,
            `sphere`,
            `ultimate_scepter`,
            `crimson_guard`,
            "lotus_orb",
            `heavens_halberd`,
            `travel_boots_2`,
          ],
          core: [
            "vanguard",
            "boots",
            "blink",
            "blade_mail",
            `travel_boots`,
            `aghanims_shard`,
            `black_king_bar`,
            "octarine_core",
          ],
          neutral: [
            `faded_broach`,
            "occult_bracelet",
            "vambrace",
            "bullwhip",
            `cloak_of_flames`,
            "ogre_seal_totem",
            `havoc_hammer`,
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
        core: [
          "mage_slayer",
          "sange_and_yasha",
          "kaya_and_sange",
          "silver_edge",
        ],
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699915293,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40445,
        abilities: [
          "bane_brain_sap", // 1
          "bane_nightmare", // 2
          "bane_brain_sap", // 3
          `bane_enfeeble`, // 4
          `bane_brain_sap`, // 5
          "bane_fiends_grip", // 6
          `bane_brain_sap`, // 7
          `bane_nightmare`, // 8
          `bane_enfeeble`, // 9
          `bane_enfeeble`, // 10
          `bane_enfeeble`, // 11
          "bane_fiends_grip", // 12
          `bane_nightmare`, // 13
          `bane_nightmare`, // 14
          `special_bonus_unique_bane_11`, // 15 | Enfeeble Cast Range Reduction
          `special_bonus_unique_bane_9`, // 16
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
            `enchanted_mango`,
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
            `infused_raindrop`,
            "wind_lace",
          ],
          mid_game: [
            `arcane_boots`,
            `aether_lens`,
            "glimmer_cape",
            `force_staff`,
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
            `refresher`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            `glimmer_cape`,
            `force_staff`,
            `blink`,
            `ultimate_scepter`,
            `aghanims_shard`,
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
        all: ["magic_stick", "ring_of_regen", "infused_raindrop"],
        support: [],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb"],
        support: ["glimmer_cape"],
        core: ["sange_and_yasha", "kaya_and_sange", "black_king_bar"],
      },
      late_game: {
        all: ["sphere", "wind_waker"],
        support: ["black_king_bar"],
        core: [],
      },
    },
  },

  batrider: {
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link_id: 2699915391,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40446,
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
        steam_guide_link_id: 2719253341,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40447,
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
          "sange_and_yasha",
          "kaya_and_sange",
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2699915480,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40448,
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
            `magic_stick`,
            "branches",
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `helm_of_the_dominator`,
            `arcane_boots`,
            `magic_wand`,
            `ring_of_basilius`,
          ],
          mid_game: [
            `vladmir`,
            `helm_of_the_overlord`,
            `ultimate_scepter`,
            `blink`,
          ],
          late_game: [
            `aghanims_shard`,
            `black_king_bar`,
            `assault`,
            `octarine_core`,
          ],
          situational: [
            `vanguard`,
            `guardian_greaves`,
            `heavens_halberd`,
            `solar_crest`,
            `ancient_janggo`,
            `crimson_guard`,
            `lotus_orb`,
            `force_staff`,
            `pipe`,
            `boots_of_bearing`,
            `kaya_and_sange`,
            `aeon_disk`,
            `refresher`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `helm_of_the_dominator`,
            `arcane_boots`,
            `vladmir`,
            `helm_of_the_overlord`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `assault`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            `pupils_gift`,
            `dragon_scale`,
            `cloak_of_flames`,
            //`quickening_charm`,
            //"spell_prism",
            `timeless_relic`,
            //`fallen_sky`,
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
        support: ["ward_sentry"],
        core: ["orb_of_corrosion", "vanguard"],
      },
      mid_game: {
        all: [],
        support: ["ward_sentry", "ghost", "force_staff", "glimmer_cape"],
        core: ["crimson_guard", "sange_and_yasha", "kaya_and_sange", "gungir"],
      },
      late_game: {
        all: ["sphere"],
        support: ["SentryGem"],
        core: ["assault"],
      },
    },
  },

  // eidendota plays hero
  bloodseeker: {
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_link_id: 2699915618,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40449,
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
          situational: ["silver_edge", "skadi", "monkey_king_bar", "sphere"],
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
        steam_guide_link_id: 2706431682,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40450,
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
        core: ["blade_mail", "sange_and_yasha", "kaya_and_sange"],
      },
      late_game: {
        all: ["sphere", "sheepstick"],
        support: [],
        core: ["satanic", "abyssal_blade", "butterfly"],
      },
    },
  },

  bounty_hunter: {
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699915719,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40451,
        abilities: [
          `bounty_hunter_wind_walk`,
          `bounty_hunter_jinada`,
          `bounty_hunter_jinada`,
          "bounty_hunter_shuriken_toss",
          `bounty_hunter_jinada`,
          "bounty_hunter_track",
          `bounty_hunter_jinada`,
          `bounty_hunter_shuriken_toss`,
          `bounty_hunter_wind_walk`,
          `bounty_hunter_wind_walk`,
          `bounty_hunter_wind_walk`,
          "bounty_hunter_track",
          `bounty_hunter_shuriken_toss`,
          `bounty_hunter_shuriken_toss`,
          `special_bonus_unique_bounty_hunter_4`,
          `special_bonus_unique_bounty_hunter_9`,
          "special_bonus_attributes",
          "bounty_hunter_track",
          "special_bonus_attributes",
          `special_bonus_unique_bounty_hunter_8`,
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_unique_bounty_hunter_jinada_no_cooldown`,
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
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `pavise`,
            `solar_crest`,
            `angels_demise`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `boots_of_bearing`,
          ],
          late_game: [
            `sheepstick`,
            `bloodthorn`,
            `octarine_core`,
            `ethereal_blade`,
          ],
          situational: [
            `orb_of_corrosion`,
            `urn_of_shadows`,
            `phylactery`,
            `guardian_greaves`,
            "spirit_vessel",
            `pipe`,
            `crimson_guard`,
            `black_king_bar`,
            `heavens_halberd`,
            `orchid`,
            `lotus_orb`,
            `cyclone`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            "tranquil_boots",
            `solar_crest`,
            `angels_demise`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `boots_of_bearing`,
            `sheepstick`,
            `octarine_core`,
          ],
          neutral: [
            `broom_handle`,
            `faded_broach`,
            `philosophers_stone`,
            "bullwhip",
            `enchanted_quiver`,
            `ceremonial_robe`,
            `timeless_relic`,
            `ascetic_cap`,
            `desolator_2`,
            `demonicon`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2699915806,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40452,
        abilities: [
          "brewmaster_thunder_clap",
          "brewmaster_cinder_brew",
          `brewmaster_cinder_brew`,
          `brewmaster_drunken_brawler`,
          `brewmaster_cinder_brew`,
          "brewmaster_primal_split",
          `brewmaster_cinder_brew`,
          `brewmaster_thunder_clap`,
          `brewmaster_thunder_clap`,
          `brewmaster_thunder_clap`,
          `special_bonus_unique_brewmaster_2`,
          "brewmaster_primal_split",
          `brewmaster_drunken_brawler`,
          `brewmaster_drunken_brawler`,
          `special_bonus_unique_brewmaster_8`,
          `brewmaster_drunken_brawler`,
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
          early_game: [`urn_of_shadows`, `boots`, `bracer`, `magic_wand`],
          mid_game: [
            `spirit_vessel`,
            `hand_of_midas`,
            `radiance`,
            `aghanims_shard`,
          ],
          late_game: [
            `assault`,
            `octarine_core`,
            `refresher`,
            `ultimate_scepter`,
          ],
          situational: [
            `vanguard`,
            `arcane_boots`,
            `meteor_hammer`,
            `crimson_guard`,
            `pipe`,
            `blink`,
            `force_staff`,
            `guardian_greaves`,
            `boots_of_bearing`,
            `vladmir`,
            `black_king_bar`,
            `shivas_guard`,
            `overwhelming_blink`,
            `sphere`,
            `lotus_orb`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `urn_of_shadows`,
            `boots`,
            `spirit_vessel`,
            `hand_of_midas`,
            `radiance`,
            `aghanims_shard`,
            `assault`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            //`quickening_charm`,
            `cloak_of_flames`,
            //"spell_prism",
            `havoc_hammer`,
            `giants_ring`,
            //`fallen_sky`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2699915905,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40453,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2699915996,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40454,
        abilities: [
          "broodmother_spin_web", // 1
          `broodmother_silken_bola`, // 2
          `broodmother_insatiable_hunger`, // 3
          `broodmother_spin_web`, // 4
          "broodmother_spin_web", // 5
          "broodmother_spawn_spiderlings", // 6
          `broodmother_spin_web`, // 7
          `broodmother_insatiable_hunger`, // 8
          `broodmother_insatiable_hunger`, // 9
          `broodmother_insatiable_hunger`, // 10
          `special_bonus_unique_broodmother_6`, // 11
          "broodmother_spawn_spiderlings", // 12
          `broodmother_silken_bola`, // 13
          `broodmother_silken_bola`, // 14
          `special_bonus_unique_broodmother_5`, // 15
          `broodmother_silken_bola`, // 16
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
            `echo_sabre`,
            `manta`,
            `black_king_bar`,
            `harpoon`,
            `aghanims_shard`,
          ],
          late_game: [
            `sphere`,
            `butterfly`,
            `abyssal_blade`,
            `nullifier`,
            `ultimate_scepter`,
          ],
          situational: [
            `spirit_vessel`,
            `orb_of_corrosion`,
            `arcane_boots`,
            `diffusal_blade`,
            `crimson_guard`,
            `pipe`,
            `guardian_greaves`,
            `blink`,
            `desolator`,
            `sheepstick`,
            `bloodthorn`,
            `monkey_king_bar`,
            `skadi`,
            `silver_edge`,
            `swift_blink`,
            `solar_crest`,
            `lotus_orb`,
            `phylactery`,
            `overwhelming_blink`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            `soul_ring`,
            `echo_sabre`,
            `manta`,
            `black_king_bar`,
            `harpoon`,
            `sphere`,
            `butterfly`,
          ],
          neutral: [
            "arcane_ring",
            `unstable_wand`,
            `pupils_gift`,
            //"ring_of_aquila",
            `elven_tunic`,
            `cloak_of_flames`,
            //`penta_edged_sword`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2699916073,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40455,
        abilities: [
          "centaur_hoof_stomp", // 1
          `centaur_double_edge`, // 2
          `centaur_return`, // 3
          `centaur_double_edge`, // 4
          `centaur_double_edge`, // 5
          "centaur_stampede", // 6
          "centaur_return", // 7
          `centaur_return`, // 8
          `centaur_hoof_stomp`, // 9
          `centaur_hoof_stomp`, // 10
          `centaur_hoof_stomp`, // 11
          "centaur_stampede", // 12
          `special_bonus_hp_regen_5`, // 13
          `centaur_double_edge`, // 14
          `special_bonus_strength_15`, // 15
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
          early_game: ["vanguard", `phase_boots`, "magic_wand", `cloak`],
          mid_game: [`blink`, `pipe`, `crimson_guard`, `heart`],
          late_game: [
            `aghanims_shard`,
            `black_king_bar`,
            `overwhelming_blink`,
            `assault`,
          ],
          situational: [
            `bracer`,
            "heavens_halberd",
            `ultimate_scepter`,
            `guardian_greaves`,
            `solar_crest`,
            `force_staff`,
            `lotus_orb`,
            `shivas_guard`,
            `blade_mail`,
            `sphere`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `phase_boots`,
            `blink`,
            `pipe`,
            `crimson_guard`,
            `heart`,
            `aghanims_shard`,
            `overwhelming_blink`,
          ],
          neutral: [
            `occult_bracelet`,
            `seeds_of_serenity`,
            "dragon_scale",
            "vambrace",
            "cloak_of_flames",
            `ogre_seal_totem`,
            `martyrs_plate`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_link_id: 2699916165,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40456,
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
          early_game: ["magic_wand", "power_treads", "bracer", "hand_of_midas"],
          mid_game: [
            "armlet",
            "echo_sabre",
            "black_king_bar",
            "blink",
            "harpoon",
            "aghanims_shard",
          ],
          late_game: [
            "bloodthorn",
            "heart",
            "assault",
            "satanic",
            "skadi",
            "abyssal_blade",
            "overwhelming_blink",
          ],
          situational: [
            "ultimate_scepter",
            "infused_raindrop",
            "sange_and_yasha",
            "silver_edge",
            "manta",
            "soul_ring",
            "diffusal_blade",
            "sphere",
            "mage_slayer",
          ],
          core: [
            "power_treads",
            "armlet",
            "echo_sabre",
            "blink",
            "black_king_bar",
          ],
          neutral: [
            "unstable_wand",
            "broom_handle",
            "lance_of_pursuit",
            "vambrace",
            "pupils_gift",
            //"ring_of_aquila",
            "elven_tunic",
            "paladin_sword",
            //"titan_sliver",
            "mind_breaker",
            //"spell_prism",
            //"penta_edged_sword",
            "desolator_2",
            "pirate_hat",
            "apex",
          ],
        },
        // item_tooltips:
        /*flicker:
            "Can be really good in the late game if your enemies are controlling you with slows,silences etc.",
            */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2708440963,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40457,
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
          "chaos_knight_reality_rift", // 10
          "special_bonus_unique_chaos_knight_2", // 11
          "chaos_knight_phantasm", // 12
          "chaos_knight_chaos_bolt", // 13
          "chaos_knight_chaos_bolt", // 14
          "special_bonus_unique_chaos_knight_8", // 15
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
            "gauntlets",
            "branches",
            "branches",
          ],
          early_game: ["magic_wand", "power_treads", "bracer", "bracer"],
          mid_game: ["armlet", "blink", "ultimate_scepter", "aghanims_shard"],
          late_game: ["assault", "overwhelming_blink", "bloodthorn", "heart"],
          situational: [
            "heavens_halberd",
            "black_king_bar",
            "silver_edge",
            "manta",
            "sange_and_yasha",
            "hand_of_midas",
          ],
          core: [
            "power_treads",
            "armlet",
            "blink",
            "black_king_bar",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          neutral: [
            "unstable_wand",
            "lance_of_pursuit",
            "vambrace",
            "pupils_gift",
            "elven_tunic",
            "paladin_sword",
            //"spell_prism",
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699916263,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
        abilities: [
          `chen_penitence`, // 1
          `chen_holy_persuasion`, // 2
          "chen_holy_persuasion", // 3
          `chen_penitence`, // 4
          "chen_holy_persuasion", // 5
          "chen_hand_of_god", // 6
          "chen_holy_persuasion", // 7
          "chen_penitence", // 8
          "chen_penitence", // 9
          "special_bonus_unique_chen_11", // 10
          `chen_divine_favor`, // 11
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
          early_game: [
            `solar_crest`,
            `boots`,
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [`mekansm`, `guardian_greaves`, `pipe`, `aghanims_shard`],
          late_game: [`force_staff`, `ultimate_scepter`, `vladmir`, `assault`],
          situational: [
            `blight_stone`,
            `glimmer_cape`,
            `pavise`,
            `holy_locket`,
            `aeon_disk`,
            `phylactery`,
            `ghost`,
            `boots_of_bearing`,
            `lotus_orb`,
            `helm_of_the_overlord`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            `solar_crest`,
            `boots`,
            `guardian_greaves`,
            `pipe`,
            `aghanims_shard`,
            `force_staff`,
            `ultimate_scepter`,
            `assault`,
          ],
          neutral: [
            `arcane_ring`,
            `seeds_of_serenity`,
            "philosophers_stone",
            `pupils_gift`,
            //`quickening_charm`,
            `ceremonial_robe`,
            "spy_gadget",
            //`spell_prism`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_link_id: 2699916348,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "clinkz_tar_bomb", // 1
          "clinkz_death_pact", // 2
          "clinkz_tar_bomb", // 3
          "clinkz_strafe", // 4
          "clinkz_tar_bomb", // 5
          "clinkz_wind_walk", // 6
          "clinkz_tar_bomb", // 7
          "clinkz_strafe", // 8
          "clinkz_strafe", // 9
          "special_bonus_unique_clinkz_1", // 10
          "clinkz_strafe", // 11
          "clinkz_wind_walk", // 12
          "clinkz_death_pact", // 13
          "clinkz_death_pact", // 14
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
          "special_bonus_unique_clinkz_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            "branches",
            "slippers",
            "circlet",
            "quelling_blade",
          ],
          early_game: [
            "falcon_blade",
            "power_treads",
            /*"medallion_of_courage",*/
            "magic_wand",
          ],
          mid_game: ["solar_crest", "orchid", "desolator", "aghanims_shard"],
          late_game: ["sheepstick", "bloodthorn", "nullifier"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "monkey_king_bar",
            "sphere",
            "ultimate_scepter",
            "maelstrom",
            "hurricane_pike",
            "greater_crit",
            "skadi",
          ],
          core: ["solar_crest", "orchid", "dragon_lance", "aghanims_shard"],
          neutral: [
            "lance_of_pursuit",
            "faded_broach",
            "grove_bow",
            //"ring_of_aquila",
            "enchanted_quiver",
            "elven_tunic",
            "mind_breaker",
            //"spell_prism",
            "desolator_2",
            //`ex_machina`,
            "apex",
          ],
        },
      },
    ],
    combo: [],
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699916434,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40467,
        abilities: [
          "rattletrap_battery_assault", // 1
          "rattletrap_power_cogs", // 2
          "rattletrap_battery_assault", // 3
          "rattletrap_rocket_flare", // 4
          "rattletrap_battery_assault", // 5
          "rattletrap_hookshot", // 6
          "rattletrap_battery_assault", // 7
          "rattletrap_rocket_flare", // 8
          "rattletrap_rocket_flare", // 9
          "rattletrap_rocket_flare", // 10
          "special_bonus_unique_clockwerk_7", // 11
          "rattletrap_hookshot", // 12
          "rattletrap_power_cogs", // 13
          "rattletrap_power_cogs", // 14
          "special_bonus_unique_clockwerk_3", // 15
          "rattletrap_power_cogs", // 16
          "special_bonus_attributes", // 17
          "rattletrap_hookshot", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_clockwerk_flare_damage`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_clockwerk`, // 25
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
            `spirit_vessel`,
            `force_staff`,
            `ultimate_scepter`,
          ],
          late_game: [
            `aghanims_shard`,
            `boots_of_bearing`,
            `shivas_guard`,
            `octarine_core`,
          ],
          situational: [
            `ring_of_basilius`,
            `glimmer_cape`,
            `pipe`,
            `blade_mail`,
            `cyclone`,
            `ghost`,
            `vladmir`,
            `guardian_greaves`,
            `lotus_orb`,
            `aeon_disk`,
            `orchid`,
            `heavens_halberd`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `urn_of_shadows`,
            `solar_crest`,
            `spirit_vessel`,
            `force_staff`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `boots_of_bearing`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            `pupils_gift`,
            `philosophers_stone`,
            `ogre_seal_totem`,
            `cloak_of_flames`,
            `ascetic_cap`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699916517,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40468,
        abilities: [
          "crystal_maiden_crystal_nova", // 1
          "crystal_maiden_frostbite", // 2
          "crystal_maiden_brilliance_aura", // 3
          "crystal_maiden_frostbite", // 4
          "crystal_maiden_frostbite", // 5
          "crystal_maiden_brilliance_aura", // 6
          "crystal_maiden_frostbite", // 7
          `crystal_maiden_freezing_field`, // 8
          `crystal_maiden_crystal_nova`, // 9
          `special_bonus_hp_250`, // 10
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
            `blink`,
            `ultimate_scepter`,
          ],
          late_game: [
            `black_king_bar`,
            `boots_of_bearing`,
            `octarine_core`,
            `aeon_disk`,
          ],
          situational: [
            "ring_of_basilius",
            `lotus_orb`,
            `ghost`,
            `cyclone`,
            `shivas_guard`,
            `pavise`,
            `solar_crest`,
            `sheepstick`,
            `ethereal_blade`,
            "travel_boots",
          ],
          core: [
            `tranquil_boots`,
            `glimmer_cape`,
            `force_staff`,
            `aghanims_shard`,
            `blink`,
            `ultimate_scepter`,
            `black_king_bar`,
            `boots_of_bearing`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2699916602,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40469,
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
          "special_bonus_unique_dark_seer", // 20
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
            `ring_of_basilius`,
            `arcane_boots`,
            `magic_wand`,
            `veil_of_discord`,
            `soul_ring`,
            `infused_raindrop`,
          ],
          mid_game: [`guardian_greaves`, `pipe`, `blink`, `shivas_guard`],
          late_game: [
            `ultimate_scepter`,
            `octarine_core`,
            `aghanims_shard`,
            `refresher`,
          ],
          situational: [
            `vanguard`,
            `spirit_vessel`,
            `crimson_guard`,
            `cyclone`,
            `sphere`,
            `helm_of_the_dominator`,
            `black_king_bar`,
            `aeon_disk`,
            `heavens_halberd`,
            `solar_crest`,
            `force_staff`,
            `lotus_orb`,
            `sheepstick`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `veil_of_discord`,
            `soul_ring`,
            `guardian_greaves`,
            `pipe`,
            `blink`,
            `shivas_guard`,
            `ultimate_scepter`,
            `octarine_core`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699916714,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40470,
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
          "special_bonus_attack_speed_100", // 25
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
          "sange_and_yasha",
          "kaya_and_sange",
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699917167,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40471,
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
        steam_guide_link_id: 2715224221,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40472,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699917255,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40473,
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
          late_game: [`aether_lens`, `blink`, `aeon_disk`, `ultimate_scepter`],
          situational: [
            `spirit_vessel`,
            `hand_of_midas`,
            `cyclone`,
            `ghost`,
            `boots_of_bearing`,
            `holy_locket`,
            `guardian_greaves`,
            `pipe`,
            `lotus_orb`,
            `sheepstick`,
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
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2699917391,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40474,
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
          "special_bonus_attack_damage_30", // 11 Talent
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
        all: ["magic_stick", "boots", "wind_lace", "infused_raindrop", "cloak"],
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2700561304,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40475,
        abilities: [
          `disruptor_glimpse`, // 1
          `disruptor_thunder_strike`, // 2
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
            `pavise`,
            `solar_crest`,
            `force_staff`,
            `ultimate_scepter`,
          ],
          late_game: [`blink`, `refresher`, `octarine_core`, `aeon_disk`],
          situational: [
            `guardian_greaves`,
            `aether_lens`,
            `lotus_orb`,
            `aghanims_shard`,
            `boots_of_bearing`,
            `glimmer_cape`,
            `ghost`,
            `cyclone`,
            `sheepstick`,
            `ethereal_blade`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `solar_crest`,
            `force_staff`,
            `ultimate_scepter`,
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
            `panic_button`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2700561417,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40476,
        abilities: [
          `doom_bringer_scorched_earth`, // 1
          `doom_bringer_devour`, // 2
          `doom_bringer_scorched_earth`, // 3
          `doom_bringer_devour`, // 4
          "doom_bringer_scorched_earth", // 5
          "doom_bringer_doom", // 6
          "doom_bringer_scorched_earth", // 7
          `doom_bringer_infernal_blade`, // 8
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
            `gauntlets`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [`vanguard`, `boots`, `magic_wand`, `hand_of_midas`],
          mid_game: [
            `arcane_boots`,
            `blink`,
            `octarine_core`,
            `black_king_bar`,
            `aghanims_shard`,
          ],
          late_game: [
            `travel_boots`,
            `shivas_guard`,
            `refresher`,
            `ultimate_scepter`,
          ],
          situational: [
            `bracer`,
            `phase_boots`,
            `guardian_greaves`,
            `force_staff`,
            `lotus_orb`,
            `pipe`,
            `crimson_guard`,
            "blade_mail",
            "heavens_halberd",
            `invis_sword`,
            `overwhelming_blink`,
            `travel_boots_2`,
          ],
          core: [
            `vanguard`,
            `boots`,
            `hand_of_midas`,
            `arcane_boots`,
            `blink`,
            `octarine_core`,
            `black_king_bar`,
            `shivas_guard`,
            `refresher`,
          ],
          neutral: [
            `arcane_ring`,
            //`pogo_stick`,
            `vambrace`,
            `bullwhip`,
            //`quickening_charm`,
            `cloak_of_flames`,
            "timeless_relic",
            //`spell_prism`,
            "giants_ring",
            //`fallen_sky`,
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
          "sange_and_yasha",
          "kaya_and_sange",
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
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2700561505,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40477,
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
          "special_bonus_hp_400", // 15
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
          situational: [
            "heavens_halberd",
            "silver_edge",
            "mjollnir",
          ],
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
      "dragon_knight_breathe_fire"
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
        core: ["maelstrom", "silver_edge", "sange_and_yasha", "kaya_and_sange"],
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
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2700561590,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40478,
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
            "power_treads",
            "wraith_band",
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
          ],
          core: ["power_treads", "hurricane_pike", "ultimate_scepter", "black_king_bar"],
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
        core: ["assault", "abyssal_blade"],
      },
    },
  },

  earth_spirit: {
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2700561679,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40561,
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
          `special_bonus_unique_earth_spirit_3`, // 25
        ],
        items: {
          starting: [
            "tango",
            `faerie_fire`,
            `blood_grenade`,
            `branches`,
            `branches`,
            "orb_of_venom",
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `urn_of_shadows`,
            "tranquil_boots",
            "magic_wand",
            `infused_raindrop`,
          ],
          mid_game: [
            `veil_of_discord`,
            `spirit_vessel`,
            `aghanims_shard`,
            `black_king_bar`,
          ],
          late_game: [
            `shivas_guard`,
            `blink`,
            `ultimate_scepter`,
            `octarine_core`,
          ],
          situational: [
            `arcane_boots`,
            `pavise`,
            `ghost`,
            `cyclone`,
            `force_staff`,
            `glimmer_cape`,
            `kaya_and_sange`,
            "lotus_orb",
            "heavens_halberd",
            `pipe`,
            `solar_crest`,
            `ethereal_blade`,
            `aeon_disk`,
            `overwhelming_blink`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `urn_of_shadows`,
            `veil_of_discord`,
            `spirit_vessel`,
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
            `craggy_coat`,
            `ceremonial_robe`,
            "timeless_relic",
            `havoc_hammer`,
            `giants_ring`,
            `panic_button`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2700561769,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
        abilities: [
          "earthshaker_fissure", // 1
          "earthshaker_enchant_totem", // 2
          `earthshaker_aftershock`, // 3
          `earthshaker_fissure`, // 4
          `earthshaker_fissure`, // 5
          "earthshaker_echo_slam", // 6
          `earthshaker_fissure`, // 7
          "earthshaker_aftershock", // 8
          `earthshaker_aftershock`, // 9
          `earthshaker_aftershock`, // 10
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
          `special_bonus_unique_earthshaker_5`, // 25
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
          early_game: [`arcane_boots`, "magic_wand", `infused_raindrop`],
          mid_game: ["blink", `aghanims_shard`, `force_staff`, `octarine_core`],
          late_game: [
            `refresher`,
            `ultimate_scepter`,
            `travel_boots`,
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
            `arcane_blink`,
            `cyclone`,
            `ghost`,
            `lotus_orb`,
            `greater_crit`,
            `travel_boots_2`,
          ],
          core: [
            `arcane_boots`,
            `blink`,
            `aghanims_shard`,
            `force_staff`,
            `octarine_core`,
            `refresher`,
            `ultimate_scepter`,
          ],
          neutral: [
            //"pogo_stick",
            `arcane_ring`,
            "philosophers_stone",
            "bullwhip",
            //`quickening_charm`,
            `ceremonial_robe`,
            "timeless_relic",
            //"spell_prism",
            //`fallen_sky`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2700561834,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `tranquil_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `solar_crest`,
            `boots_of_bearing`,
            `force_staff`,
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
            `pavise`,
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
            `force_staff`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `greater_crit`,
            `abyssal_blade`,
          ],
          neutral: [
            `arcane_ring`,
            //`pogo_stick`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2700561902,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
            "veil_of_discord",
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
      "ember_spirit_sleight_of_fist",
      "ember_spirit_searing_chains",
      "ember_spirit_fire_remnant",
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots"],
        support: [],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: ["cyclone", "mekansm", "rod_of_atos"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          //"hood_of_defiance",
          "pipe",
          "eternal_shroud",
          "orchid",
          "black_king_bar",
          "manta",
        ],
      },
      late_game: {
        all: ["sheepstick"],
        support: ["black_king_bar"],
        core: ["abyssal_blade", "butterfly"],
      },
    },
  },

  enchantress: {
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2700561968,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40565,
        abilities: [
          `enchantress_impetus`, // 1
          `enchantress_enchant`, // 2
          "enchantress_enchant", // 3
          `enchantress_natures_attendants`, // 4
          `enchantress_enchant`, // 5
          `enchantress_impetus`, // 6
          `enchantress_impetus`, // 7
          `enchantress_impetus`, // 8
          `enchantress_untouchable`, // 9
          `enchantress_natures_attendants`, // 10
          `enchantress_natures_attendants`, // 11
          "enchantress_untouchable", // 12
          `enchantress_natures_attendants`, // 13
          `enchantress_enchant`, // 14
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
            `power_treads`,
            `magic_wand`,
            `infused_raindrop`,
            `fluffy_hat`,
          ],
          mid_game: [
            `force_staff`,
            `hurricane_pike`,
            `aghanims_shard`,
            `mage_slayer`,
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
            `mage_slayer`,
            `ultimate_scepter`,
            `black_king_bar`,
            `sheepstick`,
          ],
          neutral: [
            "trusty_shovel",
            `seeds_of_serenity`,
            `grove_bow`,
            `pupils_gift`,
            `dandelion_amulet`,
            "enchanted_quiver",
            "spy_gadget",
            `trickster_cloak`,
            `demonicon`,
            `pirate_hat`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2700562081,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40575,
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
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `urn_of_shadows`,
            `wind_lace`,
          ],
          mid_game: [
            `vladmir`,
            `arcane_boots`,
            `blink`,
            `black_king_bar`,
            `guardian_greaves`,
          ],
          late_game: [
            `aghanims_shard`,
            `refresher`,
            `octarine_core`,
            `ultimate_scepter`,
          ],
          situational: [
            `spirit_vessel`,
            `veil_of_discord`,
            `hand_of_midas`,
            `soul_ring`,
            `sphere`,
            `aeon_disk`,
            `invis_sword`,
            `helm_of_the_overlord`,
            `shivas_guard`,
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
            `boots`,
            `vladmir`,
            `arcane_boots`,
            `blink`,
            `black_king_bar`,
            `guardian_greaves`,
            `refresher`,
            `octarine_core`,
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
        steam_guide_link_id: 2712384931,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40576,
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
            `circlet`,
            `branches`,
            `branches`,
            `enchanted_mango`,
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
            `blink`,
            `vladmir`,
            `guardian_greaves`,
            `black_king_bar`,
            `aghanims_shard`,
          ],
          late_game: [
            `refresher`,
            `octarine_core`,
            `ultimate_scepter`,
            `aeon_disk`,
          ],
          situational: [
            `spirit_vessel`,
            `hand_of_midas`,
            `pavise`,
            `solar_crest`,
            `sphere`,
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
            `vladmir`,
            `guardian_greaves`,
            `black_king_bar`,
            `aghanims_shard`,
            `refresher`,
            `octarine_core`,
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
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2700562159,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          mid_game: ["maelstrom", "black_king_bar"],
          late_game: [
            "mjollnir",
            "aghanims_shard",
            "skadi",
            "satanic",
            "butterfly",
            "refresher",
            "greater_crit",
          ],
          situational: [
            "hand_of_midas",
            "sphere",
            "monkey_king_bar",
            "nullifier",
          ],
          core: [
            "power_treads",
            "mask_of_madness",
            "mjollnir",,
            "black_king_bar",
            "aghanims_shard",
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
        support: ["glimmer_cape", "ghost", "force_staff"],
        core: ["hurricane_pike", "black_king_bar", "basher", "manta"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "aeon_disk", "wind_waker"],
        support: [],
        core: ["abyssal_blade", "butterfly"],
      },
    },
  },

  grimstroke: {
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2700562245,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
            "lotus_orb",
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2700562334,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "gyrocopter_homing_missile", // 1
          `gyrocopter_flak_cannon`, // 2
          `gyrocopter_flak_cannon`, // 3
          `gyrocopter_rocket_barrage`, // 4
          "gyrocopter_flak_cannon", // 5
          "gyrocopter_call_down", // 6
          "gyrocopter_flak_cannon", // 7
          `special_bonus_attributes`, // 8
          `special_bonus_attributes`, // 9
          "special_bonus_hp_175", // 10
          `special_bonus_attributes`, // 11
          "gyrocopter_call_down", // 12
          `special_bonus_attributes`, // 13
          `special_bonus_attributes`, // 14
          "special_bonus_unique_gyrocopter_flak_cannon_bonus_damage", // 15
          `special_bonus_attributes`, // 16
          `gyrocopter_homing_missile`, // 17
          "gyrocopter_call_down", // 18
          `gyrocopter_homing_missile`, // 19
          "special_bonus_unique_gyrocopter_2", // 20
          `gyrocopter_homing_missile`, // 21
          `gyrocopter_rocket_barrage`, // 22
          `gyrocopter_rocket_barrage`, // 23
          `gyrocopter_rocket_barrage`, // 24
          "special_bonus_unique_gyrocopter_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "branches",
            `slippers`,
            "circlet",
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
            `hurricane_pike`,
            `monkey_king_bar`,
            `silver_edge`,
            `mjollnir`,
            `sange_and_yasha`,
            `manta`,
            `skadi`,
            `disperser`,
            `sphere`,
            `aghanims_shard`,
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
            `ninja_gear`,
            `apex`,
            `pirate_hat`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2712385902,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
        abilities: [
          "gyrocopter_homing_missile", // 1
          "gyrocopter_rocket_barrage", // 2
          "gyrocopter_rocket_barrage", // 3
          "gyrocopter_homing_missile", // 4
          "gyrocopter_rocket_barrage", // 5
          "gyrocopter_call_down", // 6
          "gyrocopter_rocket_barrage", // 7
          "gyrocopter_homing_missile", // 8
          "gyrocopter_homing_missile", // 9
          "special_bonus_hp_175", // 10
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
            `ring_of_basilius`,
            `blood_grenade`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `tranquil_boots`,
            `magic_wand`,
            `veil_of_discord`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `aghanims_shard`,
            `force_staff`,
            `ethereal_blade`,
            `boots_of_bearing`,
          ],
          late_game: [`octarine_core`, `blink`, `refresher`, `wind_waker`],
          situational: [
            `arcane_boots`,
            `spirit_vessel`,
            `pavise`,
            `glimmer_cape`,
            `aether_lens`,
            `solar_crest`,
            `phylactery`,
            `lotus_orb`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `veil_of_discord`,
            `aghanims_shard`,
            `force_staff`,
            `ethereal_blade`,
            `boots_of_bearing`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `faded_broach`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            //`quickening_charm`,
            `ceremonial_robe`,
            "timeless_relic",
            //`spell_prism`,
            `force_field`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2700562407,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
        abilities: [
          "hoodwink_bushwhack", // 1
          "hoodwink_acorn_shot", // 2
          "hoodwink_bushwhack", // 3
          "hoodwink_scurry", // 4
          "hoodwink_bushwhack", // 5
          "hoodwink_sharpshooter", // 6
          "hoodwink_bushwhack", // 7
          "hoodwink_acorn_shot", // 8
          "hoodwink_acorn_shot", // 9
          "special_bonus_unique_hoodwink_bushwhack_cooldown", // 10
          "hoodwink_acorn_shot", // 11
          "hoodwink_sharpshooter", // 12
          "hoodwink_scurry", // 13
          "hoodwink_scurry", // 14
          `special_bonus_unique_hoodwink_bushwhack_damage`, // 15
          "hoodwink_scurry", // 16
          "special_bonus_attributes", // 17
          "hoodwink_sharpshooter", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_hoodwink_sharpshooter_damage", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_hoodwink_bushwhack_radius`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            "branches",
            "branches",
            "circlet",
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `solar_crest`,
            `blink`,
            `aether_lens`,
            `tranquil_boots`,
            `rod_of_atos`,
          ],
          late_game: [
            `force_staff`,
            `gungir`,
            `ethereal_blade`,
            `ultimate_scepter`,
          ],
          situational: [
            `ring_of_basilius`,
            `veil_of_discord`,
            `spirit_vessel`,
            `maelstrom`,
            `glimmer_cape`,
            `pavise`,
            `mekansm`,
            `ghost`,
            `guardian_greaves`,
            `rod_of_atos`,
            `lotus_orb`,
            `cyclone`,
            `aeon_disk`,
            `octarine_core`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `solar_crest`,
            `blink`,
            `aether_lens`,
            `rod_of_atos`,
            `force_staff`,
            `gungir`,
            `ultimate_scepter`,
          ],
          neutral: [
            `arcane_ring`,
            `mysterious_hat`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            //`quickening_charm`,
            "psychic_headband",
            `timeless_relic`,
            //"spell_prism",
            "seer_stone",
            "book_of_shadows",
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
        core: ["orchid", "black_king_bar", "witch_blade", "revenants_brooch"],
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [
          DOTA_COACH_GUIDE_ROLE.CARRY,
          DOTA_COACH_GUIDE_ROLE.MID,
          DOTA_COACH_GUIDE_ROLE.OFFLANE,
        ],

        steam_guide_link_id: 2700562484,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          `huskar_inner_fire`, // 1
          "huskar_berserkers_blood", // 2
          "huskar_burning_spear", // 3
          `huskar_burning_spear`, // 4
          `huskar_berserkers_blood`, // 5
          "huskar_life_break", // 6
          `huskar_burning_spear`, // 7
          "huskar_berserkers_blood", // 8
          `huskar_berserkers_blood`, // 9
          "huskar_burning_spear", // 10
          "huskar_inner_fire", // 11
          `huskar_life_break`, // 12
          "huskar_inner_fire", // 13
          `huskar_inner_fire`, // 14
          `special_bonus_unique_huskar_3`, // 15
          `special_bonus_unique_huskar_2`, // 16
          "special_bonus_attributes", // 17
          "huskar_life_break", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_huskar_6", // 20
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
          early_game: [`bracer`, `boots`, `magic_wand`, `armlet`],
          mid_game: [
            "sange",
            `black_king_bar`,
            `ultimate_scepter`,
            `travel_boots`,
            `heavens_halberd`,
          ],
          late_game: [`satanic`, `blink`, `aghanims_shard`, `assault`],
          situational: [
            `power_treads`,
            `phase_boots`,
            `mage_slayer`,
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
            `duelist_gloves`,
            `spark_of_courage`,
            "grove_bow",
            `vambrace`,
            "paladin_sword",
            //"titan_sliver",
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        // Midlane Quas Wex Invoker build | If an app user choses to play Invoker on non-mid role, this guide should be suggested over the other one
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "QW",
        steam_guide_link_id: 2700562552,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          `invoker_wex`, // 1
          `invoker_quas`, // 2
          `invoker_wex`, // 3
          `invoker_quas`, // 4
          "invoker_wex", // 5
          "invoker_quas", // 6
          "invoker_wex", // 7
          "invoker_quas", // 8
          "invoker_wex", // 9
          "invoker_exort", // 10
          `invoker_wex`, // 11
          "invoker_exort", // 12
          `invoker_wex`, // 13
          "invoker_exort", // 14
          "invoker_exort", // 15
          "invoker_exort", // 16
          `invoker_exort`, // 17
          `invoker_exort`, // 18
          `special_bonus_unique_invoker_3`, // 19
          `special_bonus_unique_invoker_9`, // 20
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
            `bracer`,
            `boots`,
            `magic_wand`,
            `urn_of_shadows`,
          ],
          mid_game: [
            `spirit_vessel`,
            `hand_of_midas`,
            `travel_boots`,
            `octarine_core`,
            `aghanims_shard`,
          ],
          late_game: [`blink`, `sheepstick`, `ultimate_scepter`, `refresher`],
          situational: [
            `blood_grenade`,
            `falcon_blade`,
            `orchid`,
            `ancient_janggo`,
            `solar_crest`,
            `hurricane_pike`,
            `witch_blade`,
            `cyclone`,
            `revenants_brooch`,
            `black_king_bar`,
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
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `boots`,
            `spirit_vessel`,
            `hand_of_midas`,
            `travel_boots`,
            `octarine_core`,
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
            //`quickening_charm`,
            `timeless_relic`,
            `ninja_gear`,
            //`ex_machina`,
            `apex`,
          ],
        },
      },
      {
        // Midlane Quas Exort Invoker build
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "QE",
        steam_guide_link_id: 2711948373,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          `special_bonus_unique_invoker_9`, // 20
          `special_bonus_unique_invoker_additional_chaos_meteors`, // 21
          `invoker_quas`, // 22
          "invoker_quas", // 23
          "invoker_quas", // 24
          "special_bonus_unique_invoker_2", // 25
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
            `ultimate_scepter`,
            `blink`,
            `octarine_core`,
            `aghanims_shard`,
          ],
          late_game: [
            `black_king_bar`,
            `sheepstick`,
            `refresher`,
            `shivas_guard`,
          ],
          situational: [
            `wraith_band`,
            `power_treads`,
            `falcon_blade`,
            `orchid`,
            `spirit_vessel`,
            `hurricane_pike`,
            `manta`,
            `cyclone`,
            `revenants_brooch`,
            `ethereal_blade`,
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
            `hand_of_midas`,
            `travel_boots`,
            `blink`,
            `octarine_core`,
            `black_king_bar`,
            `sheepstick`,
          ],
          neutral: [
            `unstable_wand`,
            `arcane_ring`,
            `grove_bow`,
            `pupils_gift`,
            `enchanted_quiver`,
            //`quickening_charm`,
            `timeless_relic`,
            `ninja_gear`,
            //`ex_machina`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2699957619,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
            `blood_grenade`,
            `ring_of_regen`,
            `faerie_fire`,
            `branches`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `headdress`,
            `magic_wand`,
            `mekansm`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `holy_locket`,
            `aghanims_shard`,
            `solar_crest`,
            `glimmer_cape`,
          ],
          late_game: [`lotus_orb`, `heart`, `desolator`, `ultimate_scepter`],
          situational: [
            `bottle`,
            `spirit_vessel`,
            `pavise`,
            `cyclone`,
            `force_staff`,
            `ghost`,
            `vladmir`,
            `pipe`,
            `heavens_halberd`,
            `helm_of_the_overlord`,
            `boots_of_bearing`,
          ],
          core: [
            `mekansm`,
            `holy_locket`,
            "aghanims_shard",
            `solar_crest`,
            `glimmer_cape`,
            `heart`,
          ],
          neutral: [
            `trusty_shovel`,
            `seeds_of_serenity`,
            "philosophers_stone",
            `bullwhip`,
            `dandelion_amulet`,
            `ogre_seal_totem`,
            "ascetic_cap",
            `trickster_cloak`,
            "book_of_shadows",
            `force_field`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699957843,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40566,
        abilities: [
          "jakiro_dual_breath", // 1
          "jakiro_liquid_fire", // 2
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
          "jakiro_liquid_fire", // 13
          "jakiro_liquid_fire", // 14
          "jakiro_liquid_fire", // 15
          "special_bonus_hp_325", // 16
          "special_bonus_attributes", // 17
          "jakiro_macropyre", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_jakiro_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_jakiro_2`, // 25
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
            `octarine_core`,
            `refresher`,
            `ethereal_blade`,
            `aeon_disk`,
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
            `wind_waker`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `cyclone`,
            `force_staff`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `octarine_core`,
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
      "jakiro_liquid_fire",
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
        support: ["headdress"],
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
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699957943,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
            "aghanims_shard",
            "skadi",
            "swift_blink",
          ],
          situational: [
            "maelstrom",
            `mjollnir`,
            `diffusal_blade`,
            `sange_and_yasha`,
            `black_king_bar`,
            `monkey_king_bar`,
            `nullifier`,
            "aghanims_shard",
          ],
          core: [
            `phase_boots`,
            `bfury`,
            `manta`,
            `blink`,
            "ultimate_scepter",
          ],
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
        core: ["crimson_guard", "basher", "invis_sword", "manta"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "aeon_disk", "wind_waker"],
        support: [],
        core: ["abyssal_blade", "silver_edge", "assault", "butterfly"],
      },
    },
  },

  // YoonA plays hero
  keeper_of_the_light: {
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699958059,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40563,
        abilities: [
          `keeper_of_the_light_blinding_light`, // 1  "keeper_of_the_light_radiant_bind" equals to `solar bind`
          `keeper_of_the_light_chakra_magic`, // 2
          `keeper_of_the_light_illuminate`, // 3
          `keeper_of_the_light_illuminate`, // 4
          `keeper_of_the_light_chakra_magic`, // 5
          "keeper_of_the_light_spirit_form", // 6
          `keeper_of_the_light_illuminate`, // 7
          `keeper_of_the_light_illuminate`, // 8
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
          `special_bonus_unique_keeper_of_the_light_14`, // 25
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
            `pavise`,
            `solar_crest`,
            `force_staff`,
            `glimmer_cape`,
            `aghanims_shard`,
          ],
          late_game: [
            `ultimate_scepter`,
            `sheepstick`,
            `ethereal_blade`,
            `dagon_5`,
          ],
          situational: [
            `veil_of_discord`,
            `aether_lens`,
            `ghost`,
            `octarine_core`,
            "lotus_orb",
            "blink",
            `cyclone`,
            `aeon_disk`,
            `refresher`,
            "travel_boots",
          ],
          core: [
            `tranquil_boots`,
            `spirit_vessel`,
            `solar_crest`,
            `force_staff`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `sheepstick`,
            `ethereal_blade`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2699958147,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          "kunkka_torrent", // 11
          "kunkka_ghostship", // 12
          "kunkka_torrent", // 13
          "special_bonus_unique_kunkka_tidebringer_slow", // 14
          `special_bonus_attack_damage_45`, // 15
          "kunkka_torrent", // 16
          "special_bonus_attributes", // 17
          "kunkka_ghostship", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_kunkka_4", // 20
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
            `branches`,
            "tango",
            `ward_observer`,
          ],
          early_game: ["bottle", "bracer", "magic_wand", "phase_boots"],
          mid_game: [`armlet`, "silver_edge", `black_king_bar`],
          late_game: [
            "assault",
            "satanic",
            `bloodthorn`,
            "sheepstick",
            "travel_boots",
          ],
          situational: [
            "orchid",
            `heavens_halberd`,
            `blink`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `greater_crit`,
            `sheepstick`,
            "rapier",
          ],
          core: [`armlet`, `phase_boots`, "black_king_bar", `silver_edge`],
          neutral: [
            "broom_handle",
            `unstable_wand`,
            "vambrace",
            "orb_of_destruction",
            //`dagger_of_ristul`,
            //"titan_sliver",
            `paladin_sword`,
            //`heavy_blade`,
            "mind_breaker",
            //`penta_edged_sword`,
            "desolator_2",
            //`ex_machina`,
            "pirate_hat",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2715010750,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
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
          `special_bonus_unique_kunkka_tidebringer_slow`, // 11
          "kunkka_ghostship", // 12
          "kunkka_torrent", // 13
          "kunkka_torrent", // 14
          `kunkka_torrent`, // 15
          `special_bonus_unique_kunkka_7`, // 16
          "special_bonus_attributes", // 17
          "kunkka_ghostship", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_kunkka_4", // 20
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
          early_game: ["bracer", "phase_boots", "vanguard", `magic_wand`],
          mid_game: ["blade_mail", "crimson_guard", `aghanims_shard`],
          late_game: [
            "black_king_bar",
            "ultimate_scepter",
            `assault`,
            `refresher`,
            `overwhelming_blink`,
            `sheepstick`,
            "heart",
          ],
          situational: [
            `heavens_halberd`,
            "pipe",
            `armlet`,
            `silver_edge`,
            `bloodthorn`,
            `shivas_guard`,
            `travel_boots`,
            "lotus_orb",
          ],
          core: [
            "phase_boots",
            `blade_mail`,
            `crimson_guard`,
            "black_king_bar",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          neutral: [
            `broom_handle`,
            `unstable_wand`,
            `vambrace`,
            "orb_of_destruction",
            //`dagger_of_ristul`,
            //`titan_sliver`,
            `defiant_shell`,
            //`heavy_blade`,
            `havoc_hammer`,
            //"spell_prism",
            `giants_ring`,
            //`ex_machina`,
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
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2301488685,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
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
          early_game: [
            `bracer`,
            `phase_boots`,
            "soul_ring",
            `magic_wand`,
          ],
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
        core: ["heavens_halberd", "sange_and_yasha", "kaya_and_sange"],
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2699958372,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "leshrac_lightning_storm", // 1
          "leshrac_split_earth", // 2
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
          "special_bonus_unique_leshrac_5", // 14
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
          early_game: ["bottle", "arcane_boots", "magic_wand"],
          mid_game: ["bloodstone", "cyclone", "kaya", "travel_boots", "blink"],
          late_game: [
            "kaya_and_sange",
            "black_king_bar",
            "aghanims_shard",
            "shivas_guard",
            "sheepstick",
            "ethereal_blade",
            "overwhelming_blink",
            "wind_waker",
          ],
          situational: ["ultimate_scepter", "sphere", "ghost", "aeon_disk"],
          core: [
            "travel_boots",
            "bloodstone",
            "cyclone",
            "kaya_and_sange",
            "black_king_bar",
            "blink",
          ],
          neutral: [
            "mysterious_hat",
            "occult_bracelet",
            //"pogo_stick",
            "vambrace",
            "vampire_fangs",
            "gossamer_cape",
            //"black_powder_bag",
            "ceremonial_robe",
            "dandelion_amulet",
            //"spell_prism",
            "timeless_relic",
            "stormcrafter",
            "force_field",
            //`ex_machina`,
            //`fallen_sky`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699958474,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40568,
        abilities: [
          "lich_frost_nova", // 1
          "lich_frost_shield", // 2
          "lich_frost_nova", // 3
          "lich_sinister_gaze", // 4
          `lich_frost_shield`, // 5
          "lich_chain_frost", // 6
          "lich_frost_shield", // 7
          "lich_frost_shield", // 8
          `lich_sinister_gaze`, // 9
          `lich_sinister_gaze`, // 10
          "lich_sinister_gaze", // 11
          "lich_chain_frost", // 12
          `lich_frost_nova`, // 13
          `lich_frost_nova`, // 14
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
          "special_bonus_unique_lich_1", // 25
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
            `clarity`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `tranquil_boots`,
            "magic_wand",
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `pavise`,
            `solar_crest`,
            `aether_lens`,
            `aghanims_shard`,
            `glimmer_cape`,
            `force_staff`,
          ],
          late_game: [
            `ultimate_scepter`,
            `boots_of_bearing`,
            `octarine_core`,
            `aeon_disk`,
          ],
          situational: [
            `arcane_boots`,
            `ghost`,
            `phylactery`,
            `sheepstick`,
            `lotus_orb`,
            `refresher`,
            "blink",
            `cyclone`,
            `ethereal_blade`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `solar_crest`,
            `aether_lens`,
            `aghanims_shard`,
            `glimmer_cape`,
            `force_staff`,
            `ultimate_scepter`,
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
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699958609,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          "special_bonus_unique_lifestealer_2"", // 15
          "special_bonus_attack_damage_30", // 16
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
          early_game: ["bracer", "phase_boots", "magic_wand", "orb_of_corrosion", "armlet"],
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
          core: ["phase_boots", "armlet", "desolator", "blink, "basher", "assault", "aghanims_shard", "skadi"],
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
    combo: [
      "armlet",
      "life_stealer_rage",
      "blink",
      "attack",
      "phase_boots"
    ],
    counter_items: {
      laning_phase: {
        all: ["wind_lace", "boots", "armor"],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: ["glimmer_cape", "force_staff", "ghost"],
        core: ["crimson_guard", "orchid", "basher"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade"],
        support: [],
        core: [
          "abyssal_blade",
          "monkey_king_bar",
          "bloodthorn",
          "skadi",
          "shivas_guard",
          "assault",
          "butterfly",
        ],
      },
    },
  },

  // eidendota plays hero
  lina: {
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link_id: 2699958714,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40542,
        abilities: [
          "lina_dragon_slave", // 1
          "lina_fiery_soul", // 2
          "lina_dragon_slave", // 3
          "lina_light_strike_array", // 4
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
          `special_bonus_hp_325`, // 15
          `lina_light_strike_array`, // 16
          "special_bonus_attributes", // 17
          "lina_laguna_blade", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_lina_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_lina_dragon_slave_crits`, // 25
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
            `falcon_blade`,
            `wind_lace`,
          ],
          mid_game: [`maelstrom`, `travel_boots`, `gungir`, `black_king_bar`],
          late_game: [
            `hurricane_pike`,
            `greater_crit`,
            `satanic`,
            `swift_blink`,
          ],
          situational: [
            `null_talisman`,
            `arcane_boots`,
            `blink`,
            `aether_lens`,
            `kaya_and_sange`,
            `ghost`,
            `cyclone`,
            `dagon_5`,
            `octarine_core`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `sphere`,
            `aeon_disk`,
            `silver_edge`,
            `monkey_king_bar`,
            `bloodthorn`,
            `nullifier`,
            `sheepstick`,
            `revenants_brooch`,
            `refresher`,
            `travel_boots_2`,
          ],
          core: [
            `bottle`,
            `boots`,
            `falcon_blade`,
            `maelstrom`,
            `travel_boots`,
            `gungir`,
            `black_king_bar`,
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

        steam_guide_link_id: 2715221904,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
        abilities: [
          "lina_light_strike_array", // 1
          "lina_fiery_soul", // 2
          "lina_dragon_slave", // 3
          "lina_dragon_slave", // 4
          "lina_dragon_slave", // 5
          "lina_laguna_blade", // 6
          "lina_dragon_slave", // 7
          "lina_light_strike_array", // 8
          "lina_light_strike_array", // 9
          "lina_light_strike_array", // 10
          "special_bonus_unique_lina_1", // 11
          "lina_laguna_blade", // 12
          "lina_fiery_soul", // 13
          "lina_fiery_soul", // 14
          "special_bonus_unique_lina_3", // 15
          "lina_fiery_soul", // 16
          "special_bonus_attributes", // 17
          "lina_laguna_blade", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_lina_supercharge_stacks`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_lina_6`, // 25
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
            `aghanims_shard`,
            `ultimate_scepter`,
            `ethereal_blade`,
            `sheepstick`,
          ],
          situational: [
            `glimmer_cape`,
            `black_king_bar`,
            `lotus_orb`,
            `ghost`,
            `wind_waker`,
            `gungir`,
            `octarine_core`,
            `aeon_disk`,
            `refresher`,
            `revenants_brooch`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            "cyclone",
            `blink`,
            `force_staff`,
            `aghanims_shard`,
            `ultimate_scepter`,
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
          "black_king_bar",
          "mage_slayer",
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699958831,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40582,
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
          `special_bonus_unique_lion_6`, // 11
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
            `boots_of_bearing`,
            `lotus_orb`,
            `cyclone`,
            `black_king_bar`,
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
            `whisper_of_the_dread`,
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
          "sange_and_yasha",
          "kaya_and_sange",
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2699958939,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          "special_bonus_unique_lone_druid_8", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lone_druid_10", // 25
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
            `power_treads`,
            `diffusal_blade`,
            `echo_sabre`,
            `harpoon`,
            `basher`,
            `assault`,
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
            `orb_of_corrosion`,
            "hand_of_midas",
            `mask_of_madness`,
            `desolator`,
            `maelstrom`,
            `aghanims_shard`,
            "monkey_king_bar",
            "mjollnir",
            "black_king_bar",
            `radiance`,
            `butterfly`,
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
            "orb_of_destruction",
            `defiant_shell`,
            "paladin_sword",
            //"penta_edged_sword",
            "mind_breaker",
            "desolator_2",
            `apex`,
          ],
          neutral: [
            "unstable_wand",
            "trusty_shovel",
            //"ring_of_aquila",
            "philosophers_stone",
            `defiant_shell`,
            `ogre_seal_totem`,
            "trickster_cloak",
            "ascetic_cap",
            "book_of_shadows",
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
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699959031,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40534,
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
          "special_bonus_unique_luna_2", // 15
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

    combo: [`black_king_bar`, `eclipse`, `blink`, `manta`, `lucent_beam`],

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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2699959154,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
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
            `magic_wand`,
            "helm_of_the_dominator",
            `vladmir`,
            `helm_of_the_overlord`,
          ],
          mid_game: [`ancient_janggo`, `assault`, `aghanims_shard`, `harpoon`],
          late_game: [
            "ultimate_scepter",
            "sheepstick",
            `nullifier`,
            `black_king_bar`,
          ],
          situational: [
            `ring_of_basilius`,
            `power_treads`,
            `solar_crest`,
            `echo_sabre`,
            `orchid`,
            `boots_of_bearing`,
            `manta`,
            "heavens_halberd",
            `sphere`,
            `skadi`,
            `abyssal_blade`,
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
            "occult_bracelet",
            `pupils_gift`,
            //"ring_of_aquila",
            `elven_tunic`,
            //"titan_sliver",
            `mind_breaker`,
            //"penta_edged_sword",
            "demonicon",
            "desolator_2",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2716646867,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "lycan_summon_wolves", // 1
          "lycan_feral_impulse", // 2
          "lycan_summon_wolves", // 3
          "lycan_feral_impulse", // 4
          "lycan_summon_wolves", // 5
          "lycan_shapeshift", // 6
          "lycan_summon_wolves", // 7
          "lycan_feral_impulse", // 8
          "lycan_feral_impulse", // 9
          "lycan_howl", // 10
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
          mid_game: [`harpoon`, `manta`, `aghanims_shard`, `sphere`],
          late_game: [
            "ultimate_scepter",
            `black_king_bar`,
            `assault`,
            `abyssal_blade`,
            `satanic`,
          ],
          situational: [
            `ring_of_basilius`,
            `helm_of_the_overlord`,
            `vladmir`,
            `orchid`,
            `skadi`,
            `sheepstick`,
            `heavens_halberd`,
            `bloodthorn`,
            `nullifier`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            `echo_sabre`,
            `harpoon`,
            `manta`,
            `sphere`,
            `assault`,
            `abyssal_blade`,
          ],
          neutral: [
            "broom_handle",
            "occult_bracelet",
            `pupils_gift`,
            "orb_of_destruction",
            `elven_tunic`,
            //"titan_sliver",
            "mind_breaker",
            //"penta_edged_sword",
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2699959287,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40535,
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
            `echo_sabre`,
            `blink`,
            `harpoon`,
            `black_king_bar`,
            `aghanims_shard`,
          ],
          late_game: [
            `octarine_core`,
            `refresher`,
            `ultimate_scepter`,
            `sphere`,
          ],
          situational: [
            `arcane_boots`,
            `vanguard`,
            `pipe`,
            `aether_lens`,
            `force_staff`,
            `solar_crest`,
            `crimson_guard`,
            `guardian_greaves`,
            `silver_edge`,
            `manta`,
            `heavens_halberd`,
            `cyclone`,
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
            `echo_sabre`,
            `blink`,
            `harpoon`,
            `black_king_bar`,
            `octarine_core`,
            "refresher",
          ],
          neutral: [
            `unstable_wand`,
            "arcane_ring",
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
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2716646936,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40536,
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
            `octarine_core`,
            `refresher`,
            `sphere`,
            `ultimate_scepter`,
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
            `octarine_core`,
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
        steam_guide_link_id: 2716647043,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40537,
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
            `octarine_core`,
            `refresher`,
            `aeon_disk`,
          ],
          situational: [
            `glimmer_cape`,
            `ghost`,
            `pipe`,
            `guardian_greaves`,
            `cyclone`,
            `solar_crest`,
            `lotus_orb`,
            `assault`,
            `invis_sword`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "blink",
            `force_staff`,
            `aether_lens`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `octarine_core`,
            `refresher`,
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
        core: ["sange_and_yasha", "kaya_and_sange"],
      },
      late_game: {
        all: ["sheepstick", "aeon_disk", "ethereal_blade", "wind_waker"],
        support: [],
        core: ["abyssal_blade", "assault", "butterfly"],
      },
    },
  },

  marci: {
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699959380,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40538,
        abilities: [
          `marci_grapple`, // 1	equals to rebound
          `marci_companion_run`, // 2	 equals to dispose
          "marci_companion_run", // 3
          `marci_guardian`, // 4  equals to sidekick
          `marci_companion_run`, // 5
          "marci_unleash", // 6
          `marci_companion_run`, // 7
          `marci_guardian`, // 8
          `marci_guardian`, // 9
          `marci_guardian`, // 10
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
          `special_bonus_unique_marci_guardian_damage`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `circlet`,
            `blood_grenade`,
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
          mid_game: [
            `pavise`,
            `solar_crest`,
            `black_king_bar`,
            `aghanims_shard`,
            `basher`,
            `blink`,
          ],
          late_game: [
            `ultimate_scepter`,
            `abyssal_blade`,
            `greater_crit`,
            `overwhelming_blink`,
          ],
          situational: [
            `soul_ring`,
            `orb_of_corrosion`,
            `spirit_vessel`,
            `pavise`,
            `force_staff`,
            `heavens_halberd`,
            `monkey_king_bar`,
            `pipe`,
            `lotus_orb`,
            `cyclone`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `solar_crest`,
            `black_king_bar`,
            `aghanims_shard`,
            `basher`,
            `blink`,
            `ultimate_scepter`,
            `abyssal_blade`,
          ],
          neutral: [
            `unstable_wand`,
            `arcane_ring`,
            `vambrace`,
            `pupils_gift`,
            `cloak_of_flames`,
            `paladin_sword`,
            `mind_breaker`,
            `ninja_gear`,
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
        steam_guide_link_id: 2716647152,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40539,
        abilities: [
          "marci_grapple", // 1	equals to dispose
          `marci_companion_run`, // 2	equals to rebound
          `marci_guardian`, // 3  equals to sidekick
          `marci_companion_run`, // 4
          `marci_guardian`, // 5
          "marci_unleash", // 6
          `marci_companion_run`, // 7
          `marci_companion_run`, // 8
          `marci_guardian`, // 9
          `marci_guardian`, // 10
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
          `special_bonus_unique_marci_guardian_damage`, // 25
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
            `ultimate_scepter`,
            `black_king_bar`,
            `basher`,
            `aghanims_shard`,
            `blink`,
          ],
          late_game: [
            "greater_crit",
            "abyssal_blade",
            `satanic`,
            `overwhelming_blink`,
          ],
          situational: [
            `vanguard`,
            `spirit_vessel`,
            `armlet`,
            `orb_of_corrosion`,
            `power_treads`,
            `heavens_halberd`,
            `diffusal_blade`,
            `manta`,
            `silver_edge`,
            `monkey_king_bar`,
            `nullifier`,
            `bloodthorn`,
            `harpoon`,
            `skadi`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `ultimate_scepter`,
            `black_king_bar`,
            `basher`,
            `aghanims_shard`,
            `blink`,
            `greater_crit`,
            `abyssal_blade`,
          ],
          neutral: [
            `broom_handle`,
            `unstable_wand`,
            `vambrace`,
            `pupils_gift`,
            `paladin_sword`,
            `cloak_of_flames`,
            `ninja_gear`,
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
      `marci_guardian`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2699959474,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40540,
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
            `shivas_guard`,
            `aghanims_shard`,
          ],
          late_game: [
            `sheepstick`,
            `refresher`,
            `octarine_core`,
            `overwhelming_blink`,
          ],
          situational: [
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
            `heart`,
            `sphere`,
            `assault`,
            `satanic`,
            `greater_crit`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `phase_boots`,
            `soul_ring`,
            `blink`,
            `black_king_bar`,
            `shivas_guard`,
            `aghanims_shard`,
            `sheepstick`,
            `refresher`,
          ],
          neutral: [
            `occult_bracelet`,
            `arcane_ring`,
            `bullwhip`,
            `dragon_scale`,
            `ceremonial_robe`,
            "cloak_of_flames",
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_link_id: 2699959648,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40541,
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
          `special_bonus_unique_medusa_7`, // 14
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
          starting: [
            "tango",
            "quelling_blade",
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            `power_treads`,
            `ring_of_basilius`,
            `magic_wand`,
            `yasha`,
            `wind_lace`,
          ],
          mid_game: [
            `manta`,
            `dragon_lance`,
            `butterfly`,
            `disperser`,
            `skadi`,
          ],
          late_game: [`greater_crit`, `sheepstick`, `swift_blink`, `rapier`],
          situational: [
            `falcon_blade`,
            `mask_of_madness`,
            `phylactery`,
            `angels_demise`,
            `devastator`,
            `sange_and_yasha`,
            `black_king_bar`,
            `blink`,
            `sphere`,
            "monkey_king_bar",
            `silver_edge`,
            `mjollnir`,
            `hurricane_pike`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `travel_boots`,
          ],
          core: [
            `power_treads`,
            `manta`,
            `dragon_lance`,
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
            `ninja_gear`,
            `mind_breaker`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699959764,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          `meepo_ransack`, // 1
          `meepo_poof`, // 2
          `meepo_earthbind`, // 3
          "meepo_divided_we_stand", // 4
          "meepo_poof", // 5
          `meepo_poof`, // 6
          "meepo_poof", // 7
          `meepo_ransack`, // 8
          `meepo_ransack`, // 9
          `special_bonus_unique_meepo_2`, // 10
          "meepo_divided_we_stand", // 11
          `meepo_ransack`, // 12
          "meepo_earthbind", // 13
          `meepo_earthbind`, // 14
          `special_bonus_evasion_15`, // 15
          `meepo_earthbind`, // 16
          "special_bonus_attributes", // 17
          "meepo_divided_we_stand", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_meepo_4`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_meepo_5", // 25
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
            `dragon_lance`,
          ],
          mid_game: [
            `diffusal_blade`,
            `blink`,
            `ultimate_scepter`,
            `skadi`,
            `aghanims_shard`,
          ],
          late_game: [`sheepstick`, `swift_blink`, `assault`, `heart`],
          situational: [
            `disperser`,
            `silver_edge`,
            `manta`,
            `overwhelming_blink`,
            `ethereal_blade`,
            `bloodthorn`,
            `butterfly`,
            `hurricane_pike`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            "dragon_lance",
            `diffusal_blade`,
            `blink`,
            `ultimate_scepter`,
            `skadi`,
            `aghanims_shard`,
            `sheepstick`,
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

    combo: [`meepo_poof`, `blink`, `meepo_earthbind`, `attack`],
    counter_items: {
      laning_phase: {
        all: [],
        support: ["ward_sentry"],
        core: [],
      },
      mid_game: {
        all: ["spirit_vessel", "crimson_guard"],
        support: ["ward_dispenser", "force_staff"],
        core: ["crimson_guard", "hurricane_pike", "black_king_bar", "manta"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "aeon_disk"],
        support: ["black_king_bar"],
        core: [
          "mjollnir",
          "abyssal_blade",
          "bloodthorn",
          "butterfly",
          "assault",
        ],
      },
    },
  },

  mirana: {
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699959872,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40591,
        abilities: [
          "mirana_arrow", // 1
          "mirana_leap", // 2
          "mirana_starfall", // 3
          "mirana_starfall", // 4
          "mirana_starfall", // 5
          "mirana_invis", // 6
          "mirana_starfall", // 7
          "mirana_arrow", // 8
          "mirana_arrow", // 9
          "mirana_arrow", // 10
          "special_bonus_unique_mirana_3", // 11
          "mirana_invis", // 12
          "mirana_leap", // 13
          "mirana_leap", // 14
          "special_bonus_unique_mirana_5", // 15
          "mirana_leap", // 16
          "special_bonus_attributes", // 17
          "mirana_invis", // 18
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
            "circlet",
            `blood_grenade`,
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
            `force_staff`,
          ],
          late_game: [`sheepstick`, `gungir`, `ultimate_scepter`, `bloodthorn`],
          situational: [
            `wraith_band`,
            `power_treads`,
            `rod_of_atos`,
            `pavise`,
            `solar_crest`,
            `heavens_halberd`,
            `pipe`,
            `boots_of_bearing`,
            `orchid`,
            `blink`,
            `ghost`,
            `aghanims_shard`,
            `octarine_core`,
            `aeon_disk`,
            `lotus_orb`,
            `travel_boots`,
          ],
          core: [
            `boots`,
            `spirit_vessel`,
            `arcane_boots`,
            `cyclone`,
            `guardian_greaves`,
            `force_staff`,
            `sheepstick`,
            `gungir`,
          ],
          neutral: [
            `unstable_wand`,
            `arcane_ring`,
            `vambrace`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699960030,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
            "branches",
            "circlet",
            "slippers",
          ],
          early_game: [
            "wraith_band",
            "power_treads",
            "magic_wand",
            "orb_of_corrosion",
          ],
          mid_game: ["maelstrom", "echo_sabre", "black_king_bar", "harpoon"],
          late_game: [
            "manta",
            "mjollnir",
            "skadi",
            "abyssal_blade",
            "satanic",
            "ultimate_scepter",
          ],
          situational: [
            "hand_of_midas",
            "bfury",
            "infused_raindrop",
            "greater_crit",
            "aghanims_shard",
            "silver_edge",
            "monkey_king_bar",
            "nullifier",
            "butterfly",
            "radiance",
            "sange_and_yasha",
            "sphere",
          ],
          core: [
            "maelstrom",
            "harpoon",
            "black_king_bar",
            "ultimate_scepter",
            "skadi",
            "abyssal_blade",
          ],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "broom_handle",
            "lance_of_pursuit",
            //"misericorde",
            //"ring_of_aquila",
            "orb_of_destruction",
            //"titan_sliver",
            "elven_tunic",
            "mind_breaker",
            //"penta_edged_sword",
            "desolator_2",
            "apex",
            //`ex_machina`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2718158708,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
            "branches",
            "branches",
            "branches",
            "ward_sentry",
          ],
          early_game: ["orb_of_corrosion", "power_treads", "magic_wand"],
          mid_game: ["solar_crest", "echo_sabre", "black_king_bar"],
          late_game: ["harpoon", "skadi", "basher", "sheepstick"],
          situational: [
            "gungir",
            "spirit_vessel",
            "heavens_halberd",
            "cyclone",
            "hand_of_midas",
            "diffusal_blade",
            "force_staff",
            "heavens_halberd",
            "boots_of_bearing",
            "orchid",
          ],
          core: [
            "orb_of_corrosion",
            "echo_sabre",
            "solar_crest",
            "black_king_bar",
          ],
          neutral: [
            "broom_handle",
            "duelist_gloves",
            "orb_of_destruction",
            //"ring_of_aquila",
            "elven_tunic",
            //"titan_sliver",
            //"black_powder_bag",
            "mind_breaker",
            //"penta_edged_sword",
            //"heavy_blade",
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2699960135,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
            "yasha",
          ],
          mid_game: ["manta", "skadi", "black_king_bar"],
          late_game: ["silver_edge", "butterfly", "satanic", "travel_boots"],
          situational: [
            "bottle",
            "hand_of_midas",
            "greater_crit",
            "sphere",
            "hurricane_pike",
            "sange_and_yasha",
            "ultimate_scepter",
            "monkey_king_bar",
          ],
          core: ["manta", "skadi", "butterfly", "satanic", "black_king_bar"],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "occult_bracelet",
            "unstable_wand",
            "specialists_array",
            //"dagger_of_ristul", Removed in 7.33
            "grove_bow",
            //"ring_of_aquila",
            //"titan_sliver",
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2943493038,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          `special_bonus_strength_8`, // 11
          "muerta_pierce_the_veil", // 12
          `muerta_the_calling`, // 13
          `muerta_the_calling`, // 14
          "special_bonus_attack_damage_35", // 15
          `muerta_the_calling`, // 16
          "special_bonus_attributes", // 17
          "muerta_pierce_the_veil", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_muerta_gunslinger_double_shot_chance`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_magic_resistance_25`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `quelling_blade`,
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
          ],
          early_game: [
            `power_treads`,
            `mask_of_madness`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `maelstrom`,
            `hurricane_pike`,
            `manta`,
            `mjollnir`,
            `aghanims_shard`,
          ],
          late_game: [
            `black_king_bar`,
            `greater_crit`,
            `sheepstick`,
            `swift_blink`,
          ],
          situational: [
            `hand_of_midas`,
            `falcon_blade`,
            `witch_blade`,
            `yasha_and_kaya`,
            `skadi`,
            `blink`,
            `ethereal_blade`,
            "monkey_king_bar",
            `sphere`,
            "satanic",
            `ultimate_scepter`,
            `gungir`,
            `silver_edge`,
            `mage_slayer`,
            `bloodthorn`,
            `moon_shard`,
            `revenants_brooch`,
            `travel_boots`,
          ],
          core: [
            `power_treads`,
            `mask_of_madness`,
            `maelstrom`,
            `hurricane_pike`,
            `manta`,
            `mjollnir`,
            `black_king_bar`,
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
            `desolator_2`,
            `pirate_hat`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2943887000,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
          `special_bonus_unique_muerta_dead_shot_damage`, // 10
          `muerta_gunslinger`, // 11
          "muerta_pierce_the_veil", // 12
          `muerta_gunslinger`, // 13
          `muerta_gunslinger`, // 14
          `special_bonus_attack_damage_35`, // 15
          `muerta_gunslinger`, // 16
          "special_bonus_attributes", // 17
          "muerta_pierce_the_veil", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_muerta_dead_shot_charges", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_magic_resistance_25`, // 25
        ],
        items: {
          starting: [
            `tango`,
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
            `arcane_boots`,
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `rod_of_atos`,
            `aether_lens`,
            `power_treads`,
            `hurricane_pike`,
          ],
          late_game: [`blink`, `octarine_core`, `ultimate_scepter`, `gungir`],
          situational: [
            `guardian_greaves`,
            `veil_of_discord`,
            `spirit_vessel`,
            `glimmer_cape`,
            `force_staff`,
            `pavise`,
            `lotus_orb`,
            `ethereal_blade`,
            `cyclone`,
            `pipe`,
            `aeon_disk`,
            `black_king_bar`,
            `sheepstick`,
            `bloodthorn`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `rod_of_atos`,
            `aether_lens`,
            `hurricane_pike`,
            `blink`,
            `octarine_core`,
            `ultimate_scepter`,
          ],
          neutral: [
            `mysterious_hat`,
            `faded_broach`,
            `bullwhip`,
            `grove_bow`,
            //`quickening_charm`,
            `ceremonial_robe`,
            `spy_gadget`,
            `timeless_relic`,
            `force_field`,
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
    combo: [`muerta_dead_shot`, `muerta_the_calling`, `muerta_pierce_the_veil`],
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699960208,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "naga_siren_mirror_image", // 1
          "naga_siren_rip_tide", // 2
          "naga_siren_mirror_image", // 3
          "naga_siren_ensnare", // 4
          "naga_siren_mirror_image", // 5
          "naga_siren_rip_tide", // 6
          "naga_siren_mirror_image", // 7
          "naga_siren_rip_tide", // 8
          "naga_siren_rip_tide", // 9
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
            "skadi",
            "bloodthorn",
            "sheepstick",
            "travel_boots",
          ],
          situational: [
            "infused_raindrop",
            "hand_of_midas",
            "diffusal_blade",
            "black_king_bar",
            "silver_edge",
            "nullifier",
            "ultimate_scepter",
            "abyssal_blade",
            "sphere",
          ],
          core: ["manta", "orchid", "heart", "butterfly"],
          neutral: [
            //"possessed_mask", Removed in 7.33
            "unstable_wand",
            "occult_bracelet",
            //"ring_of_aquila",
            "pupils_gift",
            "elven_tunic",
            //"titan_sliver",
            "mind_breaker",
            "ninja_gear",
            //"penta_edged_sword",
            "apex",
            //`fallen_sky`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2699960338,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
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
          "special_bonus_unique_furion_teleportation_max_stacks", // 15
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
            `blight_stone`,
            "branches",
            "branches",
            "branches",
            "branches",
            `ward_observer`,
          ],
          early_game: [
            `power_treads`,
            `magic_wand`,
            `wind_lace`,
            `solar_crest`,
          ],
          mid_game: [`ultimate_scepter`, `orchid`, `aghanims_shard`, `gungir`],
          late_game: [`black_king_bar`, `sheepstick`, `assault`, `satanic`],
          situational: [
            "infused_raindrop",
            `wraith_band`,
            `spirit_vessel`,
            `hand_of_midas`,
            `maelstrom`,
            `heavens_halberd`,
            `blade_mail`,
            `rod_of_atos`,
            `mjollnir`,
            `witch_blade`,
            `blink`,
            `silver_edge`,
            `hurricane_pike`,
            `monkey_king_bar`,
            `nullifier`,
            `bloodthorn`,
            `sphere`,
          ],
          core: [
            "power_treads",
            `solar_crest`,
            "ultimate_scepter",
            `orchid`,
            `aghanims_shard`,
            `gungir`,
            `sheepstick`,
            `assault`,
          ],
          neutral: [
            `duelist_gloves`,
            "lance_of_pursuit",
            `orb_of_destruction`,
            "grove_bow",
            `elven_tunic`,
            "enchanted_quiver",
            `trickster_cloak`,
            "mind_breaker",
            `desolator_2`,
            "pirate_hat",
          ],
        },
        // item_tooltips:
        /* ancient_janggo:
            "If you are fighting and grouping a lot early on. The buff works on summons.", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2718666197,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          `furion_sprout`, // 1
          "furion_teleportation", // 2
          `furion_sprout`, // 3
          `furion_teleportation`, // 4
          `furion_teleportation`, // 5
          "furion_wrath_of_nature", // 6
          `furion_teleportation`, // 7
          `furion_force_of_nature`, // 8
          `furion_sprout`, // 9
          `furion_sprout`, // 10
          `special_bonus_unique_furion_5`, // 11
          "furion_wrath_of_nature", // 12
          `furion_force_of_nature`, // 13
          `furion_force_of_nature`, // 14
          "special_bonus_unique_furion_teleportation_max_stacks", // 15
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
            `blight_stone`,
            "branches",
            "branches",
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `magic_wand`,
            `spirit_vessel`,
            `power_treads`,
            `wind_lace`,
          ],
          mid_game: [
            `maelstrom`,
            `ultimate_scepter`,
            `orchid`,
            `mjollnir`,
            `aghanims_shard`,
          ],
          late_game: [`black_king_bar`, `sheepstick`, `assault`, `satanic`],
          situational: [
            "infused_raindrop",
            `solar_crest`,
            `hand_of_midas`,
            `blade_mail`,
            `rod_of_atos`,
            `gungir`,
            `witch_blade`,
            `blink`,
            `silver_edge`,
            `hurricane_pike`,
            `monkey_king_bar`,
            `nullifier`,
            `bloodthorn`,
            `sphere`,
          ],
          core: [
            `spirit_vessel`,
            `power_treads`,
            `maelstrom`,
            `ultimate_scepter`,
            `orchid`,
            `aghanims_shard`,
            `sheepstick`,
            `assault`,
          ],
          neutral: [
            `duelist_gloves`,
            `lance_of_pursuit`,
            `orb_of_destruction`,
            `grove_bow`,
            `elven_tunic`,
            `enchanted_quiver`,
            `trickster_cloak`,
            `mind_breaker`,
            `desolator_2`,
            `pirate_hat`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2718666233,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
        abilities: [
          `furion_sprout`, // 1
          "furion_teleportation", // 2
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
          "special_bonus_unique_furion_teleportation_max_stacks", // 15
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
            "blight_stone",
            `blood_grenade`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            //`medallion_of_courage`,
            `magic_wand`,
            `boots`,
            `wind_lace`,
            `solar_crest`,
          ],
          mid_game: [
            `rod_of_atos`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `gungir`,
          ],
          late_game: [`sheepstick`, `bloodthorn`, `refresher`, `assault`],
          situational: [
            "infused_raindrop",
            `spirit_vessel`,
            `hand_of_midas`,
            `ancient_janggo`,
            `glimmer_cape`,
            `force_staff`,
            `blade_mail`,
            `boots_of_bearing`,
            `octarine_core`,
            `blink`,
            `ethereal_blade`,
            `dagon_5`,
            `heavens_halberd`,
            `pipe`,
            `silver_edge`,
            `monkey_king_bar`,
            `shivas_guard`,
          ],
          core: [
            "solar_crest",
            `rod_of_atos`,
            "ultimate_scepter",
            `aghanims_shard`,
            `gungir`,
            `sheepstick`,
            `refresher`,
            `assault`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2699960447,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
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
            "branches",
            "circlet",
            `circlet`,
            `ward_observer`,
          ],
          early_game: [
            `null_talisman`,
            `bracer`,
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `guardian_greaves`,
            `pipe`,
            `aghanims_shard`,
            `kaya_and_sange`,
          ],
          late_game: [`heart`, `ultimate_scepter`, `shivas_guard`, `dagon_5`],
          situational: [
            `spirit_vessel`,
            `crimson_guard`,
            `rod_of_atos`,
            "radiance",
            `heavens_halberd`,
            `force_staff`,
            `cyclone`,
            "aeon_disk",
            `ethereal_blade`,
            `eternal_shroud`,
            `octarine_core`,
            `black_king_bar`,
            `sphere`,
            `blade_mail`,
            `lotus_orb`,
            `sheepstick`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `null_talisman`,
            `bracer`,
            `guardian_greaves`,
            `pipe`,
            `aghanims_shard`,
            `kaya_and_sange`,
            `heart`,
            `ultimate_scepter`,
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
          ],
        },
        // item_tooltips:
        /* power_treads:
            "A core item that tanks you up forther. Improves your attack speed signifcantly.", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2718666066,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "necrolyte_death_pulse", // 1
          "necrolyte_heartstopper_aura", // 2
          "necrolyte_death_pulse", // 3
          `necrolyte_heartstopper_aura`, // 4
          "necrolyte_death_pulse", // 5
          "necrolyte_reapers_scythe", // 6
          "necrolyte_death_pulse", // 7
          `necrolyte_sadist`, // 8    equals to `ghost shroud`
          "necrolyte_heartstopper_aura", // 9
          `necrolyte_heartstopper_aura`, // 10
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
          `special_bonus_unique_necrophos_2`, // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            `circlet`,
            `circlet`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `null_talisman`,
            `boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `travel_boots`,
            `radiance`,
            "kaya_and_sange",
            `aghanims_shard`,
          ],
          late_game: [`heart`, `ultimate_scepter`, `shivas_guard`, `dagon_5`],
          situational: [
            `power_treads`,
            `spirit_vessel`,
            `rod_of_atos`,
            `guardian_greaves`,
            `crimson_guard`,
            `pipe`,
            `cyclone`,
            `ethereal_blade`,
            `octarine_core`,
            `eternal_shroud`,
            `black_king_bar`,
            `sphere`,
            "aeon_disk",
            `heavens_halberd`,
            `lotus_orb`,
            `sheepstick`,
            `overwhelming_blink`,
            `travel_boots_2`,
          ],
          core: [
            `bracer`,
            `null_talisman`,
            `travel_boots`,
            `radiance`,
            `kaya_and_sange`,
            `aghanims_shard`,
            `heart`,
            `ultimate_scepter`,
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
      `dagon_5`,
      `necrolyte_reapers_scythe`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "magic_stick",
          "ring_of_regen",
          "headdress",
          "infused_raindrop",
          "cloak",
          "urn_of_shadows",
        ],
        support: [],
        core: ["ring_of_health"],
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
        core: ["skadi", "shivas_guard", "nullifier", "bloodthorn"],
      },
    },
  },

  // eidendota plays hero
  night_stalker: {
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2699960635,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
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
            `branches`,
          ],
          early_game: ["bracer", "phase_boots", "magic_wand", "hand_of_midas"],
          mid_game: [
            "echo_sabre",
            "blink",
            `aghanims_shard`,
            "black_king_bar",
            `basher`,
          ],
          late_game: [
            "abyssal_blade",
            "nullifier",
            "harpoon",
            "assault",
            "overwhelming_blink",
            `travel_boots`,
          ],
          situational: [
            `heavens_halberd`,
            `silver_edge`,
            `sphere`,
            `ultimate_scepter`,
          ],
          core: [
            "echo_sabre",
            "black_king_bar",
            "blink",
            "basher",
            "aghanims_shard",
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699960726,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40564,
        abilities: [
          "nyx_assassin_impale", // 1
          "nyx_assassin_spiked_carapace", // 2
          "nyx_assassin_impale", // 3
          `nyx_assassin_jolt`, // 4
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
          `special_bonus_unique_nyx_5`, // 15
          `nyx_assassin_spiked_carapace`, // 16
          "special_bonus_attributes", // 17
          "nyx_assassin_vendetta", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_nyx_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_nyx_3`, // 25
        ],
        items: {
          starting: [
            `tango`,
            `tango`,
            `blood_grenade`,
            `enchanted_mango`,
            `wind_lace`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `dagon_5`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `aether_lens`,
          ],
          late_game: [`blink`, `octarine_core`, `ethereal_blade`, `wind_waker`],
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
            `ethereal_blade`,
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
            `panic_button`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699960831,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40560,
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
            `heart`,
            `ethereal_blade`,
            `octarine_core`,
            `ultimate_scepter`,
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
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `hand_of_midas`,
            `aether_lens`,
            `aghanims_shard`,
            `force_staff`,
            `sheepstick`,
            `heart`,
            `ethereal_blade`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2699955472,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `aether_lens`,
            `tranquil_boots`,
            `glimmer_cape`,
            `force_staff`,
          ],
          late_game: [
            `solar_crest`,
            `ultimate_scepter`,
            `octarine_core`,
            `refresher`,
          ],
          situational: [
            `orb_of_venom`,
            `ring_of_basilius`,
            `boots_of_bearing`,
            `pavise`,
            `guardian_greaves`,
            `lotus_orb`,
            `holy_locket`,
            `ghost`,
            `vladmir`,
            `aeon_disk`,
            `pipe`,
            `blink`,
            `cyclone`,
            `aghanims_shard`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `aether_lens`,
            `tranquil_boots`,
            `glimmer_cape`,
            `force_staff`,
            `solar_crest`,
            `ultimate_scepter`,
            `refresher`,
          ],
          neutral: [
            "arcane_ring",
            `faded_broach`,
            `bullwhip`,
            "philosophers_stone",
            //`quickening_charm`,
            "psychic_headband",
            "spy_gadget",
            //"spell_prism",
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2699960994,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
          `oracle_fates_edict`, // 10
          `special_bonus_unique_oracle_9`, // 11
          "oracle_false_promise", // 12
          "oracle_fortunes_end", // 13
          `oracle_fortunes_end`, // 14
          `special_bonus_unique_oracle_5`, // 15
          `oracle_fortunes_end`, // 16
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
            `faerie_fire`,
            `branches`,
            `branches`,
            `clarity`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            `flask`,
            `arcane_boots`,
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `aether_lens`,
            `tranquil_boots`,
            `glimmer_cape`,
            `force_staff`,
          ],
          late_game: [
            `aghanims_shard`,
            `blink`,
            `ultimate_scepter`,
            `aeon_disk`,
          ],
          situational: [
            `ring_of_basilius`,
            `spirit_vessel`,
            `holy_locket`,
            `pavise`,
            `ghost`,
            `cyclone`,
            `boots_of_bearing`,
            `guardian_greaves`,
            `octarine_core`,
            `sheepstick`,
            "lotus_orb",
            `solar_crest`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            `tranquil_boots`,
            `glimmer_cape`,
            `force_staff`,
            `aghanims_shard`,
            `blink`,
            `ultimate_scepter`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            "psychic_headband",
            //`quickening_charm`,
            "spy_gadget",
            `trickster_cloak`,
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
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link_id: 2699961071,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40547,
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
          "special_bonus_attack_speed_20", // 10
          "obsidian_destroyer_equilibrium", // 11
          "obsidian_destroyer_sanity_eclipse", // 12
          "obsidian_destroyer_equilibrium", // 13
          "obsidian_destroyer_equilibrium", // 14
          "special_bonus_movement_speed_30", // 15
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
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link_id: 2719253915,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40548,
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
          "special_bonus_attack_speed_20", // 10
          "obsidian_destroyer_equilibrium", // 11
          "obsidian_destroyer_sanity_eclipse", // 12
          "obsidian_destroyer_equilibrium", // 13
          "obsidian_destroyer_equilibrium", // 14
          "special_bonus_movement_speed_30", // 15
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2699961166,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40585,
        abilities: [
          "pangolier_shield_crash", // 1
          "pangolier_swashbuckle", // 2
          "pangolier_shield_crash", // 3
          `pangolier_swashbuckle`, // 4
          `pangolier_swashbuckle`, // 5
          "pangolier_gyroshell", // 6
          `pangolier_swashbuckle`, // 7
          `pangolier_shield_crash`, // 8
          `pangolier_shield_crash`, // 9
          `special_bonus_unique_pangolier`, // 10
          `pangolier_lucky_shot`, // 11
          "pangolier_gyroshell", // 12
          "pangolier_lucky_shot", // 13
          "pangolier_lucky_shot", // 14
          `special_bonus_unique_pangolier_6`, // 15
          "pangolier_lucky_shot", // 16
          "special_bonus_attributes", // 17
          "pangolier_gyroshell", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_pangolier_3`, // 20
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
            `wraith_band`,
            `bracer`,
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `diffusal_blade`,
            `blink`,
            `ultimate_scepter`,
            `basher`,
          ],
          late_game: [
            `aghanims_shard`,
            `sphere`,
            `disperser`,
            `octarine_core`,
            `overwhelming_blink`,
          ],
          situational: [
            `orb_of_corrosion`,
            `power_treads`,
            `veil_of_discord`,
            `spirit_vessel`,
            `guardian_greaves`,
            `maelstrom`,
            `lotus_orb`,
            `aeon_disk`,
            `pipe`,
            `crimson_guard`,
            `heavens_halberd`,
            `shivas_guard`,
            `manta`,
            `black_king_bar`,
            `arcane_blink`,
            `cyclone`,
            `gungir`,
            `mjollnir`,
            `mage_slayer`,
            `monkey_king_bar`,
            `satanic`,
            `abyssal_blade`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `arcane_boots`,
            `diffusal_blade`,
            `blink`,
            `ultimate_scepter`,
            `basher`,
            `aghanims_shard`,
            `disperser`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `unstable_wand`,
            `pupils_gift`,
            `orb_of_destruction`,
            `defiant_shell`,
            `paladin_sword`,
            `mind_breaker`,
            `havoc_hammer`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2719254096,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40584,
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
          `special_bonus_unique_pangolier_3`, // 20
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
            `guardian_greaves`,
            `blink`,
            `cyclone`,
            `aghanims_shard`,
          ],
          late_game: [`pipe`, `force_staff`, `octarine_core`, `gungir`],
          situational: [
            `orb_of_corrosion`,
            `spirit_vessel`,
            `pavise`,
            `ghost`,
            `glimmer_cape`,
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
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `guardian_greaves`,
            `blink`,
            `cyclone`,
            `aghanims_shard`,
            `pipe`,
            `octarine_core`,
            `gungir`,
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
        steam_guide_link_id: 2719254316,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40570,
        abilities: [
          "pangolier_shield_crash", // 1
          "pangolier_swashbuckle", // 2
          `pangolier_shield_crash`, // 3
          `pangolier_swashbuckle`, // 4
          `pangolier_swashbuckle`, // 5
          "pangolier_gyroshell", // 6
          `pangolier_swashbuckle`, // 7
          `pangolier_shield_crash`, // 8
          `pangolier_shield_crash`, // 9
          `special_bonus_unique_pangolier`, // 10
          `pangolier_lucky_shot`, // 11
          "pangolier_gyroshell", // 12
          "pangolier_lucky_shot", // 13
          "pangolier_lucky_shot", // 14
          `special_bonus_unique_pangolier_6`, // 15
          "pangolier_lucky_shot", // 16
          "special_bonus_attributes", // 17
          "pangolier_gyroshell", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_pangolier_3", // 20
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
            `branches`,
            `branches`,
            `branches`,
            `faerie_fire`,
            `ward_observer`,
          ],
          early_game: [
            "bottle",
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `infused_raindrop`,
          ],
          mid_game: [
            `arcane_boots`,
            `diffusal_blade`,
            `blink`,
            `ultimate_scepter`,
            `basher`,
          ],
          late_game: [
            `aghanims_shard`,
            `sphere`,
            `disperser`,
            `octarine_core`,
            `overwhelming_blink`,
          ],
          situational: [
            `orb_of_corrosion`,
            `power_treads`,
            `spirit_vessel`,
            `maelstrom`,
            `guardian_greaves`,
            `harpoon`,
            `bloodthorn`,
            `manta`,
            `lotus_orb`,
            `black_king_bar`,
            `aeon_disk`,
            `cyclone`,
            `shivas_guard`,
            `mjollnir`,
            `gungir`,
            `mage_slayer`,
            `monkey_king_bar`,
            `satanic`,
            `abyssal_blade`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `arcane_boots`,
            `diffusal_blade`,
            `blink`,
            `ultimate_scepter`,
            `basher`,
            `aghanims_shard`,
            `disperser`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `unstable_wand`,
            `pupils_gift`,
            `orb_of_destruction`,
            `defiant_shell`,
            `paladin_sword`,
            `mind_breaker`,
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
          "sange_and_yasha",
          "kaya_and_sange",
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699961303,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
            "branches",
            "slippers",
            "circlet",
          ],
          early_game: [
            "wraith_band",
            "orb_of_corrosion",
            "power_treads",
            "magic_wand",
            "cornucopia",
          ],
          mid_game: [
            "bfury",
            "desolator",
            "black_king_bar",
            "aghanims_shard",
            "basher",
          ],
          late_game: [
            "ultimate_scepter",
            "satanic",
            "abyssal_blade",
            "nullifier",
          ],
          situational: ["manta", "sphere", "monkey_king_bar", "rapier"],
          core: [
            "bfury",
            "desolator",
            "black_king_bar",
            "aghanims_shard",
            "ultimate_scepter",
            "basher",
            "satanic",
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
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["magic_wand", "ring_of_regen", "armor"],
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
        all: ["sheepstick", "ethereal_blade", "aeon_disk", "revenants_brooch"],
        support: [],
        core: ["bloodthorn", "assault", "butterfly"],
      },
    },
  },

  // eidendota plays hero
  phantom_lancer: {
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699961424,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          "special_bonus_24_crit_2", // 25
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
          early_game: ["wraith_band", "power_treads", "magic_wand"],
          mid_game: [
            "ultimate_scepter",
            "diffusal_blade",
            "manta",
            "heart",
            "aghanims_shard",
          ],
          late_game: ["skadi", "butterfly", "bloodthorn", "disperser"],
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
            //"possessed_mask", Removed in 7.33
            "broom_handle",
            "lance_of_pursuit",
            //"ring_of_aquila",
            //"dagger_of_ristul", Removed in 7.33
            "pupils_gift",
            "orb_of_destruction",
            //"titan_sliver",
            "elven_tunic",
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699961589,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40590,
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
            `branches`,
            `branches`,
            "circlet",
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
            `veil_of_discord`,
            `spirit_vessel`,
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
            "force_staff",
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
            `veil_of_discord`,
            `spirit_vessel`,
            `aghanims_shard`,
            `shivas_guard`,
            `sheepstick`,
            `refresher`,
            `aeon_disk`,
          ],
          neutral: [
            `trusty_shovel`,
            `mysterious_hat`,
            "philosophers_stone",
            `whisper_of_the_dread`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE], // To be updated

        steam_guide_link_id: 2763260196,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
        abilities: [
          `primal_beast_trample`, // 1
          `primal_beast_onslaught`, // 2
          `primal_beast_trample`, // 3
          `primal_beast_uproar`, // 4
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
          mid_game: [`blade_mail`, `black_king_bar`, `blink`, `aghanims_shard`],

          late_game: [
            `heart`,
            `kaya_and_sange`,
            `ultimate_scepter`,
            `shivas_guard`,
          ],
          situational: [
            `vanguard`,
            `guardian_greaves`,
            `boots_of_bearing`,
            "lotus_orb",
            `ethereal_blade`,
            `octarine_core`,
            `crimson_guard`,
            "pipe",
            "heavens_halberd",
            `radiance`,
            `cyclone`,
            `sphere`,
            `heart`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `soul_ring`,
            `blade_mail`,
            `black_king_bar`,
            `blink`,
            `aghanims_shard`,
            `heart`,
            `kaya_and_sange`,
          ],
          neutral: [
            `occult_bracelet`,
            "arcane_ring",
            `bullwhip`,
            "vambrace",
            `cloak_of_flames`,
            //`quickening_charm`,
            `havoc_hammer`,
            `timeless_relic`,
            "giants_ring",
            //`fallen_sky`,
          ],
        },
        // item_tooltips:
        /* helm_of_iron_will:
            "Good laning sustain item that can go into Armlet down the road.", */
        /* armlet: "A good early game item that increases your damage output.", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT], // Update steam_guide_id and steam_guide_link for support guide

        steam_guide_link_id: 2765463290,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            "tranquil_boots",
            "soul_ring",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `blade_mail`,
            "black_king_bar",
            `boots_of_bearing`,
            "aghanims_shard",
          ],
          late_game: [
            `blink`,
            `ultimate_scepter`,
            `ethereal_blade`,
            `shivas_guard`,
          ],
          situational: [
            "veil_of_discord",
            `phase_boots`,
            `spirit_vessel`,
            `guardian_greaves`,
            `pipe`,
            `heavens_halberd`,
            `kaya_and_sange`,
            `octarine_core`,
            `lotus_orb`,
            `heart`,
            `aeon_disk`,
            `cyclone`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `soul_ring`,
            `tranquil_boots`,
            `blade_mail`,
            `black_king_bar`,
            `boots_of_bearing`,
            `aghanims_shard`,
            `blink`,
            `ethereal_blade`,
          ],
          neutral: [
            `occult_bracelet`,
            `arcane_ring`,
            `bullwhip`,
            `vambrace`,
            `cloak_of_flames`,
            //`quickening_charm`,
            `havoc_hammer`,
            `timeless_relic`,
            `giants_ring`,
            //`fallen_sky`,
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
          "sange_and_yasha",
          "kaya_and_sange",
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link_id: 2699961683,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40549,
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
            `branches`,
            "branches",
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: ["bottle", `power_treads`, `magic_wand`, `wind_lace`],

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
            `revenants_brooch`,
          ],
          situational: [
            `null_talisman`,
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
            `mjollnir`,
            `ethereal_blade`,
            `sheepstick`,
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
            `greater_crit`,
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
        support: ["cloak"],
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
          "sange_and_yasha",
          "kaya_and_sange",
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2699961775,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
          "special_bonus_unique_pudge_7", // 15
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
          mid_game: [
            "blink",
            "aether_lens",
            "glimmer_cape",
            "aghanims_shard",
            "black_king_bar",
          ],
          late_game: [
            "octarine_core",
            "ethereal_blade",
            "ultimate_scepter",
            "overwhelming_blink",
          ],
          situational: [
            /*"hood_of_defiance", Item removed from game */
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
            //"pogo_stick",
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

        steam_guide_link_id: 2713377028,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
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
          early_game: ["vanguard", "phase_boots", "magic_wand", "soul_ring"],
          mid_game: [
            "blade_mail",
            "blink",
            "black_king_bar",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          late_game: [
            "shivas_guard",
            "overwhelming_blink",
            "heart",
            "octarine_core",
          ],
          situational: [
            "pipe",
            "lotus_orb",
            "crimson_guard",
            "aghanims_shard",
            "cyclone",
            "force_staff",
            "assault",
            "sheepstick",
            "aether_lens",
            "spirit_vessel",
          ],
          core: [
            "vanguard",
            "blade_mail",
            "ultimate_scepter",
            "black_king_bar",
            "blink",
            "aghanims_shard",
          ],
          neutral: [
            "arcane_ring",
            "seeds_of_serenity",
            "occult_bracelet",
            "dragon_scale",
            "eye_of_the_vizier",
            "cloak_of_flames",
            //"black_powder_bag",
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
        core: [
          "desolator",
          "mage_slayer",
          "hurricane_pike",
          "sange_and_yasha",
          "kaya_and_sange",
        ],
      },
      late_game: {
        all: ["sphere", "wind_waker"],
        support: [],
        core: ["bloodthorn"],
      },
    },
  },

  pugna: {
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link_id: 2699961859,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40550,
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
          `special_bonus_unique_pugna_4`, // 15
          `pugna_nether_ward`, // 16
          "special_bonus_attributes", // 17
          "pugna_life_drain", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_pugna_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pugna_2", // 25
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
            `octarine_core`,
            `blink`,
            `sheepstick`,
            `ultimate_scepter`,
          ],
          situational: [
            `glimmer_cape`,
            `cyclone`,
            `force_staff`,
            `ethereal_blade`,
            `lotus_orb`,
            "black_king_bar",
            "sphere",
            `aeon_disk`,
            `shivas_guard`,
            `overwhelming_blink`,
            `arcane_blink`,
            `aghanims_shard`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `arcane_boots`,
            `aether_lens`,
            `kaya_and_sange`,
            `dagon_5`,
            "blink",
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
        steam_guide_link_id: 2721136673,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40551,
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
            `pavise`,
            `solar_crest`,
            `glimmer_cape`,
            `force_staff`,
          ],
          late_game: [
            `aghanims_shard`,
            `ethereal_blade`,
            `octarine_core`,
            `wind_waker`,
          ],
          situational: [
            `pavise`,
            `ghost`,
            `cyclone`,
            `lotus_orb`,
            `aeon_disk`,
            `sphere`,
            `boots_of_bearing`,
            `ultimate_scepter`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `aether_lens`,
            `solar_crest`,
            `glimmer_cape`,
            `force_staff`,
            `aghanims_shard`,
            `ethereal_blade`,
            `octarine_core`,
          ],
          neutral: [
            `mysterious_hat`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link_id: 2699961952,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40566,
        abilities: [
          "queenofpain_scream_of_pain", // 1
          "queenofpain_shadow_strike", // 2
          "queenofpain_shadow_strike", // 3
          "queenofpain_blink", // 4
          "queenofpain_shadow_strike", // 5
          "queenofpain_sonic_wave", // 6
          "queenofpain_scream_of_pain", // 7
          "queenofpain_scream_of_pain", // 8
          "queenofpain_scream_of_pain", // 9
          "special_bonus_unique_queen_of_pain_strike_heal", // 10
          "queenofpain_blink", // 11
          "queenofpain_sonic_wave", // 12
          "queenofpain_blink", // 13
          "queenofpain_blink", // 14
          "special_bonus_attack_speed_30", // 15
          "queenofpain_shadow_strike", // 16
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
            "falcon_blade",
            "magic_stick",
            "power_treads",
            "kaya",
          ],
          mid_game: [
            "kaya_and_sange",
            "ultimate_scepter",
            "aghanims_shard",
            "black_king_bar",
          ],
          late_game: ["shivas_guard", "octarine_core", "sheepstick"],
          situational: [
            "hand_of_midas",
            "infused_raindrop",
            "sphere",
            "orchid",
            "witch_blade",
            "refresher",
            "bloodthorn",
          ],
          core: [
            "kaya_and_sange",
            "ultimate_scepter",
            "black_king_bar",
            "aghanims_shard",
            "shivas_guard",
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

        steam_guide_link_id: 2721136803,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
        abilities: [
          "queenofpain_shadow_strike", // 1
          "queenofpain_blink", // 2
          "queenofpain_shadow_strike", // 3
          "queenofpain_scream_of_pain", // 4
          "queenofpain_shadow_strike", // 5
          "queenofpain_sonic_wave", // 6
          "queenofpain_scream_of_pain", // 7
          "queenofpain_scream_of_pain", // 8
          "queenofpain_scream_of_pain", // 9
          "special_bonus_unique_queen_of_pain_strike_heal", // 10
          "queenofpain_blink", // 11
          "queenofpain_sonic_wave", // 12
          "queenofpain_blink", // 13
          "queenofpain_blink", // 14
          "special_bonus_unique_queen_of_pain_4", // 15
          "queenofpain_shadow_strike", // 16
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
            "circlet",
            "blood_grenade",
            "branches",
            "faerie_fire",
            "mantle",
          ],
          early_game: ["null_talisman", "power_treads", "magic_wand", "kaya"],
          mid_game: [
            "kaya_and_sange",
            "ultimate_scepter",
            "aghanims_shard",
            "black_king_bar",
          ],
          late_game: [
            "octarine_core",
            "shivas_guard",
            "sheepstick",
            "ethereal_blade",
          ],
          situational: [
            "bloodthorn",
            "refresher",
            "sphere",
            "infused_raindrop",
            "spirit_vessel",
            "lotus_orb",
            "orchid",
          ],
          core: [
            "kaya_and_sange",
            "ultimate_scepter",
            "black_king_bar",
            "aghanims_shard",
            "shivas_guard",
          ],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "grove_bow",
            "vampire_fangs",
            //`quickening_charm`,
            "psychic_headband",
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
      "orchid",
      "queenofpain_shadow_strike",
      "queenofpain_scream_of_pain",
      "queenofpain_sonic_wave",
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "ring_of_regen", "cloak"],
        support: ["tranquil_boots"],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["rod_of_atos", "cyclone"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          "black_king_bar",
          "orchid",
          "hurricane_pike",
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

  // eidendota plays hero
  razor: {
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699962040,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          `razor_unstable_current`, // 11
          "razor_eye_of_the_storm", // 12
          `razor_static_link`, // 13
          "razor_unstable_current", // 14
          `special_bonus_unique_razor_3`, // 15
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
            `branches`,
            `branches`,
            `slippers`,
            "circlet",
          ],
          early_game: [
            `wraith_band`,
            `power_treads`,
            `hand_of_midas`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [`manta`, `black_king_bar`, `aghanims_shard`, `butterfly`],
          late_game: [
            `satanic`,
            `assault`,
            `skadi`,
            `swift_blink`,
            `ultimate_scepter`,
          ],
          situational: [
            `phase_boots`,
            `falcon_blade`,
            `maelstrom`,
            `hurricane_pike`,
            `blink`,
            `cyclone`,
            `sange_and_yasha`,
            `sphere`,
            `heavens_halberd`,
            `sheepstick`,
            `nullifier`,
            `shivas_guard`,
            `monkey_king_bar`,
            `refresher`,
            `travel_boots`,
          ],
          core: [
            `power_treads`,
            `hand_of_midas`,
            `manta`,
            `black_king_bar`,
            `aghanims_shard`,
            `butterfly`,
            `satanic`,
            `assault`,
            `swift_blink`,
          ],
          neutral: [
            `spark_of_courage`,
            `arcane_ring`,
            `orb_of_destruction`,
            `grove_bow`,
            `elven_tunic`,
            //`titan_sliver`,
            `mind_breaker`,
            `ninja_gear`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2722413092,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
        abilities: [
          `razor_plasma_field`, // 1
          `razor_static_link`, // 2
          `razor_plasma_field`, // 3
          `razor_static_link`, // 4
          "razor_plasma_field", // 5
          "razor_eye_of_the_storm", // 6
          "razor_plasma_field", // 7
          "razor_unstable_current", // 8
          `razor_unstable_current`, // 9
          `special_bonus_spell_lifesteal_10`, // 10
          `razor_unstable_current`, // 11
          "razor_eye_of_the_storm", // 12
          `razor_static_link`, // 13
          `razor_unstable_current`, // 14
          `special_bonus_unique_razor_3`, // 15
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
            `ward_observer`,
          ],
          early_game: [
            `wraith_band`,
            `power_treads`,
            `falcon_blade`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [`manta`, `black_king_bar`, `aghanims_shard`, `satanic`],
          late_game: [
            `assault`,
            `butterfly`,
            `shivas_guard`,
            `swift_blink`,
            `ultimate_scepter`,
          ],
          situational: [
            `phase_boots`,
            `mask_of_madness`,
            `vanguard`,
            `hand_of_midas`,
            `boots_of_bearing`,
            `cyclone`,
            `lotus_orb`,
            `crimson_guard`,
            `pipe`,
            `heavens_halberd`,
            `sheepstick`,
            `hurricane_pike`,
            `blade_mail`,
            `nullifier`,
            `skadi`,
            `monkey_king_bar`,
            `sphere`,
            `refresher`,
            `travel_boots_2`,
          ],
          core: [
            `power_treads`,
            `falcon_blade`,
            `manta`,
            `black_king_bar`,
            `aghanims_shard`,
            `satanic`,
            `assault`,
            `butterfly`,
            `swift_blink`,
          ],
          neutral: [
            `spark_of_courage`,
            `arcane_ring`,
            `orb_of_destruction`,
            `grove_bow`,
            `elven_tunic`,
            //`titan_sliver`,
            `mind_breaker`,
            `trickster_cloak`,
            `desolator_2`,
            `apex`,
          ],
        },
        // item_tooltips:
        // bloodstone: `Try to rush Bloodstone to get it as early as possible before the 15 minute mark. It massively enhances your survivability with its active in the early game.`,
        // aghanims_shard: `Improves your damage output in fights and also improves your tankiness in combination with the Bloodstone active.`,
        // eternal_shroud: `Makes you extremely tanky in the mid game along with Bloodstone and Aghs shard. Once you have the three items, you can play extremely aggressive in fights.`,
        combo: [],
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2722413152,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          `razor_plasma_field`, // 1
          `razor_static_link`, // 2
          "razor_static_link", // 3
          "razor_plasma_field", // 4
          `razor_plasma_field`, // 5
          "razor_eye_of_the_storm", // 6
          "razor_plasma_field", // 7
          `razor_unstable_current`, // 8
          `razor_unstable_current`, // 9
          `special_bonus_spell_lifesteal_10`, // 10
          `razor_unstable_current`, // 11
          "razor_eye_of_the_storm", // 12
          `razor_static_link`, // 13
          "razor_unstable_current", // 14
          `special_bonus_unique_razor_3`, // 15
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
          mid_game: [`manta`, `black_king_bar`, `aghanims_shard`, `butterfly`],
          late_game: [
            `satanic`,
            `assault`,
            `skadi`,
            `swift_blink`,
            `ultimate_scepter`,
          ],
          situational: [
            `phase_boots`,
            `falcon_blade`,
            `hand_of_midas`,
            `maelstrom`,
            `hurricane_pike`,
            `blade_mail`,
            `blink`,
            `cyclone`,
            `sange_and_yasha`,
            `sphere`,
            `heavens_halberd`,
            `sheepstick`,
            `nullifier`,
            `shivas_guard`,
            `monkey_king_bar`,
            `refresher`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `power_treads`,
            `manta`,
            `black_king_bar`,
            `aghanims_shard`,
            `butterfly`,
            `satanic`,
            `assault`,
            `swift_blink`,
          ],
          neutral: [
            `spark_of_courage`,
            `arcane_ring`,
            `orb_of_destruction`,
            `grove_bow`,
            `elven_tunic`,
            //`titan_sliver`,
            `mind_breaker`,
            `ninja_gear`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699962133,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
            "wraith_band",
            `power_treads`,
            "magic_wand",
            `wind_lace`,
          ],
          mid_game: [
            `diffusal_blade`,
            `manta`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          late_game: [
            `greater_crit`,
            `nullifier`,
            `abyssal_blade`,
            `disperser`,
          ],
          situational: [
            `orb_of_corrosion`,
            `bfury`,
            `swift_blink`,
            `basher`,
            `black_king_bar`,
            `butterfly`,
            `monkey_king_bar`,
            `solar_crest`,
            `skadi`,
            `desolator`,
            `sphere`,
            `travel_boots`,
          ],
          core: [
            "power_treads",
            "diffusal_blade",
            "manta",
            `ultimate_scepter`,
            `aghanims_shard`,
            `greater_crit`,
            `nullifier`,
            `abyssal_blade`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `broom_handle`,
            `orb_of_destruction`,
            "vambrace",
            `elven_tunic`,
            //"titan_sliver",
            "mind_breaker",
            //`penta_edged_sword`,
            "apex",
            "desolator_2",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2722413235,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
          "riki_smoke_screen", // 10
          "special_bonus_unique_riki_7", // 11
          "riki_backstab", // 12
          "riki_tricks_of_the_trade", // 13
          "riki_tricks_of_the_trade", // 14
          "special_bonus_unique_riki_3", // 15
          "riki_tricks_of_the_trade", // 16
          "special_bonus_attributes", // 17
          "riki_backstab", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_riki_1`, // 20
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
            `nullifier`,
            `greater_crit`,
            `abyssal_blade`,
            `disperser`,
          ],
          situational: [
            `meteor_hammer`,
            `tranquil_boots`,
            "lotus_orb",
            `boots_of_bearing`,
            `sheepstick`,
            `solar_crest`,
            `force_staff`,
            `aeon_disk`,
            `nullifier`,
            `cyclone`,
            `travel_boots`,
          ],
          core: [
            `orb_of_corrosion`,
            `power_treads`,
            `diffusal_blade`,
            `aghanims_shard`,
            `octarine_core`,
            `nullifier`,
            `abyssal_blade`,
          ],
          neutral: [
            `lance_of_pursuit`,
            `broom_handle`,
            `vambrace`,
            `orb_of_destruction`,
            `elven_tunic`,
            //`quickening_charm`,
            //`penta_edged_sword`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2699962219,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
          `special_bonus_unique_rubick_8`, // 11
          "rubick_spell_steal", // 12
          `rubick_telekinesis`, // 13
          `rubick_telekinesis`, // 14
          `rubick_telekinesis`, // 15
          `special_bonus_unique_rubick_6`, // 16
          "special_bonus_attributes", // 17
          "rubick_spell_steal", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_rubick_4`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_rubick`, // 25
        ],
        items: {
          starting: [
            "tango",
            "tango",
            `blood_grenade`,
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`aether_lens`, `tranquil_boots`, `blink`, `force_staff`],
          late_game: [
            `aghanims_shard`,
            `ultimate_scepter`,
            `sheepstick`,
            `octarine_core`,
          ],
          situational: [
            `ring_of_basilius`,
            `spirit_vessel`,
            `veil_of_discord`,
            `phylactery`,
            "lotus_orb",
            `ghost`,
            `glimmer_cape`,
            `cyclone`,
            `pavise`,
            `aeon_disk`,
            `boots_of_bearing`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            "aether_lens",
            `tranquil_boots`,
            `blink`,
            `force_staff`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `sheepstick`,
          ],
          neutral: [
            //"pogo_stick",
            `arcane_ring`,
            "philosophers_stone",
            `eye_of_the_vizier`,
            `ceremonial_robe`,
            "psychic_headband",
            "spy_gadget",
            //"spell_prism",
            "seer_stone",
            "book_of_shadows",
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2699962310,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
        abilities: [
          "sandking_burrowstrike", // 1
          "sandking_caustic_finale", // 2
          "sandking_sand_storm", // 3
          "sandking_sand_storm", // 4
          "sandking_sand_storm", // 5
          "sandking_epicenter", // 6
          "sandking_sand_storm", // 7
          "sandking_burrowstrike", // 8
          "sandking_burrowstrike", // 9
          "sandking_burrowstrike", // 10
          `special_bonus_unique_sand_king_burrowstrike_stun`, // 11
          "sandking_epicenter", // 12
          "sandking_caustic_finale", // 13
          "sandking_caustic_finale", // 14
          `sandking_caustic_finale`, // 15
          `special_bonus_unique_sand_king_3`, // 16
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
            `gauntlets`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `arcane_boots`,
            `bracer`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [`blink`, `aghanims_shard`, `ultimate_scepter`, `pipe`],
          late_game: [
            `lotus_orb`,
            `travel_boots`,
            `octarine_core`,
            `shivas_guard`,
          ],
          situational: [
            `soul_ring`,
            `hand_of_midas`,
            `veil_of_discord`,
            `meteor_hammer`,
            `guardian_greaves`,
            `heavens_halberd`,
            `black_king_bar`,
            `crimson_guard`,
            `boots_of_bearing`,
            `ethereal_blade`,
            `cyclone`,
            `kaya_and_sange`,
            `sphere`,
            `aeon_disk`,
            `heart`,
            `radiance`,
            `overwhelming_blink`,
            `travel_boots_2`,
          ],
          core: [
            `vanguard`,
            `arcane_boots`,
            "blink",
            `aghanims_shard`,
            `ultimate_scepter`,
            `pipe`,
            `lotus_orb`,
            `octarine_core`,
          ],
          neutral: [
            //`pogo_stick`,
            "arcane_ring",
            `bullwhip`,
            "vambrace",
            //`quickening_charm`,
            `cloak_of_flames`,
            //`spell_prism`,
            `timeless_relic`,
            "giants_ring",
            //`fallen_sky`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699962404,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40569,
        abilities: [
          `shadow_demon_disruption`, // 1
          `shadow_demon_shadow_poison`, // 2
          "shadow_demon_shadow_poison", // 3
          `shadow_demon_disruption`, // 4
          "shadow_demon_shadow_poison", // 5
          "shadow_demon_demonic_purge", // 6
          "shadow_demon_shadow_poison", // 7
          "shadow_demon_disruption", // 8
          "shadow_demon_disruption", // 9
          `special_bonus_strength_12`, // 10
          `shadow_demon_disseminate`, // 11
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
            `aether_lens`,
            `aghanims_shard`,
            `force_staff`,
            `blink`,
          ],
          late_game: [
            `ultimate_scepter`,
            `refresher`,
            "octarine_core",
            `ethereal_blade`,
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
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "aether_lens",
            `aghanims_shard`,
            `force_staff`,
            `blink`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        //type: "Physical", 1.

        steam_guide_link_id: 2699962485,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          "special_bonus_attack_speed_25", // 10
          "nevermore_shadowraze1", // 11
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
            "magic_stick",
            "circlet",
            "tango",
            "branches",
            "branches",
            "branches",
          ],
          early_game: [
            "wraith_band",
            "power_treads",
            "magic_wand",
            "mask_of_madness",
          ],
          mid_game: [
            "dragon_lance",
            "manta",
            "invis_sword",
            "black_king_bar",
            "aghanims_shard",
          ],
          late_game: [
            "butterfly",
            "satanic",
            "monkey_king_bar",
            "hurricane_pike",
            "silver_edge",
          ],
          situational: [
            "falcon_blade",
            "sphere",
            "greater_crit",
            "sange_and_yasha",
            "assault",
          ],
          core: [
            "mask_of_madness",
            "dragon_lance",
            "manta",
            "silver_edge",
            "black_king_bar",
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

        steam_guide_link_id: 2724416695,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          "special_bonus_attack_speed_25", // 10
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
            "dragon_lance",
          ],
          mid_game: [
            "manta",
            "invis_sword",
            "black_king_bar",
            "aghanims_shard",
          ],
          late_game: ["silver_edge", "satanic", "butterfly"],
          situational: [
            "mask_of_madness",
            "blink",
            "skadi",
            "hurricane_pike",
            "monkey_king_bar",
            "sphere",
          ],
          core: [
            "dragon_lance",
            "manta",
            "black_king_bar",
            "silver_edge",
            "butterfly",
            "aghanims_shard",
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
    combo: [
      `blink`,
      `cyclone`,
      `nevermore_requiem`,
      `nevermore_shadowraze1`,
      `nevermore_shadowraze2`,
      `nevermore_shadowraze3`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "wind_lace", "boots", "infused_raindrop", "cloak"],
        support: ["ward_sentry"],
        core: ["ring_of_health", "DamageItems"],
      },
      mid_game: {
        all: [/*"medallion_of_courage",*/ "solar_crest", "mekansm"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          //"hood_of_defiance",
          "pipe",
          "eternal_shroud",
          "black_king_bar",
          "heavens_halberd",
        ],
      },
      late_game: {
        all: ["sphere"],
        support: ["black_king_bar"],
        core: [],
      },
    },
  },

  shadow_shaman: {
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699962568,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40567,
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
          `shadow_shaman_shackles`, // 10
          `shadow_shaman_ether_shock`, // 11
          "shadow_shaman_mass_serpent_ward", // 12
          `shadow_shaman_ether_shock`, // 13
          `shadow_shaman_ether_shock`, // 14
          `special_bonus_unique_shadow_shaman_hex_damage_amp`, // 15
          `special_bonus_unique_shadow_shaman_2`, // 16
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
            `aether_lens`,
            `blink`,
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
            "black_king_bar",
            `ghost`,
            `glimmer_cape`,
            "lotus_orb",
            `cyclone`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            "blink",
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
        core: ["orchid", "black_king_bar", "sange_and_yasha", "kaya_and_sange"],
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699962648,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40571,
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
          `special_bonus_unique_silencer_2`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `blood_grenade`,
            `circlet`,
            `enchanted_mango`,
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
            `force_staff`,
            `glimmer_cape`,
            `refresher`,
          ],
          late_game: [
            `aghanims_shard`,
            `sheepstick`,
            `octarine_core`,
            `hurricane_pike`,
          ],
          situational: [
            `tranquil_boots`,
            `veil_of_discord`,
            `hand_of_midas`,
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
            `solar_crest`,
            `force_staff`,
            `refresher`,
            `aghanims_shard`,
            `octarine_core`,
            `sheepstick`,
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
            `pirate_hat`,
            "book_of_shadows",
          ],
        },
      },
    ],
    combo: [
      `silencer_last_word`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699962794,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40573,
        abilities: [
          "skywrath_mage_concussive_shot", // 1
          "skywrath_mage_arcane_bolt", // 2
          `skywrath_mage_concussive_shot`, // 3
          "skywrath_mage_ancient_seal", // 4
          `skywrath_mage_concussive_shot`, // 5
          "skywrath_mage_mystic_flare", // 6
          `skywrath_mage_concussive_shot`, // 7
          "skywrath_mage_ancient_seal", // 8
          "skywrath_mage_ancient_seal", // 9
          `skywrath_mage_ancient_seal`, // 10
          `skywrath_mage_arcane_bolt`, // 11
          `skywrath_mage_mystic_flare`, // 12
          `skywrath_mage_arcane_bolt`, // 13
          `skywrath_mage_arcane_bolt`, // 14
          `special_bonus_hp_200`, // 15
          `special_bonus_unique_skywrath`, // 16
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
            `circlet`,
            `enchanted_mango`,
            `branches`,
            `clarity`,
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
            `aether_lens`,
            `force_staff`,
            `aghanims_shard`,
          ],
          late_game: [
            "ultimate_scepter",
            `ethereal_blade`,
            `octarine_core`,
            `sheepstick`,
          ],
          situational: [
            `veil_of_discord`,
            `pavise`,
            `phylactery`,
            `blink`,
            `cyclone`,
            `ghost`,
            `glimmer_cape`,
            `solar_crest`,
            `kaya_and_sange`,
            `aeon_disk`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `rod_of_atos`,
            `aether_lens`,
            `force_staff`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `ethereal_blade`,
            `octarine_core`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2699962869,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
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
          `special_bonus_hp_325`, // 15
          "slardar_slithereen_crush", // 16
          "special_bonus_attributes", // 17
          "slardar_amplify_damage", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_slardar`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_slardar_3", // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `gauntlets`,
            `circlet`,
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [`bracer`, `power_treads`, `magic_wand`, `wind_lace`],
          mid_game: [
            `mask_of_madness`,
            `blink`,
            `echo_sabre`,
            `black_king_bar`,
            `aghanims_shard`,
          ],
          late_game: [`harpoon`, `ultimate_scepter`, `assault`, `moon_shard`],
          situational: [
            `vanguard`,
            `orb_of_corrosion`,
            `hand_of_midas`,
            "heavens_halberd",
            `crimson_guard`,
            `pipe`,
            `lotus_orb`,
            `octarine_core`,
            `monkey_king_bar`,
            `desolator`,
            `nullifier`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            `power_treads`,
            `mask_of_madness`,
            `blink`,
            `echo_sabre`,
            `black_king_bar`,
            `aghanims_shard`,
            `harpoon`,
            `ultimate_scepter`,
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
        all: ["lotus_orb", /*"medallion_of_courage",*/ "solar_crest"],
        support: ["force_staff", "ghost"],
        core: ["manta", "hurricane_pike", "manta"],
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699962959,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          "slark_pounce", // 10
          "special_bonus_unique_slark_6", // 11
          "slark_shadow_dance", // 12
          "slark_essence_shift", // 13
          "slark_essence_shift", // 14
          "special_bonus_unique_slark_2", // 15
          "slark_essence_shift", // 16
          "special_bonus_attributes", // 17
          "slark_shadow_dance", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_slark_5", // 20
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
            "branches",
            "magic_stick",
            "circlet",
          ],
          early_game: [
            "power_treads",
            "wraith_band",
            "magic_wand",
            "diffusal_blade",
          ],
          mid_game: [
            "echo_sabre",
            "ultimate_scepter",
            "black_king_bar",
            "aghanims_shard",
          ],
          late_game: [
            "silver_edge",
            "skadi",
            "abyssal_blade",
            "harpoon",
            "bloodthorn",
            "butterfly",
          ],
          situational: [
            "orb_of_corrosion",
            "hand_of_midas",
            "sange_and_yasha",
            "sphere",
            "blink",
            "monkey_king_bar",
            "nullifier",
            "mage_slayer",
          ],
          core: [
            "diffusal_blade",
            "echo_sabre",
            "ultimate_scepter",
            "black_king_bar",
            "aghanims_shard",
          ],
          neutral: [
            "lance_of_pursuit",
            "occult_bracelet",
            //"possessed_mask", Removed in 7.33
            //"dagger_of_ristul", Removed in 7.33
            //"misericorde",
            //"ring_of_aquila",
            "orb_of_destruction",
            "elven_tunic",
            //"titan_sliver",
            "mind_breaker",
            //"penta_edged_sword",
            "pirate_hat",
            "apex",
            "mirror_shield",
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
        all: [],
        support: ["force_staff", "glimmer_cape", "ghost", "ward_sentry"],
        core: ["hurricane_pike", "heavens_halberd", "basher"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade"],
        support: ["SentryGem"],
        core: ["abyssal_blade", "butterfly", "bloodthorn"],
      },
    },
  },

  snapfire: {
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2699963037,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
            "enchanted_mango",
            "circlet",
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
            `pavise`,
            `solar_crest`,
            `force_staff`,
            `aghanims_shard`,
            `guardian_greaves`,
          ],
          late_game: ["ultimate_scepter", `blink`, `octarine_core`, `gungir`],
          situational: [
            `bracer`,
            `spirit_vessel`,
            `glimmer_cape`,
            `rod_of_atos`,
            `ghost`,
            `boots_of_bearing`,
            "lotus_orb",
            `heavens_halberd`,
            `pipe`,
            `cyclone`,
            `aeon_disk`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `solar_crest`,
            `force_staff`,
            `aghanims_shard`,
            `guardian_greaves`,
            `ultimate_scepter`,
            `blink`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link_id: 2699963139,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40552,
        abilities: [
          "sniper_headshot", // 1
          `sniper_take_aim`, // 2
          `sniper_headshot`, // 3
          "sniper_take_aim", // 4
          `sniper_shrapnel`, // 5
          "sniper_assassinate", // 6
          "sniper_shrapnel", // 7
          `sniper_shrapnel`, // 8
          `sniper_shrapnel`, // 9
          `sniper_headshot`, // 10
          `sniper_headshot`, // 11
          `sniper_take_aim`, // 12
          `sniper_take_aim`, // 13
          `special_bonus_unique_sniper_headshot_damage`, // 14
          `special_bonus_attack_speed_30`, // 15
          `sniper_assassinate`, // 16
          "special_bonus_attributes", // 17
          "sniper_assassinate", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_sniper_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_attack_range_100", // 25
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
            `greater_crit`,
            `mjollnir`,
          ],
          neutral: [
            `duelist_gloves`,
            `lance_of_pursuit`,
            `orb_of_destruction`,
            "grove_bow",
            `enchanted_quiver`,
            "elven_tunic",
            `mind_breaker`,
            `ninja_gear`,
            "pirate_hat",
            `desolator_2`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2725332187,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 39830,
        abilities: [
          "sniper_headshot", // 1
          "sniper_shrapnel", // 2
          `sniper_shrapnel`, // 3
          `sniper_headshot`, // 4
          "sniper_shrapnel", // 5
          "sniper_assassinate", // 6
          "sniper_shrapnel", // 7
          "sniper_take_aim", // 8
          `sniper_headshot`, // 9
          `sniper_headshot`, // 10
          "sniper_take_aim", // 11
          "sniper_assassinate", // 12
          `sniper_take_aim`, // 13
          `sniper_take_aim`, // 14
          `special_bonus_unique_sniper_headshot_damage`, // 15
          `special_bonus_unique_sniper_5`, // 16
          "special_bonus_attributes", // 17
          "sniper_assassinate", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_sniper_1", // 20
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
            `aghanims_shard`,
            `angels_demise`,
            `ultimate_scepter`,
            `force_staff`,
          ],
          late_game: [
            `ethereal_blade`,
            `boots_of_bearing`,
            `blink`,
            `octarine_core`,
            `aeon_disk`,
          ],
          situational: [
            `power_treads`,
            `spirit_vessel`,
            "glimmer_cape",
            `veil_of_discord`,
            `pavise`,
            `aether_lens`,
            `solar_crest`,
            `cyclone`,
            `ghost`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            "tranquil_boots",
            `phylactery`,
            "aghanims_shard",
            `angels_demise`,
            `ultimate_scepter`,
            `force_staff`,
            `ethereal_blade`,
            `octarine_core`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699963243,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "spectre_spectral_dagger", // 1
          "spectre_dispersion", // 2
          "spectre_spectral_dagger", // 3
          "spectre_dispersion", // 4
          "spectre_spectral_dagger", // 5
          "spectre_haunt_single", // 6
          "spectre_spectral_dagger", // 7
          "spectre_dispersion", // 8
          "spectre_dispersion", // 9
          "special_bonus_unique_spectre_desolate_radius", // 10
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
            "branches",
            "circlet",
            "slippers",
          ],
          early_game: [
            "wraith_band",
            "power_treads",
            "magic_wand",
            "blade_mail",
          ],
          mid_game: ["radiance", "manta", "aghanims_shard"],
          late_game: [
            "ultimate_scepter",
            "skadi",
            "abyssal_blade",
            "butterfly",
            "bloodthorn",
          ],
          situational: [
            "falcon_blade",
            "echo_sabre",
            "diffusal_blade",
            "hand_of_midas",
            "moon_shard",
            "black_king_bar",
            "nullifier",
            "sheepstick",
            "heart",
            "refresher",
          ],
          core: [
            "power_treads",
            "blade_mail",
            "radiance",
            "manta",
            "ultimate_scepter",
            "aghanims_shard",
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
    combo: [`spectre_haunt`, `spectre_reality`, `manta`, `diffusal_blade`],
    counter_items: {
      laning_phase: { all: [], support: [], core: [] },
      mid_game: {
        all: ["mekansm"],
        support: ["glimmer_cape", "ghost"],
        core: ["hurricane_pike", "silver_edge", "crimson_guard"],
      },
      late_game: {
        all: ["sheepstick", "ethereal_blade", "aeon_disk"],
        support: [],
        core: ["abyssal_blade", "butterfly", "bloodthorn"],
      },
    },
  },

  spirit_breaker: {
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2699963328,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
          early_game: [
            `phase_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `invis_sword`,
            `ultimate_scepter`,
            `ancient_janggo`,
            `aghanims_shard`,
          ],
          late_game: [
            `octarine_core`,
            `yasha_and_kaya`,
            `wind_waker`,
            `assault`,
          ],
          situational: [
            "orb_of_venom",
            `hand_of_midas`,
            `urn_of_shadows`,
            `pavise`,
            `spirit_vessel`,
            `glimmer_cape`,
            `force_staff`,
            `solar_crest`,
            `heavens_halberd`,
            `lotus_orb`,
            `silver_edge`,
            `blade_mail`,
            `black_king_bar`,
            `boots_of_bearing`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `wind_lace`,
            `invis_sword`,
            `ultimate_scepter`,
            `ancient_janggo`,
            `octarine_core`,
            `yasha_and_kaya`,
          ],
          neutral: [
            "broom_handle",
            `faded_broach`,
            `gossamer_cape`,
            `vambrace`,
            `ceremonial_robe`,
            //`quickening_charm`,
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

        steam_guide_link_id: 2726400030,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
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
            `slippers`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `vanguard`,
            `phase_boots`,
            "magic_wand",
            `wraith_band`,
            `wind_lace`,
          ],
          mid_game: [
            "invis_sword",
            "ultimate_scepter",
            `yasha_and_kaya`,
            `octarine_core`,
          ],
          late_game: [`black_king_bar`, `wind_waker`, `harpoon`, `assault`],
          situational: [
            `hand_of_midas`,
            `spirit_vessel`,
            `phylactery`,
            `crimson_guard`,
            `pipe`,
            `cyclone`,
            `heavens_halberd`,
            `solar_crest`,
            `lotus_orb`,
            `aghanims_shard`,
            `sphere`,
            `boots_of_bearing`,
            `silver_edge`,
            `blade_mail`,
            `heart`,
            `assault`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            "wind_lace",
            "invis_sword",
            "ultimate_scepter",
            `yasha_and_kaya`,
            `octarine_core`,
            `black_king_bar`,
            `wind_waker`,
          ],
          neutral: [
            `broom_handle`,
            `faded_broach`,
            `dragon_scale`,
            `vambrace`,
            `cloak_of_flames`,
            //`quickening_charm`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2699963425,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "storm_spirit_static_remnant", // 1
          "storm_spirit_overload", // 2
          "storm_spirit_electric_vortex", // 3
          "storm_spirit_static_remnant", // 4
          "storm_spirit_static_remnant", // 5
          "storm_spirit_ball_lightning", // 6
          "storm_spirit_static_remnant", // 7
          "storm_spirit_overload", // 8
          "storm_spirit_overload", // 9
          `special_bonus_mp_regen_150`, // 10
          `storm_spirit_overload`, // 11
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
          mid_game: [
            `power_treads`,
            `witch_blade`,
            `kaya_and_sange`,
            `black_king_bar`,
            `aghanims_shard`,
          ],
          late_game: [
            `sheepstick`,
            `ultimate_scepter`,
            `bloodthorn`,
            `revenants_brooch`,
          ],
          situational: [
            `null_talisman`,
            `sphere`,
            `shivas_guard`,
            `cyclone`,
            `orchid`,
            `bloodstone`,
            `refresher`,
            `travel_boots`,
          ],
          core: [
            "bottle",
            `power_treads`,
            `falcon_blade`,
            `witch_blade`,
            `kaya_and_sange`,
            "aghanims_shard",
            `ultimate_scepter`,
            `sheepstick`,
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
      `storm_spirit_electric_vortex`,
      `attack`,
      `storm_spirit_static_remnant`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "infused_raindrop", "cloak"],
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
        core: ["abyssal_blade", "butterfly"],
      },
    },
  },

  // eidendota plays hero
  sven: {
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_link_id: 2699963505,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40587,
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
          "special_bonus_attack_speed_15", // 10
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2699933135,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `guardian_greaves`,
            `glimmer_cape`,
            `force_staff`,
            `ultimate_scepter`,
          ],
          late_game: [
            `ethereal_blade`,
            `aghanims_shard`,
            `octarine_core`,
            `sheepstick`,
          ],
          situational: [
            `ring_of_basilius`,
            `soul_ring`,
            `veil_of_discord`,
            `spirit_vessel`,
            `cyclone`,
            "glimmer_cape",
            `guardian_greaves`,
            `pavise`,
            `veil_of_discord`,
            `aghanims_shard`,
            "blink",
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `guardian_greaves`,
            `glimmer_cape`,
            `force_staff`,
            `ultimate_scepter`,
            `ethereal_blade`,
            "octarine_core",
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
            //`fallen_sky`,
            `seer_stone`,
          ],
        },
      },
      {
        // INPUT MICHEL: GUIDE TO BE UPDATED BY BANE, NOW IT IS JUST A COPY OF THE OTHER GUIDE
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2776661467,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `aether_lens`,
            `ethereal_blade`,
            `travel_boots`,
            `octarine_core`,
          ],
          late_game: [
            `ultimate_scepter`,
            `sheepstick`,
            `shivas_guard`,
            "overwhelming_blink",
          ],
          situational: [
            `null_talisman`,
            `ring_of_basilius`,
            `glimmer_cape`,
            `veil_of_discord`,
            `guardian_greaves`,
            "black_king_bar",
            "aeon_disk",
            "sphere",
            `shivas_guard`,
            `pipe`,
            `cyclone`,
            `force_staff`,
            `dagon_5`,
            `bloodstone`,
            `aghanims_shard`,
            `travel_boots_2`,
          ],
          core: [
            `bottle`,
            `arcane_boots`,
            `aether_lens`,
            `ethereal_blade`,
            `travel_boots`,
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
            //`fallen_sky`,
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
    gameplay_version: "7.35b",
    creator: ContentCreator.yongy146,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_link_id: 2699963659,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40602,
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
            "aghanims_shard",
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
        steam_guide_link_id: 2726399928,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40613,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699963755,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          "special_bonus_unique_terrorblade_6", // 15
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
          mid_game: ["dragon_lance", "manta", "skadi", "black_king_bar"],
          late_game: [
            "butterfly",
            "satanic",
            "greater_crit",
            "hurricane_pike",
            "refresher",
          ],
          situational: [
            "hand_of_midas",
            "aghanims_shard",
            "infused_raindrop",
            "monkey_king_bar",
            "sange_and_yasha",
            "sphere",
            "bloodthorn",
            "silver_edge",
            "diffusal_blade",
            "blink",
          ],
          core: ["manta", "skadi", "black_king_bar", "butterfly"],
          neutral: [
            "unstable_wand",
            "broom_handle",
            "grove_bow",
            "pupils_gift",
            //"ring_of_aquila",
            //"titan_sliver",
            "elven_tunic",
            "mind_breaker",
            "ninja_gear",
            "apex",
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2699963852,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
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
          `special_bonus_unique_tidehunter_4`, // 20
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
            `meteor_hammer`,
            `arcane_boots`,
            `soul_ring`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [`blink`, `guardian_greaves`, `pipe`, `aghanims_shard`],
          late_game: [
            `ultimate_scepter`,
            `refresher`,
            `shivas_guard`,
            `octarine_core`,
          ],
          situational: [
            `phase_boots`,
            `hand_of_midas`,
            `solar_crest`,
            `force_staff`,
            "heavens_halberd",
            `lotus_orb`,
            `vladmir`,
            `black_king_bar`,
            `sphere`,
            `aeon_disk`,
            `assault`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `meteor_hammer`,
            `arcane_boots`,
            `soul_ring`,
            `blink`,
            `guardian_greaves`,
            `pipe`,
            `aghanims_shard`,
            "ultimate_scepter",
            `refresher`,
            `shivas_guard`,
          ],
          neutral: [
            //`pogo_stick`,
            `arcane_ring`,
            `bullwhip`,
            `dragon_scale`,
            "cloak_of_flames",
            //`quickening_charm`,
            `timeless_relic`,
            //`spell_prism`,
            //`fallen_sky`,
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
        core: [
          "black_king_bar",
          "silver_edge",
          "sange_and_yasha",
          "kaya_and_sange",
        ],
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2699963963,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40553,
        abilities: [
          "shredder_whirling_death", // 1
          "shredder_reactive_armor", // 2
          "shredder_reactive_armor", // 3
          "shredder_timber_chain", // 4
          `shredder_timber_chain`, // 5
          "shredder_chakram", // 6
          "shredder_timber_chain", // 7
          "shredder_timber_chain", // 8
          `shredder_whirling_death`, // 9
          `shredder_whirling_death`, // 10
          `shredder_whirling_death`, // 11
          "shredder_chakram", // 12
          `shredder_reactive_armor`, // 13
          `shredder_reactive_armor`, // 14
          `special_bonus_mp_regen_150`, // 15
          `special_bonus_unique_timbersaw_5`, // 16
          "special_bonus_attributes", // 17
          "shredder_chakram", // 18
          "special_bonus_attributes", // 19
          "special_bonus_magic_resistance_20", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_timbersaw", // 25
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
            `arcane_boots`,
            `soul_ring`,
            `veil_of_discord`,
            "magic_wand",
            `wind_lace`,
          ],
          mid_game: [
            `eternal_shroud`,
            `kaya_and_sange`,
            `shivas_guard`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          late_game: [
            `blink`,
            `sheepstick`,
            `octarine_core`,
            `overwhelming_blink`,
          ],
          situational: [
            "orb_of_corrosion",
            `bracer`,
            `vanguard`,
            `cyclone`,
            `bloodstone`,
            `crimson_guard`,
            `pipe`,
            `eternal_shroud`,
            `guardian_greaves`,
            `lotus_orb`,
            `heavens_halberd`,
            `black_king_bar`,
            `sphere`,
            `aeon_disk`,
            `heart`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `soul_ring`,
            `veil_of_discord`,
            `eternal_shroud`,
            `kaya_and_sange`,
            `shivas_guard`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `sheepstick`,
          ],
          neutral: [
            "arcane_ring",
            `occult_bracelet`,
            `vambrace`,
            `pupils_gift`,
            `craggy_coat`,
            "cloak_of_flames",
            `rattlecage`,
            `timeless_relic`,
            `apex`,
            `giants_ring`,
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
        core: ["ring_of_health"],
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link_id: 2699964058,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40588,
        abilities: [
          "tinker_laser", // 1
          "tinker_heat_seeking_missile", // 2
          "tinker_laser", // 3
          "tinker_heat_seeking_missile", // 4
          "tinker_laser", // 5
          "tinker_keen_teleport", // 6   Note Michel: Use 'tinker_keen_teleport' instead of 'tinker_rearm'
          "tinker_laser", // 7
          "tinker_heat_seeking_missile", // 8
          "tinker_heat_seeking_missile", // 9
          `tinker_defense_matrix`, // 10
          `special_bonus_mana_reduction_8`, // 11
          "tinker_keen_teleport", // 12
          "tinker_defense_matrix", // 13
          "tinker_defense_matrix", // 14
          `tinker_defense_matrix`, // 15
          `special_bonus_unique_tinker_7`, // 16
          "special_bonus_attributes", // 17
          "tinker_keen_teleport", // 18
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
          early_game: [`bottle`, `blink`, `soul_ring`, `veil_of_discord`],
          mid_game: [
            `shivas_guard`,
            `aether_lens`,
            `ethereal_blade`,
            `overwhelming_blink`,
            `black_king_bar`,
          ],
          late_game: [
            `sheepstick`,
            `ultimate_scepter`,
            `dagon_5`,
            `aghanims_shard`,
            `wind_waker`,
          ],
          situational: [
            `magic_wand`,
            `force_staff`,
            `kaya_and_sange`,
            `aeon_disk`,
            `arcane_blink`,
            `bloodstone`,
          ],
          core: [
            "bottle",
            `blink`,
            `soul_ring`,
            `shivas_guard`,
            `ethereal_blade`,
            `overwhelming_blink`,
            `black_king_bar`,
            `sheepstick`,
            `ultimate_scepter`,
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
      `tinker_keen_teleport`,
      `tinker_laser`,
      `shivas_guard`,
      `blink`,
      `tinker_heat_seeking_missile`,
      `tinker_rearm`,
    ],
    counter_items: {
      laning_phase: {
        all: ["ring_of_regen", "headdress", "infused_raindrop", "cloak"],
        support: ["tranquil_boots", "smoke_of_deceit"],
        core: ["ring_of_health"],
      },
      mid_game: {
        all: ["lotus_orb", "blink"],
        support: ["glimmer_cape", "smoke_of_deceit", "ward_observer"],
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
          "smoke_of_deceit",
          "ward_observer",
          "black_king_bar",
          "travel_boots",
        ],
        core: ["monkey_king_bar", "abyssal_blade", "satanic", "heart"],
      },
    },
  },

  tiny: {
    gameplay_version: "7.35b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699964139,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40554,
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
          `special_bonus_movement_speed_20`, // 11
          "tiny_grow", // 12
          "tiny_tree_grab", // 13
          "tiny_tree_grab", // 14
          "special_bonus_unique_tiny", // 15
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
            `octarine_core`,
            `ethereal_blade`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `sheepstick`,
          ],
          situational: [
            `tranquil_boots`,
            `soul_ring`,
            `spirit_vessel`,
            `glimmer_cape`,
            `invis_sword`,
            `lotus_orb`,
            `angels_demise`,
            `solar_crest`,
            `boots_of_bearing`,
            `heavens_halberd`,
            `black_king_bar`,
            `aeon_disk`,
            `assault`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            "blink",
            "force_staff",
            `cyclone`,
            `octarine_core`,
            `ultimate_scepter`,
            `aghanims_shard`,
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
        steam_guide_link_id: 2729200744,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40555,
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
          "special_bonus_strength_10", // 11
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
            `lesser_crit`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          late_game: [`black_king_bar`, `greater_crit`, `harpoon`, `assault`],
          situational: [
            `hand_of_midas`,
            `silver_edge`,
            `angels_demise`,
            `assault`,
            `sange_and_yasha`,
            `manta`,
            `force_staff`,
            `sphere`,
            `aeon_disk`,
            `octarine_core`,
            `moon_shard`,
            `bloodthorn`,
            `swift_blink`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `power_treads`,
            `blink`,
            `echo_sabre`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `black_king_bar`,
            `greater_crit`,
            `assault`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            `ceremonial_robe`,
            `elven_tunic`,
            `mind_breaker`,
            `timeless_relic`,
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
        steam_guide_link_id: 2729201017,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40556,
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
          "special_bonus_strength_10", // 10
          "tiny_avalanche", // 11
          "tiny_grow", // 12
          "tiny_toss", // 13
          "tiny_toss", // 14
          "special_bonus_status_resistance_10", // 15
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
            `aghanims_shard`,
            `moon_shard`,
            `blink`,
            `black_king_bar`,
          ],
          late_game: [`greater_crit`, `assault`, `satanic`, `harpoon`],
          situational: [
            `hand_of_midas`,
            `silver_edge`,
            `ultimate_scepter`,
            `assault`,
            `sange_and_yasha`,
            `manta`,
            `skadi`,
            `sphere`,
            `monkey_king_bar`,
            `nullifier`,
            `bloodthorn`,
            `butterfly`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            `power_treads`,
            `echo_sabre`,
            `aghanims_shard`,
            `moon_shard`,
            `blink`,
            `black_king_bar`,
            `greater_crit`,
            `satanic`,
          ],
          neutral: [
            `broom_handle`,
            `unstable_wand`,
            `pupils_gift`,
            `vambrace`,
            `elven_tunic`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699934294,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40580,
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
            "orb_of_venom",
            `enchanted_mango`,
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
            `tranquil_boots`,
            `soul_ring`,
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
            `force_staff`,
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
            `demonicon`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699964271,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "troll_warlord_whirling_axes_ranged", // 1
          "troll_warlord_berserkers_rage", // 2
          "troll_warlord_whirling_axes_ranged", // 3
          "troll_warlord_fervor", // 4
          "troll_warlord_whirling_axes_ranged", // 5
          "troll_warlord_battle_trance", // 6
          "troll_warlord_whirling_axes_ranged", // 7
          "troll_warlord_berserkers_rage", // 8
          "troll_warlord_berserkers_rage", // 9
          "troll_warlord_berserkers_rage", // 10
          "troll_warlord_fervor", // 11
          "troll_warlord_battle_trance", // 12
          "troll_warlord_fervor", // 13
          "special_bonus_unique_troll_warlord_2", // 14
          "special_bonus_unique_troll_warlord_5", // 15 Note Michel: Can't skill level 15 before level 10 in Dota 2 guides
          "troll_warlord_fervor", // 16
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
            "magic_stick",
            "circlet",
          ],
          early_game: [
            "wraith_band",
            "power_treads",
            "cornucopia",
            "magic_wand",
          ],
          mid_game: ["bfury", "sange_and_yasha", "black_king_bar", "basher"],
          late_game: ["satanic", "abyssal_blade", "skadi", "butterfly"],
          situational: [
            "infused_raindrop",
            "blink",
            "monkey_king_bar",
            "sphere",
            "silver_edge",
            "ultimate_scepter",
            "bloodthorn",
            "greater_crit",
            "aghanims_shard",
            "maelstrom",
            "manta",
          ],
          core: [
            "bfury",
            "sange_and_yasha",
            "black_king_bar",
            "abyssal_blade",
            "satanic",
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
    combo: [],
    counter_items: {
      laning_phase: {
        all: ["magic_stick", "wind_lace", "boots", "armor"],
        support: [],
        core: ["ring_of_health", "vanguard"],
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2699964354,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
        abilities: [
          `tusk_ice_shards`, // 1
          `tusk_tag_team`, // 2
          "tusk_snowball", // 3
          "tusk_tag_team", // 4
          "tusk_tag_team", // 5
          "tusk_walrus_punch", // 6
          "tusk_tag_team", // 7
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
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `ward_sentry`,
            `tranquil_boots`,
            `magic_wand`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`solar_crest`, `blink`, `force_staff`, `aghanims_shard`],
          late_game: [
            `ultimate_scepter`,
            `octarine_core`,
            `boots_of_bearing`,
            `assault`,
          ],
          situational: [
            `orb_of_corrosion`,
            `urn_of_shadows`,
            `guardian_greaves`,
            `pavise`,
            `aether_lens`,
            `glimmer_cape`,
            `ghost`,
            `lotus_orb`,
            `black_king_bar`,
            `heavens_halberd`,
            `aeon_disk`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `solar_crest`,
            `blink`,
            `force_staff`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `octarine_core`,
          ],
          neutral: [
            `trusty_shovel`,
            `arcane_ring`,
            "bullwhip",
            `philosophers_stone`,
            `ceremonial_robe`,
            //`quickening_charm`,
            //`spell_prism`,
            "trickster_cloak",
            `giants_ring`,
            "force_field",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE], // NEW GUIDE

        steam_guide_link_id: 2776954201,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
        abilities: [
          `tusk_ice_shards`, // 1
          `tusk_tag_team`, // 2
          `tusk_snowball`, // 3
          `tusk_ice_shards`, // 4
          `tusk_ice_shards`, // 5
          "tusk_walrus_punch", // 6
          `tusk_ice_shards`, // 7
          "tusk_snowball", // 8
          "tusk_snowball", // 9
          `tusk_snowball`, // 10
          `tusk_tag_team`, // 11
          "tusk_walrus_punch", // 12
          `tusk_tag_team`, // 13
          `tusk_tag_team`, // 14
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
          late_game: [`black_king_bar`, `octarine_core`, `harpoon`, `assault`],
          situational: [
            `orb_of_corrosion`,
            `falcon_blade`,
            `soul_ring`,
            `vanguard`,
            `hand_of_midas`,
            `echo_sabre`,
            `crimson_guard`,
            `pipe`,
            `blade_mail`,
            `force_staff`,
            `silver_edge`,
            `solar_crest`,
            `heavens_halberd`,
            `lotus_orb`,
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
            `octarine_core`,
            `harpoon`,
          ],
          neutral: [
            `broom_handle`,
            `arcane_ring`,
            `orb_of_destruction`,
            `dragon_scale`,
            `cloak_of_flames`,
            //`titan_sliver`,
            `mind_breaker`,
            //`penta_edged_sword`,
            `giants_ring`,
            `desolator_2`,
          ],
        },
      },
    ],
    combo: [
      `tusk_tag_team`,
      `blink`,
      `tusk_walrus_punch`,
      `tusk_ice_shards`,
      `tusk_snowball`,
    ],
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2699964445,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
        abilities: [
          `abyssal_underlord_firestorm`, // 1
          `abyssal_underlord_atrophy_aura`, // 2
          `abyssal_underlord_firestorm`, // 3
          `abyssal_underlord_atrophy_aura`, // 4
          "abyssal_underlord_firestorm", // 5
          "abyssal_underlord_dark_portal", // 6
          "abyssal_underlord_firestorm", // 7
          "abyssal_underlord_pit_of_malice", // 8
          "abyssal_underlord_pit_of_malice", // 9
          "abyssal_underlord_pit_of_malice", // 10
          "abyssal_underlord_pit_of_malice", // 11
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
            `ward_observer`,
          ],
          early_game: [
            "vanguard",
            `soul_ring`,
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `bloodstone`,
            `rod_of_atos`,
            `guardian_greaves`,
            `pipe`,
            `crimson_guard`,
          ],
          late_game: [
            `aghanims_shard`,
            `shivas_guard`,
            `assault`,
            `octarine_core`,
          ],
          situational: [
            `solar_crest`,
            `lotus_orb`,
            `sphere`,
            `ultimate_scepter`,
            `force_staff`,
            `blade_mail`,
            "radiance",
            `heavens_halberd`,
            `black_king_bar`,
            `sheepstick`,
            `overwhelming_blink`,
            `travel_boots`,
          ],
          core: [
            `vanguard`,
            `soul_ring`,
            `arcane_boots`,
            `bloodstone`,
            `rod_of_atos`,
            `guardian_greaves`,
            `pipe`,
            `aghanims_shard`,
          ],
          neutral: [
            `occult_bracelet`,
            `arcane_ring`,
            `vambrace`,
            `bullwhip`,
            "cloak_of_flames",
            "ogre_seal_totem",
            `havoc_hammer`,
            `trickster_cloak`,
            `giants_ring`,
            //`fallen_sky`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699964521,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
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
        steam_guide_link_id: 2971195922,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699964646,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "ursa_fury_swipes", // 1
          "ursa_earthshock", // 2
          "ursa_fury_swipes", // 3
          "ursa_overpower", // 4
          "ursa_fury_swipes", // 5
          "ursa_enrage", // 6
          "ursa_fury_swipes", // 7
          "ursa_overpower", // 8
          "ursa_overpower", // 9
          "ursa_overpower", // 10
          "ursa_earthshock", // 11
          "ursa_enrage", // 12
          "ursa_earthshock", // 13
          "special_bonus_unique_ursa_4", // 14
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
          "special_bonus_unique_ursa_7", // 25
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
            "phase_boots",
            "wraith_band",
            "magic_wand",
            "cornucopia",
          ],
          mid_game: [
            "bfury",
            "blink",
            "basher",
            "black_king_bar",
            "aghanims_shard",
          ],
          late_game: [
            "ultimate_scepter",
            "satanic",
            "abyssal_blade",
            "swift_blink",
          ],
          situational: [
            "diffusal_blade",
            "monkey_king_bar",
            "nullifier",
            "sange_and_yasha",
            "sphere",
            "travel_boots",
          ],
          core: [
            "bfury",
            "blink",
            "basher",
            "black_king_bar",
            "ultimate_scepter",
            "aghanims_shard",
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
        all: ["cyclone", /*"medallion_of_courage",*/ "solar_crest"],
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699964761,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40557,
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
          `special_bonus_unique_vengeful_spirit_1`, // 20
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
            `vladmir`,
          ],
          late_game: [
            `boots_of_bearing`,
            `hurricane_pike`,
            `angels_demise`,
            `skadi`,
          ],
          situational: [
            `arcane_boots`,
            `aether_lens`,
            `spirit_vessel`,
            `ancient_janggo`,
            `cyclone`,
            `glimmer_cape`,
            `force_staff`,
            `pipe`,
            `ghost`,
            `guardian_greaves`,
            `heavens_halberd`,
            `butterfly`,
            `lotus_orb`,
            `octarine_core`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `ring_of_basilius`,
            `solar_crest`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `vladmir`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],

        steam_guide_link_id: 2699964844,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
        abilities: [
          `venomancer_venomous_gale`, // 1
          `venomancer_poison_sting`, // 2
          "venomancer_poison_sting", // 3
          `venomancer_venomous_gale`, // 4
          "venomancer_plague_ward", // 5
          `venomancer_noxious_plague`, // 6
          "venomancer_plague_ward", // 7
          `venomancer_plague_ward`, // 8
          `venomancer_plague_ward`, // 9
          `venomancer_poison_sting`, // 10
          "venomancer_poison_sting", // 11
          `venomancer_noxious_plague`, // 12
          `special_bonus_unique_venomancer_poisonsting_regen_reduction`, // 13
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
            `arcane_boots`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [
            `spirit_vessel`,
            `solar_crest`,
            `pipe`,
            `ultimate_scepter`,
          ],
          late_game: [
            `octarine_core`,
            `hurricane_pike`,
            `shivas_guard`,
            `overwhelming_blink`,
          ],
          situational: [
            `vanguard`,
            `hand_of_midas`,
            `veil_of_discord`,
            `boots_of_bearing`,
            `lotus_orb`,
            `heavens_halberd`,
            `kaya_and_sange`,
            `rod_of_atos`,
            `crimson_guard`,
            `guardian_greaves`,
            `black_king_bar`,
            `ethereal_blade`,
            `cyclone`,
            `sheepstick`,
            `aeon_disk`,
            `manta`,
            `sphere`,
            `gungir`,
            `skadi`,
            `butterfly`,
            `aghanims_shard`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `arcane_boots`,
            `spirit_vessel`,
            `solar_crest`,
            `pipe`,
            "ultimate_scepter",
            `octarine_core`,
            `refresher`,
          ],
          neutral: [
            `arcane_ring`,
            `unstable_wand`,
            "grove_bow",
            `pupils_gift`,
            "ceremonial_robe",
            //`quickening_charm`,
            "timeless_relic",
            //"spell_prism",
            //`fallen_sky`,
            `apex`,
          ],
        },
        // ability_tooltips:
        /* venomancer_venomous_gale:
            "You can skill this spell on level 1 if you are fighting at the 0min rune. You can also put a second point into this spell at level 4 if you are able to play aggressively on the lane.", */
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2729605047,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
        abilities: [
          `venomancer_venomous_gale`, // 1
          `venomancer_poison_sting`, // 2
          `venomancer_venomous_gale`, // 3
          `venomancer_poison_sting`, // 4
          `venomancer_plague_ward`, // 5
          `venomancer_noxious_plague`, // 6
          `venomancer_plague_ward`, // 7
          `venomancer_plague_ward`, // 8
          `venomancer_poison_sting`, // 9
          `venomancer_poison_sting`, // 10
          `special_bonus_unique_venomancer_poisonsting_regen_reduction`, // 11
          `venomancer_noxious_plague`, // 12
          `venomancer_plague_ward`, // 13
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
            `enchanted_mango`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `tranquil_boots`,
            `urn_of_shadows`,
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `spirit_vessel`,
            `solar_crest`,
            `force_staff`,
            `ultimate_scepter`,
          ],
          late_game: [
            `boots_of_bearing`,
            `octarine_core`,
            `sheepstick`,
            `wind_waker`,
          ],
          situational: [
            `ring_of_basilius`,
            `glimmer_cape`,
            `veil_of_discord`,
            `lotus_orb`,
            `heavens_halberd`,
            `aether_lens`,
            `guardian_greaves`,
            `pipe`,
            `ghost`,
            `cyclone`,
            `aeon_disk`,
            `blink`,
            `travel_boots`,
          ],
          core: [
            `tranquil_boots`,
            `spirit_vessel`,
            `solar_crest`,
            `force_staff`,
            `ultimate_scepter`,
            `boots_of_bearing`,
            `octarine_core`,
          ],
          neutral: [
            `arcane_ring`,
            `trusty_shovel`,
            `philosophers_stone`,
            `bullwhip`,
            `ceremonial_robe`,
            //`quickening_charm`,
            `timeless_relic`,
            //`spell_prism`,
            `force_field`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2699964923,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40558,
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
          `special_bonus_unique_viper_1`, // 11
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
            `veil_of_discord`,
            `hurricane_pike`,
            `ultimate_scepter`,
            `shivas_guard`,
            `aghanims_shard`,
          ],
          late_game: [`manta`, `skadi`, `sheepstick`, `butterfly`],
          situational: [
            `ring_of_basilius`,
            "spirit_vessel",
            `eternal_shroud`,
            `pipe`,
            `crimson_guard`,
            `rod_of_atos`,
            `blink`,
            `bloodstone`,
            `kaya_and_sange`,
            `gungir`,
            `mage_slayer`,
            `devastator`,
            `lotus_orb`,
            `sphere`,
            `aeon_disk`,
            `heavens_halberd`,
            `bloodthorn`,
            `black_king_bar`,
            `assault`,
            `travel_boots`,
          ],
          core: [
            `wraith_band`,
            `power_treads`,
            `veil_of_discord`,
            `hurricane_pike`,
            `ultimate_scepter`,
            `shivas_guard`,
            `aghanims_shard`,
            `manta`,
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
        steam_guide_link_id: 2729605437,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40559,
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
            `branches`,
            `branches`,
            `branches`,
            `circlet`,
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
            `hurricane_pike`,
            `manta`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          late_game: [`black_king_bar`, `skadi`, `bloodthorn`, `butterfly`],
          situational: [
            `ring_of_basilius`,
            `falcon_blade`,
            `hand_of_midas`,
            `veil_of_discord`,
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
            `mage_slayer`,
            `devastator`,
            `shivas_guard`,
            `assault`,
            `travel_boots_2`,
          ],
          core: [
            `bottle`,
            `power_treads`,
            `hurricane_pike`,
            `manta`,
            `ultimate_scepter`,
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_link_id: 2699965007,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        dota_fire_id: 40572,
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
            `wraith_band`,
            `bracer`,
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
          ],
          mid_game: [
            `vladmir`,
            `orchid`,
            `bloodthorn`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `ancient_janggo`,
          ],
          late_game: [`sheepstick`, `assault`, `boots_of_bearing`, `nullifier`],
          situational: [
            `tranquil_boots`,
            `blight_stone`,
            `veil_of_discord`,
            `spirit_vessel`,
            `phylactery`,
            `crimson_guard`,
            `rod_of_atos`,
            `guardian_greaves`,
            `pipe`,
            `blink`,
            `black_king_bar`,
            `aeon_disk`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `boots`,
            `vladmir`,
            `bloodthorn`,
            `aghanims_shard`,
            `ultimate_scepter`,
            `sheepstick`,
            `assault`,
            `boots_of_bearing`,
          ],
          neutral: [
            `unstable_wand`,
            `spark_of_courage`,
            "grove_bow",
            `orb_of_destruction`,
            `elven_tunic`,
            "enchanted_quiver",
            `mind_breaker`,
            `trickster_cloak`,
            `desolator_2`,
            `apex`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_link_id: 2729605654,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        dota_fire_id: 40589,
        abilities: [
          "visage_grave_chill", // 1
          "visage_gravekeepers_cloak", // 2
          "visage_grave_chill", // 3
          `visage_soul_assumption`, // 4
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
            `faerie_fire`,
            `circlet`,
            `circlet`,
            `branches`,
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `wraith_band`,
            `bracer`,
            `boots`,
            `magic_wand`,
            `ring_of_basilius`,
            `wind_lace`,
          ],
          mid_game: [
            `orchid`,
            `bloodthorn`,
            `vladmir`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `ancient_janggo`,
          ],
          late_game: [`sheepstick`, `assault`, `boots_of_bearing`, `nullifier`],
          situational: [
            `tranquil_boots`,
            `power_treads`,
            `blight_stone`,
            `veil_of_discord`,
            `phylactery`,
            `crimson_guard`,
            `witch_blade`,
            `devastator`,
            `pipe`,
            `blink`,
            `black_king_bar`,
            `aeon_disk`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `boots`,
            `bloodthorn`,
            `vladmir`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `sheepstick`,
            `assault`,
            `boots_of_bearing`,
          ],
          neutral: [
            `unstable_wand`,
            `spark_of_courage`,
            `grove_bow`,
            `orb_of_destruction`,
            `elven_tunic`,
            `enchanted_quiver`,
            `mind_breaker`,
            `trickster_cloak`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2699965099,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "void_spirit_resonant_pulse", // 1
          "void_spirit_aether_remnant", // 2
          "void_spirit_resonant_pulse", // 3
          `void_spirit_aether_remnant`, // 4
          `void_spirit_resonant_pulse`, // 5
          "void_spirit_astral_step", // 6
          `void_spirit_resonant_pulse`, // 7
          "void_spirit_dissimilate", // 8
          `void_spirit_aether_remnant`, // 9
          `void_spirit_aether_remnant`, // 10
          `special_bonus_unique_void_spirit_2`, // 11
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
            "quelling_blade",
            "faerie_fire",
            "circlet",
            `branches`,
            `branches`,
            "ward_observer",
          ],
          early_game: [
            `bottle`,
            `power_treads`,
            `magic_wand`,
            `bracer`,
            `urn_of_shadows`,
          ],
          mid_game: [
            `spirit_vessel`,
            `echo_sabre`,
            `manta`,
            `ultimate_scepter`,
            `skadi`,
          ],
          late_game: [`harpoon`, `greater_crit`, `bloodthorn`, `satanic`],
          situational: [
            `yasha_and_kaya`,
            `aghanims_shard`,
            `desolator`,
            `sphere`,
            `black_king_bar`,
            `dagon_5`,
            `ethereal_blade`,
            `revenants_brooch`,
            `octarine_core`,
            `sheepstick`,
            `mage_slayer`,
            `silver_edge`,
            `skadi`,
            `abyssal_blade`,
            `disperser`,
            `assault`,
            `rapier`,
            `travel_boots`,
          ],
          core: [
            "bottle",
            `power_treads`,
            `spirit_vessel`,
            `echo_sabre`,
            `manta`,
            `ultimate_scepter`,
            `skadi`,
            `greater_crit`,
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

        steam_guide_link_id: 2778135054,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
        abilities: [
          "void_spirit_resonant_pulse", // 1
          "void_spirit_aether_remnant", // 2
          "void_spirit_resonant_pulse", // 3
          "void_spirit_dissimilate", // 4
          `void_spirit_resonant_pulse`, // 5
          "void_spirit_astral_step", // 6
          `void_spirit_resonant_pulse`, // 7
          `void_spirit_aether_remnant`, // 8
          `void_spirit_aether_remnant`, // 9
          `void_spirit_aether_remnant`, // 10
          `special_bonus_unique_void_spirit_2`, // 11
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
            `quelling_blade`,
            `circlet`,
            "circlet",
            "branches",
            `branches`,
            `ward_observer`,
          ],
          early_game: [
            `bracer`,
            `wraith_band`,
            `power_treads`,
            `magic_wand`,
            `urn_of_shadows`,
          ],
          mid_game: [
            `spirit_vessel`,
            `echo_sabre`,
            `manta`,
            `ultimate_scepter`,
          ],
          late_game: [`black_king_bar`, `skadi`, `greater_crit`, `sheepstick`],
          situational: [
            `vanguard`,
            `arcane_boots`,
            `harpoon`,
            `kaya_and_sange`,
            `aghanims_shard`,
            `sphere`,
            `dagon_5`,
            `ethereal_blade`,
            `revenants_brooch`,
            `octarine_core`,
            `aeon_disk`,
            `cyclone`,
            `silver_edge`,
            `bloodthorn`,
            `blade_mail`,
            `assault`,
            `rapier`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `wraith_band`,
            "power_treads",
            `spirit_vessel`,
            `echo_sabre`,
            `manta`,
            `ultimate_scepter`,
            `black_king_bar`,
            `greater_crit`,
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
      `void_spirit_aether_remnant`,
      `void_spirit_dissimilate`,
      `void_spirit_resonant_pulse`,
      `void_spirit_astral_step`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          "blight_stone",
          "magic_stick",
          "ring_of_regen",
          "wind_lace",
          "boots",
          "infused_raindrop",
          "cloak",
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: ["rod_of_atos"],
        support: ["glimmer_cape", "force_staff"],
        core: [
          "mage_slayer",
          /* "hood_of_defiance", */
          "pipe",
          "eternal_shroud",
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2699965199,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
        abilities: [
          `warlock_fatal_bonds`, // 1
          `warlock_shadow_word`, // 2
          `warlock_fatal_bonds`, // 3
          `warlock_upheaval`, // 4
          `warlock_upheaval`, // 5
          "warlock_rain_of_chaos", // 6
          `warlock_upheaval`, // 7
          `warlock_upheaval`, // 8
          `warlock_fatal_bonds`, // 9
          `special_bonus_unique_warlock_upheaval_aoe`, // 10
          `warlock_fatal_bonds`, // 11
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
            `arcane_boots`,
            `pavise`,
            `hand_of_midas`,
            `holy_locket`,
            `guardian_greaves`,
            `force_staff`,
            `ghost`,
            `blink`,
            `lotus_orb`,
            `cyclone`,
            `travel_boots`,
          ],
          core: [
            `boots`,
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
            //`quickening_charm`,
            `psychic_headband`,
            "spy_gadget",
            //"spell_prism",
            `force_field`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2699965288,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
        abilities: [
          "weaver_shukuchi", // 1
          "weaver_geminate_attack", // 2
          `weaver_the_swarm`, // 3
          `weaver_shukuchi`, // 4
          "weaver_shukuchi", // 5
          "weaver_time_lapse", // 6
          "weaver_shukuchi", // 7
          "weaver_the_swarm", // 8
          "weaver_the_swarm", // 9
          `special_bonus_strength_8`, // 10
          `weaver_the_swarm`, // 11
          "weaver_time_lapse", // 12
          "weaver_geminate_attack", // 13
          "weaver_geminate_attack", // 14
          "special_bonus_unique_weaver_4", // 15
          "weaver_geminate_attack", // 16
          "special_bonus_attributes", // 17
          "weaver_time_lapse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_weaver_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_weaver_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "circlet",
            "blood_grenade",
            "branches",
            "branches",
            `ward_sentry`,
            "ward_observer",
          ],
          early_game: [`ward_sentry`, "urn_of_shadows", "magic_wand"],
          mid_game: ["spirit_vessel", `solar_crest`],
          late_game: [
            "ultimate_scepter",
            "aeon_disk",
            `black_king_bar`,
            `bloodthorn`,
            "sheepstick",
          ],
          situational: [
            "blink",
            `orchid`,
            `heavens_halberd`,
            `cyclone`,
            `ghost`,
            `force_staff`,
            "lotus_orb",
            `ethereal_blade`,
            `wind_waker`,
            `aghanims_shard`,
            `travel_boots`,
            "sphere",
          ],
          core: ["spirit_vessel", `solar_crest`, "ultimate_scepter"],
          neutral: [
            "arcane_ring",
            "trusty_shovel",
            //"ring_of_aquila",
            `bullwhip`,
            "enchanted_quiver",
            "ogre_seal_totem",
            "ascetic_cap",
            `stormcrafter`,
            "seer_stone",
            `mirror_shield`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2730987049,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "weaver_shukuchi", // 1
          "weaver_geminate_attack", // 2
          "weaver_shukuchi", // 3
          "weaver_the_swarm", // 4
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
            "branches",
            `branches`,
            "branches",
            "magic_stick",
            `circlet`,
          ],
          early_game: [
            `wraith_band`,
            `magic_wand`,
            `power_treads`,
            "maelstrom",
          ],
          mid_game: ["mjollnir", `black_king_bar`, `lesser_crit`],
          late_game: [
            "greater_crit",
            "satanic",
            `skadi`,
            "butterfly",
            "travel_boots",
          ],
          situational: [
            `monkey_king_bar`,
            `gungir`,
            "sphere",
            "hurricane_pike",
            `sange_and_yasha`,
            `manta`,
            `bloodthorn`,
            "nullifier",
            `moon_shard`,
          ],
          core: [`maelstrom`, "black_king_bar", "greater_crit", `skadi`],
          neutral: [
            `lance_of_pursuit`,
            "occult_bracelet",
            //"ring_of_aquila",
            "grove_bow",
            "elven_tunic",
            //"titan_sliver",
            "mind_breaker",
            "ninja_gear",
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],

        steam_guide_link_id: 2699965445,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        //dota_fire_id: ,
        abilities: [
          "windrunner_windrun", // 1
          `windrunner_shackleshot`, // 2
          "windrunner_powershot", // 3
          `windrunner_powershot`, // 4
          "windrunner_powershot", // 5
          `windrunner_shackleshot`, // 6
          "windrunner_powershot", // 7
          `windrunner_focusfire`, // 8
          `windrunner_shackleshot`, // 9
          `windrunner_shackleshot`, // 10
          "special_bonus_unique_windranger_9", // 11
          `windrunner_focusfire`, // 12
          `windrunner_windrun`, // 13
          `windrunner_windrun`, // 14
          `windrunner_windrun`, // 15
          `special_bonus_unique_windranger_4`, // 16
          "special_bonus_attributes", // 17
          "windrunner_focusfire", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_windranger_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_windranger_windrun_undispellable", // 25
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
          early_game: [`bracer`, `boots`, `magic_wand`, `spirit_vessel`],
          mid_game: [`aghanims_shard`, `blink`, `maelstrom`, `force_staff`],
          late_game: [
            `gungir`,
            `bloodthorn`,
            `ultimate_scepter`,
            `monkey_king_bar`,
          ],
          situational: [
            "infused_raindrop",
            `arcane_boots`,
            `orchid`,
            `aether_lens`,
            "lotus_orb",
            "solar_crest",
            `glimmer_cape`,
            `rod_of_atos`,
            `hurricane_pike`,
            `meteor_hammer`,
            `pavise`,
            `octarine_core`,
            `travel_boots`,
          ],

          core: [
            "boots",
            `spirit_vessel`,
            `aghanims_shard`,
            `blink`,
            "maelstrom",
            `gungir`,
            `ultimate_scepter`,
            `monkey_king_bar`,
          ],
          neutral: [
            "arcane_ring",
            `unstable_wand`,
            `pupils_gift`,
            "grove_bow",
            //`quickening_charm`,
            `enchanted_quiver`,
            //`spell_prism`,
            "spy_gadget",
            `desolator_2`,
            `apex`,
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2730986384,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          `windrunner_shackleshot`, // 10
          "windrunner_shackleshot", // 11
          "windrunner_focusfire", // 12
          `windrunner_shackleshot`, // 13
          `special_bonus_unique_windranger_9`, // 14
          `special_bonus_unique_windranger_4`, // 15
          `windrunner_powershot`, // 16
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
          mid_game: [`yasha`, `black_king_bar`, `ultimate_scepter`, `manta`],
          late_game: [`monkey_king_bar`, `blink`, `sphere`, `nullifier`],
          situational: [
            `infused_raindrop`,
            `aghanims_shard`,
            `hurricane_pike`,
            `diffusal_blade`,
            `silver_edge`,
            `gungir`,
            `greater_crit`,
            `mjollnir`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `power_treads`,
            `maelstrom`,
            "black_king_bar",
            `ultimate_scepter`,
            `manta`,
            `monkey_king_bar`,
            `blink`,
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

        steam_guide_link_id: 2730986473,
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        //dota_fire_id: ,
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
            `black_king_bar`,
            `ultimate_scepter`,
            `manta`,
            `aghanims_shard`,
          ],
          late_game: [`monkey_king_bar`, `blink`, `sphere`, `nullifier`],
          situational: [
            `infused_raindrop`,
            `hurricane_pike`,
            `diffusal_blade`,
            `silver_edge`,
            `gungir`,
            `greater_crit`,
            `mjollnir`,
            `travel_boots`,
          ],
          core: [
            `bracer`,
            `power_treads`,
            `maelstrom`,
            `black_king_bar`,
            `ultimate_scepter`,
            `manta`,
            `monkey_king_bar`,
            `blink`,
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
        all: ["cyclone"],
        support: ["glimmer_cape", "ghost"],
        core: [
          "blade_mail",
          "orchid",
          "heavens_halberd",
          "hurricane_pike",
          "ghost",
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699965518,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40579,
        abilities: [
          "winter_wyvern_arctic_burn", // 1
          "winter_wyvern_splinter_blast", // 2
          "winter_wyvern_splinter_blast", // 3
          `winter_wyvern_cold_embrace`, // 4
          "winter_wyvern_splinter_blast", // 5
          "winter_wyvern_winters_curse", // 6
          "winter_wyvern_splinter_blast", // 7
          `winter_wyvern_arctic_burn`, // 8
          `winter_wyvern_arctic_burn`, // 9
          "winter_wyvern_cold_embrace", // 10
          `winter_wyvern_cold_embrace`, // 11
          "winter_wyvern_winters_curse", // 12
          `winter_wyvern_cold_embrace`, // 13
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
            `aether_lens`,
            `blink`,
            `force_staff`,
            `aghanims_shard`,
          ],
          late_game: [`octarine_core`, `aeon_disk`, `refresher`, `sheepstick`],
          situational: [
            `null_talisman`,
            `holy_locket`,
            `pavise`,
            `solar_crest`,
            `glimmer_cape`,
            `cyclone`,
            `lotus_orb`,
            `ghost`,
            `hurricane_pike`,
            `witch_blade`,
            `mage_slayer`,
            `revenants_brooch`,
            `ultimate_scepter`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            "blink",
            `force_staff`,
            `aghanims_shard`,
            `octarine_core`,
            `refresher`,
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
          "sange_and_yasha",
          "kaya_and_sange",
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
    gameplay_version: `7.35b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_link_id: 2699957031,
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        dota_fire_id: 40574,
        abilities: [
          "witch_doctor_paralyzing_cask", // 1
          "witch_doctor_maledict", // 2
          "witch_doctor_maledict", // 3
          "witch_doctor_paralyzing_cask", // 4
          "witch_doctor_maledict", // 5
          "witch_doctor_death_ward", // 6
          "witch_doctor_maledict", // 7
          "witch_doctor_paralyzing_cask", // 8
          "witch_doctor_paralyzing_cask", // 9
          "special_bonus_unique_witch_doctor_6", // 10
          "witch_doctor_voodoo_restoration", // 11
          "witch_doctor_death_ward", // 12
          "witch_doctor_voodoo_restoration", // 13
          "witch_doctor_voodoo_restoration", // 14
          "special_bonus_unique_witch_doctor_3", // 15
          "witch_doctor_voodoo_restoration", // 16
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
            `glimmer_cape`,
            `aghanims_shard`,
            `force_staff`,
            `ultimate_scepter`,
          ],
          late_game: [
            `blink`,
            `aether_lens`,
            `black_king_bar`,
            `octarine_core`,
          ],
          situational: [
            `pavise`,
            `solar_crest`,
            `spirit_vessel`,
            `holy_locket`,
            `cyclone`,
            `ghost`,
            `kaya_and_sange`,
            `lotus_orb`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `glimmer_cape`,
            `aghanims_shard`,
            `force_staff`,
            `ultimate_scepter`,
            `blink`,
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
      `witch_doctor_paralyzing_cask`,
      `witch_doctor_maledict`,
      `witch_doctor_death_ward`,
      `witch_doctor_voodoo_restoration`,
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
    gameplay_version: "7.35",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],

        steam_guide_link_id: 2699919868,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
        abilities: [
          "skeleton_king_hellfire_blast", // 1
          "skeleton_king_vampiric_aura", // 2
          "skeleton_king_vampiric_aura", // 3
          "skeleton_king_mortal_strike", // 4
          "skeleton_king_vampiric_aura", // 5
          "skeleton_king_reincarnation", // 6
          "skeleton_king_vampiric_aura", // 7
          "skeleton_king_mortal_strike", // 8
          "skeleton_king_mortal_strike", // 9
          "special_bonus_unique_wraith_king_vampiric_skeleton_duration", // 10
          "skeleton_king_mortal_strike", // 11
          "skeleton_king_reincarnation", // 12
          "skeleton_king_hellfire_blast", // 13
          "skeleton_king_hellfire_blast", // 14
          "special_bonus_unique_wraith_king_11", // 15
          "skeleton_king_hellfire_blast", // 16
          "special_bonus_attributes", // 17
          "skeleton_king_reincarnation", // 18
          "special_bonus_attributes", // 19
          "special_bonus_cleave_35", // 20
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
            "magic_stick",
            "circlet",
          ],
          early_game: [
            "phase_boots",
            "helm_of_iron_will",
            "armlet",
            "magic_wand",
          ],
          mid_game: ["desolator", "blink", "black_king_bar", "assault"],
          late_game: ["overwhelming_blink", "abyssal_blade", "bloodthorn"],
          situational: [
            "hand_of_midas",
            "radiance",
            "silver_edge",
            "skadi",
            "aghanims_shard",
            "monkey_king_bar",
            "nullifier",
            "bloodthorn",
            "swift_blink",
            "ultimate_scepter",
          ],
          core: ["armlet", "desolator", "blink", "black_king_bar", "assault"],
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
        all: ["blight_stone", "wind_lace", "boots", "armor", "urn_of_shadows"],
        support: ["ward_sentry"],
        core: ["orb_of_corrosion"],
      },
      mid_game: {
        all: [/*"medallion_of_courage",*/ "solar_crest"],
        support: ["ward_dispenser", "glimmer_cape", "ghost", "force_staff"],
        core: ["hurricane_pike", "diffusal_blade"],
      },
      late_game: {
        all: ["ethereal_blade", "aeon_disk"],
        support: [],
        core: [
          "abyssal_blade",
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
    gameplay_version: "7.35",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],

        steam_guide_link_id: 2699919737,
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        //dota_fire_id: ,
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
          `special_bonus_hp_250`, // 11
          "zuus_thundergods_wrath", // 12
          `zuus_heavenly_jump`, // 13
          `zuus_heavenly_jump`, // 14
          "special_bonus_unique_zeus_jump_postjump_movespeed", // 15
          "special_bonus_attributes", // 16
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
            `arcane_boots`,
            `null_talisman`,
            `magic_wand`,
            `wind_lace`,
          ],
          mid_game: [`phylactery`, `yasha_and_kaya`, `aghanims_shard`, `manta`],
          late_game: [
            `ultimate_scepter`,
            `octarine_core`,
            `refresher`,
            `ethereal_blade`,
          ],
          situational: [
            `power_treads`,
            `witch_blade`,
            `aether_lens`,
            `cyclone`,
            `blink`,
            `bloodstone`,
            `kaya_and_sange`,
            `sphere`,
            `aeon_disk`,
            `black_king_bar`,
            `hurricane_pike`,
            `moon_shard`,
            `travel_boots`,
          ],
          core: [
            "bottle",
            "arcane_boots",
            `phylactery`,
            `yasha_and_kaya`,
            `aghanims_shard`,
            `manta`,
            `ultimate_scepter`,
            `octarine_core`,
            `refresher`,
          ],
          neutral: [
            "mysterious_hat",
            "arcane_ring",
            `grove_bow`,
            `vambrace`,
            `ceremonial_robe`,
            "psychic_headband",
            "timeless_relic",
            //"spell_prism",
            "seer_stone",
            "force_boots",
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
          "orchid",
          "mage_slayer",
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
