/**
 * dispellableBuffs.ts contains all information about dispellable buffs from hero kills in the game.
 *
 * IMPORTANT: Use the following function to access dispellable buffs: Dota2.hero_abilities.getDispellableBuffs()
 *
 * Unfortunately file can't be replaced with static data from Dota 2 (24.2.2022)
 *
 * Copyright (C) Dota Coach, 2023. All rights reserved.
 */

export const dispellableBuffs: Record<string, string[]> = {
  Abaddon: ["abaddon_aphotic_shield", "abaddon_frostmourne"],
  Alchemist: [],
  "Ancient Apparition": [],
  "Anti-Mage": [],
  "Arc Warden": [],
  Axe: ["axe_culling_blade"],
  Bane: [],
  Batrider: [],
  Beastmaster: [],
  Bloodseeker: ["bloodseeker_bloodrage"],
  "Bounty Hunter": [],
  Brewmaster: [],
  Bristleback: [],
  Broodmother: [],
  "Centaur Warrunner": [],
  "Chaos Knight": [],
  Chen: ["chen_divine_favor"],
  Clinkz: [],
  Clockwerk: [],
  "Crystal Maiden": [],
  "Dark Seer": ["dark_seer_ion_shell", "dark_seer_surge"],
  "Dark Willow": [],
  Dawnbreaker: ["dawnbreaker_luminosity"],
  Dazzle: [],
  "Death Prophet": [],
  Disruptor: [],
  Doom: [],
  "Dragon Knight": [],
  "Drow Ranger": [],
  "Earth Spirit": [],
  Earthshaker: ["earthshaker_enchant_totem"],
  "Elder Titan": [],
  "Ember Spirit": ["ember_spirit_flame_guard"],
  Enchantress: [],
  Enigma: [],
  "Faceless Void": [],
  Grimstroke: ["grimstroke_spirit_walk"],
  Gyrocopter: ["gyrocopter_rocket_barrage"],
  Hoodwink: [],
  Huskar: [],
  Invoker: ["invoker_alacrity"],
  Jakiro: [],
  Io: [],
  Juggernaut: [],
  "Keeper of the Light": ["keeper_of_the_light_chakra_magic"],
  Kunkka: [],
  "Legion Commander": ["legion_commander_overwhelming_odds", "legion_commander_press_the_attack"],
  Leshrac: [],
  Lich: ["lich_frost_shield"],
  Lifestealer: [],
  Lina: [],
  Lion: [],
  "Lone Druid": [
    /* "lone_druid_true_form_battle_cry" no longer available */
  ],
  Luna: [],
  Lycan: ["lycan_howl"],
  Magnus: ["magnataur_empower"],
  Marci: ["marci_companion_run" /* rebound */, "marci_guardian" /* Sidekick */],
  Mars: [],
  Medusa: [],
  Meepo: [],
  Mirana: ["mirana_leap"],
  "Monkey King": ["monkey_king_jingu_mastery", "monkey_king_mischief"],
  Morphling: [],
  "Naga Siren": [],
  "Nature's Prophet": [],
  Necrophos: ["necrolyte_sadist"],
  "Night Stalker": [],
  "Nyx Assassin": [],
  "Ogre Magi": ["ogre_magi_bloodlust"],
  Omniknight: ["omniknight_guardian_angel", "omniknight_hammer_of_purity"],
  Oracle: ["oracle_purifying_flames"],
  "Outworld Destroyer": ["obsidian_destroyer_equilibrium"],
  "Primal Beast": ["primal_beast_onslaught", "primal_beast_trample" /* Strong dispel only */],
  Pangolier: ["pangolier_shield_crash"],
  "Phantom Assassin": ["phantom_assassin_phantom_strike"],
  "Phantom Lancer": ["phantom_lancer_phantom_edge"],
  Phoenix: [],
  Puck: [],
  Pudge: [],
  Pugna: ["pugna_decrepify"],
  "Queen of Pain": [],
  Razor: [],
  Riki: [],
  Rubick: [],
  "Sand King": [],
  "Shadow Demon": [],
  "Shadow Fiend": [],
  "Shadow Shaman": [],
  Silencer: [],
  "Skywrath Mage": [],
  Slardar: ["slardar_sprint"],
  Slark: [],
  Snapfire: [],
  Sniper: [],
  Spectre: [],
  "Spirit Breaker": ["spirit_breaker_bulldoze", "spirit_breaker_greater_bash"],
  "Storm Spirit": ["storm_spirit_overload"],
  Sven: ["sven_warcry"],
  Techies: [],
  "Templar Assassin": [],
  Terrorblade: [],
  Tidehunter: [],
  Timbersaw: [],
  Tinker: [],
  Tiny: [],
  "Treant Protector": ["treant_living_armor"],
  "Troll Warlord": [],
  Tusk: [],
  Underlord: [],
  Undying: [],
  Ursa: ["ursa_overpower"],
  "Vengeful Spirit": [],
  Venomancer: [],
  Viper: [],
  Visage: ["visage_grave_chill"],
  "Void Spirit": [],
  Warlock: ["warlock_shadow_word"],
  Weaver: [],
  Windranger: ["windrunner_windrun"],
  "Winter Wyvern": [],
  "Witch Doctor": [],
  "Wraith King": [],
  Zeus: [],
};
