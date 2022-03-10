/*

   This document contains all the messages played by Dota Coach.

  Questions and comments:
    // DayTime
    Is it worth adding it for 0min switch to daytime? -> Recent patch might make it worth it
    I displayed laning tips at -60, -50, -40, -30, 30.
    Tips that are revolving around hero's ulty are being displayed at 8*60.
    Past the laning stage tips at 10*60+10.
    Major item suggestion at 12*60. Usually heroes have the prefered item that they want to buy so this suggestion is effectively for their second major item.
    Checking if enemy heroes is doing Roshan at 15*60+10.
    Should I write heroes name before spells as newer players might not know which hero has that spell? It extends the message.-- Think about this one --


  Antisummons items: Crimson Guard, armor items.
  Antiillusion items: Battle Fury, Radiance, Maelstrom, Mjollnir, Gleipnir, Shiva's Guard.
  Antimagicdamage items: Cloak, Glimmer Cape, Hood of Defiance, Pipe of Insigh, Eternal Shroud, Mage Slayer, Black King Bar.
  Antitargetable spells: Linken's Sphere, Lotus Orb, status resistance items.
  Antihealing items: Spirit Vessel, Eye of Skadi, Shiva's Guard.
  Antievasion items: Javelin, Monkey King Bar, Bloodthorn, Maelstrom, Mjollnir, Witch Blade.
  Dispel items: Eul's Scepter of Divinity, Lotus Orb, Black King Bar, Satanic, Aeon Disk, Wind Waker.
  Gap closing items: Blink, Shadow Blade, Force Staff, blink upgrades.
  Armor reducing items: Blight Stone, Orb of Corrosion, Medallion of Courage, Solar Crest, Desolator, Assault Cuirass.

  ***CHANGED 7.30*** labels changed in 7.30f
  
  (C) Dota Coch, 2022

*/
import { DOTA_COACH_GUIDE_ROLE } from "../../submodules/dota2/playerRoles";

/**
 *
 * @param hero Hero name, e.g. "Anti-Mage"
 * @returns Array of message objects
 */
export function getOwnHeroMessages(hero: string): any[] {
  if (hero == "Outworld Devourer") hero = "Outworld Destroyer";
  return dotaCoachMessages.filter(
    (message) => message.hero == hero && message.category == "OwnHero"
  );
}

export function getOwnHeroMessagesForRoles(
  hero: string,
  roles: DOTA_COACH_GUIDE_ROLE[]
): any[] {
  if (hero == "Outworld Devourer") hero = "Outworld Destroyer";

  return dotaCoachMessages.filter((message) => {
    if (message.hero != hero) return false;
    if (message.category != "OwnHero") return false;

    function isRelevant(audience: string, role: DOTA_COACH_GUIDE_ROLE) {
      switch (audience) {
        case Audience.ALL:
          return true;
        case Audience.IN_LANE:
          return true; // This case should not exist
        case Audience.ROLE_CORE:
          return (
            role == DOTA_COACH_GUIDE_ROLE.CARRY ||
            role == DOTA_COACH_GUIDE_ROLE.MID ||
            role == DOTA_COACH_GUIDE_ROLE.OFFLANE
          );
        case Audience.ROLE_MID:
          return role == DOTA_COACH_GUIDE_ROLE.MID;
        case Audience.ROLE_CARRY:
          return role == DOTA_COACH_GUIDE_ROLE.CARRY;
        case Audience.ROLE_OFFLANE:
          return role == DOTA_COACH_GUIDE_ROLE.OFFLANE;
        case Audience.ROLE_SUPPORT:
        case Audience.ROLE_SUPPORT_SOFT:
        case Audience.ROLE_SUPPORT_HARD:
          return role == DOTA_COACH_GUIDE_ROLE.SUPPORT;
      }
    }

    let answer = false;
    for (const audience of message.audience) {
      for (const role of roles) {
        if (isRelevant(audience, role)) answer = true;
      }
    }
    //(message.hero==hero && message.category=='OwnHero')
    return answer;
  });
}

/**
 *
 * @param hero Hero name, e.g. "Anti-Mage"
 * @returns Array of message objects
 */
export function getEnemyHeroMessages(hero): any[] {
  if (hero == "Outworld Devourer") hero = "Outworld Destroyer";

  return dotaCoachMessages.filter(
    (message) => message.hero == hero && message.category == "EnemyHero"
  );
}

export enum Audience {
  ALL = "All", // All players get the message
  IN_LANE = "InLane", // Players playing against hero in the lane get messages
  ROLE_CORE = "Core", // For mid, carry and offlane
  ROLE_MID = "Mid",
  ROLE_CARRY = "Carry",
  ROLE_OFFLANE = "Offlane",
  ROLE_SUPPORT = "Support", // For soft and hard support
  ROLE_SUPPORT_SOFT = "SoftSupport",
  ROLE_SUPPORT_HARD = "HardSupport",
}
/*export const ALL = 'All';                       // All players get the message
export const IN_LANE = 'InLane';                // Players playing against hero in the lane get messages
export const ROLE_CORE = 'Core';                // For mid, carry and offlane
export const ROLE_MID = 'Mid';
export const ROLE_CARRY = 'Carry';
export const ROLE_OFFLANE = 'Offlane';
export const ROLE_SUPPORT = 'Support';          // For soft and hard support
export const ROLE_SUPPORT_SOFT = 'SoftSupport';
export const ROLE_SUPPORT_HARD = 'HardSupport';*/

export interface DotaCoachMessage {
  //  Category of the message. This field allows the app to turn on/off certain messages based on the user's preference
  category:
    | "BountyRunes"
    | "WaterRunes"
    | "PowerRunes"
    | "NeutralItems"
    | "SmokeOfDeceit"
    | "AghanimsShard"
    | "TomeOfKnowledge"
    | "SiegeCreeps"
    | "DayTime"
    | "EnemyHero"
    | "OwnHero";
  // Localized hero name, only needed for categories 'EnemyHero' and 'OwnHero'
  hero?: string; // Localized name
  // Folder and name of audio file (the app adds '.mp3' to the file name)
  audioFile: string;
  // Time when message is played in seconds (time is based on game time) ; -90 means that the message is played at hero selection
  messageTime?: number;
  // Time interval to repeat the message (this fields is only be used in combination with 'messageTime')
  repeatTime?: number;
  // Array of times when message is played
  messageTimes?: number[];
  // Message spoken by narrator and displayed in the game
  textMessage: string;
  // Optional parameter to specify chat messages (relevant when text message is too long). Max lenght is 109 characters.
  chatMessage?: string;
  // two possible values: 'All' and 'Lane' (All: ; Lane: )
  audience: Audience[];
  // Image to be displayed on web-page. Only works for messages that are short enough to allow for an image to be displayed
  image?: {
    type: "item" | "ability" | "rune";
    // name for item:    Short name, e.g. 'blink' (as provided by dota2Items.json, but without 'item_' prefex)
    // name for ability: Name as provided in dota2Heroes.json, e.g. 'alchemist_unstable_concoction_throw'
    // name for rune:    arcane, bounty, double_damage, haste, illusion, invisibility or regeneration
    name: string;
  };
}

export const dotaCoachMessages: DotaCoachMessage[] = [
  // BountyRunes
  {
    category: "BountyRunes",
    audioFile: "general/BountyRunes",
    messageTime: 3 * 60 - 30,
    repeatTime: 3 * 60,
    textMessage: "Bounty runes will appear soon",
    audience: [Audience.ALL],
  },

  // WaterRunes
  {
    category: "WaterRunes",
    audioFile: "general/WaterRunes",
    messageTimes: [2 * 60 - 15, 4 * 60 - 15],
    textMessage: "Water runes will appear soon",
    audience: [Audience.ALL],
  },

  // PowerRunes
  {
    category: "PowerRunes",
    audioFile: "general/PowerRune",
    messageTime: 6 * 60 - 15,
    repeatTime: 2 * 60,
    textMessage: "Power rune will appear soon",
    audience: [Audience.ALL],
  },

  // NeutralItems
  {
    category: "NeutralItems",
    audioFile: "general/NeutralItemsTier1",
    messageTime: 7 * 60 - 2,
    textMessage: "Neutral items tier 1 are available now",
    audience: [Audience.ALL],
  },
  {
    category: "NeutralItems",
    audioFile: "general/NeutralItemsTier2",
    messageTime: 17 * 60 - 2,
    textMessage: "Neutral items tier 2 are available now",
    audience: [Audience.ALL],
  },
  {
    category: "NeutralItems",
    audioFile: "general/NeutralItemsTier3",
    messageTime: 27 * 60 - 2,
    textMessage: "Neutral items tier 3 are available now",
    audience: [Audience.ALL],
  },
  {
    category: "NeutralItems",
    audioFile: "general/NeutralItemsTier4",
    messageTime: 37 * 60 - 2,
    textMessage: "Neutral items tier 4 are available now",
    audience: [Audience.ALL],
  },
  {
    category: "NeutralItems",
    audioFile: "general/NeutralItemsTier5",
    messageTime: 60 * 60 - 2,
    textMessage: "Neutral items tier 5 are available now",
    audience: [Audience.ALL],
  },

  // Smoke of Deceit
  {
    category: "SmokeOfDeceit",
    audioFile: "general/SmokeOfDeceit1",
    messageTime: 5 * 60 + 30 - 1,
    textMessage: "Smoke of deceit is available in the shop",
    audience: [Audience.ALL],
  },
  {
    category: "SmokeOfDeceit",
    audioFile: "general/SmokeOfDeceit2",
    messageTimes: [15 * 60 + 10, 30 * 60 + 10, 45 * 60 + 10, 60 * 60 + 10],
    textMessage: "Check if smoke of deceit is available in the shop",
    audience: [Audience.ALL],
  },

  // Tome of Knowledge
  {
    category: "TomeOfKnowledge",
    audioFile: "general/TomeOfKnowledge",
    messageTime: 10 * 60 - 2,
    repeatTime: 10 * 60,
    textMessage: "Tome of knowledge is available in the shop",
    audience: [Audience.ALL],
  },

  // Aghanim's Shard
  {
    category: "AghanimsShard",
    audioFile: "general/AghanimsShard",
    messageTime: 15 * 60 - 2,
    textMessage: "Aghanim's Shard is available in the shop",
    audience: [Audience.ALL],
  },

  // Siege Creeps
  {
    category: "SiegeCreeps",
    audioFile: "general/SiegeCreeps",
    messageTime: 5 * 60,
    repeatTime: 5 * 60,
    textMessage: "Siege creeps just spawned",
    audience: [Audience.ALL],
  },

  // DayTime
  {
    category: "DayTime",
    audioFile: "general/DayTime",
    messageTime: 10 * 60 - 10,
    repeatTime: 10 * 60,
    textMessage: "It will be day soon",
    audience: [Audience.ALL],
  },
  {
    category: "DayTime",
    audioFile: "general/NightTime",
    messageTime: 5 * 60 - 10,
    repeatTime: 10 * 60,
    textMessage: "It will be night soon",
    audience: [Audience.ALL],
  },

  // Outposts
  // {category: "Outposts", audioFile: "general/Outposts", messageTime: (20*60-45), repeatTime: (10*60), textMessage: "Outposts will grant experience soon, capture them if you have already taken down a tier 2 tower", audience: [Audience.ALL]}, |patch 7.29| MESSAGES REMOVED

  // 1. Abaddon | 28.02.2021
  {
    category: "OwnHero",
    hero: "Abaddon",
    audioFile: "ownHero/Abaddon_1_AphoticShield",
    messageTime: 10,
    textMessage:
      "Apply Aphotic Shield preemptively on yourself as you are coming to lane after rune fight. Apply another as the previous one explodes to inflict great AoE damage. Pull afterwards.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "abaddon_aphotic_shield" },
  },
  // Alex: Not sure I understand this one. Maybe we can refurmulate
  {
    category: "OwnHero",
    hero: "Abaddon",
    audioFile: "ownHero/Abaddon_2_Support",
    messageTime: 30,
    textMessage:
      "Play ahead of the Core you are supporting to absorb attention.",
    audience: [Audience.ROLE_SUPPORT],
  },
  // ALex: What do you mean by 'absorb attention'?
  {
    category: "OwnHero",
    hero: "Abaddon",
    audioFile: "ownHero/Abaddon_9_Salve",
    messageTime: 45,
    textMessage:
      "Salve or clarity won't be canceled while you have Apothic Shield on.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abaddon_aphotic_shield" },
  },
  {
    category: "OwnHero",
    hero: "Abaddon",
    audioFile: "ownHero/Abaddon_3_BorrowedTime1",
    messageTime: 6 * 60,
    repeatTime: 12 * 60,
    textMessage:
      "If someone applies a break effect on you, you will have to trigger Borrowed Time manually.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abaddon_borrowed_time" },
  },
  {
    category: "OwnHero",
    hero: "Abaddon",
    audioFile: "ownHero/Abaddon_4_Disables",
    messageTime: 8 * 60,
    repeatTime: 8 * 60,
    textMessage:
      "If you got disabled along with your teammate you can pop Borrowed Time to unstun yourself and then apply Aphotic Shield on a stunned ally to free him as well.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abaddon_aphotic_shield" },
  },
  {
    category: "OwnHero",
    hero: "Abaddon",
    audioFile: "ownHero/Abaddon_5_BorrowedTime2",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "You can position more aggressively than rest of your team, as opponents usually don't want to go on you due to Borrowed Time.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "abaddon_borrowed_time" },
  },
  {
    category: "OwnHero",
    hero: "Abaddon",
    audioFile: "ownHero/Abaddon_6_Dispel",
    messageTime: 20 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Constantly look at your teammates to heal or hard dispel them.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Abaddon",
    audioFile: "ownHero/Abaddon_7_Silences",
    messageTimes: [16 * 60, 24 * 60],
    textMessage:
      "Silences and heal reductions are a big problems for Abaddon. Avoid being hit by those or itemize against them.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Abaddon",
    audioFile: "ownHero/Abaddon_8__Scepter",
    messageTime: 22 * 60,
    textMessage:
      "With Aghanim's Scepter, you will need to activate your Ultimate manually, while most of the damage is being inflicted on your teammates.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Abaddon",
    audioFile: "enemyHero/Abaddon_1_Aphotic shield dispel",
    messageTime: -60,
    textMessage:
      "Abaddon's Aphothic Shield applies strong dispel. Use disabling and damage-over-time dispellable spells only after the shield was used.",
    chatMessage:
      "Aphothic Shield applies strong dispel. Use dispellable spells after the shield was used.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abaddon_aphotic_shield" },
  },
  {
    category: "EnemyHero",
    hero: "Abaddon",
    audioFile: "enemyHero/Abaddon_2_Curse of avernus",
    messageTime: -50,
    textMessage:
      "It takes four attacks from Abaddon's Curse of Avernus to silence and slow you significantly.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abaddon_frostmourne" },
  },
  {
    category: "EnemyHero",
    hero: "Abaddon",
    audioFile: "enemyHero/Abaddon_3_Aphotic shield damage",
    messageTime: -40,
    textMessage:
      "If you are in the fog, exploding Aphotic Shield won't damage you.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "abaddon_aphotic_shield" },
  },
  {
    category: "EnemyHero",
    hero: "Abaddon",
    audioFile: "enemyHero/Abaddon_4_Burrowed time",
    messageTime: 8 * 60,
    textMessage:
      "Abaddon's Ulti Burrowed Time applies strong dispel and heals Abaddon for all damage taken. Don't hit him.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abaddon_aphotic_shield" },
  },
  {
    category: "EnemyHero",
    hero: "Abaddon",
    audioFile: "enemyHero/Abaddon_5_Break",
    messageTime: 8 * 60 + 10,
    textMessage:
      "Break effects make Burrowed Time not start automatically. But Abaddon can still activate it manually.",
    audience: [Audience.ALL],
    image: { type: "item", name: "silver_edge" },
  },

  // 2. Alchemist | Earlier work
  {
    category: "OwnHero",
    hero: "Alchemist",
    audioFile: "ownHero/Alchemist_1_BountyRunes",
    messageTime: -30,
    textMessage:
      "Collecting Bounty Runes is very important for Alchemist. Let your team know when the bounty runes are about to spawn.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Alchemist",
    audioFile: "ownHero/Alchemist_2_GreevilsGreed1",
    messageTime: 4 * 60,
    textMessage:
      "Understand when you are no longer able to lane and move to the jungle. Alchemist farms insanely fast and you don't want die and lose Greevil's Greed stacks.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Alchemist",
    audioFile: "ownHero/Alchemist_3_Stacks",
    messageTime: 5 * 60,
    textMessage:
      "Alchemist prefers to farm huge amounts of easy to kill creeps. Avoid farming Ancients until you can kill them reasonably fast. Ask your team to stack smaller camps.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Alchemist",
    audioFile: "ownHero/Alchemist_4_Dispel",
    messageTime: 6 * 60,
    textMessage:
      "Chemical Rage applies dispel on cast, same as Berserker's Potion. You can use them to dispel Spirit Vessel or other dispellable spells and items.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Alchemist",
    audioFile: "ownHero/Alchemist_5_GreevilsGreed2",
    messageTime: 8 * 60,
    textMessage:
      "Whilst farming, show yourself on lanes the least possible and don't waste your Greevil's Greed stacks by hitting buildings for too long.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Alchemist",
    audioFile: "ownHero/Alchemist_6_Items",
    messageTime: 15 * 60,
    textMessage:
      "Blink Dagger or Shadow Blade allow you to cast fully channeled Unstable Concoction more easily.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Alchemist",
    audioFile: "ownHero/Alchemist_7_Scepter",
    messageTime: 20 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "Once you get closer to being 6 slotted, consider giving Aghanim's Scepter upgrades to your teammates. You might do that even earlier, if the Scepter upgrades on your allies have great impact.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Alchemist",
    audioFile: "ownHero/Alchemist_8_MidGame",
    messageTimes: [25 * 60, 35 * 60],
    textMessage:
      "Alchemist tends to fall off as the game goes. Look to close the game by the 40 min mark.",
    audience: [Audience.ROLE_CORE],
  },

  {
    category: "EnemyHero",
    hero: "Alchemist",
    audioFile: "enemyHero/Alchemist_1_Spirit vessel",
    messageTime: -60,
    textMessage:
      "Someone should buy spirit Vessel against Alchemist's HP regen from Chemical Rage",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Alchemist",
    audioFile: "enemyHero/Alchemist_2_Neutral camps",
    messageTime: 2 * 60 + 10,
    textMessage: "Block neutral camps with wards against Alchemist",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Alchemist",
    audioFile: "enemyHero/Alchemist_3_Gank",
    messageTime: 2 * 60 + 40,
    textMessage: "Don't forget to gank Alchemist",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Alchemist",
    audioFile: "enemyHero/Alchemist_4_Bounty runes",
    messageTimes: [-30, 4 * 60 + 30],
    textMessage:
      "Alchemist gets additional gold from bouty runes. Make sure he doesn't get any",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Alchemist",
    audioFile: "enemyHero/Alchemist_5_Jungling",
    messageTime: 5 * 60 + 50,
    textMessage: "Contest Alchemist while he is jungling",
    audience: [Audience.ALL],
  },

  // 3. Ancient Apparition | 28.02.2021
  {
    category: "OwnHero",
    hero: "Ancient Apparition",
    audioFile: "ownHero/Ancient Appartion_1_Right click",
    messageTime: -30,
    textMessage:
      "Make maximal use of Ancient Apparition's long attack range and Chilling Touch to harass on the lane without aggroing lane creeps.",
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "ancient_apparition_chilling_touch" },
  },
  {
    category: "OwnHero",
    hero: "Ancient Apparition",
    audioFile: "ownHero/Ancient Appartion_2_Cold Feet",
    messageTime: -15,
    textMessage:
      "Use Cold Feet when it is likely to stun, for example, after your laning partner applies a disable or slow, or just before the opponent wants to lasthit a creep.",
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "ancient_apparition_cold_feet" },
  },
  {
    category: "OwnHero",
    hero: "Ancient Apparition",
    audioFile: "ownHero/Ancient Appartion_3_Ice Vortex",
    messageTimes: [4 * 60 + 10, 14 * 60 + 10, 24 * 60 + 10],
    textMessage:
      "Ice Vortex can be used to provide vision on top of pillars or in Roshpit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ancient_apparition_ice_vortex" },
  },
  {
    category: "OwnHero",
    hero: "Ancient Apparition",
    audioFile: "ownHero/Ancient Appartion_3_Antihealing",
    messageTime: 8 * 60 + 10,
    repeatTime: 10 * 60,
    textMessage:
      "Prioritize Ice Blasting heroes high on healing and with big health pool.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ancient_apparition_ice_blast" },
  },
  {
    category: "OwnHero",
    hero: "Ancient Apparition",
    audioFile: "ownHero/Ancient Appartion_3_Aghanims Shard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Grab Aghanim's Shard at 15 minute mark as it allows you to clear waves, deal additional damage in the fights and cancel Blink Daggers.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Ancient Apparition",
    audioFile: "enemyHero/Ancient Appartion_1_Cold feet",
    messageTime: -60,
    textMessage:
      "When Ancient Apparition's Cold Feet is used on you, move away 715 distance or you will get stunned.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Ancient Apparition",
    audioFile: "enemyHero/Ancient Appartion_2_Ice blast healing",
    messageTime: 8 * 60,
    textMessage:
      "Ancient's Ice Blast negates all healing. Avoid using healing items when affected by it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Ancient Apparition",
    audioFile: "enemyHero/Ancient Appartion_3_Ice blast resistance",
    messageTime: 8 * 60 + 10,
    textMessage:
      "Ice Blast goes through spell immunity but is offset by magic resistance and magic barrier items.",
    audience: [Audience.ALL],
  },

  // 4. Anti-Mage | Earlier work
  {
    category: "OwnHero",
    hero: "Anti-Mage",
    audioFile: "ownHero/Anti-mage_1_Laning",
    messageTime: 10,
    textMessage: "Rush Ring of Health on tough lanes.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ring_of_health" },
  },
  {
    category: "OwnHero",
    hero: "Anti-Mage",
    audioFile: "ownHero/Anti-mage_2_Burn mana",
    messageTime: 20,
    textMessage:
      "Hit opponents and burn their mana whenever you can, for example when they go for lasthit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "antimage_mana_break" },
  },
  {
    category: "OwnHero",
    hero: "Anti-Mage",
    audioFile: "ownHero/Anti-mage_3_Burn mana",
    messageTimes: [2 * 60, 7 * 60],
    textMessage:
      "Play safe and acquire Battle Fury as early as possible. Your farming speed goes up exponentially with it.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "bfury" },
  },
  {
    category: "OwnHero",
    hero: "Anti-Mage",
    audioFile: "ownHero/Anti-mage_4_Look around",
    messageTimes: [7 * 60 + 45, 13 * 60 + 45],
    textMessage:
      "Look around the map while you are farming to dodge the ganks but also to potentially snipe a kill with Mana Void.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "antimage_mana_void" },
  },
  {
    category: "OwnHero",
    hero: "Anti-Mage",
    audioFile: "ownHero/Anti-mage_5_Plant wards",
    messageTimes: [8 * 60 + 15, 14 * 60 + 15],
    textMessage: "Plant wards for yourself in the area you are farming.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    hero: "Anti-Mage",
    audioFile: "ownHero/Anti-mage_6_Push lane",
    messageTimes: [10 * 60 + 15, 13 * 60 + 45],
    textMessage:
      "Keep a lane pushed out to apply some pressure on the map. If you expect to be gank, Blink into trees and teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "antimage_blink" },
  },
  {
    category: "OwnHero",
    hero: "Anti-Mage",
    audioFile: "ownHero/Anti-mage_7_Manta",
    messageTime: 18 * 60 + 15,
    textMessage:
      "With Manta Style you can play more actively and join most of the fights. Prioritize killing backliners and supports.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "manta" },
  },
  {
    category: "OwnHero",
    hero: "Anti-Mage",
    audioFile: "ownHero/Anti-mage_8_Cut waves",
    messageTime: 18 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Wehenever your teammates die consider cutting a wave behind the opponents or push out some other lane.",
    audience: [Audience.ROLE_CORE],
  },

  {
    category: "EnemyHero",
    hero: "Anti-Mage",
    audioFile: "enemyHero/Anti-mage_1_Laning",
    messageTime: 50,
    textMessage:
      "Anti-Mage is a weak laner, so look to pressure him from the start",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Anti-Mage",
    audioFile: "enemyHero/Anti-mage_2_Use mana",
    messageTime: 1 * 60 + 30,
    textMessage: "Look to spend your mana before it gets burned by Anti-Mage",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "energy_booster" },
  },
  {
    category: "EnemyHero",
    hero: "Anti-Mage",
    audioFile: "enemyHero/Anti-mage_3_Get mana",
    messageTime: 2 * 60 + 0,
    textMessage:
      "Against Anti-Mage during the laning phase buy a Magic Stick or consider buying a Soul Ring to have mana for spells ",
    chatMessage:
      "Against Anti-Mage buy Magic Stick or Soul Ring during the laning phase to have mana for spells",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "magic_stick" },
  },
  {
    category: "EnemyHero",
    hero: "Anti-Mage",
    audioFile: "enemyHero/Anti-mage_4_Jungling",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Look to disrupt Anti-Mange's jungling by placing deep wards and smoking on him. Anti-Mage is weak until he gets Manta Style",
    chatMessage:
      "Disrupt Anti-Mange's jungling by placing deep wards and smoking on him. He is weak until he gets Manta Style",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "EnemyHero",
    hero: "Anti-Mage",
    audioFile: "enemyHero/Anti-mage_5_Boots of travel",
    messageTime: 15 * 60 + 30,
    textMessage:
      "Consider getting Boots of Travel on one of the cores to address Anti-Mange's split push playstyle",
    audience: [Audience.ALL],
    image: { type: "item", name: "travel_boots" },
  },
  {
    category: "EnemyHero",
    hero: "Anti-Mage",
    audioFile: "enemyHero/Anti-mage_6_Team fights",
    messageTimes: [22 * 60 + 30, 32 * 60 + 30, 42 * 60 + 30, 52 * 60 + 30],
    textMessage:
      "In team fights look to save the hero that Anti-Mage jumps on. But be careful as you might blow up too if you get too close to a Mana Voided hero",
    chatMessage:
      "In team fights save hero that Anti-Mage jumps on, but stay away if hero gets Mana Voided",
    audience: [Audience.ALL],
    image: { type: "ability", name: "antimage_mana_void" },
  },
  {
    category: "EnemyHero",
    hero: "Anti-Mage",
    audioFile: "enemyHero/Anti-mage_7_Late game",
    messageTime: 35 * 60 + 30,
    textMessage:
      "Anti-Mage is strong mid- to late-game as he can farm rapidly, but he is not that strong in very late game",
    audience: [Audience.ALL],
  },

  // 5. Arc Warden | 28.02.2021
  {
    category: "OwnHero",
    hero: "Arc Warden",
    audioFile: "ownHero/Arc Warden_1_Lasthit",
    messageTime: -30,
    textMessage:
      "Make use of Spark Wraiths to secure creep lasthits, especially ranged creep.",
    audience: [Audience.IN_LANE, Audience.ROLE_CORE],
    image: { type: "ability", name: "arc_warden_spark_wraith" },
  },
  {
    category: "OwnHero",
    hero: "Arc Warden",
    audioFile: "ownHero/Arc Warden_2_Flux",
    messageTime: -15,
    textMessage:
      "If an opponent splits away from creeps or his ally, you can Flux him and follow up with right-clicks and Spark Wraiths.",
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "arc_warden_flux" },
  },
  {
    category: "OwnHero",
    hero: "Arc Warden",
    audioFile: "ownHero/Arc Warden_3_Scout",
    messageTimes: [6 * 60, 11 * 60, 16 * 60],
    textMessage:
      "Use Spark Wraiths to scout the opponents and protect yourself while farming.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "arc_warden_spark_wraith" },
  },
  {
    category: "OwnHero",
    hero: "Arc Warden",
    audioFile: "ownHero/Arc Warden_4_Feed",
    messageTimes: [8 * 60, 16 * 60, 24 * 60],
    textMessage:
      "Make sure not to feed Tempest Double to opponents as it gives away a lot of gold and experience.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "arc_warden_tempest_double" },
  },
  {
    category: "OwnHero",
    hero: "Arc Warden",
    audioFile: "ownHero/Arc Warden_5_Splitpush",
    messageTimes: [9 * 60, 17 * 60],
    textMessage:
      "Use Tempest Double as frequently as possible to splitpush the sidelanes and damage buildings.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "arc_warden_tempest_double" },
  },
  {
    category: "OwnHero",
    hero: "Arc Warden",
    audioFile: "ownHero/Arc Warden_6_Avoid fighting",
    messageTimes: [10 * 60, 18 * 60],
    textMessage:
      "Avoid being part of the teamfights from the very start until you get first major item that will tank you up.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Arc Warden",
    audioFile: "ownHero/Arc Warden_7_Punish",
    messageTime: 13 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Whenever opponents teleport back on a hero or two to address your splitpush, look to fight the remaining opponents, smoke up or take Roshan.",
    audience: [Audience.ROLE_CORE],
  },

  {
    category: "EnemyHero",
    hero: "Arc Warden",
    audioFile: "enemyHero/Arc Warden_1_Flux",
    messageTime: -60,
    textMessage:
      "Arc Warden's Flux does no damage to you if you are close to another unit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "arc_warden_flux" },
  },
  {
    category: "EnemyHero",
    hero: "Arc Warden",
    audioFile: "enemyHero/Arc Warden_2_Spark wraith",
    messageTime: -50,
    textMessage:
      "Arc Warden's Spark Wraith takes two seconds to charge which gives you time to dodge it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "arc_warden_spark_wraith" },
  },
  {
    category: "EnemyHero",
    hero: "Arc Warden",
    audioFile: "enemyHero/Arc Warden_3_Magnetic field",
    messageTime: -40,
    textMessage:
      "Units inside Arc's Warden's Magnetic Field can be hit if you are inside of it or have evasion piercing items.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "arc_warden_magnetic_field" },
  },
  {
    category: "EnemyHero",
    hero: "Arc Warden",
    audioFile: "enemyHero/Arc Warden_4_Pressure",
    messageTime: 30,
    textMessage: "Arc Warden is a weak laner. Pressure him early on.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Arc Warden",
    audioFile: "enemyHero/Arc Warden_5_Tempest double",
    messageTime: 8 * 60,
    textMessage:
      "Arc Warden's Tempest Double gives a lot of gold and experience. Kill it if possible.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "arc_warden_tempest_double" },
  },
  {
    category: "EnemyHero",
    hero: "Arc Warden",
    audioFile: "enemyHero/Arc Warden_6_Gank",
    messageTime: 8 * 60 + 10,
    textMessage:
      "Arc Warden farms the jungle a lot. Plant deep wards and gank him. Also block off camps with sentries.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_dispenser" },
  },
  {
    category: "EnemyHero",
    hero: "Arc Warden",
    audioFile: "enemyHero/Arc Warden_7_Gap closing",
    messageTime: 12 * 60,
    textMessage: "Buy gap closing items to get on top of Arc Warden.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "EnemyHero",
    hero: "Arc Warden",
    audioFile: "enemyHero/Arc Warden_8_Boots of travel",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Boots of Travel allow to defend against Arc Warden's split-pushing and to quickly rejoin the team.",
    audience: [Audience.ALL],
    image: { type: "item", name: "travel_boots" },
  },

  // 6. Axe | 28.02.2021
  {
    category: "OwnHero",
    hero: "Axe",
    audioFile: "ownHero/Axe_1_Battle hunger",
    messageTime: -30,
    textMessage:
      "Use Battle Hunger off cooldown on opponents' support usually.",
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "axe_battle_hunger" },
  },
  {
    category: "OwnHero",
    hero: "Axe",
    audioFile: "ownHero/Axe_2_Counter helix",
    messageTime: -15,
    textMessage:
      "It is good to fight the opponents while you are surrounded by their creeps as Counter Helix will proc more often.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "axe_counter_helix" },
  },
  {
    category: "OwnHero",
    hero: "Axe",
    audioFile: "ownHero/Axe_3_Creep skipping",
    messageTimes: [5 * 60, 6 * 60 + 30],
    textMessage:
      "If you can't pressure opponents' carry on the lane, consider creepskiping and farming neutrals in their jungle past 5 minute mark.",
    audience: [Audience.IN_LANE, Audience.ROLE_OFFLANE],
  },
  {
    category: "OwnHero",
    hero: "Axe",
    audioFile: "ownHero/Axe_4_Stacks",
    messageTimes: [5 * 60 + 15, 7 * 60 + 15],
    textMessage:
      "Encourage your supports to stack for you as you can clear stacks very quickly and early.",
    audience: [Audience.IN_LANE, Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Axe",
    audioFile: "ownHero/Axe_5_Farm dagger",
    messageTimes: [8 * 60, 10 * 60],
    textMessage:
      "Don't roam around too much. Focus on getting Blink Dagger timely.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Axe",
    audioFile: "ownHero/Axe_6_Run faster",
    messageTime: 9 * 60,
    repeatTime: 10 * 60,
    textMessage: "Use Battle Hunger on creeps to run around faster.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "axe_battle_hunger" },
  },
  {
    category: "OwnHero",
    hero: "Axe",
    audioFile: "ownHero/Axe_7_Blink Dagger",
    messageTime: 10 * 60 + 15,
    textMessage:
      "Once you acquire Blink Dagger, try to make use of it immediately and avoid showing yourself on the map too often.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Axe",
    audioFile: "ownHero/Axe_8_Illusions",
    messageTimes: [11 * 60 + 45, 19 * 60 + 45],
    textMessage:
      "Grab illusion runes and make use of illusions to push out lanes as Counter Helix works on them as well.",
    audience: [Audience.ALL],
    image: { type: "rune", name: "illusion" },
  },
  {
    category: "OwnHero",
    hero: "Axe",
    audioFile: "ownHero/Axe_9_Follow up",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "When initiating, make sure you have allies that deal damage nearby.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Axe",
    audioFile: "enemyHero/Axe_1_Battle hunger",
    messageTime: -60,
    textMessage: "Axe's Battle Hunger can be removed by getting a creep kill.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "axe_battle_hunger" },
  },
  {
    category: "EnemyHero",
    hero: "Axe",
    audioFile: "enemyHero/Axe_2_Counter helix",
    messageTime: -50,
    textMessage:
      "Avoid being close to Axe if you have bunch of allied or neutral creeps next to you.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "axe_counter_helix" },
  },
  {
    category: "EnemyHero",
    hero: "Axe",
    audioFile: "enemyHero/Axe_3_Creep skipping",
    messageTime: 5 * 60,
    textMessage: "Bring an extra hero to gank Axe if he starts creep-skipping.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Axe",
    audioFile: "enemyHero/Axe_4_Blink Blade Mail",
    messageTime: 12 * 60,
    textMessage:
      "Keep checking Axe's items. Be aware of his Blink Dagger and Blade Mail timing.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "EnemyHero",
    hero: "Axe",
    audioFile: "enemyHero/Axe_5_Clump up",
    messageTimes: [12 * 60 + 10, 22 * 60 + 20, 32 * 60 + 20],
    textMessage: "Don't clump up in teamfights or Axe will kill you all!",
    audience: [Audience.ALL],
    image: { type: "ability", name: "axe_berserkers_call" },
  },
  {
    category: "EnemyHero",
    hero: "Axe",
    audioFile: "enemyHero/Axe_6_Euls",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Consider buying an Eul's Scepter to use it on Axe quickly after he jumps your allies.",
    audience: [Audience.ALL],
    image: { type: "item", name: "cyclone" },
  },
  {
    category: "EnemyHero",
    hero: "Axe",
    audioFile: "enemyHero/Axe_7_Lifesteal status resistance",
    messageTime: 12 * 60 + 30,
    textMessage:
      "On Cores, Lifesteal and status resistance items are good against Axe's Call and Blade Mail combo.",
    audience: [Audience.ALL],
  },

  // 7. Bane | 28.02.2021
  {
    category: "OwnHero",
    hero: "Bane",
    audioFile: "ownHero/Bane_1_Night vision",
    messageTimes: [-30, 5 * 60],
    textMessage: "Bane has improved night vision.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Bane",
    audioFile: "ownHero/Bane_2_Trading",
    messageTime: -15,
    textMessage:
      "Bane is great at trading due to great baseline stats and Brain Sap to regain some health.",
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "bane_brain_sap" },
  },
  {
    category: "OwnHero",
    hero: "Bane",
    audioFile: "ownHero/Bane_3_Nightmare setup",
    messageTimes: [1 * 60, 4 * 60],
    textMessage:
      "If an opponent is below 50%, you can Nightmare him and allow your core to come forward and finish the hero along with you.",
    audience: [Audience.IN_LANE, Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "bane_nightmare" },
  },
  {
    category: "OwnHero",
    hero: "Bane",
    audioFile: "ownHero/Bane_4_Nightmare save",
    messageTime: 2 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Nightmare provides 1 second of invulnerability and thus you can save an ally in trouble or dodge a spell.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bane_nightmare" },
  },
  {
    category: "OwnHero",
    hero: "Bane",
    audioFile: "ownHero/Bane_5_Enfeeble",
    messageTimes: [8 * 60 + 15, 18 * 60 + 15, 28 * 60 + 15],
    textMessage:
      "Enfeeble is improved version of Spirit Vessel as it reduces healing and regeneration significantly aside from damage reduction.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bane_enfeeble" },
  },
  {
    category: "OwnHero",
    hero: "Bane",
    audioFile: "ownHero/Bane_6_Setup kills",
    messageTime: 9 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Bane is great for setting up kills. Nightmare and Fiend's Grip combined provide up to 13 seconds of disable.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bane_fiends_grip" },
  },
  {
    category: "OwnHero",
    hero: "Bane",
    audioFile: "ownHero/Bane_7_Channeling cast",
    messageTimes: [9 * 60 + 30, 18 * 60 + 30, 28 * 60 + 30],
    textMessage:
      "You can unsleep or cast Glimmer Cape during Fiend's Grip without canceling it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bane_fiends_grip" },
  },
  {
    category: "OwnHero",
    hero: "Bane",
    audioFile: "ownHero/Bane_8_Avoid showing",
    messageTime: 10 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing yourself at the start of the teamfight. Let opponents focus your allies so you can get your spells off easier.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Bane",
    audioFile: "enemyHero/Bane_1_Strong laner",
    messageTime: -60,
    textMessage:
      "Bane is a strong laner and good at trading hits and regaining health with Brain Sap. Bring extra consumables.",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "flask" },
  },
  {
    category: "EnemyHero",
    hero: "Bane",
    audioFile: "enemyHero/Bane_2_Nightmare",
    messageTime: -50,
    textMessage:
      "You can unsleep an ally affected by Bane's Nightmare by attacking that ally.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bane_nightmare" },
  },
  {
    category: "EnemyHero",
    hero: "Bane",
    audioFile: "enemyHero/Bane_3_Fiends Grip",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Look to cancel Bane's Fiend's Grip in fights as it is a long lasting disable.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bane_fiends_grip" },
  },
  {
    category: "EnemyHero",
    hero: "Bane",
    audioFile: "enemyHero/Bane_4_Targetable spells",
    messageTime: 12 * 60,
    textMessage:
      "Lotus Orb, Linken's Sphere and status resistance items are good at countering Bane's spells.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Bane",
    audioFile: "enemyHero/Bane_5_Enfeeble",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Avoid overpurchasing healing and regenerating items as Bane's Enfeeble reduces their effect.",
    audience: [Audience.ALL],
  },

  // 8. Batrider | 28.02.2021
  {
    category: "OwnHero",
    hero: "Batrider",
    audioFile: "ownHero/Batrider_1_Sticky Napalm damage",
    messageTime: -30,
    textMessage:
      "Apply Sticky Napalm on opponents but also on the creeps at the same time. Batrider's base damage is very low.",
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "batrider_sticky_napalm" },
  },
  {
    category: "OwnHero",
    hero: "Batrider",
    audioFile: "ownHero/Batrider_2_Kill attempt",
    messageTime: 45,
    textMessage:
      "When you have 3 Sticky Napalms on an opponent, you can consider making a kill attempt.",
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "batrider_sticky_napalm" },
  },
  {
    category: "OwnHero",
    hero: "Batrider",
    audioFile: "ownHero/Batrider_3_Dive",
    messageTime: 2 * 60,
    textMessage:
      "Having Bottle charges, Faerie Fire or Healing Salve can allow you to dive under the tower.",
    audience: [Audience.IN_LANE, Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Batrider",
    audioFile: "ownHero/Batrider_4_Stacks",
    messageTimes: [3 * 60, 5 * 60],
    textMessage:
      "Batrider is good at clearing stacks early on. Encourage your teammates to make them for you.",
    audience: [Audience.IN_LANE, Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Batrider",
    audioFile: "ownHero/Batrider_5_Boots of Travel",
    messageTime: 6 * 60,
    textMessage:
      "Focus on acquiring Boots of Travel and then start playing more actively.",
    audience: [Audience.IN_LANE, Audience.ROLE_CORE],
    image: { type: "item", name: "travel_boots" },
  },
  {
    category: "OwnHero",
    hero: "Batrider",
    audioFile: "ownHero/Batrider_6_Flying vision",
    messageTimes: [6 * 60 + 30, 16 * 60 + 30, 26 * 60 + 30],
    textMessage: "Sticky Napalm and Firefly provide flying vision.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Batrider",
    audioFile: "enemyHero/Batrider_1_Stick wand",
    messageTime: -60,
    textMessage:
      "Magic Stick and Wand are great items against Batrider's Sticky Napalm spam.",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "magic_stick" },
  },
  {
    category: "EnemyHero",
    hero: "Batrider",
    audioFile: "enemyHero/Batrider_2_Sticky napalm",
    messageTime: -50,
    textMessage:
      "If you have 3 or more stacks of Sticky Napalm be careful or back away to allow them to expire.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "batrider_sticky_napalm" },
  },
  {
    category: "EnemyHero",
    hero: "Batrider",
    audioFile: "enemyHero/Batrider_3_Lotus linkens",
    messageTime: 12 * 60,
    textMessage:
      "Lotus Orb and Linken's Sphere are good at countering Batrider's Flaming Lasso.",
    audience: [Audience.ALL],
  },

  // 9. Beastmaster | 28.02.2021
  {
    category: "OwnHero",
    hero: "Beastmaster",
    audioFile: "ownHero/Beastmaster_1_Helm of Iron Will",
    messageTime: -90,
    textMessage:
      "Save some of your starting gold to get Helm of Iron Will as soon as possible.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "helm_of_iron_will" },
  },
  {
    category: "OwnHero",
    hero: "Beastmaster",
    audioFile: "ownHero/Beastmaster_2_Wild Axes",
    messageTime: -60,
    textMessage:
      "If laning against Chen, Enchantress or Naga Siren, consider skilling Wild Axes on level 1 and investing more spell points into it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "beastmaster_wild_axes" },
  },
  {
    category: "OwnHero",
    hero: "Beastmaster",
    audioFile: "ownHero/Beastmaster_3_Save boars",
    messageTime: 10,
    textMessage:
      "Make sure not to feed boars to opponents. Deny them or move them away when they're low on hp.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "beastmaster_call_of_the_wild_boar" },
  },
  {
    category: "OwnHero",
    hero: "Beastmaster",
    audioFile: "ownHero/Beastmaster_4_Scout support",
    messageTime: 20,
    textMessage: "Keep the hawk out to scout opponents' support whereabouts.",
    audience: [
      Audience.ROLE_OFFLANE,
      Audience.ROLE_CARRY,
      Audience.ROLE_SUPPORT,
    ],
    image: { type: "ability", name: "beastmaster_call_of_the_wild_hawk" },
  },
  {
    category: "OwnHero",
    hero: "Beastmaster",
    audioFile: "ownHero/Beastmaster_5_High damage",
    messageTime: 30,
    textMessage:
      "Utilize Beasmaster's high base damage and additional damage from boars to deny creeps and secure lasthits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "beastmaster_call_of_the_wild_boar" },
  },
  {
    category: "OwnHero",
    hero: "Beastmaster",
    audioFile: "ownHero/Beastmaster_6_Catapults",
    messageTimes: [5 * 60, 10 * 60],
    textMessage:
      "Make use of catapult waves to pressure the tower along with your summons.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Beastmaster",
    audioFile: "ownHero/Beastmaster_7_Powerspike",
    messageTime: 6 * 60,
    textMessage:
      "The biggest early powerspike on Beastmaster is Helm of the Dominator and level 6 timing. Look to score a kill and take tower down.",
    audience: [Audience.ALL],
    image: { type: "item", name: "helm_of_the_dominator" },
  },
  {
    category: "OwnHero",
    hero: "Beastmaster",
    audioFile: "ownHero/Beastmaster_8_Farm aggressively",
    messageTimes: [9 * 60, 11 * 60],
    textMessage:
      "You can farm aggressively since you have hawk's vision to protect you and summons to farm those camps safely.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Beastmaster",
    audioFile: "ownHero/Beastmaster_9_Push sidelanes",
    messageTimes: [13 * 60, 15 * 60],
    textMessage:
      "Push out sidelanes with summons, especially once you control Helm of the Overlord creep, Black Dragon ideally.",
    audience: [Audience.ALL],
    image: { type: "item", name: "helm_of_the_overlord" },
  },
  {
    category: "OwnHero",
    hero: "Beastmaster",
    audioFile: "ownHero/Beastmaster_10_Roshan",
    messageTime: 14 * 60 + 45,
    textMessage: "Take first Roshan between 15 and 20 minute mark.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    hero: "Beastmaster",
    audioFile: "enemyHero/Beastmaster_1_Boars",
    messageTime: -60,
    textMessage:
      "Beastmaster's boars give a lot of gold and experience. Look to kill them.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "beastmaster_call_of_the_wild_boar" },
  },
  {
    category: "EnemyHero",
    hero: "Beastmaster",
    audioFile: "enemyHero/Beastmaster_2_Hawk sentry",
    messageTime: -50,
    textMessage:
      "Bring a sentry to the lane to spot and kill Beastmaster's hawks.",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "ward_sentry" },
  },
  // {category: "EnemyHero", hero: "Beastmaster", audioFile: "enemyHero/Beastmaster_3_Powerspike", messageTime: (8*60), textMessage: "Be aware of Beastmaster's level 6 and Necrobook level 1's deadly powerspike.", audience: [Audience.IN_LANE]}, |patch 7.29| MESSAGE CHANGED
  {
    category: "EnemyHero",
    hero: "Beastmaster",
    audioFile: "enemyHero/Beastmaster_3_Powerspike",
    messageTime: 8 * 60,
    textMessage:
      "Be aware of Beastmaster's level 6 and Helm of Dominator powerspike.",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "helm_of_the_dominator" },
  },
  {
    category: "EnemyHero",
    hero: "Beastmaster",
    audioFile: "enemyHero/Beastmaster_4_Defend towers",
    messageTime: 8 * 60 + 10,
    textMessage:
      "Defend towers against Beastmaster. Otherwise he will invade your jungle after taking towers.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Beastmaster",
    audioFile: "enemyHero/Beastmaster_5_Gank",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Gank Beastmaster with smoke as he might have hawks around. You get double bounty as you kill his summons too.",
    audience: [Audience.ALL],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "EnemyHero",
    hero: "Beastmaster",
    audioFile: "enemyHero/Beastmaster_6_antisummons items",
    messageTime: 12 * 60,
    textMessage:
      "Consider buying a Crimson Guard and armor items against Beastmaster.",
    audience: [Audience.ALL],
    image: { type: "item", name: "crimson_guard" },
  },
  {
    category: "EnemyHero",
    hero: "Beastmaster",
    audioFile: "enemyHero/Beastmaster_7_Lotus linkens",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Lotus Orb and Linken's Sphere are good at countering Beastmaster's Primal Roar.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Beastmaster",
    audioFile: "enemyHero/Beastmaster_8_Roshan",
    messageTimes: [15 * 60 + 10, 20 * 60 + 10, 25 * 60 + 10],
    textMessage:
      "Beastmaster lineups are good at taking early Roshan. Ward around Roshpit and check.",
    audience: [Audience.ALL],
  },

  // 10. Bloodseeker | 28.02.2021
  {
    category: "OwnHero",
    hero: "Bloodseeker",
    audioFile: "ownHero/Bloodseeker_1_Blood Rite",
    messageTime: 15,
    textMessage:
      "Use Blood Rite to secure range creep lasthits and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bloodseeker_blood_bath" },
  },
  {
    category: "OwnHero",
    hero: "Bloodseeker",
    audioFile: "ownHero/Bloodseeker_2_Movement speed",
    messageTimes: [90, 3 * 60],
    textMessage:
      "Keep an eye on your movement speed. If you are fast, you can play more aggressively.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bloodseeker_thirst" },
  },
  {
    category: "OwnHero",
    hero: "Bloodseeker",
    audioFile: "ownHero/Bloodseeker_3_Teleport out",
    messageTimes: [6 * 60, 9 * 60],
    textMessage:
      "The opponents will often attempt to teleport out when you Rupture them. Call for an ally to help you out if you don't have a way of securing kill yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bloodseeker_rupture" },
  },
  {
    category: "OwnHero",
    hero: "Bloodseeker",
    audioFile: "ownHero/Bloodseeker_3_Rupture targets",
    messageTime: 15 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Make sure to Rupture high priority targets in the fights, usually mobile cores, especially with Black King Bar.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bloodseeker_rupture" },
  },

  {
    category: "EnemyHero",
    hero: "Bloodseeker",
    audioFile: "enemyHero/Bloodseeker_1_Burst",
    messageTime: -60,
    textMessage:
      "Thirst sustains Bloodseeker. Deal burst of damage to him so he can't lasthit creeps easily and regain HP.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "bloodseeker_thirst" },
  },
  {
    category: "EnemyHero",
    hero: "Bloodseeker",
    audioFile: "enemyHero/Bloodseeker_2_High HP",
    messageTime: -50,
    textMessage:
      "Stay high on HP so that Bloodseeker doesn't become super fast.",
    audience: [Audience.ALL],
    image: { type: "item", name: "flask" },
  },
  {
    category: "EnemyHero",
    hero: "Bloodseeker",
    audioFile: "enemyHero/Bloodseeker_3_Rupture",
    messageTime: 8 * 60,
    textMessage:
      "When Ruptured by Bloodseeker, don't move too far and consider teleporting to base if possible.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bloodseeker_rupture" },
  },
  {
    category: "EnemyHero",
    hero: "Bloodseeker",
    audioFile: "enemyHero/Bloodseeker_4_Rupture counter items",
    messageTime: 12 * 60,
    textMessage:
      "Lotus Orb, Linken's Sphere and status resistance items are good at countering Rupture.",
    audience: [Audience.ALL],
  },

  // 11. Bounty Hunter | 28.02.2021
  {
    category: "OwnHero",
    hero: "Bounty Hunter",
    audioFile: "ownHero/Bounty Hunter_1_Snipe couriers",
    messageTime: -90,
    textMessage:
      "Place a non-obvious courier sniping Observer Ward. Killing couriers grants gold but also disallows detection to be delivered.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "courier" },
  },
  {
    category: "OwnHero",
    hero: "Bounty Hunter",
    audioFile: "ownHero/Bounty Hunter_2_Jinada",
    messageTime: -15,
    textMessage:
      "Hit opponents with Jinada or secure range creep lasthits. The bonus damage doesn't work on denies.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bounty_hunter_jinada" },
  },
  {
    category: "OwnHero",
    hero: "Bounty Hunter",
    audioFile: "ownHero/Bounty Hunter_3_Check detection",
    messageTime: 15,
    repeatTime: 10 * 60,
    textMessage: "Check frequently opponents' inventories for detection.",
    audience: [Audience.ALL],
    image: { type: "item", name: "SentryDustGem" },
  },
  {
    category: "OwnHero",
    hero: "Bounty Hunter",
    audioFile: "ownHero/Bounty Hunter_4_Leave invisibility",
    messageTimes: [90, 8 * 60 + 30, 15 * 60 + 30],
    textMessage:
      "If you get dusted while in Shadow Walk, use any activatable item or Shuriken Toss to leave invisibility and your won't be slowed by dust.",
    audience: [Audience.ALL],
    image: { type: "item", name: "dust" },
  },
  {
    category: "OwnHero",
    hero: "Bounty Hunter",
    audioFile: "ownHero/Bounty Hunter_5_Avoid spots",
    messageTime: 3 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid running by spots that are typically sentried like pillars and active rune spots.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    hero: "Bounty Hunter",
    audioFile: "ownHero/Bounty Hunter_6_Playstyle",
    messageTime: 10 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "In mid to lategame, play ahead of your teammates, track opponents, break smokes, collect runes, place deep wards and snipe couriers.",
    audience: [Audience.ROLE_SUPPORT],
  },

  {
    category: "EnemyHero",
    hero: "Bounty Hunter",
    audioFile: "enemyHero/Bounty Hunter_1_Detection",
    messageTime: -60,
    textMessage:
      "Use Jinada off cooldown on opponents hero or to secure range creep lasthit.",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "EnemyHero",
    hero: "Bounty Hunter",
    audioFile: "enemyHero/Bounty Hunter_2_Courier",
    messageTime: -50,
    textMessage:
      "Bounty Hunter tends to snipe couriers, so be mindful about that.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Bounty Hunter",
    audioFile: "enemyHero/Bounty Hunter_3_Jinada",
    messageTime: -40,
    textMessage:
      "Don't make it easy for Bounty Hunter to steal your gold with Jinada hits. Step away or damage him heavily.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "bounty_hunter_jinada" },
  },
  {
    category: "EnemyHero",
    hero: "Bounty Hunter",
    audioFile: "enemyHero/Bounty Hunter_4_Observer sentry",
    messageTimes: [10 * 60 + 10, 18 * 60 + 10, 26 * 60 + 10],
    textMessage:
      "Pair observer wards with sentries to spot Bounty Hunter's movements.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_dispenser" },
  },
  {
    category: "EnemyHero",
    hero: "Bounty Hunter",
    audioFile: "enemyHero/Bounty Hunter_5_Carry detection",
    messageTimes: [10 * 60 + 20, 18 * 60 + 20, 26 * 60 + 20],
    textMessage: "Encourage your allies to carry detection on multiple heroes.",
    audience: [Audience.ALL],
    image: { type: "item", name: "dust" },
  },
  {
    category: "EnemyHero",
    hero: "Bounty Hunter",
    audioFile: "enemyHero/Bounty Hunter_6_Track reveal items",
    messageTime: 12 * 60,
    textMessage:
      "Avoid buying items that grant you invisibility because of Bounty Hunter's Track.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bounty_hunter_track" },
  },
  {
    category: "EnemyHero",
    hero: "Bounty Hunter",
    audioFile: "enemyHero/Bounty Hunter_7_Track dispel items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Consider buying one of many items that allow you to dispel Track.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bounty_hunter_track" },
  },

  // 12. Brewmaster | 28.02.2021
  {
    category: "OwnHero",
    hero: "Brewmaster",
    audioFile: "ownHero/Brewmaster_1_Urn",
    messageTime: -90,
    textMessage:
      "Get Urn of Shadows as soon as possible as it allows you snowball off of first kill. Soul Release activates Cinder Brew.",
    audience: [Audience.ALL],
    image: { type: "item", name: "urn_of_shadows" },
  },
  {
    category: "OwnHero",
    hero: "Brewmaster",
    audioFile: "ownHero/Brewmaster_2_Drunken Brawler",
    messageTime: 15,
    textMessage: "Take a point in Drunken Brawler on a tough lane.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "brewmaster_drunken_brawler" },
  },
  {
    category: "OwnHero",
    hero: "Brewmaster",
    audioFile: "ownHero/Brewmaster_3_Cinder Brew",
    messageTime: 30,
    textMessage:
      "Ask your laning partner to activate Cinder Brew if you can't yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "brewmaster_cinder_brew" },
  },
  {
    category: "OwnHero",
    hero: "Brewmaster",
    audioFile: "ownHero/Brewmaster_4_Cyclone",
    messageTime: 6 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Make sure to cyclone an important target at least twice during Primal Split.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "brewmaster_primal_split" },
  },
  {
    category: "OwnHero",
    hero: "Brewmaster",
    audioFile: "ownHero/Brewmaster_5_Dispel",
    messageTime: 6 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Don't forget that Storm Panda has AoE dispel which can remove certain spells, runes and damage basic illusions.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "brewmaster_primal_split" },
  },
  {
    category: "OwnHero",
    hero: "Brewmaster",
    audioFile: "ownHero/Brewmaster_6_Earth panda",
    messageTimes: [6 * 60 + 30, 16 * 60 + 30],
    textMessage:
      "The Earth Panda carries all the auras and AoE effects like Radiance or Cloak of Flames.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "brewmaster_primal_split" },
  },

  {
    category: "EnemyHero",
    hero: "Brewmaster",
    audioFile: "enemyHero/Brewmaster_1_Lock down",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Try to lock down or silence Brewmaster and kill him before he splits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "brewmaster_primal_split" },
  },
  {
    category: "EnemyHero",
    hero: "Brewmaster",
    audioFile: "enemyHero/Brewmaster_2_Kite",
    messageTimes: [8 * 60 + 10, 18 * 60 + 10, 28 * 60 + 20],
    textMessage:
      "Don't fight Brewmaster's Primal Split unless you have damage to kill all the Brewlings.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "brewmaster_primal_split" },
  },
  {
    category: "EnemyHero",
    hero: "Brewmaster",
    audioFile: "enemyHero/Brewmaster_3_Dispel magic",
    messageTime: 12 * 60,
    textMessage:
      "Storm Brewling's Dispel Magic is an AOE basic dispel. So, avoid purchasing dispellable items.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Brewmaster",
    audioFile: "enemyHero/Brewmaster_4_BKB",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Black King Bar is amazing against all of the crowd control Brewmaster has.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },

  // 13. Bristleback | 28.02.2021
  {
    category: "OwnHero",
    hero: "Bristleback",
    audioFile: "ownHero/Bristleback_1_Early Goo",
    messageTime: 45,
    textMessage:
      "If you can be aggressive, take a point in Viscous Nasal Goo as it will greatly improve physical damage output.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bristleback_viscous_nasal_goo" },
  },
  {
    category: "OwnHero",
    hero: "Bristleback",
    audioFile: "ownHero/Bristleback_2_Turn back",
    messageTime: 60,
    repeatTime: 10 * 60,
    textMessage:
      "Turn your back to opponents, their towers or stacks of neutral creeps whenever you expect to take loads of damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bristleback_bristleback" },
  },
  {
    category: "OwnHero",
    hero: "Bristleback",
    audioFile: "ownHero/Bristleback_3_Stack camps",
    messageTimes: [3 * 60 + 30, 6 * 60 + 30],
    textMessage:
      "Alert your supports to stack for you, especially ancient camp as you can clear it at level 7.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Bristleback",
    audioFile: "ownHero/Bristleback_4_Stack camps",
    messageTimes: [6 * 60 + 45, 9 * 60 + 45, 12 * 60 + 45],
    textMessage:
      "Bristleback is not the best at moving around and ganking. Rather, make the opponents come to you by being aggressive.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Bristleback",
    audioFile: "ownHero/Bristleback_5_Check inventory",
    messageTime: 11 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Check opponents' inventories frequently in search for break effects and healing reductions. Black King Bar and dispel items counter some of them.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Bristleback",
    audioFile: "ownHero/Bristleback_6_Roshan",
    messageTimes: [18 * 60 + 15, 23 * 60 + 15],
    textMessage:
      "You can take Roshan down fast and early with your team thanks to Viscous Nasal Goo.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    hero: "Bristleback",
    audioFile: "enemyHero/Bristleback_1_Stick wand",
    messageTime: -60,
    textMessage:
      "Magic Stick and Wand are must items against Bristleback's Quill Spray spam.",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "magic_stick" },
  },
  {
    category: "EnemyHero",
    hero: "Bristleback",
    audioFile: "enemyHero/Bristleback_2_Spirit vessel",
    messageTime: -50,
    textMessage:
      "Someone should buy Spirit Vessel against Bristleback to counter his regeneration and healing.",
    audience: [Audience.ALL],
    image: { type: "item", name: "spirit_vessel" },
  },
  {
    category: "EnemyHero",
    hero: "Bristleback",
    audioFile: "enemyHero/Bristleback_3_Kite",
    messageTimes: [10 * 60 + 10, 15 * 60 + 10, 20 * 60 + 20],
    textMessage:
      "If you have no good way of dealing with Bristleback, leave and don't waste too many resources on him.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Bristleback",
    audioFile: "enemyHero/Bristleback_4_Silver edge",
    messageTime: 12 * 60,
    textMessage: "Silver Edge allows you to break Bristleeback's passives.",
    audience: [Audience.ALL],
    image: { type: "item", name: "silver_edge" },
  },
  {
    category: "EnemyHero",
    hero: "Bristleback",
    audioFile: "enemyHero/Bristleback_5_Armor",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Armor items are good to counter Bristleback's physical damage output.",
    audience: [Audience.ALL],
    image: { type: "item", name: "armor" },
  },

  // 14. Broodmother | 28.02.2021
  {
    category: "OwnHero",
    hero: "Broodmother",
    audioFile: "ownHero/Broodmother_1_Until 6",
    messageTime: 15,
    textMessage:
      "Broodmother is weak until level 6. Focus on lasthitting and sustaining health until you have Spawn Spiderlings.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Broodmother",
    audioFile: "ownHero/Broodmother_2_Spiderlings feed",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Make sure not to feed spiderlings away as that greatly affects your farming speed and kill threat.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "broodmother_spawn_spiderlings" },
  },
  {
    category: "OwnHero",
    hero: "Broodmother",
    audioFile: "ownHero/Broodmother_3_Play aggressive",
    messageTimes: [6 * 60 + 30, 9 * 60 + 30],
    textMessage:
      "Once you have buit up an army of spiderlings, try to play on the opponents side of the map as much as you can.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "broodmother_spawn_spiderlings" },
  },
  {
    category: "OwnHero",
    hero: "Broodmother",
    audioFile: "ownHero/Broodmother_4_Place wards",
    messageTimes: [7 * 60, 10 * 60, 13 * 60],
    textMessage:
      "Place Observer Wards and Sentries in the opponents' jungle so you feel comfortable playing there.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_dispenser" },
  },
  {
    category: "OwnHero",
    hero: "Broodmother",
    audioFile: "ownHero/Broodmother_5_Feeling endangered",
    messageTimes: [7 * 60 + 30, 10 * 60 + 30, 13 * 60 + 30],
    textMessage:
      "If you are feeling endangered, let your spiderlings farm while staying hidden on hero.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "broodmother_spawn_spiderlings" },
  },
  {
    category: "OwnHero",
    hero: "Broodmother",
    audioFile: "ownHero/Broodmother_6_Roshan",
    messageTimes: [15 * 60 + 30, 20 * 60 + 30],
    textMessage:
      "Broodmother can take Roshan down fairly early. Move spiderlings out when Roshan is about to clap.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    hero: "Broodmother",
    audioFile: "enemyHero/Broodmother_1_Laning hero",
    messageTime: -60,
    textMessage:
      "Consider putting a hero that can deal with Spiderlings against her on the lane.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "broodmother_spawn_spiderlings" },
  },
  // {category: "EnemyHero", hero: "Broodmother", audioFile: "enemyHero/Broodmother_2_Block camps", messageTime: (-50), textMessage: "Block off her camps with sentries.", audience: [Audience.ALL]}, |patch 7.29| MESSAGE CHANGED
  {
    category: "EnemyHero",
    hero: "Broodmother",
    audioFile: "enemyHero/Broodmother_2_Block camps",
    messageTime: 4 * 60 + 15,
    textMessage:
      "Block off her camps with sentries as she gets closer to level 6.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "EnemyHero",
    hero: "Broodmother",
    audioFile: "enemyHero/Broodmother_3_Gank",
    messageTime: 10 * 60 + 10,
    textMessage:
      "If you are looking to gank Broodmother you need at least 3 heroes otherwise pressure other two lanes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Broodmother",
    audioFile: "enemyHero/Broodmother_4_Antisummons items",
    messageTime: 12 * 60,
    textMessage: "Crimson Guard and armor items are good against Broodmother.",
    audience: [Audience.ALL],
    image: { type: "item", name: "crimson_guard" },
  },
  {
    category: "EnemyHero",
    hero: "Broodmother",
    audioFile: "enemyHero/Broodmother_5_Antihealing items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Healing and regeneration reducing items are good against Insatiable Hunger.",
    audience: [Audience.ALL],
  },
  // {category: "EnemyHero", hero: "Broodmother", audioFile: "enemyHero/Broodmother_6_Antievasion items", messageTime: (12*60+20), textMessage: "Evasion piercing items are good against Incapacitating Bite.", audience: [Audience.ALL]}, |patch 7.29|  MESSAGE CHANGED
  {
    category: "EnemyHero",
    hero: "Broodmother",
    audioFile: "enemyHero/Broodmother_6_Antievasion items",
    messageTime: 12 * 60 + 20,
    textMessage: "Evasion piercing items are good against Brood's Silken Bola.",
    audience: [Audience.ALL],
    image: { type: "item", name: "monkey_king_bar" },
  },
  {
    category: "EnemyHero",
    hero: "Broodmother",
    audioFile: "enemyHero/Broodmother_7_Roshan",
    messageTimes: [15 * 60 + 10, 20 * 60 + 10, 25 * 60 + 10],
    textMessage:
      "Broodmother is good at taking an early Roshan. Ward around Roshpit and check.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_dispenser" },
  },

  // 15. Centaur Warrunner | 01.03.2021
  {
    category: "OwnHero",
    hero: "Centaur Warrunner",
    audioFile: "ownHero/Centaur Warrunner_1_Ring",
    messageTime: 15,
    textMessage:
      "Focus on lasthitting to get Ring of Health purchased as soon as possible.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ring_of_health" },
  },
  {
    category: "OwnHero",
    hero: "Centaur Warrunner",
    audioFile: "ownHero/Centaur Warrunner_2_Creepskip",
    messageTime: 4 * 60 + 45,
    textMessage:
      "If you can't pressure on the lane, consider creepskipping after minute 5 and farming neutral camps nearby.",
    audience: [Audience.ROLE_OFFLANE],
  },
  {
    category: "OwnHero",
    hero: "Centaur Warrunner",
    audioFile: "ownHero/Centaur Warrunner_3_Buldings",
    messageTimes: [5 * 60 + 15, 8 * 60 + 15],
    textMessage:
      "Retaliate works on buildings so consider tanking tower shots if it is safe enough.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "centaur_return" },
  },
  {
    category: "OwnHero",
    hero: "Centaur Warrunner",
    audioFile: "ownHero/Centaur Warrunner_4_Stampede",
    messageTimes: [6 * 60 + 30, 9 * 60 + 30, 12 * 60 + 30],
    textMessage:
      "Look around the map to help out your teammates in the trouble with Stampede.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "centaur_stampede" },
  },
  {
    category: "OwnHero",
    hero: "Centaur Warrunner",
    audioFile: "ownHero/Centaur Warrunner_5_Blink",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Once you get Blink Dagger, try to make use of it immediately before the opponents can see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Centaur Warrunner",
    audioFile: "ownHero/Centaur Warrunner_6_Follow up",
    messageTime: 11 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Make sure your teammates can follow up on your initiation. Centaur doesn't do insane amounts of damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },

  {
    category: "EnemyHero",
    hero: "Centaur Warrunner",
    audioFile: "enemyHero/Centaur Warrunner_1_Spirit vessel",
    messageTime: -60,
    textMessage:
      "Someone should buy Spirit Vessel against Centaur to deal damage, offset his regeneration and cancel Blink.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Centaur Warrunner",
    audioFile: "enemyHero/Centaur Warrunner_2_Armor reducing items",
    messageTime: -50,
    textMessage: "Armor reducing items are great against Centaur.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Centaur Warrunner",
    audioFile: "enemyHero/Centaur Warrunner_3_Antimagic items",
    messageTime: 12 * 60,
    textMessage:
      "Items that offset magical damage output from Centaur are good against him.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Centaur Warrunner",
    audioFile: "enemyHero/Centaur Warrunner_4_Blink dagger",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Keep checking Centaur's items. Be aware of his Blink Dagger timing.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Centaur Warrunner",
    audioFile: "enemyHero/Centaur Warrunner_5_Clump up",
    messageTimes: [12 * 60 + 20, 22 * 60 + 20, 32 * 60 + 20],
    textMessage:
      "Don't clump up in teamfights for Centaur's Blink into Hoof Stomp initiation.",
    audience: [Audience.ALL],
  },

  // 16. Chaos Knight | 01.03.2021
  {
    category: "OwnHero",
    hero: "Chaos Knight",
    audioFile: "ownHero/Chaos Knight_1_Aggressive",
    messageTime: 15,
    textMessage:
      "Chaos Knight's spells allow you to play aggressively on the lane against most of the match-ups.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Chaos Knight",
    audioFile: "ownHero/Chaos Knight_2_Phantasm farm",
    messageTimes: [6 * 60 + 45, 10 * 60 + 45, 14 * 60 + 45],
    textMessage:
      "Use Phantasm off cooldown not just to fight but also to farm faster unless you suspect a fight will happen soon.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "chaos_knight_phantasm" },
  },
  {
    category: "OwnHero",
    hero: "Chaos Knight",
    audioFile: "ownHero/Chaos Knight_3_Illusions",
    messageTimes: [7 * 60, 11 * 60],
    textMessage:
      "Illusions scale with stat attributes, attack speed and movemet speed increases, health regeneration and some attack modifiers like lifesteal and crit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "chaos_knight_phantasm" },
  },
  {
    category: "OwnHero",
    hero: "Chaos Knight",
    audioFile: "ownHero/Chaos Knight_4_Strong illusions",
    messageTimes: [7 * 60 + 15, 11 * 60 + 15],
    textMessage:
      "Phantasm illusions are strong illusions so they can't be instantly killed with hex, dagon or drains.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "chaos_knight_phantasm" },
  },
  {
    category: "OwnHero",
    hero: "Chaos Knight",
    audioFile: "ownHero/Chaos Knight_5_Burst",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Burst an opponent at the start of the fight. Your illusion will generally be killed off as the fight continues.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Chaos Knight",
    audioFile: "ownHero/Chaos Knight_6_Blink",
    messageTime: 15 * 60 + 15,
    textMessage:
      "With Blink Dagger you can use Phantasm, blink in and pull illusions on target by using Reality Rift.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },

  {
    category: "EnemyHero",
    hero: "Chaos Knight",
    audioFile: "enemyHero/Chaos Knight_1_Burst",
    messageTime: -60,
    textMessage:
      "Chaos Strike sustains Chaos Knight. Deal bursts of damage to him so he can't hit creeps easily and regain HP.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Chaos Knight",
    audioFile: "enemyHero/Chaos Knight_2_Basic dispel",
    messageTime: 8 * 60,
    textMessage: "Chaos Knight's Phantasm applies a basic dispel on cast.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Chaos Knight",
    audioFile: "enemyHero/Chaos Knight_3_Illusions",
    messageTimes: [8 * 60 + 10, 18 * 60 + 10, 28 * 60 + 10],
    textMessage: "Either kills his illusions in the fights or disengage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Chaos Knight",
    audioFile: "enemyHero/Chaos Knight_4_Antiillusion items",
    messageTime: 12 * 60,
    textMessage:
      "Items that deal AoE damage are good against Chaos Knight's illusions.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Chaos Knight",
    audioFile: "enemyHero/Chaos Knight_5_Defensive items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard and armor items are good at offsetting Chaos Knight's physical damage output.",
    audience: [Audience.ALL],
  },

  // 17. Chen | 01.03.2021    ***CHANGED 7.30***
  {
    category: "OwnHero",
    hero: "Chen",
    audioFile: "ownHero/Chen_1_Unblock camps",
    messageTime: -90,
    textMessage:
      "Bring a sentry or two to the lane to unblock the camps. Chen's laning impact is directly related to summon usage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    hero: "Chen",
    audioFile: "ownHero/Chen_2_Harpy",
    messageTime: 55,
    textMessage:
      "If you find Harpy Stormcrafter you can send it mid and zap the opponents' midlaner until it runs out of mana.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "chen_holy_persuasion" },
  },
  {
    category: "OwnHero",
    hero: "Chen",
    audioFile: "ownHero/Chen_3_Summons",
    messageTimes: [90, 4 * 60 + 30, 7 * 60 + 30],
    textMessage:
      "Aside from using summons to harass on the lane, you can gank with them, stack camps, control runes, block camps and even snipe couriers.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "chen_holy_persuasion" },
  },
  {
    category: "OwnHero",
    hero: "Chen",
    audioFile: "ownHero/Chen_4_Save",
    messageTimes: [9 * 60, 13 * 60, 17 * 60],
    textMessage:
      "Keep an eye on the map and save your teammates in trouble by using Hand of God.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "chen_hand_of_god" },
  },
  {
    category: "OwnHero",
    hero: "Chen",
    audioFile: "ownHero/Chen_5_Group up",
    messageTime: 10 * 60 + 15,
    textMessage:
      "You want to group up early with your team and make use of your summons and auras to play aggressively.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Chen",
    audioFile: "ownHero/Chen_6_Splitpush",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening on the map, you can splitpush with your summons.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Chen",
    audioFile: "enemyHero/Chen_1_Block camps",
    messageTime: -60,
    textMessage:
      "Against Chen, block off small and big pull camps either with a sentry or with your hero's body.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Chen",
    audioFile: "enemyHero/Chen_2_Dont greed",
    messageTimes: [-50, 5 * 60 + 10, 10 * 60 + 30],
    textMessage:
      "Chen lineups tend to powerspike in early to midgame. Don't buy greedy items.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Chen",
    audioFile: "enemyHero/Chen_3_Gank",
    messageTime: 10 * 60 + 10,
    textMessage: "Look to gank Chen as you will kill his army as well.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Chen",
    audioFile: "enemyHero/Chen_4_Antihealing items",
    messageTime: 10 * 60 + 20,
    textMessage: "Items that reduce healing are good against Chen.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Chen",
    audioFile: "enemyHero/Chen_5_Roshan",
    messageTimes: [15 * 60 + 10, 20 * 60 + 10, 25 * 60 + 10],
    textMessage:
      "Chen lineups are good at taking early Roshan. Ward around Roshpit and check.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Chen",
    audioFile: "enemyHero/Chen_6_Aghanims scepter",
    messageTimes: [25 * 60 + 20, 35 * 60 + 20, 45 * 60 + 20],
    textMessage:
      "Be aware of Chen applying strong dispel with Hand of God once he has Aghanim's Scepter.",
    audience: [Audience.ALL],
  },

  // 18. Clinkz | 01.03.2021  ***CHANGED 7.30***
  {
    category: "OwnHero",
    hero: "Clinkz",
    audioFile: "ownHero/Clinkz_1_Searing Arrows",
    messageTime: 15,
    textMessage:
      "Searing Arrows is one of most efficient 'mana to damage' spells in the game and it doesn't pull aggro.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "clinkz_searing_arrows" },
  },
  {
    category: "OwnHero",
    hero: "Clinkz",
    audioFile: "ownHero/Clinkz_2_Check inventory",
    messageTime: 90,
    repeatTime: 10 * 60,
    textMessage: "Check frequently opponents' inventory for detection.",
    audience: [Audience.ALL],
    image: { type: "item", name: "SentryDustGem" },
  },
  {
    category: "OwnHero",
    hero: "Clinkz",
    audioFile: "ownHero/Clinkz_3_Death Pact",
    messageTimes: [6 * 60, 20 * 60],
    textMessage:
      "Death Pact the high hp, undamaged creeps or archer statues. Avoid fighting without Death Pact.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "clinkz_death_pact" },
  },
  {
    category: "OwnHero",
    hero: "Clinkz",
    audioFile: "ownHero/Clinkz_4_Clear stacks",
    messageTime: 8 * 60 + 30,
    textMessage:
      "With Maelstrom and Burning Barrage maxed out, you can clear stacks of creeps without a problem.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "maelstrom" },
  },
  {
    category: "OwnHero",
    hero: "Clinkz",
    audioFile: "ownHero/Clinkz_5_Avoid sentries",
    messageTime: 9 * 60,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid passing by the typical sentry spots like pillars and active rune spots.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    hero: "Clinkz",
    audioFile: "ownHero/Clinkz_6_Barrage line",
    messageTime: 10 * 60 + 10,
    repeatTime: 10 * 60,
    textMessage:
      "In the fights, look for opportunities when opponents are lined up to Burning Barrage them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "clinkz_strafe" },
  },

  {
    category: "EnemyHero",
    hero: "Clinkz",
    audioFile: "enemyHero/Clinkz_1_Detection",
    messageTime: -60,
    textMessage: "Bring a sentry to the lane and dust later on for Clinkz.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Clinkz",
    audioFile: "enemyHero/Clinkz_2_Squishy",
    messageTime: -50,
    textMessage:
      "Clinkz is very squishy until he has Dark Pact buff active. Pressure him early on.",
    audience: [Audience.IN_LANE],
  },

  {
    category: "EnemyHero",
    hero: "Clinkz",
    audioFile: "enemyHero/Clinkz_6_Contest farm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Clinkz farms fast with Burning Barrage. Smoke on him, place deep wards and block off camps with sentries.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Clinkz",
    audioFile: "enemyHero/Clinkz_3_Observer sentry",
    messageTimes: [10 * 60 + 10, 18 * 60 + 10, 26 * 60 + 10],
    textMessage:
      "Pair observer wards with sentries to spot Clinkz's movements.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Clinkz",
    audioFile: "enemyHero/Clinkz_4_Carry detection",
    messageTimes: [10 * 60 + 20, 18 * 60 + 20, 26 * 60 + 20],
    textMessage: "Carry detection on multiple heroes against Clinkz.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Clinkz",
    audioFile: "enemyHero/Clinkz_5_Armor",
    messageTime: 12 * 60,
    textMessage: "Armor items are good against Clinkz.",
    audience: [Audience.ALL],
  },
  // {category: "EnemyHero", hero: "Clinkz", audioFile: "enemyHero/Clinkz_6_Antievasion", messageTime: (12*60+10), textMessage: "Evasion piercing items are good against Clinkz's Strafe.", audience: [Audience.ALL]},

  // 19. Clockwerk | 01.03.2021
  {
    category: "OwnHero",
    hero: "Clockwerk",
    audioFile: "ownHero/Clockwerk_1_Creep equilibrium",
    messageTime: 15,
    textMessage:
      "Have creep equilibrium close to your tower so you can run the opponents down for a while until they reach their tower.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rattletrap_battery_assault" },
  },
  {
    category: "OwnHero",
    hero: "Clockwerk",
    audioFile: "ownHero/Clockwerk_2_Pray",
    messageTime: 30,
    textMessage:
      "Play in tree lines and pray on isolated heroes as Battery Assault does all the damage to the single hero.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rattletrap_battery_assault" },
  },
  {
    category: "OwnHero",
    hero: "Clockwerk",
    audioFile: "ownHero/Clockwerk_3_Deny cogs",
    messageTime: 80,
    textMessage:
      "Don't feed Power Cogs unnecessarily to opponents. Deny cogs as opponents start attacking them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rattletrap_power_cogs" },
  },
  {
    category: "OwnHero",
    hero: "Clockwerk",
    audioFile: "ownHero/Clockwerk_4_Push cogs",
    messageTime: 100,
    repeatTime: 8 * 60,
    textMessage:
      "If an opponent can escape or fight you back in Power Cogs, don't trap him in the cogs but rather push him towards your team.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rattletrap_power_cogs" },
  },
  {
    category: "OwnHero",
    hero: "Clockwerk",
    audioFile: "ownHero/Clockwerk_5_Rocket scout",
    messageTime: 9 * 60 + 45,
    repeatTime: 8 * 60,
    textMessage:
      "Use Rockets off cooldown to scout around the map and push out dangerous lanes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rattletrap_rocket_flare" },
  },
  {
    category: "OwnHero",
    hero: "Clockwerk",
    audioFile: "ownHero/Clockwerk_6_Split opponents",
    messageTime: 10 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "In the teamfights, look to split opponents' team into two parts by placing cogs between their heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rattletrap_power_cogs" },
  },
  {
    category: "OwnHero",
    hero: "Clockwerk",
    audioFile: "ownHero/Clockwerk_7_Controll bkb",
    messageTime: 11 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Clockwerk is good at controlling spell-immune heroes as Hookshot pierces spell-immunity and Power Cogs act as barrier.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },

  {
    category: "EnemyHero",
    hero: "Clockwerk",
    audioFile: "enemyHero/Clockwerk_1_Observer",
    messageTime: -60,
    textMessage:
      "Bring an Observer Ward to the lane to keep an eye on Clockwerk's aggressive movements.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Clockwerk",
    audioFile: "enemyHero/Clockwerk_2_Battery assault",
    messageTime: -50,
    textMessage:
      "Battery assault does a lot of damage. Keep distance from Clockwerk or share damage with allied units.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Clockwerk",
    audioFile: "enemyHero/Clockwerk_3_Power cogs",
    messageTime: 30,
    textMessage:
      "If you get trapped in Power Cogs don't panic. It takes two hits to destroy a cog.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Clockwerk",
    audioFile: "enemyHero/Clockwerk_4_Solo kill",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Clockwerk has a great solo kill potential in early to midgame. Keep track of his movements.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Clockwerk",
    audioFile: "enemyHero/Clockwerk_5_Force staff",
    messageTime: 12 * 60,
    textMessage:
      "Force Staff is great at moving you or an ally out of Power Cogs and out of Battery Assault range.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Clockwerk",
    audioFile: "enemyHero/Clockwerk_6_Roshan contesting",
    messageTimes: [15 * 60, 25 * 60, 35 * 60],
    textMessage:
      "Clockwerk is great at contesting you at Roshan. Block his Hookshot path when you are about to finish Roshan.",
    audience: [Audience.ALL],
  },

  // 20. Crystal Maiden | Earlier work
  {
    category: "OwnHero",
    hero: "Crystal Maiden",
    audioFile: "ownHero/Crystal Maiden_1_Crystal Nova",
    messageTime: 15,
    textMessage:
      "Try to hit both opponents with Crystal Nova and potentially secure the range creep at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_crystal_nova" },
  },
  {
    category: "OwnHero",
    hero: "Crystal Maiden",
    audioFile: "ownHero/Crystal Maiden_2_Level Frostbite",
    messageTime: 45,
    textMessage:
      "Consider skilling Frostbite on level 2 for a kill attempt if you have enough mana for both active spells.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_frostbite" },
  },
  {
    category: "OwnHero",
    hero: "Crystal Maiden",
    audioFile: "ownHero/Crystal Maiden_3_Frostbite creeps",
    messageTimes: [2 * 60, 8 * 60],
    textMessage:
      "Frostbite lasts longer on the creeps. Use it to farm big neutral creeps or opponents' summons.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_frostbite" },
  },
  {
    category: "OwnHero",
    hero: "Crystal Maiden",
    audioFile: "ownHero/Crystal Maiden_4_Vision",
    messageTime: 5 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Crystal Nova provides vision so you can use it to scout pillars for wards and Roshpit for example.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_crystal_nova" },
  },
  {
    category: "OwnHero",
    hero: "Crystal Maiden",
    audioFile: "ownHero/Crystal Maiden_5_Skip ulty",
    messageTime: 8 * 60 + 15,
    textMessage:
      "It is hard to land an impactful Freezing Field and it costs a lot of mana so you might want to delay skilling it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_freezing_field" },
  },
  {
    category: "OwnHero",
    hero: "Crystal Maiden",
    audioFile: "ownHero/Crystal Maiden_6_Avoid showing",
    messageTime: 10 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid showing yourself at the start of the fight. Keep distance and spam Crystal Nova,Frostbite, and use items.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Crystal Maiden",
    audioFile: "ownHero/Crystal Maiden_7_Dont ulty",
    messageTime: 16 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Don't rush with using Freezing Field in fights unless you can support it with Black King Bar and Blink.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_freezing_field" },
  },

  {
    category: "EnemyHero",
    hero: "Crystal Maiden",
    audioFile: "enemyHero/Crystal Maiden_1_Frostbite",
    messageTime: -90,
    textMessage:
      "Crystal Maiden counters heroes that don't like to be rooted such as Ember Spirit, Void Spirit and Storm Spirit. Note that Frostbite is long-lasting and has a short cooldown.",
    chatMessage:
      "Crystal Maiden counters heroes that don't like to be rooted, e.g. Ember Spirit, Void Spirit and Storm Spirit",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Crystal Maiden",
    audioFile: "enemyHero/Crystal Maiden_2_Weak hero",
    messageTime: -15,
    textMessage:
      "Crystal Maiden is a vulnerable hero and one of the easiest to kill during the laning phase",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Crystal Maiden",
    audioFile: "enemyHero/Crystal Maiden_3_Crystal nova",
    messageTime: 20,
    textMessage:
      "Play on different sides of the lane with your coleague against Crystal Maiden such that you don't get hit both by Crystal Nova",
    chatMessage:
      "Play on different sides of the lane against Crystal Maiden such that you don't get hit both by Crystal Nova",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Crystal Maiden",
    audioFile: "enemyHero/Crystal Maiden_4_Lane kills",
    messageTime: 1 * 60 + 10,
    textMessage:
      "Use moments when Crystal Maiden is away from her laning partner to land a kill on her, for example when she's pulling. Keeping her on low levels means that her team won't have high levels of Arcane Aura",
    chatMessage:
      "Try to land a kill on Crystal Maiden when she is away from her laning partner, e.g. when she's pulling",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Crystal Maiden",
    audioFile: "enemyHero/Crystal Maiden_5_Freezing field",
    messageTimes: [17 * 60 + 15, 27 * 60 + 15, 37 * 60 + 15, 47 * 60 + 17],
    textMessage:
      "Look to disrupt Chrystal Maiden's Freezing Field channeling in fights. She will try to protect herself with Glimmer Cape or BKB",
    chatMessage:
      "Disrupt Chrystal Maiden's Freezing Field channeling in fights. She might use with Glimmer Cape or BKB",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Crystal Maiden",
    audioFile: "enemyHero/Crystal Maiden_6_Attack speed",
    messageTime: 30 * 60 + 30,
    textMessage:
      "Crystal Maiden's level 20 attack speed talent is good against specific heroes or abilities such as Supernova, Tombstone and Will-o-Wisp",
    chatMessage:
      "Crystal Maiden's level 20 attack speed talent is good against heroes or abilities such as Supernova",
    audience: [Audience.ALL],
  },

  // 21. Dark Seer | 01.03.2021
  {
    category: "OwnHero",
    hero: "Dark Seer",
    audioFile: "ownHero/Dark Seer_1_Double shell",
    messageTime: -10,
    textMessage:
      "Double Ion Shell the first wave and make sure opponents don't deny many creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_seer_ion_shell" },
  },
  {
    category: "OwnHero",
    hero: "Dark Seer",
    audioFile: "ownHero/Dark Seer_2_Push pull",
    messageTime: 50,
    textMessage:
      "Execute push and pull strategy. Push the lane with shells and pull the big camp.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT_SOFT],
    image: { type: "ability", name: "dark_seer_ion_shell" },
  },
  {
    category: "OwnHero",
    hero: "Dark Seer",
    audioFile: "ownHero/Dark Seer_3_Creepskip",
    messageTimes: [4 * 60 + 50, 6 * 60 + 50],
    textMessage:
      "If you can't pressure on the lane consider creepskipping and farming neutral camps nearby.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT_SOFT],
    image: { type: "ability", name: "dark_seer_ion_shell" },
  },
  {
    category: "OwnHero",
    hero: "Dark Seer",
    audioFile: "ownHero/Dark Seer_4_Vacuum cliffs",
    messageTime: 8 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "If you are fighting close to pillar spots or cliffs, consider Vacuuming opponents on those.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_seer_vacuum" },
  },
  {
    category: "OwnHero",
    hero: "Dark Seer",
    audioFile: "ownHero/Dark Seer_5_Push dangerous",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage: "Push out dangerous lanes with Ion Shells.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_seer_ion_shell" },
  },
  {
    category: "OwnHero",
    hero: "Dark Seer",
    audioFile: "ownHero/Dark Seer_6_Combo",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Keep your melee cores shelled and wait for a moment when opponents are clumped up to do your combo.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_seer_wall_of_replica" },
  },
  {
    category: "OwnHero",
    hero: "Dark Seer",
    audioFile: "ownHero/Dark Seer_7_Priorities",
    messageTime: 12 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Prioritize using Wall of Replica and Normal Punch on heroes that have strong illusions or auras.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_seer_wall_of_replica" },
  },

  {
    category: "EnemyHero",
    hero: "Dark Seer",
    audioFile: "enemyHero/Dark Seer_1_Deny",
    messageTime: -60,
    textMessage:
      "Against Dark Seer, focus on denying creeps as Ion Shells are making them drop low.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Dark Seer",
    audioFile: "enemyHero/Dark Seer_2_Big camp",
    messageTime: -50,
    textMessage:
      "Dark Seer will push the lane in with Ion Shell and pull the big neutral camp. Block it or prevent it.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Dark Seer",
    audioFile: "enemyHero/Dark Seer_3_Clarity",
    messageTime: 30,
    textMessage:
      "Dark Seer relies on clarities to maintain Ion Shell spam. Look to cancel them.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Dark Seer",
    audioFile: "enemyHero/Dark Seer_4_Surge cd",
    messageTime: 50,
    textMessage: "When Dark Seer's Surge is on cooldown he is vulnerable.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Dark Seer",
    audioFile: "enemyHero/Dark Seer_5_Bad items",
    messageTime: 12 * 60,
    textMessage:
      "Avoid buying Radiance and Assault Cuirass against Dark Seer as he can replicate these items with his ulti.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dark Seer",
    audioFile: "enemyHero/Dark Seer_6_Clump up",
    messageTimes: [15 * 60 + 10, 25 * 60 + 10, 35 * 60 + 10],
    textMessage:
      "Don't clump up in teamfights for Vacuum into Wall of Replica combination of Dark Seer.",
    audience: [Audience.ALL],
  },

  // 22. Dark Willow | 01.03.2021
  {
    category: "OwnHero",
    hero: "Dark Willow",
    audioFile: "ownHero/Dark Willow_1_Lasthit range",
    messageTime: 15,
    textMessage: "Consider using Shadow Realm to secure range creep lasthits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_willow_shadow_realm" },
  },
  {
    category: "OwnHero",
    hero: "Dark Willow",
    audioFile: "ownHero/Dark Willow_2_Shadow Realm dodge",
    messageTimes: [45, 8 * 60 + 45, 16 * 60 + 45],
    textMessage:
      "You can dodge ranged attacks and many spell projectiles with Shadow Realm.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_willow_shadow_realm" },
  },
  {
    category: "OwnHero",
    hero: "Dark Willow",
    audioFile: "ownHero/Dark Willow_3_In trouble",
    messageTimes: [90, 9 * 60 + 30, 17 * 60 + 30],
    textMessage:
      "If in trouble, you can potentially do Shadow Realm into teleport out play.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_willow_shadow_realm" },
  },
  {
    category: "OwnHero",
    hero: "Dark Willow",
    audioFile: "ownHero/Dark Willow_4_Pick off",
    messageTimes: [8 * 60, 14 * 60, 20 * 60],
    textMessage:
      "Dark Willow is great at picking off isolated heroes with no escape or dispel due to insane Bedlam damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_willow_bedlam" },
  },
  {
    category: "OwnHero",
    hero: "Dark Willow",
    audioFile: "ownHero/Dark Willow_5_Teamfights",
    messageTimes: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "In teamfights, focus on getting off Terrorize, Bramble Maze and Cursed Crown timely and then burst an isolated target with Bedlam.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Dark Willow",
    audioFile: "ownHero/Dark Willow_6_Carry",
    messageTimes: [20 * 60 + 15, 24 * 60 + 15],
    textMessage:
      "If the game opens up for you, you can transition into right-clicker with Aghanim's Scepter and attack speed talent.",
    audience: [Audience.ROLE_SUPPORT],
  },

  {
    category: "EnemyHero",
    hero: "Dark Willow",
    audioFile: "enemyHero/Dark Willow_1_Squishy",
    messageTime: -60,
    textMessage: "Dark Willow is squishy at the start and doesn't trade well.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Dark Willow",
    audioFile: "enemyHero/Dark Willow_2_Cursed Crown",
    messageTime: 30,
    textMessage:
      "Under effect of Cursed Crown make sure not to get too close to your allies or they will be stunned too.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dark Willow",
    audioFile: "enemyHero/Dark Willow_3_Bedlam",
    messageTime: 8 * 60,
    textMessage:
      "Bedlam does a lot of damage to a single target. Share the damage with allied units.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dark Willow",
    audioFile: "enemyHero/Dark Willow_4_Dispel items",
    messageTime: 12 * 60,
    textMessage:
      "Items that provide dispels are generally good against Cursed Crown, Bramble Maze and Terrorize.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dark Willow",
    audioFile: "enemyHero/Dark Willow_5_Black King Bar",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Black King Bar is great against Dark Willow's disables and magical damage output.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dark Willow",
    audioFile: "enemyHero/Dark Willow_6_Clump up",
    messageTimes: [12 * 60 + 20, 22 * 60 + 10, 32 * 60 + 10],
    textMessage: "Don't clump up in teamfights for Terrorize and Cursed Crown.",
    audience: [Audience.ALL],
  },

  // 22.5. Dawnbreaker | 11.04.2021  |patch 7.29| ALL MESSAGES ARE NEW
  {
    category: "OwnHero",
    hero: "Dawnbreaker",
    audioFile: "ownHero/Dawnbreaker_1_Strong laner",
    messageTime: 15,
    textMessage:
      "Dawnbreaker is typically a strong laner. Play aggressively and jump opponents out of position.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Dawnbreaker",
    audioFile: "ownHero/Dawnbreaker_2_Save ally",
    messageTime: 6 * 60 + 45,
    repeatTime: 8 * 60,
    textMessage:
      "Keep an eye on the map to save an ally in trouble with Solar Guardian and turn the fight around.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dawnbreaker_solar_guardian" },
  },
  {
    category: "OwnHero",
    hero: "Dawnbreaker",
    audioFile: "ownHero/Dawnbreaker_3_Clear safely",
    messageTimes: [7 * 60 + 45, 14 * 60 + 45],
    textMessage:
      "You can clear waves from safe distance by using Celestial Hammer.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dawnbreaker_celestial_hammer" },
  },
  {
    category: "OwnHero",
    hero: "Dawnbreaker",
    audioFile: "ownHero/Dawnbreaker_4_Play separately",
    messageTime: 10 * 60 + 15,
    repeatTime: 8 * 60 + 15,
    textMessage:
      "Play seperately from your team, push out lanes and mask team's smoke moves as you can connect to your team with ulty.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dawnbreaker_solar_guardian" },
  },

  {
    category: "EnemyHero",
    hero: "Dawnbreaker",
    audioFile: "enemyHero/Dawnbreaker_1_Spirit vessel",
    messageTime: -60,
    textMessage: "Someone buy a Spirit Vessel to counter Dawnbreaker's healing",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dawnbreaker",
    audioFile: "enemyHero/Dawnbreaker_2_Keep distance",
    messageTime: -50,
    textMessage:
      "Keep distance from Dawnbreaker so she can't use Starbreaker too often.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Dawnbreaker",
    audioFile: "enemyHero/Dawnbreaker_3_Solar Guardian",
    messageTime: 8 * 60,
    textMessage:
      "Avoid diving enemy heroes as Dawnbreaker can assist them from anywhere on the map with Solar Guardian.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dawnbreaker",
    audioFile: "enemyHero/Dawnbreaker_4_Clump up",
    messageTimes: [
      10 * 60 + 10,
      20 * 60 + 10,
      30 * 60 + 10,
      40 * 60 + 10,
      50 * 60 + 10,
    ],
    textMessage:
      "Avoid clumping up against Dawnbreaker's AoE damage and disabling spells.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dawnbreaker",
    audioFile: "enemyHero/Dawnbreaker_5_Antihealing items",
    messageTime: 12 * 60,
    textMessage:
      "Items that reduce healing are great against Dawnbreaker's Luminosity and Solar Guardian.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dawnbreaker",
    audioFile: "enemyHero/Dawnbreaker_6_Break",
    messageTime: 12 * 60 + 10,
    textMessage: "Break effects remove Dawnbreaker's Luminosity.",
    audience: [Audience.ALL],
  },

  // 23. Dazzle | 01.03.2021
  {
    category: "OwnHero",
    hero: "Dazzle",
    audioFile: "ownHero/Dazzle_1_Poison touch",
    messageTime: -15,
    textMessage:
      "Use Poison Touch only if you can follow up with few right-clicks on poisoned hero.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dazzle_poison_touch" },
  },
  {
    category: "OwnHero",
    hero: "Dazzle",
    audioFile: "ownHero/Dazzle_2_Heal surrounded",
    messageTime: 75,
    textMessage:
      "If an opponent is surrounded by allied units, you can Shadow Wave those units and deal huge damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dazzle_shadow_wave" },
  },
  {
    category: "OwnHero",
    hero: "Dazzle",
    audioFile: "ownHero/Dazzle_3_Grave heal",
    messageTimes: [3 * 60, 9 * 60, 15 * 60],
    textMessage:
      "Use Shadow Wave and other sources of healing as Shallow Grave is about to expire.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dazzle_shallow_grave" },
  },
  {
    category: "OwnHero",
    hero: "Dazzle",
    audioFile: "ownHero/Dazzle_4_Grave tp",
    messageTimes: [3 * 60 + 15, 9 * 60 + 15, 15 * 60 + 15],
    textMessage:
      "When in trouble, you can attempt to Shallow Grave yourself and teleport out.",
    audience: [Audience.ALL],
    image: { type: "item", name: "tpscroll" },
  },
  {
    category: "OwnHero",
    hero: "Dazzle",
    audioFile: "ownHero/Dazzle_5_Activatable items",
    messageTimes: [6 * 60 + 15, 14 * 60 + 15, 22 * 60 + 15],
    textMessage:
      "Prioritize purchasing and using activatable items and neutral items to take advantage of Aghanims Scepter.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dazzle_bad_juju" },
  },
  {
    category: "OwnHero",
    hero: "Dazzle",
    audioFile: "ownHero/Dazzle_6_Dont show",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing yourself to opponents at the start of the fight. You are number 1 priority for them to kill.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Dazzle",
    audioFile: "ownHero/Dazzle_7_Juju stacking",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Percentage cooldown reductions from items or runes don't stack with Bad Juju. Higher value prevails.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Dazzle",
    audioFile: "ownHero/Dazzle_8_Aghanims Shard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Purchase Aghanim's Shard at 15 minute mark as it provides extra control and kills off basic illusions.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Dazzle",
    audioFile: "enemyHero/Dazzle_1_Poison touch",
    messageTime: -60,
    textMessage:
      "Avoid being hit by enemy heroes while under effect of Dazzle's Poison Touch.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Dazzle",
    audioFile: "enemyHero/Dazzle_2_Shadow wave",
    messageTime: -50,
    textMessage:
      "Shadow Wave does a lot of damage if you are surrounded by enemy units.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Dazzle",
    audioFile: "enemyHero/Dazzle_3_Spirit vessel",
    messageTime: -40,
    textMessage:
      "Someone buy a Spirit Vessel to offset healing from Dazzle and to finish off the Shallow Graved hero.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dazzle",
    audioFile: "enemyHero/Dazzle_4_Focus",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Look to focus Dazzle in teamfights as he is squishy but provides a lot of sustain if left unchecked.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dazzle",
    audioFile: "enemyHero/Dazzle_5_Gap closing items",
    messageTime: 12 * 60,
    textMessage: "Buy gap closing items to get on top of Dazzle.",
    audience: [Audience.ALL],
  },

  // 24. Death Prophet | 01.03.2021
  {
    category: "OwnHero",
    hero: "Death Prophet",
    audioFile: "ownHero/Death Prophet_1_Secure ranged",
    messageTime: 15 * 60,
    textMessage:
      "Secure range creep lasthits with Crypt Swarm and possibly hit opponents as well.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "death_prophet_carrion_swarm" },
  },
  {
    category: "OwnHero",
    hero: "Death Prophet",
    audioFile: "ownHero/Death Prophet_2_Survivability siphons",
    messageTime: 60,
    repeatTime: 10 * 60,
    textMessage:
      "Death Prophet's survivability is related to Spirit Siphon usage. Siphon as many units as possible for decent duration.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "death_prophet_spirit_siphon" },
  },
  {
    category: "OwnHero",
    hero: "Death Prophet",
    audioFile: "ownHero/Death Prophet_3_Early pressure",
    messageTimes: [6 * 60, 11 * 60, 16 * 60],
    textMessage:
      "Death Prophet excels at taking towers and Roshan early with Exorcism. Call for team to group up around you.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "death_prophet_exorcism" },
  },
  {
    category: "OwnHero",
    hero: "Death Prophet",
    audioFile: "ownHero/Death Prophet_4_Exorcism down",
    messageTime: 6 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid playing aggressively when Exorcism is down. Push out waves and prepare for the next move.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "death_prophet_exorcism" },
  },
  {
    category: "OwnHero",
    hero: "Death Prophet",
    audioFile: "ownHero/Death Prophet_5_Itemize tank",
    messageTime: 8 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Itemize for survivability and to stay in the middle of the fight. Exorcism and Spirit Siphons will do the damage.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Death Prophet",
    audioFile: "ownHero/Death Prophet_6_Cyclone play",
    messageTimes: [10 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "When in trouble, you can Spirit Siphon opponents and Eul's yourself. You are still being healed in the air.",
    audience: [Audience.ALL],
    image: { type: "item", name: "cyclone" },
  },
  {
    category: "OwnHero",
    hero: "Death Prophet",
    audioFile: "ownHero/Death Prophet_7_Heal reductions",
    messageTimes: [10 * 60 + 30, 15 * 60 + 30, 20 * 60 + 30],
    textMessage:
      "Healing reductions are great problem for Death Prophet. You can itemize against some of them.",
    audience: [Audience.ALL],
    image: { type: "item", name: "spirit_vessel" },
  },

  {
    category: "EnemyHero",
    hero: "Death Prophet",
    audioFile: "enemyHero/Death Prophet_1_Burst",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "When Death Prophet has Exorcism on, either burst her down or run away.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Death Prophet",
    audioFile: "enemyHero/Death Prophet_2_Defend towers",
    messageTimes: [8 * 60 + 10, 18 * 60 + 10, 28 * 60 + 10],
    textMessage:
      "Look to defend towers against Death Prophet and fight her when Exorcism ends.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Death Prophet",
    audioFile: "enemyHero/Death Prophet_3_Antihealing items",
    messageTime: 12 * 60,
    textMessage:
      "Items that reduce healing are good against Death Prophet's Spirit Siphons and Exorcism.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Death Prophet",
    audioFile: "enemyHero/Death Prophet_4_Armor items",
    messageTime: 12 * 60 + 10,
    textMessage: "Armor items are good against physical damage of Exorcism.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Death Prophet",
    audioFile: "enemyHero/Death Prophet_5_Dispel items",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Items that provide dispels are good against Death Prophet's Silence.",
    audience: [Audience.ALL],
  },

  // 25. Disruptor | Earlier work
  {
    category: "OwnHero",
    hero: "Disruptor",
    audioFile: "ownHero/Disruptor_1_Harassing",
    messageTime: -15,
    textMessage:
      "Make use of Thunder Strike's movement speed slow and vision over opponent to follow up with few right-clicks.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "disruptor_thunder_strike" },
  },
  {
    category: "OwnHero",
    hero: "Disruptor",
    audioFile: "ownHero/Disruptor_2_Glimpse back",
    messageTime: 75,
    repeatTime: 10 * 60,
    textMessage:
      "Whenever you see or expect an opponent to teleport in, be ready to Glimpse him back.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "disruptor_glimpse" },
  },
  {
    category: "OwnHero",
    hero: "Disruptor",
    audioFile: "ownHero/Disruptor_3_Field vision",
    messageTimes: [2 * 60 + 15, 9 * 60 + 15, 16 * 60 + 15],
    textMessage:
      "Kinetic Field provides vision in the middle of it. You can use it to scout pillars for wards or Roshan pit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "disruptor_kinetic_field" },
  },
  {
    category: "OwnHero",
    hero: "Disruptor",
    audioFile: "ownHero/Disruptor_4_Glimpse illusion",
    messageTimes: [8 * 60 + 15, 15 * 60 + 15, 22 * 60 + 15],
    textMessage: "Glimpe instantly destroys basic illusions.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "disruptor_glimpse" },
  },
  {
    category: "OwnHero",
    hero: "Disruptor",
    audioFile: "ownHero/Disruptor_5_Aghanims Shard",
    messageTime: 14 * 60 + 50,
    textMessage:
      `Pick up Aghanim's Shard as soon as possible to help your team move faster around enemy targets.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Disruptor",
    audioFile: "ownHero/Disruptor_6_Aghanims Scepter",
    messageTime: 25 * 60,
    repeatTime: 8 * 60,
    textMessage:
      "In late game, Aghanim's Scepter can turn your Static Storm into a win condition.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Disruptor",
    audioFile: "enemyHero/Disruptor_1_Harassing tools",
    messageTime: -10,
    textMessage:
      "Disruptor's main harassing tools is Thunder Strike. Heroes with dispel abilities are strong against him",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Disruptor",
    audioFile: "enemyHero/Disruptor_2_Thunder strike",
    messageTime: 30,
    textMessage:
      "You can use Disruptor's Thunder Strike AOE damage by walking into your creep wave and damaging it",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Disruptor",
    audioFile: "enemyHero/Disruptor_3_Teleport",
    messageTimes: [1 * 60, 8 * 60 + 45],
    textMessage:
      "Don't teleport in plain sight around Disruptor as you might get Glimpsed back to where you came from",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Disruptor",
    audioFile: "enemyHero/Disruptor_4_Glimpse 1",
    messageTimes: [11 * 60, 21 * 60],
    textMessage:
      "Hide behind trees or run to highground before teleporting or escaping, so you don't get caught by Glimpse.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Disruptor",
    audioFile: "enemyHero/Disruptor_5_Glimpse 2",
    messageTime: 16 * 60,
    textMessage:
      "Disruptor's Glimpse can be dodged by certain spells and items such as BKB or Manta Style",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Disruptor",
    audioFile: "enemyHero/Disruptor_6_BKB",
    messageTimes: [33 * 60, 53 * 60],
    textMessage:
      "All of Disruptor's spells are countered by Black King Bar until he has Aghanim's Scepter. Once he has it, you won't be able to activate Black King Bar under Static Storm as all items are muted",
    chatMessage:
      "Disruptor's spells are countered by BKB until he has Aghs, as all items are muted under Static Storm",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Disruptor",
    audioFile: "enemyHero/Disruptor_7_Clump up",
    messageTimes: [26 * 60, 46 * 60],
    textMessage:
      "Don't clump up because of Disruptor's Kinetic Field and Static Storm combination. It takes 1.2 seconds for Kinetic Field to form so you have a small window to get out. You can't Force Staff out of it and many other mobility spells are not working",
    chatMessage:
      "Don't clump up because of Disruptor's Kinetic Field and Static Storm combination",
    audience: [Audience.ALL],
  },

  // 26. Doom | 01.03.2021
  {
    category: "OwnHero",
    hero: "Doom",
    audioFile: "ownHero/Doom_1_Devour ranged",
    messageTime: -60,
    textMessage:
      "Consider going behind the opponents t1 or t2 tower on the first wave to devour ranged creep even earlier.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "doom_bringer_devour" },
  },
  {
    category: "OwnHero",
    hero: "Doom",
    audioFile: "ownHero/Doom_2_Dont die",
    messageTime: 15,
    textMessage:
      "Bonus gold from Devour is granted at the end of the Devour cycle and you will lose it if you die.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "doom_bringer_devour" },
  },
  {
    category: "OwnHero",
    hero: "Doom",
    audioFile: "ownHero/Doom_3_Blink",
    messageTime: 11 * 60,
    textMessage:
      "Once you get Blink Dagger, try to make use of it immediately before opponent see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Doom",
    audioFile: "ownHero/Doom_4_Centaur",
    messageTime: 11 * 60 + 15,
    textMessage:
      "Usually you want to devour Centaur Conqueror and obtain War Stomp to disable opponents after blink and cast Doom.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "doom_bringer_devour" },
  },
  {
    category: "OwnHero",
    hero: "Doom",
    audioFile: "ownHero/Doom_5_Dont show",
    messageTime: 12 * 60 + 45,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid showing yourself at the start of the fight and wait for your Doom target to show.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "doom_bringer_doom" },
  },
  {
    category: "OwnHero",
    hero: "Doom",
    audioFile: "ownHero/Doom_6_Doom cd",
    messageTime: 13 * 60,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid fighting while Doom is on cooldown. Push out lanes or play defensively.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "doom_bringer_doom" },
  },
  {
    category: "OwnHero",
    hero: "Doom",
    audioFile: "ownHero/Doom_6_Doom cd",
    messageTime: 13 * 60,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid fighting while Doom is on cooldown. Push out lanes or play defensively.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "doom_bringer_doom" },
  },
  {
    category: "OwnHero",
    hero: "Doom",
    audioFile: "ownHero/Doom_7_Doom block",
    messageTime: 13 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Check opponents' inventories for Linken's Spheres and Lotus Orbs. Be careful not to drop Doom on those.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "doom_bringer_doom" },
  },

  // {category: "EnemyHero", hero: "Doom", audioFile: "enemyHero/Doom_1_Early pressure", messageTime: (-60), textMessage: "Doom is very slow and low armor hero. Pressure him early on.", audience: [Audience.IN_LANE]}, |patch 7.29| MESSAGE CHANGED
  {
    category: "EnemyHero",
    hero: "Doom",
    audioFile: "enemyHero/Doom_1_Early pressure",
    messageTime: -60,
    textMessage: "Doom is a weak laner at lower levels. Pressure him early on.",
    audience: [Audience.IN_LANE],
  },
  // {category: "EnemyHero", hero: "Doom", audioFile: "enemyHero/Doom_2_Armor reducing items", messageTime: (-50), textMessage: "Armor reducing items are great against Doom.", audience: [Audience.ALL]}, |patch 7.29| MESSAGE REMOVED
  {
    category: "EnemyHero",
    hero: "Doom",
    audioFile: "enemyHero/Doom_3_Armor items",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "The Doom spell has long cooldown. Look to play aggressively when it is down.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Doom",
    audioFile: "enemyHero/Doom_4_Antidoom items",
    messageTime: 12 * 60,
    textMessage:
      "Linken's Sphere, status resistance items and Lotus Orb are good at dealing with The Doom spell.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Doom",
    audioFile: "enemyHero/Doom_5_Aegis",
    messageTimes: [15 * 60 + 10, 25 * 60 + 10, 35 * 60 + 10],
    textMessage:
      "Acquiring Aegis for your core is a good way of dealing with The Doom spell. Look to kill Roshan.",
    audience: [Audience.ALL],
  },

  // 27. Dragon Knight | 01.03.2021
  {
    category: "OwnHero",
    hero: "Dragon Knight",
    audioFile: "ownHero/Dragon Knight_1_Lane spells",
    messageTime: 15,
    textMessage:
      "On a tough lane put more points in Dragon Blood, otherwise put more points in your active spells.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dragon_knight_dragon_blood" },
  },
  {
    category: "OwnHero",
    hero: "Dragon Knight",
    audioFile: "ownHero/Dragon Knight_2_Take towers",
    messageTime: 6 * 60,
    textMessage:
      "Dragon Knight is great at taking buildings down early due to Corrosive Breath and ability to tank tower shots.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dragon_knight_elder_dragon_form" },
  },
  {
    category: "OwnHero",
    hero: "Dragon Knight",
    audioFile: "ownHero/Dragon Knight_3_Blink",
    messageTime: 10 * 60,
    textMessage:
      "Once you get Blink Dagger, try to make use of it immediately before opponent see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Dragon Knight",
    audioFile: "ownHero/Dragon Knight_4_Follow up",
    messageTime: 10 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Make sure you have allies nearby when you initiate. Dragon Knight doesn't do much burst damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Dragon Knight",
    audioFile: "ownHero/Dragon Knight_5_Ulty cd",
    messageTime: 10 * 60 + 30,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid fighting while Dragon Form is on cooldown. Push out lanes or play defensively.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dragon_knight_elder_dragon_form" },
  },
  {
    category: "OwnHero",
    hero: "Dragon Knight",
    audioFile: "ownHero/Dragon Knight_6_Counter items",
    messageTime: 10 * 60 + 45,
    textMessage:
      "Break effects and healing reductions are big problem for Dragon Knight. Itemize against those.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dragon_knight_dragon_blood" },
  },

  {
    category: "EnemyHero",
    hero: "Dragon Knight",
    audioFile: "enemyHero/Dragon Knight_1_Spirit vessel",
    messageTime: -60,
    textMessage:
      "Someone should buy Spirit Vessel against Dragon Knight to deal high damage and offset his regeneration.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dragon Knight",
    audioFile: "enemyHero/Dragon Knight_2_Early pressure",
    messageTime: -50,
    textMessage:
      "Pressure Dragon Knight early on before he gets 2 or more points in Dragon Blood.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Dragon Knight",
    audioFile: "enemyHero/Dragon Knight_3_Defend towers",
    messageTimes: [8 * 60, 13 * 60, 18 * 60],
    textMessage:
      "Elder Dragon Form is really good at destroying towers. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dragon Knight",
    audioFile: "enemyHero/Dragon Knight_4_Blink shadow blade",
    messageTime: 12 * 60,
    textMessage:
      "Be aware of Dragon Knight's Blink Dagger or Shadow Blade timing.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dragon Knight",
    audioFile: "enemyHero/Dragon Knight_5_Dragon tail counters",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Linken's Sphere, status resistance and Lotus Orb are good against Dragon Tail.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Dragon Knight",
    audioFile: "enemyHero/Dragon Knight_6_Breaks",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Break effects remove Dragon Blood - a spell that makes Dragon Knight tanky.",
    audience: [Audience.ALL],
  },

  // 28. Drow Ranger | Earlier work
  {
    category: "OwnHero",
    hero: "Drow Ranger",
    audioFile: "ownHero/Drow Ranger_1_Frost Arrows",
    messageTime: 15,
    textMessage:
      "Use Frost Arrows frequently to harass as you don't pull aggro but also to secure lasthits with extra damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "drow_ranger_frost_arrows" },
  },
  {
    category: "OwnHero",
    hero: "Drow Ranger",
    audioFile: "ownHero/Drow Ranger_2_Multishot",
    messageTimes: [75, 7 * 60 + 15],
    textMessage:
      "Multishot does the most damage when used point blank as all the arrows will hit the target.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "drow_ranger_multishot" },
  },
  {
    category: "OwnHero",
    hero: "Drow Ranger",
    audioFile: "ownHero/Drow Ranger_3_Gust tp",
    messageTimes: [4 * 60, 9 * 60],
    textMessage: "When in trouble, you can potentially Gust and teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "drow_ranger_wave_of_silence" },
  },
  {
    category: "OwnHero",
    hero: "Drow Ranger",
    audioFile: "ownHero/Drow Ranger_4_Agility",
    messageTimes: [8 * 60, 14 * 60],
    textMessage:
      "Drow loves agility stat as it gets further increased by Marksmanship.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "drow_ranger_marksmanship" },
  },
  {
    category: "OwnHero",
    hero: "Drow Ranger",
    audioFile: "ownHero/Drow Ranger_5_Positioning",
    messageTime: 10 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Drow is all about positioning. Avoid showing yourself too early in the fight and maintain distance.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Drow Ranger",
    audioFile: "ownHero/Drow Ranger_5_Positioning",
    messageTimes: [12 * 60 + 15, 20 * 60 + 15],
    textMessage:
      "Avoid buying evasion and miss chance piercing items as Marksmanship already does that for you on proc.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "drow_ranger_marksmanship" },
  },

  {
    category: "EnemyHero",
    hero: "Drow Ranger",
    audioFile: "enemyHero/Drow Ranger_1_Harass",
    messageTime: 20,
    textMessage:
      "Drow Ranger is slow and has low armor. Look to harass her as much as you can on early levels.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Drow Ranger",
    audioFile: "enemyHero/Drow Ranger_2_Multishot",
    messageTimes: [1 * 60 + 20, 4 * 60 + 20],
    textMessage:
      "Avoid being in point target range of Drow Ranger when she starts channeling Multishot",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Drow Ranger",
    audioFile: "enemyHero/Drow Ranger_3_Area of effect",
    messageTimes: [6 * 60 + 30, 10 * 60 + 45],
    textMessage:
      "Drow Ranger's Gust and Multishot have cone shaped area of effect. If you are on top of her look to side step or run past or through her when she uses those spells",
    chatMessage:
      "When Drow Ranger uses Gust & Multishot and you are on top of her, try to step aside, run past or through her",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Drow Ranger",
    audioFile: "enemyHero/Drow Ranger_4_Gap closing",
    messageTime: 11 * 60 + 20,
    textMessage:
      "Gap closing items are good against Drow Ranger as she is a glass canon hero. Note that her Marksmanship is disabled when you are within 400 range of her",
    chatMessage:
      "Gap closing items are good against Drow Ranger as she is a glass canon hero",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Drow Ranger",
    audioFile: "enemyHero/Drow Ranger_5_Halberd",
    messageTime: 14 * 60 + 10,
    textMessage:
      "Halberd's ability is amazing against Drow Ranger as it disarms her for 5 seconds. Keep in mind that Marksmanship procs pierce through evasion (true strike)",
    chatMessage:
      "Halberd's ability is amazing against Drow Ranger as it disarms her for 5 seconds",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Drow Ranger",
    audioFile: "enemyHero/Drow Ranger_6_Team fights",
    messageTimes: [12 * 60 + 30, 22 * 60 + 30, 32 * 60 + 30, 42 * 60 + 30],
    textMessage:
      "Drow Ranger should be a priority target in team fights as her team loses Marksmanship aura when she dies",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Drow Ranger",
    audioFile: "enemyHero/Drow Ranger_7_Smoke",
    messageTimes: [18 * 60 + 15, 38 * 60 + 15, 58 * 60 + 15],
    textMessage: "Use Smoke, to wrap around Drow Ranger and kill her",
    audience: [Audience.ALL],
  },

  // 29. Earth Spirit | 01.03.2021
  {
    category: "OwnHero",
    hero: "Earth Spirit",
    audioFile: "ownHero/Earth Spirit_1_Observer",
    messageTime: -90,
    textMessage:
      "You can place Observer Wards on the map quickly, especially on mid, by using Rolling Boulder.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    hero: "Earth Spirit",
    audioFile: "ownHero/Earth Spirit_2_Destroy trees",
    messageTime: -60,
    textMessage:
      "First three abilities can destroy trees which can be useful against certain heroes.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Earth Spirit",
    audioFile: "ownHero/Earth Spirit_3_Creep equilibrium",
    messageTime: 15,
    textMessage:
      "The further the opponents are from their tower, the deadlier you are. You can roll-kick an opponent under the tower.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "earth_spirit_boulder_smash" },
  },
  {
    category: "OwnHero",
    hero: "Earth Spirit",
    audioFile: "ownHero/Earth Spirit_4_Hijack",
    messageTime: 30,
    textMessage:
      "Consider hijacking the second wave to establish creep equilibrium closer to your tower.",
    audience: [Audience.ROLE_SUPPORT_SOFT],
  },
  {
    category: "OwnHero",
    hero: "Earth Spirit",
    audioFile: "ownHero/Earth Spirit_5_Roll",
    messageTime: 45,
    textMessage:
      "Ideally roll from the fog when an opponent is somewhat stationary, for example when going for lasthit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "earth_spirit_rolling_boulder" },
  },
  {
    category: "OwnHero",
    hero: "Earth Spirit",
    audioFile: "ownHero/Earth Spirit_6_Secure mid",
    messageTimes: [5 * 60 + 30, 7 * 60 + 30, 9 * 60 + 30],
    textMessage:
      "Secure active runes and gank midlane if the situation allows.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Earth Spirit",
    audioFile: "ownHero/Earth Spirit_7_Existing stones",
    messageTimes: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Make use of existing stones in the fights as much as you can. Avoid overusing Stone Remnants.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "earth_spirit_stone_caller" },
  },
  {
    category: "OwnHero",
    hero: "Earth Spirit",
    audioFile: "ownHero/Earth Spirit_8_Setup kills",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Earth Spirit is great at setting up kills. Communicate with your teammates as you will need follow up damage.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Earth Spirit",
    audioFile: "ownHero/Earth Spirit_9_Aghanims Shard",
    messageTime: 14 * 60 + 50,
    textMessage:
      `Pick up Aghanim's Shard at minute 15 as it is a big quality of life improvent among other things.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Earth Spirit",
    audioFile: "enemyHero/Earth Spirit_1_Observer",
    messageTime: -60,
    textMessage:
      "Bring an Observer Ward to keep an eye on Earth Spirit's aggressive movements and dodge Rolling Boulders.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Earth Spirit",
    audioFile: "enemyHero/Earth Spirit_2_Kick",
    messageTime: 30,
    textMessage:
      "Be careful when playing at opponent's tower as Earth Spirit can roll and kick you under the tower.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Earth Spirit",
    audioFile: "enemyHero/Earth Spirit_3_Roam",
    messageTimes: [40, 3 * 60 + 30, 5 * 60 + 30],
    textMessage:
      "Earth Spirit tends to roam a lot. Keep track of his movements and have teleport ready.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Earth Spirit",
    audioFile: "enemyHero/Earth Spirit_4_Antimagic items",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance and spell imunity items are great against Earth Spirit's magical damage and disables.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Earth Spirit",
    audioFile: "enemyHero/Earth Spirit_5_Dispel items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Items that provide dispels are great at removing Geomagnetic Grip silence and Magnetize.",
    audience: [Audience.ALL],
  },

  // 30. Earthshaker | Earlier work
  {
    category: "OwnHero",
    hero: "Earthshaker",
    audioFile: "ownHero/Earthshaker_1_Fissure block",
    messageTime: -20,
    textMessage:
      "Consider Fissure blocking the first wave to have better creep equilibrium.",
    audience: [Audience.ROLE_SUPPORT_SOFT],
    image: { type: "ability", name: "earthshaker_fissure" },
  },
  {
    category: "OwnHero",
    hero: "Earthshaker",
    audioFile: "ownHero/Earthshaker_2_Enchant Totem",
    messageTime: 75,
    textMessage:
      "Use Enchant Totem to harass opponents or secure creep lasthits, especially ranged ones.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "earthshaker_enchant_totem" },
  },
  {
    category: "OwnHero",
    hero: "Earthshaker",
    audioFile: "ownHero/Earthshaker_3_Farm blink",
    messageTime: 9 * 60,
    textMessage:
      "At the end of the laning stage, find a lane for yourself to farm a Blink Dagger and catch up with levels.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Earthshaker",
    audioFile: "ownHero/Earthshaker_4_Blink",
    messageTime: 10 * 60 + 45,
    textMessage:
      "Once you get Blink Dagger, try to make use of it immediately before opponent see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Earthshaker",
    audioFile: "ownHero/Earthshaker_5_Forget you",
    messageTime: 12 * 60,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid showing yourself so the opponents forget about you and clump up, and your dagger doesn't get canceled.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Earthshaker",
    audioFile: "ownHero/Earthshaker_6_Fissure split",
    messageTime: 12 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "In the fights, split the opponents with Fissure into two parts or isolate an opponent from the rest.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "earthshaker_fissure" },
  },

  {
    category: "EnemyHero",
    hero: "Earthshaker",
    audioFile: "enemyHero/Earthshaker_1_Fissure block",
    messageTime: 20,
    textMessage:
      "If Earthsaker is blocking the first wave with fissure, look to pull back the lane as soon as possible",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Earthshaker",
    audioFile: "enemyHero/Earthshaker_2_Fissure kill",
    messageTimes: [45, 3 * 60 + 15],
    textMessage:
      "Earthshaker uses fissure to block off heroes and land kills. Be mindful about your positioning",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Earthshaker",
    audioFile: "enemyHero/Earthshaker_3_Dagger 1",
    messageTime: 10 * 60 + 15,
    textMessage:
      "Keep checking Earthshaker to see if he has Dagger yet. Don't let him surprise you with multi-hero Echo Slam",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Earthshaker",
    audioFile: "enemyHero/Earthshaker_4_Dagger 2",
    messageTime: 13 * 60 + 30,
    textMessage:
      "Once Earthshaker has Dagger or Aghanim's Scepter control him in team fights",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Earthshaker",
    audioFile: "enemyHero/Earthshaker_5_Dagger 3",
    messageTime: 15 * 60 + 15,
    textMessage: "Earthshaker is like to have Dagger by now",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Earthshaker",
    audioFile: "enemyHero/Earthshaker_6_Clump up",
    messageTimes: [
      20 * 60 + 15,
      30 * 60 + 15,
      40 * 60 + 15,
      50 * 60 + 15,
      60 * 60 + 15,
    ],
    textMessage: "Don`t clump up or Earthshaker might kill you all",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Earthshaker",
    audioFile: "enemyHero/Earthshaker_7_Shadow blade",
    messageTimes: [22 * 60 + 45, 42 * 60 + 45],
    textMessage:
      "Earthshaker might also buy Shadow Blade. If he does, purchase detection",
    audience: [Audience.ALL],
  },

  // 31. Elder Titan | 02.03.2021
  {
    category: "OwnHero",
    hero: "Elder Titan",
    audioFile: "ownHero/Elder Titan_1_Unblock camps",
    messageTime: 15,
    textMessage:
      "Make sure to keep nearby camps unblocked as you want Astral Spirit to pass through neutral creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "elder_titan_ancestral_spirit" },
  },
  {
    category: "OwnHero",
    hero: "Elder Titan",
    audioFile: "ownHero/Elder Titan_2_Creep equilibrium",
    messageTime: 30,
    textMessage:
      "Keep creep equilibrium close to your tower to have more distance to run the enemies down under Astral Spirit buff.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "elder_titan_ancestral_spirit" },
  },
  {
    category: "OwnHero",
    hero: "Elder Titan",
    audioFile: "ownHero/Elder Titan_3_Natural Order duality",
    messageTimes: [90, 5 * 60 + 30],
    textMessage:
      "Natural Order around Astral Spirit reduces magic resistance while around the hero there's armor reduction.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "elder_titan_natural_order" },
  },
  {
    category: "OwnHero",
    hero: "Elder Titan",
    audioFile: "ownHero/Elder Titan_4_Natural Order hero",
    messageTimes: [105, 5 * 60 + 45],
    textMessage:
      "When there's no Astral Spirit out, both Natural Order's magical and armor reduction applies around your hero.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "elder_titan_natural_order" },
  },
  {
    category: "OwnHero",
    hero: "Elder Titan",
    audioFile: "ownHero/Elder Titan_5_Spirits movement speed",
    messageTimes: [2 * 60, 12 * 60],
    textMessage:
      "Astral Spirit's movement speed is equal to your hero's at Astral Spirit cast, e.g. pop Phase Boots before casting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "elder_titan_ancestral_spirit" },
  },
/*   {
    category: "OwnHero",
    hero: "Elder Titan",
    audioFile: "ownHero/Elder Titan_6_Spirit scout",
    messageTimes: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Astral Spirit's movement speed is equal to your hero's at Astral Spirit cast, e.g. pop Phase Boots before casting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "elder_titan_ancestral_spirit" },
  }, */
  {
    category: "OwnHero",
    hero: "Elder Titan",
    audioFile: "ownHero/Elder Titan_7_Combo",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "When opponents clump up, cast Astral Spirit and channel Echo Stomp followed by Earthsplitter.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Elder Titan",
    audioFile: "ownHero/Elder Titan_8_Aghanims Scepter",
    messageTime: 18 * 60 + 45,
    textMessage:
      "Once you get hold of Aghanim's Scepter, you can enter the fights and right-click more easily.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Elder Titan",
    audioFile: "enemyHero/Elder Titan_1_Astral spirit 1",
    messageTime: -60,
    textMessage:
      "Avoid being hit by Elder Titan's Astral Spirit and consider blocking a pull camp.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Elder Titan",
    audioFile: "enemyHero/Elder Titan_2_Astral spirit 2",
    messageTime: -50,
    textMessage:
      "Avoid trading with Elder Titan when the Astral Spirit returns to him.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Elder Titan",
    audioFile: "enemyHero/Elder Titan_3_Clump up",
    messageTimes: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Echo Stomp into Earth Splitter combo.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Elder Titan",
    audioFile: "enemyHero/Elder Titan_4_Natural order",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Buy armor items, magic barrier giving items and Black King Bar against Elder Titan's Natural Order.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Elder Titan",
    audioFile: "enemyHero/Elder Titan_5_Astral spirit dispel",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Astral Spirit buff on Elder Titan can be dispelled so items and spells that dispel Elder Titan are good.",
    audience: [Audience.ALL],
  },

  // 32. Ember Spirit | 02.03.2021
  {
    category: "OwnHero",
    hero: "Ember Spirit",
    audioFile: "ownHero/Ember Spirit_1_Dodge",
    messageTime: -15,
    textMessage:
      "You can dodge many spells and ranged attacks with Slight of Fist or by activating Remnants.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ember_spirit_sleight_of_fist" },
  },
  {
    category: "OwnHero",
    hero: "Ember Spirit",
    audioFile: "ownHero/Ember Spirit_2_Control runes",
    messageTime: 5 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Active rune control is important for Ember Spirit's game. Keep checking for those throughout the game.",
    audience: [Audience.ALL],
    image: { type: "rune", name: "arcane" },
  },
  {
    category: "OwnHero",
    hero: "Ember Spirit",
    audioFile: "ownHero/Ember Spirit_3_Sleight remnants",
    messageTimes: [5 * 60 + 45, 15 * 60 + 45],
    textMessage:
      "You can drop and activate Fire Remnants while Slight of Fisting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ember_spirit_fire_remnant" },
  },
  {
    category: "OwnHero",
    hero: "Ember Spirit",
    audioFile: "ownHero/Ember Spirit_4_Base remnant",
    messageTimes: [6 * 60, 16 * 60],
    textMessage:
      "When low on health, you can leave the Fire Remnant behind, teleport to base and activate the remnant.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ember_spirit_fire_remnant" },
  },
  {
    category: "OwnHero",
    hero: "Ember Spirit",
    audioFile: "ownHero/Ember Spirit_5_Remnant spot",
    messageTime: 6 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When leaving remant behind, it is good to drop it in neutral camp or at the rune spot.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ember_spirit_fire_remnant" },
  },
  {
    category: "OwnHero",
    hero: "Ember Spirit",
    audioFile: "ownHero/Ember Spirit_6_Proc items",
    messageTime: 9 * 60,
    textMessage:
      "Items with proc chance are great for Ember Spirit as they proc frequently during Slight of Fist.",
    audience: [Audience.ALL],
    image: { type: "item", name: "maelstrom" },
  },
  {
    category: "OwnHero",
    hero: "Ember Spirit",
    audioFile: "ownHero/Ember Spirit_7_Backline",
    messageTimes: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Ember Spirit is great at penetrating into opponents' backline due to high mobility of Fire Remnants.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ember_spirit_fire_remnant" },
  },
  {
    category: "OwnHero",
    hero: "Ember Spirit",
    audioFile: "ownHero/Ember Spirit_8_Splitpush",
    messageTimes: [12 * 60 + 15, 20 * 60 + 15],
    textMessage:
      "Ember Spirit is great at splitpushing as he is elusive and can always have remnant left behind.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ember_spirit_fire_remnant" },
  },

  {
    category: "EnemyHero",
    hero: "Ember Spirit",
    audioFile: "enemyHero/Ember Spirit_1_Flame guard dispel",
    messageTime: -60,
    textMessage:
      "Flame Guard is most of Ember Spirit's damage early. Pop it with magical damage or dispel it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Ember Spirit",
    audioFile: "enemyHero/Ember Spirit_2_Rune control",
    messageTimes: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Make sure you are controlling power runes against Ember Spirit. He likes to bottle and gank with those.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Ember Spirit",
    audioFile: "enemyHero/Ember Spirit_3_Clump up",
    messageTimes: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Avoid clumping up against Sleight of Fist spam and triple Fire Remnant threat.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Ember Spirit",
    audioFile: "enemyHero/Ember Spirit_4_Disable items",
    messageTime: 12 * 60 + 10,
    textMessage: "Items that can root or stun elusive Ember Spirit are great.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Ember Spirit",
    audioFile: "enemyHero/Ember Spirit_5_Split push",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Ember Spirit is really good at split-pushing. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 33. Enchantress | 02.03.2021
  {
    category: "OwnHero",
    hero: "Enchantress",
    audioFile: "ownHero/Enchantress_1_Enchant",
    messageTime: -30,
    textMessage: "Enchant can take over opponents' summons and illusions.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enchantress_enchant" },
  },
  {
    category: "OwnHero",
    hero: "Enchantress",
    audioFile: "ownHero/Enchantress_2_Nuetrals",
    messageTime: 15,
    textMessage:
      "Make sure the nearby neutral camps are unblocked so you can use Enchant.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enchantress_enchant" },
  },
  {
    category: "OwnHero",
    hero: "Enchantress",
    audioFile: "ownHero/Enchantress_3_Tanky",
    messageTime: 8 * 60,
    textMessage:
      "Enchantress is tanky in early to midgame due to Untouchable and Nature's Attendants. Play aggressively.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enchantress_untouchable" },
  },
  {
    category: "OwnHero",
    hero: "Enchantress",
    audioFile: "ownHero/Enchantress_4_Enchanted creeps",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, you can push out sidelanes or scout with Enchanted creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enchantress_enchant" },
  },
/*   {
    category: "OwnHero",
    hero: "Enchantress",
    audioFile: "ownHero/Enchantress_4_Tanky",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, you can push out sidelanes or scout with Enchanted creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enchantress_enchant" },
  }, */
  {
    category: "OwnHero",
    hero: "Enchantress",
    audioFile: "ownHero/Enchantress_5_Tanky",
    messageTimes: [10 * 60 + 30, 20 * 60 + 30],
    textMessage:
      "Break effects and healing reduction are problematic but you can counter them with items or playstyle adjustments.",
    audience: [Audience.ALL],
    image: { type: "item", name: "silver_edge" },
  },

  {
    category: "EnemyHero",
    hero: "Enchantress",
    audioFile: "enemyHero/Enchantress_1_Summons",
    messageTime: -60,
    textMessage:
      "Avoid laning with summon based heroes against Enchantress or use summons carefully on the lane.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Enchantress",
    audioFile: "enemyHero/Enchantress_2_Block camps",
    messageTime: -50,
    textMessage:
      "Block off pull camps against Enchantress as she will control a neutral creep.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Enchantress",
    audioFile: "enemyHero/Enchantress_3_Enchant dispel",
    messageTime: -40,
    textMessage:
      "Enchant applies a basic dispel, so be careful with using buffing spells, items or runes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Enchantress",
    audioFile: "enemyHero/Enchantress_4_Impetus",
    messageTime: -30,
    textMessage:
      "If Impetus is flying your way, run towards Enchantress or stop moving to take less damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Enchantress",
    audioFile: "enemyHero/Enchantress_5_Split push",
    messageTime: 8 * 60,
    textMessage:
      "It is hard to kill Enchantress with right-clicks against Untouchable. Spells are better.",
    audience: [Audience.ALL],
  },

  // 34. Enigma | 02.03.2021
  {
    category: "OwnHero",
    hero: "Enigma",
    audioFile: "ownHero/Enigma_1_Block camps",
    messageTime: -90,
    textMessage:
      "Keep opponents' pull camps blocked as the lane will be pushing your way due to Demonic Conversion.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT],
    image: { type: "item", name: "ward_dispenser" },
  },
  {
    category: "OwnHero",
    hero: "Enigma",
    audioFile: "ownHero/Enigma_2_Sacrifice ranged",
    messageTime: -15,
    textMessage:
      `Ideally, use Demonic Conversion on your ranged creeps or catapults out of opponents' experience range.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "enigma_demonic_conversion" },
  },
  {
    category: "OwnHero",
    hero: "Enigma",
    audioFile: "ownHero/Enigma_3_Feed eidolons",
    messageTimes: [15, 2 * 60 + 15],
    textMessage:
      "Avoid feeding eidolons, make sure they multipy and use them to deny even more creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enigma_demonic_conversion" },
  },
  {
    category: "OwnHero",
    hero: "Enigma",
    audioFile: "ownHero/Enigma_4_Midnight Pulse",
    messageTimes: [3 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Midnight Pulse destroys trees which can be useful in certain scenarios and to make your farming paths straight.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enigma_midnight_pulse" },
  },
  {
    category: "OwnHero",
    hero: "Enigma",
    audioFile: "ownHero/Enigma_5_Blink Dagger",
    messageTime: 10 * 60 + 15,
    textMessage:
      "Once you get Blink Dagger, make use of it immediately before opponents can see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Enigma",
    audioFile: "ownHero/Enigma_6_Teamfight",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Be patient in teamfights, avoid showing too early and wait for opponets to clump up for your combo.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enigma_black_hole" },
  },
  {
    category: "OwnHero",
    hero: "Enigma",
    audioFile: "ownHero/Enigma_7_Push sidelanes",
    messageTime: 12 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, use eidolons to push out sidelanes safely.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enigma_demonic_conversion" },
  },

  {
    category: "EnemyHero",
    hero: "Enigma",
    audioFile: "enemyHero/Enigma_1_Eidolons",
    messageTime: -60,
    textMessage: "Try to kill eidolons before they multiply.",
    chatMessage: "Try to kill eidolons before they multiply.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Enigma",
    audioFile: "enemyHero/Enigma_2_Blink dagger",
    messageTime: 12 * 60,
    textMessage: "Be aware of Enigma's Blink Dagger timing.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Enigma",
    audioFile: "enemyHero/Enigma_3_Clump up",
    messageTimes: [12 * 60 + 10, 22 * 60 + 10, 32 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Blink Dagger into Black Hole combo.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Enigma",
    audioFile: "enemyHero/Enigma_4_Black hole cd",
    messageTimes: [12 * 60 + 20, 22 * 60 + 20, 32 * 60 + 20],
    textMessage:
      "Black Hole has a long cooldown. Look for a fight when it is on cooldown.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Enigma",
    audioFile: "enemyHero/Enigma_5_Stay back",
    messageTimes: [12 * 60 + 30, 22 * 60 + 30, 32 * 60 + 30],
    textMessage:
      "Stay back with one hero that can cancel Black Hole or save a core that is being Black Holed.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Enigma",
    audioFile: "enemyHero/Enigma_6_Aegis",
    messageTimes: [15 * 60, 25 * 60, 35 * 60],
    textMessage:
      "Having Aegis on a core hero is a protection against Black Hole. Kill Roshan on the first chance.",
    audience: [Audience.ALL],
  },

  // 35. Faceless Void | Earlier work
  {
    category: "OwnHero",
    hero: "Faceless Void",
    audioFile: "ownHero/Faceless_1_Time walk",
    messageTime: 15,
    textMessage:
      "Careful about using Time Walk aggressively on early levels as you leave yourself exposed for a while.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "faceless_void_time_walk" },
  },
  {
    category: "OwnHero",
    hero: "Faceless Void",
    audioFile: "ownHero/Faceless_2_Teleport in",
    messageTimes: [7 * 60, 11 * 60],
    textMessage:
      "Look around the map and be ready to teleport in and pick-off an opponent with Chronosphere.",
    audience: [Audience.ALL],
    image: { type: "item", name: "tpscroll" },
  },
  {
    category: "OwnHero",
    hero: "Faceless Void",
    audioFile: "ownHero/Faceless_3_Attack speed",
    messageTimes: [8 * 60, 14 * 60],
    textMessage:
      "Faceless Void is attack speed hungry hero as dps is closely related to frequency of Time Lock procs.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "faceless_void_time_lock" },
  },
  {
    category: "OwnHero",
    hero: "Faceless Void",
    audioFile: "ownHero/Faceless_4_Teamfights",
    messageTimes: [10 * 60 + 15, 20 * 60 + 15],
    textMessage:
      "In teamfights, look to trap as many opponents as possible in Chronosphere while leaving allies outside.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "faceless_void_chronosphere" },
  },
  {
    category: "OwnHero",
    hero: "Faceless Void",
    audioFile: "ownHero/Faceless_5_Chronosphere cd",
    messageTimes: [10 * 60 + 45, 20 * 60 + 45],
    textMessage:
      "Avoid playing aggressively when Chronosphere is on cooldown and push out lanes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "faceless_void_chronosphere" },
  },
  {
    category: "OwnHero",
    hero: "Faceless Void",
    audioFile: "ownHero/Faceless_6_Itemize differently",
    messageTimes: [11 * 60 + 15, 16 * 60 + 15],
    textMessage:
      "You can tank up and get mobility items if your teammates can provide plenty of damage in Chronosphere.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Faceless Void",
    audioFile: "enemyHero/Faceless_1_Time walk 1",
    messageTime: 20,
    textMessage:
      "Cause damage to Faceless Void over time, as he can't heal using Time Walk",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Faceless Void",
    audioFile: "enemyHero/Faceless_2_Time walk 2",
    messageTimes: [45, 3 * 60 + 30],
    textMessage: "Attack Faceless Void after he used Time Walk",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Faceless Void",
    audioFile: "enemyHero/Faceless_3_Chronosphere 1",
    messageTimes: [
      8 * 60 + 45,
      18 * 60 + 45,
      28 * 60 + 45,
      38 * 60 + 45,
      48 * 60 + 45,
    ],
    textMessage:
      "Faceless Void relies on Chronosphere to be effective and he will feel underwhelming if it is down. Make use of the long cooldown of his ultimate to force a fight or take an objective",
    chatMessage:
      "Faceless Void relies on Chronosphere. Make use of the long cooldown to force a fight or take an objective",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Faceless Void",
    audioFile: "enemyHero/Faceless_4_Chronosphere 2",
    messageTimes: [23 * 60 + 15, 33 * 60 + 15, 43 * 60 + 15, 53 * 60 + 15],
    textMessage:
      "Don't clump up when Chronosphere is up. Save the hero that has been caught or look to interrupt the follow-up damage from Void's teammates",
    chatMessage:
      "Don't clump up when Chronosphere is up. Save the hero that has been caught",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Faceless Void",
    audioFile: "enemyHero/Faceless_5_Time dilation",
    messageTimes: [16 * 60 + 15, 36 * 60 + 15, 56 * 60 + 15],
    textMessage:
      "It is recommended to have basic dispels available against Time Dilation",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Faceless Void",
    audioFile: "enemyHero/Faceless_6_Chronosphere 3",
    messageTimes: [26 * 60 + 15, 46 * 60 + 15],
    textMessage:
      "Items like Aeon Disk and Aegis are good counters against Chronosphere in mid to late game. It is advised to keep buyback ready as you might want to use your first life to burn through Void's ultimate",
    chatMessage:
      "Aeon Disk and Aegis are good against Chronosphere. Also keep buyback ready and use it after Void's ultimate",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Faceless Void",
    audioFile: "enemyHero/Faceless_7_Chronosphere 4",
    messageTimes: [21 * 60 + 15, 41 * 60 + 15, 61 * 60 + 15],
    textMessage:
      "You can try to bait out Chronosphere with smart illusion rune usage or Illusionist's Cape",
    audience: [Audience.ALL],
  },

  // 36. Grimstroke | 02.03.2021
  {
    category: "OwnHero",
    hero: "Grimstroke",
    audioFile: "ownHero/Grimstroke_1_Secure ranged",
    messageTime: 15,
    textMessage:
      `Use Stroke of Faith to secure range creep lasthits and hit opponents at the same time.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "grimstroke_dark_artistry" },
  },
  {
    category: "OwnHero",
    hero: "Grimstroke",
    audioFile: "ownHero/Grimstroke_2_Communicate",
    messageTimes: [30, 3 * 60 + 30],
    textMessage:
      "Communicate whenever you want to use Ink Swell on an ally so it doesn't go to waste.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "grimstroke_spirit_walk" },
  },
  {
    category: "OwnHero",
    hero: "Grimstroke",
    audioFile: "ownHero/Grimstroke_3_Stack camp",
    messageTimes: [4 * 60, 8 * 60],
    textMessage:
      "Stroke of Faith can be used to stack an additional camp from distance.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "grimstroke_dark_artistry" },
  },
  {
    category: "OwnHero",
    hero: "Grimstroke",
    audioFile: "ownHero/Grimstroke_4_Soulbind",
    messageTimes: [10 * 60 + 15, 18 * 60 + 15, 26 * 60 + 15],
    textMessage:
      "Focus on using Soulbind on mobile heroes or heroes with Black King Bar.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "grimstroke_soul_chain" },
  },
  {
    category: "OwnHero",
    hero: "Grimstroke",
    audioFile: "ownHero/Grimstroke_5_Aghanims Shard",
    messageTime: 14 * 60 + 50,
    textMessage:
      `Buy Aghanim's Shard at minute 15 as it adds even more utility to Ink Sweel.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Grimstroke",
    audioFile: "ownHero/Grimstroke_6_Dark Portrait",
    messageTimes: [22 * 60 + 45, 29 * 60 + 45],
    textMessage:
      "Aghanim's Scepter allows you to scale well into lategame by creating illusions of opponents right-clickers.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Grimstroke",
    audioFile: "enemyHero/Grimstroke_1_Stroke of faith",
    messageTime: -60,
    textMessage:
      "Stroke of Fate does more damage the more units it hits. Play on the side of the creep wave.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Grimstroke",
    audioFile: "enemyHero/Grimstroke_2_Phantoms embrace",
    messageTime: 30,
    textMessage:
      "Help removing Grimstroke's Phantom's Embrace from your team mates.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Grimstroke",
    audioFile: "enemyHero/Grimstroke_3_Ink Swell",
    messageTime: -40,
    textMessage:
      "The longer you were next to Ink Swelled unit the longer you will be stunned.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Grimstroke",
    audioFile: "enemyHero/Grimstroke_4_Soulbind",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Against Grimstroke's Soulbind, avoid staying close to your cores, especially the mobile ones.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Grimstroke",
    audioFile: "enemyHero/Grimstroke_5_Counter items",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance and spell immunity items are great against Grimstroke.",
    audience: [Audience.ALL],
  },

  // 37. Gyrocopter | 02.03.2021  ***CHANGED 7.30***
  {
    category: "OwnHero",
    hero: "Gyrocopter",
    audioFile: "ownHero/Gyrocopter_1_Rocket Barrage",
    messageTime: 15,
    textMessage:
      "Rocket Barrage does tons of damage when an opponent is isolated.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "gyrocopter_rocket_barrage" },
  },
  {
    category: "OwnHero",
    hero: "Gyrocopter",
    audioFile: "ownHero/Gyrocopter_2_Creep equilibrium",
    messageTime: 30,
    textMessage:
      "Keep creep equilibrium close to your tower to have longer distance to run opponents down with Rocket Barrage.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "gyrocopter_rocket_barrage" },
  },
  {
    category: "OwnHero",
    hero: "Gyrocopter",
    audioFile: "ownHero/Gyrocopter_3_Waveclear",
    messageTime: 4 * 60 + 45,
    textMessage:
      "Gyro has great waveclear early on. Push out waves from level 5 onwards and farming nearby camps.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "gyrocopter_flak_cannon" },
  },
  {
    category: "OwnHero",
    hero: "Gyrocopter",
    audioFile: "ownHero/Gyrocopter_4_Clear stacks",
    messageTimes: [5 * 60 + 15, 8 * 60 + 15],
    textMessage:
      "Ask your teammates to stack for you as you can clear stacks easily once you max out Flak Cannon.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "gyrocopter_flak_cannon" },
  },
  {
    category: "OwnHero",
    hero: "Gyrocopter",
    audioFile: "ownHero/Gyrocopter_5_Hit count",
    messageTimes: [5 * 60 + 30, 15 * 60 + 30],
    textMessage:
      "'Hit count' objects like Supernova can be removed with ease by attacking them and flakking other heroes down.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "gyrocopter_flak_cannon" },
  },
  {
    category: "OwnHero",
    hero: "Gyrocopter",
    audioFile: "ownHero/Gyrocopter_6_Aghanims Scepter",
    messageTime: 11 * 60 + 30,
    textMessage:
      "Make sure to get Aghanim's Scepter as soon as possible as it improves farming speed and dps in fights.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ultimate_scepter" },
  },
  /*{ // Duplicate, removed
    category: 'OwnHero',
    hero: 'Gyrocopter',
    audioFile: 'ownHero/Gyrocopter_7_Aghanims Scepter',
    messageTime: 11 * 60 + 30,
    textMessage:
      "Make sure to get Aghanim's Scepter as soon as possible as it improves farming speed and dps in fights.",
    audience: [Audience.ROLE_CORE],
    image: { type: 'item', name: 'ultimate_scepter' },
  },*/
  {
    category: "OwnHero",
    hero: "Gyrocopter",
    audioFile: "ownHero/Gyrocopter_8_Side Gunner",
    messageTimes: [12 * 60, 20 * 60],
    textMessage:
      "Side Gunner can attack even when Gyrocopter is stunned and all attack modifiers work as well.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    hero: "Gyrocopter",
    audioFile: "ownHero/Gyrocopter_9_Side Gunner",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "In teamfights, focus on hitting most of the opponents with Flak Cannon and Call Down.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "gyrocopter_flak_cannon" },
  },
  {
    category: "OwnHero",
    hero: "Gyrocopter",
    audioFile: "ownHero/Gyrocopter_10_Divine Rapier",
    messageTime: 25 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "If in desperate position, consider purchasing Divine Rapier as last resort. Works well with Flak Cannon.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "rapier" },
  },

  {
    category: "EnemyHero",
    hero: "Gyrocopter",
    audioFile: "enemyHero/Gyrocopter_1_Rocket barrage",
    messageTime: -60,
    textMessage:
      "Rocket Barrage does a lot of damage. Keep distance from Gyrocopter or share damage with allied units.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Gyrocopter",
    audioFile: "enemyHero/Gyrocopter_2_Homing missile",
    messageTime: -50,
    textMessage:
      "Help destroying Homing Missile that is aimed at your team mate.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Gyrocopter",
    audioFile: "enemyHero/Gyrocopter_6_Contest farm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Gyrocopter farms quickly with Flak Cannon. Smoke on him, place deep wards and block off camps with sentries.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Gyrocopter",
    audioFile: "enemyHero/Gyrocopter_3_Antimagic items",
    messageTime: 12 * 60,
    textMessage:
      "Gyrocopter does a lot of magical damage and joins fights early. Magic resistance items are great.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Gyrocopter",
    audioFile: "enemyHero/Gyrocopter_4_Antiflak items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard, Heaven's Halberd and armor items are great against Gyrocopter's Flak Cannon.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Gyrocopter",
    audioFile: "enemyHero/Gyrocopter_5_Lotus Orb",
    messageTime: 12 * 60 + 20,
    textMessage:
      "It is easy to reflect Homing Missile back to Gyrocopter with Lotus Orb.",
    audience: [Audience.ALL],
  },

  // 38. Hoodwink | 02.03.2021 - DONE
  {
    category: "OwnHero",
    hero: "Hoodwink",
    audioFile: "ownHero/Hoodwink_1_Secure ranged",
    messageTime: 15,
    textMessage:
      "Use Acorn Shot to secure range creep lasthits and to harass the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_acorn_shot" },
  },
  {
    category: "OwnHero",
    hero: "Hoodwink",
    audioFile: "ownHero/Hoodwink_2_Bushwhack straight",
    messageTime: 75,
    textMessage:
      "Opt to Bushwhack straight instead of setting it up with Acorn Shot as the planted tree can be cut.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_bushwhack" },
  },
  {
    category: "OwnHero",
    hero: "Hoodwink",
    audioFile: "ownHero/Hoodwink_3_Trees",
    messageTime: 3 * 60,
    textMessage: "Play close to the trees when you have a point in Scurry.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_scurry" },
  },
  {
    category: "OwnHero",
    hero: "Hoodwink",
    audioFile: "ownHero/Hoodwink_4_Acorn vision",
    messageTimes: [3 * 60 + 30, 9 * 60 + 30, 15 * 60 + 30],
    textMessage:
      "Acorn Shot provides vision. You can scout pillars for wards or Roshpit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_acorn_shot" },
  },
  {
    category: "OwnHero",
    hero: "Hoodwink",
    audioFile: "ownHero/Hoodwink_5_Shoot defensively",
    messageTimes: [8 * 60, 16 * 60],
    textMessage:
      "You can use Sharpshooter defensively to propel yourself further back or up or down the cliff.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_sharpshooter" },
  },
  {
    category: "OwnHero",
    hero: "Hoodwink",
    audioFile: "ownHero/Hoodwink_6_Push sidelanes",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, you can push out sidelanes easily and escape in treeline if necessary.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_scurry" },
  },

  {
    category: "EnemyHero",
    hero: "Hoodwink",
    audioFile: "enemyHero/Hoodwink_1_Bushwhack",
    messageTime: -60,
    textMessage: "Avoid playing around trees against Hoodwink's Bushwack.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Hoodwink",
    audioFile: "enemyHero/Hoodwink_2_Break combo",
    messageTime: 30,
    textMessage:
      "You can break Acorn Shot into Bushwhack combo by cutting Acorn Shot's tree quickly.",
    audience: [Audience.ALL],
  },
  // {category: "EnemyHero", hero: "Hoodwink", audioFile: "enemyHero/Hoodwink_3_Sharpshooter", messageTime: (8*60), textMessage: "Hoodwink's Sharpshooter can't be cancelled and applies break effect for up to 6 seconds.", audience: [Audience.ALL]}, |patch 7.29| MESSAGE UPDATED
  {
    category: "EnemyHero",
    hero: "Hoodwink",
    audioFile: "enemyHero/Hoodwink_3_Sharpshooter",
    messageTime: 8 * 60,
    textMessage:
      "Hoodwink's Sharpshooter can't be cancelled and applies break effect for up to 5 seconds.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Hoodwink",
    audioFile: "enemyHero/Hoodwink_4_Antievasion items",
    messageTime: 12 * 60,
    textMessage: "Evasion piercing items are great against Hoodwink's Scurry.",
    audience: [Audience.ALL],
  },

  // 39. Huskar | 02.03.2021
  {
    category: "OwnHero",
    hero: "Huskar",
    audioFile: "ownHero/Huskar_1_Harass",
    messageTime: 15,
    textMessage:
      "Harass with Burning Spears as often as you can as it doesn't pull aggro.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "huskar_burning_spear" },
  },
  {
    category: "OwnHero",
    hero: "Huskar",
    audioFile: "ownHero/Huskar_2_Helm of Iron Will",
    messageTime: 30,
    textMessage:
      "On tough lanes rush Helm of Iron Will to solve health sustain issues.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "helm_of_iron_will" },
  },
  {
    category: "OwnHero",
    hero: "Huskar",
    audioFile: "ownHero/Huskar_3_Snowball",
    messageTimes: [60, 7 * 60, 12 * 60],
    textMessage:
      "Huskar is snowbally type of a hero. Do well on the lane, take an early Roshan and call for a group up.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Huskar",
    audioFile: "ownHero/Huskar_4_Life Break dispels",
    messageTimes: [5 * 60 + 30, 12 * 60],
    textMessage:
      "Lifebreak dispels on cast which is particulary useful against heal reductions like Spirit Vessel or Enfeeble.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "huskar_life_break" },
  },
  {
    category: "OwnHero",
    hero: "Huskar",
    audioFile: "ownHero/Huskar_5_Roshan",
    messageTimes: [9 * 60, 13 * 60],
    textMessage:
      "Do Roshan once you have Armlet completed and ideally Berserker's Blood and Burning Spears maxed out.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    hero: "Huskar",
    audioFile: "ownHero/Huskar_6_Check opponents",
    messageTimes: [10 * 60 + 15, 18 * 60 + 15, 26 * 60 + 15],
    textMessage:
      "Check opponents for heal reductions and break effects. You can itemize or adjust playstyle accordingly.",
    audience: [Audience.ALL],
    image: { type: "item", name: "spirit_vessel" },
  },
  {
    category: "OwnHero",
    hero: "Huskar",
    audioFile: "ownHero/Huskar_7_Aghanims Scepter",
    messageTime: 19 * 60,
    textMessage:
      "Aghanim's Scepter allows you to pick-off heroes and deals with kiting.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Huskar",
    audioFile: "enemyHero/Huskar_1_Spirit vessel",
    messageTime: -60,
    textMessage:
      "Someone should buy Spirit Vessel against Huskar to offset his regeneration and deal high damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Huskar",
    audioFile: "enemyHero/Huskar_2_Low hp",
    messageTime: 5 * 60,
    textMessage: "Huskar likes to play on low HP. Look to gank him early on.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Huskar",
    audioFile: "enemyHero/Huskar_3_Life break dispel",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Life Break applies basic dispel. Avoid casting dispellable spells and items before Huskar jumps.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Huskar",
    audioFile: "enemyHero/Huskar_4_Roshan",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Huskar is snowbally hero that relies on killing Roshan early on. Ward and check Roshpit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Huskar",
    audioFile: "enemyHero/Huskar_5_Halberd",
    messageTime: 12 * 60,
    textMessage:
      "Heaven's Halberd disarms Huskar for 5 seconds and shortens Inner Fire debuff duration.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Huskar",
    audioFile: "enemyHero/Huskar_6_Silver edge",
    messageTime: 12 * 60 + 10,
    textMessage: "Silver Edge breaks Huskar's passive - Berserker's Blood.",
    audience: [Audience.ALL],
  },

  // 40. Invoker | Earlier work
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_1_Sunstrike fountain",
    messageTime: -90,
    textMessage:
      "Quas Exort: Sunstrike opponents fountain to check opponents items and infer lanes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_sun_strike" },
  },
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_2_Sunstrike kills",
    messageTime: -15,
    textMessage:
      "Quas Exort: Look around the map as much as you can for potential Sunstrike kills.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_sun_strike" },
  },
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_3_Secure ranged",
    messageTime: 15,
    textMessage:
      "Quas Exort: You can use Sun Strike here and there to secure ranged creep lasthit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_sun_strike" },
  },
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_4_Secure ranged",
    messageTime: 2 * 60,
    textMessage:
      "Quas Wex: Tornado and EMP to secure a lasthit or deny a creep, and burn opponent's mana at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_tornado" },
  },
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_5_Rune control",
    messageTimes: [2 * 60 + 45, 5 * 60 + 45],
    textMessage: "Quas Exort: Use Forged Spirits to control runes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_forge_spirit" },
  },
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_6_Rotate",
    messageTimes: [5 * 60 + 30, 9 * 60 + 30],
    textMessage:
      "Quas Wex: Control active runes and look for opportunities to rotate once you have boots and Urn of Shadows.",
    audience: [Audience.ALL],
    image: { type: "item", name: "urn_of_shadows" },
  },
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_7_Dont rotate",
    messageTimes: [5 * 60 + 45, 9 * 60 + 45],
    textMessage:
      "Quas Exort: Avoid rotating and running around. Farm, pressure opponents' tower and look for Sun Strikes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_sun_strike" },
  },
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_8_Hand of Midas",
    messageTime: 10 * 60 + 15,
    textMessage:
      "Quas Wex: After ganking few times, consider going back for Hand of Midas if the game slows down.",
    audience: [Audience.ALL],
    image: { type: "item", name: "hand_of_midas" },
  },
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_9_Splitpush",
    messageTime: 13 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, you can easily splitpush with summons or by dumping spells from the fog.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_chaos_meteor" },
  },
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_10_Alacrity",
    messageTime: 14 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Don't forget to use Alacrity on yourself or right-clicking ally in the fights. Works well with Cold Snap.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_alacrity" },
  },
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_11_Scout",
    messageTime: 15 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Use Forged Spirits or Sunstrike to scout if opponents are missing.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_forge_spirit" },
  },
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_12_Roshan",
    messageTime: 17 * 60,
    textMessage:
      "Invoker is great at enabling team to take Roshan early due to Alacrity, Forged Spirits and Cold Snap.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    hero: "Invoker",
    audioFile: "ownHero/Invoker_13_Aghanims Scepter",
    messageTime: 18 * 60 + 30,
    textMessage:
      "Aghanim's Scepter is a huge powerspike, especially if you have a setup within the team.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Invoker",
    audioFile: "enemyHero/Invoker_1_Invoker type",
    messageTime: 3 * 60,
    textMessage:
      "Identify which Invoker type you are playing against, by looking at invoked spells and orbs above Invoker. Quas Exort Invoker is farm and burst oriented and uses the Sunstrike ability early on. While Quas Wex is ganking and control oriented and uses Tornado + EMP and Cold Snap + Urn of Shadows combinations.",
    chatMessage:
      "Quas Exort Invoker is farm and burst oriented while Quas Wex is ganking and control oriented.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Invoker",
    audioFile: "enemyHero/Invoker_2_Gank",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Invoker is squishy and the only real defense he has are his spells. Try to gank him early in the game with Smoke of Deceit and Dust of Appearance.",
    chatMessage:
      "Invoker is squishy. Try to gank him early in the game with Smoke of Deceit and Dust of Appearance.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Invoker",
    audioFile: "enemyHero/Invoker_3_Anti-damage",
    messageTimes: [8 * 60 + 15, 15 * 60 + 15],
    textMessage: "Opt for anti-magic damage items against Invoker",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Invoker",
    audioFile: "enemyHero/Invoker_4_Sell combination",
    messageTimes: [10 * 60 + 15, 30 * 60 + 15],
    textMessage:
      "Dodging or surviving Invoker's opening combination of spells, makes him weak for 5 to 10 seconds depending on the cooldown of his Invoke ability.",
    chatMessage:
      "Dodging or surviving Invoker's opening combination of spells makes him weak for 5 to 10s.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Invoker",
    audioFile: "enemyHero/Invoker_5_Tornado",
    messageTimes: [17 * 60 + 15, 27 * 60 + 15],
    textMessage:
      "Keep in mind that Invoker's Tornado dispells. Active rune buffs and many spells are countered by it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Invoker",
    audioFile: "enemyHero/Invoker_6_Cataclysm",
    messageTimes: [28 * 60 + 15, 38 * 60 + 15],
    textMessage:
      "Aghanim's Scepter grants Invoker Cataclysm spell. Be aware of it and be mindful about your hero's position during it.",
    chatMessage:
      "Aghs grants Invoker Cataclysm spell. Be aware of it and be mindful about your hero's position.",
    audience: [Audience.ALL],
  },

  // 41. Io | 03.03.2021
  {
    category: "OwnHero",
    hero: "Io",
    audioFile: "ownHero/Io_1_Trees",
    messageTime: -75,
    textMessage:
      "Tether breaks trees which is useful when laning against Treant Protector or to optimize farming routes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "wisp_tether" },
  },
  {
    category: "OwnHero",
    hero: "Io",
    audioFile: "ownHero/Io_2_Consumables",
    messageTime: 15,
    textMessage:
      "Make sure to have spare consumables with you to keep your laning partner healthy.",
    audience: [Audience.ALL],
    image: { type: "item", name: "flask" },
  },
  {
    category: "OwnHero",
    hero: "Io",
    audioFile: "ownHero/Io_3_Kill Relocate",
    messageTime: 8 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Look around the map for opportunities to Relocate in and prompt your teammates to setup kills.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "wisp_relocate" },
  },
  {
    category: "OwnHero",
    hero: "Io",
    audioFile: "ownHero/Io_4_Boost carry",
    messageTime: 10 * 60 + 15,
    textMessage:
      "Past laning stage, you typically want to play with your farming core to boost his farm and stack camps.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Io",
    audioFile: "ownHero/Io_5_Dont show",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing yourself at the start of the fight as you are number 1 target for opponents.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Io",
    audioFile: "ownHero/Io_6_Relocate nearby",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When using Relocate to save an ally consider relocating nearby to be able to re-engage faster.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "wisp_relocate" },
  },
  {
    category: "OwnHero",
    hero: "Io",
    audioFile: "ownHero/Io_7_Relocate splitpush",
    messageTime: 15 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "You can use Relocate to push out a wave or rat a tower when not much is happening around the map.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "wisp_relocate" },
  },
  {
    category: "OwnHero",
    hero: "Io",
    audioFile: "ownHero/Io_8_Aghanims Shard",
    messageTime: 14 * 60 + 50,
    textMessage:
      `Pick up Aghanim's Shard at minute 15. It provides a source of disable that opponents are typically unaware of.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Io",
    audioFile: "ownHero/Io_9_Cheese",
    messageTime: 38 * 60,
    textMessage:
      "Io is one of the best Cheese carriers in the game as you can extract double the value through the Tether.",
    audience: [Audience.ALL],
    image: { type: "item", name: "cheese" },
  },

  {
    category: "EnemyHero",
    hero: "Io",
    audioFile: "enemyHero/Io_1_Spirit vessel",
    messageTime: -60,
    textMessage:
      "Someone should buy Spirit Vessel against Io to offset healing and regeneration.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Io",
    audioFile: "enemyHero/Io_2_Harass",
    messageTime: -50,
    textMessage: "Harass either Io or his laning partner, not both equally.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Io",
    audioFile: "enemyHero/Io_3_Relocate cancel",
    messageTime: 8 * 60,
    textMessage:
      "Relocate can be cancelled by disabling or silencing Io during channel time.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Io",
    audioFile: "enemyHero/Io_4_Io focus",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Io in the fights as he's good at sustaining and saving his cores.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Io",
    audioFile: "enemyHero/Io_5_Gap closing",
    messageTime: 12 * 60,
    textMessage: "Gap closing items will help you get on top of Io.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Io",
    audioFile: "enemyHero/Io_6_Antihealing items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Items that reduce healing and regeneration are great against Io.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Io",
    audioFile: "enemyHero/Io_7_Ratting",
    messageTimes: [15 * 60 + 10, 25 * 60 + 10, 35 * 60 + 10],
    textMessage: "Be careful about Io's ratting potential with Relocate.",
    audience: [Audience.ALL],
  },

  // 42. Jakiro | 03.03.2021
  {
    category: "OwnHero",
    hero: "Jakiro",
    audioFile: "ownHero/Jakiro_1_Pull camps",
    messageTime: -90,
    textMessage:
      "Make sure camps are open for pulling as the lane will likely push due to AoE damage of your spells.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    hero: "Jakiro",
    audioFile: "ownHero/Jakiro_2_Tanky",
    messageTime: 15,
    textMessage:
      "Jakiro is tanky so look to play ahead of your core as much as you can.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Jakiro",
    audioFile: "ownHero/Jakiro_3_Ice Path scout",
    messageTimes: [3 * 60, 9 * 60, 15 * 60],
    textMessage:
      "Ice Path provides vision so you can use it to scout pillars for wards and Roshpit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "jakiro_ice_path" },
  },
  {
    category: "OwnHero",
    hero: "Jakiro",
    audioFile: "ownHero/Jakiro_4_Defend towers",
    messageTimes: [8 * 60, 14 * 60],
    textMessage:
      "Jakiro is great at defending towers due to Macropyre and your cores can splitpush in meantime.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "jakiro_macropyre" },
  },
  {
    category: "OwnHero",
    hero: "Jakiro",
    audioFile: "ownHero/Jakiro_5_Tower damage",
    messageTimes: [8 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "Jakiro applies a lot of pressure on buildings by waveclearing and through Liquid Fire and Frost.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "jakiro_liquid_fire" },
  },
  {
    category: "OwnHero",
    hero: "Jakiro",
    audioFile: "ownHero/Jakiro_6_Tower damage",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "In teamfight, take your time to land the most impactful Ice Paths and Macropyre.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "jakiro_ice_path" },
  },
  {
    category: "OwnHero",
    hero: "Jakiro",
    audioFile: "ownHero/Jakiro_7_Splitpush",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening on the map, you can splitpush easily without even showing yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "jakiro_dual_breath" },
  },
  {
    category: "OwnHero",
    hero: "Jakiro",
    audioFile: "ownHero/Jakiro_8_Aghanims Shard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanim's Shard at minute 15 as it provides additional disable and damage boost.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Jakiro",
    audioFile: "ownHero/Jakiro_9_Aghanims Scepter",
    messageTimes: [25 * 60, 31 * 60],
    textMessage:
      "You can carry late game fights by nicely positioning Macropyre improved by Aghanim's Scepter.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Jakiro",
    audioFile: "enemyHero/Jakiro_1_Cast point",
    messageTime: -60,
    textMessage:
      "Cast point on Jakiro's spells are long, so you can possibly dodge them.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Jakiro",
    audioFile: "enemyHero/Jakiro_2_Stacking",
    messageTime: -50,
    textMessage:
      "Avoid standing beside your laning partner against Dual Breath and Liquid Fire.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Jakiro",
    audioFile: "enemyHero/Jakiro_3_Defend towers",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Jakiro is great at destroying towers with Liquid Fire. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Jakiro",
    audioFile: "enemyHero/Jakiro_4_Defending towers",
    messageTime: 10 * 60 + 20,
    textMessage:
      "Jakiro is great at defending towers alone. Jump him or consider glyphing the wave.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Jakiro",
    audioFile: "enemyHero/Jakiro_5_Clump up",
    messageTimes: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Ice Path and Macropyre combo.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Jakiro",
    audioFile: "enemyHero/Jakiro_6_Antimagic items",
    messageTime: 12 * 60 + 10,
    textMessage: "Magic resistance items are great against Jakiro.",
    audience: [Audience.ALL],
  },

  // 43. Juggernaut | Earlier work
  {
    category: "OwnHero",
    hero: "Juggernaut",
    audioFile: "ownHero/Juggernaut_1_Instant attack",
    messageTime: 10,
    textMessage:
      "Juggernaut has almost instant attack animation which makes lasthitting and denying a lot easier.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Juggernaut",
    audioFile: "ownHero/Juggernaut_2_Be aggressive",
    messageTime: 20,
    textMessage:
      "Blade Fury does insane amounts of damage. Look to play aggressively on the lane.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "juggernaut_blade_fury" },
  },
  {
    category: "OwnHero",
    hero: "Juggernaut",
    audioFile: "ownHero/Juggernaut_3_Spin click",
    messageTime: 30,
    textMessage:
      "Avoid right-clicking opponents during Blade Fury until you get proc item or items that apply debuffs.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "juggernaut_blade_fury" },
  },
  {
    category: "OwnHero",
    hero: "Juggernaut",
    audioFile: "ownHero/Juggernaut_4_Micro ward",
    messageTimes: [75, 11 * 60 + 15, 21 * 60 + 15],
    textMessage:
      "Make sure to micro healing ward properly. You can use it during Blade Fury and Omnislash.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "juggernaut_healing_ward" },
  },
  {
    category: "OwnHero",
    hero: "Juggernaut",
    audioFile: "ownHero/Juggernaut_5_Spin tp",
    messageTime: 4 * 60,
    repeatTime: 10 * 60,
    textMessage: "When in trouble, consider to Blade Fury and teleport out.",
    audience: [Audience.ALL],
    image: { type: "item", name: "tpscroll" },
  },
  {
    category: "OwnHero",
    hero: "Juggernaut",
    audioFile: "ownHero/Juggernaut_6_Omnislash creeps",
    messageTimes: [7 * 60, 15 * 60, 23 * 60],
    textMessage:
      "When deciding to Omnislash, consider how close opponents' wave or neutral creeps might be.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "juggernaut_omni_slash" },
  },
  {
    category: "OwnHero",
    hero: "Juggernaut",
    audioFile: "ownHero/Juggernaut_7_Check inventory",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Scout opponents' inventories for Omnislash counters and adjust playstyle and itemization accordingly.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "juggernaut_omni_slash" },
  },
  {
    category: "OwnHero",
    hero: "Juggernaut",
    audioFile: "ownHero/Juggernaut_8_Roshan",
    messageTime: 17 * 60 + 15,
    textMessage:
      `With decent game, Juggernaut is good at killing Roshan from the 18 minute mark with minimal or no help.`,
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    hero: "Juggernaut",
    audioFile: "ownHero/Juggernaut_9_Slow siege",
    messageTime: 22 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      `You can slow siege enemy towers and buildings by damaging them during Blade Fury and then backing away.`,
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "juggernaut_blade_fury" },
  },

  {
    category: "EnemyHero",
    hero: "Juggernaut",
    audioFile: "enemyHero/Juggernaut_1_Blade fury 1",
    messageTime: -60,
    textMessage:
      "Juggernaut is one of the strongest laning carries as Blade Fury does more than 400 AOE damage already on level 1. Consider buying items to increase your movement speed",
    chatMessage:
      "Juggernaut's Blade Fury does more than 400 AOE damage. Consider buying items to increase your movement speed",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Juggernaut",
    audioFile: "enemyHero/Juggernaut_2_Blade fury 2",
    messageTime: 45,
    textMessage:
      "Try to keep distance from Juggernaut and try to force a defensive Blade Fury. Juggernaut's mana pool is not great and Blade Fury has high cooldown on lower levels. Pressure him after he used Blade Fury",
    chatMessage:
      "Try to keep distance from Juggernaut and try to force a defensive Blade Fury Pressure him after he used it",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Juggernaut",
    audioFile: "enemyHero/Juggernaut_3_Healing ward",
    messageTime: 4 * 60 + 5,
    textMessage:
      "Look to hit Juggernaut's Healing Ward as one hit is sufficient and it gives you 75 gold",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Juggernaut",
    audioFile: "enemyHero/Juggernaut_4_Blade fury 3",
    messageTime: 6 * 60 + 15,
    textMessage:
      "When you are ganking Juggernaut, he will look to Blade Fury and teleport out on first sign of trouble. Make sure you surprise disable him before he spins if you do not yet have a spell immunity piercing disable",
    chatMessage:
      "Juggernaut can use Blade Fury and teleport to escape. Surprise disable him before he spins, if you can",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Juggernaut",
    audioFile: "enemyHero/Juggernaut_5_Omnislash 1",
    messageTime: 8 * 60 + 15,
    textMessage:
      "Juggernaut's Omnislash jumps are random. Use surrounding creeps, illusions or heroes to split the damage",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Juggernaut",
    audioFile: "enemyHero/Juggernaut_6_Spell immunity",
    messageTimes: [10 * 60 + 30, 25 * 60 + 30, 45 * 60 + 30],
    textMessage:
      "Items and spells that disable through spell immunity are good against Juggernaut as Blade Fury grants him spell immunity",
    chatMessage:
      "Items and spells that disable through spell immunity are good against Juggernaut and his Blade Fury",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Juggernaut",
    audioFile: "enemyHero/Juggernaut_7_Omnislash 2",
    messageTimes: [15 * 60 + 30, 35 * 60 + 30],
    textMessage:
      "Main damaging ability of Juggernaut is Omnislash and this spell is counterable by many items. Make sure to have at least one such item for each hero",
    chatMessage:
      "Juggernaut's Omnislash is counterable by many items. Make sure to have at least one for each hero",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Juggernaut",
    audioFile: "enemyHero/Juggernaut_8_Omnislash 3",
    messageTimes: [21 * 60 + 30, 31 * 60 + 30],
    textMessage:
      "Juggernaut's Omnislash cooldown is long with 140 seconds, which allows you to pressure him while it's down",
    audience: [Audience.ALL],
  },

  // 44. Keeper of the Light | 03.03.2021   ***CHANGED 7.30***
  {
    category: "OwnHero",
    hero: "Keeper of the Light",
    audioFile: "ownHero/Keeper of the Light_1_Unblock camps",
    messageTime: -90,
    textMessage:
      "Make sure pull camps are unblocked as lane is likely to be pushed due to Illuminate.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    hero: "Keeper of the Light",
    audioFile: "ownHero/Keeper of the Light_2_Illuminate positioning",
    messageTime: 15,
    textMessage:
      "Be creative at positioning to be able to hit opponents with Illuminate.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    hero: "Keeper of the Light",
    audioFile: "ownHero/Keeper of the Light_3_Ranged creeps",
    messageTime: 30,
    textMessage:
      "Avoid hitting ranged creeps with level 1 Illuminate as it will become deniable.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    hero: "Keeper of the Light",
    audioFile: "ownHero/Keeper of the Light_4_Illuminate vision",
    messageTimes: [4 * 60 + 15, 12 * 60 + 15, 20 * 60 + 15],
    textMessage:
      "Illuminate provides vision which can be used to check pillars for wards or Roshpit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    hero: "Keeper of the Light",
    audioFile: "ownHero/Keeper of the Light_5_Stack",
    messageTimes: [4 * 60 + 30, 12 * 60 + 30],
    textMessage:
      "Keeper is fast and with Illuminate you can make multiple stacks at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    hero: "Keeper of the Light",
    audioFile: "ownHero/Keeper of the Light_6_Defend buildings",
    messageTimes: [8 * 60 + 15, 16 * 60 + 15, 24 * 60 + 15],
    textMessage:
      "Keeper is amazing at defending buildings while your cores can splitpush.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    hero: "Keeper of the Light",
    audioFile: "ownHero/Keeper of the Light_7_Avoid showing",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing yourself at the start of the fight and align Illuminate's path over allies in Spirit Form for heals.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "keeper_of_the_light_spirit_form" },
  },
  {
    category: "OwnHero",
    hero: "Keeper of the Light",
    audioFile: "ownHero/Keeper of the Light_8_Chakra ally",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Make sure to provide Chakra Magic to an ally that benefits most from it after his spells were used.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "keeper_of_the_light_chakra_magic" },
  },
  {
    category: "OwnHero",
    hero: "Keeper of the Light",
    audioFile: "ownHero/Keeper of the Light_9_Splitpush",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out sidelanes with Illuminate. You don't even have to show yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    hero: "Keeper of the Light",
    audioFile: "ownHero/Keeper of the Light_10_Aghanims Scepter",
    messageTime: 17 * 60 + 30,
    textMessage:
      "Make sure to pick up Aghanim's Scepter at reasonable time as this hero lacks control.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Keeper of the Light",
    audioFile: "enemyHero/Keeper of the Light_1_Observer",
    messageTime: -60,
    textMessage:
      "Bring an Observer ward to your lane to see Keeper of the Light charging Illuminate.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Keeper of the Light",
    audioFile: "enemyHero/Keeper of the Light_2_Pulling",
    messageTime: -50,
    textMessage:
      "Prevent Keeper of the Light from pulling as he will push with Illuminate and then look to pull.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Keeper of the Light",
    audioFile: "enemyHero/Keeper of the Light_3_Squishy",
    messageTime: -40,
    textMessage:
      "Keeper of the Light is very squishy but really fast. One disable and he will drop low on HP.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Keeper of the Light",
    audioFile: "enemyHero/Keeper of the Light_4_Defending towers",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Keeper of the Light is great at defending towers alone. Jump him or consider glyphing the wave.",
    audience: [Audience.ALL],
  },
  // |patch 7.29|
  {
    category: "EnemyHero",
    hero: "Keeper of the Light",
    audioFile: "enemyHero/Keeper of the Light_5_Daytime",
    messageTimes: [10 * 60 + 20, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Look to fight during night-time so Keeper of the Light can't heal his allies with Illuminate.",
    audience: [Audience.ALL],
  },
  // {category: "EnemyHero", hero: "Keeper of the Light", audioFile: "enemyHero/Keeper of the Light_5_Recall", messageTimes: [(10*60+20), (20*60+20), (30*60+20)], textMessage: "Keeper of the Light can Recall additional hero to the fight. Count on them having an extra hero.", audience: [Audience.ALL]}, |patch 7.29| NEW MESSAGE

  {
    category: "EnemyHero",
    hero: "Keeper of the Light",
    audioFile: "enemyHero/Keeper of the Light_7_Antimagic items",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance and spell immunity items are great against Keeper of the Light.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Keeper of the Light",
    audioFile: "enemyHero/Keeper of the Light_6_Recall",
    messageTimes: [20 * 60 + 20, 30 * 60 + 20, 40 * 60 + 20],
    textMessage:
      "Aghanim's Shard on Keeper of the Light grants Recall. He can teleport allied heroes to himself.",
    audience: [Audience.ALL],
  },

  // 45. Kunkka | 03.03.2021
  {
    category: "OwnHero",
    hero: "Kunkka",
    audioFile: "ownHero/Kunkka_1_Tidebringer harass",
    messageTime: 15,
    textMessage:
      "On early levels, make sure Tidebringer hits the opponents as that is your main laning tool.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_tidebringer" },
  },
  {
    category: "OwnHero",
    hero: "Kunkka",
    audioFile: "ownHero/Kunkka_2_Tidebringer cleave",
    messageTime: 30,
    textMessage:
      "Ideally, you want to cleave off of creep with Tidebringer for maximum damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_tidebringer" },
  },
  {
    category: "OwnHero",
    hero: "Kunkka",
    audioFile: "ownHero/Kunkka_3_X mark tp",
    messageTimes: [4 * 60, 11 * 60, 18 * 60],
    textMessage:
      "You can do X Marks the Spot into teleport combo to replenish yourself or allies.",
    audience: [Audience.ALL],
    image: { type: "item", name: "tpscroll" },
  },
  {
    category: "OwnHero",
    hero: "Kunkka",
    audioFile: "ownHero/Kunkka_4_Stacks",
    messageTimes: [4 * 60 + 30, 9 * 60 + 30],
    textMessage:
      "Ask you allies to stack for you as you can easily clear those with level 4 Tidebringer.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "kunkka_tidebringer" },
  },
  {
    category: "OwnHero",
    hero: "Kunkka",
    audioFile: "ownHero/Kunkka_5_Torrent vision",
    messageTimes: [4 * 60 + 45, 12 * 60 + 45, 20 * 60 + 45],
    textMessage:
      "Torrent provides vision so you can scout pillars for wards or Roshpit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_torrent" },
  },
  {
    category: "OwnHero",
    hero: "Kunkka",
    audioFile: "ownHero/Kunkka_6_Torrent stacks",
    messageTimes: [7 * 60 + 30, 12 * 60 + 30],
    textMessage:
      `You can stack some of the neutral camps by using Torrent 2 seconds before a full minute hits.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_torrent" },
  },
  {
    category: "OwnHero",
    hero: "Kunkka",
    audioFile: "ownHero/Kunkka_7_Armlet Tidebringer",
    messageTimes: [8 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Make sure to activate Armlet if you have one before using Tidebringer.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "armlet" },
  },
  {
    category: "OwnHero",
    hero: "Kunkka",
    audioFile: "ownHero/Kunkka_8_Combo",
    messageTimes: [8 * 60 + 45, 13 * 60 + 45],
    textMessage:
      "Maximum value combo: X Mark, Ghostship, activate X Mark, Torrent after Ghostship lands into Tidebringer.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_ghostship" },
  },
  {
    category: "OwnHero",
    hero: "Kunkka",
    audioFile: "ownHero/Kunkka_9_Rum buff",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, if possible align Ghostship in such way that it goes over most of your allies for Rum buff.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_ghostship" },
  },
  {
    category: "OwnHero",
    hero: "Kunkka",
    audioFile: "ownHero/Kunkka_10_Cleave opponents",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, position yourself to cleave with Tidebringer on as many opponents' heroes as possible.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "kunkka_tidebringer" },
  },
  {
    category: "OwnHero",
    hero: "Kunkka",
    audioFile: "ownHero/Kunkka_11_X mark hit",
    messageTimes: [10 * 60 + 45, 18 * 60 + 45, 26 * 60 + 45],
    textMessage:
      "X Mark yourself and run forward to kill a dangerous wave with Tidebringer if opponents don't have Eul's.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_x_marks_the_spot" },
  },

  {
    category: "EnemyHero",
    hero: "Kunkka",
    audioFile: "enemyHero/Kunkka_1_Tidebringer",
    messageTime: -60,
    textMessage:
      "Kunkka's sword will be glowing when Tidebringer is ready. Play on the side not to get cleaved.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Kunkka",
    audioFile: "enemyHero/Kunkka_2_Torrent",
    messageTime: -50,
    textMessage:
      "Kunkka will rise his sword when casting Torrent. Look to make a sharp turn.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Kunkka",
    audioFile: "enemyHero/Kunkka_3_Squishy",
    messageTime: 8 * 60,
    textMessage:
      "Kunkka's Ghostship allows allied heroes that were underneath it to delay 40% damage taken.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Kunkka",
    audioFile: "enemyHero/Kunkka_4_Clump up",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Torrent and Ghostship.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Kunkka",
    audioFile: "enemyHero/Kunkka_5_Euls",
    messageTime: 12 * 60,
    textMessage:
      "Eul's Scepter is great at stopping X Marks the Spot pullback.",
    audience: [Audience.ALL],
  },

  // 46. Legion Commander | Earlier work
  {
    category: "OwnHero",
    hero: "Legion Commander",
    audioFile: "ownHero/Legion Commander_1_PressTheAttack",
    messageTime: -30,
    textMessage:
      "Consider skilling Press the Attack on level 1 if you are being harassed by dispellable damage-over-time spells.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Legion Commander",
    audioFile: "ownHero/Legion Commander_2_OverwhelmingOdds",
    messageTime: -20,
    textMessage:
      "Use Overwhelming Odds to secure a range creep last hit and harass the enemy heroes at the same time.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Legion Commander",
    audioFile: "ownHero/Legion Commander_3_MomentOfCourage",
    messageTime: 60,
    textMessage:
      "Aggro creeps on yourself to increase Moment of Courage procs. It can be useful for denying as well.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Legion Commander",
    audioFile: "ownHero/Legion Commander_4_Blink1",
    messageTime: 60 * 10,
    textMessage:
      "Take your time to farm up a Blink Dagger and then start rotating around the map with a ganking partner.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Legion Commander",
    audioFile: "ownHero/Legion Commander_5_Blink2",
    messageTime: 60 * 11,
    textMessage:
      "Make sure not to overblink as you will land 240 units shorter than the maximum of 1200.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Legion Commander",
    audioFile: "ownHero/Legion Commander_6_Duel1",
    messageTimes: [60 * 12, 60 * 17],
    textMessage:
      "Duelling any hero is fine in early to midgame to collect Duel victories which will then allow you to potentially solo kill heroes.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Legion Commander",
    audioFile: "ownHero/Legion Commander_7_AghanimsShard",
    messageTime: 60 * 20,
    textMessage:
      "Aghanim's Shard is an essential pick-up for a support Legion Commander as it is a great buff and save for your core.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Legion Commander",
    audioFile: "ownHero/Legion Commander_8_Duel2",
    messageTime: 60 * 20,
    repeatTime: 60 * 20,
    textMessage:
      "In mid to late game make sure to Duel specific heroes and not care about Duel victory as much.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Legion Commander",
    audioFile: "ownHero/Legion Commander_9_TeamFight",
    messageTime: 60 * 30,
    repeatTime: 60 * 20,
    textMessage:
      "Sometimes it is better not to initiate fights, but rather stay back to save an ally with Press the Attack and turn the fight around.",
    audience: [Audience.ROLE_CORE],
  },

  {
    category: "EnemyHero",
    hero: "Legion Commander",
    audioFile: "enemyHero/Legion Commander_1_Overwhelming odds",
    messageTimes: [1 * 60 + 15, 3 * 60 + 15],
    textMessage:
      "In the lane against Legion Commander stay away from your partner to reduce impact of Overwhelming Odds",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Legion Commander",
    audioFile: "enemyHero/Legion Commander_2_Press the attack",
    messageTimes: [45, 6 * 60 + 15],
    textMessage:
      "Avoid waisting mana on harassing Legion Commander with spells that can be dispelled by Press the Attack. Use those spells once she used Press the Attack",
    chatMessage:
      "Don't harass Legion Commander with spells that can be dispelled. Use spells once she used Press the Attack",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Legion Commander",
    audioFile: "enemyHero/Legion Commander_3_Melee range",
    messageTime: 8 * 60 + 30,
    textMessage: "Avoid getting into melee range of Legion Commander",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Legion Commander",
    audioFile: "enemyHero/Legion Commander_4_Gap closing",
    messageTimes: [8 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "Keep an eye on Legion Commander's Blink Dagger or Shadow Blade purchase. She will want to find pickoffs so it's good to group up and bait with one hero and then to counter-attack",
    chatMessage:
      "Legion Commander buys Blink Dagger or Shadow Blade to duel heroes. Group up and bait with one hero",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Legion Commander",
    audioFile: "enemyHero/Legion Commander_5_Duel counter",
    messageTimes: [10 * 60 + 30, 20 * 60 + 30, 30 * 60 + 30, 40 * 60 + 30],
    textMessage:
      "Good counters items against Legion Commander's duel are Eul's Scepter, Linken's Sphere and Ethereal Blade",
    audience: [Audience.ALL],
  },
  /* {category: "EnemyHero", hero: "Legion Commander", audioFile: "enemyHero/Legion Commander_6_Aghanim's scepter", messageTimes: [(23*60+30), (33*60+30), (43*60+30)], textMessage: "Legion Commander becomes spell immune when duelling with Aghanim's Scepter", audience: [Audience.ALL]}, Changed in 7.30*/
  {
    category: "EnemyHero",
    hero: "Legion Commander",
    audioFile: "enemyHero/Legion Commander_6_Aghanim's scepter",
    messageTimes: [23 * 60 + 30, 33 * 60 + 30, 43 * 60 + 30],
    textMessage:
      "Legion Commander takes 50% damage from other sources when duelling with Aghanim's Scepter",
    audience: [Audience.ALL],
  },

  // 47. Leshrac | 03.03.2021
  {
    category: "OwnHero",
    hero: "Leshrac",
    audioFile: "ownHero/Leshrac_2_Split Earth ranged",
    messageTime: 15,
    textMessage:
      "You can use Split Earth or Lightning Storm to secure a ranged creep here and there.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_split_earth" },
  },
  {
    category: "OwnHero",
    hero: "Leshrac",
    audioFile: "ownHero/Leshrac_2_Split Earth harass",
    messageTime: 30,
    textMessage:
      "Use Split Earth when opponents are likely to be stationary, e.g. when they are going for lasthit or deny.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_split_earth" },
  },
  {
    category: "OwnHero",
    hero: "Leshrac",
    audioFile: "ownHero/Leshrac_3_Split Earth tress",
    messageTime: 45,
    textMessage:
      "Split Earth breaks trees which can be useful against certain heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_split_earth" },
  },
  {
    category: "OwnHero",
    hero: "Leshrac",
    audioFile: "ownHero/Leshrac_4_Diabolic Edict invis",
    messageTimes: [90, 11 * 60 + 30, 21 * 60 + 30],
    textMessage:
      "Diabolic Edict pulses give you a hint where the opponents' invisible hero is.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_diabolic_edict" },
  },
  {
    category: "OwnHero",
    hero: "Leshrac",
    audioFile: "ownHero/Leshrac_5_Clear stacks",
    messageTimes: [4 * 60 + 15, 9 * 60 + 15],
    textMessage:
      "Alert your teammates to stack for you as you can clear stacks as soon as you hit level 6.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "leshrac_pulse_nova" },
  },
  {
    category: "OwnHero",
    hero: "Leshrac",
    audioFile: "ownHero/Leshrac_6_Building damage",
    messageTimes: [6 * 60, 11 * 60, 16 * 60],
    textMessage:
      "Leshrac is really good at taking building early on due to wave clear and Diabolic Edict.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_diabolic_edict" },
  },
  {
    category: "OwnHero",
    hero: "Leshrac",
    audioFile: "ownHero/Leshrac_7_Building damage hiding",
    messageTimes: [6 * 60 + 15, 11 * 60 + 15, 16 * 60 + 15],
    textMessage:
      "You can damage a building with Diabolic Edict by hiding yourself in trees next to it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_diabolic_edict" },
  },
  {
    category: "OwnHero",
    hero: "Leshrac",
    audioFile: "ownHero/Leshrac_8_Itemization",
    messageTimes: [8 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Itemize for survivability and mobility to be able to position yourself in the center of the fight.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "cyclone" },
  },
  {
    category: "OwnHero",
    hero: "Leshrac",
    audioFile: "ownHero/Leshrac_9_Splitpush",
    messageTime: 11 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Leshrac is great at splitpushing due to mobility, waveclear and tower damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_pulse_nova" },
  },
  {
    category: "OwnHero",
    hero: "Leshrac",
    audioFile: "ownHero/Leshrac_10_Kite BKB",
    messageTimes: [14 * 60 + 15, 19 * 60 + 15],
    textMessage:
      "When opponents get Black King Bars you typically need to kite those and itemize to survive their duration.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Leshrac",
    audioFile: "ownHero/Leshrac_11_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanims Shard at minute 20 for extra disable. It helps with siege or defense of the buildings.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Leshrac",
    audioFile: "enemyHero/Leshrac_1_Illusions summons",
    messageTime: -60,
    textMessage:
      "Leshrac is great at dealing with illusions and summons due to high amount of AoE damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Leshrac",
    audioFile: "enemyHero/Leshrac_2_Split earth",
    messageTime: -50,
    textMessage:
      "Leshrac's Split Earth has a long cast point. Look to dodge it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Leshrac",
    audioFile: "enemyHero/Leshrac_3_Diabolic edict",
    messageTimes: [5 * 60, 15 * 60, 25 * 60],
    textMessage:
      "Leshrac's Diabolic Edict does great damage against single units and buildings. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Leshrac",
    audioFile: "enemyHero/Leshrac_4_Pulse Nova",
    messageTime: 8 * 60,
    textMessage:
      "Pulse Nova converts mana into AoE damage. Fight when Leshrac is low on mana or burn it away.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Leshrac",
    audioFile: "enemyHero/Leshrac_5_Burst",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Look to burst Leshrac in the fights or he'll do insane amounts of damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Leshrac",
    audioFile: "enemyHero/Leshrac_6_Antimagic items",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance and spell immunity items are great against Leshrac.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Leshrac",
    audioFile: "enemyHero/Leshrac_7_Splitpushing",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Leshrac is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 48. Lich | 03.03.2021
  {
    category: "OwnHero",
    hero: "Lich",
    audioFile: "ownHero/Lich_1_Frosh Blast rightlclick",
    messageTime: 15,
    textMessage:
      "Make use of the slowing part of the Frost Blast to chain couple of right-clicks.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lich_frost_nova" },
  },
  {
    category: "OwnHero",
    hero: "Lich",
    audioFile: "ownHero/Lich_2_Secure ranged",
    messageTime: 30,
    textMessage:
      "Secure ranged creep lasthit with right-click or Frost Blast when your core can't.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "lich_frost_nova" },
  },
  {
    category: "OwnHero",
    hero: "Lich",
    audioFile: "ownHero/Lich_3_Play aggressively",
    messageTime: 45,
    textMessage:
      "Play aggressively on the lane, burn your mana and then run a clarity while pulling.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "lich_frost_nova" },
  },
  {
    category: "OwnHero",
    hero: "Lich",
    audioFile: "ownHero/Lich_4_Solo kill",
    messageTime: 8 * 60,
    textMessage:
      `At level 6, you can even solo kill opponents if there are creeps for Chain Frost to bounce.`,
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "lich_chain_frost" },
  },
  {
    category: "OwnHero",
    hero: "Lich",
    audioFile: "ownHero/Lich_5_Defend towers",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      `Frost Shield is great for defending towers and delaying the enemy push.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lich_frost_shield" },
  },
  {
    category: "OwnHero",
    hero: "Lich",
    audioFile: "ownHero/Lich_6_Save ally",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, be quick at saving allies with Frost Shield and defensive items. Use other abilities afterwards.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "lich_frost_shield" },
  },
  {
    category: "OwnHero",
    hero: "Lich",
    audioFile: "ownHero/Lich_7_Push sidelanes",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out sidelanes with Frost Shield and Blast.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lich_frost_shield" },
  },

  {
    category: "EnemyHero",
    hero: "Lich",
    audioFile: "enemyHero/Lich_1_Strong laner",
    messageTime: -60,
    textMessage: "Lich is a strong laner. Bring extra consumables.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Lich",
    audioFile: "enemyHero/Lich_2_Frost shield",
    messageTime: -50,
    textMessage:
      "Frost Shield from Lich significantly reduces damage taken from right-clicks and it can be used on towers.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lich",
    audioFile: "enemyHero/Lich_3_Chain frost",
    messageTime: 8 * 60,
    textMessage:
      "Split up when Lich uses Chain Frost or run towards a group of creeps to pass the bounce away.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lich",
    audioFile: "enemyHero/Lich_4_Clump up",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Chain Frost.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lich",
    audioFile: "enemyHero/Lich_5_Antimagic items",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance and spell immunity items are great against Lich.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lich",
    audioFile: "enemyHero/Lich_6_Lotus orb",
    messageTime: 12 * 60 + 10,
    textMessage: "Lotus Orb is great at reflecting 3 spells of Lich.",
    audience: [Audience.ALL],
  },

  //49. Lifestealer | Earlier work
  {
    category: "OwnHero",
    hero: "Lifestealer",
    audioFile: "ownHero/Lifestealer_1_Rightclick feast",
    messageTime: 15,
    textMessage:
      "Right-click opponents as much as you can on the lane for extra damage and sustain from Feast.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "life_stealer_feast" },
  },
  {
    category: "OwnHero",
    hero: "Lifestealer",
    audioFile: "ownHero/Lifestealer_2_Helm of Iron Will",
    messageTime: 30,
    textMessage: "Rush Helm of Iron will on tough lanes.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "helm_of_iron_will" },
  },
  {
    category: "OwnHero",
    hero: "Lifestealer",
    audioFile: "ownHero/Lifestealer_3_Rage dispel",
    messageTime: 60,
    textMessage:
      "Consider investing a point in Rage early on if there's a need for dispel or spell-immunity.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "life_stealer_rage" },
  },
  {
    category: "OwnHero",
    hero: "Lifestealer",
    audioFile: "ownHero/Lifestealer_4_Rage tp",
    messageTimes: [6 * 60 + 45, 14 * 60 + 45, 22 * 60 + 45],
    textMessage: "You can save an ally by Infesting it.",
    audience: [Audience.ALL],
    image: { type: "item", name: "tpscroll" },
  },
  {
    category: "OwnHero",
    hero: "Lifestealer",
    audioFile: "ownHero/Lifestealer_5_Dispatch support",
    messageTime: 7 * 60,
    textMessage:
      "Once you hit 6, you are really hard to kill and you can dispatch your support to help other lanes.",
    audience: [Audience.ROLE_CARRY, Audience.ROLE_OFFLANE],
  },
  {
    category: "OwnHero",
    hero: "Lifestealer",
    audioFile: "ownHero/Lifestealer_6_Save ally",
    messageTimes: [7 * 60 + 15, 15 * 60 + 15, 23 * 60 + 15],
    textMessage: "You can save an ally by Infesting it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "life_stealer_infest" },
  },
  {
    category: "OwnHero",
    hero: "Lifestealer",
    audioFile: "ownHero/Lifestealer_7_Fight early",
    messageTimes: [10 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "Lifestealer doesn't farm fast but is decent at fighting in early to mid game. Join good looking fights.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Lifestealer",
    audioFile: "ownHero/Lifestealer_8_Gap close infest",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "If you have gap-closing ally you can choose to Infest him to be able to get on top of opponents quickly.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "life_stealer_infest" },
  },
  {
    category: "OwnHero",
    hero: "Lifestealer",
    audioFile: "ownHero/Lifestealer_9_Counter items",
    messageTimes: [10 * 60 + 45, 18 * 60 + 45, 26 * 60 + 15],
    textMessage:
      "Orchid, Basher and Scythe are problematic. Adjust your playstyle and itemization accordingly.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    hero: "Lifestealer",
    audioFile: "ownHero/Lifestealer_10_Slow siege",
    messageTime: 26 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "You can slow siege opponents' building by damaging it during Rage and then backing away.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "life_stealer_rage" },
  },

  {
    category: "EnemyHero",
    hero: "Lifestealer",
    audioFile: "enemyHero/Lifestealer_1_Chip damage",
    messageTime: -15,
    textMessage:
      "Chip damage doesn't work against Lifestealer as he is able to recover with Feast. If you manage to bring him below half HP it will be hard for him to feast as he risks dying",
    chatMessage:
      "Chip damage doesn't work against Lifestealer as he can Feast. Bring him below half HP to scare him",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Lifestealer",
    audioFile: "enemyHero/Lifestealer_2_Boots",
    messageTime: 1 * 60 + 30,
    textMessage:
      "Buy boots early against Lifestealer as he is a fast hero who often buys Venom Orb and rushes Phase Boots",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Lifestealer",
    audioFile: "enemyHero/Lifestealer_3_Spell immunity",
    messageTimes: [8 * 60 + 30, 15 * 60 + 30, 25 * 60 + 30],
    textMessage:
      "Items and spells that go through spell immunity are effective against Lifestealer",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lifestealer",
    audioFile: "enemyHero/Lifestealer_4_Escape",
    messageTimes: [4 * 60 + 45, 9 * 60 + 45],
    textMessage:
      "When you gank Lifestealer he will Rage and teleport out on first signs of trouble. Make sure you disable him before he rages if you do not yet have a disable that goes through spell immunity",
    chatMessage:
      "When you gank Lifestealer he will Rage and teleport out. Disable him before he rages",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lifestealer",
    audioFile: "enemyHero/Lifestealer_5_Team fights",
    messageTimes: [13 * 60 + 30, 23 * 60 + 30, 33 * 60 + 30],
    textMessage:
      "Lifestealer's main spell in fights is Rage. Play around it by disabling him or by saving heroes he is chasing",
    chatMessage:
      "Lifestealer's main spell in fights is Rage. Disable him or by save heroes he is chasing",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lifestealer",
    audioFile: "enemyHero/Lifestealer_6_Evasion",
    messageTimes: [26 * 60 + 30, 36 * 60 + 30],
    textMessage:
      "Lifestealer tends to have lots of evasion due to his level 20 talent and a Halberd purchase. Look to counter it by getting true strike items",
    chatMessage:
      "Lifestealer tends to have evasion due to his level 20 talent and Halberd. Counter it with true strike items",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lifestealer",
    audioFile: "enemyHero/Lifestealer_7_Infest",
    messageTimes: [18 * 60 + 30, 28 * 60 + 30, 38 * 60 + 30],
    textMessage:
      "Keep in mind that Lifestealer might be infested in the initiating hero or that he can use Infest to escape",
    audience: [Audience.ALL],
  },

  // 50. Lina | 03.03.2021
  {
    category: "OwnHero",
    hero: "Lina",
    audioFile: "ownHero/Lina_1_Light Strike Array trees",
    messageTime: -90,
    textMessage:
      "Light Strike Array destroys trees which can be useful against certain heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lina_light_strike_array" },
  },
  {
    category: "OwnHero",
    hero: "Lina",
    audioFile: "ownHero/Lina_2_Rightclick harass",
    messageTime: 10,
    textMessage:
      "Make use of Lina's long attack range to harass opponents in the lane frequently.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Lina",
    audioFile: "ownHero/Lina_3_Stun stationary",
    messageTime: 20,
    textMessage:
      "Lightstrike Array when opponents are somewhat stationary, e.g. when they are going for lasthit or deny.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lina_light_strike_array" },
  },
  {
    category: "OwnHero",
    hero: "Lina",
    audioFile: "ownHero/Lina_4_Secure ranged",
    messageTime: 30,
    textMessage:
      "Dragon Slave is great for securing ranged creep lasthits and harassing opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lina_dragon_slave" },
  },
/*   {
    category: "OwnHero",
    hero: "Lina",
    audioFile: "ownHero/Lina_5_Charge Fiery Soul",
    messageTimes: [2 * 60, 9 * 60, 16 * 60],
    textMessage: "Charge up Fiery Soul before leaving the base.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lina_fiery_soul" },
  }, */
  {
    category: "OwnHero",
    hero: "Lina",
    audioFile: "ownHero/Lina_6_Upkeep Fiery Soul",
    messageTimes: [7 * 60, 17 * 60, 27 * 60],
    textMessage:
      `Use Light Strike Array on creep waves to maintain Fiery Soul Stacks as it is cheaper and of shorter cooldown.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lina_light_strike_array" },
  },
  {
    category: "OwnHero",
    hero: "Lina",
    audioFile: "ownHero/Lina_7_Splitpush pickoff",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Lina is great at split-pushing and pick-offs due to high movement speed, great waveclear and damage burst.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Lina",
    audioFile: "ownHero/Lina_8_Physical",
    messageTime: 25 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      `In late game fights, use active spells on enemies to activate Fiery Soul as most of your damage will be physical.`,
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "lina_fiery_soul" },
  },

  {
    category: "EnemyHero",
    hero: "Lina",
    audioFile: "enemyHero/Lina_1_Light strike array",
    messageTime: -60,
    textMessage:
      "Lina's Light Strike Array has a long cast point. Look to dodge it.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Lina",
    audioFile: "enemyHero/Lina_2_Glass cannon",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Lina is a glass cannon type hero. Look to focus her in the fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lina",
    audioFile: "enemyHero/Lina_3_Antimagic items",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance and spell immunity items are great against Lina.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lina",
    audioFile: "enemyHero/Lina_4_Gap closing",
    messageTime: 12 * 60 + 10,
    textMessage: "Gap closing items are good at getting you on top of Lina.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lina",
    audioFile: "enemyHero/Lina_5_Splitpush",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Lina is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 51. Lion | Earlier work
  {
    category: "OwnHero",
    hero: "Lion",
    audioFile: "ownHero/Lion_1_EarthSpike",
    messageTime: 30,
    textMessage:
      "Use Earth Spike strategically so that you can get extra right-clicks in, deny a creep or secure a last hit.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Lion",
    audioFile: "ownHero/Lion_2_Hex",
    messageTime: 60,
    textMessage: "You can skill Hex on level 2 to score a kill.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Lion",
    audioFile: "ownHero/Lion_3_Illusions",
    messageTime: 90,
    textMessage: "Hex and Mana Drain destroy basic illusions instantly.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Lion",
    audioFile: "ownHero/Lion_4_FingerOfDeath",
    messageTime: 8 * 60,
    textMessage: "Make a move whenever you have Finger of Death available.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Lion",
    audioFile: "ownHero/Lion_5_Blink",
    messageTime: 10 * 60,
    textMessage:
      "When Finger of Death is on cooldown, use the time to farm your Blink Dagger.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Lion",
    audioFile: "ownHero/Lion_6_Initiate",
    messageTimes: [14 * 60, 19 * 60],
    textMessage:
      "Initiate on enemies with your long lasting disables, so your allies can follow-up for a kill.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Lion",
    audioFile: "ownHero/Lion_7_Vision",
    messageTime: 15 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Fight around good vision, so you can land multi-hero Earth Spikes.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Lion",
    audioFile: "ownHero/Lion_8_AghanimsShard",
    messageTime: 20 * 60,
    textMessage: "Aghanim's Shard is good at countering illusion-based heroes.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Lion",
    audioFile: "enemyHero/Lion_1_Fog of war",
    messageTime: 60,
    textMessage: "Use fog of war to cancel Lion's Mana Drain",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Lion",
    audioFile: "enemyHero/Lion_2_Anti-magic items",
    messageTime: 2 * 60 + 30,
    textMessage: "Opt for anti-magic damage items against Lion",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Lion",
    audioFile: "enemyHero/Lion_3_Finger of death",
    messageTime: 8 * 60,
    textMessage:
      "Be aware of Lion's level 6 Finger of Death. Infused Raindrop might help you to survive the burst",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lion",
    audioFile: "enemyHero/Lion_4_Lotus orb",
    messageTime: 10 * 60,
    textMessage:
      "Lotus Orb is an effective item against Lion as all of his spells are targetable",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lion",
    audioFile: "enemyHero/Lion_5_Team fights",
    messageTimes: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Look to target Lion in team fights as he provides a lot of control and magic damage against your cores and is also a very squishy hero",
    chatMessage:
      "Target Lion in team fights as he has control spells and magic damage and is also a squishy hero",
    audience: [Audience.ALL],
  },

  // 52. Lone Druid | 03.03.2021
  {
    category: "OwnHero",
    hero: "Lone Druid",
    audioFile: "ownHero/Lone Druid_1_Rune control",
    messageTime: -30,
    textMessage: "Control runes with hero and bear.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lone_druid_spirit_bear" },
  },
  {
    category: "OwnHero",
    hero: "Lone Druid",
    audioFile: "ownHero/Lone Druid_2_Entangle",
    messageTime: 15,
    textMessage:
      "Fish for entangle by poking opponents with a bear here and there. If it procs, you can do follow up damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lone_druid_spirit_bear" },
  },
  {
    category: "OwnHero",
    hero: "Lone Druid",
    audioFile: "ownHero/Lone Druid_3_Catapults",
    messageTimes: [5 * 60, 10 * 60],
    textMessage:
      "Make use of catapult waves. The bear can tank tower shots for a while.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lone_druid_spirit_bear" },
  },
  {
    category: "OwnHero",
    hero: "Lone Druid",
    audioFile: "ownHero/Lone Druid_4_In trouble",
    messageTimes: [5 * 60 + 15, 15 * 60 + 15],
    textMessage:
      "When in trouble, consider using Savage Roar and True Form. Lifesteal or body blocks from the bear can help.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lone_druid_savage_roar" },
  },
  {
    category: "OwnHero",
    hero: "Lone Druid",
    audioFile: "ownHero/Lone Druid_5_Dont show",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing your hero too much, especially at the start of the fight.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Lone Druid",
    audioFile: "ownHero/Lone Druid_6_Roshan",
    messageTime: 16 * 60 + 15,
    textMessage:
      "You can take Roshan fairy early by yourself or with minimal help. Tank with hero as the bear will heal you.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    hero: "Lone Druid",
    audioFile: "ownHero/Lone Druid_7_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Make sure to pick up Aghanim's Shard at the 20 minute mark. It provides drums-like buff and basic dispel.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Lone Druid",
    audioFile: "ownHero/Lone Druid_8_Aghanims Scepter",
    messageTimes: [25 * 60, 30 * 60],
    textMessage:
      "In tough late game scenarios, resort to ratting and Aghanim's Scepter makes it easier to execute.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Lone Druid",
    audioFile: "enemyHero/Lone Druid_1_Spirit link",
    messageTime: 60,
    textMessage:
      "Spirit Link heals Lone Druid every time the Bear hits. Burst Lone Druid or don't bother hitting him.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Lone Druid",
    audioFile: "enemyHero/Lone Druid_2_Spirit Bear",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Lone Druid buys items for the Spirit Bear. If you kill Spirit Bear twice, he does no damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lone Druid",
    audioFile: "enemyHero/Lone Druid_3_Tower defense",
    messageTimes: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Spirit Bear does a lot of damage to buildings. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lone Druid",
    audioFile: "enemyHero/Lone Druid_4_Extend game",
    messageTime: 15 * 60,
    textMessage:
      "Lone Druid is a snowbally hero and falls off as the game goes. Look to extend the game.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lone Druid",
    audioFile: "enemyHero/Lone Druid_5_Splitpush",
    messageTime: 20 * 60,
    textMessage:
      "Lone Druid is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 53. Luna | 04.03.2021
  {
    category: "OwnHero",
    hero: "Luna",
    audioFile: "ownHero/Luna_1_Beam lasthits",
    messageTime: 15,
    textMessage:
      "Use Lucent Beams to secure ranged creep lasthits if necessary.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "luna_lucent_beam" },
  },
  {
    category: "OwnHero",
    hero: "Luna",
    audioFile: "ownHero/Luna_2_Bless ally",
    messageTime: 30,
    textMessage:
      "Stay close enough to your ally so he benefits from Lunar Blessing.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "luna_lunar_blessing" },
  },
  {
    category: "OwnHero",
    hero: "Luna",
    audioFile: "ownHero/Luna_3_Beam points",
    messageTime: 2 * 60,
    textMessage:
      "If you have a strong lane, you can invest more points in Lucent Beam, otherwise up to two is more than enough.",
    audience: [Audience.ROLE_CARRY, Audience.ROLE_MID],
    image: { type: "ability", name: "luna_lucent_beam" },
  },
  {
    category: "OwnHero",
    hero: "Luna",
    audioFile: "ownHero/Luna_4_Stacks",
    messageTimes: [4 * 60, 8 * 60],
    textMessage:
      "Alert your teammates to stack for you as you can clear stacks easily with Moon Glaives.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "luna_moon_glaive" },
  },
  {
    category: "OwnHero",
    hero: "Luna",
    audioFile: "ownHero/Luna_5_Stacks",
    messageTimes: [4 * 60, 8 * 60],
    textMessage:
      "Alert your teammates to stack for you as you can clear stacks easily with Moon Glaives.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "luna_moon_glaive" },
  },
  {
    category: "OwnHero",
    hero: "Luna",
    audioFile: "ownHero/Luna_6_Night time",
    messageTimes: [5 * 60, 15 * 60],
    textMessage:
      "You can play more aggressively during the night due to Lunar Blessing vision distance increase.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "luna_lunar_blessing" },
  },
  {
    category: "OwnHero",
    hero: "Luna",
    audioFile: "ownHero/Luna_7_Manta farm",
    messageTimes: [15 * 60, 21 * 60],
    textMessage:
      "Make use of the Manta illusions to farm extra creepwaves you otherwise wouldn't be able to with your hero.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "manta" },
  },
  {
    category: "OwnHero",
    hero: "Luna",
    audioFile: "ownHero/Luna_7_Manta farm",
    messageTimes: [14 * 60 + 15, 19 * 60 + 15],
    textMessage:
      "Make use of the Manta illusions to farm extra creepwaves you otherwise wouldn't be able to with your hero.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "manta" },
  },
  {
    category: "OwnHero",
    hero: "Luna",
    audioFile: "ownHero/Luna_8_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard around the 20 minute mark to improve dps and provide vision in the beamed area.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Luna",
    audioFile: "ownHero/Luna_9_Backliners",
    messageTimes: [20 * 60 + 15, 25 * 60 + 15],
    textMessage:
      "Luna has trouble dealing with backliners but you can consider buying Aghanim's Scepter for it.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Luna",
    audioFile: "enemyHero/Luna_1_Early harass",
    messageTime: -60,
    textMessage:
      "Luna has short attack range and is susceptible to early harass, especially to magical damage.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Luna",
    audioFile: "enemyHero/Luna_2_Lunar blessing",
    messageTime: -50,
    textMessage:
      "Be mindful about Luna's increased night vision from Night Blessing.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Luna",
    audioFile: "enemyHero/Luna_3_Eclipse",
    messageTime: 8 * 60,
    textMessage:
      "Luna's Eclipse does a lot of damage. Keep distance from Luna or share damage with allied units.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Luna",
    audioFile: "enemyHero/Luna_4_Moon glaives",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Luna farms quickly due to Moon Glaives. Smoke on her, place deep wards and block camps with sentries.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Luna",
    audioFile: "enemyHero/Luna_5_Clump up",
    messageTimes: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Avoid clumping up in teamfights as the Moon Glaives will bounce between you and your allies.",
    audience: [Audience.ALL],
  },

  // 54. Lycan | 04.03.2021
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_1_Helm of Iron Will",
    messageTime: -90,
    textMessage: "Rush Helm of Iron Will to solve your health sustain issues.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "helm_of_iron_will" },
  },
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_2_Scout opponents",
    messageTime: -75,
    textMessage:
      "You can scout opponents' whereabouts with wolves before a 0 minute rune and check for the midlane ward.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lycan_summon_wolves" },
  },
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_3_Focus lasthitting",
    messageTime: 15,
    textMessage:
      "Focus on securing lasthits and denying as you have extra damage from the wolves and Feral Impulse.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "lycan_summon_wolves" },
  },
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_4_Dont feed summons",
    messageTimes: [30, 4 * 60 + 30],
    textMessage:
      "Avoid feeding summons to opponents. Deny them or send them away, perhaps to block a camp or control a rune.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lycan_summon_wolves" },
  },
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_5_Powerspike",
    messageTime: 4 * 60 + 45,
    textMessage:
      "Lycan's laning power spike is Helm of Dominator and level 6. Make use of it to score a kill and push the tower.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "helm_of_the_dominator" },
  },
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_6_Catapult",
    messageTime: 5 * 60,
    textMessage:
      "Delay death of the 5 minute catapult wave to meet Helm of the Dominator and level 6 power spike.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_7_Controlled creep",
    messageTime: 5 * 60,
    textMessage:
      "Overtake a neutral creep with a stun or root with the Helm of the Dominator so the opponents can't teleport out.",
    audience: [Audience.ALL],
    image: { type: "item", name: "helm_of_the_dominator" },
  },
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_8_Deny bounty",
    messageTimes: [7 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "When dominated creep is about to die, you can overtake another one and deny gold and experience to opponents.",
    audience: [Audience.ALL],
    image: { type: "item", name: "helm_of_the_dominator" },
  },
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_9_Push sidelanes",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines with summons. Black Dragon is particularly good for that.",
    audience: [Audience.ALL],
    image: { type: "item", name: "helm_of_the_overlord" },
  },
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_10_Roshan",
    messageTime: 15 * 60 + 15,
    textMessage:
      "Lycan is great at killing Roshan due to summons, Howl and auras. Bring him down by the 20min mark.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_11_Scout wolves",
    messageTime: 18 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Consider using wolves to scout in mid to late game. You can deny runes as well.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lycan_summon_wolves" },
  },
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_12_Aghanims Scepter",
    messageTimes: [22 * 60 + 15, 27 * 60 + 15],
    textMessage:
      "Aghanim's Scepter's Wolf Bite is a huge buff for one of your right-clicking cores.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    hero: "Lycan",
    audioFile: "ownHero/Lycan_13_Rat",
    messageTimes: [28 * 60 + 15, 33 * 60 + 15],
    textMessage:
      "In tough late game scenarios, resort to ratting and Aghanim's Shard makes it easier.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Lycan",
    audioFile: "enemyHero/Lycan_1_Early harass",
    messageTime: -60,
    textMessage:
      "Lycan is a low armor hero. Pressure him with your right-clicks.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Lycan",
    audioFile: "enemyHero/Lycan_2_Kill wolves",
    messageTime: -50,
    textMessage:
      "Try to kill the wolves, especially when they are on low levels.",
    audience: [Audience.IN_LANE],
  },
  // {category: "EnemyHero", hero: "Lycan", audioFile: "enemyHero/Lycan_3_Powerspike", messageTime: (8*60), textMessage: "Be aware of Lycan's level 6 and Necrobook 1 timing. Perhaps you can teleport out if you are quick enough.", audience: [Audience.IN_LANE]}, |patch 7.29| MESSAGE UPDATED
  {
    category: "EnemyHero",
    hero: "Lycan",
    audioFile: "enemyHero/Lycan_3_Powerspike",
    messageTime: 8 * 60,
    textMessage: "Be aware of Lycan's level 6 and Helm of Dominator timing.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Lycan",
    audioFile: "enemyHero/Lycan_4_Tower defense",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Lycan and his summons do a lot of damage to buildings. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lycan",
    audioFile: "enemyHero/Lycan_5_Extend game",
    messageTime: 12 * 60,
    textMessage:
      "Lycan is a snowbally hero and falls off. Look to extend the game. Don't be greedy with items.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lycan",
    audioFile: "enemyHero/Lycan_6_Item counters",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard and armor items are great against the physical damage output of Lycan and his units.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lycan",
    audioFile: "enemyHero/Lycan_7_Splitpushing",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Lycan is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Lycan",
    audioFile: "enemyHero/Lycan_8_Roshan",
    messageTimes: [15 * 60, 25 * 60, 35 * 60],
    textMessage:
      "Lycan is able to kill Roshan early on. Ward and check Roshpit.",
    audience: [Audience.ALL],
  },

  // 55. Magnus | 04.03.2021
  {
    category: "OwnHero",
    hero: "Magnus",
    audioFile: "ownHero/Magnus_1_Skewer trees",
    messageTime: -90,
    textMessage:
      "Skewer destroys trees which can be useful against certain heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "magnataur_skewer" },
  },
  {
    category: "OwnHero",
    hero: "Magnus",
    audioFile: "ownHero/Magnus_2_Skewer pillars",
    messageTimes: [-60, 12 * 60],
    textMessage:
      "When fighting close to pillars and cliffs, consider Skewering opponents on them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "magnataur_skewer" },
  },
  {
    category: "OwnHero",
    hero: "Magnus",
    audioFile: "ownHero/Magnus_3_Win lasthits",
    messageTime: 15,
    textMessage:
      "Magnus has huge base damage that is further amplified by Empower. Use to win the lane lasthit wise.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "magnataur_empower" },
  },
  {
    category: "OwnHero",
    hero: "Magnus",
    audioFile: "ownHero/Magnus_4_Combo play",
    messageTime: 60,
    textMessage:
      "When an opponent is close to your tower, consider making Shockwave into Skewer play.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "magnataur_skewer" },
  },
  {
    category: "OwnHero",
    hero: "Magnus",
    audioFile: "ownHero/Magnus_5_Clear stacks",
    messageTimes: [4 * 60, 8 * 60],
    textMessage:
      "Ask your teammates to make stacks for you as you can clear them with ease once Empower is maxed out.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "magnataur_empower" },
  },
  {
    category: "OwnHero",
    hero: "Magnus",
    audioFile: "ownHero/Magnus_6_Make stacks",
    messageTimes: [4 * 60 + 15, 8 * 60 + 15],
    textMessage:
      "Make stacks for your farming core and continuously Empower him.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "magnataur_empower" },
  },
  {
    category: "OwnHero",
    hero: "Magnus",
    audioFile: "ownHero/Magnus_7_RP turn",
    messageTimes: [6 * 60, 12 * 60, 18 * 60],
    textMessage:
      "Consider turning during Reverse Polarity animation to be able to Skewer stunned units towards allies right away.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "magnataur_reverse_polarity" },
  },
  {
    category: "OwnHero",
    hero: "Magnus",
    audioFile: "ownHero/Magnus_8_Farm blink",
    messageTimes: [6 * 60 + 15, 10 * 60 + 15],
    textMessage:
      "Don't rotate too much. Focus on farming Blink Dagger and then start playing more actively.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Magnus",
    audioFile: "ownHero/Magnus_9_Use blink",
    messageTime: 10 * 60 + 45,
    textMessage:
      "Once you have Blink Dagger, make use of it immediately before opponents are able to scout it.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Magnus",
    audioFile: "ownHero/Magnus_10_Dont show",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing yourself at the start of the fight. Wait for opponents to clump up and do your combo.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Magnus",
    audioFile: "ownHero/Magnus_11_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard at the 20 minute mark as it makes it easier for you to do your combos.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Magnus",
    audioFile: "enemyHero/Magnus_1_Skewer",
    messageTime: -60,
    textMessage:
      "Be careful not to get Skewered by Magnus under the opponent's tower.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Magnus",
    audioFile: "enemyHero/Magnus_2_Empower",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Empower is a great farming buff for Magnus and his melee cores. Contest their jungle and block camps.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Magnus",
    audioFile: "enemyHero/Magnus_3_Blink dagger",
    messageTime: 12 * 60,
    textMessage:
      "Be aware of Magnus's Blink Dagger timing. Look to cancel his Dagger in the fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Magnus",
    audioFile: "enemyHero/Magnus_4_Clump up",
    messageTimes: [12 * 60 + 10, 22 * 60 + 10, 32 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Blink Dagger into Reverse Polarity combos.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Magnus",
    audioFile: "enemyHero/Magnus_5_Reverse polarity cd",
    messageTimes: [12 * 60 + 20, 22 * 60 + 20, 32 * 60 + 20],
    textMessage:
      "Reverse Polarity has a long cooldown. Look to fight opponents when it is down.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Magnus",
    audioFile: "enemyHero/Magnus_6_Status resistance",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Status resistance items shorten the disable duration of Reverse Polarity.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Magnus",
    audioFile: "enemyHero/Magnus_7_Aegis",
    messageTimes: [15 * 60, 25 * 60, 35 * 60],
    textMessage:
      "Having Aegis on a core hero is a protection against Reverse Polarity. Kill Roshan on the first chance.",
    audience: [Audience.ALL],
  },

  // XXX. Marci | 31.10.2021
  {
    category: "OwnHero",
    hero: "Marci",
    audioFile: "ownHero/Marci_1_Dispose1",
    messageTime: -30,
    repeatTime: 20 * 60,
    textMessage:
      "Look to Dispose an enemy in direction of your allies or to stun more enemies on landing.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Marci",
    audioFile: "ownHero/Marci_2_Dispose2",
    messageTime: 10 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "You can Dispose an ally out of trouble, even from spells like Chronosphere or Black Hole.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Marci",
    audioFile: "ownHero/Marci_3_Rebound",
    messageTime: 3 * 60,
    repeatTime: 30 * 60,
    textMessage:
      "You can save an ally by using Rebound on him as it provides movement speed bonus.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Marci",
    audioFile: "ownHero/Marci_4_Dispel",
    messageTime: 14 * 60,
    repeatTime: 30 * 60,
    textMessage:
      "Be aware of spells and items that can dispel by Sidekick or Rebound.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Marci",
    audioFile: "ownHero/Marci_5_Kite",
    messageTime: 12 * 60,
    repeatTime: 30 * 60,
    textMessage:
      "Many spells and items can kite Marci during Unleash. Counter them with items or choose the right moment to engage and be ready to switch targets.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Marci",
    audioFile: "ownHero/Marci_6_Blink",
    messageTime: 16 * 60,
    textMessage:
      "Blink Dagger is a huge powerspike as it allows you to lock on or switch targets, initiate fights or save allies.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Marci",
    audioFile: "ownHero/Marci_7_Roshan",
    messageTime: 20 * 60,
    textMessage: "Unleash and Sidekick are great tools for killing Roshan.",
    audience: [Audience.ROLE_CORE],
  },

  {
    category: "EnemyHero",
    hero: "Marci",
    audioFile: "enemyHero/Marci_1_Spirit vessel",
    messageTime: -60,
    textMessage: "Someone should buy spirit Vessel against Marci's Sidekick.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Marci",
    audioFile: "enemyHero/Marci_2_Dispose",
    messageTime: -30,
    textMessage:
      "Avoid staying too close to Marci as you'll get Disposed easily.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Marci",
    audioFile: "enemyHero/Marci_3_Unleash",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Kite Marci's ultimate by either stopping her from attacking or disengaging.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Marci",
    audioFile: "enemyHero/Marci_4_Kiting items",
    messageTimes: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Acquire items that allow you to kite Marci's ultimate defensively or offensively.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Marci",
    audioFile: "enemyHero/Marci_5_Antihealing items",
    messageTimes: [12 * 60 + 10, 22 * 60 + 10, 32 * 60 + 10],
    textMessage:
      "Items that reduce healing and regeneration are good against Marci's Sidekick.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Marci",
    audioFile: "enemyHero/Marci_6_Dispel items",
    messageTimes: [12 * 60 + 20, 22 * 60 + 20, 32 * 60 + 20],
    textMessage:
      "Items that can dispel Sidekick or Rebound buff from Marci or her ally are great purchase.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Marci",
    audioFile: "enemyHero/Marci_7_Blink dagger",
    messageTime: 15 * 60,
    textMessage:
      "Be aware of Marci's Blink Dagger timing. She can easily gap close, setup kills with Dispose or lock on targets during Unleash.",
    chatMessage:
      "Be aware of Marci's Blink Dagger timing. She can easily gap close, setup kills with Dispose or Unleash.",
    audience: [Audience.ALL],
  },

  // 56. Mars | 04.03.2021
  {
    category: "OwnHero",
    hero: "Mars",
    audioFile: "ownHero/Mars_1_Secure ranged",
    messageTime: 15,
    textMessage:
      "Use God's Rebuke to secure ranged creep lasthits and harass the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mars_gods_rebuke" },
  },
  {
    category: "OwnHero",
    hero: "Mars",
    audioFile: "ownHero/Mars_2_Set up spear",
    messageTimes: [75, 6 * 60 + 15],
    textMessage:
      "You often want to set up a Spear of Mars by God's Rebuking first.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mars_spear" },
  },
  {
    category: "OwnHero",
    hero: "Mars",
    audioFile: "ownHero/Mars_3_Arena trees",
    messageTimes: [6 * 60, 14 * 60],
    textMessage:
      "Arena of Blood destroys trees in huge AoE which can be useful against certain heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mars_arena_of_blood" },
  },
  {
    category: "OwnHero",
    hero: "Mars",
    audioFile: "ownHero/Mars_4_Dont rush",
    messageTimes: [6 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "Don't rush spearing an enemy during Arena of Blood. It's oftentimes better to rebuke and spear with delay.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mars_arena_of_blood" },
  },
  {
    category: "OwnHero",
    hero: "Mars",
    audioFile: "ownHero/Mars_5_Protect allies",
    messageTimes: [6 * 60 + 30, 14 * 60 + 30, 22 * 60 + 30],
    textMessage:
      "You can protect your allies from ranged attacks by placing Arena of Blood or using Bulwark.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mars_arena_of_blood" },
  },
  {
    category: "OwnHero",
    hero: "Mars",
    audioFile: "ownHero/Mars_6_Dont over rotate",
    messageTimes: [6 * 60 + 45, 9 * 60 + 45],
    textMessage:
      "Don't over rotate. Focus on getting Blink Dagger or Eul's Scepter timely.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Mars",
    audioFile: "ownHero/Mars_7_Use blink",
    messageTime: 11 * 60,
    textMessage:
      "Make use of the Blink Dagger immediately before opponents are able to scout it.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Mars",
    audioFile: "ownHero/Mars_8_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard at minute 20 when dealing with illusion-based heroes.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Mars",
    audioFile: "ownHero/Mars_9_Gods Rebuke items",
    messageTimes: [21 * 60 + 15, 28 * 60 + 15],
    textMessage:
      "Attack modifying and proc items work with God's Rebuke. You can pick up Satanic in the late game for example.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mars_gods_rebuke" },
  },

  {
    category: "EnemyHero",
    hero: "Mars",
    audioFile: "enemyHero/Mars_1_Avoid trees",
    messageTime: -60,
    textMessage:
      "Avoid playing close to trees against Spear of Mars. Cut some with Quelling Blade and Tangoes.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Mars",
    audioFile: "enemyHero/Mars_2_Bulwark",
    messageTime: 30,
    textMessage:
      "Mars takes reduced damage from front and sides. Hit him from the back if possible.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Mars",
    audioFile: "enemyHero/Mars_3_Arena of blood 1",
    messageTime: 8 * 60,
    textMessage:
      "No range attacks can hit inside or outside of the Arena of Blood.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Mars",
    audioFile: "enemyHero/Mars_4_Arena of blood 2",
    messageTime: 8 * 60 + 10,
    textMessage: "Arena of Blood destroys all the trees around it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Mars",
    audioFile: "enemyHero/Mars_5_Blink dagger",
    messageTime: 12 * 60,
    textMessage:
      "Be aware of Mars's Blink Dagger timing. Look to cancel his Dagger in the fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Mars",
    audioFile: "enemyHero/Mars_6_Clump up",
    messageTimes: [12 * 60 + 10, 22 * 60 + 10, 32 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Blink Dagger into Arena of Blood combo.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Mars",
    audioFile: "enemyHero/Mars_7_Black king bar",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Black King Bar allows you to move in and out of Arena of Blood.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Mars",
    audioFile: "enemyHero/Mars_8_Break",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Break effects remove Bulwark and Mars becomes significantly weaker.",
    audience: [Audience.ALL],
  },

  // 57. Medusa | 04.03.2021
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_1_Secure ranged",
    messageTime: 15,
    textMessage: "Secure ranged creep with Mystic Snake if contested.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "medusa_mystic_snake" },
  },
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_2_Snake mana back",
    messageTime: 30,
    textMessage:
      "In order to get most of the mana back, Mystic snake needs to hit opponents and ranged creep.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "medusa_mystic_snake" },
  },
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_3_Stacks",
    messageTimes: [4 * 60, 8 * 60],
    textMessage:
      "Ask your teammates to stack for you as you can clear them early.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "medusa_split_shot" },
  },
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_4_Accelerate",
    messageTime: 5 * 60,
    textMessage:
      "From level 5, you can start clearing lane creeps quickly and farming camps nearby to accelerate your farm.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "medusa_mystic_snake" },
  },
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_5_Farm two camps",
    messageTimes: [5 * 60 + 15, 9 * 60 + 15],
    textMessage:
      "If possible, farm two neutral camps at the same time with Split Shot and Mystic Snake.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "medusa_split_shot" },
  },
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_6_Skill ulty",
    messageTime: 5 * 60 + 45,
    textMessage:
      "You don't have to skill Stone Gaze at level 6 unless you feel like you might be in danger.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "medusa_stone_gaze" },
  },
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_7_Neutral mana",
    messageTimes: [6 * 60, 12 * 60],
    textMessage:
      "If a neutral camp consists of multiple creeps with mana pools, Mystic Snake can regain you a lot of mana.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "medusa_mystic_snake" },
  },
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_8_Manta waves",
    messageTime: 13 * 60,
    textMessage:
      "Use Manta Style with Split Shot on to farm extra creepwaves that you can't with your hero.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "manta" },
  },
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_9_Stone Gaze rush",
    messageTime: 13 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Don't rush Stone Gazing in the fights. Make sure opponents are committed to the fight before you pop it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "medusa_stone_gaze" },
  },
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_10_Center",
    messageTime: 13 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Position yourself in the center of the fight to Split Shot multiple heros. Medusa does mediocre single-target damage.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "medusa_split_shot" },
  },
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_11_Snake big mana pool",
    messageTime: 13 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "Prioritize using Mystic Snake on high mana pool heroes in the fights.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "medusa_mystic_snake" },
  },
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_12_Mana burn",
    messageTime: 14 * 60,
    textMessage:
      "Mana burns are a big problem for Medusa. You can itemize against them or adapt the playstyle.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    hero: "Medusa",
    audioFile: "ownHero/Medusa_13_Divine Rapier",
    messageTimes: [25 * 60, 35 * 60],
    textMessage:
      "If things are going rough, consider purchasing Divine Rapier. Works well with Split Shot.",
    audience: [Audience.ALL],
    image: { type: "item", name: "rapier" },
  },

  {
    category: "EnemyHero",
    hero: "Medusa",
    audioFile: "enemyHero/Medusa_1_Mystic snake",
    messageTime: -60,
    textMessage:
      "Play on the side of the creepwave to avoid being hit by Mystic Snake - Medusa's main laning spell.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Medusa",
    audioFile: "enemyHero/Medusa_2_Stone gaze",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Look to kill Medusa before she activates her Ulti. If Stone Gaze is up, turn or run away from Medusa.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Medusa",
    audioFile: "enemyHero/Medusa_3_Contest farm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Medusa farms quickly due to Split Shot. Smoke on her, place deep wards and block off camps with sentries.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Medusa",
    audioFile: "enemyHero/Medusa_4_Mana burn",
    messageTime: 12 * 60,
    textMessage: "Mana burning spells and items are great against Medusa.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Medusa",
    audioFile: "enemyHero/Medusa_5_Counter items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard, armor items and Heaven's Halberd are great against Medusa.",
    audience: [Audience.ALL],
  },

  // 58. Meepo | 04.03.2021
  {
    category: "OwnHero",
    hero: "Meepo",
    audioFile: "ownHero/Meepo_1_Control runes",
    messageTimes: [2 * 60 + 45, 7 * 60 + 45],
    textMessage:
      "Meepo farms really fast. Focus on pushing out waves, optimizing farming routes and stacking.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "meepo_divided_we_stand" },
  },
  {
    category: "OwnHero",
    hero: "Meepo",
    audioFile: "ownHero/Meepo_2_Farm fast",
    messageTime: 4 * 60 + 15,
    textMessage:
      "Meepo farms really fast. Focus on pushing out waves, optimizing farming routes and stacking.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "meepo_poof" },
  },
  {
    category: "OwnHero",
    hero: "Meepo",
    audioFile: "ownHero/Meepo_3_Tempo",
    messageTime: 4 * 60 + 30,
    textMessage:
      "Meepo is a tempo hero that falls off over time. Hit your item timings, secure Roshan and play aggressively.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Meepo",
    audioFile: "ownHero/Meepo_4_Gank items",
    messageTime: 10 * 60 + 15,
    textMessage:
      "Once you have Blink Dagger or Ethereal Blade, look for pick-offs.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Meepo",
    audioFile: "ownHero/Meepo_5_Gank sidelanes",
    messageTimes: [12 * 60 + 30, 22 * 60 + 30],
    textMessage:
      "Keep sidelines pushed in and linger around with a clone to gank the opponents that appear depushing.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Meepo",
    audioFile: "ownHero/Meepo_6_Gank sidelanes",
    messageTime: 15 * 60 + 15,
    textMessage:
      "Meepo can take Roshan down on his own fairly early. Kill first Roshan before the 20 min mark.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    hero: "Meepo",
    audioFile: "enemyHero/Meepo_1_Spirit vessel",
    messageTime: -60,
    textMessage:
      "Someone should buy Spirit Vessel against Meepo to counter healing from Ransack.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Meepo",
    audioFile: "enemyHero/Meepo_2_Contest farm",
    messageTime: 6 * 60,
    textMessage:
      "Meepo farms quickly due to Poof. Smoke on him, place deep wards and block off camps with sentries.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Meepo",
    audioFile: "enemyHero/Meepo_3_Burst",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage: "Look to burst one of the Meepos and don't split your damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Meepo",
    audioFile: "enemyHero/Meepo_4_Tower defense",
    messageTime: 10 * 60 + 20,
    textMessage: "Meepo takes buildings down fast. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Meepo",
    audioFile: "enemyHero/Meepo_5_Greedy",
    messageTime: 12 * 60,
    textMessage:
      "Meepo is snowbally hero and falls off. Don't be greedy with items and allow him to pick you off.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Meepo",
    audioFile: "enemyHero/Meepo_6_Counter items",
    messageTime: 12 * 60 + 10,
    textMessage: "Crimson Guard and armor items are great against Meepo.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Meepo",
    audioFile: "enemyHero/Meepo_7_Roshan",
    messageTimes: [12 * 60 + 20, 22 * 60 + 20, 32 * 60 + 20],
    textMessage:
      "Meepo is able to solo kill Roshan early on. Ward and check Roshpit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Meepo",
    audioFile: "enemyHero/Meepo_8_Splitpush",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Meepo is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 59. Mirana | 04.03.2021
  {
    category: "OwnHero",
    hero: "Mirana",
    audioFile: "ownHero/Mirana_1_Big camp",
    messageTime: -90,
    textMessage:
      "Big pull camp must not be blocked. You want to use it for pulling or gain extra farm by arrowing the big creep.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    hero: "Mirana",
    audioFile: "ownHero/Mirana_2_Long range",
    messageTime: 10,
    textMessage:
      "Make use of Mirana's long attack range to harass without aggroing too often.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Mirana",
    audioFile: "ownHero/Mirana_3_Ranged creep",
    messageTime: 20,
    textMessage: "Secure ranged creeps with Sacred Arrow if necessary.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mirana_arrow" },
  },
  {
    category: "OwnHero",
    hero: "Mirana",
    audioFile: "ownHero/Mirana_4_Ranged creep",
    messageTimes: [5 * 60, 10 * 60],
    textMessage:
      "Arrow catapults to prevent your buildings from taking extra damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mirana_arrow" },
  },
  {
    category: "OwnHero",
    hero: "Mirana",
    audioFile: "ownHero/Mirana_5_Save ally",
    messageTimes: [8 * 60, 14 * 60],
    textMessage:
      "Look around the map to save an ally in trouble with Moonlight Shadow.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mirana_invis" },
  },

  {
    category: "EnemyHero",
    hero: "Mirana",
    audioFile: "enemyHero/Mirana_1_Observer ward",
    messageTime: -60,
    textMessage:
      "Bring an Observer Ward to the lane to be able to see Mirana's Sacred Arrows.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Mirana",
    audioFile: "enemyHero/Mirana_2_Creep shield",
    messageTime: -50,
    textMessage:
      "Play around your creeps and use them as a shield against Mirana's Sacred Arrow.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Mirana",
    audioFile: "enemyHero/Mirana_3_Block big camp",
    messageTime: -40,
    textMessage:
      "Consider blocking the big pull camp. Mirana likes to farm the big neutral creep with Sacred Arrow.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Mirana",
    audioFile: "enemyHero/Mirana_4_Roam",
    messageTimes: [3 * 60 + 30, 5 * 60 + 30, 7 * 60 + 30],
    textMessage:
      "Mirana roams a lot. Keep track of her movements and have teleport ready.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Mirana",
    audioFile: "enemyHero/Mirana_5_Observer sentry",
    messageTimes: [10 * 60 + 10, 18 * 60 + 10, 26 * 60 + 10],
    textMessage:
      "Pair Observer Wards and Sentries on map to see opponents approaching under Moonlight Shadow.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Mirana",
    audioFile: "enemyHero/Mirana_6_Detection",
    messageTimes: [10 * 60 + 20, 18 * 60 + 20, 26 * 60 + 20],
    textMessage: "Carry detection on multiple heroes against Moonlight Shadow.",
    audience: [Audience.ALL],
  },

  // 60. Monkey King | Earlier work
  {
    category: "OwnHero",
    hero: "Monkey King",
    audioFile: "ownHero/Monkey King_1_Mischief1",
    messageTime: -50,
    textMessage:
      "Turning into courier form with Mischief allows you to sneak up to opponents or snipe their couriers in the base. The opponents can't see you on minimap.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Monkey King",
    audioFile: "ownHero/Monkey King_2_Mischief2",
    messageTime: -20,
    textMessage:
      "Well timed Mischief allows you to dodge the damage coming from attacks and spells but not the debuffs coming with that spell or attack.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Monkey King",
    audioFile: "ownHero/Monkey King_3_BoundlessStrike",
    messageTime: 30,
    textMessage:
      "Consider skilling Boundless Strike on level 1 to secure range creep lasthit if you don't see yourself getting Jingu Mastery stacks up.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Monkey King",
    audioFile: "ownHero/Monkey King_4_JinguMastery",
    messageTime: 40,
    textMessage:
      "Acquiring Jingu stacks or a threat of getting them is the way Monkey King wins the lane. Orb of Venom and early boots help with that.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Monkey King",
    audioFile: "ownHero/Monkey King_5_TreeDance1",
    messageTime: 2 * 60 + 30,
    textMessage:
      "If the lane is rough consider putting more points in Tree Dance for creep clearing and work on solving mana issues to be able to spam it.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Monkey King",
    audioFile: "ownHero/Monkey King_6_CuttingTrees",
    messageTime: 3 * 60 + 30,
    repeatTime: 20 * 60,
    textMessage:
      "Many spells and items can cut trees you are standing on, including those coming from your allies. Be careful about that.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Monkey King",
    audioFile: "ownHero/Monkey King_7_TreeDance2",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Pillar and Tinker wards as well as spells that provide flying vision when used, can spot you standing on the trees.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Monkey King",
    audioFile: "ownHero/Monkey King_8_WukongCommand1",
    messageTime: 6 * 60 + 30,
    textMessage:
      "You should skip skilling Wukong Command on level 6 in most of the games as it is hard to keep opponents inside of it early on.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Monkey King",
    audioFile: "ownHero/Monkey King_9_WukongCommand2",
    messageTime: 7 * 60 + 30,
    textMessage:
      "Channeling Wukong command from a tree will make you drop down from it without being stunned. You can jump back on the tree and the ulty will keep going.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Monkey King",
    audioFile: "ownHero/Monkey King_10_WukongCommand3",
    messageTime: 10 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "To get a good Wukong Command ideally channel it outside of opponents' vision and follow up with Boundless Strike. ",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Monkey King",
    audioFile: "ownHero/Monkey King_11_Soldiers",
    messageTime: 16 * 60,
    textMessage:
      "Items that modify attacks or have proc chance - except for Basher - will work on Monkey King soldiers.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Monkey King",
    audioFile: "enemyHero/Monkey King_1_Melee cores",
    messageTime: -90,
    textMessage:
      "Monkey King is one of the strongest laners against melee heroes, as it is easy for him to get Jingu Mastery stacks up. Ranged heroes have better time against him in general as he has low armor and simple right clicks tend to do good work",
    chatMessage:
      "Monkey King is strong laner against melee heroes due to Jingu Mastery. Consider picking ranged hero",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Monkey King",
    audioFile: "enemyHero/Monkey King_2_Speed",
    messageTime: -60,
    textMessage:
      "Early boots or even a Windlace are advisable for melee cores against Monkey King",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Monkey King",
    audioFile: "enemyHero/Monkey King_3_Mischief",
    messageTime: -30,
    textMessage:
      "Be careful on initial bounty runes as Monkey might come from behind while under the effect of Mischief (as courier). You can't see him on the minimap while under the effect of Mischief. He also doesn't aggro towers while Mischiefed so he might even run into your base and snipe couriers",
    chatMessage:
      "Monkey might come from behind while under the effect of Mischief. You can't see him on the minimap",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Monkey King",
    audioFile: "enemyHero/Monkey King_4_Jingu mastery 1",
    messageTime: 15,
    textMessage:
      "Prevent Monkey King from getting four stacks of Jingu Mastery. But if it happens avoid staying in one line for multi-hero Boundless Strike",
    chatMessage:
      "Prevent Monkey King from getting four stacks of Jingu Mastery",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Monkey King",
    audioFile: "enemyHero/Monkey King_5_Melee laning",
    messageTime: 50,
    textMessage:
      "Melee cores should avoid laning directly against Monkey King. Try to hijack, skip or pull creeps",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Monkey King",
    audioFile: "enemyHero/Monkey King_6_Cutting trees",
    messageTime: 2 * 60 + 15,
    textMessage:
      "Cutting trees that Monkey King stands on stuns him for 4 seconds. Having a quelling blade or a tree cutting ability is very useful against him",
    chatMessage:
      "Cutting trees that Monkey King stands on stuns him for 4 seconds",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Monkey King",
    audioFile: "enemyHero/Monkey King_7_Jingu mastery 2",
    messageTime: 8 * 60 + 30,
    textMessage:
      "Break effects are good at reducing Monkey Kings' damage output and Spirit Vessel reduces healing from Jingu Mastery stacks",
    chatMessage:
      "Break effects reduce Monkey Kings' damage output and Spirit Vessel reduces healing from Jingu Mastery",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Monkey King",
    audioFile: "enemyHero/Monkey King_8_Ultimate",
    messageTimes: [16 * 60 + 30, 36 * 60 + 30, 56 * 60 + 30],
    textMessage:
      "Monkey King's ultimate grants him bonus armor and he therefore takes little physical damage. Dealing magical and pure damage is the priority. If Monkey King uses Black King Bar you should not fight him inside Wukong's Command ring",
    chatMessage:
      "Monkey King takes little physical damage inside Wukong's Command ring. Magical and pure damage are good",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Monkey King",
    audioFile: "enemyHero/Monkey King_9_Force out",
    messageTimes: [26 * 60 + 30, 46 * 60 + 30],
    textMessage:
      "Items and abilities that force Monkey King out of his ultimate are valuable",
    audience: [Audience.ALL],
  },

  // 61. Morphling | 04.03.2021
  {
    category: "OwnHero",
    hero: "Morphling",
    audioFile: "ownHero/Morphling_1_Outlasthit",
    messageTime: 10,
    textMessage: "Focus on outlasthiting opponents with high base damage.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "morphling_morph_agi" },
  },
  {
    category: "OwnHero",
    hero: "Morphling",
    audioFile: "ownHero/Morphling_2_Avoid harass",
    messageTime: 20,
    textMessage:
      "Avoid taking much harass damage early as you'll be forced to attribute shift to strength.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "morphling_morph_str" },
  },
  {
    category: "OwnHero",
    hero: "Morphling",
    audioFile: "ownHero/Morphling_3_Sustain",
    messageTime: 30,
    textMessage: "Rush Morbid Mask for hp sustain on a mediocre to tough lane.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "lifesteal" },
  },
  {
    category: "OwnHero",
    hero: "Morphling",
    audioFile: "ownHero/Morphling_4_Agility heal",
    messageTime: 40,
    textMessage:
      "Whenever you drop low on health, shift to agility before using health consumables or stick.",
    audience: [Audience.ALL],
    image: { type: "item", name: "flask" },
  },
  {
    category: "OwnHero",
    hero: "Morphling",
    audioFile: "ownHero/Morphling_5_Adaptive ranged",
    messageTime: 60,
    textMessage:
      "Consider putting a point in Adaptive Strike on level 2 if you have issues securing range creep lasthit.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "morphling_adaptive_strike_agi" },
  },
  {
    category: "OwnHero",
    hero: "Morphling",
    audioFile: "ownHero/Morphling_6_Morph strengh trouble",
    messageTimes: [75, 9 * 60 + 15, 17 * 60 + 15],
    textMessage:
      "Start morphing into strength right away if you expect to be jumped.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "morphling_morph_str" },
  },
  {
    category: "OwnHero",
    hero: "Morphling",
    audioFile: "ownHero/Morphling_7_Heal reductions",
    messageTime: 8 * 60,
    textMessage:
      "Healing reductions and silences are a big problem for Morph and early Manta can dispel both in many cases.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "manta" },
  },
  {
    category: "OwnHero",
    hero: "Morphling",
    audioFile: "ownHero/Morphling_8_Dont full agility",
    messageTimes: [9 * 60, 14 * 60, 19 * 60],
    textMessage:
      "Don't be morphed fully into agility when moving around or before the fight.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "morphling_morph_str" },
  },
  {
    category: "OwnHero",
    hero: "Morphling",
    audioFile: "ownHero/Morphling_9_Ethereal Blade",
    messageTime: 9 * 60 + 30,
    textMessage:
      "Rush Ethereal Blade if you don't need Manta as you can burst squishier heroes with it.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ethereal_blade" },
  },
  {
    category: "OwnHero",
    hero: "Morphling",
    audioFile: "ownHero/Morphling_10_Ethereal Blade",
    messageTime: 18 * 60 + 30,
    textMessage:
      "Aghanim's Scepter is really good if you have allies like Earthshaker, Dark Willow, Spirit Breaker.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Morphling",
    audioFile: "enemyHero/Morphling_1_Sprit Vessel",
    messageTime: -60,
    textMessage:
      "Someone should buy Spirit Vessel against Morphling to offset Attribute Shift strength gain.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Morphling",
    audioFile: "enemyHero/Morphling_2_Pressure early",
    messageTime: -50,
    textMessage:
      "Morphling is very weak until level 3 when he gets second point in Attribute Shift. Pressure him early on.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Morphling",
    audioFile: "enemyHero/Morphling_3_Low hp pool",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Morphling tends to play on a low hp pool. Surprise him with smoke, instant disable, silence or invisibility.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Morphling",
    audioFile: "enemyHero/Morphling_4_Focus",
    messageTimes: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Focus Morphling in the fights or he will do insane amounts of damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Morphling",
    audioFile: "enemyHero/Morphling_5_Ethereal",
    messageTime: 13 * 60,
    textMessage:
      "Be aware of Ethereal Blade timing on Morphling. He can solo kill most of the heroes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Morphling",
    audioFile: "enemyHero/Morphling_6_Eye of Skadi",
    messageTime: 15 * 60,
    textMessage:
      "Eye of Skadi is good against Morphing to offset Attribute Shift strength gain and to slow him.",
    audience: [Audience.ALL],
  },

  // 62. Naga Siren | 05.03.2021
  {
    category: "OwnHero",
    hero: "Naga Siren",
    audioFile: "ownHero/Naga Siren_1_Mirror Images dispel",
    messageTime: -75,
    textMessage: "Mirror Image applies basic dispel on cast.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "naga_siren_mirror_image" },
  },
  {
    category: "OwnHero",
    hero: "Naga Siren",
    audioFile: "ownHero/Naga Siren_2_Mirror Images annoying",
    messageTimes: [-60, 7 * 60 + 30, 17 * 60 + 30],
    textMessage:
      "Mirror Images can be used to deny runes or to deceive the opponents about your hero's presence.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "naga_siren_mirror_image" },
  },
  {
    category: "OwnHero",
    hero: "Naga Siren",
    audioFile: "ownHero/Naga Siren_3_Unblock camps",
    messageTime: -45,
    textMessage:
      "Make sure pull camps are unblocked as the lane will be pushing frequently due to Rip Tide.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    hero: "Naga Siren",
    audioFile: "ownHero/Naga Siren_4_Mirror Images lasthitting",
    messageTime: 15,
    textMessage:
      "Use Mirror Images non stop to have an upper hand when it comes to lasthitting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "naga_siren_mirror_image" },
  },
  {
    category: "OwnHero",
    hero: "Naga Siren",
    audioFile: "ownHero/Naga Siren_5_Ensnare kill",
    messageTime: 2 * 60,
    textMessage:
      "Consider putting a point in Ensnare but only if you can get a kill out of it.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "naga_siren_ensnare" },
  },
  {
    category: "OwnHero",
    hero: "Naga Siren",
    audioFile: "ownHero/Naga Siren_6_Dont overlane",
    messageTime: 2 * 60 + 15,
    textMessage:
      "Naga is not a particularly good laning hero. Get as many levels as you can and move to the jungle.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Naga Siren",
    audioFile: "ownHero/Naga Siren_7_Push sidelanes",
    messageTimes: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Keep sidelines pushed out by illusions and farm opponents' camps more and more as you get stronger.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "naga_siren_mirror_image" },
  },
  {
    category: "OwnHero",
    hero: "Naga Siren",
    audioFile: "ownHero/Naga Siren_8_Song in time",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Be quick at judging the situation and pop Song of Siren when it starts going downhill.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "naga_siren_song_of_the_siren" },
  },
  {
    category: "OwnHero",
    hero: "Naga Siren",
    audioFile: "ownHero/Naga Siren_9_Song Roshan",
    messageTime: 15 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage: "You can use Song of the Siren to secure Roshan kill.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "naga_siren_song_of_the_siren" },
  },
  {
    category: "OwnHero",
    hero: "Naga Siren",
    audioFile: "ownHero/Naga Siren_10_Song Roshan",
    messageTimes: [19 * 60 + 15, 24 * 60],
    textMessage:
      "Aghanim's Scepter is a great pick up to control spell-immune heroes.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Naga Siren",
    audioFile: "enemyHero/Naga Siren_1_Kill images",
    messageTime: -60,
    textMessage:
      "Kill Mirror Images to cripple Naga's last hitting capabilities on the lane.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Naga Siren",
    audioFile: "enemyHero/Naga Siren_2_Mirror image",
    messageTime: -50,
    textMessage: "Hex, Drains and Dagon destroy Mirror Images instantly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Naga Siren",
    audioFile: "enemyHero/Naga Siren_3_Contest farm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Naga Siren farms quickly with Mirror Images. Smoke on her, place deep wards and block camps with sentries.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Naga Siren",
    audioFile: "enemyHero/Naga Siren_4_AoE items",
    messageTime: 12 * 60,
    textMessage:
      "Items that provide AoE damage, especially magical damage, are great at dealing with Mirror Images.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Naga Siren",
    audioFile: "enemyHero/Naga Siren_5_Counter items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard and armor items are great against Naga's physical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Naga Siren",
    audioFile: "enemyHero/Naga Siren_6_Boots of travel",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Naga is great at split-pushing and ratting. Consider getting Boots of Travel on a Core.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Naga Siren",
    audioFile: "enemyHero/Naga Siren_7_Roshan",
    messageTimes: [15 * 60, 25 * 60, 35 * 60],
    textMessage:
      "Naga can pop Song of the Siren and finish Roshan. Be mindful about it when taking or contesting Roshan.",
    audience: [Audience.ALL],
  },

  // 63. Nature's Prophet | 05.03.2021
  {
    category: "OwnHero",
    hero: "Nature's Prophet",
    audioFile: "ownHero/Nature's Prophet_1_Treants job",
    messageTime: -75,
    textMessage:
      "Treants are not only good for lasthitting or harassing but also to scout, block off camps and deny runes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_force_of_nature" },
  },
  {
    category: "OwnHero",
    hero: "Nature's Prophet",
    audioFile: "ownHero/Nature's Prophet_2_Bodyblock",
    messageTimes: [-15, 6 * 60 + 45, 12 * 60 + 45],
    textMessage:
      "Consider bodyblocking opponents with treants when going for a kill or trying to escape.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_force_of_nature" },
  },
  {
    category: "OwnHero",
    hero: "Nature's Prophet",
    audioFile: "ownHero/Nature's Prophet_3_Tp heal",
    messageTime: 60,
    textMessage:
      "When low on health, consider using tp scroll to go back to base and teleport back with the spell.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_teleportation" },
  },
  {
    category: "OwnHero",
    hero: "Nature's Prophet",
    audioFile: "ownHero/Nature's Prophet_4_Look around",
    messageTime: 75,
    repeatTime: 10 * 60,
    textMessage:
      "Look around the map for opportunities to gank, snipe couriers, pick up runes or place deep wards.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_wrath_of_nature" },
  },
  {
    category: "OwnHero",
    hero: "Nature's Prophet",
    audioFile: "ownHero/Nature's Prophet_5_Tango Sprout",
    messageTime: 2 * 60 + 15,
    textMessage:
      "Using Tango on a Sprout tree provides more health regeneration.",
    audience: [Audience.ALL],
    image: { type: "item", name: "tango" },
  },
  {
    category: "OwnHero",
    hero: "Nature's Prophet",
    audioFile: "ownHero/Nature's Prophet_6_Sprout vision",
    messageTimes: [2 * 60 + 30, 12 * 60 + 30, 22 * 60 + 30],
    textMessage:
      "Sprout provides vision in the area and can be useful to scout pillars for wards or Roshan.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_sprout" },
  },
  {
    category: "OwnHero",
    hero: "Nature's Prophet",
    audioFile: "ownHero/Nature's Prophet_7_Sprout vision",
    messageTimes: [2 * 60 + 45, 12 * 60 + 45, 22 * 60 + 45],
    textMessage:
      "Save yourself or an ally by placing Sprout strategically. It is great for kitting spell-immune opponents.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_sprout" },
  },
  {
    category: "OwnHero",
    hero: "Nature's Prophet",
    audioFile: "ownHero/Nature's Prophet_8_Sprout vision",
    messageTimes: [3 * 60, 12 * 60],
    textMessage: "Sprout can push you up or down the cliff or pillar.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_sprout" },
  },
  {
    category: "OwnHero",
    hero: "Nature's Prophet",
    audioFile: "ownHero/Nature's Prophet_9_Sprout vision",
    messageTimes: [6 * 60, 9 * 60],
    textMessage:
      "Typically, use Wrath of Nature on the opposite side of the map from where you want it to hit hard.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_wrath_of_nature" },
  },
  {
    category: "OwnHero",
    hero: "Nature's Prophet",
    audioFile: "ownHero/Nature's Prophet_10_Push sidelanes",
    messageTimes: [10 * 60 + 15, 18 * 60 + 15, 26 * 60 + 15],
    textMessage:
      "When not much is happening, push out the sidelines with your hero and summons.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_force_of_nature" },
  },
  {
    category: "OwnHero",
    hero: "Nature's Prophet",
    audioFile: "ownHero/Nature's Prophet_11_Ratting",
    messageTimes: [12 * 60 + 15, 20 * 60 + 15, 28 * 60 + 15],
    textMessage:
      "Nature's Prophet excels at ratting, so resort to it if the game slows down or you fall behind.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_force_of_nature" },
  },

  {
    category: "EnemyHero",
    hero: "Nature's Prophet",
    audioFile: "enemyHero/Nature's Prophet_1_Courier sniping",
    messageTime: -60,
    textMessage:
      "Nature's Prophet is great at sniping couriers. Fly courier over trees when possible",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Nature's Prophet",
    audioFile: "enemyHero/Nature's Prophet_2_Antisprout items",
    messageTime: 30,
    textMessage:
      "To counter Nature Prophet's Sprout, buy Quelling Blade, Tangoes or Force Staff.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Nature's Prophet",
    audioFile: "enemyHero/Nature's Prophet_3_Tango sprout",
    messageTime: 40,
    textMessage:
      "Using Tango on Sprout tree gives you twice as much regeneration.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Nature's Prophet",
    audioFile: "enemyHero/Nature's Prophet_4_Wrath of nature",
    messageTime: 8 * 60,
    textMessage: "Wrath of Nature can hit you with up to 400 damage at level6.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Nature's Prophet",
    audioFile: "enemyHero/Nature's Prophet_5_Wrath of nature vision",
    messageTime: 8 * 60 + 10,
    textMessage:
      "If Wrath of Nature hits you and there are no enemies around, then you are close to an Observer ward.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Nature's Prophet",
    audioFile: "enemyHero/Nature's Prophet_6_Tower defense",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Nature's Prophet can take down buildings fast. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Nature's Prophet",
    audioFile: "enemyHero/Nature's Prophet_7_Splitpushing",
    messageTime: 12 * 60,
    textMessage:
      "Nature's Prophet is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 64. Necrophos | 05.03.2021
  {
    category: "OwnHero",
    hero: "Necrophos",
    audioFile: "ownHero/Necrophos_1_Big camp",
    messageTime: -90,
    textMessage:
      "Big camp needs to be open for pulling as the lane will push often due to Death Pulse.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    hero: "Necrophos",
    audioFile: "ownHero/Necrophos_2_Sustain",
    messageTime: -30,
    textMessage:
      "Necrophos typically wins the lane off of his sustain. Lasthitting needs to be on point.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "necrolyte_heartstopper_aura" },
  },
  {
    category: "OwnHero",
    hero: "Necrophos",
    audioFile: "ownHero/Necrophos_3_Death Pulse multitasking",
    messageTime: 10,
    textMessage:
      "Do multiple things with Death Pulse at the same time - secure lasthit, harass opponents and heal an ally.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "necrolyte_death_pulse" },
  },
  {
    category: "OwnHero",
    hero: "Necrophos",
    audioFile: "ownHero/Necrophos_4_Screw lasthits",
    messageTime: 20,
    textMessage:
      "Mess around with opponents' lasthitting by healing the creeps and damaging opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "necrolyte_death_pulse" },
  },
  {
    category: "OwnHero",
    hero: "Necrophos",
    audioFile: "ownHero/Necrophos_5_Stay close",
    messageTime: 75,
    textMessage:
      "Keep yourself close enough to opponents for Heartstopper Aura to damage them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "necrolyte_heartstopper_aura" },
  },
  {
    category: "OwnHero",
    hero: "Necrophos",
    audioFile: "ownHero/Necrophos_6_In trouble",
    messageTimes: [2 * 60, 9 * 60, 16 * 60],
    textMessage:
      "If in trouble, pop Ghost Shroud and then any healing you might have. You can potentially teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "necrolyte_sadist" },
  },
  {
    category: "OwnHero",
    hero: "Necrophos",
    audioFile: "ownHero/Necrophos_7_Hood of Defiance",
    messageTimes: [3 * 60 + 15, 6 * 60 + 15],
    textMessage:
      "Ghost Shroud makes you vulnerable to magical damage so you typically need a Hood of Defiance.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "hood_of_defiance" },
  },
  {
    category: "OwnHero",
    hero: "Necrophos",
    audioFile: "ownHero/Necrophos_8_Counters",
    messageTimes: [6 * 60, 12 * 60],
    textMessage:
      "Healing reductions and silences are a big problem for Necrophos. Itemize against those and adjust playstyle.",
    audience: [Audience.ALL],
    image: { type: "item", name: "cyclone" },
  },
  {
    category: "OwnHero",
    hero: "Necrophos",
    audioFile: "ownHero/Necrophos_9_Kill at start",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Look to score a kill at the beginning of the fight as you'll be considerably harder to kill afterwards.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "necrolyte_heartstopper_aura" },
  },
  {
    category: "OwnHero",
    hero: "Necrophos",
    audioFile: "ownHero/Necrophos_10_Black King Bar",
    messageTime: 12 * 60 + 15,
    textMessage: "Ghost Shroud has no effect during Black King Bar.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    hero: "Necrophos",
    audioFile: "ownHero/Necrophos_11_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard at the 20 minute mark as it provides additional offensive and defensive utilities.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Necrophos",
    audioFile: "enemyHero/Necrophos_1_Spirit Vessel",
    messageTime: -60,
    textMessage:
      "To counter Necrophos' healing and regeneration, someone should buy Spirit Vessel",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Necrophos",
    audioFile: "enemyHero/Necrophos_2_Burst",
    messageTime: -50,
    textMessage:
      "Burst Necrophos down, so he can't last hit creeps and regain HP and mana with Heartstopper Aura.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Necrophos",
    audioFile: "enemyHero/Necrophos_3_Ghost Shroud",
    messageTime: 30,
    textMessage: "Necrophos takes increased magical damage under Ghost Shroud.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Necrophos",
    audioFile: "enemyHero/Necrophos_4_Reapers Scythe",
    messageTime: 8 * 60,
    textMessage:
      "Against Necrophos, keep your health above 60% to avoid being killed by Reaper's Scythe.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Necrophos",
    audioFile: "enemyHero/Necrophos_5_Antimagic items",
    messageTime: 12 * 60,
    textMessage:
      "Against Necrophos, magic resistance and spell immunity items are great.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Necrophos",
    audioFile: "enemyHero/Necrophos_6_Antihealing items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Against Necrophos, items that reduce healing and regeneration are good.",
    audience: [Audience.ALL],
  },

  // 65. Night Stalker | 05.03.2021
  {
    category: "OwnHero",
    hero: "Night Stalker",
    audioFile: "ownHero/Night Stalker_1_Run down mid",
    messageTime: -90,
    textMessage:
      "Run down mid as you load into the game and scout for opponents' midlaner placing observer ward.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    hero: "Night Stalker",
    audioFile: "ownHero/Night Stalker_2_Vision",
    messageTime: -80,
    textMessage:
      "Night Stalker has great night vision but very limited day vision.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Night Stalker",
    audioFile: "ownHero/Night Stalker_3_Survive day",
    messageTime: 10,
    textMessage:
      "Look to survive through the first 5 minutes of the game and ideally have the boots as the night hits.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Night Stalker",
    audioFile: "ownHero/Night Stalker_4_Void creeps",
    messageTime: 20,
    textMessage: "Use Void to secure ranged creep lasthits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "night_stalker_void" },
  },
  {
    category: "OwnHero",
    hero: "Night Stalker",
    audioFile: "ownHero/Night Stalker_5_Crippling Fear",
    messageTime: 4 * 60,
    textMessage:
      "Keep a skill point or opt to skill Crippling Fear as the first night approaches if it is necessary to score a kill.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "night_stalker_crippling_fear" },
  },
  {
    category: "OwnHero",
    hero: "Night Stalker",
    audioFile: "ownHero/Night Stalker_6_Night aggression",
    messageTimes: [4 * 60 + 50, 14 * 60 + 50],
    textMessage:
      "Play and farm aggressively during the night time and provide additional vision for your team.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Night Stalker",
    audioFile: "ownHero/Night Stalker_7_Tp cancel",
    messageTimes: [5 * 60, 15 * 60],
    textMessage:
      "When going to kill, be careful with Voiding right away as the opponent might just teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "night_stalker_void" },
  },
  {
    category: "OwnHero",
    hero: "Night Stalker",
    audioFile: "ownHero/Night Stalker_8_Avoid fighting",
    messageTimes: [9 * 60 + 50, 19 * 60 + 50],
    textMessage:
      "Avoid fighting when it's daytime and Dark Ascension is down, play defensively or push out lanes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "night_stalker_darkness" },
  },
  {
    category: "OwnHero",
    hero: "Night Stalker",
    audioFile: "ownHero/Night Stalker_9_Backliners and supports",
    messageTimes: [10 * 60 + 15, 15 * 60 + 15],
    textMessage:
      "Prioritize dealing with backliners and supports in fights, especially once you have Blink Dagger.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },

  {
    category: "EnemyHero",
    hero: "Night Stalker",
    audioFile: "enemyHero/Night Stalker_1_Pressure early",
    messageTime: 10,
    textMessage:
      "Night Stalker is weak in the first 5 minutes of the game. Pressure him early.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Night Stalker",
    audioFile: "enemyHero/Night Stalker_2_5 minutes",
    messageTime: 4 * 60 + 30,
    textMessage:
      "Night Stalker will fight you at the 5 minute mark, as night time will hit.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Night Stalker",
    audioFile: "enemyHero/Night Stalker_3_Dark Ascension",
    messageTime: 8 * 60,
    textMessage:
      "Night Stalker's Dark Ascension will allow him to see you inside or behind trees.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Night Stalker",
    audioFile: "enemyHero/Night Stalker_4_Daytime",
    messageTimes: [8 * 60 + 10, 18 * 60 + 10, 28 * 60 + 10],
    textMessage:
      "Look to fight during daytime and when Dark Ascension is down.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Night Stalker",
    audioFile: "enemyHero/Night Stalker_5_Force",
    messageTime: 12 * 60,
    textMessage:
      "Force Staff and Hurricane Pike are great items against Night Stalker's Crippling Fear.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Night Stalker",
    audioFile: "enemyHero/Night Stalker_6_Break",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Break effects remove Hunter in the Night and Nightstalker becomes significantly weaker.",
    audience: [Audience.ALL],
  },

  // 66. Nyx Assassin | 05.03.2021
  {
    category: "OwnHero",
    hero: "Nyx Assassin",
    audioFile: "ownHero/Nyx Assassin_1_Weak laner",
    messageTime: -60,
    textMessage:
      "Nyx is a fairly weak laner. Focus on creep equilibrium, pulling and securing runes for midlaner.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Nyx Assassin",
    audioFile: "ownHero/Nyx Assassin_2_Mana Burn lane",
    messageTime: -30,
    textMessage:
      `You can skill Mana Burn on level 2 or 4 if laning against an intelligence hero that harasses a lot with spells.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "nyx_assassin_mana_burn" },
  },
  {
    category: "OwnHero",
    hero: "Nyx Assassin",
    audioFile: "ownHero/Nyx Assassin_3_Impale ranged",
    messageTime: 15,
    textMessage:
      "Use Impale to secure ranged creep and stun opponents at the same time if possible.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "nyx_assassin_impale" },
  },
  {
    category: "OwnHero",
    hero: "Nyx Assassin",
    audioFile: "ownHero/Nyx Assassin_4_Hijack",
    messageTime: 30,
    textMessage:
      "Consider hijacking a second opponents' creepwave behind the tower at 50 seconds into the game.",
    audience: [Audience.ROLE_SUPPORT_SOFT],
  },
  {
    category: "OwnHero",
    hero: "Nyx Assassin",
    audioFile: "ownHero/Nyx Assassin_5_Carapace Vendetta",
    messageTimes: [6 * 60, 11 * 60],
    textMessage:
      "You can use Spiked Carapace during Vendetta without exiting it.",
    audience: [Audience.ROLE_SUPPORT_SOFT],
    image: { type: "ability", name: "nyx_assassin_spiked_carapace" },
  },
  {
    category: "OwnHero",
    hero: "Nyx Assassin",
    audioFile: "ownHero/Nyx Assassin_6_Vendetta active",
    messageTimes: [6 * 60 + 15, 12 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Once you have Vendetta up, be active - setup kills and scout. Avoid showing yourself on the lanes too much.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "nyx_assassin_vendetta" },
  },
  {
    category: "OwnHero",
    hero: "Nyx Assassin",
    audioFile: "ownHero/Nyx Assassin_7_Mana Burn frequently",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Mana Burn frequently in the fights. Intelligence heroes will take more damage. Other types will run out of mana quicker.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "nyx_assassin_mana_burn" },
  },
  {
    category: "OwnHero",
    hero: "Nyx Assassin",
    audioFile: "ownHero/Nyx Assassin_8_Aghanims Scepter",
    messageTimes: [19 * 60 + 15, 24 * 60 + 15],
    textMessage:
      "Pick up Aghanim's Scepter as it improves most of your spells among other things.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Nyx Assassin",
    audioFile: "enemyHero/Nyx Assassin_1_Spiked carapace",
    messageTime: 30,
    textMessage:
      "Be careful not to use a major damaging spell when Spiked Carapace is on or Nyx Assassin is about to use it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Nyx Assassin",
    audioFile: "enemyHero/Nyx Assassin_2_Stick mana boots",
    messageTime: 40,
    textMessage:
      "To counter Nyx Assassin's mana burn, get a Magic Stick or Arcane Boots.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Nyx Assassin",
    audioFile: "enemyHero/Nyx Assassin_3_Observer sentry",
    messageTimes: [10 * 60 + 10, 18 * 60 + 10, 26 * 60 + 10],
    textMessage: "To see Nyx under Vendetta buy Sentries and Observer Wards.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Nyx Assassin",
    audioFile: "enemyHero/Nyx Assassin_4_Detection",
    messageTimes: [10 * 60 + 20, 18 * 60 + 20, 26 * 60 + 20],
    textMessage: "Carry detection on multiple heros.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Nyx Assassin",
    audioFile: "enemyHero/Nyx Assassin_5_Spell immunity",
    messageTime: 12 * 60,
    textMessage: "Spell immunity is great against Nyx.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Nyx Assassin",
    audioFile: "enemyHero/Nyx Assassin_6_Mana burn",
    messageTime: 12 * 60,
    textMessage:
      "Avoid buying too many intelligence giving items against Nyx Assassin's Mana Burn.",
    audience: [Audience.ALL],
  },

  // 67. Ogre Magi | Earlier work
  {
    category: "OwnHero",
    hero: "Ogre Magi",
    audioFile: "ownHero/Ogre_1_Tankiness",
    messageTime: 30,
    textMessage: "Play in front of your Core to to make use of your tankiness.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Ogre Magi",
    audioFile: "ownHero/Ogre_2_Ignite1",
    messageTime: 5 * 60,
    textMessage:
      "Ignite has a much longer cast range than Fireblast, so cast it first.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ogre_magi_ignite" },
  },
  {
    category: "OwnHero",
    hero: "Ogre Magi",
    audioFile: "ownHero/Ogre_3_Multicast",
    messageTime: 10 * 60,
    textMessage: "Prioritize items that you can multicast with.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ogre_magi_multicast" },
  },
  {
    category: "OwnHero",
    hero: "Ogre Magi",
    audioFile: "ownHero/Ogre_4_Ignite2",
    messageTime: 12 * 60,
    textMessage:
      "Look to Ignite the heroes with Blink Dagger to keep it canceled continuously.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Ogre Magi",
    audioFile: "ownHero/Ogre_5_Squishy",
    messageTime: 15 * 60,
    textMessage:
      "You become a lot squishier as the game progresses, so don't play too aggressive.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Ogre Magi",
    audioFile: "ownHero/Ogre_6_Bloodlust",
    messageTime: 17 * 60,
    repeatTime: 20 * 60,
    textMessage: "Bloodlust your right-click Cores prior and during a fight.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ogre_magi_bloodlust" },
  },

  {
    category: "EnemyHero",
    hero: "Ogre Magi",
    audioFile: "enemyHero/Ogre Magi_1_Physical damage",
    messageTime: -15,
    textMessage:
      "Physical damage doesn't do much against Ogre as he has high starting armor and HP regeneration. Either ignore him or try to inflict a lot of damage in a short period of time",
    chatMessage:
      "Ogre is resistant to physical damage. Either ignore him or try to inflict a lot of damage quickly",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Ogre Magi",
    audioFile: "enemyHero/Ogre Magi_2_Magic resistance",
    messageTime: 1 * 60 + 30,
    textMessage: "Opt for magic resistance items against Ogre",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Ogre Magi",
    audioFile: "enemyHero/Ogre Magi_3_Hand of midas",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Ogre players tend to go greedy and farm up Hand of Midas. Try to mess with their Midas timing - cooldown is 90 seconds",
    chatMessage:
      "Ogre tends to go greedy and farm Hand of Midas. Try to mess with his Midas timing (cooldown of 90 seconds)",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Ogre Magi",
    audioFile: "enemyHero/Ogre Magi_4_Lotus orb",
    messageTime: 8 * 60 + 30,
    textMessage:
      "Lotus Orb is an effective item against Ogre as both of his damaging spells are targetable",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Ogre Magi",
    audioFile: "enemyHero/Ogre Magi_5_Multicast",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Ogre is scary in late game as he's able to multicast also on his items. Black King Bar is mandatory for cores and even supports should consider buying it",
    chatMessage:
      "Ogre is scary in late game. BKB is mandatory for cores and even supports should consider buying it",
    audience: [Audience.ALL],
  },

  // 68. Omniknight | 05.03.2021
  {
    category: "OwnHero",
    hero: "Omniknight",
    audioFile: "ownHero/Omniknight_1_Dispel",
    messageTime: -90,
    textMessage: "Consider swapping lanes if there's a need for dispel.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "omniknight_repel" },
  },
  {
    category: "OwnHero",
    hero: "Omniknight",
    audioFile: "ownHero/Omniknight_2_Weak laner",
    messageTime: -30,
    textMessage:
      "Omniknight is a fairly weak laner. Focus on creep equilibrium, pulling and zoning opponents' support.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Omniknight",
    audioFile: "ownHero/Omniknight_3_Purification value",
    messageTime: 15,
    textMessage:
      "Avoid using Purification only to heal. Secure a ranged creep lasthit or damage opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "omniknight_purification" },
  },
  {
    category: "OwnHero",
    hero: "Omniknight",
    audioFile: "ownHero/Omniknight_4_Skip Degen Aura",
    messageTimes: [9 * 60 + 45, 13 * 60 + 45],
    textMessage:
      "After you maxed out the first and second spell, consider skilling stats over Degen Aura.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "omniknight_degen_aura" },
  },
  {
    category: "OwnHero",
    hero: "Omniknight",
    audioFile: "ownHero/Omniknight_5_Avoid showing",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing yourself at the start of the fight as you are the primary target for opponents.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Omniknight",
    audioFile: "ownHero/Omniknight_6_Dispels",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Dispels are a big problem for Omniknight. Be mindful when using Heavenly Grace and Guardian Angel.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "omniknight_repel" },
  },

  {
    category: "EnemyHero",
    hero: "Omniknight",
    audioFile: "enemyHero/Omniknight_1_Purification",
    messageTime: -60,
    textMessage:
      "Omniknight's Purification will damage you if you are in melee range of him.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Omniknight",
    audioFile: "enemyHero/Omniknight_2_Heavenly grace",
    messageTime: -50,
    textMessage:
      "Omniknight's Heavenly Grace applies strong dispel. Use your disables after it expires.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Omniknight",
    audioFile: "enemyHero/Omniknight_3_Focus",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Omniknight in the fights as he provides saves and sustain for his team.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Omniknight",
    audioFile: "enemyHero/Omniknight_4_Guardian angel dispel",
    messageTime: 12 * 60,
    textMessage:
      "Spell and items that dispel are great again Omniknight's Guardian Angel and Heavenly Grace.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Omniknight",
    audioFile: "enemyHero/Omniknight_5_Magical damage items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Items that do magical damage are great against Guardian Angel.",
    audience: [Audience.ALL],
  },

  // 69. Oracle | 05.03.2021
  {
    category: "OwnHero",
    hero: "Oracle",
    audioFile: "ownHero/Oracle_1_StrongDispel",
    messageTime: -30,
    textMessage:
      "Oracle has access to both basic and strong dispel. Look to dispel spells, items and runes that provide buffs or debuffs.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Oracle",
    audioFile: "ownHero/Oracle_2_DenyCreep",
    messageTime: 30,
    textMessage:
      "You can deny on your own creep by nuking it with purifying flames and quickly attacking it afterwards.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Oracle",
    audioFile: "ownHero/Oracle_3_Powerspike",
    messageTime: 2 * 60 + 30,
    textMessage:
      "Oracle has a huge powerspike at level3 with one point in Fortune's End and two points in Purifying Flames. Combine Purifying Flames followed by Fortune's End and another Purifying Flames before Fortune's End lands on the enemy hero.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Oracle",
    audioFile: "ownHero/Oracle_4_Salve",
    messageTime: 5 * 60 + 30,
    textMessage:
      "It is good to carry a Healing Salve to use it on the ally that you save with False Promise.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Oracle",
    audioFile: "ownHero/Oracle_5_FortunesEnd",
    messageTime: 6 * 60,
    textMessage:
      "You can channel Fortune's End on your nearby ally that is teleporting or blinking out and the Fortune's End will follow that ally.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Oracle",
    audioFile: "ownHero/Oracle_6_CounterSilences",
    messageTime: 6 * 60 + 15,
    textMessage:
      "If you expect to be silenced in next 2.5s, you can start channeling Fortune's End on yourself and as soon as you get silenced you will dispel it instantly with Fortune's End release.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Oracle",
    audioFile: "ownHero/Oracle_7_FatesEdit",
    messageTime: 6 * 60 + 30,
    textMessage:
      "Well timed Fate's Edict can entirely negate damage the output of heavy magical spells like Reaper's Scythe, Finger of Death, Bedlam and others.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Oracle",
    audioFile: "ownHero/Oracle_8_OutsideVision",
    messageTime: 10 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Position yourself outside of the opponents' vision at the start of a teamfight as you are usually the main target.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Oracle",
    audioFile: "ownHero/Oracle_9_UltiItems",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Items like Aether Lens or Blink Dagger allow yout to get your Ulti off well. If you False Promise yourself you can blink out even under attack as you take no damage.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Oracle",
    audioFile: "ownHero/Oracle_10_ExtraHealing",
    messageTime: 15 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "You can spam Purifying Flames on one of your allies prior to a fight to provide some extra healing going into the fight.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Oracle",
    audioFile: "enemyHero/Oracle_1_Fortunes end",
    messageTime: -60,
    textMessage:
      "Oracle's Fortune's End applies dispel. Use your spells after it has been used.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Oracle",
    audioFile: "enemyHero/Oracle_2_Fates edict",
    messageTime: 30,
    textMessage:
      "Oracle's Fate's Edict negates all magical damage. Do not waste your magical damage on it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Oracle",
    audioFile: "enemyHero/Oracle_3_Focus",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Oracle in the fights as he provides saves and sustain for his team.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Oracle",
    audioFile: "enemyHero/Oracle_4_Antihealing items",
    messageTime: 12 * 60,
    textMessage:
      "Items that reduce healing and regeneration are good against Oracle.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Oracle",
    audioFile: "enemyHero/Oracle_5_Gap closing items",
    messageTime: 12 * 60 + 10,
    textMessage: "Gap closing items allow you to get on top of Oracle.",
    audience: [Audience.ALL],
  },

  // 70. Outworld Destroyer | 05.03.2021
  {
    category: "OwnHero",
    hero: "Outworld Destroyer",
    audioFile: "ownHero/Outworld Destroyer_1_Meteor hammer",
    messageTime: -90,
    textMessage:
      "Rush Meteor Hammer as it provides sustain, solo kill potential, waveclear and tower damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "meteor_hammer" },
  },
  {
    category: "OwnHero",
    hero: "Outworld Destroyer",
    audioFile: "ownHero/Outworld Destroyer_2_Arcane Orb harass",
    messageTime: 15,
    textMessage:
      "Use Arcane Orb on opponents preferably during laning stage as it does tons of damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "obsidian_destroyer_arcane_orb" },
  },
  {
    category: "OwnHero",
    hero: "Outworld Destroyer",
    audioFile: "ownHero/Outworld Destroyer_3_Exposed",
    messageTime: 2 * 60,
    textMessage:
      "After using Astral Imprisonment, the opponents might go on you, so be careful.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "obsidian_destroyer_astral_imprisonment" },
  },
  {
    category: "OwnHero",
    hero: "Outworld Destroyer",
    audioFile: "ownHero/Outworld Destroyer_4_Avoid hammering",
    messageTimes: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Don't focus on channeling Meteor Hammer in bigger teamfights, at least not at the start.",
    audience: [Audience.ALL],
    image: { type: "item", name: "meteor_hammer" },
  },
  {
    category: "OwnHero",
    hero: "Outworld Destroyer",
    audioFile: "ownHero/Outworld Destroyer_5_Top target",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "You will typically be a top priority target for opponents as you can save others. Be mindful about your positioning.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Outworld Destroyer",
    audioFile: "ownHero/Outworld Destroyer_6_Arcane Orb Roshan",
    messageTime: 16 * 60 + 30,
    textMessage:
      "Arcane Orb works on Roshan so you only need someone to tank for you.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    hero: "Outworld Destroyer",
    audioFile: "enemyHero/Outworld Destroyer_1_Meteor hammer",
    messageTime: 6 * 60,
    textMessage:
      "Look for Outworld Destroyer's Meteor Hammer timing. He's able to solo kill most of the heroes with it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Outworld Destroyer",
    audioFile: "enemyHero/Outworld Destroyer_2_Focus",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Outworld Destroyer in the fights as he provides saves for his team with Astral Imprisonment.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Outworld Destroyer",
    audioFile: "enemyHero/Outworld Destroyer_3_Mana pool items",
    messageTime: 12 * 60,
    textMessage:
      "Mana pool increasing items are great against OD's Sanity's Eclipse.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Outworld Destroyer",
    audioFile: "enemyHero/Outworld Destroyer_4_Spell immunity",
    messageTime: 12 * 60 + 10,
    textMessage: "Spell immunity items are great against Outworld Destroyer.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Outworld Destroyer",
    audioFile: "enemyHero/Outworld Destroyer_5_Heaven's Halberd",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Heaven's Halberd is great at disabling Outworld Destroyer from using Arcane Orb.",
    audience: [Audience.ALL],
  },

  // 71. Pangolier | 06.03.2021   ***CHANGED 7.30***
  {
    category: "OwnHero",
    hero: "Pangolier",
    audioFile: "ownHero/Pangolier_1_Crash lasthits",
    messageTime: 10,
    textMessage:
      "Secure lasthits and damage the opponents at the same time with Shield Crash.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_shield_crash" },
  },
  {
    category: "OwnHero",
    hero: "Pangolier",
    audioFile: "ownHero/Pangolier_2_Swashbuckle pass",
    messageTime: 20,
    textMessage:
      "Swashbuckle applies an extra hit if you pass through the opponent.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_swashbuckle" },
  },
  {
    category: "OwnHero",
    hero: "Pangolier",
    audioFile: "ownHero/Pangolier_3_Swashbuckle used",
    messageTime: 75,
    textMessage:
      "Be careful after you expend Swashbuckle as opponents are more likely to go on you.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_swashbuckle" },
  },
  {
    category: "OwnHero",
    hero: "Pangolier",
    audioFile: "ownHero/Pangolier_4_Turn rate",
    messageTimes: [6 * 60, 12 * 60],
    textMessage:
      "During Rolling Thunder, turn rate is slightly improved after Shield Crash has been used.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_gyroshell" },
  },
  {
    category: "OwnHero",
    hero: "Pangolier",
    audioFile: "ownHero/Pangolier_5_blink",
    messageTime: 10 * 60 + 45,
    textMessage:
      "Once you have Blink Dagger, use it immediately before opponents are able to see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Pangolier",
    audioFile: "ownHero/Pangolier_6_Sidelanes",
    messageTimes: [11 * 60, 19 * 60, 27 * 60],
    textMessage:
      "When not much is happening or Rolling Thunder is on cooldown, push out sidelines.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Pangolier",
    audioFile: "ownHero/Pangolier_7_Roshan",
    messageTimes: [15 * 60 + 30, 18 * 60 + 30],
    textMessage:
      "Pangolier is great at enabling an early Roshan kill due to Lucky Shot armor reduction and disarm chance.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_lucky_shot" },
  },
  {
    category: "OwnHero",
    hero: "Pangolier",
    audioFile: "ownHero/Pangolier_8_Roshan",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard at minute 20 as it allows you to escape roots and leashes, among other things.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Pangolier",
    audioFile: "enemyHero/Pangolier_1_Squishy",
    messageTime: -60,
    textMessage:
      "Pangolier has a low HP pool and is squishy. Pressure him early on, especially when Swashbuckle is on cooldown.",
    chatMessage: "Pangolier is squishy. Pressure him early on.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Pangolier",
    audioFile: "enemyHero/Pangolier_2_Rolling thunder",
    messageTime: 8 * 60,
    textMessage:
      "Pangolier's Rolling Thunder can be dodged by making sharp turns prior to impact.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Pangolier",
    audioFile: "enemyHero/Pangolier_3_Clump up",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Rolling Thunder.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Pangolier",
    audioFile: "enemyHero/Pangolier_4_Spell immunity",
    messageTime: 12 * 60,
    textMessage:
      "Spell immunity items are great against Pangolier's disables and disarms.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Pangolier",
    audioFile: "enemyHero/Pangolier_5_Root leash",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Spells and items that provide roots or leash, stop Pangolier from using Swashbuckle and Rolling Thunder.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Pangolier",
    audioFile: "enemyHero/Pangolier_6_Spell immunity piercing",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Spell immunity piercing spells and items are great at dealing with Pangolier's Rolling Thunder.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Pangolier",
    audioFile: "enemyHero/Pangolier_7_Dispel items",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Items and spells that can dispel enemies are great at removing Shield Crash buff from Pangolier.",
    audience: [Audience.ALL],
  },

  // 72. Phantom Assassin | Earlier work | UPDATED ON 06.03. (message on magic stick added)
  {
    category: "OwnHero",
    hero: "Phantom Assassin",
    audioFile: "ownHero/Phantom Assassin_1_Dagger lasthits",
    messageTime: 15,
    textMessage: "Use Stifling Dagger to secure creep lasthits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_assassin_stifling_dagger" },
  },
  {
    category: "OwnHero",
    hero: "Phantom Assassin",
    audioFile: "ownHero/Phantom Assassin_2_Ring of Health",
    messageTime: 30,
    textMessage:
      "Rush Ring of Health on a tough lane and put a point in Blur on level 2.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ring_of_health" },
  },
  {
    category: "OwnHero",
    hero: "Phantom Assassin",
    audioFile: "ownHero/Phantom Assassin_3_Full stick",
    messageTime: 60,
    textMessage:
      "Opponents are likely to have a lot of stick charges so take that into account when playing aggressively.",
    audience: [Audience.ALL],
    image: { type: "item", name: "magic_stick" },
  },
  {
    category: "OwnHero",
    hero: "Phantom Assassin",
    audioFile: "ownHero/Phantom Assassin_4_Blur disjoint",
    messageTimes: [90, 7 * 60 + 30, 15 * 60 + 30],
    textMessage:
      "You can disjoint most projectile spells and ranged attacks with Blur.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_assassin_blur" },
  },
  {
    category: "OwnHero",
    hero: "Phantom Assassin",
    audioFile: "ownHero/Phantom Assassin_5_Blur farm",
    messageTimes: [8 * 60 + 30, 14 * 60 + 30],
    textMessage: "When farming dangerous areas or stacks, consider using Blur.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_assassin_blur" },
  },
  {
    category: "OwnHero",
    hero: "Phantom Assassin",
    audioFile: "ownHero/Phantom Assassin_6_Fight focus",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "You typically want to focus on killing disabling supports and backliners at the start of the fight.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "phantom_assassin_phantom_strike" },
  },
  {
    category: "OwnHero",
    hero: "Phantom Assassin",
    audioFile: "ownHero/Phantom Assassin_7_Counter items",
    messageTimes: [12 * 60 + 15, 22 * 60 + 15],
    textMessage:
      "Check opponents' inventories for break effects and evasion-piercing items. Adjust playstyle and itemization.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    hero: "Phantom Assassin",
    audioFile: "ownHero/Phantom Assassin_8_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard around minute 20 for extra burst, especially if the break effect is needed.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Phantom Assassin",
    audioFile: "enemyHero/Phantom Assassin_1_Magic stick",
    messageTime: -60,
    textMessage:
      "PA uses Stifling Dagger frequently to obtain lasthits. Buy Magic Stick and Magic Wand to get charges.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Phantom Assassin",
    audioFile: "enemyHero/Phantom Assassin_2_Spell harass",
    messageTime: 30,
    textMessage:
      "PA is weak against spell harass in early game. Manage your mana and pressure her",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Phantom Assassin",
    audioFile: "enemyHero/Phantom Assassin_3_Armor items",
    messageTime: 5 * 60 + 15,
    textMessage:
      "Armor items are good against PA as she is all about physical damage and armor reduction",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phantom Assassin",
    audioFile: "enemyHero/Phantom Assassin_4_Survival items",
    messageTime: 6 * 60 + 15,
    textMessage:
      "Cheap items that allow you to survive PA's Phantom Strike are Ghost Scepter, Glimmer Cape and Eul's Scepter",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phantom Assassin",
    audioFile: "enemyHero/Phantom Assassin_5_Blur ability",
    messageTime: 8 * 60 + 15,
    textMessage:
      "Counter PA's Blur ability with items piercing through evasion, breaking passive or causing magical damage",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phantom Assassin",
    audioFile: "enemyHero/Phantom Assassin_6_Blade mail",
    messageTime: 10 * 60 + 15,
    textMessage: "PA can be killed by a well timed Blade Mail",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phantom Assassin",
    audioFile: "enemyHero/Phantom Assassin_7_Power runes",
    messageTimes: [11 * 60 + 15, 19 * 60 + 15, 27 * 60 + 15],
    textMessage: "Control power runes to prevent PA from getting double damage",
    audience: [Audience.ALL],
  },

  // 73. Phantom Lancer | Earlier work
  {
    category: "OwnHero",
    hero: "Phantom Lancer",
    audioFile: "ownHero/Phantom Lancer_1_Doppelganger deception",
    messageTime: -90,
    textMessage:
      "Bind a bright yellow Doppelganger illusion to make deceptive plays as it takes the same damage as the hero.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_lancer_doppelwalk" },
  },
  {
    category: "OwnHero",
    hero: "Phantom Lancer",
    audioFile: "ownHero/Phantom Lancer_2_Lance ranged",
    messageTime: 15,
    textMessage: "Use Spirit Lance to secure ranged creep lasthits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_lancer_spirit_lance" },
  },
  {
    category: "OwnHero",
    hero: "Phantom Lancer",
    audioFile: "ownHero/Phantom Lancer_3_Toggle Phantom Rush",
    messageTime: 75,
    textMessage:
      "Toggle on Phantom Rush on early levels so you don't waste it randomly.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_lancer_phantom_edge" },
  },
  {
    category: "OwnHero",
    hero: "Phantom Lancer",
    audioFile: "ownHero/Phantom Lancer_4_Doppelganger saves",
    messageTimes: [90, 6 * 60 + 30, 12 * 60 + 30],
    textMessage:
      "Doppelganger dispels on cast and can be used to disjoint projectile spells and ranged attacks.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_lancer_doppelwalk" },
  },
  {
    category: "OwnHero",
    hero: "Phantom Lancer",
    audioFile: "ownHero/Phantom Lancer_5_Long fights",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Phantom Lancer likes long fights in which you can amass illusions and grind opponents down.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Phantom Lancer",
    audioFile: "ownHero/Phantom Lancer_6_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard around minute 20, especially if you have issues engaging in fights or being behind.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Phantom Lancer",
    audioFile: "enemyHero/Phantom Lancer_1_Doppelganger",
    messageTime: 25,
    textMessage:
      "Phantom Lancer's main escape mechanism is Doppelganger. As this spell has a very long cooldown at lower levels, look to play aggressively as soon as he used it",
    chatMessage:
      "Phantom Lancer's main escape mechanism is Doppelganger. Look to play aggressively as soon as he used it",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Phantom Lancer",
    audioFile: "enemyHero/Phantom Lancer_2_Diffusal Blade 1",
    messageTime: 6 * 60 + 30,
    textMessage:
      "Pressure Phantom Lancer while he's farming Diffusal Blade. He's very weak until he gets that item. Smoke on him and place wards in his jungle",
    chatMessage:
      "Phantom Lancer is weak until he gets Diffusal Blade. Place wards in his jungle and smoke on him",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phantom Lancer",
    audioFile: "enemyHero/Phantom Lancer_3_Diffusal Blade 2",
    messageTime: 15 * 60 + 15,
    textMessage:
      "Phantom Lancer's main item is Diffusal Blade. Items that give you and your team burst of mana are good against him. Sample items are Magic Wand, Soul Ring, Arcane Boots, Arcane Ring, and Enchanted Mango",
    chatMessage:
      "Phantom Lancer's main item is Diffusal Blade. Buy items that give you and your team burst of mana",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phantom Lancer",
    audioFile: "enemyHero/Phantom Lancer_4_Illusions 1",
    messageTime: 25 * 60 + 15,
    textMessage:
      "Use AOE nuke to weaken Phantom Lancer's illusions to figure out which one is the real hero",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phantom Lancer",
    audioFile: "enemyHero/Phantom Lancer_5_Illusions 2",
    messageTime: 21 * 60 + 0,
    textMessage:
      "Spells like Lion's and Shadow Shaman's Hex and Pugna's Life Drain are able to destroy Phantom Lancer's illusion instantly. That can help when the illusion count is low, but not when there are plenty of them",
    chatMessage:
      "Phantom Lancer illusions can be killed by spells like Lion's and Shadow Shaman's Hex and Pugna's Life Drain",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phantom Lancer",
    audioFile: "enemyHero/Phantom Lancer_6_AOE damage",
    messageTime: 17 * 60 + 0,
    textMessage:
      "Against Phantom Lancer purchase items that are dealing AOE damage, preferably magical damage. For example Mjollnir, Radiance or Shiva's Guard. Battlefury is good as well but Phantom Lancer has a lot of armor and usually evasion on top of that",
    chatMessage:
      "Against Phantom Lancer purchase items that are dealing AOE damage, preferably magical damage",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phantom Lancer",
    audioFile: "enemyHero/Phantom Lancer_7_Mana drain",
    messageTimes: [36 * 60 + 15, 56 * 60 + 15],
    textMessage:
      "Phantom Lancer loves long fights as he's able to drain huge amounts of mana. Ideally, look to burst him and to finish the fights reasonably fast. If the fight prolongs, count on the fact that you will be running low on mana and it might be better to disengage",
    chatMessage:
      "Phantom Lancer loves long fights as he drains huge amounts of mana. Burst him and finish the fights rapidly",
    audience: [Audience.ALL],
  },

  // 74. Phoenix | 06.03.2021
  {
    category: "OwnHero",
    hero: "Phoenix",
    audioFile: "ownHero/Phoenix_1_Trees",
    messageTime: -75,
    textMessage:
      "Icarus Dive, Sun Ray while moving and Supernova destroy trees.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_supernova" },
  },
  {
    category: "OwnHero",
    hero: "Phoenix",
    audioFile: "ownHero/Phoenix_2_Land Fire Spirits",
    messageTime: 15,
    textMessage:
      "Make sure to land most of the Fire Spirit and get extra right-clicks in or deny a creep here and there.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_fire_spirits" },
  },
  {
    category: "OwnHero",
    hero: "Phoenix",
    audioFile: "ownHero/Phoenix_3_Icarus Dive hit",
    messageTimes: [60, 8 * 60, 15 * 60],
    textMessage: "You can attack once during an Icarus Dive.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_icarus_dive" },
  },
  {
    category: "OwnHero",
    hero: "Phoenix",
    audioFile: "ownHero/Phoenix_4_Fire Spirits vision",
    messageTimes: [3 * 60, 9 * 60 + 30, 16 * 60],
    textMessage:
      "Fire Spirits provide short-lasting vision so you can scout pillars for wards or Roshpit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_fire_spirits" },
  },
  {
    category: "OwnHero",
    hero: "Phoenix",
    audioFile: "ownHero/Phoenix_5_Sun Ray escape",
    messageTimes: [3 * 60 + 15, 9 * 60 + 45, 16 * 60 + 15],
    textMessage: "You can use Sun Ray to escape over cliffs and pillars.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_sun_ray" },
  },
  {
    category: "OwnHero",
    hero: "Phoenix",
    audioFile: "ownHero/Phoenix_6_Day to night",
    messageTime: 7 * 60,
    textMessage:
      "Supernova always turns night into day which can be great against Night Stalker for example.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_supernova" },
  },
  {
    category: "OwnHero",
    hero: "Phoenix",
    audioFile: "ownHero/Phoenix_7_Supernova deny",
    messageTimes: [7 * 60 + 15, 10 * 60 + 15],
    textMessage: "Your allies can deny you in Supernova when one hit is left.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_supernova" },
  },
  {
    category: "OwnHero",
    hero: "Phoenix",
    audioFile: "ownHero/Phoenix_8_Supernova deny",
    messageTime: 7 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid placing Supernova close to opponents' counters. Use terrain features to allow Supernova to go off.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_supernova" },
  },
  {
    category: "OwnHero",
    hero: "Phoenix",
    audioFile: "ownHero/Phoenix_9_Tower defense",
    messageTimes: [8 * 60, 14 * 60],
    textMessage:
      "Phoenix is great at defending towers with his long range damaging spells and escape.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_fire_spirits" },
  },
  {
    category: "OwnHero",
    hero: "Phoenix",
    audioFile: "ownHero/Phoenix_10_Push sidelanes",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines with Fire Spirits and Sun Ray without even showing yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_fire_spirits" },
  },
  {
    category: "OwnHero",
    hero: "Phoenix",
    audioFile: "ownHero/Phoenix_11_Aghanims Shard",
    messageTime: 20 * 60 + 15,
    textMessage:
      "With Aghanim's Shard, use Sun Ray before Supernova as it will persist and will be refreshed upon explosion.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Phoenix",
    audioFile: "enemyHero/Phoenix_1_Icarus dive",
    messageTime: -60,
    textMessage:
      "Look to go on Phoenix when Icarus dive was used. It has long cd.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Phoenix",
    audioFile: "enemyHero/Phoenix_2_Fire spirits",
    messageTime: -50,
    textMessage:
      "Fire Spirits are Phoenix's main laning spell - Look to dodge them by moving chaotically.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Phoenix",
    audioFile: "enemyHero/Phoenix_3_Sun ray",
    messageTime: 2 * 60,
    textMessage:
      "Phoenix's Sun Ray does a lot of damage against high HP heroes. Run away from it or make a sharp turn.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phoenix",
    audioFile: "enemyHero/Phoenix_4_Supernova",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Against Phoenix's Supernova you need to decide very quickly if you want to fight or run away.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phoenix",
    audioFile: "enemyHero/Phoenix_5_Clump up",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Supernova or Sun Ray.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phoenix",
    audioFile: "enemyHero/Phoenix_6_Antispell items",
    messageTime: 12 * 60,
    textMessage:
      "Spell immunity and magic resistance items are great against Phoenix's magical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Phoenix",
    audioFile: "enemyHero/Phoenix_7_Attack speed items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Attack speed items allow you to destroy the Supernova faster.",
    audience: [Audience.ALL],
  },

  // Primal Beast
  {
    category: "OwnHero",
    hero: "Primal Beast",
    audioFile: "ownHero/Primal Beast_1_Outlasthit",
    messageTime: 10,
    textMessage:
      "Primal Beast's base damage and Uproar's passive and active effects allow you to outlasthit the opponents.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "primal_beast_uproar" },
  },
  {
    category: "OwnHero",
    hero: "Primal Beast",
    audioFile: "ownHero/Primal Beast_2_Onslaught timing",
    messageTimes: [20, 4 * 60 + 20],
    textMessage:
      "Use Onslaught when opponents are somewhat stationary, for example when they are going for a lasthit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_onslaught" },
  },
  {
    category: "OwnHero",
    hero: "Primal Beast",
    audioFile: "ownHero/Primal Beast_3_Uproar Trample",
    messageTimes: [2 * 60 + 15, 9 * 60 + 15, 16 * 60 + 15],
    textMessage:
      "You want to use Uproar when Trampling over the opponents heroes for maximum damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_trample" },
  },
  {
    category: "OwnHero",
    hero: "Primal Beast",
    audioFile: "ownHero/Primal Beast_4_Take time",
    messageTime: 9 * 60 + 30,
    textMessage:
      "Take your time and farm Blink Dagger so you can instantly Pulverize an opponent.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Primal Beast",
    audioFile: "ownHero/Primal Beast_5_MIddle Pulverize",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Try to Pulverize an opponents that's in the middle of the opponents lineup so you can stun the rest as well.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_pulverize" },
  },
  {
    category: "OwnHero",
    hero: "Primal Beast",
    audioFile: "ownHero/Primal Beast_6_Push sidelanes",
    messageTime: 11 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out sidelanes with your AoE abilities.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_trample" },
  },
  {
    category: "OwnHero",
    hero: "Primal Beast",
    audioFile: "ownHero/Primal Beast_7_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard around minute 20 as it provides another disable among other things.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_trample" },
  },

  {
    category: "EnemyHero",
    hero: "Primal Beast",
    audioFile: "enemyHero/Primal Beast_1_Dance around",
    messageTimes: [15, 4 * 60 + 15],
    textMessage:
      "Avoid staying still against Primal Beast. Move around and be ready to dodge the Onslaught.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_onslaught" },
  },
  {
    category: "EnemyHero",
    hero: "Primal Beast",
    audioFile: "enemyHero/Primal Beast_2_Pulverize stoppers",
    messageTimes: [6 * 60 + 45, 12 * 60 + 45],
    textMessage: "Stun, fear, hex and silence effects can stop Pulverize.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_pulverize" },
  },
  {
    category: "EnemyHero",
    hero: "Primal Beast",
    audioFile: "enemyHero/Primal Beast_3_Spell immunity",
    messageTimes: [10 * 60 + 15, 16 * 60 + 15],
    textMessage:
      "Spell immunity counters all of the Primal Beasts abilities but Uproar.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },

  // 75. Puck | 06.03.2021
  {
    category: "OwnHero",
    hero: "Puck",
    audioFile: "ownHero/Puck_1_Orb to ward",
    messageTime: -90,
    textMessage:
      "Use Illusory Orb immediately as you load into the game to place Observer Ward quickly.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    hero: "Puck",
    audioFile: "ownHero/Puck_2_Secure lasthits",
    messageTime: 15,
    textMessage:
      "Use Illusory Orb and Waning Rift to secure creep lasthits and damage opponents' heroes at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_illusory_orb" },
  },
  {
    category: "OwnHero",
    hero: "Puck",
    audioFile: "ownHero/Puck_3_Disjoint",
    messageTimes: [30, 6 * 60 + 30],
    textMessage:
      "You can disjoint ranged attacks and spell projectiles with Phase Shift and Illusory Orb.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_phase_shift" },
  },
  {
    category: "OwnHero",
    hero: "Puck",
    audioFile: "ownHero/Puck_4_Rune and stacking",
    messageTimes: [105, 5 * 60 + 45],
    textMessage:
      "Illusory Orb gives you an upper hand when it comes to rune control and helps with stacking from distance.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_illusory_orb" },
  },
  {
    category: "OwnHero",
    hero: "Puck",
    audioFile: "ownHero/Puck_5_Orb scouting",
    messageTimes: [2 * 60, 10 * 60, 18 * 60],
    textMessage:
      "Illusory Orb provides vision on its path so you can check for pillar wards and scout Roshpit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_illusory_orb" },
  },
  {
    category: "OwnHero",
    hero: "Puck",
    audioFile: "ownHero/Puck_6_Be active",
    messageTimes: [6 * 60, 11 * 60, 16 * 60],
    textMessage:
      "Play actively and look around for possibilities to gank. Make use of your hero's mobility and elusiveness.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_dream_coil" },
  },
  {
    category: "OwnHero",
    hero: "Puck",
    audioFile: "ownHero/Puck_6_Push sidelanes",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines with your nukes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_illusory_orb" },
  },
  {
    category: "OwnHero",
    hero: "Puck",
    audioFile: "ownHero/Puck_7_Backliners",
    messageTime: 11 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Puck is amazing at gap-closing, especially with Blink Dagger. Prioritize killing backliners and supports in fights.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_illusory_orb" },
  },
  {
    category: "OwnHero",
    hero: "Puck",
    audioFile: "ownHero/Puck_8_Backliners",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shards around minute 20 to improve vision game and to snap the Mystic Coil.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Puck",
    audioFile: "enemyHero/Puck_1_Early pressure",
    messageTime: -60,
    textMessage: "Puck has low armor and HP. Pressure her early on.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Puck",
    audioFile: "enemyHero/Puck_2_Control runes",
    messageTimes: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Control power runes against Puck. She likes to bottle and gank with those.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Puck",
    audioFile: "enemyHero/Puck_3_Dream coil",
    messageTime: 8 * 60,
    textMessage:
      "Fight back when Dream Coiled unless you think you can escape by breaking it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Puck",
    audioFile: "enemyHero/Puck_4_Clump up",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Dream Coil.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Puck",
    audioFile: "enemyHero/Puck_5_Catch items",
    messageTime: 12 * 60,
    textMessage:
      "Puck is hard to catch. Instant disables and silences are great against Puck.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Puck",
    audioFile: "enemyHero/Puck_6_Antispell items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Spell immunity and magic resistance items are great against Puck's magical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Puck",
    audioFile: "enemyHero/Puck_7_Splitpush",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Puck is great at split-pushing. Consider getting Boots of Travel on a Core.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Puck",
    audioFile: "enemyHero/Puck_8_Aghanims scepter",
    messageTime: 25 * 60 + 10,
    textMessage:
      "Once Puck gets Aghanim's Scepter, Dream Coil pierces spell immunity and stuns for longer.",
    audience: [Audience.ALL],
  },

  // 76. Pudge | Earlier work
  {
    category: "OwnHero",
    hero: "Pudge",
    audioFile: "ownHero/Pudge_1_Runes",
    messageTime: -30,
    textMessage:
      "You can hook runes. Try to hook an enemy into your allies at the intial bounty rune.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pudge_meat_hook" },
  },
  {
    category: "OwnHero",
    hero: "Pudge",
    audioFile: "ownHero/Pudge_2_BaseDamage",
    messageTime: 15,
    textMessage:
      "During the laning stage don't play only around the Hook, also use your hero's tankiness and high base damage.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Pudge",
    audioFile: "ownHero/Pudge_3_Hook1",
    messageTime: 45,
    textMessage:
      "Try to keep the creep equilibrium close to your tower, so you can hook your enemies under the tower.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pudge_meat_hook" },
  },
  {
    category: "OwnHero",
    hero: "Pudge",
    audioFile: "ownHero/Pudge_4_Hook2",
    messageTime: 4 * 60 + 30,
    textMessage:
      "Meat Hook destroys creeps instantly, except for ancients. Protect your tower by hooking the catapult.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pudge_meat_hook" },
  },
  {
    category: "OwnHero",
    hero: "Pudge",
    audioFile: "ownHero/Pudge_5_Heal",
    messageTime: 5 * 60 + 30,
    textMessage: "You can heal up signicantly by dismembering a high HP creep.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pudge_dismember" },
  },
  {
    category: "OwnHero",
    hero: "Pudge",
    audioFile: "ownHero/Pudge_6_Smoke",
    messageTimes: [10 * 60, 15 * 60],
    textMessage: "Find a partner and use smokes to find pick-offs.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "OwnHero",
    hero: "Pudge",
    audioFile: "ownHero/Pudge_7_SaveAlly",
    messageTime: 15 * 60,
    textMessage:
      "Blink Dagger and Aghanim's Shard combined allow you to save your allies instantly.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Pudge",
    audioFile: "ownHero/Pudge_8_Hook3",
    messageTime: 25 * 60,
    repeatTime: 10 * 60,
    textMessage: "Fight around vision so you can land your Hooks more easily.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },

  {
    category: "EnemyHero",
    hero: "Pudge",
    audioFile: "enemyHero/Pudge_1_Camp spots",
    messageTime: -30,
    textMessage:
      "Be aware of Pudge's camp spots and place observer wards to cover those spots",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Pudge",
    audioFile: "enemyHero/Pudge_2_Towers",
    messageTime: 30,
    textMessage:
      "Be careful when playing close to enemy towers because a simple hook with tower damage can easily get you killed",
    chatMessage:
      "Be careful when playing close to enemy towers because a hook with tower damage can easily get you killed",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Pudge",
    audioFile: "enemyHero/Pudge_3_Phyiscal damage",
    messageTime: 2 * 60,
    textMessage: "Physical damage is strong against Pudge as he has low armor",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Pudge",
    audioFile: "enemyHero/Pudge_4_Anti-magic damage",
    messageTime: 3 * 60,
    textMessage: "Anti-magic damage items are good against pudge",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Pudge",
    audioFile: "enemyHero/Pudge_5_Armor reduction",
    messageTime: 6 * 60 + 30,
    textMessage: "Armor reducing items are great for bursting Pudge",
    audience: [Audience.ALL],
  },

  // 77. Pugna | 06.03.2021
  {
    category: "OwnHero",
    hero: "Pugna",
    audioFile: "ownHero/Pugna_1_Nether Blast ranged",
    messageTime: 15,
    textMessage:
      "Use Nether Blast to secure ranged creep lasthits and to damage opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_nether_blast" },
  },
  {
    category: "OwnHero",
    hero: "Pugna",
    audioFile: "ownHero/Pugna_2_Decrepify for lasthits",
    messageTime: 60,
    textMessage: "Use Decrepify to ruin lasthits for the opponents.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_decrepify" },
  },
  {
    category: "OwnHero",
    hero: "Pugna",
    audioFile: "ownHero/Pugna_3_Decrepify save",
    messageTimes: [75, 7 * 60 + 15, 15 * 60 + 15],
    textMessage:
      "You can Decrepify yourself or an ally in trouble and even attempt to teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_decrepify" },
  },
  {
    category: "OwnHero",
    hero: "Pugna",
    audioFile: "ownHero/Pugna_4_Chip towers",
    messageTimes: [3 * 60, 7 * 60],
    textMessage:
      "Chip opponents' towers gradually with Nether Blast whenever you can and current mana allows it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_nether_blast" },
  },
  {
    category: "OwnHero",
    hero: "Pugna",
    audioFile: "ownHero/Pugna_5_Life Drain illusions",
    messageTimes: [6 * 60, 15 * 60],
    textMessage: "Life Drain instantly destroys basic illusions.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_life_drain" },
  },
  {
    category: "OwnHero",
    hero: "Pugna",
    audioFile: "ownHero/Pugna_6_Combo sequence",
    messageTimes: [6 * 60 + 15, 12 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "The full value burst spell combo would be: Nether Ward, Nether Blast, Decrepify quickly and begin Life Draining.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_life_drain" },
  },
  {
    category: "OwnHero",
    hero: "Pugna",
    audioFile: "ownHero/Pugna_7_Combo sequence",
    messageTimes: [6 * 60 + 30, 12 * 60 + 30, 18 * 60 + 30],
    textMessage:
      "With Life Drain, you can restore health to an ally or mana if he's full health. Watch your health though.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_life_drain" },
  },
  {
    category: "OwnHero",
    hero: "Pugna",
    audioFile: "ownHero/Pugna_8_Nether Ward placement",
    messageTimes: [6 * 60 + 45, 15 * 60 + 45],
    textMessage:
      "Place Nether Ward close enough to opponents but out of their sight.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_nether_ward" },
  },

  {
    category: "EnemyHero",
    hero: "Pugna",
    audioFile: "enemyHero/Pugna_1_Nether blast",
    messageTime: -60,
    textMessage:
      "Pugna's Nether Blast takes one second to explode. You can dodge it by moving away.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Pugna",
    audioFile: "enemyHero/Pugna_2_Nether ward",
    messageTime: 30,
    textMessage:
      "Be careful not to use high mana cost spells around Pugna's Nether Ward.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Pugna",
    audioFile: "enemyHero/Pugna_3_Life drain",
    messageTime: 8 * 60,
    textMessage:
      "Look to interrupt Pugna's Life Drain by running away or by stunning or silencing him.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Pugna",
    audioFile: "enemyHero/Pugna_4_Tower defense",
    messageTimes: [10 * 60 + 10, 15 * 60 + 10, 20 * 60 + 10],
    textMessage:
      "Pugna takes buildings down fast with Nether Blast. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Pugna",
    audioFile: "enemyHero/Pugna_5_Antispell items",
    messageTime: 12 * 60,
    textMessage:
      "Spell immunity and magic resistance items are great against Pugna's magical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Pugna",
    audioFile: "enemyHero/Pugna_6_Lotus orb",
    messageTime: 12 * 60 + 10,
    textMessage:
      "A well timed Lotus Orb is great at countering Pugna's Decrepify and Life Drain combo.",
    audience: [Audience.ALL],
  },

  // 78. Queen of Pain | 06.03.2021
  {
    category: "OwnHero",
    hero: "Queen of Pain",
    audioFile: "ownHero/Queen of Pain_1_Secure lasthits",
    messageTime: 15,
    textMessage:
      "Use Scream of Pain to secure ranged creeps and hit opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "queenofpain_scream_of_pain" },
  },
  {
    category: "OwnHero",
    hero: "Queen of Pain",
    audioFile: "ownHero/Queen of Pain_2_Avoid Shadow Strike",
    messageTime: 2 * 60,
    textMessage:
      "Avoid overinvesting points in Shadow Strike. It will make your farming and midgame fights hard.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "queenofpain_shadow_strike" },
  },
  {
    category: "OwnHero",
    hero: "Queen of Pain",
    audioFile: "ownHero/Queen of Pain_3_In trouble",
    messageTimes: [2 * 60 + 15, 12 * 60 + 15, 22 * 60 + 15],
    textMessage:
      "When in trouble, blink into fog, into treelines or over cliffs.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "queenofpain_blink" },
  },
  {
    category: "OwnHero",
    hero: "Queen of Pain",
    audioFile: "ownHero/Queen of Pain_4_Be active",
    messageTimes: [8 * 60 + 15, 10 * 60 + 15],
    textMessage:
      "Look around for opportunities to gank once you have Sonic Wave and control runes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "queenofpain_sonic_wave" },
  },
  {
    category: "OwnHero",
    hero: "Queen of Pain",
    audioFile: "ownHero/Queen of Pain_5_Multihero Sonic Wave",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Blink or position yourself in such a way that you land a multi-hero Sonic Wave in the fights.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "queenofpain_sonic_wave" },
  },
  {
    category: "OwnHero",
    hero: "Queen of Pain",
    audioFile: "ownHero/Queen of Pain_6_Push sidelanes",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage: "When not much is happening, push out the sidelines.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "queenofpain_scream_of_pain" },
  },
  {
    category: "OwnHero",
    hero: "Queen of Pain",
    audioFile: "ownHero/Queen of Pain_7_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard around minute 20 as it provides silence and extra damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Queen of Pain",
    audioFile: "enemyHero/Queen of Pain_1_Shadow strike",
    messageTime: -60,
    textMessage:
      "Queen of Pain's Shadow Strike is a great harassing spell. Buy extra consumables.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Queen of Pain",
    audioFile: "enemyHero/Queen of Pain_2_Blink",
    messageTime: 30,
    textMessage:
      "Look to play aggressively on Queen of Pain once her Blink is on cd. She's very squishy.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Queen of Pain",
    audioFile: "enemyHero/Queen of Pain_3_Control runes",
    messageTimes: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Control power runes against Queen of Pain. She likes to bottle and gank with those.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Queen of Pain",
    audioFile: "enemyHero/Queen of Pain_4_Orchid malevolence",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Be aware of Queen of Pain's Orchid Malevolence timing. She can solo kill most of the heroes with it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Queen of Pain",
    audioFile: "enemyHero/Queen of Pain_5_Clump up",
    messageTimes: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Queen of Pain's Sonic Wave.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Queen of Pain",
    audioFile: "enemyHero/Queen of Pain_6_Antispell items",
    messageTime: 12 * 60,
    textMessage:
      "Spell immunity and magic resistance items are quite good against Queen of Pain.",
    audience: [Audience.ALL],
  },

  // 79. Razor | 06.03.2021
  {
    category: "OwnHero",
    hero: "Razor",
    audioFile: "ownHero/Razor_1_Sap damage",
    messageTime: 10,
    textMessage:
      "During the laning stage, prioritize sapping opponents' core's damage and win the lasthit battle off of it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "razor_static_link" },
  },
  {
    category: "OwnHero",
    hero: "Razor",
    audioFile: "ownHero/Razor_2_Link switching",
    messageTime: 20,
    textMessage:
      "You can switch a target and hit something else during Static Link.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "razor_static_link" },
  },
  {
    category: "OwnHero",
    hero: "Razor",
    audioFile: "ownHero/Razor_3_Plasma Field damage",
    messageTime: 60,
    textMessage:
      "You want to hit opponents or creeps with the Plasma Field from maximum range for maximum value.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "razor_plasma_field" },
  },
  {
    category: "OwnHero",
    hero: "Razor",
    audioFile: "ownHero/Razor_4_Plasma Field vision",
    messageTimes: [2 * 60, 14 * 60],
    textMessage:
      "The Plasma Field provides vision so you can use it to scout treelines, pillars and Roshpit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "razor_plasma_field" },
  },
  {
    category: "OwnHero",
    hero: "Razor",
    audioFile: "ownHero/Razor_5_Eye creeps",
    messageTimes: [6 * 60, 11 * 60],
    textMessage:
      "Use Eye of the Storm to speed up your farming, especially when clearing stacks and ancients.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "razor_eye_of_the_storm" },
  },
  {
    category: "OwnHero",
    hero: "Razor",
    audioFile: "ownHero/Razor_6_Itemization",
    messageTimes: [6 * 60 + 15, 12 * 60 + 15],
    textMessage:
      "Mobility and items that allow you to be in the middle of the fight will enable you to get a great Static Link off.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    hero: "Razor",
    audioFile: "ownHero/Razor_7_Fight impact",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Most of your fight impact will come down to Static Link usage. Take your time and use it on the proper target.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "razor_static_link" },
  },
  {
    category: "OwnHero",
    hero: "Razor",
    audioFile: "ownHero/Razor_8_Push sidelanes",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      `When not much is happening, push out the sidelines with the Plasma Field without even showing yourself.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "razor_plasma_field" },
  },

  {
    category: "EnemyHero",
    hero: "Razor",
    audioFile: "enemyHero/Razor_1_Wins melee",
    messageTime: -60,
    textMessage:
      "Razor wins most lanes against melee heroes. Consider sending ranged heroes against him.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Razor",
    audioFile: "enemyHero/Razor_2_Movement speed",
    messageTime: -50,
    textMessage:
      "Getting movement speed items helps a lot at dealing with Razor's Static Link.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Razor",
    audioFile: "enemyHero/Razor_3_Keep distance",
    messageTime: -40,
    textMessage:
      "Keep a good distance to Razor and make it hard for him to get a good Static Link off.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Razor",
    audioFile: "enemyHero/Razor_4_Prevent drain",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Prevent Razor from draining your core's damage. That way Razor will have less impact in fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Razor",
    audioFile: "enemyHero/Razor_5_Counter items",
    messageTime: 12 * 60,
    textMessage:
      "Force Staff, Hurricane Pike, Linken's Sphere and Lotus Orb are great at dealing with Static Link.",
    audience: [Audience.ALL],
  },

  // 80. Riki | 06.03.2021
  {
    category: "OwnHero",
    hero: "Riki",
    audioFile: "ownHero/Riki_1_Secure ranged",
    messageTime: 15,
    textMessage: "Use Blink Strike to secure ranged creep lasthits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "riki_blink_strike" },
  },
  {
    category: "OwnHero",
    hero: "Riki",
    audioFile: "ownHero/Riki_2_In trouble",
    messageTime: 4 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "In trouble, blink away, Tricks of Trade over a cliff or in treeline, or Smoke Screen and teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "riki_blink_strike" },
  },
  {
    category: "OwnHero",
    hero: "Riki",
    audioFile: "ownHero/Riki_3_Check detection",
    messageTime: 6 * 60,
    repeatTime: 10 * 60,
    textMessage: "Check opponents' inventories frequently for detection.",
    audience: [Audience.ALL],
    image: { type: "item", name: "SentryDustGem" },
  },
  {
    category: "OwnHero",
    hero: "Riki",
    audioFile: "ownHero/Riki_4_Avoid sentry spots",
    messageTime: 6 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid passing by spots that are typically sentried like rune or pillar spots.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    hero: "Riki",
    audioFile: "ownHero/Riki_5_Backliners",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Prioritize dealing with backliners and supports as Riki is great at gap-closing.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "riki_blink_strike" },
  },
  {
    category: "OwnHero",
    hero: "Riki",
    audioFile: "ownHero/Riki_6_Diffusal Blade",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Take your time to farm the Diffusal Blade which will significantly improve your pick-off potential.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "diffusal_blade" },
  },
  {
    category: "OwnHero",
    hero: "Riki",
    audioFile: "ownHero/Riki_7_Aghanims Shard",
    messageTime: 19 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Pick up Aghanim's Shard around minute 20 for extra control and Meteor Hammer setup if you have it.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Riki",
    audioFile: "enemyHero/Riki_1_Dust of appearance",
    messageTime: 8 * 60,
    textMessage:
      "Dust of Appearance doesn't reveal Riki while he's using Tricks of the Trade.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Riki",
    audioFile: "enemyHero/Riki_2_Detection",
    messageTimes: [10 * 60 + 10, 18 * 60 + 10, 26 * 60 + 10],
    textMessage: "Against Riki, carry detection on multiple heroes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Riki",
    audioFile: "enemyHero/Riki_3_Observer sentry",
    messageTimes: [10 * 60 + 20, 18 * 60 + 20, 26 * 60 + 20],
    textMessage:
      "Pair Observer Wards and Sentries on the map to track Riki's movements.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Riki",
    audioFile: "enemyHero/Riki_4_Protect supports",
    messageTimes: [10 * 60 + 30, 20 * 60 + 30, 30 * 60 + 30],
    textMessage: "Protect your supports from being killed by Riki.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Riki",
    audioFile: "enemyHero/Riki_5_Stuns and roots",
    messageTime: 12 * 60,
    textMessage:
      "Items and spells with stuns and roots are great against Riki's mobility spells.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Riki",
    audioFile: "enemyHero/Riki_6_Force staff",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Force Staff and Hurricane Pike, allow you to move out of Riki's Smoke Screen.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Riki",
    audioFile: "enemyHero/Riki_7_Break",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Break effects disable Cloak and Dagger and prevent Riki from being invisible.",
    audience: [Audience.ALL],
  },

  // 81. Rubick | Earlier work
  {
    category: "OwnHero",
    hero: "Rubick",
    audioFile: "ownHero/Rubick_1_Secure ranged",
    messageTime: 15,
    textMessage:
      "Secure ranged creeps with Fade Bolt and hit opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rubick_fade_bolt" },
  },
  {
    category: "OwnHero",
    hero: "Rubick",
    audioFile: "ownHero/Rubick_2_Strand",
    messageTimes: [75, 8 * 60 + 15, 15 * 60 + 15],
    textMessage:
      "When fighting next to pillars or a cliff, consider using Telekinesis to strand an opponent.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rubick_telekinesis" },
  },
  {
    category: "OwnHero",
    hero: "Rubick",
    audioFile: "ownHero/Rubick_3_Waveclear spell",
    messageTimes: [9 * 60 + 45, 12 * 60 + 45],
    textMessage:
      "In midgame, get hold of the wave-clearing spell when the game slows down to be able to depush.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rubick_spell_steal" },
  },
  {
    category: "OwnHero",
    hero: "Rubick",
    audioFile: "ownHero/Rubick_4_Push sidelanes",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out sidelanes without even showing yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rubick_fade_bolt" },
  },
  {
    category: "OwnHero",
    hero: "Rubick",
    audioFile: "ownHero/Rubick_5_Push sidelanes",
    messageTime: 12 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Be patient in the fights and make sure to steal a high impact spell.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rubick_spell_steal" },
  },

  {
    category: "EnemyHero",
    hero: "Rubick",
    audioFile: "enemyHero/Rubick_1_Bad picks",
    messageTime: -90,
    textMessage:
      "Avoid picking heroes with huge ultimates against Rubick such as Enigma, Magnus and Tidehunter",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Rubick",
    audioFile: "enemyHero/Rubick_2_Fade bolt",
    messageTime: -10,
    textMessage:
      "Avoid trading hits with Rubick while under effect of Fade Bolt as your attack damage is reduced",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Rubick",
    audioFile: "enemyHero/Rubick_3_Force staff",
    messageTime: 5 * 60 + 45,
    textMessage:
      "Rubick's Telekinesis can be broken by using Force Staff on affected ally",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Rubick",
    audioFile: "enemyHero/Rubick_4_Spell usage",
    messageTimes: [8 * 60 + 45, 18 * 60 + 45],
    textMessage:
      "Be mindful about spell usage so that you don't give away good spells to Rubick. Rubick is generally looking for stunning and high damage abilities",
    chatMessage:
      "Be mindful about spell usage so that you don't give away good spells to Rubick",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Rubick",
    audioFile: "enemyHero/Rubick_5_Lotus orb",
    messageTimes: [10 * 60 + 30, 20 * 60 + 30],
    textMessage:
      "Lotus Orb is an effective item against Rubick as both of his damage spells are targetable",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Rubick",
    audioFile: "enemyHero/Rubick_6_Team fights",
    messageTimes: [15 * 60 + 30, 25 * 60 + 30, 35 * 60 + 30, 45 * 60 + 30],
    textMessage:
      "Look to target Rubick in fights as he is a very squishy hero. If you manage to kill him you don't have to worry about spellcasting anymore",
    chatMessage:
      "Target Rubick in fights as he is squishy and you won't have to worry about spellcasting anymore",
    audience: [Audience.ALL],
  },

  // 82. Sand King | 06.03.2021
  {
    category: "OwnHero",
    hero: "Sand King",
    audioFile: "ownHero/Sand King_1_Sentry",
    messageTime: -90,
    textMessage:
      "Make sure pull camps are open for pulling as the you'll be pushing lane non stop.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    hero: "Sand King",
    audioFile: "ownHero/Sand King_2_Check detection",
    messageTimes: [15, 8 * 60 + 15, 16 * 60 + 15],
    textMessage: "Check opponents' inventories for detection frequently.",
    audience: [Audience.ALL],
    image: { type: "item", name: "SentryDustGem" },
  },
  {
    category: "OwnHero",
    hero: "Sand King",
    audioFile: "ownHero/Sand King_3_Tag explode",
    messageTimes: [75, 3 * 60 + 15],
    textMessage:
      "Tag creeps with Caustic Finale and if an opponent comes close, you can Burrowstrike and explode creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "sandking_caustic_finale" },
  },
  {
    category: "OwnHero",
    hero: "Sand King",
    audioFile: "ownHero/Sand King_4_Fight back",
    messageTimes: [3 * 60, 9 * 60],
    textMessage:
      "When in trouble, you can sometimes stand your ground in a Sand Storm and fight back.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "sandking_sand_storm" },
  },
  {
    category: "OwnHero",
    hero: "Sand King",
    audioFile: "ownHero/Sand King_5_Defend towers",
    messageTimes: [8 * 60, 12 * 60],
    textMessage:
      "Sand King is great at defending towers as you can Sand Storm in front and hide yourself in trees.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "sandking_sand_storm" },
  },
  {
    category: "OwnHero",
    hero: "Sand King",
    audioFile: "ownHero/Sand King_6_Blink",
    messageTime: 10 * 60 + 15,
    textMessage:
      "Once you have Blink Dagger, use it immediately before opponents are able to see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Sand King",
    audioFile: "ownHero/Sand King_7_Be patient",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Stay out of vision and be patient in the fights. Choose a good moment to jump with your combo.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Sand King",
    audioFile: "ownHero/Sand King_8_Splitpush",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Sand King is great at split pushing when not much is happening on the map. ",
    audience: [Audience.ALL],
    image: { type: "ability", name: "sandking_sand_storm" },
  },

  {
    category: "EnemyHero",
    hero: "Sand King",
    audioFile: "enemyHero/Sand King_1_Sentry",
    messageTime: -60,
    textMessage: "Bring a sentry to the lane against Sand King's Sand Storm.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Sand King",
    audioFile: "enemyHero/Sand King_2_Caustic finale",
    messageTime: -50,
    textMessage:
      "Your creeps explode on death due to Sand King's Caustic Finale. Denying affected creeps prevents explosion.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Sand King",
    audioFile: "enemyHero/Sand King_3_Sand storm",
    messageTime: -40,
    textMessage:
      "Avoid fighting in Sand Storm for too long as it does a lot of magical damage.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Sand King",
    audioFile: "enemyHero/Sand King_4_Detection",
    messageTimes: [10 * 60 + 10, 18 * 60 + 10, 26 * 60 + 10],
    textMessage:
      "Against Sand King you need to carry detection on multiple heroes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Sand King",
    audioFile: "enemyHero/Sand King_5_Stuns and roots",
    messageTime: 10 * 60 + 20,
    textMessage:
      "Be aware of Sand King's Blink Dagger timing. Look to cancel his Dagger in fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Sand King",
    audioFile: "enemyHero/Sand King_6_Clump up",
    messageTimes: [10 * 60 + 30, 20 * 60 + 30, 30 * 60 + 30],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Sand King's Epicenter and Blink Dagger combination.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Sand King",
    audioFile: "enemyHero/Sand King_7_Antispell items",
    messageTime: 12 * 60,
    textMessage:
      "Spell immunity and magic resistance items are great against Sand King's magical damage.",
    audience: [Audience.ALL],
  },

  // 83. Shadow Demon | 07.03.2021
  {
    category: "OwnHero",
    hero: "Shadow Demon",
    audioFile: "ownHero/Shadow Demon_1_Shadow Poison fog",
    messageTime: 15,
    textMessage:
      "Use Shadow Poison from fog to not fill stick charges for opponents.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "shadow_demon_shadow_poison" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Demon",
    audioFile: "ownHero/Shadow Demon_2_5 stacks",
    messageTime: 30,
    textMessage:
      "Don't spam Shadow Poison unless you have mana and a chance to build up 5 stacks.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_shadow_poison" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Demon",
    audioFile: "ownHero/Shadow Demon_3_Disrupt lasthits",
    messageTime: 45,
    textMessage: "You can Disrupt an opponent's core and deny a creep or two.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_disruption" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Demon",
    audioFile: "ownHero/Shadow Demon_4_Shadow Poison stacking",
    messageTimes: [90, 6 * 60 + 30],
    textMessage: "Shadow Poison is great for stacking multiple camps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_shadow_poison" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Demon",
    audioFile: "ownHero/Shadow Demon_5_Demonic Purge power",
    messageTimes: [8 * 60, 16 * 60],
    textMessage:
      "Demonic Purge is great for kitting spell-immune heroes and to dispel important buffs including runes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_demonic_purge" },
  },
/*   {
    category: "OwnHero",
    hero: "Shadow Demon",
    audioFile: "ownHero/Shadow Demon_5_Demonic Purge power",
    messageTimes: [8 * 60, 16 * 60],
    textMessage:
      "Demonic Purge is great for kitting spell-immune heroes and to dispel important buffs.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_demonic_purge" },
  }, */
  {
    category: "OwnHero",
    hero: "Shadow Demon",
    audioFile: "ownHero/Shadow Demon_6_Dont show",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Don't show yourself at the start of the fight. Be quick at saving an ally with Disruption.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "shadow_demon_disruption" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Demon",
    audioFile: "ownHero/Shadow Demon_7_Push sidelanes",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines from the fog with Shadow Poison.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_shadow_poison" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Demon",
    audioFile: "ownHero/Shadow Demon_8_Disrupt cores",
    messageTime: 13 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "You can use Disrupt on your cores to push out waves or to make deception plays.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_disruption" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Demon",
    audioFile: "ownHero/Shadow Demon_9_Aghanims Scepter",
    messageTimes: [24 * 60 + 15, 29 * 60 + 15],
    textMessage:
      "Aghanim's Scepter is a must in late game for kiting opponents and for break effect.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Shadow Demon",
    audioFile: "enemyHero/Shadow Demon_1_Magic stick wand",
    messageTime: -60,
    textMessage:
      "Shadow Demon uses Shadow Poison frequently to harass. Magic Stick and Wand will be charged up.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Demon",
    audioFile: "enemyHero/Shadow Demon_2_Shadow poison",
    messageTime: -50,
    textMessage:
      "If you have 3 stacks of Shadow Poison back up a bit and don't let yourself get hit by it again.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Demon",
    audioFile: "enemyHero/Shadow Demon_3_Demonic purge dispel",
    messageTime: 8 * 60,
    textMessage:
      "Shadow Demon's Demonic Purge applies continuous dispel and removes positive buffs from spells and items.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Demon",
    audioFile: "enemyHero/Shadow Demon_4_Focus",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Shadow Demon in the fights as he provides saves and control for his team.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Demon",
    audioFile: "enemyHero/Shadow Demon_5_Demonic purge bkb",
    messageTime: 12 * 60,
    textMessage:
      "Demonic Purge slows and damages through spell immunity. Be Careful not to waste Black King Bar on it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Demon",
    audioFile: "enemyHero/Shadow Demon_6_Avoid items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Avoid buying Radiance and Assault Cuirass against Disruption as it will replicate these items.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Demon",
    audioFile: "enemyHero/Shadow Demon_7_Counter items",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Status resistance items, Linken's Sphere and a well timed Lotus Orb are great against Shadow Demon.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Demon",
    audioFile: "enemyHero/Shadow Demon_8_Aghanims scepter",
    messageTime: 20 * 60,
    textMessage:
      "Once Shadow Demon gets Aghanim's Scepter he's able to break passive spells with Demonic Purge.",
    audience: [Audience.ALL],
  },

  // 84. Shadow Fiend | Earlier work
  {
    category: "OwnHero",
    hero: "Shadow Fiend",
    audioFile: "ownHero/Shadow Fiend_1_Secure lasthits",
    messageTime: 10,
    textMessage:
      "Stack Shadowraze debuffs on opponents' mid and secure lasthits at the same time if possible.",
    audience: [Audience.ROLE_MID],
    image: { type: "ability", name: "nevermore_shadowraze3" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Fiend",
    audioFile: "ownHero/Shadow Fiend_2_Necromastery stacks",
    messageTime: 20,
    textMessage:
      "Build up Necromastery stacks through lasthitting and capitalize on the extra damage you have.",
    audience: [Audience.ROLE_CARRY, Audience.ROLE_MID],
    image: { type: "ability", name: "nevermore_necromastery" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Fiend",
    audioFile: "ownHero/Shadow Fiend_3_Stack small camp",
    messageTimes: [2 * 60 + 40, 4 * 60 + 40],
    textMessage:
      "Stack a small camp next to the midlane and raze it after addressing the next creepwave.",
    audience: [Audience.ROLE_MID],
    image: { type: "ability", name: "nevermore_shadowraze3" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Fiend",
    audioFile: "ownHero/Shadow Fiend_4_Rune control",
    messageTimes: [3 * 60 + 40, 5 * 60 + 40],
    textMessage:
      "Kill the creepwave prior to rune spawns quickly and collect the runes. You need runes badly for mana.",
    audience: [Audience.ROLE_MID],
    image: { type: "rune", name: "regeneration" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Fiend",
    audioFile: "ownHero/Shadow Fiend_5_Stacks",
    messageTimes: [4 * 60 + 30, 7 * 60 + 30],
    textMessage:
      "Alert your teammates to stack for you as you can clear those early.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Shadow Fiend",
    audioFile: "ownHero/Shadow Fiend_6_Farm Euls",
    messageTimes: [5 * 60 + 45, 7 * 60 + 45],
    textMessage:
      "Focus on farming Eul's Scepter and don't rotate unnecessarily.",
    audience: [Audience.ROLE_MID],
    image: { type: "item", name: "cyclone" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Fiend",
    audioFile: "ownHero/Shadow Fiend_7_Pick off",
    messageTimes: [9 * 60 + 45, 15 * 60 + 45],
    textMessage:
      "Make pick-off plays with Eul's Scepter, Requiem of Souls and Shadowraze combination.",
    audience: [Audience.ROLE_MID],
    image: { type: "item", name: "cyclone" },
  },
  {
    category: "OwnHero",
    hero: "Shadow Fiend",
    audioFile: "ownHero/Shadow Fiend_8_Push sidelanes",
    messageTime: 12 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage: "Keep sidelines pushed out when not much is happening.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Shadow Fiend",
    audioFile: "enemyHero/Shadow Fiend_1_Laning",
    messageTime: 20,
    textMessage:
      "Shadow Fiend has low starting damage and he relies on gathering souls through last hits. If you do well against him on the first few waves you are likely to win the match up",
    chatMessage:
      "Shadow Fiend has low starting damage and he relies on gathering souls through last hits",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Fiend",
    audioFile: "enemyHero/Shadow Fiend_2_Gank",
    messageTime: 4 * 60 + 10,
    textMessage:
      "Shadow Fiend doesn't have an escape mechanism, so look to gank him during the laning stage. If left unchallenged, he's one of the best farming heroes",
    chatMessage:
      "Shadow Fiend doesn't have an escape mechanism, so look to gank him during the laning stage",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Fiend",
    audioFile: "enemyHero/Shadow Fiend_3_Attack",
    messageTime: 8 * 60 + 30,
    textMessage:
      "Try not to run at Shadow Fiend in plain sight as you might get triple razed to death",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Fiend",
    audioFile: "enemyHero/Shadow Fiend_4_Item build",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Shadow Fiend's first big item is either Eul's Scepter or Shadow Blade. Both items are good at picking off heroes, so keep an eye on his item build",
    chatMessage:
      "Shadow Fiend's first big item is either Eul's Scepter or Shadow Blade. Both are good at killing heroes",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Fiend",
    audioFile: "enemyHero/Shadow Fiend_5_Team fight 1",
    messageTimes: [15 * 60 + 30, 35 * 60 + 30, 55 * 60 + 30],
    textMessage:
      "In team-fights, look to play around Shadow Fiend's ultimate by either canceling it or moving away from him",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Fiend",
    audioFile: "enemyHero/Shadow Fiend_6_Armor",
    messageTime: 18 * 60 + 30,
    textMessage:
      "Armor items are good against Shadow Fiend as his Presence of the Dark Lord is an armor reducing aura",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Fiend",
    audioFile: "enemyHero/Shadow Fiend_7_Team fight 2",
    messageTimes: [25 * 60 + 30, 45 * 60 + 30, 65 * 60 + 30],
    textMessage:
      "Shadow Fiend should be a high priority target in team fights. If left unchecked, he can do tons of damage. At the same time, he's not that tanky and easy to bring down",
    chatMessage:
      "Shadow Fiend should be a high priority target in team fights. He does tons of damage and is squishy",
    audience: [Audience.ALL],
  },

  // 85. Shadow Shaman | 07.03.2021
  {
    category: "OwnHero",
    hero: "Shadow Shaman",
    audioFile: "ownHero/Shadow Shaman_1_RightClick",
    messageTime: -30,
    textMessage:
      "Make use of Shadow Shaman's high base damage to secure last hits and denies.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Shadow Shaman",
    audioFile: "ownHero/Shadow Shaman_2_Combo",
    messageTime: 6 * 60,
    textMessage:
      "A good Combo is to use Hex followed by Mass Serpent Ward with Shackles.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Shadow Shaman",
    audioFile: "ownHero/Shadow Shaman_3_Ultimate",
    messageTime: 6 * 60 + 30,
    textMessage:
      "You can pull nearby neutral or lane creeps to your Mass Serpent Wards after you made a move to get some extra gold.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Shadow Shaman",
    audioFile: "ownHero/Shadow Shaman_4_Ultimate2",
    messageTime: 8 * 60,
    textMessage:
      "If opponents are farming your Mass Serpent Wards, try to deny individual Serpent Wards with other Serpent Wards.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Shadow Shaman",
    audioFile: "ownHero/Shadow Shaman_5_Range",
    messageTime: 10 * 60,
    textMessage:
      "Take your time to farm up Aether Lens or Blink Dagger, so that you can cast you spells more easily in fights.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Shadow Shaman",
    audioFile: "ownHero/Shadow Shaman_6_Disables",
    messageTime: 14 * 60,
    textMessage:
      "Initiate on enemies with your long lasting disables, so your allies can follow-up for a kill.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Shadow Shaman",
    audioFile: "ownHero/Shadow Shaman_7_BKB",
    messageTime: 20 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "In certain games, Black King Bar can be great to get off full Shackles durations.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Shadow Shaman",
    audioFile: "ownHero/Shadow Shaman_8_Items",
    messageTime: 30 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "Aghanim's Scepter and a Refresher Orb in late game, allow you to breach high ground and end the game.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Shadow Shaman",
    audioFile: "enemyHero/Shadow Shaman_1_Avoid trading",
    messageTime: -60,
    textMessage:
      "Shadow Shaman has high base damage and a great nuke in Ether Shock. Avoid trading with him.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Shaman",
    audioFile: "enemyHero/Shadow Shaman_2_Disabling spells",
    messageTime: 30,
    textMessage:
      "Shadow Shaman has long lasting but short cast range disables. Keep distance from him.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Shaman",
    audioFile: "enemyHero/Shadow Shaman_3_Mass serpent ward",
    messageTime: 8 * 60,
    textMessage:
      "Shadow Shaman has high solo kill potential on level 6 with Mass Serpent Ward.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Shaman",
    audioFile: "enemyHero/Shadow Shaman_4_Tower defense",
    messageTimes: [8 * 60 + 10, 18 * 60 + 10, 28 * 60 + 10],
    textMessage:
      "Shadow Shaman takes buildings down fast with Mass Serpent Ward. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Shaman",
    audioFile: "enemyHero/Shadow Shaman_5_Focus",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Shadow Shaman in the fights as he provides a lot of control for his team.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Shadow Shaman",
    audioFile: "enemyHero/Shadow Shaman_6_Counter items",
    messageTime: 12 * 60,
    textMessage:
      "Black King Bar, status resistance items, Linken's Sphere and Lotus Orb are great against Shadow Shaman.",
    audience: [Audience.ALL],
  },
  /*{category: "EnemyHero", hero: "Shadow Shaman", audioFile: "enemyHero/Shadow Shaman_7_Crimson guard", messageTime: (12*60+10), textMessage: "Crimson Guard is great at reducing damage on buildings and heroes by Mass Serpent Ward.", audience: [Audience.ALL]}, 12.6.2021 no longer valid */
  {
    category: "EnemyHero",
    hero: "Shadow Shaman",
    audioFile: "enemyHero/Shadow Shaman_8_Ratting",
    messageTime: 25 * 60,
    textMessage:
      "Shadow Shaman is good at ratting your base especially with Aghanim's Scepter and Refresher Orb.",
    audience: [Audience.ALL],
  },

  // 86. Silencer | 07.03.2021
  {
    category: "OwnHero",
    hero: "Silencer",
    audioFile: "ownHero/Silencer_1_ArcaneCurse",
    messageTime: 30,
    textMessage: "Use Arcane Curse when you expect opponents to cast a spell.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Silencer",
    audioFile: "ownHero/Silencer_2_GlaivesOfWisdom",
    messageTime: 60,
    textMessage:
      "Clicking Glaives of Wisdom on an enemy hero doesn't draw creep aggro.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Silencer",
    audioFile: "ownHero/Silencer_3_Intelligence",
    messageTime: -20,
    textMessage:
      "To steal intelligence from a dying hero you have to have Glaives of Wisdom skilled and be within 925 of dying hero or be the one who scores the kill.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Silencer",
    audioFile: "ownHero/Silencer_4_Combo",
    messageTime: 90,
    textMessage: "Combining Arcane Curse with Last Word does a lot of damage.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Silencer",
    audioFile: "ownHero/Silencer_5_Minimap",
    messageTime: 8 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "Be aware of what happens on the map, so you can use Global Silence when needed.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Silencer",
    audioFile: "ownHero/Silencer_6_GlobalSilence1",
    messageTime: 12 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "Using Global Silence defensively is fine, but ideally use it during fights. Make moves when it is off cooldown.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Silencer",
    audioFile: "ownHero/Silencer_7_GlobalSilence2",
    messageTime: 20 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "Many items dispel Global Silence. Be patient and don't waste it at the start of a fight.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Silencer",
    audioFile: "enemyHero/Silencer_1_Glaives of wisdom",
    messageTime: -60,
    textMessage:
      "Glaives of Wisdom are great for harassing as Silencer doesn't pull aggro and the damage ramps up.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Silencer",
    audioFile: "enemyHero/Silencer_2_Arcane curse",
    messageTime: -50,
    textMessage:
      "Silencer's Arcane Curse gets extended every time you cast a spell while under the effect of it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Silencer",
    audioFile: "enemyHero/Silencer_3_Global Silence",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Global Silence has a long cooldown. Look to fight after it was used.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Silencer",
    audioFile: "enemyHero/Silencer_4_Dispel items",
    messageTime: 12 * 60,
    textMessage:
      "Items that provide dispel are great against Silencer's silences.",
    audience: [Audience.ALL],
  },

  // 87. Skywrath Mage | 07.03.2021
  {
    category: "OwnHero",
    hero: "Skywrath Mage",
    audioFile: "ownHero/Skywrath Mage_1_Squishy",
    messageTime: -45,
    textMessage:
      "Skywrath Mage is very squishy, so be mindful about your positioning.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Skywrath Mage",
    audioFile: "ownHero/Skywrath Mage_2_Secure ranged",
    messageTime: 15,
    textMessage:
      "Use Arcane Bolt or Concussive Shot to secure ranged creep lastihts.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skywrath_mage_arcane_bolt" },
  },
  {
    category: "OwnHero",
    hero: "Skywrath Mage",
    audioFile: "ownHero/Skywrath Mage_3_Fog casting",
    messageTime: 30,
    textMessage:
      "Cast your spells from fog whenever you can if opponents have magic sticks.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "skywrath_mage_arcane_bolt" },
  },
  {
    category: "OwnHero",
    hero: "Skywrath Mage",
    audioFile: "ownHero/Skywrath Mage_4_Smoke gank",
    messageTimes: [10 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Find a ganking partner that can set up your Mystic Flare and burn smokes with him.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "OwnHero",
    hero: "Skywrath Mage",
    audioFile: "ownHero/Skywrath Mage_5_Fight focus",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, focus on dropping Mystic Flare on a disabled unit and applying Ancient Seal on a target with no dispel.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "skywrath_mage_mystic_flare" },
  },

  {
    category: "EnemyHero",
    hero: "Skywrath Mage",
    audioFile: "enemyHero/Skywrath Mage_1_Magic stick wand",
    messageTime: -60,
    textMessage:
      "Skywrath Mage uses his spells frequently to harass. Magic Stick and Wand will be charged up.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Skywrath Mage",
    audioFile: "enemyHero/Skywrath Mage_2_Infused raindrops",
    messageTime: 3 * 60 + 30,
    textMessage:
      "Consider purchasing Infused Raindrops against Skywrath Mage's damaging spells.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Skywrath Mage",
    audioFile: "enemyHero/Skywrath Mage_3_Focus",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Skywrath Mage in fights as he does a lot of damage but is very squishy.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Skywrath Mage",
    audioFile: "enemyHero/Skywrath Mage_4_Rod of atos",
    messageTime: 10 * 60 + 20,
    textMessage:
      "Be aware of Rod of Atos timing on Skywrath Mage. He can solo kill most of the heroes with it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Skywrath Mage",
    audioFile: "enemyHero/Skywrath Mage_5_Force staff",
    messageTime: 12 * 60,
    textMessage:
      "Force Staff is great at saving an ally from Skywrath's Mystic Flare.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Skywrath Mage",
    audioFile: "enemyHero/Skywrath Mage_6_Antispell items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Magic resistance and spell immunity items are great against Skywrath Mage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Skywrath Mage",
    audioFile: "enemyHero/Skywrath Mage_7_Dispel items",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Items that provide dispel are great against Skywrath's Ancient Seal and root from Rod of Atos.",
    audience: [Audience.ALL],
  },

  // 88. Slardar | 07.03.2021
  {
    category: "OwnHero",
    hero: "Slardar",
    audioFile: "ownHero/Slardar_1_Bash of the deep",
    messageTime: 10,
    textMessage:
      "Keep an eye on Bash of the Deep charges and preferably bash the opponents.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slardar_bash" },
  },
  {
    category: "OwnHero",
    hero: "Slardar",
    audioFile: "ownHero/Slardar_2_Secure ranged",
    messageTime: 20,
    textMessage:
      "Use Slithereen Crush and Bash of the Deep to secure ranged creep lasthits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slardar_slithereen_crush" },
  },
  {
    category: "OwnHero",
    hero: "Slardar",
    audioFile: "ownHero/Slardar_3_River",
    messageTime: 4 * 60 + 45,
    repeatTime: 15 * 60,
    textMessage:
      "Run through the river as much as you can when you are moving around due to extra movement speed.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slardar_sprint" },
  },
  {
    category: "OwnHero",
    hero: "Slardar",
    audioFile: "ownHero/Slardar_4_Charge up",
    messageTimes: [5 * 60, 12 * 60, 19 * 60],
    textMessage:
      "Build up Bash of the Deep charges up to 3 ideally, before making a move or gank attempt.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slardar_bash" },
  },
  {
    category: "OwnHero",
    hero: "Slardar",
    audioFile: "ownHero/Slardar_5_Blink",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Once you have Blink Dagger, make use of it before opponents are able to see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Slardar",
    audioFile: "ownHero/Slardar_6_Core focus",
    messageTime: 11 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, play around your right-clicking core. Jump and Corrosive Haze the target he is able to hit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slardar_amplify_damage" },
  },
  {
    category: "OwnHero",
    hero: "Slardar",
    audioFile: "ownHero/Slardar_7_Roshan",
    messageTimes: [14 * 60 + 45, 17 * 60 + 45],
    textMessage:
      "Slardar enables the team to take Roshan down fairly early due to Corrosive Haze.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    hero: "Slardar",
    audioFile: "enemyHero/Slardar_1_Bash of the deep",
    messageTime: -60,
    textMessage:
      "After every 3rd hit, Slardar will have Bash of the Deep charged up. Keep yourself at distance.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Slardar",
    audioFile: "enemyHero/Slardar_2_Blink dagger",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Be aware of Slardar's Blink Dagger timing. Look to cancel his Dagger in the fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Slardar",
    audioFile: "enemyHero/Slardar_3_Dispel items",
    messageTime: 12 * 60,
    textMessage:
      "Items that provide dispel are great against Slardar's Corrosive Haze.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Slardar",
    audioFile: "enemyHero/Slardar_4_Armor items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Armor items are great against Slardar's damage output and armor reduction.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Slardar",
    audioFile: "enemyHero/Slardar_5_Roshan",
    messageTimes: [15 * 60 + 10, 20 * 60 + 10, 25 * 60 + 10],
    textMessage:
      "Slardar lineups are able to take Roshan early on. Ward around Roshpit and check.",
    audience: [Audience.ALL],
  },

  // 89. Slark | Earlier work
  {
    category: "OwnHero",
    hero: "Slark",
    audioFile: "ownHero/Slark_1_Scout wards",
    messageTime: -90,
    textMessage:
      "As you load into the game, start running to scout opponents placing wards as you have night vision.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Slark",
    audioFile: "ownHero/Slark_2_Damage difference",
    messageTime: 15,
    textMessage:
      "Hit an opponent whenever you can to create a damage difference of 4. It'll help you with lasthiting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slark_essence_shift" },
  },
  {
    category: "OwnHero",
    hero: "Slark",
    audioFile: "ownHero/Slark_3_Go Pounce",
    messageTime: 75,
    textMessage:
      "If you are able to build up a few Essence Shift stacks, you can perhaps commit for a kill attempt with Pounce.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slark_pounce" },
  },
  {
    category: "OwnHero",
    hero: "Slark",
    audioFile: "ownHero/Slark_4_Night aggression",
    messageTime: 4 * 60 + 55,
    repeatTime: 10 * 60,
    textMessage:
      "Play more aggressively during night time as you have increased vision.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Slark",
    audioFile: "ownHero/Slark_5_In trouble",
    messageTimes: [6 * 60, 13 * 60],
    textMessage:
      "Whenever you are in trouble, you can Pounce away or even Shadow Dance and teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slark_pounce" },
  },
  {
    category: "OwnHero",
    hero: "Slark",
    audioFile: "ownHero/Slark_6_Deward",
    messageTimes: [6 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Pick up a couple of sentries to deward when you sense with Shadow Dance you are being seen.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    hero: "Slark",
    audioFile: "ownHero/Slark_7_Stacks aggression",
    messageTimes: [6 * 60 + 30, 16 * 60 + 30, 26 * 60 + 30],
    textMessage:
      "Whenever you have a decent amount of Essence Shift, play more aggressively and look for extra kills.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slark_essence_shift" },
  },
  {
    category: "OwnHero",
    hero: "Slark",
    audioFile: "ownHero/Slark_8_Push sidelanes",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Whenever not much is happening, push out the sidelines as Slark is quite elusive.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slark_dark_pact" },
  },

  {
    category: "EnemyHero",
    hero: "Slark",
    audioFile: "enemyHero/Slark_1_Offlane melee",
    messageTime: -90,
    textMessage:
      "Slark tends to do well against offlane melee due to Essence Shift stacks. Check if you can send at least one ranged hero against him",
    chatMessage:
      "Slark tends to do well against offlane melee due to Essence Shift stacks. Send one ranged hero against him",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Slark",
    audioFile: "enemyHero/Slark_2_Wards",
    messageTimes: [4 * 60 + 45, 10 * 60 + 45],
    textMessage:
      "Place wards in unusual spots and more defensively as Slark is able to sense vision with his ultimate",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Slark",
    audioFile: "enemyHero/Slark_3_Dark pact",
    messageTime: 6 * 60 + 30,
    textMessage:
      "Keep an eye on Slark's Dark Pact usage so that your spells and items don't get dispelled",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Slark",
    audioFile: "enemyHero/Slark_4_Force staff",
    messageTime: 8 * 60 + 30,
    textMessage: "Force Staff allows you to break away from Slark's Pounce",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Slark",
    audioFile: "enemyHero/Slark_5_Night vision",
    messageTime: 9 * 60 + 30,
    textMessage:
      "Slark has increased night vision so he's likely to spot you before you spot him. Use Smoke of Deceit to gank him more effectively during night",
    chatMessage:
      "Slark has increased night vision so use Smoke of Deceit to gank him more effectively during night",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Slark",
    audioFile: "enemyHero/Slark_6_Essence shift",
    messageTimes: [15 * 60 + 30, 30 * 60 + 30],
    textMessage:
      "Long fights are favoring Slark as he is able to acquire Essence Shift stacks. Keep an eye on it and avoid fighting him if his stacks are high",
    chatMessage:
      "Long fights are favoring Slark as he acquires Essence Shift stacks. Avoid fighting him when stacks are high",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Slark",
    audioFile: "enemyHero/Slark_7_Counter items",
    messageTime: 20 * 60 + 30,
    textMessage:
      "Instant or near instant disables and burst damage are good at dealing with Slark",
    audience: [Audience.ALL],
  },

  // 90. Snapfire | Earlier work
  {
    category: "OwnHero",
    hero: "Snapfire",
    audioFile: "ownHero/Snapfire_1_Secure ranged",
    messageTime: 15,
    textMessage:
      "Secure ranged creep lasthits with Scatteblast and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_scatterblast" },
  },
  {
    category: "OwnHero",
    hero: "Snapfire",
    audioFile: "ownHero/Snapfire_2_Secure ranged",
    messageTime: 75,
    textMessage:
      "Look for opportunities to cookie yourself in, or an ally or creep to stun opponents and apply follow-up damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_firesnap_cookie" },
  },
  {
    category: "OwnHero",
    hero: "Snapfire",
    audioFile: "ownHero/Snapfire_3_Communicate cookie",
    messageTime: 90,
    textMessage:
      "Communicate with your allies whenever you are going to use Firesnap Cookie.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_firesnap_cookie" },
  },
  {
    category: "OwnHero",
    hero: "Snapfire",
    audioFile: "ownHero/Snapfire_4_Value point",
    messageTime: 105,
    textMessage:
      "Pick up a point in Lil' Shredder if you are dealing with hit count spells like Tombstone, The Swarm and such.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_lil_shredder" },
  },
  {
    category: "OwnHero",
    hero: "Snapfire",
    audioFile: "ownHero/Snapfire_5_In trouble",
    messageTimes: [2 * 60 + 45, 12 * 60 + 45, 22 * 60 + 45],
    textMessage:
      "When in trouble, use Firesnap Cookie to jump into a treeline or over a cliff.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_firesnap_cookie" },
  },
  {
    category: "OwnHero",
    hero: "Snapfire",
    audioFile: "ownHero/Snapfire_6_Value point",
    messageTimes: [6 * 60 + 15, 12 * 60 + 15],
    textMessage:
      "It is very important that you land the first Mortimer Kiss to slow the opponents so it is easier to land follow-up ones.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_mortimer_kisses" },
  },
  {
    category: "OwnHero",
    hero: "Snapfire",
    audioFile: "ownHero/Snapfire_7_Push sidelanes",
    messageTime: 12 * 60 + 15,
    textMessage:
      `When there's not much happening, push out the sidelines with Scatterblast and Cookie.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_scatterblast" },
  },
  {
    category: "OwnHero",
    hero: "Snapfire",
    audioFile: "ownHero/Snapfire_8_Push sidelanes",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanim's Shard around the 15 minute mark as it adds another disable and sets up a Firesnap Cookie.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Snapfire",
    audioFile: "enemyHero/Snapfire_1_Scatterblast",
    messageTime: -10,
    textMessage:
      "Avoid staying too close to Snapfire on the lane as her main harassing spell is Scatterblast which does 50% more damage if you are within 450 range",
    chatMessage:
      "Avoid staying close to Snapfire as her Scatterblast which does 50% more damage if you are within 450 range",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Snapfire",
    audioFile: "enemyHero/Snapfire_2_Firesnap cookie",
    messageTime: 50,
    textMessage:
      "Firesnap Cookie stun can be dodged if you run quickly towards the hero or creep that cookie was used on",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Snapfire",
    audioFile: "enemyHero/Snapfire_3_Lil' Shredder",
    messageTime: 6 * 60 + 30,
    textMessage:
      "Be careful with spells that have hit counter as they are countered by Snapfire's Lil' Shredder",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Snapfire",
    audioFile: "enemyHero/Snapfire_4_Mortimer kisses 1",
    messageTimes: [8 * 60 + 45, 28 * 60 + 45, 48 * 60 + 45],
    textMessage:
      "To dodge Snapfire's Mortimer Kisses, make sharp turns and change direction",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Snapfire",
    audioFile: "enemyHero/Snapfire_5_Magic damage",
    messageTimes: [18 * 60 + 45, 38 * 60 + 45],
    textMessage:
      "Snapfire's damage is primarily magical, getting magic resistance items or Black King Bar allows you to negate most of her impact in fights",
    chatMessage:
      "Snapfire's damage is primarily magical. Magic resistance items or Black King Bar is good",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Snapfire",
    audioFile: "enemyHero/Snapfire_6_Mortimer kisses 2",
    messageTimes: [23 * 60 + 0, 33 * 60 + 0, 53 * 60 + 0],
    textMessage:
      "Canceling Snapfire's ultimate can be a fight winning move. Try to position yourself such that you can get to her as quickly as possible. Getting gap closing items helps as well",
    chatMessage:
      "Canceling Snapfire's ultimate can be a fight winning move. Getting gap closing items helps",
    audience: [Audience.ALL],
  },

  // 91. Sniper | Earlier work
  {
    category: "OwnHero",
    hero: "Sniper",
    audioFile: "ownHero/Sniper_1_Minimap",
    messageTime: -30,
    textMessage:
      "Sniper gets easily ganked, always have an Observer Ward placed and pay attention to the minimap.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Sniper",
    audioFile: "ownHero/Sniper_2_Shrapnel1",
    messageTimes: [
      1 * 60 + 45,
      3 * 60 + 45,
      5 * 60 + 45,
      7 * 60 + 45,
      9 * 60 + 45,
    ],
    textMessage: "Push out the lane with Shrapnel prior to rune spawns.",
    audience: [Audience.ROLE_MID],
  },
  {
    category: "OwnHero",
    hero: "Sniper",
    audioFile: "ownHero/Sniper_3_Stack",
    messageTime: 2 * 60 + 45,
    textMessage: "Stack a small camp whenever you can.",
    audience: [Audience.ROLE_MID],
  },
  {
    category: "OwnHero",
    hero: "Sniper",
    audioFile: "ownHero/Sniper_4_Push",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Sniper doesn't like to rotate too much, so focus on farming and pressure the tower if opponents' mid rotates.",
    audience: [Audience.ROLE_MID],
  },
  {
    category: "OwnHero",
    hero: "Sniper",
    audioFile: "ownHero/Sniper_5_TeamFight",
    messageTime: 10 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Don't let opponents see you at the start of a fight. Let them focus on someone else.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Sniper",
    audioFile: "ownHero/Sniper_6_Shrapnel2",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "If you feel you might be ganked, Shrapnel the wave and move out.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Sniper",
    audioFile: "ownHero/Sniper_7_Shrapnel3",
    messageTime: 11 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Sniper is really strong at defending buildings with Shrapnel and his long attack range.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Sniper",
    audioFile: "ownHero/Sniper_9_Take_Aim",
    messageTime: 11 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "When in trouble, often times the correct play is to press Take Aim and stand your ground.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Sniper",
    audioFile: "ownHero/Sniper_8_Aghanims",
    messageTimes: [15 * 60, 20 * 60],
    textMessage:
      "Aghanim's Scepter and Aghanim's Shard are Core items. Take your time in between the fights to farm them.",
    audience: [Audience.ROLE_SUPPORT],
  },

  {
    category: "EnemyHero",
    hero: "Sniper",
    audioFile: "enemyHero/Sniper_1_Gank",
    messageTimes: [1 * 60 + 30, 4 * 60 + 30],
    textMessage:
      "Gank Sniper in early game. He doesn't have any escape mechanism and is very squishy",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Sniper",
    audioFile: "enemyHero/Sniper_2_Gap-closing",
    messageTimes: [7 * 60 + 10, 15 * 60 + 20, 25 * 60 + 25],
    textMessage: "Buy gap-closing items against Sniper",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Sniper",
    audioFile: "enemyHero/Sniper_3_Smoke assassinate",
    messageTime: 8 * 60 + 30,
    textMessage:
      "Smoke of Deceit can be used to dodge Sniper's Assassinate ability",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Sniper",
    audioFile: "enemyHero/Sniper_4_Smoke attack",
    messageTimes: [10 * 60 + 15, 20 * 60 + 15, 30 * 60 + 15],
    textMessage:
      "Use Smoke of Deceit to wrap around and catch Sniper off-guard",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Sniper",
    audioFile: "enemyHero/Sniper_5_Deep wards",
    messageTimes: [11 * 60 + 15, 23 * 60 + 15, 33 * 60 + 15],
    textMessage:
      "Deep observer wards allow you to spot Sniper on the backlines",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Sniper",
    audioFile: "enemyHero/Sniper_6_High-ground",
    messageTimes: [23 * 60 + 10, 32 * 60 + 10, 41 * 60 + 10],
    textMessage:
      "Be very careful when pushing high-ground against Sniper. Chip the tower and racks patiently and don't overextend. You might also want to give up on the high-ground siege and take a fight outside of their base",
    chatMessage:
      "Be careful when pushing high-ground against Sniper. Chip the tower and racks patiently and don't overextend",
    audience: [Audience.ALL],
  },

  // 92. Spectre | 07.03.2021
  {
    category: "OwnHero",
    hero: "Spectre",
    audioFile: "ownHero/Spectre_1_Secure ranged",
    messageTime: 15,
    textMessage:
      "Use Spectral Dagger to secure ranged creep lasthits and damage the opponents.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spectre_spectral_dagger" },
  },
  {
    category: "OwnHero",
    hero: "Spectre",
    audioFile: "ownHero/Spectre_2_Escape",
    messageTimes: [3 * 60, 13 * 60, 23 * 60],
    textMessage:
      "When in trouble, use a Spectral Dagger to run over a cliff or a treeline, or even pop a defensive Haunt to escape.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spectre_spectral_dagger" },
  },
  {
    category: "OwnHero",
    hero: "Spectre",
    audioFile: "ownHero/Spectre_3_Look around",
    messageTime: 7 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Look around for Haunt opportunities. Spectre farms slowly so kills are necessary.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spectre_haunt" },
  },
  {
    category: "OwnHero",
    hero: "Spectre",
    audioFile: "ownHero/Spectre_4_Kill targets",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Spectre's Haunt is amazing for killing backliners and supports. Focus on killing those at the start of the fight.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spectre_haunt" },
  },
  {
    category: "OwnHero",
    hero: "Spectre",
    audioFile: "ownHero/Spectre_5_Break effects",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Check opponents for break effects. Adapt your playstyle and itemization accordingly.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    hero: "Spectre",
    audioFile: "ownHero/Spectre_6_Manta spike",
    messageTime: 16 * 60 + 15,
    textMessage:
      "With Manta Style, Spectre gains burst and Roshan potential as Desolate works on illusions.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "manta" },
  },

  {
    category: "EnemyHero",
    hero: "Spectre",
    audioFile: "enemyHero/Spectre_1_Pressure early",
    messageTime: -60,
    textMessage:
      "Spectre is a weak laner. Look to pressure her early on. She's slow at recovering.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Spectre",
    audioFile: "enemyHero/Spectre_2_Desolate",
    messageTime: 30,
    textMessage:
      "Spectre's Desolate does no damage to you, if you are close to an allied unit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Spectre",
    audioFile: "enemyHero/Spectre_3_Focus",
    messageTime: 40,
    textMessage:
      "The closer you are to Spectre the more damage you take from Dispersion.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Spectre",
    audioFile: "enemyHero/Spectre_4_Protect supports",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Protect your supports from being killed during the Spectre's Haunt.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Spectre",
    audioFile: "enemyHero/Spectre_5_Haunt cd",
    messageTimes: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Spectre's Haunt has a long cooldown. Look to fight after it was used.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Spectre",
    audioFile: "enemyHero/Spectre_6_Break",
    messageTime: 12 * 60,
    textMessage:
      "Break effects remove Desolate and Dispersion and make Spectre much weaker.",
    audience: [Audience.ALL],
  },

  // 93. Spirit Breaker | 07.03.2021
  {
    category: "OwnHero",
    hero: "Spirit Breaker",
    audioFile: "ownHero/Spirit Breaker_1_Creep equilibrium",
    messageTime: 15,
    textMessage:
      "In order to pressure opponents on the lane, bring creep equilibrium closer to your tower.",
    audience: [Audience.ROLE_SUPPORT_SOFT, Audience.ROLE_OFFLANE],
  },
  {
    category: "OwnHero",
    hero: "Spirit Breaker",
    audioFile: "ownHero/Spirit Breaker_2_Charge further target",
    messageTimes: [90, 11 * 60 + 30, 21 * 60 + 30],
    textMessage:
      "Consider charging the further target and bash all the opponents' heroes on the way.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spirit_breaker_charge_of_darkness" },
  },
  {
    category: "OwnHero",
    hero: "Spirit Breaker",
    audioFile: "ownHero/Spirit Breaker_3_Movement speed items",
    messageTimes: [2 * 60, 13 * 60, 24 * 60],
    textMessage:
      "Movement speed items are amazing for Spirit Breaker as they amplify the Greater Bash damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "phase_boots" },
  },
  {
    category: "OwnHero",
    hero: "Spirit Breaker",
    audioFile: "ownHero/Spirit Breaker_4_Pop charge",
    messageTimes: [2 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Pop Bulldoze and other movement speed-increasing items like Phase Boots or Shadow Blade before charge lands.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spirit_breaker_bulldoze" },
  },
  {
    category: "OwnHero",
    hero: "Spirit Breaker",
    audioFile: "ownHero/Spirit Breaker_5_Provide vision",
    messageTime: 7 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Use Charge of Darkness to provide vision over an opponent so he can't juke your allies.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spirit_breaker_charge_of_darkness" },
  },
  {
    category: "OwnHero",
    hero: "Spirit Breaker",
    audioFile: "ownHero/Spirit Breaker_6_Rosh charge",
    messageTimes: [7 * 60 + 30, 17 * 60 + 30],
    textMessage:
      "Careful about charging through Roshpit as you can get bashed.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spirit_breaker_charge_of_darkness" },
  },
  {
    category: "OwnHero",
    hero: "Spirit Breaker",
    audioFile: "ownHero/Spirit Breaker_7_Backliners",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Charge of Darkness allows you to focus on the backliners and supports. Focus on those in the fights.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spirit_breaker_charge_of_darkness" },
  },
  {
    category: "OwnHero",
    hero: "Spirit Breaker",
    audioFile: "ownHero/Spirit Breaker_8_Farm Shadow Blade",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Take your time to farm Shadow Blade as it provides even more burst and almost guarantees charge completion.",
    audience: [Audience.ALL],
    image: { type: "item", name: "invis_sword" },
  },
  {
    category: "OwnHero",
    hero: "Spirit Breaker",
    audioFile: "ownHero/Spirit Breaker_9_Push sidelanes",
    messageTime: 11 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage: "When not much is happening, push out the sidelines.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spirit_breaker_charge_of_darkness" },
  },
  {
    category: "OwnHero",
    hero: "Spirit Breaker",
    audioFile: "ownHero/Spirit Breaker_10_Aghanims Scepter",
    messageTimes: [17 * 60 + 45, 21 * 60 + 45],
    textMessage:
      "Aghanim's Scepter is a must in the mid-late game as it deals with spell-immunity and makes charge more frequent.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Spirit Breaker",
    audioFile: "enemyHero/Spirit Breaker_1_Charge of darkness",
    messageTime: -60,
    textMessage:
      "Charge of Darkness provides vision over you. Hiding in trees won't help once you're charged.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Spirit Breaker",
    audioFile: "enemyHero/Spirit Breaker_2_Bulldoze",
    messageTime: 30,
    textMessage: "Avoid wasting disables on Spirit Breaker buffed by Bulldoze.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Spirit Breaker",
    audioFile: "enemyHero/Spirit Breaker_3_Roam",
    messageTimes: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Spirit Breaker roams a lot. Keep track of his movements and have a teleport ready.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Spirit Breaker",
    audioFile: "enemyHero/Spirit Breaker_4_Counter charge items",
    messageTime: 12 * 60,
    textMessage:
      "Spells and items that provide instant disable are great at stopping Charge of Darkness.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Spirit Breaker",
    audioFile: "enemyHero/Spirit Breaker_5_Linkens sphere",
    messageTime: 12 * 60 + 10,
    textMessage: "Linken's Sphere is great against Charge of Darkness.",
    audience: [Audience.ALL],
  },

  // 94. Storm Spirit | 07.03.2021
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_1_Rune control",
    messageTimes: [5 * 60 + 45, 15 * 60 + 45, 25 * 60 + 45],
    textMessage:
      "Rune control is very important. Arcane and Regeneration runes can easily win you the fight or allow you to get a pick-off.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_2_Stack",
    messageTime: 2 * 60 + 45,
    textMessage:
      "Stack small camp and clear it after addressing lane creeps. It is very important to hit level 6 as soon as possible to make yourself less gankable.",
    audience: [Audience.ROLE_MID],
  },
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_3_Rush Orchid",
    messageTime: 5 * 60 + 30,
    textMessage:
      "If you have a really good start, get Orchid as soon as possible. It will allow you to pick-off most of the heroes on the map.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_4_Ball Lightning 1",
    messageTime: 6 * 60 + 45,
    textMessage:
      "You can right-click and use spells and items during Ball Lightning, including teleport.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_5_Mana management",
    messageTime: 8 * 60,
    repeatTime: 15 * 60,
    textMessage:
      "Mana management is the key. The more mana you have the more damage you can do. Be full mana if you expect fight to break out.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_6_Preserve mana",
    messageTime: 9 * 60,
    repeatTime: 15 * 60,
    textMessage:
      "Don't spend all of your mana on initial jump. Preserve some to be able to disengage.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_7_Leaving fountain",
    messageTime: 11 * 60,
    repeatTime: 15 * 60,
    textMessage:
      "When leaving the fountain, you can Ball Lightning up to t3 tower while bottling and you will still be full mana.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_8_Jump backliners",
    messageTime: 12 * 60,
    repeatTime: 15 * 60,
    textMessage:
      "Target backliners. They are squishy and Storm has no issue gap-closing.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_8_Static Remnant",
    messageTime: 13 * 60,
    repeatTime: 15 * 60,
    textMessage:
      "Static Remnant provides flying vision around itself which can be useful to scout Roshan or rune spawn and give you vision in tree lines.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_9_Ball Lightning 2",
    messageTime: 14 * 60,
    repeatTime: 20 * 60,
    textMessage: "Ball Lightning destroys trees in its path.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_10_Aegis Cheese",
    messageTime: 18 * 60,
    repeatTime: 15 * 60,
    textMessage:
      "Storm Spirit is one of the best Aegis/Cheese carriers as he utilizes the mana he gets back really well.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_11_Aghanims Scepter",
    messageTime: 24 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Level 20 Vortex talent along with Aghanim's Scepter mimics Reverse Polarity but on 16s cooldown.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Storm Spirit",
    audioFile: "ownHero/Storm Spirit_12_Stop push",
    messageTime: 33 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "In late game you can fly over and kill the creeps that opponents are looking to push with.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Storm Spirit",
    audioFile: "enemyHero/Storm Spirit_1_Magic stick wand",
    messageTime: -60,
    textMessage:
      "Storm Spirit uses Static Remnant frequently. Magic Stick and Wand will be charged up.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Storm Spirit",
    audioFile: "enemyHero/Storm Spirit_2_Control runes",
    messageTimes: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Control power runes against Storm. He likes to bottle and gank with those.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Storm Spirit",
    audioFile: "enemyHero/Storm Spirit_3_Low mana",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Look to fight when Storm Spirit is low on mana as he won't be able to use Ball Lightning much.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Storm Spirit",
    audioFile: "enemyHero/Storm Spirit_4_Orchid malevolence",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Be aware of Storm Spirit's Orchid timing. He can solo kill most heroes with it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Storm Spirit",
    audioFile: "enemyHero/Storm Spirit_5_Counter items",
    messageTime: 12 * 60,
    textMessage:
      "Spells and items that provide instant disables and silences are great against Storm Spirit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Storm Spirit",
    audioFile: "enemyHero/Storm Spirit_6_Antispell items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Magic resistance and spell immunity items are great against Storm Spirit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Storm Spirit",
    audioFile: "enemyHero/Storm Spirit_7_Highground",
    messageTimes: [20 * 60 + 10, 30 * 60 + 10, 40 * 60 + 10],
    textMessage:
      "Be quick on glyphing or piping the creepwave when pushing highground against Storm's Ball Lightning. ",
    audience: [Audience.ALL],
  },

  // 95. Sven | 08.03.2021
  {
    category: "OwnHero",
    hero: "Sven",
    audioFile: "ownHero/Sven_1_Secure ranged",
    messageTime: 15,
    textMessage:
      "Use Storm Hammer to secure ranged creep lasthit and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "sven_storm_bolt" },
  },
  {
    category: "OwnHero",
    hero: "Sven",
    audioFile: "ownHero/Sven_2_Make stacks",
    messageTimes: [3 * 60 + 30, 6 * 60 + 30],
    textMessage:
      "Alert your teammates to stack for you as you can clear those fairly early.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "sven_great_cleave" },
  },
  {
    category: "OwnHero",
    hero: "Sven",
    audioFile: "ownHero/Sven_3_Dont overlane",
    messageTime: 7 * 60 + 15,
    textMessage:
      "Don't overlane. Consider moving out of the lane as laning opponents are getting closer to level 6.",
    audience: [Audience.ROLE_CARRY, Audience.ROLE_OFFLANE],
  },
  {
    category: "OwnHero",
    hero: "Sven",
    audioFile: "ownHero/Sven_4_Ulty stacks",
    messageTime: 8 * 60,
    textMessage: "Feel free to pop ulty to farm big stacks.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "sven_gods_strength" },
  },
  {
    category: "OwnHero",
    hero: "Sven",
    audioFile: "ownHero/Sven_5_Initial jump",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "Your initial jump in the fights has to be well timed and precise. You don't want to be kited.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Sven",
    audioFile: "ownHero/Sven_6_Cleave all",
    messageTime: 11 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "In the fights, position yourself in such a way so that you can cleave onto the opponents further away.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Sven",
    audioFile: "ownHero/Sven_7_Antikiting",
    messageTimes: [11 * 60 + 45, 21 * 60 + 45],
    textMessage:
      "Itemize against kitting by purchasing Black King Bar, Blink Dagger, Shadow Blade, Aghanim's Scepter or Shard.",
    audience: [Audience.ROLE_CORE],
  },

  {
    category: "EnemyHero",
    hero: "Sven",
    audioFile: "enemyHero/Sven_1_Great cleave",
    messageTime: -60,
    textMessage:
      "Against Sven, avoid playing inside the creep wave as you will take damage from Great Cleave.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Sven",
    audioFile: "enemyHero/Sven_2_Contest farm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Sven farms quickly with Great Cleave. Smoke him, place deep wards and sentry off camps.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Sven",
    audioFile: "enemyHero/Sven_3_Gods Strength",
    messageTimes: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "God's Strength more than doubles Sven's damage. Look to disengage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Sven",
    audioFile: "enemyHero/Sven_4_Clump up",
    messageTimes: [12 * 60 + 10, 22 * 60 + 10, 32 * 60 + 10],
    textMessage:
      "Avoid clumping up in the fights for Storm Hammer and Great Cleave.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Sven",
    audioFile: "enemyHero/Sven_5_Armor items",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Armor items are great against Sven's insane physical damage output.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Sven",
    audioFile: "enemyHero/Sven_6_Aghanims scepter",
    messageTime: 15 * 60,
    textMessage:
      "Be aware of Sven's Aghanim's Scepter timing. He becomes much more dangerous.",
    audience: [Audience.ALL],
  },

  // 96. Techies | 08.03.2021
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_1_Extra consumables",
    messageTime: -90,
    textMessage:
      "Bring a lot of health consumables to the lane and use Blast Off! frequently.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_suicide" },
  },
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_2_Destroy trees",
    messageTime: -30,
    textMessage:
      "Blast Off! destroys trees which can be useful against certain heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_suicide" },
  },
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_3_Mine treelines",
    messageTime: 75,
    textMessage: "Plant Proximity Mines in treelines next to the lane.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_land_mines" },
  },
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_4_Sit on mines",
    messageTimes: [90, 5 * 60 + 30],
    textMessage:
      "You can make it harder for opponents to destroy mines by sitting on top of them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_land_mines" },
  },
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_5_Efficiency",
    messageTimes: [3 * 60, 13 * 60],
    textMessage:
      "Drop or backpack items that provide you with mana before using Arcane Boots or Soul Ring.",
    audience: [Audience.ALL],
    image: { type: "item", name: "arcane_boots" },
  },
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_6_Vision",
    messageTimes: [9 * 60, 15 * 60, 21 * 60],
    textMessage:
      "Remote and Proximity Mines provide limited vision so you can place them on pillars, runes or Roshpit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_remote_mines" },
  },
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_7_Look around",
    messageTimes: [9 * 60 + 15, 16 * 60 + 15],
    textMessage: "Look around frequently to timely detonate Remote Mines.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_remote_mines" },
  },
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_8_Mine aggressively",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Consider smoking yourself onto the opponents' side of the map to mine aggressively. Bring an observer as well.",
    audience: [Audience.ALL],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_9_Signal",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage: "Signal your teammates to play around your mines.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_10_Fight along",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "If your teammates are pressuring, move with them, mine around them and Blast Off! when opponents clump up.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_11_Roshpit",
    messageTime: 14 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "There are spots in Roshpit at the edge of the entrance where your Remote Mines are hard to see.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_remote_mines" },
  },
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_12_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard around minute 20 as provides additional control in the fights.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Techies",
    audioFile: "ownHero/Techies_13_Force into mines",
    messageTime: 20 * 60 + 15,
    textMessage:
      "Consider purchasing Force Staff to push opponents into mines when they try to remove them.",
    audience: [Audience.ALL],
    image: { type: "item", name: "force_staff" },
  },

  {
    category: "EnemyHero",
    hero: "Techies",
    audioFile: "enemyHero/Techies_1_Extra consumables",
    messageTime: -60,
    textMessage:
      "Against Techies, deliver extra consumables and an Observer Ward to keep track of him.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Techies",
    audioFile: "enemyHero/Techies_2_Quell",
    messageTime: -50,
    textMessage:
      "Quell the trees in the area so you can spot Proximity mines and see Techies doing Blast Off!",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Techies",
    audioFile: "enemyHero/Techies_3_Proximity mines",
    messageTime: -40,
    textMessage:
      "Proximity Mines explode 1.6 seconds after you hear the beep. Destroy them or move away quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Techies",
    audioFile: "enemyHero/Techies_4_Keep track",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Keep track of Techies' movements and notice which part of the map is being mined.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Techies",
    audioFile: "enemyHero/Techies_5_Bring sentries",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Bring sentries whenever you're making a move on the opponent side of the map.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Techies",
    audioFile: "enemyHero/Techies_6_Avoid trees",
    messageTimes: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Avoid being next to trees in the lane as he can hide the Remote Mines in there.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Techies",
    audioFile: "enemyHero/Techies_7_Vision",
    messageTimes: [10 * 60 + 30, 20 * 60 + 30, 30 * 60 + 30],
    textMessage:
      "Avoid walking up highground or in Roshpit without vision. You might run into mines.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Techies",
    audioFile: "enemyHero/Techies_8_Antispell items",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance items, Black King Bar and Aeon Disk are great against Techies' Remote Mines.",
    audience: [Audience.ALL],
  },
  // {category: "EnemyHero", hero: "Techie", audioFile: "enemyHero/Techie_9_Necrobook 3", messageTime: (12*60+10), textMessage: "Consider buying Necrobook level3 on someone for true sight.", audience: [Audience.ALL]}, |patch 7.29| MESSAGE REMOVED
  {
    category: "EnemyHero",
    hero: "Techies",
    audioFile: "enemyHero/Techies_10_Aegis",
    messageTimes: [15 * 60 + 10, 25 * 60 + 10, 35 * 60 + 10],
    textMessage:
      "Getting Aegis of Immortal is great against Remote mines. Take Roshan as early as possible.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Techies",
    audioFile: "enemyHero/Techies_11_Gem",
    messageTime: 20 * 60 + 10,
    textMessage:
      "Buy a Gem of True Sight around 20min when you start grouping up as team.",
    audience: [Audience.ALL],
  },

  // 97. Templar Assassin | 08.03.2021
  {
    category: "OwnHero",
    hero: "Templar Assassin",
    audioFile: "ownHero/Templar Assassin_1_Meld melee",
    messageTime: -30,
    textMessage: "Consider skilling Meld on level 1 against melee match-ups.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "templar_assassin_meld" },
  },
  {
    category: "OwnHero",
    hero: "Templar Assassin",
    audioFile: "ownHero/Templar Assassin_2_Psi Blade cleave",
    messageTime: 15,
    textMessage:
      "Keep repositioning to Psi Blade the opponent when lasthitting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "templar_assassin_psi_blades" },
  },
  {
    category: "OwnHero",
    hero: "Templar Assassin",
    audioFile: "ownHero/Templar Assassin_3_Stack small camp",
    messageTimes: [105, 3 * 60 + 45],
    textMessage:
      "Stack a small camp and farm it after clearing the next wave of lane creeps.",
    audience: [Audience.ROLE_MID],
    image: { type: "ability", name: "templar_assassin_psi_blades" },
  },
  {
    category: "OwnHero",
    hero: "Templar Assassin",
    audioFile: "ownHero/Templar Assassin_4_Stacks",
    messageTimes: [4 * 60 + 30, 7 * 60 + 30],
    textMessage:
      "Ask your teammates to stack for you, especially ancients as you can clear them early.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "templar_assassin_psi_blades" },
  },
  {
    category: "OwnHero",
    hero: "Templar Assassin",
    audioFile: "ownHero/Templar Assassin_5_Trap vision",
    messageTime: 6 * 60 + 15,
    repeatTime: 12 * 60,
    textMessage:
      "Psionic Traps provide vision, so place them on rune spots, Roshpit and other strategic spots.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "templar_assassin_psionic_trap" },
  },
  {
    category: "OwnHero",
    hero: "Templar Assassin",
    audioFile: "ownHero/Templar Assassin_6_Trap stacking",
    messageTimes: [6 * 60 + 30, 8 * 60 + 30],
    textMessage:
      "You can stack with Psionic Traps but you need to be within the aggro range of neutral creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "templar_assassin_psionic_trap" },
  },
  {
    category: "OwnHero",
    hero: "Templar Assassin",
    audioFile: "ownHero/Templar Assassin_7_Dont rotate",
    messageTimes: [6 * 60 + 45, 9 * 60 + 45],
    textMessage:
      "Don't rotate unnecessarily. Focus on hitting your item timings and pressure opponents' tower.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Templar Assassin",
    audioFile: "ownHero/Templar Assassin_8_Burst",
    messageTime: 11 * 60 + 15,
    textMessage:
      "Focus on bursting squishy backliners and supports, especially with Blink Dagger.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Templar Assassin",
    audioFile: "ownHero/Templar Assassin_9_Roshan",
    messageTime: 15 * 60 + 15,
    textMessage:
      "Templar Assassin is great at taking Roshan early on with minimal or no help. Kill Roshan by the 20 minute mark.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    hero: "Templar Assassin",
    audioFile: "enemyHero/Templar Assassin_1_Refraction",
    messageTime: -60,
    textMessage:
      "Damage over time spells and items are great at removing Templar's Refraction charges.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Templar Assassin",
    audioFile: "enemyHero/Templar Assassin_2_Psi blade",
    messageTime: -50,
    textMessage:
      "To dodge Templar's Psi Blade, play on your hero's max range and on the same side of the lane as Templar.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Templar Assassin",
    audioFile: "enemyHero/Templar Assassin_3_Psionic trap",
    messageTime: 5 * 60 + 10,
    textMessage:
      "Make sure to have sentry on the lane against Templar's Psionic Trap.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Templar Assassin",
    audioFile: "enemyHero/Templar Assassin_4_Contest ancients",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Templar Assassin tends to stack and farm ancients early on. Block the camp or contest her.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Templar Assassin",
    audioFile: "enemyHero/Templar Assassin_5_Carry detection",
    messageTimes: [10 * 60 + 20, 18 * 60 + 20, 26 * 60 + 20],
    textMessage: "Carry detection on multiple heroes against Templar.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Templar Assassin",
    audioFile: "enemyHero/Templar Assassin_6_Tower defense",
    messageTimes: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Templar Assassin takes down buildings fast with Desolator. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Templar Assassin",
    audioFile: "enemyHero/Templar Assassin_7_Counter items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Armor items, Ghost Scepter and Heaven's Halberd are great against Templar Assassin.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Templar Assassin",
    audioFile: "enemyHero/Templar Assassin_8_Desolator blink",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Be aware of Templar Assassin's Desolator and Blink Dagger timing. She can solo kill most heroes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Templar Assassin",
    audioFile: "enemyHero/Templar Assassin_9_Roshan",
    messageTimes: [15 * 60 + 10, 20 * 60 + 10, 25 * 60 + 10],
    textMessage:
      "Templar Assassin is able to take Roshan early on. Ward and check Roshan.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Templar Assassin",
    audioFile: "enemyHero/Templar Assassin_10_Rospit psionic trap",
    messageTimes: [15 * 60 + 20, 25 * 60 + 20, 35 * 60 + 20],
    textMessage: "Check the Roshpit for Psionic Trap before taking Roshan.",
    audience: [Audience.ALL],
  },

  // 98. Terrorblade | 08.03.2021
  {
    category: "OwnHero",
    hero: "Terrorblade",
    audioFile: "ownHero/Terrorblade_1_Reflection harass",
    messageTime: 10,
    textMessage:
      "Spam Reflection to harass the opponents or in combination with Metamorphosis to inflict greater damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "terrorblade_reflection" },
  },
  {
    category: "OwnHero",
    hero: "Terrorblade",
    audioFile: "ownHero/Terrorblade_2_Metamorphosis farming",
    messageTime: 20,
    textMessage:
      "Feel free to pop Metamorphosis to give yourself an easier time lasthitting for two waves.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "terrorblade_metamorphosis" },
  },
  {
    category: "OwnHero",
    hero: "Terrorblade",
    audioFile: "ownHero/Terrorblade_3_Stay healthy",
    messageTimes: [2 * 60 + 45, 8 * 60 + 45],
    textMessage:
      "Stay healthy as illusions will inherit your hero's current health.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "terrorblade_conjure_image" },
  },
  {
    category: "OwnHero",
    hero: "Terrorblade",
    audioFile: "ownHero/Terrorblade_4_Dont overlane",
    messageTime: 7 * 60 + 15,
    textMessage:
      "Don't overlane. Consider moving to the jungle when laning opponents are about to hit level 6.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Terrorblade",
    audioFile: "ownHero/Terrorblade_5_In trouble",
    messageTimes: [7 * 60 + 45, 17 * 60 + 45],
    textMessage:
      "You can also Sunder an ally or illusion when in trouble. You can body block an opponent with illusions as well.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "terrorblade_sunder" },
  },
  {
    category: "OwnHero",
    hero: "Terrorblade",
    audioFile: "ownHero/Terrorblade_6_Illusion usage",
    messageTimes: [7 * 60 + 45, 17 * 60 + 45],
    textMessage:
      "Farm dangerous areas with illusions, control runes and provide vision when opponents are missing.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "terrorblade_conjure_image" },
  },
  {
    category: "OwnHero",
    hero: "Terrorblade",
    audioFile: "ownHero/Terrorblade_7_Metamorphosis in fights",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Pop Metamorphosis only when opponents are committed to the fight. It can get kited if you pop it too early.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "terrorblade_metamorphosis" },
  },
  {
    category: "OwnHero",
    hero: "Terrorblade",
    audioFile: "ownHero/Terrorblade_8_Push sidelanes",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Push out sidelines and farm opponents' jungle with illusions when not much is happening around the map.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "terrorblade_conjure_image" },
  },

  {
    category: "EnemyHero",
    hero: "Terrorblade",
    audioFile: "enemyHero/Terrorblade_1_Pressure early",
    messageTime: -60,
    textMessage:
      "Terrorblade has high armor, but low HP and is weak against magical damage. Pressure him early on.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Terrorblade",
    audioFile: "enemyHero/Terrorblade_2_Metamorphosis",
    messageTimes: [-50, 15 * 60 + 10, 25 * 60 + 10],
    textMessage:
      "Terrorblade is strong when he has Metamorphosis on. Look to escape and fight afterwards.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Terrorblade",
    audioFile: "enemyHero/Terrorblade_3_Conjure image",
    messageTime: -40,
    textMessage:
      "Hexes, drains and Dagon are destroying Conjur Images instantly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Terrorblade",
    audioFile: "enemyHero/Terrorblade_4_Sunder",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "If you are high on HP, avoid staying close to Terrorblade when he is low as he will Sunder you.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Terrorblade",
    audioFile: "enemyHero/Terrorblade_5_Contest farm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Terrorblade farms quickly with Conjure Image. Smoke on him, place deep wards and sentry off camps.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Terrorblade",
    audioFile: "enemyHero/Terrorblade_6_Antiillusion items",
    messageTime: 12 * 60,
    textMessage:
      "Items that provide AoE damage, especially magical damage, are great at dealing with Conjure Image.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Terrorblade",
    audioFile: "enemyHero/Terrorblade_7_Crimson guard",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard and armor items are great against Terrorblade's physical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Terrorblade",
    audioFile: "enemyHero/Terrorblade_8_Antisunder items",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Black King Bar, Linken's sphere or a well timed Lotus Orb prevent you from being Sundered.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Terrorblade",
    audioFile: "enemyHero/Terrorblade_9_Boots of travel",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Terrorblade is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 99. Tidehunter | 08.03.2021
  {
    category: "OwnHero",
    hero: "Tidehunter",
    audioFile: "ownHero/Tidehunter_1_Secure lasthits",
    messageTime: 15,
    textMessage:
      "Use Anchor Smash to secure lasthits and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tidehunter_anchor_smash" },
  },
  {
    category: "OwnHero",
    hero: "Tidehunter",
    audioFile: "ownHero/Tidehunter_2_Tough lane",
    messageTime: 75,
    textMessage:
      "The tougher the lane, the more points in Kraken Shell are needed.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "tidehunter_kraken_shell" },
  },
  {
    category: "OwnHero",
    hero: "Tidehunter",
    audioFile: "ownHero/Tidehunter_3_Antimagic item",
    messageTimes: [4 * 60, 8 * 60],
    textMessage:
      "Tidehunter is resilient against right-clicks due to Kraken Shell. Typically you need a magical resistance item.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "hood_of_defiance" },
  },
  {
    category: "OwnHero",
    hero: "Tidehunter",
    audioFile: "ownHero/Tidehunter_4_Blink",
    messageTime: 11 * 60 + 15,
    textMessage:
      "Once you have Blink Dagger, make use of it before opponents are able to see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Tidehunter",
    audioFile: "ownHero/Tidehunter_5_Initiation check",
    messageTime: 11 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Before initiating, make sure that your follow-up damage dealers are close enough and in position.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },

  {
    category: "EnemyHero",
    hero: "Tidehunter",
    audioFile: "enemyHero/Tidehunter_1_Magic stick wand",
    messageTime: -60,
    textMessage:
      "Tidehunter uses Anchor Smash frequently. Magic Stick and Wand will be charged up.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Tidehunter",
    audioFile: "enemyHero/Tidehunter_2_Anchor smash",
    messageTime: -50,
    textMessage:
      "Avoid being hit by Anchor Smash as you'll have decreased damage for last hitting or to fight back.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Tidehunter",
    audioFile: "enemyHero/Tidehunter_3_Kraken shell",
    messageTime: 30,
    textMessage:
      "Only use dispellable spells or items on Tidehunter at the start of a fight or after Kraken Shell has procced.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tidehunter",
    audioFile: "enemyHero/Tidehunter_4_Ravage",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Tidehunter's Ravage has a long cooldown. Look to fight when it is down.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tidehunter",
    audioFile: "enemyHero/Tidehunter_5_Blink dagger",
    messageTime: 12 * 60,
    textMessage:
      "Be aware of Tidehunter's Blink Dagger timing. Look to cancel it in the fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tidehunter",
    audioFile: "enemyHero/Tidehunter_6_Black king bar",
    messageTime: 12 * 60 + 10,
    textMessage: "Black King Bar will make you immune to Tidehunter's Ravage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tidehunter",
    audioFile: "enemyHero/Tidehunter_7_Break",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Break effects are great at removing Kraken Shell which makes Tidehunter much weaker.",
    audience: [Audience.ALL],
  },

  // 100. Timbersaw | Earlier work
  {
    category: "OwnHero",
    hero: "Timbersaw",
    audioFile: "ownHero/Timbersaw_1_Secure lasthits",
    messageTime: 10,
    textMessage:
      "Use Whirling Death to secure lasthits, harass opponents and at the same time cut some trees with it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shredder_whirling_death" },
  },
  {
    category: "OwnHero",
    hero: "Timbersaw",
    audioFile: "ownHero/Timbersaw_2_Tough lane",
    messageTime: 20,
    textMessage:
      "Consider putting a point in the Timber Chain early on tough lanes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shredder_timber_chain" },
  },
  {
    category: "OwnHero",
    hero: "Timbersaw",
    audioFile: "ownHero/Timbersaw_3_Armor stacks",
    messageTimes: [40, 7 * 60 + 10, 13 * 60 + 10],
    textMessage:
      "Keep Reactive Armor stacks high to be able to play aggressively and not fear for your life.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shredder_reactive_armor" },
  },
  {
    category: "OwnHero",
    hero: "Timbersaw",
    audioFile: "ownHero/Timbersaw_4_Check sticks",
    messageTime: 3 * 60 + 45,
    textMessage:
      "Check how many stick charges opponents have when you are going for a kill.",
    audience: [Audience.ALL],
    image: { type: "item", name: "magic_stick" },
  },
  {
    category: "OwnHero",
    hero: "Timbersaw",
    audioFile: "ownHero/Timbersaw_5_Tank tower",
    messageTimes: [5 * 60 + 10, 10 * 60 + 10],
    textMessage: "Consider tanking tower shots to keep the catapult alive.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shredder_reactive_armor" },
  },
  {
    category: "OwnHero",
    hero: "Timbersaw",
    audioFile: "ownHero/Timbersaw_6_Avoid rotating",
    messageTimes: [6 * 60 + 10, 12 * 60 + 10],
    textMessage:
      "Timbersaw isn't the best at rotating. You'd rather force opponents to come to you by playing aggressively.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shredder_reactive_armor" },
  },
  {
    category: "OwnHero",
    hero: "Timbersaw",
    audioFile: "ownHero/Timbersaw_7_Defend towers",
    messageTimes: [9 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "Consider parking yourself in front of the tower opponents are looking to destroy. Build up armor stacks though.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "shredder_reactive_armor" },
  },
  {
    category: "OwnHero",
    hero: "Timbersaw",
    audioFile: "ownHero/Timbersaw_8_Counter items",
    messageTimes: [9 * 60 + 45, 14 * 60 + 45, 19 * 60 + 45],
    textMessage:
      "Items that reduce healing and break effects are a big problem. Itemize against them and adjust playstyle.",
    audience: [Audience.ALL],
    image: { type: "item", name: "spirit_vessel" },
  },
  {
    category: "OwnHero",
    hero: "Timbersaw",
    audioFile: "ownHero/Timbersaw_9_Counter items",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines even out of vision if necessary.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shredder_chakram" },
  },
  {
    category: "OwnHero",
    hero: "Timbersaw",
    audioFile: "ownHero/Timbersaw_10_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard around the 20 minute mark. It improves dps and provides much needed building damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Timbersaw",
    audioFile: "ownHero/Timbersaw_11_No to lategame",
    messageTimes: [22 * 60, 27 * 60],
    textMessage:
      "You don't necessarily want to go to late game, so try to close the game down before you fall off.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Timbersaw",
    audioFile: "enemyHero/Timbersaw_1_Spirit vessel",
    messageTime: -60,
    textMessage:
      "One player should buy Spirit Vessel against Timbersaw's reactive armor",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Timbersaw",
    audioFile: "enemyHero/Timbersaw_2_Reactive armor",
    messageTime: 30,
    textMessage:
      "Play agressively against Timbersaw before he reaches level 3, or only when his reactive armor stacks are low, otherwise avoid fighting him",
    chatMessage:
      "Play agressively against Timbersaw before he reaches level 3 or only when his reactive armor stacks are low",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Timbersaw",
    audioFile: "enemyHero/Timbersaw_3_Trees",
    messageTime: 1 * 60 + 30,
    textMessage: "Stay away from trees against Timbersaw",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Timbersaw",
    audioFile: "enemyHero/Timbersaw_4_Avoid lane",
    messageTime: 8 * 60,
    textMessage:
      "Timbersaw is strongest between 8 and 20 minutes, so avoid contesting him on the lane and try to pressure other lanes and heroes instead",
    chatMessage:
      "Timbersaw is strongest between 8 and 20 minutes, pressure other lanes and heroes",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Timbersaw",
    audioFile: "enemyHero/Timbersaw_5_Silver edge",
    messageTime: 10 * 60,
    textMessage:
      "Buy Silver Edge against Timbersaw's reactive armor, if you need an additional item to deal with him",
    audience: [Audience.ALL],
  },

  // 101. Tinker | 08.03.2021   ***CHANGED 7.30***
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_1_Secure ranged",
    messageTime: 15,
    textMessage:
      "Secure ranged creep lasthits with Laser and potentially harass the opponent at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_laser" },
  },
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_2_Rocket harass",
    messageTime: 30,
    textMessage:
      "If the opponents don't have great health regeneration, you can whittle them down with rocket spam.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_heat_seeking_missile" },
  },
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_3_Stacks",
    messageTimes: [3 * 60 + 30, 6 * 60 + 30],
    textMessage:
      "Ask your teammates to stack and make some yourself. You can clear ancients with maxed Laser under smoke.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_laser" },
  },
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_4_Look around",
    messageTimes: [6 * 60 + 30, 12 * 60 + 30, 18 * 60 + 30],
    textMessage:
      "Look around the map to join fights or gank. Be careful not to expose yourself, especially before Blink Dagger.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_keen_teleport" },
  },
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_5_Farm blink",
    messageTime: 7 * 60 + 45,
    textMessage:
      "Take your time and farm Blink Dagger as it greatly improves your survivability and kill potential.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_6_Defense Matrix",
    messageTimes: [9 * 60 + 45, 19 * 60 + 45, 29 * 60 + 45],
    textMessage:
      "Make sure to apply Defense Matrix on yourself before teleporting out of the base.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_defense_matrix" },
  },
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_7_Cant join",
    messageTimes: [10 * 60 + 15, 17 * 60 + 15],
    textMessage:
      "Alert your teammates not to fight on the spots where you can't join them quickly.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_keen_teleport" },
  },
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_8_Runes",
    messageTimes: [11 * 60 + 45, 17 * 60 + 45, 23 * 60 + 45],
    textMessage:
      "Look for arcane and regeneration runes as you'll be able to pump in so much more damage in the fights.",
    audience: [Audience.ALL],
    image: { type: "rune", name: "arcane" },
  },
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_9_Vision",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Fight under your vision to be able to do more damage with rockets and position easier, even place wards yourself.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_10_Avoid Tinker wards",
    messageTime: 14 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid blinking to Tinker Ward spots at the edges of the map too often.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_11_Smoke yourself",
    messageTime: 15 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "You can smoke yourself here and there as another layer of protection in the fights.",
    audience: [Audience.ALL],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_12_Keep buyback",
    messageTime: 15 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "Keep buyback available as you can rejoin the fights almost instantly.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_keen_teleport" },
  },
  {
    category: "OwnHero",
    hero: "Tinker",
    audioFile: "ownHero/Tinker_13_Highground",
    messageTime: 25 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "Tinker is an insane highground defender. Don't give up and lift up your team's morale.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_heat_seeking_missile" },
  },

  {
    category: "EnemyHero",
    hero: "Tinker",
    audioFile: "enemyHero/Tinker_1_Tranquil boots",
    messageTime: -60,
    textMessage:
      "Tranquil Boots are great against Tinker as they don't break by his magical damage.",
    audience: [Audience.ALL],
  },
  // Added "midlane" in next textMessage as Tinker can be played as a support as well
  {
    category: "EnemyHero",
    hero: "Tinker",
    audioFile: "enemyHero/Tinker_2_Gank early",
    messageTime: 3 * 60 + 30,
    textMessage:
      "Look to gank midlane Tinker early on as he doesn't have an escape.",
    audience: [Audience.ALL],
  },
  /* {category: "EnemyHero", hero: "Tinker", audioFile: "enemyHero/Tinker_3_Contest farm", messageTime: (5*60+30), textMessage: "Tinker tends to make a lot of stacks in the jungle. Contest them or sentry off camps.", audience: [Audience.ALL]}, */

  {
    category: "EnemyHero",
    hero: "Tinker",
    audioFile: "enemyHero/Tinker_12_Defense matrix",
    messageTime: 4 * 60 + 30,
    textMessage:
      "Avoid using long lasting disables and debuffs on a hero shielded with Defense Matrix due to its high status resistance.",
    chatMessage:
      "Avoid using long lasting disables and debuffs on hero shielded by Defense Matrix.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Tinker",
    audioFile: "enemyHero/Tinker_4_Focus",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Tinker in fights as he's squishy but does insane amounts of damage.",
    audience: [Audience.ALL],
  },
  // Removed Boots of Travel from textMessage as Tinker doesn't need them anymore
  {
    category: "EnemyHero",
    hero: "Tinker",
    audioFile: "enemyHero/Tinker_5_Item timings",
    messageTime: 12 * 60,
    textMessage: "Be aware of Tinker's Blink Dagger timing.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tinker",
    audioFile: "enemyHero/Tinker_6_Avoid trees",
    messageTime: 12 * 60 + 10,
    textMessage:
      "You can dodge Tinker's Heat-Seeking Missile by using Smoke of Deceit or blinking away.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tinker",
    audioFile: "enemyHero/Tinker_7_Antispell items",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Magic resistance items, Black King Bar or a well timed Lotus Orb are great against Tinker.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tinker",
    audioFile: "enemyHero/Tinker_8_Gap closing items",
    messageTime: 12 * 60 + 30,
    textMessage: "Gap closing items are great at getting on top of Tinker.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tinker",
    audioFile: "enemyHero/Tinker_9_Boots of travel",
    messageTime: 12 * 60 + 40,
    textMessage:
      "Tinker is great at split-pushing. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tinker",
    audioFile: "enemyHero/Tinker_10_Tinker wards",
    messageTimes: [15 * 60 + 10, 25 * 60, 35 * 60],
    textMessage:
      "Place Tinker wards at the edges of the map. Consider camping those spots under the ward.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tinker",
    audioFile: "enemyHero/Tinker_11_Fight outside base",
    messageTimes: [25 * 60 + 10, 35 * 60 + 10, 45 * 60 + 10],
    textMessage:
      "It is really hard to push highground against Tinker. Be patient and take fights outside the base.",
    audience: [Audience.ALL],
  },

  // 102. Tiny | 08.03.2021
  {
    category: "OwnHero",
    hero: "Tiny",
    audioFile: "ownHero/Tiny_1_Toss back",
    messageTime: 15,
    textMessage:
      "Keep creep equilibrium close to your tower so you can do toss-back plays.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "tiny_toss" },
  },
  {
    category: "OwnHero",
    hero: "Tiny",
    audioFile: "ownHero/Tiny_2_Courier toss",
    messageTimes: [30, 15 * 60 + 30],
    textMessage: "Tree toss can kill couriers.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tiny_tree_grab" },
  },
  {
    category: "OwnHero",
    hero: "Tiny",
    audioFile: "ownHero/Tiny_3_Secure lasthits",
    messageTime: 45,
    textMessage:
      "Use Avalanche or Tree Toss to secure lasthits and harass opponents here and there.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tiny_avalanche" },
  },
  {
    category: "OwnHero",
    hero: "Tiny",
    audioFile: "ownHero/Tiny_4_Save ally",
    messageTimes: [90, 11 * 60 + 30, 22 * 60 + 30],
    textMessage:
      "You can save an ally with Toss, especially once you have a Blink Dagger.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tiny_toss" },
  },
  {
    category: "OwnHero",
    hero: "Tiny",
    audioFile: "ownHero/Tiny_5_Stacks",
    messageTimes: [4 * 60 + 30, 8 * 60 + 30],
    textMessage:
      "Alert your teammates to stack for you as you can clear those fairly early.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "tiny_tree_grab" },
  },
  {
    category: "OwnHero",
    hero: "Tiny",
    audioFile: "ownHero/Tiny_6_Blink",
    messageTime: 11 * 60 + 30,
    textMessage:
      "Once you have Blink Dagger, make use of it before opponents are able to see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Tiny",
    audioFile: "ownHero/Tiny_7_Combo chill",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "In teamfights, you want to do blink into spells combo and then chill until cooldowns are ready.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Tiny",
    audioFile: "ownHero/Tiny_8_Combo chill",
    messageTime: 12 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Be quick at going for buildings when you get a pick off or win a fight. Tiny destroys buildings really fast.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "tiny_tree_grab" },
  },
  {
    category: "OwnHero",
    hero: "Tiny",
    audioFile: "ownHero/Tiny_9_Push sidelanes",
    messageTime: 12 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines with your spells.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tiny_avalanche" },
  },

  {
    category: "EnemyHero",
    hero: "Tiny",
    audioFile: "enemyHero/Tiny_1_No armor",
    messageTime: -60,
    textMessage:
      "Tiny starts with 0 armor. Harass him with physical damage as much as you can.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Tiny",
    audioFile: "enemyHero/Tiny_2_Toss",
    messageTime: -50,
    textMessage:
      "Toss is Tiny's main setup spell. Keep distance or play in creep wave to prevent easy Tosses.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Tiny",
    audioFile: "enemyHero/Tiny_3_Toss under tower",
    messageTime: -40,
    textMessage:
      "Avoid playing close to the opponent's tower as you can get Tossed underneath it by Tiny.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Tiny",
    audioFile: "enemyHero/Tiny_4_Combo",
    messageTime: 3 * 60 + 30,
    textMessage:
      "Avalanche into Toss combo does a lot of magical damage. Get Infused Raindrops or a Cloak.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tiny",
    audioFile: "enemyHero/Tiny_5_Blink dagger",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Be aware of Tiny's Blink Dagger timing. Cancel it in the fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tiny",
    audioFile: "enemyHero/Tiny_6_Magic resistance",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance items are great against Tiny's magical burst.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tiny",
    audioFile: "enemyHero/Tiny_7_Tower defense",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Tiny takes down buildings fast with Tree Grab and Toss. Organize defense quickly.",
    audience: [Audience.ALL],
  },

  // 103. Treant Protector | 08.03.2021
  {
    category: "OwnHero",
    hero: "Treant Protector",
    audioFile: "ownHero/Treant Protector_1_Base damage",
    messageTime: 10,
    textMessage:
      `Treant has the highest base damage in the game at level 1 so make use of it to harass and deny.`,
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Treant Protector",
    audioFile: "ownHero/Treant Protector_2_Cut off",
    messageTime: 20,
    textMessage:
      "Look for angles to cut off opponents with Nature's Grasp. Make sure to catch a tree in its path.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_natures_grasp" },
  },
  {
    category: "OwnHero",
    hero: "Treant Protector",
    audioFile: "ownHero/Treant Protector_3_Heal still",
    messageTime: 60,
    textMessage:
      "Leech Seed continues healing even after the unit it was used on dies.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_leech_seed" },
  },
  {
    category: "OwnHero",
    hero: "Treant Protector",
    audioFile: "ownHero/Treant Protector_4_Look around",
    messageTime: 2 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Look around the map to heal and save allies and buildings with Living Armor.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_living_armor" },
  },
  {
    category: "OwnHero",
    hero: "Treant Protector",
    audioFile: "ownHero/Treant Protector_5_Defend towers",
    messageTimes: [5 * 60 + 45, 15 * 60 + 45],
    textMessage:
      "Treant is great at defending towers safely with Nature's Grasp and Living Armor.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_living_armor" },
  },
  {
    category: "OwnHero",
    hero: "Treant Protector",
    audioFile: "ownHero/Treant Protector_6_Delay Overgrowth",
    messageTime: 12 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "Don't rush with Overgrowth in the fights as opponents are likely to have multiple ways to dispel it at the start.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_overgrowth" },
  },
  {
    category: "OwnHero",
    hero: "Treant Protector",
    audioFile: "ownHero/Treant Protector_7_Splitpush",
    messageTime: 13 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Treant is amazing at splitpushing without even showing himself. Go ham on it when not much is happening.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_natures_grasp" },
  },
  {
    category: "OwnHero",
    hero: "Treant Protector",
    audioFile: "ownHero/Treant Protector_8_Aghanims Shard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanim's Shard around minute 15 as it adds even more utility and disables the hero.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Treant Protector",
    audioFile: "ownHero/Treant Protector_9_Aghanims Scepter",
    messageTimes: [25 * 60, 32 * 60],
    textMessage:
      "Aghanim's Scepter will win a vision game for your team in the late game.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Treant Protector",
    audioFile: "enemyHero/Treant Protector_1_Quell trees",
    messageTime: -60,
    textMessage:
      "Quell trees in the lane so you can keep track of Treant Protector and stop Nature's Guise.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Treant Protector",
    audioFile: "enemyHero/Treant Protector_2_Keep distance",
    messageTime: -50,
    textMessage:
      "Keep distance from Treant Protector as he has the highest base damage in the game.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Treant Protector",
    audioFile: "enemyHero/Treant Protector_3_Take towers",
    messageTimes: [5 * 60 + 30, 15 * 60 + 30, 25 * 60 + 30],
    textMessage:
      "Take towers down in one go so Treant Protector can't heal them with Living Armor.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Treant Protector",
    audioFile: "enemyHero/Treant Protector_4_Meteor Hammer",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Be aware of Treant Protector's Meteor Hammer timing. He becomes good at splitpushing.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Treant Protector",
    audioFile: "enemyHero/Treant Protector_5_Invisible",
    messageTimes: [12 * 60, 20 * 60, 30 * 60],
    textMessage:
      "Treant Protector becomes invisible with his level10 talent. Carry detection on multiple heroes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Treant Protector",
    audioFile: "enemyHero/Treant Protector_6_Observer sentry",
    messageTimes: [12 * 60 + 10, 20 * 60 + 20, 28 * 60 + 10],
    textMessage:
      "Observers and sentries at the edges of the map are great at stopping Treant from splitpushing.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Treant Protector",
    audioFile: "enemyHero/Treant Protector_7_Dispel items",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Items that apply dispel on you, are great against Treant's Overgrowth and Leech Seed.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Treant Protector",
    audioFile: "enemyHero/Treant Protector_8_Aghanims scepter",
    messageTime: 20 * 60 + 10,
    textMessage:
      "Once Treant gets Aghanim's Scepter consider getting a Gem and cut Eyes in the Forest.",
    audience: [Audience.ALL],
  },

  // 104. Troll Warlord | 09.03.2021
  {
    category: "OwnHero",
    hero: "Troll Warlord",
    audioFile: "ownHero/Troll Warlord_1_Secured ranged",
    messageTime: 15,
    textMessage:
      "Use Whirling Axes to secure ranged creep lasthits and harass the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "troll_warlord_whirling_axes_ranged" },
  },
  {
    category: "OwnHero",
    hero: "Troll Warlord",
    audioFile: "ownHero/Troll Warlord_2_Dont switch",
    messageTime: 4 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid switching targets in engagements as you'll lose Fervor stacks.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "troll_warlord_fervor" },
  },
  {
    category: "OwnHero",
    hero: "Troll Warlord",
    audioFile: "ownHero/Troll Warlord_3_Not early",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid popping Battle Trance too early in fights as you might get kited. Use it later, on disabled unit or defensively.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "troll_warlord_battle_trance" },
  },
  {
    category: "OwnHero",
    hero: "Troll Warlord",
    audioFile: "ownHero/Troll Warlord_4_Roshan",
    messageTimes: [14 * 60 + 45, 18 * 60 + 45],
    textMessage:
      "Troll can take Roshan early on even by himself. Use Battle Trance if necessary to heal up.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    hero: "Troll Warlord",
    audioFile: "ownHero/Troll Warlord_5_Antikiting",
    messageTimes: [15 * 60, 22 * 60],
    textMessage:
      "Consider purchasing anti-kiting items so you can stick to the target and not waste Battle Trance.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },

  {
    category: "EnemyHero",
    hero: "Troll Warlord",
    audioFile: "enemyHero/Troll Warlord_1_Extra consumables",
    messageTime: -60,
    textMessage: "Troll Warlord is a strong laner. Buy extra healing items.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Troll Warlord",
    audioFile: "enemyHero/Troll Warlord_2_Battle trance kite",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Avoid Troll when Battle Trance is on. Don't allow him to heal by hitting you.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Troll Warlord",
    audioFile: "enemyHero/Troll Warlord_3_Battle trance dispel",
    messageTime: 9 * 60 + 10,
    textMessage:
      "Battle Trance applies basic dispel on Troll. Use dispellable spells and items afterwards.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Troll Warlord",
    audioFile: "enemyHero/Troll Warlord_4_Tower defense",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Troll Warlord takes down buildings fast with Fervor. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Troll Warlord",
    audioFile: "enemyHero/Troll Warlord_5_Antievasion items",
    messageTime: 13 * 60,
    textMessage:
      "Items that pierce evasion are good against Troll's Whirling Axes (relevant for Melee heroes).",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Troll Warlord",
    audioFile: "enemyHero/Troll Warlord_6_Roshan",
    messageTimes: [15 * 60 + 10, 25 * 60, 35 * 60],
    textMessage:
      "Troll Warlord is able to take Roshan early on. Ward and check Roshan.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Troll Warlord",
    audioFile: "enemyHero/Troll Warlord_7_Aghanims scepter",
    messageTime: 23 * 60,
    textMessage:
      "Aghanim's Scepter makes Troll's Whirling Axes apply basic dispel on him and opponents.",
    audience: [Audience.ALL],
  },

  // 105. Tusk | 09.03.2021
  {
    category: "OwnHero",
    hero: "Tusk",
    audioFile: "ownHero/Tusk_1_Shard setup",
    messageTime: 30,
    textMessage:
      "Most of your laning kills will come from well placed Ice Shards. Constantly look for opponents out of position.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tusk_ice_shards" },
  },
  {
    category: "OwnHero",
    hero: "Tusk",
    audioFile: "ownHero/Tusk_2_In trouble",
    messageTimes: [90, 11 * 60 + 30],
    textMessage:
      "When you or your allies are in trouble, you can do a Snowball save or Ice Shard the opponents away.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tusk_snowball" },
  },
  {
    category: "OwnHero",
    hero: "Tusk",
    audioFile: "ownHero/Tusk_3_In trouble",
    messageTimes: [4 * 60, 14 * 60],
    textMessage:
      "Ice Shards provide vision so you can use them to scout pillars for wards or Roshpit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tusk_ice_shards" },
  },
  {
    category: "OwnHero",
    hero: "Tusk",
    audioFile: "ownHero/Tusk_4_Max punch",
    messageTimes: [4 * 60, 14 * 60],
    textMessage:
      "Pop Tag Team before using Walrus Punch to maximize on damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tusk_tag_team" },
  },
  {
    category: "OwnHero",
    hero: "Tusk",
    audioFile: "ownHero/Tusk_5_Blink Snowball",
    messageTimes: [4 * 60, 14 * 60],
    textMessage:
      "Once you get a blink Dagger, you want to use Snowball primarily to save an ally.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Tusk",
    audioFile: "ownHero/Tusk_6_Blink Snowball",
    messageTimes: [14 * 60 + 30, 19 * 60 + 30],
    textMessage:
      "Tuskar enables the team to take an early Roshan due to the Tag Team.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tusk_tag_team" },
  },
  {
    category: "OwnHero",
    hero: "Tusk",
    audioFile: "ownHero/Tusk_7_Aghanims Scepter",
    messageTimes: [24 * 60 + 30, 29 * 60 + 30],
    textMessage:
      "Pick up Aghanim's Scepter in the late game as it is an amazing repositioning and kiting tool.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Tusk",
    audioFile: "enemyHero/Tusk_1_Movement speed items",
    messageTime: -60,
    textMessage: "Movement speed items are great against Tusk's spells.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Tusk",
    audioFile: "enemyHero/Tusk_2_Observer ward",
    messageTime: -50,
    textMessage:
      "Bring an Observer Ward to lane to keep an eye on Tusk's aggressive movements.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Tusk",
    audioFile: "enemyHero/Tusk_3_Tag team",
    messageTime: -40,
    textMessage:
      "Keep distance from Tusk because Tag Team does extra damage on every hit.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Tusk",
    audioFile: "enemyHero/Tusk_4_Roam",
    messageTimes: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Tusk roams a lot. Keep an eye on his movements and be ready to help.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tusk",
    audioFile: "enemyHero/Tusk_5_Blink dagger",
    messageTime: 12 * 60,
    textMessage:
      "Be aware of Tusk's Blink Dagger timing as he can easily save his allies with Snowball.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Tusk",
    audioFile: "enemyHero/Tusk_6_Fore staff",
    messageTime: 12 * 60 + 10,
    textMessage: "Force Staff and Hurricane Pike are great against Tusk.",
    audience: [Audience.ALL],
  },

  // 106. Underlord | 09.03.2021
  {
    category: "OwnHero",
    hero: "Underlord",
    audioFile: "ownHero/Underlord_1_Outlasthit",
    messageTime: 15,
    textMessage:
      "Capitalize on attack damage difference to win the lane lasthit wise.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_atrophy_aura" },
  },
  {
    category: "OwnHero",
    hero: "Underlord",
    audioFile: "ownHero/Underlord_2_Accelerate farm",
    messageTime: 5 * 60,
    textMessage:
      "Once you have 3 points in Firestorm, consider Firestorming creepwaves and farming neutrals afterwards.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "abyssal_underlord_firestorm" },
  },
  {
    category: "OwnHero",
    hero: "Underlord",
    audioFile: "ownHero/Underlord_3_Replenish rift",
    messageTime: 7 * 60,
    textMessage:
      "Feel free to use Dark Rift to replenish mana and hp during laning stage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_dark_rift" },
  },
  {
    category: "OwnHero",
    hero: "Underlord",
    audioFile: "ownHero/Underlord_4_Defend towers",
    messageTimes: [8 * 60, 14 * 60],
    textMessage:
      "Underlord is amazing at safely defending the towers. Your other cores can splitpush in the meantime.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_firestorm" },
  },
  {
    category: "OwnHero",
    hero: "Underlord",
    audioFile: "ownHero/Underlord_5_Combo",
    messageTimes: [10 * 60, 16 * 60],
    textMessage:
      "Full combo would be: Firestorm, Pit of Malice, Rod of Atos into right-clicks. Adjust based on situation.",
    audience: [Audience.ALL],
    image: { type: "item", name: "rod_of_atos" },
  },
  {
    category: "OwnHero",
    hero: "Underlord",
    audioFile: "ownHero/Underlord_6_Firestorm carefully",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Place Firestorm carefully in the fights and you might end up being highest damage dealer in the team.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_firestorm" },
  },
  {
    category: "OwnHero",
    hero: "Underlord",
    audioFile: "ownHero/Underlord_7_Rift immediately",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Begin channeling Dark Rift on a first sign of trouble and cancel it if the situation improves.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_dark_rift" },
  },
  {
    category: "OwnHero",
    hero: "Underlord",
    audioFile: "ownHero/Underlord_8_Objective damage",
    messageTimes: [11 * 60, 18 * 60],
    textMessage:
      "If you win the teamfight and survive, you will have a lot of damage to take towers or Roshan down.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "abyssal_underlord_atrophy_aura" },
  },
  {
    category: "OwnHero",
    hero: "Underlord",
    audioFile: "ownHero/Underlord_9_Objective rift",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Consider using Dark Rift to bring your team closer to objectives after pick-off or won fight.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_dark_rift" },
  },
  {
    category: "OwnHero",
    hero: "Underlord",
    audioFile: "ownHero/Underlord_10_Splitpush",
    messageTime: 11 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, you can easily splitpush with Firestorm without showing yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_firestorm" },
  },
  /*  { // DUPLICATE
    category: 'OwnHero',
    hero: 'Underlord',
    audioFile: 'ownHero/Underlord_10_Splitpush',
    messageTime: 11 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      'When not much is happening, you can easily splitpush with Firestorm without showing yourself.',
    audience: [Audience.ALL],
    image: { type: 'ability', name: 'abyssal_underlord_firestorm' },
  },*/
  {
    category: "OwnHero",
    hero: "Underlord",
    audioFile: "ownHero/Underlord_11_Splitpush",
    messageTime: 19 * 60,
    textMessage:
      "Purchase Aghanim's Shard upgrade at minute 20 as it improves your overall damage output greatly.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Underlord",
    audioFile: "ownHero/Underlord_12_Firestorm scaling",
    messageTime: 25 * 60,
    textMessage:
      "Firestorm scales well into late game due to percentage damage, shard upgrade and talents to enhance it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_firestorm" },
  },

  {
    category: "EnemyHero",
    hero: "Underlord",
    audioFile: "enemyHero/Underlord_1_Pressure early",
    messageTime: -60,
    textMessage: "Pressure Underlord early on as he is slow and has no escape.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Underlord",
    audioFile: "enemyHero/Underlord_2_Extra consumables",
    messageTime: 30,
    textMessage:
      "Bring extra consumables to the lane against Underlord's Firestorm spam.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Underlord",
    audioFile: "enemyHero/Underlord_3_Deny ranged creeps",
    messageTime: 40,
    textMessage: "Denying range creeps is easy against Firestorm.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Underlord",
    audioFile: "enemyHero/Underlord_4_Tower siege",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Underlord is really good at defending buildings. Respect that fact.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Underlord",
    audioFile: "enemyHero/Underlord_5_Clump up",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Avoid clumping up and fighting in choke spots against Firestorm and Pit of Malice combo.",
    audience: [Audience.ALL],
  },

  // 107. Undying | 09.03.2021
  {
    category: "OwnHero",
    hero: "Undying",
    audioFile: "ownHero/Undying_1_Double Decay",
    messageTime: 15,
    textMessage:
      "Catch both opponents on the lane with Decay and use the extra damage to harass or secure lasthits.",
    audience: [Audience.ROLE_SUPPORT, Audience.ROLE_OFFLANE],
    image: { type: "ability", name: "undying_decay" },
  },
  {
    category: "OwnHero",
    hero: "Undying",
    audioFile: "ownHero/Undying_2_Check sticks",
    messageTimes: [60, 5 * 60],
    textMessage:
      "Check for the number of stick charges opponents have before diving or committing for a kill.",
    audience: [Audience.ALL],
    image: { type: "item", name: "magic_stick" },
  },
  {
    category: "OwnHero",
    hero: "Undying",
    audioFile: "ownHero/Undying_3_Tombstone placement",
    messageTimes: [90, 9 * 60 + 30, 17 * 60 + 30],
    textMessage:
      "Don't make it too easy for opponents to destroy Tombstone. Place it on pillars, cliffs and protect it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "undying_tombstone" },
  },
  {
    category: "OwnHero",
    hero: "Undying",
    audioFile: "ownHero/Undying_4_Tomb trees",
    messageTimes: [105, 9 * 60 + 45, 17 * 60 + 45],
    textMessage: "Tombstone destroys trees and provides great vision.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "undying_tombstone" },
  },
  {
    category: "OwnHero",
    hero: "Undying",
    audioFile: "ownHero/Undying_5_Reset",
    messageTimes: [2 * 60 + 15, 5 * 60 + 15],
    textMessage:
      "When you drop low on resources consider suiciding into neutral camp or opponents towers to reset quickly.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Undying",
    audioFile: "ownHero/Undying_6_Hit once",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Hit an opponent your cores are targeting at least once for damage amplification while in Flesh Golem form.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "undying_flesh_golem" },
  },
  {
    category: "OwnHero",
    hero: "Undying",
    audioFile: "ownHero/Undying_7_Early Rosh",
    messageTimes: [14 * 60 + 45, 19 * 60 + 15],
    textMessage:
      "Undying allows the team to kill Roshan early due to zombie tanking and damage amplification from Flesh Golem.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    hero: "Undying",
    audioFile: "enemyHero/Undying_1_Magic stick wand",
    messageTime: -60,
    textMessage:
      "Undying uses Decay frequently. Magic Stick and Wand will be charged up.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Undying",
    audioFile: "enemyHero/Undying_2_Keep distance",
    messageTime: -40,
    textMessage:
      "Keep distance from Undying as he is likely to have high damage due to Decay stacks.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Undying",
    audioFile: "enemyHero/Undying_3_Soul Rip",
    messageTime: 30,
    textMessage:
      "Keep an eye on your total HP against Decay spam. Soul Rip can finish you off.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Undying",
    audioFile: "enemyHero/Undying_4_Tombstone",
    messageTimes: [5 * 60 + 20, 15 * 60 + 20, 25 * 60 + 20],
    textMessage:
      "Focus Tombstone in fights or you risk being slowed greatly and take a lot of damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Undying",
    audioFile: "enemyHero/Undying_5_Kill zombies",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Consider killing off zombies chasing you or team mates in trouble.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Undying",
    audioFile: "enemyHero/Undying_6_Flesh golem",
    messageTime: 8 * 60,
    textMessage:
      "Avoid being hit by Undying in Flesh Golem form as you will take extra damage and be slowed.",
    audience: [Audience.ALL],
  },

  // 108. Ursa | 09.03.2021
  {
    category: "OwnHero",
    hero: "Ursa",
    audioFile: "ownHero/Ursa_1_Lasthit setup",
    messageTime: 15,
    textMessage:
      "Ursa has low base damage so you might want to hit creep once or twice to apply Fury Swipes before lasthitting.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "ursa_fury_swipes" },
  },
  {
    category: "OwnHero",
    hero: "Ursa",
    audioFile: "ownHero/Ursa_2_Earthshock jump",
    messageTimes: [75, 11 * 60 + 15, 21 * 60 + 15],
    textMessage:
      "You can jump over walls, cliffs or into treelines with Earthshock.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ursa_earthshock" },
  },
  {
    category: "OwnHero",
    hero: "Ursa",
    audioFile: "ownHero/Ursa_3_Earthshock jump",
    messageTimes: [6 * 60 + 45, 14 * 60 + 45, 22 * 60 + 45],
    textMessage:
      "Ursa typically farms very slowly so you need to play actively and look for kills to gain networth.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Ursa",
    audioFile: "ownHero/Ursa_4_Roshan",
    messageTimes: [9 * 60 + 45, 13 * 60 + 45],
    textMessage:
      "Ursa can take Roshan on his own fairly early due to Fury Swipes stacking.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    hero: "Ursa",
    audioFile: "ownHero/Ursa_5_Antikiting",
    messageTimes: [12 * 60 + 45, 18 * 60 + 45],
    textMessage:
      "Itemize against kiting as you don't necessarily want to switch targets too often due to Fury Swipes stacking.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "diffusal_blade" },
  },
  {
    category: "OwnHero",
    hero: "Ursa",
    audioFile: "ownHero/Ursa_6_Second Roshan",
    messageTimes: [19 * 60 + 45, 23 * 60 + 45],
    textMessage:
      "Second Roshan is very important for Ursa as it drops Aghanim's Shard, which adds to tankiness.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Ursa",
    audioFile: "enemyHero/Ursa_1_Keep distance",
    messageTime: -60,
    textMessage:
      "Keep distance from Ursa as he is able to build up damage against you with Fury Swipes.",
    audience: [Audience.IN_LANE],
  },
  // @Alex: This one is hard to understand: Does this mean the player has to use them on Ursa when he has enrange or not to use it then? (I recorded it anyway) ANSWER: Consider NOT to use them while Enrage is active as the disables will last short due to status resistance from Enrage. Sometimes it is fine to use them despite diminished effect. That's why I was using word "consider".
  {
    category: "EnemyHero",
    hero: "Ursa",
    audioFile: "enemyHero/Ursa_2_Save disables",
    messageTime: 8 * 60,
    textMessage:
      "Consider saving your disables against Ursa's Enrage status resistance increase.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Ursa",
    audioFile: "enemyHero/Ursa_3_Euls",
    messageTime: 12 * 60,
    textMessage:
      "Eul's Scepter is great for kiting Enrage as it doesn't get affected by its status resistance.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Ursa",
    audioFile: "enemyHero/Ursa_4_Counter items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Ghost Scepter, Force Staff and Hurricane Pike are great for kiting Ursa.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Ursa",
    audioFile: "enemyHero/Ursa_5_Roshan",
    messageTimes: [15 * 60 + 10, 20 * 60 + 10, 25 * 60 + 10],
    textMessage: "Ursa is able to take Roshan early on. Ward and check Roshan.",
    audience: [Audience.ALL],
  },

  // 109. Vengeful Spirit | 09.03.2021
  {
    category: "OwnHero",
    hero: "Vengeful Spirit",
    audioFile: "ownHero/Vengeful Spirit_1_Secure ranged",
    messageTime: 15,
    textMessage:
      "Use Wave of Terror to secure ranged creep and harass the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "vengefulspirit_wave_of_terror" },
  },
  {
    category: "OwnHero",
    hero: "Vengeful Spirit",
    audioFile: "ownHero/Vengeful Spirit_2_Stack",
    messageTimes: [2 * 60 + 30, 9 * 60 + 30],
    textMessage:
      "You can stack multiple camps at the same time and help clear them with Wave of Terror.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "vengefulspirit_wave_of_terror" },
  },
  {
    category: "OwnHero",
    hero: "Vengeful Spirit",
    audioFile: "ownHero/Vengeful Spirit_3_Vision",
    messageTimes: [3 * 60 + 30, 13 * 60 + 30],
    textMessage:
      "Wave of Terror provides vision so you can scout pillars for wards and Roshpit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "vengefulspirit_wave_of_terror" },
  },
  {
    category: "OwnHero",
    hero: "Vengeful Spirit",
    audioFile: "ownHero/Vengeful Spirit_4_Be ready",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "The most important thing in the fights is to be ready to swap an ally in trouble or an opponent out of position.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "vengefulspirit_nether_swap" },
  },
  {
    category: "OwnHero",
    hero: "Vengeful Spirit",
    audioFile: "ownHero/Vengeful Spirit_5_Roshan",
    messageTimes: [14 * 60 + 45, 18 * 60 + 45],
    textMessage:
      "Vengeful Spirit enables early Roshan kill due to Wave of Terror, Vengeance Aura and posibly minus armor items.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    hero: "Vengeful Spirit",
    audioFile: "enemyHero/Vengeful Spirit_1_Focus",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Vengeful Spirit in the fights as she provides saves and empowers her Cores.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Vengeful Spirit",
    audioFile: "enemyHero/Vengeful Spirit_2_Armor items",
    messageTime: 12 * 60,
    textMessage:
      "Armor items are great against Vengeful Spirit's Wave of Terror and Vengeance Aura.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Vengeful Spirit",
    audioFile: "enemyHero/Vengeful Spirit_3_Linkens lotus",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Linken's Sphere and a well timed Lotus Orb are great against Magic Missile and Nether Swap.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Vengeful Spirit",
    audioFile: "enemyHero/Vengeful Spirit_4_Aghanims scpeter",
    messageTime: 15 * 60 + 10,
    textMessage:
      "If Vengeful bought Aghanim's Scepter, then you should ignore her in fights.",
    audience: [Audience.ALL],
  },

  // 110. Venomancer | 09.03.2021
  {
    category: "OwnHero",
    hero: "Venomancer",
    audioFile: "ownHero/Venomancer_1_Tough lane",
    messageTime: 10,
    textMessage:
      "If the lane is tough, consider putting more points in Plague Wards and move to the jungle if necessary.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "venomancer_plague_ward" },
  },
  {
    category: "OwnHero",
    hero: "Venomancer",
    audioFile: "ownHero/Venomancer_2_Poison harass",
    messageTime: 20,
    textMessage:
      "Hit opponents regularly to apply ticking damage from Poison Sting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_poison_sting" },
  },
  {
    category: "OwnHero",
    hero: "Venomancer",
    audioFile: "ownHero/Venomancer_3_Secure kills",
    messageTime: 90,
    textMessage:
      "Galed opponents can be denied, so do your best to secure a lasthit on a dying hero.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_venomous_gale" },
  },
  {
    category: "OwnHero",
    hero: "Venomancer",
    audioFile: "ownHero/Venomancer_4_Deny wards",
    messageTime: 3 * 60,
    textMessage:
      "Deny low health Plague Wards to deprive opponents of extra gold.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_plague_ward" },
  },
  {
    category: "OwnHero",
    hero: "Venomancer",
    audioFile: "ownHero/Venomancer_5_Defend towers",
    messageTimes: [8 * 60 + 45, 15 * 60 + 45],
    textMessage:
      "Venomancer is great at defending towers as you can place a bunch of Plague Wards around it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_plague_ward" },
  },
  {
    category: "OwnHero",
    hero: "Venomancer",
    audioFile: "ownHero/Venomancer_6_Spam wards",
    messageTime: 9 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Use Plague Wards off cd when you are moving around to scout, control runes and block camps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_plague_ward" },
  },
  {
    category: "OwnHero",
    hero: "Venomancer",
    audioFile: "ownHero/Venomancer_7_Farm aggressively",
    messageTime: 9 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Farm aggressively, as Plague Wards provide vision and farm dangerous spots for you along with gale and sting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_plague_ward" },
  },
  {
    category: "OwnHero",
    hero: "Venomancer",
    audioFile: "ownHero/Venomancer_8_Fights",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, look to affect as many heroes as possible with Poison Nova and Venomous Gale.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_poison_nova" },
  },
  {
    category: "OwnHero",
    hero: "Venomancer",
    audioFile: "ownHero/Venomancer_9_Push sidelanes",
    messageTime: 11 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines even without showing yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_plague_ward" },
  },
  {
    category: "OwnHero",
    hero: "Venomancer",
    audioFile: "ownHero/Venomancer_10_Aghanims",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard and Scepter as the game progresses as they're huge damage increase.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Venomancer",
    audioFile: "enemyHero/Venomancer_1_Extra consumables",
    messageTime: -60,
    textMessage:
      "Bring extra consumables to the lane against Venomancer's Poison Sting harass.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Venomancer",
    audioFile: "enemyHero/Venomancer_2_Cloak",
    messageTime: 5 * 60 + 10,
    textMessage:
      "Cloak has a lot of value against Venomancer's insane magic damage output.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Venomancer",
    audioFile: "enemyHero/Venomancer_3_Teleport out",
    messageTimes: [5 * 60 + 20, 10 * 60 + 20, 15 * 60 + 20],
    textMessage:
      "Consider teleporting out quickly when you find yourself in trouble against Venomancer.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Venomancer",
    audioFile: "enemyHero/Venomancer_4_Antimagic items",
    messageTime: 12 * 60,
    textMessage:
      "Spell immunity and magical resistance items are great against Venomancer.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Venomancer",
    audioFile: "enemyHero/Venomancer_5_Dispel items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Items that provide dispels are able to remove Venomous Gale and Poison Sting.",
    audience: [Audience.ALL],
  },

  // 111. Viper | 09.03.2021
  {
    category: "OwnHero",
    hero: "Viper",
    audioFile: "ownHero/Viper_1_Falls off",
    messageTime: -30,
    textMessage:
      "Viper is very strong in early to mid game but drops off later on. Play actively while you're the strongest.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Viper",
    audioFile: "ownHero/Viper_2_Aggression mana",
    messageTime: 15,
    textMessage:
      "Look to stack up Poison Attacks on a single target and fix your mana issues early on.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "viper_poison_attack" },
  },
  {
    category: "OwnHero",
    hero: "Viper",
    audioFile: "ownHero/Viper_3_Slow",
    messageTimes: [2 * 60 + 45, 7 * 60 + 45],
    textMessage:
      "Viper is insanely slow. Consider getting a casual Wind Lace and perhaps even Boots of Travel in the long run.",
    audience: [Audience.ALL],
    image: { type: "item", name: "wind_lace" },
  },
  {
    category: "OwnHero",
    hero: "Viper",
    audioFile: "ownHero/Viper_4_Nethertoxin usage",
    messageTimes: [8 * 60 + 45, 16 * 60 + 45],
    textMessage:
      "Viper is insanely slow. Consider getting a casual Wind Lace and perhaps even Boots of Travel in the long run.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "viper_nethertoxin" },
  },
  {
    category: "OwnHero",
    hero: "Viper",
    audioFile: "ownHero/Viper_5_Push sidelanes",
    messageTime: 11 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "Push out the sidelines when not much is happening on the map. You can do it from fog with Nethertoxin.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "viper_nethertoxin" },
  },
  {
    category: "OwnHero",
    hero: "Viper",
    audioFile: "ownHero/Viper_6_Not tanky",
    messageTime: 17 * 60 + 45,
    textMessage:
      "Although you are very tanky in early stages, you aren't nearly as tanky around the 20 minute mark.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Viper",
    audioFile: "ownHero/Viper_7_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard around minute 20 to further increase your dps and building damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Viper",
    audioFile: "enemyHero/Viper_1_Poison attack",
    messageTime: -60,
    textMessage:
      "Don't allow Viper to stack more than 3 Poison Attacks on you.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Viper",
    audioFile: "enemyHero/Viper_2_Nethertoxin",
    messageTime: 30,
    textMessage:
      "Viper's Nethertoxin breaks passives. Stay away from it until you have a Black King Bar.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Viper",
    audioFile: "enemyHero/Viper_3_Teleport out",
    messageTimes: [5 * 60 + 10, 10 * 60 + 10, 15 * 60 + 10],
    textMessage:
      "Consider teleporting out quickly when you find yourself in trouble against Viper.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Viper",
    audioFile: "enemyHero/Viper_4_Antimagic items",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance items are great against Viper's magic damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Viper",
    audioFile: "enemyHero/Viper_5_Linkens lotus",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Linken's Sphere and a well timed Lotus Orb are great against Viper Strike.",
    audience: [Audience.ALL],
  },

  // 112. Visage | 10.03.2021
  {
    category: "OwnHero",
    hero: "Visage",
    audioFile: "ownHero/Visage_1_Weak laner",
    messageTime: -30,
    textMessage:
      "Visage is fairly weak until level 6. Play for lasthits and lane control.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Visage",
    audioFile: "ownHero/Visage_2_Squishy familiars",
    messageTime: 7 * 60,
    textMessage: "Familiars are fairly squishy when Visage is not around.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "visage_summon_familiars" },
  },
  {
    category: "OwnHero",
    hero: "Visage",
    audioFile: "ownHero/Visage_3_Familiars usage",
    messageTimes: [7 * 60 + 30, 17 * 60 + 30, 27 * 60 + 30],
    textMessage:
      "Use familiars to control runes, stack camps, gank lanes even without your hero, drag and cut creepwaves.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "visage_summon_familiars" },
  },
  {
    category: "OwnHero",
    hero: "Visage",
    audioFile: "ownHero/Visage_4_Dont overrotate",
    messageTimes: [7 * 60 + 45, 11 * 60 + 45],
    textMessage:
      "Don't over-rotate. Work your way to Orchid as it allows you to solo kill most of the heroes.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "orchid" },
  },
  {
    category: "OwnHero",
    hero: "Visage",
    audioFile: "ownHero/Visage_5_Familiars stun chain",
    messageTimes: [9 * 60 + 30, 19 * 60 + 30, 29 * 60 + 30],
    textMessage:
      "You can summon fresh familiars to be able to chain 4 stuns on opponents.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "visage_summon_familiars" },
  },
  {
    category: "OwnHero",
    hero: "Visage",
    audioFile: "ownHero/Visage_6_Aghanims Scepter",
    messageTime: 15 * 60 + 30,
    textMessage:
      "With Aghanim's Scepter, your burst and pick off potential further increases.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    hero: "Visage",
    audioFile: "ownHero/Visage_7_Aghanims Shard",
    messageTime: 15 * 60 + 30,
    textMessage:
      "Pick up Aghanim's Shard around minute 20 as it allows you to survive jumps and provides another stun.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Visage",
    audioFile: "enemyHero/Visage_1_Gravekeepers cloak",
    messageTimes: [90, 11 * 60 + 30],
    textMessage:
      "Instances of 40 damage and higher will remove a layer of Gravekeeper's Cloak.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "visage_gravekeepers_cloak" },
  },

  {
    category: "EnemyHero",
    hero: "Visage",
    audioFile: "enemyHero/Visage_2_Familiars",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Visage's Familiars give a lot of gold and are easy to kill when Visage is not around.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "visage_gravekeepers_cloak" },
  },
  {
    category: "EnemyHero",
    hero: "Visage",
    audioFile: "enemyHero/Visage_3_Snowbally",
    messageTimes: [10 * 60 + 10, 15 * 60 + 20, 20 * 60 + 20],
    textMessage:
      "Visage is snowbally hero and falls off in late game. Look to extend the game. Don't be greedy with items.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Visage",
    audioFile: "enemyHero/Visage_4_Tower defense",
    messageTimes: [10 * 60 + 20, 15 * 60 + 30, 20 * 60 + 30],
    textMessage:
      "Visage takes down buildings fast with Familiars. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Visage",
    audioFile: "enemyHero/Visage_5_Break",
    messageTime: 12 * 60,
    textMessage:
      "Break effects are removing Gravekeeper's Cloak and Visage becomes much weaker.",
    audience: [Audience.ALL],
    image: { type: "item", name: "silver_edge" },
  },
  {
    category: "EnemyHero",
    hero: "Visage",
    audioFile: "enemyHero/Visage_6_Crimson guard",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard is great against the Familiar's physical damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "crimson_guard" },
  },
  {
    category: "EnemyHero",
    hero: "Visage",
    audioFile: "enemyHero/Visage_7_Aghanims scepter",
    messageTime: 15 * 60 + 10,
    textMessage:
      "Once Visage gets Aghanim's Scepter, place Observer wards and sentries and carry detection.",
    audience: [Audience.ALL],
    image: { type: "item", name: "SentryDustGem" },
  },

  // 113. Void Spirit | 10.03.2021
  {
    category: "OwnHero",
    hero: "Void Spirit",
    audioFile: "ownHero/Void Spirit_1_Secure ranged",
    messageTime: 15,
    textMessage:
      "Use Resonant Pulse to secure ranged creep and harass opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "void_spirit_resonant_pulse" },
  },
  {
    category: "OwnHero",
    hero: "Void Spirit",
    audioFile: "ownHero/Void Spirit_2_Tough lane",
    messageTime: 2 * 60,
    textMessage:
      "On tough lanes put more points in Dissimilate to be able push out waves and clear camps faster.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "void_spirit_dissimilate" },
  },
  {
    category: "OwnHero",
    hero: "Void Spirit",
    audioFile: "ownHero/Void Spirit_3_Play actively",
    messageTimes: [5 * 60 + 45, 9 * 60 + 45],
    textMessage:
      "Look to play actively, especially with good runes as Void Spirit has huge magical burst potential and low cooldowns.",
    audience: [Audience.ROLE_CORE],
    image: { type: "rune", name: "arcane" },
  },
  {
    category: "OwnHero",
    hero: "Void Spirit",
    audioFile: "ownHero/Void Spirit_4_Fight targets",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Void Spirit is great at killing supports and backliners in teamfights. Focus on those first.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "void_spirit_astral_step" },
  },
  {
    category: "OwnHero",
    hero: "Void Spirit",
    audioFile: "ownHero/Void Spirit_5_Push sidelanes",
    messageTime: 11 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage: "When not much is happening, push out the sidelines.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "void_spirit_dissimilate" },
  },
  {
    category: "OwnHero",
    hero: "Void Spirit",
    audioFile: "ownHero/Void Spirit_6_Aghanims Scepter",
    messageTime: 14 * 60 + 45,
    textMessage:
      "Aghanim's Scepter is a game changer as it adds another utility in the form of silence among other things.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Void Spirit",
    audioFile: "enemyHero/Void Spirit_1_Control runes",
    messageTimes: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Control power runes against Void Spirit. He likes to bottle them and gank.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Void Spirit",
    audioFile: "enemyHero/Void Spirit_2_Instant disables",
    messageTime: 12 * 60,
    textMessage:
      "Instant disables and silences are great against the elusive Void Spirit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Void Spirit",
    audioFile: "enemyHero/Void Spirit_3_Antispell items",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Magic resistance and spell immunity items are great against Void Spirit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Void Spirit",
    audioFile: "enemyHero/Void Spirit_4_Aghanims scepter",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Be aware of Void Spirit's Aghanim's Scepter timing as he gets AoE silence of 4s.",
    audience: [Audience.ALL],
  },

  // 114. Warlock | 10.03.2021
  {
    category: "OwnHero",
    hero: "Warlock",
    audioFile: "ownHero/Warlock_1_Heal over damage",
    messageTime: 15,
    textMessage:
      "Prioritize using Shadow Word for healing instead for damage due to magic resistance.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "warlock_shadow_word" },
  },
  {
    category: "OwnHero",
    hero: "Warlock",
    audioFile: "ownHero/Warlock_2_Bonds latching",
    messageTimes: [75, 11 * 60 + 15],
    textMessage: "Fatal Bonds latch onto fogged units.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "warlock_fatal_bonds" },
  },
  {
    category: "OwnHero",
    hero: "Warlock",
    audioFile: "ownHero/Warlock_3_Bonds harass",
    messageTime: 90,
    textMessage:
      "Use Fatal Bonds to harass if you can link 4 lane creeps and 2 opponents on the lane.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "warlock_fatal_bonds" },
  },
  {
    category: "OwnHero",
    hero: "Warlock",
    audioFile: "ownHero/Warlock_4_Chaotic Offering trees",
    messageTimes: [8 * 60 + 15, 18 * 60 + 15],
    textMessage: "Chaotic Offering destroys trees upon landing.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "warlock_rain_of_chaos" },
  },
  {
    category: "OwnHero",
    hero: "Warlock",
    audioFile: "ownHero/Warlock_5_Active off cd",
    messageTimes: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Be active when Chaotic Offering is up, organize smokes and farm with golem after the fight.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "warlock_rain_of_chaos" },
  },
  {
    category: "OwnHero",
    hero: "Warlock",
    audioFile: "ownHero/Warlock_6_Aghanims Shard",
    messageTime: 14 * 60 + 50,
    textMessage:
      `Pick up Aghanim's Shard around minute 15 as it improves your waveclear and healing significantly.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Warlock",
    audioFile: "enemyHero/Warlock_1_Chaotic offering",
    messageTimes: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Warlock's Chaotic Offering has long cooldown. Look to fight when it is down.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Warlock",
    audioFile: "enemyHero/Warlock_2_Clump up",
    messageTimes: [10 * 60 + 10, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Avoid clumping up and fighting in choke spots against Warlock's spells.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Warlock",
    audioFile: "enemyHero/Warlock_3_Fatal bonds",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Most of Warlock's damage comes from Fatal Bonds. Dispel items are great at removing them.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Warlock",
    audioFile: "enemyHero/Warlock_4_Spell immunity",
    messageTime: 12 * 60 + 20,
    textMessage: "Spell immunity is great against Warlocks spells.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Warlock",
    audioFile: "enemyHero/Warlock_5_Aghanim refresher",
    messageTime: 20 * 60 + 10,
    textMessage:
      "Be aware of Warlock's Aghanim's Scepter and Refresher Orb timings. He can carry the game.",
    audience: [Audience.ALL],
  },

  // 115. Weaver | 10.03.2021
  {
    category: "OwnHero",
    hero: "Weaver",
    audioFile: "ownHero/Weaver_1_Quick warding",
    messageTime: -90,
    textMessage:
      "Consider placing an observer for midlaner quickly with Shukuchi as you load into the game.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    hero: "Weaver",
    audioFile: "ownHero/Weaver_2_Courier sniping",
    messageTime: -75,
    textMessage:
      `Sniping couriers with the help of a ward behind their tier 1 tower will reduce their available detection.`,
    audience: [Audience.ROLE_SUPPORT_SOFT],
    image: { type: "item", name: "courier" },
  },
  {
    category: "OwnHero",
    hero: "Weaver",
    audioFile: "ownHero/Weaver_3_Check detection",
    messageTime: -60,
    repeatTime: 10 * 60,
    textMessage: "Keep checking opponents' inventory for detection.",
    audience: [Audience.ALL],
    image: { type: "item", name: "SentryDustGem" },
  },
  {
    category: "OwnHero",
    hero: "Weaver",
    audioFile: "ownHero/Weaver_4_Secure ranged",
    messageTime: 15,
    textMessage:
      "Use Shukuchi to secure ranged creep and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "weaver_shukuchi" },
  },
  {
    category: "OwnHero",
    hero: "Weaver",
    audioFile: "ownHero/Weaver_5_Join fights",
    messageTimes: [8 * 60 + 45, 12 * 60 + 45],
    textMessage:
      "Weaver is already very strong in early to mid-game. Look around the map for opportunities to join the fights.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Weaver",
    audioFile: "ownHero/Weaver_6_Fights",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, focus on applying Swarm on as many opponents as possible and prioritize killing supports and backliners first.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "weaver_the_swarm" },
  },
  {
    category: "OwnHero",
    hero: "Weaver",
    audioFile: "ownHero/Weaver_7_Push sidelanes",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines aggressively as Weaver is elusive.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "weaver_shukuchi" },
  },
  {
    category: "OwnHero",
    hero: "Weaver",
    audioFile: "ownHero/Weaver_8_Early Roshan",
    messageTimes: [15 * 60 + 15, 19 * 60 + 15],
    textMessage:
      "Weaver enables the team to take Roshan fairly early due to Swarm armor reduction.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "weaver_the_swarm" },
  },
  {
    category: "OwnHero",
    hero: "Weaver",
    audioFile: "ownHero/Weaver_9_Aghanims Shard",
    messageTime: 14 * 60 + 50,
    textMessage:
      `Pick up Aghanim's Shard around minute 15 as it allows you to detect invisible heroes but also improves dps.`,
    audience: [Audience.ROLE_SUPPORT, Audience.ROLE_OFFLANE],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Weaver",
    audioFile: "ownHero/Weaver_10_Aghanims Scepter",
    messageTimes: [21 * 60 + 15, 25 * 60 + 15],
    textMessage:
      "Aghanim's Scepter is a game-changing pick up. In pair with Blink Dagger or Aether Lens, it becomes easier to use.",
    audience: [Audience.ROLE_SUPPORT, Audience.ROLE_OFFLANE],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Weaver",
    audioFile: "enemyHero/Weaver_1_Sentry consumables",
    messageTime: -60,
    textMessage:
      "Bring a sentry and extra consumables to the lane against Weaver.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Weaver",
    audioFile: "enemyHero/Weaver_2_The swarm",
    messageTime: 60 + 30,
    textMessage:
      "Remove The Swarm from yourself and from teammates or you will loose a lot of armor.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Weaver",
    audioFile: "enemyHero/Weaver_3_Time lapse",
    messageTime: 8 * 60,
    textMessage: "Weaver's Time Lapse will remove Dust of Appearance.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Weaver",
    audioFile: "enemyHero/Weaver_4_Protect supports",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Weaver is really good at killing supports and backliners. Protect them.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Weaver",
    audioFile: "enemyHero/Weaver_5_Invisible",
    messageTime: 12 * 60,
    textMessage:
      "Becoming invisible removes The Swarm unless you are being detected or Weaver has Shard upgrade.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Weaver",
    audioFile: "enemyHero/Weaver_6_Instant disables silences",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Instant disables and silences are great against the elusive Weaver.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Weaver",
    audioFile: "enemyHero/Weaver_7_Counter items",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Armor items, Heaven's Halberd and Ghost Scepter are great against Weaver's physical damage.",
    audience: [Audience.ALL],
  },

  // 116. Windranger | Earlier work
  {
    category: "OwnHero",
    hero: "Windranger",
    audioFile: "ownHero/Windranger_1_Powershot traits",
    messageTimes: [-60, 9 * 60, 19 * 60],
    textMessage: "Powershot provides brief vision and cuts trees in its path.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "windrunner_powershot" },
  },
  {
    category: "OwnHero",
    hero: "Windranger",
    audioFile: "ownHero/Windranger_2_Windrun dispellable",
    messageTime: -45,
    textMessage:
      "Windrun is dispellable, so be careful when playing against certain heroes and items.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "windrunner_windrun" },
  },
  {
    category: "OwnHero",
    hero: "Windranger",
    audioFile: "ownHero/Windranger_3_Secure ranged",
    messageTime: 15,
    textMessage:
      "Use powershot to secure ranged creeps and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "windrunner_powershot" },
  },
  {
    category: "OwnHero",
    hero: "Windranger",
    audioFile: "ownHero/Windranger_4_Proc items",
    messageTimes: [5 * 60, 12 * 60],
    textMessage:
      "Proc items like Javelin, Maelstrom or Monkey King Bar work really well with Focus Fire.",
    audience: [Audience.ALL],
    image: { type: "item", name: "javelin" },
  },
  {
    category: "OwnHero",
    hero: "Windranger",
    audioFile: "ownHero/Windranger_5_Solo kills",
    messageTimes: [5 * 60 + 45, 11 * 60 + 45],
    textMessage:
      "Play actively, especially with a good rune as you can solo most of the heroes on the map.",
    audience: [Audience.ROLE_MID],
    image: { type: "rune", name: "double_damage" },
  },
  {
    category: "OwnHero",
    hero: "Windranger",
    audioFile: "ownHero/Windranger_6_Squishy",
    messageTimes: [10 * 60 + 15, 20 * 60 + 15],
    textMessage:
      "Windranger is squishy. Don't let opponents surprise you. You want to be the one that starts the fight.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Windranger",
    audioFile: "ownHero/Windranger_7_Guarantee Shackleshot",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Take your time in the fights to guarantee Shackleshot lands, as most of your impact comes from that.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "windrunner_shackleshot" },
  },
  {
    category: "OwnHero",
    hero: "Windranger",
    audioFile: "ownHero/Windranger_8_Push sidelanes",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Push out the sidelines when not much is happening around the map.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "windrunner_powershot" },
  },
  {
    category: "OwnHero",
    hero: "Windranger",
    audioFile: "ownHero/Windranger_9_Aghanims Shard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Ahanim's Shard around minute 20 as it adds another control spell to your arsenal.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    hero: "Windranger",
    audioFile: "enemyHero/Windranger_1_Spell harass",
    messageTime: 30,
    textMessage:
      "Windranger is susceptible to early game spell harass. Manage your mana and keep pressuring her",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Windranger",
    audioFile: "enemyHero/Windranger_2_Powershot",
    messageTimes: [1 * 60, 4 * 60],
    textMessage:
      "Windranger's Powershot does lots of damage. Avoid being hit or at least don't be the first unit being hit",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Windranger",
    audioFile: "enemyHero/Windranger_3_Ult and javelin",
    messageTimes: [8 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Windranger can easily kill most heroes with her ultimate and a single Javelin. Be mindful about that",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Windranger",
    audioFile: "enemyHero/Windranger_4_Blade mail",
    messageTime: 7 * 60 + 15,
    textMessage: "Blade Mail is a decent counter against her ultimate",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Windranger",
    audioFile: "enemyHero/Windranger_5_Shackleshot",
    messageTimes: [8 * 60 + 45, 18 * 60 + 45],
    textMessage:
      "To counter Windranger's Shackleshot, try to stay away from trees and make sure you don't have creeps or heroes behind you. Linken's Sphere is also helpful against Shackleshot",
    chatMessage:
      "To counter Windranger's Shackleshot stay away from trees and don't have creeps or heroes behind you",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Windranger",
    audioFile: "enemyHero/Windranger_6_Windrun",
    messageTimes: [6 * 60 + 15, 12 * 60 + 15],
    textMessage:
      "Windranger's Windrun ability is countered by items that pierce through evasion, cause magical damage and dispels such as Silver Edge",
    chatMessage:
      "Windranger's Windrun is countered by items that pierce through evasion, cause magical damage and dispels",
    audience: [Audience.ALL],
  },

  // 117. Winter Wyvern | 10.03.2021
  {
    category: "OwnHero",
    hero: "Winter Wyvern",
    audioFile: "ownHero/Winter Wyvern_1_ArcticBurn1",
    messageTime: -30,
    textMessage:
      "Make sure to hit each enemy at least once to apply the Arctic Burn debuff.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Winter Wyvern",
    audioFile: "ownHero/Winter Wyvern_2_SplinterBlast",
    messageTime: 30,
    textMessage:
      "Avoid Splinter Blasting melee creeps until it reaches level 4 as you will put ranged creep in deny range.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Winter Wyvern",
    audioFile: "ownHero/Winter Wyvern_3_ColdEmbrace",
    messageTime: 90,
    textMessage:
      "Be careful when using Cold Embrace as a save. Often it is better to use your slows or Winter's Curse.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Winter Wyvern",
    audioFile: "ownHero/Winter Wyvern_4_ArcticBurn2",
    messageTime: 2 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "If you feel like you might be gone on, it is good to play close to trees or cliffs, so you can escape with Arctic Burn.",
    audience: [Audience.ALL],
  },
  //@Alex: What doy ou mean be "might be gone"? Might die? Might want to leave the fight?
  {
    category: "OwnHero",
    hero: "Winter Wyvern",
    audioFile: "ownHero/Winter Wyvern_5_WintersCurse1",
    messageTime: 10 * 60,
    repeatTime: 30 * 60,
    textMessage:
      "Avoid showing yourself early in fights. Stay hidden and play around your Winter's Curse and Cold Embrace. Use Arctic burn to reposition.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Winter Wyvern",
    audioFile: "ownHero/Winter Wyvern_6_WintersCurse2",
    messageTime: 20 * 60,
    repeatTime: 30 * 60,
    textMessage:
      "Use Curse carefully in the middle of fights as you might waste a lot of your ally's damage and cooldowns.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Winter Wyvern",
    audioFile: "ownHero/Winter Wyvern_7_Scepter",
    messageTime: 14 * 60,
    textMessage:
      "Aghanim's Scepter is crucial for right-click build. Make sure you take time to farm it.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    hero: "Winter Wyvern",
    audioFile: "ownHero/Winter Wyvern_8_Blink",
    messageTime: 17 * 60,
    textMessage:
      "Having timely Blink Dagger will allow you to seize a moment and land multi-hero Winter's Curses.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    hero: "Winter Wyvern",
    audioFile: "ownHero/Winter Wyvern_9_WintersCurse3",
    messageTime: 30 * 60,
    repeatTime: 30 * 60,
    textMessage:
      "Fight around good vision so you can position well and land multi-hero Winter's Curses.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    hero: "Winter Wyvern",
    audioFile: "enemyHero/Winter Wyvern_1_Arctic burn",
    messageTime: -60,
    textMessage: "Winter Wyvern is bad at trading when Arctic Burn is down.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Winter Wyvern",
    audioFile: "enemyHero/Winter Wyvern_2_Cold embrace",
    messageTime: 60 + 30,
    textMessage: "Cold Embrace prevents all physical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Winter Wyvern",
    audioFile: "enemyHero/Winter Wyvern_3_Focus",
    messageTimes: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Winter Wyvern in fights as she provides saves and disables for her team.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Winter Wyvern",
    audioFile: "enemyHero/Winter Wyvern_4_Clump up",
    messageTimes: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Avoid clumping up and fighting in choke spots against Winter's Curse.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Winter Wyvern",
    audioFile: "enemyHero/Winter Wyvern_5_Black king bar",
    messageTime: 12 * 60,
    textMessage:
      "Black King Bar prevents you from hitting a Cursed unit, but you can still get cursed yourself.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Winter Wyvern",
    audioFile: "enemyHero/Winter Wyvern_6_Status resistance",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Status resistance items shorten the duration of Winter's Curse.",
    audience: [Audience.ALL],
  },

  // 118. Witch Doctor | 10.03.2021
/*   {
    category: "OwnHero",
    hero: "Witch Doctor",
    audioFile: "ownHero/Witch Doctor_1_Paralyzing cask duration",
    messageTimes: [-60, 10 * 60 + 10, 20 * 60 + 20],
    textMessage:
      "Paralyzing Cast lasts 5 seconds on creeps, summons and illusions.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_paralyzing_cask" },
  }, */
  {
    category: "OwnHero",
    hero: "Witch Doctor",
    audioFile: "ownHero/Witch Doctor_2_Secure ranged",
    messageTime: 15,
    textMessage:
      "Use Paralyzing Cask to secure ranged creep and harass the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_paralyzing_cask" },
  },
  {
    category: "OwnHero",
    hero: "Witch Doctor",
    audioFile: "ownHero/Witch Doctor_3_Tough lane",
    messageTime: 75,
    textMessage:
      "Consider investing a point in Voodoo Restoration on tough lanes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_voodoo_restoration" },
  },
  {
    category: "OwnHero",
    hero: "Witch Doctor",
    audioFile: "ownHero/Witch Doctor_4_Powerspike",
    messageTime: 2 * 60,
    textMessage:
      "Level 2 Maledict is a big damage powerspike for the Witch Doctor. Communicate with laning partner to go for a kill.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "witch_doctor_maledict" },
  },
  {
    category: "OwnHero",
    hero: "Witch Doctor",
    audioFile: "ownHero/Witch Doctor_5_Level 6",
    messageTime: 8 * 60,
    textMessage:
      "Witch Doctor has one of the highest kill potential at level 6 and you can even solo some heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_death_ward" },
  },
  {
    category: "OwnHero",
    hero: "Witch Doctor",
    audioFile: "ownHero/Witch Doctor_6_Toggle",
    messageTimes: [8 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "You can toggle Voodoo Restoration on and off while channeling Death Ward or teleporting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_voodoo_restoration" },
  },
  {
    category: "OwnHero",
    hero: "Witch Doctor",
    audioFile: "ownHero/Witch Doctor_7_Dont show",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Don't show yourself at the start of the fight as you are squishy. Let opponents clump up and focus on your allies.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Witch Doctor",
    audioFile: "ownHero/Witch Doctor_8_Teamfight objective",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "In the fights, make sure that Paralyzing Cask bounces and at least one opponent is Maledicted.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_paralyzing_cask" },
  },
  {
    category: "OwnHero",
    hero: "Witch Doctor",
    audioFile: "ownHero/Witch Doctor_9_Death Ward falls off",
    messageTimes: [16 * 60 + 45, 22 * 60 + 45],
    repeatTime: 10 * 60,
    textMessage:
      "Death Ward's damage output falls off significantly due to opponents' increasing armor, so focus on landing other spells.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_death_ward" },
  },
  {
    category: "OwnHero",
    hero: "Witch Doctor",
    audioFile: "ownHero/Witch Doctor_10_Aghanims Shard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanim's Shard around minute 15 as it has a combination of defensive and offensive traits.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    hero: "Witch Doctor",
    audioFile: "ownHero/Witch Doctor_11_Aghanims Scepter",
    messageTimes: [24 * 60, 29 * 60],
    textMessage:
      "In the late game, you can pump in a decent amount of damage with Aghanim's Scepter upgrade to Death Ward.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    hero: "Witch Doctor",
    audioFile: "enemyHero/Witch Doctor_1_Paralyzing cask",
    messageTimes: [-60, 10 * 60 + 10, 20 * 60 + 20],
    textMessage: "Don't clump up because of Witch Doctor's Paralyzing Cask.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Witch Doctor",
    audioFile: "enemyHero/Witch Doctor_2_Paralyzing cask summons",
    messageTime: -50,
    textMessage:
      "Paralyzing Cask stuns creeps for 5 seconds. Keep your summons away from Witch Doctor.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Witch Doctor",
    audioFile: "enemyHero/Witch Doctor_3_Strong laner",
    messageTime: 2 * 60 + 20,
    textMessage:
      "Witch Doctor is a strong laner, especially when he gets a second point in Maledict.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Witch Doctor",
    audioFile: "enemyHero/Witch Doctor_4_Solo kill",
    messageTime: 8 * 60,
    textMessage:
      "Witch Doctor can solo kill most heroes with Death Ward. Track his movements on the map.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Witch Doctor",
    audioFile: "enemyHero/Witch Doctor_6_Aghanims scepter",
    messageTime: 20 * 60 + 10,
    textMessage:
      "Be aware of Witch Doctor's Aghanim's Scepter purchase. Focus him in the fights or cancel his Ulti.",
    audience: [Audience.ALL],
  },

  // 119. Wraith King | 10.03.2021
  {
    category: "OwnHero",
    hero: "Wraith King",
    audioFile: "ownHero/Wraith King_1_Powerspike",
    messageTime: -60,
    textMessage:
      "If you have a strong level 2 powerspike on the lane, skill Vampiric Spirit on level 2, build up skeletons, release them on level 2 and use Wraithfire Blast.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "skeleton_king_vampiric_aura" },
  },
  {
    category: "OwnHero",
    hero: "Wraith King",
    audioFile: "ownHero/Wraith King_2_Secure ranged",
    messageTime: 15,
    textMessage:
      "Use Wraithfire Blast to secure ranged creep lasthits by either stunning the creep or an opponent.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skeleton_king_hellfire_blast" },
  },
  {
    category: "OwnHero",
    hero: "Wraith King",
    audioFile: "ownHero/Wraith King_3_Save skeletons",
    messageTimes: [4 * 60 + 45, 10 * 60 + 45],
    textMessage:
      "When farming jungle, don't let your skeletons tank neutral creeps too much.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skeleton_king_vampiric_aura" },
  },
  {
    category: "OwnHero",
    hero: "Wraith King",
    audioFile: "ownHero/Wraith King_4_30 percent",
    messageTimes: [5 * 60, 11 * 60],
    textMessage:
      "When neutral camp is at 30% of total health, move to the next camp to show your skeletons the way.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skeleton_king_vampiric_aura" },
  },
  {
    category: "OwnHero",
    hero: "Wraith King",
    audioFile: "ownHero/Wraith King_5_Keep skill point",
    messageTime: 6 * 60 + 45,
    textMessage:
      "Consider keeping a skill point on level 6 or invest it in spells that will improve your farming speed if you are jungling.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skeleton_king_reincarnation" },
  },
  {
    category: "OwnHero",
    hero: "Wraith King",
    audioFile: "ownHero/Wraith King_6_Blink",
    messageTime: 12 * 60 + 45,
    textMessage:
      "Once you have a Blink Dagger, focus on killing backliners or supports first.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Wraith King",
    audioFile: "ownHero/Wraith King_7_Blink",
    messageTime: 13 * 60 + 45,
    textMessage:
      "Once you have a Blink Dagger, focus on killing backliners or supports first.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    hero: "Wraith King",
    audioFile: "ownHero/Wraith King_8_Mana burn",
    messageTime: 14 * 60,
    textMessage:
      "Mana burn is a big problem for the Wraith King. Itemize against it or adjust the playstyle.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    hero: "Wraith King",
    audioFile: "ownHero/Wraith King_9_Skeletons bad in fights",
    messageTimes: [14 * 60 + 15, 24 * 60 + 15],
    textMessage:
      "Skeletons are not super useful in teamfights. Use them to push out lanes or after fights to take the buildings.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skeleton_king_vampiric_aura" },
  },

  {
    category: "EnemyHero",
    hero: "Wraith King",
    audioFile: "enemyHero/Wraith King_1_Low armor",
    messageTime: -60,
    textMessage: "Wraith King has low armor. Pressure him with right clicks.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    hero: "Wraith King",
    audioFile: "enemyHero/Wraith King_2_Reincarnation cd",
    messageTimes: [8 * 60, 10 * 60 + 30, 12 * 60 + 30],
    textMessage:
      "Reincarnation has a long cooldown on level 1. Look to pressure Wraith King while it is down.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Wraith King",
    audioFile: "enemyHero/Wraith King_3_Contest farm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Wraith King farms quickly with skeletons. Smoke on him, place deep wards and sentry off camps.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Wraith King",
    audioFile: "enemyHero/Wraith King_4_Big cooldowns",
    messageTimes: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Don't use all your energy on Wraith King's first life unless you are sure you can kill him once more.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Wraith King",
    audioFile: "enemyHero/Wraith King_5_Mana burns",
    messageTime: 12 * 60,
    textMessage:
      "Mana burns are great at stopping Wraith King's Ulti until he gets Aghanim's Shard.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    hero: "Wraith King",
    audioFile: "enemyHero/Wraith King_6_Radiance",
    messageTime: 15 * 60 + 10,
    textMessage:
      "Be aware of Wraith King's Radiance timing. He'll be looking to fight you.",
    audience: [Audience.ALL],
  },

  // 120. Zeus | Earlier work | NOTE: Zeus ulty does 300 damage but after redcutions it does around 225-230. I think it is fine to keep the message as it is.
  {
    category: "OwnHero",
    hero: "Zeus",
    audioFile: "ownHero/Zeus_1_Bolt vision",
    messageTime: -60,
    textMessage:
      "Lightning Bolt provides vision and reveals invisible heroes and wards.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_lightning_bolt" },
  },
  {
    category: "OwnHero",
    hero: "Zeus",
    audioFile: "ownHero/Zeus_2_Lasthitting",
    messageTime: 15,
    textMessage:
      "Use Arc Lightning to secure creep lastihits and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_arc_lightning" },
  },
  {
    category: "OwnHero",
    hero: "Zeus",
    audioFile: "ownHero/Zeus_3_Mana management",
    messageTimes: [105, 5 * 60 + 45, 11 * 60 + 45],
    textMessage:
      "Mana management and rune control are key for Zeus to be able to farm and fight effectively.",
    audience: [Audience.ALL],
    image: { type: "rune", name: "arcane" },
  },
  {
    category: "OwnHero",
    hero: "Zeus",
    audioFile: "ownHero/Zeus_4_Look around",
    messageTimes: [5 * 60 + 30, 11 * 60 + 30, 17 * 60 + 30],
    textMessage:
      "Look around the map to kill opponents on low health with Thundergod's Wrath.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_thundergods_wrath" },
  },
  {
    category: "OwnHero",
    hero: "Zeus",
    audioFile: "ownHero/Zeus_5_Ulty reveals",
    messageTimes: [6 * 60, 18 * 60],
    textMessage:
      "Thundergod's Wrath reveals invisible heroes but doesn't damage them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_thundergods_wrath" },
  },
  {
    category: "OwnHero",
    hero: "Zeus",
    audioFile: "ownHero/Zeus_6_Ulty smokes",
    messageTimes: [11 * 60, 22 * 60],
    textMessage:
      "Thundergod's Wrath lightens the part of the map where opponents are smoked but doesn't damage them.",
    audience: [Audience.ALL],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "OwnHero",
    hero: "Zeus",
    audioFile: "ownHero/Zeus_7_Dont show",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Don't show yourself at the start of the fight. Let opponents focus on your allies so you can get all of your spells off.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    hero: "Zeus",
    audioFile: "ownHero/Zeus_8_Keep bolting",
    messageTime: 13 * 60 + 30,
    repeatTime: 12 * 60,
    textMessage:
      "As you are moving around, constantly check for opponents wards with Lightning Bolt.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_lightning_bolt" },
  },
  {
    category: "OwnHero",
    hero: "Zeus",
    audioFile: "ownHero/Zeus_9_Keep bolting",
    messageTimes: [15 * 60 + 15, 25 * 60 + 15],
    textMessage:
      "You can pop smoke for yourself here and there and cast spells from it in the fights.",
    audience: [Audience.ALL],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "OwnHero",
    hero: "Zeus",
    audioFile: "ownHero/Zeus_10_Aghanims Scepter",
    messageTime: 16 * 60 + 15,
    textMessage:
      "Aghanim's Scepter is a huge powerspike so make sure to acquire it at decent time.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    hero: "Zeus",
    audioFile: "ownHero/Zeus_11_Black King Bar",
    messageTimes: [16 * 60 + 30, 22 * 60 + 30],
    textMessage:
      "Black King Bars are problematic for Zeus's damage output. You need to kite those and prolong the fight.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    hero: "Zeus",
    audioFile: "ownHero/Zeus_12_Scouting ultimate",
    messageTime: 28 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "It is fine to use ultimate here and there in late game to scout for opponents.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_thundergods_wrath" },
  },

  {
    category: "EnemyHero",
    hero: "Zeus",
    audioFile: "enemyHero/Zeus_1_Magic resistance",
    messageTime: -60,
    textMessage:
      "Agree on who builds magic resistance items such as Pipe of Insight against Zeus - all players should have items with some magic resistance",
    chatMessage:
      "Agree on who builds magic resistance items such as Pipe of Insight against Zeus",
    audience: [Audience.ALL],
    image: { type: "item", name: "pipe" },
  },
  {
    category: "EnemyHero",
    hero: "Zeus",
    audioFile: "enemyHero/Zeus_2_Wards",
    messageTimes: [-40, 4 * 60 + 40, 10 * 60 + 40],
    textMessage: "Place wards in unusual spots because of Zeus",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "EnemyHero",
    hero: "Zeus",
    audioFile: "enemyHero/Zeus_3_HP thundergod",
    messageTime: 5 * 60 + 30,
    textMessage: "Keep your HP above Thundergod's Wrath damage of 300",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_thundergods_wrath" },
  },
  {
    category: "EnemyHero",
    hero: "Zeus",
    audioFile: "enemyHero/Zeus_4_Power runes",
    messageTime: 6 * 60,
    textMessage:
      "Control Power Runes to prevent Zeus from getting arcane or regeneration runes",
    audience: [Audience.ALL],
    image: { type: "rune", name: "arcane" },
  },
  {
    category: "EnemyHero",
    hero: "Zeus",
    audioFile: "enemyHero/Zeus_5_Smoke of deceit",
    messageTime: 10 * 60,
    textMessage:
      "Smoke of Deceit can be useful to dodge Thundergod's Wrath or to wrap around Zeus to catch him off-guard",
    audience: [Audience.ALL],
    image: { type: "item", name: "smoke_of_deceit" },
  },
];
