/**
 *
 * heroBuilds.ts contains the ability and items builds for all Dota 2 heroes. Each hero can have several builds.
 *
 * Rules for abilities:
 *     - The ability "special_bonus_attributes" should be used to skill attributes
 *     - Each build should have the first 25 abilities to be skilled (the rest is then automatic)
 *
 * Consistency requirements for abilities:
 *     - Each ability needs to exist in dota2Abilits.json
 *     - For each ability there needs to be an image named `/img/ability/<ability>_hp1.jpg` (the script dataQuality.ts verifies that)
 *     - Each item needs to exist in dota2Items.json
 *
 * Attention:
 *     - Steam guides can`t have the character "'". Instead we need to use "`"
 * 	   - The order of the talent build needs to be 1, 2, 3 and then 4. Any other order will cause the guide to fail in Dota 2
 *
 * Relevant folder on local PC: D:\Program Files (x86)\Steam\userdata\361606936\570\remote\guides
 *
 * Copyright Dota Coach, 2022
 *
 * SMALL CHANGE
 *
 */
//import { Ultimate } from "../../src/app/ultimate/ultimate";
import {
  DOTA_COACH_GUIDE_ROLE,
  //DOTA_COACH_ROLE,
  STEAM_GUIDE_ROLE,
} from "./playerRoles";

export enum ContentCreator {
  TBD = "TBD",
  ZoGraF = "ZoGraF",
  //AlexDota = "AlexDota",
  TNTCNz = "TNTCNz",
  YoonA = "YoonA",
  eidandota = "eidandota",
  //yongy146 = "yongy146",
}

// Links provided by content creators to promote their own brand and activites
export const ContentCreatorLinks = {
  TBD: {
    image: "https://i.imgur.com/QZzNRhz.png",
    text: "This guide was written by 9k Professional Coach ZoGraF.",
    link_http: "https://www.gamersensei.com/senseis/zograf",
    link_text: "Click here to be coached by him.",
  },
  ZoGraF: {
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
    text: "This guide was written by 8k MMR player and coach eidandota.",
    link_http: "https://www.fiverr.com/share/ywVQ5V",
    link_text: "Click here to book a coaching session with eidandota.",
  },
  TNTCNz: {
    image: "https://i.imgur.com/MvM6s5B.jpeg",
    text: "This guide was written by 8k MMR player TNTCN.",
    link_http: "https://www.gamersensei.com/senseis/tntcn",
    link_text: "Click here to book a coaching session with him.",
  },
  YoonA: {
    image: "https://i.imgur.com/TZpRwOK.jpeg",
    text: "This guide was written by Hammad.",
    link_http: "https://www.fiverr.com/share/k0bmRk",
    link_text: "Click here to book a coaching session with him.",
  },
};

export enum DamageType {
  neutral = "neutral", // Combination of physcal, magical and pure
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
export interface HeroContent {
  // TASK MICHEL: RENOME TO `HeroContent`
  creator: ContentCreator; // Owner of the guide (e.g. AlexDota)
  gameplay_version: string; // E.g. 7.30e or 7.31. This should only be updated once the guide is ready to be published
  damage_type: DamageType;
  builds: HeroBuild[]; // The first build is seen as the "standard build" by the app
  ability_tooltips?: Tooltips; // Ability tooltips valid for all builds of the hero
  item_tooltips?: Tooltips; // Item tooltips valid for all builds of the hero
  combo: string[]; // Main spell, item and "attack" combo for the hero ; this combo is shown in the app (infoboxes) and in guides ; use the same keywords as for ability builds and item buids - on top of that you can also use the word "attack" for right-clicking
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
export interface HeroBuild {
  roles: DOTA_COACH_GUIDE_ROLE[]; // These roles are used in the Dota Coach App and in title of Steam Guide
  type?: string; // Type currently only used for invoker mid (QW & QE)
  steam_guide_id: number; // ID of the steam guide; this ID is provided by Dota 2
  steam_guide_link: string; // Link to web buids
  steam_guide_role?: STEAM_GUIDE_ROLE; // Role used to classify steam guides (this role is displayed in yellow in Dota 2). Available values are: Core, Offlane, Support, Jungle, Initiator, Roamer. If there is no value proivded, then it there is no role shown in Dota 2
  abilities: string[];
  ability_tooltips?: Tooltips;
  items: ItemBuild;
  item_tooltips?: Tooltips;
}

export interface ItemBuild {
  starting: string[];
  starting_bear?: string[];
  early_game?: string[]; // provided for all heroes, except for Lone Druid
  mid_game?: string[]; // provided for all heroes, except for Lone Druid
  late_game?: string[]; // provided for all heroes, except for Lone Druid
  situational: string[];
  situational_bear?: string[];
  core: string[]; // selected items from starting, early_game, mid_game, late_game and situational ; except for Lone Druid
  core_bear?: string[];
  neutral: string[];
  neutral_bear?: string[];
}

/**
 * Tooltip for abilities and items
 *
 */
export interface Tooltips {
  [key: string]: string;
}

/**
 *
 */
export interface CounterItems {
  all: CounterItem[]; // Items relevant for all players
  support: CounterItem[]; // Items only relevant for support players
  core: CounterItem[]; // Items only relevant for core players
}

export interface CounterItem {
  item: string; // Name of item, as in dota2Items.json, but without prefix `item_`
  info?: string; // Optional info to be displayed on webpage and in the app
}

/**
 * Function returns the tooltip for an item (it checks the hero build as well as the hero)
 *
 * @param heroContent
 * @param heroBuild
 * @param item
 * @return Tooltip string or null, if there is no tooltip
 */
export function getItemTooltip(
  heroContent: HeroContent,
  heroBuild: HeroBuild,
  item: string
): string {
  if (Object.prototype.hasOwnProperty.call(heroBuild, "item_tooltips")) {
    if (Object.prototype.hasOwnProperty.call(heroBuild.item_tooltips, item)) {
      return heroBuild.item_tooltips[item];
    }
  }
  if (Object.prototype.hasOwnProperty.call(heroContent, "item_tooltips")) {
    if (Object.prototype.hasOwnProperty.call(heroContent.item_tooltips, item)) {
      return heroContent.item_tooltips[item];
    }
  }
  return null; // There is no tooltip for the item
}

/**
 * Function returns the tooltip for an ability (it checks the hero build as well as the hero)
 *
 * @param heroBuilds
 * @param heroBuild
 * @param item
 * @return Tooltip string or null, if there is no tooltip
 */
export function getAbilityTooltip(
  heroContent: HeroContent,
  heroBuild: HeroBuild,
  ability: string
): string {
  if (Object.prototype.hasOwnProperty.call(heroBuild, "ability_tooltips")) {
    if (
      Object.prototype.hasOwnProperty.call(heroBuild.ability_tooltips, ability)
    ) {
      return heroBuild.ability_tooltips[ability];
    }
  }
  if (Object.prototype.hasOwnProperty.call(heroContent, "ability_tooltips")) {
    if (
      Object.prototype.hasOwnProperty.call(
        heroContent.ability_tooltips,
        ability
      )
    ) {
      return heroContent.ability_tooltips[ability];
    }
  }
  return null; // There is no tooltip for the item
}

/**
 * Function returns if item is core for this build
 *
 * @param heroName
 * @param heroBuild
 * @param item
 */
export function isCoreItem(heroBuild: HeroBuild, item: string): boolean {
  for (const coreItem of heroBuild.items.core) {
    if (coreItem == item) return true;
  }
  return false;
  // HOW TO TREAT CASE OF BEAR  / LONE DRUID, TO BE IMPLEMENTED
}

export const heroBuilds: { [key: string]: HeroContent } = {
  Abaddon: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640698444,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698376898",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "abaddon_aphotic_shield",
          "abaddon_frostmourne" /* equals to `curse of avernus` */,
          "abaddon_death_coil",
          "abaddon_aphotic_shield",
          "abaddon_aphotic_shield",
          "abaddon_borrowed_time",
          "abaddon_aphotic_shield",
          "abaddon_death_coil",
          "abaddon_death_coil",
          "abaddon_death_coil",
          "special_bonus_strength_8",
          "abaddon_borrowed_time",
          "abaddon_frostmourne",
          "abaddon_frostmourne",
          "special_bonus_unique_abaddon_2",
          "abaddon_frostmourne",
          "special_bonus_attributes",
          "abaddon_borrowed_time",
          "special_bonus_attributes",
          "special_bonus_unique_abaddon",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_abaddon_4",
          //25 levels, no need for more than that as they are automatic afterwards
        ],
        items: {
          starting: [
            "tango",
            "flask" /* salve */,
            "enchanted_mango",
            "orb_of_venom",
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `medallion_of_courage`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            "holy_locket",
            "solar_crest",
            "force_staff",
            `tranquil_boots`,
          ],
          late_game: [
            "ultimate_scepter",
            `lotus_orb`,
            "vladmir",
            `boots_of_bearing`,
          ],
          situational: [
            `urn_of_shadows`,
            `glimmer_cape`,
            `cyclone`,
            `ghost`,
            `spirit_vessel`,
            `heavens_halberd`,
            `pipe`,
            `crimson_guard`,
            `blade_mail`,
            `wraith_pact`,
            `assault`,
            `wind_waker`,
            "aghanims_shard",
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "holy_locket",
            "solar_crest",
            `tranquil_boots`,
            `force_staff`,
            "ultimate_scepter",
          ],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            `chipped_vest`,
            `broom_handle`,
            `unstable_wand`,
            "philosophers_stone",
            "bullwhip",
            `dragon_scale`,
            `paintball`,
            "psychic_headband",
            "spider_legs",
            `cloak_of_flames`,
            `black_powder_bag`,
            "spy_gadget",
            "stormcrafter",
            `heavy_blade`,
            `ascetic_cap`,
            "force_field",
            "seer_stone",
            `demonicon`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      // Optional, used for Dota 2 Guides
      special_bonus_unique_abaddon:
        "If you have Aghanim`s Scepter or about to have it, take the other talent.",
      // Question, should we have info for each build at each level, or the infos be generic to the skills / telents, and only showed with first build?
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace orb of venom for it.",
      orb_of_venom: "Helps you chase enemy heroes to apply Curse of Avernus.",
      arcane_boots:
        "A core boots upgrade for mana sustain. It can be disassembled and Energy Booster used for Holy Locket. You can assemble Tranquil Boots afterwards for movement speed.",
      holy_locket:
        "A core item to further increase your healing output. It provides a burst of healing and mana on cast as well.",
      tranquil_boots: `You can upgrade Brown Boots to Tranquils once you have the Holy Locket.`,
      solar_crest:
        "A core item to buff one of your right-clicking cores or to debuff the target your team is focusing.",
      ultimate_scepter:
        "A core item that can impact the fights greatly. Make sure to activate the ultimate when the most damage is being pumped into your allies.",
      lotus_orb: "For reflect, dispel and armor.",
      boots_of_bearing: `An incredible aura item that benefits you and your team for the attack and movement speed.`,
      aghanims_shard: "To silence against spell heavy lineups.",
      vladmir:
        "A core aura item which percentage values scale well into the late game.",
    },
    combo: [
      `abaddon_aphotic_shield`,
      `solar_crest`,
      `attack`,
      `abaddon_death_coil`,
      `abaddon_aphotic_shield`,
      `abaddon_death_coil`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Abaddon protects himself and allies by casting Aphotic Shield and Mist Coil frequently",
          },
          { item: "blight_stone" },
          { item: "wind_lace", info: "Against a core Abaddon" },
          { item: "boots", info: "Against a core Abaddon" },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
        // Comment for Alex: On the screen in the game only 5 items are shows, on the second screen there are 6. The items in the catrogy `all` are shonw first, then either `support` or `core`. Any additional items are discarded.
      },
      mid_game: {
        all: [],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [
          {
            item: "silver_edge",
            info: "Against a core Abaddon to disable Borrowed Time from activating passively",
          },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "shivas_guard", info: "To reduce healing" },
          { item: "skadi", info: "To reduce healing" },
          { item: "butterfly", info: "Against a core right-clicking Abaddon" },
        ],
      },
    },
  },

  Alchemist: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640719685,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698377018",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "alchemist_goblins_greed",
          "alchemist_acid_spray",
          "alchemist_goblins_greed",
          "alchemist_acid_spray",
          "alchemist_goblins_greed",
          "alchemist_chemical_rage",
          "alchemist_goblins_greed",
          "alchemist_acid_spray",
          "alchemist_acid_spray",
          "special_bonus_attack_speed_15",
          "alchemist_unstable_concoction",
          "alchemist_chemical_rage",
          "alchemist_unstable_concoction",
          "alchemist_unstable_concoction",
          "special_bonus_hp_350",
          "alchemist_unstable_concoction",
          "special_bonus_attributes",
          "alchemist_chemical_rage",
          "special_bonus_attributes",
          "special_bonus_cleave_25",
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
            "ring_of_protection",
            "gauntlets",
            "branches",
            "magic_stick",
          ],
          early_game: [
            "ring_of_health",
            "power_treads",
            "phase_boots",
            "soul_ring",
            "magic_wand",
            "bracer",
            "infused_raindrop",
          ],
          mid_game: [
            "bfury",
            "radiance",
            "sange_and_yasha",
            "blink",
            "assault",
            "black_king_bar",
            "basher",
          ],
          late_game: [
            "abyssal_blade",
            "swift_blink",
            "satanic",
            "ultimate_scepter",
            "moon_shard",
            "bloodthorn",
          ],
          situational: [
            "radiance",
            "aghanims_shard",
            "mjollnir",
            "overwhelming_blink",
            "monkey_king_bar",
            "silver_edge",
          ],
          core: [
            "power_treads",
            "bfury",
            "sange_and_yasha",
            "blink",
            "assault",
            "black_king_bar",
            "basher",
          ],
          neutral: [
            "chipped_vest",
            "broom_handle",
            "quicksilver_amulet",
            "misericorde",
            "paladin_sword",
            "elven_tunic",
            "the_leveller",
            "penta_edged_sword",
            "force_boots",
            "desolator_2",
          ],
        },
        item_tooltips: {
          ring_of_health:
            "Buy this sustain item on the lane if your next desired item is Battle Fury.",
          power_treads:
            "A core boots upgrade that provides you with significant attack speed increase and mana savings through toggling.",
          bfury:
            "An item to consider for accelerating farm and against summons. Synergizes very well with Acid Spray.",
          radiance:
            "An alternative to Battle Fury against illusion-based heroes. In general, illusions are susceptible to magical damage more than to physical damage. e.g Phantom Lancer & Templar Assassin against you.",
          blink:
            "A core item that allows you to channel Unstable Concoction, blink on the target and release the fully channeled stun.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1643091346,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2730985550",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "alchemist_goblins_greed",
          "alchemist_acid_spray",
          "alchemist_goblins_greed",
          "alchemist_acid_spray",
          "alchemist_goblins_greed",
          "alchemist_chemical_rage",
          "alchemist_goblins_greed",
          "alchemist_acid_spray",
          "alchemist_acid_spray",
          "special_bonus_attack_speed_15",
          "alchemist_unstable_concoction",
          "alchemist_chemical_rage",
          "alchemist_unstable_concoction",
          "alchemist_unstable_concoction",
          "special_bonus_hp_350",
          "alchemist_unstable_concoction",
          "special_bonus_attributes",
          "alchemist_chemical_rage",
          "special_bonus_attributes",
          "special_bonus_cleave_25",
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
            "circlet",
            "gauntlets",
            "branches",
            "magic_stick",
            "ward_observer",
          ],
          early_game: [
            "bottle",
            "phase_boots",
            "magic_wand",
            "soul_ring",
            "bracer",
          ],
          mid_game: [
            "bfury",
            "sange_and_yasha",
            "blink",
            "assault",
            "black_king_bar",
            "basher",
          ],
          late_game: [
            "abyssal_blade",
            "overwhelming_blink",
            "swift_blink",
            "heart",
            "ultimate_scepter",
          ],
          situational: [
            "radiance",
            "aghanims_shard",
            "mjollnir",
            "monkey_king_bar",
            "silver_edge",
          ],
          core: [
            "bottle",
            "phase_boots",
            "bfury",
            "sange_and_yasha",
            "blink",
            "assault",
            "black_king_bar",
            "basher",
          ],
          neutral: [
            "chipped_vest",
            "broom_handle",
            "quicksilver_amulet",
            "misericorde",
            "paladin_sword",
            "elven_tunic",
            "the_leveller",
            "penta_edged_sword",
            "force_boots",
            "desolator_2",
          ],
        },
        item_tooltips: {
          bottle: "A core item for sustain.",
          phase_boots:
            "A core boots upgrade that allows you to collect runes faster and fixes movement speed and armor issues that Alchemist has.",
        },
        ability_tooltips: {
          alchemist_acid_spray:
            "Consider skilling Acid Spray at level 1 against a tough match-up e.g. Queen Of Pain.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      bfury:
        "A core farming item that provides you with sustain and great physical damage that synergizes well with Acid Spray.",
      radiance:
        "An alternative to Battle Fury against illusion-based heroes. In general, illusions are susceptible to magical damage more than to physical damage.",
      sange_and_yasha:
        "A core item that provides mix of offensive and defensive stats. Self heal amplification goes well with Chemical Rage.",
      blink:
        "A core item that allows you to channel Unstable Concoction, blink on the target and release the fully channeled stun.",
      black_king_bar:
        "A core item that allows you to deliver the damage while being in the middle of the fight.",
      aghanims_shard: "For extra dispel and buff.",
      ultimate_scepter:
        "To gift it to your teammates while at same time your recieve a stacking buff for each Aghanim`s Scepter given away.",
      mjollnir: "Great against illusion-based heroes.",
      overwhelming_blink:
        "Against illusion-based heroes and to tank yourself up.",
      swift_blink:
        "For extra burst upon activation. Great when you are running out of slots to replace boots.",
      monkey_king_bar: "Against evasion and miss-chance.",
      silver_edge: "For burst, to reposition and break effect.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against Alchemist`s Chemical Rage",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "ghost" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [
          {
            item: "desolator",
            info: "Alchemist has relatively low armor and armor gain, which makes him weak to Armor reducing items and abilities.",
          },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [],
        core: [
          { item: "shivas_guard" },
          { item: "skadi" },
          { item: "assault" },
          { item: "abyssal_blade" },
          { item: "butterfly" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  "Ancient Apparition": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640719709,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698377158",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "ancient_apparition_chilling_touch",
          "ancient_apparition_cold_feet",
          `ancient_apparition_ice_vortex`,
          `ancient_apparition_chilling_touch`,
          `ancient_apparition_cold_feet`,
          "ancient_apparition_ice_blast",
          "ancient_apparition_cold_feet",
          "ancient_apparition_cold_feet",
          "ancient_apparition_ice_vortex",
          "ancient_apparition_ice_vortex",
          "ancient_apparition_ice_vortex",
          "ancient_apparition_ice_blast",
          "special_bonus_spell_amplify_8",
          "ancient_apparition_chilling_touch",
          "special_bonus_unique_ancient_apparition_3",
          "ancient_apparition_chilling_touch",
          "special_bonus_attributes",
          "ancient_apparition_ice_blast",
          "special_bonus_attributes",
          "special_bonus_unique_ancient_apparition_4",
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
            "flask" /* salve */,
            "faerie_fire",
            `enchanted_mango`,
            `enchanted_mango`,
            `clarity`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            "wind_lace",
            `infused_raindrop`,
          ],
          mid_game: [
            "glimmer_cape",
            "aghanims_shard",
            "force_staff",
            `aether_lens`,
            `ghost`,
          ],
          late_game: [
            "aeon_disk",
            "sheepstick",
            `octarine_core`,
            `ethereal_blade`,
          ],
          situational: [
            `urn_of_shadows`,
            `cyclone`,
            `ultimate_scepter`,
            `revenants_brooch`,
            "lotus_orb",
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "wind_lace",
            `glimmer_cape`,
            "aghanims_shard",
            `aeon_disk`,
          ],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            `mysterious_hat`,
            "philosophers_stone",
            "bullwhip",
            `pupils_gift`,
            "spider_legs",
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            "timeless_relic",
            `spell_prism`,
            "seer_stone",
            "book_of_shadows",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      urn_of_shadows: `Helps with mana regen and lets you snowball from the laning phase.`,
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, faerie fire, and clarity for it.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. It can be disasembled and Energy Booster can be later used on to craft Lotus Orb or Aeon Disk.",
      aghanims_shard:
        "A core item that allows you to waveclear, do decent amounts of damage in the fights and cancel Blink Daggers.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter: `An extremely late game item when you want to burst enemy heroes.`,
      revenants_brooch: `Goes well with the aghanims scepter in the very late game.`,
    },
    combo: [
      `ancient_apparition_ice_vortex`,
      `ancient_apparition_cold_feet`,
      `ancient_apparition_chilling_touch`,
      `ancient_apparition_ice_blast`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "infused_raindrop",
            info: "Infused Raindrops allow you to offset magical damage coming from Ancient Apparition`s spells",
          },
          { item: "wind_lace", info: "To walk out of Cold Feet freeze range" },
          { item: "boots", info: "To walk out of Cold Feet freeze range" },
          {
            item: "cloak",
            info: "Ancient Apparition is heavy on magical damage and Cloak negates 15% of its",
          },
        ],
        support: [],
        core: [
          {
            item: "headdress",
            info: "For lane sustain and/or Pipe of Insight later",
          },
        ],
      },
      mid_game: {
        all: [],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  "Anti-Mage": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640719725,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698377261",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_unique_antimage",
          "antimage_mana_break",
          "antimage_mana_void",
          "antimage_counterspell",
          "antimage_counterspell",
          "antimage_counterspell",
          "special_bonus_unique_antimage_8",
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
            "tango",
            "quelling_blade",
            "circlet",
            "slippers",
            "branches",
            "faerie_fire",
            "magic_stick",
            "orb_of_venom",
          ],
          early_game: [
            "ring_of_health",
            "wraith_band",
            "magic_wand",
            "power_treads",
            "orb_of_corrosion",
          ],
          mid_game: ["bfury", "manta", "skadi", "basher"],
          late_game: [
            "abyssal_blade",
            "satanic",
            "butterfly",
            "ultimate_scepter",
          ],
          situational: [
            "black_king_bar",
            "monkey_king_bar",
            "sphere",
            "aghanims_shard",
            "assault",
          ],
          core: ["power_treads", "bfury", "manta", "skadi", "basher"],
          neutral: [
            "possessed_mask",
            "chipped_vest",
            "ring_of_aquila",
            "vambrace",
            "mind_breaker",
            "elven_tunic",
            "the_leveller",
            "ninja_gear",
            "pirate_hat",
            "apex",
          ],
        },
      },
    ],
    ability_tooltips: {
      // For first level spell choice
      antimage_counterspell:
        "Skill Counterspell at level one if you exptect to be harrassed by single-target magical-damage spells like Arcane Bolt.",
      special_bonus_unique_antimage_2:
        "If there`s a lot of magical damage against you or you have mana issues, skill the other talent.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      ring_of_health: "To solve hp sustain issues.",
      power_treads:
        "Allows you to extract more value from Battle Fury due to attack speed.",
      orb_of_corrosion: "If you can pressure on the lane.",
      bfury:
        "A core items that solves sustain issues and allows you to farm insanely fast.",
      manta: "Allows you to burn the jumped target`s mana quickly.",
      skadi:
        "A core item that tanks you up and disallows opponents to run away. It reduces target`s healing significantly.",
      basher:
        "It procs frequently due to attack speed of Anti-Mage allowing you to burn even more mana before Mana Voiding.",
      monkey_king_bar: "Against evasion.",
      black_king_bar: "Against a lot of disables and as a dispel.",
      sphere:
        "Against powerful single target spells like Duel, Lasso, Hex or Doom.",
      aghanims_shard: "Against heavy magical damage lineups.",
      assault: "Against heavy armor reduction lineups.",
      ultimate_scepter: "Great for causing chaos in the fights.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "enchanted_mango",
            info: "Anti-Mage burns mana and Enchanted Mangoes will allow you to offset that",
          },
          {
            item: "arcane_boots",
            info: "Anti-Mage burns mana and Arcane Boots will allow you to offset that",
          },
        ],
        support: [],
        core: [{ item: "soul_ring" }],
      },
      mid_game: {
        all: [{ item: "rod_of_atos" }],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          {
            item: "orchid",
            info: "If you can get it before his MantaStyle timing",
          },
          { item: "desolator" },
          {
            item: "invis_sword",
            info: "To find him while he`s jungling or splitpushing",
          },
          { item: "diffusal_blade" },
          { item: "hurricane_pike" },
          { item: "travel_boots" },
          { item: "gungir" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "sphere" },
          { item: "aeon_disk" },
        ],
        support: [{ item: "travel_boots" }],
        core: [
          { item: "abyssal_blade" },
          { item: "butterfly" },
          { item: "assault" },
        ],
      },
    },
  },

  "Arc Warden": {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640719743,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2698377376",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "arc_warden_spark_wraith",
          "arc_warden_flux",
          "arc_warden_spark_wraith",
          "arc_warden_flux",
          "arc_warden_spark_wraith",
          "arc_warden_tempest_double",
          "arc_warden_spark_wraith",
          "arc_warden_flux",
          "arc_warden_flux",
          "arc_warden_magnetic_field",
          "special_bonus_unique_arc_warden_5",
          "arc_warden_tempest_double",
          "arc_warden_magnetic_field",
          "arc_warden_magnetic_field",
          "arc_warden_magnetic_field",
          "special_bonus_unique_arc_warden_3",
          "special_bonus_attributes",
          "arc_warden_tempest_double",
          "special_bonus_attributes",
          "special_bonus_unique_arc_warden",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_arc_warden_6",
        ],
        items: {
          starting: [
            "tango",
            "circlet",
            "slippers",
            `branches`,
            `branches`,
            `quelling_blade`,
            "ward_observer",
          ],
          early_game: [`wraith_band`, `hand_of_midas`, `boots`, `magic_wand`],
          mid_game: [
            "maelstrom",
            "travel_boots",
            "mjollnir",
            `dragon_lance`,
            `lesser_crit`,
          ],
          late_game: [
            `skadi`,
            `black_king_bar`,
            `greater_crit`,
            `satanic`,
            `swift_blink`,
            "bloodthorn",
            "travel_boots_2",
          ],
          situational: [
            `infused_raindrop`,
            `hurricane_pike`,
            "monkey_king_bar",
            "silver_edge",
            "gungir",
            `nullifier`,
            `sheepstick`,
            `butterfly`,
            `dagon`,
            `ethereal_blade`,
            `octarine_core`,
            `ultimate_scepter`,
            `aghanims_shard`,
          ],
          core: [
            "hand_of_midas",
            "maelstrom",
            "travel_boots",
            "mjollnir",
            "black_king_bar",
            "skadi",
            `greater_crit`,
            `satanic`,
            "swift_blink",
          ],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "quicksilver_amulet",
            "enchanted_quiver",
            `mind_breaker`,
            `paladin_sword`,
            "the_leveller",
            `spell_prism`,
            `flicker`,
            "pirate_hat",
            `desolator_2`,
            `mirror_shield`,
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_arc_warden_7: `You can go for this talent over the suggested one if you go for the ethereal blade and dagon item build.`,
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.Replace slippers and one branch for it.`,
      ward_observer:
        "If you are playing midlane but also to secure your safelane farm and jungling later on.",
      infused_raindrop: "Against magical burst.",
      hand_of_midas: "A core item which active works on your clone too.",
      maelstrom:
        "A core item that further increases your farming speed. Both upgrades of this item are great to have. Mjollnir does significantly more dps though.",
      travel_boots: "Allows you to split-push the map effectively.",
      black_king_bar:
        "A core item that allows you to stand your ground and right-click.",
      skadi:
        "A core item that tanks you up and reduces target`s movement speed and healing.",
      greater_crit: "A core damaging late game item.",
      gungir: "An alternative for Mjollnir for crowd control.",
      silver_edge: "For break and greater splitpush/pick off potential.",
      monkey_king_bar:
        "An alternative to Daedalus against evasion and miss chance. Whenever Mjollnir procs you can`t miss on that attack so you already have 30% accuracy.",
      nullifier:
        "To dispel defensive spells and items that prevent you from right-clicking the opponent.",
      swift_blink: `A core item to reposition and for extra burst.`,
      dagon: `An alternate damage build to work around the attack damage reduction nerf.`,
      ethereal_blade: `Buffs your nuke damage with the Dagon, Flux, and Spark Wraith.`,
      octarine_core: `An item to go with the Dagon and Ethereal Blade nuke damage item build.`,
    },
    combo: [
      `arc_warden_tempest_double`,
      `arc_warden_flux`,
      `arc_warden_spark_wraith`,
      `arc_warden_magnetic_field`,
      `mjollnir`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Arc Warden will cast Spark Wraith frequently to secure creep lasthits or to harass",
          },
          {
            item: "wind_lace",
            info: "To catch up to Arc Warden and offset the slow coming from Flux",
          },
          {
            item: "boots",
            info: "To catch up to Arc Warden and offset the slow coming from Flux",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [
          {
            item: "blink",
            info: "To close the gap to Arc Warden and get into the Magnetic Field",
          },
        ],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "invis_sword" },
          { item: "heavens_halberd" },
          { item: "gungir" },
          { item: "travel_boots" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [{ item: "travel_boots" }],
        core: [
          { item: "abyssal_blade" },
          { item: "monkey_king_bar" },
          {
            item: "bloodthorn",
            info: "For true strike against Magnetic Field",
          },
          { item: "butterfly" },
          {
            item: "satanic",
            info: "To dispel Orchid or Bloodthorn that Arc Warden purchases often and to be able to manfight him and his clone",
          },
        ],
      },
    },
  },

  Axe: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640802946,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915204",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "axe_battle_hunger",
          "axe_counter_helix",
          "axe_counter_helix",
          "axe_berserkers_call",
          "axe_counter_helix",
          "axe_culling_blade",
          "axe_counter_helix",
          "axe_berserkers_call",
          "axe_berserkers_call",
          "axe_berserkers_call",
          "special_bonus_magic_resistance_12",
          "axe_culling_blade",
          "axe_battle_hunger",
          "axe_battle_hunger",
          "special_bonus_unique_axe_4",
          "axe_battle_hunger",
          "special_bonus_attributes",
          "axe_culling_blade",
          "special_bonus_attributes",
          "special_bonus_unique_axe_5",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_axe_2",
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "quelling_blade",
            "gauntlets",
            "ring_of_protection",
            "branches",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: ["boots", "magic_wand", "vanguard", "hood_of_defiance"],
          mid_game: [
            "blink",
            "blade_mail",
            "black_king_bar",
            "aghanims_shard",
            "platemail",
            "travel_boots",
          ],
          late_game: [
            "assault",
            "overwhelming_blink",
            "heart",
            "abyssal_blade",
            "shivas_guard",
          ],
          situational: [
            "pipe",
            "crimson_guard",
            "lotus_orb",
            "invis_sword",
            "manta",
          ],
          core: [
            "vanguard",
            "boots",
            "blink",
            "blade_mail",
            "black_king_bar",
            "aghanims_shard",
            "platemail",
            "travel_boots",
          ],
          neutral: [
            "chipped_vest",
            "broom_handle",
            "vambrace",
            "dragon_scale",
            "cloak_of_flames",
            "spider_legs",
            "ascetic_cap",
            "trickster_cloak",
            "giants_ring",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      axe_battle_hunger:
        "If the opponents have an easy way of removing or dispelling Battle Hunger, you can skip skilling this spell during laning stage. Try using it when all creeps are high HP",
      axe_berserkers_call:
        "Use this to prevent enemies from lasthitting a creep or use it so they don`t deny you one.",
    },

    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      vanguard:
        "A core item that fixes your hp sustain issues and makes you exremely tanky. It can be disassembled.",
      boots:
        "A core item that you shouldn`t upgrade usually. Get Blink Dagger as fast as possible and upgrade boots to Boots of Travel down the road.",
      blink:
        "A core item that allows you to initiate the fights by jumping in and using Berserker`s Call.",
      blade_mail:
        "A core item that combines well with Berserker`s Call. It is especially strong against high dps right-clickers and uncontrolable high AoE damage, e.g. Eclipse.",
      black_king_bar:
        "A core item that allows you to stay alive after initiating.",
      aghanims_shard:
        "A core upgrade for Counter Helix especially good against illusion, summon or clone based heroes.",
      platemail:
        "A core item that fixes armor issues. You can upgrade it to either Assault Cuirass, Lotus Orb or Shiva`s Guard down the road.",
      travel_boots:
        "A core boots upgrade that allows you to cover the map better.",
      lotus_orb: "For reflect, dispel and armor.",
      overwhelming_blink: "Against illusions, clones and summons.",
      invis_sword: "For pick-offs and to guarantee a good initiation.",
      manta:
        "As a farm accelerator as Counter Helix procs on illusions. It is greedy to go for this item.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from Axe",
          },
          { item: "wind_lace", info: "To keep the distance from the Axe" },
          { item: "boots", info: "To keep the distance from the Axe" },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
          { item: "ring_of_health" },
        ],
      },
      mid_game: {
        all: [{ item: "cyclone" }],
        support: [{ item: "spirit_vessel" }],
        core: [
          { item: "mage_slayer", info: "Reduces Counter Helix damage by 35%" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
          { item: "silver_edge", info: "For breaking his passive ability" },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          {
            item: "satanic",
            info: "For lifesteal against Berserker`s Call and Blade Mail combo",
          },
        ],
      },
    },
  },

  Bane: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803052,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915293",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "bane_brain_sap",
          "bane_nightmare",
          "bane_brain_sap",
          "bane_nightmare",
          "bane_nightmare",
          "bane_fiends_grip",
          "bane_nightmare",
          "bane_enfeeble",
          `bane_brain_sap`,
          `special_bonus_armor_5`,
          `bane_brain_sap`,
          "bane_fiends_grip",
          `bane_enfeeble`,
          `bane_enfeeble`,
          `special_bonus_unique_bane_8`,
          `bane_enfeeble`,
          "special_bonus_attributes",
          "bane_fiends_grip",
          "special_bonus_attributes",
          "special_bonus_unique_bane_5",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_unique_bane_3`,
        ],
        items: {
          starting: [
            "tango",
            "flask",
            `clarity`,
            "enchanted_mango",
            `enchanted_mango`,
            `enchanted_mango`,
            "faerie_fire",
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "magic_wand",
            "arcane_boots",
            `infused_raindrop`,
            "wind_lace",
          ],
          mid_game: ["aether_lens", "glimmer_cape", "force_staff", "ghost"],
          late_game: [
            "ultimate_scepter",
            `black_king_bar`,
            "aeon_disk",
            "blink",
          ],
          situational: [
            "lotus_orb",
            "aghanims_shard",
            `ethereal_blade`,
            `travel_boots`,
            `cyclone`,
            `wind_waker`,
          ],
          core: ["arcane_boots", "wind_lace", "aether_lens", "glimmer_cape"],
          neutral: [
            "trusty_shovel",
            "keen_optic",
            `pogo_stick`,
            `mysterious_hat`,
            "philosophers_stone",
            "bullwhip",
            `nether_shawl`,
            "psychic_headband",
            "spider_legs",
            `ceremonial_robe`,
            "spy_gadget",
            "timeless_relic",
            `spell_prism`,
            "seer_stone",
            "book_of_shadows",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_armor_5:
        "This talent should be better than the other level ten talent in most cases as you often times have some magical resistance coming from Glimmer Cape.",
      special_bonus_unique_bane_3:
        "You can skill the other talent if you are against mega creeps and have the Aghanims shard.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace one mango, sentry, and clarity for it.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. It can be disassembled and Energy Booster used for Aether Lens. You should upgrade the leftover boots to Tranquil Boots.",
      wind_lace: "For extra mobility as Bane is great at setting up kills.",
      aether_lens:
        "A core item that allows you to get your spells off from further away.",
      glimmer_cape:
        "A core defensive item that can be used while channeling Fiend`s Grip.",
      lotus_orb: "For reflect, dispel and armor.",
      aghanims_shard: "Against summons, illusions and to depush.",
      black_king_bar: "To get a full duration Fiend`s Grip off.",
    },
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
        all: [
          {
            item: "magic_stick",
            info: "Bane will cast Brain Sap frequently to win the trades",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from the Bane",
          },
          {
            item: "infused_raindrop",
            info: "Infused Raindrops allow you to offset magical damage coming from Brain Sap and make Bane get less HP from it",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere" },
          { item: "wind_waker", info: "To save an ally in the Fiend`s Grip" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  Batrider: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640803569,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915391",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "batrider_sticky_napalm",
          "batrider_firefly",
          "batrider_sticky_napalm",
          "batrider_flamebreak",
          "batrider_sticky_napalm",
          "batrider_flaming_lasso",
          "batrider_sticky_napalm",
          "batrider_firefly",
          "batrider_firefly",
          "batrider_firefly",
          "special_bonus_spell_amplify_5",
          "batrider_flaming_lasso",
          "batrider_flamebreak",
          "batrider_flamebreak",
          "special_bonus_unique_batrider_4",
          "batrider_flamebreak",
          "special_bonus_attributes",
          "batrider_flaming_lasso",
          "special_bonus_attributes",
          "special_bonus_movement_speed_30",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_batrider_6",
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "enchanted_mango",
            "branches",
            "circlet",
            "mantle",
            "magic_stick",
          ],
          early_game: ["boots", "magic_wand", "wind_lace", "bottle"],
          mid_game: [
            "travel_boots",
            "witch_blade",
            "black_king_bar",
            "blink",
            "aether_lens",
            "aghanims_shard",

            "kaya_and_sange",
          ],
          late_game: [
            "octarine_core",
            "shivas_guard",
            "refresher",
            "wind_waker",
          ],
          situational: [
            "ghost",
            "force_staff",
            "cyclone",
            "aeon_disk",
            "sphere",
          ],
          core: [
            "bottle",
            "wind_lace",
            "travel_boots",
            "aether_lens",
            "black_king_bar",
            "aghanims_shard",
            "octarine_core",
          ],
          neutral: [
            "mysterious_hat",
            "pogo_stick",
            "bullwhip",
            "quicksilver_amulet",
            "spider_legs",
            "psychic_headband",
            "timeless_relic",
            "flicker",
            "force_boots",
            "fallen_sky",
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that helps with sustain and allows you to gank with a stored active rune.",
          boots_of_travel:
            "A core item that provides very good mobility and map coverage while ganking and farming.",
          aether_lens:
            "A core item that extends the cast range of all of your spells but Firefly, including items. It should be upgraded to Octarine Core down the road.",
          witch_blade:
            "An item that activates the sticky napalm and does immense amount of damage while giving good stats. Don`t buy it against heroes that can easily dispel it.",
          octarine_core:
            "A core item that increases the frequency of your spells and item being used by reducing the cooldown.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1642190860,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2719253341",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "batrider_sticky_napalm",
          "batrider_firefly",
          "batrider_sticky_napalm",
          "batrider_flamebreak",
          "batrider_sticky_napalm",
          "batrider_flaming_lasso",
          "batrider_sticky_napalm",
          "batrider_firefly",
          "batrider_firefly",
          "batrider_firefly",
          "special_bonus_spell_amplify_5",
          "batrider_flaming_lasso",
          "batrider_flamebreak",
          "batrider_flamebreak",
          "special_bonus_unique_batrider_4",
          "batrider_flamebreak",
          "special_bonus_attributes",
          "batrider_flaming_lasso",
          "special_bonus_attributes",
          "special_bonus_movement_speed_30",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_batrider_6",
        ],
        items: {
          starting: [
            "tango",
            "null_talisman",
            "branches",
            "faerie_fire",
            "enchanted_mango",
            "quelling_blade",
            "mantle",
            "magic_stick",
          ],
          early_game: ["boots", "magic_wand", "wind_lace"],
          mid_game: [
            "travel_boots",
            "black_king_bar",
            "aether_lens",
            "aghanims_shard",
            "blink",
            "force_staff",
            "ghost",
            "cyclone",
            "kaya_and_sange",
          ],
          late_game: [
            "octarine_core",
            "shivas_guard",
            "refresher",
            "wind_waker",
          ],
          situational: [
            "ward_observer",
            "infused_raindrop",
            "aeon_disk",
            "sphere",
          ],
          core: [
            "wind_lace",
            "travel_boots",
            "black_king_bar",
            "aghanims_shard",
            "blink",
          ],
          neutral: [
            "mysterious_hat",
            "pogo_stick",
            "bullwhip",
            "quicksilver_amulet",
            "spider_legs",
            "psychic_headband",
            "timeless_relic",
            "flicker",
            "force_boots",
            "fallen_sky",
          ],
        },
        item_tooltips: {
          blink:
            "A core item that allows you to initiate on desired target. Can be upgraded down the road.",
        },
      },
    ],
    ability_tooltips: {
      sticky_napalm:
        "Make sure you also use this spell on the creeps as it increases your right click damage which Batrider lacks.",
      firefly:
        "Your main farming spell. Try killing multiple waves or neutral camps with one usage.",
    },

    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      wind_lace:
        "A core item for extra mobility. Synergizes with the movement speed theme that Batrider is going for.",
      ward_observer:
        "If you are playing midlane but also offlane to have better vision around the lane.",
      infused_raindrop: "Against magical burst.",
      travel_boots:
        "A core item that provides very good mobility and map coverage while ganking and farming.",
      black_king_bar:
        "A core item that allows you to get Flaming Lasso off on a specific target.",
      aghanims_shard: "A core item that adds to your damage output.",
      sphere:
        "Against single target disables. e.g Sand King, Legion Commander.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_wand",
            info: "Batrider will grant you many stick charges by stacking Sticky Napalm repeatedly on you",
          },
          { item: "wind_lace", info: "To keep the distance from the Batrider" },
          { item: "boots", info: "To keep the distance from the Batrider" },
          {
            item: "cloak",
            info: "Batrider is heavy on magical damage and Cloak negates 15% of it.",
          },
        ],
        support: [],
        core: [
          {
            item: "phase_boots",
            info: "Improves turn rate against Sticky Napalm.",
          },
        ],
      },
      mid_game: {
        all: [
          {
            item: "lotus_orb",
            info: "A good item to either dispell the debuffs from Batrider or to make it hard for him to Lasso a desired target.",
          },
        ],
        support: [
          { item: "force_staff", info: " To disengage or to reposition." },
          {
            item: "glimmer_cape",
            info: " Batrider relies mostly on magic damage which Glimmer Cape helps with.",
          },
        ],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          {
            item: "sphere",
            info: "Removes the threat of being ultied by Batrider.",
          },
          { item: "sheepstick" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "abyssal_blade" }],
      },
    },
  },

  Beastmaster: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803579,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915480",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "beastmaster_call_of_the_wild_boar",
          "beastmaster_inner_beast",
          "beastmaster_call_of_the_wild_boar",
          "beastmaster_inner_beast",
          "beastmaster_call_of_the_wild_boar",
          "beastmaster_primal_roar",
          "beastmaster_call_of_the_wild_boar",
          "beastmaster_inner_beast",
          "beastmaster_inner_beast",
          "special_bonus_attack_damage_30",
          "beastmaster_wild_axes",
          "beastmaster_primal_roar",
          "beastmaster_wild_axes",
          "beastmaster_wild_axes",
          "beastmaster_wild_axes",
          "special_bonus_unique_beastmaster_9",
          "special_bonus_attributes",
          "beastmaster_primal_roar",
          "special_bonus_attributes",
          "special_bonus_unique_beastmaster_6",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_beastmaster_4",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "ring_of_protection",
            "branches",
            "magic_stick",
          ],
          early_game: [
            "helm_of_iron_will",
            "crown",
            "helm_of_the_dominator",
            "boots",
            "ring_of_basilius",
            "magic_wand",
          ],
          mid_game: [
            "vladmir",
            "helm_of_the_overlord",
            "aghanims_shard",
            "blink",
            "solar_crest",
            "ancient_janggo",
            "travel_boots",
          ],
          late_game: [
            "assault",
            "ultimate_scepter",
            "refresher",
            "octarine_core",
          ],
          situational: ["blink", "black_king_bar", "lotus_orb", "pipe"],
          core: [
            "helm_of_the_dominator",
            "boots",
            "blink",
            "helm_of_the_overlord",
            "aghanims_shard",
          ],
          neutral: [
            "broom_handle",
            "chipped_vest",
            "vambrace",
            "dragon_scale",
            "spider_legs",
            "black_powder_bag",
            "quickening_charm",
            "spell_prism",
            "trickster_cloak",
            "fallen_sky",
            "demonicon",
          ],
        },
      },
    ],
    ability_tooltips: {
      beastmaster_wild_axes:
        "If you are laning against Chen or Enchantress, you might want to skill Wild Axes over Call of the Wild.",
      beastmaster_call_of_the_wild_boar:
        " Preferably to have 2 boars active. Make sure the most recent one is not the one tanking damage or getting killed.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      helm_of_iron_will:
        "Solves your HP sustain issues and builds into Helm of the Dominator. Get it as early as possible.",
      helm_of_the_dominator:
        "A core item that synergizes well with the Inner Beast and allows you to push and pick-off heroes. Look to upgrade it to Helm of the Overlord.",
      boots:
        "A core item that should be upgraded to Boots of Travel after core items are acquired.",
      aghanims_shard:
        "A core item that improves vision game and adds another disable.",
      ultimate_scepter:
        "Particularly good against illusion based heroes and base defense.",
      octarine_core: "Goes well with Aghanims Scepter. .",
      blink:
        "To cast Primal Roar on a desired target and supports that often stay in the back.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      lotus_orb: "For reflecting, dispelling and armor.",
      pipe: "Against AOE damage. Protects your units and your teammates as they tend to move together with Beastmaster.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "armor", info: "Buy armor items" },
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To offset the slow coming from the boars",
          },
          { item: "boots", info: "To offset the slow coming from the boars" },
        ],
        support: [{ item: "ward_sentry", info: "To kill Beastmaster`s hawk" }],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
          { item: "vanguard" },
        ],
      },
      mid_game: {
        all: [],
        support: [
          { item: "ward_sentry", info: "Sentry Wards for Hawks" },
          { item: "ghost" },
          { item: "force_staff" },
          { item: "glimmer_cape" },
        ],
        core: [
          {
            item: "crimson_guard",
            info: "Effective item versus the summons that Beastmaster has.",
          },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
          { item: "gungir" },
        ],
      },
      late_game: {
        all: [{ item: "sphere", info: "Protects you from Primal Roar" }],
        support: [{ item: "SentryGem", info: "for Hawks" }],
        core: [
          {
            item: "assault",
            info: "The armor that you get from Assault nullifies some of the physical damage Beastmaster and his units output.",
          },
        ],
      },
    },
  },

  Bloodseeker: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640803590,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915618",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_hp_400",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bloodseeker_4",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            "slippers",
            "branches",
            "faerie_fire",
            "magic_stick",
            "orb_of_venom",
            "enchanted_mango",
          ],
          early_game: [
            "wraith_band",
            "power_treads",
            "phase_boots",
            "magic_wand",
            "orb_of_corrosion",
          ],
          mid_game: [
            "maelstrom",
            "sange_and_yasha",
            "black_king_bar",
            "basher",
            "skadi",
          ],
          late_game: ["mjollnir", "satanic", "abyssal_blade", "butterfly"],
          situational: [
            "black_king_bar",
            "manta",
            "gungir",
            "silver_edge",
            "monkey_king_bar",
            "sphere",
            "aghanims_shard",
          ],
          core: [
            "power_treads",
            "maelstrom",
            "sange_and_yasha",
            "black_king_bar",
            "basher",
          ],
          neutral: [
            "possessed_mask",
            "chipped_vest",
            "quicksilver_amulet",
            "misericorde",
            "elven_tunic",
            "paladin_sword",
            "the_leveller",
            "penta_edged_sword",
            "ninja_gear",
            "desolator_2",
            "apex",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1641224485,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2706431682",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "bloodseeker_blood_bath",
          "bloodseeker_thirst",
          "bloodseeker_thirst",
          "bloodseeker_blood_bath",
          "bloodseeker_thirst",
          "bloodseeker_rupture",
          "bloodseeker_thirst",
          "bloodseeker_blood_bath",
          "bloodseeker_blood_bath",
          "bloodseeker_bloodrage",
          "bloodseeker_bloodrage",
          "bloodseeker_rupture",
          "bloodseeker_bloodrage",
          "bloodseeker_bloodrage",
          "special_bonus_unique_bloodseeker_6",
          "special_bonus_unique_bloodseeker_7",
          "special_bonus_attributes",
          "bloodseeker_rupture",
          "special_bonus_attributes",
          "special_bonus_unique_bloodseeker_3",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bloodseeker",
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "circlet",
            "slippers",
            "branches",
            "faerie_fire",
            "magic_stick",
            "orb_of_venom",
          ],
          early_game: [
            "wraith_band",
            "phase_boots",
            "magic_wand",
            "urn_of_shadows",
            "orb_of_corrosion",
          ],
          mid_game: [
            "rod_of_atos",
            "cyclone",
            "solar_crest",
            "ultimate_scepter",
            "gungir",
            "dagon",
          ],
          late_game: ["sheepstick", "octarine_core"],
          situational: [
            "spirit_vessel",
            "cyclone",
            "black_king_bar",
            "lotus_orb",
            "aghanims_shard",
            "refresher",
          ],
          core: ["phase_boots", "rod_of_atos"],
          neutral: [
            "broom_handle",
            "unstable_wand",
            "ring_of_aquila",
            "nether_shawl",
            "quickening_charm",
            "cloak_of_flames",
            "timeless_relic",
            "spell_prism",
            "fallen_sky",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      blood_bath:
        "On the lane use this spell to secure the range creep lasthit.",
      rupture:
        "Use Rupture on a highly mobile target to prevent them from being elusive.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      orb_of_corrosion: "If you can pressure on the lane.",
      //   Carry BS core items
      power_treads:
        "A core item that helps you farm faster due to attack speed increase and mana savings from the item toggling.",
      maelstrom:
        "A core farming item that benefits from Bloodrage`s spell amplification.",
      sange_and_yasha:
        "A core item that has mix of defensive and offensive stats but also further speeds you up.",
      basher:
        "A core item that procs frequently under Bloodrage buff. Can be upgraded to Abyssal Blade down the road.",
      //   ---------------------
      aghanims_shard:
        "Great against high HP targets, improves your dps and sustain.",
      //   Offlane BS core items
      phase_boots: "A core item that allows you to be even faster.",
      rod_of_atos:
        "A core item that guarantees that Blood Rite will hit and acts as a tp cancel.",
      solar_crest: "Solar is a very effective item that amplifies your carry.",
      //   ---------------------
      dagon: "Benefits from Bloodrage spell amp and acts as Linken`s popper.",
      spirit_vessel: "Against heavy healing lineup and high HP targets.",
      cyclone: "For dispel, setup and teleport cancel.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      lotus_orb: "For reflect, dispel and armor.",
      manta:
        "Alternative to Sange and Yasha if you need to dispel something like a root or a silence.",
      gungir:
        "Alternative to Mjollnir if you need AoE control. Goes well with Blood Rite.",
      monkey_king_bar:
        "Against evasion although Maelstrom/Mjollnir pierces evasion on proc already.",
      sphere:
        "Against powerful single target spells like Duel, Lasso, Hex or Doom.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "wind_lace", info: "To keep escape the Blood Rite" },
          { item: "boots", info: "To keep escape the Blood Rite" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "cyclone" },
          {
            item: "lotus_orb",
            info: "If Bloodseeker ulties you under the effect of Lotus, its much harder for him to chase you down.",
          },
        ],

        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          {
            item: "blade_mail",
            info: "Could potentially be lethal as you run with the Rupture effect and kill him while Blade Mail is on.",
          },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }, { item: "sheepstick" }],
        support: [],
        core: [
          {
            item: "satanic",
            info: "To be able to fight back while ruptured and to dispel Blood Rite silence",
          },
          { item: "abyssal_blade" },
          { item: "butterfly" },
        ],
      },
    },
  },

  "Bounty Hunter": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803622,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915719",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "bounty_hunter_jinada",
          "bounty_hunter_wind_walk",
          "bounty_hunter_jinada",
          "bounty_hunter_shuriken_toss",
          "bounty_hunter_jinada",
          "bounty_hunter_track",
          "bounty_hunter_shuriken_toss",
          "bounty_hunter_shuriken_toss",
          "bounty_hunter_shuriken_toss",
          "bounty_hunter_jinada",
          "special_bonus_unique_bounty_hunter_4",
          "bounty_hunter_track",
          "bounty_hunter_wind_walk",
          "bounty_hunter_wind_walk",
          "special_bonus_unique_bounty_hunter_6",
          "bounty_hunter_wind_walk",
          "special_bonus_attributes",
          "bounty_hunter_track",
          "special_bonus_attributes",
          "special_bonus_unique_bounty_hunter",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bounty_hunter_7",
        ],
        items: {
          starting: [
            "tango",
            "boots",
            "faerie_fire",
            "flask",
            "orb_of_venom",
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "tranquil_boots",
            "arcane_boots",
            "wind_lace",
            "urn_of_shadows",
            "magic_wand",
            "orb_of_corrosion",
            "medallion_of_courage",
          ],
          mid_game: [
            "cyclone",
            "ancient_janggo",
            "solar_crest",
            "force_staff",
            "ghost",
          ],
          late_game: [
            "octarine_core",
            "ultimate_scepter",
            "sheepstick",
            "boots_of_bearing",
          ],
          situational: [
            "infused_raindrop",
            "aghanims_shard",
            "spirit_vessel",
            "ancient_janggo",
            "lotus_orb",
            "cyclone",
          ],
          core: [
            "tranquil_boots",
            "wind_lace",
            "spirit_vessel",
            "solar_crest",
            "ultimate_scepter",
            "octarine_core",
          ],
          neutral: [
            "unstable_wand",
            "pogo_stick",
            "bullwhip",
            "ring_of_aquila",
            "essence_ring",
            "spider_legs",
            "quickening_charm",
            "flicker",
            "ascetic_cap",
            "fallen_sky",
            "seer_stone",
          ],
        },
      },
    ],
    ability_tooltips: {
      bounty_hunter_jinada:
        "Goes very well with Boots and can harass melee heroes on lane. Put a point on level 1 if thats the case.",
      bounty_hunter_wind_walk:
        "You can put a point on level 1 if you feel like you cant reach opponents or frequently attack them with Jinada.",
      special_bonus_unique_bounty_hunter_8:
        "If you are not going for Aghanim`s Scepter or you are still far from assembling it, take this talent. Otherwise, take the suggested one.",
      special_bonus_unique_bounty_hunter_7:
        "If you have Aghanim`s Scepter and you see yourself being able to do a lot of damage with Shuriken Tosses in the fight(short BKBs, no Linken Spheres), take this suggested talent. Otherwise, take the other one.",
    },
    item_tooltips: {
      orb_of_venom:
        "If you see yourself being able to hit the opponents and run them down on the lane often.",
      ward_sentry: "To block or unblock a pull camp.",
      tranquil_boots:
        "A core boots upgrade that provides hp sustain but most importantly great movement speed to roam around.",
      wind_lace:
        "A core item that allows you to roam around even faster. It can be used to assemble Eul`s or Solar Crest.",
      orb_of_corrosion: "If you can pressure on the lane.",
      infused_raindrop: "Against magical burst.",
      urn_of_shadows:
        "A core item that allows you to snowball off of first kill. It provides useful stats, good mana regeneration. You can unstealth yourself by using it when you get dusted to move faster.",
      spirit_vessel: "Against heavy-healing lineup.",
      ancient_janggo:
        "If you are grouping up a lot as a team in midgame and if you have summons.",
      cyclone:
        "A core item that allows you to dispel yourself(e.g. dust) or disable an opponent.",
      aghanims_shard: "A core item that adds more control and survivability.",
      ultimate_scepter:
        "A core item that allows you to deal more damage in the fights and get richer at the same time.",
      lotus_orb:
        "For reflecting, dispelling (e.g. Dust of Appearance) and armor.",
      octarine_core:
        "A core item that reduces cooldown of spells and items. It increases the frequency and range of Shuriken Tosses and extracts even more value from Aghanim`s Scepter.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To disallow Bounty Hunter get easy Jinada hits off",
          },
          {
            item: "boots",
            info: "To disallow Bounty Hunter get easy Jinada hits off",
          },
          {
            item: "armor",
            info: "Buy armor items against a core Bounty Hunter",
          },
        ],
        support: [{ item: "ward_sentry" }, { item: "dust" }],
        core: [],
      },
      mid_game: {
        all: [{ item: "cyclone" }, { item: "lotus_orb" }],
        support: [{ item: "SentryDustGem" }, { item: "ghost" }],
        core: [{ item: "manta", info: "To dispel Track" }],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          {
            item: "black_king_bar",
            info: "Against a core right-clicking Bounty Hunter",
          },
        ],
        support: [{ item: "SentryDustGem" }],
        core: [
          {
            item: "assault",
            info: "If it is a core right-clicking Bounty Hunter",
          },
          { item: "abyssal_blade", info: "If it is a core Bounty Hunter" },
          { item: "butterfly", info: "If it is a core Bounty Hunter" },
        ],
      },
    },
  },

  Brewmaster: {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803632,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915806",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "brewmaster_thunder_clap",
          "brewmaster_cinder_brew",
          `brewmaster_thunder_clap`,
          `brewmaster_drunken_brawler`,
          `brewmaster_thunder_clap`,
          "brewmaster_primal_split",
          `brewmaster_thunder_clap`,
          `brewmaster_cinder_brew`,
          `brewmaster_cinder_brew`,
          `brewmaster_cinder_brew`,
          `brewmaster_drunken_brawler`,
          "brewmaster_primal_split",
          `brewmaster_drunken_brawler`,
          `special_bonus_unique_brewmaster_7`,
          `special_bonus_hp_350`,
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
            `branches`,
            `branches`,
            `gauntlets`,
            `circlet`,
            `ward_observer`,
          ],
          early_game: ["boots", "urn_of_shadows", "magic_wand", "soul_ring"],
          mid_game: [
            "ultimate_scepter",
            `blink`,
            `black_king_bar`,
            `aeon_disk`,
          ],
          late_game: [`travel_boots`, `aghanims_shard`, `refresher`, `assault`],
          situational: [
            `infused_raindrop`,
            `hand_of_midas`,
            `spirit_vessel`,
            `shivas_guard`,
            `overwhelming_blink`,
            `radiance`,
            `vladmir`,
            `lotus_orb`,
          ],
          core: ["urn_of_shadows", "boots", "ultimate_scepter", "refresher"],
          neutral: [
            "arcane_ring",
            `pogo_stick`,
            `unstable_wand`,
            "ring_of_aquila",
            `paintball`,
            `dragon_scale`,
            "quickening_charm",
            `cloak_of_flames`,
            `spider_legs`,
            "spell_prism",
            `ascetic_cap`,
            `trickster_cloak`,
            "force_field",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      brewmaster_drunken_brawler: `You can put a point in this spell on level 1 to survive the first few creep waves against a tough lane match-up.`,
      special_bonus_hp_350: `It is important that you get ulti off and extra HP can help with that. The other level fifteen does not see much play as you spend most of the fight in Primal Split.`,
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace gauntlets and one branch for it.`,
      urn_of_shadows: "A core item that activates the Cinder Brew on cast.",
      boots:
        "A core item that can be upgraded to Boots of Travels in mid to late-game.",
      hand_of_midas:
        "If you can get it early. Brewmaster is an experience-hungry hero.",
      spirit_vessel: "Against heavy healing lineup.",
      ultimate_scepter:
        "A core item that adds another charge to the Primal Split.",
      blink:
        "An item that allows you to initiate the fight and pop Primal Split closer to opponents.",
      aghanims_shard: "For an extra brewling.",
      black_king_bar:
        "To be able to get Primal Split off and against a lot of disables, magical damage and as a dispel.",
      refresher:
        "A core item that allows you to have up to 4 Primal Splits when paired with Aghanim`s Scepter.",
      aeon_disk: `To reliably get Primal Split off every time in fights.`,
    },
    combo: [
      `brewmaster_cinder_brew`,
      `urn_of_shadows`,
      `brewmaster_thunder_clap`,
      `brewmaster_primal_split`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "magic_stick",
            info: "Brewmaster`s spells are fairly cheap and on low cooldown",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from the Brewmaster and offset slow coming from Thunder Clap and Cinder Brew",
          },
          {
            item: "boots",
            info: "To keep the distance from the Brewmaster and offset slow coming from Thunder Clap and Cinder Brew",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [],
        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "monkey_king_bar" },
          {
            item: "bloodthorn",
            info: "For true strike against Drunken Brawler and to burst this tanky hero",
          },
          { item: "butterfly" },
        ],
      },
    },
  },

  Bristleback: {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803643,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915905",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
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
          `special_bonus_mp_regen_150`,
          "bristleback_bristleback",
          "bristleback_warpath",
          "bristleback_viscous_nasal_goo",
          "bristleback_viscous_nasal_goo",
          "special_bonus_hp_200",
          "bristleback_viscous_nasal_goo",
          "special_bonus_attributes",
          "bristleback_warpath",
          "special_bonus_attributes",
          "special_bonus_hp_regen_20",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_unique_bristleback_3",
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "quelling_blade",
            `gauntlets`,
            `gauntlets`,
          ],
          early_game: [
            `vanguard`,
            `soul_ring`,
            `boots`,
            "magic_wand",
            `phase_boots`,
          ],
          mid_game: [
            "hood_of_defiance",
            "ultimate_scepter",
            "sange",
            "eternal_shroud",
            "aghanims_shard",
            "sange_and_yasha",
          ],
          late_game: [
            `assault`,
            `abyssal_blade`,
            `shivas_guard`,
            `overwhelming_blink`,
          ],
          situational: [
            `pipe`,
            `crimson_guard`,
            `arcane_boots`,
            `heavens_halberd`,
            `guardian_greaves`,
            `lotus_orb`,
            `black_king_bar`,
            `travel_boots`,
          ],
          core: [
            "vanguard",
            `soul_ring`,
            `boots`,
            "hood_of_defiance",
            "ultimate_scepter",
          ],
          neutral: [
            "chipped_vest",
            `arcane_ring`,
            `broom_handle`,
            "essence_ring",
            "vambrace",
            "quickening_charm",
            `cloak_of_flames`,
            `paladin_sword`,
            "spell_prism",
            `trickster_cloak`,
            `flicker`,
            `giants_ring`,
            `fallen_sky`,
            `mirror_shield`,
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      bristleback_viscous_nasal_goo:
        "You can skill Viscious Nasal Goo on level one if you are fighting on the rune, or on level two if you see an opportunity to run down the opponent`s hero on the lane.",
      special_bonus_unique_bristleback_3:
        "You should generally be looking to transition to right-clicker in late game and this talent helps with that.",
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace both gauntlets for it.`,
      vanguard:
        "A core item that makes you significantly harder to kill. Allows you to dive, creepskip and clear stacks with ease. Can be disassembled.",
      soul_ring: "A core item that helps with mana sustain.",
      hood_of_defiance: "A core item that tanks you up against magical damage.",
      ultimate_scepter:
        "A core item that allows you to build up Warpath stacks faster as it makes Viscious Nasal Goo have no cast point. Adds to AoE control.",
      sange: "Can be used for Halberd or combined with Yasha",
      aghanims_shard: "For more Quill stacks and AoE slow.",
      pipe: "Against heavy magical damage lineups.",
      crimson_guard: "Against high attack speed heroes and multiple units.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      lotus_orb: "For reflect, dispel(e.g. Spirit Vessel debuff) and armor.",
      black_king_bar:
        "Against a lot of disables, magical damage, mana burn, breaks and as a dispel.",
    },
    combo: [
      `bristleback_hairball`,
      `bristleback_quill_spray`,
      `bristleback_viscous_nasal_goo`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_wand",
            info: "Bristleback relies heavily on stacking Quill Spray and Viscious Nasal Goo on opponents",
          },
          { item: "armor", info: "Buy armor items" },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the pressure from the Bristleback",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from the Bristleback",
          },
          { item: "boots", info: "To keep the distance from the Bristleback" },
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against high HP pool and HP regeneration that Bristleback tends to have",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from Quill Spray and provides armor against right-clicks, Viscous Nasal Goo and Quill Spray",
          },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "diffusal_blade" },
          { item: "silver_edge" },
          { item: "hurricane_pike" },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "assault" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "skadi", info: "To reduce healing" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Broodmother: {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803657,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699915996",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "broodmother_spin_web", // 1
          "broodmother_insatiable_hunger", // 2
          `broodmother_insatiable_hunger`, // 3
          "broodmother_silken_bola", // 4
          "broodmother_spin_web", // 5
          "broodmother_spawn_spiderlings", // 6
          `broodmother_silken_bola`, // 7
          "broodmother_spin_web", // 8
          `broodmother_spin_web`, // 9
          "broodmother_silken_bola", // 10
          "broodmother_silken_bola", // 11
          "broodmother_spawn_spiderlings", // 12
          "broodmother_insatiable_hunger", // 13
          "broodmother_insatiable_hunger", // 14
          `special_bonus_unique_broodmother_3`, // 15
          `special_bonus_unique_broodmother_5`, // 16
          "special_bonus_attributes", // 17
          "broodmother_spawn_spiderlings", // 18
          "special_bonus_attributes", // 19
          "special_bonus_hp_400", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_broodmother_2`, // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "faerie_fire",
            "ring_of_protection",
            `branches`,
            `enchanted_mango`,
            "ward_observer",
          ],
          early_game: [
            "soul_ring",
            "boots",
            "orb_of_corrosion",
            `arcane_boots`,
            "magic_wand",
          ],
          mid_game: ["orchid", "assault", "basher"],
          late_game: [
            `ultimate_scepter`,
            `bloodthorn`,
            `butterfly`,
            `abyssal_blade`,
            `nullifier`,
          ],
          situational: [
            `infused_raindrop`,
            `power_treads`,
            `black_king_bar`,
            `desolator`,
            "aghanims_shard",
            "nullifier",
            "blink",
            `sheepstick`,
          ],
          core: [`soul_ring`, `orchid`, `power_treads`, `assault`],
          neutral: [
            "arcane_ring",
            "broom_handle",
            "quicksilver_amulet",
            `misericorde`,
            `essence_ring`,
            "paladin_sword",
            `elven_tunic`,
            "the_leveller",
            `penta_edged_sword`,
            `trickster_cloak`,
            "desolator_2",
            `pirate_hat`,
            `mirror_shield`,
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_broodmother_3:
        "On level 15, take the level 15 talent before this level 10 talent. On level 16 take this level 10 talent. The dota2 client disallows me to indicate that in the leveling table above.",
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace the tango and mango for it.`,
      ward_observer:
        "If you are playing midlane but also on offlane for extra vision aroud the lane.",
      infused_raindrop: "Against magical burst.",
      soul_ring: "A core item necessary for mana sustain.",
      orchid: "A core item that allows you to pick-off heroes.",
      arcane_boots: `A core item that allows you to spam Spawn Spiderlings to increase farming speed and damage in fights.`,
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      aghanims_shard: "Against illusion based heroes, summons and clones.",
      nullifier:
        "Allows you to breach through some of the defensive items and spells.",
      blink:
        "Allows you to instantly reposition on top of the hero you want to kill.",
      sheepstick: "For extra control in the late game.",
    },
    combo: [
      `orchid`,
      `broodmother_spawn_spiderlings`,
      `broodmother_silken_bola`,
      `broodmother_insatiable_hunger`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from the Broodmother",
          },
          { item: "boots", info: "To keep the distance from the Broodmother" },
          { item: "armor", info: "Buy armor items" },
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against Insatiable Hunger",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [
          { item: "ring_of_health" },
          {
            item: "vanguard",
            info: "To offset the damage coming from summons",
          },
        ],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "hurricane_pike" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [],
        core: [
          {
            item: "monkey_king_bar",
            info: "For true strike against Silken Bola",
          },
          { item: "abyssal_blade" },
          { item: "bloodthorn", info: "For true strike against Silken Bola" },
          { item: "skadi", info: "To reduce healing from Insatiable Hunger" },
          { item: "butterfly" },
          {
            item: "satanic",
            info: "To be able to fight back and to dispel Silken Bola",
          },
        ],
      },
    },
  },

  "Centaur Warrunner": {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803669,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916073",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "centaur_hoof_stomp", // 1
          "centaur_return", // 2
          "centaur_return", // 3
          "centaur_double_edge", // 4
          "centaur_return", // 5
          "centaur_stampede", // 6
          "centaur_return", // 7
          "centaur_hoof_stomp", // 8
          "centaur_hoof_stomp", // 9
          "centaur_hoof_stomp", // 10
          "special_bonus_hp_regen_5", // 11
          "centaur_stampede", // 12
          "centaur_double_edge", // 13
          "centaur_double_edge", // 14
          "centaur_double_edge", // 15
          "special_bonus_unique_centaur_4", // 16
          "special_bonus_attributes", // 17
          "centaur_stampede", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_centaur_5`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_centaur_2", // 25
        ],
        items: {
          starting: [
            "tango",
            `quelling_blade`,
            `branches`,
            `branches`,
            `gauntlets`,
            `circlet`,
            `ward_observer`,
          ],
          early_game: ["vanguard", "boots", "magic_wand", "phase_boots"],
          mid_game: [`blink`, `hood_of_defiance`, `ultimate_scepter`],
          late_game: [
            `heart`,
            `aghanims_shard`,
            `overwhelming_blink`,
            `assault`,
          ],
          situational: [
            "crimson_guard",
            "heavens_halberd",
            `pipe`,
            `solar_crest`,
            `solar_crest`,
            `lotus_orb`,
            `shivas_guard`,
            `blade_mail`,
            `black_king_bar`,
            `aeon_disk`,
            `travel_boots`,
          ],
          core: [`vanguard`, `blink`, `hood_of_defiance`, `ultimate_scepter`],
          neutral: [
            "chipped_vest",
            `broom_handle`,
            `unstable_wand`,
            "dragon_scale",
            "vambrace",
            "cloak_of_flames",
            "spider_legs",
            "trickster_cloak",
            `ascetic_cap`,
            `flicker`,
            "giants_ring",
            `apex`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      centaur_double_edge:
        "You can skill this spell on level one or two if you can pressure or against Naga Siren to kill her illusions. The more aggressive you can be on the lane, the less points in Retaliate you need.",
      special_bonus_unique_centaur_5: `Stacks up well with the Aghanims Scepter on Centaur.`,
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace circlet and one branch for it.`,
      vanguard:
        "A core item that allows you to be come extremely tanky, to creepskip and clear stacks.",
      blink:
        "A core item that allows you to initiate the fights by jumping in and Hoof Stomping.",
      hood_of_defiance:
        "A core item that allows tanks you up against magical damage. Reduces the self-damage taken from Double Edge.",
      crimson_guard: "Against high attack speed heroes and multiple units.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      pipe: "To protect your team against magical damage.",
      aghanims_shard: "For extra damage and tankiness.",
      lotus_orb: "For reflect, dispel(e.g. Spirit Vessel debuff) and armor.",
      ultimate_scepter: `A core item that buffs your team against burst heavy enemy lineups.`,
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
    },
    combo: [
      `centaur_stampede`,
      `blink`,
      `centaur_hoof_stomp`,
      `centaur_double_edge`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To keep the distance from the Centaur Warrunner",
          },
          {
            item: "boots",
            info: "To keep the distance from the Centaur Warrunner",
          },
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against high HP pool and HP regeneration that Centaur tends to have",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [{ item: "black_king_bar" }],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade", info: "Against Stampede" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  "Chaos Knight": {
    gameplay_version: "7.31b",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640803680,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916165",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "chaos_knight_chaos_bolt", // 1
          "chaos_knight_chaos_strike", // 2
          "chaos_knight_reality_rift", // 3
          "chaos_knight_chaos_strike", // 4
          "chaos_knight_chaos_strike", // 5
          "chaos_knight_phantasm", // 6
          "chaos_knight_chaos_strike", // 7
          "chaos_knight_reality_rift", // 8
          "chaos_knight_reality_rift", // 9
          "special_bonus_unique_chaos_knight_2", // 10
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
        ability_tooltips: {
          chaos_knight_chaos_reality_rift:
            "You can take this on level 2 instead of level 3 if you have a strong lane partner or tri-lane in order to get kills.",
          chaos_knight_phantasm:
            "In the early game you should be using this ability off-cooldown in order to farm faster and push out waves. Only keep this ready if you think a fight will break out soon.",
        },
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "gauntlets",
            "branches",
            "enchanted_mango",
            "magic_stick",
          ],
          early_game: [
            "magic_wand",
            "power_treads",
            "bracer",
            "soul_ring",
            "helm_of_iron_will",
          ],
          mid_game: [
            "armlet",
            "echo_sabre",
            "sange_and_yasha",
            "aghanims_shard",
            "black_king_bar",
          ],
          late_game: [
            "heart",
            "assault",
            "satanic",
            "skadi",
            "abyssal_blade",
            "overwhelming_blink",
          ],
          situational: [
            "hand_of_midas",
            "blink",
            "black_king_bar",
            "silver_edge",
            "orchid",
          ],
          core: ["power_treads", "armlet", "black_king_bar"],
          neutral: [
            "unstable_wand",
            "broom_handle",
            "possessed_mask",
            "chipped_vest",
            "vambrace",
            "pupils_gift",
            "ring_of_aquila",
            "elven_tunic",
            "paladin_sword",
            "titan_sliver",
            "mind_breaker",
            "the_leveller",
            "spell_prism",
            "penta_edged_sword",
            "flicker",
            "pirate_hat",
            "apex",
          ],
        },
        item_tooltips: {
          stick:
            "If you are laning against a hero that spams alot of spells in the lane (eg. Bristleback/Batrider) then you should start with a stick.",
          bracer: "Don`t get more than two bracers",
          soul_ring: "Get this instead of bracers or with 1 bracer.",
          orchid:
            "Good item to buy after your armlet if you`re playing against some slippery heroes with a lack of disable.",
          hand_of_midas:
            "If you can get it early. Your illusions benefit from the attack speed as well.",
          blink:
            "Allows you to use Phantasm, blink in and pull the illusions onto the opponent with Reality Rift.",
          flicker:
            "Can be really good in the late game if your enemies are controlling you with slows,silences etc.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1641361683,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2708440963",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "chaos_knight_chaos_bolt", // 1
          "chaos_knight_reality_rift", // 2
          "chaos_knight_chaos_strike", // 3
          "chaos_knight_chaos_bolt", // 4
          "chaos_knight_chaos_bolt", // 5
          "chaos_knight_phantasm", // 6
          "chaos_knight_chaos_bolt", // 7
          "chaos_knight_reality_rift", // 8
          "chaos_knight_reality_rift", // 9
          "chaos_knight_reality_rift", // 10
          "special_bonus_unique_chaos_knight_2", // 11
          "chaos_knight_phantasm", // 12
          "chaos_knight_chaos_strike", // 13
          "chaos_knight_chaos_strike", // 14
          "special_bonus_unique_chaos_knight_8", // 15
          "chaos_knight_chaos_strike", // 16
          "special_bonus_attributes", // 17
          "chaos_knight_phantasm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_chaos_knight_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_chaos_knight_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "branches",
            "enchanted_mango",
            "magic_stick",
          ],
          early_game: ["magic_wand", "power_treads", "soul_ring", "bracer"],
          mid_game: ["armlet", "blink", "ultimate_scepter", "aghanims_shard"],
          late_game: ["assault", "octarine_core"],
          situational: ["heavens_halberd", "black_king_bar", "silver_edge"],
          core: [
            "power_treads",
            "armlet",
            "blink",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          neutral: [
            "unstable_wand",
            "possessed_mask",
            "vambrace",
            "pupils_gift",
            "elven_tunic",
            "paladin_sword",
            "the_leveller",
            "spell_prism",
            "pirate_hat",
            "apex",
          ],
        },
        item_tooltips: {
          // Offlane CK tips
          blink:
            "A core item that allows you to use Phantasm, blink in and pull the illusions onto the opponent with Reality Rift.",
          ultimate_scepter:
            "A core item that makes Phantasm create an extra illusion of Chaos Knight and of each ally. Applies a basic dispel on cast.",
          heavens_halberd: "Especially good against ranged right-clickers.",
          aghanims_shard:
            "A core item that improves cast range of Chaos Bolt and creates an Chaos Knight illusion to attack the target by default.",
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_chaos_knight:
        "If there are no spell-immune heroes or Black King Bars, take the other talent.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      power_treads:
        "A core item that allows you to farm faster due to attack speed increase. The movement speed, attributes and attack speed also affect the illusions.",
      armlet:
        "A core item that boosts your dps significantly as Armlet active bonus strength is passed to your illusions as well.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      silver_edge:
        "For pick-off potential, easier initiation and break effect.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from the Chaos Knight",
          },
          { item: "boots", info: "To keep the distance from the Chaos Knight" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
          { item: "lotus_orb" },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "bfury" },
          { item: "maelstrom" },
          { item: "gungir" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick", info: "Also instantly destroys illusions" },
          { item: "aeon_disk" },
        ],
        support: [],
        core: [
          { item: "mjollnir" },
          { item: "shivas_guard" },
          { item: "radiance" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Chen: {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803695,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916263",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "chen_holy_persuasion", // 1
          `chen_penitence`, // 2
          "chen_holy_persuasion", // 3
          `chen_divine_favor`, // 4
          "chen_holy_persuasion", // 5
          "chen_hand_of_god", // 6
          "chen_holy_persuasion", // 7
          "chen_penitence", // 8
          "chen_penitence", // 9
          "special_bonus_unique_chen_11", // 10
          "chen_penitence", // 11
          "chen_hand_of_god", // 12
          "chen_divine_favor", // 13
          "chen_divine_favor", // 14
          `special_bonus_unique_chen_5`, // 15
          `chen_divine_favor`, // 16
          "special_bonus_attributes", // 17
          "chen_hand_of_god", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_chen_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_chen_2", // 25
        ],
        items: {
          starting: [`tango`, `headdress`, `ward_observer`, `faerie_fire`],
          early_game: [
            `ward_sentry`,
            `boots`,
            "magic_wand",
            "medallion_of_courage",
            "ring_of_basilius",
          ],
          mid_game: [
            `mekansm`,
            `holy_locket`,
            `guardian_greaves`,
            `aghanims_shard`,
            `force_staff`,
          ],
          late_game: [
            `ultimate_scepter`,
            `aeon_disk`,
            `boots_of_bearing`,
            `wraith_pact`,
          ],
          situational: [
            `infused_raindrop`,
            `glimmer_cape`,
            `solar_crest`,
            `pipe`,
            `ghost`,
            `lotus_orb`,
            `helm_of_the_overlord`,
            `travel_boots`,
          ],
          core: [
            `medallion_of_courage`,
            `mekansm`,
            `holy_locket`,
            `guardian_greaves`,
            `aghanims_shard`,
            `ultimate_scepter`,
          ],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            `spider_legs`,
            `ceremonial_robe`,
            "spy_gadget",
            "spell_prism",
            "force_field",
            `book_of_shadows`,
            `seer_stone`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: `Buy two sentries with the bounty rune gold to keep the camps unblocked.`,
      infused_raindrop: "Against magical burst.",
      mekansm:
        "A core item that allows you to group up early and pressure buildings.",
      medallion_of_courage: `A core item that buffs one of your right-clicking cores and allows you to take Roshan earlier. Can upgrade to Solar Crest as well.`,
      holy_locket: `Improves the healing ability of your ultimate.`,
      aghanims_shard: `Allows you to take ancient creeps with Holy Persuasion. The ancients are much more powerful than normal creeps.`,
      lotus_orb: `For reflect, dispel and armor.`,
    },
    combo: [], // There is no particular combo for Chen
    counter_items: {
      laning_phase: {
        all: [],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: { all: [{ item: "spirit_vessel" }], support: [], core: [] },
      late_game: { all: [], support: [], core: [] },
    },
  },

  Clinkz: {
    gameplay_version: "7.31b",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640803707,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916348",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "clinkz_searing_arrows", // 1
          "clinkz_strafe", // 2
          "clinkz_searing_arrows", // 3
          "clinkz_strafe", // 4
          "clinkz_strafe", // 5
          "clinkz_death_pact", // 6
          "clinkz_strafe", // 7
          "clinkz_wind_walk", // 8
          "clinkz_wind_walk", // 9
          "clinkz_wind_walk", // 10
          "clinkz_wind_walk", // 11
          "clinkz_death_pact", // 12
          "clinkz_searing_arrows", // 13
          "special_bonus_unique_clinkz_10", // 14
          "special_bonus_unique_clinkz_8", // 15
          "clinkz_searing_arrows", // 16
          "special_bonus_attributes", // 17
          "clinkz_death_pact", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_clinkz_12", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_clinkz_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            "slippers",
            "circlet",
            "quelling_blade",
            "magic_stick",
          ],
          early_game: [
            "maelstrom",
            "power_treads",
            "magic_wand",
            "falcon_blade",
            "wraith_band",
          ],
          mid_game: [
            "dragon_lance",
            "aghanims_shard",
            "skadi",
            "gungir",
            "lesser_crit",
          ],
          late_game: ["greater_crit", "satanic", "bloodthorn", "sheepstick"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "monkey_king_bar",
            "sphere",
            "ultimate_scepter",
            "orchid",
          ],
          core: ["maelstrom", "power_treads", "dragon_lance", "skadi"],
          neutral: [
            "arcane_ring",
            "possessed_mask",
            "grove_bow",
            "ring_of_aquila",
            "enchanted_quiver",
            "paladin_sword",
            "mind_breaker",
            "spell_prism",
            "the_leveller",
            "desolator_2",
            "apex",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      maelstrom: "A core farming item that can proc with Burning Barrage.",
      power_treads:
        "A core item that allows you to farm faster due to attack speed increase and mana savings by toggling it.",
      dragon_lance:
        "A core item that allows you to shoot from far away and it also increases the reach of Burning Barrage.",
      skadi:
        "A core item that tanks you up and keeps the opponents in Burning Barrage for longer.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      monkey_king_bar: "Against evasion.",
      sphere:
        "Against powerful single target spells like Duel, Lasso, Hex or Doom.",
      ultimate_scepter:
        "For more AoE damage and chaos in late game teamfights.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "armor", info: "Buy armor items" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from the Clinkz",
          },
        ],
        support: [{ item: "ward_sentry" }, { item: "dust" }],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [
          { item: "SentryDust" },
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff", info: "To move out of Burning Barrage path" },
        ],
        core: [{ item: "blade_mail" }, { item: "heavens_halberd" }],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [{ item: "SentryDustGem" }],
        core: [{ item: "abyssal_blade" }, { item: "butterfly" }],
      },
    },
  },

  Clockwerk: {
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803718,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916434",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "special_bonus_unique_clockwerk_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_clockwerk", // 25
        ],
        items: {
          starting: [
            "tango",
            "boots",
            "flask",
            "wind_lace",
            "enchanted_mango",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "tranquil_boots",
            "urn_of_shadows",
            "magic_wand",
            "wind_lace",
          ],
          mid_game: ["force_staff", "glimmer_cape", "ghost", "blade_mail"],
          late_game: ["ultimate_scepter", "sheepstick"],
          situational: [
            "spirit_vessel",
            "ancient_janggo",
            "lotus_orb",
            "heavens_halberd",
          ],
          core: ["tranquil_boots", "force_staff", "ultimate_scepter"],
          neutral: [
            "pogo_stick",
            "unstable_wand",
            "essence_ring",
            "dragon_scale",
            "cloak_of_flames",
            "black_powder_bag",
            "ascetic_cap",
            "trickster_cloak",
            "force_field",
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_clockwerk_4:
        "Even though the opponents might not have invisibility in some shape or form, it is still useful talent to deward.",
      special_bonus_unique_clockwerk_6:
        "You can take this talent over the other one if the opponents become short on damage once you become spell-immune.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      ward_sentry: "To block or unblock the pull camp.",
      tranquil_boots:
        "A core boots upgrade that allows you to sustain HP and move fast around the map. You can consider Phase Boots instead if you have a good start.",
      spirit_vessel: "Against heavy healing lineup.",
      force_staff:
        "A core item that allows you to catch up to opponents` heroes even in scenario when they get a Force Staff as well.",
      ancient_janggo:
        "If you are grouping up a lot as a team in midgame and if you have summons.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      ultimate_scepter:
        "A core item. Having two of each spells is always better than having only one.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To keep the distance from the Clockwerk",
          },
          { item: "boots", info: "To keep the distance from the Clockwerk" },
          {
            item: "cloak",
            info: "Clockwerk is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [
          {
            item: "ward_observer",
            info: "To keep an eye on Clockwerks position and disallow him to sneak up to you",
          },
        ],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "hurricane_pike" },
          { item: "black_king_bar" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  "Crystal Maiden": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803727,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916517",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "crystal_maiden_crystal_nova", // 1
          "crystal_maiden_frostbite", // 2
          "crystal_maiden_brilliance_aura", // 3
          "crystal_maiden_frostbite", // 4
          "crystal_maiden_frostbite", // 5
          "crystal_maiden_brilliance_aura", // 6
          "crystal_maiden_frostbite", // 7
          "crystal_maiden_brilliance_aura", // 8
          "crystal_maiden_brilliance_aura", // 9
          "crystal_maiden_freezing_field", // 10
          "special_bonus_hp_250", // 11
          "crystal_maiden_freezing_field", // 12
          "crystal_maiden_crystal_nova", // 13
          "crystal_maiden_crystal_nova", // 14
          "crystal_maiden_crystal_nova", // 15
          "special_bonus_unique_crystal_maiden_5", // 16
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
            "flask",
            `enchanted_mango`,
            `enchanted_mango`,
            "enchanted_mango",
            `clarity`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "tranquil_boots",
            `infused_raindrop`,
            "magic_wand",
            "wind_lace",
          ],
          mid_game: ["glimmer_cape", "force_staff", "ghost", "aether_lens"],
          late_game: [`black_king_bar`, `blink`, "aeon_disk", "sheepstick"],
          situational: [
            "ring_of_basilius",
            "aghanims_shard",
            "lotus_orb",
            "ultimate_scepter",
            "kaya_and_sange",
            "ethereal_blade",
            "octarine_core",
            "shivas_guard",
            "travel_boots",
          ],
          core: ["tranquil_boots", "glimmer_cape", `force_staff`],
          neutral: [
            "trusty_shovel",
            `pogo_stick`,
            "keen_optic",
            `mysterious_hat`,
            "philosophers_stone",
            "bullwhip",
            `essence_ring`,
            "spider_legs",
            "psychic_headband",
            `ceremonial_robe`,
            "spy_gadget",
            "timeless_relic",
            `heavy_blade`,
            "seer_stone",
            "book_of_shadows",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {
      crystal_maiden_freezing_field:
        "It is hard to get off a long impactful Freezing Field in early to mid-game, until you get Blink Dagger and Black King Bar which is a greedy build. You can skill it earlier than recommended by guide if you have a good setup from your teammates or to clear some stacks.",
      special_bonus_unique_crystal_maiden_4:
        "You can skill this talent over recommended one if you have skill spammers on your lineup, like a Bristleback.",
      special_bonus_attack_speed_200:
        "You can skill this talent over recommended one if you want to destroy a phoenix egg or undying tombstone.",
      special_bonus_unique_crystal_maiden_2:
        "You can skill this talent over recommended one if you are against mega creeps.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, clarity, and sentry ward for it.",
      ring_of_basilius:
        "Start with it if your laning partner also uses a lot of mana early. Send more HP consumables from base though.",
      infused_raindrop: "Against magical burst.",
      tranquil_boots:
        "A core boots upgrade which fixes her movement speed issues.",
      glimmer_cape:
        "A core defensive item. It can be used during Freezing Field channeling.",
      black_king_bar:
        "If the game opens up for you. Allows you to channel Freezing Field longer. Couples well with Blink Dagger to be able to position your ultimate nicely.",
      blink: "Goes well with the build centered around your ultimate.",
      aghanims_shard:
        "Allows you to cast and move slowly while channeling the Freezing Field.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter:
        "If the game opens up for you and you proceed with item and talent build centered around Freezing Field. Goes will with Blink Dagger, Black King Bar and Aghanim`s Shard.",
    },
    combo: [
      `crystal_maiden_frostbite`,
      `crystal_maiden_crystal_nova`,
      `crystal_maiden_freezing_field`,
      `glimmer_cape`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Crystal Maiden`s Arcane Aura allows her and her allies to have faster mana regeneration which will result in more spells being used against you",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from the Crystal Maiden",
          },
          {
            item: "headdress",
            info: "For lane sustain and/or Pipe of Insight later",
          },
          {
            item: "infused_raindrop",
            info: "Infused Raindrops allow you to offset magical damage coming from Crystal Maiden`s spells",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Frostbite" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  "Dark Seer": {
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803737,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916602",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "dark_seer_ion_shell", // 1
          "dark_seer_vacuum", // 2
          "dark_seer_ion_shell", // 3
          "dark_seer_surge", // 4
          "dark_seer_ion_shell", // 5
          "dark_seer_wall_of_replica", // 6
          "dark_seer_ion_shell", // 7
          "dark_seer_surge", // 8
          "dark_seer_surge", // 9
          "dark_seer_surge", // 10
          "dark_seer_vacuum", // 11
          "dark_seer_wall_of_replica", // 12
          "dark_seer_vacuum", // 13
          "dark_seer_vacuum", // 14
          "special_bonus_unique_dark_seer_7", // 15
          "special_bonus_unique_dark_seer_5", // 16
          "special_bonus_attributes", // 17
          "dark_seer_wall_of_replica", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dark_seer", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_dark_seer_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "enchanted_mango",
            "clarity",
            "flask",
            "mantle",
            "branches",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "null_talisman",
            "soul_ring",
            "arcane_boots",
            "magic_wand",
          ],
          mid_game: [
            "ultimate_scepter",
            "blink",
            "aghanims_shard",
            "mekansm",
            "hood_of_defiance",
          ],
          late_game: [
            "sheepstick",
            "refresher",
            "shivas_guard",
            "octarine_core",
          ],
          situational: [
            "bottle",
            "infused_raindrop",
            "guardian_greaves",
            "pipe",
            "black_king_bar",
            "lotus_orb",
          ],
          core: ["arcane_boots", "ultimate_scepter", "blink", "aghanims_shard"],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "philosophers_stone",
            "essence_ring",
            "quickening_charm",
            "cloak_of_flames",
            "spell_prism",
            "trickster_cloak",
            "force_field",
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_dark_seer_7:
        "On level fifteen, you should take the level fifteen talent before this level ten one. The dota client disallows me to set it up in such order in graphics above.",
    },
    item_tooltips: {
      bottle: "Alternative way to solve your sustain issues.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. You can disassemble it down the road.",
      ultimate_scepter:
        "A core item that buffs your allies and allows you to push out lanes faster.",
      blink:
        "Allows you to get Vacuum into Wall of Replica combo on multiple opponents. Goes well with Aghanim`s Shard.",
      aghanims_shard:
        "For extra disable and damage. Goes well with Blink Dagger.",
      guardian_greaves: "If you are looking to group up early and for dispel.",
      pipe: "Against heavy magical-damage lineups.",
      black_king_bar: "To be able to get your combo off.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Dark Seer will use one or two Ion Shells per wave",
          },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the Ion Shells",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "nullifier", info: "To dispel Ion Shell and Surge" },
          { item: "abyssal_blade" },
          {
            item: "shivas_guard",
            info: "To deal with Wall of Replica illusions",
          },
        ],
      },
    },
  },

  "Dark Willow": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803745,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699916714",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "dark_willow_bramble_maze", // 1
          "dark_willow_shadow_realm", // 2
          "dark_willow_shadow_realm", // 3
          "dark_willow_cursed_crown", // 4
          "dark_willow_bramble_maze", // 5
          "dark_willow_bedlam", // 6
          "dark_willow_bramble_maze", // 7
          "dark_willow_bramble_maze", // 8
          "dark_willow_cursed_crown", // 9
          "dark_willow_cursed_crown", // 10
          "dark_willow_cursed_crown", // 11
          "dark_willow_bedlam", // 12
          "special_bonus_unique_dark_willow_6", // 13
          "dark_willow_shadow_realm", // 14
          "special_bonus_unique_dark_willow_7", // 15
          "dark_willow_shadow_realm", // 16
          "special_bonus_attributes", // 17
          "dark_willow_bedlam", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_dark_willow_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_dark_willow_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "faerie_fire",
            "circlet",
            `sobi_mask`,
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            `urn_of_shadows`,
            "tranquil_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: ["cyclone", `aghanims_shard`, "blink", `ultimate_scepter`],
          late_game: [
            `force_staff`,
            `sheepstick`,
            "aeon_disk",
            `octarine_core`,
          ],
          situational: [
            `glimmer_cape`,
            `ghost`,
            "spirit_vessel",
            `lotus_orb`,
            `wind_waker`,
            `moon_shard`,
            `revenants_brooch`,
            `travel_boots`,
          ],
          core: [
            `urn_of_shadows`,
            "tranquil_boots",
            "cyclone",
            "aghanims_shard",
            `blink`,
          ],
          neutral: [
            "pogo_stick",
            "keen_optic",
            `pogo_stick`,
            "philosophers_stone",
            "grove_bow",
            `essence_ring`,
            "spider_legs",
            "psychic_headband",
            `ceremonial_robe`,
            `enchanted_quiver`,
            "spy_gadget",
            "timeless_relic",
            `spell_prism`,
            "seer_stone",
            "book_of_shadows",
            `pirate_hat`,
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace the sages mask and faerie fire for it.",
      infused_raindrop: "Against magical burst.",
      tranquil_boots:
        "A core boots upgrade that solves your hp sustain issues but also allows you to move around quickly.",
      cyclone:
        "A core item that combines well with Cursed Crown and Bramble Maze.",
      spirit_vessel: "Against heavy healing lineup.",
      aghanims_shard: "A core item for extra control.",
      moon_shard: `Works well in the late game with the aghanims scepter.`,
      revenants_brooch: `An incredible late game item to go with the aghanims scepter.`,
      ultimate_scepter:
        "If the game opens up for you, you can pick up this item and work on acquiring more attack speed with level twenty-five talent and items.",
    },
    combo: [
      `dark_willow_cursed_crown`,
      `cyclone`,
      `dark_willow_shadow_realm`,
      `dark_willow_bedlam`,
      `dark_willow_bramble_maze`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Dark Willow maintaines her laning presence by placing well Bramble Maze and doing burst of magic damage with Shadow Realm",
          },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the pressure from the Dark Willow",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Dark Willow is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
          {
            item: "manta",
            info: "To dispel Bramble Maze root and Cursed Crown",
          },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "butterfly",
            info: "To deal with Shadow Realm upgraded by Aghanim`s Scepter",
          },
          {
            item: "satanic",
            info: "To be able to dispel Cursed Crown or Bramble Maze root",
          },
        ],
      },
    },
  },

  Dawnbreaker: {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803756,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699917167",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "dawnbreaker_fire_wreath", // 1
          "dawnbreaker_celestial_hammer", // 2
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
          "special_bonus_unique_dawnbreaker_celestial_hammer_cast_range", // 25
        ],
        items: {
          starting: [
            `tango`,
            `flask`,
            `orb_of_venom`,
            `enchanted_mango`,
            `ward_observer`,
            `ward_sentry`,
          ],
          early_game: [
            `magic_wand`,
            `arcane_boots`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            `holy_locket`,
            `tranquil_boots`,
            `ultimate_scepter`,
            `solar_crest`,
            `lotus_orb`,
          ],
          late_game: [`boots_of_bearing`, `wraith_pact`, `black_king_bar`],
          situational: [
            `urn_of_shadows`,
            `orb_of_corrosion`,
            `aghanims_shard`,
            `vladmir`,
            `blink`,
            `cyclone`,
            `force_staff`,
            `pipe`,
            `spirit_vessel`,
            `heavens_halberd`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `holy_locket`,
            `tranquil_boots`,
            `ultimate_scepter`,
          ],
          neutral: [
            "trusty_shovel",
            `pogo_stick`,
            `arcane_ring`,
            "philosophers_stone",
            `essence_ring`,
            `paintball`,
            "quickening_charm",
            `spider_legs`,
            `black_powder_bag`,
            "spell_prism",
            `trickster_cloak`,
            `heavy_blade`,
            "force_field",
            "book_of_shadows",
          ],
        },
        item_tooltips: {
          orb_of_venom: `Lets you pressure the lane by staying on enemy heroes.`,
          holy_locket:
            "A core item that boosts the healing coming for Solar Guardian and other sources.",
          guardian_greaves:
            "If you need dispel. Fits well with the healing theme of this hero.",
          ultimate_scepter:
            "A core item that provides even more healing but also evasion to allies under effect of Solar Guardian.",
          aghanims_shard: "Can help you survive when you Solar Guardian in.",
          lotus_orb: "For reflect, dispel and armor.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1641843276,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2715224221",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "dawnbreaker_fire_wreath", // 1
          "dawnbreaker_celestial_hammer", // 2
          "dawnbreaker_celestial_hammer", // 3
          "dawnbreaker_luminosity", // 4   equals to `starbreaker`
          "dawnbreaker_fire_wreath", // 5
          "dawnbreaker_solar_guardian", // 6
          "dawnbreaker_fire_wreath", // 7
          "dawnbreaker_fire_wreath", // 8
          "dawnbreaker_celestial_hammer", // 9
          "special_bonus_unique_dawnbreaker_fire_wreath_swipe", // 10
          "dawnbreaker_celestial_hammer", // 11
          "dawnbreaker_solar_guardian", // 12
          "dawnbreaker_luminosity", // 13
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
          "special_bonus_unique_dawnbreaker_fire_wreath_charges", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            `flask`,
            `gauntlets`,
            `gauntlets`,
            `ward_observer`,
          ],
          early_game: [
            "phase_boots",
            "soul_ring",
            "magic_wand",
            "orb_of_corrosion",
          ],
          mid_game: [
            `echo_sabre`,
            `black_king_bar`,
            `basher`,
            `aghanims_shard`,
            `blink`,
          ],
          late_game: [`assault`, `satanic`, `overwhelming_blink`],
          situational: [
            `armlet`,
            `urn_of_shadows`,
            `orchid`,
            `ultimate_scepter`,
            `pipe`,
            `heavens_halberd`,
            `spirit_vessel`,
            `silver_edge`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `soul_ring`,
            `echo_sabre`,
            `aghanims_shard`,
            `blink`,
          ],
          neutral: [
            `broom_handle`,
            `chipped_vest`,
            `unstable_wand`,
            `vambrace`,
            "dragon_scale",
            "cloak_of_flames",
            "black_powder_bag",
            "trickster_cloak",
            "ascetic_cap",
            "fallen_sky",
            `force_field`,
            `demonicon`,
          ],
        },
        ability_tooltips: {
          dawnbreaker_luminosity: `If you cannot play for a kill, you can put first point in this spell at level 3 already for easier lasthitting and some sustain.`,
        },
        item_tooltips: {
          orb_of_corrosion: `Lets you apply more pressure in the lane.`,
          phase_boots: "A core item that allows you to gap-close faster.",
          soul_ring: "A core item that helps with mana sustain.",
          echo_sabre:
            "A core item that allows you to deliver damage quickly. Can be disassembled and Ogre Axe used for quicker Black King Bar timing. You can assemble Echo Sabre back again.",
          orchid:
            "Allows you to land solo kills. You can get an Oblivion Staff from Echo Sabre by disassembling it.",
          heavens_halberd: "Especially good against ranged right-clikers.",
          aghanims_shard:
            "A core item that grants allows you to become spell-immune during Starbreaker.",
          blink:
            "For gap-closing. Can be upgraded down the road into Overwhelming Blink.",
          silver_edge: "For break effect and burst.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
    },
    combo: [
      `dawnbreaker_solar_guardian`,
      `dawnbreaker_fire_wreath`,
      `dawnbreaker_celestial_hammer`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against Dawnbreaker`s Luminosity and Solar Guardian",
          },
          { item: "wind_lace", info: "To keep distance from Dawnbreaker" },
          { item: "boots", info: "To keep distance from Dawnbreaker" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from Dawnbreaker`s spells and provides armor against right-clicks and Starbreaker",
          },
          {
            item: "vladmir",
            info: "As the game goes, a core Dawnbreaker does more and more physical damage and armor will offset that",
          },
        ],
        support: [
          { item: "ghost" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [{ item: "silver_edge" }, { item: "hurricane_pike" }],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "shivas_guard",
            info: "To reduce healing and armor against Starbreaker",
          },
          { item: "skadi", info: "To reduce healing" },
          { item: "assault" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  Dazzle: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803766,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699917255",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "dazzle_poison_touch", // 1
          "dazzle_shadow_wave", // 2
          "dazzle_poison_touch", // 3
          "dazzle_shallow_grave", // 4
          "dazzle_poison_touch", // 5
          "dazzle_bad_juju", // 6
          `dazzle_poison_touch`, // 7
          "dazzle_shadow_wave", // 8
          "dazzle_shadow_wave", // 9
          "special_bonus_mp_regen_175", // 10
          `dazzle_shadow_wave`, // 11
          "dazzle_bad_juju", // 12
          "dazzle_shallow_grave", // 13
          "dazzle_shallow_grave", // 14
          `special_bonus_unique_dazzle_2`, // 15
          `dazzle_shallow_grave`, // 16
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
            "flask",
            "faerie_fire",
            "enchanted_mango",
            `wind_lace`,
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            "arcane_boots",
            "magic_wand",
            `infused_raindrop`,
            "medallion_of_courage",
          ],
          mid_game: [
            "holy_locket",
            `tranquil_boots`,
            "glimmer_cape",
            "aghanims_shard",
            "force_staff",
            "solar_crest",
            "aether_lens",
          ],
          late_game: ["aeon_disk", "ultimate_scepter", `sheepstick`],
          situational: [
            `blight_stone`,
            `urn_of_shadows`,
            `cyclone`,
            `ghost`,
            `ethereal_blade`,
            `wind_waker`,
            `guardian_greaves`,
            `pipe`,
            `boots_of_bearing`,
            "lotus_orb",
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "holy_locket",
            "glimmer_cape",
            "aghanims_shard",
            `force_staff`,
          ],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            `pogo_stick`,
            "philosophers_stone",
            "bullwhip",
            `pupils_gift`,
            "psychic_headband",
            "spider_legs",
            `ceremonial_robe`,
            "spy_gadget",
            "ascetic_cap",
            `trickster_cloak`,
            "seer_stone",
            "book_of_shadows",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      wind_lace: `It helps you chase people down and reapplying Poison Touch.`,
      blight_stone:
        "If you expect double melee against you. Synergizes well with pyscial damage of Poison Touch and Shadow Wave.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace the wind lace for it.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade which benefits from cooldown reduction from Bad Juju. Can be disassembled later on.",
      holy_locket:
        "A core item that goes well with the healing theme of the hero.",
      tranquil_boots: `You can upgrade Brown Boots to Tranquils once you have the Holy Locket.`,
      glimmer_cape: "A core defensive item.",
      aghanims_shard: "A core item that provides extra control in fights.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [], // There is no particular combo for Dazzle
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Dazzle tends to use Shadow Wave and Poison Touch every creep wave to kill creeps and apply pressure on the opponents",
          },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the pressure from the Dazzle",
          },
          {
            item: "wind_lace",
            info: "To move away when Poison Touch is applied",
          },
          { item: "boots", info: "To move away when Poison Touch is applied" },
          { item: "armor", info: "Buy armor items" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to negate healing and be able to kill off a hero after the Shallow Grave expires",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "blink", info: "To close the gap to Dazzle" },
        ],
        support: [],
        core: [],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "shivas_guard", info: "To reduce healing" },
          { item: "skadi", info: "To reduce healing" },
        ],
      },
    },
  },

  "Death Prophet": {
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803776,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699917391",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "death_prophet_carrion_swarm", // 1
          "death_prophet_spirit_siphon", // 2
          "death_prophet_carrion_swarm", // 3
          "death_prophet_spirit_siphon", // 4
          "death_prophet_spirit_siphon", // 5
          "death_prophet_exorcism", // 6
          "death_prophet_spirit_siphon", // 7
          "death_prophet_silence", // 8
          "death_prophet_silence", // 9
          "special_bonus_attack_damage_30", // 10
          "death_prophet_silence", // 11
          "death_prophet_exorcism", // 12
          "death_prophet_silence", // 13
          "death_prophet_carrion_swarm", // 14
          "special_bonus_unique_death_prophet_3", // 15
          "death_prophet_carrion_swarm", // 16
          "special_bonus_attributes", // 17
          "death_prophet_exorcism", // 18
          "special_bonus_attributes", // 19
          "special_bonus_hp_400", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_death_prophet", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "circlet",
            "mantle",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["bottle", "null_talisman", "boots", "magic_wand"],
          mid_game: [
            "cyclone",
            "travel_boots",
            "black_king_bar",
            "kaya_and_sange",
            "aghanims_shard",
          ],
          late_game: [
            "assault",
            "refresher",
            "octarine_core",
            "ultimate_scepter",
          ],
          situational: [
            "infused_raindrop",
            "heavens_halberd",
            "shivas_guard",
            "blink",
          ],
          core: [
            "cyclone",
            "travel_boots",
            "black_king_bar",
            "kaya_and_sange",
            "aghanims_shard",
          ],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "essence_ring",
            "dragon_scale",
            "quickening_charm",
            "black_powder_bag",
            "timeless_relic",
            "spell_prism",
            "ex_machina",
            "mirror_shield",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_death_prophet_5:
        "You can take this talent at level 25 over the suggested one. Usually, having 5 Spirit Siphons per fight due to Aghanim`s Shard should be more than enough thus I prefer the Exorcism talent. Also, if you have Refresher Orb or Shard in late game, the Siphon talent is redundant.",
    },
    item_tooltips: {
      ward_observer:
        "If you are playing mid Death Prophet but also on the offlane to have vision around your lane.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      bottle:
        "If you are playing mid Death Prophet but also worth considering on offlane too if your mid isn`t buying bottle. Make sure your supports refill it for you here and there.",
      infused_raindrop: "Against magical burst.",
      cyclone:
        "A core item that helps with mana sustain and provides extra movement speed and dispel. You can heal from Spirit Siphons while cycloned. Keeps you alive while Exorcism still does damage around you.",
      travel_boots:
        "A core item that allows you to cover the map better and deals with kiting along with BKB.",
      black_king_bar:
        "A core item that allows you not to be kited during Exorcism.",
      kaya_and_sange:
        "A core items that presents a mix of defensive and offensive stats.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      aghanims_shard: "A core item for more control and sustain.",
      shivas_guard:
        "Great at reducing healing, bumping up your armor and preventing kiting.",
      blink: "Great for gap closing.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Death Prophet`s Crypt Swarm allows her to secure creep lasthits and harass opponents frequently",
          },
          {
            item: "ring_of_regen",
            info: "Against a sidelane Death Prophet, for sustain on the lane",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from the Death Prophet",
          },
          {
            item: "boots",
            info: "To keep the distance from the Death Prophet",
          },
          {
            item: "cloak",
            info: "Death Prophet is heavy on magical damage and Cloak negates 15% of it",
          },
          { item: "armor", info: "Buy armor items against Exorcism" },
        ],
        support: [],
        core: [
          {
            item: "ring_of_health",
            info: "Against a sidelane Death Prophet, for sustain on the lane",
          },
        ],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Silence" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "shivas_guard", info: "To reduce healing" },
          { item: "skadi", info: "To reduce healing" },
        ],
      },
    },
  },

  Disruptor: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803786,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561304",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "disruptor_thunder_strike", // 1
          "disruptor_kinetic_field", // 2
          "disruptor_thunder_strike", // 3
          "disruptor_glimpse", // 4
          "disruptor_glimpse", // 5
          "disruptor_static_storm", // 6
          "disruptor_glimpse", // 7
          "disruptor_glimpse", // 8
          "disruptor_thunder_strike", // 9
          "disruptor_thunder_strike", // 10
          "special_bonus_unique_disruptor_3", // 11
          "disruptor_static_storm", // 12
          "disruptor_kinetic_field", // 13
          "disruptor_kinetic_field", // 14
          "special_bonus_unique_disruptor_7", // 15
          "disruptor_kinetic_field", // 16
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
            "flask",
            `clarity`,
            "enchanted_mango",
            `enchanted_mango`,
            `enchanted_mango`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: ["glimmer_cape", `ultimate_scepter`],
          late_game: [`blink`, `force_staff`, "aeon_disk", `octarine_core`],
          situational: [
            `tranquil_boots`,
            `urn_of_shadows`,
            `lotus_orb`,
            `ghost`,
            `cyclone`,
            `aghanims_shard`,
            `ethereal_blade`,
            `wind_waker`,
            `refresher`,
            `travel_boots`,
          ],
          core: [`arcane_boots`, `glimmer_cape`, `ultimate_scepter`, `blink`],
          neutral: [
            "trusty_shovel",
            "pogo_stick",
            `arcane_ring`,
            `keen_optic`,
            "philosophers_stone",
            "bullwhip",
            `pupils_gift`,
            "psychic_headband",
            `quickening_charm`,
            "spider_legs",
            "spy_gadget",
            `spell_prism`,
            "ascetic_cap",
            `heavy_blade`,
            "seer_stone",
            "book_of_shadows",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, clarity, and sentry for it.`,
      glimmer_cape: "A core defensive item.",
      aghanims_shard: `A late game item that helps your team chase or run away from enemy heroes.`,
      infused_raindrop: "Against magical burst.",
      tranquil_boots: `You can get Tranquil Boots for survivability against ranged magic nukers like Zeus and Hoodwink.`,
      blink:
        "Allows you to land a multi-hero Static Storm especially once you have Aghanim`s Scepter.",
    },
    combo: [
      `disruptor_thunder_strike`,
      `disruptor_glimpse`,
      `disruptor_kinetic_field`,
      `disruptor_static_storm`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Disruptor`s Thuder Strike is high damaging spell that is likely to be used at least once per creep wave",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from the Disruptor",
          },
          {
            item: "cloak",
            info: `Disruptor is heavy on magical damage and Cloak negates 15% of it`,
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [{ item: "wind_waker", info: "To save an ally in Static Storm" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  Doom: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803798,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561417",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "doom_bringer_devour", // 1
          "doom_bringer_scorched_earth", // 2
          "doom_bringer_devour", // 3
          "doom_bringer_scorched_earth", // 4
          "doom_bringer_devour", // 5
          "doom_bringer_doom", // 6
          "doom_bringer_devour", // 7
          "doom_bringer_scorched_earth", // 8
          "doom_bringer_scorched_earth", // 9
          "special_bonus_unique_doom_4", // 10
          "doom_bringer_infernal_blade", // 11
          "doom_bringer_doom", // 12
          "doom_bringer_infernal_blade", // 13
          "doom_bringer_infernal_blade", // 14
          "special_bonus_unique_doom_9", // 15
          "doom_bringer_infernal_blade", // 16
          "special_bonus_attributes", // 17
          "doom_bringer_doom", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_doom_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_doom_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "branches",
            "ring_of_protection",
            "magic_stick",
          ],
          early_game: ["phase_boots", "soul_ring", "hand_of_midas"],
          mid_game: ["blink", "black_king_bar", "shivas_guard"],
          late_game: ["refresher", "arcane_blink"],
          situational: [
            "aghanims_shard",
            "force_staff",
            "heavens_halberd",
            "invis_sword",
            "ultimate_scepter",
          ],
          core: ["phase_boots", "hand_of_midas", "black_king_bar", "blink"],
          neutral: [
            "broom_handle",
            "chipped_vest",
            "dragon_scale",
            "essence_ring",
            "quickening_charm",
            "spider_legs",
            "timeless_relic",
            "spell_prism",
            "ex_machina",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      doom_bringer_devour:
        " Satyr Tormenter, Ogre Frostmage and Wildwing Ripper would be the best to devour early on. As the game progresses make sure to get a Centaur stomp to Blink stun heroes.",
      doom_bringer_doom:
        " Be sure to use your ulty on a very mobile target or a target that needs to use a big ulty. Always check if they have Linken Sphere.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      phase_boots:
        "A core boots upgrade that provides you with armor and allows you to get Doom off easier and run heroes down.",
      hand_of_midas:
        "A core item that allows you to level up faster and acquire a bit of extra gold.",
      black_king_bar:
        "A core item that allows you to get Doom off and stay in the middle of the fight.",
      blink:
        "A core item that allows you to get Doom off on specific target. Goes well with devoured Centaur stomp ability.",
      aghanims_shard: "For extra damage and control.",
      force_staff: "To pop Linken`s if necessary.",
      heavens_halberd:
        "Especially good against ranged right-clicking heroes and to pop Linken`s if necessary.",
      invis_sword: "Helps with getting Doom off on specific hero.",
      ultimate_scepter: "For break effect.",
      shivas_guard:
        "Provides Doom with armor and mana pool which he lacks. Also helps with AOE slow that goes with Scorched Earth.",
      refresher:
        "A core item on Doom as it lets you ulty 2 targets. Make sure you pair it up with an item that gives you mana e.g Shiva , Lotus or you wont have mana to use everything.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To keep up or escape from Doom when Scorched Earth is active",
          },
          {
            item: "boots",
            info: "To keep up or escape from Doom when Scorched Earth is active",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }, { item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "black_king_bar" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere", info: "Prevents Doom from ultying you easily." },
          { item: "wind_waker", info: "To save an ally that is Doomed" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  "Dragon Knight": {
    gameplay_version: "7.31b",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640803808,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561505",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "dragon_knight_dragon_tail", // 11
          "dragon_knight_elder_dragon_form", // 12
          "dragon_knight_dragon_tail", // 13
          "dragon_knight_dragon_tail", // 14
          "special_bonus_hp_400", // 15
          "dragon_knight_dragon_blood", // 16
          "special_bonus_attributes", // 17
          "dragon_knight_elder_dragon_form", // 18
          "special_bonus_attributes", // 19
          "special_bonus_strength_20", // 20
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
            "gauntlets",
            "circlet",
            "magic_stick",
          ],
          early_game: ["bracer", "power_treads", "magic_wand", "bottle"],
          mid_game: [
            "blink",
            "black_king_bar",
            "orchid",
            "armlet",
            "aghanims_shard",
          ],
          late_game: [
            "ultimate_scepter",
            "assault",
            "bloodthorn",
            "overwhelming_blink",
            "satanic",
          ],
          situational: [
            "ward_observer",
            "hand_of_midas",
            "heavens_halberd",
            "silver_edge",
            "nullifier",
            "aghanims_shard",
          ],
          core: ["power_treads", "blink", "black_king_bar"],
          neutral: [
            "pogo_stick",
            "chipped_vest",
            "vambrace",
            "nether_shawl",
            "quickening_charm",
            "spider_legs",
            "trickster_cloak",
            "spell_prism",
            "fallen_sky",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      dragon_knight_dragon_tail:
        "You can skill a point in this spell earlier than suggested if you can setup a kill or apply pressure.",
    },
    item_tooltips: {
      ward_observer:
        "For mid it`s important for highground vision in the lane.",
      magic_stick:
        "If you expect high frequency of spells being used on the lane. eg. batrider/brisle",
      power_treads:
        "A core boots upgrade that provides you with attack speed increase and some mana savings by toggling it.",
      hand_of_midas: "If you can get it early usually on mid Dragon Knight.",
      blink:
        "A core item that helps you initiate the fights. Can be coupled with Bloodthorn down the road to burst the stunned hero.",
      radiance:
        " A good item versus illusions and summons. Goes well with Elder Dragons Splash attack.",
      black_king_bar:
        "Allows you to stay in the middle of the fight. Dragon Blood provides you with physical damage resistance and Black King Bar negates most of the magical damage and disables.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      silver_edge: "For break effect.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against high HP pool and HP regeneration from Dragon Blood",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "maelstrom" },
          {
            item: "silver_edge",
            info: "To break Dragon Knights passive that makes him more tanky.",
          },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          {
            item: "sphere",
            info: " To prevent the instant blink stun combo from Dragon Knight.",
          },
        ],
        support: [],
        core: [
          {
            item: "mjollnir",
            info: "Magical damage from procs doesn`t get reduced by Dragon Blood",
          },
          {
            item: "skadi",
            info: "Reduces his regeneration,lifesteal and slows him by 50% when he is in Dragon form. ",
          },
          {
            item: "monkey_king_bar",
            info: "Magical damage from procs doesn`t get reduced by Dragon Blood",
          },
          { item: "butterfly" },
        ],
      },
    },
  },

  "Drow Ranger": {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640803817,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561590",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "drow_ranger_frost_arrows", // 1
          "drow_ranger_multishot", // 2
          "drow_ranger_frost_arrows", // 3
          "drow_ranger_multishot", // 4
          "drow_ranger_multishot", // 5
          "drow_ranger_marksmanship", // 6
          "drow_ranger_multishot", // 7
          "drow_ranger_wave_of_silence", // 8
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
          "special_bonus_unique_drow_ranger_8", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "slippers",
            "branches",
            "faerie_fire",
            "circlet",
            "magic_stick",
          ],
          early_game: ["power_treads", "magic_wand", "falcon_blade"],
          mid_game: ["dragon_lance", "manta", "hurricane_pike", "lesser_crit"],
          late_game: ["greater_crit", "skadi", "butterfly", "satanic"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "blink",
            "aghanims_shard",
            "silver_edge",
            "sphere",
            "mjollnir",
          ],
          core: ["power_treads", "dragon_lance", "manta"],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "vambrace",
            "titan_sliver",
            "elven_tunic",
            "ninja_gear",
            "the_leveller",
            "apex",
            "force_boots",
          ],
        },
      },
    ],
    ability_tooltips: {
      drow_ranger_wave_of_silence:
        "You can skill a point in this spell earlier than suggested if that allows you to survive the lane or land a kill.",
    },
    item_tooltips: {
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that speeds up your farm by increasing attack speed and saves a bit of mana through toggling.",
      dragon_lance:
        "A core item that allows you to shoot from further away. Can be upgrade to Pike against gap-closing heroes.",
      manta:
        "A core item that improves your farming speed, damage output and survivabilty.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      blink: "To reposition. Can be upgraded to Swift Blink down the road.",
      aghanims_shard: "To offset healing and for extra bit of damage.",
      silver_edge: "For break effect and to be able to reposition.",
      sphere:
        "Against powerful single target disables/debuffs and gap-closing spells and items.",
      mjollnir:
        "Against illusion-based heroes. It is better than Aghanim`s Scepter.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To catch up to Drow Ranger or offset the slow coming from Frost Arrows when escaping",
          },
          {
            item: "boots",
            info: "To catch up to Drow Ranger or offset the slow coming from Frost Arrows when escaping",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from the Drow Ranger",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [
          { item: "blink", info: "To close the gap to Drow Ranger" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "heavens_halberd" },
          { item: "invis_sword", info: "To close the gap to Drow Ranger" },
          { item: "manta", info: "To dispel Gust" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [],
        core: [{ item: "assault" }, { item: "abyssal_blade" }],
      },
    },
  },

  "Earth Spirit": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803831,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561679",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "earth_spirit_rolling_boulder", // 1
          "earth_spirit_boulder_smash", // 2
          "earth_spirit_boulder_smash", // 3
          "earth_spirit_geomagnetic_grip", // 4
          "earth_spirit_rolling_boulder", // 5
          "earth_spirit_magnetize", // 6
          "earth_spirit_rolling_boulder", // 7
          "earth_spirit_rolling_boulder", // 8
          "earth_spirit_geomagnetic_grip", // 9
          "special_bonus_unique_earth_spirit_4", // 10
          "earth_spirit_geomagnetic_grip", // 11
          "earth_spirit_magnetize", // 12
          "earth_spirit_geomagnetic_grip", // 13
          "earth_spirit_boulder_smash", // 14
          "special_bonus_unique_earth_spirit", // 15
          "earth_spirit_boulder_smash", // 16
          "special_bonus_attributes", // 17
          "earth_spirit_magnetize", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_earth_spirit_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_earth_spirit_2`, // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "enchanted_mango",
            "orb_of_venom",
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "urn_of_shadows",
            "tranquil_boots",
            "magic_wand",
            `infused_raindrop`,
          ],
          mid_game: ["cyclone", `black_king_bar`, "aghanims_shard", `ghost`],
          late_game: [
            "ultimate_scepter",
            `ethereal_blade`,
            "blink",
            `aeon_disk`,
            `octarine_core`,
          ],
          situational: [
            `smoke_of_deceit`,
            "spirit_vessel",
            `veil_of_discord`,
            `kaya_and_sange`,
            "lotus_orb",
            "heavens_halberd",
            `pipe`,
            `solar_crest`,
            `overwhelming_blink`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "urn_of_shadows",
            `magic_wand`,
            "tranquil_boots",
            `black_king_bar`,
            "aghanims_shard",
          ],
          neutral: [
            "keen_optic",
            "arcane_ring",
            `broom_handle`,
            "essence_ring",
            "vambrace",
            `dragon_scale`,
            `paintball`,
            "quickening_charm",
            "cloak_of_flames",
            `spider_legs`,
            "spell_prism",
            "timeless_relic",
            `flicker`,
            `trickster_cloak`,
            "giants_ring",
            "force_field",
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      orb_of_venom: `Works well in staying on top of enemy heroes along with the Boulder Smash slow.`,
      smoke_of_deceit: `Helps you roam between lanes to ward and find kills on the map.`,
      urn_of_shadows:
        "A core item that provides you with needed stats and allows you to snowball off of a first kill.",
      tranquil_boots:
        "A core boots upgrade that solves hp sustain issues and allows you to roam around faster.",
      spirit_vessel:
        "Against heavy healing lineup but could also be a good pick-up in most cases as it also tanks you up.",
      aghanims_shard:
        "A core upgrade that allows you to have more stones to use but also to provide vision.",
      black_king_bar: "To be able to initiate and get long Magnetize off.",
      lotus_orb: "For reflect, dispel and armor.",
      heavens_halberd: "Especially good against ranged right-clicking cores.",
      blink: "Goes well with Aghanim`s Scepter.",
    },
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
        all: [
          { item: "blight_stone" },
          {
            item: "cloak",
            info: "Earth Spirit is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [
          { item: "ward_observer", info: "To spot Earth Spirit rolling in" },
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by magical damage and thus when Earth Spirit does his spell combo you can often times run away quickly while being healed by active Tranquil Boots",
          },
        ],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "cyclone" }, { item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "mage_slayer" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Geomagnetic Grip" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  Earthshaker: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803845,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561769",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "earthshaker_fissure", // 1
          "earthshaker_enchant_totem", // 2
          `earthshaker_aftershock`, // 3
          `earthshaker_fissure`, // 4
          `earthshaker_aftershock`, // 5
          "earthshaker_echo_slam", // 6
          "earthshaker_aftershock", // 7
          "earthshaker_aftershock", // 8
          `earthshaker_fissure`, // 9
          "earthshaker_fissure", // 10
          "special_bonus_unique_earthshaker_4", // 11
          "earthshaker_echo_slam", // 12
          "earthshaker_enchant_totem", // 13
          "earthshaker_enchant_totem", // 14
          "special_bonus_unique_earthshaker_6", // 15
          "earthshaker_enchant_totem", // 16
          "special_bonus_attributes", // 17
          "earthshaker_echo_slam", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_earthshaker_3`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_earthshaker", // 25
        ],
        items: {
          starting: ["boots", "clarity", "ward_observer", "ward_sentry"],
          early_game: [
            `arcane_boots`,
            "wind_lace",
            "magic_wand",
            `infused_raindrop`,
          ],
          mid_game: [
            "blink",
            `aghanims_shard`,
            `aether_lens`,
            `black_king_bar`,
            "cyclone",
          ],
          late_game: [
            "ultimate_scepter",
            `refresher`,
            "octarine_core",
            "aeon_disk",
            `overwhelming_blink`,
          ],
          situational: [
            `smoke_of_deceit`,
            `tranquil_boots`,
            `soul_ring`,
            `force_staff`,
            `ghost`,
            `invis_sword`,
            `arcane_blink`,
            `wind_waker`,
            `ethereal_blade`,
            `lotus_orb`,
            `travel_boots`,
          ],
          core: ["blink", "aghanims_shard", `black_king_bar`],
          neutral: [
            "pogo_stick",
            "trusty_shovel",
            `arcane_ring`,
            "philosophers_stone",
            "bullwhip",
            `paintball`,
            `essence_ring`,
            "spider_legs",
            "quickening_charm",
            `ceremonial_robe`,
            "timeless_relic",
            "spell_prism",
            `trickster_cloak`,
            "fallen_sky",
            "giants_ring",
            `ex_machina`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      smoke_of_deceit: `Lets your roam between lanes to ward and find kills across the map.`,
      soul_ring: `Solves the mana issues if you get Tranquil Boots instead of Arcane Boots.`,
      tranquil_boots: `You can get Tranquil Boots instead of Arcane Boots, but then you will also need the Soul Ring.`,
      blink: "A core item that allows you to get a multi-hero Echo Slam.",
      aghanims_shard:
        "A core item that reduces cooldown of the fissure, allows you to walk on it and applies half of the stun duration of Aftershock along it.",
      lotus_orb: "For reflect, dispel and armor.",
    },
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
        all: [
          {
            item: "cloak",
            info: "Earthshaker is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  "Elder Titan": {
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803855,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561834",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "elder_titan_ancestral_spirit", // 1
          "elder_titan_natural_order", // 2
          "elder_titan_ancestral_spirit", // 3
          "elder_titan_echo_stomp", // 4
          "elder_titan_echo_stomp", // 5
          "elder_titan_earth_splitter", // 6
          "elder_titan_echo_stomp", // 7
          "elder_titan_echo_stomp", // 8
          "elder_titan_natural_order", // 9
          "elder_titan_natural_order", // 10
          "elder_titan_natural_order", // 11
          "elder_titan_earth_splitter", // 12
          "elder_titan_ancestral_spirit", // 13
          "elder_titan_ancestral_spirit", // 14
          "special_bonus_attack_speed_20", // 15
          "special_bonus_unique_elder_titan", // 16
          "special_bonus_attributes", // 17
          "elder_titan_earth_splitter", // 18
          "special_bonus_attributes", // 19
          "special_bonus_cleave_100", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_elder_titan_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "wind_lace",
            "enchanted_mango",
            "boots",
            "faerie_fire",
            "ward_observer",
            "ward_sentry",
            "orb_of_venom",
            "magic_stick",
          ],
          early_game: ["phase_boots", "magic_wand", "medallion_of_courage"],
          mid_game: [
            "solar_crest",
            "ultimate_scepter",
            "aghanims_shard",
            "ghost",
            "glimmer_cape",
            "force_staff",
            "veil_of_discord",
            "cyclone",
          ],
          late_game: ["assault", "aeon_disk", "greater_crit"],
          situational: ["spirit_vessel", "lotus_orb"],
          core: ["phase_boots", "ultimate_scepter"],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            "bullwhip",
            "essence_ring",
            "spider_legs",
            "elven_tunic",
            "the_leveller",
            "flicker",
            "pirate_hat",
            "desolator_2",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_movement_speed_15:
        "At level 15, you should skill the level 15 talent first and then the level 10 talent. The dota client system disallows me to indicate that in the graphics above.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "Start with it iff you expect high frequency of spells being used on the lane.",
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      phase_boots:
        "A core boots upgrade. Prefered over tranquils as it scales better. Activate Phase Boots before tossing the Astral Spirit out so the spirit moves faster.",
      spirit_vessel: "Against heavy healing lineup.",
      ultimate_scepter:
        "A core item that allows you to deliver right-clicks as you become spell immune based on the number of heroes your spirit passed through.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To keep the distance from Elder Titan and dodge the Echo Stomp",
          },
          {
            item: "boots",
            info: "To keep the distance from Elder Titan and dodge the Echo Stomp",
          },
          {
            item: "armor",
            info: "If Elder Titan is within 350 radius of you and he has Natural Order skilled your base armor will be reduced",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "assault" },
          {
            item: "butterfly",
            info: "Against a core right-clicking Elder Titan",
          },
        ],
      },
    },
  },

  "Ember Spirit": {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640803867,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561902",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "ember_spirit_flame_guard", // 1
          "ember_spirit_sleight_of_fist", // 2
          "ember_spirit_flame_guard", // 3
          "ember_spirit_sleight_of_fist", // 4
          "ember_spirit_sleight_of_fist", // 5
          "ember_spirit_fire_remnant", // 6
          "ember_spirit_sleight_of_fist", // 7
          "ember_spirit_searing_chains", // 8
          "ember_spirit_flame_guard", // 9
          "ember_spirit_flame_guard", // 10
          "special_bonus_attack_damage_15", // 11
          "ember_spirit_searing_chains", // 12
          "ember_spirit_searing_chains", // 13
          "ember_spirit_searing_chains", // 14
          "special_bonus_unique_ember_spirit_2", // 15
          "ember_spirit_fire_remnant", // 16
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
            "tango",
            "quelling_blade",
            "faerie_fire",
            "branches",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "bottle",
            "boots",
            "orb_of_corrosion",
            "phase_boots",
            "magic_wand",
          ],
          mid_game: [
            "maelstrom",
            "ultimate_scepter",
            "gungir",
            "kaya_and_sange",
            "cyclone",
            "desolator",
          ],
          late_game: ["refresher", "shivas_guard", "greater_crit"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "aghanims_shard",
            "sphere",
          ],
          core: [
            "orb_of_corrosion",
            "phase_boots",
            "maelstrom",
            "ultimate_scepter",
          ],
          neutral: [
            "arcane_ring",
            "pogo_stick",
            "ring_of_aquila",
            "dragon_scale",
            "quickening_charm",
            "mind_breaker",
            "spell_prism",
            "penta_edged_sword",
            "desolator_2",
            "mirror_shield",
          ],
        },
      },
    ],
    ability_tooltips: {
      ember_spirit_flame_guard:
        "You can put more points in this spell over Slight of Fist if the lane is not going particularly well. You`ll catch-up faster with more points in Flame Guard.",
    },
    item_tooltips: {
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      orb_of_corrosion: "A core item that works well with Sleight of Fist.",
      phase_boots:
        "A core boots upgrade. Make sure to activate Phase Boots before using dropping a Fire Remnant as it will travel faster.",
      maelstrom:
        "A core item that servers as a farming and dps tool. It can proc with Sleight of Fist.",
      ultimate_scepter:
        "A core item that adds to your burst and mobility. Goes well with Refresher later on.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      aghanims_shard:
        "Adds to damage output and allows you to snowball in the fights with extra Fire Remnants.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To keep the distance from Ember Spirit and his Flame Guard",
          },
          {
            item: "boots",
            info: "To keep the distance from Ember Spirit and his Flame Guard",
          },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the pressure from the Ember Spirit",
          },
          {
            item: "cloak",
            info: "Ember Spirit`s Flame Guard and Searing Chains do a lot of magical damage early on and Cloak negates 15% of it",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [
          { item: "cyclone" },
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from his abilities and provides armor against right-clicks and Sleight of Fist",
          },
          { item: "rod_of_atos" },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Searing Chains" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [
          {
            item: "black_king_bar",
            info: "Against a magical build Ember Spirit",
          },
        ],
        core: [{ item: "abyssal_blade" }, { item: "butterfly" }],
      },
    },
  },

  Enchantress: {
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803881,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700561968",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "enchantress_impetus", // 2
          "enchantress_enchant", // 1
          "enchantress_enchant", // 3
          "enchantress_natures_attendants", // 4
          "enchantress_enchant", // 5
          "enchantress_untouchable", // 6
          "enchantress_enchant", // 7
          "enchantress_natures_attendants", // 8
          "enchantress_natures_attendants", // 9
          "enchantress_natures_attendants", // 10
          "enchantress_impetus", // 11
          "enchantress_untouchable", // 12
          "enchantress_impetus", // 13
          "enchantress_impetus", // 14
          "special_bonus_magic_resistance_10", // 15
          "special_bonus_unique_enchantress_2", // 16
          "special_bonus_attributes", // 17
          "enchantress_untouchable", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_enchantress_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_enchantress_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "blight_stone",
            "branches",
            "faerie_fire",
            "enchanted_mango",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: ["boots", "magic_wand", "power_treads"],
          mid_game: [
            "holy_locket",
            "solar_crest",
            "aghanims_shard",
            "force_staff",
            "glimmer_cape",
          ],
          late_game: ["hurricane_pike", "ultimate_scepter", "vladmir"],
          situational: ["infused_raindrop", "lotus_orb"],
          core: ["holy_locket", "aghanims_shard"],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            "grove_bow",
            "essence_ring",
            "spider_legs",
            "enchanted_quiver",
            "spy_gadget",
            "flicker",
            "force_field",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_magic_resistance_10:
        "On level 15, instead of taking this level 10 talent, take the level 15 talent instead. The dota client disallows me to display the talents in this order.",
      special_bonus_unique_enchantress_1:
        "You can take this talent over suggested one in case you are playing against an opponent with Helm of the Overlord.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      holy_locket: "A core item that adds to your healing output.",
      aghanims_shard:
        "A core item for additional healing. Fits well with Holy Locket.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the pressure from the Enchantress",
          },
        ],
        support: [
          {
            item: "ward_sentry",
            info: "To block camps against Enchant ability",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [
          {
            item: "black_king_bar",
            info: "Against a core Enchantress as Impetus doesn`t pierce spell immunity",
          },
          { item: "silver_edge" },
        ],
      },
      late_game: {
        all: [],
        support: [
          {
            item: "black_king_bar",
            info: "Against a core Enchantress as Impetus doesn`t pierce spell immunity",
          },
        ],
        core: [{ item: "butterfly", info: "Against a core Enchantress" }],
      },
    },
  },

  Enigma: {
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640803897,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562081",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "enigma_demonic_conversion", // 1
          "enigma_malefice", // 2
          "enigma_demonic_conversion", // 3
          "enigma_malefice", // 4
          "enigma_demonic_conversion", // 5
          "enigma_black_hole", // 6
          "enigma_demonic_conversion", // 7
          "enigma_midnight_pulse", // 8
          "enigma_midnight_pulse", // 9
          "special_bonus_unique_enigma_4", // 10
          "enigma_midnight_pulse", // 11
          "enigma_midnight_pulse", // 12
          "enigma_black_hole", // 13
          "enigma_malefice", // 14
          "special_bonus_unique_enigma_9", // 15
          "enigma_malefice", // 16
          "special_bonus_attributes", // 17
          "enigma_black_hole", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_enigma_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_enigma", // 25
        ],
        items: {
          starting: [
            "tango",
            "null_talisman",
            "enchanted_mango",
            "mantle",
            "circlet",
            "clarity",
            "sobi_mask",
          ],
          early_game: ["arcane_boots", "magic_wand", "soul_ring"],
          mid_game: [
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "aether_lens",
          ],
          late_game: [
            "refresher",
            "invis_sword",
            "arcane_blink",
            "ultimate_scepter",
          ],
          situational: ["hand_of_midas", "sphere", "aeon_disk"],
          core: ["arcane_boots", "blink", "black_king_bar"],
          neutral: [
            "pogo_stick",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            "spider_legs",
            "psychic_headband",
            "ninja_gear",
            "trickster_cloak",
            "force_boots",
            "seer_stone",
          ],
        },
        item_tooltips: {
          hand_of_midas: "If you can get it early and get away with it.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1641648688,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2712384931",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "enigma_demonic_conversion", // 1
          "enigma_malefice", // 2
          "enigma_demonic_conversion", // 3
          "enigma_malefice", // 4
          "enigma_demonic_conversion", // 5
          "enigma_black_hole", // 6
          "enigma_demonic_conversion", // 7
          "enigma_midnight_pulse", // 8
          "enigma_midnight_pulse", // 9
          "special_bonus_unique_enigma_4", // 10
          "enigma_midnight_pulse", // 11
          "enigma_midnight_pulse", // 12
          "enigma_black_hole", // 13
          "enigma_malefice", // 14
          "special_bonus_unique_enigma_9", // 15
          "enigma_malefice", // 16
          "special_bonus_attributes", // 17
          "enigma_black_hole", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_enigma_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_enigma", // 25
        ],
        items: {
          starting: [
            "tango",
            "null_talisman",
            "enchanted_mango",
            "mantle",
            "circlet",
            "clarity",
            "sobi_mask",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "ring_of_basilius",
            "arcane_boots",
            "magic_wand",
            "soul_ring",
          ],
          mid_game: [
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "aether_lens",
          ],
          late_game: [
            "refresher",
            "invis_sword",
            "arcane_blink",
            "ultimate_scepter",
          ],
          situational: ["infused_raindrop", "sphere", "aeon_disk"],
          core: ["arcane_boots", "blink", "black_king_bar"],
          neutral: [
            "pogo_stick",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            "spider_legs",
            "psychic_headband",
            "ninja_gear",
            "trickster_cloak",
            "force_boots",
            "seer_stone",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block the pull camps.",
          magic_stick:
            "Start with it if you expect high frequency of spells being used on the lane.",
          ring_of_basilius:
            "If your laning partner also uses a lot of mana early.",
          infused_raindrop: "Against magical burst.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      arcane_boots: "A core item for mana sustain.",
      blink: "A core item that allows you to land a multi-hero Black Hole.",
      black_king_bar: "A core item that allows you to channel Black Hole.",
      aghanims_shard:
        "A core item that provides extra control during Black Hole.",
      sphere:
        "Against targetable spell-immunity piercing disables that prevent you from channeling Black Hole.",
      aeon_disk:
        "Gives you a second chance to survive and get your Black Hole off.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "blight_stone",
            info: "Blight Stone helps you to kill off eidolons which are main Enigma`s laning tool",
          },
        ],
        support: [
          {
            item: "ward_sentry",
            info: "To block camps in area where Enigma will look to jungle in",
          },
        ],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
        ],
      },
      late_game: {
        all: [
          { item: "aeon_disk" },
          { item: "sheepstick" },
          { item: "wind_waker", info: "To save an ally in Black Hole" },
        ],
        support: [],
        core: [{ item: "abyssal_blade" }],
      },
    },
  },

  "Faceless Void": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640803904,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562159",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_unique_faceless_void_7", // 11
          "faceless_void_chronosphere", // 12
          "faceless_void_time_dilation", // 13
          "faceless_void_time_dilation", // 14
          "special_bonus_unique_faceless_void_5", // 15
          "faceless_void_time_dilation", // 16
          "special_bonus_attributes", // 17
          "faceless_void_chronosphere", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_faceless_void", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_faceless_void_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "slippers",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: ["power_treads", "magic_wand", "wraith_band"],
          mid_game: [
            "mask_of_madness",
            "maelstrom",
            "sange_and_yasha",
            "manta",
            "black_king_bar",
          ],
          late_game: ["mjollnir", "skadi", "satanic", "refresher"],
          situational: [
            "infused_raindrop",
            "hand_of_midas",
            "black_king_bar",
            "aghanims_shard",
            "blink",
            "sphere",
            "monkey_king_bar",
          ],
          core: ["power_treads", "mask_of_madness", "maelstrom"],
          neutral: [
            "possessed_mask",
            "broom_handle",
            "quicksilver_amulet",
            "misericorde",
            "elven_tunic",
            "titan_sliver",
            "mind_breaker",
            "the_leveller",
            "ninja_gear",
            "pirate_hat",
            "apex",
          ],
        },
      },
    ],
    ability_tooltips: {
      faceless_void_time_walk:
        "The tougher the lane the more point you can put into this spell.",
      faceless_void_time_dilation:
        "Dont have to put more than 1 point in this spell as it scales very badly. You should level your stats and talents first.",
      special_bonus_unique_faceless_void_7:
        "Consider skipping the first talent until you skill your spells and stats.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core item that provides attack speed boost and some mana savings through toggling. Keep it on strength if you feel like you might be in trouble.",
      hand_of_midas: "If you can get it early and get away with it.",
      mask_of_madness:
        "A core item that accelerates your farm but also allows you to burst a hero inside Chronosphere.",
      maelstrom:
        "A core item that boosts your farming speed but also does some AoE damage in the fights. Can be upgraded to Mjollnir later on. Void likes attack speed for frequent bash procs.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      aghanims_shard:
        "For extra mobility. Often times you`ll get it from Roshan.",
      blink:
        "To be able to seize the moment and get good Chronosphere out. Swift Blink is an option later on as well.",
      sphere: "Against powerful single-target disables and debuffs.",
      skadi:
        "Against ranged heroes. Also gives you good mana pool that lets you use Refresher.",
      monkey_king_bar: "Against evasion.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from Faceless Void, be able chase him down after Time Walk and offset Time Dilation slow",
          },
          {
            item: "boots",
            info: "To keep the distance from Faceless Void, be able chase him down after Time Walk and offset Time Dilation slow",
          },
          { item: "armor", info: "Buy armor items" },
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against Time Walk",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          {
            item: "blink",
            info: "Faceless Void usually jumps and uses ulty. That gives you a fraction of a second to react and blink away.",
          },
          { item: "spirit_vessel" },
          { item: "cyclone" },
          { item: "rod_of_atos" },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff" },
        ],
        core: [
          { item: "hurricane_pike" },
          { item: "black_king_bar" },
          { item: "basher" },
          { item: "manta", info: "To dispel Time Dilation" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          {
            item: "ethereal_blade",
            info: "Make a target ethereal and prevent Faceless Void from right clicking them as he relies solely on physical attacks.",
          },
          { item: "aeon_disk", info: "Will buy you time during Chronosphere." },
          { item: "wind_waker", info: "To save an ally in Chronosphere" },
        ],
        support: [],
        core: [{ item: "abyssal_blade" }, { item: "butterfly" }],
      },
    },
  },

  Grimstroke: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803941,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562245",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "grimstroke_dark_artistry", // 1   equals to `stroke of faith`
          "grimstroke_spirit_walk", // 2   equals to `ink swell`
          "grimstroke_spirit_walk", // 3
          "grimstroke_ink_creature", // 4   equals to `phantom`s embrace`
          "grimstroke_spirit_walk", // 5
          `grimstroke_soul_chain`, // 6
          "grimstroke_spirit_walk", // 7
          "grimstroke_dark_artistry", // 8
          `grimstroke_ink_creature`, // 9
          `grimstroke_ink_creature`, // 10
          `special_bonus_unique_grimstroke_7`, // 11
          "grimstroke_soul_chain", // 12
          `grimstroke_dark_artistry`, // 13
          `grimstroke_dark_artistry`, // 14
          "special_bonus_spell_amplify_15", // 15
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
            "flask",
            `clarity`,
            "faerie_fire",
            "enchanted_mango",
            `enchanted_mango`,
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
            "aether_lens",
            "aghanims_shard",
            "glimmer_cape",
            "force_staff",
          ],
          late_game: [
            `blink`,
            "ultimate_scepter",
            "aeon_disk",
            "ethereal_blade",
            "octarine_core",
            "sheepstick",
          ],
          situational: [
            `cyclone`,
            `guardian_greaves`,
            `wind_waker`,
            "lotus_orb",
            `travel_boots`,
          ],
          core: ["arcane_boots", "aether_lens", "aghanims_shard"],
          neutral: [
            `trusty_shovel`,
            `pogo_stick`,
            `mysterious_hat`,
            `arcane_ring`,
            `philosophers_stone`,
            `bullwhip`,
            `essence_ring`,
            `ceremonial_robe`,
            `quickening_charm`,
            `spider_legs`,
            `psychic_headband`,
            `spell_prism`,
            `timeless_relic`,
            `heavy_blade`,
            `stormcrafter`,
            `book_of_shadows`,
            `seer_stone`,
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, clarity, and sentry for it.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core item that helps with mana sustain. You can disassemble it and use the Energy Booster for Aether Lens. You can upgrade boots into Tranquil Boots afterwards.",
      aether_lens:
        "A core item that allows you to get spells off from further away.",
      aghanims_shard: "A core item that upgrades Ink Swell.",
      ethereal_blade: `An incredible item to combo with Soul Bind and Phantoms Embrace.`,
      lotus_orb: "For reflect, dispel and armor.",
    },
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
          {
            item: "magic_stick",
            info: "Grimstroke`s Stroke of Faith is a strong low cooldown spell with which you are likely to be hit by once or twice per creep wave",
          },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane against the pressure from the Grimstroke",
          },
          {
            item: "wind_lace",
            info: "To move away from Ink Swell and offset the slow from Stroke of Faith",
          },
          {
            item: "boots",
            info: "To move away from Ink Swell and offset the slow from Stroke of Faith",
          },
          {
            item: "headdress",
            info: "For lane sustain and/or Pipe of Insight later",
          },
          { item: "infused_raindrop" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "cyclone" }, { item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  Gyrocopter: {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640803950,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562334",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "gyrocopter_homing_missile", // 1
          "gyrocopter_flak_cannon", // 2
          "gyrocopter_flak_cannon", // 3
          "gyrocopter_rocket_barrage", // 4
          "gyrocopter_flak_cannon", // 5
          "gyrocopter_call_down", // 6
          "gyrocopter_flak_cannon", // 7
          "gyrocopter_rocket_barrage", // 8
          "gyrocopter_rocket_barrage", // 9
          "special_bonus_unique_gyrocopter_4", // 10
          "gyrocopter_rocket_barrage", // 11
          "gyrocopter_call_down", // 12
          "gyrocopter_homing_missile", // 13
          "gyrocopter_homing_missile", // 14
          "special_bonus_unique_gyrocopter_2", // 15
          "gyrocopter_homing_missile", // 16
          "special_bonus_attributes", // 17
          "gyrocopter_call_down", // 18
          "special_bonus_attributes", // 19
          "special_bonus_movement_speed_30", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_gyrocopter_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "slippers",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "magic_wand",
            "wraith_band",
            "falcon_blade",
          ],
          mid_game: [
            "lesser_crit",
            "ultimate_scepter",
            "dragon_lance",
            "sange_and_yasha",
          ],
          late_game: ["satanic", "greater_crit", "skadi", "butterfly"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "monkey_king_bar",
            "silver_edge",
            "mjollnir",
          ],
          core: ["power_treads", "lesser_crit", "ultimate_scepter", "satanic"],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "quicksilver_amulet",
            "paladin_sword",
            "mind_breaker",
            "the_leveller",
            "penta_edged_sword",
            "desolator_2",
            "ex_machina",
          ],
        },
        ability_tooltips: {
          gyrocopter_rocket_barrage:
            "You can optionally skill +2 attributes over this spell.",
        },
        item_tooltips: {
          power_treads:
            "A core boots upgrade that provides you with attack speed and mana savings through toggling.",
          dragon_lance:
            "Can be disasembled for Ogre Axe that can be used for next item.",
          lesser_crit:
            "A core item that speeds up your farm. Goes well Aghanim`s Scepter side-gunner.",
          ultimate_scepter:
            "A core item that significantly increases your dps. The side-gunner can also fire while you are disabled and all attack modifiers apply as well.",
          black_king_bar:
            "Against a lot of disables, magical damage and as a dispel.",
          satanic:
            "A core item that provides you with sustain and dispel. Works well with Aghanim`s Scepter.",
          silver_edge: "For break effect and to reposition.",
          monkey_king_bar: "Against evasion.",
          mjollnir: "Great against illusion based heroes.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1641648786,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2712385902",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "special_bonus_hp_200", // 10
          "gyrocopter_flak_cannon", // 11
          "gyrocopter_call_down", // 12
          "gyrocopter_flak_cannon", // 13
          "gyrocopter_flak_cannon", // 14
          "special_bonus_unique_gyrocopter_6", // 15
          "gyrocopter_flak_cannon", // 16
          "special_bonus_attributes", // 17
          "gyrocopter_call_down", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_gyrocopter_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_gyrocopter_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "branches",
            "enchanted_mango",
            "faerie_fire",
            "sobi_mask",
            "ward_sentry",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "ring_of_basilius",
            "tranquil_boots",
            "arcane_boots",
            "medallion_of_courage",
            "urn_of_shadows",
          ],
          mid_game: [
            "veil_of_discord",
            "aghanims_shard",
            "solar_crest",
            "force_staff",
            "glimmer_cape",
            "ghost",
            "cyclone",
          ],
          late_game: ["ethereal_blade", "sheepstick", "refresher"],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "ancient_janggo",
            "lotus_orb",
          ],
          core: ["veil_of_discord", "aghanims_shard"],
          neutral: [
            "pogo_stick",
            "mysterious_hat",
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            "spider_legs",
            "spy_gadget",
            "timeless_relic",
            "force_field",
            "book_of_shadows",
          ],
        },
        item_tooltips: {
          spirit_vessel: "Against heavy-healing lineups.",
          veil_of_discord:
            "A core item that amplifies your and your team`s spell damage output.",
          ancient_janggo:
            "If you are grouping a lot early on and if you have summon-based heroes.",
          aghanims_shard: "A core item that adds to your damage output.",
          lotus_orb: "For reflect, dispel and armor.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Gyrocopter tends to use Rocket Barrage and Flak Cannon frequently",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from Gyrocopter`s Rocket Barrage",
          },
          {
            item: "boots",
            info: "To keep the distance from Gyrocopter`s Rocket Barrage",
          },
          {
            item: "headdress",
            info: "For lane sustain and/or Pipe of Insight later",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from his abilities and provides armor against right-clicks and Flak Cannon",
          },
          { item: "lotus_orb" },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
          { item: "cyclone" },
        ],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "assault" }, { item: "butterfly" }],
      },
    },
  },

  Hoodwink: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803963,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562407",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "special_bonus_unique_hoodwink_acorn_shot_bounces", // 15
          "hoodwink_scurry", // 16
          "special_bonus_attributes", // 17
          "hoodwink_sharpshooter", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_hoodwink_sharpshooter_speed", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_hoodwink_acorn_shot_charges", // 25
        ],
        items: {
          starting: [
            "tango",
            "blight_stone",
            "flask",
            "faerie_fire",
            "enchanted_mango",
            "branches",
            "circlet",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "arcane_boots",
            "tranquil_boots",
            "magic_wand",
            "medallion_of_courage",
            "urn_of_shadows",
            "ring_of_basilius",
          ],
          mid_game: [
            "aether_lens",
            "solar_crest",
            "ancient_janggo",
            "cyclone",
            "force_staff",
            "glimmer_cape",
            "veil_of_discord",
            "ghost",
          ],
          late_game: [
            "ultimate_scepter",
            "octarine_core",
            "sheepstick",
            "aeon_disk",
            "boots_of_bearing",
          ],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "aghanims_shard",
            "blink",
            "lotus_orb",
          ],
          core: ["arcane_boots", "aether_lens"],
          neutral: [
            "keen_optic",
            "trusty_shovel",
            "philosophers_stone",
            "grove_bow",
            "psychic_headband",
            "spider_legs",
            "spy_gadget",
            "spell_prism",
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_hoodwink_acorn_shot_charges:
        "You can take this talent on level 25 over the suggested one if you are transitioning into a right-clicker rather than a utility build.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core item for mana sustain. Can be disassembled and the Energy Booster can be used for Aether Lens. Boots can upgraded to Tranquil boots afterwards.",
      spirit_vessel: "Against heavy-healing lineup.",
      aether_lens: "A core item that extends the cast range of your spells.",
      solar_crest:
        "Reducing opponents armor increases your Acorn Shot effectiveness. Also very useful to amplify your carry while you stay behind them.",
      lotus_orb: "For reflecting, dispelling and armor.",
      blink: "To close the gap and land your combo.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Hoodwink often times casts and combines her two offensive spells",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against the pressure from the Hoodwink",
          },
          {
            item: "quelling_blade",
            info: "Against a sidelane Hoodwink to make Bushwhack harder to hit and Scurry to be less effective. Use it quickly to also destroy the tree that he places under you.",
          },
          {
            item: "infused_raindrop",
            info: "Against burst of magical damage coming from Bushwhack and Sharshooter",
          },
          {
            item: "cloak",
            info: "Hoodwink does a lot of magical damage and Cloak offsets 15% of it",
          },
          {
            item: "blade_mail",
            info: "Could potentially be lethal to Hoodwink as you absorb his Sharpshooter.",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "mekansm" },

          { item: "rod_of_atos", info: "To be able to catch her" },
          { item: "blink", info: "To be able to catch her" },
        ],
        support: [
          { item: "glimmer_cape" },
          {
            item: "SentryDustGem",
            info: "Hoodwink often goes for Scurry Camouflage talent on level 15",
          },
        ],
        core: [
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
          {
            item: "revenants_brooch",
            info: "An item that grants your next 5 attacks to have True Strike and go through Scurry`s evasion.",
          },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "abyssal_blade", info: "To be able to pin her" },
          { item: "skadi", info: "To be able to catch her" },
          { item: "assault", info: "To be able to catch her" },
          {
            item: "bloodthorn",
            info: "To pierce evasion from Scurry and to Silence her",
          },
          { item: "monkey_king_bar", info: "To pierce evasion from Scurry" },
          { item: "sheepstick", info: "To be able to catch her" },
        ],
      },
    },
  },

  Huskar: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [
          DOTA_COACH_GUIDE_ROLE.CARRY,
          DOTA_COACH_GUIDE_ROLE.MID,
          DOTA_COACH_GUIDE_ROLE.OFFLANE,
        ],
        steam_guide_id: 1640803974,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562484",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "huskar_burning_spear", // 1
          "huskar_berserkers_blood", // 2
          "huskar_burning_spear", // 3
          "huskar_inner_fire", // 4
          "huskar_berserkers_blood", // 5
          "huskar_life_break", // 6
          "huskar_berserkers_blood", // 7
          "huskar_berserkers_blood", // 8
          "huskar_burning_spear", // 9
          "huskar_burning_spear", // 10
          "huskar_inner_fire", // 11
          "huskar_life_break", // 12
          "huskar_inner_fire", // 13
          "huskar_inner_fire", // 14
          "special_bonus_unique_huskar_3", // 15
          "special_bonus_unique_huskar_2", // 16
          "special_bonus_attributes", // 17
          "huskar_life_break", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_huskar_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_huskar_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "gauntlets",
            "faerie_fire",
            "branches",
            "ward_observer",
          ],
          early_game: ["armlet", "boots", "bracer"],
          mid_game: ["sange", "ultimate_scepter", "dragon_lance"],
          late_game: ["assault", "satanic", "heart"],
          situational: [
            "magic_wand",
            "lotus_orb",
            "heavens_halberd",
            "aghanims_shard",
            "blink",
            "monkey_king_bar",
            "silver_edge",
          ],
          core: ["armlet", "sange", "ultimate_scepter", "black_king_bar"],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "misericorde",
            "paladin_sword",
            "titan_sliver",
            "the_leveller",
            "trickster_cloak",
            "giants_ring",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      huskar_inner_fire:
        "You can skill this ability on level 1 if you are playing midlane Huskar to secure a creep lasthit on the first wave.",
      special_bonus_unique_huskar_3:
        "On level 15, you should take level 15 talent first and then this level 10 talent. The dota client disallows me to indicate this order in the graphics above.",
    },
    item_tooltips: {
      ward_observer:
        "If you are playing mid Huskar but it is not bad to have vision around your sidelanes as well.",
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      armlet:
        "A core item that allows you to activate Berserker`s Blood while farming, doing Roshan or in fights. Helm of Iron Will should be the first component purchased you get most of the time as it solves your hp sustain and armor problems.",
      sange:
        "A core item that is standalone good but can be upgraded further. Amplifies the healing and tanks you up.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      ultimate_scepter:
        "A core item that provides you with extra reach and a 3s disable upon Life Break landing.",
      aghanims_shard:
        "You will usually get this upgrade from second Roshan. It adds an additional layer of survivability and damage mitigation to your hero.",
      blink:
        "Allows you to instantly gap close and focus-fire an enemy hero. Can be upgraded to Overwhelming Blink down the road.",
      monkey_king_bar: "Against evasion and miss chance.",
      silver_edge: "For break and repositioning.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "blight_stone",
            info: "Huskar is a low armor hero and if you can see yourself right-clicking him often then Blightstone is a good purchase",
          },

          { item: "wind_lace", info: "To keep the distance from Huskar" },
          { item: "boots", info: "To keep the distance from Huskar" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to offset Berserker`s Blood HP regeneration",
          },
          {
            item: "cloak",
            info: "Huskar does a lot of magical damage and Cloak offsets 15% of it",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
          { item: "ring_of_health" },
        ],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          {
            item: "blade_mail",
            info: "Reflecting a big chunk of damage back to him as he jumps with Life Break.",
          },
          { item: "pipe" },
          { item: "eternal_shroud" },
          {
            item: "heavens_halberd",
            info: "This item is very effective versus ranged heroes like Huskar.",
          },
          {
            item: "hurricane_pike",
            info: "As he closes distance with Life Break, use this item to disengage and create distance.",
          },
          { item: "black_king_bar" },
          {
            item: "silver_edge",
            info: "Breaking Huskars passive will reduce a lot of his damage output.",
          },
          { item: "manta", info: "To dispel Inner Fire" },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "skadi", info: "To reduce healing and slow him by 50%." },
          { item: "shivas_guard", info: "To reduce healing." },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "butterfly" },
          { item: "abyssal_blade" },
        ],
      },
    },
  },

  Invoker: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.neutral,
    builds: [
      {
        // Midlane Quas Wex Invoker build | If an app user choses to play Invoker on non-mid role, this guide should be suggested over the other one
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "QW",
        steam_guide_id: 1640803984,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2700562552",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "invoker_wex", // 1
          "invoker_quas", // 2
          "invoker_quas", // 3
          "invoker_wex", // 4
          "invoker_wex", // 5
          "invoker_quas", // 6
          "invoker_wex", // 7
          "invoker_quas", // 8
          "invoker_wex", // 9
          "invoker_exort", // 10
          "invoker_exort", // 11
          "invoker_exort", // 12
          "invoker_exort", // 13
          "invoker_exort", // 14
          "invoker_exort", // 15
          "invoker_exort", // 16
          "invoker_wex", // 17
          "invoker_wex", // 18
          "invoker_quas", // 19
          "special_bonus_unique_invoker_6", // 20
          "special_bonus_unique_invoker_9", // 21
          "special_bonus_unique_invoker_5", // 22
          "invoker_quas", // 23
          "invoker_quas", // 24
          "special_bonus_unique_invoker_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "mantle",
            "faerie_fire",
            "circlet",
            "branches",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "null_talisman",
            "robe",
            "urn_of_shadows",
            "boots",
            "hand_of_midas",
            "magic_wand",
          ],
          mid_game: [
            "travel_boots",
            "ultimate_scepter",
            "witch_blade",
            "orchid",
            "force_staff",
          ],
          late_game: ["sheepstick", "refresher", "octarine_core"],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "black_king_bar",
            "ethereal_blade",
            "blink",
            "aghanims_shard",
            "sphere",
            "aeon_disk",
          ],
          core: [
            "urn_of_shadows",
            "hand_of_midas",
            "travel_boots",
            "ultimate_scepter",
          ],
          neutral: [
            "mysterious_hat",
            "pogo_stick",
            "grove_bow",
            "essence_ring",
            "vambrace",
            "quicksilver_amulet",
            "quickening_charm",
            "mind_breaker",
            "timeless_relic",
            "spell_prism",
            "ex_machina",
            "desolator_2",
          ],
        },
        item_tooltips: {
          urn_of_shadows: "A core item to proc Cold Snap ticks.",
          witch_blade: "An alternative way to proc Cold Snap ticks.",
          spirit_vessel: "Against heavy healing lineup.",
          blink: "To close the gap and land your spell combo.",
        },
      },
      {
        // Midlane Quas Exort Invoker build
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "QE",
        steam_guide_id: 1641614689,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2711948373",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "invoker_exort", // 1
          "invoker_quas", // 2
          "invoker_exort", // 3
          "invoker_quas", // 4
          "invoker_exort", // 5
          "invoker_quas", // 6
          "invoker_exort", // 7
          "invoker_wex", // 8
          "invoker_exort", // 9
          "invoker_quas", // 10
          "invoker_exort", // 11
          "invoker_wex", // 12
          "invoker_exort", // 13
          "invoker_wex", // 14
          "invoker_wex", // 15
          "invoker_wex", // 16
          "invoker_wex", // 17
          "invoker_wex", // 18
          "invoker_quas", // 19
          "special_bonus_unique_invoker_6", // 20
          "special_bonus_unique_invoker_9", // 21
          "special_bonus_unique_invoker_5", // 22
          "invoker_quas", // 23
          "invoker_quas", // 24
          "special_bonus_unique_invoker_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "mantle",
            "faerie_fire",
            "circlet",
            "branches",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["hand_of_midas", "boots", "null_talisman", "magic_wand"],
          mid_game: ["travel_boots", "ultimate_scepter", "blink"],
          late_game: ["sheepstick", "refresher", "octarine_core"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "aghanims_shard",
            "sphere",
            "aeon_disk",
          ],
          core: ["hand_of_midas", "travel_boots", "ultimate_scepter", "blink"],
          neutral: [
            "mysterious_hat",
            "pogo_stick",
            "grove_bow",
            "vambrace",
            "essence_ring",
            "quicksilver_amulet",
            "quickening_charm",
            "mind_breaker",
            "timeless_relic",
            "spell_prism",
            "ex_machina",
            "desolator_2",
          ],
        },
        item_tooltips: {
          blink:
            "A core item that allows you to close the gap and land your spell combo.",
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_invoker_10:
        "On level 20, take the level 20 talent over this one. The dota 2 client disallows me to indicate that in graphics above. The other Tornado talent can be better than Alacrity one, if you need more control or dispel.",
      special_bonus_unique_invoker_9:
        "You can take the Forged Spirit talent if you need to splitpush and extend the game.",
      special_bonus_unique_invoker_6:
        "This talent should be taken at level 22.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      hand_of_midas: "A core item that allows you to scale.",
      travel_boots: "A core item that allows you to cover the map with ease.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      ultimate_scepter:
        "A core item that provides spell-immunity piercring pure damage burst.",
      aghanims_shard: "For extra AoE damage.",
      sphere: "Against powerful single-target disables and debuffs.",
      aeon_disk:
        "Grants you a second chance to survive and get your spells and items off.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Against Quas Wex build Invoker to have burst of mana available after the EMP was used",
          },
          {
            item: "enchanted_mango",
            info: "Against Quas Wen build Invoker that casts EMP often",
          },
          {
            item: "wind_lace",
            info: "To easier dodge some of his skill shot spells",
          },
          {
            item: "boots",
            info: "To easier dodge some of his skill shot spells",
          },
          {
            item: "arcane_boots",
            info: "Against Quas Wex build Invoker that casts EMP often to burn mana and Arcane Boots will allow you to offset that",
          },
          {
            item: "cloak",
            info: "Invoker does a lot of magical damage and Cloak offsets 15% of it",
          },
        ],
        support: [{ item: "dust" }, { item: "ward_sentry" }],
        core: [
          {
            item: "soul_ring",
            info: "Against Quas Wex build Invoker that casts EMP often to burn mana and Soul Ring will allow you to offset that",
          },
          {
            item: "DamageItems",
            info: "Against Quas Exort Invoker, to compete with extra damage from levels in Exort",
          },
        ],
      },
      mid_game: {
        all: [{ item: "cyclone" }],
        support: [
          { item: "SentryDust" },
          { item: "force_staff" },
          { item: "glimmer_cape" },
        ],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          {
            item: "pipe",
            info: "Invoker has a lot of AOE damage spells that this item could absorb.",
          },
          { item: "eternal_shroud" },
          {
            item: "blade_mail",
            info: "Invoker tends to throw several spell at once and Blademail could be a big threat.",
          },
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Cold Snap." },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "aeon_disk" },
          {
            item: "wind_waker",
            info: "To save an ally from dying to Cataclysm",
          },
        ],
        support: [{ item: "SentryDustGem" }, { item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "satanic", info: "To dispel Cold Snap" },
        ],
      },
    },
  },

  Io: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640803993,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699957619",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "special_bonus_unique_wisp_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_wisp_4", // 25
        ],
        items: {
          starting: ["tango", "headdress", "faerie_fire", "ward_observer"],
          early_game: [
            `ward_sentry`,
            `flask`,
            "magic_wand",
            `infused_raindrop`,
            `holy_locket`,
          ],
          mid_game: [
            "mekansm",
            "aghanims_shard",
            "ghost",
            "glimmer_cape",
            "solar_crest",
          ],
          late_game: ["aeon_disk", "vladmir", "heart"],
          situational: [
            `bottle`,
            `urn_of_shadows`,
            `soul_ring`,
            `guardian_greaves`,
            `ultimate_scepter`,
            `ethereal_blade`,
            "lotus_orb",
            `heavens_halberd`,
            `desolator`,
            `helm_of_the_overlord`,
            `boots_of_bearing`,
            `wraith_pact`,
          ],
          core: ["holy_locket", "mekansm", "aghanims_shard", `solar_crest`],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            `dragon_scale`,
            "quickening_charm",
            "paladin_sword",
            `black_powder_bag`,
            "ascetic_cap",
            "trickster_cloak",
            "book_of_shadows",
            "ex_machina",
            `demonicon`,
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick instead of Headdress if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      holy_locket:
        "A core item that provides healing boost upon activation and improves healing output overall.",
      mekansm: "A core item that provides an instant AoE heal. ",
      aghanims_shard: "For extra control and mobility.",
      lotus_orb: "For reflect, dispel and armor.",
      desolator: `Get this only after you take your level 25 talent.`,
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "ring_of_regen",
            info: "To keep up with the sustain from Io",
          },
          {
            item: "wind_lace",
            info: "To catch up to Io or escape against Tether bonus movement speed",
          },
          {
            item: "boots",
            info: "To catch up to Io or escape against Tether bonus movement speed",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to offset healing from the Tether",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "blink", info: "To close the gap to Io" },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [],
      },
      late_game: {
        all: [{ item: "sheepstick", info: "For Io or his tethered partner" }],
        support: [],
        core: [
          { item: "shivas_guard", info: "To reduce healing" },
          { item: "skadi", info: "To reduce healing" },
          { item: "abyssal_blade", info: "To pin Io or cancel Relocate" },
        ],
      },
    },
  },

  Jakiro: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804005,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699957843",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "jakiro_ice_path", // 10
          "special_bonus_attack_range_325", // 11
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
          "special_bonus_unique_jakiro_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "tango",
            "enchanted_mango",
            "enchanted_mango",
            "flask",
            "faerie_fire",
            "clarity",
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            "wind_lace",
            "infused_raindrop",
          ],
          mid_game: [
            "aether_lens",
            "cyclone",
            "aghanims_shard",
            "force_staff",
            "ghost",
            "glimmer_cape",
          ],
          late_game: [
            "ultimate_scepter",
            "blink",
            "aeon_disk",
            "octarine_core",
          ],
          situational: [
            "veil_of_discord",
            "ring_of_basilius",
            "pipe",
            "ethereal_blade",
            "travel_boots",
            "lotus_orb",
          ],
          core: [
            "arcane_boots",
            "aether_lens",
            "aghanims_shard",
            "ultimate_scepter",
          ],
          neutral: [
            "keen_optic",
            "trusty_shovel",
            "mysterious_hat",
            "philosophers_stone",
            "bullwhip",
            "essence_ring",
            "spider_legs",
            "psychic_headband",
            "ceremonial_robe",
            "spy_gadget",
            "timeless_relic",
            "spell_prism",
            "seer_stone",
            "book_of_shadows",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, clarity, and sentry ward for it",
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade that helps with mana sustain. Can be disassembled and Energy Booster used for Aether Lens. Getting Tranquil Boots afterwards for movement speed is recommendable.",
      aether_lens:
        "A core item that allows you to get spells off from further away.",
      aghanims_shard:
        "A core item that adds to control and damage output. Works on buildings as well. Goes well with level 10 talent.",
      lotus_orb: "For reflect, dispel and armor.",
    },
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
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "For sustain on the lane",
          },
          {
            item: "headdress",
            info: "For lane sustain and/or Pipe of Insight later",
          },
          { item: "wind_lace", info: "To offset the slow from Dual Breath" },
          { item: "boots", info: "To offset the slow from Dual Breath" },
          {
            item: "cloak",
            info: "Jakiro does a lot of magical damage and Cloak offsets 15% of it",
          },
        ],
        support: [{ item: "headdress" }],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  Juggernaut: {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804017,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699957943",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "juggernaut_blade_fury",
          "juggernaut_blade_dance",
          "juggernaut_blade_fury",
          "juggernaut_healing_ward",
          "juggernaut_blade_fury",
          "juggernaut_omni_slash",
          "juggernaut_blade_fury",
          "juggernaut_blade_dance",
          `juggernaut_healing_ward`,
          `special_bonus_all_stats_5`,
          `juggernaut_blade_dance`,
          "juggernaut_omni_slash",
          `juggernaut_blade_dance`,
          "juggernaut_healing_ward",
          `special_bonus_unique_juggernaut_4`,
          "juggernaut_healing_ward",
          "special_bonus_attributes",
          "juggernaut_omni_slash",
          "special_bonus_attributes",
          "special_bonus_unique_juggernaut_3",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          "special_bonus_attributes",
          `special_bonus_hp_475`,
        ],
        items: {
          starting: ["tango", `flask`, "quelling_blade", `slippers`, `circlet`],
          early_game: [
            `phase_boots`,
            "wraith_band",
            "magic_wand",
            `maelstrom`,
            `infused_raindrop`,
          ],
          mid_game: [`manta`, `ultimate_scepter`, `aghanims_shard`, `skadi`],
          late_game: [
            `basher`,
            `butterfly`,
            `satanic`,
            `abyssal_blade`,
            `mjollnir`,
            `swift_blink`,
          ],
          situational: [
            `power_treads`,
            `bfury`,
            `diffusal_blade`,
            `sange_and_yasha`,
            `blink`,
            `silver_edge`,
            `monkey_king_bar`,
            `nullifier`,
            `travel_boots`,
          ],
          core: [
            `phase_boots`,
            `maelstrom`,
            `manta`,
            `ultimate_scepter`,
            `aghanims_shard`,
            `basher`,
            `satanic`,
          ],
          neutral: [
            "possessed_mask",
            "broom_handle",
            "quicksilver_amulet",
            `misericorde`,
            `ring_of_aquila`,
            "mind_breaker",
            "elven_tunic",
            `titan_sliver`,
            `paladin_sword`,
            "the_leveller",
            `ninja_gear`,
            `flicker`,
            "pirate_hat",
            `apex`,
            `desolator_2`,
          ],
        },
      },
    ],
    ability_tooltips: {
      juggernaut_healing_ward:
        "You can skill Healing Ward at level two if you are being pressured.",
      juggernaut_blade_dance: `Some players prefer taking stats over leveling Blade Dance past level one. It slows your farm a bit but makes you tankier.`,
      special_bonus_attack_speed_20: `You can take the other level 15 talent if the enemy team has long range nukers like Tinker who find it difficult to destroy your Healing Ward.`,
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace your slippers and circlet for it.`,
      infused_raindrop: "Against magical burst.",
      power_treads: `You can get Power Treads instead of Phase Boots if you decide to get Battlefury over Maelstrom.`,
      maelstrom:
        "A prefered farming item. Great against illusion-based heroes. The Mjollnir upgrade is fantastic increase of Omnislash damage output.",
      bfury:
        "An alternative to Maelstrom, good against NP`s Sprout and summon based heroes.",
      manta:
        "A core item that allows you to farm even faster, provides a defensive dispel and moderate damage increase.",
      sange_and_yasha: `An alternative to Manta Style when there are no silences or roots to debuff.`,
      diffusal_blade:
        "Goes well with Manta Style against heroes like Medusa low mana pool heroes.",
      ultimate_scepter: "A core item for gap-closing and burst damage.",
      aghanims_shard:
        "A core upgrade that allows Blade Fury to scale with your damage. Especially good against lineups heavy on magic damage and disables. You will dish out a lot of damage during Blade Fury if you pick up talents for it as well.",
      mjollnir: `A late game item that increases the damage of your Omnislash and Swiftslash significantly.`,
      basher: "A core item to lock the target you are focusing.",
      blink: "To close the gap.",
      monkey_king_bar: "Against evasion and miss chance.",
      nullifier: "To dispel defensive spells and items that counter Omnislash.",
    },
    combo: [
      `juggernaut_omni_slash`,
      `juggernaut_blade_fury`,
      `juggernaut_healing_ward`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from the Juggernaut",
          },
          { item: "boots", info: "To keep the distance from the Juggernaut" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "bracer",
            info: "To survive the burst of damage coming from Blade Fury",
          },
          {
            item: "armor",
            info: "Buy armor items against Omnislash and right-clicks",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [
          { item: "crimson_guard" },
          { item: "basher" },
          { item: "invis_sword" },
          { item: "manta" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
          { item: "wind_waker", info: "To save an ally being Omnislashed" },
        ],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "silver_edge" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  "Keeper of the Light": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804026,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958059",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "keeper_of_the_light_illuminate", // 1  "keeper_of_the_light_radiant_bind" equals to `solar bind`
          "keeper_of_the_light_chakra_magic", // 2
          "keeper_of_the_light_illuminate", // 3
          "keeper_of_the_light_chakra_magic", // 4
          "keeper_of_the_light_illuminate", // 5
          "keeper_of_the_light_spirit_form", // 6
          "keeper_of_the_light_radiant_bind", // 7
          "keeper_of_the_light_illuminate", // 8
          "keeper_of_the_light_chakra_magic", // 9
          "keeper_of_the_light_chakra_magic", // 10
          "keeper_of_the_light_radiant_bind", // 11
          "keeper_of_the_light_spirit_form", // 12
          "keeper_of_the_light_radiant_bind", // 13
          "keeper_of_the_light_radiant_bind", // 14
          "special_bonus_unique_keeper_of_the_light_8", // 15
          "special_bonus_unique_keeper_of_the_light_7", // 16
          "special_bonus_attributes", // 17
          "keeper_of_the_light_spirit_form", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_keeper_of_the_light_11", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_keeper_of_the_light_10", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "faerie_fire",
            "enchanted_mango",
            "circlet",
            "ward_observer",
          ],
          early_game: [
            "ward_sentry",
            "tranquil_boots",
            "magic_wand",
            "null_talisman",
            "infused_raindrop",
            "force_staff",
          ],
          mid_game: [
            "glimmer_cape",
            "ghost",
            "cyclone",
            "veil_of_discord",
            "solar_crest",
            "mekansm",
          ],
          late_game: [
            "ultimate_scepter",
            "aeon_disk",
            "sheepstick",
            "dagon",
            "octarine_core",
            "wind_waker",
          ],
          situational: [
            "ring_of_basilius",
            "spirit_vessel",
            "aghanims_shard",
            "lotus_orb",
            "blink",
            "kaya_and_sange",
            "ethereal_blade",
            "travel_boots",
          ],
          core: [
            "tranquil_boots",
            "veil_of_discord",
            "dagon",
            "kaya_and_sange",
            "ultimate_scepter",
          ],
          neutral: [
            "keen_optic",
            "trusty_shovel",
            "mysterious_hat",
            "philosophers_stone",
            "bullwhip",
            "essence_ring",
            "psychic_headband",
            "quickening_charm",
            "spy_gadget",
            "spell_prism",
            "timeless_relic",
            "seer_stone",
            "book_of_shadows",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      keeper_of_the_light_radiant_bind:
        "You can skill this spell on earlier than suggested if you have kill potential on the lane.",
      special_bonus_unique_keeper_of_the_light_8:
        "Skill this level 10 talent on level 16 and the suggested level 15 talent on level 15. The dota client disallows me to present that order in graphics above.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango and circlet for it.",
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      infused_raindrop: "Against magical burst.",
      tranquil_boots:
        "A core boots upgrade that provides hp sustain and high movement speed.",
      spirit_vessel: "Against heavy-healing lineup.",
      ultimate_scepter:
        "A core item that provides an AoE control in teamfights.",
      aghanims_shard: "For better teamfight and split push potential.",
      lotus_orb: "For reflect, dispel and armor.",
      blink: "Helps with splitpush and lining up your spells.",
    },
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
          {
            item: "magic_stick",
            info: "Keeper of the Light`s Chakra Magic allows him or his ally to cast spells frequently",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against Illuminate build on Keeper of the Light",
          },
          {
            item: "headdress",
            info: "For sustain on the lane against Illuminate build on Keeper of the Light",
          },
          {
            item: "infused_raindrop",
            info: "Against Illuminate build on Keeper of the Light",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to offset healing during from Spirit Form`s Illuminate during daytime",
          },
        ],
        support: [],
        core: [
          {
            item: "ring_of_health",
            info: "Against Illuminate build on Keeper of the Light",
          },
        ],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "sphere", info: "Against midlane Keeper of the Light" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
          {
            item: "manta",
            info: "To dispel Solar Bind against midlane Keeper of the Light",
          },
        ],
      },
      late_game: {
        all: [
          { item: "aeon_disk", info: "Against a midlane Keeper of the Light" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "monkey_king_bar" }],
      },
    },
  },

  Kunkka: {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804039,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958147",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_attack_damage_30", // 10
          "kunkka_x_marks_the_spot", // 11
          "kunkka_ghostship", // 12
          "kunkka_torrent", // 13
          "kunkka_torrent", // 14
          `special_bonus_unique_kunkka_6`, // 15
          "kunkka_torrent", // 16
          "special_bonus_attributes", // 17
          "kunkka_ghostship", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_kunkka_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_kunkka_5", // 25
        ],
        items: {
          starting: [
            `tango`,
            `faerie_fire`,
            `quelling_blade`,
            `gauntlets`,
            `circlet`,
            `ward_observer`,
          ],
          early_game: [
            "bottle",
            "phase_boots",
            "helm_of_iron_will",
            "bracer",
            "magic_wand",
          ],
          mid_game: [
            "armlet",
            "black_king_bar",
            "lesser_crit",
            "silver_edge",
            `orchid`,
          ],
          late_game: [
            "assault",
            "satanic",
            "greater_crit",
            `ultimate_scepter`,
            `aghanims_shard`,
            `overwhelming_blink`,
            `rapier`,
          ],
          situational: [
            `heavens_halberd`,
            `blink`,
            `satanic`,
            `sheepstick`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            "phase_boots",
            "armlet",
            "black_king_bar",
            "lesser_crit",
            "assault",
          ],
          neutral: [
            "broom_handle",
            "chipped_vest",
            "vambrace",
            "dragon_scale",
            "titan_sliver",
            `elven_tunic`,
            `cloak_of_flames`,
            `spider_legs`,
            "the_leveller",
            `penta_edged_sword`,
            "desolator_2",
            `fallen_sky`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          ward_observer:
            "If you are playing midlane Kunkka. You can bring it to sidelane as well.",
          bottle:
            "If you are playing midlane Kunkka. You can do X Marks the spot refills.",
          orchid:
            "Buying this item after Armlet can be the way to go if you look to play actively early on.",
          lesser_crit:
            "A core item that can proc on Tidebring hits. Can be upgraded to Silver Edge or Daedalus.",
          aghanims_shard: "For extra control and to reposition enemies.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1641828247,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2715010750",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
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
          "kunkka_torrent", // 11
          "kunkka_ghostship", // 12
          "kunkka_torrent", // 13
          "kunkka_torrent", // 14
          "special_bonus_unique_kunkka_7", // 15
          "special_bonus_unique_kunkka_2", // 16
          "special_bonus_attributes", // 17
          "kunkka_ghostship", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_kunkka", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_kunkka_3", // 25
        ],
        items: {
          starting: [
            `tango`,
            `flask`,
            "quelling_blade",
            `gauntlets`,
            `circlet`,
            `ward_observer`,
          ],
          early_game: [
            "helm_of_iron_will",
            "phase_boots",
            "bracer",
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            "armlet",
            "black_king_bar",
            "ultimate_scepter",
            `aghanims_shard`,
            `blink`,
          ],
          late_game: [`assault`, `refresher`, `shivas_guard`, `sheepstick`],
          situational: [
            `heavens_halberd`,
            `solar_crest`,
            `pipe`,
            `silver_edge`,
            `travel_boots`,
          ],
          core: [
            "phase_boots",
            "armlet",
            "black_king_bar",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          neutral: [
            `broom_handle`,
            `chipped_vest`,
            `vambrace`,
            `dragon_scale`,
            `titan_sliver`,
            `elven_tunic`,
            `cloak_of_flames`,
            `spider_legs`,
            `the_leveller`,
            `penta_edged_sword`,
            `desolator_2`,
            `fallen_sky`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          pipe: "Good against heavy magical-damage lineup.",
          ultimate_scepter:
            "A core item that grants extra AoE control and damage.",
          aghanims_shard: "A core item to control and reposition opponents.",
          silver_edge:
            "It allows you to turn into a decent right-clicker and applies break.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      helm_of_iron_will:
        "A core item that solves your hp sustain issues. Upgrade it to Armlet.",
      phase_boots:
        "A core boots upgrade that makes Tidebringer hit even harder. Fixes the low armor gain of the hero temporarily.",
      armlet:
        "A core item that provides you with great stats and makes your Tidebringer hit hard. Helm of Iron Will should be the first component to purchase on tough lane.",
      heavens_halberd:
        "Especially good against ranged right-clickers. For utility build.",
      assault:
        "A core item that provides you with much needed attack speed and armor. Armor reduction goes well with the physical damage theme.",
      black_king_bar:
        "A core item that allows you to stay in the middle of the fight and deliver the damage.",
      blink: "Combines well with X Marking yourself to do Tidebringer hits.",
    },
    combo: [
      `kunkka_x_marks_the_spot`,
      `kunkka_ghostship`,
      `kunkka_return`,
      `kunkka_torrent`,
      `kunkka_tidebringer`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane against Tidebringer",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
          { item: "ring_of_health" },
        ],
      },
      mid_game: {
        all: [{ item: "cyclone" }, { item: "spirit_vessel" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "assault", info: "Against a right-clicking Kunkka" },
        ],
      },
    },
  },

  "Legion Commander": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1606573292,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2301488685",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "legion_commander_overwhelming_odds", // 1
          "legion_commander_moment_of_courage", // 2
          "legion_commander_press_the_attack", // 3
          "legion_commander_moment_of_courage", // 4
          "legion_commander_press_the_attack", // 5
          "legion_commander_duel", // 6
          "legion_commander_press_the_attack", // 7
          "legion_commander_press_the_attack", // 8
          "legion_commander_moment_of_courage", // 9
          "special_bonus_unique_legion_commander_7", // 10
          "legion_commander_moment_of_courage", // 11
          "legion_commander_duel", // 12
          "legion_commander_overwhelming_odds", // 13
          "legion_commander_overwhelming_odds", // 14
          "special_bonus_unique_legion_commander_6", // 15
          "legion_commander_overwhelming_odds", // 16
          "special_bonus_attributes", // 17
          "legion_commander_duel", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_legion_commander_5", // 20
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
            "branches",
            "ring_of_protection",
            "faerie_fire",
            "enchanted_mango",
            "magic_stick",
          ],
          early_game: [
            "helm_of_iron_will",
            "phase_boots",
            "soul_ring",
            "magic_wand",
            "bracer",
            "orb_of_corrosion",
          ],
          mid_game: [
            "armlet",
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "blade_mail",
          ],
          late_game: [
            "assault",
            "invis_sword",
            "ultimate_scepter",
            "overwhelming_blink",
            "swift_blink",
            "moon_shard",
          ],
          situational: ["heavens_halberd", "monkey_king_bar"],
          core: [
            "phase_boots",
            "armlet",
            "blink",
            "black_king_bar",
            "aghanims_shard",
          ],
          neutral: [
            "broom_handle",
            "chipped_vest",
            "misericorde",
            "quicksilver_amulet",
            "elven_tunic",
            "paladin_sword",
            "the_leveller",
            "ninja_gear",
            "pirate_hat",
            "desolator_2",
          ],
        },
      },
    ],
    ability_tooltips: {
      legion_commander_press_the_attack:
        "You can skill this spell on level 1 if you are being harassed by a dispellable damage-over-time spell like Thunder Strike and Poison Touch.",
      special_bonus_unique_legion_commander:
        "Take this talent over the other if you think your team lacks damage and you play more for yourself rather than for your teammates.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_corrosion: "If you can pressure on the lane.",
      helm_of_iron_will:
        "A core item that solves your hp sustain issues on the lane. It can be upgraded to Armlet but you can also get Blink Dagger before the upgrade.",
      armlet:
        "A core item that gives you all the needed stats to win duels. Usually better than Blade Mail.",
      blink: "A core item that allows you to get Duel off.",
      blade_mail: "Good against high dps right-clickers(PA, Anti-Mage).",
      black_king_bar:
        "A core item that allows you not to be disabled or killed during Duel as often .",
      heavens_halberd:
        "Especially good against ranged right-clickers and to pop Linken`s Sphere.",
      aghanims_shard:
        "A good upgrade to increase your AOE spam as it decreases cooldown on your Overwhelming odds. Good against illusions and summons. ",
      monkey_king_bar: "Against evasion.",
      overwhelming_blink: "To tank up and for AoE damage.",
      swift_blink: "For single target burst.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },

          {
            item: "wind_lace",
            info: "To keep the distance from the Legion Commander",
          },
          {
            item: "boots",
            info: "To keep the distance from the Legion Commander",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
          { item: "ring_of_health" },
        ],
      },
      mid_game: {
        all: [{ item: "cyclone" }],
        support: [{ item: "ghost" }],
        core: [
          { item: "heavens_halberd" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere" },
          { item: "aeon_disk" },
          { item: "ethereal_blade" },
          { item: "wind_waker", info: "To save an ally in Duel" },
        ],
        support: [],
        core: [
          { item: "satanic", info: "For lifesteal in Duel" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Leshrac: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640804061,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958372",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "leshrac_split_earth", // 1
          "leshrac_lightning_storm", // 2
          "leshrac_lightning_storm", // 3
          "leshrac_split_earth", // 4
          "leshrac_diabolic_edict", // 5
          "leshrac_pulse_nova", // 6
          "leshrac_diabolic_edict", // 7
          "leshrac_diabolic_edict", // 8
          "leshrac_diabolic_edict", // 9
          "leshrac_split_earth", // 10
          "leshrac_split_earth", // 11
          "special_bonus_unique_leshrac_5", // 12
          "leshrac_pulse_nova", // 13
          "leshrac_lightning_storm", // 14
          "leshrac_lightning_storm", // 15
          "special_bonus_unique_leshrac_6", // 16
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
            "circlet",
            "mantle",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["bottle", "null_talisman", "arcane_boots", "magic_wand"],
          mid_game: [
            "cyclone",
            "travel_boots",
            "eternal_shroud",
            "kaya",
            "aghanims_shard",
            "kaya_and_sange",
            "ghost",
          ],
          late_game: ["bloodstone", "shivas_guard", "sheepstick", "wind_waker"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "blink",
            "ultimate_scepter",
            "sphere",
            "aeon_disk",
          ],
          core: [
            "arcane_boots",
            "cyclone",
            "kaya",
            "bloodstone",
            "travel_boots",
            "aghanims_shard",
          ],
          neutral: [
            "mysterious_hat",
            "pogo_stick",
            "essence_ring",
            "vambrace",
            "ceremonial_robe",
            "black_powder_bag",
            "ceremonial_robe",
            "spell_prism",
            "timeless_relic",
            "stormcrafter",
            "ex_machina",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_movement_speed_25:
        "You can take this level 15 talent over the suggested one if you are being kited. Since Leshrac is already a fast hero naturally and Boots of Travel is a core item, I prefer the suggested talent. ",
      special_bonus_strength_20:
        "You can take this level 20 talent over the suggested one if you are burstable by opponents.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      bottle: "A core item for mid Leshrac.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade that helps with mana sustain. Can be disassembled and components used for assembling Boots of Travel and Bloodstone.",
      eternal_shroud:
        "Gives you great survivability against a line up with a lot of magic damage as well as spell lifesteal for your skill set.",
      cyclone:
        "A core item that can be used to setup Split Earth. It can also be used defensive. Activated Diabolic Edict and Pulse Nova will deal damage while you are cycloned. The item can be upgraded later.",
      black_king_bar:
        "To be able to stay in the middle of the fight radiating the damage.",
      kaya: "A core item that improves your damage output. Can be upgraded to Bloodstone(preferably) or Sange and Kaya.",
      bloodstone:
        "A core item that has mix of defensive and offensive properties. The active ability can heal you for a significant amount very quickly.",
      travel_boots:
        "A core boots upgrade. Since your hero has and uses a lot of mana you`ll need to refill in the base quite often as well as covering the map and participating in kills.",
      aghanims_shard:
        "A core item that provides extra control but also makes it very hard for opponents to siege your buildings, to stop you from siegeing theirs or for them to take Roshan.",
      blink: "For gap close and to position yourself between the opponents.",
      sphere: "Against powerful single-target disables and debuffs.",
      aeon_disk:
        "Against bursty lineups and lineups with long lasting disables.",
      ultimate_scepter:
        "Against multiple physical damage heroes. e.g Ursa carry, Templar Assassin mid.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Leshrac will use low cooldown spells Split Earth and Lightning Storm to harass or kill creeps",
          },
          { item: "wind_lace", info: "To keep the distance from the Leshrac" },
          { item: "boots", info: "To keep the distance from the Leshrac" },
          {
            item: "cloak",
            info: "Leshrac is heavy on magical damage and Cloak will negate 15% of it",
          },
          { item: "infused_raindrop" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          {
            item: "spirit_vessel",
            info: "As Leshrac tends to buy Spell Lifesteal items, Spirit Vessel will reduce 45% of it.",
          },
        ],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "blade_mail" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "abyssal_blade" }],
      },
    },
  },

  Lich: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804073,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958474",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "special_bonus_unique_lich_8", // 10
          "lich_sinister_gaze", // 11
          "lich_chain_frost", // 12
          "lich_sinister_gaze", // 13
          `lich_frost_nova`, // 14
          "special_bonus_unique_lich_2", // 15
          "lich_frost_nova", // 16
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
            "flask",
            `clarity`,
            "enchanted_mango",
            `enchanted_mango`,
            "faerie_fire",
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
            `glimmer_cape`,
            "aether_lens",
            `aghanims_shard`,
            "force_staff",
            `tranquil_boots`,
          ],
          late_game: [
            "aeon_disk",
            `ultimate_scepter`,
            "octarine_core",
            `ethereal_blade`,
          ],
          situational: [
            `ring_of_basilius`,
            `ghost`,
            `cyclone`,
            "lotus_orb",
            `solar_crest`,
            `refresher`,
            "blink",
            `sheepstick`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: ["arcane_boots", "aether_lens", "solar_crest"],
          neutral: [
            "keen_optic",
            "trusty_shovel",
            `pogo_stick`,
            `arcane_ring`,
            "philosophers_stone",
            "bullwhip",
            "spider_legs",
            "psychic_headband",
            `quickening_charm`,
            "spy_gadget",
            "spell_prism",
            `heavy_blade`,
            `stormcrafter`,
            "seer_stone",
            "book_of_shadows",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, clarity, and faerie fire for it.`,
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade that helps with mana sustain. Can be disasembled and Energy Booster used for Aether Lens. Assembling Tranquil Boots afterwards for extra movement speed is advised.",
      aether_lens:
        "A core item that allows you to get your spells and items off from further away.",
      solar_crest: `An item to buff one of your right-clicking cores or to debuff an opponent or Roshan to kill it faster.`,
      aghanims_shard: `A core item fir extra control and potential to burst a secluded enemy hero with Chain Frost.`,
      lotus_orb: "For reflect, dispel and armor.",
      blink:
        "Goes well with Aghanim`s Shard to burst a single hero. Good for canceling channeling spells(Fiend`s Grip, Shackles).",
    },
    combo: [
      `lich_frost_shield`,
      `lich_frost_nova`,
      `lich_chain_frost`,
      `lich_sinister_gaze`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Lich will use Frost Blast and Frost Shield to harass or make kill attempts frequently",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "wind_lace",
            info: "To offset the slow from Frost Blast and Frost Shield",
          },
          {
            item: "boots",
            info: "To offset the slow from Frost Blast and Frost Shield",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Lich is heavy on magical damage and Cloak will negate 15% of it",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "nullifier", info: "To dispel Frost Shield" }],
      },
    },
  },

  Lifestealer: {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804081,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958609",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "life_stealer_feast", // 1
          "life_stealer_ghoul_frenzy", // 2
          "life_stealer_feast", // 3
          "life_stealer_ghoul_frenzy", // 4
          "life_stealer_rage", // 5
          "life_stealer_infest", // 6
          "life_stealer_ghoul_frenzy", // 7
          "life_stealer_ghoul_frenzy", // 8
          "life_stealer_feast", // 9
          "special_bonus_attack_speed_30", // 10
          "life_stealer_feast", // 11
          "life_stealer_infest", // 12
          "life_stealer_rage", // 13
          "life_stealer_rage", // 14
          "life_stealer_rage", // 15
          "special_bonus_attack_damage_25", // 16
          "special_bonus_attributes", // 17
          "life_stealer_infest", // 18
          "special_bonus_attributes", // 19
          "special_bonus_evasion_16", // 20
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
            "branches",
            "faerie_fire",
            "orb_of_venom",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "helm_of_iron_will",
            "phase_boots",
            "armlet",
            "magic_wand",
            "orb_of_corrosion",
          ],
          mid_game: [
            "sange",
            "sange_and_yasha",
            "basher",
            "desolator",
            "maelstrom",
          ],
          late_game: [
            "skadi",
            "assault",
            "satanic",
            "abyssal_blade",
            "ultimate_scepter",
            "mjollnir",
          ],
          situational: [
            "heavens_halberd",
            "aghanims_shard",
            "silver_edge",
            "monkey_king_bar",
            "nullifier",
            "black_king_bar",
            "blink",
          ],
          core: ["phase_boots", "armlet", "sange_and_yasha", "basher"],
          neutral: [
            "chipped_vest",
            "broom_handle",
            "quicksilver_amulet",
            "misericorde",
            "mind_breaker",
            "elven_tunic",
            "the_leveller",
            "penta_edged_sword",
            "desolator_2",
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      life_stealer_rage:
        "You can put a first point in this spell earlier than suggested if you need to dispel or disjoint the spell.",
    },
    item_tooltips: {
      orb_of_venom: "If you can pressure on the lane.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      helm_of_iron_will:
        "On rough lane, you can rush this component of Armlet that solves your hp sustain issues.",
      phase_boots: "A core boots upgrade that helps you to gap close quicker.",
      orb_of_corrosion: "If you can pressure on the lane.",
      armlet: "A core item that provides you with useful stats and burst.",
      sange_and_yasha:
        "A core item that gives you a mix of offensive and defensive stats. Heal amplification from Sange works well with Feast and Infest.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      basher: "A core item that allows you to lock down the target.",
      aghanims_shard:
        "Not a particularly great upgrade. You will most of the time get it from Roshan.",
      monkey_king_bar: "Against evasion.",
      silver_edge: "For break effect and to reposition quickly.",
      nullifier: "To dispel defensive spells and items.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel. Use it after Rage.",
      blink: "To close the gap.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "wind_lace",
            info: "To keep the distance from the Lifestealer",
          },
          { item: "boots", info: "To keep the distance from the Lifestealer" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }, { item: "vanguard" }],
      },
      mid_game: {
        all: [],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "orchid" },
          { item: "basher" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [],
        core: [
          { item: "abyssal_blade" },
          {
            item: "monkey_king_bar",
            info: "The procs from this item deal damage through spell immunity and also counter evasion talent",
          },
          {
            item: "bloodthorn",
            info: "To burst this tanky hero and for true strike against evasion talent",
          },
          {
            item: "skadi",
            info: "To reduce healing from Feast and Open Wounds",
          },
          {
            item: "shivas_guard",
            info: "To reduce healing from Feast and Open Wounds",
          },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Lina: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640804097,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958714",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "lina_dragon_slave", // 1
          "lina_fiery_soul", // 2
          "lina_dragon_slave", // 3
          "lina_light_strike_array", // 4
          "lina_dragon_slave", // 5
          "lina_laguna_blade", // 6
          "lina_dragon_slave", // 7
          "lina_fiery_soul", // 8
          "lina_fiery_soul", // 9
          "lina_fiery_soul", // 10
          "special_bonus_attack_damage_25", // 11
          "lina_laguna_blade", // 12
          "lina_light_strike_array", // 13
          "lina_light_strike_array", // 14
          "special_bonus_hp_350", // 15
          "lina_light_strike_array", // 16
          "special_bonus_attributes", // 17
          "lina_laguna_blade", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lina_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_attack_range_125", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            `branches`,
            "circlet",
            "ward_observer",
          ],
          early_game: [
            "bottle",
            "null_talisman",
            "travel_boots",
            "magic_wand",
            `lesser_crit`,
          ],
          mid_game: ["black_king_bar", `greater_crit`, "satanic"],
          late_game: ["skadi", `monkey_king_bar`, "sheepstick", `sphere`],
          situational: [
            "infused_raindrop",
            `ward_sentry`,
            "hurricane_pike",
            `silver_edge`,
            "blink",
            `bloodthorn`,
            `mjollnir`,
            `ultimate_scepter`,
            `assault`,
            `travel_boots_2`,
          ],
          core: ["travel_boots", "black_king_bar", `greater_crit`, "satanic"],
          neutral: [
            "arcane_ring",
            "unstable_wand",
            "grove_bow",
            "quicksilver_amulet",
            `dragon_scale`,
            "mind_breaker",
            "enchanted_quiver",
            `spider_legs`,
            "the_leveller",
            `flicker`,
            "penta_edged_sword",
            "desolator_2",
            "ex_machina",
            `mirror_shield`,
          ],
        },
        ability_tooltips: {
          lina_light_strike_array:
            "You can skill this spell on level 1 against melee match-up.",
        },
        item_tooltips: {
          bottle: `Rush the bottle before buying anything else at mid.`,
          ward_sentry: `Deward the enemy observer at mid if you know where they placed it.`,
          travel_boots:
            "A core item that goes well with Fiery Soul movement speed amp. Allows you to conver the map better.",
          lesser_crit: `An early damage item that lets you get kills and snowball across the map.`,
          black_king_bar:
            "A core item that allows you to stand your ground and deliver the damage.",
          silver_edge: `A situational item that grants you burst against tanky heroes with a passive like Bristleback or Tidehunter.`,
          hurricane_pike:
            "Helps you establish the distance against gap-closing heroes and to deliver the right-click damage from further away.",
          satanic:
            "A core item that allows you to stand your ground and right-click the opponents.",
          monkey_king_bar:
            "Against eveasion and miss chance. Procs very often with 3 Fiery Soul stacks.",
          sphere: "Against powerful single target disables or debuffs.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1641843112,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2715221904",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "special_bonus_spell_amplify_11", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lina_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "flask",
            "circlet",
            "mantle",
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            `null_talisman`,
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            "aether_lens",
            "cyclone",
            "ultimate_scepter",
            "aghanims_shard",
            `ghost`,
          ],
          late_game: [
            `travel_boots`,
            `ethereal_blade`,
            "aeon_disk",
            "sheepstick",
            "octarine_core",
          ],
          situational: [
            `tranquil_boots`,
            `blink`,
            `black_king_bar`,
            `lotus_orb`,
            `kaya_and_sange`,
            `wind_waker`,
            `gungir`,
            `revenants_brooch`,
            `travel_boots_2`,
          ],
          core: [
            "arcane_boots",
            "aether_lens",
            "cyclone",
            "ultimate_scepter",
            "aghanims_shard",
          ],
          neutral: [
            "mysterious_hat",
            `trusty_shovel`,
            "arcane_ring",
            `pogo_stick`,
            "philosophers_stone",
            "essence_ring",
            `dragon_scale`,
            "psychic_headband",
            "spider_legs",
            `quickening_charm`,
            "timeless_relic",
            "spy_gadget",
            `spell_prism`,
            `stormcrafter`,
            "seer_stone",
            "book_of_shadows",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock one of the camps",
          arcane_boots:
            "A core boots upgrade that helps with mana sustain. Can be disasembled and Energy Booster used for Aether Lens. Upgrading the remaining boots to Tranquil boots is advised.",
          aether_lens:
            "A core item that allows you to cast spells and items from further away.",
          cylcone: "A core item that allows you to setup Light Strike Array.",
          ultimate_scepter:
            "A core item that turns Laguna Blade damage type to pure and allows it pierce spell-immunity. Goes well with Aghanim`s Shard.",
          aghanims_shard:
            "A core item that allows Laguna Blade to hit multiple units in the line. It also makes Laguna Blade not be affected by Linken`s Sphere or Lotus Orb.",
          lotus_orb: "Against powerful single-target disables and debuffs.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      infused_raindrop: "Against magical burst.",
      blink: "To be able to reposition quickly.",
    },
    combo: [
      `cyclone`,
      `lina_light_strike_array`,
      `lina_dragon_slave`,
      `lina_laguna_blade`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Lina is heavy on magical damage and Cloak will negate 15% of it",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "mage_slayer" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }, { item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          {
            item: "silver_edge",
            info: "To close the gap to Lina and break her passive",
          },
          {
            item: "assault",
            info: "In the late game Lina does a lot of physical damage due to items and Fiery Soul",
          },
          {
            item: "butterfly",
            info: "In the late game Lina does a lot of physical damage due to items and Fiery Soul",
          },
        ],
      },
    },
  },

  Lion: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804104,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958831",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "lion_impale", // 1
          "lion_mana_drain", // 2
          "lion_impale", // 3
          "lion_voodoo", // 4
          `lion_mana_drain`, // 5
          "lion_finger_of_death", // 6
          "lion_impale", // 7
          `lion_impale`, // 8
          "lion_voodoo", // 9
          "lion_voodoo", // 10
          `lion_voodoo`, // 11
          "lion_finger_of_death", // 12
          `special_bonus_attack_damage_60`, // 13
          "lion_mana_drain", // 14
          `special_bonus_unique_lion_11`, // 15
          "lion_mana_drain", // 16
          "special_bonus_attributes", // 17
          "lion_finger_of_death", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lion_8", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lion_4", // 25
        ],
        items: {
          starting: ["tango", "boots", "ward_observer"],
          early_game: [
            `ward_sentry`,
            "tranquil_boots",
            "magic_wand",
            "wind_lace",
            `infused_raindrop`,
          ],
          mid_game: [
            "blink",
            "aether_lens",
            "aghanims_shard",
            "force_staff",
            "glimmer_cape",
          ],
          late_game: ["aeon_disk", "ultimate_scepter", "octarine_core"],
          situational: [
            `smoke_of_deceit`,
            `ghost`,
            `cyclone`,
            "lotus_orb",
            `ethereal_blade`,
            `wind_waker`,
            `black_king_bar`,
            `travel_boots`,
          ],
          core: ["tranquil_boots", "blink", "aghanims_shard"],
          neutral: [
            "keen_optic",
            "pogo_stick",
            `trusty_shovel`,
            "philosophers_stone",
            "vambrace",
            `pupils_gift`,
            "spider_legs",
            "psychic_headband",
            `quickening_charm`,
            "timeless_relic",
            "spy_gadget",
            `spell_prism`,
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {
      lion_voodoo:
        "You can skill this spell on level 2 or 3 already if you can score an early kill.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick instead of boots if you expect high frequency of spells being used on the lane.`,
      smoke_of_deceit: `Excellent at roaming between lanes to ward and find kills around the map.`,
      infused_raindrop: "Against magical burst.",
      tranquil_boots:
        "A core boots upgrade that provides you with hp sustain but more importantly with high movement speed that allows you to get your spells off easier.",
      blink:
        "A core item that allows you to instanly jump on and disable an opponent.",
      aghanims_shard:
        "A core item that has a mix of defensive and offensive utilities. It is especially good against illusion based heroes like Naga or Terrorblade as mana drain destroys them instantly.",
      lotus_orb: "For reflect, dispel and armor.",
    },
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
          { item: "magic_stick" },
          {
            item: "enchanted_mango",
            info: "Lion drains mana and Enchanted Mangoes will allow you to offset that",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "infused_raindrop" },
          { item: "arcane_boots", info: "To sustain mana against Mana Drain" },
          {
            item: "cloak",
            info: "Lion is heavy on magical damage and Cloak will negate 15% of it",
          },
        ],
        support: [],
        core: [{ item: "soul_ring" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }, { item: "aeon_disk" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  "Lone Druid": {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640804115,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699958939",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "lone_druid_spirit_bear", // 1
          "lone_druid_spirit_link", // 2
          "lone_druid_spirit_bear", // 3
          "lone_druid_spirit_link", // 4
          "lone_druid_spirit_bear", // 5
          "lone_druid_spirit_link", // 6
          "lone_druid_spirit_link", // 7
          "lone_druid_spirit_bear", // 8
          "lone_druid_savage_roar", // 9
          "lone_druid_true_form", // 10
          "special_bonus_hp_200", // 11
          "lone_druid_true_form", // 12
          "lone_druid_savage_roar", // 13
          "lone_druid_savage_roar", // 14
          "lone_druid_savage_roar", // 15
          "special_bonus_unique_lone_druid_4", // 16
          "special_bonus_attributes", // 17
          "lone_druid_true_form", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lone_druid_9", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lone_druid_10", // 25
        ],
        items: {
          starting_bear: ["quelling_blade", "blight_stone", "orb_of_venom"],
          starting: [
            "tango",
            "branches",
            "faerie_fire",
            "ward_observer",
            "magic_stick",
          ],
          core_bear: [
            "orb_of_corrosion",
            "phase_boots",
            "mask_of_madness",
            "desolator",
            "basher",
            "assault",
          ],
          core: ["boots", "aghanims_shard"],
          situational_bear: [
            "hand_of_midas",
            "maelstrom",
            "monkey_king_bar",
            "mjollnir",
            "black_king_bar",
            "nullifier",
            "abyssal_blade",
            "moon_shard",
            "silver_edge",
          ],
          situational: [
            "buckler",
            "cloak",
            "ghost",
            "solar_crest",
            "ultimate_scepter",
            "refresher",
          ],
          neutral_bear: [
            "broom_handle",
            "chipped_vest",
            "misericorde",
            "dragon_scale",
            "mind_breaker",
            "elven_tunic",
            "the_leveller",
            "penta_edged_sword",
            "desolator_2",
            "pirate_hat",
          ],
          neutral: [
            "unstable_wand",
            "trusty_shovel",
            "ring_of_aquila",
            "bullwhip",
            "black_powder_bag",
            "spider_legs",
            "trickster_cloak",
            "ascetic_cap",
            "book_of_shadows",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      lone_druid_savage_roar:
        "You can skill this spell earlier than suggested if you are being pressured or expect to be ganked. It comes at the cost of slowing your farming speed a bit.",
      lone_druid_true_form:
        "You can skill this spell earlier than suggested if you are being pressured or expect to be ganked. It comes at the cost of slowing your farming speed a bit.",
    },
    item_tooltips: {
      orb_of_venom:
        "Buy Orb of Venom over Blight Stone if you can hit opponents on the lane often with Bear. That`s usually the case against melee match-up or if you have a strong support.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_corrosion:
        "A core item that allows Bear to dish out more damage and be kitted less.",
      phase_boots: "A core boots upgrade that allows Bear to gap-close faster.",
      mask_of_madness:
        "A core item that allows you to farm quicker with Bear but also allows you to burst heroes and buildings.",
      desolator:
        "A core item that allows Bear to burst heroes, buildings and Roshan.",
      basher:
        "A core item for extra control. Can be upgraded to Abyssal Blade but it is not a priority.",
      maelstrom:
        "Alternative to Desolator if you are playing against illusion-based heroes. It should be upgraded to Mjollnir soon afterwards.",
      assault:
        "A core item that goes well with minus armor theme and breaking buildings.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel. Helps with ratting.",
      aghanims_shard: "A core item for hero to buff allies and dispel.",
      solar_crest: "A buff to Bear to increase its dps.",
      refresher: "For extra Bear charge in very late game.",
      ultimate_scepter: "Amazing for split-pushing and ratting.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "wind_lace", info: "To keep the distance from the bear" },
          { item: "boots", info: "To keep the distance from the bear" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }, { item: "vanguard" }],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [{ item: "crimson_guard" }, { item: "hurricane_pike" }],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          {
            item: "travel_boots",
            info: "Lone Druids tends to rat with Bear especially when his Aghanim`s Scepter comes into play",
          },
        ],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Luna: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804126,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959031",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "luna_lunar_blessing", // 1   "luna_moon_glaive" equals to `moon glaives`
          "luna_lucent_beam", // 2
          "luna_lunar_blessing", // 3
          "luna_lucent_beam", // 4
          "luna_moon_glaive", // 5
          "luna_lunar_blessing", // 6
          "luna_lunar_blessing", // 7
          "luna_moon_glaive", // 8
          "luna_moon_glaive", // 9
          "luna_moon_glaive", // 10
          "luna_lucent_beam", // 11
          "luna_eclipse", // 12
          "luna_eclipse", // 13
          "luna_lucent_beam", // 14
          "special_bonus_unique_luna_4", // 15
          "special_bonus_unique_luna_2", // 16
          "special_bonus_attributes", // 17
          "luna_eclipse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_luna_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_luna_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            "slippers",
            "faerie_fire",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "mask_of_madness",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: [
            "dragon_lance",
            "manta",
            "black_king_bar",
            "aghanims_shard",
            "lesser_crit",
          ],
          late_game: ["greater_crit", "skadi", "satanic", "butterfly"],
          situational: [
            "hurricane_pike",
            "silver_edge",
            "ultimate_scepter",
            "monkey_king_bar",
          ],
          core: [
            "power_treads",
            "mask_of_madness",
            "manta",
            "dragon_lance",
            "black_king_bar",
            "aghanims_shard",
            "greater_crit",
          ],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "quicksilver_amulet",
            "titan_sliver",
            "elven_tunic",
            "the_leveller",
            "ninja_gear",
            "ex_machina",
            "desolator_2",
          ],
        },
      },
    ],
    ability_tooltips: {
      luna_lucent_beam:
        "You can skill this spell on level 1 if you prefer to guarantee a range-creep lasthit in first two waves over having extra damage from Lunar Blessing continuously.",
      luna_moon_glaive:
        "Make a decision on level 5 to either take a first point in Moon Glaives and start pushing out creepwaves and farm nearby camps, or continue maxing Lucent Beam along with skilling ultimate on level6 with the idea to kill the opponents on the lane. The farming route is generally preferred nowadays.",
    },
    item_tooltips: {
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      power_treads:
        "A core boots upgrade that increases farming speed by improving attack speed.",
      mask_of_madness:
        "A core item that improves your farming speed significantly. Can be disassembled later to get Satanic and Butterfly.",
      manta:
        "A core item that provides you with useful stats. Using Manta illusions to farm the creeps you otherwise would not go for, will increase you farming speed greatly.",
      dragon_lance:
        "A core item that allows you to get hits off easier and gives great stats. Can be disassembled. Ogre Axe can be used for Black King Bar and Dragon Lance reassembled afterwards. Can be upgraded to Hurricane Pike situationally.",
      black_king_bar:
        "A core item that prevents opponents from disabling you while you are dealing damage.",
      skadi:
        "Great against immobile tanky heroes as it reduces their movespeed,healing and lifesteal. Exceptionally good versus ranged heroes as it slows them by 50%.",
      aghanims_shard:
        "A core item that adds to your damage output. Provides vision in area you beamed.",
      greater_crit:
        "A core damaging item of choice. Works well with Aghanim`s Shard.",
      hurricane_pike: "To disengage from heroes like Slark, Ursa and Troll.",
      silver_edge: "For break, burst and to reposition quickly.",
      ultimate_scepter:
        "Great at bursting backliners. However this is not your core item and should be taken from Roshan if you ever have the chance.",
      monkey_king_bar:
        "Consider replacing Daedalus with it against a lot of  evasion and miss chance.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          { item: "infused_raindrop" },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "cloak",
            info: "Luna is heavy on magical damage and Cloak will negate 15% of it",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          {
            item: "blade_mail",
            info: "As Luna uses her ulty, Blademail could be potentially lethal.",
          },
          { item: "black_king_bar" },
          { item: "heavens_halberd" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "assault" },
          { item: "abyssal_blade" },
          {
            item: "skadi",
            info: "To slow ranged right-click core and to reduce healing coming from her talent and lifesteal items",
          },
          { item: "butterfly" },
        ],
      },
    },
  },

  Lycan: {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804136,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959154",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
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
          "special_bonus_unique_lycan_6", // 11
          "lycan_shapeshift", // 12
          "lycan_howl", // 13
          "lycan_howl", // 14
          "lycan_howl", // 15
          "special_bonus_unique_lycan_8", // 16
          "special_bonus_attributes", // 17
          "lycan_shapeshift", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lycan_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lycan_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "ring_of_protection",
          ],
          early_game: [
            "helm_of_iron_will",
            "helm_of_the_dominator",
            "ring_of_basilius",
            "boots",
          ],
          mid_game: [
            "helm_of_the_overlord",
            "ancient_janggo",
            "aghanims_shard",
            "assault",
            "desolator",
          ],
          late_game: ["ultimate_scepter", "satanic", "assault", "sheepstick"],
          situational: [
            "orchid",
            "black_king_bar",
            "heavens_halberd",
            "nullifier",
          ],
          core: [
            "helm_of_the_dominator",
            "helm_of_the_overlord",
            "ancient_janggo",
            "assault",
            "ultimate_scepter",
          ],
          neutral: [
            "broom_handle",
            "arcane_ring",
            "misericorde",
            "dragon_scale",
            "mind_breaker",
            "quickening_charm",
            "the_leveller",
            "penta_edged_sword",
            "demonicon",
            "desolator_2",
          ],
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1641970144,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2716646867",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_unique_lycan_6", // 11
          "lycan_shapeshift", // 12
          "lycan_howl", // 13
          "lycan_howl", // 14
          "lycan_howl", // 15
          "special_bonus_unique_lycan_8", // 16
          "special_bonus_attributes", // 17
          "lycan_shapeshift", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_lycan_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_lycan_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "ring_of_protection",
          ],
          early_game: [
            "helm_of_iron_will",
            "helm_of_the_dominator",
            "ring_of_basilius",
            "boots",
          ],
          mid_game: [
            "helm_of_the_overlord",
            "ancient_janggo",
            "aghanims_shard",
            "assault",
            "desolator",
          ],
          late_game: ["ultimate_scepter", "satanic", "assault", "sheepstick"],
          situational: [
            "orchid",
            "black_king_bar",
            "heavens_halberd",
            "nullifier",
          ],
          core: [
            "helm_of_the_dominator",
            "helm_of_the_overlord",
            "ancient_janggo",
            "assault",
            "ultimate_scepter",
          ],
          neutral: [
            "broom_handle",
            "arcane_ring",
            "misericorde",
            "dragon_scale",
            "mind_breaker",
            "quickening_charm",
            "the_leveller",
            "penta_edged_sword",
            "demonicon",
            "desolator_2",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      helm_of_the_dominator:
        "A core item that you should rush from the start. Helm of Iron Will is the first component usually as it solves your hp sustain issues. Helm of the Overlord should also be acquired as soon as possible.",
      orchid:
        "Allows you to solo opponents if they don`t have ways to dispel it.",
      ancient_janggo:
        "A core item that provides you, your summons and teammates with the burst of attack and movement speed.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      assault:
        "A core item that improves the dps of you, your summons and teammates. Adds some armor in the mix as well.",
      ultimate_scepter:
        "A core item to buff up one of your other right-clicking cores.",
      sheepstick: "For extra control.",
      nullifier: "To dispel defensive spells and items.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
          { item: "phase_boots", info: "To phase through the summons block" },
          { item: "vanguard" },
        ],
      },
      mid_game: {
        all: [{ item: "rod_of_atos" }],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [{ item: "crimson_guard" }],
      },
      late_game: {
        all: [],
        support: [],
        core: [{ item: "abyssal_blade" }, { item: "assault" }],
      },
    },
  },

  Magnus: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804148,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959287",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "magnataur_shockwave", // 1
          "magnataur_empower", // 2
          "magnataur_shockwave", // 3
          "magnataur_skewer", // 4
          "magnataur_empower", // 5
          "magnataur_reverse_polarity", // 6
          "magnataur_empower", // 7
          "magnataur_empower", // 8
          "magnataur_shockwave", // 9
          "special_bonus_unique_magnus_4", // 10
          "magnataur_shockwave", // 11
          "magnataur_reverse_polarity", // 12
          "magnataur_skewer", // 13
          "magnataur_skewer", // 14
          "magnataur_skewer", // 15
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
            "tango",
            "quelling_blade",
            "branches",
            "gauntlets",
            "enchanted_mango",
            "faerie_fire",
            "ring_of_protection",
            "magic_stick",
          ],
          early_game: ["arcane_boots", "magic_wand", "soul_ring", "bracer"],
          mid_game: [
            "blink",
            "aether_lens",
            "aghanims_shard",
            "ghost",
            "force_staff",
          ],
          late_game: [
            "refresher",
            "invis_sword",
            "assault",
            "overwhelming_blink",
            "arcane_blink",
            "octarine_core",
          ],
          situational: ["cyclone", "mekansm", "black_king_bar", "lotus_orb"],
          core: [
            "arcane_boots",
            "blink",
            "aether_lens",
            "aghanims_shard",
            "refresher",
          ],
          neutral: [
            "pogo_stick",
            "chipped_vest",
            "arcane_ring",
            "essence_ring",
            "bullwhip",
            "spider_legs",
            "quickening_charm",
            "psychic_headband",
            "spell_prism",
            "timeless_relic",
            "ninja_gear",
            "trickster_cloak",
            "fallen_sky",
            "seer_stone",
          ],
        },
        item_tooltips: {
          arcane_boots:
            "A core boots upgrade that helps with mana sustain. Can be disassembled for Aether Lens later on.",
          cyclone: "Often used as a dispel, setup or disengaging item.",
          mekansm:
            "Can be a good item to pick up if you are looking to group up early and you don`t have to play around Reverse Polarity as much.",
          aether_lens:
            "A core item that Blink Dagger, Horn Toss and Skewer can make a great use of.",
          aghanims_shard:
            "A core item that allows you to reposition an enemy with ease, followed up by Skewer.",
          force_staff:
            "Extends the range from where you can start your sequence resulting in Reverse Polarity.",
          black_king_bar:
            "Can be helpful against silences and debuffs that prevent you from blinking or using Reverse Polarity.",
          refresher: "A core item that makes you a huge threat in late game.",
          invis_sword: "Allows you to get off your combo easier.",
          lotus_orb: "For reflecting, dispelling and armor.",
        },
        ability_tooltips: {
          magnataur_skewer:
            "You can skill this spell on level 2 if you see yourself being able to pull off a Shockwave into Skewer combo.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1641970156,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2716646936",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "magnataur_shockwave", // 1
          "magnataur_empower", // 2
          "magnataur_empower", // 3
          "magnataur_skewer", // 4
          "magnataur_empower", // 5
          "magnataur_reverse_polarity", // 6
          "magnataur_empower", // 7
          "magnataur_shockwave", // 8
          "magnataur_shockwave", // 9
          "special_bonus_unique_magnus_4", // 10
          "magnataur_shockwave", // 11
          "magnataur_reverse_polarity", // 12
          "magnataur_skewer", // 13
          "magnataur_skewer", // 14
          "special_bonus_strength_12", // 15
          "magnataur_skewer", // 16
          "special_bonus_attributes", // 17
          "magnataur_reverse_polarity", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_magnus_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_magnus_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "faerie_fire",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["bottle", "power_treads", "magic_wand", "bracer"],
          mid_game: ["echo_sabre", "blink", "black_king_bar", "orchid"],
          late_game: [
            "bloodthorn",
            "assault",
            "greater_crit",
            "satanic",
            "overwhelming_blink",
            "moon_shard",
          ],
          situational: ["aghanims_shard", "sphere", "silver_edge"],
          core: [
            "bottle",
            "power_treads",
            "echo_sabre",
            "blink",
            "black_king_bar",
            "greater_crit",
            "orchid",
            "bloodthorn",
          ],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "quicksilver_amulet",
            "misericorde",
            "elven_tunic",
            "titan_sliver",
            "the_leveller",
            "penta_edged_sword",
            "pirate_hat",
            "desolator_2",
          ],
        },
        ability_tooltips: {
          magnataur_skewer:
            "You can skill this spell on level 2 if you see yourself being able to pull off a Shockwave into Skewer combo.",
        },
        item_tooltips: {
          power_treads:
            "A core boots upgrade that improves your farming speed by increasing attack speed and saving you some mana through toggling.",
          echo_sabre:
            "A core item that grants you burst and improves your farming speed. Can be disassembled. Ogre Axe can be used for Black King Bar and Oblivion Staff for Mage Slayer if you choose to go for Bloodthorn. Not necessary to disassemble.",
          black_king_bar:
            "A core item that allows you to deliver the damage while being in the middle of the fight.",
          aghanims_shard:
            "Allows you to reposition an enemy with ease, followed up by Skewer.",
          orchid:
            "A core item that allows you to kill-off heroes without even needing to Reverse Polarity. It gives you great stats and covers your mana problems.",
          bloodthorn:
            "A core item that allows you to burst heroes while they are stunned by Reverse Polarity. It silences, makes every attack crit and grants true strike on affected opponent.",
          sphere: "Against powerful single-target disables and debuffs.",
          silver_edge:
            "Allows you to get off your combo easier, adds to the burst and applies break.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1641970169,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2716647043",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "magnataur_shockwave", // 1
          "magnataur_skewer", // 2
          "magnataur_empower", // 3
          "magnataur_empower", // 4
          "magnataur_empower", // 5
          "magnataur_reverse_polarity", // 6
          "magnataur_empower", // 7
          "magnataur_shockwave", // 8
          "magnataur_shockwave", // 9
          "special_bonus_unique_magnus_4", // 10
          "magnataur_shockwave", // 11
          "magnataur_reverse_polarity", // 12
          "magnataur_skewer", // 13
          "magnataur_skewer", // 14
          "magnataur_skewer", // 15
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
            "tango",
            "boots",
            "flask",
            "enchanted_mango",
            "faerie_fire",
            "wind_lace",
            "ward_sentry",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["arcane_boots", "magic_wand"],
          mid_game: [
            "blink",
            "aghanims_shard",
            "aether_lens",
            "force_staff",
            "ghost",
          ],
          late_game: ["refresher", "invis_sword"],
          situational: ["cyclone", "lotus_orb"],
          core: [
            "arcane_boots",
            "blink",
            "aghanims_shard",
            "aether_lens",
            "refresher",
          ],
          neutral: [
            "pogo_stick",
            "arcane_ring",
            "essence_ring",
            "bullwhip",
            "spider_legs",
            "psychic_headband",
            "timeless_relic",
            "trickster_cloak",
            "fallen_sky",
            "seer_stone",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock the pull camp.",
          arcane_boots:
            "A core boots upgrade that helps with mana sustain. Can be disassembled for Aether Lens later on. You can get Tranquil Boots after disassembling.",
          aghanims_shard:
            "A core item that allows you to reposition an enemy with ease, followed up by Skewer.",
          aether_lens:
            "A core item that Blink Dagger, Horn Toss and Skewer can make a great use of.",
          force_staff:
            "Extends the range from where you can start your sequence resulting in Reverse Polarity or save a teammate.",
          refresher: "A core item that makes you a huge threat in late game.",
          invis_sword: "Allows you to get off your combo easier.",
          lotus_orb: "For reflecting, dispelling and armor.",
          cyclone: "Often used as a dispel, setup or disangage.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      blink:
        "A core item that allows you to get Reverse Polarity off and to Skewer an enemy.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Magnus often uses a lot of spells to contest the lane.",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [{ item: "ward_sentry", info: "To block camps." }],
        core: [],
      },
      mid_game: {
        all: [],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          {
            item: "aeon_disk",
            info: "As you get ultied by Magnus, you buy yourself time to throw your spells and use your items.",
          },
          { item: "ethereal_blade" },
          {
            item: "wind_waker",
            info: "To save an ally stunned by Reverse Polarity.",
          },
        ],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Marci: {
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804165,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959380",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "marci_grapple", // 1	equals to rebound
          "marci_companion_run", // 2	equals to dispose
          "marci_companion_run", // 3
          "marci_grapple", // 4
          "marci_guardian", // 5
          "marci_unleash", // 6
          "marci_companion_run", // 7
          "marci_companion_run", // 8
          "marci_grapple", // 9
          "marci_grapple", // 10
          "special_bonus_armor_5", // 11
          "marci_unleash", // 12
          "marci_guardian", // 13
          "marci_guardian", // 14
          "marci_guardian", // 15
          "special_bonus_unique_marci_grapple_stun_duration", // 16
          "special_bonus_attributes", // 17
          "marci_unleash", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_marci_guardian_lifesteal", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_marci_guardian_magic_immune", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "enchanted_mango",
            "faerie_fire",
            "branches",
            "ward_observer",
            "ward_sentry",
            "orb_of_venom",
            "magic_stick",
          ],
          early_game: [
            "urn_of_shadows",
            "infused_raindrop",
            "arcane_boots",
            "magic_wand",
            "orb_of_corrosion",
            "medallion_of_courage",
          ],
          mid_game: [
            "blink",
            "aether_lens",
            "solar_crest",
            "ghost",
            "force_staff",
          ],
          late_game: ["octarine_core", "basher", "vladmir"],
          situational: ["infused_raindrop", "spirit_vessel", "heavens_halberd"],
          core: ["arcane_boots", "blink", "aether_lens"],
          neutral: [
            "keen_optic",
            "pogo_stick",
            "essence_ring",
            "bullwhip",
            "psychic_headband",
            "spider_legs",
            "spy_gadget",
            "spell_prism",
            "seer_stone",
            "book_of_shadows",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock the pull camp.",
          orb_of_venom: "If you can pressure on the lane.",
          arcane_boots:
            "A core item that helps with mana sustain. Can be disassembled and Energy Booster used for Aether Lens. Get Tranquil Boots afterwards.",
          spirit_vessel: "Against heavy-healing lineups.",
          aether_lens:
            "A core item that Dispose and Rebound benefit the most from.",
          solar_crest:
            "Goes well with Sidekick buff on one of your right-clicking cores.",
          heavens_halberd: "Especially good against ranged right-clickers.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1641970186,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2716647152",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "marci_grapple", // 1	equals to rebound
          "marci_companion_run", // 2	equals to dispose
          "marci_companion_run", // 3
          "marci_guardian", // 4
          "marci_companion_run", // 5
          "marci_unleash", // 6
          "marci_companion_run", // 7
          "marci_guardian", // 8
          "marci_guardian", // 9
          "marci_guardian", // 10
          "special_bonus_armor_5", // 11
          "marci_unleash", // 12
          "marci_grapple", // 13
          "marci_grapple", // 14
          "marci_grapple", // 15
          "special_bonus_unique_marci_grapple_stun_duration", // 16
          "special_bonus_attributes", // 17
          "marci_unleash", // 18
          "special_bonus_attributes", // 19
          "special_bonus_movement_speed_30", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_marci_guardian_magic_immune", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "faerie_fire",
            "branches",
            "magic_stick",
          ],
          early_game: [
            "phase_boots",
            "soul_ring",
            "magic_wand",
            "orb_of_corrosion",
            "bracer",
          ],
          mid_game: [
            "blink",
            "black_king_bar",
            "basher",
            "lesser_crit",
            "armlet",
          ],
          late_game: [
            "greater_crit",
            "abyssal_blade",
            "overwhelming_blink",
            "satanic",
          ],
          situational: ["infused_raindrop", "monkey_king_bar", "nullifier"],
          core: [
            "phase_boots",
            "soul_ring",
            "blink",
            "black_king_bar",
            "basher",
          ],
          neutral: [
            "broom_handle",
            "unstable_wand",
            "misericorde",
            "vambrace",
            "paladin_sword",
            "mind_breaker",
            "penta_edged_sword",
            "spell_prism",
            "desolator_2",
            "fallen_sky",
          ],
        },
        item_tooltips: {
          phase_boots:
            "A core boots upgrade that allows you to stay on target and with damage increase combines well with Unleash.",
          soul_ring: "A core item that helps witn mana sutain.",
          black_king_bar:
            "A core item that allows you to deliver the damage while being in the middle of the fight.",
          basher:
            "A core item that goes well with Unleash and makes you less kitable during it.",
          monkey_king_bar:
            "Against evasion and miss chance. Procs often during Unleash.",
          nullifier:
            "To dispel defensive items and spells from opponents that prevent you from hitting them.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_corrosion: "If you can pressure on the lane.",
      infused_raindrop: "Great against magical burst.",
      blink: "A core item for instant gap-close, followed up with Dispose.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          { item: "infused_raindrop" },
          { item: "wind_lace", info: "To keep the distance from Marci" },
          { item: "boots", info: "To keep the distance from Marci" },
          {
            item: "urn_of_shadows",
            info: "To build Spirit Vessel against Marci`s Sidekick",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "blight_stone" },
          {
            item: "cloak",
            info: "Marci is heavy on magical damage early on and Cloak will negate 15% of it",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [
          { item: "ring_of_health" },
          { item: "vanguard" },
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "cyclone", info: "To disengage and dispel Sidekick" },
          { item: "blink", info: "To disjoint Rebound" },
          { item: "rod_of_atos" },
          { item: "solar_crest" },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "heavens_halberd" },
          { item: "crimson_guard" },
          { item: "hurricane_pike" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
          {
            item: "invis_sword",
            info: "To disengage from Rebound and Unleash",
          },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "aeon_disk" },
          { item: "ethereal_blade" },
          {
            item: "wind_waker",
            info: "To save an ally being focused by Marci",
          },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "nullifier", info: "To dispel Sidekick" },
          { item: "butterfly" },
          { item: "assault" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "skadi", info: "To reduce healing" },
          {
            item: "shivas_guard",
            info: "To reduce healing and for some armor",
          },
        ],
      },
    },
  },

  Mars: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804174,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959474",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
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
          "mars_bulwark", // 10
          "mars_bulwark", // 11
          "mars_arena_of_blood", // 12
          "mars_bulwark", // 13
          "mars_bulwark", // 14
          "special_bonus_unique_mars_rebuke_slow", // 15
          "special_bonus_unique_mars_rebuke_cooldown", // 16
          "special_bonus_attributes", // 17
          "mars_arena_of_blood", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_mars_spear_stun_duration", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_mars_gods_rebuke_extra_crit", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "branches",
            "ring_of_protection",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: [
            "phase_boots",
            "soul_ring",
            "helm_of_iron_will",
            "ring_of_health",
            "infused_raindrop",
            "magic_wand",
            "bracer",
          ],
          mid_game: [
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "armlet",
            "desolator",
            "hood_of_defiance",
          ],
          late_game: [
            "refresher",
            "overwhelming_blink",
            "assault",
            "satanic",
            "greater_crit",
          ],
          situational: ["heavens_halberd", "lotus_orb", "cyclone"],
          core: ["phase_boots", "soul_ring", "blink", "black_king_bar"],
          neutral: [
            "pogo_stick",
            "possessed_mask",
            "dragon_scale",
            "vambrace",
            "cloak_of_flames",
            "black_powder_bag",
            "trickster_cloak",
            "titan_sliver",
            "ascetic_cap",
            "fallen_sky",
            "force_field",
            "desolator_2",
          ],
        },
      },
    ],
    ability_tooltips: {
      mars_bulwark:
        "You can take a point in this spell early into the laning stage if you are being harassed a lot by right-clicks especially ranged heroes.",
      special_bonus_unique_mars_rebuke_slow:
        "Skip this talent until you are level 16, you can take the level 15 talent BEFORE taking this one.",
      special_bonus_unique_mars_gods_rebuke_extra_crit:
        "You can choose this talent over the other if you have build into high dmg items such as Desolator and Satanic. Pick the other if you are playing a utility Mars.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      ring_of_health:
        "Provides very good lane sustain and you can later on upgrade it to Hood or Refresher. You can opt not to upgrade before getting your Blink Dagger",
      helm_of_iron_will:
        "You can rush this item for sustain on the lane. Upgrading it to Armlet is fine but usually you should make your way to Blink Dagger first. You can opt not to upgrade it at all.",
      phase_boots:
        "A core boots upgrade that allows you to gap-close quicker and covers armor problems that Mars has.",
      soul_ring: "A core item that helps with mana sustain.",
      cyclone:
        "It can be a particularly good purchase against elusive heroes to setup the Arena of Blood into Spear of Mars combo.",
      black_king_bar:
        "A core item that allows you to stay alive and get spells off while in the middle of the fight. Bullwark reduces a lot of right-click damage and BKB covers most of the rest.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      aghanims_shard:
        "Great against illusion or clone based heroes. You are likely to pin the real hero along with the illusion or clone.",
      lotus_orb: "For reflecting, dispelling and provides good armor.",
      desolator:
        "Very good dmg item that synergizes well with God`s Rebuke. You can get damage output items instead of utility items when you are ahead in the game. e.g 5/0 ",
      satanic:
        "Provides very good stats and using it with God`s Rebuke will result into very high HP lifesteals",
      refresher:
        "One of the best items you can get on Mars for crowd control. After you have used your Black King Bar, Arena and Spear you can refresh to use them again",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "blight_stone",
            info: "Mars has relatively low armor early and you can exploit that as a weakness",
          },
          { item: "lifesteal", info: "For sustaining on the lane" },
          {
            item: "wind_lace",
            info: "Makes harder for Mars to hit you with Spear of Mars and to catch you in the Arena of Blood",
          },
          {
            item: "boots",
            info: "Makes harder for Mars to hit you with Spear of Mars and to catch you in the Arena of Blood",
          },
          {
            item: "infused_raindrop",
            info: " Mars uses Spear in order to secure creeps whilst damaging you ",
          },
          {
            item: "cloak",
            info: "Mars is heavy on magical damage and Cloak will negate 15% of it",
          },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          {
            item: "black_king_bar",
            info: "Will get you out of Arena and Spear setup or let you fight inside it",
          },
          {
            item: "silver_edge",
            info: " Breaking Mars will let you bypass the Bulwark and let you kill Mars easier",
          },
          {
            item: "desolator",
            info: "Mars has relatively low armor and low armor gain which desolator will help you punish even more",
          },
        ],
      },
      late_game: {
        all: [],
        support: [
          {
            item: "black_king_bar",
            info: "Will get you out of Arena or use your abilities inside it",
          },
        ],
        core: [
          {
            item: "bloodthorn",
            info: "Provides silence, spell damage debuff and high burst against Mars",
          },
          {
            item: "wind_waker",
            info: "Will let you cyclone out of the Arena and disengage",
          },
          { item: "assault" },
        ],
      },
    },
  },

  Medusa: {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804184,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959648",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "medusa_mystic_snake", // 1
          "medusa_mana_shield", // 2
          "medusa_mystic_snake", // 3
          "medusa_split_shot", // 4
          "medusa_mystic_snake", // 5
          "medusa_split_shot", // 6
          `medusa_split_shot`, // 7
          "medusa_split_shot", // 8
          `medusa_mystic_snake`, // 9
          `special_bonus_attack_speed_20`, // 10
          "medusa_stone_gaze", // 11
          "medusa_mana_shield", // 12
          "medusa_mana_shield", // 13
          "medusa_mana_shield", // 14
          `special_bonus_unique_medusa_2`, // 15
          "medusa_stone_gaze", // 16
          "special_bonus_attributes", // 17
          "medusa_stone_gaze", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_medusa_3`, // 20
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
            "slippers",
            `branches`,
            `branches`,
            `circlet`,
          ],
          early_game: [
            "power_treads",
            "magic_wand",
            `wraith_band`,
            `dragon_lance`,
          ],
          mid_game: [`manta`, `skadi`, `lesser_crit`, `satanic`],
          late_game: [
            "greater_crit",
            `ultimate_scepter`,
            `aghanims_shard`,
            `butterfly`,
            `swift_blink`,
            `rapier`,
          ],
          situational: [
            `mask_of_madness`,
            `sange_and_yasha`,
            `black_king_bar`,
            `blink`,
            "hurricane_pike",
            `sphere`,
            "monkey_king_bar",
            `silver_edge`,
            `travel_boots`,
          ],
          core: [
            `power_treads`,
            `dragon_lance`,
            `manta`,
            `skadi`,
            `greater_crit`,
            `satanic`,
          ],
          neutral: [
            "possessed_mask",
            `unstable_wand`,
            `broom_handle`,
            "grove_bow",
            `quicksilver_amulet`,
            `ring_of_aquila`,
            `misericorde`,
            "elven_tunic",
            `titan_sliver`,
            `paladin_sword`,
            `spider_legs`,
            "the_leveller",
            `ninja_gear`,
            `flicker`,
            "desolator_2",
            `force_boots`,
            `mirror_shield`,
            `apex`,
          ],
        },
      },
    ],
    ability_tooltips: {
      medusa_stone_gaze:
        "You can skill this spell(or keep a spell point) at level 6 if you are still laning or suspect to be ganked.",
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace slippers and one branch for it.`,
      power_treads:
        "A core boots upgrade that provides attack speed increase and mana savings through toggling.",
      mask_of_madness: `A situational farming item that can be disassembled later on for Satanic and Butterfly.`,
      manta:
        "A core item that provides you with a bit of everything. Manta illusions are great for clearing out an extra creepwave that you otherwise wouldn`t be able to with your hero.",
      dragon_lance: `Improves your attack range. Can be disassembled for Black King Bar or Aghanims Scepter.`,
      skadi:
        "A core item that improves your effective hp significantly, deals with kiting and reduces healing from opponents.",
      aghanims_shard:
        "Goes well with Aghanim`s Scepter and Mysic Snake talents.",
      hurricane_pike: "To disengage from heroes like Slark and Troll.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      ultimate_scepter:
        "For extra control and damage amplification. Goes well with Aghanim`s Shard.",
      swift_blink:
        "To jump in the middle of the fight with Split Shot and Stone Gaze on.",
      monkey_king_bar: "Against evasion.",
      silver_edge: "For break and extra mobility.",
    },
    combo: [
      `medusa_split_shot`,
      `blink`,
      `medusa_stone_gaze`,
      `medusa_mystic_snake`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "wind_lace", info: "To avoid Mysic Snake bounces" },
          { item: "boots", info: "To avoid Mysic Snake bounces" },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "diffusal_blade" },
          { item: "heavens_halberd" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  Meepo: {
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804195,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959764",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "meepo_poof", // 1
          "meepo_ransack", // 2
          "meepo_poof", // 3
          "meepo_divided_we_stand", // 4
          "meepo_poof", // 5
          "meepo_ransack", // 6
          "meepo_poof", // 7
          "meepo_earthbind", // 8
          "meepo_earthbind", // 9
          "special_bonus_attack_base_damage_20", // 10
          "meepo_divided_we_stand", // 11
          "meepo_earthbind", // 12
          "meepo_earthbind", // 13
          "meepo_ransack", // 14
          "special_bonus_unique_meepo_2", // 15
          "meepo_ransack", // 16
          "special_bonus_attributes", // 17
          "meepo_divided_we_stand", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_meepo_3", // 20
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
            "branches",
            "ward_observer",
          ],
          early_game: ["power_treads", "dragon_lance", "wraith_band"],
          mid_game: ["blink", "ethereal_blade", "skadi", "manta"],
          late_game: ["sheepstick", "heart", "overwhelming_blink"],
          situational: ["invis_sword", "aghanims_shard", "ultimate_scepter"],
          core: [
            "power_treads",
            "dragon_lance",
            "blink",
            "ethereal_blade",
            "skadi",
            "sheepstick",
          ],
          neutral: [
            "unstable_wand",
            "possessed_mask",
            "vambrace",
            "ring_of_aquila",
            "titan_sliver",
            "cloak_of_flames",
            "ninja_gear",
            "the_leveller",
            "apex",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      power_treads: "A core boots upgrade. Meepo loves attribute stats.",
      dragon_lance:
        "A core item that provides a lot of attributes that Meepo wants for fair price.",
      blink: "A core item for gap-close followed by the burst from Poofs.",
      ethereal_blade:
        "A core item that provides tons of attributes and does a burst of magical damage along with Poofs.",
      skadi: "A core item that provides Meepo with a lot of useful stats.",
      sheepstick: "A core item that allows you to solo most of the heroes.",
      invis_sword:
        "An that allows you to pick-off heroes, especially the splitpushers.",
      aghanims_shard:
        "For extra mobility. In most cases you will get it from Roshan.",
      ultimate_scepter:
        "As a save and dispel. In most cases you will get it from Roshan.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "crimson_guard", info: "To burst one of the clones" },
        ],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "force_staff" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "hurricane_pike" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Earthbind" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "mjollnir" },
          { item: "abyssal_blade" },
          { item: "bloodthorn", info: "To burst one of his clones" },
          { item: "butterfly" },
          { item: "assault" },
        ],
      },
    },
  },

  Mirana: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804207,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699959872",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
            "tango",
            "circlet",
            "flask",
            "faerie_fire",
            "ring_of_protection",
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            "urn_of_shadows",
            `boots`,
            "magic_wand",
            `infused_raindrop`,
          ],
          mid_game: ["cyclone", "force_staff", `spirit_vessel`],
          late_game: [
            "ethereal_blade",
            "ultimate_scepter",
            "sheepstick",
            "octarine_core",
          ],
          situational: [
            "spirit_vessel",
            `arcane_boots`,
            `heavens_halberd`,
            `pipe`,
            `orchid`,
            `blink`,
            `gungir`,
            "lotus_orb",
            `wind_waker`,
            `aghanims_shard`,
            `travel_boots`,
          ],
          core: [`boots`, `cyclone`, `spirit_vessel`, `force_staff`],
          neutral: [
            "arcane_ring",
            `trusty_shovel`,
            "unstable_wand",
            "philosophers_stone",
            "bullwhip",
            `dragon_scale`,
            `grove_bow`,
            "quickening_charm",
            "enchanted_quiver",
            "spell_prism",
            "timeless_relic",
            `ninja_gear`,
            "book_of_shadows",
            "force_field",
            `demonicon`,
          ],
        },
      },
    ],
    ability_tooltips: {
      mirana_starfall:
        "You can keep a spell point at level 2 and skill situationally Starfall if the kill opportunity presents itself.",
    },
    item_tooltips: {
      ward_sentry:
        "Get two sentries with the bounty rune gold to block or unblock the pull camp.",
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace the ring of protection and faerie fire for it",
      infused_raindrop: "Against magical burst.",
      urn_of_shadows:
        "A core item that provides you with good stats. Try to rush it to have a good lane and then snowball off some kills.",
      arcane_boots: `You can make early Arcane Boots if you plan to get Guardian Greaves or Lotus Orb at some point in the game.`,
      spirit_vessel: "Against heavy-healing lineup.",
      cyclone:
        "A core item that allows you to setup Sacred Arrow. Goes well with Blink Dagger.",
      blink:
        "A core item that goes well with Eul`s Scepter to setup kills. Blink also allows you to do a double Starstorm.",
      lotus_orb: "For reflect, dispel and armor.",
    },
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
        all: [
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "infused_raindrop",
            info: `Prevents mirana from bursting you with spells`,
          },
          {
            item: "cloak",
            info: "Mirana is heavy on magical damage early on and Cloak will negate 15% of it",
          },
        ],
        support: [
          { item: "ward_observer", info: "To spot arrows" },
          {
            item: "ward_sentry",
            info: "Mirana`s ultimate Moonlight Shadow makes her and her allies become invisible",
          },
          { item: "dust" },
        ],
        core: [],
      },
      mid_game: {
        all: [],
        support: [
          { item: "SentryDust" },
          { item: "force_staff" },
          { item: "glimmer_cape" },
        ],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "SentryDustGem" }, { item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "butterfly", info: "Against a core right-clicking Mirana" },
          { item: "assault", info: "Against a core right-clicking Mirana" },
        ],
      },
    },
  },

  "Monkey King": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640804218,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960030",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "monkey_king_boundless_strike", // 1
          "monkey_king_jingu_mastery", // 2
          "monkey_king_jingu_mastery", // 3
          "monkey_king_tree_dance", // 4
          "monkey_king_tree_dance", // 5
          "monkey_king_tree_dance", // 6
          "monkey_king_tree_dance", // 7
          "monkey_king_boundless_strike", // 8
          "monkey_king_boundless_strike", // 9
          "monkey_king_boundless_strike", // 10
          "monkey_king_jingu_mastery", // 11
          "monkey_king_wukongs_command", // 12
          "monkey_king_jingu_mastery", // 13
          "special_bonus_unique_monkey_king_9", // 14
          "special_bonus_unique_monkey_king_2", // 15
          "monkey_king_wukongs_command", // 16
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
            "orb_of_venom",
            "faerie_fire",
            "slippers",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "orb_of_corrosion",
            "power_treads",
            "phase_boots",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: [
            "echo_sabre",
            "diffusal_blade",
            "black_king_bar",
            "skadi",
            "basher",
            "desolator",
            "maelstrom",
          ],
          late_game: [
            "refresher",
            "abyssal_blade",
            "mjollnir",
            "satanic",
            "ultimate_scepter",
          ],
          situational: [
            "infused_raindrop",
            "aghanims_shard",
            "blink",
            "heavens_halberd",
            "silver_edge",
            "assault",
            "monkey_king_bar",
            "butterfly",
            "nullifier",
          ],
          core: [
            "orb_of_corrosion",
            "echo_sabre",
            "black_king_bar",
            "skadi",
            "basher",
          ],
          neutral: [
            "arcane_ring",
            "broom_handle",
            "misericorde",
            "quicksilver_amulet",
            "ring_of_aquila",
            "mind_breaker",
            "paladin_sword",
            "elven_tunic",
            "penta_edged_sword",
            "the_leveller",
            "desolator_2",
            "ex_machina",
          ],
        },
        ability_tooltips: {
          monkey_king_jingu_mastery:
            "You can skill this spell on level 1 if you have an easy time of getting stacks up. Depending on the match-up you invest more or less points in this spell. This spell doesn`t help you farm in any way though.",
          monkey_king_wukongs_command:
            "You can put a point in this spell earlier than suggested if you are grouping and fighting a lot early.",
          special_bonus_unique_monkey_king_7:
            "You can consider taking this talent over the suggested one if you feel like you are getting splitpushed or having trouble catching a hero.",
        },
        item_tooltips: {
          orb_of_venom:
            "Start with it if you can get Jingu stacks easily against double melee on the sidelane e.g Pudge and Underlord or e.g Against Kunkka mid.",
          echo_sabre:
            "A core item that helps with mana sustain and allows you to build up Jingu stacks quikly. Can be disassembled.",
          diffusal_blade: "A good stats item that you can consider buying against mana dependent heroes e.g Wraith King, Medusa, Bristleback. Synergizes with Wukongs Command.",
          black_king_bar:
            "A core item that allows you to stand your ground and fight. Wukong`s command makes you resistant against physical damage and Black King Bar sorts out most of the other sources of damage.",
          skadi:
            "A core item which works well with Wukong`s command. Especially good against immobile tanky and ranged heroes.",
          desolator:
            "Boundless Strike and Wukongs Command synergize very well with this item. Especially good against low armor heroes.",
          basher:
            "A core item that allows you to lock down the opponent you are focusing.",
          blink: "Allows you to find a nice spot to unleash Wukong`s Command.",
          silver_edge: "For break effect and to reposition.",
          refresher: "An exceptionally good item that lets you use your skill set and item set one more time. ",
          monkey_king_bar: "Against evasion and miss chance.",
          nullifier:
            "To dispel defensive spells and items from the opponents that prevent you from hitting them.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1642101493,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2718158708",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "monkey_king_tree_dance", // 1
          "monkey_king_boundless_strike", // 2
          "monkey_king_tree_dance", // 3
          "monkey_king_boundless_strike", // 4
          "monkey_king_tree_dance", // 5
          "monkey_king_boundless_strike", // 6
          "monkey_king_tree_dance", // 7
          "monkey_king_boundless_strike", // 8
          "monkey_king_wukongs_command", // 9
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
            "flask",
            "faerie_fire",
            "branches",
            "enchanted_mango",
            "ward_sentry",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "orb_of_corrosion",
            "boots",
            "magic_wand",
            "urn_of_shadows",
          ],
          mid_game: [
            "orchid",
            "solar_crest",
            "ghost",
            "cyclone",
            "rod_of_atos",
          ],
          late_game: ["skadi", "basher", "sheepstick"],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "lotus_orb",
            "black_king_bar",
            "mage_slayer",
          ],
          core: ["orb_of_corrosion", "orchid", "solar_crest"],
          neutral: [
            "arcane_ring",
            "unstable_wand",
            "bullwhip",
            "ring_of_aquila",
            "black_powder_bag",
            "quickening_charm",
            "penta_edged_sword",
            "heavy_blade",
            "desolator_2",
            "book_of_shadows",
          ],
        },
        ability_tooltips: {
          monkey_king_jingu_mastery:
            "You can skill this spell on level 1 if you have an easy time of getting stacks up. Don`t put too many points(more than 2) in it. This spell is the least useful for you as support later on.",
        },
        item_tooltips: {
          orb_of_venom: "Allows you to stay on top of the opponents.",
          boots:
            "You can skip the boots entirely as you mainly use the trees to gank and setup kills.",
          spirit_vessel: "Against heavy-healing lineups.",
          orchid:
            "A core item that adds another utility to your hero. Helps with mana issues. You can setup kills with it.",
          solar_crest:
            "A core item to buff one of your right-clicking cores or debuff the hero you are looking to burst as a team.",
          rod_of_atos:
            "A good item that provides a little bit of extra control. Synergizes well with all of Monkey Kings skill set.",
          mage_slayer:
            "Against heavy magical damage lineups. Your statues apply debuff as well.",
          lotus_orb: "For reflect, dispel and armor.",
          black_king_bar:
            "An item that allows you to stand your ground and fight. Wukong`s command makes you resistant against physical damage and Black King Bar sorts out most of the other sources of damage.",
        },
      },
    ],
    ability_tooltips: {
      monkey_king_wukongs_command:
        "You can put a point in this spell earlier than suggested if you are grouping and fighting a lot early.",
      monkey_king_mischief:
        "Use this spell as the game starts and transform into a courier which sets your movespeed to 380 and try killing some of the couriers that opponents send right outside of fountain. ",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_corrosion:
        "A core item that allows you to pressure early on and works well with Wukong`s Command later.",
      infused_raindrop: "On hero against magical burst.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "wind_lace", info: "To keep the distance from Monkey King" },
          { item: "boots", info: "To keep the distance from Monkey King" },
          { item: "quelling_blade", info: "To cut the trees he is on" },
          { item: "armor", info: "Buy armor items" },
          {
            item: "urn_of_shadows",
            info: "Continously does damage to him which prevents him to jump on a tree. Also builds into Spirit Vessel which is useful against his Jingu Mastery lifesteal.",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "cyclone" },
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from his abilities and provides armor against right-clicks, Boundless Strike and Wukong`s Command",
          },
        ],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "crimson_guard" },
          {
            item: "hurricane_pike",
            info: "As he uses the ulty you can potentially use this item to get him out of the circle and cancel it.",
          },
          { item: "silver_edge" },
          { item: "basher" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [],
        core: [
          { item: "assault" },
          {
            item: "radiance",
            info: "Provides you evasion and blind which helps against his physical attacks as well as continously doing dmg to him which prevents him to jump on trees.",
          },
          { item: "skadi" },
          { item: "shivas_guard" },
          { item: "abyssal_blade" },
          { item: "butterfly" },
          {
            item: "bloodthorn",
            info: "To burst this tanky hero while in Wukong`s Command",
          },
          { item: "nullifier", info: "Dispels Jingu Mastery buff" },
        ],
      },
    },
  },

  Morphling: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640804228,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960135",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "morphling_morph_agi", // 1
          "morphling_waveform", // 2
          "morphling_morph_agi", // 3
          "morphling_waveform", // 4
          "morphling_morph_agi", // 5
          "morphling_waveform", // 6
          "morphling_morph_agi", // 7
          "morphling_waveform", // 8
          "morphling_replicate", // 9
          "special_bonus_unique_morphling_1", // 10
          "morphling_adaptive_strike_agi", // 11
          "morphling_adaptive_strike_agi", // 12
          "morphling_adaptive_strike_agi", // 13
          "morphling_adaptive_strike_agi", // 14
          "special_bonus_unique_morphling_8", // 15
          "morphling_replicate", // 16
          "special_bonus_attributes", // 17
          "morphling_replicate", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_morphling_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_morphling_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "branches",
            "circlet",
            "slippers",
            "faerie_fire",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "bottle",
            "lifesteal",
            "power_treads",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: [
            "dragon_lance",
            "manta",
            "black_king_bar",
            "falcon_blade",
            "lesser_crit",
          ],
          late_game: ["skadi", "satanic", "butterfly", "greater_crit"],
          situational: [
            "bottle",
            "infused_raindrop",
            "sphere",
            "ultimate_scepter",
            "blink",
          ],
          core: ["lifesteal", "power_treads", "manta", "black_king_bar"],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "pupils_gift",
            "vambrace",
            "titan_sliver",
            "paladin_sword",
            "the_leveller",
            "ninja_gear",
            "ex_machina",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      morphling_adaptive_strike_agi:
        "You can put a point in this spell at level 2 if you have problems securing range creep lasthits.",
      morphling_replicate:
        "You can put a point in ultimate at level 6 if you can go for a kill. Otherwise skip it and max out Waveform.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      bottle: "If you are playing midlane Morphling.",
      lifesteal: "A core item that provides you with hp sustain.",
      infused_raindrop:
        "Especially useful if they have magical burst since you can get caught off-guard on low HP.",
      power_treads:
        "A core boots upgrade that speeds up your farm due to attack speed increase and mana savings through toggling.",
      manta:
        "A core item that provides you with mix of stats. Manta applies dispel on cast so it is good against Spirit Vessel - a common Morph counter. Using Manta illusions frequently will boost your farming speed.",
      sphere: "Great agaist powerful single-target disables and debuffs.",
      black_king_bar:
        "A core item that allows you to deliver the damage in the fights.",
      ultimate_scepter:
        "A situational item that helps you gain Status Resistance, Movement speed or Spell Amplification when used on an enemy hero.",
      blink:
        "To gap-close quickly and can be upgraded to Swift Blink down the road.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "infused_raindrop" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel against Attribute Shift(Strength Gain)",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "orchid" },
          {
            item: "diffusal_blade",
            info: "Morphling is a very mana dependent hero.",
          },
          { item: "heavens_halberd" },
          { item: "black_king_bar" },
          { item: "mage_slayer" },
          { item: "basher" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          {
            item: "shivas_guard",
            info: "Reduces Morphlings healing through Attribute Shift.",
          },
          { item: "sphere" },
          { item: "aeon_disk" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "skadi",
            info: "One of the best items against Morphling as it reduces healing, lifesteal and slows him by 50%.",
          },
          { item: "abyssal_blade" },
          { item: "butterfly" },
          {
            item: "bloodthorn",
            info: "To burst this high armor hero and while it is morphing into strength",
          },
        ],
      },
    },
  },

  "Naga Siren": {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804237,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960208",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "naga_siren_mirror_image", // 1
          "naga_siren_rip_tide", // 2
          "naga_siren_mirror_image", // 3
          "naga_siren_rip_tide", // 4
          "naga_siren_mirror_image", // 5
          "naga_siren_rip_tide", // 6
          "naga_siren_mirror_image", // 7
          "naga_siren_rip_tide", // 8
          "naga_siren_song_of_the_siren", // 9
          "special_bonus_movement_speed_20", // 10
          "naga_siren_ensnare", // 11
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
            "slippers",
            "circlet",
            "magic_stick",
          ],
          early_game: ["power_treads", "magic_wand"],
          mid_game: ["manta", "skadi", "ultimate_scepter", "orchid"],
          late_game: ["bloodthorn", "heart", "butterfly", "sheepstick"],
          situational: [
            "infused_raindrop",
            "diffusal_blade",
            "black_king_bar",
            "silver_edge",
            "blink",
            "aghanims_shard",
            "nullifier",
          ],
          core: ["power_treads", "manta", "skadi", "ultimate_scepter"],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "vambrace",
            "pupils_gift",
            "elven_tunic",
            "titan_sliver",
            "the_leveller",
            "ninja_gear",
            "apex",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      naga_siren_ensnare:
        "You can skill this spell earlier than suggested if you are able to setup a kill.",
      naga_siren_song_of_the_siren:
        "You can skill this spell earlier than suggested or keep a skill point if you feel like you might be in danger.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade. Naga really loves the attribute stats. Toggling the item can save you some mana as well.",
      manta:
        "A core item that provides you with a mix of stats. Rip Tide works on Manta illusions as well.",
      diffusal_blade:
        "Really good against Medusa and WK but also other heroes with small mana pool. Mana burn works on illusions as well.",
      skadi: "A core item that provides you with bunch of attribute stats.",
      orchid:
        "Allows you to pick-off heroes. Illusion benefit from attack speed as well. It should be upgraded to Bloodthorn down the road.",
      ultimate_scepter:
        "A core item for more control including spell-immune heroes.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      silver_edge:
        "For break effect, burst and to reposition quickly. Illusions crit as well.",
      blink: "To gap-close quickly.",
      aghanims_shard:
        "Allows you not to just reset the fight with Song of the Siren but also heal allies for a decent amount. You will acquire this buff from Roshan most of the time.",
      nullifier:
        "To dispel defensive spells and items that prevent you from right-clicking the opponents.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [{ item: "armor", info: "Buy armor items" }],
        support: [
          {
            item: "ward_sentry",
            info: "To block the camps in the area she is farming once she leaves the lane",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [{ item: "dagon", info: "Instantly kills illusions" }],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "maelstrom" },
          { item: "bfury" },
          {
            item: "black_king_bar",
            info: "To be able to fight during Song of the Siren",
          },
          { item: "gungir" },
          { item: "travel_boots" },
          { item: "manta", info: "To dispel Ensnare" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [
          {
            item: "black_king_bar",
            info: "To be able to fight during Song of the Siren",
          },
          { item: "travel_boots" },
        ],
        core: [
          { item: "mjollnir" },
          { item: "shivas_guard" },
          { item: "radiance" },
          { item: "abyssal_blade" },
          { item: "butterfly" },
          { item: "bloodthorn", info: "To burst this tanky high armor hero" },
          {
            item: "overwhelming_blink",
            info: "For AoE damage against illusions",
          },
          {
            item: "satanic",
            info: "To dispel Ensnare and to lifesteal off of her or her illusions",
          },
        ],
      },
    },
  },

  "Nature's Prophet": {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804255,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960338",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "furion_force_of_nature", // 1
          "furion_teleportation", // 2
          "furion_force_of_nature", // 3
          "furion_sprout", // 4
          "furion_force_of_nature", // 5
          "furion_wrath_of_nature", // 6
          "furion_force_of_nature", // 7
          "furion_teleportation", // 8
          "furion_teleportation", // 9
          "special_bonus_attack_damage_20", // 10
          "furion_teleportation", // 11
          "furion_wrath_of_nature", // 12
          "furion_sprout", // 13
          "furion_sprout", // 14
          "special_bonus_attack_speed_25", // 15
          "furion_sprout", // 16
          "special_bonus_attributes", // 17
          "furion_wrath_of_nature", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_furion_4", // 20
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
            "branches",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: ["power_treads", "magic_wand"],
          mid_game: [
            "orchid",
            "black_king_bar",
            "aghanims_shard",
            "silver_edge",
            "witch_blade",
            "maelstrom",
            "gungir",
          ],
          late_game: [
            "satanic",
            "assault",
            "bloodthorn",
            "ultimate_scepter",
            "sheepstick",
            "mjollnir",
          ],
          situational: [
            "infused_raindrop",
            "ancient_janggo",
            "heavens_halberd",
            "monkey_king_bar",
            "hurricane_pike",
            "nullifier",
          ],
          core: [
            "power_treads",
            "orchid",
            "black_king_bar",
            "aghanims_shard",
            "silver_edge",
          ],
          neutral: [
            "unstable_wand",
            "broom_handle",
            "quicksilver_amulet",
            "grove_bow",
            "enchanted_quiver",
            "elven_tunic",
            "the_leveller",
            "ninja_gear",
            "desolator_2",
            "pirate_hat",
          ],
        },
        item_tooltips: {
          power_treads:
            "A core boots upgrade that provides you with good amount of attack speed.",
          orchid: "A core item that allows you to pick-off heroes.",
          maelstrom: "A farming item. Good against illusions.",
          ancient_janggo:
            "If you are fighting and grouping a lot early on. The buff works on summons.",
          black_king_bar:
            "A core item that allows you to stand your ground and right-click.",
          heavens_halberd: "Especially good against ranged right-clickers.",
          silver_edge:
            "A core item that provides you with burst, break effect and ability to reposition.",
          ultimate_scepter: "For extra control and to have lanes pushed out.",
          monkey_king_bar: "Against evasion and miss chance.",
          hurricane_pike: "To disengage from gap-closing opponents.",
          nullifier:
            "To dispel defensive spells and items that prevent you from right-clicking.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1642147989,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2718666197",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "furion_force_of_nature", // 1
          "furion_teleportation", // 2
          "furion_force_of_nature", // 3
          "furion_sprout", // 4
          "furion_force_of_nature", // 5
          "furion_wrath_of_nature", // 6
          "furion_force_of_nature", // 7
          "furion_teleportation", // 8
          "furion_teleportation", // 9
          "special_bonus_attack_damage_20", // 10
          "furion_teleportation", // 11
          "furion_wrath_of_nature", // 12
          "furion_sprout", // 13
          "furion_sprout", // 14
          "special_bonus_attack_speed_25", // 15
          "furion_sprout", // 16
          "special_bonus_attributes", // 17
          "furion_wrath_of_nature", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_furion_4", // 20
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
            "branches",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: ["power_treads", "magic_wand"],
          mid_game: [
            "orchid",
            "witch_blade",
            "black_king_bar",
            "aghanims_shard",
            "maelstrom",
            "silver_edge",
            "gungir",
          ],
          late_game: [
            "skadi",
            "satanic",
            "assault",
            "bloodthorn",
            "ultimate_scepter",
            "mjollnir",
          ],
          situational: [
            "infused_raindrop",
            "monkey_king_bar",
            "hurricane_pike",
            "nullifier",
          ],
          core: [
            "power_treads",
            "orchid",
            "black_king_bar",
            "aghanims_shard",
            "silver_edge",
          ],
          neutral: [
            "unstable_wand",
            "broom_handle",
            "quicksilver_amulet",
            "grove_bow",
            "enchanted_quiver",
            "elven_tunic",
            "the_leveller",
            "ninja_gear",
            "desolator_2",
            "pirate_hat",
          ],
        },
        item_tooltips: {
          power_treads:
            "A core boots upgrade that provides you with good amount of attack speed.",
          orchid: "A core item that allows you to pick-off heroes.",
          witch_blade:
            "Covers a lot of hero`s weaknesses like low armor, attack speed and burst.",
          maelstrom: "A farming item. Good against illusions.",
          black_king_bar:
            "A core item that allows you to stand your ground and right-click.",
          silver_edge:
            "A core item that provides you with burst, break effect and ability to reposition.",
          ultimate_scepter: "For extra control and to have lanes pushed out.",
          monkey_king_bar: "Against evasion and miss chance.",
          hurricane_pike: "To disengage from gap-closing opponents.",
          nullifier:
            "To dispel defensive spells and items that prevent you from right-clicking.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1642148003,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2718666233",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "furion_force_of_nature", // 1
          "furion_teleportation", // 2
          "furion_force_of_nature", // 3
          "furion_sprout", // 4
          "furion_force_of_nature", // 5
          "furion_wrath_of_nature", // 6
          "furion_force_of_nature", // 7
          "furion_teleportation", // 8
          "furion_teleportation", // 9
          "special_bonus_unique_furion_5", // 10
          "furion_teleportation", // 11
          "furion_wrath_of_nature", // 12
          "furion_sprout", // 13
          "furion_sprout", // 14
          "special_bonus_unique_furion_2", // 15
          "furion_sprout", // 16
          "special_bonus_attributes", // 17
          "furion_wrath_of_nature", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_furion_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_furion", // 25
        ],
        items: {
          starting: [
            "tango",
            "blight_stone",
            "branches",
            "faerie_fire",
            "boots",
            "ward_sentry",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "boots",
            "magic_wand",
            "medallion_of_courage",
            "urn_of_shadows",
          ],
          mid_game: [
            "ancient_janggo",
            "solar_crest",
            "aghanims_shard",
            "ultimate_scepter",
            "meteor_hammer",
            "ghost",
            "force_staff",
          ],
          late_game: ["assault", "sheepstick", "refresher"],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "heavens_halberd",
            "blink",
            "lotus_orb",
          ],
          core: [
            "ancient_janggo",
            "solar_crest",
            "aghanims_shard",
            "ultimate_scepter",
          ],
          neutral: [
            "arcane_ring",
            "trusty_shovel",
            "dragon_scale",
            "pupils_gift",
            "spider_legs",
            "quickening_charm",
            "spy_gadget",
            "spell_prism",
            "demonicon",
            "book_of_shadows",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock a pull camp.",
          ward_observer: "Consider placing courier sniping Observer Ward.",
          boots: "You can skip the boots entirely",
          spirit_vessel: "Against a heavy-healing lineup.",
          ancient_janggo:
            "A core item that bufs your team early on. The buff works on summons.",
          solar_crest:
            "A core item to buff a right-clicking core. Allows you to kill Roshan earlier.",
          heavens_halberd: "Especially good against ranged right-clickers.",
          ultimate_scepter:
            "A core item for extra control and to have lanes pushed out.",
          blink: "For gap-closing and safer split-push.",
          lotus_orb: "For reflect, dispel and some armor.",
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_furion_4:
        "Very strong talent if coupled with Aghanim`s Shard.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      aghanims_shard:
        "A core item that adds to the push but also serves as a `disable` in mid to late game when Quelling Blades are no longer around. Goes well with level 20 talent.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          { item: "quelling_blade", info: "To cut a tree in Sprout" },
          { item: "armor", info: "Buy armor items" },
          { item: "infused_raindrop", info: "For Wrath of Nature" },
        ],
        support: [],
        core: [
          { item: "ring_of_health" },
          { item: "phase_boots", info: "To phase through the summons block" },
        ],
      },
      mid_game: {
        all: [{ item: "quelling_blade" }],
        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "bfury" },
          {
            item: "heavens_halberd",
            info: "Against a core right-click build Nature`s Prophet",
          },
          { item: "basher" },
          { item: "travel_boots" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "travel_boots" }],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Necrophos: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804267,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960447",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
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
          "special_bonus_strength_8", // 11
          "necrolyte_reapers_scythe", // 12
          "necrolyte_sadist", // 13
          "necrolyte_sadist", // 14
          "special_bonus_unique_necrophos_4", // 15
          "necrolyte_sadist", // 16
          "special_bonus_attributes", // 17
          "necrolyte_reapers_scythe", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_necrophos_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_necrophos", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "circlet",
            "mantle",
            "magic_stick",
          ],
          early_game: ["null_talisman", "boots", "magic_wand", "power_treads"],
          mid_game: [
            "hood_of_defiance",
            "cyclone",
            "kaya_and_sange",
            "force_staff",
            "aghanims_shard",
            "blink",
            "sange",
            "mekansm",
            "eternal_shroud",
          ],
          late_game: ["shivas_guard", "sheepstick", "octarine_core"],
          situational: [
            "infused_raindrop",
            "pipe",
            "heavens_halberd",
            "ultimate_scepter",
            "lotus_orb",
          ],
          core: [
            "power_treads",
            "magic_wand",
            "hood_of_defiance",
            "cyclone",
            "kaya_and_sange",
            "aghanims_shard",
          ],
          neutral: [
            "unstable_wand",
            "pogo_stick",
            "essence_ring",
            "pupils_gift",
            "quickening_charm",
            "spider_legs",
            "ascetic_cap",
            "trickster_cloak",
            "ex_machina",
            "force_field",
          ],
        },
        item_tooltips: {
          power_treads:
            "A core item that tanks you up forther. Improves your attack speed signifcantly.",
          cyclone:
            "A core item that provides you with movement speed and dispel against a common counter of Spirit Vessel.",
          pipe: "Against heavy-healing lineups.",
          heavens_halberd:
            "A strong alternative to Kaya and Sange especially against ranged right-clickers.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1642148016,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2718666066",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "necrolyte_death_pulse", // 1
          "necrolyte_heartstopper_aura", // 2
          "necrolyte_death_pulse", // 3
          "necrolyte_heartstopper_aura", // 4   equals to `ghost shroud`
          "necrolyte_death_pulse", // 5
          "necrolyte_reapers_scythe", // 6
          "necrolyte_death_pulse", // 7
          "necrolyte_heartstopper_aura", // 8
          "necrolyte_heartstopper_aura", // 9
          "necrolyte_sadist", // 10
          "special_bonus_strength_6", // 11
          "necrolyte_reapers_scythe", // 12
          "necrolyte_sadist", // 13
          "necrolyte_sadist", // 14
          "special_bonus_unique_necrophos_4", // 15
          "necrolyte_sadist", // 16
          "special_bonus_attributes", // 17
          "necrolyte_reapers_scythe", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_necrophos_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_necrophos", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "circlet",
            "mantle",
            "magic_stick",
          ],
          early_game: [
            "boots",
            "null_talisman",
            "magic_wand",
            "hood_of_defiance",
          ],
          mid_game: [
            "travel_boots",
            "kaya_and_sange",
            "aghanims_shard",
            "dagon",
            "blink",
            "cyclone",
            "eternal_shroud",
          ],
          late_game: [
            "shivas_guard",
            "aeon_disk",
            "sheepstick",
            "octarine_core",
          ],
          situational: [
            "infused_raindrop",
            "guardian_greaves",
            "holy_locket",
            "pipe",
            "radiance",
            "lotus_orb",
            "ultimate_scepter",
          ],
          core: [
            "magic_wand",
            "hood_of_defiance",
            "travel_boots",
            "kaya_and_sange",
            "aghanims_shard",
          ],
          neutral: [
            "unstable_wand",
            "keen_optic",
            "pogo_stick",
            "essence_ring",
            "nether_shawl",
            "pupils_gift",
            "quickening_charm",
            "spider_legs",
            "ceremonial_robe",
            "stormcrafter",
            "ascetic_cap",
            "trickster_cloak",
            "ex_machina",
            "fallen_sky",
          ],
        },
        item_tooltips: {
          travel_boots:
            "A core item that allows fixes your movement speed issues and allows you to cover the map.",
          radiance: "Good against illusion based heroes.",
        },
      },
    ],
    ability_tooltips: {
      necrolyte_sadist:
        "Skill this spell on a per-need basis. On a tough lane, likely on level 4. On easy lane post level 6.",
      necrolyte_death_seeker:
        "Good spell to save a teammate from physical attacks. Also a very effective way of pushing a wave very fast.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      magic_wand:
        "A core item. Activating it under Ghost Shroud results in a huge burst of healing and mana.",
      hood_of_defiance:
        "A core item that makes you less susceptible to magical damage, especially under the effect of the Ghost Shroud.",
      guardian_greaves:
        "A potentially good item if you are planning to group up with your team and need to dispel something. If you use this under Ghost Shroud the healing gets amplified.",
      holy_locket:
        "If you feel your team doesnt need more damage but rather needs sustain. Amplifies all healing. Goes very well with your Death Pulse and its talent.",
      eternal_shroud:
        "An upgrade to Hood of Defience that pairs up nicely with Death Pulse and Radiance.",
      kaya_and_sange:
        "A core item that provides you with mix of offensive and defensive stats. Self healing amplification from Sange goes well with Ghost Shroud.",
      aghanims_shard:
        "A core item to save an ally, heal and amplify the magical damage on target.",
      blink: "For extra mobility and to get Reaper`s Scythe off easier.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter: "Against heavy physical damage lineups.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Necrophos will use Death Pulse frequently to harass and secure creep lasthits",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain through the DOT(Damage over time) from Heartstopper Aura.",
          },
          {
            item: "headdress",
            info: "For lane sustain and/or Pipe of Insight later",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Necrophos is heavy on magical damage early on and Cloak will negate 15% of it",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel against Hearthstopper Aura and Death Pulse",
          },
        ],
        support: [],
        core: [
          {
            item: "ring_of_health",
            info: "To sustain through the DOT(Damage Over Time) from Heartstopper Aura.",
          },
        ],
      },
      mid_game: {
        all: [
          {
            item: "spirit_vessel",
            info: "Reduces Necrophoses healing effectiveness as his whole skill set and item set relies onto it.",
          },
        ],
        support: [
          {
            item: "glimmer_cape",
            info: "Using Glimmer Cape onto a target that is about to get ultied by Necrophos could potentially save them from lethal damage.",
          },
        ],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "orchid" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [
          { item: "aeon_disk" },
          {
            item: "wind_waker",
            info: "To save an ally being ultied by Necrophos",
          },
          {
            item: "revenants_brooch",
            info: "Your next 5 attacks will be able to go through his Ghost Shroud or Death Seeker.",
          },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "skadi",
            info: "Core item against Necrophos as it reduces his healing, spell lifesteal and his movespeed.",
          },
          { item: "shivas_guard" },
          {
            item: "nullifier",
            info: "One of the core dispel items against Necrophos as his survival relies on Ghost Shroud and Deathseeker as well as some items like Eul`s Scepter or Aeon Disk.",
          },
          {
            item: "bloodthorn",
            info: "Provides you magic resistance, spell damage debuff and silence. Use it to burst Necrophos.",
          },
        ],
      },
    },
  },

  "Night Stalker": {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804283,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960635",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
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
          "special_bonus_unique_night_stalker_2", // 25
        ],
        items: {
          starting: [
            `tango`,
            `flask`,
            `quelling_blade`,
            `gauntlets`,
            `circlet`,
            `ward_observer`,
          ],
          early_game: [
            "phase_boots",
            "magic_wand",
            "bracer",
            "infused_raindrop",
          ],
          mid_game: [
            "echo_sabre",
            "black_king_bar",
            "blink",
            `basher`,
            `aghanims_shard`,
          ],
          late_game: [
            "abyssal_blade",
            "nullifier",
            "greater_crit",
            "assault",
            "overwhelming_blink",
          ],
          situational: [
            `soul_ring`,
            `hand_of_midas`,
            `armlet`,
            `invis_sword`,
            `sange_and_yasha`,
            `heavens_halberd`,
            `silver_edge`,
            `lotus_orb`,
            `sphere`,
            `swift_blink`,
            `travel_boots`,
          ],
          core: [
            "phase_boots",
            "echo_sabre",
            "black_king_bar",
            "blink",
            "basher",
          ],
          neutral: [
            "broom_handle",
            `unstable_wand`,
            `chipped_vest`,
            "quicksilver_amulet",
            `misericorde`,
            `dragon_scale`,
            `vambrace`,
            "elven_tunic",
            `mind_breaker`,
            "penta_edged_sword",
            `the_leveller`,
            `flicker`,
            "desolator_2",
            `giants_ring`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      night_stalker_crippling_fear:
        "You can put a point in this spell earlier than suggested if silence is necessary to get a kill.",
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace gauntlet and circlet for it.`,
      phase_boots:
        "A core boots upgrade that allows you to gap-close even quicker.",
      echo_sabre:
        "A core item that that provides you with useful stats and burst. Can be disassembled.",
      hand_of_midas:
        "If you can get it early and the game looks to be slow paced.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      black_king_bar:
        "A core item that allows you to be in the middle of the fight and right-click the opponents down.",
      blink:
        "A core item that allows you to jump the backlines with Crippling Fear on.",
      basher:
        "A core item that allows you to lock down the hero you are focusing.",
      nullifier:
        "To dispel defensive spells and items from opponents that prevent you from right-clicking.",
      aghanims_shard: `Lets you apply pressure on enemy buildings after fights. Especially great against summon-based heroes.`,
      invis_sword:
        "Gives you pretty good stats and the ability to find backliners and scout.",
    },
    combo: [
      `night_stalker_darkness`,
      `night_stalker_crippling_fear`,
      `black_king_bar`,
      `blink`,
      `night_stalker_void`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from Night Stalker during night time",
          },
          {
            item: "boots",
            info: "To keep the distance from Night Stalker during night time",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [
          { item: "glimmer_cape" },
          {
            item: "force_staff",
            info: "Lets you disengage out of the Crippling Fear and reposition yourself.",
          },
          {
            item: "ghost",
            info: "Night Stalker mostly relies on right clicking opponents.",
          },
        ],
        core: [
          { item: "hurricane_pike" },
          { item: "silver_edge" },
          { item: "heavens_halberd" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [
          {
            item: "aeon_disk",
            info: "Prevents getting jumped in the backline and getting bursted.",
          },
        ],
        core: [
          { item: "abyssal_blade", info: "To pin this mobile hero" },
          {
            item: "assault",
            info: "The armor from Assault helps with Night Stalkers right-clicks.",
          },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          {
            item: "butterfly",
            info: "Night Stalker mostly relies on right clicking and Butterfly provides evasion.",
          },
        ],
      },
    },
  },

  "Nyx Assassin": {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804295,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960726",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "nyx_assassin_impale", // 1
          "nyx_assassin_spiked_carapace", // 2
          "nyx_assassin_impale", // 3
          "nyx_assassin_spiked_carapace", // 4
          "nyx_assassin_impale", // 5
          "nyx_assassin_vendetta", // 6
          "nyx_assassin_impale", // 7
          "nyx_assassin_mana_burn", // 8
          `nyx_assassin_spiked_carapace`, // 9
          `nyx_assassin_spiked_carapace`, // 10
          "nyx_assassin_mana_burn", // 11
          "nyx_assassin_vendetta", // 12
          `nyx_assassin_mana_burn`, // 13
          `nyx_assassin_mana_burn`, // 14
          "special_bonus_unique_nyx_4", // 15
          "special_bonus_hp_250", // 16
          "special_bonus_attributes", // 17
          "nyx_assassin_vendetta", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_nyx_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_nyx`, // 25
        ],
        items: {
          starting: ["tango", `boots`, `ward_observer`],
          early_game: [
            `ward_sentry`,
            `arcane_boots`,
            `magic_wand`,
            `urn_of_shadows`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [`ultimate_scepter`, "aether_lens", `blink`, `cyclone`],
          late_game: [
            "octarine_core",
            "ethereal_blade",
            "aeon_disk",
            "sheepstick",
          ],
          situational: [
            `spirit_vessel`,
            `meteor_hammer`,
            `force_staff`,
            `aghanims_shard`,
            `lotus_orb`,
            `sheepstick`,
            `arcane_blink`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            `arcane_boots`,
            `ultimate_scepter`,
            `aether_lens`,
            `ethereal_blade`,
            `octarine_core`,
          ],
          neutral: [
            "keen_optic",
            `arcane_ring`,
            `pogo_stick`,
            "philosophers_stone",
            `bullwhip`,
            `essence_ring`,
            "spider_legs",
            `psychic_headband`,
            `black_powder_bag`,
            "spy_gadget",
            `timeless_relic`,
            `spell_prism`,
            "seer_stone",
            `book_of_shadows`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      nyx_assassin_mana_burn: `You can skill this spell on level 4 if you are playing against a high intelligence enemy hero in lane. Use it off cd in that case.`,
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick instead of boots if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      spirit_vessel: "Against heavy-healing lineup.",
      arcane_boots:
        "A core item that solves your mana sustain issues. Can be disasembled and Energy Booster used for Aether Lens or Lotus Orb. Consider Tranquil Boots after disassembling.",
      cyclone: `You can get euls in combination with the Meteor Hammer for more crowd control.`,
      blink: `An item that allows you to gap-close instantly and set up a kill with cyclone and Impale.`,
      ultimate_scepter:
        "A core item that improves Impale and Mana Burn signifcantly.",
      lotus_orb: "For reflect, dispel and armor.",
      ethereal_blade: `An incredible buff for all your spells and also a nuisance for enemy right-click cores.`,
    },
    combo: [
      `nyx_assassin_vendetta`,
      `nyx_assassin_impale`,
      `nyx_assassin_mana_burn`,
      `nyx_assassin_burrow`,
      `nyx_assassin_spiked_carapace`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "arcane_boots",
            info: "To upkeep the mana against Mana Burn",
          },
          { item: "infused_raindrop" },
        ],
        support: [{ item: "ward_sentry" }, { item: "dust" }],
        core: [{ item: "soul_ring" }],
      },
      mid_game: {
        all: [],
        support: [{ item: "SentryDust" }, { item: "glimmer_cape" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "SentryDustGem" }, { item: "black_king_bar" }],
        core: [{ item: "abyssal_blade" }],
      },
    },
  },

  "Ogre Magi": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804305,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960831",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "ogre_magi_bloodlust", // 15
          "special_bonus_hp_250", // 16
          "special_bonus_attributes", // 17
          "ogre_magi_multicast", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_ogre_magi", // 20
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
            "flask",
            "enchanted_mango",
            `enchanted_mango`,
            `enchanted_mango`,
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
            "aghanims_shard",
            "aether_lens",
            "force_staff",
            "glimmer_cape",
            "ghost",
          ],
          late_game: [
            "ultimate_scepter",
            "sheepstick",
            "aeon_disk",
            "octarine_core",
            `ethereal_blade`,
          ],
          situational: [
            `orb_of_venom`,
            `ring_of_basilius`,
            `veil_of_discord`,
            `cyclone`,
            "hand_of_midas",
            "lotus_orb",
            `heavens_halberd`,
            "blink",
            `solar_crest`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `aether_lens`,
            `glimmer_cape`,
            "aghanims_shard",
            `force_staff`,
          ],
          neutral: [
            "keen_optic",
            `trusty_shovel`,
            "mysterious_hat",
            `pogo_stick`,
            "philosophers_stone",
            "bullwhip",
            `essence_ring`,
            "psychic_headband",
            "spider_legs",
            `quickening_charm`,
            "spy_gadget",
            "spell_prism",
            `timeless_relic`,
            `heavy_blade`,
            "force_field",
            "seer_stone",
            `book_of_shadows`,
          ],
        },
      },
    ],
    ability_tooltips: {
      ogre_magi_bloodlust: `You have a lot of aggressive potential once you get this at level 4. Keep mana for your spells with mangoes and clarities.`,
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, one mango, and clarity for it.",
      infused_raindrop: "Against magical burst.",
      hand_of_midas:
        "If you can get it early. Not recommended in majority of the games as you could have Veil of Discord and almost a Medallion of Courage for the same price.",
      arcane_boots:
        "A core item that helps with mana sustain. Can be disassembled down the road.",
      veil_of_discord:
        "A core item that amplifies your team`s spell damage(all types). That`s why you generally want to have Fireblast and Ignite maxed out over Bloodlust so that you can get the most value out of Veil yourself as well.",
      solar_crest:
        "A core buffing item. Applying a Bloodlust and Solar Crest on a right-clicking ally is a huge boost to dps for him. When using Solar Crest on opponents, it can multicast.",
      aghanims_shard:
        "A core item that protects your allies from right-click burst.",
      lotus_orb: "For reflect, dispel and armor.",
      blink: "To close the gap.",
    },
    combo: [
      `ogre_magi_bloodlust`,
      `veil_of_discord`,
      `ogre_magi_ignite`,
      `ogre_magi_fireblast`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Ogre Magi will frequently use his spells to harass or buff himself or his allies",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Ogre Magi does a lot of magical damage and Cloak will offset 15% of it",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  Omniknight: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804315,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699955472",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "omniknight_purification", // 1
          "omniknight_repel", // 2
          "omniknight_purification", // 3
          "omniknight_repel", // 4
          "omniknight_purification", // 5
          "omniknight_guardian_angel", // 6
          "omniknight_purification", // 7
          "omniknight_repel", // 8
          "omniknight_repel", // 9
          "special_bonus_unique_omniknight_5", // 10
          "omniknight_degen_aura", // 11
          "omniknight_guardian_angel", // 12
          "omniknight_degen_aura", // 13
          "omniknight_degen_aura", // 14
          "special_bonus_unique_omniknight_6", // 15
          "omniknight_degen_aura", // 16
          "special_bonus_attributes", // 17
          "omniknight_guardian_angel", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_omniknight_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_omniknight_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "enchanted_mango",
            "orb_of_venom",
            "faerie_fire",
            "branches",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            "soul_ring",
            "ring_of_basilius",
          ],
          mid_game: [
            "holy_locket",
            "solar_crest",
            "blink",
            "aether_lens",
            "glimmer_cape",
            "mekansm",
            "force_staff",
            "ghost",
          ],
          late_game: ["wraith_pact", "ultimate_scepter", "octarine_core"],
          situational: ["guardian_greaves", "lotus_orb"],
          core: ["arcane_boots", "holy_locket", "solar_crest", "blink"],
          neutral: [
            "keen_optic",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            "spider_legs",
            "psychic_headband",
            "spy_gadget",
            "spell_prism",
            "seer_stone",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      omniknight_hammer_of_purity:
        " Consider putting a skill point in this spell if you are able to run down an opponent. Goes well with Orb Of venom.",
      omniknight_guardian_angel:
        "You don`t have to skill this spell on level 6. Sometimes it is better to max out the Heavenly Grace and Purification before taking a point in Guardian Angel.",
      special_bonus_unique_omniknight_7:
        "On level 25, you can take this talent over the suggested one if you are close or having Aghanim`s Scepter, and opponents don`t have many ways of dispelling Guardian Angel.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      orb_of_venom:
        "If you see yourself being able to hit the opponents on the lane often.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      soul_ring:
        "Lets you use your Purification more frequently. Also if Purification is used on yourself, covers the HP loss from the soulring.",
      arcane_boots:
        "A core boots upgrade that helps with mana sustain. Can be disassembled and Energy Booster used for Holy Locket. Get Tranquil Boots afterwards.",
      holy_locket:
        "A core item that provides you with the ability to burst heal and replenish mana on yourself or your allies.",
      solar_crest:
        "A core item that goes well with the buffing and saving theme of the hero.",
      blink:
        "A core item that allows you to stay back and hidden but also be able to get your spells off in the best way.",
      vladmir:
        "A core item that goes well with the buffing and saving theme of the hero. Percentage value benefits of this item shine in late game.",
      wraith_pact: "Could be a useful item offensively or defensively placed.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Omniknight tends to use his spells to contest the lane frequently.",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from a core Omniknight",
          },
          {
            item: "boots",
            info: "To keep the distance from a core Omniknight",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel against Purification and Heavenly Grace. However be careful, Omniknight can dispel your Spirit Vessel with his Heavenly Grace.",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "cyclone", info: "To dispel Heavenly Grace." },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          {
            item: "orchid",
            info: "Silencing Omniknight in a fight is a good way of preventing him from using his defensive skill set.",
          },
          {
            item: "diffusal_blade",
            info: "Omniknight is a very mana dependent hero.",
          },
          { item: "maelstrom" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [],
        core: [
          {
            item: "skadi",
            info: "Reduces his healing effects and his movespeed.",
          },
          { item: "shivas_guard", info: " Reduces his healing effects." },
          {
            item: "nullifier",
            info: "Dispels Heavenly Grace and Guardian Angel",
          },
          {
            item: "bloodthorn",
            info: "To prevent him from using his defensive skill set and burst him.",
          },
          {
            item: "mjollnir",
            info: "To be able to do magical damage while Guarding Angel is active",
          },
          {
            item: "monkey_king_bar",
            info: "To be able to do magical damage while Guarding Angel is active",
          },
        ],
      },
    },
  },

  Oracle: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804325,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699960994",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "oracle_fortunes_end", // 1
          "oracle_purifying_flames", // 2
          "oracle_purifying_flames", // 3
          "oracle_fates_edict", // 4
          "oracle_purifying_flames", // 5
          "oracle_false_promise", // 6
          "oracle_purifying_flames", // 7
          "oracle_fates_edict", // 8
          "oracle_fates_edict", // 9
          "oracle_fates_edict", // 10
          "oracle_fortunes_end", // 11
          "oracle_false_promise", // 12
          "oracle_fortunes_end", // 13
          "oracle_fortunes_end", // 14
          "special_bonus_unique_oracle_2", // 15
          `special_bonus_unique_oracle_5`, // 16
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
            "flask",
            `clarity`,
            "enchanted_mango",
            `enchanted_mango`,
            "faerie_fire",
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
            "aether_lens",
            `tranquil_boots`,
            `glimmer_cape`,
            "force_staff",
          ],
          late_game: [
            "aeon_disk",
            `aghanims_shard`,
            "ultimate_scepter",
            `octarine_core`,
          ],
          situational: [
            `urn_of_shadows`,
            `holy_locket`,
            `ghost`,
            `cyclone`,
            `blink`,
            `guardian_greaves`,
            `spirit_vessel`,
            `sheepstick`,
            "lotus_orb",
            `solar_crest`,
            `travel_boots`,
          ],
          core: [
            "flask",
            "arcane_boots",
            `aether_lens`,
            `tranquil_boots`,
            `glimmer_cape`,
            "aghanims_shard",
            "aeon_disk",
            `ultimate_scepter`,
          ],
          neutral: [
            "trusty_shovel",
            "keen_optic",
            `arcane_ring`,
            "philosophers_stone",
            "bullwhip",
            `essence_ring`,
            "spider_legs",
            "psychic_headband",
            `quickening_charm`,
            "spy_gadget",
            `spell_prism`,
            "trickster_cloak",
            `heavy_blade`,
            "seer_stone",
            "book_of_shadows",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_oracle_5:
        "On level 15, take the suggested level 15 talent first and then on level 16 this level 10 talent. The dota client disallows me to indicate the order in graphics above.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, clarity, and sentry for it.`,
      infused_raindrop: "Against magical burst.",
      flask:
        "A core item that works well with False Promise. It doesn`t get canceled.",
      arcane_boots:
        "A core boots upgrade that helps with mana sustain. Can be disassembled and Energy Booster used for Holy Locket. Get Tranquil Boots afterwards.",
      tranquil_boots: `You can upgrade Brown Boots to Tranquils once you have the Aether Lens.`,
      holy_locket: `A situational item that lets you burst heal and replenish mana on yourself or your allies. Works well with False Promise.`,
      blink: `A situational item that allows you to stay back and hidden but also be able to get spells off in the best way.`,
      aghanims_shard:
        "A core item that makes it even more likely that False Promised hero survives.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter: `The new Aghs upgrade for Oracle has incredible synergy with False Promise. Also works well against tanky enemy heroes.`,
      aeon_disk:
        "A core item that allows you to surive the jump by opponents and possibly turn the fight around by using False Promise. You are generally the first priority target for opponents.",
    },
    combo: [
      `oracle_purifying_flames`,
      `oracle_fortunes_end`,
      `oracle_purifying_flames`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "infused_raindrop" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to negate the healing on the hero that False Promise was used on. Apply Vessel towards end of the False promise and be mindful that Fortune`s End dispels Vessel debuff",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "blink", info: "To close the gap to Oracle" },
        ],
        support: [{ item: "force_staff" }],
        core: [{ item: "orchid" }, { item: "black_king_bar" }],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "skadi" },
          { item: "shivas_guard" },
          { item: "satanic", info: "To dispel Fate`s Edict and Fortune`s End" },
        ],
      },
    },
  },

  "Outworld Devourer": {
    // not `Outworld Destroyer`
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804336,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961071",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "obsidian_destroyer_arcane_orb", // 1
          "obsidian_destroyer_equilibrium", // 2
          "obsidian_destroyer_astral_imprisonment", // 3
          "obsidian_destroyer_astral_imprisonment", // 4
          "obsidian_destroyer_astral_imprisonment", // 5
          "obsidian_destroyer_sanity_eclipse", // 6
          "obsidian_destroyer_astral_imprisonment", // 7
          "obsidian_destroyer_arcane_orb", // 8
          "obsidian_destroyer_arcane_orb", // 9
          "obsidian_destroyer_arcane_orb", // 10
          "special_bonus_attack_speed_20", // 11
          "obsidian_destroyer_sanity_eclipse", // 12
          "obsidian_destroyer_equilibrium", // 13
          "obsidian_destroyer_equilibrium", // 14
          "special_bonus_mp_250", // 15
          "obsidian_destroyer_equilibrium", // 16
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
          starting: ["tango", "crown", "branches"],
          early_game: ["meteor_hammer", "power_treads", "magic_wand"],
          mid_game: [
            "blink",
            "ultimate_scepter",
            "aghanims_shard",
            "aether_lens",
            "force_staff",
          ],
          late_game: ["octarine_core", "aeon_disk", "sheepstick", "refresher"],
          situational: [
            "infused_raindrop",
            "black_king_bar",
            "hurricane_pike",
            "sphere",
          ],
          core: [
            "meteor_hammer",
            "power_treads",
            "blink",
            "ultimate_scepter",
            "aghanims_shard",
            "aeon_disk",
          ],
          neutral: [
            "pogo_stick",
            "mysterious_hat",
            "grove_bow",
            "vambrace",
            "psychic_headband",
            "ceremonial_robe",
            "timeless_relic",
            "spell_prism",
            "seer_stone",
            "apex",
          ],
        },
        item_tooltips: {
          black_king_bar:
            "Against a lot of disables, magical damage and as a dispel.",
          ultimate_scepter:
            "A core item that improves Astral Imprisonment and provides you with an extra charge of it.",
          aghanims_shard:
            "A core item that allows your allies to reposition during Astral Imprisonment even in Chronosphere or Black Hole.",
          aeon_disk:
            "A core item that protects you from being bursted. Provides you with a decent amount of mana as well which will improve Sanity`s Eclipse`s damage output.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1642190895,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2719253915",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "obsidian_destroyer_arcane_orb", // 1
          "obsidian_destroyer_equilibrium", // 2
          "obsidian_destroyer_astral_imprisonment", // 3
          "obsidian_destroyer_astral_imprisonment", // 4
          "obsidian_destroyer_astral_imprisonment", // 5
          "obsidian_destroyer_sanity_eclipse", // 6
          "obsidian_destroyer_astral_imprisonment", // 7
          "obsidian_destroyer_arcane_orb", // 8
          "obsidian_destroyer_arcane_orb", // 9
          "obsidian_destroyer_arcane_orb", // 10
          "special_bonus_attack_speed_20", // 11
          "obsidian_destroyer_sanity_eclipse", // 12
          "obsidian_destroyer_equilibrium", // 13
          "obsidian_destroyer_equilibrium", // 14
          "special_bonus_movement_speed_30", // 15
          "obsidian_destroyer_equilibrium", // 16
          "special_bonus_attributes", // 17
          "obsidian_destroyer_sanity_eclipse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_strength_20", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_outworld_devourer", // 25
        ],
        items: {
          starting: ["tango", "crown", "branches"],
          early_game: ["meteor_hammer", "power_treads", "magic_wand"],
          mid_game: [
            "witch_blade",
            "black_king_bar",
            "blink",
            "hurricane_pike",
            "ultimate_scepter",
            "aether_lens",
          ],
          late_game: ["sheepstick", "moon_shard", "refresher", "octarine_core"],
          situational: [
            "infused_raindrop",
            "hand_of_midas",
            "aghanims_shard",
            "sphere",
          ],
          core: [
            "meteor_hammer",
            "power_treads",
            "witch_blade",
            "black_king_bar",
            "blink",
            "sheepstick",
          ],
          neutral: [
            "pogo_stick",
            "mysterious_hat",
            "grove_bow",
            "vambrace",
            "enchanted_quiver",
            "elven_tunic",
            "the_leveller",
            "ninja_gear",
            "pirate_hat",
            "apex",
          ],
        },
        item_tooltips: {
          hand_of_midas:
            "After applying some pressure with Meteor Hammer you can slow down and purchase Hand of Midas.",
          witch_blade:
            "A core item that significantly increases the damage coming from your right-clicks.",
          black_king_bar: "A core item that allows you to deliver the damage.",
          ultimate_scepter:
            "A core item that improves Astral Imprisonment and provides you with an extra charge of it.",
          aghanims_shard:
            "Allows you or your allies to move while under Astral Imprisonment even in Chronosphere or walk out of Puck`s Mystic Coil without snapping it.",
          sheepstick:
            "A core item that allows you to control and burst an opponent.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      crown: "For Meteor Hammer rush.",
      meteor_hammer:
        "A core item that allows you to solo kill heroes, waveclear and pressure towers. The Ring of Health component provides you with hp sustain during early laning stage.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that provides you with significant attack speed increase and enlarges mana pool.",
      blink: "A core item that allows you to initiate or save an ally quickly.",
      hurricane_pike:
        "Allows you to create a distance from an enemy hero that jumped you. Adds to your right-click potential.",
      sphere: "Against powerful single-target disables and debuffs.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "infused_raindrop" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to negate the healing on the hero that False Promise was used on. Apply Vessel towards end of the False promise and be mindful that Fortune`s End dispels Vessel debuff",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "blink", info: "To close the gap to Oracle" },
        ],
        support: [{ item: "force_staff" }],
        core: [{ item: "orchid" }, { item: "black_king_bar" }],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "skadi" },
          { item: "shivas_guard" },
          { item: "satanic", info: "To dispel Fate`s Edict and Fortune`s End" },
        ],
      },
    },
  },

  Pangolier: {
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804346,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961166",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "pangolier_shield_crash", // 1
          "pangolier_swashbuckle", // 2
          "pangolier_shield_crash", // 3
          "pangolier_swashbuckle", // 4
          "pangolier_shield_crash", // 5
          "pangolier_gyroshell", // 6
          "pangolier_shield_crash", // 7
          "pangolier_swashbuckle", // 8
          "pangolier_swashbuckle", // 9
          "pangolier_lucky_shot", // 10
          "special_bonus_unique_pangolier", // 11
          "pangolier_gyroshell", // 12
          "pangolier_lucky_shot", // 13
          "pangolier_lucky_shot", // 14
          "special_bonus_unique_pangolier_6", // 15
          "pangolier_lucky_shot", // 16
          "special_bonus_attributes", // 17
          "pangolier_gyroshell", // 18
          "special_bonus_attributes", // 19
          "special_bonus_strength_18", // 20
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
            "branches",
            "faerie_fire",
            "enchanted_mango",
            "circlet",
            "ring_of_protection",
            "magic_stick",
          ],
          early_game: [
            "orb_of_corrosion",
            "arcane_boots",
            "magic_wand",
            "urn_of_shadows",
          ],
          mid_game: ["blink", "cyclone", "aghanims_shard", "basher"],
          late_game: [
            "overwhelming_blink",
            "aeon_disk",
            "ultimate_scepter",
            "octarine_core",
          ],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "maelstrom",
            "lotus_orb",
            "sphere",
          ],
          core: [
            "orb_of_corrosion",
            "arcane_boots",
            "blink",
            "cyclone",
            "aghanims_shard",
            "basher",
          ],
          neutral: [
            "arcane_ring",
            "chipped_vest",
            "dragon_scale",
            "ring_of_aquila",
            "quickening_charm",
            "ceremonial_robe",
            "timeless_relic",
            "spell_prism",
            "fallen_sky",
            "ex_machina",
          ],
        },
        item_tooltips: {
          spirit_vessel: "Against heavy-healing lineup.",
          maelstrom:
            "Great against illusion based heroes especially if paired with Aghanim`s Scepter later on.",
          cyclone:
            "A core item that allows you to stop during Rolling Thunder and chain stun an enemy. Can be used as a dispel, namely against silences and roots.",
          lotus_orb: "For reflect, dispel and armor.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1642190906,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2719254096",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "pangolier_shield_crash", // 1
          "pangolier_swashbuckle", // 2
          "pangolier_shield_crash", // 3
          "pangolier_lucky_shot", // 4
          "pangolier_shield_crash", // 5
          "pangolier_gyroshell", // 6
          "pangolier_shield_crash", // 7
          "pangolier_swashbuckle", // 8
          "pangolier_swashbuckle", // 9
          "special_bonus_mp_regen_150", // 10
          "pangolier_swashbuckle", // 11
          "pangolier_gyroshell", // 12
          "pangolier_lucky_shot", // 13
          "pangolier_lucky_shot", // 14
          "special_bonus_unique_pangolier_6", // 15
          "pangolier_lucky_shot", // 16
          "special_bonus_attributes", // 17
          "pangolier_gyroshell", // 18
          "special_bonus_attributes", // 19
          "special_bonus_strength_18", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pangolier_5", // 25
        ],
        items: {
          starting: [
            "tango",
            "orb_of_venom",
            "flask",
            "branches",
            "faerie_fire",
            "enchanted_mango",
            "boots",
            "ward_sentry",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "orb_of_corrosion",
            "arcane_boots",
            "magic_wand",
            "urn_of_shadows",
          ],
          mid_game: [
            "blink",
            "aghanims_shard",
            "cyclone",
            "basher",
            "ghost",
            "force_staff",
          ],
          late_game: [
            "aeon_disk",
            "octarine_core",
            "overwhelming_blink",
            "ultimate_scepter",
          ],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "lotus_orb",
            "sphere",
          ],
          core: [
            "orb_of_corrosion",
            "arcane_boots",
            "blink",
            "aghanims_shard",
            "cyclone",
            "basher",
          ],
          neutral: [
            "arcane_ring",
            "trusty_shovel",
            "dragon_scale",
            "ring_of_aquila",
            "quickening_charm",
            "ceremonial_robe",
            "timeless_relic",
            "spell_prism",
            "fallen_sky",
            "ex_machina",
          ],
        },
        item_tooltips: {
          spirit_vessel: "Against heavy-healing lineup.",
          cyclone:
            "A core item that allows you to stop during Rolling Thunder and chain stun an enemy. Can be used as a dispel, namely against silences and roots.",
          lotus_orb: "For reflect, dispel and armor.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1642190919,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2719254316",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "pangolier_shield_crash", // 1
          "pangolier_swashbuckle", // 2
          "pangolier_shield_crash", // 3
          "pangolier_swashbuckle", // 4
          "pangolier_shield_crash", // 5
          "pangolier_gyroshell", // 6
          "pangolier_shield_crash", // 7
          "pangolier_swashbuckle", // 8
          "pangolier_swashbuckle", // 9
          "pangolier_lucky_shot", // 10
          "special_bonus_unique_pangolier", // 11
          "pangolier_gyroshell", // 12
          "pangolier_lucky_shot", // 13
          "pangolier_lucky_shot", // 14
          "special_bonus_unique_pangolier_2", // 15
          "pangolier_lucky_shot", // 16
          "special_bonus_attributes", // 17
          "pangolier_gyroshell", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_pangolier_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pangolier_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: [
            "bottle",
            "orb_of_corrosion",
            "arcane_boots",
            "magic_wand",
          ],
          mid_game: [
            "maelstrom",
            "blink",
            "aghanims_shard",
            "basher",
            "ultimate_scepter",
            "cyclone",
          ],
          late_game: ["octarine_core", "refresher", "overwhelming_blink"],
          situational: [
            "infused_raindrop",
            "diffusal_blade",
            "sphere",
            "black_king_bar",
          ],
          core: [
            "bottle",
            "orb_of_corrosion",
            "arcane_boots",
            "maelstrom",
            "blink",
            "aghanims_shard",
            "basher",
            "ultimate_scepter",
          ],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "dragon_scale",
            "ring_of_aquila",
            "quickening_charm",
            "ceremonial_robe",
            "timeless_relic",
            "spell_prism",
            "fallen_sky",
            "ex_machina",
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to gank with stored rune.",
          maelstrom:
            "A core farming item but also adds extra AoE damage in the fights.",
          diffusal_blade:
            "Against heroes like Medusa and Wraith King but is also decent against low mana pool heroes(Bristleback, Faceles Void).",
          cyclone:
            "Allows you to stop during Rolling Thunder and chain stun an enemy. Can be used as a dispel, namely against silences and roots.",
          black_king_bar:
            "Since this build is not all about Rolling Thunder you might need this item to be able to right-click or Swashbuckle the opponents in the middle of the fight.",
          ultimate_scepter:
            "A core item that allows Sield Crash to cast Swashbuckle during Rolling Thunder. Since you will have Maelstrom and Basher by this point, those will be procing as well.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_corrosion: "A core item that gets applied by Swashbuckle.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade that helps with mana sustain. Can be disassembled later on.",
      blink:
        "A core item that allows you to jump on the opponents while Rolling Thunder is active.",
      aghanims_shard:
        "A core upgrade that allows you to become spell-immune, stop in place and turn during Rolling Thunder.",
      basher:
        "A core item that can proc on Swashbuckle and during Rolling Thunder with upgraded Shield Crash with Aghanim`s Scepter.",
      sphere:
        "Against powerful single-target disables and debuffs(Rupture, Primal Roar, Scythe of Vyse).",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "wind_lace",
            info: "To keep the distance from Pangolier and to dodge the Rolling Thunder",
          },
          {
            item: "boots",
            info: "To keep the distance from Pangolier and to dodge the Rolling Thunder",
          },
          { item: "infused_raindrop" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "hurricane_pike" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
          { item: "manta", info: "To dispel Lucky Shot" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          {
            item: "bloodthorn",
            info: "To burst this tanky hero even if Shield Crash is active",
          },
          {
            item: "nullifier",
            info: "To burst this tanky hero while Shield Crash is active",
          },
          { item: "satanic", info: "To dispel Lucky Shot" },
        ],
      },
    },
  },

  "Phantom Assassin": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804354,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961303",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_unique_phantom_assassin_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_phantom_assassin_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "slippers",
            "faerie_fire",
            "magic_stick",
            "blight_stone",
            "orb_of_venom",
          ],
          early_game: [
            "ring_of_health",
            "power_treads",
            "magic_wand",
            "orb_of_corrosion",
          ],
          mid_game: [
            "bfury",
            "desolator",
            "black_king_bar",
            "aghanims_shard",
            "basher",
          ],
          late_game: ["satanic", "abyssal_blade", "ultimate_scepter"],
          situational: [
            "manta",
            "ultimate_scepter",
            "sphere",
            "monkey_king_bar",
            "nullifier",
          ],
          core: [
            "power_treads",
            "bfury",
            "desolator",
            "black_king_bar",
            "aghanims_shard",
            "basher",
            "satanic",
          ],
          neutral: [
            "possessed_mask",
            "broom_handle",
            "misericorde",
            "quicksilver_amulet",
            "ring_of_aquila",
            "mind_breaker",
            "paladin_sword",
            "penta_edged_sword",
            "the_leveller",
            "desolator_2",
            "apex",
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {
      phantom_assassin_blur:
        "You can skill this spell at level 2 already if you are being right clicked a lot.",
      special_bonus_unique_phantom_assassin_3:
        "You can take this level 20 talent over the suggested one if the opponents still don`t have item counters to evasion.",
      special_bonus_unique_phantom_assassin:
        "You can take this level 25 talent over the suggested one if you are in need of more AoE damage. Will burst heal you with Satanic on.",
    },
    item_tooltips: {
      blight_stone:
        "If you can pressure the opponents early into the laning stage.",
      orb_of_venom:
        "If you can pressure the opponents early into the laning stage.",
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      orb_of_corrosion:
        "If you can pressure the opponents early into the laning stage.",
      ring_of_health:
        "Helps with the hp sustain on the lane and incorporates into Battle Fury.",
      power_treads:
        "A core boots upgrade that improves your farming speed through attack speed increase and mana savings.",
      bfury: "A core farming item.",
      desolator:
        "A core item that adds to your burst, allows you to take buildings down faster and kill Roshan. You can delay this item in favor of Black King Bar if you need to fight earlier.",
      black_king_bar:
        "A core item that allows you to deliver the damage under spell-immunity. You can buy this item immediately after Battle Fury if you need to fight earlier.",
      ultimate_scepter:
        "Provides your Blur to have a dispel and lowers its cooldown tremendously.",
      aghanims_shard:
        "A core item that provides break effect and adds to your burst potential.",
      basher:
        "A core item that provides control against elusive heroes and makes delivering damage a lot easier. Can be upgraded to Abyssal Blade.",
      satanic:
        "A core item that improves your sustain and applies dispel on cast. Stifling Daggers also lifesteal.",
      sphere: "Against powerful single-target disables and debuffs.",
      monkey_king_bar: "Against evasion.",
      nullifier: "To dispel defensive spells and items on opponents.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_wand",
            info: "Great item as she uses Stifling Dagger to farm and harass",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [
          { item: "ghost" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
        ],
        core: [
          { item: "hurricane_pike" },
          { item: "monkey_king_bar" },
          { item: "silver_edge" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
          {
            item: "revenants_brooch",
            info: "Your next 5 attacks have True strike that pierce through Blur.",
          },
        ],
        support: [],
        core: [
          { item: "bloodthorn", info: "For true strike against Blur" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  "Phantom Lancer": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804368,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961424",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "phantom_lancer_spirit_lance", // 1
          "phantom_lancer_phantom_edge", // 2
          "phantom_lancer_doppelwalk", // 3
          "phantom_lancer_phantom_edge", // 4
          "phantom_lancer_phantom_edge", // 5
          "phantom_lancer_juxtapose", // 6
          "phantom_lancer_phantom_edge", // 7
          "phantom_lancer_doppelwalk", // 8
          "phantom_lancer_doppelwalk", // 9
          "special_bonus_unique_phantom_lancer_2", // 10
          "phantom_lancer_doppelwalk", // 11
          "phantom_lancer_juxtapose", // 12
          "phantom_lancer_spirit_lance", // 13
          "phantom_lancer_spirit_lance", // 14
          "phantom_lancer_spirit_lance", // 15
          "special_bonus_unique_phantom_lancer_5", // 16
          "special_bonus_attributes", // 17
          "phantom_lancer_juxtapose", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_phantom_lancer", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_phantom_lancer_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "slippers",
            "faerie_fire",
            "circlet",
            "magic_stick",
          ],
          early_game: ["power_treads", "magic_wand", "wraith_band"],
          mid_game: ["diffusal_blade", "manta", "heart", "aghanims_shard"],
          late_game: ["octarine_core", "skadi", "butterfly", "abyssal_blade"],
          situational: [
            "infused_raindrop",
            "hood_of_defiance",
            "monkey_king_bar",
            "sphere",
            "bloodthorn",
            "silver_edge",
            "swift_blink",
          ],
          core: [
            "power_treads",
            "diffusal_blade",
            "manta",
            "heart",
            "aghanims_shard",
          ],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "vambrace",
            "pupils_gift",
            "titan_sliver",
            "elven_tunic",
            "ninja_gear",
            "the_leveller",
            "apex",
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      phantom_lancer_doppelwalk:
        "You can skill this spell on level 1 or 2 if there`s a need for dispel. On other hand, you can delay skilling this spell to level 4 if there`s no need for dispel.",
      special_bonus_unique_phantom_lancer_6:
        "On level 20, you can take this talent over the suggested one if you have no need of gap-closing.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that allows you to farm faster due to attack speed increase. It also provides the stat attributes which all the illusion based heroes adore.",
      hood_of_defiance: "Against a lot of magical damage in early to midgame.",
      diffusal_blade:
        "A cheap core item that provides you a lot of useful stat attributes but also the mana burn works with your illusions.",
      manta:
        "A core item that provides you with useful stat attributes, dispel and goes well with Diffusal Blade.",
      heart:
        "A core item that makes you and your illusions very tanky. An alternative would be tanking up with Skadi against immobile tanky heroes or ranged heroes.",
      skadi:
        "A core item that is usually used against tanky immobile heroes with a lot of regen and against ranged heroes since it immensely slows their attack speed and movespeed. Is an alternative to Heart.",
      aghanims_shard:
        "A core item that is really good at poking the opponents from the distance and provides a lot of value in longer fights. Creates additional chaos in the fights. Works well with Octarine.",
      octarine_core:
        "A core item that reduces the cooldown of all of your active spell and items. Goes well with Aghanim`s Shard and your 15th Talent (Spirit Lance cooldown -2).",
      butterfly:
        "A core item after you`ve tanked up. Good against physical damage heroes. Provides you with very good stats and evasion. Your illusion benefit from it very well.",
      monkey_king_bar: "Against evasion and miss chance.",
      sphere: "Against powerful single-target disables and debuffs.",
      bloodthorn:
        "To burst tanky heroes and for true strike. You illusions also crit on Bloodthorned hero.",
      silver_edge:
        "For break effect, burst and to reposition. Illusions have crit chance as well.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "armor", info: "Buy armor items" },
          {
            item: "magic_stick",
            info: "Phantom Lancer uses his Spirit Lance and Doppelganger to contest the lane.",
          },
        ],

        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [
          { item: "maelstrom" },
          { item: "bfury" },
          { item: "black_king_bar" },
          { item: "gungir" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "mjollnir" },
          { item: "shivas_guard" },
          { item: "radiance" },
          { item: "butterfly" },
          { item: "assault" },
          {
            item: "overwhelming_blink",
            info: "For some AoE damage against illusions",
          },
        ],
      },
    },
  },

  Phoenix: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804378,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961589",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "phoenix_icarus_dive", // 11
          "phoenix_supernova", // 12
          "phoenix_icarus_dive", // 13
          "phoenix_icarus_dive", // 14
          "special_bonus_spell_amplify_6", // 15
          "special_bonus_unique_phoenix_3", // 16
          "special_bonus_attributes", // 17
          "phoenix_supernova", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_phoenix_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_phoenix_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "enchanted_mango",
            "ring_of_protection",
            "circlet",
            "ward_observer",
          ],
          early_game: [
            "ward_sentry",
            "urn_of_shadows",
            "tranquil_boots",
            "magic_wand",
            "infused_raindrop",
          ],
          mid_game: [
            "holy_locket",
            "aghanims_shard",
            "cyclone",
            "meteor_hammer",
          ],
          late_game: [
            "shivas_guard",
            "ultimate_scepter",
            "refresher",
            "aeon_disk",
            "sheepstick",
            "travel_boots",
          ],
          situational: [
            "spirit_vessel",
            "lotus_orb",
            "blink",
            "glimmer_cape",
            "force_staff",
            "ghost",
            "heavens_halberd",
            "pipe",
            "radiance",
            "ethereal_blade",
            "kaya_and_sange",
          ],
          core: [
            "tranquil_boots",
            "holy_locket",
            "aghanims_shard",
            "shivas_guard",
          ],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            "mysterious_hat",
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            "psychic_headband",
            "ceremonial_robe",
            "spy_gadget",
            "spell_prism",
            "ascetic_cap",
            "timeless_relic",
            "seer_stone",
            "book_of_shadows",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      phoenix_fire_spirits: `Multiple fire spirits do not stack on the same target. Try to chain them instead of throwing them all at once on the same enemy hero`,
      special_bonus_spell_amplify_6:
        "On level 15 take the suggested level 15 talent over this level 10 talent. Dota client disallows me to display the order properly in graphics above.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace the ring of protection and mango for it.",
      infused_raindrop: "On hero against magical burst.",
      tranquil_boots:
        "A core boots upgrade. Solves hp sustain and movement speed issues for the hero.",
      spirit_vessel: "Against heavy-healing lineup.",
      holy_locket:
        "A core item that signifcantly amplifies healing coming from Sunray. Provides you with a second source of burst healing when activating the item.",
      aghanims_shard:
        "A core upgrade that allows you to use Sunray during Supernova. Ideally, use the Sunray before you activate Supernova so you have another Sunray once the egg explodes.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter:
        "A core item that allows you to save an ally with Supernova. It matches well with suggested level 25 talent and Blink Dagger.",
      blink:
        "Allows you to position to Sunray properly. Goes well with Aghanim`s Scepter in the late game to instantly save an ally.",
    },
    combo: [
      `phoenix_sun_ray`,
      `phoenix_fire_spirits`,
      `phoenix_icarus_dive`,
      `phoenix_supernova`,
      `phoenix_sun_ray`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          {
            item: "cloak",
            info: "Phoenix is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by magical damage and thus when Phoenix does his spell combo you can often times run away from Supernova quickly while being healed by active Tranquil Boots",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "AttackSpeed", info: "to destroy the egg" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "AttackSpeed", info: "to destroy the egg" }],
      },
    },
  },

  "Primal Beast": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE], // To be updated
        steam_guide_id: 1645697252,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2763260196",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "primal_beast_uproar", // 1
          "primal_beast_onslaught", // 2
          "primal_beast_onslaught", // 3
          "primal_beast_trample", // 4
          "primal_beast_onslaught", // 5
          "primal_beast_pulverize", // 6
          "primal_beast_onslaught", // 7
          "primal_beast_trample", // 8
          "primal_beast_trample", // 9
          "primal_beast_trample", // 10
          "primal_beast_uproar", // 11
          "primal_beast_pulverize", // 12
          "primal_beast_uproar", // 13
          "primal_beast_uproar", // 14
          "special_bonus_magic_resistance_12", // 15
          "special_bonus_unique_primal_beast_onslaught_damage", // 16
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
            "gauntlets",
            "branches",
            "circlet",
            "ring_of_protection",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: [
            "soul_ring",
            "phase_boots",
            "magic_wand",
            "bracer",
            "helm_of_iron_will",
            "armlet",
            "hood_of_defiance",
          ],
          mid_game: [
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "kaya_and_sange",
          ],

          late_game: [
            "overwhelming_blink",
            "shivas_guard",
            "assault",
            "octarine_core",
          ],
          situational: [
            "vanguard",
            "solar_crest",
            "crimson_guard",
            "pipe",
            "heavens_halberd",
            "lotus_orb",
            "radiance",
            "satanic",
          ],
          core: [
            "soul_ring",
            "phase_boots",
            "blink",
            "black_king_bar",
            "aghanims_shard",
          ],
          neutral: [
            "chipped_vest",
            "arcane_ring",
            "vambrace",
            "nether_shawl",
            "dragon_scale",
            "quickening_charm",
            "cloak_of_flames",
            "black_powder_bag",
            "spell_prism",
            "timeless_relic",
            "giants_ring",
            "fallen_sky",
          ],
        },
        item_tooltips: {
          helm_of_the_iron_will:
            "Good laning sustain item that can go into Armlet down the road.",
          armlet: "A good early game item that increases your damage output.",
          phase_boots: "A core boots upgrade for gap-closing.",
          crimson_guard:
            "Very strong against summon and illusion-based lineups and fast attacking heroes.",
          pipe: "Against heavy-magical damage lineups.",
          radiance:
            "Potentially a good buy against illusions and summons after you`ve tanked up a bit and you have a good start.",
          kaya_and_sange:
            "Gives you status resistance and amplifies your spells.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT], // Update steam_guide_id and steam_guide_link for support guide
        steam_guide_id: 1645853442,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2765463290",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "primal_beast_onslaught", // 1
          "primal_beast_trample", // 2
          "primal_beast_onslaught", // 3
          "primal_beast_trample", // 4
          "primal_beast_onslaught", // 5
          "primal_beast_pulverize", // 6
          "primal_beast_onslaught", // 7
          "primal_beast_trample", // 8
          "primal_beast_trample", // 9
          "primal_beast_uproar", // 10
          "primal_beast_uproar", // 11
          "primal_beast_pulverize", // 12
          "primal_beast_uproar", // 13
          "primal_beast_uproar", // 14
          "special_bonus_magic_resistance_12", // 15
          "special_bonus_unique_primal_beast_onslaught_damage", // 16
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
            "boots",
            "flask",
            "branches",
            "enchanted_mango",
            "faerie_fire",
            "orb_of_venom",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "tranquil_boots",
            "soul_ring",
            "magic_wand",
            "urn_of_shadows",
          ],
          mid_game: [
            "blink",
            "veil_of_discord",
            "boots_of_bearing",
            "aghanims_shard",
            "black_king_bar",
          ],
          late_game: [
            "wraith_pact",
            "arcane_blink",
            "refresher",
            "aeon_disk",
            "octarine_core",
          ],
          situational: ["spirit_vessel", "heavens_halberd", "lotus_orb"],
          core: [
            "tranquil_boots",
            "soul_ring",
            "blink",
            "boots_of_bearing",
            "aghanims_shard",
            "black_king_bar",
          ],
          neutral: [
            "pogo_stick",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            "spider_legs",
            "ceremonial_robe",
            "cloak_of_flames",
            "timeless_relic",
            "spell_prism",
            "ascetic_cap",
            "fallen_sky",
            "force_field",
          ],
        },
        item_tooltips: {
          tranquil_boots:
            "A core boots upgrade for health sustain. It should be upgraded to Boots of Bearing.",
          spirit_vessel: "Against heavy-healing heroes or lineups.",
        },
      },
    ],
    ability_tooltips: {
      primal_beast_uproar:
        "Consider putting a point in this spell early when you are getting harassed. It can increase your damage immensely. Goes well with Orb of Venom.",
      special_bonus_mp_regen_2:
        "Consider leveling this talent on level 10 if you have mana sustain problems.",
      special_bonus_unique_primal_beast_onslaught_damage:
        "On level 15, you can take this level 15 talent instead of the level 10 talent. The Dota client disallows me to indicate such order in graphics above.",
      special_bonus_unique_primal_beast_roar_dispells:
        "You can take this talent over the suggested one if the dispel has great value in the game.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      soul_ring:
        "A core item that helps with mana sustain and provides useful stats.",
      phase_boots: "A core boots upgrade for gap-closing.",
      infused_raindrop: "Against magical burst.",
      blink:
        "A core item that allows to instantly Pulverize an opponent among other benefits.",
      veil_of_discord:
        "Increases yours and your teammates spell damage output. Consider buying this with allied heroes like Zeus or Leshrac.",
      black_king_bar:
        "A core item that deals with most spells while Uproar deals with physical damage. Allows you to cast Pulverize in the middle of the fight.",
      aghanims_shard:
        "A core upgrade that adds another disable to Primal Beast`s arsenal.",
      heavens_halberd: "Particularly good against ranged right-clickers.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [],
    counter_items: {
      laning_phase: { all: [], support: [], core: [] },
      mid_game: { all: [], support: [], core: [] },
      late_game: { all: [], support: [], core: [] },
    },
  },

  Puck: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640804386,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961683",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_unique_puck_7", // 11
          "puck_dream_coil", // 12
          "puck_phase_shift", // 13
          "puck_phase_shift", // 14
          "puck_phase_shift", // 15
          "special_bonus_unique_puck_6", // 16
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
            "faerie_fire",
            "branches",
            "branches",
            "branches",
            "ward_observer",
          ],
          early_game: ["bottle", "null_talisman", "boots", "magic_wand"],
          mid_game: ["witch_blade", "travel_boots", "blink", "kaya"],

          late_game: [
            "ethereal_blade",
            "octarine_core",
            "revenants_brooch",
            "sheepstick",
            "arcane_blink",
          ],
          situational: [
            "cyclone",
            "sphere",
            "kaya_and_sange",
            "ultimate_scepter",
            "aeon_disk",
          ],
          core: [
            "bottle",
            "witch_blade",
            "travel_boots",
            "blink",
            "kaya",
            "ethereal_blade",
          ],
          neutral: [
            "mysterious_hat",
            "arcane_ring",
            "grove_bow",
            "vambrace",
            "psychic_headband",
            "quickening_charm",
            "timeless_relic",
            "spell_prism",
            "mirror_shield",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_puck_8:
        "Consider taking this talent over the other if you dont need as much control. This can go very well with Cooldown Reduction items.",
      puck_phase_shift:
        "You don`t have to skill this spell on level 2 if you are not being right-clicked often or you don`t need to dodge a spell.",
      puck_waning_rift:
        "You can max this spell out against elusive heroes. e.g Storm Spirit, Ember Spirit, Void Spirit.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      bottle:
        "A core item that provides you with sustain and allows you to gank with stored rune.",
      infused_raindrop: "Against magical burst.",
      witch_blade:
        "A core item that significantly increases the damage coming from your right-clicks.",
      travel_boots: "A core item that allows you to cover the map better.",
      blink:
        "A core item that allows you to seize an opportunity and land a multi-hero Mystic Coil. Works well with Phase Shift when it comes to escaping.",
      ethereal_blade:
        "A core item that increases your damage output or alternatively used to save you from physical damage.",
      kaya_and_sange:
        "A core item that provides you with a mix of defensive and offensive stats.",
      aghanims_shard: "A situational item if you go for a right click build.",
      ultimate_scepter: "A situational item against invisible heroes.",
      sphere: "Aghainst powerful single-target disables or debuffs.",
      aeon_disk: "Against lineups with a lot of catch, disables and burst.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Puck tends to use Illusory Orb and Waning Rift frequently to kill creeps or harass you",
          },

          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Puck is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [
          {
            item: "cloak",
            info: "Puck is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
          { item: "manta", info: "To dispel Wanning Rift" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          {
            item: "satanic",
            info: "To be able stand your ground while coiled and dispel Waning Rift silence",
          },
          { item: "assault", info: "Against a right-click Puck" },
          { item: "butterfly", info: "Against a right-click Puck" },
        ],
      },
    },
  },

  Pudge: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804395,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961775",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "pudge_meat_hook", // 1
          "pudge_rot", // 2
          "pudge_rot", // 3
          "pudge_flesh_heap", // 4
          "pudge_meat_hook", // 5
          "pudge_dismember", // 6
          "pudge_meat_hook", // 7
          "pudge_meat_hook", // 8
          "pudge_rot", // 9
          "pudge_rot", // 10
          "special_bonus_armor_4", // 11
          "pudge_dismember", // 12
          "pudge_flesh_heap", // 13
          "pudge_flesh_heap", // 14
          "special_bonus_unique_pudge_7", // 15
          "pudge_flesh_heap", // 16
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
            "boots",
            "clarity",
            "flask",
            "enchanted_mango",
            "wind_lace",
            "branches",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "tranquil_boots",
            "soul_ring",
            "magic_wand",
            "urn_of_shadows",
            "smoke_of_deceit",
          ],
          mid_game: [
            "blink",
            "aether_lens",
            "aghanims_shard",
            "ghost",
            "glimmer_cape",
            "force_staff",
            "hood_of_defiance",
            "blade_mail",
            "rod_of_atos",
          ],
          late_game: [
            "octarine_core",
            "ethereal_blade",
            "ultimate_scepter",
            "overwhelming_blink",
          ],
          situational: [
            "spirit_vessel",
            "pipe",
            "cyclone",
            "lotus_orb",
            "black_king_bar",
          ],
          core: [
            "tranquil_boots",
            "magic_wand",
            "blink",
            "aether_lens",
            "aghanims_shard",
          ],
          neutral: [
            "keen_optic",
            "pogo_stick",
            "philosophers_stone",
            "essence_ring",
            "bullwhip",
            "spider_legs",
            "psychic_headband",
            "spy_gadget",
            "trickster_cloak",
            "giants_ring",
            "force_field",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock the pull camp.",
          tranquil_boots:
            "A core boots upgrade that provides you with hp sustain and great movement speed.",
          spirit_vessel: "Against heavy healing lineup.",
          black_king_bar: "To channel Dismember without interruption.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1641704881,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2713377028",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
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
          "special_bonus_armor_4", // 10
          "pudge_flesh_heap", // 11
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
            "quelling_blade",
            "ring_of_protection",
            "gauntlets",
            "branches",
            "enchanted_mango",
            "bracer",
            "magic_stick",
          ],
          early_game: [
            "phase_boots",
            "magic_wand",
            "soul_ring",
            "hood_of_defiance",
          ],
          mid_game: [
            "blink",
            "black_king_bar",
            "ultimate_scepter",
            "eternal_shroud",
            "aghanims_shard",
            "aether_lens",
          ],
          late_game: [
            "shivas_guard",
            "overwhelming_blink",
            "heart",
            "octarine_core",
          ],
          situational: [
            "crimson_guard",
            "lotus_orb",
            "pipe",
            "cyclone",
            "force_staff",
            "blade_mail",
          ],
          core: [
            "phase_boots",
            "vanguard",
            "hood_of_defiance",
            "blink",
            "aghanims_shard",
            "black_king_bar",
            "ultimate_scepter",
          ],
          neutral: [
            "chipped_vest",
            "arcane_ring",
            "dragon_scale",
            "essence_ring",
            "cloak_of_flames",
            "black_powder_bag",
            "trickster_cloak",
            "ascetic_cap",
            "giants_ring",
            "force_field",
          ],
        },
        item_tooltips: {
          phase_boots:
            "A core boots upgrade that provides you with much needed armor and movement speed boost.",
          vanguard:
            "A core item that tanks you up and allows you to cut-waves, clear stacks and dive towers. You can also disassemble it.",
          hood_of_defiance:
            "A core item that tanks you up by reducing damage you take from magical sources including Rot.",
          eternal_shroud:
            "An upgrade to Hood of Defiance. Provides you with spell lifesteal that goes well with your skill set.",
          aether_lens:
            "Increases the range of your Hook and Dismember while providing you good stats. Goes into Octarine Core down the road.",
          aghanims_shard:
            "Allows you to use Dismember on an allied hero, potentially saving them from death and healing them in the process.",
          crimson_guard:
            "Against fast attacking right-clickers, illusions and summons.",
          black_king_bar:
            "A core item that allows you to channel Dismember fully.",
          ultimate_scepter:
            "A core item that improves Rot`s AoE and damage significantly. Reduces some healing on affected heroes too.",
        },
      },
    ],
    ability_tooltips: {
      pudge_meat_hook:
        "You can use this to secure range creeps, catapults and even big neutral creeps as it instantly kills them.",
      special_bonus_spell_lifesteal_10:
        " Consider taking this talent if you are close or already have Aghanims Scepter.",
      special_bonus_unique_pudge_1:
        "Consider taking this talent over the other if you want to tank up even more. Flesh heap is Retroactive.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      blink:
        "A core item that allows you to land Hook easier or to save an ally. Goes well with Aghanim`s Shard.",
      aghanims_shard:
        "A core item that allows you to save an ally in trouble. Goes well with Blink and Aether Lens.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To avoid Meat hooks and being able to offset the Rot slow",
          },
          {
            item: "boots",
            info: "To avoid Meat hooks and being able to offset the Rot slow",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel as Pudge has high HP and Vessel removes percentage of it and offsets some of the healing from Dismember",
          },
        ],
        support: [
          {
            item: "ward_observer",
            info: "Place wards to see Pudge and avoid being hooked",
          },
        ],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }, { item: "lotus_orb" }],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "cyclone" },
        ],
        core: [
          { item: "desolator" },
          { item: "mage_slayer" },
          { item: "hurricane_pike" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere" },
          { item: "wind_waker", info: "To save an ally being Dismembered" },
        ],
        support: [],
        core: [{ item: "bloodthorn" }],
      },
    },
  },

  Pugna: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640804407,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961859",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "pugna_nether_ward", // 15
          "special_bonus_unique_pugna_4", // 16
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
            "circlet",
            "branches",
            `branches`,
            "ward_observer",
          ],
          early_game: [
            "bottle",
            "null_talisman",
            "arcane_boots",
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            "aether_lens",
            "travel_boots",
            `aghanims_shard`,
            "dagon",
            "blink",
            "kaya_and_sange",
          ],
          late_game: ["octarine_core", "aeon_disk", "sheepstick"],
          situational: [
            `ward_sentry`,
            `glimmer_cape`,
            `cyclone`,
            `force_staff`,
            `ghost`,
            `lotus_orb`,
            "black_king_bar",
            "sphere",
            `shivas_guard`,
            `ultimate_scepter`,
            `travel_boots_2`,
          ],
          core: [
            "bottle",
            "arcane_boots",
            "aether_lens",
            "travel_boots",
            `aghanims_shard`,
            "dagon",
            "blink",
            "octarine_core",
          ],
          neutral: [
            "keen_optic",
            "mysterious_hat",
            `arcane_ring`,
            "vambrace",
            "essence_ring",
            `bullwhip`,
            "psychic_headband",
            "quickening_charm",
            `spider_legs`,
            "timeless_relic",
            "spell_prism",
            `flicker`,
            `stormcrafter`,
            "ex_machina",
            "seer_stone",
            `mirror_shield`,
            `demonicon`,
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to gank with stored rune.",
          arcane_boots:
            "A core item that helps with mana sustain. It will be disassembled and Energy Booster used for Aether Lens. Boots should be used for Boots of Travel.",
          travel_boots: "A core item that allows you to cover the map better.",
          aghanims_shard: `Lets you play fights from a great distance while still doing most of your damage in fights.`,
          black_king_bar:
            "Agaist a lot of disables, silences and magical damage.",
          dagon:
            "A core item that provides you with magical burst. Goes well with Decrepify. You don`t have to upgrade it to level 5 right away. It instantly kills basic illusions.",
          sphere: "Aghainst powerful single target disables or burst damage.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1642312278,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2721136673",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "pugna_nether_blast", // 1
          "pugna_decrepify", // 2
          "pugna_nether_blast", // 3
          "pugna_decrepify", // 4
          "pugna_nether_blast", // 5
          "pugna_life_drain", // 6
          "pugna_nether_blast", // 7
          `pugna_nether_ward`, // 8
          "pugna_decrepify", // 9
          "special_bonus_hp_200", // 10
          `pugna_decrepify`, // 11
          "pugna_life_drain", // 12
          "pugna_nether_ward", // 13
          "pugna_nether_ward", // 14
          "pugna_nether_ward", // 15
          "special_bonus_unique_pugna_6", // 16
          "special_bonus_attributes", // 17
          "pugna_life_drain", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_pugna_1", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_pugna_3", // 25
        ],
        items: {
          starting: ["tango", `boots`, "ward_observer"],
          early_game: [
            `ward_sentry`,
            "arcane_boots",
            "null_talisman",
            `magic_wand`,
            `infused_raindrop`,
          ],
          mid_game: [
            "aether_lens",
            "tranquil_boots",
            "holy_locket",
            `aghanims_shard`,
            "blink",
            "glimmer_cape",
            "force_staff",
          ],
          late_game: [
            "octarine_core",
            "aeon_disk",
            "sheepstick",
            `ultimate_scepter`,
          ],
          situational: [
            `cyclone`,
            `ghost`,
            "lotus_orb",
            `wind_waker`,
            `sphere`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "aether_lens",
            "tranquil_boots",
            "holy_locket",
            `aghanims_shard`,
          ],
          neutral: [
            "keen_optic",
            "pogo_stick",
            `mysterious_hat`,
            "philosophers_stone",
            "bullwhip",
            `nether_shawl`,
            "psychic_headband",
            "spider_legs",
            `quickening_charm`,
            "spy_gadget",
            "trickster_cloak",
            `stormcrafter`,
            `heavy_blade`,
            "seer_stone",
            "book_of_shadows",
          ],
        },
        item_tooltips: {
          arcane_boots:
            "A core item that helps with mana sustain. It will be disassembled and Energy Booster used for Aether Lens. Boots should be used for Tranquil Boots.",
          tranquil_boots:
            "A core item for hp sustain while healing an ally with Life Drain.",
          holy_locket:
            "A core item that further increases your healing output. Provides you with burst of healing and mana upon activation.",
          aghanims_shard: `Lets you play fights from a great distance while still doing most of your damage in fights.`,
          glimmer_cape: "Can be used while channeling Life Drain.",
          lotus_orb: "For reflect, dispel and armor",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      aether_lens:
        "A core item that allows you to cast spells and items from further away.",
      blink:
        "A core item that allows you to position well. Can be upgraded down the road to Overwhelming Blink.",
      octarine_core:
        "A core item that reduces cooldown of your spells and items.",
      aghanims_shard:
        "Good against illusion based heroes as Life Drain destroys basic illusions instantly.",
    },
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
          {
            item: "magic_stick",
            info: "Pugna tends to use Nether Blast and Decrepify frequently to harass or kill the creeps",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          {
            item: "wind_lace",
            info: "To dodge Nether Blasts and run out of the Life Drain range",
          },
          {
            item: "boots",
            info: "To dodge Nether Blasts and run out of the Life Drain range",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Pugna is heavy on magical damage and Cloak will reduce 15% of it",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to offset healing coming from Life Drain",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by magical damage and thus when Pugna does his spell combo you can often times run away quickly while being healed by active Tranquil Boots",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "manta", info: "To dispel Decrepify and cancel Life Drain" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "nullifier", info: "To dispel Decrepify" },
          { item: "satanic", info: "To dispel Decrepify from yourself" },
        ],
      },
    },
  },

  "Queen of Pain": {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID, DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804415,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699961952",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "queenofpain_scream_of_pain", // 1
          "queenofpain_shadow_strike", // 2
          "queenofpain_shadow_strike", // 3
          "queenofpain_blink", // 4
          "queenofpain_scream_of_pain", // 5
          "queenofpain_sonic_wave", // 6
          "queenofpain_scream_of_pain", // 7
          "queenofpain_scream_of_pain", // 8
          "queenofpain_blink", // 9
          "special_bonus_attack_damage_20", // 10
          "queenofpain_blink", // 11
          "queenofpain_sonic_wave", // 12
          "queenofpain_blink", // 13
          "queenofpain_shadow_strike", // 14
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
            "circlet",
            "branches",
            "mantle",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["bottle", "null_talisman", "power_treads"],
          mid_game: [
            "kaya_and_sange",
            "aghanims_shard",
            "black_king_bar",
            "orchid",
            "cyclone",
          ],
          late_game: [
            "shivas_guard",
            "sheepstick",
            "refresher",
            "bloodthorn",
            "ethereal_blade",
          ],
          situational: ["infused_raindrop", "sphere"],
          core: [
            "bottle",
            "power_treads",
            "kaya_and_sange",
            "black_king_bar",
            "aghanims_shard",
            "shivas_guard",
            "sheepstick",
          ],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "grove_bow",
            "vambrace",
            "mind_breaker",
            "quickening_charm",
            "spell_prism",
            "timeless_relic",
            "ex_machina",
            "mirror_shield",
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to gank with stored rune.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1642312289,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2721136803",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
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
          "special_bonus_strength_11", // 10
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
            "circlet",
            "branches",
            "faerie_fire",
            "mantle",
            "enchanted_mango",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["urn_of_shadows", "power_treads", "null_talisman"],
          mid_game: [
            "kaya_and_sange",
            "aghanims_shard",
            "black_king_bar",
            "cyclone",
            "orchid",
          ],
          late_game: [
            "shivas_guard",
            "sheepstick",
            "refresher",
            "bloodthorn",
            "ethereal_blade",
          ],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "lotus_orb",
            "sphere",
          ],
          core: [
            "urn_of_shadows",
            "power_treads",
            "kaya_and_sange",
            "black_king_bar",
            "aghanims_shard",
            "shivas_guard",
            "sheepstick",
          ],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "grove_bow",
            "vambrace",
            "quickening_charm",
            "enchanted_quiver",
            "spell_prism",
            "timeless_relic",
            "ex_machina",
            "mirror_shield",
          ],
        },
        item_tooltips: {
          urn_of_shadows:
            "A core item that allows you to snowball of off first kill.",
          spirit_vessel: "Against a heavy-healing lineup",
          lotus_orb:
            "For reflect, dispel and some armor, an alternative to Shiva`s Guard.",
        },
      },
    ],
    ability_tooltips: {
      special_bonus_spell_block_18:
        "You can take this level 25 talent over the suggested one if you are in need for Linken`s sphere effect.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "On hero against magical burst.",
      power_treads:
        "A core boots upgrade that adds to your right-click dps and by toggling it you can save some mana.",
      orchid:
        "If you have a great start, you can pick up this item. You can kill most of the heroes by yourself.",
      kaya_and_sange:
        "A core item that provides you with mix of defensive and offensive stats",
      black_king_bar:
        "A core item that allows you to play in the middle of the fight, get spells off and right-click.",
      aghanims_shard:
        "A core upgrade that adds silence to your utility arsenal and some extra damage.",
      sphere: "Aghainst powerful single target disables and debuffs.",
      shivas_guard:
        "A core item that adds armor and more AoE damage. It also reduces healing on opponents.",
      sheepstick:
        "A core item that allows you to instantly disable and burst an opponent.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Queen of Pain will use Shadow Strike and Scream of Pain frequently to harras or kill the creeps",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "cloak",
            info: "Queen of Pain is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by magical damage and thus when Queen does her spell combo you can often times run away quickly while being healed by active Tranquil Boots",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "rod_of_atos" }, { item: "cyclone" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "hurricane_pike" },
          { item: "manta", info: "To dispel Orchid and Shadow Strike" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "abyssal_blade" }],
      },
    },
  },

  Razor: {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804423,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962040",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "razor_static_link", // 1
          "razor_plasma_field", // 2
          "razor_static_link", // 3
          "razor_plasma_field", // 4
          "razor_plasma_field", // 5
          "razor_eye_of_the_storm", // 6
          "razor_plasma_field", // 7
          "razor_unstable_current", // 8
          "razor_static_link", // 9
          "special_bonus_agility_9", // 10
          "razor_static_link", // 11
          "razor_eye_of_the_storm", // 12
          "razor_unstable_current", // 13
          "razor_unstable_current", // 14
          `special_bonus_strength_14`, // 15
          `razor_unstable_current`, // 16
          "special_bonus_attributes", // 17
          "razor_eye_of_the_storm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_razor_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_attack_speed_80", // 25
        ],
        items: {
          starting: ["tango", `flask`, "quelling_blade", "slippers", "circlet"],
          early_game: [
            `falcon_blade`,
            `power_treads`,
            `magic_wand`,
            "wraith_band",
            `infused_raindrop`,
          ],
          mid_game: ["black_king_bar", `blink`, "refresher"],
          late_game: [
            `ultimate_scepter`,
            "assault",
            "satanic",
            "skadi",
            `butterfly`,
            `swift_blink`,
          ],
          situational: [
            `phase_boots`,
            `dragon_lance`,
            `cyclone`,
            `overwhelming_blink`,
            `aghanims_shard`,
            `sange_and_yasha`,
            `lotus_orb`,
            `sphere`,
            `heavens_halberd`,
            `sheepstick`,
            `nullifier`,
            `shivas_guard`,
            `monkey_king_bar`,
            `travel_boots`,
          ],
          core: [
            `falcon_blade`,
            `power_treads`,
            `black_king_bar`,
            `blink`,
            `refresher`,
          ],
          neutral: [
            "arcane_ring",
            "pogo_stick",
            `unstable_wand`,
            "quicksilver_amulet",
            "vambrace",
            `grove_bow`,
            "elven_tunic",
            "mind_breaker",
            `titan_sliver`,
            "the_leveller",
            "ninja_gear",
            `flicker`,
            "desolator_2",
            "pirate_hat",
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          falcon_blade: `Rush this before anything else in the lane. It lets you scale in the early game.`,
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1642400064,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2722413092",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          `razor_plasma_field`, // 1
          `razor_static_link`, // 2
          "razor_static_link", // 3
          "razor_plasma_field", // 4
          "razor_plasma_field", // 5
          "razor_eye_of_the_storm", // 6
          "razor_plasma_field", // 7
          "razor_unstable_current", // 8
          "razor_static_link", // 9
          "special_bonus_agility_9", // 10
          "razor_static_link", // 11
          "razor_eye_of_the_storm", // 12
          "razor_unstable_current", // 13
          "razor_unstable_current", // 14
          `special_bonus_strength_14`, // 15
          `razor_unstable_current`, // 16
          "special_bonus_attributes", // 17
          "razor_eye_of_the_storm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_razor_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_attack_speed_80", // 25
        ],
        items: {
          starting: [
            "tango",
            `flask`,
            "quelling_blade",
            "slippers",
            "circlet",
            `ward_observer`,
          ],
          early_game: [
            `falcon_blade`,
            `power_treads`,
            `magic_wand`,
            `wraith_band`,
            `infused_raindrop`,
          ],
          mid_game: [`black_king_bar`, `blink`, `refresher`],
          late_game: [
            `ultimate_scepter`,
            `assault`,
            `satanic`,
            `skadi`,
            `butterfly`,
            `swift_blink`,
          ],
          situational: [
            `phase_boots`,
            `dragon_lance`,
            `cyclone`,
            `overwhelming_blink`,
            `aghanims_shard`,
            `sange_and_yasha`,
            `lotus_orb`,
            `sphere`,
            `heavens_halberd`,
            `sheepstick`,
            `nullifier`,
            `shivas_guard`,
            `monkey_king_bar`,
            `travel_boots`,
          ],
          core: [
            `falcon_blade`,
            `power_treads`,
            `black_king_bar`,
            `blink`,
            `refresher`,
          ],
          neutral: [
            `arcane_ring`,
            `pogo_stick`,
            `unstable_wand`,
            `quicksilver_amulet`,
            `vambrace`,
            `grove_bow`,
            `elven_tunic`,
            `mind_breaker`,
            `titan_sliver`,
            `the_leveller`,
            `ninja_gear`,
            `flicker`,
            `desolator_2`,
            `pirate_hat`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          falcon_blade: `Rush this before anything else in the lane. It lets you scale in the early game.`,
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1642400073,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2722413152",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "razor_static_link", // 1
          "razor_plasma_field", // 2
          "razor_static_link", // 3
          "razor_plasma_field", // 4
          "razor_plasma_field", // 5
          "razor_eye_of_the_storm", // 6
          "razor_plasma_field", // 7
          "razor_unstable_current", // 8
          "razor_static_link", // 9
          "special_bonus_agility_9", // 10
          "razor_static_link", // 11
          "razor_eye_of_the_storm", // 12
          "razor_unstable_current", // 13
          "razor_unstable_current", // 14
          `special_bonus_strength_14`, // 15
          `razor_unstable_current`, // 16
          "special_bonus_attributes", // 17
          "razor_eye_of_the_storm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_razor_2", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_attack_speed_80", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            `branches`,
            `branches`,
            "circlet",
            "quelling_blade",
            `ward_observer`,
          ],
          early_game: [
            `bottle`,
            `power_treads`,
            `magic_wand`,
            `wraith_band`,
            `infused_raindrop`,
          ],
          mid_game: [`black_king_bar`, `blink`, `refresher`],
          late_game: [
            `ultimate_scepter`,
            `assault`,
            `satanic`,
            `skadi`,
            `butterfly`,
            `swift_blink`,
          ],
          situational: [
            `phase_boots`,
            `dragon_lance`,
            `cyclone`,
            `overwhelming_blink`,
            `aghanims_shard`,
            `sange_and_yasha`,
            `lotus_orb`,
            `sphere`,
            `heavens_halberd`,
            `sheepstick`,
            `nullifier`,
            `shivas_guard`,
            `monkey_king_bar`,
            `travel_boots`,
          ],
          core: [
            `bottle`,
            `power_treads`,
            `black_king_bar`,
            `blink`,
            `refresher`,
          ],
          neutral: [
            `arcane_ring`,
            `pogo_stick`,
            `unstable_wand`,
            `ocean_heart`,
            `quicksilver_amulet`,
            `vambrace`,
            `grove_bow`,
            `elven_tunic`,
            `mind_breaker`,
            `titan_sliver`,
            `the_leveller`,
            `ninja_gear`,
            `flicker`,
            `desolator_2`,
            `pirate_hat`,
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to gank with stored rune.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that provides you with attack speed increase that allows you to hit more often while having extra damage from Static Link. Toggling the item will save you mana as well.",
      phase_boots: `You can get Phase Boots instead of Power Treads if there are enemy heroes who reduce your armor like Weaver or Phantom Assassin.`,
      black_king_bar:
        "A core item that allows you to play in the middle of the fight and get a full static link off.",
      refresher:
        "A core item that allows you to have 2 Eye of the Storm, Static Link and Black King Bar in the fight among the other things it refreshes.",
      blink: `Allows you to gap-close and get Static Link off on desired hero. You can get it even before Black King Bar against ranged cores like Sniper.`,
      sphere: "Against powerful single-target disables and debuffs.",
      assault:
        "A core item that amplifies physical damage output of your hero while also granting you armor.",
      shivas_guard:
        "An alternative to Assault that is good against illusion-based heros and a lot of healing. Adds to your AoE damage output and slow.",
      satanic:
        "A core item that tanks you up and provides you with sustain through its active. The active applies basic dispel on cast. You will have two usages with Refresher.",
      monkey_king_bar: "Against evasion and miss chance.",
    },
    combo: [
      `razor_eye_of_the_storm`,
      `razor_plasma_field`,
      `blink`,
      `black_king_bar`,
      `razor_static_link`,
      `refresher`,
      `razor_eye_of_the_storm`,
      `black_king_bar`,
      `razor_static_link`,
      `razor_plasma_field`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "Razor is looking to close the gap and stick a Static Link onto a target and wind_lace will help you keep the distance or run away",
          },
          {
            item: "boots",
            info: "Razor is looking to close the gap and stick a Static Link onto a target and wind_lace will help you keep the distance or run away",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [{ item: "hurricane_pike" }],
      },
      late_game: {
        all: [{ item: "sphere" }, { item: "sheepstick" }],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Riki: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804432,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962133",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_unique_riki_2", // 10
          "riki_tricks_of_the_trade", // 11
          "riki_backstab", // 12
          "riki_smoke_screen", // 13
          "riki_smoke_screen", // 14
          "special_bonus_unique_riki_3", // 15
          "riki_smoke_screen", // 16
          "special_bonus_attributes", // 17
          "riki_backstab", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_riki_1", // 20
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
            "branches",
            "slippers",
            "circlet",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: [
            "orb_of_corrosion",
            "power_treads",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: ["diffusal_blade", "manta", "aghanims_shard", "basher"],
          late_game: [
            "skadi",
            "ultimate_scepter",
            "greater_crit",
            "abyssal_blade",
            "butterfly",
          ],
          situational: [
            "infused_raindrop",
            "battle_fury",
            "black_king_bar",
            "blink",
            "nullifier",
            "sphere",
          ],
          core: [
            "orb_of_corrosion",
            "power_treads",
            "diffusal_blade",
            "manta",
            "basher",
          ],
          neutral: [
            "unstable_wand",
            "possessed_mask",
            "vambrace",
            "ring_of_aquila",
            "titan_sliver",
            "mind_breaker",
            "ninja_gear",
            "penta_edged_sword",
            "apex",
            "desolator_2",
          ],
        },
        item_tooltips: {
          orb_of_corrosion:
            "A core item that allows you to stay on top of opponent and amplifies physical damage output through armor reduction.",
          power_treads:
            "A core item that provides you with attack speed and agility. The more agility, the more damage you will do with backstabs.",
          diffusal_blade:
            "A core item that provides you with tons of agility and ability to keep opponents under Smoke Screen longer.",
          manta:
            "A core item that dispels Dust of Appearance from you. Manta illusions can also backstab.",
          basher:
            "A core item that allows you to lock the target you are focusing.",
          black_king_bar:
            "Against a lot of disables, magical damage and as a dispel.",
          blink: "To close the gap and jump out from Tricks of Trade.",
          nullifier:
            "To dispel defensive spells and items that prevent you from right-clicking the opponents.",
          sphere: "Against powerful single-target disables and debuffs.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1642400084,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2722413235",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "special_bonus_strength_8", // 11
          "riki_backstab", // 12
          "riki_tricks_of_the_trade", // 13
          "riki_tricks_of_the_trade", // 14
          "special_bonus_unique_riki_2", // 15
          "riki_tricks_of_the_trade", // 16
          "special_bonus_attributes", // 17
          "riki_backstab", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_riki_9", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_riki_7", // 25
        ],
        items: {
          starting: [
            "tango",
            "orb_of_venom",
            "branches",
            "boots",
            "flask",
            "faerie_fire",
            "crown",
            "ward_sentry",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["meteor_hammer", "tranquil_boots", "magic_wand"],
          mid_game: ["cyclone", "aghanims_shard", "blink"],
          late_game: ["sheepstick", "aeon_disk", "octarine_core"],
          situational: ["infused_raindrop", "lotus_orb", "blink"],
          core: [
            "meteor_hammer",
            "tranquil_boots",
            "aghanims_shard",
            "cyclone",
            "blink",
          ],
          neutral: [
            "unstable_wand",
            "trusty_shovel",
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            "spider_legs",
            "spell_prism",
            "flicker",
            "fallen_sky",
            "demonicon",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock a pull camp.",
          meteor_hammer:
            "A core item that provides you with waveclear and tower damage. Combines well with the Aghanim`s Shard down the road. You can cast it out of invisibility.",
          tranquil_boots:
            "A core boots upgrade that provides you with a lot of movement speed and hp sustain.",
          cyclone:
            "A core item that allows you to control opponents but also dispel dust off of yourself.",
          blink:
            "A core item that allows you to gap-close and get close to specific target you want to disables. You can blink out of Tricks of Trade and save yourself.",
          lotus_orb: "For reflect, dispel and some armor.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      aghanims_shard: "A core item that provides you with extra control.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from Riki and escape the Smoke Screen",
          },
          {
            item: "boots",
            info: "To keep the distance from Riki and escape the Smoke Screen",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [{ item: "ward_sentry" }, { item: "dust" }],
        core: [],
      },
      mid_game: {
        all: [{ item: "rod_of_atos" }],
        support: [
          { item: "SentryDustGem" },
          { item: "force_staff" },
          { item: "ghost" },
          { item: "glimmer_cape" },
        ],
        core: [
          { item: "crimson_guard" },
          { item: "hurricane_pike" },
          { item: "silver_edge" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [{ item: "SentryDustGem" }],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "monkey_king_bar" },
          { item: "bloodthorn" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Rubick: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804443,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962219",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "rubick_fade_bolt", // 1
          "rubick_telekinesis", // 2
          "rubick_fade_bolt", // 3
          "rubick_arcane_supremacy", // 4
          "rubick_fade_bolt", // 5
          "rubick_spell_steal", // 6
          "rubick_fade_bolt", // 7
          "rubick_arcane_supremacy", // 8
          "rubick_arcane_supremacy", // 9
          "rubick_arcane_supremacy", // 10
          "rubick_telekinesis", // 11
          "rubick_spell_steal", // 12
          "rubick_telekinesis", // 13
          "rubick_telekinesis", // 14
          "special_bonus_unique_rubick_8", // 15
          "special_bonus_unique_rubick_6", // 16
          "special_bonus_attributes", // 17
          "rubick_spell_steal", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_rubick", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_rubick_4", // 25
        ],
        items: {
          starting: [
            "tango",
            "boots",
            "faerie_fire",
            "flask",
            "branches",
            "circlet",
            "enchanted_mango",
            "mantle",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "arcane_boots",
            "magic_wand",
            "null_talisman",
            "ring_of_basilius",
            "urn_of_shadows",
          ],
          mid_game: [
            "aether_lens",
            "blink",
            "aghanims_shard",
            "ghost",
            "force_staff",
            "glimmer_cape",
            "cyclone",
          ],
          late_game: ["aeon_disk", "octarine_core", "ultimate_scepter"],
          situational: ["infused_raindrop", "spirit_vessel", "lotus_orb"],
          core: ["arcane_boots", "aether_lens", "blink", "aghanims_shard"],
          neutral: [
            "keen_optic",
            "pogo_stick",
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            "spider_legs",
            "spy_gadget",
            "spell_prism",
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {
      rubick_telekinesis:
        "You can put a point in this spell at level 2 already if you apply pressure with it.",
      special_bonus_unique_rubick_8:
        "On level 15, take the suggested level 15 talent over this level 10 talent. Dota 2 client disallows me to indicate that order in the graphics above.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      ring_of_basilius: "If your laning partner uses a lot of mana early.",
      infused_raindrop: "On hero against magical burst.",
      arcane_boots:
        "A core boots upgrade that helps with mana sustain. Can be disassembled and Energy Booster used for Aether Lens. You should upgrade to Tranquil Boots afterwards.",
      spirit_vessel: "Against heavy-healing lineup",
      aether_lens:
        "A core item that allows you to cast spells and items from further away.",
      blink:
        "A core item that allows you to instantly initiate or save an ally.",
      aghanims_shard:
        "To reposition an ally in trouble and to get Aghanim`s Shard upgrades on stolen spells.",
      lotus_orb: "To reflect, dispel and armor.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Rubick is going to use Fade Bolt every wave to harass and reduce your damage",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          { item: "infused_raindrop" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [{ item: "black_king_bar" }],
      },
      late_game: {
        all: [{ item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  "Sand King": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804451,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962310",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "sandking_caustic_finale", // 1
          "sandking_burrowstrike", // 2
          "sandking_sand_storm", // 3
          "sandking_sand_storm", // 4
          "sandking_sand_storm", // 5
          "sandking_epicenter", // 6
          "sandking_sand_storm", // 7
          "sandking_burrowstrike", // 8
          "sandking_burrowstrike", // 9
          "sandking_burrowstrike", // 10
          "special_bonus_unique_sand_king_2", // 11
          "sandking_epicenter", // 12
          "sandking_caustic_finale", // 13
          "sandking_caustic_finale", // 14
          "special_bonus_unique_sand_king_3", // 15
          "sandking_caustic_finale", // 16
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
            "quelling_blade",
            "branches",
            "gauntlets",
            "ring_of_protection",
            "faerie_fire",
            "flask",
            "magic_stick",
          ],
          early_game: [
            "boots",
            "soul_ring",
            "magic_wand",
            "bracer",
            "vanguard",
            "hood_of_defiance",
            "infused_raindrop",
          ],
          mid_game: [
            "blink",
            "cyclone",
            "kaya",
            "travel_boots",
            "aghanims_shard",
            "ghost",

          ],
          late_game: [
            "shivas_guard",
            "kaya_and_sange",
            "ethereal_blade",
            "octarine_core",
            "sheepstick",
            "ultimate_scepter",
            "aeon_disk",
          ],
          situational: ["eternal_shroud", "heavens_halberd", "black_king_bar", "lotus_orb"],
          core: [
            "soul_ring",
            "blink",
            "cyclone",
            "travel_boots",
            "aghanims_shard",
          ],
          neutral: [
            "mysterious_hat",
            "arcane_ring",
            "vambrace",
            "essence_ring",
            "nether_shawl",
            "quickening_charm",
            "ceremonial_robe",
            "cloak_of_flames",
            "timeless_relic",
            "spell_prism",
            "giants_ring",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      soul_ring:
        "A core item that helps with mana sustain. It provides Sand King with useful stats.",
      blink: "A core item that allows you to channel Epicenter and jump in.",
      cyclone:
        "A core item that gives you very good stats, allows you to setup kills and dispel dust off of yourself.",
      travel_boots:
        "A core item that allows you to cover the map better. Sand King is really good at pushing sidelanes in quickly and without much of a risk.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      black_king_bar:
        "Against a lot of disables, magical damage and as a dispel.",
      aghanims_shard: "A core item that adds extra AoE damage and burst.",
      lotus_orb: "For reflecting, dispelling and armor.",
    },
    combo: [
      `sandking_epicenter`,
      `blink_dagger`,
      `sandking_burrowstrike`,
      `sandking_sandstorm`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          { item: "magic_stick" },
          {
            item: "lifesteal",
            info: "For sustaining through Sand Kings damage output on the lane.",
          },
          {
            item: "ring_of_health",
            info: "For sustaining through Sand Kings damage output on the lane.",
          },
          {
            item: "infused_raindrop",
            info: "Nullifies some of the damage that Burrowstrike does.",
          },
          {
            item: "cloak",
            info: "Sand King is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [{ item: "ward_sentry" }, { item: "dust" }],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [
          { item: "SentryDust" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
        ],
        core: [
          {
            item: "mage_slayer",
            info: "Provides you magic resistance,and spell damage debuff (-35%).",
          },
          {
            item: "hood_of_defiance",
            info: "Since Sandking has a lot of AOE magical damage spells, this item will nullify a lot of the damage output.",
          },
          {
            item: "pipe",
            info: "Since Sandking has a lot of AOE magical damage spells, this item will nullify a lot of the damage output.",
          },
          { item: "eternal_shroud" },
          {
            item: "blade_mail",
            info: "When Sandking initiates you can quickly react with Blade Mail and reflect a lot of damage back to him",
          },
          {
            item: "black_king_bar",
            info: "Sand kings damage relies on spells and Black King Bar prevents all of them.",
          },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          {
            item: "sphere",
            info: "Sandking relies on jumping in with Blink Dagger and using Burrowstrike and Linken Sphere prevents that.",
          },
        ],
        support: [{ item: "SentryDustGem" }, { item: "black_king_bar" }],
        core: [{ item: "abyssal_blade" }],
      },
    },
  },

  "Shadow Demon": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804460,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962404",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "shadow_demon_shadow_poison", // 1
          "shadow_demon_disruption", // 2
          "shadow_demon_shadow_poison", // 3
          `shadow_demon_soul_catcher`, // 4
          "shadow_demon_shadow_poison", // 5
          "shadow_demon_demonic_purge", // 6
          "shadow_demon_shadow_poison", // 7
          "shadow_demon_disruption", // 8
          "shadow_demon_disruption", // 9
          `shadow_demon_disruption`, // 10
          `special_bonus_strength_10`, // 11
          "shadow_demon_demonic_purge", // 12
          "shadow_demon_soul_catcher", // 13
          "shadow_demon_soul_catcher", // 14
          "shadow_demon_soul_catcher", // 15
          "special_bonus_unique_shadow_demon_1", // 16
          "special_bonus_attributes", // 17
          "shadow_demon_demonic_purge", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_shadow_demon_2`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_shadow_demon_9`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            "flask",
            `clarity`,
            "enchanted_mango",
            `enchanted_mango`,
            "faerie_fire",
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
            "aether_lens",
            `tranquil_boots`,
            "blink",
            "glimmer_cape",
            "force_staff",
          ],
          late_game: [
            "ultimate_scepter",
            `aghanims_shard`,
            "aeon_disk",
            "octarine_core",
            "sheepstick",
          ],
          situational: [
            `ring_of_basilius`,
            `urn_of_shadows`,
            `ghost`,
            `cyclone`,
            "lotus_orb",
            `ethereal_blade`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "aether_lens",
            `tranquil_boots`,
            "blink",
            "ultimate_scepter",
            `aghanims_shard`,
          ],
          neutral: [
            "keen_optic",
            `trusty_shovel`,
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            `essence_ring`,
            "psychic_headband",
            "spider_legs",
            `quickening_charm`,
            "spy_gadget",
            "timeless_relic",
            `spell_prism`,
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, faerie fire, and sentry for it.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core item that helps with mana sustain. Can be disassembled and Energy Booster used for Aether Lens. Upgrade boots to Tranquil Boots afterwards.",
      aether_lens: "A core item that provides you with extra cast range.",
      blink:
        "A core item that allows you to get Disruption off timely on desired hero.",
      ultimate_scepter: `A core item that grants 2 extra charges of Demonic Purge which also applies break.`,
      lotus_orb: "To reflect, dispel and armor.",
      aghanims_shard: `Provides you another saving ability for your cores. Upgrades to 3 charges with the Aghanims Scepter.`,
    },
    combo: [
      `shadow_demon_demonic_purge`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_disruption`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_soul_catcher`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_shadow_poison`,
      `shadow_demon_shadow_poison_release`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_wand",
            info: "Shadow Demon`s Shadow Poison is cheap spammable spell that will grant you many stick charges",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "cloak",
            info: "Shadow Demon is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by magical damage and thus when Shadow Demon does his spell combo you can often times run away quickly while being healed by active Tranquil Boots",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [
          {
            item: "glimmer_cape",
            info: "It is useful against every other spell than Demonic Purge",
          },
        ],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  "Shadow Fiend": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        // Shadow Fiend magical damage build on midlane.
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "Magical",
        steam_guide_id: 1640804468,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962485",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_unique_nevermore_2", // 15
          "nevermore_dark_lord", // 16
          "special_bonus_attributes", // 17
          "nevermore_requiem", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_nevermore_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_nevermore_4", // 25
        ],
        items: {
          starting: [
            "enchanted_mango",
            "tango",
            "branches",
            "faerie_fire",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["bottle", "boots", "cyclone", "magic_wand"],
          mid_game: ["blink", "travel_boots", "black_king_bar"],
          late_game: [
            "ethereal_blade",
            "sheepstick",
            "refresher",
            "ultimate_scepter",
          ],
          situational: ["infused_raindrop", "sphere", "aeon_disk", "kaya_and_sange"],
          core: [
            "bottle",
            "cyclone",
            "blink",
            "travel_boots",
            "black_king_bar",
            "arcane_blink",
            "sheepstick",
            "refresher",
          ],
          neutral: [
            "pogo_stick",
            "mysterious_hat",
            "nether_shawl",
            "vambrace",
            "quickening_charm",
            "psychic_headband",
            "timeless_relic",
            "spell_prism",
            "ex_machina",
            "fallen_sky",
          ],
        },
        item_tooltips: {
          magic_stick:
            "Start with it if you expect high frequency of spells being used on the lane.",
          bottle:
            "A core item that provides you with sustain and allows you to gank with stored rune.",
          infused_raindrop: "Against magical burst.",
          cyclone: "A core item that allows you to setup Requiem of Souls.",
          blink:
            "A core item that allows you to jump an opponent and do Cyclone into Requiem of Souls combo.",
          travel_boots: "A core item that allows you to cover the map better.",
          black_king_bar:
            "A core item that allows you to channel Requiem of Souls fully and get other spells and items off.",
          sphere: "Against powerful single target disables and debuffs.",
          arcane_blink:
            "A core item that, when used, reduces the cast point of Requiem of Souls thus you don`t need to use Eul`s to setup kills. It also allows you to use spells and items more often.",
          sheepstick:
            "A core item that allows you to instantly disable an opponent.",
          refresher:
            "A core item that allows you to do twice as much damage and control in the figts.",
        },
      },
      {
        // Shadow Fiend physical damage build on midlane.
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        type: "Physical",
        steam_guide_id: 1642573708,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2724416695",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities:  [
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
          "special_bonus_unique_nevermore_5", // 25
        ],
        items: {
          starting: [
            "enchanted_mango",
            "enchanted_mango",
            "tango",
            "branches",
            "branches",
            "faerie_fire",
          ],
          early_game: ["power_treads", "magic_wand", "dragon_lance"],
          mid_game: [
            "invis_sword",
            "black_king_bar",
            "silver_edge",
            "satanic",
          ],
          late_game: ["butterfly", "skadi", "greater_crit"],
          situational: [
            "infused_raindrop",
            "manta",
            "blink",
            "aghanims_shard",
            "hurricane_pike",
            "monkey_king_bar",
            "sphere",
          ],
          core: [
            "power_treads",
            "dragon_lance",
            "black_king_bar",
            "silver_edge",
            "satanic",
            "butterfly",
            "greater_crit",
          ],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "quicksilver_amulet",
            "ring_of_aquila",
            "vambrace",
            "paladin_sword",
            "elven_tunic",
            "the_leveller",
            "ninja_gear",
            "desolator_2",
            "pirate_hat",
          ],
        },
        ability_tooltips: {
        },
        item_tooltips: {
          power_treads:
            "A core boots upgrade that allows you to farm faster due to attack speed increase.",
          dragon_lance:
            "A core item that provides you with useful stats and allows you to right-click from a bigger distance.",
          black_king_bar:
            "A core item that allows you to stand your ground and right-click as well as cast your Requiem of Souls without interruption.",
          hurricane_pike:
            "Situational item against heroes like Slark and Troll that you can`t fight back against effectively when they are on top of you under spell-immunity.",
          sphere: "Against powerful single target disables and debuffs.",
          silver_edge:
            "A core item that provides you with burst and ability to reposition. You can even surprise an opponent by channeling Requiem of Souls underneath them.",
          skadi: "A good item versus tanky immobile heroes. Especially good against ranged heroes since it slows them by 50%.",
          monkey_king_bar: "Against evasion and miss chance",
          satanic:
            "A core item that tanks you up and allows you to stand your ground and right-click.",
          butterfly:
            "A core item that provides you with mix of offensive and defensive stats.",
          blink: "For gap-close and to position yourself well.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
    },
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
        all: [
          {
            item: "magic_stick",
            info: "Shadow Fiend will use Shadowraze frequently to harass or kill the creeps",
          },
          { item: "wind_lace", info: "To keep the distance from Shadow Fiend" },
          { item: "boots", info: "To keep the distance from Shadow Fiend" },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Shadow Fiend is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [
          { item: "ring_of_health" },
          {
            item: "DamageItems",
            info: "To compete with extra damage Shadow Fiend gets from Necromastery",
          },
        ],
      },
      mid_game: {
        all: [
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from his abilities and provides armor against right-clicks and Presence of the Dark Lord",
          },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "heavens_halberd", info: "Against physical damage build" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  "Shadow Shaman": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804478,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962568",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "shadow_shaman_ether_shock", // 1
          "shadow_shaman_shackles", // 2
          "shadow_shaman_ether_shock", // 3
          "shadow_shaman_voodoo", // 4
          `shadow_shaman_voodoo`, // 5
          "shadow_shaman_mass_serpent_ward", // 6
          `shadow_shaman_voodoo`, // 7
          `shadow_shaman_voodoo`, // 8
          `shadow_shaman_shackles`, // 9
          `shadow_shaman_shackles`, // 10
          `shadow_shaman_shackles`, // 11
          "shadow_shaman_mass_serpent_ward", // 12
          `shadow_shaman_ether_shock`, // 13
          `special_bonus_unique_shadow_shaman_5`, // 14
          `special_bonus_unique_shadow_shaman_2`, // 15
          `shadow_shaman_ether_shock`, // 16
          "special_bonus_attributes", // 17
          "shadow_shaman_mass_serpent_ward", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_shadow_shaman_7", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_shadow_shaman_4`, // 25
        ],
        items: {
          starting: ["tango", "boots", "ward_observer"],
          early_game: [
            `ward_sentry`,
            "arcane_boots",
            "magic_wand",
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: [
            "aether_lens",
            "blink",
            "aghanims_shard",
            "force_staff",
            "glimmer_cape",
          ],
          late_game: [
            `ultimate_scepter`,
            `refresher`,
            `aeon_disk`,
            "octarine_core",
          ],
          situational: [
            `tranquil_boots`,
            "black_king_bar",
            `ghost`,
            `cyclone`,
            "lotus_orb",
            `wind_waker`,
            `travel_boots`,
          ],
          core: ["arcane_boots", "aether_lens", "blink", "aghanims_shard"],
          neutral: [
            "keen_optic",
            `trusty_shovel`,
            "pogo_stick",
            `arcane_ring`,
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            "spider_legs",
            `quickening_charm`,
            "spy_gadget",
            "timeless_relic",
            `spell_prism`,
            "seer_stone",
            "book_of_shadows",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_shadow_shaman_1:
        "On level 20, you can take this talent over the suggested one if there`s no need for break effect.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick instead of boots if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots: `A core boots upgrade that helps with mana sustain. Can be disassembled and Energy Booster used for Aether Lens.`,
      tranquil_boots: `You can upgrade Brown Boots to Tranquils once you have the Aether Lens.`,
      aether_lens: "A core item that improves cast range.",
      blink: "A core item that allows you to instantly disable desired hero.",
      aghanims_shard:
        "A core upgrade that allows you channel Shackles from further away and spawn 4 snakes to attack the disabled target or push out the wave.",
      black_king_bar: "To channel Shackles fully.",
      lotus_orb: "To reflect, dispel and armor.",
    },
    combo: [
      `shadow_shaman_voodoo`,
      `shadow_shaman_mass_serpent_ward`,
      `attack`,
      `shadow_shaman_shackles`,
      `shadow_shaman_ether_shock`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          { item: "infused_raindrop" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [{ item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "assault",
            info: "Against Mass Serpent Ward to protect heroes and buildings",
          },
        ],
      },
    },
  },

  Silencer: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804488,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962648",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "silencer_last_word", // 10
          "special_bonus_unique_silencer", // 11
          "silencer_global_silence", // 12
          "silencer_glaives_of_wisdom", // 13
          "silencer_glaives_of_wisdom", // 14
          "special_bonus_unique_silencer_6", // 15
          "silencer_glaives_of_wisdom", // 16
          "special_bonus_attributes", // 17
          "silencer_global_silence", // 18
          "special_bonus_attributes", // 19
          `special_bonus_unique_silencer_7`, // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_silencer_2", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            `flask`,
            `clarity`,
            "faerie_fire",
            "enchanted_mango",
            `enchanted_mango`,
            "ward_observer",
            "ward_sentry",
          ],
          early_game: [
            "tranquil_boots",
            "magic_wand",
            "null_talisman",
            `wind_lace`,
            `ring_of_basilius`,
          ],
          mid_game: [
            "veil_of_discord",
            "glimmer_cape",
            "force_staff",
            `aether_lens`,
          ],
          late_game: [
            "ultimate_scepter",
            "refresher",
            "aeon_disk",
            "sheepstick",
            `octarine_core`,
          ],
          situational: [
            "infused_raindrop",
            `arcane_boots`,
            `urn_of_shadows`,
            `hand_of_midas`,
            `ghost`,
            `cyclone`,
            "lotus_orb",
            `spirit_vessel`,
            `solar_crest`,
            `guardian_greaves`,
            `ethereal_blade`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "tranquil_boots",
            "veil_of_discord",
            `force_staff`,
            "ultimate_scepter",
            "refresher",
          ],
          neutral: [
            "arcane_ring",
            `trusty_shovel`,
            "pogo_stick",
            `mysterious_hat`,
            "philosophers_stone",
            "bullwhip",
            `essence_ring`,
            "psychic_headband",
            "quickening_charm",
            `black_powder_bag`,
            "timeless_relic",
            "spell_prism",
            `spy_gadget`,
            `trickster_cloak`,
            "seer_stone",
            "book_of_shadows",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, faerie fire, and sentry for it.`,
      infused_raindrop: "On hero against magical burst.",
      ring_of_basilius: `Provides early mana regen and builds into Veil of Discord.`,
      tranquil_boots:
        "A core boots upgrade that helps with hp sustain and fixes hero`s movement speed issues.",
      veil_of_discord:
        "A core item that amplifies your team`s spell damage output.",
      lotus_orb: "To reflect, dispel and armor.",
      ultimate_scepter: "A core item that goes well with Last Word talents.",
      refresher:
        "A core item that allows you to cast Global Silence and other spells and items twice in the fight.",
    },
    combo: [
      `silencer_last_word`,
      `silencer_curse_of_the_silent`,
      `silencer_global_silence`,
      `silencer_glaives_of_wisdom`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "cyclone" }, { item: "lotus_orb" }],
        support: [
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff" },
        ],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "heavens_halberd", info: "Against a core Silencer" },
          { item: "orchid", info: "Against a core Silencer" },
          {
            item: "manta",
            info: "To dispel Global Silence, Arcane Curse and Last Word",
          },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick", info: "Against a core right-clicker Silencer" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "butterfly", info: "Against a core right-clicker Silencer" },
        ],
      },
    },
  },

  "Skywrath Mage": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804496,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962794",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          `special_bonus_intelligence_10`, // 15
          `special_bonus_unique_skywrath`, // 16
          "special_bonus_attributes", // 17
          "skywrath_mage_mystic_flare", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_skywrath_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_skywrath_6`, // 25
        ],
        items: {
          starting: [
            "tango",
            "circlet",
            `circlet`,
            "enchanted_mango",
            `enchanted_mango`,
            `enchanted_mango`,
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            "null_talisman",
            `null_talisman`,
            `magic_wand`,
            `rod_of_atos`,
          ],
          mid_game: [
            `arcane_boots`,
            "aether_lens",
            "blink",
            "force_staff",
            `ghost`,
          ],
          late_game: [
            "ultimate_scepter",
            "aeon_disk",
            `travel_boots`,
            "octarine_core",
            "sheepstick",
            `ethereal_blade`,
            `aghanims_shard`,
          ],
          situational: [
            `smoke_of_deceit`,
            `infused_raindrop`,
            `ring_of_basilius`,
            `veil_of_discord`,
            `cyclone`,
            `glimmer_cape`,
            `kaya_and_sange`,
            `wind_waker`,
            `travel_boots_2`,
          ],
          core: [
            `rod_of_atos`,
            "aether_lens",
            `travel_boots`,
            "blink",
            "ultimate_scepter",
          ],
          neutral: [],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_skywrath: `You can skill this talent at level 15 over the level 10 talent. The UI does not let me highlight it over the level 10 talent.`,
      special_bonus_unique_skywrath_6: `You can skill the other talent if there are no Black King Bar carriers on the enemy team.`,
    },
    item_tooltips: {
      smoke_of_deceit: `Allows Skywrath Mage to roam between lanes to ward and find kills on the map.`,
      ring_of_basilius: "If your laning partner uses a lot of mana early.",
      ward_sentry: "To block or unblock the pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace one mango and one circlet for it.`,
      infused_raindrop: "On hero against magical burst.",
      rod_of_atos: `Rush this item even before getting boots. With it, you can setup Mystic Flare and solo kill most of the heroes.`,
      arcane_boots: `A core boots upgrade that helps with mana sustain. Can be disassembled and Energy Booster used for Aether Lens.`,
      aether_lens: "A core item that improves cast range.",
      blink:
        "A core item that allows you to follow up quickly with your spells on any stun from allies.",
      ultimate_scepter:
        "A core item that doubles the amount of spells you cast.",
      aghanims_shard: `A core item in the late game that helps scale your Arcane Bolt. Also makes you tanky against physical damage.`,
    },
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
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Skywrath Mage is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "cyclone" }, { item: "lotus_orb" }],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Ancient Seal" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere" },
          { item: "sheepstick", info: "Against a core Skywrath Mage" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [],
      },
    },
  },

  Slardar: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804505,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962869",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "slardar_slithereen_crush", // 1
          "slardar_bash", // 2
          "slardar_bash", // 3
          "slardar_sprint", // 4
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
          "special_bonus_unique_slardar_5", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_slardar_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "branches",
            "circlet",
            "faerie_fire",
            "bracer",
            "magic_stick",
          ],
          early_game: [
            "bracer",
            "power_treads",
            "mask_of_madness",
            "magic_wand",
            "armlet",
            "orb_of_corrosion",
          ],
          mid_game: [
            "blink",
            "black_king_bar",
            "orchid",
            "aghanims_shard",
            "echo_sabre",
            "ultimate_scepter",
            "hood_of_defiance",
          ],
          late_game: [
            "assault",
            "moon_shard",
            "satanic",
            "ultimate_scepter",
            "swift_blink",
          ],
          situational: ["infused_raindrop", "hand_of_midas", "heavens_halberd"],
          core: [
            "power_treads",
            "mask_of_madness",
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "assault",
          ],
          neutral: [
            "broom_handle",
            "possessed_mask",
            "quicksilver_amulet",
            "misericorde",
            "mind_breaker",
            "elven_tunic",
            "the_leveller",
            "penta_edged_sword",
            "desolator_2",
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      slardar_bash:
        "On level 1, you can skill this spell over the suggested one but achieving range creep lasthit or deny is more likely with Slithereen Crush.",
    },
    item_tooltips: {
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      orb_of_corrosion: "If you can pressure on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that provides you with significant increase in attack speed and some mana savings through toggling.",
      hand_of_midas:
        "If you can get it early as replacement to Mask of Madness.",
      mask_of_madness:
        "A core item that provides you with a burst of attack speed which increases the frequency of Bash of the Deep.",
      blink: "A core item that allows you to initiate on desired target.",
      black_king_bar:
        "A core item that allows you to continuously right-click in the middle of the fight.",
      aghanims_shard:
        "A core upgrade which saves you time of applying Corrosive Haze on a target you jumped. Improves your waveclear speed as armor reduction is applied before Slithereen Crush physical damage.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      assault:
        "A core item that provides you with even more attack speed and armor reduction.",
    },
    combo: [
     `blink`,
     `slardar_slithereen_crush`,
     `slardar_amplify_damage`,
     `attack`,
     `slardar_bash`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "wind_lace", info: "To keep the distance from Slardar" },
          { item: "boots", info: "To keep the distance from Slardar" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "lotus_orb" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [{ item: "force_staff" }, { item: "ghost" }],
        core: [
          { item: "manta" },
          { item: "hurricane_pike" },
          { item: "manta", info: "To dispel Corrosive Haze" },
        ],
      },
      late_game: {
        all: [{ item: "ethereal_blade" }],
        support: [],
        core: [{ item: "assault" }, { item: "butterfly" }],
      },
    },
  },

  Slark: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804517,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699962959",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_unique_slark_6", // 10
          "slark_pounce", // 11
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
            "slippers",
            "circlet",
            "faerie_fire",
            "orb_of_venom",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "magic_wand",
            "soul_ring",
            "falcon_blade",
            "wraith_band",
            "orb_of_corrosion",
          ],
          mid_game: [
            "echo_sabre",
            "silver_edge",
            "black_king_bar",
            "aghanims_shard",
            "basher",
            "diffusal_blade",
            "sange_and_yasha",
          ],
          late_game: ["skadi", "abyssal_blade", "ultimate_scepter", "satanic"],
          situational: [
            "infused_raindrop",
            "hand_of_midas",
            "sphere",
            "blink",
            "monkey_king_bar",
            "nullifier",
          ],
          core: [
            "power_treads",
            "echo_sabre",
            "silver_edge",
            "black_king_bar",
            "aghanims_shard",
            "basher",
            "skadi",
          ],
          neutral: [
            "arcane_ring",
            "possessed_mask",
            "quicksilver_amulet",
            "misericorde",
            "mind_breaker",
            "elven_tunic",
            "the_leveller",
            "penta_edged_sword",
            "pirate_hat",
            "apex",
          ],
        },
      },
    ],
    ability_tooltips: {
      slark_dark_pact:
        "You can skill this spell on level 1 if you are being harassed by a dispellable spell(Poision Touch, Thunder Strike).",
      slark_essence_shift:
        "You can put 2 points in this spell during laning stage if you are laning against double melee.",
    },
    item_tooltips: {
      orb_of_venom: "If you can pressure on the lane",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_corrosion:
        "If you can pressure on the lane, usually against double melee.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that provides significant attack speed increase and some mana savings through toggling.",
      hand_of_midas:
        "If you can get it early as replacement to Echo Sabre. You need to get mana regen item if you don`t have it already.",
      echo_sabre:
        "A core item that helps with mana sustain and allows you to generate Essence Shift stacks faster. Can be disassembled.",
      diffusal_blade:
        "Can be a good item against heroes like Medusa and Wraith King but also generally heroes with small mana pool.",
      silver_edge:
        "A core item that provides you with burst, pick-off potential and break effect.",
      black_king_bar:
        "A core item that allows you to right-click in the middle of the fight. Try not to overlap it with Shadow Dance or Depth Shroud.",
      sphere: "Against powerful single-target disables and debuffs.",
      aghanims_shard:
        "A core upgrade that adds to yours and your teams survivability.",
      basher:
        "A core item that allows you to lock the target your are focusing.",
      skadi: "A core item that tanks you up and makes you less kitable.",
      blink: "To close the gap.",
      monkey_king_bar: "Against evasion and miss chance.",
      nullifier:
        "To dispel defensive spells and items that prevent you from right-clicking the opponent.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from Slark and to dodge the Pounce",
          },
          {
            item: "boots",
            info: "To keep the distance from Slark and to dodge the Pounce",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [],
        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
          {
            item: "ward_sentry",
            info: "Slark commonly buys Shadow Blade or SilverEdge",
          },
        ],
        core: [
          { item: "hurricane_pike" },
          { item: "heavens_halberd" },
          { item: "basher" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [
          {
            item: "SentryGem",
            info: "Slark commonly buys ShadowBlade or SilverEdge",
          },
        ],
        core: [
          { item: "abyssal_blade" },
          { item: "butterfly" },
          {
            item: "bloodthorn",
            info: "To burst him before he pops Shadow Dance",
          },
        ],
      },
    },
  },

  Snapfire: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804525,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963037",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "snapfire_lil_shredder", // 10
          `special_bonus_unique_snapfire_3`, // 11
          "snapfire_mortimer_kisses", // 12
          "snapfire_lil_shredder", // 13
          "snapfire_lil_shredder", // 14
          "special_bonus_unique_snapfire_7", // 15
          "snapfire_lil_shredder", // 16
          "special_bonus_attributes", // 17
          "snapfire_mortimer_kisses", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_snapfire_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_snapfire_1", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "blight_stone",
            "faerie_fire",
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            "arcane_boots",
            "magic_wand",
            "medallion_of_courage",
            `bracer`,
            `wind_lace`,
            `infused_raindrop`,
          ],
          mid_game: ["blink", "aghanims_shard", "force_staff"],
          late_game: [
            "ultimate_scepter",
            "ethereal_blade",
            "aeon_disk",
            "octarine_core",
            "sheepstick",
          ],
          situational: [
            `glimmer_cape`,
            `ghost`,
            `kaya_and_sange`,
            `cyclone`,
            `guardian_greaves`,
            "lotus_orb",
            `heavens_halberd`,
            `pipe`,
            `wind_waker`,
            `gungir`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "blink",
            "aghanims_shard",
            `force_staff`,
            "ultimate_scepter",
          ],
          neutral: [
            "mysterious_hat",
            "keen_optic",
            `trusty_shovel`,
            `pogo_stick`,
            "philosophers_stone",
            "bullwhip",
            `dragon_scale`,
            "quickening_charm",
            "spider_legs",
            `ceremonial_robe`,
            `enchanted_quiver`,
            "timeless_relic",
            "spell_prism",
            `spy_gadget`,
            `ascetic_cap`,
            "seer_stone",
            "book_of_shadows",
            `demonicon`,
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {
      snapfire_lil_shredder:
        "You can put a point in this spell earlier at level 3 if you are in need of killing a unit based on hit count(Homing Missile, Tombstone, Supernova).",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace the blight stone for it.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade that helps with mana sustain. Can be disassembled later on.",
      blink:
        "A core item that goes well with Aghanim`s Shard and Aghanim`s Scepter. Allows you to position yourself nicely.",
      aghanims_shard:
        "A core upgrade that adds more control and burst. Goes well with Blink Dagger. The sequence should look like: Blink Dagger -> Scatterblast -> Firesnap Cookie.",
      lotus_orb: "To reflect, dispel and armor.",
      ultimate_scepter:
        "A core item that allows you to save or to toss in an ally. Adds even more disable and damage.",
    },
    combo: [
      `blink`,
      `snapfire_scatterblast`,
      `snapfire_firesnap_cookie`,
      `snapfire_lil_shredder`,
      `snapfire_mortimer_kisses`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Snapfire tends to use Scatter Blast and Firesnap Cookie frequently to harass you and your allies",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Snapfire is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by magical damage and thus when Snapfire does her spell combo you can often times run away quickly while being healed by active Tranquil Boots",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "cyclone" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [
          {
            item: "sheepstick",
            info: "Against a core right-clicking Snapfire",
          },
          {
            item: "ethereal_blade",
            info: "Against a core right-clicking Snapfire",
          },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "assault", info: "Against a core right-clicking Snapfire" },
          { item: "butterfly", info: "Against a core right-clicking Snapfire" },
        ],
      },
    },
  },

  Sniper: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY, DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640804535,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963139",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "sniper_headshot", // 1
          "sniper_shrapnel", // 2
          "sniper_shrapnel", // 3
          "sniper_take_aim", // 4
          "sniper_shrapnel", // 5
          "sniper_assassinate", // 6
          "sniper_headshot", // 7
          "sniper_headshot", // 8
          "sniper_headshot", // 9
          "special_bonus_attack_damage_15", // 10
          "sniper_take_aim", // 11
          "sniper_take_aim", // 12
          "sniper_take_aim", // 13
          "sniper_shrapnel", // 14
          "special_bonus_attack_speed_30", // 15
          "sniper_assassinate", // 16
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
            "tango",
            "quelling_blade",
            "slippers",
            "faerie_fire",
            "branches",
            "boots",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "mask_of_madness",
            "wraith_band",
            "magic_wand",
          ],
          mid_game: [
            "dragon_lance",
            "silver_edge",
            "black_king_bar",
            "maelstrom",
            "hurricane_pike",
            "ultimate_scepter",
            "yasha",
          ],
          late_game: [
            "satanic",
            "butterfly",
            "skadi",
            "mjollnir",
            "greater_crit",
          ],
          situational: [
            "hand_of_midas",
            "aghanims_shard",
            "monkey_king_bar",
            "blink",
          ],
          core: [
            "power_treads",
            "mask_of_madness",
            "dragon_lance",
            "silver_edge",
            "black_king_bar",
            "satanic",
            "butterfly",
          ],
          neutral: [
            "unstable_wand",
            "possessed_mask",
            "grove_bow",
            "quicksilver_amulet",
            "mind_breaker",
            "elven_tunic",
            "the_leveller",
            "ninja_gear",
            "pirate_hat",
            "apex",
          ],
        },
        item_tooltips: {
          power_treads:
            "A core boots upgrade that provides you with significant attack speed increase and mana savings through toggling.",
          hand_of_midas:
            "If you can get it early as an alternative to Mask of Madness.",
          mask_of_madness:
            "A core farming item that provides burst of attack speed which allows Headshot to proc more often. Can be disassembled down the road and components used for Satanic and Butterfly.",
          dragon_lance:
            "A core item that further improves attack range. Can be disassembled.",
          maelstrom:
            "Great against illusion-based heroes and accelerating farm. Should be upgraded to Mjollnir fairy quickly if that is the case.",
          hurricane_pike:
            "Allows you to create a gap against heroes like Slark, Anti Mage and Phantom Assasin.",
          silver_edge:
            "A core item that provides burst, ability to reposition and break effect.",
          black_king_bar:
            "A core item that allows you to stand your ground and right-click.",
          aghanims_shard: "Can be consider against gap-closing heroes.",
          satanic:
            "A core item that allows you to stand your ground and right-click. It dispels on cast.",
          butterfly:
            "A core item that provides you with mix of offensive and defensive stats.",
          monkey_king_bar: "Against evasion and miss chance.",
          blink: "For extra mobility and repositioning.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1642652400,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2725332187",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "sniper_headshot", // 1
          "sniper_shrapnel", // 2
          "sniper_headshot", // 3
          "sniper_shrapnel", // 4
          "sniper_shrapnel", // 5
          "sniper_assassinate", // 6
          "sniper_shrapnel", // 7
          "sniper_take_aim", // 8
          "sniper_take_aim", // 9
          "sniper_take_aim", // 10
          "sniper_take_aim", // 11
          "sniper_assassinate", // 12
          "special_bonus_unique_sniper_4", // 13
          "sniper_headshot", // 14
          "special_bonus_unique_sniper_5", // 15
          "sniper_headshot", // 16
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
            "tango",
            "blight_stone",
            "faerie_fire",
            "branches",
            "flask",
            "circlet",
            "boots",
            "magic_stick",
          ],
          early_game: ["urn_of_shadows", "tranquil_boots", "magic_wand"],
          mid_game: [
            "veil_of_discord",
            "ultimate_scepter",
            "aghanims_shard",
            "glimmer_cape",
            "force_staff",
            "ghost",
            "solar_crest",
            "cyclone",
          ],
          late_game: [
            "octarine_core",
            "aeon_disk",
            "ethereal_blade",
            "sheepstick",
          ],
          situational: ["infused_raindrop", "spirit_vessel", "blink"],
          core: [
            "urn_of_shadows",
            "tranquil_boots",
            "veil_of_discord",
            "ultimate_scepter",
            "aghanims_shard",
            "octarine_core",
          ],
          neutral: [
            "mysterious_hat",
            "keen_optic",
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            "spider_legs",
            "timeless_relic",
            "spell_prism",
            "seer_stone",
            "book_of_shadows",
          ],
        },
        item_tooltips: {
          urn_of_shadows:
            "A core item that provides you with useful stats and allows you to snowball off of first kill.",
          infused_raindrop: "Against magical burst",
          tranquil_boots:
            "A core boots upgrade that provides you with significant movement speed and hp sustain.",
          spirit_vessel: "Against heavy-healing lineup.",
          veil_of_discord:
            "A core item that increases spell damage output of your team.",
          ultimate_scepter:
            "A core item that upgrades Assassinate. Adds to control.",
          aghanims_shard:
            "A core upgrade that allows you to create gap between you and opponents. Concussive Grenade also disarms.",
          octarine_core: "Reduces cooldowns and improves cast range.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      blink: "For extra mobility.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To catch up to Sniper and to move out of Shrapnel AoE",
          },
          {
            item: "boots",
            info: "To catch up to Sniper and to move out of Shrapnel AoE",
          },
          { item: "armor", info: "Buy armor items" },
          { item: "infused_raindrop" },
        ],
        support: [
          { item: "ward_sentry", info: "To block camps" },
          { item: "smoke_of_deceit", info: "To dodge Assassinate" },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "blink", info: "To close the gap to Sniper" }],
        support: [
          { item: "force_staff" },
          {
            item: "smoke_of_deceit",
            info: "Use smoke to counter Sniper`s ultimate",
          },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          { item: "heavens_halberd" },
          { item: "invis_sword", info: "To close the gap to Sniper" },
          { item: "blade_mail" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [
          {
            item: "smoke_of_deceit",
            info: "Use smoke to counter Sniper`s ultimate",
          },
        ],
        core: [
          { item: "silver_edge", info: "To close the gap to Sniper" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  Spectre: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804547,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963243",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "spectre_spectral_dagger", // 1
          "spectre_dispersion", // 2
          "spectre_spectral_dagger", // 3
          "spectre_dispersion", // 4
          "spectre_spectral_dagger", // 5
          "spectre_haunt", // 6
          "spectre_spectral_dagger", // 7
          "spectre_dispersion", // 8
          "spectre_dispersion", // 9
          "special_bonus_unique_spectre", // 10
          "spectre_desolate", // 11
          "spectre_haunt", // 12
          "spectre_desolate", // 13
          "spectre_desolate", // 14
          "special_bonus_unique_spectre_6", // 15
          "spectre_desolate", // 16
          "special_bonus_attributes", // 17
          "spectre_haunt", // 18
          "special_bonus_attributes", // 19
          "special_bonus_hp_400", // 20
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
            "slippers",
            "faerie_fire",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: [
            "diffusal_blade",
            "echo_sabre",
            "manta",
            "ultimate_scepter",
            "skadi",
            "basher",
            "blade_mail",

          ],
          late_game: ["abyssal_blade", "butterfly", "moon_shard"],
          situational: [
            "hand_of_midas",
            "blade_mail",
            "orchid",            
            "radiance",
            "black_king_bar",
            "nullifier",
            "sheepstick",
            "heart",
          ],
          core: [
            "power_treads",
            "diffusal_blade",
            "manta",
            "ultimate_scepter",
            "skadi",
            "basher",
            "butterfly",
          ],
          neutral: [
            "chipped_vest",
            "possessed_mask",
            "vambrace",
            "ring_of_aquilla",
            "pupils_gift",
            "mind_breaker",
            "elven_tunic",
            "the_leveller",
            "ninja_gear",
            "pirate_hat",
            "apex",
          ],
        },
      },
    ],
    ability_tooltips: {
      spectre_desolate:
        "You can take a point in this spell during laning stage if you can be aggressive which is rarely the case.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "On hero against magical burst.",
      soul_ring:
        "An optional item that gives you decent stats and armor and it allows you to spam Spectral Dagger as your main source of farm acceleration.",
      falcon_blade:
        "An optional item that provides you with useful stats but most importantly with mana sustain.",
      power_treads:
        "A core boots upgrade that provides you with signifcant attack speed increase and mana savings through toggling.",
      orchid: "Can be considered against elusive heroes with escaping spells. Provides you good mana sustain.",
      diffusal_blade:
        "Great against heroes like Medusa and Wraith King but also other heroes with small mana pools. Goes well with Manta.",
      radiance: "Against illusion, clone and summon-based heroes.",
      ultimate_scepter:
        "A core item that allows you to play actively and be part of every pick-off and teamfight.",
      manta:
        "A core item that provides you with useful stats but mainly adds to your burst damage. Desolate works on illusions. Spectre becomes decent at taking Roshan with this item.",
      skadi:
        "A core item that tanks you up and makes you less kitable. Works very well against tanky immobile heroes and especially good against ranged heroes.",
      basher:
        "A core item that allows you to lock the target your are focusing.",
      black_king_bar:
        "Against breaks, disables, magical damage and as a dispel. If you get hit from Silver Edge while spell-immune, the break effect doesn`t apply. If you get hit from Silver Edge before popping Black King Bar, casting Black King Bar won`t dispel break debuff.",
      nullifier:
        "To dispel defensive spells and items that prevent your from right-clicking the opponent.",
    },
    combo: [
      `spectre_haunt`,
      `spectre_reality`,
      `manta`,
      `diffusal`,

    ],
    counter_items: {
      laning_phase: { all: [], support: [], core: [] },
      mid_game: {
        all: [
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from her abilities and provides armor against right-clicks and Haunt",
          },
        ],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [
          { item: "hurricane_pike" },
          { item: "silver_edge" },
          { item: "crimson_guard" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
        ],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "butterfly" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  "Spirit Breaker": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804560,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963328",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "special_bonus_unique_spirit_breaker_2", // 15
          "special_bonus_armor_4", // 16
          "special_bonus_attributes", // 17
          "spirit_breaker_nether_strike", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_spirit_breaker_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_spirit_breaker_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "boots",
            "orb_of_venom",
            "flask",
            "branches",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "phase_boots",
            "wind_lace",
            "magic_wand",
            "orb_of_corrosion",
            "urn_of_shadows",
            "bracer",
          ],
          mid_game: [
            "invis_sword",
            "ultimate_scepter",
            "aghanims_shard",
            "black_king_bar",
            "ancient_janggo",
          ],
          late_game: ["yasha_and_kaya", "silver_edge", "assault",],
          situational: ["vladmir", "spirit_vessel", "lotus_orb", "pipe", "solar_crest",],
          core: [
            "phase_boots",
            "wind_lace",
            "invis_sword",
            "ultimate_scepter",
            "aghanims_shard",
            "black_king_bar",
            "yasha_and_kaya",
          ],
          neutral: [
            "broom_handle",
            "chipped_vest",
            "quicksilver_amulet",
            "paintball",
            "spider_legs",
            "elven_tunic",
            "flicker",
            "ninja_gear",
            "force_boots",
            "giants_ring",
          ],
        },
        item_tooltips: {
          orb_of_venom:
            "If you can pressure on the lane, usually against double melee.",
          ward_sentry: "To block or unblock a pull camp.",
          orb_of_corrosion: "If you can pressure on the lane.",
          spirit_vessel: "Against heavy-healing lineup.",
          lotus_orb: "For reflect, dispel and armor.",
          vladmir: "Amplifying your teams damage and grants them lifesteal.",
          invis_sword: "Can be used while Charging and catch the opponents off-guard.",
          aghanims_shard: "Consider buying this against heroes that you have a difficulty killing because of their passive. e.g Bristleback, Dragon Knight."
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1642747940,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2726400030",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "spirit_breaker_greater_bash", // 1
          "spirit_breaker_charge_of_darkness", // 2
          "spirit_breaker_greater_bash", // 3
          "spirit_breaker_bulldoze", // 4
          "spirit_breaker_greater_bash", // 5
          "spirit_breaker_nether_strike", // 6
          "spirit_breaker_greater_bash", // 7
          "spirit_breaker_bulldoze", // 8
          "spirit_breaker_bulldoze", // 9
          "spirit_breaker_bulldoze", // 10
          "spirit_breaker_charge_of_darkness", // 11
          "spirit_breaker_nether_strike", // 12
          "spirit_breaker_charge_of_darkness", // 13
          "spirit_breaker_charge_of_darkness", // 14
          "special_bonus_unique_spirit_breaker_2", // 15
          "special_bonus_armor_4", // 16
          "special_bonus_attributes", // 17
          "spirit_breaker_nether_strike", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_spirit_breaker_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_spirit_breaker_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "branches",
            "faerie_fire",
            "bracer",
            "magic_stick",
          ],
          early_game: ["phase_boots", "wind_lace", "magic_wand", "soul_ring"],
          mid_game: [
            "invis_sword",
            "ultimate_scepter",
            "black_king_bar",
            "aghanims_shard",
            "ancient_janggo",
          ],
          late_game: [
            "yasha_and_kaya",
            "silver_edge",
            "assault",
            "moon_shard",
            "refresher",
          ],
          situational: ["heavens_halberd", "pipe", "crimson_guard", "sphere"],
          core: [
            "phase_boots",
            "wind_lace",
            "invis_sword",
            "ultimate_scepter",
            "black_king_bar",
            "aghanims_shard",
            "yasha_and_kaya",
          ],
          neutral: [
            "broom_handle",
            "chipped_vest",
            "quicksilver_amulet",
            "paintball",
            "spider_legs",
            "elven_tunic",
            "flicker",
            "ninja_gear",
            "force_boots",
            "giants_ring",
          ],
        },
        item_tooltips: {
          heavens_halberd: "Especially good against ranged right-clickers.",
        },
      },
    ],
    ability_tooltips: {
      special_bonus_armor_4:
        "On level 15, take the suggested level 15 talent over this level 10 talent. Dota client disallows me to indicate such order in graphics above.",
    },
    item_tooltips: {
      magic_stick:
        "If you expect high frequency of spells being used on the lane.",
      phase_boots:
        "A core boots upgrade typically used just before the Charge of Darkness lands. Percentage of movement speed is converted to damage whenever Greater Bash procs.",
      wind_lace:
        "A core cheap item that goes well with movement speed theme of the hero.",
      ancient_janggo:
        "If you are grouping up a lot as a team in midgame and if you have summons.",
      invis_sword:
        "A core item that can be used during Charge of Darkness without canceling it. Grants you even more burst damage on impact. Can be upgraded to Silver Edge in late game.",
      ultimate_scepter:
        "A core item that reduces cooldown of Charge of Darkness and allows it to pierce spell-immunity. You can use charge to push out sidelanes.",
      black_king_bar:
        "A core item that allows you to be in the middle of fight and right-click.",
      aghanims_shard:
        "A core upgrade that provides you with break effect and spell-immunity at the end of Nether Strike.",
      yasha_and_kaya:
        "A core item that provides you with useful stats but mainly with extra movement speed and spell amplification. Greater Bash is of magical damage.",
    },
    combo: [
      `spirit_breaker_charge_of_darkness`,
      `spirit_breaker_bulldoze`,
      `invis_sword`,
      `spirit_breaker_nether_strike`,

    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from Spirit Breaker",
          },
          { item: "boots", info: "To keep the distance from Spirit Breaker" },
        ],
        support: [
          {
            item: "ward_observer",
            info: "To see him charging as early as you can so you can move away in time or alert an ally to do the same",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [{ item: "cyclone" }],
        support: [
          { item: "glimmer_cape" },
          {
            item: "force_staff",
            info: "Using it on Spirit Breaker stops Charge of Darkness",
          },
          { item: "ghost" },
        ],
        core: [{ item: "hurricane_pike", info: "Using it on Spirit Breaker while charging into you stops Charge of Darkness." }],
      },
      late_game: {
        all: [{ item: "sphere" }],
        support: [],
        core: [{ item: "abyssal_blade" }, { item: "butterfly" }],
      },
    },
  },

  "Storm Spirit": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640804570,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963425",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_mp_regen_175", // 10
          "storm_spirit_overload", // 11
          "storm_spirit_ball_lightning", // 12
          "storm_spirit_electric_vortex", // 13
          "storm_spirit_electric_vortex", // 14
          "special_bonus_hp_250", // 15
          "storm_spirit_electric_vortex", // 16
          "special_bonus_attributes", // 17
          "storm_spirit_ball_lightning", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_storm_spirit", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_storm_spirit_7", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "circlet",
            "branches",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "bottle",
            "soul_ring",
            "power_treads",
            "null_talisman",
            "magic_stick",
          ],
          mid_game: [
            "orchid",
            "kaya_and_sange",
            "black_king_bar",
            "bloodstone",
            "aghanims_shard",
          ],
          late_game: [ "ultimate_scepter", "shivas_guard", "sheepstick", "bloodthorn",],
          situational: ["infused_raindrop", "sphere" , "aeon_disk", ],
          core: [
            "bottle",
            "soul_ring",
            "power_treads",
            "kaya_and_sange",
            "black_king_bar",
            "ultimate_scepter",
            "aghanims_shard",
            "shivas_guard",
          ],
          neutral: [
            "mysterious_hat",
            "arcane_ring",
            "vambrace",
            "essence_ring",
            "ceremonial_robe",
            "psychic_headband",
            "spell_prism",
            "timeless_relic",
            "stormcrafter",
            "apex",
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {
      storm_spirit_electric_vortex:
        "You don`t have to put a point in this spell during laning stage if you have no way to pressure or land a kill on the opponents mid.",
      storm_spirit_ball_lightning: " You can use your ulty into the circle of your hero to Overload yourself and add up additional damage. They dont have to be long zips. "
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      bottle:
        "A core item that provides you with sustain and allows you to gank with stored rune. Having arcane or regenaration rune stored can easily be a deciding factor in the teamfight.",
      infused_raindrop: "On lane against magical burst.",
      soul_ring:
        "A core item that provides you with even more mana. In Storm`s case, mana equals damage. It can be used during Ball Lightning.",
      power_treads:
        "A core boots upgrade that provides you with some mana and attack speed.",
      orchid:
        "If you have a really good start you can rush this item. It allows you to pick-off most of the heroes on the map.",
      cyclone:
        "If you are dealing with sileces and roots this item can helps you dispel them.",
      kaya_and_sange:
        "A core item that provides you with mix of defensive and offensive stats.",
      black_king_bar:
        "A core item that deals with most of the disables, silences and roots.",
      sphere: "Against powerful single-target disables and debuffs.",
      ultimate_scepter:
        "A core item that allows you to have a big crowd control effect with only 16s cd.",
      aghanims_shard:
        "A core upgrade that increases your team`s damage output.",
      shivas_guard:
        "A core item that provides you with more intelligence and AoE damage. It also deals with healing lineup. The item can be used during Ball Lightning.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Storm Spirit is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [{ item: "rod_of_atos" }],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "orchid" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Orchid" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "abyssal_blade" }, { item: "butterfly" }],
      },
    },
  },

  Sven: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804579,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963505",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "sven_storm_bolt", // 1
          "sven_warcry", // 2
          "sven_storm_bolt", // 3
          "sven_great_cleave", // 4
          "sven_great_cleave", // 5
          "sven_gods_strength", // 6
          "sven_great_cleave", // 7
          "sven_great_cleave", // 8
          "sven_warcry", // 9
          "special_bonus_attack_speed_15", // 10
          "sven_warcry", // 11
          "sven_gods_strength", // 12
          "sven_warcry", // 13
          "sven_storm_bolt", // 14
          "special_bonus_unique_sven_3", // 15
          "sven_storm_bolt", // 16
          "special_bonus_attributes", // 17
          "sven_gods_strength", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_sven_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_sven_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "gauntlets",
            "faerie_fire",
            "enchanted_mango",
            "magic_stick",
          ],
          early_game: ["power_treads", "mask_of_madness", "magic_wand"],
          mid_game: [
            "echo_sabre",
            "blink",
            "black_king_bar",
            "silver_edge",
            "sange_and_yasha",
          ],
          late_game: [
            "satanic",
            "swift_blink",
            "assault",
            "greater_crit",
            "bloodthorn",
          ],
          situational: [
            "aghanims_shard",
            "monkey_king_bar",
            "ultimate_scepter",
          ],
          core: [
            "power_treads",
            "mask_of_madness",
            "echo_sabre",
            "blink",
            "black_king_bar",
            "silver_edge",
            "satanic",
            "swift_blink",
          ],
          neutral: [
            "broom_handle",
            "unstable_wand",
            "quicksilver_amulet",
            "misericorde",
            "elven_tunic",
            "mind_breaker",
            "the_leveller",
            "penta_edged_sword",
            "apex",
            "giants_ring",
          ],
        },
      },
    ],
    ability_tooltips: {
      sven_warcry:
        "At level 3, you can take a point in this spell over the suggested second point in Storm Hammer if the lane is hard.",
        special_bonus_unique_sven_7: " Consider taking this talent over the suggested one if you are dealing with a lot of physical damage.",
        special_bonus_unique_sven_4: " Consider taking this talent over the suggested one if you need more control against elusive heroes.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      power_treads:
        "A core boots upgrade that provides you with significant attack speed increase and mana savings through toggling.",
      mask_of_madness:
        "A core farming item that provides you with burst of attack speed and sustain through lifesteal. Can be disassembled down the road.",
      echo_sabre:
        "A core item that provides burst through double attack and helps with mana sustain. Can be disassembled for faster Black King Bar timing.",
      blink: "A core item to close the gap.",
      black_king_bar:
        "A core item that allows you to right-click in the middle of the fight.",
      silver_edge:
        "A core item that provides you with burst, ability to reposition and break effect.",
      aghanims_shard: "To dispel defensive items and spells with Storm Hammer.",
      bloodthorn:
        "An item of choice if you need to deal with evasion and miss chance. You can get Oblivion Staff from Echo Sabre. Apply it on stunned enemy so it doesn`t get dispelled easily.",
      satanic:
        "A core item that tanks you up and allows you to stand your ground and right-click. Dispels on cast.",
      swift_blink:
        "A core blink upgrade that provides you with attack speed burst. It allows you to move around faster especially if you decide to sell or backpack Power Treads. Overwhelming Blink can be considered instead if you are playing against illusion based heroes although Swift Blink might be still better.",
      monkey_king_bar:
        "Against evasion and miss chance. Bloodthorn is usually a better option as you already have Oblivion Staff in Echo Sabre that you can use.",
      ultimate_scepter: "For extra mobility.",
    },
    combo: [
      `sven_gods_strength`,
      `blink`,
      `black_king_bar`,
      `sven_storm_bolt`,
      `attack`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "armor", info: "Buy armor items" },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [
          { item: "solar_crest" },
          {
            item: "blink" },

          { item: "lotus_orb" },
        ],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff" },
          { item: "cyclone", info: "To dispel warcry and to ruin his momentum."}
        ],
        core: [{ item: "hurricane_pike" }, { item: "heavens_halberd" }],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
        ],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          {
            item: "shivas_guard",
            info: "To reduce Sven`s not so fast attack speed and acquire some armor",
          },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "butterfly" },
          { item: "nullifier", info: "To dispel Warcry" },
        ],
      },
    },
  },

  Techies: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804587,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699933135",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "techies_suicide", // 1
          "techies_land_mines", // 2
          "techies_land_mines", // 3
          "techies_stasis_trap", // 4
          "techies_land_mines", // 5
          "techies_remote_mines", // 6
          "techies_land_mines", // 7
          "techies_suicide", // 8
          "techies_suicide", // 9
          "techies_suicide", // 10
          "special_bonus_magic_resistance_20", // 11
          "techies_remote_mines", // 12
          "techies_stasis_trap", // 13
          "techies_stasis_trap", // 14
          "special_bonus_unique_techies", // 15
          "techies_stasis_trap", // 16
          "special_bonus_attributes", // 17
          "techies_remote_mines", // 18
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
            "flask",
            "boots",
            "faerie_fire",
            "ring_of_regen",
            "gauntlets",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: ["soul_ring", "tranquil_boots"],
          mid_game: [
            "ultimate_scepter",
            "aether_lens",
            "aghanims_shard",
            "force_staff",
            "kaya",
            "glimmer_cape",
            "ghost",
          ],
          late_game: ["bloodstone", "octarine_core", "aeon_disk", "sheepstick"],
          situational: ["infused_raindrop", "blink"],
          core: [
            "soul_ring",
            "tranquil_boots",
            "ultimate_scepter",
            "aether_lens",
            "aghanims_shard",
            "bloodstone",
          ],
          neutral: [
            "arcane_ring",
            "keen_optic",
            "philosophers_stone",
            "bullwhip",
            "psychic_headband",
            "ceremonial_robe",
            "timeless_relic",
            "stormcrafter",
            "seer_stone",
            "demonicon",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane. You don`t upgrade it usually.",
      soul_ring: "A core item that helps with mana sustain.",
      tranquil_boots:
        "A core boots upgrade that helps with hp sustain. Goes well with Soul Ring and offsets self-damage from Blast Off!",
      infused_raindrop:
        "Against magical burst. It doesn`t offset Blast Off! damage.",
      ultimate_scepter:
        "A core item that enhances all of your spells and allows you to hide mines under Minefield Sign.",
      force_staff: "Can be used to push an opponent into mines.",
      aether_lens:
        "A core item that improves cast range and mana regeneration. Can be upgraded to Octarine Core in late game.",
      aghanims_shard: "A core item that provides extra control.",
      bloodstone:
        "A core item that provides significant mana regeneration and some spell amplification.",
      blink: "For extra mobility around the map.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "quelling_blade",
            info: "QuellingBlade the trees so you can see Techies mines easier or when he is doing Blast Off!",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Techies is heavy on magical damage and Cloak negates 15% of it",
          },
        ],
        support: [
          {
            item: "ward_sentry",
            info: "Remote Mines, Techies ultimate, are invisible",
          },
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by spell damage so you can keep regenerating while being damaged by Techie`s spells",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [],
        support: [
          { item: "SentryGem" },
          { item: "glimmer_cape" },
          { item: "force_staff" },
        ],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Statis Trap" },
        ],
      },
      late_game: {
        all: [{ item: "aeon_disk" }],
        support: [{ item: "SentryGem" }, { item: "black_king_bar" }],
        core: [
          {
            item: "heart",
            info: "To tank up and recover against Remote Mines",
          },
          {
            item: "satanic",
            info: "To dispel Statis Trap root and Blast Off! silence and be able to recover health after being damaged by mines",
          },
        ],
      },
    },
  },

  "Templar Assassin": {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804595,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963659",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "templar_assassin_meld", // 1
          "templar_assassin_psi_blades", // 2
          "templar_assassin_refraction", // 3
          "templar_assassin_refraction", // 4
          "templar_assassin_refraction", // 5
          "templar_assassin_psionic_trap", // 6
          "templar_assassin_refraction", // 7
          "templar_assassin_psi_blades", // 8
          "templar_assassin_meld", // 9
          "special_bonus_attack_speed_20", // 10
          "templar_assassin_meld", // 11
          "templar_assassin_psionic_trap", // 12
          "templar_assassin_meld", // 13
          "templar_assassin_psi_blades", // 14
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
            "tango",
            "quelling_blade",
            "branches",
            "slippers",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "dragon_lance",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: [
            "desolator",
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "hurricane_pike",
            "orchid",
          ],
          late_game: ["greater_crit", "swift_blink", "butterfly", "moon_shard"],
          situational: [
            "ultimate_scepter",
            "monkey_king_bar",
            "nullifier",
            "sphere",
          ],
          core: [
            "power_treads",
            "dragon_lance",
            "desolator",
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "greater_crit",
            "swift_blink",
          ],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "quicksilver_amulet",
            "mind_breaker",
            "enchanted_quiver",
            "the_leveller",
            "ninja_gear",
            "desolator_2",
            "apex",
          ],
        },
        ability_tooltips: {
          templar_assassin_meld:
            "You can surprise the opponents on the first wave by melding yourself in their offlaner`s creep blocking path.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1642747928,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2726399928",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "templar_assassin_meld", // 1
          "templar_assassin_psi_blades", // 2
          "templar_assassin_refraction", // 3
          "templar_assassin_refraction", // 4
          "templar_assassin_refraction", // 5
          "templar_assassin_psionic_trap", // 6
          "templar_assassin_refraction", // 7
          "templar_assassin_psi_blades", // 8
          "templar_assassin_meld", // 9
          "special_bonus_attack_speed_20", // 10
          "templar_assassin_meld", // 11
          "templar_assassin_psionic_trap", // 12
          "templar_assassin_meld", // 13
          "templar_assassin_psi_blades", // 14
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
            "tango",
            "faerie_fire",
            "quelling_blade",
            "branches",
            "circlet",
            "slippers",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "bottle",
            "power_treads",
            "dragon_lance",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: [
            "desolator",
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "hurricane_pike",
            "orchid",
          ],
          late_game: ["greater_crit", "swift_blink", "butterfly", "moon_shard"],
          situational: [
            "ultimate_scepter",
            "monkey_king_bar",
            "nullifier",
            "sphere",
          ],
          core: [
            "bottle",
            "power_treads",
            "dragon_lance",
            "desolator",
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "greater_crit",
            "swift_blink",
          ],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "quicksilver_amulet",
            "mind_breaker",
            "enchanted_quiver",
            "the_leveller",
            "ninja_gear",
            "desolator_2",
            "apex",
          ],
        },
        ability_tooltips: {
          templar_assassin_meld:
            "You can surprise the opponents on the first wave by melding yourself in their offlaner`s creep blocking path.",
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to fight with stored rune.",
        },
      },
    ],
    ability_tooltips: {
      templar_assassin_refraction:
        "You can already skill this spell on level 1 or 2 if you expect to be harassed by the ``single instance of damage`` spells like Arcane Bolt, Death Pulse and such.",
      special_bonus_unique_templar_assassin_2:
        "You can take this talent over the suggested one if there`s nothing major to dispel. Usually there will be though.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      power_treads:
        "A core boots upgrade that provides significant attack speed increase and some mana savings through toggling.",
      dragon_lance:
        "A core item that makes it easier for you to get right-clicks and Meld off. Can be disassembled for earlier timing on Black King Bar.",
      desolator:
        "A core item that adds to your burst. Allows you to take Roshan and buildings faster.",
      blink:
        "A core item for gap-closing. You don`t take damage during Refraction so it possible to blink out even after few instances of damage on you.",
      black_king_bar:
        "A core item that allows you to right-click in the fights. Refraction protects you against right-clicks and Black King Bar against most of the spells.",
      hurricane_pike:
        "Good at creating gap between you and heroes like Slark or Troll. You can use Meld during one of the 5 long range attacks of Hurricane Pike active ability.",
      aghanims_shard:
        "A core upgrade for silence and extra vision. Often times you will get this upgrade from second Roshan as Templar Assassin is good at killing Roshan early.",
      greater_crit:
        "A core damaging item of choice. Adds to the burst and extracts maximum value from armor reduction.",
      ultimate_scepter:
        "To splitpush and against it. It is appealing item to get if you are far behind or far ahead.",
      monkey_king_bar: "Against evasion and miss chance.",
      nullifier:
        "To dispel defensive items and spells that prevent you from right-clicking the opponent.",
      sphere: "Against powerful single-target disables and debuffs.",
      swift_blink:
        "A core upgrade that provides burst of attack speed on cast. Allows you to move around the map faster especially if you are playing without the boots due to slot issues.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To dodge the Psi Blades and offset the slow from Psionic Traps",
          },
          {
            item: "boots",
            info: "To dodge the Psi Blades and offset the slow from Psionic Traps",
          },
          { item: "urn_of_shadows", info: "To remove Refraction charges" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [
          {
            item: "ward_sentry",
            info: "To block camps and for Psionic Traps and Meld",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [
          { item: "ward_dispenser", info: "Use wards to block ancient camp" },
          { item: "SentryDust" },
          { item: "ghost" },
          { item: "glimmer_cape" },
        ],
        core: [
          { item: "hurricane_pike" },
          {
            item: "witch_blade",
            info: "To remove Refraction charges and to obtain some armor",
          },
          { item: "heavens_halberd" },
          { item: "javelin", info: "To remove Refractions" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
        ],
        support: [{ item: "SentryDustGem" }],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
          {
            item: "radiance",
            info: "To remove defensive Refraction charges and for miss chance",
          },
        ],
      },
    },
  },

  Terrorblade: {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804604,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963755",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_evasion_16", // 10
          "terrorblade_metamorphosis", // 11
          "terrorblade_sunder", // 12
          "terrorblade_reflection", // 13
          "terrorblade_reflection", // 14
          "special_bonus_hp_275", // 15
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
            "branches",
            "slippers",
            "faerie_fire",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "falcon_blade",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: ["manta", "dragon_lance", "skadi", "black_king_bar"],
          late_game: [
            "satanic",
            "greater_crit",
            "butterfly",
            "ultimate_scepter",
            "refresher",
          ],
          situational: [
            "infused_raindrop",
            "hurricane_pike",
            "blink",
            "monkey_king_bar",
          ],
          core: [
            "power_treads",
            "manta",
            "dragon_lance",
            "skadi",
            "black_king_bar",
            "satanic",
            "greater_crit",
          ],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "grove_bow",
            "quicksilver_amulet",
            "titan_sliver",
            "elven_tunic",
            "the_leveller",
            "ninja_gear",
            "apex",
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {
      terrorblade_sunder:
        "You can skill this spell eariler than suggested or keep a skill point if you are still laning and you feel like you might be ganked. It decreases your farming speed though.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade. Illusion-based heroes like agility and strength attributes.",
      manta:
        "A core item that provide a mix of useful stats. Proper Manta illusion usage can further accelerate your farm and in the fights significantly increase your damage output.",
      dragon_lance:
        "A core item that provides you with a lot of needed attributes and improves attack range during Metamorphosis. Can be disassembled.",
      skadi:
        "A core item that provides a lot of attributes and makes you less kitable.",
      hurricane_pike: "To disengage from heroes like Slark and Troll.",
      black_king_bar:
        "A core item that allows you to stand your ground and right-click. It helps with getting Sunder off.",
      satanic:
        "A core item that tanks you up and allows you to stand your ground. It dispels on cast.",
      greater_crit:
        "A core damaging item of choice. Illusions can crit as well.",
      blink: "To close the gap. Goes well with Aghanim`s Scepter.",
      ultimate_scepter: "For extra control and Metamorphosis uptime.",
      monkey_king_bar: "Against evasion and miss chance.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [{ item: "armor", info: "Buy armor items" }],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [],
      },
      mid_game: {
        all: [
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
          {
            item: "lotus_orb",
            info: "Dispels Reflection and nullifies health swap of Sunder",
          },
          { item: "dagon", info: "Instantly kills illusions" },
        ],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [
          { item: "maelstrom" },
          { item: "crimson_guard" },
          { item: "heavens_halberd" },
          { item: "orchid" },
          {
            item: "black_king_bar",
            info: "Sunder and Reflection can`t be used against spell immune heroes",
          },
          {
            item: "travel_boots",
            info: "To deal with splitpush by his illusions",
          },
          {
            item: "manta",
            info: "To dispel Reflection if the illusion of you that Terrorblade creates is strong",
          },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "ethereal_blade" }],
        support: [
          {
            item: "travel_boots",
            info: "To deal with splitpush by his illusions",
          },
        ],
        core: [
          {
            item: "mjollnir",
            info: "Magic damage from procs is good against this high armor hero and attacks with procs pierce evasion",
          },
          {
            item: "monkey_king_bar",
            info: "Magic damage from procs is good against this high armor hero that also buys evasion very often",
          },
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "bloodthorn", info: "To burst this high armor hero" },
          { item: "butterfly" },
          {
            item: "overwhelming_blink",
            info: "For some AoE damage against illusions",
          },
          {
            item: "satanic",
            info: "To dispel Reflection and be able to recover health after Sunder",
          },
        ],
      },
    },
  },

  Tidehunter: {
    gameplay_version: `7.31b`,
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804619,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963852",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "tidehunter_anchor_smash", // 1
          "tidehunter_gush", // 2
          "tidehunter_anchor_smash", // 3
          "tidehunter_kraken_shell", // 4
          "tidehunter_anchor_smash", // 5
          "tidehunter_ravage", // 6
          "tidehunter_anchor_smash", // 7
          "tidehunter_kraken_shell", // 8
          "tidehunter_kraken_shell", // 9
          "tidehunter_kraken_shell", // 10
          "special_bonus_unique_tidehunter_5", // 11
          "tidehunter_ravage", // 12
          "tidehunter_gush", // 13
          "tidehunter_gush", // 14
          "tidehunter_gush", // 15
          "special_bonus_unique_tidehunter_2", // 16
          "special_bonus_attributes", // 17
          "tidehunter_ravage", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_tidehunter", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tidehunter_7", // 25
        ],
        items: {
          starting: [
            "tango",
            `flask`,
            "quelling_blade",
            `gauntlets`,
            `gauntlets`,
            `ward_observer`,
          ],
          early_game: [
            "soul_ring",
            "phase_boots",
            `magic_wand`,
            `hood_of_defiance`,
          ],
          mid_game: ["blink", "ultimate_scepter", `shivas_guard`, `refresher`],
          late_game: ["overwhelming_blink", "assault"],
          situational: [
            `pipe`,
            `solar_crest`,
            "heavens_halberd",
            "aghanims_shard",
            `lotus_orb`,
            `vladmir`,
            `aeon_disk`,
            `desolator`,
            `greater_crit`,
            `travel_boots`,
          ],
          core: [
            "soul_ring",
            "phase_boots",
            "hood_of_defiance",
            "blink",
            "ultimate_scepter",
            "shivas_guard",
            "refresher",
          ],
          neutral: [
            "chipped_vest",
            `broom_handle`,
            `arcane_ring`,
            `pogo_stick`,
            "dragon_scale",
            "vambrace",
            "cloak_of_flames",
            `ceremonial_robe`,
            `spider_legs`,
            "timeless_relic",
            `spell_prism`,
            `flicker`,
            "fallen_sky",
            `force_field`,
            `mirror_shield`,
          ],
        },
      },
    ],
    ability_tooltips: {
      tidehunter_gush:
        "You can skill this spell on level 1 if you are fighting at the 0min rune or you can pressure on the lane.",
      tidehunter_kraken_shell:
        "On a tough lane you can put more points in this spell and earlier than suggested.",
      special_bonus_unique_tidehunter_6:
        "You can take this talent over the suggested one if opponents have a lot of stuns or debuffs that Kraken Shell can dispel off of you.",
    },
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace both gauntlets for it.`,
      soul_ring:
        "A core item that helps with mana sustain and provides useful stats.",
      phase_boots:
        "A core boots upgrade that fixes movement speed and armor issues that Tidehunter has.",
      hood_of_defiance:
        "A core defensive item that negates magical damage. Kraken Shell protects Tidehunter from right-clicks and Hood against magical damage.",
      pipe: "Against heavy magical damage lineup.",
      blink: "A core item that allows you to land multi-hero Ravage.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      aghanims_shard: "Improves right-click potential and building damage.",
      ultimate_scepter:
        "A core item that allows you to hit multiple opponents with Gush.",
      lotus_orb: "For reflecting, dispelling and armor.",
      shivas_guard:
        "A core item that icreases mana pool, adds to AoE damage and reduces healing of opponents team.",
      refresher:
        "A core item for second round of your spells and items. Goes well with level 25 Ravage talent.",
    },
    combo: [
      `blink`,
      `tidehunter_ravage`,
      `tidehunter_anchor_smash`,
      `tidehunter_gush`,
      `refresher`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Tidehunter tends to use Anchor Smash frequently to harass and kill the creeps",
          },
          {
            item: "blight_stone",
            info: "Tide has very low armor early which you can exploit as a weakness",
          },
          {
            item: "lifesteal",
            info: "For sustaining on the lane since Tide doesn`t do big increments of damage",
          },
          { item: "armor", info: "Helps you with Gush and Anchor Smash combo" },
        ],
        support: [],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [
          {
            item: "mekansm",
            info: "Heals some of the AoE damage from his abilities and provides armor against Gush",
          },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "black_king_bar" },
          {
            item: "silver_edge",
            info: "Breaking Tide`s passive will result into a very easier target to kill",
          },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [{ item: "wind_waker", info: "To save an ally being Ravaged" }],
        support: [{ item: "black_king_bar" }, { item: "aeon_disk" }],
        core: [{ item: "assault" }],
      },
    },
  },

  Timbersaw: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.pure,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804634,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699963963",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "shredder_whirling_death", // 1
          "shredder_reactive_armor", // 2
          "shredder_reactive_armor", // 3
          "shredder_timber_chain", // 4
          "shredder_reactive_armor", // 5
          "shredder_chakram", // 6
          "shredder_timber_chain", // 7
          "shredder_timber_chain", // 8
          "shredder_timber_chain", // 9
          "shredder_reactive_armor", // 10
          "special_bonus_hp_200", // 11
          "shredder_chakram", // 12
          "shredder_whirling_death", // 13
          "shredder_whirling_death", // 14
          "shredder_whirling_death", // 15
          "special_bonus_spell_amplify_8", // 16
          "special_bonus_attributes", // 17
          "shredder_chakram", // 18
          "special_bonus_attributes", // 19
          "special_bonus_strength_16", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_timbersaw", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "ring_of_protection",
            "gauntlets",
            "enchanted_mango",
            "faerie_fire",
            "flask",
            "magic_stick",
          ],
          early_game: ["soul_ring", "arcane_boots", "magic_wand", "bracer"],
          mid_game: [
            "hood_of_defiance",
            "cyclone",
            "kaya_and_sange",
            "aghanims_shard",
            "eternal_shroud",
          ],
          late_game: [
            "shivas_guard",
            "bloodstone",
            "sheepstick",
            "ultimate_scepter",
            "overwhelming_blink",
          ],
          situational: [
            "pipe",
            "lotus_orb",
            "blink",
            "black_king_bar",
            "heavens_halberd",
          ],
          core: [
            "soul_ring",
            "arcane_boots",
            "hood_of_defiance",
            "cyclone",
            "kaya_and_sange",
            "aghanims_shard",
            "shivas_guard",
          ],
          neutral: [
            "arcane_ring",
            "mysterious_hat",
            "essence_ring",
            "pupils_gift",
            "black_powder_bag",
            "quickening_charm",
            "cloak_of_flames",
            "spell_prism",
            "trickster_cloak",
            "stormcrafter",
            "giants_ring",
            "force_field",
            "fallen_sky",
          ],
        },
      },
    ],
    ability_tooltips: {
      shredder_timber_chain:
        "In certain match-ups(Ursa, Slark), Reactive Armor doesn`t have much value. You can put a point in this spell on level 1 or 2 and secure lasthits.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      soul_ring: "A core item that provides useful stats and mana sustain.",
      arcane_boots:
        "A core boots upgrade that provides mana sustain. Can be disassembled down the road.",
      hood_of_defiance:
        "A core defensive item. Reactive armor protects against physical damage and Hood covers the magical damage.",
      cyclone:
        "A core item that provides dispel on cast which is especially useful against Spirit Vessel. It also serves as a kill setup. You can disengage by Timber Chaining and Eul`sing yourself immediately.",
      pipe: "Against heavy magical damage lineup.",
      kaya_and_sange:
        "A core item that provide a mix of defensive and offensive stats. Self heal amplification synergizes with Reactive Armor really well.",
      aghanims_shard:
        "A core upgrade that adds to AoE damage output. Allows Timbersaw to deal significant damage to buildings.",
      lotus_orb: "For dispel, reflect and armor.",
      shivas_guard:
        "A core item that increases mana pool and adds to AoE damage. Reduces healing by a significant amount.",
      blink: "To close the gap quickly.",
      black_king_bar: "Against a lot of disables, silences and as a dispel.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      ultimate_scepter:
        "Increasing your damage output versus immobile heroes, especially stregth",
      overwhelming_blink:
        "Good for gap closure , burst of damage and especially good versus illusions and summons ",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Timbersaw tends to use Whirling Death and Timber Chain frequently to harass",
          },
          {
            item: "ring_of_health",
            info: "Sustains through timbers damage output.",
          },
          { item: "wind_lace", info: "To keep the distance from Timbersaw" },
          { item: "boots", info: "To keep the distance from Timbersaw" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to offset some of the HP regeneration from Reactive Armor",
          },
          {
            item: "quelling_blade",
            info: "Before and during the laning phase, use it to destroy the trees around you so you can minimize Timbers damage output",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by spell damage so you can keep regenerating while being hit by Timber`s spells",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "spirit_vessel" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          {
            item: "black_king_bar",
            info: " Timber`s dmg relies on spells and Black King Bar prevents all of them",
          },
          {
            item: "silver_edge",
            info: " Breaking through Timbers passive will get you a much easier target to kill",
          },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "skadi" },
          { item: "abyssal_blade" },
          {
            item: "bloodthorn",
            info: "Provides silence,spell damage debuff and high burst versus Timber",
          },
        ],
      },
    },
  },

  Tinker: {
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640804644,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964058",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "tinker_laser", // 1
          "tinker_heat_seeking_missile", // 2
          "tinker_laser", // 3
          "tinker_heat_seeking_missile", // 4
          "tinker_laser", // 5
          "tinker_rearm", // 6
          "tinker_laser", // 7
          "tinker_heat_seeking_missile", // 8
          "tinker_heat_seeking_missile", // 9
          "special_bonus_mana_reduction_8", // 10
          "tinker_defense_matrix", // 11
          "tinker_rearm", // 12
          "tinker_defense_matrix", // 13
          "tinker_defense_matrix", // 14
          "special_bonus_unique_tinker_5", // 15
          "tinker_defense_matrix", // 16
          "special_bonus_attributes", // 17
          "tinker_rearm", // 18
          "special_bonus_attributes", // 19
          "special_bonus_spell_amplify_10", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tinker", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "circlet",
            "ward_observer",
          ],
          early_game: ["bottle", "soul_ring", "blink", "null_talisman"],
          mid_game: [
            "shivas_guard",
            "overwhelming_blink",
            "ultimate_scepter",
            "aether_lens",
            "ghost",
            "kaya_and_sange",
          ],
          late_game: ["sheepstick", "ethereal_blade", "bloodstone", "dagon"],
          situational: ["black_king_bar", "aeon_disk"],
          core: [
            "bottle",
            "soul_ring",
            "blink",
            "shivas_guard",
            "overwhelming_blink",
            "ultimate_scepter",
            "aether_lens",
            "sheepstick",
          ],
          neutral: [
            "mysterious_hat",
            "keen_optic",
            "philosophers_stone",
            "vambrace",
            "psychic_headband",
            "ceremonial_robe",
            "timeless_relic",
            "stormcrafter",
            "seer_stone",
            "mirror_shield",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      bottle:
        "A core item that provides you with sustain and allows you to fight with stored rune.",
      soul_ring: "A core item that provides mana sustain.",
      blink:
        "A core item that allows you to position yourself safe enough in teamfights and while pushing waves.",
      shivas_guard:
        "A core item for waveclear and AoE damage along with Overwhelming Blink.",
      overwhelming_blink:
        "A core item for waveclear and AoE damage along with Shiva`s Guard.",
      black_king_bar:
        "Against disables, silences, magical damage and as a dispel.",
      ultimate_scepter:
        "A core damaging item which damage output scales with opponents` current HP.",
      aether_lens: "A core item that increases cast range.",
      sheepstick: "A core item that allows you to chain disable an opponent.",
      aeon_disk: "Provides you with second chance to escape or turn around.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Tinker is heavy on magic damage and Cloak reduces 15% of it",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate by spell damage so you can keep regenerating while being hit by Tinker`s spells",
          },
          { item: "smoke_of_deceit", info: "To dodge Missiles" },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [
          { item: "lotus_orb" },
          { item: "blink", info: "To close the gap to Tinker" },
        ],
        support: [
          { item: "glimmer_cape" },
          {
            item: "smoke_of_deceit",
            info: "Smoke to avoid missiles & prevent Blink break on my initiator",
          },
          {
            item: "ward_observer",
            info: "Tinker spots are at the edges of the map",
          },
        ],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "blade_mail" },
          { item: "black_king_bar" },
          {
            item: "invis_sword",
            info: "To close to gap to Tinker and dodge Missiles",
          },
          { item: "travel_boots" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "sphere" },
          { item: "aeon_disk" },
        ],
        support: [
          {
            item: "smoke_of_deceit",
            info: "Smoke to avoid missiles and prevent Blink break on my initiator",
          },
          {
            item: "ward_observer",
            info: "Tinker spots are at the edges of the map",
          },
          { item: "black_king_bar" },
          { item: "travel_boots" },
        ],
        core: [
          { item: "monkey_king_bar", info: "Against Laser miss rate" },
          { item: "abyssal_blade" },
          {
            item: "satanic",
            info: "For sustain against Tinker`s spell spam and to dispel Laser debuff",
          },
          {
            item: "heart",
            info: "To tank up and recover against Tinker`s spam",
          },
        ],
      },
    },
  },

  Tiny: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804671,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964139",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "tiny_toss", // 1
          "tiny_avalanche", // 2
          "tiny_toss", // 3
          "tiny_avalanche", // 4
          "tiny_avalanche", // 5
          "tiny_toss", // 6
          "tiny_avalanche", // 7
          "tiny_toss", // 8
          "tiny_grow", // 9
          "special_bonus_movement_speed_20", // 10
          "tiny_tree_grab", // 11
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
          starting: ["tango", "boots", "ward_observer", "ward_sentry"],
          early_game: ["tranquil_boots", "magic_wand", "soul_ring"],
          mid_game: [
            "blink",
            "cyclone",
            "force_staff",
            "ghost",
            "veil_of_discord",
          ],
          late_game: [
            "ethereal_blade",
            "overwhelming_blink",
            "wind_waker",
            "sheepstick",
          ],
          situational: ["lotus_orb", "invis_sword", "black_king_bar"],
          core: [
            "tranquil_boots",
            "blink",
            "cyclone",
            "force_staff",
            "ethereal_blade",
          ],
          neutral: [
            "pogo_stick",
            "arcane_ring",
            "philosophers_stone",
            "bullwhip",
            "spider_legs",
            "quickening_charm",
            "stormcrafter",
            "spell_prism",
            "book_of_shadows",
            "force_field",
          ],
        },
        ability_tooltips: {
          tiny_avalanche:
            "You can skill this spell on level one if you don`t see yourself being able to use Toss effectively.",
        },
        item_tooltips: {
          ward_sentry: "To block or unblock a pull camp.",
          tranquil_boots:
            "A core boots upgrade that helps with hp sustain and increases movement speed significantly.",
          blink:
            "A core item that allows you to initiate and burst an opponent with your combo, or save an ally by tossing him away.",
          cyclone:
            "A core item that allows you to setup kills and control an opponent. Applies basic dispel on cast.",
          force_staff:
            "A core item that adds to mobility and serves as another save for an ally in trouble.",
          lotus_orb: "For support Tiny to reflect, dispel and armor.",
          invis_sword: "Good for find opponents when they are splitpushing.",
          black_king_bar:
            "Allows you to stay alive after initiating. The Grow ability provides you with a lot of physical resistance through armor and Black King Bar covers most of the spell damage and disables.",
          ethereal_blade:
            "A core item that adds to the burst but can also be used defensively.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1642947088,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2729200744",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_unique_tiny_7", // 15
          "tiny_tree_grab", // 16
          "special_bonus_attributes", // 17
          "tiny_grow", // 18
          "special_bonus_attributes", // 19
          "special_bonus_status_resistance_15", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tiny_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "faerie_fire",
            "ward_observer",
          ],
          early_game: ["bottle", "phase_boots", "magic_wand"],
          mid_game: [
            "blink",
            "echo_sabre",
            "silver_edge",
            "black_king_bar",
            "aghanims_shard",
          ],
          late_game: [
            "moon_shard",
            "overwhelming_blink",
            "swift_blink",
            "assault",
          ],
          situational: ["cyclone", "sphere"],
          core: [
            "bottle",
            "phase_boots",
            "blink",
            "echo_sabre",
            "silver_edge",
            "black_king_bar",
            "aghanims_shard",
            "moon_shard",
          ],
          neutral: [
            "pogo_stick",
            "arcane_ring",
            "quicksilver_amulet",
            "misericorde",
            "mind_breaker",
            "elven_tunic",
            "the_leveller",
            "penta_edged_sword",
            "pirate_hat",
            "desolator_2",
          ],
        },
        ability_tooltips: {
          tiny_toss:
            "You can put a first point in this spell earlier than suggested if you see yourself being able to toss the opponents` midlaner under your tower.",
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to fight with stored rune.",
          phase_boots:
            "A core boots upgrade that fixes movement speed issues and allows you to gank more effectively.",
          blink:
            "A core item that allows you to initiate and burst an opponent with your combo, or save an ally by tossing him away.",
          cyclone:
            "Allows you to setup kills and control an opponent. Applies basic dispel on cast.",
          echo_sabre:
            "A core item that further increases the burst potential of your combo. Improves farming speed. Can be disassembled down the road.",
          silver_edge:
            "A core item that adds to burst, mobility and applies break effect on hit.",
          sphere: "Against powerful single-target disables and debuffs.",
          black_king_bar:
            "A core item that allows you to deliver the damage while in the middle of the fight. The Grow ability provides you with a lot of physical resistance through armor and Black King Bar covers most of the spell damage and disables.",
          aghanims_shard:
            "A core upgrade that allows you to have tree equiped non-stop.",
          moon_shard: "A core item that provides tons of attack speed.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1642947100,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2729201017",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_unique_tiny_7", // 15
          "tiny_toss", // 16
          "special_bonus_attributes", // 17
          "tiny_grow", // 18
          "special_bonus_attributes", // 19
          "special_bonus_status_resistance_15", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_tiny_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "branches",
            "gauntlets",
            "faerie_fire",
            "wraith_band",
          ],
          early_game: ["power_treads", "soul_ring", "magic_wand"],
          mid_game: [
            "echo_sabre",
            "silver_edge",
            "aghanims_shard",
            "black_king_bar",
            "blink",
          ],
          late_game: [
            "moon_shard",
            "satanic",
            "bloodthorn",
            "swift_blink",
            "assault",
            "overwhelming_blink",
          ],
          situational: ["sphere"],
          core: [
            "power_treads",
            "echo_sabre",
            "silver_edge",
            "aghanims_shard",
            "black_king_bar",
            "moon_shard",
          ],
          neutral: [
            "broom_handle",
            "unstable_wand",
            "quicksilver_amulet",
            "misericorde",
            "mind_breaker",
            "elven_tunic",
            "the_leveller",
            "penta_edged_sword",
            "pirate_hat",
            "desolator_2",
          ],
        },
        ability_tooltips: {
          tiny_toss:
            "You can put a first point in this spell earlier than suggested if you see yourself being able to toss an opponents` hero under your tower.",
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to fight with stored rune.",
          power_treads:
            "A core boots upgrade that fixes attack speed issues and allows you to save some mana through toggling.",
          echo_sabre:
            "A core item that further increases the burst potential of your combo. Improves farming speed. Can be disassembled down the road.",
          silver_edge:
            "A core item that adds to burst, mobility and applies break effect on hit.",
          aghanims_shard:
            "A core upgrade that allows you to have tree equiped non-stop.",
          sphere: "Against powerful single-target disables and debuffs.",
          black_king_bar:
            "A core item that allows you to deliver the damage while in the middle of the fight. The Grow ability provides you with a lot of physical resistance through armor and Black King Bar covers most of the spell damage and disables.",
          moon_shard: "A core item that provides tons of attack speed.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {},
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          { item: "infused_raindrop" },
          {
            item: "armor",
            info: "Buy armor items against a core right-clicking Tiny",
          },
          {
            item: "cloak",
            info: "Avalance and Toss combination does a lot of magical damage of which 15% can be reduced by Cloak",
          },
        ],
        support: [
          {
            item: "ward_sentry",
            info: "If Tiny is core he tends to farm very quickly thus blocking the camps with Sentries can slow down his farm",
          },
        ],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [{ item: "glimmer_cape" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "hurricane_pike" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick", info: "Against core Tiny" },
          { item: "ethereal_blade", info: "Against core Tiny" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "assault", info: "Against core Tiny" },
          { item: "shivas_guard", info: "Against core Tiny" },
          { item: "butterfly", info: "Against core Tiny" },
          {
            item: "bloodthorn",
            info: "Against core Tiny to be able to burst him",
          },
        ],
      },
    },
  },

  "Treant Protector": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804657,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699934294",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          `treant_natures_grasp`, // 1
          `treant_leech_seed`, // 2
          `treant_natures_grasp`, // 3
          `treant_living_armor`, // 4
          "treant_living_armor", // 5
          "treant_overgrowth", // 6
          "treant_living_armor", // 7
          "treant_living_armor", // 8
          `treant_natures_grasp`, // 9
          "special_bonus_unique_treant_8", // 10
          `treant_natures_grasp`, // 11
          "treant_overgrowth", // 12
          "treant_leech_seed", // 13
          `treant_leech_seed`, // 14
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
          "special_bonus_unique_treant_7", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "orb_of_venom",
            "enchanted_mango",
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
            "holy_locket",
            `tranquil_boots`,
            "blink",
            `solar_crest`,
            "aghanims_shard",
          ],
          late_game: [
            `meteor_hammer`,
            "ultimate_scepter",
            "refresher",
            "sheepstick",
          ],
          situational: [
            `urn_of_shadows`,
            `force_staff`,
            `cyclone`,
            `ghost`,
            `pipe`,
            `lotus_orb`,
            `aeon_disk`,
            `boots_of_bearing`,
            `wraith_pact`,
            `overwhelming_blink`,
            `octarine_core`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "holy_locket",
            "solar_crest",
            "blink",
            "aghanims_shard",
          ],
          neutral: [
            "trusty_shovel",
            "pogo_stick",
            `arcane_ring`,
            "philosophers_stone",
            "bullwhip",
            "quickening_charm",
            "ceremonial_robe",
            `black_powder_bag`,
            "spy_gadget",
            "stormcrafter",
            `heavy_blade`,
            `spell_prism`,
            "book_of_shadows",
            "force_field",
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic_stick if you expect high frequency of spells being used on the lane. Replace the orb of venom for it.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade that helps with mana sustain. It can be disassembled and Energy Booster used for Holy Locket. You can upgrade remaining boots to Tranquil Boots or leave it as it is.",
      holy_locket: "A core healing item.",
      tranquil_boots: `You can upgrade the Brown Boots to Tranquils once you have the Holy Locket.`,
      solar_crest:
        "A core item to buff one of your right-clicking cores or debuff the target you are focusing. It allows you to kill Roshan faster.",
      blink:
        "A core item that allows you to get off multi-hero Overgrowth after the opponents have used most of their dispels.",
      aghanims_shard: "A core upgrade that adds to mobility and control.",
      lotus_orb: "For reflect, dispel and armor.",
      boots_of_bearing: `An upgrade for Tranquil Boots that helps immensely in teamfights.`,
      wraith_pact: `An aura item that makes it hard for the enemy team to fight into your team.`,
    },
    combo: [
      `treant_overgrowth`,
      `meteor_hammer`,
      `treant_natures_grasp`,
      `treant_leech_seed`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "quelling_blade",
            info: "To remove the trees on one side of the lane so Treant Protector has less impact",
          },
          { item: "blight_stone" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from Treant Protector and offset the slows coming from Treant`s Grasp and Leech Seed",
          },
          {
            item: "boots",
            info: "To keep the distance from Treant Protector and offset the slows coming from Treant`s Grasp and Leech Seed",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }, { item: "cyclone" }],
        support: [
          {
            item: "SentryDustGem",
            info: "Treant players often purchase Aghanim`s Shard which grants him invisibility while near the trees",
          },
          { item: "glimmer_cape" },
          { item: "force_staff" },
        ],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Overgrowth" },
        ],
      },
      late_game: {
        all: [],
        support: [
          {
            item: "SentryDustGem",
            info: "Treant players usually take `Natures Guise Invisibility` talent on level 10 and build Aghanim`s Scepter at some point",
          },
          { item: "black_king_bar" },
        ],
        core: [{ item: "satanic", info: "To dispel Overgrowth" }],
      },
    },
  },

  "Troll Warlord": {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804682,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964271",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "troll_warlord_whirling_axes_ranged", // 1
          "troll_warlord_berserkers_rage", // 2
          "troll_warlord_fervor", // 3
          "troll_warlord_whirling_axes_ranged", // 4
          "troll_warlord_whirling_axes_ranged", // 5
          "troll_warlord_battle_trance", // 6
          "troll_warlord_whirling_axes_ranged", // 7
          "troll_warlord_fervor", // 8
          "troll_warlord_fervor", // 9
          "special_bonus_unique_troll_warlord_2", // 10
          "troll_warlord_fervor", // 11
          "troll_warlord_battle_trance", // 12
          "troll_warlord_berserkers_rage", // 13
          "troll_warlord_berserkers_rage", // 14
          "troll_warlord_berserkers_rage", // 15
          "special_bonus_unique_troll_warlord_5", // 16
          "special_bonus_attributes", // 17
          "troll_warlord_battle_trance", // 18
          "special_bonus_attributes", // 19
          "special_bonus_attack_damage_30", // 20
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
            "faerie_fire",
            "circlet",
            "magic_stick",
          ],
          early_game: [
            "power_treads",
            "ring_of_health",
            "magic_wand",
            "wraith_band",
            "falcon_blade",
          ],
          mid_game: [
            "bfury",
            "sange_and_yasha",
            "black_king_bar",
            "basher",
            "maelstrom",
            "manta",
          ],
          late_game: ["satanic", "abyssal_blade", "skadi", "butterfly"],
          situational: [
            "infused_raindrop",
            "blink",
            "monkey_king_bar",
            "sphere",
            "silver_edge",
            "ultimate_scepter",
          ],
          core: [
            "power_treads",
            "bfury",
            "sange_and_yasha",
            "black_king_bar",
            "basher",
            "satanic",
          ],
          neutral: [
            "possessed_mask",
            "broom_handle",
            "quicksilver_amulet",
            "misericorde",
            "elven_tunic",
            "paladin_sword",
            "the_leveller",
            "penta_edged_sword",
            "desolator_2",
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_troll_warlord:
        "You can take this level 10 talent over the suggested one if you are dealing with armor-reducing lineup.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that allows you to build up Fervor stacks faster due to attack speed increase. Allows you to save some mana through toggling as well.",
      maelstrom:
        "An alternative to Battle Fury especially good against illusion-based heroes. You will likely need Falcon Blade before it for mana sustain.",
      bfury:
        "A core farming item. Ring of Health should be purchased first on a tough lane.",
      sange_and_yasha:
        "A core item that provides you with useful stats and makes you less kitable. Self heal amplification works well with Battle Trance and Satanic.",
      sphere: "Against powerful single-target disables and debuffs.",
      black_king_bar:
        "A core item that goes well with Battle Trance making you less kitable.",
      basher:
        "A core item that allows you to lock the target you are focusing.",
      blink: "To close the gap.",
      monkey_king_bar: "Against evasion and miss chance.",
      silver_edge: "For burst, extra mobility and break effect.",
      ultimate_scepter:
        "If there is a need for a dispel for yourself or to dispel an opponent.",
      satanic:
        "A core item that tanks you up and its active can turn the fight around. It applies basic dispel on cast.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Troll Warlod tends to use Whirling Axes frequently to harass and kill creeps",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from Troll and offset the slow coming from Whirling Axes(Ranged)",
          },
          {
            item: "boots",
            info: "To keep the distance from Troll and offset the slow coming from Whirling Axes(Ranged)",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }, { item: "vanguard" }],
      },
      mid_game: {
        all: [
          { item: "cyclone" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [{ item: "force_staff" }, { item: "ghost" }],
        core: [
          { item: "heavens_halberd" },
          { item: "hurricane_pike" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "wind_waker", info: "To save an ally being Battle Tranced" },
        ],
        support: [],
        core: [
          { item: "assault" },
          { item: "abyssal_blade" },
          { item: "butterfly" },
          { item: "monkey_king_bar" },
        ],
      },
    },
  },

  Tusk: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804698,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964354",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "tusk_tag_team", // 1
          "tusk_ice_shards", // 2
          "tusk_snowball", // 3
          "tusk_tag_team", // 4
          "tusk_tag_team", // 5
          "tusk_walrus_punch", // 6
          "tusk_tag_team", // 7
          "tusk_snowball", // 8
          "tusk_snowball", // 9
          "special_bonus_unique_tusk_3", // 10
          "tusk_snowball", // 11
          "tusk_walrus_punch", // 12
          "tusk_ice_shards", // 13
          "tusk_ice_shards", // 14
          "tusk_ice_shards", // 15
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
            "tango",
            "boots",
            "flask",
            "orb_of_venom",
            "faerie_fire",
            "enchanted_mango",
            "branches",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "phase_boots",
            "magic_wand",
            "medallion_of_courage",
            "urn_of_shadows",
            "orb_of_corrosion",
          ],
          mid_game: [
            "blink",
            "solar_crest",
            "aghanims_shard",
            "ghost",
            "cyclone",
            "force_staff",
            "glimmer_cape",
          ],
          late_game: ["ultimate_scepter", "vladmir"],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "ancient_janggo",
            "lotus_orb",
          ],
          core: [
            "phase_boots",
            "blink",
            "solar_crest",
            "aghanims_shard",
            "ultimate_scepter",
            "vladmir",
          ],
          neutral: [
            "broom_handle",
            "pogo_stick",
            "bullwhip",
            "dragon_scale",
            "spider_legs",
            "black_powder_bag",
            "trickster_cloak",
            "ascetic_cap",
            "book_of_shadows",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      orb_of_venom: "If you can pressure on the lane.",
      ward_sentry: "To block or unblock a pull camp.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_corrosion:
        "If you can be aggressive on the lane. Armor reduction goes well with Tag Team and Walrush Punch!",
      infused_raindrop: "Against magical burst.",
      phase_boots:
        "A core boots upgrade that improves your roaming and gap-closing potential. The extra damage is multiplied by Walrus Punch!",
      spirit_vessel: "Against heavy-healing lineup.",
      ancient_janggo:
        "If you are grouping up a lot as a team in midgame and if you have summons.",
      blink:
        "A core item for instant initiation to either save an ally with Snowball or setup a kill with Walrus Punch!",
      solar_crest:
        "A core buffing item for one of your right-clicking cores. You can also debuff an opponent or Roshan to get more value out of Tag Team or Walrus Punch!",
      aghanims_shard:
        "A core upgrade of Ice Shards that can be used in various ways to either trap an enemy or save an ally.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter: "A core item to resposition an opponent.",
      vladmir:
        "A core buffing item which percentage values scale well into the late game.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "wind_lace", info: "To keep the distance from Tuskar" },
          { item: "boots", info: "To keep the distance from Tuskar" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [
          {
            item: "ward_observer",
            info: "To spot Tuskar`s movements on and out of the lane",
          },
        ],
        core: [],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [],
      },
      late_game: { all: [], support: [], core: [{ item: "assault" }] },
    },
  },

  Underlord: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804708,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964445",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "abyssal_underlord_atrophy_aura", // 1
          "abyssal_underlord_firestorm", // 2
          "abyssal_underlord_atrophy_aura", // 3
          "abyssal_underlord_firestorm", // 4
          "abyssal_underlord_firestorm", // 5
          "abyssal_underlord_dark_rift", // 6
          "abyssal_underlord_firestorm", // 7
          "abyssal_underlord_pit_of_malice", // 8
          "abyssal_underlord_pit_of_malice", // 9
          "abyssal_underlord_pit_of_malice", // 10
          "abyssal_underlord_pit_of_malice", // 11
          "abyssal_underlord_dark_rift", // 12
          "special_bonus_unique_underlord_8", // 13
          "abyssal_underlord_atrophy_aura", // 14
          "special_bonus_unique_underlord_5", // 15
          "abyssal_underlord_atrophy_aura", // 16
          "special_bonus_attributes", // 17
          "abyssal_underlord_dark_rift", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_underlord_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_underlord", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "gauntlets",
            "branches",
            "ring_of_protection",
            "magic_stick",
          ],
          early_game: ["soul_ring", "phase_boots", "magic_wand"],
          mid_game: [
            "rod_of_atos",
            "hood_of_defiance",
            "vanguard",
            "aghanims_shard",
            "solar_crest",
            "cyclone",
          ],
          late_game: ["assault", "octarine_core", "shivas_guard", "sheepstick"],
          situational: [
            "crimson_guard",
            "pipe",
            "heavens_halberd",
            "black_king_bar",
            "lotus_orb",
          ],
          core: [
            "soul_ring",
            "phase_boots",
            "rod_of_atos",
            "aghanims_shard",
            "assault",
          ],
          neutral: [
            "chipped_vest",
            "arcane_ring",
            "dragon_scale",
            "vambrace",
            "quickening_charm",
            "cloak_of_flames",
            "trickster_cloak",
            "ascetic_cap",
            "ex_machina",
            "force_field",
          ],
        },
      },
    ],
    ability_tooltips: {
      abyssal_underlord_firestorm:
        "You can skill this spell on level 1 instead of the suggested Atrophy Aura if you have a tough match-up.",
      abyssal_underlord_dark_rift:
        "You can opt not to skill this spell on level 6 in favor of other spells. I find this spell useful as a reset tool and allows more aggressive waveclearing.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      soul_ring: "A core item that provides mana sustain and useful stats.",
      phase_boots:
        "A core item that fixes movement speed and armor issues of the hero.",
      rod_of_atos:
        "A core item that synergizes well with Pit of Malice. The full combo would be: Pit of Malice - Firestorm - Rod of Atos - Pit of Malice procs again. You can right-click the opponent few times as well.",
      crimson_guard:
        "Against fast attacking right-clickers, illusions and summons.",
      pipe: "Against heavy magical damage lineup.",
      heavens_halberd: "Especially good against ranged right-clickers.",
      black_king_bar:
        "Against disables, silences, magical damage and as a dispel.",
      aghanims_shard:
        "A core upgrade of Firestorm that increases your overall damage significantly. You can use Firestorm on yourself and move around with it. Goes well with Firestorm talents.",
      lotus_orb: "To reflect, dispel and armor.",
      assault:
        "A core item that improves your right-click potential while also providing a strong aura. It helps with taking buildings down after a won fight along with bonus damage coming from Atrophy Aura.",
      shivas_guard:
        "An alternative to Assault Cuirass against heavy-healing and illusion-based lineups.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Underlod tends to use Firestorm every creep wave",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          {
            item: "wind_lace",
            info: "To move out of the Firestorm or run down the Underlord",
          },
          {
            item: "boots",
            info: "To move out of the Firestorm or run down the Underlord",
          },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to offset some of the HP regeneration and damage this HP hero",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "medallion_of_courage" },
          { item: "spirit_vessel" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "skadi", info: "To reduce healing" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  Undying: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804718,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964521",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "undying_decay", // 1
          `undying_soul_rip`, // 2
          `undying_tombstone`, // 3
          "undying_tombstone", // 4
          "undying_tombstone", // 5
          "undying_flesh_golem", // 6
          "undying_tombstone", // 7
          "undying_soul_rip", // 8
          "undying_soul_rip", // 9
          `special_bonus_unique_undying_7`, // 10
          `undying_soul_rip`, // 11
          "undying_flesh_golem", // 12
          "undying_decay", // 13
          "undying_decay", // 14
          "special_bonus_unique_undying_6", // 15
          "undying_decay", // 16
          "special_bonus_attributes", // 17
          "undying_flesh_golem", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_undying_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_reincarnation_300", // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            "enchanted_mango",
            `enchanted_mango`,
            `enchanted_mango`,
            `enchanted_mango`,
            "flask",
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
            "holy_locket",
            `tranquil_boots`,
            "solar_crest",
            "glimmer_cape",
            "force_staff",
          ],
          late_game: [`boots_of_bearing`, "ultimate_scepter", `aghanims_shard`],
          situational: [
            `orb_of_venom`,
            `urn_of_shadows`,
            `guardian_greaves`,
            `echo_sabre`,
            `ghost`,
            `cyclone`,
            `lotus_orb`,
            `pipe`,
            `crimson_guard`,
            `spirit_vessel`,
            `aeon_disk`,
            `wraith_pact`,
            `ethereal_blade`,
            `octarine_core`,
            `sheepstick`,
            `assault`,
            `shivas_guard`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "holy_locket",
            "solar_crest",
            `ultimate_scepter`,
          ],
          neutral: [
            "trusty_shovel",
            "arcane_ring",
            `chipped_vest`,
            "philosophers_stone",
            "bullwhip",
            `essence_ring`,
            "spider_legs",
            "quickening_charm",
            `black_powder_bag`,
            `cloak_of_flames`,
            "trickster_cloak",
            "spy_gadget",
            `ascetic_cap`,
            `heavy_blade`,
            "force_field",
            "book_of_shadows",
            `demonicon`,
            `fallen_sky`,
          ],
        },
      },
    ],
    ability_tooltips: {
      undying_soul_rip: `You can burst enemy heroes at level 2 with a bunch of decay stacks.`,
    },
    item_tooltips: {
      orb_of_venom: "If you can pressure on the lane.",
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, one mango, and sentry for it.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. Can be disassembled and Energy Booster used for Holy Locket. You can assemble Tranquil Boots afterwards or Arcane Boots again.",
      holy_locket:
        "A core item that improves healing coming from Soul Rip but also provides you with burst of healing and mana on cast.",
      tranquil_boots: `You can upgrade Brown Boots to Tranquils once you have the Holy Locket.`,
      solar_crest:
        "A core buffing item for one of your right-clicking cores. It allows you to take Roshan earlier and faster.",
      lotus_orb: "For reflect, dispel and armor.",
      boots_of_bearing: `An upgrade for Tranquil Boots that helps immensely in teamfights.`,
      wraith_pact: `An aura item that makes it hard for the enemy team to fight into your team.`,
    },
    combo: [
      `undying_tombstone`,
      `undying_flesh_golem`,
      `undying_decay`,
      `undying_soul_rip`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "wind_lace", info: "To keep the distance from Undying" },
          { item: "boots", info: "To keep the distance from Undying" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel against Soul rip and this high HP hero while in Flesh Golem form",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [{ item: "AttackSpeed", info: "to destroy the Tombstone" }],
      },
      late_game: {
        all: [],
        support: [],
        core: [{ item: "AttackSpeed", info: "to destroy the Tombstone" }],
      },
    },
  },

  Ursa: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804726,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964646",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_mp_regen_175", // 10
          "ursa_overpower", // 11
          "ursa_enrage", // 12
          "ursa_earthshock", // 13
          "ursa_earthshock", // 14
          "ursa_earthshock", // 15
          "special_bonus_hp_350", // 16
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
            "orb_of_venom",
            "faerie_fire",
            "slippers",
            "magic_stick",
          ],
          early_game: ["phase_boots", "magic_wand", "orb_of_corrosion"],
          mid_game: [
            "diffusal_blade",
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "basher",
            "bfury",
            "sange_and_yasha",
          ],
          late_game: ["satanic", "abyssal_blade", "swift_blink"],
          situational: [
            "infused_raindrop",
            "monkey_king_bar",
            "nullifier",
            "ultimate_scepter",
          ],
          core: [
            "phase_boots",
            "diffusal_blade",
            "blink",
            "black_king_bar",
            "aghanims_shard",
            "basher",
            "satanic",
          ],
          neutral: [
            "broom_handle",
            "possessed_mask",
            "quicksilver_amulet",
            "misericorde",
            "mind_breaker",
            "titan_sliver",
            "penta_edged_sword",
            "the_leveller",
            "desolator_2",
            "ex_machina",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      orb_of_venom: "Start with it if you can pressure on the lane.",
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      orb_of_corrosion: "If you can pressure on the lane.",
      phase_boots:
        "A core boots upgrade that allows you to gap-close faster and adds to burst.",
      infused_raindrop: "Against magical burst.",
      diffusal_blade:
        "A core item which active allows you to stay on top of the target. With Overpower on you can burn the target`s mana quickly.",
      bfury:
        "Whilst getting Diffusal Blade as a first major item goes along with aggressive approach to the game, getting Battle Fury would be indicative of more steady and farming approach. Ursa should be played with aggressive approach in mind more often than not.",
      blink: "A core item that allows you to gap-close instantly.",
      black_king_bar:
        "A core item that allows you to right-click the opponents in the middle of the fight.",
      aghanims_shard:
        "A core upgrade that you usually get from second Roshan.If that`s not the case, definitely purchase it.",
      basher:
        "A core item that allows you to lock the target you are focusing.",
      satanic:
        "A core item that tanks you up and allows you to stand your ground. Its active applies basic dispel on cast.",
      monkey_king_bar: "Against evasion and miss chance.",
      nullifier:
        "To dispel defensive items and spells from opponents that prevent you from right-clicking.",
      ultimate_scepter: "Against long lasting disables.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "wind_lace",
            info: "To keep the distance from Ursa and offset the slow coming from Earthshock",
          },
          {
            item: "boots",
            info: "To keep the distance from Ursa and offset the slow coming from Earthshock",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "cyclone" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [
          { item: "force_staff" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [{ item: "hurricane_pike" }, { item: "heavens_halberd" }],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
          {
            item: "wind_waker",
            info: "To save an ally from being bursted by Ursa",
          },
        ],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
        ],
      },
    },
  },

  "Vengeful Spirit": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804736,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964761",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          `vengefulspirit_magic_missile`, // 1
          `vengefulspirit_wave_of_terror`, // 2
          "vengefulspirit_magic_missile", // 3
          "vengefulspirit_wave_of_terror", // 4
          "vengefulspirit_magic_missile", // 5
          "vengefulspirit_nether_swap", // 6
          "vengefulspirit_magic_missile", // 7
          "vengefulspirit_command_aura", // 8
          "vengefulspirit_wave_of_terror", // 9
          "vengefulspirit_wave_of_terror", // 10
          "vengefulspirit_command_aura", // 11
          "vengefulspirit_nether_swap", // 12
          "vengefulspirit_command_aura", // 13
          "vengefulspirit_command_aura", // 14
          "special_bonus_magic_resistance_12", // 15
          `special_bonus_unique_vengeful_spirit_5`, // 16
          "special_bonus_attributes", // 17
          "vengefulspirit_nether_swap", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_vengeful_spirit_9", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          `special_bonus_unique_vengeful_spirit_3`, // 25
        ],
        items: {
          starting: [
            "tango",
            `tango`,
            "flask",
            "faerie_fire",
            "enchanted_mango",
            "circlet",
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            "arcane_boots",
            "magic_wand",
            "urn_of_shadows",
          ],
          mid_game: [`ultimate_scepter`, "aether_lens", "aghanims_shard"],
          late_game: [
            `boots_of_bearing`,
            `solar_crest`,
            `vladmir`,
            `force_staff`,
            `octarine_core`,
          ],
          situational: [
            `ring_of_basilius`,
            "ancient_janggo",
            `spirit_vessel`,
            `cyclone`,
            `pipe`,
            `ghost`,
            `ethereal_blade`,
            `heavens_halberd`,
            "lotus_orb",
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            `ultimate_scepter`,
            "aether_lens",
            "aghanims_shard",
            `solar_crest`,
            `vladmir`,
          ],
          neutral: [
            "keen_optic",
            `trusty_shovel`,
            "pogo_stick",
            "philosophers_stone",
            "bullwhip",
            `dragon_scale`,
            `grove_bow`,
            "spider_legs",
            "psychic_headband",
            "spy_gadget",
            "trickster_cloak",
            `ninja_gear`,
            "seer_stone",
            "book_of_shadows",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_magic_resistance_12:
        "On level 15, instead of taking this level 10 talent take the suggested level 15 talent. The DotA client disallows me to indicate that in graphics above.",
    },
    item_tooltips: {
      ward_sentry: `Get two sentries with the bounty rune gold to block or unblock a pull camp.`,
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango and circlet for it.",
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. Can be disassembled and Energy Booster used for Aether Lens. You should upgrade the leftover boots to Tranquil Boots.",
      ancient_janggo:
        "If you are looking to group up a lot early and if you have summons.",
      aether_lens: "A core item that improves cast range.",
      solar_crest:
        "A core buffing item for one of your right-clicking cores. It can be used offensively to take down an opponent or Roshan faster.",
      aghanims_shard:
        "A core upgrade to Wave of Terror that reduces the base damage and armor of affected opponents while at the same time buffing you for the same amount.",
      lotus_orb: "For reflect, dispel and armor.",
      vladmir:
        "A core buffing item which percentage values scale well into the late game.",
      ultimate_scepter:
        "A core item that allows you to cast spells and right-click even after the death.",
    },
    combo: [
      `vengefulspirit_wave_of_terror`,
      `vengefulspirit_nether_swap`,
      `vengefulspirit_magic_missile`,
      `solar_crest`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Vengeful Spirit`s Wave of Terror is a cheap and short cooldown spell that will be frequently along with Magic Missile",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost", info: "Against core Vengeful Spirit" },
        ],
        core: [
          { item: "heavens_halberd", info: "Against a core Vengeful Spirit" },
        ],
      },
      late_game: {
        all: [],
        support: [],
        core: [
          { item: "assault", info: "Against a core Vengeful Spirit" },
          { item: "butterfly", info: "Against a core Vengeful Spirit" },
        ],
      },
    },
  },

  Venomancer: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804752,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964844",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "venomancer_poison_sting", // 1
          "venomancer_venomous_gale", // 2
          "venomancer_poison_sting", // 3
          "venomancer_plague_ward", // 4
          "venomancer_plague_ward", // 5
          "venomancer_plague_ward", // 6
          "venomancer_plague_ward", // 7
          "venomancer_poison_nova", // 8
          "venomancer_poison_sting", // 9
          "venomancer_poison_sting", // 10
          "venomancer_venomous_gale", // 11
          "venomancer_poison_nova", // 12
          "venomancer_venomous_gale", // 13
          "venomancer_venomous_gale", // 14
          "special_bonus_unique_venomancer_3", // 15
          "special_bonus_unique_venomancer_2", // 16
          "special_bonus_attributes", // 17
          "venomancer_poison_nova", // 18
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
            "circlet",
            "branches",
            "faerie_fire",
            "quelling_blade",
            "ring_of_protection",
            "magic_stick",
          ],
          early_game: ["urn_of_shadows", "arcane_boots", "magic_wand"],
          mid_game: [
            "spirit_vessel",
            "veil_of_discord",
            "blink",
            "aghanims_shard",
            "ultimate_scepter",
            "hood_of_defiance",
            "aether_lens",
            "force_staff",
            "mekansm",
          ],
          late_game: [
            "shivas_guard",
            "octarine_core",
            "aeon_disk",
            "sheepstick",
          ],
          situational: [
            "infused_raindrop",
            "pipe",
            "heavens_halberd",
            "black_king_bar",
          ],
          core: [
            "arcane_boots",
            "spirit_vessel",
            "veil_of_discord",
            "blink",
            "aghanims_shard",
            "ultimate_scepter",
          ],
          neutral: [
            "mysterious_hat",
            "keen_optic",
            "grove_bow",
            "nether_shawl",
            "ceremonial_robe",
            "quickening_charm",
            "timeless_relic",
            "spell_prism",
            "force_boots",
            "seer_stone",
          ],
        },
        ability_tooltips: {
          venomancer_venomous_gale:
            "You can skill this spell on level 1 if you are fighting at the 0min rune. You can also put a second point into this spell at level 4 if you are able to play aggressively on the lane.",
        },
        item_tooltips: {
          arcane_boots:
            "A core boots upgrade for mana sustain. The usual order is to pick up brown boots, then acquire Spirit Vessel and then assemble Arcane Boots.",
          spirit_vessel:
            "A core item and another ``damage over time`` effect. Especially good against heavy-healing lineup.",
          pipe: "Against heavy magical damage lineup.",
          heavens_halberd: "Especially good against ranged right-clickers.",
          black_king_bar:
            "Against disables, magical damage and as a dispel. Allows you to stay alive after blinking in the middle of the opponents.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1642969042,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2729605047",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "venomancer_poison_sting", // 1
          "venomancer_venomous_gale", // 2
          "venomancer_poison_sting", // 3
          "venomancer_venomous_gale", // 4
          "venomancer_plague_ward", // 5
          "venomancer_poison_nova", // 6
          "venomancer_plague_ward", // 7
          "venomancer_plague_ward", // 8
          "venomancer_plague_ward", // 9
          "venomancer_poison_sting", // 10
          "venomancer_poison_sting", // 11
          "venomancer_poison_nova", // 12
          "venomancer_venomous_gale", // 13
          "venomancer_venomous_gale", // 14
          "special_bonus_unique_venomancer_3", // 15
          "special_bonus_unique_venomancer_2", // 16
          "special_bonus_attributes", // 17
          "venomancer_poison_nova", // 18
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
            "flask",
            "circlet",
            "branches",
            "faerie_fire",
            "ring_of_protection",
            "enchanted_mango",
            "wind_lace",
            "magic_stick",
          ],
          early_game: [
            "urn_of_shadows",
            "arcane_boots",
            "magic_wand",
            "ring_of_basilius",
          ],
          mid_game: [
            "veil_of_discord",
            "blink",
            "aghanims_shard",
            "force_staff",
            "ghost",
            "aether_lens",
            "cyclone",
            "glimmer_cape",
          ],
          late_game: [
            "ultimate_scepter",
            "aeon_disk",
            "shivas_guard",
            "octarine_core",
            "sheepstick",
          ],
          situational: ["infused_raindrop", "spirit_vessel", "lotus_orb"],
          core: [
            "urn_of_shadows",
            "arcane_boots",
            "veil_of_discord",
            "blink",
            "aghanims_shard",
            "ultimate_scepter",
          ],
          neutral: [
            "mysterious_hat",
            "keen_optic",
            "philosophers_stone",
            "nether_shawl",
            "ceremonial_robe",
            "quickening_charm",
            "timeless_relic",
            "spell_prism",
            "force_boots",
            "seer_stone",
          ],
        },
        ability_tooltips: {
          venomancer_venomous_gale:
            "You can skill this spell on level 1 if you are fighting at the 0min rune.",
        },
        item_tooltips: {
          urn_of_shadows:
            "A core item that adds another ``damage over time`` effect to your arsenal. Allows you to snowball off of first kill. It also provides you with useful stats, especially mana regeneration.",
          arcane_boots:
            "A core boots upgrade for mana sustain. It can be disassembled down the road.",
          spirit_vessel:
            "Another ``damage over time`` effect. Especially good against heavy-healing lineup.",
          lotus_orb: "For reflect, dispel and armor.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      veil_of_discord: "A core item for spell damage amplification.",
      blink:
        "A core item that allows you to blink in the middle of the opponents team and release Poison Nova.",
      aghanims_shard:
        "A core upgrade for Venomous Gale improving its cast range and enabling it to spawn 2 Plague Wards per opponent hit.",
      ultimate_scepter:
        "A core damaging item. Along with level 20 talent, Poison Nova will technically deal more than 100% of affected heroes` total hp as magical damage.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Venomancer tends to plant many Plague Wards and each time it will give you a stick charge",
          },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and/or for Pipe of Insight later on",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from the Venomancer and offset slows coming from Venomous Gale and Poison Sting",
          },
          {
            item: "boots",
            info: "To keep the distance from the Venomancer and offset slows coming from Venomous Gale and Poison Sting",
          },
          {
            item: "cloak",
            info: "Venomancer is heavy on magical damage and Cloak will reduce 15% of it",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "As long as your Tranquil Boots are active you are going to be able to recover a lot of damage delt to you by Venomancer damage over time spells",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Venomous Gale and Poison Sting" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "satanic",
            info: "To dispel Venomous Gale and to recover health during Poison Nova",
          },
        ],
      },
    },
  },

  Viper: {
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804761,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699964923",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "viper_poison_attack", // 1
          "viper_corrosive_skin", // 2
          "viper_poison_attack", // 3
          "viper_nethertoxin", // 4
          "viper_poison_attack", // 5
          "viper_viper_strike", // 6
          "viper_nethertoxin", // 7
          "viper_poison_attack", // 8
          "viper_corrosive_skin", // 9
          "special_bonus_attack_speed_20", // 10
          "viper_corrosive_skin", // 11
          "viper_viper_strike", // 12
          "viper_corrosive_skin", // 13
          "viper_nethertoxin", // 14
          "special_bonus_hp_300", // 15
          "viper_nethertoxin", // 16
          "special_bonus_attributes", // 17
          "viper_viper_strike", // 18
          "special_bonus_attributes", // 19
          "special_bonus_attack_damage_70", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_viper_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "circlet",
            "branches",
            "faerie_fire",
            "slippers",
            "enchanted_mango",
            "sobi_mask",
            "ring_of_protection",
            "magic_stick",
          ],
          early_game: [
            "urn_of_shadows",
            "power_treads",
            "wind_lace",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: [
            "dragon_lance",
            "black_king_bar",
            "skadi",
            "aghanims_shard",
            "rod_of_atos",
            "hurricane_pike",
            "hood_of_defiance",
            "force_staff",
            "ultimate_scepter",
          ],
          late_game: ["ethereal_blade", "assault", "butterfly"],
          situational: [
            "infused_raindrop",
            "spirit_vessel",
            "blink",
            "monkey_king_bar",
          ],
          core: [
            "urn_of_shadows",
            "power_treads",
            "wind_lace",
            "dragon_lance",
            "black_king_bar",
            "skadi",
            "aghanims_shard",
            "ethereal_blade",
          ],
          neutral: [
            "unstable_wand",
            "pogo_stick",
            "grove_bow",
            "quicksilver_amulet",
            "enchanted_quiver",
            "elven_tunic",
            "ninja_gear",
            "the_leveller",
            "apex",
            "pirate_hat",
          ],
        },
        item_tooltips: {
          urn_of_shadows:
            "A core item that allows you to snowball off of first kill. Provides you with useful stats, namely mana regeneration.",
          spirit_vessel: "Against heavy-healing lineup.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1642969059,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2729605437",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "viper_poison_attack", // 1
          "viper_corrosive_skin", // 2
          "viper_poison_attack", // 3
          "viper_nethertoxin", // 4
          "viper_poison_attack", // 5
          "viper_viper_strike", // 6
          "viper_nethertoxin", // 7
          "viper_poison_attack", // 8
          "viper_corrosive_skin", // 9
          "special_bonus_attack_speed_20", // 10
          "viper_corrosive_skin", // 11
          "viper_viper_strike", // 12
          "viper_corrosive_skin", // 13
          "viper_nethertoxin", // 14
          "special_bonus_hp_300", // 15
          "viper_nethertoxin", // 16
          "special_bonus_attributes", // 17
          "viper_viper_strike", // 18
          "special_bonus_attributes", // 19
          "special_bonus_attack_damage_70", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_viper_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "circlet",
            "slippers",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "bottle",
            "power_treads",
            "wind_lace",
            "magic_wand",
            "wraith_band",
          ],
          mid_game: [
            "dragon_lance",
            "black_king_bar",
            "skadi",
            "aghanims_shard",
            "hurricane_pike",
            "ultimate_scepter",
            "orchid",
          ],
          late_game: ["ethereal_blade", "assault", "butterfly"],
          situational: ["infused_raindrop", "blink", "monkey_king_bar"],
          core: [
            "bottle",
            "power_treads",
            "wind_lace",
            "dragon_lance",
            "black_king_bar",
            "skadi",
            "aghanims_shard",
            "ethereal_blade",
          ],
          neutral: [
            "unstable_wand",
            "pogo_stick",
            "grove_bow",
            "quicksilver_amulet",
            "enchanted_quiver",
            "elven_tunic",
            "ninja_gear",
            "the_leveller",
            "apex",
            "pirate_hat",
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that provides you with sustain and allows you to fight with stored rune.",
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_viper_5:
        "You can take this level 25 talent over the suggested one if there`s a real need for break effect.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      power_treads:
        "A core boots upgrade that provides significant attack speed increase and mana savings through toggling.",
      wind_lace:
        "A core cost-effective item that tackles the movement speed issues of the hero.",
      dragon_lance:
        "A core item that improves attack range. Can be disassembled to get Black King Bar a bit faster and the assembled again.",
      black_king_bar:
        "A core item against disables, debuffs and as a dispel. Allows you to stand your ground and right-click.",
      skadi:
        "A core item that tanks you up but also makes you less kitable. Reduces healing of the affected hero by a significant amount.",
      aghanims_shard:
        "A core upgrade of Poison Attack. Allows you to deal more damage to heroes and buildings.",
      blink: "For extra mobility.",
      monkey_king_bar: "Against evasion and miss chance.",
      ethereal_blade:
        "A core item that provides you with tons of stats for the cost. It can be used defensively and offensively depending on circumstances.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          { item: "wind_lace", info: "To keep the distance from the Viper" },
          { item: "boots", info: "To keep the distance from the Viper" },
          {
            item: "cloak",
            info: "Viper is heavy on magical damage and Cloak will reduce it by 15%",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "force_staff" }, { item: "glimmer_cape" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "heavens_halberd", info: "Against physical build on Viper" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "abyssal_blade",
            info: "Against a core right-clicking Viper",
          },
          { item: "butterfly", info: "Against a core right-clicking Viper" },
        ],
      },
    },
  },

  Visage: {
    gameplay_version: "7.30e",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1640804769,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699965007",
        steam_guide_role: STEAM_GUIDE_ROLE.OFFLANE,
        abilities: [
          "visage_soul_assumption", // 1
          "visage_grave_chill", // 2
          "visage_grave_chill", // 3
          "visage_gravekeepers_cloak", // 4
          "visage_grave_chill", // 5
          "visage_summon_familiars", // 6
          "visage_grave_chill", // 7
          "visage_soul_assumption", // 8
          "visage_soul_assumption", // 9
          "visage_soul_assumption", // 10
          "special_bonus_unique_visage_8", // 11
          "visage_summon_familiars", // 12
          "visage_gravekeepers_cloak", // 13
          "visage_gravekeepers_cloak", // 14
          "special_bonus_unique_visage_3", // 15
          "visage_gravekeepers_cloak", // 16
          "special_bonus_attributes", // 17
          "visage_summon_familiars", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_visage_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_visage_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "faerie_fire",
            "branches",
            "circlet",
            "mantle",
            "enchanted_mango",
            "magic_stick",
          ],
          early_game: [
            "boots",
            "magic_wand",
            "null_talisman",
            "medallion_of_courage",
            "ring_of_basilius",
          ],
          mid_game: [
            "orchid",
            "ultimate_scepter",
            "aghanims_shard",
            "solar_crest",
            "ancient_janggo",
            "rod_of_atos",
          ],
          late_game: ["sheepstick", "bloodthorn", "assault", "shivas_guard"],
          situational: ["infused_raindrop", "black_king_bar", "blink"],
          core: [
            "boots",
            "orchid",
            "ultimate_scepter",
            "aghanims_shard",
            "sheepstick",
            "bloodthorn",
          ],
          neutral: [
            "arcane_ring",
            "keen_optic",
            "grove_bow",
            "quicksilver_amulet",
            "quickening_charm",
            "enchanted_quiver",
            "timeless_relic",
            "spell_prism",
            "ex_machina",
            "desolator_2",
          ],
        },
        ability_tooltips: {
          visage_grave_chill:
            "You can skill this spell on level 1 to mess around with opponents` lasthiting, to run down a hero out of position or to escape.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1642969079,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2729605654",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "visage_grave_chill", // 1
          "visage_gravekeepers_cloak", // 2
          "visage_grave_chill", // 3
          "visage_soul_assumption", // 4
          "visage_grave_chill", // 5
          "visage_summon_familiars", // 6
          "visage_grave_chill", // 7
          "visage_soul_assumption", // 8
          "visage_soul_assumption", // 9
          "visage_soul_assumption", // 10
          "special_bonus_unique_visage_8", // 11
          "visage_summon_familiars", // 12
          "visage_gravekeepers_cloak", // 13
          "visage_gravekeepers_cloak", // 14
          "special_bonus_unique_visage_3", // 15
          "visage_gravekeepers_cloak", // 16
          "special_bonus_attributes", // 17
          "visage_summon_familiars", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_visage_4", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_visage_6", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "faerie_fire",
            "blight_stone",
            "branches",
            "mantle",
            "circlet",
            "mantle",
            "enchanted_mango",
            "magic_stick",
          ],
          early_game: [
            "boots",
            "magic_wand",
            "null_talisman",
            "medallion_of_courage",
          ],
          mid_game: [
            "orchid",
            "ultimate_scepter",
            "aghanims_shard",
            "solar_crest",
            "ancient_janggo",
            "rod_of_atos",
          ],
          late_game: ["sheepstick", "bloodthorn", "assault", "shivas_guard"],
          situational: ["infused_raindrop", "black_king_bar", "blink"],
          core: [
            "boots",
            "orchid",
            "ultimate_scepter",
            "aghanims_shard",
            "sheepstick",
            "bloodthorn",
          ],
          neutral: [
            "arcane_ring",
            "keen_optic",
            "grove_bow",
            "quicksilver_amulet",
            "quickening_charm",
            "enchanted_quiver",
            "timeless_relic",
            "spell_prism",
            "ex_machina",
            "desolator_2",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      boots:
        "A core item. It can be upgraded to Tranquil Boots if you need sustain on the lane but usually you want to finish Orchid as soon as possible.",
      infused_raindrop:
        "Against magical burst. It can save you a layer of Gravekeeper`s Cloak.",
      orchid: "A core item that allows you to pick-off heroes on your own.",
      ultimate_scepter:
        "A core item that allows you to sneak up to an opponent and provides damage increase upon exiting invisibility.",
      aghanims_shard:
        "A core defensive upgrade that makes you immune for 6s, heal for significant amount and also stun around you upon cast.",
      black_king_bar: "Against disables, magical damage and as a dispel.",
      sheepstick:
        "A core item that allows you to instantly disable and then burst an opponent.",
      bloodthorn:
        "A core burst item. Goes well with Sycthe of Vyse as the affected opponent can`t dispel it for the duration of disable. Provides true strike.",
      blink: "To reposition quickly.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          { item: "armor", info: "Buy armor items" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel to remove layers of Gravekeeper`s Cloak",
          },
        ],
        support: [],
        core: [{ item: "vanguard" }],
      },
      mid_game: {
        all: [
          { item: "spirit_vessel" },
          { item: "lotus_orb" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "crimson_guard" },
          { item: "black_king_bar" },
          { item: "javelin", info: "To remove Gravekeeper`s Cloak layers" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "assault" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
          { item: "satanic", info: "To dispel Grave Chill" },
        ],
      },
    },
  },

  "Void Spirit": {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640804780,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699965099",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "void_spirit_resonant_pulse", // 1
          "void_spirit_aether_remnant", // 2
          "void_spirit_resonant_pulse", // 3
          "void_spirit_dissimilate", // 4
          "void_spirit_dissimilate", // 5
          "void_spirit_astral_step", // 6
          "void_spirit_dissimilate", // 7
          "void_spirit_dissimilate", // 8
          "void_spirit_resonant_pulse", // 9
          "void_spirit_resonant_pulse", // 10
          "void_spirit_aether_remnant", // 11
          "void_spirit_astral_step", // 12
          "void_spirit_aether_remnant", // 13
          "void_spirit_aether_remnant", // 14
          "special_bonus_unique_void_spirit_2", // 15
          "special_bonus_unique_void_spirit_4", // 16
          "special_bonus_attributes", // 17
          "void_spirit_astral_step", // 18
          "special_bonus_attributes", // 19
          "special_bonus_spell_amplify_12", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_void_spirit_3", // 25
        ],
        items: {
          starting: [
            "tango",
            "quelling_blade",
            "faerie_fire",
            "branches",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["bottle", "null_talisman", "boots", "magic_wand"],
          mid_game: [
            "cyclone",
            "travel_boots",
            "ultimate_scepter",
            "kaya_and_sange",
            "aghanims_shard",
            "witch_blade",
            "orchid",
          ],
          late_game: [
            "ethereal_blade",
            "shivas_guard",
            "octarine_core",
            "sheepstick",
          ],
          situational: ["infused_raindrop", "sphere", "black_king_bar"],
          core: [
            "bottle",
            "boots",
            "cyclone",
            "travel_boots",
            "ultimate_scepter",
            "kaya_and_sange",
            "aghanims_shard",
            "ethereal_blade",
          ],
          neutral: [
            "mysterious_hat",
            "arcane_ring",
            "vambrace",
            "grove_bow",
            "quickening_charm",
            "ceremonial_robe",
            "timeless_relic",
            "spell_prism",
            "fallen_sky",
            "desolator_2",
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_void_spirit_2:
        "On level 15, take the suggested level 15 talent over this level 10 talent. Dota 2 client disallows me to indicate the order in graphics above. At level 16, take this level 10 talent.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      bottle:
        "A core item that helps with sustain and allows you to gank with a stored active rune.",
      boots:
        "A core item that should be upgraded to Boots of Travels usually after Eul`s was purchased.",
      infused_raindrop: "Against magical burst.",
      cyclone:
        "A core item to setup Aether Remnant or to be used in defensive manner.",
      travel_boots: "A core item that allows you to cover the map.",
      ultimate_scepter:
        "A core item that icreases AoE damage and adds AoE silence to your arsenal.",
      sphere: "Against powerful single-target disables and debuffs.",
      black_king_bar:
        "Against disables, debuffs, magical damage and as another dispel.",
      kaya_and_sange:
        "A core item that provides mix of defensve and offensive stats, namely spell amplification.",
      aghanims_shard:
        "A core upgrade to Dissimilate for extra damage and mobility.",
      ethereal_blade:
        "A core item for additonal burst. Can be used defensively to save yourself or an ally in trouble.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "magic_stick",
            info: "Void will use his spells frequently to harass you or to kill the creeps",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "wind_lace",
            info: "To dodge Aether remnant and Dissimilate",
          },
          { item: "boots", info: "To dodge Aether remnant and Dissimilate" },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Void Spirit is heavy on magical damage and Cloak will reduce it by 15%",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [{ item: "rod_of_atos" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "orchid" },
          { item: "hurricane_pike" },
          { item: "black_king_bar" },
          {
            item: "manta",
            info: "To dispel silences coming from his Aghanim`s Scepter or Orchid",
          },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "aeon_disk" }],
        support: [{ item: "black_king_bar" }],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "invis_sword", info: "To get on top of Void Spirit" },
          {
            item: "nullifier",
            info: "To dispel Resonant Pulse and commonly purchased Eul`s on him",
          },
          { item: "satanic", info: "To dispel silences" },
        ],
      },
    },
  },

  Warlock: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804789,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699965199",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "warlock_shadow_word", // 1
          "warlock_fatal_bonds", // 2
          "warlock_shadow_word", // 3
          "warlock_fatal_bonds", // 4
          "warlock_shadow_word", // 5
          "warlock_rain_of_chaos", // 6
          "warlock_shadow_word", // 7
          `warlock_upheaval`, // 8
          "warlock_fatal_bonds", // 9
          `warlock_fatal_bonds`, // 10
          `special_bonus_unique_warlock_5`, // 11
          "warlock_rain_of_chaos", // 12
          "warlock_upheaval", // 13
          "warlock_upheaval", // 14
          "special_bonus_unique_warlock_3", // 15
          "warlock_upheaval", // 16
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
            "flask",
            `clarity`,
            "enchanted_mango",
            `enchanted_mango`,
            `faerie_fire`,
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
            "holy_locket",
            `tranquil_boots`,
            `glimmer_cape`,
            "aghanims_shard",
            "force_staff",
          ],
          late_game: [
            `ultimate_scepter`,
            "aeon_disk",
            "refresher",
            `boots_of_bearing`,
            `octarine_core`,
          ],
          situational: [
            `ring_of_basilius`,
            `urn_of_shadows`,
            `veil_of_discord`,
            `wraith_pact`,
            `solar_crest`,
            `ghost`,
            `cyclone`,
            `lotus_orb`,
            `ethereal_blade`,
            `wind_waker`,
            `sheepstick`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "holy_locket",
            `glimmer_cape`,
            `aghanims_shard`,
            `aeon_disk`,
            `refresher`,
          ],
          neutral: [
            "arcane_ring",
            "trusty_shovel",
            `keen_optic`,
            "philosophers_stone",
            "bullwhip",
            `pupils_gift`,
            "spider_legs",
            "quickening_charm",
            `black_powder_bag`,
            "spy_gadget",
            "spell_prism",
            "book_of_shadows",
            "seer_stone",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {
      special_bonus_unique_warlock_1:
        "If the opponents are heavy on magical damage, take this level 25 talent instead of the suggested one. Usually the physical damage is prevalent in late game.",
    },
    item_tooltips: {
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, faerie fire, and sentry for it.`,
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. Can be disassembled and Energy Booster used for Holy Locket. You can assemble Tranquil Boots afterwards or Arcane Boots again.",
      holy_locket:
        "A core item that improves healing coming from Shadow Word and its active provides burst of healing and mana.",
      tranquil_boots: `You can upgrade Brown Boots to Tranquils once you have the Holy Locket.`,
      solar_crest: `A situational item to buff one of your right-clicking cores or Golem. You can use it offensively to kill-off an opponent or Roshan faster.`,
      aghanims_shard:
        "A core upgrade to Shadow Word turning it into AoE heal/damage and providing movement speed buff/debuff. Goes well with Shadow Word talents.",
      lotus_orb: "For reflect, dispel and armor.",
      boots_of_bearing: `An incredible late game item to buff your team and the golems in teamfights or when pushing.`,
    },
    combo: [
      `warlock_fatal_bonds`,
      `warlock_rain_of_chaos`,
      `warlock_shadow_word`,
      `warlock_upheaval`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_stick",
            info: "Warlock will use Shadow Word frequently to heal himself or his ally",
          },
          { item: "ring_of_regen", info: "For sustain on the lane" },
          {
            item: "headdress",
            info: "Headdress is good at mitigating the AOE damage done to you and your ally with Fatal Bonds",
          },
        ],
        support: [],
        core: [],
      },
      mid_game: {
        all: [
          { item: "lotus_orb", info: "To dispel Fatal Bonds and Shadow Word" },
          { item: "cyclone", info: "To dispel Fatal Bonds and Shadow Word" },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "manta", info: "To dispel Fatal Bonds and Shadow Word" },
        ],
      },
      late_game: {
        all: [],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "satanic", info: "To dispel Fatal Bonds" }],
      },
    },
  },

  Weaver: {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804801,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699965288",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "weaver_shukuchi", // 1
          "weaver_the_swarm", // 2
          `weaver_shukuchi`, // 3
          `weaver_geminate_attack`, // 4
          "weaver_shukuchi", // 5
          "weaver_time_lapse", // 6
          "weaver_shukuchi", // 7
          "weaver_the_swarm", // 8
          "weaver_the_swarm", // 9
          "weaver_the_swarm", // 10
          "special_bonus_strength_9", // 11
          "weaver_time_lapse", // 12
          "weaver_geminate_attack", // 13
          "weaver_geminate_attack", // 14
          "special_bonus_unique_weaver_4", // 15
          "weaver_geminate_attack", // 16
          "special_bonus_attributes", // 17
          "weaver_time_lapse", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_weaver_3", // 20
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
            "sobi_mask",
            "flask",
            `faerie_fire`,
            "ward_observer",
          ],
          early_game: [
            `ward_sentry`,
            "urn_of_shadows",
            "magic_wand",
            "medallion_of_courage",
            `infused_raindrop`,
          ],
          mid_game: [
            `rod_of_atos`,
            "aghanims_shard",
            "solar_crest",
            `ultimate_scepter`,
            `blink`,
          ],
          late_game: [
            `gungir`,
            "aeon_disk",
            `black_king_bar`,
            `bloodthorn`,
            "sheepstick",
          ],
          situational: [
            `orchid`,
            `spirit_vessel`,
            `heavens_halberd`,
            `cyclone`,
            `ghost`,
            `force_staff`,
            "lotus_orb",
            `wraith_pact`,
            `ethereal_blade`,
            `wind_waker`,
            `travel_boots`,
          ],
          core: [
            "urn_of_shadows",
            `rod_of_atos`,
            `aghanims_shard`,
            "ultimate_scepter",
            "blink",
          ],
          neutral: [
            "arcane_ring",
            "trusty_shovel",
            "ring_of_aquila",
            "bullwhip",
            `grove_bow`,
            "quickening_charm",
            "enchanted_quiver",
            "spy_gadget",
            "spell_prism",
            `flicker`,
            "book_of_shadows",
            "seer_stone",
            `demonicon`,
          ],
        },
        item_tooltips: {
          ward_sentry: `Purchase two sentries with the bounty rune gold. One for the lane and the other to block or unblock pull camps.`,
          urn_of_shadows:
            "A core item that allows you to snowball off of first kill on the lane. Provides you with useful stats, namely mana regeneration.",
          spirit_vessel: `A situational item that increases your damage output signifcantly against a heavy-healing lineup.`,
          rod_of_atos: `Provides you with a way to cancel Teleports and helps your team catch up to your initiation.`,
          cyclone:
            "Can be a very useful against debuffs (silences, dust) and if you lack setup. It is also good at dispeling or kiting opponents` heroes like Spirit Breaker, Ursa, Legion Commander and Axe.",
          ultimate_scepter:
            "A core saving item that allows you to use Time Lapse on an ally. Cast range is short so you will need to position yourself well until you get Blink Dagger.",
          blink:
            "A core item that allows you to get Time Lapse off on an ally instantly.",
          aghanims_shard:
            "A core upgrade to The Swarm which can also detect invisible units among the other benefits.",
          lotus_orb: "For reflect, dispel(removes dust) and some armor.",
        },
        ability_tooltips: {
          weaver_geminate_attack:
            "You can skill this spell on level 2 instead of The Swarm if you don`t see yourself being able to land a kill. Having a point in Geminate Attack helps you with harass and it kills-off a courier instantly.",
          special_bonus_unique_weaver_2:
            "You can take this talent on level 20 over the suggested one if you are doing well and can transition in semi-carry with a single-damaging item. You should pick up the Geminate talent on level 25 then as well.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1643091534,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2730987049",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_strength_9", // 11
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
            "slippers",
            "circlet",
            "quelling_blade",
          ],
          early_game: [
            `falcon_blade`,
            `wraith_band`,
            `magic_wand`,
            `maelstrom`,
            "power_treads",
          ],
          mid_game: ["dragon_lance", `lesser_crit`, "skadi", `aghanims_shard`],
          late_game: [
            "greater_crit",
            "satanic",
            `black_king_bar`,
            `monkey_king_bar`,
          ],
          situational: [
            `gungir`,
            `mjollnir`,
            "sphere",
            "hurricane_pike",
            `diffusal_blade`,
            `sange_and_yasha`,
            `manta`,
            `bloodthorn`,
            "nullifier",
            `moon_shard`,
            `travel_boots`,
          ],
          core: [
            `maelstrom`,
            "power_treads",
            "dragon_lance",
            "skadi",
            `aghanims_shard`,
            "greater_crit",
            `satanic`,
          ],
          neutral: [
            "possessed_mask",
            "unstable_wand",
            "quicksilver_amulet",
            `misericorde`,
            "grove_bow",
            `dragon_scale`,
            "mind_breaker",
            "titan_sliver",
            `paladin_sword`,
            "the_leveller",
            "ninja_gear",
            `flicker`,
            "desolator_2",
            "apex",
            `mirror_shield`,
          ],
        },
        item_tooltips: {
          falcon_blade: `Rush this item before anything else in the lane. It helps immensely with scaling in the early game.`,
          power_treads:
            "A core boots upgrade that increases your attack speed significantly and saves mana through toggling. Having Power Treads on strength is extra 200hp that might just be enough to get Time Lapse off.",
          maelstrom:
            "A core farming item that procs frequently due to Geminate Attack. It is particularly good against illusion-based heroes. Every time lightning procs, you can`t miss on that attack. It should be upgraded to Mjollnir in late game.",
          sphere:
            "An alternative to Black King Bar against powerful single-target disables and debuffs.",
          dragon_lance:
            "A core item that provides you with useful stats and improves attack range. Can be disassembled for faster Black King Bar timing and assembled again afterwards.",
          black_king_bar:
            "A core item that allows you to deliver the damage. Sometimes Linken`s Sphere might be a better choice(Spirit Breaker, Doom).",
          aghanims_shard: "Increases your dps and deals with invisible heroes.",
          hurricane_pike:
            "Worth considering against heroes like Slark and Troll to create gap.",
          skadi:
            "A core item that tanks you up and messes with opponents healing, attack and movement speed.",
          monkey_king_bar:
            "Against a lot of evasion and miss chance although Maelstrom and Mjollnir pierce have true strike on ever proc.",
          greater_crit: "A core damaging item of choice.",
          gungir: `You can get this if your team lacks stuns for you to hit them more frequently in fights.`,
          nullifier:
            "To dispel defensive spells and items that prevent you from right-clicking the opponents.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_wand: `Start with magic stick if you expect high frequency of spells being used on the lane.`,
      infused_raindrop: "Against magical burst.",
    },
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
        all: [
          {
            item: "magic_stick",
            info: "Weaver will use Shukuchi frequently to harass you or escape",
          },
          { item: "blight_stone" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          { item: "armor", info: "Buy armor items" },
        ],
        support: [
          { item: "ward_sentry" },
          { item: "dust", info: "Dust can be dispeled by Time Lapse" },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [
          { item: "SentryDustGem" },
          { item: "glimmer_cape" },
          { item: "ghost" },
        ],
        core: [{ item: "orchid" }, { item: "heavens_halberd" }],
      },
      late_game: {
        all: [
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
        ],
        support: [{ item: "SentryDustGem" }],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "butterfly" },
          {
            item: "silver_edge",
            info: "To get on top of Weaver, to remove the bugs and break the passive",
          },
        ],
      },
    },
  },

  Windranger: {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804812,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699965445",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "windrunner_powershot", // 1
          "windrunner_shackleshot", // 2
          "windrunner_windrun", // 3
          "windrunner_powershot", // 4
          "windrunner_powershot", // 5
          "windrunner_focusfire", // 6
          "windrunner_powershot", // 7
          "windrunner_shackleshot", // 8
          "windrunner_shackleshot", // 9
          "windrunner_shackleshot", // 10
          "special_bonus_unique_windranger_9", // 11
          "windrunner_focusfire", // 12
          "windrunner_windrun", // 13
          "windrunner_windrun", // 14
          "special_bonus_unique_windranger_3", // 15
          "windrunner_windrun", // 16
          "special_bonus_attributes", // 17
          "windrunner_focusfire", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_windranger_6", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_windranger_7", // 25
        ],
        items: {
          starting: [
            "tango",
            "flask",
            "faerie_fire",
            "circlet",
            "branches",
            "blight_stone",
            "mantle",
            "ward_observer",
            "ward_sentry",
            "magic_stick",
          ],
          early_game: [
            "urn_of_shadows",
            "arcane_boots",
            "magic_wand",
            "medallion_of_courage",
            "null_talisman",
          ],
          mid_game: [
            "blink",
            "aether_lens",
            "aghanims_shard",
            "maelstrom",
            "force_staff",
            "cyclone",
            "meteor_hammer",
          ],
          late_game: [
            "octarine_core",
            "sheepstick",
            "aeon_disk",
            "ultimate_scepter",
          ],
          situational: ["infused_raindrop", "spirit_vessel", "lotus_orb"],
          core: [
            "urn_of_shadows",
            "arcane_boots",
            "blink",
            "aether_lens",
            "aghanims_shard",
            "octarine_core",
          ],
          neutral: [
            "keen_optic",
            "arcane_ring",
            "philosophers_stone",
            "grove_bow",
            "quickening_charm",
            "psychic_headband",
            "timeless_relic",
            "spy_gadget",
            "seer_stone",
            "book_of_shadows",
          ],
        },
        item_tooltips: {
          ward_sentry: "To block or unblock a pull camp.",
          urn_of_shadows:
            "A core item that allows you to snowball off of first kill. Provides useful stats, namely mana regeneration.",
          arcane_boots:
            "A core boots upgrade for mana sustain. Can be disassembled and Energy Booster used for Aether Lens. You should upgrade the leftover boots to Tranquil Boots usually.",
          spirit_vessel: "Against heavy-healing lineup.",
          aether_lens: "A core item that improves cast range.",
          aghanims_shard:
            "A core upgrade that provides more control in the fights.",
          lotus_orb: "For reflect, dispel and armor.",
          octarine_core:
            "A core item that reduces cooldown of spells and items.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1643091452,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2730986384",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_unique_windranger", // 16
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
            "branches",
            "circlet",
            "mantle",
            "ward_observer",
            "magic_stick",
          ],
          early_game: [
            "bottle",
            "boots",
            "maelstrom",
            "magic_wand",
            "null_talisman",
          ],
          mid_game: [
            "black_king_bar",
            "blink",
            "travel_boots",
            "monkey_king_bar",
            "gungir",
          ],
          late_game: ["ultimate_scepter", "sheepstick", "arcane_blink"],
          situational: [
            "infused_raindrop",
            "sphere",
            "silver_edge",
            "aghanims_shard",
            "nullifier",
          ],
          core: [
            "bottle",
            "boots",
            "maelstrom",
            "black_king_bar",
            "blink",
            "travel_boots",
            "monkey_king_bar",
            "ultimate_scepter",
          ],
          neutral: [
            "arcane_ring",
            "possessed_mask",
            "grove_bow",
            "misericorde",
            "mind_breaker",
            "enchanted_quiver",
            "spell_prism",
            "heavy_blade",
            "desolator_2",
            "mirror_shield",
          ],
        },
        item_tooltips: {
          bottle:
            "A core item that helps with sustain and allows you to gank with a stored active rune.",
          boots:
            "A core item that will be upgraded to Boots of Travel down the road.",
          maelstrom:
            "A core farming item but also kill item. Maelstrom procs very often during Focus Fire. Whenever it procs, that attack can`t miss.",
          black_king_bar:
            "A core item that allows you to burst an opponent during Focus Fire.",
          sphere: "Against powerful single-target disables and debuffs.",
          travel_boots: "A core item that allows you to cover the map better.",
          silver_edge: "For burst, reposition and break effect.",
          aghanims_shard: "If you need more control in the fights.",
          nullifier:
            "To dispel defensive spells and items that prevent you from right-clicking the opponent.",
          monkey_king_bar:
            "A core major damaging item of choice. It procs frequently during Focus Fire and procs pierce spell-immunity. It deals with evasion and miss chance as well.",
          ultimate_scepter: "A core item that makes you more elusive.",
        },
        ability_tooltips: {
          special_bonus_unique_windranger_3:
            "You can take this talent over the suggested level 15 talent if opponents don`t have a way to dispel Windrun.",
        },
      },
      {
        roles: [DOTA_COACH_GUIDE_ROLE.OFFLANE],
        steam_guide_id: 1643091463,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2730986473",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
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
          "special_bonus_unique_windranger", // 16
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
            "branches",
            "circlet",
            "mantle",
            "magic_stick",
          ],
          early_game: ["boots", "maelstrom", "magic_wand", "null_talisman"],
          mid_game: [
            "black_king_bar",
            "blink",
            "travel_boots",
            "aghanims_shard",
            "monkey_king_bar",
            "gungir",
          ],
          late_game: ["ultimate_scepter", "sheepstick", "arcane_blink"],
          situational: [
            "infused_raindrop",
            "sphere",
            "silver_edge",
            "nullifier",
          ],
          core: [
            "boots",
            "maelstrom",
            "black_king_bar",
            "blink",
            "travel_boots",
            "aghanims_shard",
            "monkey_king_bar",
            "ultimate_scepter",
          ],
          neutral: [
            "arcane_ring",
            "possessed_mask",
            "grove_bow",
            "misericorde",
            "mind_breaker",
            "enchanted_quiver",
            "spell_prism",
            "heavy_blade",
            "desolator_2",
            "mirror_shield",
          ],
        },
        item_tooltips: {
          boots:
            "A core item that will be upgraded to Boots of Travel down the road.",
          maelstrom:
            "A core farming item but also kill item. Maelstrom procs very often during Focus Fire. Whenever it procs, that attack can`t miss.",
          black_king_bar:
            "A core item that allows you to burst an opponent during Focus Fire.",
          sphere: "Against powerful single-target disables and debuffs.",
          travel_boots: "A core item that allows you to cover the map better.",
          aghanims_shard: "A core item for more control in the fights.",
          silver_edge: "For burst, reposition and break effect.",
          nullifier:
            "To dispel defensive spells and items that prevent you from right-clicking the opponent.",
          monkey_king_bar:
            "A core major damaging item of choice. It procs frequently during Focus Fire and procs pierce spell-immunity. It deals with evasion and miss chance as well.",
          ultimate_scepter: "A core item that makes you more elusive.",
        },
        ability_tooltips: {
          special_bonus_unique_windranger_3:
            "You can take this talent over the suggested level 15 talent if opponents don`t have a way to dispel Windrun.",
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      infused_raindrop: "Against magical burst.",
      blink: "A core item that allows you to land Shackleshot reliably.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from the Windranger",
          },
          { item: "boots", info: "To keep the distance from the Windranger" },
          { item: "armor", info: "Buy armor items" },
          { item: "infused_raindrop" },
        ],
        support: [],
        core: [{ item: "ring_of_health" }, { item: "vanguard" }],
      },
      mid_game: {
        all: [{ item: "cyclone" }],
        support: [{ item: "glimmer_cape" }, { item: "ghost" }],
        core: [
          { item: "blade_mail" },
          { item: "orchid" },
          { item: "heavens_halberd" },
          { item: "hurricane_pike" },
          { item: "ghost" },
          { item: "black_king_bar" },
          { item: "monkey_king_bar" },
          { item: "witch_blade", info: "Poison attack has True Strike" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere" },
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
        ],
        support: [
          {
            item: "SentryDustGem",
            info: "She often times gets `Windrun grants invisibility` talent on level 25",
          },
          { item: "black_king_bar" },
        ],
        core: [
          { item: "monkey_king_bar" },
          { item: "abyssal_blade" },
          { item: "bloodthorn" },
          { item: "assault" },
          { item: "butterfly" },
          { item: "nullifier", info: "To dispel Windrun" },
        ],
      },
    },
  },

  "Winter Wyvern": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804822,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699965518",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
        abilities: [
          "winter_wyvern_arctic_burn", // 1
          "winter_wyvern_splinter_blast", // 2
          "winter_wyvern_splinter_blast", // 3
          "winter_wyvern_cold_embrace", // 4
          "winter_wyvern_splinter_blast", // 5
          "winter_wyvern_winters_curse", // 6
          "winter_wyvern_splinter_blast", // 7
          "winter_wyvern_cold_embrace", // 8
          "winter_wyvern_cold_embrace", // 9
          "winter_wyvern_cold_embrace", // 10
          "special_bonus_unique_winter_wyvern_5", // 11
          "winter_wyvern_winters_curse", // 12
          "winter_wyvern_arctic_burn", // 13
          "winter_wyvern_arctic_burn", // 14
          "special_bonus_unique_winter_wyvern_2", // 15
          "winter_wyvern_arctic_burn", // 16
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
            "flask",
            "enchanted_mango",
            `enchanted_mango`,
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
            "holy_locket",
            "blink",
            "aghanims_shard",
            "glimmer_cape",
            "aether_lens",
            "force_staff",
          ],
          late_game: [
            "aeon_disk",
            "octarine_core",
            "ultimate_scepter",
            "sheepstick",
          ],
          situational: [
            `ring_of_basilius`,
            `ghost`,
            `cyclone`,
            `black_king_bar`,
            `refresher`,
            `bloodthorn`,
            `witch_blade`,
            `wind_waker`,
            "lotus_orb",
            `ethereal_blade`,
            `kaya_and_sange`,
            `travel_boots`,
          ],
          core: [
            "arcane_boots",
            "holy_locket",
            "blink",
            "aghanims_shard",
            `aether_lens`,
          ],
          neutral: [
            "keen_optic",
            "trusty_shovel",
            `pogo_stick`,
            "philosophers_stone",
            "bullwhip",
            `grove_bow`,
            "psychic_headband",
            "spider_legs",
            `quickening_charm`,
            "spy_gadget",
            `spell_prism`,
            "trickster_cloak",
            `timeless_relic`,
            `heavy_blade`,
            "seer_stone",
            "book_of_shadows",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      ring_of_basilius:
        "Start with it if your laning partner also uses a lot of mana.",
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, faerie fire, and clarity for it.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. Can be disassembled and Energy Booster used for Holy Locket. You should assemble Tranquil Boots afterwards.",
      holy_locket:
        "A core item that improves healing coming from Cold Embrace. It also provides burst of healing and mana on cast.",
      blink:
        "Allows you to seize a moment when opponent`s are stacked up and cast Winter`s Curse or to quickly reposition close to an ally that needs Cold Embrace save.",
      aghanims_shard:
        "A core upgrade for Cold Embrace. Adds to AoE damage in the fights but also improves waveclear.",
      lotus_orb: "For reflect, dispel and armor.",
    },
    combo: [
      `winter_wyvern_arctic_burn`,
      `winter_wyvern_winters_curse`,
      `winter_wyvern_splinter_blast`,
    ],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          { item: "magic_stick" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and for Pipe of Insight later on",
          },
          {
            item: "infused_raindrop",
            info: `It helps against the Winter Wyvern magical nukes`,
          },
          {
            item: "cloak",
            info: "Void Spirit is heavy on magical damage and Cloak will reduce it by 15%",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [{ item: "lotus_orb" }],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "sange_and_yasha", info: "For status resistance" },
          { item: "kaya_and_sange", info: "For status resistance" },
        ],
      },
      late_game: {
        all: [
          { item: "sphere" },
          { item: "sheepstick" },
          { item: "ethereal_blade" },
          { item: "aeon_disk" },
          { item: "wind_waker", info: "To save an ally being Winter`s Cursed" },
        ],
        support: [{ item: "black_king_bar" }],
        core: [{ item: "invis_sword", info: "To get on top of Winter Wyvern" }],
      },
    },
  },

  "Witch Doctor": {
    gameplay_version: "7.31b",
    creator: ContentCreator.YoonA,
    damage_type: DamageType.neutral,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.SUPPORT],
        steam_guide_id: 1640804830,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699957031",
        steam_guide_role: STEAM_GUIDE_ROLE.SUPPORT,
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
          "special_bonus_unique_witch_doctor_1", // 20
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
            "flask",
            "faerie_fire",
            "enchanted_mango",
            `enchanted_mango`,
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
            "glimmer_cape",
            "aether_lens",
            "aghanims_shard",
            "force_staff",
          ],
          late_game: ["ultimate_scepter", "aeon_disk", "octarine_core"],
          situational: [
            "spirit_vessel",
            `cyclone`,
            "lotus_orb",
            "black_king_bar",
            `travel_boots`,
            "blink",
          ],
          core: [
            "arcane_boots",
            "glimmer_cape",
            "aether_lens",
            "aghanims_shard",
            "ultimate_scepter",
          ],
          neutral: [
            "keen_optic",
            "pogo_stick",
            `trusty_shovel`,
            "philosophers_stone",
            "bullwhip",
            "spider_legs",
            "psychic_headband",
            "spell_prism",
            `heavy_blade`,
            "seer_stone",
            "book_of_shadows",
            `force_field`,
          ],
        },
      },
    ],
    ability_tooltips: {
      witch_doctor_voodoo_restoration:
        "You can take a point in this spell on level 2 already if you have a tough lane. Don`t take more than one.",
    },
    item_tooltips: {
      ward_sentry: "To block or unblock a pull camp.",
      magic_wand:
        "Start with magic stick if you expect high frequency of spells being used on the lane. Replace one tango, faerie fire, and clarity for it.",
      ring_of_basilius: "If your laning partner also uses a lot of mana early.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. Can be disassembled and Energy Booster used for Aether Lens. You should upgrade the leftover boots to Tranquil Boots usually.",
      spirit_vessel:
        "Against heavy healing lineup and to increase the damage of Maledict.",
      glimmer_cape: "A core item that can be used while channeling Death Ward.",
      aether_lens: "A core item that improves cast range.",
      aghanims_shard:
        "A core upgrade that adds another layer of survivability while at the same time inflicting some damage.",
      lotus_orb: "For reflect, dispel and armor.",
      ultimate_scepter:
        "A core damaging item in late game. Allows Death Ward attacks to bounce and pierce evasion. Goes well with Death Ward talents.",
      black_king_bar:
        "To be able to channel Death Ward fully. Goes well with Aghanim`s Scepter.",
      blink: "For extra mobility to get your spells off.",
    },
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
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "wind_lace",
            info: "To keep the distance from the Witch Doctor be able to split away from other units when being casked or run away from Death Ward",
          },
          {
            item: "boots",
            info: "To keep the distance from the Witch Doctor be able to split away from other units when being casked or run away from Death Ward",
          },
          { item: "armor", info: "Buy armor items" },
          {
            item: "infused_raindrop",
            info: "Maledict does more damage as you lose more HP. Raindrops will save you from some magical damage from Maledict ticks",
          },
        ],
        support: [],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [
          { item: "lotus_orb" },
          { item: "medallion_of_courage" },
          { item: "solar_crest" },
        ],
        support: [
          { item: "glimmer_cape" },
          { item: "force_staff" },
          { item: "ghost" },
        ],
        core: [
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
        ],
      },
      late_game: { all: [], support: [{ item: "black_king_bar" }], core: [] },
    },
  },

  "Wraith King": {
    gameplay_version: "7.30e",
    creator: ContentCreator.eidandota,
    damage_type: DamageType.physical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.CARRY],
        steam_guide_id: 1640804840,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699919868",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "skeleton_king_vampiric_aura", // 1
          "skeleton_king_hellfire_blast", // 2
          "skeleton_king_vampiric_aura", // 3
          "skeleton_king_mortal_strike", // 4
          "skeleton_king_vampiric_aura", // 5
          "skeleton_king_reincarnation", // 6
          "skeleton_king_vampiric_aura", // 7
          "skeleton_king_mortal_strike", // 8
          "skeleton_king_mortal_strike", // 9
          "skeleton_king_mortal_strike", // 10
          "special_bonus_attack_speed_15", // 11
          "skeleton_king_reincarnation", // 12
          "skeleton_king_hellfire_blast", // 13
          "skeleton_king_hellfire_blast", // 14
          "skeleton_king_hellfire_blast", // 15
          "special_bonus_unique_wraith_king_11", // 16
          "special_bonus_attributes", // 17
          "skeleton_king_reincarnation", // 18
          "special_bonus_attributes", // 19
          "special_bonus_cleave_25", // 20
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
            "gauntlets",
            "faerie_fire",
            "magic_stick",
          ],
          early_game: [
            "helm_of_iron_will",
            "phase_boots",
            "armlet",
            "magic_wand",
            "soul_ring",
          ],
          mid_game: [
            "desolator",
            "blink",
            "black_king_bar",
            "basher",
            "radiance",
          ],
          late_game: [
            "assault",
            "swift_blink",
            "overwhelming_blink",
            "abyssal_blade",
            "bloodthorn",
          ],
          situational: [
            "silver_edge",
            "aghanims_shard",
            "monkey_king_bar",
            "nullifier",
          ],
          core: [
            "phase_boots",
            "armlet",
            "desolator",
            "blink",
            "black_king_bar",
            "assault",
          ],
          neutral: [
            "broom_handle",
            "chipped_vest",
            "quicksilver_amulet",
            "misericorde",
            "elven_tunic",
            "mind_breaker",
            "the_leveller",
            "penta_edged_sword",
            "desolator_2",
            "pirate_hat",
          ],
        },
      },
    ],
    ability_tooltips: {
      skeleton_king_hellfire_blast:
        "You can skill this spell on level 1 but I recommend to skill Vampiric Spirit, build up 2 skeleton charges on first and second wave, and at level 2 release them with follow up Wraithfire Blast stun.",
      skeleton_king_reincarnation:
        "You should save a spell point at level 6 and invest it in Reincarnation if you are being ganked and if you can escape with second life. Otherwise, if you end up jungling, you can invest spell point in Mortal Strike or Vampiric Spirit.",
    },
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      phase_boots:
        "A core boots upgrade that fixes movement speed and armor issues that Wraith King has.",
      armlet:
        "A core item that provides you with useful stats. The hp loss is offset by Vampiric Spirit. On a tough lane, get Helm of the Iron Will first even before boots.",
      desolator:
        "A core damaging item that provides burst, tower damage and Roshan killing potential.",
      silver_edge: "For burst, to reposition and break effect.",
      blink: "A core item for instant jump on desired target.",
      black_king_bar:
        "A core item that allows you to deliver the damage while in the middle of the fight.",
      assault:
        "A core item that provides much needed attack speed and armor. Armor reduction goes up to -11 combined with Desolator.",
      swift_blink:
        "For single-target burst. Great when you need to sell or backpack boots in late game.",
      overwhelming_blink: "For AoE damage and tankiness.",
      aghanims_shard: "If opponents have mana burn.",
      monkey_king_bar: "Against evasion and miss chance.",
      nullifier:
        "To dispel defensive spells and items that prevent you from right-clicking the opponent.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          { item: "blight_stone" },
          {
            item: "wind_lace",
            info: "To keep the distance from the Wraith King",
          },
          { item: "boots", info: "To keep the distance from the Wraith King" },
          { item: "armor", info: "Buy armor items" },
          {
            item: "urn_of_shadows",
            info: "For Spirit Vessel against this high HP hero and Vampiric Aura",
          },
        ],
        support: [{ item: "ward_sentry", info: "To block camps" }],
        core: [
          { item: "orb_of_corrosion", info: "If you are playing a melee core" },
        ],
      },
      mid_game: {
        all: [{ item: "medallion_of_courage" }, { item: "solar_crest" }],
        support: [
          { item: "ward_dispenser", info: "Use wards to block camps" },
          { item: "glimmer_cape" },
          { item: "ghost" },
          { item: "force_staff" },
        ],
        core: [{ item: "hurricane_pike" }, { item: "diffusal_blade" }],
      },
      late_game: {
        all: [{ item: "ethereal_blade" }, { item: "aeon_disk" }],
        support: [],
        core: [
          { item: "abyssal_blade" },
          { item: "assault" },
          { item: "skadi", info: "To reduce healing" },
          { item: "shivas_guard", info: "To reduce healing" },
          { item: "silver_edge" },
          { item: "butterfly" },
          { item: "bloodthorn", info: "To burst this tanky hero" },
        ],
      },
    },
  },

  Zeus: {
    gameplay_version: "7.31b",
    creator: ContentCreator.TNTCNz,
    damage_type: DamageType.magical,
    builds: [
      {
        roles: [DOTA_COACH_GUIDE_ROLE.MID],
        steam_guide_id: 1640804850,
        steam_guide_link:
          "https://steamcommunity.com/sharedfiles/filedetails/?id=2699919737",
        steam_guide_role: STEAM_GUIDE_ROLE.CORE,
        abilities: [
          "zuus_arc_lightning", // 1
          "zuus_static_field", // 2
          "zuus_arc_lightning", // 3
          "zuus_static_field", // 4
          "zuus_arc_lightning", // 5
          "zuus_thundergods_wrath", // 6
          "zuus_arc_lightning", // 7
          "zuus_lightning_bolt", // 8
          "zuus_lightning_bolt", // 9
          "special_bonus_mp_regen_125", // 10
          "zuus_lightning_bolt", // 11
          "zuus_thundergods_wrath", // 12
          "zuus_lightning_bolt", // 13
          "zuus_static_field", // 14
          "zuus_static_field", // 15
          "special_bonus_unique_zeus", // 16
          "special_bonus_attributes", // 17
          "zuus_thundergods_wrath", // 18
          "special_bonus_attributes", // 19
          "special_bonus_unique_zeus_3", // 20
          "special_bonus_attributes", // 21
          "special_bonus_attributes", // 22
          "special_bonus_attributes", // 23
          "special_bonus_attributes", // 24
          "special_bonus_unique_zeus_2", // 25
        ],
        items: {
          starting: [
            "tango",
            "faerie_fire",
            "branches",
            "mantle",
            "ward_observer",
            "magic_stick",
          ],
          early_game: ["bottle", "arcane_boots", "null_talisman", "magic_wand"],
          mid_game: [
            "aether_lens",
            "travel_boots",
            "ultimate_scepter",
            "ghost",
            "cyclone",
            "kaya_and_sange",
          ],
          late_game: [
            "refresher",
            "octarine_core",
            "bloodstone",
            "ethereal_blade",
            "aeon_disk",
          ],
          situational: ["infused_raindrop", "blink"],
          core: [
            "bottle",
            "arcane_boots",
            "aether_lens",
            "travel_boots",
            "ultimate_scepter",
            "aghanims_shard",
            "refresher",
            "octarine_core",
          ],
          neutral: [
            "mysterious_hat",
            "arcane_ring",
            "philosophers_stone",
            "vambrace",
            "psychic_headband",
            "spider_legs",
            "timeless_relic",
            "spell_prism",
            "seer_stone",
            "force_boots",
          ],
        },
      },
    ],
    ability_tooltips: {},
    item_tooltips: {
      magic_stick:
        "Start with it if you expect high frequency of spells being used on the lane.",
      bottle:
        "A core item that helps with sustain and allows you to gank with a stored active rune.",
      infused_raindrop: "Against magical burst.",
      arcane_boots:
        "A core boots upgrade for mana sustain. It can be disassembled and Energy Booster used for Aether Lens. The remaining boots should be upgraded to Boots of Travel.",
      aether_lens: "A core item that improves cast range.",
      travel_boots:
        "A core boots upgrade that allows you to cover the map better and get in position to cast spells faster.",
      ultimate_scepter:
        "A core upgrade that adds another global spell to your arsenal. It is especially good for canceling teleports and channeling spells but also for scouting and waveclearing.",
      aghanims_shard:
        "A core upgrade that adds another layer of survivability mixed with some damage and control.",
      refresher:
        "A core item that allows you to cast two rounds of spells and items quickly.",
      octarine_core:
        "A core item that reduces cooldown of spells and items. The more spells you cast the more Static Field procs.",
      blink: "For extra mobility.",
    },
    combo: [],
    counter_items: {
      laning_phase: {
        all: [
          {
            item: "magic_wand",
            info: "Zeus will use Arc Lightning frequently to secure creep lasthits and to harass you",
          },
          { item: "blight_stone" },
          {
            item: "ring_of_regen",
            info: "One or two, for sustain on the lane",
          },
          {
            item: "headdress",
            info: "For sustain on the lane and for Pipe of Insight later on",
          },
          { item: "infused_raindrop" },
          {
            item: "cloak",
            info: "Zeus is heavy on magical damage and Cloak will reduce it by 15%",
          },
        ],
        support: [
          {
            item: "tranquil_boots",
            info: "Tranquil Boots don`t inactivate from spells so you can keep regenerating while being hit by Zeus spells",
          },
          {
            item: "smoke_of_deceit",
            info: "To dodge damage from Thundergod`s Wrath",
          },
        ],
        core: [{ item: "ring_of_health" }],
      },
      mid_game: {
        all: [
          { item: "lotus_orb" },
          { item: "blink", info: "To close the gap to Zeus" },
        ],
        support: [{ item: "glimmer_cape" }, { item: "force_staff" }],
        core: [
          { item: "mage_slayer" },
          { item: "hood_of_defiance" },
          { item: "pipe" },
          { item: "eternal_shroud" },
          { item: "black_king_bar" },
          { item: "orchid" },
          { item: "mage_slayer" },
        ],
      },
      late_game: {
        all: [{ item: "sheepstick" }, { item: "sphere" }],
        support: [{ item: "black_king_bar" }],
        core: [
          {
            item: "silver_edge",
            info: "To get on top of Zeus, avoid being damaged by Thundergod`s Wrath while invisible and as bonus to break his passive",
          },
        ],
      },
    },
  },
};
