/**
 *
 *
 * Note: Automatic production of this file based on static data provided by Dota 2 is not possible. Sample issue:  Anti-Mage's mana break ability has a silence_duration in the file, but not in the game.
 *
 * Copyright (C) Dota Coach, 2023. All rights reserved.
 */

// Root and Silence are the disables that make the difference between interrupting teleport and channeling skills
// https://dota2.gamepedia.com/Disable	There is no need to differentiate between disables that precisely I believe. If there is a need for it, let me know.
// Some spells are AbilityAffects.HERO and "area"(Telekinesis, Winter's Curse, Unstable Concoction...). These spells are classified as area
//	Silence won't interrupt channeling items like TP, Storm Hammer, etc.

// Idea: Show aghanim's scepter if it can stun with it, e.g. sniper

/*export const teleport_interrupt =			["stun", "cyclone", "hex", "sleep", "mute", "fear", "taunt", "stop", "hide", "leash", "root"]
export const channeling_skills_interrupt =	["stun", "cyclone", "hex", "sleep", "mute", "fear", "taunt", "stop", "hide", "leash", "silence"]*/

export const channeling_interrupts = [
  "stun",
  "cyclone",
  "hex",
  "sleep",
  "mute",
  "fear",
  "taunt",
  "stop",
  "hide",
  "leash",
];
export const silence = ["silence"];
export const root = ["root"];

// Additional value:
//  - "slow_move"
//  - "slow_attack"

export interface IDisables {
  [key: string]: IDisable[]; // Localized Hero name
}

export enum AbilityAffects {
  AREA = "AREA", // Area effect
  HERO_AREA = "HERO_AREA", // Targets hero and effect area
  HERO = "HERO", // Effects only targeted hero (Note: Muerta can also taget trees)
}

export interface IDisable {
  skill: string;
  affects: AbilityAffects;
  disables: string[];
}

export const disables: IDisables = {
  Abaddon: [
    {
      skill: "abaddon_frostmourne",
      affects: AbilityAffects.HERO,
      disables: ["slow_move", "silence"],
    },
  ],
  Alchemist: [
    {
      skill: "alchemist_unstable_concoction",
      affects: AbilityAffects.HERO_AREA,
      disables: ["stun"],
    },
    // Unstable Concoction is cast on a hero but stuns and damages nearby heroes as well.
  ],
  "Ancient Apparition": [
    {
      skill: "ancient_apparition_cold_feet",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // Level 25 talent makes Cold Feet be AoE and is cast in "area".
    // The Aghanim's Shard on Ancient Apparition gives an Area stun on Ice Blast.
  ],
  "Anti-Mage": [
    {
      skill: "antimage_mana_void",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // The damage of Mana Void affects "area" but only ministuns the AbilityAffects.HERO cast on.
  ],
  "Arc Warden": [],
  Axe: [
    {
      skill: "axe_berserkers_call",
      affects: AbilityAffects.AREA,
      disables: ["taunt"],
    },
    // Berserker's Call would be considered as a taunt by dota2.gamepedia.com.
  ],
  Bane: [
    {
      skill: "bane_nightmare",
      affects: AbilityAffects.HERO,
      disables: ["sleep"],
    },
    {
      skill: "bane_fiends_grip",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
  ],
  Batrider: [
    {
      skill: "batrider_flaming_lasso",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // Flaming Lasso affects AbilityAffects.HERO and acts as a stun (shackle by dota2.gamepedia.com). With Aghanim's Scepter uppgrade it also affects the closest ally of the target within the range of 550.
  ],
  Beastmaster: [
    {
      skill: "beastmaster_primal_roar",
      affects: AbilityAffects.HERO_AREA,
      disables: ["stun"],
    },
    // Primal roar is cast on hero but stuns (forced movement by dota2.gamepedia.com) and damages nearby heroes as well.
    // The Hawks also provide a Hero Root on units within 500 range.
  ],
  Bloodseeker: [
    {
      skill: "bloodseeker_blood_bath",
      affects: AbilityAffects.AREA,
      disables: ["silence"],
    },
    // Blood Rite silences and thus stops the channeling spells but not teleports.
  ],
  "Bounty Hunter": [
    {
      skill: `bounty_hunter_wind_walk`,
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // With Aghanims Shard, any hero made invisible by Bounty Hunter also gets a Hero Stun with their first auto attack.
  ],
  Brewmaster: [
    {
      skill: "brewmaster_earth_hurl_boulder",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    {
      skill: "brewmaster_storm_cyclone",
      affects: AbilityAffects.AREA,
      disables: ["cyclone"],
    },
    // The Level 25 talent gives a Fear effect on Cinder Brew.
  ],
  Bristleback: [],
  Broodmother: [],
  "Centaur Warrunner": [
    {
      skill: "centaur_hoof_stomp",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
  ],
  "Chaos Knight": [
    {
      skill: "chaos_knight_chaos_bolt",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
  ],
  Chen: [
    // Neutral creeps can stun(Centaur Conqueror, Mud Golem, Shard Golem) or root(Dark Troll Summoner).
  ],
  Clinkz: [],
  Clockwerk: [
    {
      skill: "rattletrap_battery_assault",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    {
      skill: "rattletrap_hookshot",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    {
      skill: "rattletrap_power_cogs",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // Power Cogs also stun in close area around them.
  ],
  "Crystal Maiden": [
    {
      skill: "crystal_maiden_frostbite",
      affects: AbilityAffects.HERO,
      disables: ["root"],
    },
    // Aghanim's Scepter allows Freezing Field to apply Frostbite.
    // The Aghanims Shard on Crystal Maiden gives her another Area Root with Crystal Clone.
  ],
  "Dark Seer": [
    // Vacuum acts as area stun(forced movement by dota2.gamepedia.com).
    // The Aghanims Scepter gives a Hero stun with the Normal Punch ability.
  ],
  "Dark Willow": [
    {
      skill: "dark_willow_bramble_maze",
      affects: AbilityAffects.AREA,
      disables: ["root"],
    },
    {
      skill: "dark_willow_cursed_crown",
      affects: AbilityAffects.HERO_AREA,
      disables: [`stun`],
    },
    {
      skill: "dark_willow_terrorize",
      affects: AbilityAffects.AREA,
      disables: ["fear"],
    },
    // Bramble Maze affects area. One hero is affected per bramble though.
    // Cursed Crown is cast on hero but also stuns nearby enemy units.
    // Terrorize is an area "fear" effect.
  ],
  Dawnbreaker: [
    {
      skill: "dawnbreaker_fire_wreath",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    {
      skill: "dawnbreaker_solar_guardian",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
  ],
  Dazzle: [
    // Dazzle Aghanim's Shard gives him a Hero targeted Hex on Poison Touch.
  ],
  "Death Prophet": [
    {
      skill: "death_prophet_silence",
      affects: AbilityAffects.AREA,
      disables: ["silence"],
    },
  ],
  Disruptor: [
    {
      skill: "disruptor_static_storm",
      affects: AbilityAffects.AREA,
      disables: ["silence", "mute"],
    },
    {
      skill: "disruptor_glimpse",
      affects: AbilityAffects.HERO,
      disables: ["stop"],
    },
    // Static Storm applies mute with Aghanim's upgrade.
    // Glimpse affects AbilityAffects.HERO and stops teleports and channeled spells or items. Not sure how to classify it, perhaps as cyclone?
  ],
  Doom: [
    {
      skill: "doom_bringer_infernal_blade",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    {
      skill: "doom_bringer_doom",
      affects: AbilityAffects.HERO,
      disables: [`silence`],
    },
    // The level 25 talent also gives Doom a Hero Mute effect on his ultimate.
    // Devoured neutral creeps can stun (Centaur Conqueror, Mud Golem, Shard Golem) or root(Dark Troll Summoner).
  ],
  "Dragon Knight": [
    {
      skill: "dragon_knight_dragon_tail",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
  ],
  "Drow Ranger": [
    {
      skill: "drow_ranger_wave_of_silence",
      affects: AbilityAffects.AREA,
      disables: ["silence"],
    },
  ],
  "Earth Spirit": [
    {
      skill: "earth_spirit_rolling_boulder",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // It can only stun one hero even if there are few heroes close to eachother.
    {
      skill: "earth_spirit_geomagnetic_grip",
      affects: AbilityAffects.AREA,
      disables: ["silence"],
    },
    // Geomagnetic Grip's silence can be spread to other heroes with Magnetize.
    // Aghanim's Scepter upgrade add a new spell Enchant Remnant that acts as a hero stun.
  ],
  Earthshaker: [
    {
      skill: "earthshaker_fissure",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    {
      skill: "earthshaker_enchant_totem",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    {
      skill: "earthshaker_echo_slam",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // Enchant Totem and Echo Slam stun nearby heroes because of Aftershock.
  ],
  "Elder Titan": [
    {
      skill: "elder_titan_earth_splitter",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    {
      skill: "elder_titan_echo_stomp",
      affects: AbilityAffects.AREA,
      disables: ["sleep"],
    },
  ],
  "Ember Spirit": [
    {
      skill: "ember_spirit_searing_chains",
      affects: AbilityAffects.AREA,
      disables: ["root"],
    },
  ],
  Enchantress: [
    // Enchanted neutral creeps can stun(Centaur Conqueror, Mud Golem, Shard Golem) or root(Dark Troll Summoner).
    // The Aghanims Scepter on Enchantress gives her a Hero Root with Little Friends.
  ],
  Enigma: [
    {
      skill: "enigma_malefice",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    {
      skill: "enigma_black_hole",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
  ],
  "Faceless Void": [
    {
      skill: "faceless_void_time_lock",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // With Aghanim's Scepter upgrade Time Lock becomes an area effect stun.
    {
      skill: "faceless_void_chronosphere",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
  ],
  Grimstroke: [
    {
      skill: "grimstroke_spirit_walk",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // Phantom's Embrace is a hero silence that can be cast on additional hero through the Soulbind.
    // Ink Swell is an area stun. It is cast on allied unit and it stuns around it upon triggering Ink Swell again.
    // Soulbind is a AbilityAffects.HERO root(leash by dota2.gamepedia.com). It only roots if it latched to another hero. Otherwise it does nothing.
  ],
  Gyrocopter: [
    {
      skill: "gyrocopter_homing_missile",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
  ],
  Hoodwink: [
    {
      skill: "hoodwink_bushwhack",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // Enemy heroes need to be close to a tree or to other heroes
  ],
  Huskar: [
    // Aghanim's Scepter upgrade makes Life Break be a hero stun(taunt by dota2.gamepedia.com).
  ],
  Invoker: [
    {
      skill: "invoker_tornado",
      affects: AbilityAffects.AREA,
      disables: ["cyclone"],
    },
    {
      skill: "invoker_cold_snap",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // Cold Snap is a hero stun.
  ],
  Jakiro: [
    {
      skill: "jakiro_ice_path",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
  ],
  Io: [
    // Io Aghanim's Shard gives it an area stun on Tether.
  ],
  Juggernaut: [],
  "Keeper of the Light": [
    {
      skill: "keeper_of_the_light_will_o_wisp",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // Will-O-Wisp is an area stun.
  ],
  Kunkka: [
    {
      skill: "kunkka_torrent",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    {
      skill: "kunkka_ghostship",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    {
      skill: "kunkka_x_marks_the_spot",
      affects: AbilityAffects.AREA,
      disables: ["stop"],
    },
    // X Marks The Spot is a hero stun? It cancels teleports and channeled spells and items.
    // Aghanim's Scepter adds additional spell Torrent Storm which is an area stun.
  ],
  "Legion Commander": [
    {
      skill: "legion_commander_duel",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // You can just say it stuns as stun incorporates all the other mentioned disables (i.e. silence & mute).
  ],
  Leshrac: [
    {
      skill: "leshrac_split_earth",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
  ],
  Lich: [
    {
      skill: "lich_sinister_gaze",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // Sinister Gaze is a hero stun. With Aghanim's Scepter upgrade it becomes area stun.
  ],
  Lifestealer: [],
  Lina: [
    {
      skill: "lina_light_strike_array",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
  ],
  Lion: [
    {
      skill: "lion_impale",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // It is area although it acts as a targetable spell (can be countered by Linken's Spehere or Lotus Orb).
    // The level 20 talent increases the Stun AoE on Impale.
    {
      skill: "lion_voodoo",
      affects: AbilityAffects.HERO,
      disables: ["hex"],
    },
    // You can just say it hexes as hex incorporates all the other mentioned disables (i.e. silence and mute).
    // Level 25 talent "+250 AoE Hex" makes it an area hex.
  ],
  "Lone Druid": [
    {
      skill: "lone_druid_savage_roar",
      affects: AbilityAffects.AREA,
      disables: ["fear"],
    },
    // I would clasify it as a fear.
    {
      skill: "lone_druid_entangling_claws",
      affects: AbilityAffects.HERO,
      disables: ["root"],
    },
    // It affects single unit that the bear attacks so perhaps AbilityAffects.HERO? It is not targetable.
    // Lone Druid also gains a Hero Root with Entangling Claws when using Spirit Form.
  ],
  Luna: [
    {
      skill: "luna_lucent_beam",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // Level 25 talent "+0.2s Eclipse Lucent Ministun" makes Eclipse be area stun.
  ],
  Lycan: [],
  Magnus: [
    {
      skill: "magnataur_skewer",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // Skewer is an area stun.
    {
      skill: "magnataur_reverse_polarity",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // The Aghanims Scepter gives Magnus another Area stun with Horn Toss.
  ],
  Marci: [
    {
      skill: `marci_companion_run`,
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // The Aghanims Shard gives Marci an Area silence with Unleash.
  ],
  Mars: [
    {
      skill: "mars_spear",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // Spear of Mars is an area stun(forced movement by dota2.gamepedia.com). If there was another hero hit by spear before the hero that was teleporting out or channeling spell/item, the teleport or channeling spell/item won't be canceled.
  ],
  Medusa: [
    {
      skill: "medusa_stone_gaze",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // Aghanim's Scepter upgrade makes Mystic Snake be a hero stun. It also stuns the other heroes it bounces to for even longer.
  ],
  Meepo: [
    {
      skill: "meepo_earthbind",
      affects: AbilityAffects.AREA,
      disables: ["root"],
    },
  ],
  Mirana: [
    {
      skill: "mirana_arrow",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // The level 25 talent on Mirana lets her Stun multiple Heroes with each cast of Sacred Arrow.
  ],
  "Monkey King": [
    {
      skill: "monkey_king_boundless_strike",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
  ],
  Morphling: [
    {
      skill: "morphling_adaptive_strike_str",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // typo skill: "morphling_adaptive_strike_agi" should be strength and not agility.
    // With level 25 talent "+3 Multishot Adaptive Strike" it also affects two other heroes besides the one targeted with it. Maybe "area" then?
  ],
  Muerta: [
    {
      skill: "muerta_dead_shot",
      affects: AbilityAffects.HERO,
      disables: ["slow_move", "fear"],
    },
    {
      skill: "muerta_the_calling",
      affects: AbilityAffects.AREA,
      disables: ["slow_move", "slow_attack", "silence"],
    },
  ],
  "Naga Siren": [
    {
      skill: "naga_siren_song_of_the_siren",
      affects: AbilityAffects.AREA,
      disables: ["sleep"],
    },
    {
      skill: "naga_siren_ensnare",
      affects: AbilityAffects.HERO,
      disables: ["root"],
    },
  ],
  "Nature's Prophet": [],
  // The Level 20 talent on Natures Prophet gives him an Area Leash with Sprout.
  Necrophos: [
    {
      skill: "necrolyte_reapers_scythe",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
  ],
  "Night Stalker": [
    {
      skill: "night_stalker_void",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // Aghanim's Scepter upgrade makes Void an area stun.
    {
      skill: "night_stalker_crippling_fear",
      affects: AbilityAffects.AREA,
      disables: ["silence"],
    },
  ],
  "Nyx Assassin": [
    {
      skill: "nyx_assassin_impale",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    {
      skill: "nyx_assassin_spiked_carapace",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // With Aghanim's Scepter additional spell "Burrow" it also becomes an area stun in addition to previous functionality.
  ],
  "Ogre Magi": [
    {
      skill: "ogre_magi_fireblast",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // Aghanim's Scepter adds additional spell "Unrefined Fireblast" which is also a hero stun.
  ],
  Omniknight: [],
  Oracle: [
    {
      skill: "oracle_fortunes_end",
      affects: AbilityAffects.HERO_AREA,
      disables: ["root"],
    },
    // Fortune's End is cast on a unit but roots and damages nearby units as well.
  ],
  //	"Outworld Devourer": [
  "Outworld Destroyer": [
    {
      skill: "obsidian_destroyer_astral_imprisonment",
      affects: AbilityAffects.HERO,
      disables: ["hide"],
    },
    // Astral Imprisonment is a hero cyclone (hide by https://dota2.gamepedia.com/)? Aghanim's Scepter adds another charge of it.
  ],
  Pangolier: [
    {
      skill: "pangolier_gyroshell",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // Rolling Thunder is an area stun.
  ],
  "Phantom Assassin": [],
  "Phantom Lancer": [],
  Phoenix: [
    {
      skill: "phoenix_supernova",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
  ],
  "Primal Beast": [
    {
      skill: "primal_beast_onslaught",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    {
      skill: "primal_beast_pulverize",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // The Aghanim Shard on Primal Beast gives another Area stun with Rock Throw.
  ],
  Puck: [
    {
      skill: "puck_dream_coil",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    {
      skill: "puck_waning_rift",
      affects: AbilityAffects.AREA,
      disables: ["silence"],
    },
  ],
  Pudge: [
    {
      skill: "pudge_meat_hook",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // It doesn't cancel teleports or channeled spells/items if the hooked hero is spell immune.
    {
      skill: "pudge_dismember",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
  ],
  Pugna: [],
  "Queen of Pain": [
    // Level 25 talent "Scream of Pain 1.2 Fear" is an area fear.
  ],
  Razor: [],
  Riki: [
    {
      skill: "riki_smoke_screen",
      affects: AbilityAffects.AREA,
      disables: ["silence"],
    },
  ],
  Rubick: [
    {
      skill: "rubick_telekinesis",
      affects: AbilityAffects.HERO_AREA,
      disables: ["stun"],
    },
    // It is also an area stun in the fall area of the lifed unit.
  ],
  "Sand King": [
    {
      skill: "sandking_burrowstrike",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // It is area although it acts as a targetable spells (can be countered by Linken's Spehere or Lotus Orb).
    // The Aghanims Scepter on Sand King gives an added Area stun with Sand Storm.
  ],
  "Shadow Demon": [
    {
      skill: "shadow_demon_disruption",
      affects: AbilityAffects.HERO,
      disables: ["hide"],
    },
    // Disruption is a hero cyclone (hide by https://dota2.gamepedia.com/)? Gets two charges of it with level 25 talent.
  ],
  "Shadow Fiend": [
    {
      skill: "nevermore_requiem",
      affects: AbilityAffects.AREA,
      disables: ["fear"],
    },
    // Requiem of Souls is an area fear.
  ],
  "Shadow Shaman": [
    {
      skill: "shadow_shaman_shackles",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    {
      skill: "shadow_shaman_voodoo",
      affects: AbilityAffects.HERO,
      disables: ["hex"],
    },
    // You can just say it hexes as hex incorporates all the other mentioned disables (i.e. mute and slience).
  ],
  Silencer: [
    {
      skill: "silencer_last_word",
      affects: AbilityAffects.HERO,
      disables: ["silence"],
    },
    // Aghanim's Scepter makes it an area silence.
    {
      skill: "silencer_global_silence",
      affects: AbilityAffects.AREA,
      disables: ["silence"],
    },
    // The Aghanims Shard on Silencer gives him another Hero Silence with Glaives of Wisdom. Can silence more than one hero with Glaive bounce talent.
  ],
  "Skywrath Mage": [
    {
      skill: "skywrath_mage_ancient_seal",
      affects: AbilityAffects.HERO,
      disables: ["silence"],
    },
    // Aghanim's Scepter makes Anceint Seal affect another hero in 700 range.
  ],
  Slardar: [
    {
      skill: "slardar_bash",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    {
      skill: "slardar_slithereen_crush",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
  ],
  Slark: [
    {
      skill: "slark_pounce",
      affects: AbilityAffects.HERO,
      disables: ["leash"],
    },
    // Punce is a hero root (leash by https://dota2.gamepedia.com/). It is not targetable and affects only one hero. Aghanim's Scepter adds another charge and increases Pounce range.
  ],
  Snapfire: [
    {
      skill: "snapfire_firesnap_cookie",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // Firesnap Cookie is an area stun.
  ],
  Sniper: [
    {
      skill: `sniper_assassinate`,
      affects: AbilityAffects.HERO,
      disables: [`stun`],
    },
  ],

  Spectre: [],
  "Spirit Breaker": [
    {
      skill: "spirit_breaker_greater_bash",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    {
      skill: "spirit_breaker_charge_of_darkness",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // During Charge of Darkness Greater Bash is an area stun.
    // Nether Strike also stuns but only because it applies Greater Bash.
  ],
  "Storm Spirit": [
    {
      skill: "storm_spirit_electric_vortex",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // Electric Vortex is a hero stun. With Aghanim's Scepter upgrade it becomes an area stun.
  ],
  Sven: [
    {
      skill: "sven_storm_bolt",
      affects: AbilityAffects.HERO_AREA,
      disables: ["stun"],
    },
    // Storm Hammer is cast on a unit but stuns and damages nearby units as well.
  ],
  Techies: [
    {
      skill: "techies_suicide",
      affects: AbilityAffects.AREA,
      disables: [`stun`],
    },
    /*{
      skill: "techies_stasis_trap",
      affects: AbilityAffects.AREA,
      disables: ["root"],
    },*/
  ],
  "Templar Assassin": [
    // Level 25 talent "1s Meld Hit Bash" is a hero stun.
  ],
  Terrorblade: [
    // Aghanim's Scepter adds Terror Wave which is an area fear.
  ],
  Tidehunter: [
    {
      skill: "tidehunter_ravage",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // The Aghanims Shard gives Tidehunter another Hero Leash with Dead in the Water.
  ],
  Timbersaw: [],
  Tinker: [
    // Level 25 talent "+0.25s Heat-Seaking Missile Ministun" is a hero stun. It affects multiple heroes (2, or 3 with level 15 talent) and is not targetable.
  ],
  Tiny: [
    {
      skill: "tiny_avalanche",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    {
      skill: "tiny_toss",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
  ],
  "Treant Protector": [
    {
      skill: "treant_overgrowth",
      affects: AbilityAffects.AREA,
      disables: ["root"],
    },
    // The Aghanims Shard on Treant Protector gives him a Hero Root with Natures Guise.
  ],
  "Troll Warlord": [
    {
      skill: "troll_warlord_berserkers_rage",
      affects: AbilityAffects.HERO,
      disables: ["root"],
    },
  ],
  Tusk: [
    {
      skill: "tusk_snowball",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // You can just say it stuns as stun incorporates mute by default.
    {
      skill: "tusk_walrus_punch",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // Aghanim's Scepter adds Walrus Kick which is a hero stun.
  ],
  Underlord: [
    {
      skill: "abyssal_underlord_pit_of_malice",
      affects: AbilityAffects.AREA,
      disables: ["root"],
    },
  ],
  Undying: [],
  Ursa: [],
  "Vengeful Spirit": [
    {
      skill: "vengefulspirit_magic_missile",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    {
      skill: "vengefulspirit_nether_swap",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // The Aghanims Shard on Vengeful Spirit lets her Stun two Heroes with every Magic Missile cast.
  ],
  Venomancer: [
    //The Aghanim Shard on Venomancer provides a Hero stun with Latent Toxicity if it is dispelled.
  ],
  Viper: [],
  Visage: [
    {
      skill: "visage_summon_familiars",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // The Aghanim's Shard on Visage gives him another Area stun with self Stone Form.
  ],
  "Void Spirit": [
    {
      skill: "void_spirit_aether_remnant",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // Aether Remnant is a hero stun. It has an area of effect but only stuns one hero.
    // Aghanim's Scepter upgrades Resonant Pulse to area silence. It gives two charges of it as well.
    // Level 25 talent "Dissimilate Roots for 2s" makes Dissimilate an area root.
  ],
  Warlock: [
    {
      skill: "warlock_rain_of_chaos",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // Chaotic Offering is an area stun.
    // Level 20 talent "Summons a Golem on Death" is also an area stun.
  ],
  Weaver: [],
  Windranger: [
    {
      skill: "windrunner_shackleshot",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // It can be seen as a hero stun and area stun.
  ],
  "Winter Wyvern": [
    {
      skill: "winter_wyvern_cold_embrace",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    {
      skill: "winter_wyvern_winters_curse",
      affects: AbilityAffects.HERO_AREA,
      disables: ["stun"],
    },
    // Winter's Curse is also an area stun as it affects the ones attacking the cursed unit.
    // Level 25 talent "Splinter Blast 1.5s Stun" makes Splinter Blast be an area stun.
  ],
  "Witch Doctor": [
    {
      skill: "witch_doctor_paralyzing_cask",
      affects: AbilityAffects.HERO_AREA,
      disables: ["stun"],
    },
    // Can also be seen as an area stun.
  ],
  "Wraith King": [
    {
      skill: "skeleton_king_hellfire_blast",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    // Level 25 talent "Reincarnation Casts Wraithfire Blast" is an area stun.
  ],
  Zeus: [
    {
      skill: "zuus_lightning_bolt",
      affects: AbilityAffects.HERO,
      disables: ["stun"],
    },
    {
      skill: "zuus_cloud",
      affects: AbilityAffects.AREA,
      disables: ["stun"],
    },
    // It is an area stun but only affects one hero at the time.
  ],
};