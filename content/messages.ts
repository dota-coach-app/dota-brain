/*

   This document contains all the messages played by Dota Coach.

   Comments:
   - Tips that are revolving around hero's ulty are being displayed at 8*60.
   - Tips past the laning at 10*60+10.
    - Major item suggestion at 12*60. Usually heroes have the prefered item that they want to buy so this suggestion is effectively for their second major item.
    - Checking if enemy heroes is doing Roshan at 15*60+10.

  - Antisummons items: Crimson Guard, armor items.
  - Antiillusion items: Battle Fury, Radiance, Maelstrom, Mjollnir, Gleipnir, Shiva's Guard.
  - Antimagicdamage items: Cloak, Glimmer Cape, Hood of Defiance, Pipe of Insigh, Eternal Shroud, Mage Slayer, Black King Bar.
  - Antitargetable spells: Linken's Sphere, Lotus Orb, status resistance items.
  - Antihealing items: Spirit Vessel, Eye of Skadi, Shiva's Guard.
  - Antievasion items: Javelin, Monkey King Bar, Bloodthorn, Maelstrom, Mjollnir, Witch Blade.
  - Dispel items: Eul's Scepter of Divinity, Lotus Orb, Black King Bar, Satanic, Aeon Disk, Wind Waker.
  - Gap closing items: Blink, Shadow Blade, Force Staff, blink upgrades.
  - Armor reducing items: Blight Stone, Orb of Corrosion, Medallion of Courage, Solar Crest, Desolator, Assault Cuirass.

Audio files are available at this generic URL: https://download.dotacoach.gg/app/sounds/en/joanna/<audioFile>.mp3

  (C) Dota Coach, 2024. All rights reserved.

*/
import { DOTA_COACH_GUIDE_ROLE } from "../utilities/playerRoles";

/**
 * Searches dotacoachmessages array for a given category values and
 * returns the entire object if value is found
 *
 * @param categoryValue category value to search for
 * @returns Dotacoachmessage object
 */
export function _findCategory(
  categoryValue: string
): DotaCoachMessage | undefined {
  return dotaCoachMessages.find(
    (dotaCoachMessages) => dotaCoachMessages.category === categoryValue
  );
}

/**
 *
 * @param npcHeroName Short form of npc hero name, e.g. "antimage"
 * @returns Array of message objects
 */
export function getOwnHeroMessages(npcHeroName: string): DotaCoachMessage[] {
  npcHeroName = npcHeroName.replace("npc_dota_hero_", "");

  //if (hero == "Outworld Devourer") hero = "Outworld Destroyer";
  return dotaCoachMessages.filter(
    (message) =>
      message.npcHeroName === npcHeroName && message.category === "OwnHero"
  );
}

/**
 * Returns the Dota Brain messages for a given hero and roles.
 *
 * @param npcHeroName NPC short or lang name
 * @param roles Message for roles the hero is playing
 * @returns
 */
export function getOwnHeroMessagesForRoles(
  npcHeroName: string,
  roles: DOTA_COACH_GUIDE_ROLE[]
): DotaCoachMessage[] {
  npcHeroName = npcHeroName.replace("npc_dota_hero_", "");

  return dotaCoachMessages.filter((message) => {
    if (message.npcHeroName !== npcHeroName) return false;
    if (message.category !== "OwnHero") return false;

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

export const bountyRuneRepeatTime = 3 * 60;
export const powerRuneRepeatTime = 2 * 60;
export const wisdomRuneRepeatTime = 7 * 60;
export const healingLotusRepeatTime = 3 * 60; // Turbo 50%

/**
 *
 * @param npcHeroName NPC long or short name, e.g. "npc_dota_hero_antimage" or "antimage"
 * @returns Array of message objects
 */
export function getEnemyHeroMessages(npcHeroName: string): DotaCoachMessage[] {
  npcHeroName = npcHeroName.replace("npc_dota_hero_", "");

  return dotaCoachMessages.filter(
    (message) =>
      message.npcHeroName == npcHeroName && message.category == "EnemyHero"
  );
}

export function getGridPositions(
  xPos: number,
  yPos: number
): { xPosGrid: number; yPosGrid: number } {
  const xPosGrid = Math.floor((xPos + 8192) / 1024);
  const yPosGrid = Math.floor((yPos + 8192) / 1024);
  return { xPosGrid, yPosGrid };
}
export function inTopLane(xPosGrid: number, yPosGrid: number) {
  return xPosGrid >= 0 && xPosGrid <= 4 && yPosGrid >= 11 && yPosGrid <= 15;
}
export function inBottomLane(xPosGrid: number, yPosGrid: number) {
  return xPosGrid >= 11 && xPosGrid <= 15 && yPosGrid >= 0 && yPosGrid <= 4;
}
export function inRadiantJungle(xPosGrid: number, yPosGrid: number) {
  return (
    (xPosGrid >= 1 && xPosGrid <= 4 && yPosGrid >= 5 && yPosGrid <= 9) ||
    (xPosGrid >= 5 && xPosGrid <= 11 && yPosGrid >= 1 && yPosGrid <= 5)
  );
}
export function inDireJungle(xPosGrid: number, yPosGrid: number) {
  return (
    (xPosGrid >= 5 && xPosGrid <= 8 && yPosGrid >= 10 && yPosGrid <= 14) ||
    (xPosGrid >= 9 && xPosGrid <= 10 && yPosGrid >= 10 && yPosGrid <= 12) ||
    (xPosGrid >= 10 && xPosGrid <= 14 && yPosGrid >= 6 && yPosGrid <= 9)
  );
}

export enum Audience {
  // Messages that are always played (independently of role, lane, etc.)
  ALL = "All",

  // Only for own hero messages
  ROLE_CORE = "Core", // For mid, carry and offlane
  ROLE_MID = "Mid",
  ROLE_CARRY = "Carry",
  ROLE_OFFLANE = "Offlane",
  ROLE_SUPPORT = "Support", // For soft and hard support
  ROLE_SUPPORT_SOFT = "SoftSupport",
  ROLE_SUPPORT_HARD = "HardSupport",

  // Only for enemy hero messages
  IN_LANE = "InLane", // Players playing against the hero in the lane get messages
}

/**
 * The available message categories.
 *
 */
export enum ECagtegories {
  BountyRunes = "BountyRunes", // inclused healtin lotus
  WaterRunes = "WaterRunes",
  PowerRunes = "PowerRunes",
  Tormentor = "Tormentor",
  Stacking = "Stacking",
  Pulling = "Pulling",
  NeutralItems = "NeutralItems",
  SmokeOfDeceit = "SmokeOfDeceit",
  AghanimsShard = "AghanimsShard",
  //| "TomeOfKnowledge" Removed in patch 7.33
  WisdomRunes = "WisdomRunes", // Introduced in patch 7.33
  //  SiegeCreeps = 'SiegeCreeps',
  SiegeCreepsNoFlag = "SiegeCreepsNoFlag",
  SiegeFlagCreeps = "SiegeFlagCreeps",
  FlagCreeps = "FlagCreeps",
  FlagCreepsNoSiege = "FlagCreepsNoSiege",
  DayTime = "DayTime",
  EnemyHero = "EnemyHero",
  OwnHero = "OwnHero",
}

export interface DotaCoachMessage {
  //  Category of the message. This field allows the app to turn on/off certain messages based on the user's preference
  category:
    | "BountyRunes" // inclused healtin lotus
    | "WaterRunes"
    | "PowerRunes"
    | "Tormentor"
    | "Stacking"
    | "Pulling"
    | "NeutralItems"
    | "SmokeOfDeceit"
    | "AghanimsShard"
    //| "TomeOfKnowledge" Removed in patch 7.33
    | "WisdomRunes" // Introduced in patch 7.33
    | "SiegeCreeps"
    | "SiegeCreepsNoFlag"
    | "FlagCreeps"
    | "FlagCreepsNoSiege"
    | "SiegeFlagCreeps"
    | "DayTime"
    | "EnemyHero"
    | "OwnHero";
  // Title used in cutomized message timings
  title?: string;
  // Localized hero name, only needed for categories 'EnemyHero' and 'OwnHero'
  npcHeroName?: string; // Localized name
  // Folder and name of audio file (the app adds '.mp3' to the file name)
  audioFile: string;
  /**
   * Time when message is played in seconds (time is based on game time).
   *
   * Comments:
   *   - -90 means that the message is played at hero selection
   *   - For messages only played in Turbo set messageTime to undefined
   */
  messageTime?: number | number[];
  turboTime?: number | number[];
  // Array of times when message is played
  //messageTimes?: number[];
  // Time interval to repeat the message (this fields can be used with single message times or arrays)
  repeatTime?: number;
  // Number of times repeated, it not provided, indefinitly
  repetitions?: number;
  // Message spoken by narrator and displayed in the game
  textMessage: string;
  // Optional parameter to specify chat messages (relevant when text message is too long). Max lenght is 109 characters.
  chatMessage?: string;
  // two possible values: 'All' and 'Lane' (All: ; Lane: )
  // Idea...make it optional, when nothing there, then play it for all
  audience: Audience[];
  // Retruns true if the message is to be played on the position on the map
  // Positions are between -8192 and +8192, team is 'radiant' or 'dire
  position?: (xPos: number, yPos: number, team: string) => boolean;
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
  // BountyRunes & HealingLotus
  {
    title: "BountyRunesAndHealingLotus",
    category: "BountyRunes",
    audioFile: "general/BountyRunes2",
    messageTime: 3 * 60 - 30,
    repeatTime: bountyRuneRepeatTime,
    textMessage: "Bounty runes and healing lotus will appear soon",
    audience: [Audience.ALL],
  },
  {
    title: "HealingLotus",
    category: "BountyRunes",
    audioFile: "general/BountyRunes3",
    turboTime: (3 * 60) / 2 - 30,
    repeatTime: bountyRuneRepeatTime,
    textMessage: "Healing lotus will appear soon",
    audience: [Audience.ALL],
  },

  // WaterRunes
  {
    category: "WaterRunes",
    audioFile: "general/WaterRunes",
    messageTime: [2 * 60 - 15, 4 * 60 - 15],
    textMessage: "Water runes will appear soon",
    audience: [Audience.ALL],
  },

  // PowerRunes
  {
    category: "PowerRunes",
    audioFile: "general/PowerRuneMid",
    messageTime: [6 * 60 - 15, 8 * 60 - 15, 10 * 60 - 15],
    textMessage: "Push lane to secure river rune",
    audience: [Audience.ROLE_MID],
  },
  {
    category: "PowerRunes",
    audioFile: "general/PowerRuneSupport",
    messageTime: [6 * 60 - 25, 8 * 60 - 25, 10 * 60 - 25],
    textMessage: "Contest river rune",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "PowerRunes",
    audioFile: "general/PowerRune",
    messageTime: 12 * 60 - 20,
    repeatTime: powerRuneRepeatTime,
    textMessage: "Power rune will appear soon",
    audience: [Audience.ALL],
  },

  // WisdomRune - Added in patch 7.33
  {
    title: "WisdomRunes",
    category: "WisdomRunes",
    audioFile: "general/WisdomRune", // Named #2 to avoid caching issues
    messageTime: 7 * 60 - 10,
    repeatTime: 7 * 60,
    textMessage: "Wisdom rune will appear soon",
    audience: [Audience.ALL],
  },

  // Tormentor - Added in patch 7.33
  {
    category: "Tormentor",
    audioFile: "general/TormentorSpawn",
    messageTime: 20 * 60 - 20,
    textMessage: "Tormentor will spawn soon",
    audience: [Audience.ALL],
  },
  {
    category: "Tormentor",
    audioFile: "general/TormentorRespawn",
    messageTime: 32 * 60 - 10,
    textMessage: "Check if Tormentor respawned",
    audience: [Audience.ALL],
  },

  // Stacking (from minute 2 to 30)
  {
    title: "Stacking",
    category: "Stacking",
    audioFile: "general/Stacking",
    messageTime: [2 * 60 - 15],
    repeatTime: 1 * 60,
    repetitions: 28,
    textMessage: "Stack",
    audience: [Audience.ALL],
    position: (xPos: number, yPos: number, team: string): boolean => {
      const { xPosGrid, yPosGrid } = getGridPositions(xPos, yPos);
      //const xPosGrid = Math.floor((xPos + 8192) / 1024);
      //const yPosGrid = Math.floor((yPos + 8192) / 1024);
      if (team === "radiant") {
        return inRadiantJungle(xPosGrid, yPosGrid);
      } else if (team === "dire") {
        return inDireJungle(xPosGrid, yPosGrid);
      } else {
        return false;
      }
    },
  },

  // Pulling
  {
    // Pulling timing for radiant safelane & dire offlane
    title: "PullingBottomLane",
    category: "Pulling",
    audioFile: "general/Pulling",
    messageTime: [1 * 60 + 8],
    repeatTime: 30,
    repetitions: 18,
    textMessage: "Pull",
    audience: [Audience.ROLE_SUPPORT],
    position: (xPos: number, yPos: number, team: string): boolean => {
      const { xPosGrid, yPosGrid } = getGridPositions(xPos, yPos);

      /*const xPosGrid = Math.floor((xPos + 8192) / 1024);
      const yPosGrid = Math.floor((yPos + 8192) / 1024);*/
      if (team === "radiant") {
        return inBottomLane(xPosGrid, yPosGrid);
      } else if (team === "dire") {
        return inBottomLane(xPosGrid, yPosGrid);
      } else {
        return false;
      }
    },
  },
  {
    // Pulling timing for radiant offlane
    title: "PullingTopLaneRadiant",
    category: "Pulling",
    audioFile: "general/Pulling",
    messageTime: [1 * 60 + 9],
    repeatTime: 30,
    repetitions: 18,
    textMessage: "Pull",
    audience: [Audience.ROLE_SUPPORT],
    position: (xPos: number, yPos: number, team: string): boolean => {
      const { xPosGrid, yPosGrid } = getGridPositions(xPos, yPos);

      /*const xPosGrid = Math.floor((xPos + 8192) / 1024);
      const yPosGrid = Math.floor((yPos + 8192) / 1024);*/
      if (team === "radiant") {
        return inTopLane(xPosGrid, yPosGrid);
      } else {
        return false;
      }
    },
  },
  {
    // Pulling timing for dire safelane
    title: "PullingTopLaneDire",
    category: "Pulling",
    audioFile: "general/Pulling",
    messageTime: [1 * 60 + 5],
    repeatTime: 30,
    repetitions: 18,
    textMessage: "Pull",
    audience: [Audience.ROLE_SUPPORT],
    position: (xPos: number, yPos: number, team: string): boolean => {
      const { xPosGrid, yPosGrid } = getGridPositions(xPos, yPos);

      /*      const xPosGrid = Math.floor((xPos + 8192) / 1024);
      const yPosGrid = Math.floor((yPos + 8192) / 1024);*/
      if (team === "dire") {
        return inTopLane(xPosGrid, yPosGrid);
      } else {
        return false;
      }
    },
  },

  // NeutralItems
  {
    category: "NeutralItems",
    audioFile: "general/NeutralItemsTier1",
    messageTime: 7 * 60 - 2,
    turboTime: 3 * 60 + 30 - 2,
    textMessage: "Neutral items tier 1 are available now",
    audience: [Audience.ALL],
  },
  {
    category: "NeutralItems",
    audioFile: "general/NeutralItemsTier2",
    messageTime: 17 * 60 - 2,
    turboTime: 8 * 60 + 30 - 2,
    textMessage: "Neutral items tier 2 are available now",
    audience: [Audience.ALL],
  },
  {
    category: "NeutralItems",
    audioFile: "general/NeutralItemsTier3",
    messageTime: 27 * 60 - 2,
    turboTime: 13 * 60 + 30 - 2,
    textMessage: "Neutral items tier 3 are available now",
    audience: [Audience.ALL],
  },
  {
    category: "NeutralItems",
    audioFile: "general/NeutralItemsTier4",
    messageTime: 37 * 60 - 2,
    turboTime: 18 * 60 + 30 - 2,
    textMessage: "Neutral items tier 4 are available now",
    audience: [Audience.ALL],
  },
  {
    category: "NeutralItems",
    audioFile: "general/NeutralItemsTier5",
    messageTime: 60 * 60 - 2,
    turboTime: 30 * 60 - 2,
    textMessage: "Neutral items tier 5 are available now",
    audience: [Audience.ALL],
  },

  // Smoke of Deceit
  {
    category: "SmokeOfDeceit",
    audioFile: "general/SmokeOfDeceit1",
    messageTime: 5 * 60 + 30 - 1,
    turboTime: 6 * 60 - 1,
    textMessage: "Smoke of deceit is available in the shop",
    audience: [Audience.ALL],
  },
  {
    category: "SmokeOfDeceit",
    audioFile: "general/SmokeOfDeceit2",
    messageTime: [15 * 60 + 10, 30 * 60 + 10, 45 * 60 + 10, 60 * 60 + 10],
    textMessage: "Check if smoke of deceit is available in the shop",
    audience: [Audience.ALL],
  },

  // Tome of Knowledge - Removed in patch 7.33
  /*{
    category: "TomeOfKnowledge",
    audioFile: "general/TomeOfKnowledge2", // Named #2 to avoid caching issues
    messageTime: 10 * 60 - 10,
    turboTime: 10 * 60 + 30 - 10,
    repeatTime: 10 * 60,
    textMessage: "Tome of knowledge will be available soon",
    audience: [Audience.ALL],
  },*/

  // Aghanim's Shard
  {
    category: "AghanimsShard",
    audioFile: "general/AghanimsShard",
    messageTime: 15 * 60 - 2,
    turboTime: 7 * 60 + 30 - 2,
    textMessage: "Aghanim's Shard is available in the shop",
    audience: [Audience.ALL],
  },

  /**
   * Lane creeps.
   *
   * Flagbearer creeps are only reported until the 12 minutes mark.
   *
   * User can configure 4 variants:
   *
   *    Variant     Siege     Flagbearer
   *    -------     -----     ----------
   *       1         yes         yes
   *       2         yes         no
   *       3         no          yes
   *       4         no          no
   *
   */
  // Variant 2
  /*{
    category: 'SiegeCreeps',
    audioFile: 'general/SiegeCreeps',
    messageTime: 5 * 60,
    repeatTime: 5 * 60,
    textMessage: 'Siege creeps just spawned',
    audience: [Audience.ALL],
  },*/
  // Variant 1
  {
    category: "SiegeFlagCreeps",
    audioFile: "general/SiegeFlagCreeps", // Flagbearer
    messageTime: 5 * 60,
    repeatTime: 5 * 60,
    textMessage: "Siege and flagbaerer creeps just spawned",
    audience: [Audience.ALL],
  },
  // Variant 2
  {
    category: "SiegeCreepsNoFlag",
    audioFile: "general/SiegeCreeps",
    messageTime: 5 * 60,
    repeatTime: 5 * 60,
    textMessage: "Siege creeps just spawned",
    audience: [Audience.ALL],
  },
  // Variant 3
  {
    category: "FlagCreepsNoSiege",
    audioFile: "general/FlagCreeps", // Flagbearer
    messageTime: [5 * 60, 10 * 60],
    textMessage: "Flagbaerer creeps just spawned",
    audience: [Audience.ALL],
  },
  // Variant 1 & 3
  {
    category: "FlagCreeps",
    audioFile: "general/FlagCreeps", // Flagbearer
    messageTime: [
      2 * 60,
      3 * 60,
      4 * 60,
      6 * 60,
      7 * 60,
      8 * 60,
      9 * 60,
      11 * 60,
      12 * 60,
    ],
    textMessage: "Flagbaerer creeps just spawned",
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

  // 1. Abaddon
  {
    category: "OwnHero",
    npcHeroName: "abaddon",
    audioFile: "ownHero/Abaddon_1_AphoticShield",
    messageTime: 10,
    textMessage: `Apply Aphotic Shield pre-emptively on yourself as you are coming to lane after rune fight. Apply another as the previous one expires to inflict great AoE damage. Pull afterwards.`,
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "abaddon_aphotic_shield" },
  },
  // Alex: Not sure I understand this one. Maybe we can refurmulate
  {
    category: "OwnHero",
    npcHeroName: "abaddon",
    audioFile: "ownHero/Abaddon_2_Support",
    messageTime: 30,
    textMessage: `Play ahead of the Core you are supporting to absorb damage and trade regen.`,
    audience: [Audience.ROLE_SUPPORT],
  },
  // Alex: What do you mean by 'absorb attention'?
  {
    category: "OwnHero",
    npcHeroName: "abaddon",
    audioFile: "ownHero/Abaddon_3_Salve",
    messageTime: 45,
    textMessage:
      "Salve or clarity won't be canceled while you have Apothic Shield on.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abaddon_aphotic_shield" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abaddon",
    audioFile: "ownHero/Abaddon_4_BorrowedTime1",
    messageTime: 6 * 60,
    repeatTime: 12 * 60,
    textMessage:
      "If someone applies a break effect on you, you will have to trigger Borrowed Time manually.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abaddon_borrowed_time" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abaddon",
    audioFile: "ownHero/Abaddon_5_Disables",
    messageTime: 8 * 60,
    repeatTime: 8 * 60,
    textMessage: `If you got disabled along with your teammate you can pop Borrowed Time to remove stun off yourself and then apply Aphotic Shield on a stunned ally to free him as well.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "abaddon_aphotic_shield" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abaddon",
    audioFile: "ownHero/Abaddon_6_BorrowedTime2",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "You can position more aggressively than rest of your team, as opponents usually don't want to go on you due to Borrowed Time.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "ability", name: "abaddon_borrowed_time" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abaddon",
    audioFile: "ownHero/Abaddon_7_Dispel",
    messageTime: 20 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Constantly look at your teammates to heal or hard dispel them.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "abaddon",
    audioFile: "ownHero/Abaddon_8_Silences",
    messageTime: [16 * 60, 24 * 60],
    textMessage:
      "Silences and heal reductions are a big problems for Abaddon. Avoid being hit by those or itemize against them.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "abaddon",
    audioFile: "ownHero/Abaddon_9__Scepter",
    messageTime: 22 * 60,
    textMessage:
      "With Aghanim's Scepter, you will need to activate your Ultimate manually, while most of the damage is being inflicted on your teammates.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "abaddon",
    audioFile: "enemyHero/Abaddon_1_AphoticShieldDispel",
    messageTime: -60,
    textMessage:
      "Abaddon's Aphothic Shield applies strong dispel. Use disabling and damage-over-time dispellable spells only after the shield was used.",
    chatMessage:
      "Aphothic Shield applies strong dispel. Use dispellable spells after the shield was used.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abaddon_aphotic_shield" },
  },
  /* {
    category: "EnemyHero",
    npcHeroName: "abaddon",
    audioFile: "enemyHero/Abaddon_2_CurseOfAvernus",
    messageTime: -50,
    textMessage:
      "It takes four attacks from Abaddon's Curse of Avernus to silence and slow you significantly.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abaddon_frostmourne" },
  }, */
  {
    category: "EnemyHero",
    npcHeroName: "abaddon",
    audioFile: "enemyHero/Abaddon_3_AphoticShieldDamage",
    messageTime: -40,
    textMessage:
      "If you are in the fog, exploding Aphotic Shield won't damage you.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "abaddon_aphotic_shield" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "abaddon",
    audioFile: "enemyHero/Abaddon_4_BurrowedTime",
    messageTime: 8 * 60,
    textMessage:
      "Abaddon's Ulti Burrowed Time applies strong dispel and heals Abaddon for all damage taken. Don't hit him.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abaddon_aphotic_shield" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "abaddon",
    audioFile: "enemyHero/Abaddon_5_Break",
    messageTime: 8 * 60 + 10,
    textMessage:
      "Break effects make Burrowed Time not start automatically. But Abaddon can still activate it manually.",
    audience: [Audience.ALL],
    image: { type: "item", name: "silver_edge" },
  },

  // 2. Alchemist
  {
    category: "OwnHero",
    npcHeroName: "alchemist",
    audioFile: "ownHero/Alchemist_1_BountyRunes",
    messageTime: -30,
    textMessage:
      "Collecting Bounty Runes is very important for Alchemist. Let your team know when the bounty runes are about to spawn.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "alchemist",
    audioFile: "ownHero/Alchemist_unstable_concoction_1",
    messageTime: 0,
    textMessage:
      "Use unstable concoction to secure last hits on range creeps and harras the opponent in the early stages of the lane.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "alchemist",
    audioFile: "ownHero/Alchemist_3_Stacks",
    messageTime: 5 * 60,
    textMessage:
      "Alchemist prefers to farm huge amounts of easy to kill creeps. Avoid farming Ancients until you can kill them reasonably fast. Ask your team to stack smaller camps.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "alchemist",
    audioFile: "ownHero/Alchemist_4_Dispel",
    messageTime: 6 * 60,
    textMessage:
      "Chemical Rage applies dispel on cast, same as Berserker's Potion. You can use them to dispel Spirit Vessel or other dispellable spells and items.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "alchemist",
    audioFile: "ownHero/Alchemist_5_GreevilsGreed2",
    messageTime: 8 * 60,
    textMessage:
      "Whilst farming, show yourself on lanes the least possible and don't waste your Greevil's Greed stacks by hitting buildings for too long.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "alchemist",
    audioFile: "ownHero/Alchemist_6_Items",
    messageTime: 15 * 60,
    textMessage:
      "Blink Dagger or Shadow Blade allow you to cast fully channeled Unstable Concoction more easily.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "alchemist",
    audioFile: "ownHero/Alchemist_7_Scepter",
    messageTime: 20 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "Once you get closer to being 6 slotted, consider giving Aghanim's Scepter upgrades to your teammates. You might do that even earlier, if the Scepter upgrades on your allies have great impact.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "alchemist",
    audioFile: "ownHero/Alchemist_8_MidGame",
    messageTime: [25 * 60, 35 * 60],
    textMessage:
      "Alchemist tends to fall off as the game goes. Look to close the game by the 40 min mark.",
    audience: [Audience.ROLE_CORE],
  },

  {
    category: "EnemyHero",
    npcHeroName: "alchemist",
    audioFile: "enemyHero/Alchemist_1_SpiritVessel",
    messageTime: -60,
    textMessage:
      "Someone should buy spirit Vessel against Alchemist's HP regen from Chemical Rage",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "alchemist",
    audioFile: "enemyHero/Alchemist_2_NeutralCamps",
    messageTime: 2 * 60 + 10,
    textMessage: "Block neutral camps with wards against Alchemist",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "alchemist",
    audioFile: "enemyHero/Alchemist_3_Gank",
    messageTime: 2 * 60 + 40,
    textMessage: "Don't forget to gank Alchemist",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "alchemist",
    audioFile: "enemyHero/Alchemist_4_BountyRunes",
    messageTime: [-30, 4 * 60 + 30],
    textMessage:
      "Alchemist gets additional gold from bouty runes. Make sure he doesn't get any",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "alchemist",
    audioFile: "enemyHero/Alchemist_5_Jungling",
    messageTime: 5 * 60 + 50,
    textMessage: "Contest Alchemist while he is jungling",
    audience: [Audience.ALL],
  },

  // 3. Ancient Apparition
  {
    category: "OwnHero",
    npcHeroName: "ancient_apparition",
    audioFile: "ownHero/AncientAppartion_1_RightClick",
    messageTime: -30,
    textMessage: `Make maximum use of your high attack range and Chilling Touch to harass in the lane without aggroing lane creeps.`,
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "ancient_apparition_chilling_touch" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ancient_apparition",
    audioFile: "ownHero/AncientAppartion_2_ColdFeet",
    messageTime: -15,
    textMessage: `Use Cold Feet when it is likely to stun, for example, after your laning partner applies a disable or slow, or just before the opponent wants to last hit a creep.`,
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "ancient_apparition_cold_feet" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ancient_apparition",
    audioFile: "ownHero/AncientAppartion_3_IceVortex",
    messageTime: [4 * 60 + 10, 14 * 60 + 10, 24 * 60 + 10],
    textMessage: `Ice Vortex can be used to provide vision on top of pillars or in Roshan pit.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "ancient_apparition_ice_vortex" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ancient_apparition",
    audioFile: "ownHero/AncientAppartion_4_Antihealing",
    messageTime: 8 * 60 + 10,
    repeatTime: 10 * 60,
    textMessage:
      "Prioritize Ice Blasting heroes high on healing and with big health pool.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ancient_apparition_ice_blast" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ancient_apparition",
    audioFile: "ownHero/AncientAppartion_5_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Grab Aghanims Shard at 15 minute mark as it gives you a massive area of effect stun with Ice Blast.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ancient_apparition",
    audioFile: "ownHero/AncientAppartion_6_Farming",
    messageTime: 16 * 60,
    textMessage:
      "When not much is happening on the map, use Ice Vortex to farm creep waves without showing yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ancient_apparition_ice_vortex" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "ancient_apparition",
    audioFile: "enemyHero/AncientAppartion_1_ColdFeet",
    messageTime: -60,
    textMessage:
      "When Ancient Apparition's Cold Feet is used on you, move away 715 distance or you will get stunned.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ancient_apparition",
    audioFile: "enemyHero/AncientAppartion_2_IceBlastHealing",
    messageTime: 8 * 60,
    textMessage:
      "Ancient's Ice Blast negates all healing. Avoid using healing items when affected by it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ancient_apparition",
    audioFile: "enemyHero/AncientAppartion_3_IceBlastResistance",
    messageTime: 8 * 60 + 10,
    textMessage:
      "Ice Blast goes through spell immunity but is offset by magic resistance and magic barrier items.",
    audience: [Audience.ALL],
  },

  // 4. Anti-Mage
  {
    category: "OwnHero",
    npcHeroName: "antimage",
    audioFile: "ownHero/AntiMage_1_Laning",
    messageTime: 10,
    textMessage:
      "Keep your health high in lane with sustain. Get your cornucopia as soon as you can if you are playing a heavy harass lane.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "cornucopia" },
  },
  {
    category: "OwnHero",
    npcHeroName: "antimage",
    audioFile: "ownHero/AntiMage_2_BurnMana",
    messageTime: 20,
    textMessage:
      "Hit opponents and burn their mana whenever you can, for example when they go for a last hit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "antimage_mana_break" },
  },
  {
    category: "OwnHero",
    npcHeroName: "antimage",
    audioFile: "ownHero/AntiMage_3_BurnMana",
    messageTime: [2 * 60, 7 * 60],
    textMessage:
      "Play safe and acquire Battle Fury as early as possible. Your farming speed goes up exponentially with it.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "bfury" },
  },
  {
    category: "OwnHero",
    npcHeroName: "antimage",
    audioFile: "ownHero/AntiMage_4_LookAround",
    messageTime: [7 * 60 + 45, 13 * 60 + 45],
    textMessage:
      "Look around the map while you are farming to dodge the ganks but also to potentially snipe a kill with Mana Void.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "antimage_mana_void" },
  },
  {
    category: "OwnHero",
    npcHeroName: "antimage",
    audioFile: "ownHero/AntiMage_5_PlantWards",
    messageTime: [8 * 60 + 15, 14 * 60 + 15],
    textMessage: "Plant wards for yourself in the area you are farming.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "antimage",
    audioFile: "ownHero/AntiMage_6_PushLane",
    messageTime: [10 * 60 + 15, 13 * 60 + 45],
    textMessage:
      "Keep a lane pushed out to apply some pressure on the map. If you expect to be ganked, Blink into trees and teleport to the opposite side of the map.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "antimage_blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "antimage",
    audioFile: "ownHero/AntiMage_7_Aghanims",
    messageTime: 18 * 60 + 15,
    textMessage:
      "Once you get your Aghanim's Scepter, play more actively and join most of the fights. Prioritize killing backliners and supports.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "antimage",
    audioFile: "ownHero/AntiMage_8_CutWaves",
    messageTime: 18 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Wehenever your teammates die consider cutting a wave behind the opponents or push out some other lane.",
    audience: [Audience.ROLE_CORE],
  },

  {
    category: "EnemyHero",
    npcHeroName: "antimage",
    audioFile: "enemyHero/AntiMage_1_Laning",
    messageTime: 50,
    textMessage:
      "Anti-Mage is a weak laner, so look to pressure him from the start",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "antimage",
    audioFile: "enemyHero/AntiMage_2_UseMana",
    messageTime: 1 * 60 + 30,
    textMessage: "Look to spend your mana before it gets burned by Anti-Mage",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "energy_booster" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "antimage",
    audioFile: "enemyHero/AntiMage_3_GetMana",
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
    npcHeroName: "antimage",
    audioFile: "enemyHero/AntiMage_4_Jungling",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Look to disrupt Anti-Mage's jungling by placing deep wards and smoking on him. Anti-Mage is weak until he gets Manta Style",
    chatMessage:
      "Disrupt Anti-Mage's jungling by placing deep wards and smoking on him. He is weak until he gets Manta Style",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "antimage",
    audioFile: "enemyHero/AntiMage_5_BootsOfTravel",
    messageTime: 15 * 60 + 30,
    textMessage:
      "Consider getting Boots of Travel on one of the cores to address Anti-Mange's split push playstyle",
    audience: [Audience.ALL],
    image: { type: "item", name: "travel_boots" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "antimage",
    audioFile: "enemyHero/AntiMage_6_TeamFights",
    messageTime: [22 * 60 + 30, 32 * 60 + 30, 42 * 60 + 30, 52 * 60 + 30],
    textMessage:
      "In team fights look to save the hero that Anti-Mage jumps on. But be careful as you might blow up too if you get too close to a Mana Voided hero",
    chatMessage:
      "In team fights save hero that Anti-Mage jumps on, but stay away if hero gets Mana Voided",
    audience: [Audience.ALL],
    image: { type: "ability", name: "antimage_mana_void" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "antimage",
    audioFile: "enemyHero/AntiMage_7_LateGame",
    messageTime: 35 * 60 + 30,
    textMessage:
      "Anti-Mage is strong mid- to late-game as he can farm rapidly, but he is not that strong in very late game",
    audience: [Audience.ALL],
  },

  // 5. Arc Warden
  {
    category: "OwnHero",
    npcHeroName: "arc_warden",
    audioFile: "ownHero/ArcWarden_1_LastHit",
    messageTime: -30,
    textMessage:
      "Make use of Spark Wraiths to secure creep last hits, especially ranged creep.",
    audience: [Audience.IN_LANE, Audience.ROLE_CORE],
    image: { type: "ability", name: "arc_warden_spark_wraith" },
  },
  {
    category: "OwnHero",
    npcHeroName: "arc_warden",
    audioFile: "ownHero/ArcWarden_2_Flux",
    messageTime: -15,
    textMessage:
      "If an opponent splits away from creeps or his ally, you can Flux him and follow up with right-clicks and Spark Wraiths.",
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "arc_warden_flux" },
  },
  {
    category: "OwnHero",
    npcHeroName: "arc_warden",
    audioFile: "ownHero/ArcWarden_3_Scout",
    messageTime: [6 * 60, 11 * 60, 16 * 60],
    textMessage:
      "Use Spark Wraiths to scout the opponents and protect yourself while farming.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "arc_warden_spark_wraith" },
  },
  {
    category: "OwnHero",
    npcHeroName: "arc_warden",
    audioFile: "ownHero/ArcWarden_4_Feed",
    messageTime: [8 * 60, 16 * 60, 24 * 60],
    textMessage:
      "Make sure not to feed Tempest Double to opponents as it gives away a lot of gold and experience.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "arc_warden_tempest_double" },
  },
  {
    category: "OwnHero",
    npcHeroName: "arc_warden",
    audioFile: "ownHero/ArcWarden_5_Splitpush",
    messageTime: [9 * 60, 17 * 60],
    textMessage:
      "Use Tempest Double as frequently as possible to split push the sidelanes and damage buildings.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "arc_warden_tempest_double" },
  },
  {
    category: "OwnHero",
    npcHeroName: "arc_warden",
    audioFile: "ownHero/ArcWarden_6_AvoidFighting",
    messageTime: [10 * 60, 18 * 60],
    textMessage:
      "Avoid being part of the teamfights from the very start until you get first major item that will tank you up.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "arc_warden",
    audioFile: "ownHero/ArcWarden_7_Punish",
    messageTime: 13 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Whenever opponents teleport back on a hero or two to address your split push, look to fight the remaining opponents, smoke up or take Roshan.",
    audience: [Audience.ROLE_CORE],
  },

  {
    category: "EnemyHero",
    npcHeroName: "arc_warden",
    audioFile: "enemyHero/ArcWarden_1_Flux",
    messageTime: -60,
    textMessage:
      "Arc Warden's Flux does no damage to you if you are close to another unit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "arc_warden_flux" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "arc_warden",
    audioFile: "enemyHero/ArcWarden_2_SparkWraith",
    messageTime: 7 * 60,
    textMessage:
      "Arc Wardens Tempest Spark Wraith takes two seconds to charge which gives you time to dodge it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "arc_warden_spark_wraith" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "arc_warden",
    audioFile: "enemyHero/ArcWarden_3_MagneticField",
    messageTime: -40,
    textMessage:
      "Units inside Arc's Warden's Magnetic Field can be hit if you are inside of it or have evasion piercing items.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "arc_warden_magnetic_field" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "arc_warden",
    audioFile: "enemyHero/ArcWarden_4_Pressure",
    messageTime: 30,
    textMessage: "Arc Warden is a weak laner. Pressure him early on.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "arc_warden",
    audioFile: "enemyHero/ArcWarden_5_TempestDouble",
    messageTime: 8 * 60,
    textMessage:
      "Arc Warden's Tempest Double gives a lot of gold and experience. Kill it if possible.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "arc_warden_tempest_double" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "arc_warden",
    audioFile: "enemyHero/ArcWarden_6_Gank",
    messageTime: 8 * 60 + 10,
    textMessage:
      "Arc Warden farms the jungle a lot. Plant deep wards and gank him. Also block off camps with sentries.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_dispenser" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "arc_warden",
    audioFile: "enemyHero/ArcWarden_7_GapClosing",
    messageTime: 12 * 60,
    textMessage: "Buy gap closing items to get on top of Arc Warden.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "arc_warden",
    audioFile: "enemyHero/ArcWarden_8_BootsOfTravel",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Boots of Travel allow to defend against Arc Warden's split-pushing and to quickly rejoin the team.",
    audience: [Audience.ALL],
    image: { type: "item", name: "travel_boots" },
  },

  // 6. Axe
  {
    category: "OwnHero",
    npcHeroName: "axe",
    audioFile: "ownHero/Axe_1_BattleHunger",
    messageTime: -30,
    textMessage:
      "Use Battle Hunger on the enemy carry just when the lane meets because the creeps are full HP, or use it on the enemy support in order to help your support win the trades..",
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "axe_battle_hunger" },
  },
  {
    category: "OwnHero",
    npcHeroName: "axe",
    audioFile: "ownHero/Axe_2_CounterHelix",
    messageTime: -15,
    textMessage:
      "It is good to fight the opponents while you are surrounded by enemy creeps to proc Counter Helix with more attacks. If needed, toggle creep aggro to force Counter Helix when fighting",
    audience: [Audience.ALL],
    image: { type: "ability", name: "axe_counter_helix" },
  },
  {
    category: "OwnHero",
    npcHeroName: "axe",
    audioFile: "ownHero/Axe_3_CreepSkipping",
    messageTime: [5 * 60, 6 * 60 + 30],
    textMessage:
      "If you can't pressure opponents' carry on the lane, consider creep skiping and farming neutrals in their jungle past 5 minute mark.",
    audience: [Audience.IN_LANE, Audience.ROLE_OFFLANE],
  },
  {
    category: "OwnHero",
    npcHeroName: "axe",
    audioFile: "ownHero/Axe_4_Stacks",
    messageTime: [5 * 60 + 15, 7 * 60 + 15],
    textMessage:
      "Encourage your supports to stack for you as you can clear stacks very quickly and early.",
    audience: [Audience.IN_LANE, Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "axe",
    audioFile: "ownHero/Axe_5_FarmDagger",
    messageTime: [8 * 60, 10 * 60],
    textMessage:
      "Don't roam around too much. Focus on getting Blink Dagger timely.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "axe",
    audioFile: "ownHero/Axe_6_RunFaster",
    messageTime: 9 * 60,
    repeatTime: 10 * 60,
    textMessage: "Use Battle Hunger on creeps to run around faster.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "axe_battle_hunger" },
  },
  {
    category: "OwnHero",
    npcHeroName: "axe",
    audioFile: "ownHero/Axe_7_BlinkDagger",
    messageTime: 10 * 60 + 15,
    textMessage:
      "Once you acquire Blink Dagger, try to make use of it immediately and avoid showing yourself on the map too often. Comboing it with Blademail usually results in easy kills.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "axe",
    audioFile: "ownHero/Axe_8_Illusions",
    messageTime: [11 * 60 + 45, 19 * 60 + 45],
    textMessage:
      "Grab illusion runes and make use of illusions to push out lanes as Counter Helix works on them as well.",
    audience: [Audience.ALL],
    image: { type: "rune", name: "illusion" },
  },
  {
    category: "OwnHero",
    npcHeroName: "axe",
    audioFile: "ownHero/Axe_9_FollowUp",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "When initiating, make sure you have allies that deal damage nearby.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "axe",
    audioFile: "enemyHero/Axe_1_BattleHunger",
    messageTime: -60,
    textMessage: "Axe's Battle Hunger can be removed by getting a creep kill.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "axe_battle_hunger" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "axe",
    audioFile: "enemyHero/Axe_2_CounterHelix",
    messageTime: -50,
    textMessage:
      "Avoid being close to Axe if you have bunch of allied or neutral creeps next to you.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "axe_counter_helix" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "axe",
    audioFile: "enemyHero/Axe_3_CreepSkipping",
    messageTime: 5 * 60,
    textMessage: "Bring an extra hero to gank Axe if he starts creep-skipping.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "axe",
    audioFile: "enemyHero/Axe_4_BlinkBladeMail",
    messageTime: 12 * 60,
    textMessage:
      "Keep checking Axe's items. Be aware of his Blink Dagger and Blade Mail timing.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "axe",
    audioFile: "enemyHero/Axe_5_ClumpUp",
    messageTime: [12 * 60 + 10, 22 * 60 + 20, 32 * 60 + 20],
    textMessage: "Don't clump up in teamfights or Axe will kill you all!",
    audience: [Audience.ALL],
    image: { type: "ability", name: "axe_berserkers_call" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "axe",
    audioFile: "enemyHero/Axe_6_Euls",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Consider buying an Eul's Scepter to use it on Axe quickly after he jumps your allies.",
    audience: [Audience.ALL],
    image: { type: "item", name: "cyclone" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "axe",
    audioFile: "enemyHero/Axe_7_LifestealStatusResistance",
    messageTime: 12 * 60 + 30,
    textMessage:
      "On Cores, Lifesteal and status resistance items are good against Axe's Call and Blade Mail combo.",
    audience: [Audience.ALL],
  },

  // 7. Bane
  {
    category: "OwnHero",
    npcHeroName: "bane",
    audioFile: "ownHero/Bane_1_NightVision",
    messageTime: [-30, 5 * 60],
    textMessage: "Bane has improved night vision.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "bane",
    audioFile: "ownHero/Bane_2_Trading",
    messageTime: -15,
    textMessage:
      "Bane is great at trading due to great baseline stats and Brain Sap to regain some health.",
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "bane_brain_sap" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bane",
    audioFile: "ownHero/Bane_3_NightmareSetup",
    messageTime: [1 * 60, 4 * 60],
    textMessage:
      "If an opponent is below 50%, you can Nightmare him and allow your core to come forward and finish the hero along with you.",
    audience: [Audience.IN_LANE, Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "bane_nightmare" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bane",
    audioFile: "ownHero/Bane_4_NightmareSave",
    messageTime: 2 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Nightmare provides 1 second of invulnerability and thus you can save an ally in trouble or dodge a spell.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bane_nightmare" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "bane",
    audioFile: "ownHero/Bane_5_Enfeeble",
    messageTime: [8 * 60 + 15, 18 * 60 + 15, 28 * 60 + 15],
    textMessage:
      "Enfeeble is improved version of Spirit Vessel as it reduces healing and regeneration significantly aside from damage reduction.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bane_enfeeble" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "bane",
    audioFile: "ownHero/Bane_6_SetupKills",
    messageTime: 9 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Bane is great for setting up kills. Nightmare and Fiend's Grip combined provide up to 13 seconds of disable.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bane_fiends_grip" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bane",
    audioFile: "ownHero/Bane_7_ChannelingCast",
    messageTime: [9 * 60 + 30, 18 * 60 + 30, 28 * 60 + 30],
    textMessage:
      "You can unsleep or cast Glimmer Cape during Fiend's Grip without canceling it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bane_fiends_grip" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bane",
    audioFile: "ownHero/Bane_8_AvoidShowing",
    messageTime: 10 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing yourself at the start of the teamfight. Let opponents focus your allies so you can get your spells off easier.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "bane",
    audioFile: "ownHero/Bane_9_AghsFiendsGrip",
    messageTime: 32 * 60,
    textMessage:
      "Once you have Aghanims Scepter, you can cancel Fiends Grip channel with your hero without interrupting the ability.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "bane",
    audioFile: "enemyHero/Bane_1_StrongLaner",
    messageTime: -60,
    textMessage:
      "Bane is a strong laner and good at trading hits and regaining health with Brain Sap. Bring extra consumables.",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "flask" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bane",
    audioFile: "enemyHero/Bane_2_Nightmare",
    messageTime: -50,
    textMessage:
      "You can unsleep an ally affected by Bane's Nightmare by attacking that ally.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bane_nightmare" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bane",
    audioFile: "enemyHero/Bane_3_FiendsGrip",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Look to cancel Bane's Fiend's Grip in fights as it is a long lasting disable.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bane_fiends_grip" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bane",
    audioFile: "enemyHero/Bane_4_TargetableSpells",
    messageTime: 12 * 60,
    textMessage:
      "Lotus Orb, Linken's Sphere and status resistance items are good at countering Bane's spells.",
    audience: [Audience.ALL],
  },
  /* {
    category: "EnemyHero",
    npcHeroName: "bane",
    audioFile: "enemyHero/Bane_5_Enfeeble",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Avoid overpurchasing healing and regenerating items as Bane's Enfeeble reduces their effect.",
    audience: [Audience.ALL],
  }, */

  // 8. Batrider
  {
    category: "OwnHero",
    npcHeroName: "batrider",
    audioFile: "ownHero/Batrider_1_StickyNapalmDamage",
    messageTime: -30,
    textMessage:
      "Apply Sticky Napalm on opponents but also on the creeps at the same time. Batrider's base damage is very low.",
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "batrider_sticky_napalm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "batrider",
    audioFile: "ownHero/Batrider_2_KillAttempt",
    messageTime: 4 * 60,
    textMessage:
      "When you have 3 Sticky Napalms on an opponent, you can consider making a kill attempt.",
    audience: [Audience.IN_LANE, Audience.ALL],
    image: { type: "ability", name: "batrider_sticky_napalm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "batrider",
    audioFile: "ownHero/Batrider_3_Dive",
    messageTime: 2 * 60,
    textMessage:
      "Having Bottle charges, Faerie Fire or Healing Salve can allow you to dive under the tower.",
    audience: [Audience.IN_LANE, Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "batrider",
    audioFile: "ownHero/Batrider_4_Stacks",
    messageTime: [3 * 60, 5 * 60],
    textMessage:
      "Batrider is good at clearing stacks early on. Encourage your teammates to make them for you.",
    audience: [Audience.IN_LANE, Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "batrider",
    audioFile: "ownHero/Batrider_5_BootsOfTravel",
    messageTime: 6 * 60,
    textMessage:
      "Focus on acquiring Boots of Travel and then start playing more actively.",
    audience: [Audience.IN_LANE, Audience.ROLE_CORE],
    image: { type: "item", name: "travel_boots" },
  },
  {
    category: "OwnHero",
    npcHeroName: "batrider",
    audioFile: "ownHero/Batrider_6_FlyingVision",
    messageTime: [6 * 60 + 30, 16 * 60 + 30, 26 * 60 + 30],
    textMessage: "Sticky Napalm provides flying vision in its area of effect.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "batrider",
    audioFile: "ownHero/Batrider_7_AghanimShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanim shard later in the game as you become a potent right clicker as a universal hero.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "batrider",
    audioFile: "ownHero/Batrider_8_StickyNapalmUsage",
    messageTime: 15,
    textMessage:
      "Spam Sticky Napalm on the enemy mid laner to keep them low at all times. You need not worry about giving stick charges.",
    audience: [Audience.ROLE_MID],
    image: { type: "ability", name: "batrider_sticky_napalm" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "batrider",
    audioFile: "enemyHero/Batrider_1_StickWand",
    messageTime: -60,
    textMessage:
      "Magic Stick and Wand are great items against Batrider's Sticky Napalm spam.",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "magic_stick" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "batrider",
    audioFile: "enemyHero/Batrider_2_StickyNapalm",
    messageTime: -50,
    textMessage:
      "If you have 3 or more stacks of Sticky Napalm be careful or back away to allow them to expire.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "batrider_sticky_napalm" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "batrider",
    audioFile: "enemyHero/Batrider_3_LotusLinkens",
    messageTime: 12 * 60,
    textMessage:
      "Lotus Orb and Linken's Sphere are good at countering Batrider's Flaming Lasso.",
    audience: [Audience.ALL],
  },

  // 9. Beastmaster
  /* {
    category: "OwnHero",
    npcHeroName: "beastmaster",
    audioFile: "ownHero/Beastmaster_1_HelmOfIronWill",
    messageTime: -90,
    textMessage:
      "Save some of your starting gold to get Helm of Iron Will as soon as possible.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "helm_of_iron_will" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "beastmaster",
    audioFile: "ownHero/Beastmaster_2_BoarCounters",
    messageTime: 1 * 60,
    textMessage:
      "If laning against Chen, Enchantress or Crystal Maiden, consider not summoning Boars as they deal with summons easily.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "beastmaster_call_of_the_wild_boar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "beastmaster",
    audioFile: "ownHero/Beastmaster_3_SaveBoars",
    messageTime: 10,
    textMessage:
      "Make sure not to feed boars to opponents. Deny them or move them away when they're low on hp.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "beastmaster_call_of_the_wild_boar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "beastmaster",
    audioFile: "ownHero/Beastmaster_4_HawkRoot",
    messageTime: 1 * 60 + 15,
    textMessage:
      "Keep the hawk out to always have a form of lockdown on enemy heroes close to you.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "beastmaster_call_of_the_wild_hawk" },
  },
  {
    category: "OwnHero",
    npcHeroName: "beastmaster",
    audioFile: "ownHero/Beastmaster_5_HighDamage",
    messageTime: 30,
    textMessage:
      "Utilize Beasmaster's high base damage and additional damage from boars to deny creeps and secure last hits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "beastmaster_call_of_the_wild_boar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "beastmaster",
    audioFile: "ownHero/Beastmaster_6_Catapults",
    messageTime: [5 * 60, 10 * 60],
    textMessage:
      "Make use of catapult waves to pressure the tower along with your summons.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "beastmaster",
    audioFile: "ownHero/Beastmaster_7_Powerspike",
    messageTime: 6 * 60,
    textMessage: `The biggest early powerspike on Beastmaster is Veil of Discord and level 6 timing. Look to score a kill and take tower down.`,
    audience: [Audience.ALL],
    image: { type: `item`, name: `veil_of_discord` },
  },
  {
    category: "OwnHero",
    npcHeroName: "beastmaster",
    audioFile: "ownHero/Beastmaster_8_FarmAggressively",
    messageTime: [9 * 60, 11 * 60],
    textMessage:
      "You can farm aggressively since you have hawk's root to protect you and summons to farm those camps safely.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "beastmaster",
    audioFile: "ownHero/Beastmaster_9_PushSidelanes",
    messageTime: [13 * 60, 15 * 60],
    textMessage: `Push out sidelanes with summons, especially if you control Helm of the Overlord creep, Black Dragon ideally.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "helm_of_the_overlord" },
  },
  {
    category: "OwnHero",
    npcHeroName: "beastmaster",
    audioFile: "ownHero/Beastmaster_10_Roshan",
    messageTime: 14 * 60 + 45,
    textMessage: "Take first Roshan between 15 and 20 minute mark.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "beastmaster",
    audioFile: "enemyHero/Beastmaster_1_Boars",
    messageTime: -60,
    textMessage:
      "Beastmaster's boars give a lot of gold and experience. Look to kill them.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "beastmaster_call_of_the_wild_boar" },
  },
  /* {
    category: "EnemyHero",
    npcHeroName: "beastmaster",
    audioFile: "enemyHero/Beastmaster_2_HawkSentry",
    messageTime: -50,
    textMessage: "Bring a sentry to the lane to spot and kill Beastmaster's hawks.",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "ward_sentry" },
  }, */
  // {category: "EnemyHero", npcHeroName: "beastmaster", audioFile: "enemyHero/Beastmaster_3_Powerspike", messageTime: (8*60), textMessage: "Be aware of Beastmaster's level 6 and Necrobook level 1's deadly powerspike.", audience: [Audience.IN_LANE]}, |patch 7.29| MESSAGE CHANGED
  {
    category: `EnemyHero`,
    npcHeroName: `beastmaster`,
    audioFile: `enemyHero/Beastmaster_3_Powerspike`,
    messageTime: 8 * 60 + 10,
    textMessage: `Be aware of Beastmaster's level 6 and Helm of the Dominator powerspike if he is not going for Veil of Discord.`,
    audience: [Audience.IN_LANE],
    image: { type: `item`, name: `helm_of_the_dominator` },
  },
  {
    category: "EnemyHero",
    npcHeroName: "beastmaster",
    audioFile: "enemyHero/Beastmaster_4_DefendTowers",
    messageTime: 8 * 60 + 40,
    textMessage:
      "Defend towers against Beastmaster. Otherwise he will invade your jungle after taking towers.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "beastmaster",
    audioFile: "enemyHero/Beastmaster_5_Gank",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Gank Beastmaster with smoke as you get more gold if you kill his summons too.",
    audience: [Audience.ALL],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "beastmaster",
    audioFile: "enemyHero/Beastmaster_6_AntiSummonsItems",
    messageTime: 12 * 60,
    textMessage:
      "Consider buying a Crimson Guard and armor items against Beastmaster.",
    audience: [Audience.ALL],
    image: { type: "item", name: "crimson_guard" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "beastmaster",
    audioFile: "enemyHero/Beastmaster_7_LotusLinkens",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Lotus Orb and Linken's Sphere are good at countering Beastmaster's Primal Roar.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "beastmaster",
    audioFile: "enemyHero/Beastmaster_8_Roshan",
    messageTime: [15 * 60 + 10, 20 * 60 + 10, 25 * 60 + 10],
    textMessage:
      "Beastmaster lineups are good at taking early Roshan. Ward around Roshpit and check.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "beastmaster",
    audioFile: "enemyHero/Beastmaster_9_HawkIsolation",
    messageTime: [9 * 60 + 10, 18 * 60 + 10, 27 * 60 + 10, 36 * 60 + 10],
    textMessage:
      "Avoid walking up to Beastmaster on your own as you might get rooted by hawks and then roared to your death.",
    audience: [Audience.ALL],
  },

  // 10. Bloodseeker
  {
    category: "OwnHero",
    npcHeroName: "bloodseeker",
    audioFile: "ownHero/Bloodseeker_1_BloodRite",
    messageTime: 15,
    textMessage:
      "Use Blood Rite to secure range creep lasthits and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bloodseeker_blood_bath" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bloodseeker",
    audioFile: "ownHero/Bloodseeker_2_MovementSpeed",
    messageTime: [90, 3 * 60],
    textMessage:
      "Keep an eye on your movement speed. If you are fast, you can play more aggressively.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bloodseeker_thirst" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bloodseeker",
    audioFile: "ownHero/Bloodseeker_2_bloodseeker_bloodrage",
    messageTime: [6 * 60],
    textMessage:
      "Max out your bloodrage by around level 7 as this is your main tool for farming and will synergize very nicely with maelstrom.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bloodseeker_bloodrage" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bloodseeker",
    audioFile: "ownHero/Bloodseeker_3_TeleportOut",
    messageTime: [6 * 60, 9 * 60],
    textMessage:
      "The opponents will often attempt to teleport out when you Rupture them. Call for an ally to help you out if you don't have a way of securing the kill yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bloodseeker_rupture" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bloodseeker",
    audioFile: "ownHero/Bloodseeker_3_RuptureTargets",
    messageTime: 15 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Make sure to Rupture high priority targets in the fights, usually mobile cores, especially with Black King Bar.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bloodseeker_rupture" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "bloodseeker",
    audioFile: "enemyHero/Bloodseeker_1_Burst",
    messageTime: -60,
    textMessage:
      "Thirst sustains Bloodseeker. Deal burst of damage to him so he can't lasthit creeps easily and regain HP.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "bloodseeker_thirst" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bloodseeker",
    audioFile: "enemyHero/Bloodseeker_2_HighHP",
    messageTime: -50,
    textMessage:
      "Stay high on HP so that Bloodseeker doesn't become super fast.",
    audience: [Audience.ALL],
    image: { type: "item", name: "flask" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bloodseeker",
    audioFile: "enemyHero/Bloodseeker_3_Rupture",
    messageTime: 8 * 60,
    textMessage:
      "When Ruptured by Bloodseeker, don't move too far and consider teleporting to base if possible.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bloodseeker_rupture" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bloodseeker",
    audioFile: "enemyHero/Bloodseeker_4_RuptureCounterItems",
    messageTime: 12 * 60,
    textMessage:
      "Lotus Orb, Linken's Sphere and status resistance items are good at countering Rupture.",
    audience: [Audience.ALL],
  },

  // 11. Bounty Hunter
  {
    category: "OwnHero",
    npcHeroName: "bounty_hunter",
    audioFile: "ownHero/BountyHunter_1_SnipeCouriers",
    messageTime: -90,
    textMessage: `Place a non-obvious courier sniping Observer Ward. Killing couriers not only grants gold but also disallows detection to be delivered.`,
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "courier" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bounty_hunter",
    audioFile: "ownHero/BountyHunter_2_Jinada",
    messageTime: -15,
    textMessage:
      "Hit opponents with Jinada or secure range creep last hits. The bonus damage does not work on denies.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bounty_hunter_jinada" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bounty_hunter",
    audioFile: "ownHero/BountyHunter_3_CheckDetection",
    messageTime: 15,
    repeatTime: 10 * 60,
    textMessage: "Check frequently opponents' inventories for detection.",
    audience: [Audience.ALL],
    image: { type: "item", name: "SentryDustGem" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bounty_hunter",
    audioFile: "ownHero/BountyHunter_4_LeaveInvisibility",
    messageTime: [90, 8 * 60 + 30, 15 * 60 + 30],
    textMessage:
      "If you get dusted while in Shadow Walk, use any activatable item or Shuriken Toss to leave invisibility and your won't be slowed by dust.",
    audience: [Audience.ALL],
    image: { type: "item", name: "dust" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bounty_hunter",
    audioFile: "ownHero/BountyHunter_5_AvoidSpots",
    messageTime: 3 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid running by spots that are typically sentried like pillars and active rune spots.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bounty_hunter",
    audioFile: "ownHero/BountyHunter_6_Playstyle",
    messageTime: 10 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "In mid to late game, play ahead of your teammates, track opponents, break smokes, collect runes, place deep wards and snipe couriers.",
    audience: [Audience.ROLE_SUPPORT],
  },

  {
    category: "EnemyHero",
    npcHeroName: "bounty_hunter",
    audioFile: "enemyHero/BountyHunter_1_Detection",
    messageTime: -60,
    textMessage:
      `Bring a Sentry Ward to the lane to not let Bounty Hunter close the gap on you from the invisibility of Shadow Walk.`,
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bounty_hunter",
    audioFile: "enemyHero/BountyHunter_2_Courier",
    messageTime: -50,
    textMessage:
      "Bounty Hunter tends to snipe couriers, so be mindful about that.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "bounty_hunter",
    audioFile: "enemyHero/BountyHunter_3_Jinada",
    messageTime: -40,
    textMessage:
      "Don't make it easy for Bounty Hunter to steal your gold with Jinada hits. Step away or damage him heavily.",
    audience: [Audience.IN_LANE],
    image: { type: "ability", name: "bounty_hunter_jinada" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bounty_hunter",
    audioFile: "enemyHero/BountyHunter_4_ObserverSentry",
    messageTime: [10 * 60 + 10, 18 * 60 + 10, 26 * 60 + 10],
    textMessage:
      "Pair observer wards with sentries to spot Bounty Hunter's movements.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_dispenser" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bounty_hunter",
    audioFile: "enemyHero/BountyHunter_5_CarryDetection",
    messageTime: [10 * 60 + 20, 18 * 60 + 20, 26 * 60 + 20],
    textMessage: "Encourage your allies to carry detection on multiple heroes.",
    audience: [Audience.ALL],
    image: { type: "item", name: "dust" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bounty_hunter",
    audioFile: "enemyHero/BountyHunter_6_TrackRevealItems",
    messageTime: 12 * 60,
    textMessage:
      "Avoid buying items that grant you invisibility because of Bounty Hunter's Track.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bounty_hunter_track" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bounty_hunter",
    audioFile: "enemyHero/BountyHunter_7_TrackDispelItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Consider buying one of many items that allow you to dispel Track.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bounty_hunter_track" },
  },

  // 12. Brewmaster
  {
    category: "OwnHero",
    npcHeroName: "brewmaster",
    audioFile: "ownHero/Brewmaster_1_Urn",
    messageTime: -90,
    textMessage:
      "Get Urn of Shadows as soon as possible as it allows you snowball off of first kill. Soul Release activates Cinder Brew.",
    audience: [Audience.ALL],
    image: { type: "item", name: "urn_of_shadows" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "brewmaster",
    audioFile: "ownHero/Brewmaster_2_DrunkenBrawler",
    messageTime: 15,
    textMessage: "Take a point in Drunken Brawler on a tough lane.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "brewmaster_drunken_brawler" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "brewmaster",
    audioFile: "ownHero/Brewmaster_3_CinderBrew",
    messageTime: 30,
    textMessage:
      "Ask your laning partner to activate Cinder Brew if you can't yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "brewmaster_cinder_brew" },
  },
  {
    category: "OwnHero",
    npcHeroName: "brewmaster",
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
    npcHeroName: "brewmaster",
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
    npcHeroName: "brewmaster",
    audioFile: "ownHero/Brewmaster_6_EarthPanda",
    messageTime: [6 * 60 + 30, 16 * 60 + 30],
    textMessage:
      "The Earth Panda carries all the auras and AoE effects like Radiance or Cloak of Flames.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "brewmaster_primal_split" },
  },
  {
    category: "OwnHero",
    npcHeroName: "brewmaster",
    audioFile: "ownHero/Brewmaster_7_ItemUsage",
    messageTime: [6 * 60 + 30, 16 * 60 + 30],
    textMessage:
      "Look to use your aura items like Crimson Guard and Pipe before Primal Split. But beware of your mana pool.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "brewmaster",
    audioFile: "enemyHero/Brewmaster_1_LockDown",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Try to lock down or silence Brewmaster and kill him before he splits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "brewmaster_primal_split" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "brewmaster",
    audioFile: "enemyHero/Brewmaster_2_Kite",
    messageTime: [8 * 60 + 10, 18 * 60 + 10, 28 * 60 + 20],
    textMessage:
      "Don't fight Brewmaster's Primal Split unless you have damage to kill all the Brewlings.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "brewmaster_primal_split" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "brewmaster",
    audioFile: "enemyHero/Brewmaster_3_DispelMagic",
    messageTime: 12 * 60,
    textMessage:
      "Storm Brewling's Dispel Magic is an AOE basic dispel. So, avoid purchasing dispellable items.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "brewmaster",
    audioFile: "enemyHero/Brewmaster_4_BKB",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Black King Bar is amazing against all of the crowd control Brewmaster has.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },

  // 13. Bristleback
  {
    category: "OwnHero",
    npcHeroName: "bristleback",
    audioFile: "ownHero/Bristleback_1_EarlyGoo",
    messageTime: 45,
    textMessage:
      "If you can be aggressive, take a point in Viscous Nasal Goo as it will greatly improve physical damage output.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bristleback_viscous_nasal_goo" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bristleback",
    audioFile: "ownHero/Bristleback_2_TurnBack",
    messageTime: 60,
    repeatTime: 10 * 60,
    textMessage:
      "Turn your back to opponents, their towers or stacks of neutral creeps whenever you expect to take loads of damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "bristleback_bristleback" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bristleback",
    audioFile: "ownHero/Bristleback_3_StackCamps",
    messageTime: [3 * 60 + 30, 6 * 60 + 30],
    textMessage:
      "Alert your supports to stack for you, especially ancient camps as you can clear it at level 7.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "bristleback",
    audioFile: "ownHero/Bristleback_4_Vanguard",
    messageTime: [5 * 60 ],
    textMessage:
      "Once you get Vanguard, play very strong in lane. Look to push the enemy out of the lane and break their Safelane tower with the help of your support.",
    audience: [Audience.ALL],
    image: { type: "item", name: "vanguard"},
  },
  {
    category: "OwnHero",
    npcHeroName: "bristleback",
    audioFile: "ownHero/Bristleback_5_CheckInventory",
    messageTime: 11 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Check opponents' inventories frequently in search for break effects and healing reductions. Black King Bar and dispel items counter some of them.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "bristleback",
    audioFile: "ownHero/Bristleback_6_Roshan",
    messageTime: [18 * 60 + 15, 23 * 60 + 15],
    textMessage:
      "You can take Roshan down fast and early with your team thanks to Viscous Nasal Goo.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "bristleback",
    audioFile: "ownHero/Bristleback_7_Bloodstone",
    messageTime: 22 * 60,
    textMessage:
      "Use the Bloodstone active together with Bristleback active with Aghanims Scepter to do a massive burst of damage while healing yourself.",
    audience: [Audience.ALL],
    image: { type: "item", name: "bloodstone" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "bristleback",
    audioFile: "enemyHero/Bristleback_1_StickWand",
    messageTime: -60,
    textMessage:
      "Magic Stick and Wand are must items against Bristleback's Quill Spray spam.",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "magic_stick" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bristleback",
    audioFile: "enemyHero/Bristleback_2_SpiritVessel",
    messageTime: -50,
    textMessage:
      "Someone should buy Spirit Vessel against Bristleback to counter his regeneration and healing.",
    audience: [Audience.ALL],
    image: { type: "item", name: "spirit_vessel" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bristleback",
    audioFile: "enemyHero/Bristleback_3_Kite",
    messageTime: [10 * 60 + 10, 15 * 60 + 10, 20 * 60 + 20],
    textMessage:
      "If you have no good way of dealing with Bristleback, leave and don't waste too many resources on him.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "bristleback",
    audioFile: "enemyHero/Bristleback_4_SilverEdge",
    messageTime: 12 * 60,
    textMessage: "Silver Edge allows you to break Bristleback's passives.",
    audience: [Audience.ALL],
    image: { type: "item", name: "silver_edge" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "bristleback",
    audioFile: "enemyHero/Bristleback_5_Armor",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Armor items are good to counter Bristleback's physical damage output.",
    audience: [Audience.ALL],
    image: { type: "item", name: "armor" },
  },

  // 14. Broodmother
  {
    category: "OwnHero",
    npcHeroName: "broodmother",
    audioFile: "ownHero/Broodmother_1_UntilLevel6",
    messageTime: 15,
    textMessage:
      "Broodmother is weak until level 6. Focus on last hitting and sustaining health until you have Spawn Spiderlings.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "broodmother",
    audioFile: "ownHero/Broodmother_2_SpiderlingsFeed",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Make sure not to feed spiderlings away as that greatly affects your farming speed and kill threat.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "broodmother_spawn_spiderlings" },
  },
  {
    category: "OwnHero",
    npcHeroName: "broodmother",
    audioFile: "ownHero/Broodmother_3_PlayAggressive",
    messageTime: [6 * 60 + 30, 9 * 60 + 30],
    textMessage:
      "Once you have built up an army of spiderlings, try to play on the opponents side of the map as much as you can.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "broodmother_spawn_spiderlings" },
  },
  {
    category: "OwnHero",
    npcHeroName: "broodmother",
    audioFile: "ownHero/Broodmother_4_PlaceWards",
    messageTime: [7 * 60, 10 * 60, 13 * 60],
    textMessage:
      "Place Observer Wards and Sentries in the enemy jungle so you feel comfortable playing there.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_dispenser" },
  },
  {
    category: "OwnHero",
    npcHeroName: "broodmother",
    audioFile: "ownHero/Broodmother_5_FeelingEndangered",
    messageTime: [7 * 60 + 30, 10 * 60 + 30, 13 * 60 + 30],
    textMessage:
      "If you are feeling endangered, let your spiderlings farm while staying hidden on hero.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "broodmother_spawn_spiderlings" },
  },
  {
    category: "OwnHero",
    npcHeroName: "broodmother",
    audioFile: "ownHero/Broodmother_6_Roshan",
    messageTime: [15 * 60 + 30, 20 * 60 + 30],
    textMessage:
      "Broodmother can take Roshan down fairly early. Move spiderlings out when Roshan is about to clap.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "broodmother",
    audioFile: "enemyHero/Broodmother_1_LaningHero",
    messageTime: -60,
    textMessage:
      "Consider putting a hero that can deal with Spiderlings against her on the lane.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "broodmother_spawn_spiderlings" },
  },
  // {category: "EnemyHero", npcHeroName: "broodmother", audioFile: "enemyHero/Broodmother_2_BlockCamps", messageTime: (-50), textMessage: "Block off her camps with sentries.", audience: [Audience.ALL]}, |patch 7.29| MESSAGE CHANGED
  {
    category: "EnemyHero",
    npcHeroName: "broodmother",
    audioFile: "enemyHero/Broodmother_2_BlockCamps",
    messageTime: 4 * 60 + 15,
    textMessage:
      "Block off her camps with sentries as she gets closer to level 6.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "broodmother",
    audioFile: "enemyHero/Broodmother_3_Gank",
    messageTime: 10 * 60 + 10,
    textMessage:
      "If you are looking to gank Broodmother you need at least 3 heroes otherwise pressure other two lanes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "broodmother",
    audioFile: "enemyHero/Broodmother_4_AntisummonsItems",
    messageTime: 12 * 60,
    textMessage: "Crimson Guard and armor items are good against Broodmother.",
    audience: [Audience.ALL],
    image: { type: "item", name: "crimson_guard" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "broodmother",
    audioFile: "enemyHero/Broodmother_5_AntihealingItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Healing and regeneration reducing items are good against Insatiable Hunger.",
    audience: [Audience.ALL],
  },
  // {category: "EnemyHero", npcHeroName: "broodmother", audioFile: "enemyHero/Broodmother_6_AntiEvasionItems", messageTime: (12*60+20), textMessage: "Evasion piercing items are good against Incapacitating Bite.", audience: [Audience.ALL]}, |patch 7.29|  MESSAGE CHANGED
  {
    category: "EnemyHero",
    npcHeroName: "broodmother",
    audioFile: "enemyHero/Broodmother_6_AntievasionItems",
    messageTime: 12 * 60 + 20,
    textMessage: "Evasion piercing items are good against Brood's Silken Bola.",
    audience: [Audience.ALL],
    image: { type: "item", name: "monkey_king_bar" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "broodmother",
    audioFile: "enemyHero/Broodmother_7_Roshan",
    messageTime: [15 * 60 + 10, 20 * 60 + 10, 25 * 60 + 10],
    textMessage:
      "Broodmother is good at taking an early Roshan. Ward around Roshpit and check.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_dispenser" },
  },

  // 15. Centaur Warrunner
  {
    category: "OwnHero",
    npcHeroName: "centaur",
    audioFile: "ownHero/CentaurWarrunner_1_Ring",
    messageTime: 15,
    textMessage: `Focus on last hitting and farm your Bracers.`,
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ring_of_health" },
  },
  {
    category: "OwnHero",
    npcHeroName: "centaur",
    audioFile: "ownHero/CentaurWarrunner_2_Creepskip",
    messageTime: 4 * 60 + 45,
    textMessage:
      "If you cannot pressure on the lane or being pressured, consider creep skipping or pulling enemy creeps to your tower after minute 5 as well as farming neutral camps nearby.",
    audience: [Audience.ROLE_OFFLANE],
  },
  {
    category: "OwnHero",
    npcHeroName: "centaur",
    audioFile: "ownHero/CentaurWarrunner_3_Buldings",
    messageTime: [5 * 60 + 15, 8 * 60 + 15],
    textMessage:
      "Retaliate works on buildings so consider tanking tower shots if it is safe enough.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "centaur_return" },
  },
  {
    category: "OwnHero",
    npcHeroName: "centaur",
    audioFile: "ownHero/CentaurWarrunner_4_Stampede",
    messageTime: [6 * 60 + 30, 9 * 60 + 30, 12 * 60 + 30],
    textMessage:
      "Look around the map to help out your teammates in the trouble with Stampede.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "centaur_stampede" },
  },
  {
    category: "OwnHero",
    npcHeroName: "centaur",
    audioFile: "ownHero/CentaurWarrunner_5_Blink",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Once you get Blink Dagger, try to make use of it immediately before the opponents can see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "centaur",
    audioFile: "ownHero/CentaurWarrunner_6_FollowUp",
    messageTime: 11 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Make sure your teammates can follow up on your initiation. Centaur doesn't do insane amounts of damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "centaur",
    audioFile: "enemyHero/CentaurWarrunner_1_SpiritVessel",
    messageTime: -60,
    textMessage:
      "Someone should buy Spirit Vessel against Centaur to deal damage, offset his regeneration and cancel Blink.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "centaur",
    audioFile: "enemyHero/CentaurWarrunner_2_ArmorReducingItems",
    messageTime: -50,
    textMessage: "Armor reducing items are great against Centaur.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "centaur",
    audioFile: "enemyHero/CentaurWarrunner_3_AntimagicItems",
    messageTime: 12 * 60,
    textMessage:
      "Items that offset magical damage output from Centaur are good against him.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "centaur",
    audioFile: "enemyHero/CentaurWarrunner_4_BlinkDagger",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Keep checking Centaur's items. Be aware of his Blink Dagger timing.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "centaur",
    audioFile: "enemyHero/CentaurWarrunner_5_ClumpUp",
    messageTime: [12 * 60 + 20, 22 * 60 + 20, 32 * 60 + 20],
    textMessage:
      "Don't clump up in teamfights for Centaur's Blink into Hoof Stomp initiation.",
    audience: [Audience.ALL],
  },

  // 16. Chaos Knight
  {
    category: "OwnHero",
    npcHeroName: "chaos_knight",
    audioFile: "ownHero/ChaosKnight_1_Aggressive",
    messageTime: 15,
    textMessage:
      "Try to get level 2 before your opponent and go for a kill with your support. Chaos knight has good kill potential with levels. Try to catch enemies that are alone in 2 versus 1 trades.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "chaos_knight",
    audioFile: "ownHero/ChaosKnight_1_chaos_strike",
    messageTime: 5 * 60,
    textMessage:
      "Try to have chaos strike maxed by level 7 as it is your main tool for farming and will help with burst early.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "chaos_knight",
    audioFile: "ownHero/ChaosKnight_2_PhantasmFarm",
    messageTime: [6 * 60 + 45, 10 * 60 + 45, 14 * 60 + 45],
    textMessage:
      "Use Phantasm off cooldown not just to fight but also to farm faster unless you suspect a fight will happen soon.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "chaos_knight_phantasm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "chaos_knight",
    audioFile: "ownHero/ChaosKnight_3_Illusions",
    messageTime: [7 * 60, 11 * 60],
    textMessage:
      "Illusions scale with stat attributes, attack speed and movement speed increases, health regeneration and some attack modifiers like lifesteal and crit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "chaos_knight_phantasm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "chaos_knight",
    audioFile: "ownHero/ChaosKnight_4_Phantasmagoria",
    messageTime: [7 * 60 + 15, 11 * 60 + 15],
    textMessage:
      "Phantasmagoria makes your Phantasm illusions into strong illusions so they can't be instantly killed with hex, dagon or drains.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "chaos_knight_phantasm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "chaos_knight",
    audioFile: "ownHero/ChaosKnight_5_Burst",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Try to target and burst enemy supports and save heroes at the start of fights. Your illusions will generally be killed off as the fight continues.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "chaos_knight",
    audioFile: "ownHero/ChaosKnight_6_Blink",
    messageTime: 15 * 60 + 15,
    textMessage:
      "With Blink Dagger you can use Phantasm, blink in and pull illusions on target by using Reality Rift.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "chaos_knight",
    audioFile: "enemyHero/ChaosKnight_1_Burst",
    messageTime: -60,
    textMessage:
      "Chaos Strike sustains Chaos Knight. Deal bursts of damage to him so he can't hit creeps easily and regain HP.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "chaos_knight",
    audioFile: "enemyHero/ChaosKnight_2_BasicDispel",
    messageTime: 8 * 60,
    textMessage: "Chaos Knight's Phantasm applies a basic dispel on cast.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "chaos_knight",
    audioFile: "enemyHero/ChaosKnight_3_Illusions",
    messageTime: [8 * 60 + 10, 18 * 60 + 10, 28 * 60 + 10],
    textMessage: "Either kills his illusions in the fights or disengage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "chaos_knight",
    audioFile: "enemyHero/ChaosKnight_4_AntiIllusionItems",
    messageTime: 12 * 60,
    textMessage:
      "Items that deal AoE damage are good against Chaos Knight's illusions.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "chaos_knight",
    audioFile: "enemyHero/ChaosKnight_5_DefensiveItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard and armor items are good at offsetting Chaos Knight's physical damage output.",
    audience: [Audience.ALL],
  },

  // 17. Chen
  {
    category: "OwnHero",
    npcHeroName: "chen",
    audioFile: "ownHero/Chen_1_UnblockCamps",
    messageTime: -90,
    textMessage:
      "Bring a sentry or two to the lane to unblock the camps. Chen's laning impact is directly related to summon usage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "chen",
    audioFile: "ownHero/Chen_2_Harpy",
    messageTime: 55,
    textMessage:
      "If you find Harpy Stormcrafter you will have massive kill potential with the slow from Penitence.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "chen_holy_persuasion" },
  },
  {
    category: "OwnHero",
    npcHeroName: "chen",
    audioFile: "ownHero/Chen_3_Summons",
    messageTime: [90, 4 * 60 + 30, 7 * 60 + 30],
    textMessage:
      "Aside from using summons to harass on the lane, you can gank with them, stack camps, control runes, block camps and even snipe couriers.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "chen_holy_persuasion" },
  },
  {
    category: "OwnHero",
    npcHeroName: "chen",
    audioFile: "ownHero/Chen_4_Save",
    messageTime: [9 * 60, 13 * 60, 17 * 60],
    textMessage:
      "Keep an eye on the map and save your teammates in trouble by using Hand of God.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "chen_hand_of_god" },
  },
  {
    category: "OwnHero",
    npcHeroName: "chen",
    audioFile: "ownHero/Chen_5_GroupUp",
    messageTime: 10 * 60 + 15,
    textMessage:
      "You want to group up early with your team and make use of your summons and auras to play aggressively.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "chen",
    audioFile: "ownHero/Chen_6_Splitpush",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening on the map, you can split push with your summons.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "chen",
    audioFile: "ownHero/Chen_7_Farming",
    messageTime: 7 * 60,
    textMessage: `Look to farm and play greedy once you have level 3 Holy Persuasion. An early timing on Vladmirs Offering into Solar Crest lets you snowball the game.`,
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "chen",
    audioFile: "enemyHero/Chen_1_BlockCamps",
    messageTime: -60,
    textMessage:
      "Against Chen, block off small and big pull camps either with a sentry or with your hero's body.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "chen",
    audioFile: "enemyHero/Chen_2_DontGreed",
    messageTime: [-50, 5 * 60 + 10, 10 * 60 + 30],
    textMessage:
      "Chen lineups tend to powerspike in early to midgame. Don't buy greedy items.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "chen",
    audioFile: "enemyHero/Chen_3_Gank",
    messageTime: 10 * 60 + 10,
    textMessage: "Look to gank Chen as you will kill his army as well.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "chen",
    audioFile: "enemyHero/Chen_4_AntihealingItems",
    messageTime: 10 * 60 + 20,
    textMessage: "Items that reduce healing are good against Chen.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "chen",
    audioFile: "enemyHero/Chen_5_Roshan",
    messageTime: [15 * 60 + 10, 20 * 60 + 10, 25 * 60 + 10],
    textMessage:
      "Chen lineups are good at taking early Roshan. Ward around Roshpit and check.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "chen",
    audioFile: "enemyHero/Chen_6_AghanimsScepter",
    messageTime: 40 * 60,
    textMessage:
      "Be aware of Chen applying strong dispel with Hand of God if he has the level 25 talent.",
    audience: [Audience.ALL],
  },

  // 18. Clinkz
  {
    category: "OwnHero",
    npcHeroName: "clinkz",
    audioFile: "ownHero/Clinkz_1_tar_bomb",
    messageTime: 15,
    textMessage: `Tar bomb is your main tool for harrasing in the lane try to use it when you can get a lot of hits on the enemy.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "clinkz_tar_bomb" },
  },
  {
    category: "OwnHero",
    npcHeroName: "clinkz",
    audioFile: "ownHero/Clinkz_2_CheckInventory",
    messageTime: 90,
    repeatTime: 10 * 60,
    textMessage: "Check opponent's inventory frequently for detection.",
    audience: [Audience.ALL],
    image: { type: "item", name: "SentryDustGem" },
  },
  {
    category: "OwnHero",
    npcHeroName: "clinkz",
    audioFile: "ownHero/Clinkz_3_DeathPact",
    messageTime: [6 * 60, 20 * 60],
    textMessage:
      "Only fight when death pact is up in the laning stage and fights.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "clinkz_death_pact" },
  },
  {
    category: "OwnHero",
    npcHeroName: "clinkz",
    audioFile: "ownHero/Clinkz_4_solar_crest_timing",
    messageTime: 10 * 60 + 30,
    textMessage: `Once you have Desolator, you can look for kills and get involved in fights.`,
    audience: [Audience.ALL],
    image: { type: `item`, name: `desolator` },
  },
  {
    category: "OwnHero",
    npcHeroName: "clinkz",
    audioFile: "ownHero/Clinkz_5_AvoidSentries",
    messageTime: 9 * 60,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid passing by the typical sentry spots like pillars and active rune spots.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "clinkz",
    audioFile: "ownHero/Clinkz_6_BarrageLine",
    messageTime: 10 * 60 + 10,
    repeatTime: 10 * 60,
    textMessage:
      `In fights try to focus targets that you can burst such as supports or squishy heroes without escapes.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "clinkz_strafe" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `clinkz`,
    audioFile: `ownHero/Clinkz_7_DaedlusAggression`,
    messageTime: 21 * 60 + 10,
    textMessage: `Use the Daedlus power spike to put pressure on the map by getting kill after kill on isolated enemy heroes.`,
    audience: [Audience.ALL],
    image: { type: `item`, name: `bloodthorn` },
  },
  {
    category: `OwnHero`,
    npcHeroName: `clinkz`,
    audioFile: `ownHero/Clinkz_8_AghanimShard`,
    messageTime: 14 * 60 + 50,
    textMessage: `Pick up Aghanims Shard later in the game to have AoE damage in teamfights as well as instant waveclear with Burning Barrage.`,
    audience: [Audience.ALL],
    image: { type: `item`, name: `aghanims_shard` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "clinkz",
    audioFile: "enemyHero/Clinkz_1_Detection",
    messageTime: 5 * 60,
    textMessage: "Bring a sentry to the lane and dust later on for Clinkz.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "clinkz",
    audioFile: "enemyHero/Clinkz_2_Squishy",
    messageTime: 2 * 60,
    textMessage:
      "Try to go on clinkz when his death pact expires or if he is too far forward.",
    audience: [Audience.IN_LANE],
  },

  {
    category: "EnemyHero",
    npcHeroName: "clinkz",
    audioFile: "enemyHero/Clinkz_6_detection",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Make sure to always carry dust vs clinkz and use sentrys on the popular fighting/farming spots.",
    audience: [Audience.ROLE_SUPPORT],
  },

  {
    category: "EnemyHero",
    npcHeroName: "clinkz",
    audioFile: "enemyHero/Clinkz_3_ObserverSentry",
    messageTime: [10 * 60 + 10, 18 * 60 + 10, 26 * 60 + 10],
    textMessage:
      "Pair observer wards with sentries to spot Clinkz's movements.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "clinkz",
    audioFile: "enemyHero/Clinkz_4_CarryDetection",
    messageTime: [10 * 60 + 20, 18 * 60 + 20, 26 * 60 + 20],
    textMessage: "Carry detection on multiple heroes against Clinkz.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "clinkz",
    audioFile: "enemyHero/Clinkz_5_Armor",
    messageTime: 12 * 60,
    textMessage: "Armor items are good against Clinkz.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "clinkz",
    audioFile: "enemyHero/Clinkz_6_AntiEvasion",
    messageTime: 12 * 60 + 10,
    textMessage: "Evasion piercing items are good against Clinkz's Strafe.",
    audience: [Audience.ALL],
  },

  // 19. Clockwerk
  {
    category: "OwnHero",
    npcHeroName: "rattletrap",
    audioFile: "ownHero/Clockwerk_1_CreepEquilibrium",
    messageTime: 15,
    textMessage:
      "Have creep equilibrium close to your tower so you can run the opponents down for a while until they reach their tower.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rattletrap_battery_assault" },
  },
  {
    category: "OwnHero",
    npcHeroName: "rattletrap",
    audioFile: "ownHero/Clockwerk_2_Pray",
    messageTime: 30,
    textMessage:
      "Play in tree lines and prey on isolated heroes as Battery Assault does all the damage to the single hero.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rattletrap_battery_assault" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "rattletrap",
    audioFile: "ownHero/Clockwerk_3_DenyCogs",
    messageTime: 80,
    textMessage:
      "Don't feed Power Cogs unnecessarily to opponents. Deny cogs as opponents start attacking them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rattletrap_power_cogs" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "rattletrap",
    audioFile: "ownHero/Clockwerk_4_PushCogs",
    messageTime: 100,
    repeatTime: 8 * 60,
    textMessage:
      `With the Expanded Armature facet, if an opponent is trying to escape your Power Cogs, look to kick Cogs onto them to push them and do damage.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "rattletrap_power_cogs" },
  },
  {
    category: "OwnHero",
    npcHeroName: "rattletrap",
    audioFile: "ownHero/Clockwerk_5_RocketScout",
    messageTime: 9 * 60 + 45,
    repeatTime: 8 * 60,
    textMessage:
      "Use Rockets off cooldown to scout around the map and push out dangerous lanes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rattletrap_rocket_flare" },
  },
  {
    category: "OwnHero",
    npcHeroName: "rattletrap",
    audioFile: "ownHero/Clockwerk_6_SplitOpponents",
    messageTime: 10 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "In the teamfights, look to split opponents' team into two parts by placing cogs between their heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rattletrap_power_cogs" },
  },
  {
    category: "OwnHero",
    npcHeroName: "rattletrap",
    audioFile: "ownHero/Clockwerk_7_ControllBKB",
    messageTime: 11 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage: `Clockwerk is good at controlling debuff immune heroes as Hookshot stun pierces debuff immunity and Power Cogs act as barrier.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `rattletrap`,
    audioFile: `ownHero/Clockwerk_8_CogsCreepBlock`,
    messageTime: -60,
    textMessage: `With the Hookup facet, as position 4, you can take Power Cogs on level 1 to block your first creep wave inside them to bring the lane creeps closer to your tower.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `rattletrap_power_cogs` },
  },
  {
    category: `OwnHero`,
    npcHeroName: `rattletrap`,
    audioFile: `ownHero/Clockwerk_9_KickingCogs`,
    messageTime: 50,
    textMessage: `Even if you do not catch any enemy heroes inside Power Cogs, you can still kick Cogs onto enemy heroes to push them around and do damage.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `rattletrap_power_cogs` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "rattletrap",
    audioFile: "enemyHero/Clockwerk_1_Observer",
    messageTime: -60,
    textMessage:
      "Bring an Observer Ward to the lane to keep an eye on Clockwerk's aggressive movements.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "rattletrap",
    audioFile: "enemyHero/Clockwerk_2_BatteryAssault",
    messageTime: -50,
    textMessage:
      "Battery assault does a lot of damage. Keep distance from Clockwerk or share damage with allied units.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "rattletrap",
    audioFile: "enemyHero/Clockwerk_3_PowerCogs",
    messageTime: 30,
    textMessage:
      "If you get trapped in Power Cogs don't panic. It takes two hits to destroy a cog.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "rattletrap",
    audioFile: "enemyHero/Clockwerk_4_SoloKill",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Clockwerk has a great solo kill potential in early to midgame. Keep track of his movements.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "rattletrap",
    audioFile: "enemyHero/Clockwerk_5_ForceStaff",
    messageTime: 12 * 60,
    textMessage:
      "Force Staff is great at moving you or an ally out of Power Cogs and out of Battery Assault range.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "rattletrap",
    audioFile: "enemyHero/Clockwerk_6_RoshanContesting",
    messageTime: [15 * 60, 25 * 60, 35 * 60],
    textMessage:
      "Clockwerk is great at contesting you at Roshan. Block his Hookshot path when you are about to finish Roshan.",
    audience: [Audience.ALL],
  },

  // 20. Crystal Maiden
  {
    category: "OwnHero",
    npcHeroName: "crystal_maiden",
    audioFile: "ownHero/CrystalMaiden_1_CrystalNova",
    messageTime: 15,
    textMessage:
      "Try to hit both opponents with Crystal Nova and potentially secure the range creep at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_crystal_nova" },
  },
  {
    category: "OwnHero",
    npcHeroName: "crystal_maiden",
    audioFile: "ownHero/CrystalMaiden_2_LevelFrostbite",
    messageTime: 45,
    textMessage:
      "Consider skilling Frostbite on level 2 for a kill attempt with your mana regen consumables.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_frostbite" },
  },
  {
    category: "OwnHero",
    npcHeroName: "crystal_maiden",
    audioFile: "ownHero/CrystalMaiden_3_FrostbiteCreeps",
    messageTime: [2 * 60, 8 * 60],
    textMessage: `Frostbite does more damage to creeps. Use it to farm big neutral creeps or enemy summons.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_frostbite" },
  },
  {
    category: "OwnHero",
    npcHeroName: "crystal_maiden",
    audioFile: "ownHero/CrystalMaiden_4_Vision",
    messageTime: 5 * 60,
    repeatTime: 10 * 60,
    textMessage: `Crystal Nova provides vision so you can use it to scout pillars for wards and Roshan pit.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_crystal_nova" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "crystal_maiden",
    audioFile: "ownHero/CrystalMaiden_5_SkipUlti",
    messageTime: 8 * 60 + 15,
    textMessage:
      "It is hard to land an impactful Freezing Field and it costs a lot of mana so you might want to delay skilling it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_freezing_field" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "crystal_maiden",
    audioFile: "ownHero/CrystalMaiden_6_AvoidShowing",
    messageTime: 10 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid showing yourself at the start of the fight. Keep distance and spam Crystal Nova, Frostbite, and use items.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "crystal_maiden",
    audioFile: "ownHero/CrystalMaiden_7_DontUlt",
    messageTime: 16 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Dont rush with using Freezing Field in fights unless you can support it with Glimmer Cape.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_freezing_field" },
  },
  {
    category: "OwnHero",
    npcHeroName: "crystal_maiden",
    audioFile: "ownHero/CrystalMaiden_8_Roaming",
    messageTime: 7 * 60 + 15,
    textMessage:
      "Use portals to roam around the map and set up kills with your control spells.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "crystal_maiden_frostbite" },
  },
  {
    category: "OwnHero",
    npcHeroName: "crystal_maiden",
    audioFile: "ownHero/CrystalMaiden_9_AghsShardUltimate",
    messageTime: 30 * 60 + 15,
    textMessage: `Remember to use Boots of Bearing to gain movespeed during Freezing Field with Aghamins Scepter.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "boots_of_bearing" },
  },
  {
    category: "OwnHero",
    npcHeroName: "crystal_maiden",
    audioFile: "ownHero/CrystalMaiden_10_AghsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Get Aghanims Shard at the 15 minute mark as it gives you more mobility, lockdown and wave clear.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "crystal_maiden",
    audioFile: "enemyHero/CrystalMaiden_1_Frostbite",
    messageTime: -90,
    textMessage:
      "Crystal Maiden counters heroes that don't like to be rooted such as Ember Spirit, Void Spirit and Storm Spirit. Note that Frostbite is long-lasting and has a short cooldown.",
    chatMessage:
      "Crystal Maiden counters heroes that don't like to be rooted, e.g. Ember Spirit, Void Spirit and Storm Spirit",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "crystal_maiden",
    audioFile: "enemyHero/CrystalMaiden_2_WeakHero",
    messageTime: -15,
    textMessage:
      "Crystal Maiden is a vulnerable hero and one of the easiest to kill during the laning phase",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "crystal_maiden",
    audioFile: "enemyHero/CrystalMaiden_3_CrystalNova",
    messageTime: 20,
    textMessage:
      "Play on different sides of the lane with your coleague against Crystal Maiden such that you don't get hit both by Crystal Nova",
    chatMessage:
      "Play on different sides of the lane against Crystal Maiden such that you don't get hit both by Crystal Nova",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "crystal_maiden",
    audioFile: "enemyHero/CrystalMaiden_4_LaneKills",
    messageTime: 1 * 60 + 10,
    textMessage:
      "Use moments when Crystal Maiden is away from her laning partner to land a kill on her, for example when she's pulling. Keeping her on low levels means that her team won't have high levels of Arcane Aura",
    chatMessage:
      "Try to land a kill on Crystal Maiden when she is away from her laning partner, e.g. when she's pulling",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "crystal_maiden",
    audioFile: "enemyHero/CrystalMaiden_5_FreezingField",
    messageTime: [17 * 60 + 15, 27 * 60 + 15, 37 * 60 + 15, 47 * 60 + 17],
    textMessage:
      "Look to interrupt the Crystal Maiden Freezing Field in fights. She will try to protect herself with Glimmer Cape or BKB",
    chatMessage:
      "Disrupt Chrystal Maiden's Freezing Field channeling in fights. She might use with Glimmer Cape or BKB",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "crystal_maiden",
    audioFile: "enemyHero/CrystalMaiden_6_AttackSpeed",
    messageTime: 30 * 60 + 30,
    textMessage:
      "Crystal Maiden's level 20 attack speed talent is good against specific heroes or abilities such as Supernova, Tombstone and Will-o-Wisp",
    chatMessage:
      "Crystal Maiden's level 20 attack speed talent is good against heroes or abilities such as Supernova",
    audience: [Audience.ALL],
  },

  // 21. Dark Seer
  {
    category: "OwnHero",
    npcHeroName: "dark_seer",
    audioFile: "ownHero/DarkSeer_1_DoubleShell",
    messageTime: -10,
    textMessage:
      "Double Ion Shell the first wave and make sure opponents don't deny many creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_seer_ion_shell" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dark_seer",
    audioFile: "ownHero/DarkSeer_2_PushPull",
    messageTime: 50,
    textMessage:
      "Execute push and pull strategy. Push the lane with shells and pull the big camp.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT_SOFT],
    image: { type: "ability", name: "dark_seer_ion_shell" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dark_seer",
    audioFile: "ownHero/DarkSeer_3_Creepskip",
    messageTime: [4 * 60 + 50, 6 * 60 + 50],
    textMessage:
      "If you can't pressure on the lane consider creep skipping and farming neutral camps nearby.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT_SOFT],
    image: { type: "ability", name: "dark_seer_ion_shell" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dark_seer",
    audioFile: "ownHero/DarkSeer_4_VacuumCliffs",
    messageTime: 8 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "If you are fighting close to pillar spots or cliffs, consider Vacuuming opponents on those.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_seer_vacuum" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dark_seer",
    audioFile: "ownHero/DarkSeer_5_PushDangerous",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage: "Push out dangerous lanes with Ion Shells.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_seer_ion_shell" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dark_seer",
    audioFile: "ownHero/DarkSeer_6_Combo",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Keep your melee cores shelled and wait for a moment when opponents are clumped up to do your combo.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_seer_wall_of_replica" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dark_seer",
    audioFile: "ownHero/DarkSeer_7_Priorities",
    messageTime: 12 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Prioritize using Wall of Replica and Normal Punch on heroes that have strong illusions or auras.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_seer_wall_of_replica" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "dark_seer",
    audioFile: "enemyHero/DarkSeer_1_Deny",
    messageTime: -60,
    textMessage:
      "Against Dark Seer, focus on denying creeps as Ion Shells are making them drop low.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dark_seer",
    audioFile: "enemyHero/DarkSeer_2_BigCamp",
    messageTime: -50,
    textMessage:
      "Dark Seer will push the lane in with Ion Shell and pull the big neutral camp. Block it or prevent it.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dark_seer",
    audioFile: "enemyHero/DarkSeer_3_Clarity",
    messageTime: 30,
    textMessage:
      "Dark Seer relies on clarities to maintain Ion Shell spam. Look to cancel them.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dark_seer",
    audioFile: "enemyHero/DarkSeer_4_SurgeCooldown",
    messageTime: 50,
    textMessage: "When Dark Seer's Surge is on cooldown he is vulnerable.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dark_seer",
    audioFile: "enemyHero/DarkSeer_5_BadItems",
    messageTime: 12 * 60,
    textMessage:
      "Avoid buying Radiance and Assault Cuirass against Dark Seer as he can replicate these items with his ulti.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dark_seer",
    audioFile: "enemyHero/DarkSeer_6_ClumpUp",
    messageTime: [15 * 60 + 10, 25 * 60 + 10, 35 * 60 + 10],
    textMessage:
      "Don't clump up in teamfights for Vacuum into Wall of Replica combination of Dark Seer.",
    audience: [Audience.ALL],
  },

  // 22. Dark Willow
  {
    category: "OwnHero",
    npcHeroName: "dark_willow",
    audioFile: "ownHero/DarkWillow_1_LastHitRange",
    messageTime: 15,
    textMessage: "Consider using Shadow Realm to secure range creep last hits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_willow_shadow_realm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dark_willow",
    audioFile: "ownHero/DarkWillow_2_ShadowRealmDodge",
    messageTime: [45, 8 * 60 + 45, 16 * 60 + 45],
    textMessage:
      "You can dodge ranged attacks and many spell projectiles with Shadow Realm.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_willow_shadow_realm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dark_willow",
    audioFile: "ownHero/DarkWillow_3_InTrouble",
    messageTime: [90, 9 * 60 + 30, 17 * 60 + 30],
    textMessage:
      "If in trouble, you can potentially do Shadow Realm into teleport out play.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_willow_shadow_realm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dark_willow",
    audioFile: "ownHero/DarkWillow_4_PickOff",
    messageTime: [8 * 60, 14 * 60, 20 * 60],
    textMessage:
      "Dark Willow is great at picking off isolated heroes with no escape or dispel due to insane Bedlam damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dark_willow_bedlam" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dark_willow",
    audioFile: "ownHero/DarkWillow_5_Teamfights",
    messageTime: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "In teamfights, focus on getting off Terrorize, Bramble Maze and Cursed Crown timely and then burst an isolated target with Bedlam.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "dark_willow",
    audioFile: "ownHero/DarkWillow_6_Carry",
    messageTime: [20 * 60 + 15, 24 * 60 + 15],
    textMessage:
      "If the game opens up for you, you can transition into right-clicker with Aghanim's Scepter and attack speed talent.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: `OwnHero`,
    npcHeroName: `dark_willow`,
    audioFile: `ownHero/DarkWillow_7_BedlamAlly`,
    messageTime: [8 * 60 + 30, 18 * 60 + 30, 28 * 60 + 30],
    textMessage: `You can use your Bedlam on initiators on your team and do all your damage while staying back in fights.`,
    audience: [Audience.ROLE_SUPPORT],
    image: { type: `ability`, name: `dark_willow_bedlam` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "dark_willow",
    audioFile: "enemyHero/DarkWillow_1_Squishy",
    messageTime: -60,
    textMessage: "Dark Willow is squishy at the start and doesn't trade well.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dark_willow",
    audioFile: "enemyHero/DarkWillow_2_CursedCrown",
    messageTime: 30,
    textMessage:
      "Under effect of Cursed Crown make sure not to get too close to your allies or they will be stunned too.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dark_willow",
    audioFile: "enemyHero/DarkWillow_3_Bedlam",
    messageTime: 8 * 60,
    textMessage:
      "Bedlam does a lot of damage to a single target. Share the damage with allied units.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dark_willow",
    audioFile: "enemyHero/DarkWillow_4_DispelItems",
    messageTime: 12 * 60,
    textMessage:
      "Items that provide dispels are generally good against Cursed Crown, Bramble Maze and Terrorize.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dark_willow",
    audioFile: "enemyHero/DarkWillow_5_BlackKingBar",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Black King Bar is great against Dark Willow's disables and magical damage output.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dark_willow",
    audioFile: "enemyHero/DarkWillow_6_ClumpUp",
    messageTime: [12 * 60 + 20, 22 * 60 + 10, 32 * 60 + 10],
    textMessage: "Don't clump up in teamfights for Terrorize and Cursed Crown.",
    audience: [Audience.ALL],
  },

  // 23. Dawnbreaker
  {
    category: "OwnHero",
    npcHeroName: "dawnbreaker",
    audioFile: "ownHero/Dawnbreaker_1_StrongLaner",
    messageTime: 15,
    textMessage:
      "Dawnbreaker is typically a strong laner. Play aggressively and jump opponents out of position.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "dawnbreaker",
    audioFile: "ownHero/Dawnbreaker_2_SaveAlly",
    messageTime: 6 * 60 + 45,
    repeatTime: 8 * 60,
    textMessage:
      "Keep an eye on the map to save an ally in trouble with Solar Guardian and turn the fight around.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dawnbreaker_solar_guardian" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dawnbreaker",
    audioFile: "ownHero/Dawnbreaker_3_ClearSafely",
    messageTime: [7 * 60 + 45, 14 * 60 + 45],
    textMessage:
      "You can clear waves from safe distance by using Celestial Hammer.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dawnbreaker_celestial_hammer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dawnbreaker",
    audioFile: "ownHero/Dawnbreaker_4_PlaySeparately",
    messageTime: 10 * 60 + 15,
    repeatTime: 8 * 60 + 15,
    textMessage:
      "Play separately from your team, push out lanes and mask team's smoke moves as you can connect to your team with ultimate.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dawnbreaker_solar_guardian" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dawnbreaker",
    audioFile: "ownHero/Dawnbreaker_5_MapAggression",
    messageTime: 15 * 60,
    textMessage:
      "Once you have Black King Bar, play aggressively and join almost every fight to get kills across the map.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dawnbreaker",
    audioFile: "ownHero/Dawnbreaker_6_AghanimShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Aghanim's Shard gives you spell immunity and better control with Starbreaker. Use it often to escape dangerous scenarios and to nuke enemy heroes.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dawnbreaker",
    audioFile: "ownHero/Dawnbreaker_7_AghanimScepter",
    messageTime: 28 * 60 + 30,
    textMessage:
      "With the Aghanims Scepter, think about how long you should heal an ally and land quickly if the stun is necessary.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "dawnbreaker",
    audioFile: "enemyHero/Dawnbreaker_1_SpiritVessel",
    messageTime: -60,
    textMessage: "Someone should buy a Spirit Vessel to counter Dawnbreaker's healing",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dawnbreaker",
    audioFile: "enemyHero/Dawnbreaker_2_KeepDistance",
    messageTime: -50,
    textMessage:
      "Keep distance from Dawnbreaker so she can't use Starbreaker too often.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dawnbreaker",
    audioFile: "enemyHero/Dawnbreaker_3_SolarGuardian",
    messageTime: 8 * 60,
    textMessage:
      "Avoid diving enemy heroes as Dawnbreaker can assist them from anywhere on the map with Solar Guardian.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dawnbreaker",
    audioFile: "enemyHero/Dawnbreaker_4_ClumpUp",
    messageTime: [
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
    npcHeroName: "dawnbreaker",
    audioFile: "enemyHero/Dawnbreaker_5_AntihealingItems",
    messageTime: 12 * 60,
    textMessage:
      "Items that reduce healing are great against Dawnbreaker's Luminosity and Solar Guardian.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dawnbreaker",
    audioFile: "enemyHero/Dawnbreaker_6_Break",
    messageTime: 12 * 60 + 10,
    textMessage: "Break effects remove Dawnbreaker's Luminosity.",
    audience: [Audience.ALL],
  },

  // 24. Dazzle
  {
    category: "OwnHero",
    npcHeroName: "dazzle",
    audioFile: "ownHero/Dazzle_1_PoisonTouch",
    messageTime: -15,
    textMessage:
      "Use Poison Touch only if you can follow up with few right-clicks on poisoned hero.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dazzle_poison_touch" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dazzle",
    audioFile: "ownHero/Dazzle_2_HealSurrounded",
    messageTime: 75,
    textMessage:
      "If an opponent is surrounded by allied units, you can Shadow Wave those units and deal huge damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dazzle_shadow_wave" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dazzle",
    audioFile: "ownHero/Dazzle_3_GraveHeal",
    messageTime: [3 * 60, 9 * 60, 15 * 60],
    textMessage:
      "Use Shadow Wave as Shallow Grave is about to expire to provide a burst of heal.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dazzle_shallow_grave" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dazzle",
    audioFile: "ownHero/Dazzle_4_GraveTP",
    messageTime: [3 * 60 + 15, 9 * 60 + 15, 15 * 60 + 15],
    textMessage:
      "When in trouble, you can attempt to Shallow Grave yourself and teleport out.",
    audience: [Audience.ALL],
    image: { type: "item", name: "tpscroll" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "dazzle",
    audioFile: "ownHero/Dazzle_5_ActivatableItems",
    messageTime: [6 * 60 + 15, 14 * 60 + 15, 22 * 60 + 15],
    textMessage:
      "Prioritize purchasing and using activatable items and neutral items to take advantage of Bad Juju.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dazzle_bad_juju" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "dazzle",
    audioFile: "ownHero/Dazzle_6_DontShow",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing yourself to opponents at the start of the fight. You are number 1 priority for them to kill.",
    audience: [Audience.ROLE_SUPPORT],
  },
  /*   {
    category: "OwnHero",
    npcHeroName: "dazzle",
    audioFile: "ownHero/Dazzle_7_JujuStacking",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Percentage cooldown reductions from items or runes don't stack with Bad Juju. Higher value prevails.",
    audience: [Audience.ALL],
  }, */
  {
    category: "OwnHero",
    npcHeroName: "dazzle",
    audioFile: "ownHero/Dazzle_8_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Purchase Aghanim's Shard at 15 minute mark as it provides extra control and kills off basic illusions.",
    audience: [Audience.ALL],
  },
  /* {
    category: "OwnHero",
    npcHeroName: "dazzle",
    audioFile: "ownHero/Dazzle_9_HandofMidas",
    messageTime: 13 * 60 + 15,
    textMessage:
      "Use Hand of Midas as often as you can with the active of Bad Juju.",
    audience: [Audience.ALL],
    image: { type: "item", name: "hand_of_midas" },
  }, */
  {
    category: `OwnHero`,
    npcHeroName: `dazzle`,
    audioFile: `ownHero/Dazzle_10_ChainShallowGrave`,
    messageTime: 27 * 60 + 15,
    textMessage: `Use Bad Juju twice to reset the cooldown of Shallow Grave every time post level 12.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `dazzle_bad_juju` },
  },
  {
    category: `OwnHero`,
    npcHeroName: `dazzle`,
    audioFile: `ownHero/Dazzle_11_OverHealFacet`,
    messageTime: [25 * 60 + 15, 35 * 60 + 15, 45 * 60 + 15],
    textMessage: `With the Nothl Boon facet, look to over heal your front line core when sieging or defending high ground to give them a damage barrier.`,
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "dazzle",
    audioFile: "enemyHero/Dazzle_1_PoisonTouch",
    messageTime: -60,
    textMessage:
      `Avoid being hit by Dazzle while under effect of Poison Touch. If he has the Poison Bloom facet, move away from him or hide in treelines before he attacks you four times.`,
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dazzle",
    audioFile: "enemyHero/Dazzle_2_ShadowWave",
    messageTime: -50,
    textMessage:
      "Shadow Wave does a lot of damage if you are surrounded by enemy units.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dazzle",
    audioFile: "enemyHero/Dazzle_3_SpiritVessel",
    messageTime: -40,
    textMessage:
      "Someone buy a Spirit Vessel to offset healing from Dazzle and to finish off the Shallow Graved hero.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dazzle",
    audioFile: "enemyHero/Dazzle_4_Focus",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Look to focus Dazzle in teamfights as he is squishy but provides a lot of sustain if left unchecked.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dazzle",
    audioFile: "enemyHero/Dazzle_5_GapClosingItems",
    messageTime: 12 * 60,
    textMessage: "Buy gap closing items to get on top of Dazzle.",
    audience: [Audience.ALL],
  },

  // 25. Death Prophet
  {
    category: "OwnHero",
    npcHeroName: "death_prophet",
    audioFile: "ownHero/DeathProphet_1_SecureRanged",
    messageTime: 90,
    textMessage:
      "Secure range creep lasthits with Crypt Swarm and possibly hit opponents as well.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "death_prophet_carrion_swarm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "death_prophet",
    audioFile: "ownHero/DeathProphet_1_SecureLasthits",
    messageTime: 105,
    textMessage:
      "Try to throw an auto attack and use crypt swarm at the same time to secure last hits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "death_prophet_carrion_swarm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "death_prophet",
    audioFile: "ownHero/DeathProphet_2_SurvivabilitySiphons",
    messageTime: 2 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Death Prophet's survivability is related to Spirit Siphon usage. Siphon as many units as possible for decent duration.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "death_prophet_spirit_siphon" },
  },
  {
    category: "OwnHero",
    npcHeroName: "death_prophet",
    audioFile: "ownHero/DeathProphet_3_EarlyPressure",
    messageTime: [6 * 60, 11 * 60, 16 * 60],
    textMessage:
      "Death Prophet excels at taking towers and Roshan early with Exorcism. Call for team to group up around you.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "death_prophet_exorcism" },
  },
  {
    category: "OwnHero",
    npcHeroName: "death_prophet",
    audioFile: "ownHero/DeathProphet_4_ExorcismDown",
    messageTime: 6 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid playing aggressively when Exorcism is down. Push out waves and prepare for the next move.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "death_prophet_exorcism" },
  },
  {
    category: "OwnHero",
    npcHeroName: "death_prophet",
    audioFile: "ownHero/DeathProphet_5_ItemizeTank",
    messageTime: 8 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Itemize for survivability and to stay in the middle of the fight. Exorcism and Spirit Siphons will do the damage.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "death_prophet",
    audioFile: "ownHero/DeathProphet_6_CyclonePlay",
    messageTime: [10 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "When in trouble, you can Spirit Siphon opponents and Eul's yourself. You are still being healed in the air.",
    audience: [Audience.ALL],
    image: { type: "item", name: "cyclone" },
  },
  {
    category: "OwnHero",
    npcHeroName: "death_prophet",
    audioFile: "ownHero/DeathProphet_7_HealReductions",
    messageTime: [10 * 60 + 30, 15 * 60 + 30, 20 * 60 + 30],
    textMessage:
      "Healing reductions are great problem for Death Prophet. You can itemize against some of them.",
    audience: [Audience.ALL],
    image: { type: "item", name: "spirit_vessel" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "death_prophet",
    audioFile: "enemyHero/DeathProphet_1_Burst",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "When Death Prophet has Exorcism on, either burst her down or run away.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "death_prophet",
    audioFile: "enemyHero/DeathProphet_2_DefendTowers",
    messageTime: [8 * 60 + 10, 18 * 60 + 10, 28 * 60 + 10],
    textMessage:
      "Look to defend towers against Death Prophet and fight her when Exorcism ends.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "death_prophet",
    audioFile: "enemyHero/DeathProphet_3_AntiHealingItems",
    messageTime: 12 * 60,
    textMessage:
      "Items that reduce healing are good against Death Prophet's Spirit Siphons and Exorcism.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "death_prophet",
    audioFile: "enemyHero/DeathProphet_4_ArmorItems",
    messageTime: 12 * 60 + 10,
    textMessage: "Armor items are good against physical damage of Exorcism.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "death_prophet",
    audioFile: "enemyHero/DeathProphet_5_DispelItems",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Items that provide dispels are good against Death Prophet's Silence.",
    audience: [Audience.ALL],
  },

  // 26. Disruptor
  {
    category: "OwnHero",
    npcHeroName: "disruptor",
    audioFile: "ownHero/Disruptor_1_Harassing",
    messageTime: -15,
    textMessage:
      "Make use of Thunder Strike's movement speed slow and vision over opponent to follow up with few right-clicks.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "disruptor_thunder_strike" },
  },
  {
    category: "OwnHero",
    npcHeroName: "disruptor",
    audioFile: "ownHero/Disruptor_2_GlimpseBack",
    messageTime: 75,
    repeatTime: 10 * 60,
    textMessage:
      "Whenever you see or expect an opponent to teleport in, be ready to Glimpse him back.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "disruptor_glimpse" },
  },
  {
    category: "OwnHero",
    npcHeroName: "disruptor",
    audioFile: "ownHero/Disruptor_3_FieldVision",
    messageTime: [2 * 60 + 15, 9 * 60 + 15, 16 * 60 + 15],
    textMessage:
      `While you have the Thunderstorm facet, Kinetic Field provides vision in the middle of it. You can use it to scout pillars for wards or Roshan pit.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "disruptor_kinetic_field" },
  },
  {
    category: "OwnHero",
    npcHeroName: "disruptor",
    audioFile: "ownHero/Disruptor_4_GlimpseIllusion",
    messageTime: [8 * 60 + 15, 15 * 60 + 15, 22 * 60 + 15],
    textMessage: "Glimpse instantly destroys basic illusions.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "disruptor_glimpse" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "disruptor",
    audioFile: "ownHero/Disruptor_5_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage: "Pick up Aghanim's Shard as soon as possible to help your team move faster around enemy targets.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "disruptor",
    audioFile: "ownHero/Disruptor_6_AghanimsScepter",
    messageTime: 25 * 60,
    repeatTime: 8 * 60,
    textMessage:
      "In late game, Aghanim's Scepter can turn your Static Storm into a win condition.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "disruptor",
    audioFile: "enemyHero/Disruptor_1_HarassingTools",
    messageTime: -10,
    textMessage:
      "Disruptor's main harassing tools is Thunder Strike. Heroes with dispel abilities are strong against him",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "disruptor",
    audioFile: "enemyHero/Disruptor_2_ThunderStrike",
    messageTime: 30,
    textMessage:
      "You can use Disruptor's Thunder Strike AOE damage by walking into your creep wave and damaging it",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "disruptor",
    audioFile: "enemyHero/Disruptor_3_Teleport",
    messageTime: [1 * 60, 8 * 60 + 45],
    textMessage:
      "Don't teleport in plain sight around Disruptor as you might get Glimpsed back to where you came from",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "disruptor",
    audioFile: "enemyHero/Disruptor_4_Glimpse1",
    messageTime: [11 * 60, 21 * 60],
    textMessage:
      "Hide behind trees or run to highground before teleporting or escaping, so you don't get caught by Glimpse.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "disruptor",
    audioFile: "enemyHero/Disruptor_5_Glimpse2",
    messageTime: 16 * 60,
    textMessage:
      "Disruptor's Glimpse can be dodged by certain spells and items such as BKB or Manta Style",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "disruptor",
    audioFile: "enemyHero/Disruptor_6_BKB",
    messageTime: [33 * 60, 53 * 60],
    textMessage:
      "All of Disruptor's spells are countered by Black King Bar until he has Aghanim's Scepter. Once he has it, you won't be able to activate Black King Bar under Static Storm as all items are muted",
    chatMessage:
      "Disruptor's spells are countered by BKB until he has Aghs, as all items are muted under Static Storm",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "disruptor",
    audioFile: "enemyHero/Disruptor_7_ClumpUp",
    messageTime: [26 * 60, 46 * 60],
    textMessage:
      "Don't clump up because of Disruptor's Kinetic Field and Static Storm combination. It takes 1.2 seconds for Kinetic Field to form so you have a small window to get out. You can't Force Staff out of it and many other mobility spells are not working",
    chatMessage:
      "Don't clump up because of Disruptor's Kinetic Field and Static Storm combination",
    audience: [Audience.ALL],
  },

  // 27. Doom
  /* {
    category: "OwnHero",
    npcHeroName: "doom_bringer",
    audioFile: "ownHero/Doom_1_DevourRanged",
    messageTime: -60,
    textMessage:
      "Consider going behind the opponents tier 1 or tier 2 tower on the first wave to devour ranged creep even earlier.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "doom_bringer_devour" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "doom_bringer",
    audioFile: "ownHero/Doom_2_DontDie",
    messageTime: 15,
    textMessage:
      "Bonus gold from Devour is granted at the end of the Devour cycle and you will lose it if you die.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "doom_bringer_devour" },
  },
  {
    category: "OwnHero",
    npcHeroName: "doom_bringer",
    audioFile: "ownHero/Doom_3_Blink",
    messageTime: 11 * 60,
    textMessage:
      "Once you get Blink Dagger, try to make use of it immediately before your opponents see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "doom_bringer",
    audioFile: "ownHero/Doom_4_Centaur",
    messageTime: 11 * 60 + 15,
    textMessage:
      "Usually you want to devour Centaur Conqueror and obtain War Stomp to disable opponents after blink and cast Doom.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "doom_bringer_devour" },
  },
  {
    category: "OwnHero",
    npcHeroName: "doom_bringer",
    audioFile: "ownHero/Doom_5_DontShow",
    messageTime: 12 * 60 + 45,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid showing yourself at the start of the fight and wait for your Doom target to show.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "doom_bringer_doom" },
  },
  {
    category: "OwnHero",
    npcHeroName: "doom_bringer",
    audioFile: "ownHero/Doom_6_DoomCooldown",
    messageTime: 13 * 60,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid fighting while Doom is on cooldown. Push out lanes or play defensively.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "doom_bringer_doom" },
  },
  {
    category: "OwnHero",
    npcHeroName: "doom_bringer",
    audioFile: "ownHero/Doom_7_DoomBlock",
    messageTime: 13 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Check opponents' inventories for Linken's Spheres and Lotus Orbs. Be careful not to drop Doom on those.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "doom_bringer_doom" },
  },
  {
    category: "OwnHero",
    npcHeroName: "doom_bringer",
    audioFile: "ownHero/Doom_8_Devour",
    messageTime: 30,
    textMessage:
      "Look to use Devour as frequently as possible on lane creeps or neutral creeps to keep getting gold and XP.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "doom_bringer_devour" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "doom_bringer",
    audioFile: "enemyHero/Doom_1_EarlyPressure",
    messageTime: -60,
    textMessage: "Doom is a weak laner at lower levels. Pressure him early on.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "doom_bringer",
    audioFile: "enemyHero/Doom_2_ArmorItems",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "The Doom spell has long cooldown. Look to play aggressively when it is down.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "doom_bringer",
    audioFile: "enemyHero/Doom_3_AntiDoomItems",
    messageTime: 12 * 60,
    textMessage:
      "Linken's Sphere, status resistance items and Lotus Orb are good at dealing with The Doom spell.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "doom_bringer",
    audioFile: "enemyHero/Doom_4_Aegis",
    messageTime: [15 * 60 + 10, 25 * 60 + 10, 35 * 60 + 10],
    textMessage:
      "Acquiring Aegis for your core is a good way of dealing with The Doom spell. Look to kill Roshan.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "doom_bringer",
    audioFile: "enemyHero/Doom_5_EscapeItems",
    messageTime: [8 * 60 + 10, 16 * 60 + 10, 24 * 60 + 10, 32 * 60 + 10],
    textMessage:
      "Until Dooms level 25 mute talent, you can still use your own items to kite or escape while Doomed.",
    audience: [Audience.ALL],
  },

  // 28. Dragon Knight
  {
    category: "OwnHero",
    npcHeroName: "dragon_knight",
    audioFile: "ownHero/DragonKnight_1_MeleeHero",
    messageTime: 15,
    textMessage:
      "Dragon Knight trades well in lane with his Corrosive dragon facet. Look to use that to pressure the enemy melee heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dragon_knight_dragon_blood" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dragon_knight",
    audioFile: "ownHero/DragonKnight_2_LaneSpellUsage",
    messageTime: 30,
    textMessage:
      "Try to use Breathe Fire to secure ranged creeps during the laning stage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dragon_knight_breathe_fire" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dragon_knight",
    audioFile: "ownHero/DragonKnight_3_DragonTail",
    messageTime: 2 * 60,
    textMessage:
      "Use Dragon Tail often in lane against the enemy hero to mess with their last hitting ability, especially to contest for the ranged creep.",
    audience: [Audience.ROLE_MID],
    image: { type: "ability", name: "dragon_knight_dragon_tail" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dragon_knight",
    audioFile: "ownHero/DragonKnight_4_TakeTowers",
    messageTime: 6 * 60,
    textMessage:
      "Dragon Knight is great at taking buildings down early due to the Corrosive Breath facet amplified during dragon form with bonus right click damage added.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dragon_knight_elder_dragon_form" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dragon_knight",
    audioFile: "ownHero/DragonKnight_5_Blink",
    messageTime: 10 * 60,
    textMessage:
      "Once you get Blink Dagger, try to make use of it immediately before opponent see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dragon_knight",
    audioFile: "ownHero/DragonKnight_6_FollowUp",
    messageTime: 10 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Make sure you have allies nearby when you initiate. Dragon Knight doesn't do much burst damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dragon_knight",
    audioFile: "ownHero/DragonKnight_7_UltiCooldown",
    messageTime: 10 * 60 + 30,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid fighting while Dragon Form is on cooldown. Push out lanes or play defensively.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dragon_knight_elder_dragon_form" },
  },
  {
    category: "OwnHero",
    npcHeroName: "dragon_knight",
    audioFile: "ownHero/DragonKnight_8_CounterItems",
    messageTime: 10 * 60 + 45,
    textMessage:
      "Break effects and healing reductions are a big problem for Dragon Knight. Itemize against those.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "dragon_knight_dragon_blood" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "dragon_knight",
    audioFile: "enemyHero/DragonKnight_1_SpiritVessel",
    messageTime: -60,
    textMessage:
      "Someone should buy Spirit Vessel against Dragon Knight to deal high damage and offset his regeneration.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dragon_knight",
    audioFile: "enemyHero/DragonKnight_2_EarlyPressure",
    messageTime: -50,
    textMessage:
      "Pressure Dragon Knight early on before he gets 2 or more points in Dragon Blood.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dragon_knight",
    audioFile: "enemyHero/DragonKnight_3_DefendTowers",
    messageTime: [8 * 60, 13 * 60, 18 * 60],
    textMessage:
      "Elder Dragon Form is really good at destroying towers. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dragon_knight",
    audioFile: "enemyHero/DragonKnight_4_BlinkShadowBlade",
    messageTime: 12 * 60,
    textMessage:
      "Be aware of Dragon Knight's Blink Dagger or Shadow Blade timing.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dragon_knight",
    audioFile: "enemyHero/DragonKnight_5_DragonTailCounters",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Linken's Sphere, status resistance and Lotus Orb are good against Dragon Tail.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "dragon_knight",
    audioFile: "enemyHero/DragonKnight_6_Breaks",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Break effects remove Dragon Blood - the passive that makes Dragon Knight tanky.",
    audience: [Audience.ALL],
  },

  // 29. Drow Ranger
  {
    category: "OwnHero",
    npcHeroName: "drow_ranger",
    audioFile: "ownHero/DrowRanger_1_FrostArrows",
    messageTime: 15,
    textMessage:
      "Use Frost Arrows frequently to harass as you don't pull aggro but also to secure lasthits with extra damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "drow_ranger_frost_arrows" },
  },
  {
    category: "OwnHero",
    npcHeroName: "drow_ranger",
    audioFile: "ownHero/DrowRanger_2_LaningStage",
    messageTime: 50,
    textMessage:
      "Be careful of allowing the enemies to get to close during laning stage, You are especially vulnerable when your support is pulling the lane.",
    audience: [Audience.ROLE_CARRY],
    image: { type: "item", name: "ironwood_tree" },
  },
  {
    category: "OwnHero",
    npcHeroName: "drow_ranger",
    audioFile: "ownHero/DrowRanger_3_Multishot",
    messageTime: [75, 7 * 60 + 15],
    textMessage:
      "Multishot does the most damage when used point blank as all the arrows will hit the target.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "drow_ranger_multishot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "drow_ranger",
    audioFile: "ownHero/DrowRanger_4_GustTP",
    messageTime: [4 * 60, 9 * 60],
    textMessage: "When in trouble, you can potentially Gust and teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "drow_ranger_wave_of_silence" },
  },
  {
    category: "OwnHero",
    npcHeroName: "drow_ranger",
    audioFile: "ownHero/DrowRanger_5_Agility",
    messageTime: [8 * 60, 14 * 60],
    textMessage:
      "Drow loves agility stat as it gets further increased by Marksmanship.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "drow_ranger_marksmanship" },
  },
  {
    category: "OwnHero",
    npcHeroName: "drow_ranger",
    audioFile: "ownHero/DrowRanger_6_Positioning",
    messageTime: 10 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "Drow is all about positioning. Avoid showing yourself too early in the fight and maintain distance.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "drow_ranger",
    audioFile: "ownHero/DrowRanger_7_Multishotwave",
    messageTime: [12 * 60 + 15, 20 * 60 + 15],
    textMessage:
      "Use Multishot to push waves while staying hidden in trees to avoid getting caught out when killing lane creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "drow_ranger_multishot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "drow_ranger",
    audioFile: "ownHero/DrowRanger_8_scepter",
    messageTime: [16 * 60],
    textMessage:
      "When you get your aghanims scepter online, your single target damage increases dramatically. ",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "drow_ranger",
    audioFile: "enemyHero/DrowRanger_1_Harass",
    messageTime: 20,
    textMessage:
      "Drow Ranger is slow and has low armor. Look to harass her as much as you can on early levels.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "drow_ranger",
    audioFile: "enemyHero/DrowRanger_2_Multishot",
    messageTime: [1 * 60 + 20, 4 * 60 + 20],
    textMessage:
      "Avoid being in point target range of Drow Ranger when she starts channeling Multishot",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "drow_ranger",
    audioFile: "enemyHero/DrowRanger_3_AreaOfEffect",
    messageTime: [6 * 60 + 30, 10 * 60 + 45],
    textMessage:
      "Drow Ranger's Gust and Multishot have cone shaped area of effect. If you are on top of her look to side step or run past or through her when she uses those spells",
    chatMessage:
      "When Drow Ranger uses Gust & Multishot and you are on top of her, try to step aside, run past or through her",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "drow_ranger",
    audioFile: "enemyHero/DrowRanger_4_GapClosing",
    messageTime: 11 * 60 + 20,
    textMessage:
      "Gap closing items are good against Drow Ranger as she is a glass canon hero. Note that her Marksmanship is disabled when you are within 400 range of her",
    chatMessage:
      "Gap closing items are good against Drow Ranger as she is a glass canon hero",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "drow_ranger",
    audioFile: "enemyHero/DrowRanger_5_Halberd",
    messageTime: 14 * 60 + 10,
    textMessage:
      "Halberd's ability is amazing against Drow Ranger as it disarms her for 5 seconds. Keep in mind that Marksmanship procs pierce through evasion (true strike)",
    chatMessage:
      "Halberd's ability is amazing against Drow Ranger as it disarms her for 5 seconds",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "drow_ranger",
    audioFile: "enemyHero/DrowRanger_6_TeamFights",
    messageTime: [12 * 60 + 30, 22 * 60 + 30, 32 * 60 + 30, 42 * 60 + 30],
    textMessage:
      "Drow Ranger should be a priority target in team fights as her team loses the Precision Aura when she dies.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "drow_ranger",
    audioFile: "enemyHero/DrowRanger_7_Smoke",
    messageTime: [18 * 60 + 15, 38 * 60 + 15, 58 * 60 + 15],
    textMessage: "Use Smoke, to wrap around Drow Ranger and kill her.",
    audience: [Audience.ALL],
  },

  // 30. Earth Spirit
  {
    category: "OwnHero",
    npcHeroName: "earth_spirit",
    audioFile: "ownHero/EarthSpirit_1_Observer",
    messageTime: -90,
    textMessage:
      "You can place Observer Wards on the map quickly, especially on mid, by using Rolling Boulder.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "earth_spirit",
    audioFile: "ownHero/EarthSpirit_2_DestroyTrees",
    messageTime: -60,
    textMessage:
      "First three abilities can destroy trees which can be useful against certain heroes.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "earth_spirit",
    audioFile: "ownHero/EarthSpirit_3_CreepEquilibrium",
    messageTime: 15,
    textMessage:
      "The further the opponents are from their tower, the deadlier you are. You can potentially roll-kick an opponent under your tower.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "earth_spirit_boulder_smash" },
  },
  {
    category: "OwnHero",
    npcHeroName: "earth_spirit",
    audioFile: "ownHero/EarthSpirit_4_Hijack",
    messageTime: 30,
    textMessage:
      "Consider hijacking the second wave to establish creep equilibrium closer to your tower.",
    audience: [Audience.ROLE_SUPPORT_SOFT],
  },
  {
    category: "OwnHero",
    npcHeroName: "earth_spirit",
    audioFile: "ownHero/EarthSpirit_5_Roll",
    messageTime: 45,
    textMessage:
      "Ideally roll from the fog when an opponent is somewhat stationary, for example when going for last hit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "earth_spirit_rolling_boulder" },
  },
  {
    category: "OwnHero",
    npcHeroName: "earth_spirit",
    audioFile: "ownHero/EarthSpirit_6_Roaming",
    messageTime: [5 * 60 + 30, 7 * 60 + 30, 9 * 60 + 30],
    textMessage: "Secure active runes and use portals to gank other lanes.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "earth_spirit",
    audioFile: "ownHero/EarthSpirit_7_ExistingStones",
    messageTime: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Make use of existing stones in the fights as much as you can. Avoid over using Stone Remnants.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "earth_spirit_stone_caller" },
  },
  {
    category: "OwnHero",
    npcHeroName: "earth_spirit",
    audioFile: "ownHero/EarthSpirit_8_SetupKills",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Earth Spirit is great at setting up kills. Communicate with your teammates as you will need follow up damage.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "earth_spirit",
    audioFile: "ownHero/EarthSpirit_9_AghanimsShard",
    messageTime: 27 * 60,
    textMessage:
      "Pick up Aghanims Shard with max Geomagnetic Grip to save allied heroes.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "earth_spirit",
    audioFile: "enemyHero/EarthSpirit_1_Observer",
    messageTime: -60,
    textMessage:
      "Bring an Observer Ward to keep an eye on Earth Spirit's aggressive movements and dodge Rolling Boulders.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "earth_spirit",
    audioFile: "enemyHero/EarthSpirit_2_Kick",
    messageTime: 30,
    textMessage:
      "Be careful when playing at opponent's tower as Earth Spirit can roll and kick you under the tower.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "earth_spirit",
    audioFile: "enemyHero/EarthSpirit_3_Roam",
    messageTime: [40, 3 * 60 + 30, 5 * 60 + 30],
    textMessage:
      "Earth Spirit tends to roam a lot. Keep track of his movements and have teleport ready.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "earth_spirit",
    audioFile: "enemyHero/EarthSpirit_4_AntimagicItems",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance and spell imunity items are great against Earth Spirit's magical damage and disables.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "earth_spirit",
    audioFile: "enemyHero/EarthSpirit_5_DispelItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Items that provide dispels are great at removing Geomagnetic Grip silence and Magnetize.",
    audience: [Audience.ALL],
  },

  // 31. Earthshaker
  {
    category: "OwnHero",
    npcHeroName: "earthshaker",
    audioFile: "ownHero/Earthshaker_1_FissureBlock",
    messageTime: -20,
    textMessage:
      "Consider Fissure blocking the first wave to have better creep equilibrium.",
    audience: [Audience.ROLE_SUPPORT_SOFT],
    image: { type: "ability", name: "earthshaker_fissure" },
  },
  {
    category: "OwnHero",
    npcHeroName: "earthshaker",
    audioFile: "ownHero/Earthshaker_2_EnchantTotem",
    messageTime: 75,
    textMessage:
      "Use Enchant Totem to harass opponents or secure creep last hits, especially ranged ones.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "earthshaker_enchant_totem" },
  },
  {
    category: "OwnHero",
    npcHeroName: "earthshaker",
    audioFile: "ownHero/Earthshaker_3_FarmBlink",
    messageTime: 9 * 60,
    textMessage:
      "At the end of the laning stage, find a lane for yourself to farm a Blink Dagger and catch up with levels.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "earthshaker",
    audioFile: "ownHero/Earthshaker_4_Blink",
    messageTime: 10 * 60 + 45,
    textMessage:
      "Once you get Blink Dagger, try to make use of it immediately before opponent see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "earthshaker",
    audioFile: "ownHero/Earthshaker_5_ForgetYou",
    messageTime: 12 * 60,
    repeatTime: 8 * 60,
    textMessage:
      "Avoid showing yourself so the opponents forget about you and clump up, and your dagger doesn't get canceled.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "earthshaker",
    audioFile: "ownHero/Earthshaker_6_FissureSplit",
    messageTime: 12 * 60 + 15,
    repeatTime: 8 * 60,
    textMessage:
      "In the fights, split the opponents with Fissure into two parts or isolate an opponent from the rest.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "earthshaker_fissure" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "earthshaker",
    audioFile: "enemyHero/Earthshaker_1_FissureBlock",
    messageTime: 20,
    textMessage:
      "If Earthsaker is blocking the first wave with fissure, look to pull back the lane as soon as possible",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "earthshaker",
    audioFile: "enemyHero/Earthshaker_2_FissureKill",
    messageTime: [45, 3 * 60 + 15],
    textMessage:
      "Earthshaker uses fissure to block off heroes and land kills. Be mindful about your positioning",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "earthshaker",
    audioFile: "enemyHero/Earthshaker_3_Dagger1",
    messageTime: 10 * 60 + 15,
    textMessage:
      "Keep checking Earthshaker to see if he has Dagger yet. Don't let him surprise you with multi-hero Echo Slam",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "earthshaker",
    audioFile: "enemyHero/Earthshaker_4_Dagger2",
    messageTime: 13 * 60 + 30,
    textMessage: `Once Earthshaker has Blink Dagger or Aghanims Scepter, control him in teamfights before he uses all spells`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "earthshaker",
    audioFile: "enemyHero/Earthshaker_5_Dagger3",
    messageTime: 15 * 60 + 15,
    textMessage: "Earthshaker is likely to have Dagger by now",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "earthshaker",
    audioFile: "enemyHero/Earthshaker_6_ClumpUp",
    messageTime: [
      20 * 60 + 15,
      30 * 60 + 15,
      40 * 60 + 15,
      50 * 60 + 15,
      60 * 60 + 15,
    ],
    textMessage: "Don't clump up or Earthshaker might kill you all",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "earthshaker",
    audioFile: "enemyHero/Earthshaker_7_ShadowBlade",
    messageTime: [22 * 60 + 45, 42 * 60 + 45],
    textMessage:
      "Earthshaker might also buy Shadow Blade. If he does, purchase detection",
    audience: [Audience.ALL],
  },

  // 32. Elder Titan
  {
    category: "OwnHero",
    npcHeroName: "elder_titan",
    audioFile: "ownHero/ElderTitan_1_UnblockCamps",
    messageTime: 15,
    textMessage:
      "Make sure to keep nearby camps unblocked as you want Astral Spirit to pass through neutral creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "elder_titan_ancestral_spirit" },
  },
  {
    category: "OwnHero",
    npcHeroName: "elder_titan",
    audioFile: "ownHero/ElderTitan_2_CreepEquilibrium",
    messageTime: 30,
    textMessage:
      "Keep creep equilibrium close to your tower to have more distance to run the enemies down under Astral Spirit buff.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "elder_titan_ancestral_spirit" },
  },
  {
    category: "OwnHero",
    npcHeroName: "elder_titan",
    audioFile: "ownHero/ElderTitan_3_NaturalOrderDuality",
    messageTime: [90, 5 * 60 + 30],
    textMessage:
      "Natural Order around Astral Spirit reduces magic resistance while around the hero there's armor reduction.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "elder_titan_natural_order" },
  },
  {
    category: "OwnHero",
    npcHeroName: "elder_titan",
    audioFile: "ownHero/ElderTitan_4_NaturalOrderHero",
    messageTime: [105, 5 * 60 + 45],
    textMessage:
      "When there's no Astral Spirit out, both Natural Order's magical and armor reduction applies around your hero.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "elder_titan_natural_order" },
  },
  {
    category: "OwnHero",
    npcHeroName: "elder_titan",
    audioFile: "ownHero/ElderTitan_5_SpiritsMovementSpeed",
    messageTime: [2 * 60, 12 * 60],
    textMessage:
      "Astral Spirits movement speed is equal to your heros at Astral Spirit cast, e.g. pop Boots of Bearing or Phase Boots before casting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "elder_titan_ancestral_spirit" },
  },
  /*   {
    category: "OwnHero",
    npcHeroName: "elder_titan",
    audioFile: "ownHero/ElderTitan_6_SpiritScout",
    messageTime: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Astral Spirit's movement speed is equal to your hero's at Astral Spirit cast, e.g. pop Phase Boots before casting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "elder_titan_ancestral_spirit" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "elder_titan",
    audioFile: "ownHero/ElderTitan_7_Combo",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage: `When opponents clump up, cast Astral Spirit and channel Echo Stomp followed by Earth Splitter.`,
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "elder_titan",
    audioFile: "ownHero/ElderTitan_8_AghanimsScepter",
    messageTime: 18 * 60 + 45,
    textMessage: `Once you get hold of Aghanims Scepter, you can enter the fights and right click more easily with debuff immunity.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "elder_titan",
    audioFile: "enemyHero/ElderTitan_1_AstralSpirit1",
    messageTime: -60,
    textMessage:
      "Avoid being hit by Elder Titan's Astral Spirit and consider blocking a pull camp.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "elder_titan",
    audioFile: "enemyHero/ElderTitan_2_AstralSpirit2",
    messageTime: -50,
    textMessage:
      "Avoid trading with Elder Titan when the Astral Spirit returns to him.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "elder_titan",
    audioFile: "enemyHero/ElderTitan_3_ClumpUp",
    messageTime: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Echo Stomp into Earth Splitter combo.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "elder_titan",
    audioFile: "enemyHero/ElderTitan_4_NaturalOrder",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Buy armor items, magic barrier giving items and Black King Bar against Elder Titan's Natural Order.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "elder_titan",
    audioFile: "enemyHero/ElderTitan_5_AstralSpiritDispel",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Astral Spirit buff on Elder Titan can be dispelled so items and spells that dispel Elder Titan are good.",
    audience: [Audience.ALL],
  },

  // 33. Ember Spirit
  {
    category: "OwnHero",
    npcHeroName: "ember_spirit",
    audioFile: "ownHero/EmberSpirit_1_Dodge",
    messageTime: -15,
    textMessage:
      "You can dodge many spells and ranged attacks with Sleight of Fist or by activating Remnants.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ember_spirit_sleight_of_fist" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ember_spirit",
    audioFile: "ownHero/EmberSpirit_2_LaningTips",
    messageTime: 2 * 60 + 30,
    textMessage:
      "You can push out the lane with Flame Guard or Sleight Of Fist as the river runes are about to spawn.",
    audience: [Audience.ROLE_MID],
    image: { type: "ability", name: "ember_spirit_flame_guard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ember_spirit",
    audioFile: "ownHero/EmberSpirit_2_Orb_of_corrosion",
    messageTime: 5 * 60,
    textMessage:
      "Once you have blight stone, you should start spamming sleight of fist on the enemy mid laner.",
    audience: [Audience.ROLE_MID],
    image: { type: "ability", name: "ember_spirit_sleight_of_first" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ember_spirit",
    audioFile: "ownHero/EmberSpirit_3_ControlRunes",
    messageTime: 5 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Active rune control is important for Ember Spirit's game. You can place a remnant at one rune and run to the other one to secure them.",
    audience: [Audience.ALL],
    image: { type: "rune", name: "arcane" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ember_spirit",
    audioFile: "ownHero/EmberSpirit_4_SleightRemnants",
    messageTime: [5 * 60 + 45, 15 * 60 + 45],
    textMessage:
      "You can drop and activate Fire Remnants while Sleight of Fisting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ember_spirit_fire_remnant" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ember_spirit",
    audioFile: "ownHero/EmberSpirit_5_BaseRemnant",
    messageTime: [6 * 60, 16 * 60],
    textMessage:
      "When low on health, you can leave the Fire Remnant behind, teleport to base and activate the remnant.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ember_spirit_fire_remnant" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ember_spirit",
    audioFile: "ownHero/EmberSpirit_6_RemnantSpot",
    messageTime: 6 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When leaving remant behind, it is good to drop it in neutral camp or at the rune spot.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ember_spirit_fire_remnant" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ember_spirit",
    audioFile: "ownHero/EmberSpirit_7_ProcItems",
    messageTime: 9 * 60,
    textMessage:
      "Items with proc chance are great for Ember Spirit as they proc frequently during Sleight of Fist.",
    audience: [Audience.ALL],
    image: { type: "item", name: "maelstrom" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ember_spirit",
    audioFile: "ownHero/EmberSpirit_8_Backline",
    messageTime: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Ember Spirit is great at penetrating into opponents' backline due to high mobility of Fire Remnants.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ember_spirit_fire_remnant" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ember_spirit",
    audioFile: "ownHero/EmberSpirit_12_Backline",
    messageTime: [20 * 60, 25 * 60],
    textMessage:
      "If you are struggling to reach the backline aghanims scepter is great at closing the gap and increasing embers mobility.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ember_spirit",
    audioFile: "ownHero/EmberSpirit_9_Splitpush",
    messageTime: [12 * 60 + 15, 20 * 60 + 15],
    textMessage:
      "Ember Spirit is great at splitpushing as he is elusive and can always have a remnant left behind.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ember_spirit_fire_remnant" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "ember_spirit",
    audioFile: "enemyHero/EmberSpirit_1_FlameGuardDispel",
    messageTime: -60,
    textMessage:
      "Flame Guard is most of Ember Spirit's damage early. Pop it with magical damage or dispel it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ember_spirit",
    audioFile: "enemyHero/EmberSpirit_2_RuneControl",
    messageTime: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Make sure you are controlling power runes against Ember Spirit. He likes to bottle and gank with those.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ember_spirit",
    audioFile: "enemyHero/EmberSpirit_3_ClumpUp",
    messageTime: [12 * 60, 22 * 60, 32 * 60],
    textMessage: "Avoid clumping up against Sleight of Fist spam.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ember_spirit",
    audioFile: "enemyHero/EmberSpirit_4_DisableItems",
    messageTime: 12 * 60 + 10,
    textMessage: "Items that can root or stun elusive Ember Spirit are great.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ember_spirit",
    audioFile: "enemyHero/EmberSpirit_5_SplitPush",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Ember Spirit is really good at split-pushing. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 34. Enchantress
  {
    category: "OwnHero",
    npcHeroName: "enchantress",
    audioFile: "ownHero/Enchantress_1_Enchant",
    messageTime: -30,
    textMessage: "Enchant can take over opponents' summons and illusions.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enchantress_enchant" },
  },
  {
    category: "OwnHero",
    npcHeroName: "enchantress",
    audioFile: "ownHero/Enchantress_2_Neutrals",
    messageTime: 15,
    textMessage:
      "Make sure the nearby neutral camps are unblocked so you can use Enchant.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enchantress_enchant" },
  },
  {
    category: "OwnHero",
    npcHeroName: "enchantress",
    audioFile: "ownHero/Enchantress_3_Tanky",
    messageTime: 8 * 60,
    textMessage: `Enchantress is tanky in early to mid game due to Untouchable and Natures Attendants. Play aggressively.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "enchantress_untouchable" },
  },
  {
    category: "OwnHero",
    npcHeroName: "enchantress",
    audioFile: "ownHero/Enchantress_4_EnchantedCreeps",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, you can push out sidelanes or scout with Enchanted creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enchantress_enchant" },
  },
  /*   {
    category: "OwnHero",
    npcHeroName: "enchantress",
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
    npcHeroName: "enchantress",
    audioFile: "ownHero/Enchantress_5_Break",
    messageTime: [10 * 60 + 30, 20 * 60 + 30],
    textMessage:
      "Break effects and healing reduction are problematic but you can counter them with items or playstyle adjustments.",
    audience: [Audience.ALL],
    image: { type: "item", name: "silver_edge" },
  },
  {
    category: "OwnHero",
    npcHeroName: "enchantress",
    audioFile: "ownHero/Enchantress_6_AghsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanims Shard at the 15 minute mark to massively improve your damage and wave clear ability.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "enchantress",
    audioFile: "ownHero/Enchantress_7_AghsScepter",
    messageTime: 22 * 60,
    textMessage:
      "Look to build your Aghanims Scepter as early as you can for added lock down on enemy heroes.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "enchantress",
    audioFile: "enemyHero/Enchantress_1_Summons",
    messageTime: -60,
    textMessage:
      "Avoid laning with summon based heroes against Enchantress or use summons carefully on the lane.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "enchantress",
    audioFile: "enemyHero/Enchantress_2_BlockCamps",
    messageTime: -50,
    textMessage:
      "Block off pull camps against Enchantress as she will control a neutral creep.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "enchantress",
    audioFile: "enemyHero/Enchantress_3_EnchantDispel",
    messageTime: -40,
    textMessage:
      "Enchant applies a basic dispel, so be careful with using buffing spells, items or runes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "enchantress",
    audioFile: "enemyHero/Enchantress_4_Impetus",
    messageTime: -30,
    textMessage:
      "If Impetus is flying your way, run towards Enchantress or stop moving to take less damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "enchantress",
    audioFile: "enemyHero/Enchantress_5_SplitPush",
    messageTime: 8 * 60,
    textMessage:
      "It is hard to kill Enchantress with right-clicks against Untouchable. Spells are better.",
    audience: [Audience.ALL],
  },

  // 35. Enigma
  /* {
    category: "OwnHero",
    npcHeroName: "enigma",
    audioFile: "ownHero/Enigma_1_BlockCamps",
    messageTime: -90,
    textMessage:
      "Keep opponents' pull camps blocked as the lane will be pushing your way due to Demonic Conversion.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT],
    image: { type: "item", name: "ward_dispenser" },
  }, */
  /* {
    category: "OwnHero",
    npcHeroName: "enigma",
    audioFile: "ownHero/Enigma_2_SacrificeRanged",
    messageTime: -15,
    textMessage: "Ideally, use Demonic Conversion on your ranged creeps or catapults out of opponents' experience range.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enigma_demonic_conversion" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "enigma",
    audioFile: "ownHero/Enigma_3_FeedEidolons",
    messageTime: [15, 2 * 60 + 15],
    textMessage:
      "Avoid feeding eidolons, make sure they multipy and use them to deny even more creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enigma_demonic_conversion" },
  },
  {
    category: "OwnHero",
    npcHeroName: "enigma",
    audioFile: "ownHero/Enigma_4_MidnightPulse",
    messageTime: [3 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Midnight Pulse destroys trees which can be useful in certain scenarios and to make your farming paths straight.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enigma_midnight_pulse" },
  },
  {
    category: "OwnHero",
    npcHeroName: "enigma",
    audioFile: "ownHero/Enigma_5_BlinkDagger",
    messageTime: 16 * 60 + 15,
    textMessage:
      "Once you get Blink Dagger, make use of it immediately before opponents can see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "enigma",
    audioFile: "ownHero/Enigma_6_Teamfight",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      `Be patient in teamfights, avoid showing too early and wait for opponents to clump up for your combo.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "enigma_black_hole" },
  },
  {
    category: "OwnHero",
    npcHeroName: "enigma",
    audioFile: "ownHero/Enigma_7_PushSidelanes",
    messageTime: 12 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, use eidolons to push out sidelanes safely or farm jungle camps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "enigma_demonic_conversion" },
  },
  {
    category: "OwnHero",
    npcHeroName: "enigma",
    audioFile: "ownHero/Enigma_8_DemonicSummoning",
    messageTime: 30,
    textMessage:
      "Look to use Demonic Summoning frequently to harass and zone the enemy support, and blocking the pull camp.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "enigma_demonic_conversion" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "enigma",
    audioFile: "ownHero/Enigma_9_SolarCrestAbuse",
    messageTime: 11 * 60,
    textMessage:
      "As soon as you have your Solar Crest, look to pressure enemy heroes and towers with your eidolons.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "solar_crest" },
  }, */

  {
    category: "EnemyHero",
    npcHeroName: "enigma",
    audioFile: "enemyHero/Enigma_1_Eidolons",
    messageTime: -60,
    textMessage: "Try to kill eidolons before they multiply.",
    chatMessage: "Try to kill eidolons before they multiply.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "enigma",
    audioFile: "enemyHero/Enigma_2_BlinkDagger",
    messageTime: 12 * 60,
    textMessage: "Be aware of Enigma's Blink Dagger timing.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "enigma",
    audioFile: "enemyHero/Enigma_3_ClumpUp",
    messageTime: [12 * 60 + 10, 22 * 60 + 10, 32 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Blink Dagger into Black Hole combo.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "enigma",
    audioFile: "enemyHero/Enigma_4_BlackholeCooldown",
    messageTime: [12 * 60 + 20, 22 * 60 + 20, 32 * 60 + 20],
    textMessage:
      "Black Hole has a long cooldown. Look for a fight when it is on cooldown.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "enigma",
    audioFile: "enemyHero/Enigma_5_StayBack",
    messageTime: [12 * 60 + 30, 22 * 60 + 30, 32 * 60 + 30],
    textMessage:
      "Stay back with one hero that can cancel Black Hole or save a core that is being Black Holed.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "enigma",
    audioFile: "enemyHero/Enigma_6_Aegis",
    messageTime: [15 * 60, 25 * 60, 35 * 60],
    textMessage:
      "Having Aegis on a core hero is a protection against Black Hole. Kill Roshan on the first chance.",
    audience: [Audience.ALL],
  },

  // 36. Faceless Void
  {
    category: "OwnHero",
    npcHeroName: "faceless_void",
    audioFile: "ownHero/Faceless_1_TimeWalk",
    messageTime: 15,
    textMessage:
      "Be careful about using Time Walk aggressively on early levels as you leave yourself exposed for a while.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "faceless_void_time_walk" },
  },
  {
    category: "OwnHero",
    npcHeroName: "faceless_void",
    audioFile: "ownHero/Faceless_2_TeleportIn",
    messageTime: [7 * 60, 11 * 60],
    textMessage:
      "Look around the map and be ready to teleport in and pick-off an opponent with Chronosphere.",
    audience: [Audience.ALL],
    image: { type: "item", name: "tpscroll" },
  },
  {
    category: "OwnHero",
    npcHeroName: "faceless_void",
    audioFile: "ownHero/Faceless_3_AttackSpeed",
    messageTime: [8 * 60, 14 * 60],
    textMessage:
      "Faceless Void is an attack speed hungry hero as dps is closely related to the frequency of Time Lock procs.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "faceless_void_time_lock" },
  },
  {
    category: "OwnHero",
    npcHeroName: "faceless_void",
    audioFile: "ownHero/Faceless_4_Teamfights",
    messageTime: [10 * 60 + 15, 20 * 60 + 15],
    textMessage:
      "In teamfights, look to trap as many opponents as possible in Chronosphere while leaving allies outside.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "faceless_void_chronosphere" },
  },
  {
    category: "OwnHero",
    npcHeroName: "faceless_void",
    audioFile: "ownHero/Faceless_5_ChronosphereCooldown",
    messageTime: [10 * 60 + 45, 20 * 60 + 45],
    textMessage:
      "Avoid playing aggressively when Chronosphere is on cooldown and push out lanes instead.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "faceless_void_chronosphere" },
  },
  {
    category: "OwnHero",
    npcHeroName: "faceless_void",
    audioFile: "ownHero/Faceless_6_ItemizeDifferently",
    messageTime: [11 * 60 + 15, 16 * 60 + 15],
    textMessage:
      "You can tank up and get mobility items if your teammates can provide plenty of damage in Chronosphere.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "faceless_void",
    audioFile: "ownHero/Faceless_7_ItemizationTip",
    messageTime: [9 * 60],
    textMessage:
      "Mask of Madness enables you to pick off free kills easily with Chronosphere. Look for these opening kills around the map whenever Chronosphere is up with your Mask of Madness.",
    audience: [Audience.ALL],
    image: { type: "item", name: "mask_of_madness" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "faceless_void",
    audioFile: "enemyHero/Faceless_1_TimeWalk1",
    messageTime: 20,
    textMessage:
      "Cause damage to Faceless Void over time, as he can't heal using Time Walk.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "faceless_void",
    audioFile: "enemyHero/Faceless_2_TimeWalk2",
    messageTime: [45, 3 * 60 + 30],
    textMessage: "Maximize damage on Faceless Void after he has used Time Walk.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "faceless_void",
    audioFile: "enemyHero/Faceless_3_Chronosphere1",
    messageTime: [
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
    npcHeroName: "faceless_void",
    audioFile: "enemyHero/Faceless_4_Chronosphere2",
    messageTime: [23 * 60 + 15, 33 * 60 + 15, 43 * 60 + 15, 53 * 60 + 15],
    textMessage:
      "Don't clump up when Chronosphere is up. Save the hero that has been caught or look to interrupt the follow-up damage from Void's teammates",
    chatMessage:
      "Don't clump up when Chronosphere is up. Save the hero that has been caught",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "faceless_void",
    audioFile: "enemyHero/Faceless_5_TimeDilation",
    messageTime: [16 * 60 + 15, 36 * 60 + 15, 56 * 60 + 15],
    textMessage:
      "It is recommended to have basic dispels available against Time Dilation",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "faceless_void",
    audioFile: "enemyHero/Faceless_6_Chronosphere3",
    messageTime: [26 * 60 + 15, 46 * 60 + 15],
    textMessage:
      "Items like Aeon Disk and Aegis are good counters against Chronosphere in mid to late game. It is advised to keep buyback ready as you might want to use your first life to burn through Void's ultimate",
    chatMessage:
      "Aeon Disk and Aegis are good against Chronosphere. Also keep buyback ready and use it after Void's ultimate",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "faceless_void",
    audioFile: "enemyHero/Faceless_7_Chronosphere4",
    messageTime: [21 * 60 + 15, 41 * 60 + 15, 61 * 60 + 15],
    textMessage:
      "You can try to bait out Chronosphere with smart illusion rune usage or Manta Style.",
    audience: [Audience.ALL],
  },

  // 37. Grimstroke
  {
    category: "OwnHero",
    npcHeroName: "grimstroke",
    audioFile: "ownHero/Grimstroke_1_SecureRanged",
    messageTime: 15,
    textMessage:
      "Use Stroke of Faith to secure range creep last hits and hit opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "grimstroke_dark_artistry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "grimstroke",
    audioFile: "ownHero/Grimstroke_2_Communicate",
    messageTime: [30, 3 * 60 + 30],
    textMessage:
      "Communicate whenever you want to use Ink Swell on an ally so it doesn't go to waste.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "grimstroke_spirit_walk" },
  },
  {
    category: "OwnHero",
    npcHeroName: "grimstroke",
    audioFile: "ownHero/Grimstroke_3_StackCamp",
    messageTime: [4 * 60, 8 * 60],
    textMessage:
      "Stroke of Faith can be used to stack an additional camp from distance.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "grimstroke_dark_artistry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "grimstroke",
    audioFile: "ownHero/Grimstroke_4_Soulbind",
    messageTime: [10 * 60 + 15, 18 * 60 + 15, 26 * 60 + 15],
    textMessage:
      "Focus on using Soulbind on mobile heroes or heroes with Black King Bar.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "grimstroke_soul_chain" },
  },
  {
    category: "OwnHero",
    npcHeroName: "grimstroke",
    audioFile: "ownHero/Grimstroke_5_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Buy Aghanim's Shard at minute 15 as it adds even more utility to Ink Sweel.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "grimstroke",
    audioFile: "ownHero/Grimstroke_6_DarkPortrait",
    messageTime: [22 * 60 + 45, 29 * 60 + 45],
    textMessage:
      "Aghanim's Scepter allows you to scale well into lategame by creating illusions of opponents right-clickers.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "grimstroke",
    audioFile: "ownHero/Grimstroke_7_Roaming",
    messageTime: 7 * 60 + 15,
    textMessage:
      "Use portals to roam around the map and set up kills with your control spells.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "grimstroke_spirit_walk" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `grimstroke`,
    audioFile: `ownHero/Grimstroke_8_InkSwellDispel`,
    messageTime: [18 * 60 + 30, 28 * 60 + 30, 38 * 60 + 30, 48 * 60 + 30],
    textMessage: `With Aghanims Shard, you can apply and pop Ink Swell instantly on an ally to dispel off stuns and silences.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `grimstroke_spirit_walk` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "grimstroke",
    audioFile: "enemyHero/Grimstroke_1_StrokeOfFaith",
    messageTime: -60,
    textMessage:
      "Stroke of Fate does more damage the more units it hits. Play on the side of the creep wave.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "grimstroke",
    audioFile: "enemyHero/Grimstroke_2_PhantomsEmbrace",
    messageTime: 30,
    textMessage:
      "Help removing Grimstroke's Phantom's Embrace from your team mates.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "grimstroke",
    audioFile: "enemyHero/Grimstroke_3_InkSwell",
    messageTime: -40,
    textMessage:
      "The longer you were next to Ink Swelled unit the longer you will be stunned.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "grimstroke",
    audioFile: "enemyHero/Grimstroke_4_Soulbind",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Against Grimstroke's Soulbind, avoid staying close to your cores, especially the mobile ones.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "grimstroke",
    audioFile: "enemyHero/Grimstroke_5_CounterItems",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance and spell immunity items are great against Grimstroke.",
    audience: [Audience.ALL],
  },

  // 38. Gyrocopter
  {
    category: "OwnHero",
    npcHeroName: "gyrocopter",
    audioFile: "ownHero/Gyrocopter_1_RocketBarrage",
    messageTime: 15,
    textMessage:
      "Rocket Barrage does tons of damage when an opponent is isolated.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "gyrocopter_rocket_barrage" },
  },
  {
    category: "OwnHero",
    npcHeroName: "gyrocopter",
    audioFile: "ownHero/Gyrocopter_2_CreepEquilibrium",
    messageTime: 30,
    textMessage: `Keep creep equilibrium close to your tower to have more space to run opponents down with Rocket Barrage.`,
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "gyrocopter_rocket_barrage" },
  },
  {
    category: "OwnHero",
    npcHeroName: "gyrocopter",
    audioFile: "ownHero/Gyrocopter_3_Waveclear",
    messageTime: 4 * 60 + 45,
    textMessage:
      `Gyro has great waveclear early on. Push out waves once you have two points in Flak Cannon and start farming nearby camps.`,
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "gyrocopter_flak_cannon" },
  },
  {
    category: "OwnHero",
    npcHeroName: "gyrocopter",
    audioFile: "ownHero/Gyrocopter_4_ClearStacks",
    messageTime: [5 * 60 + 15, 8 * 60 + 15],
    textMessage:
      "Ask your teammates to stack for you as you can clear stacks easily once you max out Flak Cannon.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "gyrocopter_flak_cannon" },
  },
  {
    category: "OwnHero",
    npcHeroName: "gyrocopter",
    audioFile: "ownHero/Gyrocopter_5_HitCount",
    messageTime: [5 * 60 + 30, 15 * 60 + 30],
    textMessage:
      "'Hit count' objects like Supernova can be removed with ease by attacking them and flakking other heroes down.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "gyrocopter_flak_cannon" },
  },
  {
    category: "OwnHero",
    npcHeroName: "gyrocopter",
    audioFile: "ownHero/Gyrocopter_6_AghanimsScepter",
    messageTime: 11 * 60 + 30,
    textMessage: `Make sure to get Aghanims Scepter as soon as possible as it improves farming speed and DPS in fights.`,
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "gyrocopter",
    audioFile: "ownHero/Gyrocopter_8_SideGunner",
    messageTime: [12 * 60, 20 * 60],
    textMessage:
      "Side Gunner can attack even when Gyrocopter is stunned and all attack modifiers work as well.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "gyrocopter",
    audioFile: "ownHero/Gyrocopter_9_SideGunner",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "In teamfights, focus on hitting most of the opponents with Flak Cannon and Call Down.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "gyrocopter_flak_cannon" },
  },
  {
    category: "OwnHero",
    npcHeroName: "gyrocopter",
    audioFile: "ownHero/Gyrocopter_10_DivineRapier",
    messageTime: 25 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "If in desperate position, consider purchasing Divine Rapier as last resort. Works well with Flak Cannon.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "rapier" },
  },
  {
    category: "OwnHero",
    npcHeroName: "gyrocopter",
    audioFile: "ownHero/Gyrocopter_11_AvoidRushingIn",
    messageTime: [5 * 60 + 30, 10 * 60 + 30, 15 * 60 + 30, 20 * 60 + 30],
    textMessage:
      "Do not rush in with Rocket Barrage every time you stun a hero. You are squishy and easy to kill if you over extend.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "gyrocopter",
    audioFile: "ownHero/Gyrocopter_12_EbladeSpike",
    messageTime: 24 * 60,
    textMessage:
      "Once you pick up the Ethereal Blade, you can burst down pretty much any hero on the map with your item and spell combo.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "ethereal_blade" },
  },
  {
    category: "OwnHero",
    npcHeroName: "gyrocopter",
    audioFile: "ownHero/Gyrocopter_13_ForceStaffMissile",
    messageTime: 19 * 60,
    textMessage:
      "You can use Force Staff on your Homing Missile to push it forward and surprise enemy heroes.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "force_staff" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "gyrocopter",
    audioFile: "enemyHero/Gyrocopter_1_RocketBarrage",
    messageTime: -60,
    textMessage:
      "Rocket Barrage does a lot of damage. Keep distance from Gyrocopter or share damage with allied units.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "gyrocopter",
    audioFile: "enemyHero/Gyrocopter_2_HomingMissile",
    messageTime: -50,
    textMessage:
      "Help destroying Homing Missile that is aimed at your team mate.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "gyrocopter",
    audioFile: "enemyHero/Gyrocopter_3_ContestFarm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Gyrocopter farms quickly with Flak Cannon. Smoke on him, place deep wards and block off camps with sentries.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "gyrocopter",
    audioFile: "enemyHero/Gyrocopter_4_AntimagicItems",
    messageTime: 12 * 60,
    textMessage:
      "Gyrocopter does a lot of magical damage and joins fights early. Magic resistance items are great.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "gyrocopter",
    audioFile: "enemyHero/Gyrocopter_5_AntiflakItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard, Heaven's Halberd and armor items are great against Gyrocopter's Flak Cannon.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "gyrocopter",
    audioFile: "enemyHero/Gyrocopter_6_LotusOrb",
    messageTime: 12 * 60 + 20,
    textMessage:
      "It is easy to reflect Homing Missile back to Gyrocopter with Lotus Orb.",
    audience: [Audience.ALL],
  },

  // 39. Hoodwink
  {
    category: "OwnHero",
    npcHeroName: "hoodwink",
    audioFile: "ownHero/Hoodwink_1_SecureRanged",
    messageTime: 15,
    textMessage: `Use Acorn Shot to secure range creep last hits and harass the opponents at the same time.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_acorn_shot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "hoodwink",
    audioFile: "ownHero/Hoodwink_2_BushwhackStraight",
    messageTime: 75,
    textMessage:
      "Opt to Bushwhack first if there is a tree to latch it without using Acorn Shot as the planted tree can be cut.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_bushwhack" },
  },
  {
    category: "OwnHero",
    npcHeroName: "hoodwink",
    audioFile: "ownHero/Hoodwink_3_Trees",
    messageTime: 3 * 60,
    textMessage: `Play close to the trees to have a chance to dodge attacks from enemy heroes through your innate passive.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_scurry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "hoodwink",
    audioFile: "ownHero/Hoodwink_4_AcornVision",
    messageTime: [3 * 60 + 30, 9 * 60 + 30, 15 * 60 + 30],
    textMessage:
      "Acorn Shot provides vision. You can scout pillars for wards or Roshan pit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_acorn_shot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "hoodwink",
    audioFile: "ownHero/Hoodwink_5_ShootDefensively",
    messageTime: [8 * 60, 16 * 60],
    textMessage:
      "You can use Sharpshooter defensively to propel yourself further back or up or down the cliff.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_sharpshooter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "hoodwink",
    audioFile: "ownHero/Hoodwink_6_PushSidelanes",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, you can push out sidelanes easily and escape in treeline if necessary.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_scurry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "hoodwink",
    audioFile: "ownHero/Hoodwink_7_AcornShotAutocast",
    messageTime: [2 * 60, 5 * 60, 11 * 60, 17 * 60],
    textMessage:
      "You can keep Acorn Shot on autocast to always plant a tree on cast if you want to follow up with Bushwack.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "hoodwink_acorn_shot" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "hoodwink",
    audioFile: "enemyHero/Hoodwink_1_Bushwhack",
    messageTime: -60,
    textMessage: "Avoid playing around trees against Hoodwink's Bushwack.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "hoodwink",
    audioFile: "enemyHero/Hoodwink_2_BreakCombo",
    messageTime: 30,
    textMessage:
      "You can break Acorn Shot into Bushwhack combo by cutting Acorn Shot's tree quickly.",
    audience: [Audience.ALL],
  },
  // {category: "EnemyHero", npcHeroName: "hoodwink", audioFile: "enemyHero/Hoodwink_3_Sharpshooter", messageTime: (8*60), textMessage: "Hoodwink's Sharpshooter can't be cancelled and applies break effect for up to 6 seconds.", audience: [Audience.ALL]}, |patch 7.29| MESSAGE UPDATED
  {
    category: "EnemyHero",
    npcHeroName: "hoodwink",
    audioFile: "enemyHero/Hoodwink_3_Sharpshooter",
    messageTime: 8 * 60,
    textMessage:
      "Hoodwink's Sharpshooter can't be cancelled and applies break effect for up to 5 seconds.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "hoodwink",
    audioFile: "enemyHero/Hoodwink_4_AntievasionItems",
    messageTime: 12 * 60,
    textMessage: `Items that provide accuracy on right clicks, such as MKB, are great against Hoodwinks innate passive.`,
    audience: [Audience.ALL],
  },

  // 40. Huskar
  {
    category: "OwnHero",
    npcHeroName: "huskar",
    audioFile: "ownHero/Huskar_1_Harass",
    messageTime: 15,
    textMessage:
      "Harass with Burning Spears as often as you can as it doesn't pull aggro.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "huskar_burning_spear" },
  },
  {
    category: "OwnHero",
    npcHeroName: "huskar",
    audioFile: "ownHero/Huskar_2_HelmOfIronWill",
    messageTime: 30,
    textMessage:
      "On tough lanes rush Helm of Iron Will to solve health sustain issues.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "helm_of_iron_will" },
  },
  {
    category: "OwnHero",
    npcHeroName: "huskar",
    audioFile: "ownHero/Huskar_3_Snowball",
    messageTime: [60, 7 * 60, 12 * 60],
    textMessage:
      "Huskar is snowbally type of a hero. Do well on the lane, take an early Roshan and call for a group up.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "huskar",
    audioFile: "ownHero/Huskar_4_LifeBreakDispels",
    messageTime: [5 * 60 + 30, 12 * 60],
    textMessage: `Lifebreak dispels on cast which is particulary useful against heal reductions like Spirit Vessel.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "huskar_life_break" },
  },
  {
    category: "OwnHero",
    npcHeroName: "huskar",
    audioFile: "ownHero/Huskar_5_Roshan",
    messageTime: [9 * 60, 13 * 60],
    textMessage:
      "Do Roshan once you have Armlet completed and ideally Berserker's Blood and Burning Spears maxed out.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "huskar",
    audioFile: "ownHero/Huskar_6_CheckOpponents",
    messageTime: [10 * 60 + 15, 18 * 60 + 15, 26 * 60 + 15],
    textMessage:
      "Check opponents for heal reductions and break effects. You can itemize or adjust playstyle accordingly.",
    audience: [Audience.ALL],
    image: { type: "item", name: "spirit_vessel" },
  },
  {
    category: "OwnHero",
    npcHeroName: "huskar",
    audioFile: "ownHero/Huskar_7_AghanimsScepter",
    messageTime: 19 * 60,
    textMessage:
      "Aghanim's Scepter allows you to pick-off heroes and deals with kiting.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "huskar",
    audioFile: "enemyHero/Huskar_1_SpiritVessel",
    messageTime: -60,
    textMessage:
      "Someone should buy Spirit Vessel against Huskar to offset his regeneration and deal high damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "huskar",
    audioFile: "enemyHero/Huskar_2_LowHP",
    messageTime: 5 * 60,
    textMessage: "Huskar likes to play on low HP. Look to gank him early on.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "huskar",
    audioFile: "enemyHero/Huskar_3_LifeBreakDispel",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Life Break applies basic dispel. Avoid casting dispellable spells and items before Huskar jumps.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "huskar",
    audioFile: "enemyHero/Huskar_4_Roshan",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Huskar is snowbally hero that relies on killing Roshan early on. Ward and check Roshpit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "huskar",
    audioFile: "enemyHero/Huskar_5_Halberd",
    messageTime: 12 * 60,
    textMessage:
      "Heaven's Halberd disarms Huskar for 5 seconds and shortens Inner Fire debuff duration.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "huskar",
    audioFile: "enemyHero/Huskar_6_SilverEdge",
    messageTime: 12 * 60 + 10,
    textMessage: "Silver Edge breaks Huskar's passive - Berserker's Blood.",
    audience: [Audience.ALL],
  },

  // 41. Invoker
  {
    category: "OwnHero",
    npcHeroName: "invoker",
    audioFile: "ownHero/Invoker_1_SunstrikeFountain",
    messageTime: -90,
    textMessage:
      "Quas Exort: Sunstrike opponents fountain to check opponents items and infer lanes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_sun_strike" },
  },
  {
    category: "OwnHero",
    npcHeroName: "invoker",
    audioFile: "ownHero/Invoker_2_SunstrikeKills",
    messageTime: -15,
    textMessage:
      "Quas Exort: Look around the map as much as you can for potential Sunstrike kills.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_sun_strike" },
  },
  {
    category: "OwnHero",
    npcHeroName: "invoker",
    audioFile: "ownHero/Invoker_3_SecureRanged",
    messageTime: 15,
    textMessage:
      "Quas Exort: You can use Sunstrike here and there to secure ranged creep last hit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_sun_strike" },
  },
  {
    category: "OwnHero",
    npcHeroName: "invoker",
    audioFile: "ownHero/Invoker_4_SecureRanged",
    messageTime: 2 * 60,
    textMessage: `Quas Wex: Use Tornado and EMP to secure a last hit or deny a creep, and burn opponents mana at the same time.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_tornado" },
  },
  {
    category: "OwnHero",
    npcHeroName: "invoker",
    audioFile: "ownHero/Invoker_5_RuneControl",
    messageTime: [2 * 60 + 45, 5 * 60 + 45],
    textMessage: "Quas Exort: Use Forged Spirits to control runes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_forge_spirit" },
  },
  {
    category: "OwnHero",
    npcHeroName: "invoker",
    audioFile: "ownHero/Invoker_6_Rotate",
    messageTime: [5 * 60 + 30, 9 * 60 + 30],
    textMessage: `If you play Quas Wex, then control active runes and look for opportunities to rotate once you have Boots and Spirit Vessel.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "urn_of_shadows" },
  },
  {
    category: "OwnHero",
    npcHeroName: "invoker",
    audioFile: "ownHero/Invoker_7_DontRotate",
    messageTime: [5 * 60 + 45, 9 * 60 + 45],
    textMessage:
      "If you play Quas Exort, then avoid rotating and running around. Farm, pressure opponents' tower and look for Sun Strikes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_sun_strike" },
  },
  {
    category: "OwnHero",
    npcHeroName: "invoker",
    audioFile: "ownHero/Invoker_8_HandOfMidas",
    messageTime: 10 * 60 + 15,
    textMessage:
      "After ganking few times with Spirit Vessel, consider going back for Hand of Midas if the game slows down.",
    audience: [Audience.ALL],
    image: { type: "item", name: "hand_of_midas" },
  },
  {
    category: "OwnHero",
    npcHeroName: "invoker",
    audioFile: "ownHero/Invoker_9_Splitpush",
    messageTime: 13 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, you can easily split push with summons or by dumping spells from fog.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "invoker_chaos_meteor" },
  },
  {
    category: "OwnHero",
    npcHeroName: "invoker",
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
    npcHeroName: "invoker",
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
    npcHeroName: "invoker",
    audioFile: "ownHero/Invoker_12_Roshan",
    messageTime: 17 * 60,
    textMessage:
      "Invoker is great at enabling team to take Roshan early due to Alacrity, Forged Spirits and Cold Snap.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "invoker",
    audioFile: "ownHero/Invoker_13_AghanimsScepter",
    messageTime: 18 * 60 + 30,
    textMessage: `Aghanims Scepter is a huge powerspike if you have a setup within the team, such as Chronosphere.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "invoker",
    audioFile: "enemyHero/Invoker_1_InvokerType",
    messageTime: 3 * 60,
    textMessage:
      "Identify which Invoker type you are playing against, by looking at invoked spells and orbs above Invoker. Quas Exort Invoker is farm and burst oriented and uses the Sunstrike ability early on. While Quas Wex is ganking and control oriented and uses Tornado + EMP and Cold Snap + Urn of Shadows combinations.",
    chatMessage:
      "Quas Exort Invoker is farm and burst oriented while Quas Wex is ganking and control oriented.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "invoker",
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
    npcHeroName: "invoker",
    audioFile: "enemyHero/Invoker_3_AntiDamage",
    messageTime: [8 * 60 + 15, 15 * 60 + 15],
    textMessage: "Opt for anti-magic damage items against Invoker",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "invoker",
    audioFile: "enemyHero/Invoker_4_SellCombination",
    messageTime: [10 * 60 + 15, 30 * 60 + 15],
    textMessage:
      "Dodging or surviving Invoker's opening combination of spells, makes him weak for 5 to 10 seconds depending on the cooldown of his Invoke ability.",
    chatMessage:
      "Dodging or surviving Invoker's opening combination of spells makes him weak for 5 to 10s.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "invoker",
    audioFile: "enemyHero/Invoker_5_Tornado",
    messageTime: [17 * 60 + 15, 27 * 60 + 15],
    textMessage: `Keep in mind that Invokers Tornado dispels. Active rune buffs and many spells are countered by it.`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "invoker",
    audioFile: "enemyHero/Invoker_6_Cataclysm",
    messageTime: [28 * 60 + 15, 38 * 60 + 15],
    textMessage:
      "Aghanim's Scepter grants Invoker Cataclysm spell. Be aware of it and be mindful about your hero's position during it.",
    chatMessage:
      "Aghs grants Invoker Cataclysm spell. Be aware of it and be mindful about your hero's position.",
    audience: [Audience.ALL],
  },

  // 42. Io
  {
    category: "OwnHero",
    npcHeroName: "wisp",
    audioFile: "ownHero/Io_1_Trees",
    messageTime: -75,
    textMessage:
      "Tether breaks trees which is useful at making tree line paths or optimize farming routes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "wisp_tether" },
  },
  {
    category: "OwnHero",
    npcHeroName: "wisp",
    audioFile: "ownHero/Io_2_Consumables",
    messageTime: 15,
    textMessage:
      "Make sure to have spare consumables with you to keep your laning partner healthy.",
    audience: [Audience.ALL],
    image: { type: "item", name: "flask" },
  },
  {
    category: "OwnHero",
    npcHeroName: "wisp",
    audioFile: "ownHero/Io_3_KillRelocate",
    messageTime: 8 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Look around the map for opportunities to Relocate in and prompt your teammates to setup kills.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "wisp_relocate" },
  },
  {
    category: "OwnHero",
    npcHeroName: "wisp",
    audioFile: `ownHero/Io_4_BoostFightingCore`,
    messageTime: 10 * 60 + 15,
    textMessage:
      `Past laning stage, you typically want to play with a core on your team who plays aggressively and utilizes their HP and mana pool while you buff them with Tether and Overcharge.`,
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "wisp",
    audioFile: "ownHero/Io_5_DontShow",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing yourself at the start of the fight as you are number 1 target for opponents.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "wisp",
    audioFile: "ownHero/Io_6_RelocateNearby",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When using Relocate to save an ally consider relocating nearby to be able to re-engage faster.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "wisp_relocate" },
  },
  {
    category: "OwnHero",
    npcHeroName: "wisp",
    audioFile: "ownHero/Io_7_RelocateSplitpush",
    messageTime: 15 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "You can use Relocate to push out a wave or rat a tower when not much is happening around the map.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "wisp_relocate" },
  },
  {
    category: "OwnHero",
    npcHeroName: "wisp",
    audioFile: "ownHero/Io_8_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      `Pick up Aghanims Shard later in the game to gain spell lifesteal and slow resistance through Overcharge for yourself and your Tethered ally.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "wisp",
    audioFile: "ownHero/Io_9_Cheese",
    messageTime: 38 * 60,
    textMessage:
      "Io is one of the best Cheese carriers in the game as you can extract double the value through the Tether.",
    audience: [Audience.ALL],
    image: { type: "item", name: "cheese" },
  },
  {
    category: "OwnHero",
    npcHeroName: "wisp",
    audioFile: "ownHero/Io_10_Lotus",
    messageTime: [
      2 * 60 + 50,
      5 * 60 + 50,
      8 * 60 + 50,
      11 * 60 + 50,
      14 * 60 + 50,
    ],
    textMessage:
      "Grab the healing lotus to have a burst of HP and mana regen for yourself and the tethered ally.",
    audience: [Audience.ALL],
  },
  {
    category: `OwnHero`,
    npcHeroName: `wisp`,
    audioFile: `ownHero/Io_11_BoostFarmingCore`,
    messageTime: 11 * 60 + 15,
    textMessage:
      `Past laning stage, if you do not have fighting core hero on your team, look to play with your farming core to boost his farm and stack camps.`,
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "wisp",
    audioFile: "enemyHero/Io_1_SpiritVessel",
    messageTime: -60,
    textMessage:
      "Someone should buy Spirit Vessel against Io to offset healing and regeneration.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "wisp",
    audioFile: "enemyHero/Io_2_Harass",
    messageTime: -50,
    textMessage: "Harass either Io or his laning partner, not both equally.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "wisp",
    audioFile: "enemyHero/Io_3_RelocateCancel",
    messageTime: 8 * 60,
    textMessage:
      "Relocate can be cancelled by disabling or silencing Io during channel time.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "wisp",
    audioFile: "enemyHero/Io_4_IoFocus",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Io in the fights as he's good at sustaining and saving his cores.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "wisp",
    audioFile: "enemyHero/Io_5_GapClosing",
    messageTime: 12 * 60,
    textMessage: "Gap closing items will help you get on top of Io.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "wisp",
    audioFile: "enemyHero/Io_6_AntihealingItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Items that reduce healing and regeneration are great against Io.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "wisp",
    audioFile: "enemyHero/Io_7_Ratting",
    messageTime: [15 * 60 + 10, 25 * 60 + 10, 35 * 60 + 10],
    textMessage: "Be careful about Io's ratting potential with Relocate.",
    audience: [Audience.ALL],
  },

  // 43. Jakiro
  {
    category: "OwnHero",
    npcHeroName: "jakiro",
    audioFile: "ownHero/Jakiro_1_PullCamps",
    messageTime: -90,
    textMessage:
      "Make sure camps are open for pulling as the lane will likely push due to AoE damage of your spells.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "jakiro",
    audioFile: "ownHero/Jakiro_2_Tanky",
    messageTime: 15,
    textMessage:
      "Jakiro is tanky, so look to soak up damage for your core in the lane.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "jakiro",
    audioFile: "ownHero/Jakiro_3_IcePathScout",
    messageTime: [3 * 60, 9 * 60, 15 * 60],
    textMessage: `Ice Path provides vision so you can use it to scout pillars for wards and Roshan pit.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "jakiro_ice_path" },
  },
  {
    category: "OwnHero",
    npcHeroName: "jakiro",
    audioFile: "ownHero/Jakiro_4_DefendTowers",
    messageTime: [8 * 60, 14 * 60],
    textMessage:
      "Jakiro is great at defending towers due to Macropyre and your cores can split push in meantime.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "jakiro_macropyre" },
  },
  {
    category: "OwnHero",
    npcHeroName: "jakiro",
    audioFile: "ownHero/Jakiro_5_TowerDamage",
    messageTime: [8 * 60 + 15, 14 * 60 + 15],
    textMessage:
      `Use Liquid Fire to apply pressure on enemy buildings if you have the facet for it.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "jakiro_liquid_fire" },
  },
  {
    category: "OwnHero",
    npcHeroName: "jakiro",
    audioFile: "ownHero/Jakiro_6_TowerDamage",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "In teamfight, take your time to land the most impactful Ice Paths and Macropyre.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "jakiro_ice_path" },
  },
  {
    category: "OwnHero",
    npcHeroName: "jakiro",
    audioFile: "ownHero/Jakiro_7_Splitpush",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening on the map, you can split push easily without even showing yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "jakiro_dual_breath" },
  },
  {
    category: "OwnHero",
    npcHeroName: "jakiro",
    audioFile: "ownHero/Jakiro_8_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      `Pick up Aghanims Shard later in the game to massively boost the damage of Liquid Fire or Liquid Frost on enemy heroes.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "jakiro",
    audioFile: "ownHero/Jakiro_9_AghanimsScepter",
    messageTime: [25 * 60, 31 * 60],
    textMessage:
      "You can carry late game fights by nicely positioning Macropyre improved by Aghanim's Scepter.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "jakiro",
    audioFile: "enemyHero/Jakiro_1_CastPoint",
    messageTime: -60,
    textMessage:
      "Cast point on Jakiro's spells are long, so you can possibly dodge them.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "jakiro",
    audioFile: "enemyHero/Jakiro_2_Stacking",
    messageTime: -50,
    textMessage:
      `Avoid standing beside your laning partner against Dual Breath and Ice Path.`,
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "jakiro",
    audioFile: "enemyHero/Jakiro_3_DefendTowers",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Jakiro is great at destroying towers with Liquid Fire. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "jakiro",
    audioFile: "enemyHero/Jakiro_4_DefendingTowers",
    messageTime: 10 * 60 + 20,
    textMessage:
      "Jakiro is great at defending towers alone. Jump him or consider glyphing the wave.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "jakiro",
    audioFile: "enemyHero/Jakiro_5_ClumpUp",
    messageTime: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Ice Path and Macropyre combo.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "jakiro",
    audioFile: "enemyHero/Jakiro_6_AntimagicItems",
    messageTime: 12 * 60 + 10,
    textMessage: "Magic resistance items are great against Jakiro.",
    audience: [Audience.ALL],
  },

  // 44. Juggernaut
  {
    category: "OwnHero",
    npcHeroName: "juggernaut",
    audioFile: "ownHero/Juggernaut_1_InstantAttack",
    messageTime: 10,
    textMessage:
      "Juggernaut has almost instant attack animation which makes lasthitting and denying a lot easier.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "juggernaut",
    audioFile: "ownHero/Juggernaut_2_BeAggressive",
    messageTime: 20,
    textMessage:
      "Blade Fury does insane amounts of damage. Look to play aggressively on the lane.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "juggernaut_blade_fury" },
  },
  {
    category: "OwnHero",
    npcHeroName: "juggernaut",
    audioFile: "ownHero/Juggernaut_10_Level3_timing",
    messageTime: 45,
    textMessage:
      "Try to align your level 3 timing and boots, you have a high chance of killing with level 2 blade fury and boots.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "juggernaut_blade_fury" },
  },
  {
    category: "OwnHero",
    npcHeroName: "juggernaut",
    audioFile: "ownHero/Juggernaut_3_SpinClick",
    messageTime: 30,
    textMessage:
      "Avoid right-clicking opponents during Blade Fury until you get proc item or items that apply debuffs.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "juggernaut_blade_fury" },
  },
  {
    category: "OwnHero",
    npcHeroName: "juggernaut",
    audioFile: "ownHero/Juggernaut_4_MicroWard",
    messageTime: [75, 11 * 60 + 15, 21 * 60 + 15],
    textMessage:
      "Make sure to micro healing ward properly. You can use it during Blade Fury and Omnislash.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "juggernaut_healing_ward" },
  },
  {
    category: "OwnHero",
    npcHeroName: "juggernaut",
    audioFile: "ownHero/Juggernaut_5_SpinTP",
    messageTime: 4 * 60,
    repeatTime: 10 * 60,
    textMessage: "When in trouble, consider to Blade Fury and teleport out.",
    audience: [Audience.ALL],
    image: { type: "item", name: "tpscroll" },
  },
  {
    category: "OwnHero",
    npcHeroName: "juggernaut",
    audioFile: "ownHero/Juggernaut_6_OmnislashCreeps",
    messageTime: [7 * 60, 15 * 60, 23 * 60],
    textMessage:
      "When deciding to Omnislash, consider how close opponents' wave or neutral creeps might be.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "juggernaut_omni_slash" },
  },
  {
    category: "OwnHero",
    npcHeroName: "juggernaut",
    audioFile: "ownHero/Juggernaut_7_CheckInventory",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Scout opponents' inventories for Omnislash counters and adjust playstyle and itemization accordingly.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "juggernaut_omni_slash" },
  },
  {
    category: "OwnHero",
    npcHeroName: "juggernaut",
    audioFile: "ownHero/Juggernaut_8_Roshan",
    messageTime: 17 * 60 + 15,
    textMessage:
      "With decent game, Juggernaut is good at killing Roshan from the 18 minute mark with minimal or no help.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "juggernaut",
    audioFile: "ownHero/Juggernaut_9_SlowSiege",
    messageTime: 22 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "You can slow siege enemy towers and buildings by damaging them during Blade Fury and then backing away.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "juggernaut_blade_fury" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "juggernaut",
    audioFile: "enemyHero/Juggernaut_1_BladeFury1",
    messageTime: -60,
    textMessage:
      "Juggernaut is one of the strongest laning carries as Blade Fury does more than 400 AOE damage already on level 1. Consider buying items to increase your movement speed",
    chatMessage:
      "Juggernaut's Blade Fury does more than 400 AOE damage. Consider buying items to increase your movement speed",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "juggernaut",
    audioFile: "enemyHero/Juggernaut_2_BladeFury2",
    messageTime: 45,
    textMessage:
      "Try to keep distance from Juggernaut and try to force a defensive Blade Fury. Juggernaut's mana pool is not great and Blade Fury has high cooldown on lower levels. Pressure him after he used Blade Fury",
    chatMessage:
      "Try to keep distance from Juggernaut and try to force a defensive Blade Fury Pressure him after he used it",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "juggernaut",
    audioFile: "enemyHero/Juggernaut_3_HealingWard",
    messageTime: 4 * 60 + 5,
    textMessage:
      "Look to hit Juggernaut's Healing Ward as one hit is sufficient and it gives you 75 gold",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "juggernaut",
    audioFile: "enemyHero/Juggernaut_4_BladeFury3",
    messageTime: 6 * 60 + 15,
    textMessage:
      "When you are ganking Juggernaut, he will look to Blade Fury and teleport out on first sign of trouble. Make sure you surprise disable him before he spins if you do not yet have a spell immunity piercing disable",
    chatMessage:
      "Juggernaut can use Blade Fury and teleport to escape. Surprise disable him before he spins, if you can",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "juggernaut",
    audioFile: "enemyHero/Juggernaut_5_Omnislash1",
    messageTime: 8 * 60 + 15,
    textMessage:
      "Juggernaut's Omnislash jumps are random. Use surrounding creeps, illusions or heroes to split the damage",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "juggernaut",
    audioFile: "enemyHero/Juggernaut_6_SpellImmunity",
    messageTime: [10 * 60 + 30, 25 * 60 + 30, 45 * 60 + 30],
    textMessage:
      "Control items like sheepstick and abyssal blade are good at controlling juggernaut.",
    chatMessage:
      "Control items like sheepstick and abyssal blade are good at controlling juggernaut.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "juggernaut",
    audioFile: "enemyHero/Juggernaut_7_Omnislash2",
    messageTime: [15 * 60 + 30, 35 * 60 + 30],
    textMessage:
      "Main damaging ability of Juggernaut is Omnislash and this spell is counterable by many items. Make sure to have at least one such item for each hero",
    chatMessage:
      "Juggernaut's Omnislash is counterable by many items. Make sure to have at least one for each hero",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "juggernaut",
    audioFile: "enemyHero/Juggernaut_8_Omnislash3",
    messageTime: [21 * 60 + 30, 31 * 60 + 30],
    textMessage:
      "Juggernaut's Omnislash cooldown is long with 120 seconds, which allows you to pressure him while it's down",
    audience: [Audience.ALL],
  },

  // 45. Keeper of the Light
  {
    category: "OwnHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "ownHero/KeeperOfTheLight_1_UnblockCamps",
    messageTime: -90,
    textMessage:
      "Make sure pull camps are unblocked as lane is likely to be pushed due to Illuminate.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "ownHero/KeeperOfTheLight_2_IlluminatePositioning",
    messageTime: 15,
    textMessage:
      "Be creative at positioning to be able to hit opponents with Illuminate.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "ownHero/KeeperOfTheLight_3_RangedCreeps",
    messageTime: 30,
    textMessage:
      "Avoid hitting ranged creeps with level 1 Illuminate as it will become deniable.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "ownHero/KeeperOfTheLight_4_IlluminateVision",
    messageTime: [4 * 60 + 15, 12 * 60 + 15, 20 * 60 + 15],
    textMessage:
      `Illuminate provides vision which can be used to check pillars for wards or Roshan pit.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "ownHero/KeeperOfTheLight_5_Stack",
    messageTime: [4 * 60 + 30, 12 * 60 + 30],
    textMessage:
      "Keeper is fast and with Illuminate you can make multiple stacks at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "ownHero/KeeperOfTheLight_6_DefendBuildings",
    messageTime: [8 * 60 + 15, 16 * 60 + 15, 24 * 60 + 15],
    textMessage: `Keeper is amazing at defending buildings while your cores can split push.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "ownHero/KeeperOfTheLight_7_AvoidShowing",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing yourself at the start of the fight and align Illuminate's path over allies in Spirit Form for heals.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "keeper_of_the_light_spirit_form" },
  },
  {
    category: "OwnHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "ownHero/KeeperOfTheLight_8_ChakraAlly",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Make sure to provide Chakra Magic to an ally that benefits most from it after his spells were used.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "keeper_of_the_light_chakra_magic" },
  },
  {
    category: "OwnHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "ownHero/KeeperOfTheLight_9_Splitpush",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out sidelanes with Illuminate. You don't even have to show yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "keeper_of_the_light_illuminate" },
  },
  {
    category: "OwnHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "ownHero/KeeperOfTheLight_10_AghanimsScepter",
    messageTime: 17 * 60 + 30,
    textMessage:
      "Make sure to pick up Aghanim's Scepter at reasonable time as this hero lacks control.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "ownHero/KeeperOfTheLight_11_BlindingLight",
    messageTime: 1 * 60,
    textMessage:
      "Use Blinding Light to push opponents under your tower or closer to your core if you can get a favourable trade.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "keeper_of_the_light_blinding_light" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `keeper_of_the_light`,
    audioFile: `ownHero/KeeperOfTheLight_12_RecallFacet`,
    messageTime: [13 * 60 + 20, 23 * 60 + 20, 33 * 60 + 20, 43 * 60 + 20],
    textMessage:
      `If you have the Recall facet, look to split push lanes as much as you can to get an enemy hero to defend, and then Recall yourself elsewhere to gank or take a fight.`,
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "enemyHero/KeeperOfTheLight_1_Observer",
    messageTime: -60,
    textMessage:
      "Bring an Observer ward to your lane to see Keeper of the Light charging Illuminate.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "enemyHero/KeeperOfTheLight_2_Pulling",
    messageTime: -50,
    textMessage:
      "Prevent Keeper of the Light from pulling as he will push with Illuminate and then look to pull.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "enemyHero/KeeperOfTheLight_3_Squishy",
    messageTime: -40,
    textMessage:
      "Keeper of the Light is very squishy but really fast. One disable and he will drop low on HP.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "enemyHero/KeeperOfTheLight_4_DefendingTowers",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Keeper of the Light is great at defending towers alone. Jump him or consider glyphing the wave.",
    audience: [Audience.ALL],
  },
  /* {
    category: "EnemyHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "enemyHero/KeeperOfTheLight_5_Daytime",
    messageTime: [10 * 60 + 20, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Look to fight during night-time so Keeper of the Light can't heal his allies with Illuminate.",
    audience: [Audience.ALL],
  }, */
  // {category: "EnemyHero", npcHeroName: "keeper_of_the_light", audioFile: "enemyHero/KeeperOfTheLight_5_Recall", messageTime: [(10*60+20), (20*60+20), (30*60+20)], textMessage: "Keeper of the Light can Recall additional hero to the fight. Count on them having an extra hero.", audience: [Audience.ALL]}, |patch 7.29| NEW MESSAGE

  {
    category: "EnemyHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "enemyHero/KeeperOfTheLight_7_AntimagicItems",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance and spell immunity items are great against Keeper of the Light.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "keeper_of_the_light",
    audioFile: "enemyHero/KeeperOfTheLight_6_Recall",
    messageTime: [20 * 60 + 20, 30 * 60 + 20, 40 * 60 + 20],
    textMessage:
      `Be aware if Keeper of the Light has the Recall facet. He can bring multiple heroes to ganks or fights and beat you with a numbers advantage.`,
    audience: [Audience.ALL],
  },

  // 46. Kunkka
  {
    category: "OwnHero",
    npcHeroName: "kunkka",
    audioFile: "ownHero/Kunkka_1_TidebringerHarass",
    messageTime: 15,
    textMessage:
      "On early levels, make sure Tidebringer hits the opponents as that is your main laning tool.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_tidebringer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "kunkka",
    audioFile: "ownHero/Kunkka_2_TidebringerCleave",
    messageTime: 30,
    textMessage:
      "Ideally, you want to cleave off of creep with Tidebringer for maximum damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_tidebringer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "kunkka",
    audioFile: "ownHero/Kunkka_3_XMarkTP",
    messageTime: [4 * 60, 11 * 60, 18 * 60],
    textMessage:
      "You can do X Marks the Spot into teleport to fountain to replenish yourself or allies.",
    audience: [Audience.ALL],
    image: { type: "item", name: "tpscroll" },
  },
  {
    category: "OwnHero",
    npcHeroName: "kunkka",
    audioFile: "ownHero/Kunkka_4_Stacks",
    messageTime: [4 * 60 + 30, 9 * 60 + 30],
    textMessage:
      "Ask your allies to stack for you as you can easily clear those with level 4 Tidebringer.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "kunkka_tidebringer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "kunkka",
    audioFile: "ownHero/Kunkka_5_TorrentVision",
    messageTime: [4 * 60 + 45, 12 * 60 + 45, 20 * 60 + 45],
    textMessage:
      "Torrent provides vision so you can scout pillars for wards or Roshpit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_torrent" },
  },
  {
    category: "OwnHero",
    npcHeroName: "kunkka",
    audioFile: "ownHero/Kunkka_6_TorrentStacks",
    messageTime: [7 * 60 + 30, 12 * 60 + 30],
    textMessage:
      "You can stack some of the neutral camps by using Torrent 2 seconds before a full minute hits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_torrent" },
  },
  {
    category: "OwnHero",
    npcHeroName: "kunkka",
    audioFile: "ownHero/Kunkka_7_ArmletTidebringer",
    messageTime: [8 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Make sure to activate Armlet if you have one before using Tidebringer.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "armlet" },
  },
  {
    category: "OwnHero",
    npcHeroName: "kunkka",
    audioFile: "ownHero/Kunkka_8_Combo",
    messageTime: [8 * 60 + 45, 13 * 60 + 45],
    textMessage:
      "Maximum value combo: X Mark, Ghostship, activate X Mark, Torrent after Ghostship lands into Tidebringer.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_ghostship" },
  },
  {
    category: "OwnHero",
    npcHeroName: "kunkka",
    audioFile: "ownHero/Kunkka_9_RumBuff",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, if possible align Ghostship in such way that it goes over most of your allies for Rum buff.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_ghostship" },
  },
  {
    category: "OwnHero",
    npcHeroName: "kunkka",
    audioFile: "ownHero/Kunkka_10_CleaveOpponents",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, position yourself to cleave with Tidebringer on as many opponents' heroes as possible.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "kunkka_tidebringer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "kunkka",
    audioFile: "ownHero/Kunkka_11_XMarkHit",
    messageTime: [10 * 60 + 45, 18 * 60 + 45, 26 * 60 + 45],
    textMessage:
      "X Mark yourself and run forward to kill a dangerous wave with Tidebringer if opponents don't have Eul's.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "kunkka_x_marks_the_spot" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "kunkka",
    audioFile: "enemyHero/Kunkka_1_Tidebringer",
    messageTime: -60,
    textMessage:
      "Kunkka's sword will be glowing when Tidebringer is ready. Play on the side not to get cleaved.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "kunkka",
    audioFile: "enemyHero/Kunkka_2_Torrent",
    messageTime: -50,
    textMessage:
      "Kunkka will rise his sword when casting Torrent. Look to make a sharp turn.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "kunkka",
    audioFile: "enemyHero/Kunkka_3_Squishy",
    messageTime: 8 * 60,
    textMessage:
      "Kunkka's Ghostship allows allied heroes that were underneath it to delay 40% damage taken.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "kunkka",
    audioFile: "enemyHero/Kunkka_4_ClumpUp",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Torrent and Ghostship.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "kunkka",
    audioFile: "enemyHero/Kunkka_5_Euls",
    messageTime: 12 * 60,
    textMessage:
      "Eul's Scepter is great at stopping X Marks the Spot pullback.",
    audience: [Audience.ALL],
  },

  // 47. Legion Commander
  {
    category: "OwnHero",
    npcHeroName: "legion_commander",
    audioFile: "ownHero/LegionCommander_1_PressTheAttack",
    messageTime: -30,
    textMessage:
      "Consider skilling Press the Attack on level 1 or 2 if you are being harassed by dispellable damage-over-time spells.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "legion_commander",
    audioFile: "ownHero/LegionCommander_2_OverwhelmingOdds",
    messageTime: -20,
    textMessage:
      "Use Overwhelming Odds to secure a range creep last hit and harass the enemy heroes at the same time.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "legion_commander",
    audioFile: "ownHero/LegionCommander_3_MomentOfCourage",
    messageTime: 60,
    textMessage:
      "Aggro creeps on yourself to increase Moment of Courage procs. It can be useful for denying as well.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "legion_commander",
    audioFile: "ownHero/LegionCommander_4_Blink1",
    messageTime: 60 * 10,
    textMessage:
      "Once you get Blink Dagger, do not give up farm to start running around the map. Keep scaling into the game.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "legion_commander",
    audioFile: "ownHero/LegionCommander_5_Blink2",
    messageTime: 60 * 11,
    textMessage:
      "Make sure not to overblink as you will land 240 units shorter than the maximum of 1200.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "legion_commander",
    audioFile: "ownHero/LegionCommander_6_Duel1",
    messageTime: [60 * 12, 60 * 17],
    textMessage:
      "Duelling any hero is fine in early to midgame to collect Duel victories which will then allow you to potentially solo kill heroes.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "legion_commander",
    audioFile: "ownHero/LegionCommander_7_AghanimsShard",
    messageTime: 60 * 20,
    textMessage:
      "Aghanim's Shard is an essential pick-up as it is a great buff to give you extra Duel damage per victory.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "legion_commander",
    audioFile: "ownHero/LegionCommander_8_Duel2",
    messageTime: 60 * 20,
    repeatTime: 60 * 20,
    textMessage:
      "In mid to late game make sure to Duel specific heroes and not care about Duel victory as much.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "legion_commander",
    audioFile: "ownHero/LegionCommander_9_TeamFight",
    messageTime: 60 * 30,
    repeatTime: 60 * 20,
    textMessage:
      "Sometimes it is better not to initiate fights, but rather stay back to save an ally with Press the Attack and turn the fight around.",
    audience: [Audience.ROLE_CORE],
  },

  {
    category: "EnemyHero",
    npcHeroName: "legion_commander",
    audioFile: "enemyHero/LegionCommander_1_OverwhelmingOdds",
    messageTime: [1 * 60 + 15, 3 * 60 + 15],
    textMessage:
      "In the lane against Legion Commander stay away from your partner to reduce impact of Overwhelming Odds",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "legion_commander",
    audioFile: "enemyHero/LegionCommander_2_PressTheAttack",
    messageTime: [45, 6 * 60 + 15],
    textMessage:
      "Avoid wasting mana on harassing Legion Commander with spells that can be dispelled by Press the Attack. Use those spells once she used Press the Attack",
    chatMessage:
      "Don't harass Legion Commander with spells that can be dispelled. Use spells once she used Press the Attack",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "legion_commander",
    audioFile: "enemyHero/LegionCommander_3_MeleeRange",
    messageTime: 8 * 60 + 30,
    textMessage: "Avoid getting into melee range of Legion Commander",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "legion_commander",
    audioFile: "enemyHero/LegionCommander_4_GapClosing",
    messageTime: [8 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "Keep an eye on Legion Commander's Blink Dagger or Shadow Blade purchase. She will want to find pickoffs so it's good to group up and bait with one hero and then to counter-attack",
    chatMessage:
      "Legion Commander buys Blink Dagger or Shadow Blade to duel heroes. Group up and bait with one hero",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "legion_commander",
    audioFile: "enemyHero/LegionCommander_5_DuelCounter",
    messageTime: [10 * 60 + 30, 20 * 60 + 30, 30 * 60 + 30, 40 * 60 + 30],
    textMessage:
      "Good counters items against Legion Commander's duel are Eul's Scepter, Linken's Sphere and Ethereal Blade",
    audience: [Audience.ALL],
  },
  /* {category: "EnemyHero", npcHeroName: "legion_commander", audioFile: "enemyHero/LegionCommander_6_AghanimsScepter", messageTime: [(23*60+30), (33*60+30), (43*60+30)], textMessage: "Legion Commander becomes spell immune when duelling with Aghanim's Scepter", audience: [Audience.ALL]}, Changed in 7.30*/
  {
    category: "EnemyHero",
    npcHeroName: "legion_commander",
    audioFile: "enemyHero/LegionCommander_6_AghanimsScepter",
    messageTime: [23 * 60 + 30, 33 * 60 + 30, 43 * 60 + 30],
    textMessage:
      "Legion Commander is immune to debuffs when duelling with Aghanim's Scepter.",
    audience: [Audience.ALL],
  },

  // 48. Leshrac
  {
    category: "OwnHero",
    npcHeroName: "leshrac",
    audioFile: "ownHero/Leshrac_1_SplitEarthRanged",
    messageTime: 15,
    textMessage:
      "You should use Split Earth or Lightning Storm to secure ranged creeps during the laning stage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_split_earth" },
  },
  {
    category: "OwnHero",
    npcHeroName: "leshrac",
    audioFile: "ownHero/Leshrac_2_SplitEarthHarass",
    messageTime: 30,
    textMessage:
      "Use Split Earth when opponents are likely to be stationary, e.g. when they are going for lasthit or deny. Also, use it immediately after Lightning Storm to increase chances of landing the stun.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_split_earth" },
  },
  {
    category: "OwnHero",
    npcHeroName: "leshrac",
    audioFile: "ownHero/Leshrac_3_SplitEarthTrees",
    messageTime: 45,
    textMessage:
      "Split Earth breaks trees which can be useful against certain heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_split_earth" },
  },
  {
    category: "OwnHero",
    npcHeroName: "leshrac",
    audioFile: "ownHero/Leshrac_4_DiabolicEdictInvis",
    messageTime: [90, 11 * 60 + 30, 21 * 60 + 30],
    textMessage:
      "Diabolic Edict pulses give you a hint where the opponents' invisible hero is.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_diabolic_edict" },
  },
  {
    category: "OwnHero",
    npcHeroName: "leshrac",
    audioFile: "ownHero/Leshrac_5_ClearStacks",
    messageTime: [4 * 60 + 15, 9 * 60 + 15],
    textMessage:
      "Alert your teammates to stack for you as you can clear stacks as soon as you hit level 6.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "leshrac_pulse_nova" },
  },
  {
    category: "OwnHero",
    npcHeroName: "leshrac",
    audioFile: "ownHero/Leshrac_6_BuildingDamage",
    messageTime: [6 * 60, 11 * 60, 16 * 60],
    textMessage:
      "Leshrac is really good at taking buildings early on due to wave clear and Diabolic Edict.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_diabolic_edict" },
  },
  {
    category: "OwnHero",
    npcHeroName: "leshrac",
    audioFile: "ownHero/Leshrac_7_BuildingDamageHiding",
    messageTime: [6 * 60 + 15, 11 * 60 + 15, 16 * 60 + 15],
    textMessage:
      "You can damage a building with Diabolic Edict by hiding yourself in trees next to it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_diabolic_edict" },
  },
  {
    category: "OwnHero",
    npcHeroName: "leshrac",
    audioFile: "ownHero/Leshrac_8_Itemization",
    messageTime: [8 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Itemize for survivability and mobility to be able to position yourself in the center of the fight.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "cyclone" },
  },
  {
    category: "OwnHero",
    npcHeroName: "leshrac",
    audioFile: "ownHero/Leshrac_9_Splitpush",
    messageTime: 11 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Leshrac is great at splitpushing due to mobility, wave clear and tower damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "leshrac_pulse_nova" },
  },
  {
    category: "OwnHero",
    npcHeroName: "leshrac",
    audioFile: "ownHero/Leshrac_10_KiteBlackKingBar",
    messageTime: [14 * 60 + 15, 19 * 60 + 15],
    textMessage:
      "When opponents get Black King Bars, you typically need to kite those and itemize to survive their duration.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "leshrac",
    audioFile: "ownHero/Leshrac_11_AghanimsShard",
    messageTime: [19 * 60, 25 * 60],
    textMessage:
      "Pick up Aghanims Shard if you need to defend high ground or siege.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "leshrac",
    audioFile: "enemyHero/Leshrac_1_IllusionsSummons",
    messageTime: -60,
    textMessage:
      "Leshrac is great at dealing with illusions and summons due to high amount of AoE damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "leshrac",
    audioFile: "enemyHero/Leshrac_2_SplitEarth",
    messageTime: -50,
    textMessage:
      "Leshrac's Split Earth has a long cast point. Look to dodge it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "leshrac",
    audioFile: "enemyHero/Leshrac_3_DiabolicEdict",
    messageTime: [5 * 60, 15 * 60, 25 * 60],
    textMessage:
      "Leshrac's Diabolic Edict does great damage against single units and buildings. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "leshrac",
    audioFile: "enemyHero/Leshrac_4_PulseNova",
    messageTime: 8 * 60,
    textMessage:
      "Pulse Nova converts mana into AoE damage. Fight when Leshrac is low on mana or burn it away.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "leshrac",
    audioFile: "enemyHero/Leshrac_5_Burst",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Look to burst Leshrac in the fights or he'll do insane amounts of damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "leshrac",
    audioFile: "enemyHero/Leshrac_6_AntimagicItems",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance and spell immunity items are great against Leshrac.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "leshrac",
    audioFile: "enemyHero/Leshrac_7_Splitpushing",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Leshrac is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 49. Lich
  {
    category: "OwnHero",
    npcHeroName: "lich",
    audioFile: "ownHero/Lich_1_FrostBlastRightClick",
    messageTime: 15,
    textMessage: `Make use of the slowing part of the Frost Blast to chain couple of right clicks.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lich_frost_nova" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lich",
    audioFile: "ownHero/Lich_2_SecureRanged",
    messageTime: 30,
    textMessage: `Secure ranged creep last hit with right click or Frost Blast when your core cant.`,
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "lich_frost_nova" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lich",
    audioFile: "ownHero/Lich_3_PlayAggressively",
    messageTime: 45,
    textMessage:
      `Play aggressively on the lane, burn your mana by using your spells and utilize the regen items you bought at the start of the game.`,
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "lich_frost_nova" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lich",
    audioFile: "ownHero/Lich_4_SoloKill",
    messageTime: 8 * 60,
    textMessage:
      "At level 6, you can even solo kill opponents if there are creeps for Chain Frost to bounce.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "lich_chain_frost" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lich",
    audioFile: "ownHero/Lich_5_DefendTowers",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Frost Shield is great for defending towers and delaying the enemy push.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lich_frost_shield" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lich",
    audioFile: "ownHero/Lich_6_SaveAlly",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, be quick at saving allies with Frost Shield and defensive items. Use other abilities afterwards.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "lich_frost_shield" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lich",
    audioFile: "ownHero/Lich_7_PushSidelanes",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out side lanes with Frost Shield and Blast.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lich_frost_shield" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lich",
    audioFile: "ownHero/Lich_8_Jungling",
    messageTime: 5 * 60,
    repeatTime: 9 * 60,
    textMessage: `You can quickly farm enemy summons or the big creep in jungle camps using Sinister Gaze.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lich_sinister_gaze" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `lich`,
    audioFile: `ownHero/Lich_9_SpellsDuringGaze`,
    messageTime: [11 * 60 + 10, 21 * 60 + 10, 31 * 60 + 10, 41 * 60 + 10],
    textMessage: `You can still cast all your other spells while channeling Sinister Gaze.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `lich_sinister_gaze` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "lich",
    audioFile: "enemyHero/Lich_1_StrongLaner",
    messageTime: -60,
    textMessage: "Lich is a strong laner. Bring extra consumables.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lich",
    audioFile: "enemyHero/Lich_2_FrostShield",
    messageTime: -50,
    textMessage:
      "Frost Shield from Lich significantly reduces damage taken from right-clicks and it can be used on towers.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lich",
    audioFile: "enemyHero/Lich_3_ChainFrost",
    messageTime: 8 * 60,
    textMessage:
      "Split up when Lich uses Chain Frost or run towards a group of creeps to pass the bounce away.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lich",
    audioFile: "enemyHero/Lich_4_ClumpUp",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Chain Frost.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lich",
    audioFile: "enemyHero/Lich_5_AntimagicItems",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance and spell immunity items are great against Lich.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lich",
    audioFile: "enemyHero/Lich_6_LotusOrb",
    messageTime: 12 * 60 + 10,
    textMessage: "Lotus Orb is great at reflecting 3 spells of Lich.",
    audience: [Audience.ALL],
  },

  // 50. Lifestealer
  {
    category: "OwnHero",
    npcHeroName: "life_stealer",
    audioFile: "ownHero/Lifestealer_1_RightclickFeast",
    messageTime: 15,
    textMessage:
      "Right-click opponents as much as you can on the lane for extra damage and sustain from Feast.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "life_stealer_feast" },
  },
  {
    category: "OwnHero",
    npcHeroName: "life_stealer",
    audioFile: "ownHero/Lifestealer_2_OrbOfCorrosion",
    messageTime: 30,
    textMessage:
      "Orb of corrosion is great at harrassing enemies in the laning stage and works well with lifestealers spells.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "orb_of_corrosion" },
  },
  {
    category: "OwnHero",
    npcHeroName: "life_stealer",
    audioFile: "ownHero/Lifestealer_3_RageDispel",
    messageTime: 60,
    textMessage:
      "Consider investing a point in Rage early on if there's a need for dispel or spell-immunity.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "life_stealer_rage" },
  },
  {
    category: "OwnHero",
    npcHeroName: "life_stealer",
    audioFile: "ownHero/Lifestealer_4_RageTP",
    messageTime: [6 * 60 + 45, 14 * 60 + 45, 22 * 60 + 45],
    textMessage:
      "If the enemy has no way to cancel rage TP, be more aggresive on sides lanes and rage TP out.",
    audience: [Audience.ALL],
    image: { type: "item", name: "tpscroll" },
  },
  {
    category: "OwnHero",
    npcHeroName: "life_stealer",
    audioFile: "ownHero/Lifestealer_5_DispatchSupport",
    messageTime: 7 * 60,
    textMessage:
      "Once you hit 6, you are really hard to kill and you can dispatch your support to help other lanes.",
    audience: [Audience.ROLE_CARRY, Audience.ROLE_OFFLANE],
  },
  {
    category: "OwnHero",
    npcHeroName: "life_stealer",
    audioFile: "ownHero/Lifestealer_6_SaveAlly",
    messageTime: [7 * 60 + 15, 15 * 60 + 15, 23 * 60 + 15],
    textMessage: "You can save an ally by Infesting it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "life_stealer_infest" },
  },
  {
    category: "OwnHero",
    npcHeroName: "life_stealer",
    audioFile: "ownHero/Lifestealer_7_FightEarly",
    messageTime: [10 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "Lifestealer doesn't farm fast but is decent at fighting in early to mid game. Join good looking fights.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "life_stealer",
    audioFile: "ownHero/Lifestealer_8_GapCloseInfest",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "If you have gap-closing ally you can choose to Infest him to be able to get on top of opponents quickly.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "life_stealer_infest" },
  },
  {
    category: "OwnHero",
    npcHeroName: "life_stealer",
    audioFile: "ownHero/Lifestealer_9_CounterItems",
    messageTime: [10 * 60 + 45, 18 * 60 + 45, 26 * 60 + 15],
    textMessage:
      "Orchid, Basher and Scythe are problematic. Adjust your playstyle and itemization accordingly.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "life_stealer",
    audioFile: "ownHero/Lifestealer_10_SlowSiege",
    messageTime: 26 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "You can slow siege opponents' building by damaging it during Rage and then backing away.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "life_stealer_rage" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "life_stealer",
    audioFile: "enemyHero/Lifestealer_1_ChipDamage",
    messageTime: -15,
    textMessage:
      "Chip damage doesn't work against Lifestealer as he is able to recover with Feast. If you manage to bring him below half HP it will be hard for him to feast as he risks dying",
    chatMessage:
      "Chip damage doesn't work against Lifestealer as he can Feast. Bring him below half HP to scare him",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "life_stealer",
    audioFile: "enemyHero/Lifestealer_2_Boots",
    messageTime: 1 * 60 + 30,
    textMessage:
      "Buy boots early against Lifestealer as he is a fast hero who often buys Venom Orb and rushes Phase Boots",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "life_stealer",
    audioFile: "enemyHero/Lifestealer_3_SpellImmunity",
    messageTime: [8 * 60 + 30, 15 * 60 + 30, 25 * 60 + 30],
    textMessage:
      "Items and spells that go through spell immunity are effective against Lifestealer",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "life_stealer",
    audioFile: "enemyHero/Lifestealer_4_Escape",
    messageTime: [4 * 60 + 45, 9 * 60 + 45],
    textMessage:
      "When you gank Lifestealer he will Rage and teleport out on first signs of trouble. Make sure you disable him before he rages if you do not yet have a disable that goes through spell immunity",
    chatMessage:
      "When you gank Lifestealer he will Rage and teleport out. Disable him before he rages",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "life_stealer",
    audioFile: "enemyHero/Lifestealer_5_TeamFights",
    messageTime: [13 * 60 + 30, 23 * 60 + 30, 33 * 60 + 30],
    textMessage:
      "Lifestealer's main spell in fights is Rage. Play around it by disabling him or by saving heroes he is chasing",
    chatMessage:
      "Lifestealer's main spell in fights is Rage. Disable him or by save heroes he is chasing",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "life_stealer",
    audioFile: "enemyHero/Lifestealer_6_Evasion",
    messageTime: [26 * 60 + 30, 36 * 60 + 30],
    textMessage:
      "Lifestealer tends to have lots of evasion due to his level 20 talent and a Halberd purchase. Look to counter it by getting true strike items",
    chatMessage:
      "Lifestealer tends to have evasion due to his level 20 talent and Halberd. Counter it with true strike items",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "life_stealer",
    audioFile: "enemyHero/Lifestealer_7_Infest",
    messageTime: [18 * 60 + 30, 28 * 60 + 30, 38 * 60 + 30],
    textMessage:
      "Keep in mind that Lifestealer might be infested in the initiating hero or that he can use Infest to escape",
    audience: [Audience.ALL],
  },

  // 51. Lina
  {
    category: "OwnHero",
    npcHeroName: "lina",
    audioFile: "ownHero/Lina_1_LightStrikeArrayTrees",
    messageTime: -90,
    textMessage:
      "Light Strike Array destroys trees which can be useful against certain heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lina_light_strike_array" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lina",
    audioFile: "ownHero/Lina_2_RightClicHarass",
    messageTime: 10,
    textMessage:
      "Make use of Lina's long attack range to harass opponents in the lane frequently.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "lina",
    audioFile: "ownHero/Lina_3_StunStationary",
    messageTime: 20,
    textMessage: `Light Strike Array when opponents are somewhat stationary, e.g. when they are going for a last hit or deny.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lina_light_strike_array" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lina",
    audioFile: "ownHero/Lina_4_SecureRanged",
    messageTime: 30,
    textMessage: `Dragon Slave is great for securing ranged creep last hits and harassing opponents at the same time.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lina_dragon_slave" },
  },
  /*   {
    category: "OwnHero",
    npcHeroName: "lina",
    audioFile: "ownHero/Lina_5_Charge Fiery Soul",
    messageTime: [2 * 60, 9 * 60, 16 * 60],
    textMessage: "Charge up Fiery Soul before leaving the base.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lina_fiery_soul" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "lina",
    audioFile: "ownHero/Lina_6_UpkeepFierySoul",
    messageTime: [7 * 60, 17 * 60, 27 * 60],
    textMessage:
      `Use Dragon Slave on creep waves to maintain Fiery Soul Stacks and keep your maximum damage potential in fights and for farming.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lina_dragon_slave" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lina",
    audioFile: "ownHero/Lina_7_SplitpushPickoff",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      `Lina is great at split pushing with her quick wave clear abilities, as well as pick offs due to her high movement speed and massive burst damage.`,
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "lina",
    audioFile: "ownHero/Lina_8_UpkeepFierySoul",
    messageTime: 25 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage: `Keep fiery soul stacks up in fights to ensure you dish out your maximum DPS with right clicks and spells.`,
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lina",
    audioFile: "ownHero/Lina_9_AghsFreeTerrain",
    messageTime: 22 * 60,
    textMessage:
      "With your Aghanims Scepter pick up, you can fly over treelines and cliffs to find better initiation angles or escape.",
    audience: [Audience.ROLE_SUPPORT, Audience.ROLE_MID],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "lina",
    audioFile: "enemyHero/Lina_1_LightStrikeArray",
    messageTime: -60,
    textMessage:
      "Lina's Light Strike Array has a long cast point. Look to dodge it.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lina",
    audioFile: "enemyHero/Lina_2_GlassCannon",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Lina is a glass cannon type hero. Look to focus her in the fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lina",
    audioFile: "enemyHero/Lina_3_AntimagicItems",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance and spell immunity items are great against Lina.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lina",
    audioFile: "enemyHero/Lina_4_GapClosing",
    messageTime: 12 * 60 + 10,
    textMessage: "Gap closing items are good at getting you on top of Lina.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lina",
    audioFile: "enemyHero/Lina_5_Splitpush",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Lina is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 52. Lion
  {
    category: "OwnHero",
    npcHeroName: "lion",
    audioFile: "ownHero/Lion_1_EarthSpike",
    messageTime: 30,
    textMessage:
      "Use Earth Spike strategically so that you can get extra right-clicks in, deny a creep or secure a last hit.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "lion",
    audioFile: "ownHero/Lion_2_Hex",
    messageTime: 60,
    textMessage: "You can skill Hex on level 2 to score a kill.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "lion",
    audioFile: "ownHero/Lion_3_Illusions",
    messageTime: 90,
    textMessage: "Hex and Mana Drain destroy basic illusions instantly.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "lion",
    audioFile: "ownHero/Lion_4_FingerOfDeath",
    messageTime: 8 * 60,
    textMessage: "Make a move whenever you have Finger of Death available.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "lion",
    audioFile: "ownHero/Lion_5_Blink",
    messageTime: 10 * 60,
    textMessage:
      "When Finger of Death is on cooldown, use the time to farm your Blink Dagger.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "lion",
    audioFile: "ownHero/Lion_6_Initiate",
    messageTime: [14 * 60, 19 * 60],
    textMessage:
      "Initiate on enemies with your long lasting disables, so your allies can follow-up for a kill.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "lion",
    audioFile: "ownHero/Lion_7_Vision",
    messageTime: 15 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Fight around good vision, so you can land multi-hero Earth Spikes.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "lion",
    audioFile: "ownHero/Lion_8_AghanimsShard",
    messageTime: 20 * 60,
    textMessage: "Aghanim's Shard is good at countering illusion-based heroes.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "lion",
    audioFile: "ownHero/Lion_9_AllyManaRestore",
    messageTime: 13 * 60 + 30,
    textMessage:
      "Keep an eye on the mana pool of allies around you and top them up with Mana Drain if they are low on mana.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lion_mana_drain" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `lion`,
    audioFile: `ownHero/Lion_10_ManaDrainDamage`,
    messageTime: 2 * 60 + 15,
    textMessage: `With the Essence Eater facet, position yourself to get an uninterrupted Mana Drain as a follow up on Earth Spike to harass enemy heroes from a distance.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `lion_mana_drain` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "lion",
    audioFile: "enemyHero/Lion_1_FogOfWar",
    messageTime: 60,
    textMessage: "Use fog of war to cancel Lion's Mana Drain",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lion",
    audioFile: "enemyHero/Lion_2_AntiMagicItems",
    messageTime: 2 * 60 + 30,
    textMessage: "Opt for anti-magic damage items against Lion",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lion",
    audioFile: "enemyHero/Lion_3_FingerOfDeath",
    messageTime: 8 * 60,
    textMessage:
      "Be aware of Lion's level 6 Finger of Death. Infused Raindrop might help you to survive the burst",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lion",
    audioFile: "enemyHero/Lion_4_LotusOrb",
    messageTime: 10 * 60,
    textMessage:
      "Lotus Orb is an effective item against Lion as all of his spells are targetable",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lion",
    audioFile: "enemyHero/Lion_5_TeamFights",
    messageTime: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Look to target Lion in team fights as he provides a lot of control and magic damage against your cores and is also a very squishy hero",
    chatMessage:
      "Target Lion in team fights as he has control spells and magic damage and is also a squishy hero",
    audience: [Audience.ALL],
  },

  // 53. Lone Druid
  {
    category: "OwnHero",
    npcHeroName: "lone_druid",
    audioFile: "ownHero/LoneDruid_1_RuneControl",
    messageTime: -30,
    textMessage: `Control runes with hero and Spirit Bear.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lone_druid_spirit_bear" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lone_druid",
    audioFile: "ownHero/LoneDruid_2_Entangle",
    messageTime: 15,
    textMessage: `Fish for entangle by poking opponents with the Spirit Bear here and there. If it procs, you can do follow up damage.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lone_druid_spirit_bear" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lone_druid",
    audioFile: "ownHero/LoneDruid_3_Catapults",
    messageTime: [5 * 60, 10 * 60],
    textMessage: `Make use of catapult waves. The Spirit Bear can tank tower shots for a while.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lone_druid_spirit_bear" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lone_druid",
    audioFile: "ownHero/LoneDruid_4_InTrouble",
    messageTime: [5 * 60 + 15, 15 * 60 + 15],
    textMessage: `When in trouble, consider using Savage Roar and True Form. Lifesteal or body blocks from the Spirit Bear can help.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lone_druid_savage_roar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lone_druid",
    audioFile: "ownHero/LoneDruid_5_DontShow",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing your hero too much, especially at the start of the fight.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "lone_druid",
    audioFile: "ownHero/LoneDruid_6_Roshan",
    messageTime: 16 * 60 + 15,
    textMessage: `You can take Roshan fairly early by yourself or with minimal help. Tank with hero as the Spirit Bear will heal you.`,
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lone_druid",
    audioFile: "ownHero/LoneDruid_7_AghanimsShard",
    messageTime: 19 * 60,
    textMessage: `Make sure to pick up Aghanims Shard on your hero at the 15 minute mark. It provides a drums-like buff and basic dispel with Savage Roar.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lone_druid",
    audioFile: "ownHero/LoneDruid_8_AghanimsScepter",
    messageTime: [25 * 60, 30 * 60],
    textMessage: `In tough late game scenarios, resort to ratting with Aghanims Scepter on your Spirit Bear to let it attack away from your hero.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "lone_druid",
    audioFile: "enemyHero/LoneDruid_1_SpiritLink",
    messageTime: 60,
    textMessage:
      "Spirit Link heals Lone Druid every time the Bear hits. Burst Lone Druid or don't bother hitting him.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lone_druid",
    audioFile: "enemyHero/LoneDruid_2_SpiritBear",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Lone Druid buys items for the Spirit Bear. If you kill Spirit Bear twice, he does no damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lone_druid",
    audioFile: "enemyHero/LoneDruid_3_TowerDefense",
    messageTime: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Spirit Bear does a lot of damage to buildings. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lone_druid",
    audioFile: "enemyHero/LoneDruid_4_ExtendGame",
    messageTime: 15 * 60,
    textMessage:
      "Lone Druid is a snowbally hero and falls off as the game goes. Look to extend the game.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lone_druid",
    audioFile: "enemyHero/LoneDruid_5_Splitpush",
    messageTime: 20 * 60,
    textMessage:
      "Lone Druid is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 54. Luna
  {
    category: "OwnHero",
    npcHeroName: "luna",
    audioFile: "ownHero/Luna_1_BeamLastHits",
    messageTime: 15,
    textMessage:
      "Use Lucent Beams to secure ranged creep lasthits if necessary.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "luna_lucent_beam" },
  },
  {
    category: "OwnHero",
    npcHeroName: "luna",
    audioFile: "ownHero/Luna_2_BlessAlly",
    messageTime: 30,
    textMessage:
      "Lunar Blessing allows you and your ally to trade stronger and last hit better against the enemy heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "luna_lunar_blessing" },
  },
  {
    category: "OwnHero",
    npcHeroName: "luna",
    audioFile: "ownHero/Luna_3_BeamPoints",
    messageTime: 2 * 60,
    textMessage:
      "Generally two points in Lucent Beam is enough for you to secure last hits in lane and win trades with a decent nuke spell.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "luna_lucent_beam" },
  },
  {
    category: "OwnHero",
    npcHeroName: "luna",
    audioFile: "ownHero/Luna_10_moon_glaive",
    messageTime: 3 * 60,
    textMessage:
      "Don't forget to use Moon Glaives in lane when trading to dish out extra damage and tank lesser incoming damage.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "luna_moon_glaive" },
  },
  {
    category: "OwnHero",
    npcHeroName: "luna",
    audioFile: "ownHero/Luna_4_MoonGlaiveTarget",
    messageTime: [4 * 60, 8 * 60],
    textMessage:
      "Target creeps with higher health as the bounces of Moon Glaives does lesser damage when bounced to nearby creeps.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "luna_moon_glaive" },
  },
  {
    category: "OwnHero",
    npcHeroName: "luna",
    audioFile: "ownHero/Luna_5_Stacks",
    messageTime: [4 * 60, 8 * 60],
    textMessage:
      "Alert your teammates to stack for you as you can clear stacks easily with Moon Glaives.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "luna_moon_glaive" },
  },
  {
    category: "OwnHero",
    npcHeroName: "luna",
    audioFile: "ownHero/Luna_6_MaskofMadness",
    messageTime: [6 * 60, 8 * 60, 10 * 60],
    textMessage:
      "Prioritize farming Ancient camps once you have Mask of Madness instead of normal camps unless given free lane and tower pressure.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "mask_of_madness" },
  },
  {
    category: "OwnHero",
    npcHeroName: "luna",
    audioFile: "ownHero/Luna_7_MantaFarm",
    messageTime: [20 * 60 + 15, 22 * 60 + 15, 24 * 60 + 15, 26 * 60 + 15],
    textMessage:
      "Make use of Manta illusions to push out lanes and farm extra creep waves that you are not able to with your hero.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "manta" },
  },
  {
    category: "OwnHero",
    npcHeroName: "luna",
    audioFile: "ownHero/Luna_8_AghanimsShard",
    messageTime: 20 * 60,
    textMessage:
      "Start fights with Moon Glaives activated for extra tankiness and damage over time.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "luna",
    audioFile: "ownHero/Luna_9_Blink",
    messageTime: [20 * 60 + 15, 25 * 60 + 15],
    textMessage:
      "Try to eliminate squishy heroes by jumping on top of them with Blink and bursting them.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "blink" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "luna",
    audioFile: "enemyHero/Luna_1_EarlyHarass",
    messageTime: -60,
    textMessage:
      "Luna has short attack range and is susceptible to early harass. Make sure to pressure her everytime she is left alone by her support in lane.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "luna",
    audioFile: "enemyHero/Luna_2_LunarBlessing",
    messageTime: -50,
    textMessage:
      "Be mindful about trading with Luna when her support is present as they have high right click damage from Lunar Blessing aura.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "luna",
    audioFile: "enemyHero/Luna_3_Eclipse",
    messageTime: 8 * 60,
    textMessage:
      "Luna's Eclipse does a lot of damage. Keep distance from Luna or share damage with allied units.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "luna",
    audioFile: "enemyHero/Luna_4_MoonGlaives",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Luna farms quickly due to Moon Glaives. Smoke on her, place deep wards and block camps with sentries.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "luna",
    audioFile: "enemyHero/Luna_5_ClumpUp",
    messageTime: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Avoid clumping up in teamfights as Moon Glaives will bounce between you and your allies.",
    audience: [Audience.ALL],
  },

  // 55. Lycan
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_1_HelmOfIronWill",
    messageTime: -90,
    textMessage: "Rush Helm of Iron Will to solve your health sustain issues.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "helm_of_iron_will" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_2_ScoutOpponents",
    messageTime: -75,
    textMessage: `You can scout enemy whereabouts with Wolves before the 0 minute runes and check for the mid lane ward.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lycan_summon_wolves" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_3_FocusLastHitting",
    messageTime: 15,
    textMessage: `Focus on securing last hits and denying as you have extra damage from the Wolves and Feral Impulse.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "lycan_summon_wolves" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_4_DontFeedSummons",
    messageTime: [30, 4 * 60 + 30],
    textMessage:
      "Avoid feeding summons to opponents. Deny them or send them away, perhaps to block a camp or control a rune.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lycan_summon_wolves" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_5_Powerspike",
    messageTime: 4 * 60 + 45,
    textMessage:
      "Lycan's laning power spike is Helm of Dominator and level 6. Try to get a kill or force the enemy out of the lane and you can take the tower fast.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "helm_of_the_dominator" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_6_Catapult",
    messageTime: 5 * 60,
    textMessage:
      "Delay death of the 5 minute catapult wave to meet Helm of the Dominator and level 6 power spike.",
    audience: [Audience.ROLE_OFFLANE],
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_7_ControlledCreep",
    messageTime: 5 * 60,
    textMessage: `Take control of a neutral creep with a stun or root with the Helm of the Dominator so the opponents cant teleport out.`,
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "helm_of_the_dominator" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_8_DenyBounty",
    messageTime: [7 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "When dominated creep is about to die, you can overtake another one and deny gold and experience to opponents.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "helm_of_the_dominator" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_9_PushSidelanes",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines with summons. Black Dragon is particularly good for that.",
    audience: [Audience.ALL],
    image: { type: "item", name: "helm_of_the_overlord" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_10_Roshan",
    messageTime: 15 * 60 + 15,
    textMessage: `Lycan is great at killing Roshan due to summons, Howl and auras. Bring him down by the 20 minute mark.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_11_ScoutWolves",
    messageTime: 18 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Consider using wolves to scout in mid to late game. You can deny runes as well.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "lycan_summon_wolves" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_12_AghanimsScepter",
    messageTime: [22 * 60 + 15, 27 * 60 + 15],
    textMessage:
      "Aghanim's Scepter's Wolf Bite is a huge buff for one of your right-clicking cores.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_13_Rat",
    messageTime: [28 * 60 + 15, 33 * 60 + 15],
    textMessage:
      "In tough late game scenarios resort to ratting, Aghanim's Shard will keep your lanes pushed in and make it easier to rat.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_14_Boots",
    messageTime: 4 * 60,
    textMessage:
      "With Power Treads, you are less reliant on your Shapeshift when trying to stay on top of enemy heroes and right click them.",
    audience: [Audience.ROLE_MID],
    image: { type: "item", name: "power_treads" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_15_PowerSpikes",
    messageTime: 9 * 60,
    textMessage:
      "Use your burst damage to make maximum use of item spikes by looking for kills and objectives on the map.",
    audience: [Audience.ROLE_MID],
    image: { type: "item", name: "echo_sabre" },
  },
  {
    category: "OwnHero",
    npcHeroName: "lycan",
    audioFile: "ownHero/Lycan_16_Teamfight",
    messageTime: 13 * 60,
    textMessage:
      "Look to isolate and kill enemy supports quickly in fights as they will find it hard to kite you without items.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "lycan",
    audioFile: "enemyHero/Lycan_1_EarlyHarass",
    messageTime: -60,
    textMessage:
      "Lycan is a low armor hero. Pressure him with your right-clicks.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lycan",
    audioFile: "enemyHero/Lycan_2_KillWolves",
    messageTime: -50,
    textMessage:
      "Try to kill the wolves, especially when they are on low levels.",
    audience: [Audience.IN_LANE],
  },
  // {category: "EnemyHero", npcHeroName: "lycan", audioFile: "enemyHero/Lycan_3_Powerspike", messageTime: (8*60), textMessage: "Be aware of Lycan's level 6 and Necrobook 1 timing. Perhaps you can teleport out if you are quick enough.", audience: [Audience.IN_LANE]}, |patch 7.29| MESSAGE UPDATED
  {
    category: "EnemyHero",
    npcHeroName: "lycan",
    audioFile: "enemyHero/Lycan_3_Powerspike",
    messageTime: 8 * 60,
    textMessage: "Be aware of Lycan's level 6 and Helm of Dominator timing.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lycan",
    audioFile: "enemyHero/Lycan_4_TowerDefense",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Lycan and his summons do a lot of damage to buildings. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lycan",
    audioFile: "enemyHero/Lycan_5_ExtendGame",
    messageTime: 12 * 60,
    textMessage:
      "Lycan is a snowbally hero and falls off. Look to extend the game. Don't be greedy with items.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lycan",
    audioFile: "enemyHero/Lycan_6_ItemCounters",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard and armor items are great against the physical damage output of Lycan and his units.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lycan",
    audioFile: "enemyHero/Lycan_7_Splitpushing",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Lycan is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "lycan",
    audioFile: "enemyHero/Lycan_8_Roshan",
    messageTime: [15 * 60, 25 * 60, 35 * 60],
    textMessage:
      "Lycan is able to kill Roshan early on. Ward and check Roshpit.",
    audience: [Audience.ALL],
  },

  // 56. Magnus
  {
    category: "OwnHero",
    npcHeroName: "magnataur",
    audioFile: "ownHero/Magnus_1_SkewerTrees",
    messageTime: -90,
    textMessage:
      "Skewer destroys trees which can be useful against certain heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "magnataur_skewer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "magnataur",
    audioFile: "ownHero/Magnus_2_SkewerPillars",
    messageTime: [-60, 12 * 60],
    textMessage:
      "When fighting close to pillars and cliffs, consider Skewering opponents on them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "magnataur_skewer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "magnataur",
    audioFile: "ownHero/Magnus_3_WinLastHits",
    messageTime: 15,
    textMessage:
      "Magnus has huge base damage that is further amplified by Empower. Use to win the lane last hit wise.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "magnataur_empower" },
  },
  {
    category: "OwnHero",
    npcHeroName: "magnataur",
    audioFile: "ownHero/Magnus_4_ComboPlay",
    messageTime: 60,
    textMessage:
      "When an opponent is close to your tower, consider making Shockwave into Skewer play.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "magnataur_skewer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "magnataur",
    audioFile: "ownHero/Magnus_5_ClearStacks",
    messageTime: [4 * 60, 8 * 60],
    textMessage:
      "Ask your teammates to make stacks for you as you can clear them with ease once Empower is maxed out.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "magnataur_empower" },
  },
  {
    category: "OwnHero",
    npcHeroName: "magnataur",
    audioFile: "ownHero/Magnus_6_MakeStacks",
    messageTime: [4 * 60 + 15, 8 * 60 + 15],
    textMessage:
      "Make stacks for your farming core and continuously Empower him.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "magnataur_empower" },
  },
  {
    category: "OwnHero",
    npcHeroName: "magnataur",
    audioFile: "ownHero/Magnus_7_ReversePolarityTurn",
    messageTime: [6 * 60, 12 * 60, 18 * 60],
    textMessage:
      "Consider turning during Reverse Polarity animation to be able to Skewer stunned units towards allies right away.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "magnataur_reverse_polarity" },
  },
  {
    category: "OwnHero",
    npcHeroName: "magnataur",
    audioFile: "ownHero/Magnus_8_FarmBlink",
    messageTime: [6 * 60 + 15, 10 * 60 + 15],
    textMessage:
      "Don't rotate too much. Focus on farming Blink Dagger and then start playing more actively.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "magnataur",
    audioFile: "ownHero/Magnus_9_UseBlink",
    messageTime: 10 * 60 + 45,
    textMessage:
      "Once you have Blink Dagger, make use of it immediately before opponents are able to scout it.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "magnataur",
    audioFile: "ownHero/Magnus_10_DontShow",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing yourself at the start of the fight. Wait for opponents to clump up and do your combo.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "magnataur",
    audioFile: "ownHero/Magnus_11_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanims Shard later in the game to boost your farming speed, damage output, and control.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "magnataur",
    audioFile: "enemyHero/Magnus_1_Skewer",
    messageTime: -60,
    textMessage:
      "Be careful not to get Skewered by Magnus under the opponent's tower.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "magnataur",
    audioFile: "enemyHero/Magnus_2_Empower",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Empower is a great farming buff for Magnus and his melee cores. Contest their jungle and block camps.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "magnataur",
    audioFile: "enemyHero/Magnus_3_BlinkDagger",
    messageTime: 12 * 60,
    textMessage:
      "Be aware of Magnus's Blink Dagger timing. Look to cancel his Dagger in the fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "magnataur",
    audioFile: "enemyHero/Magnus_4_ClumpUp",
    messageTime: [12 * 60 + 10, 22 * 60 + 10, 32 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Blink Dagger into Reverse Polarity combos.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "magnataur",
    audioFile: "enemyHero/Magnus_5_ReversePolarityCooldown",
    messageTime: [12 * 60 + 20, 22 * 60 + 20, 32 * 60 + 20],
    textMessage:
      "Reverse Polarity has a long cooldown. Look to fight opponents when it is down.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "magnataur",
    audioFile: "enemyHero/Magnus_6_StatusResistance",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Status resistance items shorten the disable duration of Reverse Polarity.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "magnataur",
    audioFile: "enemyHero/Magnus_7_Aegis",
    messageTime: [15 * 60, 25 * 60, 35 * 60],
    textMessage:
      "Having Aegis on a core hero is a protection against Reverse Polarity. Kill Roshan on the first chance.",
    audience: [Audience.ALL],
  },

  // 57. Marci
  {
    category: "OwnHero",
    npcHeroName: "marci",
    audioFile: "ownHero/Marci_1_Dispose1",
    messageTime: -30,
    repeatTime: 20 * 60,
    textMessage:
      "Look to Dispose an enemy in direction of your allies or to slow more enemies on landing.",
    audience: [Audience.ALL],
  },
  /*   {
    category: "OwnHero",
    npcHeroName: "marci",
    audioFile: "ownHero/Marci_2_Dispose2",
    messageTime: 10 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "You can Dispose an ally out of trouble, even from spells like Chronosphere or Black Hole.",
    audience: [Audience.ALL],
  }, */
  {
    category: "OwnHero",
    npcHeroName: "marci",
    audioFile: "ownHero/Marci_3_Rebound",
    messageTime: 3 * 60,
    repeatTime: 30 * 60,
    textMessage:
      "You can save an ally by using Rebound on him as it provides movement speed bonus.",
    audience: [Audience.ALL],
  },
  /*   {
    category: "OwnHero",
    npcHeroName: "marci",
    audioFile: "ownHero/Marci_4_Dispel",
    messageTime: 14 * 60,
    repeatTime: 30 * 60,
    textMessage:
      "Be aware of spells and items that can dispel by Sidekick or Rebound.",
    audience: [Audience.ALL],
  }, */
  {
    category: "OwnHero",
    npcHeroName: "marci",
    audioFile: "ownHero/Marci_5_Kite",
    messageTime: 12 * 60,
    repeatTime: 30 * 60,
    textMessage:
      "Many spells and items can kite Marci during Unleash. Counter them with items or choose the right moment to engage and be ready to switch targets.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "marci",
    audioFile: "ownHero/Marci_6_Blink",
    messageTime: 16 * 60,
    textMessage: `Blink Dagger is a huge power spike as it allows you to lock on or switch targets, initiate fights or save allies.`,
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "marci",
    audioFile: "ownHero/Marci_7_Roshan",
    messageTime: 20 * 60,
    textMessage: "Unleash and Sidekick are great tools for killing Roshan.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "marci",
    audioFile: "ownHero/Marci_8_Sidekick",
    messageTime: 13 * 60,
    textMessage:
      "Look to play with one of your cores with Sidekick to get kills on the map.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "marci",
    audioFile: "ownHero/Marci_9_Sidekick2",
    messageTime: 2 * 60 + 15,
    textMessage:
      "Use Sidekick on your laning partner as soon as you have it to keep a damage and sustain advantage.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "marci",
    audioFile: "enemyHero/Marci_1_SpiritVessel",
    messageTime: -60,
    textMessage: `Someone should buy spirit Vessel against Marcis Sidekick and Bodyguard.`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "marci",
    audioFile: "enemyHero/Marci_2_Dispose",
    messageTime: -30,
    textMessage:
      "Avoid staying too close to Marci as you'll get Disposed easily.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "marci",
    audioFile: "enemyHero/Marci_3_Unleash",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Kite Marci's ultimate by either stopping her from attacking or disengaging.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "marci",
    audioFile: "enemyHero/Marci_4_KitingItems",
    messageTime: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Acquire items that allow you to kite Marci's ultimate defensively or offensively.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "marci",
    audioFile: "enemyHero/Marci_5_AntiHealingItems",
    messageTime: [12 * 60 + 10, 22 * 60 + 10, 32 * 60 + 10],
    textMessage:
      `Items that reduce healing and regeneration are good against Marcis Sidekick and Bodyguard.`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "marci",
    audioFile: "enemyHero/Marci_6_DispelItems",
    messageTime: [12 * 60 + 20, 22 * 60 + 20, 32 * 60 + 20],
    textMessage:
      `Items that can dispel the Rebound buff from Marci or her ally are great purchase.`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "marci",
    audioFile: "enemyHero/Marci_7_BlinkDagger",
    messageTime: 15 * 60,
    textMessage:
      "Be aware of Marci's Blink Dagger timing. She can easily gap close, setup kills with Dispose or lock on targets during Unleash.",
    chatMessage:
      "Be aware of Marci's Blink Dagger timing. She can easily gap close, setup kills with Dispose or Unleash.",
    audience: [Audience.ALL],
  },

  // 58. Mars
  {
    category: "OwnHero",
    npcHeroName: "mars",
    audioFile: "ownHero/Mars_1_SecureRanged",
    messageTime: 15,
    textMessage: `Use Gods Rebuke to secure ranged creep last hits and harass the opponents at the same time.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "mars_gods_rebuke" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mars",
    audioFile: "ownHero/Mars_2_SetUpSpear",
    messageTime: [75, 6 * 60 + 15],
    textMessage:
      "You often want to set up a Spear of Mars by God's Rebuking first.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mars_spear" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mars",
    audioFile: "ownHero/Mars_3_ArenaTrees",
    messageTime: [6 * 60, 14 * 60],
    textMessage:
      "Arena of Blood destroys trees in huge AoE which can be useful against certain heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mars_arena_of_blood" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mars",
    audioFile: "ownHero/Mars_4_DontRush",
    messageTime: [6 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "Dont rush spearing an enemy during Arena of Blood. It's often times better to rebuke and spear with delay.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mars_arena_of_blood" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mars",
    audioFile: "ownHero/Mars_5_ProtectAllies",
    messageTime: [6 * 60 + 30, 14 * 60 + 30, 22 * 60 + 30],
    textMessage:
      "You can protect your allies from ranged attacks by placing Arena of Blood or using Bulwark.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mars_arena_of_blood" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mars",
    audioFile: "ownHero/Mars_6_DontOverRotate",
    messageTime: [6 * 60 + 45, 9 * 60 + 45],
    textMessage:
      "Don't over rotate. Focus on getting Blink Dagger or Eul's Scepter timely.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mars",
    audioFile: "ownHero/Mars_7_UseBlink",
    messageTime: 11 * 60,
    textMessage:
      "Make use of the Blink Dagger immediately before opponents are able to scout it.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mars",
    audioFile: "ownHero/Mars_8_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanims Shard after Blink and BKB to have even more damage and control with Spear of Mars.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mars",
    audioFile: "ownHero/Mars_9_GodsRebukeItems",
    messageTime: [21 * 60 + 15, 28 * 60 + 15],
    textMessage:
      "Attack modifying and proc items work with God's Rebuke. You can pick up Satanic in the late game for example.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mars_gods_rebuke" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "mars",
    audioFile: "enemyHero/Mars_1_AvoidTrees",
    messageTime: -60,
    textMessage:
      "Avoid playing close to trees against Spear of Mars. Cut some with Quelling Blade and Tangoes.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "mars",
    audioFile: "enemyHero/Mars_2_Bulwark",
    messageTime: 30,
    textMessage:
      "Mars takes reduced damage from front and sides once he levels up Bulwark. Hit him from the back if possible.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "mars",
    audioFile: "enemyHero/Mars_3_ArenaOfBlood1",
    messageTime: 8 * 60,
    textMessage:
      "No range attacks can hit inside or outside of the Arena of Blood.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "mars",
    audioFile: "enemyHero/Mars_4_ArenaOfBlood2",
    messageTime: 8 * 60 + 10,
    textMessage: "Arena of Blood destroys all the trees around it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "mars",
    audioFile: "enemyHero/Mars_5_BlinkDagger",
    messageTime: 12 * 60,
    textMessage:
      "Be aware of Mars's Blink Dagger timing. Look to cancel his Dagger in the fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "mars",
    audioFile: "enemyHero/Mars_6_ClumpUp",
    messageTime: [12 * 60 + 10, 22 * 60 + 10, 32 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Blink Dagger into Arena of Blood combo.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "mars",
    audioFile: "enemyHero/Mars_7_BlackKingBar",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Black King Bar allows you to move in and out of Arena of Blood.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "mars",
    audioFile: "enemyHero/Mars_8_Break",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Break effects remove Bulwark and Mars becomes significantly weaker.",
    audience: [Audience.ALL],
  },

  // 59. Medusa
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_1_SecureRanged",
    messageTime: 15,
    textMessage: "Secure ranged creep with Mystic Snake if contested.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "medusa_mystic_snake" },
  },
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_2_SnakeManaBack",
    messageTime: 30,
    textMessage:
      "In order to get most of the mana back, Mystic snake needs to hit heroes and ranged creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "medusa_mystic_snake" },
  },
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_3_Stacks",
    messageTime: [4 * 60, 8 * 60],
    textMessage:
      "Ask your teammates to stack for you as you can clear them early.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "medusa_split_shot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_4_Accelerate",
    messageTime: 5 * 60,
    textMessage:
      "From level 5, you can start clearing lane creeps quickly and farming camps nearby to accelerate your farm.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "medusa_mystic_snake" },
  },
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_5_FarmTwoCamps",
    messageTime: [5 * 60 + 15, 9 * 60 + 15],
    textMessage:
      "If possible, farm two neutral camps at the same time with Split Shot and Mystic Snake.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "medusa_split_shot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_6_SkillUlt",
    messageTime: 5 * 60 + 45,
    textMessage:
      "You don't have to skill Stone Gaze at level 6 unless you feel like you might be in danger.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "medusa_stone_gaze" },
  },
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_7_NeutralMana",
    messageTime: [6 * 60, 12 * 60],
    textMessage:
      "If a neutral camp consists of multiple creeps with mana pools, Mystic Snake can regain you a lot of mana.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "medusa_mystic_snake" },
  },
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_8_MantaWaves",
    messageTime: 13 * 60,
    textMessage:
      "Use Manta Style with Split Shot on to farm extra creepwaves that you can't with your hero.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "manta" },
  },
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_9_StoneGazeRush",
    messageTime: 13 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage: `You need not rush Stone Gaze usage in the fights. Make sure opponents are committed to the fight before you pop it.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "medusa_stone_gaze" },
  },
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_10_Center",
    messageTime: 13 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Position yourself in the center of the fight to Split Shot multiple heros. Medusa does mediocre single-target damage.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "medusa_split_shot" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_11_SnakeBigManaPool",
    messageTime: 13 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "Prioritize using Mystic Snake on high mana pool heroes in fights.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "medusa_mystic_snake" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_12_ManaBurn",
    messageTime: 14 * 60,
    textMessage: `Mana burn is a big problem for Medusa. You can itemize against it or adapt the playstyle.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_13_DivineRapier",
    messageTime: [25 * 60, 35 * 60],
    textMessage:
      "If things are going rough, consider purchasing Divine Rapier. Works well with Split Shot.",
    audience: [Audience.ALL],
    image: { type: "item", name: "rapier" },
  },
  {
    category: "OwnHero",
    npcHeroName: "medusa",
    audioFile: "ownHero/Medusa_14_ManaPool",
    messageTime: [1 * 60, 3 * 60, 7 * 60, 11 * 60],
    textMessage:
      "Your mana pool also acts as your HP pool. So remain aware of your current mana and keep it high with clarities and lotuses.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "medusa_mana_shield" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "medusa",
    audioFile: "enemyHero/Medusa_1_MysticSnake",
    messageTime: -60,
    textMessage:
      "Play on the side of the creepwave to avoid being hit by Mystic Snake - Medusa's main laning spell.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "medusa",
    audioFile: "enemyHero/Medusa_2_StoneGaze",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Look to kill Medusa before she activates her Ulti. If Stone Gaze is up, turn or run away from Medusa.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "medusa",
    audioFile: "enemyHero/Medusa_3_ContestFarm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Medusa farms quickly due to Split Shot. Smoke on her, place deep wards and block off camps with sentries.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "medusa",
    audioFile: "enemyHero/Medusa_4_ManaBurn",
    messageTime: 12 * 60,
    textMessage: "Mana burning spells and items are great against Medusa.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "medusa",
    audioFile: "enemyHero/Medusa_5_CounterItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard, armor items and Heaven's Halberd are great against Medusa.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "medusa",
    audioFile: "enemyHero/Medusa_6_LowHP",
    messageTime: [1 * 60, 3 * 60, 7 * 60, 11 * 60],
    textMessage:
      "Medusa is extremely squishy once her mana pool is gone as she has a very small HP pool.",
    audience: [Audience.ALL],
  },

  // 60. Meepo
  {
    category: "OwnHero",
    npcHeroName: "meepo",
    audioFile: "ownHero/Meepo_1_ControlRunes",
    messageTime: [2 * 60 + 45, 7 * 60 + 45],
    textMessage:
      "Meepo farms really fast. Focus on pushing out waves, optimizing farming routes and stacking.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "meepo_divided_we_stand" },
  },
  /*   {
    category: "OwnHero",
    npcHeroName: "meepo",
    audioFile: "ownHero/Meepo_2_FarmFast",
    messageTime: 4 * 60 + 15,
    textMessage:
      "Meepo farms really fast. Focus on pushing out waves, optimizing farming routes and stacking.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "meepo_poof" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "meepo",
    audioFile: "ownHero/Meepo_3_Tempo",
    messageTime: 4 * 60 + 30,
    textMessage:
      "Meepo is a tempo hero that falls off over time. Hit your item timings, secure Roshan and play aggressively.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "meepo",
    audioFile: "ownHero/Meepo_4_GankItems",
    messageTime: 10 * 60 + 15,
    textMessage:
      "Once you have Diffusal Blade and dragon lance, look for pick-offs.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "diffusal_blade" },
  },
  {
    category: "OwnHero",
    npcHeroName: "meepo",
    audioFile: "ownHero/Meepo_5_GankSidelanes",
    messageTime: [12 * 60 + 30, 22 * 60 + 30],
    textMessage:
      "Keep side lanes pushed in and linger around with a clone to gank the opponents that appear depushing.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "meepo",
    audioFile: "ownHero/Meepo_6_GankSidelanes",
    messageTime: 15 * 60 + 15,
    textMessage:
      "Meepo can take Roshan down on his own fairly early. Kill first Roshan before the 20 min mark.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "meepo",
    audioFile: "enemyHero/Meepo_1_SpiritVessel",
    messageTime: -60,
    textMessage:
      "Someone should buy Spirit Vessel against Meepo to counter healing from Ransack.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "meepo",
    audioFile: "enemyHero/Meepo_2_ContestFarm",
    messageTime: 6 * 60,
    textMessage:
      "Meepo farms quickly due to Poof. Smoke on him, place deep wards and block off camps with sentries.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "meepo",
    audioFile: "enemyHero/Meepo_3_Burst",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage: "Look to burst one of the Meepos and don't split your damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "meepo",
    audioFile: "enemyHero/Meepo_4_TowerDefense",
    messageTime: 10 * 60 + 20,
    textMessage: "Meepo takes buildings down fast. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "meepo",
    audioFile: "enemyHero/Meepo_5_Greedy",
    messageTime: 12 * 60,
    textMessage:
      "Meepo is snowbally hero and falls off. Don't be greedy with items and allow him to pick you off.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "meepo",
    audioFile: "enemyHero/Meepo_6_CounterItems",
    messageTime: 12 * 60 + 10,
    textMessage: "Crimson Guard and armor items are great against Meepo.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "meepo",
    audioFile: "enemyHero/Meepo_7_Roshan",
    messageTime: [12 * 60 + 20, 22 * 60 + 20, 32 * 60 + 20],
    textMessage:
      "Meepo is able to solo kill Roshan early on. Ward and check Roshpit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "meepo",
    audioFile: "enemyHero/Meepo_8_Splitpush",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Meepo is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 61. Mirana
  {
    category: "OwnHero",
    npcHeroName: "mirana",
    audioFile: "ownHero/Mirana_1_BigCamp",
    messageTime: -90,
    textMessage:
      "Big pull camp must not be blocked. You want to use it for pulling or gain extra farm by arrowing the big creep.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mirana",
    audioFile: "ownHero/Mirana_2_LongRange",
    messageTime: 10,
    textMessage:
      "Make use of Mirana's long attack range to harass without aggroing too often.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "mirana",
    audioFile: "ownHero/Mirana_3_RangedCreep",
    messageTime: 20,
    textMessage: "Secure ranged creeps with Sacred Arrow if necessary.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mirana_arrow" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mirana",
    audioFile: "ownHero/Mirana_4_RangedCreep",
    messageTime: [5 * 60, 10 * 60],
    textMessage:
      "Arrow catapults to prevent your buildings from taking extra damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mirana_arrow" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mirana",
    audioFile: "ownHero/Mirana_5_SaveAlly",
    messageTime: [8 * 60, 14 * 60],
    textMessage:
      `With the Moonlight Shadow facet, look around the map to save an ally in trouble with Moonlight Shadow.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "mirana_invis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mirana",
    audioFile: "ownHero/Mirana_6_Neutrals",
    messageTime: 2 * 60,
    textMessage:
      "Use Arrow to one shot hero controlled creeps. Especially useful against Chen, Enchantress, and Beastmaster.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mirana_arrow" },
  },
  {
    category: "OwnHero",
    npcHeroName: "mirana",
    audioFile: "ownHero/Mirana_7_Roaming",
    messageTime: 7 * 60 + 15,
    textMessage:
      "Use the portals to roam around the map and set up kills with your lockdown.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "mirana_arrow" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "mirana",
    audioFile: "enemyHero/Mirana_1_ObserverWard",
    messageTime: -60,
    textMessage:
      "Bring an Observer Ward to the lane to be able to see Mirana's Sacred Arrows.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "mirana",
    audioFile: "enemyHero/Mirana_2_CreepShield",
    messageTime: -50,
    textMessage:
      "Play around your creeps and use them as a shield against Mirana's Sacred Arrow.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "mirana",
    audioFile: "enemyHero/Mirana_3_BlockBigCamp",
    messageTime: -40,
    textMessage:
      "Consider blocking the big pull camp. Mirana likes to farm the big neutral creep with Sacred Arrow.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "mirana",
    audioFile: "enemyHero/Mirana_4_Roam",
    messageTime: [3 * 60 + 30, 5 * 60 + 30, 7 * 60 + 30],
    textMessage:
      "Mirana roams a lot. Keep track of her movements and have teleport ready.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "mirana",
    audioFile: "enemyHero/Mirana_5_ObserverSentry",
    messageTime: [10 * 60 + 10, 18 * 60 + 10, 26 * 60 + 10],
    textMessage:
      `If Mirana has the Moonlight Shadow facet, pair Observer Wards and Sentries on map to see opponents approaching under invisibility.`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "mirana",
    audioFile: "enemyHero/Mirana_6_Detection",
    messageTime: [10 * 60 + 20, 18 * 60 + 20, 26 * 60 + 20],
    textMessage: `If Mirana has the Moonlight Shadow facet, carry detection on multiple heroes against her invisibility.`,
    audience: [Audience.ALL],
  },

  // 62. Monkey King
  {
    category: "OwnHero",
    npcHeroName: "monkey_king",
    audioFile: "ownHero/MonkeyKing_1_Mischief1",
    messageTime: -50,
    textMessage:
      "Turning into courier form with Mischief allows you to sneak up to opponents or snipe their couriers in the base. The opponents can't see you on minimap.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "monkey_king",
    audioFile: "ownHero/MonkeyKing_2_Mischief2",
    messageTime: -20,
    textMessage:
      "Well timed Mischief allows you to dodge the damage coming from attacks and spells but not the debuffs coming with that spell or attack.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "monkey_king",
    audioFile: "ownHero/MonkeyKing_3_BoundlessStrike",
    messageTime: 30,
    textMessage:
      "Consider skilling Boundless Strike on level 1 to secure range creep lasthit if you don't see yourself getting Jingu Mastery stacks up.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "monkey_king",
    audioFile: "ownHero/MonkeyKing_4_JinguMastery",
    messageTime: 40,
    textMessage:
      "Acquiring Jingu stacks or a threat of getting them is the way Monkey King wins the lane. Orb of Venom and early boots help with that.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "monkey_king",
    audioFile: "ownHero/MonkeyKing_5_TreeDance1",
    messageTime: 2 * 60 + 30,
    textMessage:
      "If the lane is rough consider putting more points in Tree Dance for creep clearing and work on solving mana issues to be able to spam it.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "monkey_king",
    audioFile: "ownHero/MonkeyKing_6_CuttingTrees",
    messageTime: 3 * 60 + 30,
    repeatTime: 20 * 60,
    textMessage:
      "Many spells and items can cut trees you are standing on, including those coming from your allies. Be careful about that.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "monkey_king",
    audioFile: "ownHero/MonkeyKing_7_TreeDance2",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Pillar and Tinker wards as well as spells that provide flying vision when used, can spot you standing on the trees.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "monkey_king",
    audioFile: "ownHero/MonkeyKing_8_WukongCommand1",
    messageTime: 6 * 60 + 30,
    textMessage:
      "You should skip skilling Wukong Command on level 6 in most of the games as it is hard to keep opponents inside of it early on.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "monkey_king",
    audioFile: "ownHero/MonkeyKing_9_WukongCommand2",
    messageTime: 7 * 60 + 30,
    textMessage:
      "Channeling Wukong command from a tree will make you drop down from it without being stunned. You can jump back on the tree and the ulty will keep going.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "monkey_king",
    audioFile: "ownHero/MonkeyKing_10_WukongCommand3",
    messageTime: 10 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "To get a good Wukong Command ideally channel it outside of opponents' vision and follow up with Boundless Strike. ",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "monkey_king",
    audioFile: "ownHero/MonkeyKing_11_Soldiers",
    messageTime: 16 * 60,
    textMessage:
      "Items that modify attacks or have proc chance - except for Basher - will work on Monkey King soldiers.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "monkey_king",
    audioFile: "enemyHero/MonkeyKing_1_MeleeCores",
    messageTime: -90,
    textMessage:
      "Monkey King is one of the strongest laners against melee heroes, as it is easy for him to get Jingu Mastery stacks up. Ranged heroes have better time against him in general as he has low armor and simple right clicks tend to do good work",
    chatMessage:
      "Monkey King is strong laner against melee heroes due to Jingu Mastery. Consider picking ranged hero",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "monkey_king",
    audioFile: "enemyHero/MonkeyKing_2_Speed",
    messageTime: -60,
    textMessage:
      "Early boots or even a Windlace are advisable for melee cores against Monkey King",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "monkey_king",
    audioFile: "enemyHero/MonkeyKing_3_Mischief",
    messageTime: -30,
    textMessage:
      "Be careful on initial bounty runes as Monkey might come from behind while under the effect of Mischief (as courier). You can't see him on the minimap while under the effect of Mischief. He also doesn't aggro towers while Mischiefed so he might even run into your base and snipe couriers",
    chatMessage:
      "Monkey might come from behind while under the effect of Mischief. You can't see him on the minimap",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "monkey_king",
    audioFile: "enemyHero/MonkeyKing_4_JinguMastery1",
    messageTime: 15,
    textMessage:
      "Prevent Monkey King from getting four stacks of Jingu Mastery. But if it happens avoid staying in one line for multi-hero Boundless Strike",
    chatMessage:
      "Prevent Monkey King from getting four stacks of Jingu Mastery",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "monkey_king",
    audioFile: "enemyHero/MonkeyKing_5_MeleeLaning",
    messageTime: 50,
    textMessage:
      "Melee cores should avoid laning directly against Monkey King. Try to hijack, skip or pull creeps",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "monkey_king",
    audioFile: "enemyHero/MonkeyKing_6_CuttingTrees",
    messageTime: 2 * 60 + 15,
    textMessage:
      "Cutting trees that Monkey King stands on stuns him for 4 seconds. Having a quelling blade or a tree cutting ability is very useful against him",
    chatMessage:
      "Cutting trees that Monkey King stands on stuns him for 4 seconds",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "monkey_king",
    audioFile: "enemyHero/MonkeyKing_7_JinguMastery2",
    messageTime: 8 * 60 + 30,
    textMessage:
      "Break effects are good at reducing Monkey Kings' damage output and Spirit Vessel reduces healing from Jingu Mastery stacks",
    chatMessage:
      "Break effects reduce Monkey Kings' damage output and Spirit Vessel reduces healing from Jingu Mastery",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "monkey_king",
    audioFile: "enemyHero/MonkeyKing_8_Ultimate",
    messageTime: [16 * 60 + 30, 36 * 60 + 30, 56 * 60 + 30],
    textMessage:
      "Monkey King's ultimate grants him bonus armor and he therefore takes little physical damage. Dealing magical and pure damage is the priority. If Monkey King uses Black King Bar you should not fight him inside Wukong's Command ring",
    chatMessage:
      "Monkey King takes little physical damage inside Wukong's Command ring. Magical and pure damage are good",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "monkey_king",
    audioFile: "enemyHero/MonkeyKing_9_ForceOut",
    messageTime: [26 * 60 + 30, 46 * 60 + 30],
    textMessage:
      "Items and abilities that force Monkey King out of his ultimate are valuable",
    audience: [Audience.ALL],
  },

  // 63. Morphling
  {
    category: "OwnHero",
    npcHeroName: "morphling",
    audioFile: "ownHero/Morphling_1_Outlasthit",
    messageTime: 10,
    textMessage:
      "Focus on outlasthiting opponents with high base damage, Shifting more agility will help with last hitting but can be risky.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "morphling_morph_agi" },
  },
  {
    category: "OwnHero",
    npcHeroName: "morphling",
    audioFile: "ownHero/Morphling_2_AvoidHarass",
    messageTime: 20,
    textMessage:
      "Be careful when playing versus ranged heroes. You don't want to allow them to harras you too much and force you to morph strength.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "morphling_morph_str" },
  },
  {
    category: "OwnHero",
    npcHeroName: "morphling",
    audioFile: "ownHero/Morphling_3_Sustain",
    messageTime: 30,
    textMessage: "Rush Morbid Mask for hp sustain on a mediocre to tough lane.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "lifesteal" },
  },
  {
    category: "OwnHero",
    npcHeroName: "morphling",
    audioFile: "ownHero/Morphling_4_AgilityHeal",
    messageTime: 40,
    textMessage:
      "Whenever you drop low on health, shift to agility before using health consumables or stick.",
    audience: [Audience.ALL],
    image: { type: "item", name: "flask" },
  },
  {
    category: "OwnHero",
    npcHeroName: "morphling",
    audioFile: "ownHero/Morphling_5_AdaptiveRanged",
    messageTime: 60,
    textMessage:
      "Consider putting a point in Adaptive Strike on level 2 if you have issues securing range creep lasthit.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "morphling_adaptive_strike_agi" },
  },
  {
    category: "OwnHero",
    npcHeroName: "morphling",
    audioFile: "ownHero/Morphling_6_MorphStrenghTrouble",
    messageTime: [75, 9 * 60 + 15, 17 * 60 + 15],
    textMessage:
      "Start morphing into strength right away if you expect to be jumped.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "morphling_morph_str" },
  },
  {
    category: "OwnHero",
    npcHeroName: "morphling",
    audioFile: "ownHero/Morphling_7_HealReductions",
    messageTime: 8 * 60,
    textMessage:
      "Healing reductions and silences are a big problem for Morph and early Manta can dispel both in many cases.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "manta" },
  },
  {
    category: "OwnHero",
    npcHeroName: "morphling",
    audioFile: "ownHero/Morphling_8_DontFullAgility",
    messageTime: [9 * 60, 14 * 60, 19 * 60],
    textMessage:
      "Don't be morphed fully into agility when moving around or before the fight.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "morphling_morph_str" },
  },
  {
    category: "OwnHero",
    npcHeroName: "morphling",
    audioFile: "ownHero/Morphling_9_EyeOfSkadi",
    messageTime: 9 * 60 + 30,
    textMessage:
      "Your main powerspike is eye of skadi, in cases where manta isn't required you can go skadi after yasha.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "skadi" },
  },
  {
    category: "OwnHero",
    npcHeroName: "morphling",
    audioFile: "ownHero/Morphling_11_Aghanims_shard",
    messageTime: 15 * 60,
    textMessage:
      "Aghanim's Shard is really good when you are playing against excessive disable and long stuns.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "morphling",
    audioFile: "ownHero/Morphling_10_Aghanims",
    messageTime: 18 * 60 + 30,
    textMessage: "Aghanim's Scepter is good vs strong illusion heroes.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "morphling",
    audioFile: "enemyHero/Morphling_1_SpritVessel",
    messageTime: -60,
    textMessage:
      "Someone should buy Spirit Vessel against Morphling to offset Attribute Shift strength gain.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "morphling",
    audioFile: "enemyHero/Morphling_2_PressureEarly",
    messageTime: -50,
    textMessage:
      "Morphling is weaker in his earlier levels, Pressure him early on.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "morphling",
    audioFile: "enemyHero/Morphling_3_LowHPPool",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Morphling tends to play on a low hp pool. Surprise him with smoke, instant disable, silence or invisibility.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "morphling",
    audioFile: "enemyHero/Morphling_4_Focus",
    messageTime: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Focus Morphling in the fights or he will do insane amounts of damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "morphling",
    audioFile: "enemyHero/Morphling_5_Ethereal",
    messageTime: 13 * 60,
    textMessage:
      "Morphling is likely to be farming safe areas of the map like the triangle, If possible try to gank with smokes and pressure the hero.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "morphling",
    audioFile: "enemyHero/Morphling_6_EyeOfSkadi",
    messageTime: 15 * 60,
    textMessage:
      "Eye of Skadi is good against Morphing to offset Attribute Shift strength gain and to slow him.",
    audience: [Audience.ALL],
  },

  // 124. Muerta
  /* {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: "ownHero/Muerta_1_FalconBlade",
    messageTime: 1 * 60,
    textMessage: "Rush Falcon Blade to spam Dead Shot for farm and lane control.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "falcon_blade" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: "ownHero/Muerta_2_DeadShot",
    messageTime: 30,
    textMessage: "Use Dead Shot to secure last hits and damage enemy heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "muerta_dead_shot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: "ownHero/Muerta_3_FearThreat",
    messageTime: 2 * 60 + 30,
    textMessage: "Look for angles to fear enemies under tower with Dead Shot.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "muerta_dead_shot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: "ownHero/Muerta_4_SpellCombo",
    messageTime: 3 * 60 + 30,
    textMessage: "Use Dead Shot to fear enemy heroes into The Calling spirits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "muerta_the_calling" },
  },
  {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: "ownHero/Muerta_5_SpellImmunity",
    messageTime: [10 * 60 + 15, 20 * 60 + 15],
    textMessage:
      `Be careful not to use Pierce the Veil against debuff immunity and heavy magic resistance.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "muerta_pierce_the_veil" },
  },
  {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: "ownHero/Muerta_6_PhysicalImmunity",
    messageTime: 12 * 60,
    textMessage:
      "Pierce the Veil makes you immune to all physical damage. Use it to evade attacks.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "muerta_pierce_the_veil" },
  },
  {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: "ownHero/Muerta_7_DodgeProjectiles",
    messageTime: 14 * 60,
    textMessage:
      "You can dodge mid air projectiles like Vengeful Spirit stun with Pierce the Veil.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "muerta_pierce_the_veil" },
  },
  {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: "ownHero/Muerta_8_CarefulPositioning",
    messageTime: 17 * 60,
    textMessage:
      "Be careful about your positioning in teamfights as your hero is slow and immobile without Blink or Hurricane Pike.",
    audience: [Audience.ALL],
    image: { type: "item", name: "hurricane_pike" },
  },
  {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: "ownHero/Muerta_9_FearDirection",
    messageTime: 18 * 60,
    textMessage:
      "Look to keep enemy heroes within your attack range with the Dead Shot.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "muerta_dead_shot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: "ownHero/Muerta_10_MidGameFighting",
    messageTime: 22 * 60 + 30,
    textMessage:
      "Be patient using Pierce the Veil when enemy heroes have BKBs.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: "ownHero/Muerta_11_ArmorCounter",
    messageTime: 30 * 60 + 30,
    textMessage: `Use Pierce the Veil to burst down high armor heroes with massive magic damage from your right clicks.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "muerta_pierce_the_veil" },
  },
  {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: "ownHero/Muerta_12_Eblade",
    messageTime: 34 * 60,
    textMessage:
      "Use Ethereal Blade in combination with Pierce the Veil for massive magical burst damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ethereal_blade" },
  },
  {
    category: "OwnHero",
    npcHeroName: "muerta",
    audioFile: `ownHero/Muerta_13_Maelstrom`,
    messageTime: 4 * 60,
    textMessage: `Get Maelstrom in the early game to flash farm the map and scale better in the mid game.`,
    audience: [Audience.ROLE_CORE],
    image: { type: `item`, name: `maelstrom` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "muerta",
    audioFile: "enemyHero/Muerta_1_Positioning",
    messageTime: 30,
    textMessage:
      "Be careful about last hitting close to the enemy tower against Dead Shot fear.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "muerta",
    audioFile: "enemyHero/Muerta_2_MovementSpeed",
    messageTime: 2 * 60,
    textMessage:
      "Get some movement speed with Boots and Wind Lace to get out of The Calling AOE.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "muerta",
    audioFile: "enemyHero/Muerta_3_Manfight",
    messageTime: 7 * 60 + 10,
    textMessage:
      "Try not to fight Muerta solo as she can hit you with double attacks with Gunslinger.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "muerta",
    audioFile: "enemyHero/Muerta_4_Bkb",
    messageTime: 12 * 60,
    textMessage:
      `Get an early BKB against Muerta to reduce her spell damage from Pierce the Veil and Dead Shot.`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "muerta",
    audioFile: "enemyHero/Muerta_5_MagicResistance",
    messageTime: 14 * 60,
    textMessage:
      "Magic resistance items are incredible against Muerta's magical burst.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "muerta",
    audioFile: "enemyHero/Muerta_6_DamageReduction",
    messageTime: 16 * 60,
    textMessage:
      "Get items like Mage Slayer and Heavens Halberd to severely reduce Muerta's damage output.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "muerta",
    audioFile: "enemyHero/Muerta_7_Mobility",
    messageTime: 18 * 60,
    textMessage:
      "Buy mobility items like Blink and Force Staff to close the gap on Muerta.",
    audience: [Audience.ALL],
  },

  // 64. Naga Siren
  {
    category: "OwnHero",
    npcHeroName: "naga_siren",
    audioFile: "ownHero/NagaSiren_1_MirrorImagesDispel",
    messageTime: -75,
    textMessage: "Mirror Image applies basic dispel on cast.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "naga_siren_mirror_image" },
  },
  {
    category: "OwnHero",
    npcHeroName: "naga_siren",
    audioFile: "ownHero/NagaSiren_2_MirrorImagesAnnoying",
    messageTime: [-60, 7 * 60 + 30, 17 * 60 + 30],
    textMessage:
      "Mirror Images can be used to deny runes or to deceive the opponents about your hero's presence.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "naga_siren_mirror_image" },
  },
  {
    category: "OwnHero",
    npcHeroName: "naga_siren",
    audioFile: "ownHero/NagaSiren_3_UnblockCamps",
    messageTime: -45,
    textMessage:
      "Make sure pull camps are unblocked as the lane will be pushing frequently due to Rip Tide. Ask your support to start with a sentry.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "naga_siren",
    audioFile: "ownHero/NagaSiren_4_Hotkeys",
    messageTime: [10, 11 * 60, 25 * 60],
    textMessage: "Setup hotkeys to easily split up your illusions.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "naga_siren_mirror_image" },
  },
  {
    category: "OwnHero",
    npcHeroName: "naga_siren",
    audioFile: "ownHero/NagaSiren_5_MirrorImagesLasthitting",
    messageTime: 15,
    textMessage:
      "Use Mirror Images non stop to have an upper hand when it comes to lasthitting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "naga_siren_mirror_image" },
  },
  {
    category: "OwnHero",
    npcHeroName: "naga_siren",
    audioFile: "ownHero/NagaSiren_6_EnsnareKill",
    messageTime: 2 * 60,
    textMessage:
      "Consider putting a point in Ensnare around level 4 but only if you can get a kill out of it.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "naga_siren_ensnare" },
  },
  {
    category: "OwnHero",
    npcHeroName: "naga_siren",
    audioFile: "ownHero/NagaSiren_7_DontOverlane",
    messageTime: 2 * 60 + 15,
    textMessage:
      "Naga is not a particularly good laning hero. Get as many levels as you can and move to the jungle.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "naga_siren",
    audioFile: "ownHero/NagaSiren_8_PushSidelanes",
    messageTime: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Keep sidelines pushed out by illusions and farm opponents' camps more and more as you get stronger.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "naga_siren_mirror_image" },
  },
  {
    category: "OwnHero",
    npcHeroName: "naga_siren",
    audioFile: "ownHero/NagaSiren_9_SongInTime",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Be quick at judging the situation and pop Song of Siren when it starts going downhill.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "naga_siren_song_of_the_siren" },
  },
  {
    category: "OwnHero",
    npcHeroName: "naga_siren",
    audioFile: "ownHero/NagaSiren_10_SongRoshan",
    messageTime: 15 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage: "You can use Song of the Siren to secure Roshan kill.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "naga_siren_song_of_the_siren" },
  },
  {
    category: "OwnHero",
    npcHeroName: "naga_siren",
    audioFile: "ownHero/NagaSiren_11_SongRoshan",
    messageTime: [19 * 60 + 15, 24 * 60],
    textMessage:
      "Aghanim's Scepter is a great pick up to control spell-immune heroes.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "naga_siren",
    audioFile: "enemyHero/NagaSiren_1_KillImages",
    messageTime: -60,
    textMessage:
      "Kill Mirror Images to cripple Naga's last hitting capabilities on the lane.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "naga_siren",
    audioFile: "enemyHero/NagaSiren_2_MirrorImage",
    messageTime: -50,
    textMessage: "Hex, Drains and Dagon destroy Mirror Images instantly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "naga_siren",
    audioFile: "enemyHero/NagaSiren_3_ContestFarm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Naga Siren farms quickly with Mirror Images. Smoke on her, place deep wards and block camps with sentries.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "naga_siren",
    audioFile: "enemyHero/NagaSiren_4_AoEItems",
    messageTime: 12 * 60,
    textMessage:
      "Items that provide AoE damage, especially magical damage, are great at dealing with Mirror Images.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "naga_siren",
    audioFile: "enemyHero/NagaSiren_5_CounterItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard and armor items are great against Naga's physical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "naga_siren",
    audioFile: "enemyHero/NagaSiren_6_BootsOfTravel",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Naga is great at split-pushing and ratting. Consider getting Boots of Travel on a Core.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "naga_siren",
    audioFile: "enemyHero/NagaSiren_7_Roshan",
    messageTime: [15 * 60, 25 * 60, 35 * 60],
    textMessage:
      "Naga can pop Song of the Siren and finish Roshan. Be mindful about it when taking or contesting Roshan.",
    audience: [Audience.ALL],
  },

  // 65. Nature's Prophet (Furion)
  {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_1_TreantsJob",
    messageTime: 18 * 60 + 45,
    textMessage:
      "Treants are not only good for lasthitting or harassing but also to scout, block off camps and deny runes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_force_of_nature" },
  },
  {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_2_Bodyblock",
    messageTime: [12 * 60 + 45, 24 * 60 + 45, 36 * 60 + 45],
    textMessage:
      "Consider bodyblocking opponents with treants when going for a kill or trying to escape.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_force_of_nature" },
  },
  {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_3_TPHeal",
    messageTime: 60,
    textMessage:
      "When low on health, consider using tp scroll to go back to base and teleport back with the spell.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_teleportation" },
  },
  {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_12_TPWisdomRune",
    messageTime: 6 * 60 + 45,
    textMessage:
      "Wisdom runes spawn at minute 7, look to steal enemy runes with teleport as it gives you alot and denies alot from the enemy.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_teleportation" },
  },
  {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_4_LookAround",
    messageTime: 75,
    repeatTime: 10 * 60,
    textMessage:
      "Look around the map for opportunities to gank, take towers, snipe couriers, pick up runes or place deep wards.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_wrath_of_nature" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_5_TangoSprout",
    messageTime: 2 * 60 + 15,
    textMessage: "Using Tango on a Sprout tree provides more health regeneration.",
    audience: [Audience.ALL],
    image: { type: "item", name: "tango" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_6_SproutVision1",
    messageTime: [2 * 60 + 30, 12 * 60 + 30, 22 * 60 + 30],
    textMessage:
      "Sprout provides vision in the area and can be useful to scout pillars for wards or Roshan.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_sprout" },
  },
  {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_7_SproutVision2",
    messageTime: [7 * 60 + 45, 17 * 60 + 45, 27 * 60 + 45],
    textMessage:
      "Save yourself or an ally by placing Sprout strategically. It is great for kiting spell-immune opponents.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_sprout" },
  },
  {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_8_SproutVision3",
    messageTime: [3 * 60, 13 * 60],
    textMessage: "Sprout can push you up or down the cliff or pillar.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_sprout" },
  },
  {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_9_SproutVision4",
    messageTime: [6 * 60, 9 * 60],
    textMessage:
      "Typically, use Wrath of Nature on the opposite side of the map from where you want it to hit hard.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_wrath_of_nature" },
  },
  {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_10_PushSidelanes",
    messageTime: [10 * 60 + 15, 18 * 60 + 15, 26 * 60 + 15],
    textMessage:
      "When not much is happening, push out the sidelines with your sprout and summons.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_sprout" },
  },
  {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_11_Ratting",
    messageTime: [12 * 60 + 15, 20 * 60 + 15, 28 * 60 + 15],
    textMessage:
      "Nature's Prophet excels at ratting, so resort to it if the game slows down or you fall behind.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_force_of_nature" },
  },
  {
    category: "OwnHero",
    npcHeroName: "furion",
    audioFile: "ownHero/Furion_13_DangerousFarming",
    messageTime: [
      6 * 60 + 15,
      16 * 60 + 15,
      26 * 60 + 15,
      36 * 60 + 15,
      46 * 60 + 15,
    ],
    textMessage:
      "Use Sprout to safely clear creep waves in dangerous areas of the map where you might die.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "furion_sprout" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "furion",
    audioFile: "enemyHero/Furion_1_CourierSniping",
    messageTime: -60,
    textMessage:
      "Nature's Prophet is great at sniping couriers. Fly courier over trees when possible",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "furion",
    audioFile: "enemyHero/Furion_2_AntisproutItems",
    messageTime: 30,
    textMessage:
      "To counter Nature Prophet's Sprout, buy Quelling Blade, Tangoes or Force Staff.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "furion",
    audioFile: "enemyHero/Furion_3_TangoSprout",
    messageTime: 40,
    textMessage:
      "Use a tango to get out of Sprout trees if you do not have a quelling blade.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "furion",
    audioFile: "enemyHero/Furion_4_WrathOfNature",
    messageTime: 8 * 60,
    textMessage:
      "Wrath of Nature can hit you with up to 400 damage at level 6.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "furion",
    audioFile: "enemyHero/Furion_5_WrathOfNatureVision",
    messageTime: 8 * 60 + 10,
    textMessage:
      "If Wrath of Nature hits you and there are no enemies around, then you are close to an Observer ward.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "furion",
    audioFile: "enemyHero/Furion_6_TowerDefense",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Nature's Prophet can take down buildings fast. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "furion",
    audioFile: "enemyHero/Furion_7_Splitpushing",
    messageTime: 12 * 60,
    textMessage:
      "Nature's Prophet is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 66. Necrophos
  {
    category: "OwnHero",
    npcHeroName: "necrolyte",
    audioFile: "ownHero/Necrophos_1_BigCamp",
    messageTime: -90,
    textMessage:
      "Big camp needs to be open for pulling as the lane will push often due to Death Pulse.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "necrolyte",
    audioFile: "ownHero/Necrophos_2_Sustain",
    messageTime: -30,
    textMessage:
      "Necrophos typically wins the lane off of his sustain. Last hitting needs to be on point.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "necrolyte_heartstopper_aura" },
  },
  {
    category: "OwnHero",
    npcHeroName: "necrolyte",
    audioFile: "ownHero/Necrophos_3_DeathPulseMultitasking",
    messageTime: 10,
    textMessage:
      "Do multiple things with Death Pulse at the same time - secure last hit, harass opponents and heal an ally.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "necrolyte_death_pulse" },
  },
  {
    category: "OwnHero",
    npcHeroName: "necrolyte",
    audioFile: "ownHero/Necrophos_4_ScrewLasthits",
    messageTime: 20,
    textMessage:
      "Mess around with opponents last hitting by healing the creeps and damaging opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "necrolyte_death_pulse" },
  },
  {
    category: "OwnHero",
    npcHeroName: "necrolyte",
    audioFile: "ownHero/Necrophos_5_StayClose",
    messageTime: 75,
    textMessage:
      "Keep yourself close enough to opponents for Heartstopper Aura to damage them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "necrolyte_heartstopper_aura" },
  },
  {
    category: "OwnHero",
    npcHeroName: "necrolyte",
    audioFile: "ownHero/Necrophos_6_InTrouble",
    messageTime: [2 * 60, 9 * 60, 16 * 60],
    textMessage:
      "If in trouble, pop Ghost Shroud and then any healing you might have. You can potentially teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "necrolyte_sadist" },
  },
  {
    category: "OwnHero",
    npcHeroName: "necrolyte",
    audioFile: "ownHero/Necrophos_8_Cloak",
    messageTime: [3 * 60 + 15, 6 * 60 + 15],
    textMessage:
      "Ghost Shroud makes you vulnerable to magical damage so you typically need an early Cloak.",
    audience: [Audience.ALL],
    image: { type: "item", name: "cloak" },
  },
  {
    category: "OwnHero",
    npcHeroName: "necrolyte",
    audioFile: "ownHero/Necrophos_8_Counters",
    messageTime: [6 * 60, 12 * 60],
    textMessage:
      "Healing reductions and silences are a big problem for Necrophos. Itemize against those and adjust playstyle.",
    audience: [Audience.ALL],
    image: { type: "item", name: "cyclone" },
  },
  {
    category: "OwnHero",
    npcHeroName: "necrolyte",
    audioFile: "ownHero/Necrophos_9_KillAtStart",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Look to score a kill at the beginning of the fight as you'll be considerably harder to kill afterwards.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "necrolyte_heartstopper_aura" },
  },
  {
    category: "OwnHero",
    npcHeroName: "necrolyte",
    audioFile: "ownHero/Necrophos_10_BlackKingBar",
    messageTime: 12 * 60 + 15,
    textMessage: "Ghost Shroud has no effect during Black King Bar.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "necrolyte",
    audioFile: "ownHero/Necrophos_11_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanims Shard at the 15 minute mark as it provides gap close and farming speed.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "necrolyte",
    audioFile: "enemyHero/Necrophos_1_SpiritVessel",
    messageTime: -60,
    textMessage:
      "To counter Necrophos' healing and regeneration, someone should buy Spirit Vessel",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "necrolyte",
    audioFile: "enemyHero/Necrophos_2_Burst",
    messageTime: -50,
    textMessage:
      "Burst Necrophos down, so he can't last hit creeps and regain HP and mana with Heartstopper Aura.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "necrolyte",
    audioFile: "enemyHero/Necrophos_3_GhostShroud",
    messageTime: 30,
    textMessage: "Necrophos takes increased magical damage under Ghost Shroud.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "necrolyte",
    audioFile: "enemyHero/Necrophos_4_ReapersScythe",
    messageTime: 8 * 60,
    textMessage:
      "Against Necrophos, keep your health above 60% to avoid being killed by Reaper's Scythe.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "necrolyte",
    audioFile: "enemyHero/Necrophos_5_AntimagicItems",
    messageTime: 12 * 60,
    textMessage:
      "Against Necrophos, magic resistance and spell immunity items are great.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "necrolyte",
    audioFile: "enemyHero/Necrophos_6_AntihealingItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Against Necrophos, items that reduce healing and regeneration are good.",
    audience: [Audience.ALL],
  },

  // 67. Night Stalker
  {
    category: "OwnHero",
    npcHeroName: "night_stalker",
    audioFile: "ownHero/NightStalker_1_RunDownMid",
    messageTime: -90,
    textMessage:
      "Run to mid as you load into the game and scout for opponents' midlaner placing observer ward.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "night_stalker",
    audioFile: "ownHero/NightStalker_2_Vision",
    messageTime: -80,
    textMessage:
      "Night Stalker has great night vision but very limited day vision.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "night_stalker",
    audioFile: "ownHero/NightStalker_3_SurviveDay",
    messageTime: 10,
    textMessage:
      "Look to survive through the first 5 minutes of the game and ideally have phase boots as the night hits.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "night_stalker",
    audioFile: "ownHero/NightStalker_4_VoidCreeps",
    messageTime: 20,
    textMessage: "Use Void to secure ranged creep lasthits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "night_stalker_void" },
  },
  {
    category: "OwnHero",
    npcHeroName: "night_stalker",
    audioFile: "ownHero/NightStalker_4_creeps",
    messageTime: 35,
    textMessage:
      "Try to manipulate creep lane equilibrium to get it closer to your tower during the day time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "night_stalker_hunter_in_the_night" },
  },
  {
    category: "OwnHero",
    npcHeroName: "night_stalker",
    audioFile: "ownHero/NightStalker_5_CripplingFear",
    messageTime: 4 * 60,
    textMessage:
      "Keep a skill point or opt to skill Crippling Fear as the first night approaches if it is necessary to score a kill.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "night_stalker_crippling_fear" },
  },
  {
    category: "OwnHero",
    npcHeroName: "night_stalker",
    audioFile: "ownHero/NightStalker_6_NightAggression",
    messageTime: [4 * 60 + 50, 14 * 60 + 50],
    textMessage:
      "Play and farm aggressively during the night time and provide additional vision for your team.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "night_stalker",
    audioFile: "ownHero/NightStalker_7_TPCancel",
    messageTime: [5 * 60, 15 * 60],
    textMessage:
      "When going for a kill, be careful with Voiding right away as the opponent might just teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "night_stalker_void" },
  },
  {
    category: "OwnHero",
    npcHeroName: "night_stalker",
    audioFile: "ownHero/NightStalker_8_AvoidFighting",
    messageTime: [9 * 60 + 50, 19 * 60 + 50],
    textMessage:
      "Avoid fighting when it's daytime and Dark Ascension is down, play defensively or push out lanes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "night_stalker_darkness" },
  },
  {
    category: "OwnHero",
    npcHeroName: "night_stalker",
    audioFile: "ownHero/NightStalker_9_BacklinersAndSupports",
    messageTime: [10 * 60 + 15, 15 * 60 + 15],
    textMessage:
      "Prioritize dealing with backliners and supports in fights, especially once you have Blink Dagger.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "night_stalker",
    audioFile: "enemyHero/NightStalker_1_PressureEarly",
    messageTime: 10,
    textMessage:
      "Night Stalker is weak in the first 5 minutes of the game. Pressure him early.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "night_stalker",
    audioFile: "enemyHero/NightStalker_2_5Minutes",
    messageTime: 4 * 60 + 30,
    textMessage:
      "Night Stalker will fight you at the 5 minute mark, as night time will hit.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "night_stalker",
    audioFile: "enemyHero/NightStalker_3_DarkAscension",
    messageTime: 8 * 60,
    textMessage:
      "Night Stalker's Dark Ascension will allow him to see you inside or behind trees.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "night_stalker",
    audioFile: "enemyHero/NightStalker_4_Daytime",
    messageTime: [8 * 60 + 10, 18 * 60 + 10, 28 * 60 + 10],
    textMessage:
      "Look to fight during daytime and when Dark Ascension is down.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "night_stalker",
    audioFile: "enemyHero/NightStalker_5_Force",
    messageTime: 12 * 60,
    textMessage:
      "Force Staff and Hurricane Pike are great items against Night Stalker's Crippling Fear.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "night_stalker",
    audioFile: "enemyHero/NightStalker_6_Break",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Break effects remove Hunter in the Night and Nightstalker becomes significantly weaker.",
    audience: [Audience.ALL],
  },

  // 68. Nyx Assassin
  {
    category: "OwnHero",
    npcHeroName: "nyx_assassin",
    audioFile: "ownHero/NyxAssassin_1_WeakLaner",
    messageTime: -60,
    textMessage:
      "Nyx is a fairly weak laner. Focus on creep equilibrium, pulling and securing runes for midlaner.",
    audience: [Audience.ROLE_SUPPORT],
  },
  /* {
    category: "OwnHero",
    npcHeroName: "nyx_assassin",
    audioFile: "ownHero/NyxAssassin_2_ManaBurnLane",
    messageTime: -30,
    textMessage: "You can skill Mana Burn on level 2 or 4 if laning against an intelligence hero that harasses a lot with spells.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "nyx_assassin_mana_burn" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "nyx_assassin",
    audioFile: "ownHero/NyxAssassin_3_ImpaleRanged",
    messageTime: 15,
    textMessage: `Use Impale to secure the ranged creep and stun opponents at the same time if possible.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "nyx_assassin_impale" },
  },
  {
    category: "OwnHero",
    npcHeroName: "nyx_assassin",
    audioFile: "ownHero/NyxAssassin_4_Hijack",
    messageTime: 30,
    textMessage:
      "Consider hijacking a second opponents' creepwave behind the tower at 50 seconds into the game.",
    audience: [Audience.ROLE_SUPPORT_SOFT],
  },
  {
    category: "OwnHero",
    npcHeroName: "nyx_assassin",
    audioFile: "ownHero/NyxAssassin_5_CarapaceVendetta",
    messageTime: [6 * 60, 11 * 60],
    textMessage:
      "You can use Spiked Carapace during Vendetta without exiting it.",
    audience: [Audience.ROLE_SUPPORT_SOFT],
    image: { type: "ability", name: "nyx_assassin_spiked_carapace" },
  },
  {
    category: "OwnHero",
    npcHeroName: "nyx_assassin",
    audioFile: "ownHero/NyxAssassin_6_VendettaActive",
    messageTime: [6 * 60 + 15, 12 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Once you have Vendetta up, be active - setup kills and scout. Avoid showing yourself on the lanes too much.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "nyx_assassin_vendetta" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "nyx_assassin",
    audioFile: "ownHero/NyxAssassin_7_ManaBurnFrequently",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Mana Burn frequently in the fights. Intelligence heroes will take more damage. Other types will run out of mana quicker.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "nyx_assassin_mana_burn" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "nyx_assassin",
    audioFile: "ownHero/NyxAssassin_8_AghanimsScepter",
    messageTime: [19 * 60 + 15, 24 * 60 + 15],
    textMessage:
      "Pick up Aghanim's Scepter as it improves most of your spells among other things.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "nyx_assassin",
    audioFile: "ownHero/NyxAssassin_9_MindFlare",
    messageTime: [13 * 60 + 15, 28 * 60],
    textMessage:
      "Remember to use Mind Flare only after you have used all your other damage dealing spells and items.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "nyx_assassin_jolt" },
  },
  {
    category: "OwnHero",
    npcHeroName: "nyx_assassin",
    audioFile: "ownHero/NyxAssassin_10_Roaming",
    messageTime: [7 * 60 + 15],
    textMessage:
      "Use portals to roam between lanes and get kills with your Impale and Carapace setup.",
    audience: [Audience.ALL],
  },
  {
    category: `OwnHero`,
    npcHeroName: `nyx_assassin`,
    audioFile: `ownHero/NyxAssassin_11_MindFlareCreepSecure`,
    messageTime: [3 * 60 + 15, 13 * 60 + 15],
    textMessage:
      `When not much is happening in the game, look to use Mind Flare to instantly kill some jungle creeps for some quick farm and experience.`,
    audience: [Audience.ALL],
	image: { type: `ability`, name: `nyx_assassin_jolt` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "nyx_assassin",
    audioFile: "enemyHero/NyxAssassin_1_SpikedCarapace",
    messageTime: 30,
    textMessage:
      "Be careful not to use a major damaging spell when Spiked Carapace is on or Nyx Assassin is about to use it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "nyx_assassin",
    audioFile: "enemyHero/NyxAssassin_2_StickManaBoots",
    messageTime: 40,
    textMessage: `To counter Nyx Assassin's mana burn facet, get a Magic Stick or Arcane Boots.`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "nyx_assassin",
    audioFile: "enemyHero/NyxAssassin_3_ObserverSentry",
    messageTime: [10 * 60 + 10, 18 * 60 + 10, 26 * 60 + 10],
    textMessage: "To see Nyx under Vendetta buy Sentries and Observer Wards.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "nyx_assassin",
    audioFile: "enemyHero/NyxAssassin_4_Detection",
    messageTime: [10 * 60 + 20, 18 * 60 + 20, 26 * 60 + 20],
    textMessage: "Carry detection on multiple heroes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "nyx_assassin",
    audioFile: "enemyHero/NyxAssassin_5_SpellImmunity",
    messageTime: 12 * 60,
    textMessage: "Spell immunity is great against Nyx.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "nyx_assassin",
    audioFile: "enemyHero/NyxAssassin_6_MindFlare",
    messageTime: 12 * 60,
    textMessage:
      `Avoid buying too many mana pool increasing items against Nyx Assassins Mind Flare.`,
    audience: [Audience.ALL],
  },

  // 69. Ogre Magi
  {
    category: "OwnHero",
    npcHeroName: "ogre_magi",
    audioFile: "ownHero/OgreMagi_1_Tankiness",
    messageTime: 30,
    textMessage: `Play in front of your core to make use of your tankiness.`,
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "ogre_magi",
    audioFile: "ownHero/OgreMagi_2_Ignite1",
    messageTime: 5 * 60,
    textMessage:
      "Ignite has a much longer cast range than Fireblast, so cast it first.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ogre_magi_ignite" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ogre_magi",
    audioFile: "ownHero/OgreMagi_3_Multicast",
    messageTime: 10 * 60,
    textMessage: "Prioritize items that you can multicast with.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ogre_magi_multicast" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ogre_magi",
    audioFile: "ownHero/OgreMagi_4_Ignite2",
    messageTime: 12 * 60,
    textMessage:
      "Look to Ignite the heroes with Blink Dagger to keep it canceled continuously.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ogre_magi",
    audioFile: "ownHero/OgreMagi_5_Tankiness",
    messageTime: 35 * 60,
    textMessage:
      "Look to play in the front and soak up damage to make use of your level 20 talent.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "ogre_magi",
    audioFile: "ownHero/OgreMagi_6_Bloodlust",
    messageTime: 17 * 60,
    repeatTime: 20 * 60,
    textMessage: `Bloodlust your right click cores prior and during a fight.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "ogre_magi_bloodlust" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `ogre_magi`,
    audioFile: `ownHero/OgreMagi_7_EarlyFacetSpike`,
    messageTime: 1 * 60 + 15,
    textMessage: `With the Learning Curve facet, you have a massive power spike at level 2, which you can use to harass and apply pressure on enemy heroes.`,
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "ogre_magi",
    audioFile: "enemyHero/OgreMagi_1_PhysicalDamage",
    messageTime: -15,
    textMessage:
      "Physical damage doesn't do much against Ogre as he has high starting armor. Either ignore him or try to inflict a lot of damage in a short period of time.",
    chatMessage:
      "Ogre is resistant to physical damage. Either ignore him or try to inflict a lot of damage quickly",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ogre_magi",
    audioFile: "enemyHero/OgreMagi_2_MagicResistance",
    messageTime: 1 * 60 + 30,
    textMessage: "Opt for magic resistance items against Ogre",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ogre_magi",
    audioFile: "enemyHero/OgreMagi_3_HandOfMidas",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Ogre players tend to go greedy and farm up Hand of Midas. Try to mess with their Midas timing - cooldown is 90 seconds",
    chatMessage:
      "Ogre tends to go greedy and farm Hand of Midas. Try to mess with his Midas timing (cooldown of 90 seconds)",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ogre_magi",
    audioFile: "enemyHero/OgreMagi_4_LotusOrb",
    messageTime: 8 * 60 + 30,
    textMessage:
      "Lotus Orb is an effective item against Ogre as both of his damaging spells are targetable",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ogre_magi",
    audioFile: "enemyHero/OgreMagi_5_Multicast",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Ogre is scary in late game as he's able to multicast also on his items. Black King Bar is mandatory for cores and even supports should consider buying it",
    chatMessage:
      "Ogre is scary in late game. BKB is mandatory for cores and even supports should consider buying it",
    audience: [Audience.ALL],
  },

  // 70. Omniknight
  {
    category: "OwnHero",
    npcHeroName: "omniknight",
    audioFile: "ownHero/Omniknight_1_Dispel",
    messageTime: -90,
    textMessage: `Consider swapping lanes if there is a need for sustain and spell immunity on the other side lane.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "omniknight_repel" },
  },
  {
    category: "OwnHero",
    npcHeroName: "omniknight",
    audioFile: "ownHero/Omniknight_2_WeakLaner",
    messageTime: 30,
    textMessage:
      "Omniknight is a fairly weak laner. Focus on creep equilibrium, pulling and zoning opponents' support.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "omniknight",
    audioFile: "ownHero/Omniknight_3_PurificationValue",
    messageTime: 2 * 60,
    textMessage:
      "Avoid using Purification only to heal. Secure a ranged creep last hit or damage opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "omniknight_purification" },
  },
  {
    category: "OwnHero",
    npcHeroName: "omniknight",
    audioFile: "ownHero/Omniknight_4_SkillHammerOfPurityOnLevel1",
    messageTime: -30,
    textMessage:
      "If you can run down an opponent on the lane and have nothing to dispel, take Hammer of Purity on Level 1.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "omniknight_hammer_of_purity" },
  },
  {
    category: "OwnHero",
    npcHeroName: "omniknight",
    audioFile: "ownHero/Omniknight_5_AvoidShowing",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid showing yourself at the start of the fight as you are the primary target for opponents.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "omniknight",
    audioFile: "ownHero/Omniknight_6_Dispels",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Dispels are a big problem for Omniknight. Be mindful when using Guardian Angel.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "omniknight_guardian_angel" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "omniknight",
    audioFile: "enemyHero/Omniknight_1_Purification",
    messageTime: -60,
    textMessage: `Omniknights Purification will damage you if you are in melee range of it.`,
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "omniknight",
    audioFile: "enemyHero/Omniknight_2_HeavenlyGrace",
    messageTime: -50,
    textMessage:
      "Omniknights Repel applies debuff immunity. Use your disables after it expires.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "omniknight",
    audioFile: "enemyHero/Omniknight_3_Focus",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Omniknight in the fights as he provides saves and sustain for his team.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "omniknight",
    audioFile: "enemyHero/Omniknight_4_GuardianAngelDispel",
    messageTime: 12 * 60,
    textMessage:
      "Spell and items that dispel are great against Omniknights Guardian Angel.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "omniknight",
    audioFile: "enemyHero/Omniknight_5_MagicalDamageItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Items that do magical damage are great against Guardian Angel.",
    audience: [Audience.ALL],
  },

  // 71. Oracle
  {
    category: "OwnHero",
    npcHeroName: "oracle",
    audioFile: "ownHero/Oracle_1_StrongDispel",
    messageTime: -30,
    textMessage:
      "Oracle has access to both basic and strong dispel. Look to dispel spells, items and runes that provide buffs or debuffs.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "oracle",
    audioFile: "ownHero/Oracle_2_DenyCreep",
    messageTime: 30,
    textMessage: `You can deny your own creep by nuking it with purifying flames and quickly attacking it afterwards.`,
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "oracle",
    audioFile: "ownHero/Oracle_3_Powerspike",
    messageTime: 2 * 60 + 30,
    textMessage: `Oracle has a huge powerspike at level 3 with one point in Fortunes End and two points in Purifying Flames. Combine Purifying Flames followed by Fortunes End and another Purifying Flames before Fortunes End lands on the enemy hero.`,
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "oracle",
    audioFile: "ownHero/Oracle_4_Salve",
    messageTime: 5 * 60 + 30,
    textMessage:
      "It is good to carry a Healing Salve to use it on the ally that you save with False Promise.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "oracle",
    audioFile: "ownHero/Oracle_5_FortunesEnd",
    messageTime: 6 * 60,
    textMessage:
      "You can channel Fortune's End on your nearby ally that is teleporting or blinking out and the Fortune's End will follow that ally.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "oracle",
    audioFile: "ownHero/Oracle_6_CounterSilences",
    messageTime: 6 * 60 + 15,
    textMessage:
      "If you expect to be silenced in next 2.5s, you can start channeling Fortune's End on yourself and as soon as you get silenced you will dispel it instantly with Fortune's End release.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "oracle",
    audioFile: "ownHero/Oracle_7_FatesEdit",
    messageTime: 6 * 60 + 30,
    textMessage:
      "Well timed Fate's Edict can entirely negate damage the output of heavy magical spells like Reaper's Scythe, Finger of Death, Bedlam and others.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "oracle",
    audioFile: "ownHero/Oracle_8_OutsideVision",
    messageTime: 10 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Position yourself outside of the opponents' vision at the start of a teamfight as you are usually the main target.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "oracle",
    audioFile: "ownHero/Oracle_9_UltiItems",
    messageTime: 10 * 60 + 30,
    textMessage: `Items like Aether Lens or Blink Dagger allow you to get a timely False Promise off. If you False Promise yourself you can blink out even under attack as you take no damage.`,
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "oracle",
    audioFile: "ownHero/Oracle_10_ExtraHealing",
    messageTime: 15 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "You can spam Purifying Flames on one of your allies prior to a fight to provide some extra healing going into the fight.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "oracle",
    audioFile: "ownHero/Oracle_11_HighGround",
    messageTime: [30 * 60, 40 * 60, 50 * 60],
    textMessage:
      "When breaching or defending high ground, put Fates Edict on your front line ally along with a couple of Purifying Flames to protect them.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "oracle",
    audioFile: "enemyHero/Oracle_1_FortunesEnd",
    messageTime: -60,
    textMessage:
      "Oracle's Fortune's End applies dispel. Use your spells after it has been used.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "oracle",
    audioFile: "enemyHero/Oracle_2_FatesEdict",
    messageTime: 30,
    textMessage:
      "Oracle's Fate's Edict negates all magical damage. Do not waste your magical damage on it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "oracle",
    audioFile: "enemyHero/Oracle_3_Focus",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Oracle in the fights as he provides saves and sustain for his team.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "oracle",
    audioFile: "enemyHero/Oracle_4_AntihealingItems",
    messageTime: 12 * 60,
    textMessage:
      "Items that reduce healing and regeneration are good against Oracle.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "oracle",
    audioFile: "enemyHero/Oracle_5_GapClosingItems",
    messageTime: 12 * 60 + 10,
    textMessage: "Gap closing items allow you to get on top of Oracle.",
    audience: [Audience.ALL],
  },

  // 72. Outworld Destroyer (Outworld Devourer)
  {
    category: "OwnHero",
    npcHeroName: "obsidian_destroyer",
    audioFile: "ownHero/OutworldDestroyer_1_AstralHarass",
    messageTime: -90,
    textMessage:
      "Use Astral Imprisonment on the enemy hero to prevent them from last hitting or denying creeps, especially the ranged creep.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "obsidian_destroyer_astral_imprisonment" },
  },
  {
    category: "OwnHero",
    npcHeroName: "obsidian_destroyer",
    audioFile: "ownHero/OutworldDestroyer_2_ArcaneOrbHarass",
    messageTime: 15,
    textMessage:
      "Use Arcane Orb on opponents off cooldown during laning stage as it does tons of damage. You can also secure last hits with it for more damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "obsidian_destroyer_arcane_orb" },
  },
  {
    category: "OwnHero",
    npcHeroName: "obsidian_destroyer",
    audioFile: "ownHero/OutworldDestroyer_3_Exposed",
    messageTime: 2 * 60,
    textMessage:
      "After using Astral Imprisonment, the opponents might go on you, so be careful.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "obsidian_destroyer_astral_imprisonment" },
  },
  {
    category: "OwnHero",
    npcHeroName: "obsidian_destroyer",
    audioFile: "ownHero/OutworldDestroyer_4_BlackKingBar",
    messageTime: [20 * 60 + 15, 25 * 60 + 15],
    textMessage:
      "Remember to activate Black King Bar in fights, especially before enemies are able to disable you at the start of fights.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "obsidian_destroyer",
    audioFile: "ownHero/OutworldDestroyer_5_ArcaneOrbAncients",
    messageTime: 10 * 60 + 30,
    repeatTime: 5 * 60,
    textMessage:
      "Arcane Orb works on Ancients. So choose to farm Ancients instead of normal camps whenever possible for more farm.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "obsidian_destroyer_arcane_orb" },
  },
  {
    category: "OwnHero",
    npcHeroName: "obsidian_destroyer",
    audioFile: "ownHero/OutworldDestroyer_6_ArcaneOrbRoshan",
    messageTime: 16 * 60 + 30,
    textMessage:
      "Arcane Orb works on Roshan. So you can take it early with an ally tanking for you.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "obsidian_destroyer",
    audioFile: "enemyHero/OutworldDestroyer_1_SanityEclipseBurst",
    messageTime: 6 * 60,
    textMessage:
      "Look out for the amount of mana lost from multiple Astral Imprisonment usages. Outworld Destroyer can nuke you with his ultimate if there is a big mana pool difference.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "obsidian_destroyer",
    audioFile: "enemyHero/OutworldDestroyer_2_Focus",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Outworld Destroyer in the fights as he provides saves for his team with Astral Imprisonment.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "obsidian_destroyer",
    audioFile: "enemyHero/OutworldDestroyer_3_ManaPoolItems",
    messageTime: 12 * 60,
    textMessage:
      "Mana pool increasing items are great against OD's Sanity's Eclipse.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "obsidian_destroyer",
    audioFile: "enemyHero/OutworldDestroyer_4_SpellImmunity",
    messageTime: 12 * 60 + 10,
    textMessage: "Spell immunity items are great against Outworld Destroyer.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "obsidian_destroyer",
    audioFile: "enemyHero/OutworldDestroyer_5_HeavensHalberd",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Heaven's Halberd is great at disabling Outworld Destroyer from using Arcane Orb.",
    audience: [Audience.ALL],
  },

  // 73. Pangolier
  {
    category: "OwnHero",
    npcHeroName: "pangolier",
    audioFile: "ownHero/Pangolier_1_CrashLasthits",
    messageTime: 10,
    textMessage:
      "Secure last hits and damage the opponents at the same time with Shield Crash.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_shield_crash" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pangolier",
    audioFile: "ownHero/Pangolier_2_SwashbucklePass",
    messageTime: 20,
    textMessage:
      "Swashbuckle applies an extra hit if you pass through the opponent.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_swashbuckle" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pangolier",
    audioFile: "ownHero/Pangolier_3_SwashbuckleUsed",
    messageTime: 75,
    textMessage:
      "Be careful after you expend Swashbuckle as opponents are more likely to go on you.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_swashbuckle" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pangolier",
    audioFile: "ownHero/Pangolier_4_TurnRate",
    messageTime: [6 * 60, 12 * 60],
    textMessage:
      "During Rolling Thunder, turn rate is slightly improved after Shield Crash has been used.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_gyroshell" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pangolier",
    audioFile: "ownHero/Pangolier_5_Blink",
    messageTime: 10 * 60 + 45,
    textMessage:
      "Once you have Blink Dagger, use it immediately before opponents are able to see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pangolier",
    audioFile: "ownHero/Pangolier_6_Sidelanes",
    messageTime: [11 * 60, 19 * 60, 27 * 60],
    textMessage:
      "When not much is happening or Rolling Thunder is on cooldown, push out sidelines.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_gyroshell" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pangolier",
    audioFile: "ownHero/Pangolier_7_Roshan1",
    messageTime: [15 * 60 + 30, 18 * 60 + 30],
    textMessage:
      "Pangolier is great at enabling an early Roshan kill due to Lucky Shot armor reduction and attack speed slow chance.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_lucky_shot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pangolier",
    audioFile: "ownHero/Pangolier_8_Roshan2",
    messageTime: 14 * 60 + 50,
    textMessage: `Pick up Aghanims Shard later in the game as it gives you another survivability tool and reliably channel Rolling Thunder.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "pangolier",
    audioFile: "enemyHero/Pangolier_1_Squishy",
    messageTime: -60,
    textMessage:
      "Pangolier has a low HP pool and is squishy. Pressure him early on, especially when Swashbuckle is on cooldown.",
    chatMessage: "Pangolier is squishy. Pressure him early on.",
    audience: [Audience.IN_LANE],
    image: { type: "item", name: "vitality_booster" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "pangolier",
    audioFile: "enemyHero/Pangolier_2_RollingThunder",
    messageTime: 8 * 60,
    textMessage:
      "Pangolier's Rolling Thunder can be dodged by making sharp turns prior to impact.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_gyroshell" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "pangolier",
    audioFile: "enemyHero/Pangolier_3_ClumpUp",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Rolling Thunder.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_gyroshell" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "pangolier",
    audioFile: "enemyHero/Pangolier_4_SpellImmunity",
    messageTime: 12 * 60,
    textMessage:
      "Spell immunity items are great against Pangolier's disables and attack speed slow.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "pangolier",
    audioFile: "enemyHero/Pangolier_5_RootLeash",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Spells and items that provide roots or leash, stop Pangolier from using Swashbuckle and Rolling Thunder.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_overgrowth" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "pangolier",
    audioFile: "enemyHero/Pangolier_6_SpellImmunityPiercing",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Spell immunity piercing stuns are great at dealing with Pangolier's Rolling Thunder.",
    audience: [Audience.ALL],
    image: { type: "item", name: "abyssal_blade" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "pangolier",
    audioFile: "enemyHero/Pangolier_7_DispelItems",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Items and spells that can dispel enemies are great at removing Shield Crash buff from Pangolier.",
    audience: [Audience.ALL],
    image: { type: "item", name: "nullifier" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "pangolier",
    audioFile: "enemyHero/Pangolier_8_CounterRoll",
    messageTime: 9 * 60 + 30,
    textMessage:
      "When Pangolier is about to hit you with Rolling Thunder, stand right at the edge of a high ground or low ground to avoid getting chain stunned.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pangolier_gyroshell" },
  },

  // 74. Phantom Assassin
  {
    category: "OwnHero",
    npcHeroName: "phantom_assassin",
    audioFile: "ownHero/PhantomAssassin_1_DaggerLasthits",
    messageTime: 15,
    textMessage: "Use Stifling Dagger to secure creep lasthits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_assassin_stifling_dagger" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_assassin",
    audioFile: "ownHero/PhantomAssassin_2_RingOfHealth",
    messageTime: 30,
    textMessage:
      "Try to get to cornucopia in tough lanes and put a point in Blur on level 2. Otherwise you will need extra regen.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "cornucopia" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_assassin",
    audioFile: "ownHero/PhantomAssassin_3_FullStick",
    messageTime: 60,
    textMessage:
      "Opponents are likely to have a lot of stick charges so take that into account when playing aggressively.",
    audience: [Audience.ALL],
    image: { type: "item", name: "magic_stick" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_assassin",
    audioFile: "ownHero/PhantomAssassin_4_BlurDisjoint",
    messageTime: [90, 7 * 60 + 30, 15 * 60 + 30],
    textMessage:
      "You can disjoint most projectile spells and ranged attacks with Blur.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_assassin_blur" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_assassin",
    audioFile: "ownHero/PhantomAssassin_5_BlurFarm",
    messageTime: [8 * 60 + 30, 14 * 60 + 30],
    textMessage: "When farming dangerous areas or stacks, consider using Blur.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_assassin_blur" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_assassin",
    audioFile: "ownHero/PhantomAssassin_9_PhantomStrikeFarm",
    messageTime: [5 * 60],
    textMessage:
      "Make sure to max phantom_strike after stifling dagger for faster farming speed.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_assassin_phantom_strike" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_assassin",
    audioFile: "ownHero/PhantomAssassin_6_FightFocus",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "You typically want to focus on killing disabling supports and backliners at the start of the fight.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "phantom_assassin_phantom_strike" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_assassin",
    audioFile: "ownHero/PhantomAssassin_7_CounterItems",
    messageTime: [12 * 60 + 15, 22 * 60 + 15],
    textMessage:
      "Check opponents' inventories for break effects and evasion-piercing items. Adjust playstyle and itemization.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_assassin",
    audioFile: "ownHero/PhantomAssassin_8_AghanimsShard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up aghanims shard if you need the break vs heroes like timbersaw/bristleback etc..",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "phantom_assassin",
    audioFile: "enemyHero/PhantomAssassin_1_MagicStick",
    messageTime: -60,
    textMessage:
      "PA uses Stifling Dagger frequently to obtain lasthits. Buy Magic Stick and Magic Wand to get charges.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_assassin",
    audioFile: "enemyHero/PhantomAssassin_2_SpellHarass",
    messageTime: 30,
    textMessage:
      "PA is weak against spell harass in early game. Manage your mana and pressure her",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_assassin",
    audioFile: "enemyHero/PhantomAssassin_3_ArmorItems",
    messageTime: 5 * 60 + 15,
    textMessage:
      "Armor items are good against PA as she is all about physical damage and armor reduction",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_assassin",
    audioFile: "enemyHero/PhantomAssassin_4_SurvivalItems",
    messageTime: 6 * 60 + 15,
    textMessage:
      "Cheap items that allow you to survive PA's Phantom Strike are Ghost Scepter, Glimmer Cape and Eul's Scepter",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_assassin",
    audioFile: "enemyHero/PhantomAssassin_5_BlurAbility",
    messageTime: 8 * 60 + 15,
    textMessage:
      "Counter PA's Blur ability with items piercing through evasion, breaking passive or causing magical damage",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_assassin",
    audioFile: "enemyHero/PhantomAssassin_6_BladeMail",
    messageTime: 10 * 60 + 15,
    textMessage: "PA can be killed by a well timed Blade Mail",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_assassin",
    audioFile: "enemyHero/PhantomAssassin_7_PowerRunes",
    messageTime: [11 * 60 + 15, 19 * 60 + 15, 27 * 60 + 15],
    textMessage: "Control power runes to prevent PA from getting double damage",
    audience: [Audience.ALL],
  },

  // 75. Phantom Lancer
  {
    category: "OwnHero",
    npcHeroName: "phantom_lancer",
    audioFile: "ownHero/PhantomLancer_1_DoppelgangerDeception",
    messageTime: -90,
    textMessage:
      "Bind a bright yellow Doppelganger illusion to make deceptive plays as it takes the same damage as the hero.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_lancer_doppelwalk" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_lancer",
    audioFile: "ownHero/PhantomLancer_2_LanceRanged",
    messageTime: 15,
    textMessage: "Use Spirit Lance to secure ranged creep lasthits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_lancer_spirit_lance" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_lancer",
    audioFile: "ownHero/PhantomLancer_3_TogglePhantomRush",
    messageTime: 75,
    textMessage:
      "Toggle on Phantom Rush on early levels so you don't waste it randomly.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_lancer_phantom_edge" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_lancer",
    audioFile: "ownHero/PhantomLancer_4_DoppelgangerSaves",
    messageTime: [90, 6 * 60 + 30, 12 * 60 + 30],
    textMessage:
      "Doppelganger dispels on cast and can be used to disjoint projectile spells and ranged attacks.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phantom_lancer_doppelwalk" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_lancer",
    audioFile: "ownHero/PhantomLancer_5_LongFights",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Phantom Lancer likes long fights in which you can amass illusions and grind opponents down.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "phantom_lancer",
    audioFile: "ownHero/PhantomLancer_6_AghanimsShard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard around minute 20, especially if you have issues engaging in fights or being behind.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "phantom_lancer",
    audioFile: "enemyHero/PhantomLancer_1_Doppelganger",
    messageTime: 25,
    textMessage:
      "Phantom Lancer's main escape mechanism is Doppelganger. As this spell has a very long cooldown at lower levels, look to play aggressively as soon as he used it",
    chatMessage:
      "Phantom Lancer's main escape mechanism is Doppelganger. Look to play aggressively as soon as he used it",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_lancer",
    audioFile: "enemyHero/PhantomLancer_2_DiffusalBlade1",
    messageTime: 6 * 60 + 30,
    textMessage:
      "Pressure Phantom Lancer while he's farming Diffusal Blade. He's very weak until he gets that item. Smoke on him and place wards in his jungle",
    chatMessage:
      "Phantom Lancer is weak until he gets Diffusal Blade. Place wards in his jungle and smoke on him",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_lancer",
    audioFile: "enemyHero/PhantomLancer_3_DiffusalBlade2",
    messageTime: 15 * 60 + 15,
    textMessage:
      "Phantom Lancer's main item is Diffusal Blade. Items that give you and your team burst of mana are good against him. Sample items are Magic Wand, Soul Ring, Arcane Boots, Arcane Ring, and Enchanted Mango",
    chatMessage:
      "Phantom Lancer's main item is Diffusal Blade. Buy items that give you and your team burst of mana",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_lancer",
    audioFile: "enemyHero/PhantomLancer_4_Illusions1",
    messageTime: 25 * 60 + 15,
    textMessage:
      "Use AOE nuke to weaken Phantom Lancer's illusions to figure out which one is the real hero",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_lancer",
    audioFile: "enemyHero/PhantomLancer_8_HeartTiming",
    messageTime: 25 * 60 + 15,
    textMessage:
      "You strongest item timing is heart of tarrasque, Try not to die before this timing and get there as fast as possible after diffusal and manta.",
    audience: [Audience.ALL],
    image: { type: "item", name: "heart" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_lancer",
    audioFile: "enemyHero/PhantomLancer_5_Illusions2",
    messageTime: 21 * 60 + 0,
    textMessage:
      "Spells like Lion's and Shadow Shaman's Hex and Pugna's Life Drain are able to destroy Phantom Lancer's illusion instantly. That can help when the illusion count is low, but not when there are plenty of them",
    chatMessage:
      "Phantom Lancer illusions can be killed by spells like Lion's and Shadow Shaman's Hex and Pugna's Life Drain",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_lancer",
    audioFile: "enemyHero/PhantomLancer_6_AOEDamage",
    messageTime: 17 * 60 + 0,
    textMessage:
      "Against Phantom Lancer purchase items that are dealing AOE damage, preferably magical damage. For example Mjollnir, Radiance or Shiva's Guard. Battlefury is good as well but Phantom Lancer has a lot of armor and usually evasion on top of that",
    chatMessage:
      "Against Phantom Lancer purchase items that are dealing AOE damage, preferably magical damage",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phantom_lancer",
    audioFile: "enemyHero/PhantomLancer_7_ManaDrain",
    messageTime: [36 * 60 + 15, 56 * 60 + 15],
    textMessage:
      "Phantom Lancer loves long fights as he's able to drain huge amounts of mana. Ideally, look to burst him and to finish the fights reasonably fast. If the fight prolongs, count on the fact that you will be running low on mana and it might be better to disengage",
    chatMessage:
      "Phantom Lancer loves long fights as he drains huge amounts of mana. Burst him and finish the fights rapidly",
    audience: [Audience.ALL],
  },

  // 76. Phoenix
  {
    category: "OwnHero",
    npcHeroName: "phoenix",
    audioFile: "ownHero/Phoenix_1_Trees",
    messageTime: -75,
    textMessage:
      "Icarus Dive, Sun Ray while moving and Supernova destroy trees.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_supernova" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phoenix",
    audioFile: "ownHero/Phoenix_2_LandFireSpirits",
    messageTime: 15,
    textMessage:
      "Make sure to land most of the Fire Spirit and get extra right-clicks in or deny a creep here and there.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_fire_spirits" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phoenix",
    audioFile: "ownHero/Phoenix_3_IcarusDiveHit",
    messageTime: [60, 8 * 60, 15 * 60],
    textMessage: `You can attack once during Icarus Dive.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_icarus_dive" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phoenix",
    audioFile: "ownHero/Phoenix_4_FireSpiritsVision",
    messageTime: [3 * 60, 9 * 60 + 30, 16 * 60],
    textMessage: `Fire Spirits provide short lasting vision so you can scout pillars for wards or Roshan pit.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_fire_spirits" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phoenix",
    audioFile: "ownHero/Phoenix_5_SunRayEscape",
    messageTime: [3 * 60 + 15, 9 * 60 + 45, 16 * 60 + 15],
    textMessage: "You can use Sun Ray to escape over cliffs and pillars.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_sun_ray" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phoenix",
    audioFile: "ownHero/Phoenix_6_DayToNight",
    messageTime: 7 * 60,
    textMessage:
      "Supernova always turns night into day which can be great against Night Stalker for example.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_supernova" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phoenix",
    audioFile: "ownHero/Phoenix_7_SupernovaDeny1",
    messageTime: [7 * 60 + 15, 10 * 60 + 15],
    textMessage: "Your allies can deny you in Supernova when one hit is left.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_supernova" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phoenix",
    audioFile: "ownHero/Phoenix_8_SupernovaDeny2",
    messageTime: 7 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid placing Supernova close to opponents' counters. Use terrain features to allow Supernova to go off.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_supernova" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phoenix",
    audioFile: "ownHero/Phoenix_9_TowerDefense",
    messageTime: [8 * 60, 14 * 60],
    textMessage:
      "Phoenix is great at defending towers with his long range damaging spells and escape.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_fire_spirits" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phoenix",
    audioFile: "ownHero/Phoenix_10_PushSidelanes",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines with Fire Spirits and Sun Ray without even showing yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "phoenix_fire_spirits" },
  },
  {
    category: "OwnHero",
    npcHeroName: "phoenix",
    audioFile: "ownHero/Phoenix_11_AghanimsShard",
    messageTime: 15 * 60 + 30,
    textMessage:
      "With Aghanim's Shard, use Sun Ray before Supernova as it will persist and will be refreshed upon explosion.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `phoenix`,
    audioFile: `ownHero/Phoenix_12_SunRayMissChance`,
    messageTime: [18 * 60 + 10, 28 * 60 + 10, 38 * 60 + 10, 48 * 60 + 10],
    textMessage: `With Aghanims Shard, use Sun Ray during Supernova on enemy heroes hitting your egg to have more chances of survival with the miss chance.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `phoenix_sun_ray` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "phoenix",
    audioFile: "enemyHero/Phoenix_1_IcarusDive",
    messageTime: -60,
    textMessage: `Look to go on Phoenix when Icarus dive was used. It has long cooldown.`,
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phoenix",
    audioFile: "enemyHero/Phoenix_2_FireSpirits",
    messageTime: -50,
    textMessage:
      "Fire Spirits are Phoenix's main laning spell - Look to dodge them by moving chaotically.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phoenix",
    audioFile: "enemyHero/Phoenix_3_SunRay",
    messageTime: 2 * 60,
    textMessage:
      "Phoenix's Sun Ray does a lot of damage against high HP heroes. Run away from it or make a sharp turn.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phoenix",
    audioFile: "enemyHero/Phoenix_4_Supernova",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Against Phoenix's Supernova you need to decide very quickly if you want to fight or run away.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phoenix",
    audioFile: "enemyHero/Phoenix_5_ClumpUp",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Supernova or Sun Ray.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phoenix",
    audioFile: "enemyHero/Phoenix_6_AntispellItems",
    messageTime: 12 * 60,
    textMessage:
      "Spell immunity and magic resistance items are great against Phoenix's magical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "phoenix",
    audioFile: "enemyHero/Phoenix_7_AttackSpeedItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Attack speed items allow you to destroy the Supernova faster.",
    audience: [Audience.ALL],
  },

  // 77. Primal Beast
  {
    category: "OwnHero",
    npcHeroName: "primal_beast",
    audioFile: "ownHero/PrimalBeast_1_Outlasthit",
    messageTime: 10,
    textMessage:
      "Your base damage and Uproar passive and active effects allow you to win the last hit battle against the opponents.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "primal_beast_uproar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "primal_beast",
    audioFile: "ownHero/PrimalBeast_2_OnslaughtTiming",
    messageTime: [20, 4 * 60 + 20],
    textMessage:
      "Use Onslaught when opponents are somewhat stationary, for example when they are going for a last hit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_onslaught" },
  },
  {
    category: "OwnHero",
    npcHeroName: "primal_beast",
    audioFile: "ownHero/PrimalBeast_3_UproarTrample",
    messageTime: [2 * 60 + 15, 9 * 60 + 15, 16 * 60 + 15],
    textMessage:
      "You want to use Uproar when Trampling over the opponents heroes for maximum damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_trample" },
  },
  {
    category: "OwnHero",
    npcHeroName: "primal_beast",
    audioFile: "ownHero/PrimalBeast_4_TakeTime",
    messageTime: 19 * 60 + 30,
    textMessage: `Take your time and farm Blink Dagger so you can instantly Pulverize an opponent.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "primal_beast",
    audioFile: "ownHero/PrimalBeast_5_MIddlePulverize",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage: `Try to Pulverize an enemy hero standing in the middle of the opponents lineup so you can stun the rest as well.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_pulverize" },
  },
  {
    category: "OwnHero",
    npcHeroName: "primal_beast",
    audioFile: "ownHero/PrimalBeast_6_PushSidelanes",
    messageTime: 11 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out sidelanes with your AoE abilities.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_trample" },
  },
  {
    category: "OwnHero",
    npcHeroName: "primal_beast",
    audioFile: "ownHero/PrimalBeast_7_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      `Pick up Aghanims Shard around later in the game as it provides another disable among other things.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_trample" },
  },
  {
    category: "OwnHero",
    npcHeroName: "primal_beast",
    audioFile: "ownHero/PrimalBeast_8_TrampleOnslaughtCombo",
    messageTime: [2 * 60 + 45, 9 * 60 + 45, 14 * 60 + 15, 18 * 60 + 45],
    textMessage:
      "Use Trample right as you exit the Onslaught channel to use the charging movement for Trample damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_trample" },
  },
  {
    category: "OwnHero",
    npcHeroName: "primal_beast",
    audioFile: "ownHero/PrimalBeast_9_TrampleFirstWave",
    messageTime: -45,
    textMessage:
      "Against a tough lane, you can Trample and kill the first wave behind the enemy tier 2 tower.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "ability", name: "primal_beast_trample" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "primal_beast",
    audioFile: "enemyHero/PrimalBeast_1_DanceAround",
    messageTime: [15, 4 * 60 + 15],
    textMessage:
      "Avoid staying still against Primal Beast. Move around and be ready to dodge the Onslaught.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_onslaught" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "primal_beast",
    audioFile: "enemyHero/PrimalBeast_2_PulverizeStoppers",
    messageTime: [6 * 60 + 45, 12 * 60 + 45],
    textMessage: "Stun, fear, hex and silence effects can stop Pulverize.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "primal_beast_pulverize" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "primal_beast",
    audioFile: "enemyHero/PrimalBeast_3_SpellImmunity",
    messageTime: [10 * 60 + 15, 16 * 60 + 15],
    textMessage:
      "Spell immunity counters all of the Primal Beasts abilities but Uproar.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "primal_beast",
    audioFile: "enemyHero/PrimalBeast_4_InterruptPulverize",
    messageTime: [12 * 60, 22 * 60, 32 * 60, 42 * 60],
    textMessage:
      "You can always interrupt Pulverize before completion if you are in range with a stun or silence.",
    audience: [Audience.ALL],
  },

  // 78. Puck
  {
    category: "OwnHero",
    npcHeroName: "puck",
    audioFile: "ownHero/Puck_1_OrbToWard",
    messageTime: -90,
    textMessage:
      "Use Illusory Orb immediately as you load into the game to place Observer Ward quickly.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "puck",
    audioFile: "ownHero/Puck_2_SecureLasthits",
    messageTime: 15,
    textMessage: `Use Illusory Orb and Waning Rift to secure creep last hits and damage enemy heroes at the same time.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_illusory_orb" },
  },
  {
    category: "OwnHero",
    npcHeroName: "puck",
    audioFile: "ownHero/Puck_3_Disjoint",
    messageTime: [30, 6 * 60 + 30],
    textMessage:
      "You can disjoint ranged attacks and spell projectiles with Phase Shift and Illusory Orb.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_phase_shift" },
  },
  {
    category: "OwnHero",
    npcHeroName: "puck",
    audioFile: "ownHero/Puck_4_RunesAndStacking",
    messageTime: [105, 5 * 60 + 45],
    textMessage:
      "Illusory Orb gives you an upper hand when it comes to rune control and helps with stacking from distance.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_illusory_orb" },
  },
  {
    category: "OwnHero",
    npcHeroName: "puck",
    audioFile: "ownHero/Puck_5_OrbScouting",
    messageTime: [2 * 60, 10 * 60, 18 * 60],
    textMessage: `Illusory Orb provides vision on its path so you can check for pillar wards and scout Roshan pit.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_illusory_orb" },
  },
  {
    category: "OwnHero",
    npcHeroName: "puck",
    audioFile: "ownHero/Puck_6_BeActive",
    messageTime: [6 * 60, 11 * 60, 16 * 60],
    textMessage:
      "Play actively and look around for possibilities to gank. Make use of your hero's mobility and elusiveness.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_dream_coil" },
  },
  {
    category: "OwnHero",
    npcHeroName: "puck",
    audioFile: "ownHero/Puck_6_PushSidelanes",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines with your nukes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_illusory_orb" },
  },
  {
    category: "OwnHero",
    npcHeroName: "puck",
    audioFile: "ownHero/Puck_7_Backliners1",
    messageTime: 11 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Puck is amazing at gap-closing, especially with Blink Dagger. Prioritize killing backliners and supports in fights.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "puck_illusory_orb" },
  },
  {
    category: "OwnHero",
    npcHeroName: "puck",
    audioFile: "ownHero/Puck_8_Backliners2",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanims Shards in the mid to late game to insta kill creep waves with spells and do more damage in fights.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "puck",
    audioFile: "enemyHero/Puck_1_EarlyPressure",
    messageTime: -60,
    textMessage: "Puck has low armor and HP. Pressure her early on.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "puck",
    audioFile: "enemyHero/Puck_2_ControlRunes",
    messageTime: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Control power runes against Puck. She likes to bottle and gank with those.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "puck",
    audioFile: "enemyHero/Puck_3_DreamCoil",
    messageTime: 8 * 60,
    textMessage:
      "Fight back when Dream Coiled unless you think you can escape by breaking it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "puck",
    audioFile: "enemyHero/Puck_4_ClumpUp",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Dream Coil.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "puck",
    audioFile: "enemyHero/Puck_5_CatchItems",
    messageTime: 12 * 60,
    textMessage:
      "Puck is hard to catch. Instant disables and silences are great against Puck.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "puck",
    audioFile: "enemyHero/Puck_6_AntispellItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Spell immunity and magic resistance items are great against Puck's magical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "puck",
    audioFile: "enemyHero/Puck_7_Splitpush",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Puck is great at split-pushing. Consider getting Boots of Travel on a Core.",
    audience: [Audience.ALL],
  },
  /* {
    category: "EnemyHero",
    npcHeroName: "puck",
    audioFile: "enemyHero/Puck_8_AghanimsScepter",
    messageTime: 25 * 60 + 10,
    textMessage: "Once Puck gets Aghanim's Scepter, you might want to break the Dream Coil to not take additional right click damage.",
    audience: [Audience.ALL],
  }, */

  // 79. Pudge
  {
    category: "OwnHero",
    npcHeroName: "pudge",
    audioFile: "ownHero/Pudge_1_Runes",
    messageTime: -30,
    textMessage:
      "You can hook runes. Try to hook an enemy into your allies at the intial bounty rune.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pudge_meat_hook" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pudge",
    audioFile: "ownHero/Pudge_2_BaseDamage",
    messageTime: 15,
    textMessage:
      "During the laning stage don't play only around the Hook, also use your hero's tankiness and high base damage.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "pudge",
    audioFile: "ownHero/Pudge_9_HighDamage",
    messageTime: 20,
    textMessage:
      "Pudge has very high base damage and you can buy a quelling blade to get last hits and deny alot of creeps.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "pudge",
    audioFile: "ownHero/Pudge_3_Hook1",
    messageTime: 45,
    textMessage:
      "Try to keep the creep equilibrium close to your tower, so you can hook your enemies under the tower.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pudge_meat_hook" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pudge",
    audioFile: "ownHero/Pudge_4_Hook2",
    messageTime: 4 * 60 + 30,
    textMessage:
      "Meat Hook destroys creeps instantly, except for ancients. Protect your tower by hooking the catapult.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pudge_meat_hook" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pudge",
    audioFile: "ownHero/Pudge_5_Heal",
    messageTime: 5 * 60 + 30,
    textMessage: "You can heal up signicantly by dismembering a high HP creep.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pudge_dismember" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pudge",
    audioFile: "ownHero/Pudge_6_Smoke",
    messageTime: [10 * 60, 15 * 60],
    textMessage: "Find a partner and use smokes to find pick-offs.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pudge",
    audioFile: "ownHero/Pudge_7_SaveAlly",
    messageTime: 15 * 60,
    textMessage:
      "Blink Dagger and Aghanim's Shard combined allow you to save your allies instantly.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pudge",
    audioFile: "ownHero/Pudge_8_Hook3",
    messageTime: 25 * 60,
    repeatTime: 10 * 60,
    textMessage: "Fight around vision so you can land your Hooks more easily.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "pudge",
    audioFile: "enemyHero/Pudge_1_CampSpots",
    messageTime: -30,
    textMessage:
      "Be aware of Pudge's camp spots and place observer wards to cover those spots",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "pudge",
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
    npcHeroName: "pudge",
    audioFile: "enemyHero/Pudge_3_PhyiscalDamage",
    messageTime: 2 * 60,
    textMessage: "Physical damage is strong against Pudge as he has low armor",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "pudge",
    audioFile: "enemyHero/Pudge_4_AntiMagicDamage",
    messageTime: 3 * 60,
    textMessage: "Anti-magic damage items are good against pudge",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "pudge",
    audioFile: "enemyHero/Pudge_5_ArmorReduction",
    messageTime: 6 * 60 + 30,
    textMessage: "Armor reducing items are great for bursting Pudge",
    audience: [Audience.ALL],
  },

  // 80. Pugna
  {
    category: "OwnHero",
    npcHeroName: "pugna",
    audioFile: "ownHero/Pugna_1_NetherBlastRanged",
    messageTime: 15,
    textMessage: `Use Nether Blast to secure ranged creep last hits and to damage opponents at the same time.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_nether_blast" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pugna",
    audioFile: "ownHero/Pugna_2_DecrepifyForLasthits",
    messageTime: 60,
    textMessage: "Use Decrepify to ruin last hits for the opponents.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_decrepify" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pugna",
    audioFile: "ownHero/Pugna_3_DecrepifySave",
    messageTime: [75, 7 * 60 + 15, 15 * 60 + 15],
    textMessage:
      "You can Decrepify yourself or an ally in trouble and even attempt to teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_decrepify" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pugna",
    audioFile: "ownHero/Pugna_4_ChipTowers",
    messageTime: [3 * 60, 7 * 60],
    textMessage:
      "Chip opponents' towers gradually with Nether Blast whenever you can if current mana allows it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_nether_blast" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pugna",
    audioFile: "ownHero/Pugna_5_LifeDrainIllusions",
    messageTime: [6 * 60, 15 * 60],
    textMessage: "Life Drain instantly destroys basic illusions.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_life_drain" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pugna",
    audioFile: "ownHero/Pugna_6_Combosequence1",
    messageTime: [6 * 60 + 15, 12 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "The full value burst spell combo would be: Nether Ward, Nether Blast, Decrepify quickly and begin Life Draining.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_life_drain" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pugna",
    audioFile: "ownHero/Pugna_7_ComboSequence2",
    messageTime: [6 * 60 + 30, 12 * 60 + 30, 18 * 60 + 30],
    textMessage:
      "With Life Drain, you can restore health to an ally or mana if he's full health. Watch your health though.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_life_drain" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pugna",
    audioFile: "ownHero/Pugna_8_NetherWardPlacement",
    messageTime: [6 * 60 + 45, 15 * 60 + 45],
    textMessage:
      "Place Nether Ward close enough to opponents but out of their sight.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_nether_ward" },
  },
  {
    category: "OwnHero",
    npcHeroName: "pugna",
    audioFile: "ownHero/Pugna_9_DecrepifySave2",
    messageTime: [21 * 60 + 45, 32 * 60 + 45],
    textMessage:
      "You can Decrepify yourself or anyone within range while channeling Life Drain.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "pugna_decrepify" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "pugna",
    audioFile: "enemyHero/Pugna_1_NetherBlast",
    messageTime: -60,
    textMessage:
      "Pugna's Nether Blast takes one second to explode. You can dodge it by moving away.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "pugna",
    audioFile: "enemyHero/Pugna_2_NetherWard",
    messageTime: 30,
    textMessage:
      "Be careful not to use high mana cost spells around Pugna's Nether Ward.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "pugna",
    audioFile: "enemyHero/Pugna_3_LifeDrain",
    messageTime: 8 * 60,
    textMessage:
      "Look to interrupt Pugna's Life Drain by running away or by stunning or silencing him.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "pugna",
    audioFile: "enemyHero/Pugna_4_TowerDefense",
    messageTime: [10 * 60 + 10, 15 * 60 + 10, 20 * 60 + 10],
    textMessage:
      "Pugna takes buildings down fast with Nether Blast. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "pugna",
    audioFile: "enemyHero/Pugna_5_AntispellItems",
    messageTime: 12 * 60,
    textMessage:
      "Spell immunity and magic resistance items are great against Pugna's magical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "pugna",
    audioFile: "enemyHero/Pugna_6_LotusOrb",
    messageTime: 12 * 60 + 10,
    textMessage:
      "A well timed Lotus Orb is great at countering Pugna's Decrepify and Life Drain combo.",
    audience: [Audience.ALL],
  },

  // 81. Queen of Pain
  {
    category: "OwnHero",
    npcHeroName: "queenofpain",
    audioFile: "ownHero/QueenOfPain_1_SecureLasthits",
    messageTime: 15,
    textMessage:
      "Use Scream of Pain to secure ranged creeps and hit opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "queenofpain_scream_of_pain" },
  },
  {
    category: "OwnHero",
    npcHeroName: "queenofpain",
    audioFile: "ownHero/QueenOfPain_2_AvoidShadowStrike",
    messageTime: 2 * 60,
    textMessage:
      "Avoid overinvesting points in Shadow Strike. It will make your farming and midgame fights hard.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "queenofpain_shadow_strike" },
  },
  {
    category: "OwnHero",
    npcHeroName: "queenofpain",
    audioFile: "ownHero/QueenOfPain_3_InTrouble",
    messageTime: [2 * 60 + 15, 12 * 60 + 15, 22 * 60 + 15],
    textMessage:
      "When in trouble, blink into fog, into treelines or over cliffs.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "queenofpain_blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "queenofpain",
    audioFile: "ownHero/QueenOfPain_4_BeAtive",
    messageTime: [8 * 60 + 15, 10 * 60 + 15],
    textMessage:
      "Look around for opportunities to gank once you have Sonic Wave and control runes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "queenofpain_sonic_wave" },
  },
  {
    category: "OwnHero",
    npcHeroName: "queenofpain",
    audioFile: "ownHero/QueenOfPain_5_MultiheroSonicWave",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Blink or position yourself in such a way that you land a multi-hero Sonic Wave in the fights.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "queenofpain_sonic_wave" },
  },
  {
    category: "OwnHero",
    npcHeroName: "queenofpain",
    audioFile: "ownHero/QueenOfPain_6_PushSidelanes",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage: "When not much is happening, push out the sidelines.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "queenofpain_scream_of_pain" },
  },
  {
    category: "OwnHero",
    npcHeroName: "queenofpain",
    audioFile: "ownHero/QueenOfPain_7_AghanimsShard",
    messageTime: 19 * 60,
    textMessage:
      "Pick up Aghanim's Shard around minute 15 as it provides silence and extra damage. Using it on creep waves also gives you instant wave clear when paired with Scream of Pain.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "queenofpain",
    audioFile: "ownHero/QueenOfPain_7_AghanimsScepter",
    messageTime: 18 * 60,
    textMessage:
      "Aghanims scepter is very strong in teamfights. Try to get it at an early timing.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "queenofpain",
    audioFile: "enemyHero/QueenOfPain_1_ShadowStrike",
    messageTime: -60,
    textMessage:
      "Queen of Pain's Shadow Strike is a great harassing spell. Buy extra consumables or dodge it if your hero has a spell that can.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "queenofpain",
    audioFile: "enemyHero/QueenOfPain_2_Blink",
    messageTime: 30,
    textMessage:
      "Look to play aggressively on Queen of Pain once her Blink is on cooldown. She's very squishy.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "queenofpain",
    audioFile: "enemyHero/QueenOfPain_3_ControlRunes",
    messageTime: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Control power runes against Queen of Pain. She likes to bottle and gank with those.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "queenofpain",
    audioFile: "enemyHero/QueenOfPain_4_OrchidMalevolence",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Be aware of Queen of Pain's Orchid Malevolence timing. She can solo kill most of the heroes with it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "queenofpain",
    audioFile: "enemyHero/QueenOfPain_5_ClumpUp",
    messageTime: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Queen of Pain's Sonic Wave.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "queenofpain",
    audioFile: "enemyHero/QueenOfPain_6_AntispellItems",
    messageTime: 12 * 60,
    textMessage:
      "Spell immunity and magic resistance items are quite good against Queen of Pain.",
    audience: [Audience.ALL],
  },

  // 82. Razor
  {
    category: "OwnHero",
    npcHeroName: "razor",
    audioFile: "ownHero/Razor_1_SapDamage",
    messageTime: 10,
    textMessage: `During the laning stage, prioritize stealing damage of the enemy core and win the last hit battle off of it.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "razor_static_link" },
  },
  {
    category: "OwnHero",
    npcHeroName: "razor",
    audioFile: "ownHero/Razor_2_LinkSwitching",
    messageTime: 20,
    textMessage:
      "You can switch a target and hit something else during Static Link.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "razor_static_link" },
  },
  {
    category: "OwnHero",
    npcHeroName: "razor",
    audioFile: "ownHero/Razor_3_PlasmaFieldDamage",
    messageTime: 60,
    textMessage:
      "You want to hit opponents or creeps with the Plasma Field from maximum range for maximum value.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "razor_plasma_field" },
  },
  {
    category: "OwnHero",
    npcHeroName: "razor",
    audioFile: "ownHero/Razor_4_PlasmaFieldVision",
    messageTime: [2 * 60, 14 * 60],
    textMessage: `The Plasma Field provides vision so you can use it to scout treelines, pillars and Roshan pit.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "razor_plasma_field" },
  },
  {
    category: "OwnHero",
    npcHeroName: "razor",
    audioFile: "ownHero/Razor_5_EyeCreeps",
    messageTime: [6 * 60, 11 * 60],
    textMessage:
      "Use Eye of the Storm to speed up your farming, especially when clearing stacks and ancients.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "razor_eye_of_the_storm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "razor",
    audioFile: "ownHero/Razor_6_Itemization",
    messageTime: [6 * 60 + 15, 12 * 60 + 15],
    textMessage:
      "Mobility and items that allow you to be in the middle of the fight will enable you to get a great Static Link off.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "razor",
    audioFile: "ownHero/Razor_7_FightImpact",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Most of your fight impact will come down to Static Link usage. Take your time and use it on the proper target.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "razor_static_link" },
  },
  {
    category: "OwnHero",
    npcHeroName: "razor",
    audioFile: "ownHero/Razor_8_PushSidelanes",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines with the Plasma Field without even showing yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "razor_plasma_field" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "razor",
    audioFile: "ownHero/Razor_9_Aggression",
    messageTime: 15 * 60,
    textMessage: "Once you have bloodstone and Aghanim shard, play aggressively on the map and take fights and objectives.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "aghanims_shard" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "razor",
    audioFile: "ownHero/Razor_10_Targeting",
    messageTime: 18 * 60,
    textMessage:
      "When you have your BKB, target the enemy carry in fights and run at them with all your spells.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "razor",
    audioFile: "ownHero/Razor_11_AghanimShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up the Aghanims Shard around the 15 minute mark as it lets you stick on top of heroes with Static Link.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "razor",
    audioFile: "enemyHero/Razor_1_WinsMelee",
    messageTime: -60,
    textMessage:
      "Razor wins most lanes against melee heroes. Consider sending ranged heroes against him.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "razor",
    audioFile: "enemyHero/Razor_2_MovementSpeed",
    messageTime: -50,
    textMessage:
      "Getting movement speed items helps a lot at dealing with Razor's Static Link.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "razor",
    audioFile: "enemyHero/Razor_3_KeepDistance",
    messageTime: -40,
    textMessage:
      "Keep a good distance to Razor and make it hard for him to get a good Static Link off.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "razor",
    audioFile: "enemyHero/Razor_4_PreventDrain",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Prevent Razor from draining your core's damage. That way Razor will have less impact in fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "razor",
    audioFile: "enemyHero/Razor_5_CounterItems",
    messageTime: 12 * 60,
    textMessage:
      "Force Staff, Hurricane Pike, Linken's Sphere and Lotus Orb are great at dealing with Static Link.",
    audience: [Audience.ALL],
  },

  // 83. Riki
  {
    category: "OwnHero",
    npcHeroName: "riki",
    audioFile: "ownHero/Riki_1_SecureRanged",
    messageTime: 15,
    textMessage: "Use Blink Strike to secure ranged creep last hits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "riki_blink_strike" },
  },
  {
    category: "OwnHero",
    npcHeroName: "riki",
    audioFile: "ownHero/Riki_2_InTrouble",
    messageTime: 4 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "When in trouble, blink away, Tricks of Trade over a cliff or in treeline, or Smoke Screen and teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "riki_blink_strike" },
  },
  {
    category: "OwnHero",
    npcHeroName: "riki",
    audioFile: "ownHero/Riki_3_CheckDetection",
    messageTime: 6 * 60,
    repeatTime: 10 * 60,
    textMessage: "Check opponents' inventories frequently for detection.",
    audience: [Audience.ALL],
    image: { type: "item", name: "SentryDustGem" },
  },
  {
    category: "OwnHero",
    npcHeroName: "riki",
    audioFile: "ownHero/Riki_4_AvoidSentrySpots",
    messageTime: 6 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid passing by spots that are typically sentried like rune or pillar spots.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "riki",
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
    npcHeroName: "riki",
    audioFile: "ownHero/Riki_6_DiffusalBlade",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Take your time to farm the Diffusal Blade which will significantly improve your pick-off potential.",
    audience: [Audience.ALL],
    image: { type: "item", name: "diffusal_blade" },
  },
  {
    category: "OwnHero",
    npcHeroName: "riki",
    audioFile: "ownHero/Riki_7_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanims Shard around minute 15 to isolate enemy heroes stuck in Smoke from getting help.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  /* {
    category: "EnemyHero",
    npcHeroName: "riki",
    audioFile: "enemyHero/Riki_1_DustOfAppearance",
    messageTime: 8 * 60,
    textMessage: "Dust of Appearance does not stick on Riki while he is using Tricks of the Trade.",
    audience: [Audience.ALL],
  }, */
  {
    category: "EnemyHero",
    npcHeroName: "riki",
    audioFile: "enemyHero/Riki_2_Detection",
    messageTime: [10 * 60 + 10, 18 * 60 + 10, 26 * 60 + 10],
    textMessage: "Against Riki, carry detection on multiple heroes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "riki",
    audioFile: "enemyHero/Riki_3_ObserverSentry",
    messageTime: [10 * 60 + 20, 18 * 60 + 20, 26 * 60 + 20],
    textMessage:
      "Pair Observer Wards and Sentries on the map to track Riki's movements.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "riki",
    audioFile: "enemyHero/Riki_4_ProtectSupports",
    messageTime: [10 * 60 + 30, 20 * 60 + 30, 30 * 60 + 30],
    textMessage: "Protect your supports from being killed by Riki.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "riki",
    audioFile: "enemyHero/Riki_5_StunsAndRoots",
    messageTime: 12 * 60,
    textMessage:
      "Items and spells with stuns and roots are great against Riki's mobility spells.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "riki",
    audioFile: "enemyHero/Riki_6_ForceStaff",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Force Staff and Hurricane Pike, allow you to move out of Riki's Smoke Screen.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "riki",
    audioFile: "enemyHero/Riki_7_Break",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Break effects disable Cloak and Dagger and prevent Riki from being invisible.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "riki",
    audioFile: "enemyHero/Riki_8_ForceStaff2",
    messageTime: 15 * 60,
    textMessage:
      "Once Riki gets Aghanims Shard, you will need your own mobility item to get out of Smoke.",
    audience: [Audience.ALL],
  },

  // 84. Rubick
  {
    category: "OwnHero",
    npcHeroName: "rubick",
    audioFile: "ownHero/Rubick_1_SecureRanged",
    messageTime: 15,
    textMessage:
      "Secure ranged creeps with Fade Bolt and hit opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rubick_fade_bolt" },
  },
  {
    category: "OwnHero",
    npcHeroName: "rubick",
    audioFile: "ownHero/Rubick_2_Strand",
    messageTime: [75, 8 * 60 + 15, 15 * 60 + 15],
    textMessage: `When fighting next to pillars or a cliff, consider using Telekinesis to leave an enemy hero stranded on top of it.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "rubick_telekinesis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "rubick",
    audioFile: "ownHero/Rubick_3_WaveclearSpell",
    messageTime: [9 * 60 + 45, 12 * 60 + 45],
    textMessage: `In the mid game, get hold of the wave clearing spell when the game slows down to be able to farm and kill creep waves.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "rubick_spell_steal" },
  },
  {
    category: "OwnHero",
    npcHeroName: "rubick",
    audioFile: "ownHero/Rubick_4_PushSidelanes1",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage: `When not much is happening, push out side lanes without even showing yourself.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "rubick_fade_bolt" },
  },
  {
    category: "OwnHero",
    npcHeroName: "rubick",
    audioFile: "ownHero/Rubick_5_PushSidelanes2",
    messageTime: 12 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Be patient in the fights and make sure to steal a high impact spell.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rubick_spell_steal" },
  },
  {
    category: "OwnHero",
    npcHeroName: "rubick",
    audioFile: "ownHero/Rubick_6_Fadebolt",
    messageTime: 20 * 60,
    textMessage:
      "Spam your Fade Bolt by using it on the first target you see, rather than keeping it for a KS.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "rubick_fade_bolt" },
  },
  {
    category: "OwnHero",
    npcHeroName: "rubick",
    audioFile: "ownHero/Rubick_7_WaveclearSpell2",
    messageTime: 13 * 60,
    textMessage: `Use your level 4 Fade Bolt on the ranged creep first to one shot it while killing creep waves.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "rubick_fade_bolt" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `rubick`,
    audioFile: `ownHero/Rubick_8_CommunicateSpell`,
    messageTime: 13 * 60,
    textMessage: `Look to inform your teammates when you cast abilities like Supernova or Macropyre so they dont get confused or run away from the AoE.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `rubick_spell_steal` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "rubick",
    audioFile: "enemyHero/Rubick_1_BadPicks",
    messageTime: -90,
    textMessage:
      "Avoid picking heroes with huge ultimates against Rubick such as Enigma, Magnus and Tidehunter",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "rubick",
    audioFile: "enemyHero/Rubick_2_FadeBolt",
    messageTime: -10,
    textMessage:
      "Avoid trading hits with Rubick while under effect of Fade Bolt as your attack damage is reduced",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "rubick",
    audioFile: "enemyHero/Rubick_3_ForceStaff",
    messageTime: 5 * 60 + 45,
    textMessage:
      "Rubick's Telekinesis can be broken by using Force Staff on affected ally",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "rubick",
    audioFile: "enemyHero/Rubick_4_SpellUsage",
    messageTime: [8 * 60 + 45, 18 * 60 + 45],
    textMessage:
      "Be mindful about spell usage so that you don't give away good spells to Rubick. Rubick is generally looking for stunning and high damage abilities",
    chatMessage:
      "Be mindful about spell usage so that you don't give away good spells to Rubick",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "rubick",
    audioFile: "enemyHero/Rubick_5_LotusOrb",
    messageTime: [10 * 60 + 30, 20 * 60 + 30],
    textMessage:
      "Lotus Orb is an effective item against Rubick as his damage and control spells are targetable.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "rubick",
    audioFile: "enemyHero/Rubick_6_TeamFights",
    messageTime: [15 * 60 + 30, 25 * 60 + 30, 35 * 60 + 30, 45 * 60 + 30],
    textMessage:
      "Look to target Rubick in fights as he is a very squishy hero. If you manage to kill him you don't have to worry about spellcasting anymore",
    chatMessage:
      "Target Rubick in fights as he is squishy and you won't have to worry about spellcasting anymore",
    audience: [Audience.ALL],
  },

  // 85. Sand King
  {
    category: "OwnHero",
    npcHeroName: "sand_king",
    audioFile: "ownHero/SandKing_1_Sentry",
    messageTime: -90,
    textMessage: `Make sure pull camps are open for pulling as the you will be pushing lane non-stop.`,
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "sand_king",
    audioFile: "ownHero/SandKing_2_CheckDetection",
    messageTime: [15, 8 * 60 + 15, 16 * 60 + 15],
    textMessage: `Check opponents' inventories for detection frequently if you took the Sandshroud facet.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "SentryDustGem" },
  },
  {
    category: "OwnHero",
    npcHeroName: "sand_king",
    audioFile: "ownHero/SandKing_3_TagExplode",
    messageTime: [75, 3 * 60 + 15],
    textMessage:
      `Tag creeps with Caustic Finale and if an opponent comes close, you can Burrowstrike or Stinger to last hit and explode creeps.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "sandking_caustic_finale" },
  },
  {
    category: "OwnHero",
    npcHeroName: "sand_king",
    audioFile: "ownHero/SandKing_4_FightBack",
    messageTime: [3 * 60, 9 * 60],
    textMessage:
      "When in trouble, you can sometimes stand your ground in a Sand Storm and fight back.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "sandking_sand_storm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "sand_king",
    audioFile: "ownHero/SandKing_5_DefendTowers",
    messageTime: [8 * 60, 12 * 60],
    textMessage:
      `Sand King is great at defending towers as you can Sand Storm in front and hide yourself in trees with the Sandshroud facet.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "sandking_sand_storm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "sand_king",
    audioFile: "ownHero/SandKing_6_Blink",
    messageTime: 10 * 60 + 15,
    textMessage:
      "Once you have Blink Dagger, use it immediately before opponents are able to see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "sand_king",
    audioFile: "ownHero/SandKing_7_BePatient",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Stay out of vision and be patient in the fights. Choose a good moment to jump with your combo.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "sand_king",
    audioFile: "ownHero/SandKing_8_Splitpush",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Sand King is great at split pushing when not much is happening on the map. ",
    audience: [Audience.ALL],
    image: { type: "ability", name: "sandking_sand_storm" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "sand_king",
    audioFile: "enemyHero/SandKing_1_Sentry",
    messageTime: -60,
    textMessage: `Bring a sentry to the lane against Sand Kings Sand Storm if he took the Sandshroud facet.`,
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sand_king",
    audioFile: "enemyHero/SandKing_2_CausticFinale",
    messageTime: -50,
    textMessage:
      "Your creeps explode on death due to Sand King's Caustic Finale. Denying affected creeps prevents explosion.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sand_king",
    audioFile: "enemyHero/SandKing_3_SandStorm",
    messageTime: -40,
    textMessage:
      "Avoid fighting in Sand Storm for too long as it does a lot of magical damage.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sand_king",
    audioFile: "enemyHero/SandKing_4_Detection",
    messageTime: [10 * 60 + 10, 18 * 60 + 10, 26 * 60 + 10],
    textMessage:
      `Against Sand King you need to carry detection on multiple heroes if he took the Sandshroud facet.`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sand_king",
    audioFile: "enemyHero/SandKing_5_StunsAndRoots",
    messageTime: 10 * 60 + 20,
    textMessage:
      "Be aware of Sand King's Blink Dagger timing. Look to cancel his Dagger in fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sand_king",
    audioFile: "enemyHero/SandKing_6_ClumpUp",
    messageTime: [10 * 60 + 30, 20 * 60 + 30, 30 * 60 + 30],
    textMessage:
      "Avoid fighting in choke spots and clumping up against Sand King's Epicenter and Blink Dagger combination.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sand_king",
    audioFile: "enemyHero/SandKing_7_AntispellItems",
    messageTime: 12 * 60,
    textMessage:
      "Spell immunity and magic resistance items are great against Sand King's magical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sand_king",
    audioFile: "enemyHero/SandKing_8_AghanimScepter",
    messageTime: 25 * 60,
    textMessage:
      "Once Sand King has Aghanims Scepter, be careful about standing in Sand Storm as you can get perma stunned.",
    audience: [Audience.ALL],
  },

  // 86. Shadow Demon
  {
    category: "OwnHero",
    npcHeroName: "shadow_demon",
    audioFile: "ownHero/ShadowDemon_1_ShadowPoisonFog",
    messageTime: 15,
    textMessage:
      "Use Shadow Poison from fog to not fill stick charges for opponents.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "shadow_demon_shadow_poison" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_demon",
    audioFile: "ownHero/ShadowDemon_2_5Stacks",
    messageTime: 30,
    textMessage:
      "Don't spam Shadow Poison unless you have mana and a chance to build up 5 stacks.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_shadow_poison" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_demon",
    audioFile: "ownHero/ShadowDemon_3_DisruptLasthits",
    messageTime: 45,
    textMessage: "You can Disrupt an opponent's core and deny a creep or two.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_disruption" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_demon",
    audioFile: "ownHero/ShadowDemon_4_ShadowPoisonStacking",
    messageTime: [90, 6 * 60 + 30],
    textMessage: "Shadow Poison is great for stacking multiple camps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_shadow_poison" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_demon",
    audioFile: "ownHero/ShadowDemon_5_DemonicPurgePower",
    messageTime: [8 * 60, 16 * 60],
    textMessage:
      "Demonic Purge is great for kitting spell-immune heroes and to dispel important buffs including runes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_demonic_purge" },
  },
  /*   {
    category: "OwnHero",
    npcHeroName: "shadow_demon",
    audioFile: "ownHero/ShadowDemon_5_DemonicPurgePower",
    messageTime: [8 * 60, 16 * 60],
    textMessage:
      "Demonic Purge is great for kitting spell-immune heroes and to dispel important buffs.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_demonic_purge" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "shadow_demon",
    audioFile: "ownHero/ShadowDemon_6_DontShow",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Don't show yourself at the start of the fight. Be quick at saving an ally with Disruption.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "shadow_demon_disruption" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_demon",
    audioFile: "ownHero/ShadowDemon_7_PushSidelanes",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines from the fog with Shadow Poison.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_shadow_poison" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_demon",
    audioFile: "ownHero/ShadowDemon_8_DisruptCores",
    messageTime: 13 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "You can use Disruption on your cores to push out waves or to make deception plays.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shadow_demon_disruption" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_demon",
    audioFile: "ownHero/ShadowDemon_9_AghanimsScepter",
    messageTime: [24 * 60 + 15, 29 * 60 + 15],
    textMessage:
      "Aghanim's Scepter is a must in late game for kiting opponents and for break effect.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "shadow_demon",
    audioFile: "enemyHero/ShadowDemon_1_MagicStickWand",
    messageTime: -60,
    textMessage:
      "Shadow Demon uses Shadow Poison frequently to harass. Magic Stick and Wand will be charged up.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shadow_demon",
    audioFile: "enemyHero/ShadowDemon_2_ShadowPoison",
    messageTime: -50,
    textMessage:
      "If you have 3 stacks of Shadow Poison back up a bit and don't let yourself get hit by it again.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shadow_demon",
    audioFile: "enemyHero/ShadowDemon_3_DemonicPurgeDispel",
    messageTime: 8 * 60,
    textMessage:
      "Shadow Demon's Demonic Purge applies continuous dispel and removes positive buffs from spells and items.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shadow_demon",
    audioFile: "enemyHero/ShadowDemon_4_Focus",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Shadow Demon in the fights as he provides saves and control for his team.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shadow_demon",
    audioFile: "enemyHero/ShadowDemon_5_DemonicPurgeBKB",
    messageTime: 12 * 60,
    textMessage:
      "Demonic Purge slows and damages through spell immunity. Be Careful not to waste Black King Bar on it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shadow_demon",
    audioFile: "enemyHero/ShadowDemon_6_AvoidItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Avoid buying Radiance and Assault Cuirass against Disruption as it will replicate these items.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shadow_demon",
    audioFile: "enemyHero/ShadowDemon_7_CounterItems",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Status resistance items, Linken's Sphere and a well timed Lotus Orb are great against Shadow Demon.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shadow_demon",
    audioFile: "enemyHero/ShadowDemon_8_AghanimsScepter",
    messageTime: 20 * 60,
    textMessage:
      "Once Shadow Demon gets Aghanim's Scepter he's able to break passive spells with Demonic Purge.",
    audience: [Audience.ALL],
  },

  // 87. Shadow Fiend
  {
    category: "OwnHero",
    npcHeroName: "nevermore",
    audioFile: "ownHero/ShadowFiend_1_SecureLasthits",
    messageTime: 10,
    textMessage:
      "Stack Shadowraze debuffs on opponents' mid and secure lasthits at the same time if possible.",
    audience: [Audience.ROLE_MID],
    image: { type: "ability", name: "nevermore_shadowraze3" },
  },
  {
    category: "OwnHero",
    npcHeroName: "nevermore",
    audioFile: "ownHero/ShadowFiend_2_NecromasteryStacks",
    messageTime: 20,
    textMessage:
      "Build up Necromastery stacks through lasthitting and capitalize on the extra damage you have.",
    audience: [Audience.ROLE_CARRY, Audience.ROLE_MID],
    image: { type: "ability", name: "nevermore_necromastery" },
  },
  {
    category: "OwnHero",
    npcHeroName: "nevermore",
    audioFile: "ownHero/ShadowFiend_3_StackSmallCamp",
    messageTime: [2 * 60 + 40, 4 * 60 + 40],
    textMessage: "Try to stack camps close to mid after you push in the wave.",
    audience: [Audience.ROLE_MID],
    image: { type: "ability", name: "nevermore_shadowraze3" },
  },
  {
    category: "OwnHero",
    npcHeroName: "nevermore",
    audioFile: "ownHero/ShadowFiend_4_RuneControl",
    messageTime: [3 * 60 + 40, 5 * 60 + 40],
    textMessage:
      "Kill the creepwave prior to rune spawns quickly and collect the runes. You need runes badly for mana.",
    audience: [Audience.ROLE_MID],
    image: { type: "rune", name: "regeneration" },
  },
  {
    category: "OwnHero",
    npcHeroName: "nevermore",
    audioFile: "ownHero/ShadowFiend_5_Stacks",
    messageTime: [4 * 60 + 30, 7 * 60 + 30],
    textMessage:
      "Alert your teammates to stack for you as you can clear those early.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "nevermore",
    audioFile: "ownHero/ShadowFiend_6_FarmMaskOfMadness",
    messageTime: [5 * 60 + 45, 7 * 60 + 45],
    textMessage:
      "Focus on farming with mask of madness, especially at the Ancients and don't over rotate without runes.",
    audience: [Audience.ROLE_MID],
    image: { type: "item", name: "mask_of_madness" },
  },
  {
    category: "OwnHero",
    npcHeroName: "nevermore",
    audioFile: "ownHero/ShadowFiend_7_PickOff",
    messageTime: [9 * 60 + 45, 15 * 60 + 45],
    textMessage:
      "Once you have Black King Bar, you can start to fight because Shadow Fiend is very susceptible to disables.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "nevermore",
    audioFile: "ownHero/ShadowFiend_8_PushSidelanes",
    messageTime: 12 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage: "Keep sidelines pushed out when not much is happening.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "nevermore",
    audioFile: "enemyHero/ShadowFiend_1_Laning",
    messageTime: 20,
    textMessage:
      "Shadow Fiend has low starting damage and he relies on gathering souls through last hits. Try to contest last hits with him when his base damage is low.",
    chatMessage:
      "Shadow Fiend has low starting damage and he relies on gathering souls through last hits",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "nevermore",
    audioFile: "enemyHero/ShadowFiend_2_Gank",
    messageTime: 4 * 60 + 10,
    textMessage:
      "Shadow Fiend does not have an escape mechanism, so look to gank him during the laning stage. If left unchallenged, he's one of the best farming heroes",
    chatMessage:
      "Shadow Fiend doesn't have an escape mechanism, so look to gank him during the laning stage",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "nevermore",
    audioFile: "enemyHero/ShadowFiend_3_Attack",
    messageTime: 8 * 60 + 30,
    textMessage:
      "Try not to run at Shadow Fiend in plain sight as you might get triple razed to death",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "nevermore",
    audioFile: "enemyHero/ShadowFiend_4_ItemBuild",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Shadow Fiend's first big item is generally Black King Bar. Keep an eye out on the availability of Black King Bar in his inventory and try to gank him continuously before he gets the item.",
    chatMessage:
      "Shadow Fiend's first big item is generally Black King Bar. Keep an eye out on the availability of Black King Bar in his inventory and try to gank him continuously before he gets the item.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "nevermore",
    audioFile: "enemyHero/ShadowFiend_5_TeamFight1",
    messageTime: [15 * 60 + 30, 35 * 60 + 30, 55 * 60 + 30],
    textMessage:
      "In team-fights, look to play around Shadow Fiend's ultimate by either canceling it or moving away from him",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "nevermore",
    audioFile: "enemyHero/ShadowFiend_6_Armor",
    messageTime: 18 * 60 + 30,
    textMessage:
      "Armor items are good against Shadow Fiend as his Presence of the Dark Lord is an armor reducing aura",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "nevermore",
    audioFile: "enemyHero/ShadowFiend_7_TeamFight2",
    messageTime: [25 * 60 + 30, 45 * 60 + 30, 65 * 60 + 30],
    textMessage:
      "Shadow Fiend should be a high priority target in team fights. If left unchecked, he can do tons of damage. At the same time, he's not that tanky and easy to bring down",
    chatMessage:
      "Shadow Fiend should be a high priority target in team fights. He does tons of damage and is squishy",
    audience: [Audience.ALL],
  },

  // 88. Shadow Shaman
  {
    category: "OwnHero",
    npcHeroName: "shadow_shaman",
    audioFile: "ownHero/ShadowShaman_1_RightClick",
    messageTime: -30,
    textMessage:
      "Make use of Shadow Shaman's high base damage to secure last hits and denies.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_shaman",
    audioFile: "ownHero/ShadowShaman_2_Combo",
    messageTime: 6 * 60,
    textMessage:
      "A good Combo is to use Hex followed by Mass Serpent Ward with Shackles.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_shaman",
    audioFile: "ownHero/ShadowShaman_3_Ultimate",
    messageTime: 6 * 60 + 30,
    textMessage:
      "You can pull nearby neutral or lane creeps to your Mass Serpent Wards after you made a move to get some extra gold.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_shaman",
    audioFile: "ownHero/ShadowShaman_4_Ultimate2",
    messageTime: 8 * 60,
    textMessage:
      `If opponents are farming your Mass Serpent Wards, try to deny individual Serpent Wards with other Serpent Wards if you have the Cluster Cluck facet.`,
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_shaman",
    audioFile: "ownHero/ShadowShaman_5_Range",
    messageTime: 10 * 60,
    textMessage:
      "Take your time to farm up Aether Lens or Blink Dagger, so that you can cast you spells more easily in fights.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_shaman",
    audioFile: "ownHero/ShadowShaman_6_Disables",
    messageTime: 14 * 60,
    textMessage:
      "Initiate on enemies with your long lasting disables, so your allies can follow-up for a kill.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_shaman",
    audioFile: "ownHero/ShadowShaman_7_BKB",
    messageTime: 20 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "In certain games, Black King Bar can be great to get off full Shackles durations.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_shaman",
    audioFile: "ownHero/ShadowShaman_8_Items",
    messageTime: 30 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "Aghanim's Scepter and a Refresher Orb in late game allow you to breach high ground and end the game.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "shadow_shaman",
    audioFile: "ownHero/ShadowShaman_9_Roaming",
    messageTime: 7 * 60 + 15,
    textMessage:
      "Use portals to move around the map and setup kills with your lengthy disables.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "shadow_shaman",
    audioFile: "enemyHero/ShadowShaman_1_AvoidTrading",
    messageTime: -60,
    textMessage:
      "Shadow Shaman has high base damage and a great nuke in Ether Shock. Avoid trading with him.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shadow_shaman",
    audioFile: "enemyHero/ShadowShaman_2_DisablingSpells",
    messageTime: 30,
    textMessage:
      "Shadow Shaman has long lasting stuns but short cast range disables. Keep distance from him.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shadow_shaman",
    audioFile: "enemyHero/ShadowShaman_3_MassSerpentWard",
    messageTime: 8 * 60,
    textMessage:
      "Shadow Shaman has high solo kill potential on level 6 with Mass Serpent Ward.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shadow_shaman",
    audioFile: "enemyHero/ShadowShaman_4_TowerDefense",
    messageTime: [8 * 60 + 10, 18 * 60 + 10, 28 * 60 + 10],
    textMessage:
      "Shadow Shaman takes buildings down fast with Mass Serpent Ward. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shadow_shaman",
    audioFile: "enemyHero/ShadowShaman_5_Focus",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Shadow Shaman in the fights as he provides a lot of control for his team.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shadow_shaman",
    audioFile: "enemyHero/ShadowShaman_6_CounterItems",
    messageTime: 12 * 60,
    textMessage:
      "Black King Bar, status resistance items, Linken's Sphere and Lotus Orb are great against Shadow Shaman.",
    audience: [Audience.ALL],
  },
  /*{category: "EnemyHero", npcHeroName: "shadow_shaman", audioFile: "enemyHero/ShadowShaman_7_Crimson guard", messageTime: (12*60+10), textMessage: "Crimson Guard is great at reducing damage on buildings and heroes by Mass Serpent Ward.", audience: [Audience.ALL]}, 12.6.2021 no longer valid */
  {
    category: "EnemyHero",
    npcHeroName: "shadow_shaman",
    audioFile: "enemyHero/ShadowShaman_8_Ratting",
    messageTime: 25 * 60,
    textMessage:
      "Shadow Shaman is good at ratting your base especially with Aghanim's Scepter and Refresher Orb.",
    audience: [Audience.ALL],
  },

  // 89. Silencer
  {
    category: "OwnHero",
    npcHeroName: "silencer",
    audioFile: "ownHero/Silencer_1_ArcaneCurse",
    messageTime: 30,
    textMessage: "Use Arcane Curse when you expect opponents to cast a spell.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "silencer",
    audioFile: "ownHero/Silencer_2_GlaivesOfWisdom",
    messageTime: 60,
    textMessage:
      "Clicking Glaives of Wisdom on an enemy hero doesn't draw creep aggro.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "silencer",
    audioFile: "ownHero/Silencer_3_Intelligence",
    messageTime: -20,
    textMessage:
      "To steal intelligence from a dying hero you have to have Glaives of Wisdom skilled and be within 925 of dying hero or be the one who scores the kill.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "silencer",
    audioFile: "ownHero/Silencer_4_Combo",
    messageTime: 90,
    textMessage: `Combining the Arcane Curse silence with Last Word does a lot of damage.`,
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "silencer",
    audioFile: "ownHero/Silencer_5_Minimap",
    messageTime: 8 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "Be aware of what happens on the map, so you can use Global Silence when needed.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "silencer",
    audioFile: "ownHero/Silencer_6_GlobalSilence1",
    messageTime: 12 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "Using Global Silence defensively is fine, but ideally use it during fights. Make moves when it is off cooldown.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "silencer",
    audioFile: "ownHero/Silencer_7_GlobalSilence2",
    messageTime: 20 * 60,
    repeatTime: 20 * 60,
    textMessage:
      "Many items dispel Global Silence. Be patient and don't waste it at the start of a fight.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "silencer",
    audioFile: "enemyHero/Silencer_1_GlaivesOfWisdom",
    messageTime: -60,
    textMessage:
      "Glaives of Wisdom are great for harassing as Silencer doesn't pull aggro and the damage ramps up.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "silencer",
    audioFile: "enemyHero/Silencer_2_ArcaneCurse",
    messageTime: -50,
    textMessage:
      `Silencers Arcane Curse silences and does more damage if you cast a spell while under the effect of it.`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "silencer",
    audioFile: "enemyHero/Silencer_3_GlobalSilence",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Global Silence has a long cooldown. Look to fight after it was used.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "silencer",
    audioFile: "enemyHero/Silencer_4_DispelItems",
    messageTime: 12 * 60,
    textMessage:
      "Items that provide dispel are great against Silencer's silences.",
    audience: [Audience.ALL],
  },

  // 90. Skywrath Mage
  {
    category: "OwnHero",
    npcHeroName: "skywrath_mage",
    audioFile: "ownHero/SkywrathMage_1_Squishy",
    messageTime: -45,
    textMessage:
      "Skywrath Mage is very squishy, so be mindful about your positioning.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "skywrath_mage",
    audioFile: "ownHero/SkywrathMage_2_SecureRanged",
    messageTime: 15,
    textMessage:
      "Use Arcane Bolt or Concussive Shot to secure ranged creep last hits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skywrath_mage_arcane_bolt" },
  },
  {
    category: "OwnHero",
    npcHeroName: "skywrath_mage",
    audioFile: "ownHero/SkywrathMage_3_FogCasting",
    messageTime: 30,
    textMessage:
      "Cast your spells from fog whenever you can if opponents have magic sticks.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "skywrath_mage_arcane_bolt" },
  },
  {
    category: "OwnHero",
    npcHeroName: "skywrath_mage",
    audioFile: "ownHero/SkywrathMage_4_SmokeGank",
    messageTime: [10 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Find a ganking partner that can set up your Mystic Flare and burn smokes with him.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "OwnHero",
    npcHeroName: "skywrath_mage",
    audioFile: "ownHero/SkywrathMage_5_FightFocus",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, focus on dropping Mystic Flare on a disabled unit and applying Ancient Seal on a target with no dispel.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "skywrath_mage_mystic_flare" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "skywrath_mage",
    audioFile: "enemyHero/SkywrathMage_1_MagicStickWand",
    messageTime: -60,
    textMessage:
      "Skywrath Mage uses his spells frequently to harass. Magic Stick and Wand will be charged up.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "skywrath_mage",
    audioFile: "enemyHero/SkywrathMage_2_InfusedRaindrops",
    messageTime: 3 * 60 + 30,
    textMessage:
      "Consider purchasing Infused Raindrops against Skywrath Mage's damaging spells.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "skywrath_mage",
    audioFile: "enemyHero/SkywrathMage_3_Focus",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Skywrath Mage in fights as he does a lot of damage but is very squishy.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "skywrath_mage",
    audioFile: "enemyHero/SkywrathMage_4_RodOfAtos",
    messageTime: 10 * 60 + 20,
    textMessage:
      "Be aware of Rod of Atos timing on Skywrath Mage. He can solo kill most of the heroes with it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "skywrath_mage",
    audioFile: "enemyHero/SkywrathMage_5_ForceStaff",
    messageTime: 12 * 60,
    textMessage:
      "Force Staff is great at saving an ally from Skywrath's Mystic Flare.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "skywrath_mage",
    audioFile: "enemyHero/SkywrathMage_6_AntispellItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Magic resistance and spell immunity items are great against Skywrath Mage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "skywrath_mage",
    audioFile: "enemyHero/SkywrathMage_7_DispelItems",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Items that provide dispel are great against Skywrath's Ancient Seal and root from Rod of Atos.",
    audience: [Audience.ALL],
  },

  // 91. Slardar
  {
    category: "OwnHero",
    npcHeroName: "slardar",
    audioFile: "ownHero/Slardar_1_BashOfTheDeep",
    messageTime: 10,
    textMessage:
      "Keep an eye on Bash of the Deep charges and preferably bash the opponents.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slardar_bash" },
  },
  {
    category: "OwnHero",
    npcHeroName: "slardar",
    audioFile: "ownHero/Slardar_2_SecureRanged",
    messageTime: 20,
    textMessage:
      "Use Slithereen Crush and Bash of the Deep to secure ranged creep last hits.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slardar_slithereen_crush" },
  },
  {
    category: "OwnHero",
    npcHeroName: "slardar",
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
    npcHeroName: "slardar",
    audioFile: "ownHero/Slardar_4_ChargeUp",
    messageTime: [5 * 60, 12 * 60, 19 * 60],
    textMessage:
      "Build up Bash of the Deep charges up to 3 ideally, before making a move or gank attempt.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slardar_bash" },
  },
  {
    category: "OwnHero",
    npcHeroName: "slardar",
    audioFile: "ownHero/Slardar_5_Blink",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Once you have Blink Dagger, make use of it before opponents are able to see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "slardar",
    audioFile: "ownHero/Slardar_6_CoreFocus",
    messageTime: 11 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, play around your right-clicking core. Jump and Corrosive Haze the target he is able to hit.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slardar_amplify_damage" },
  },
  {
    category: "OwnHero",
    npcHeroName: "slardar",
    audioFile: "ownHero/Slardar_7_Roshan",
    messageTime: [14 * 60 + 45, 17 * 60 + 45],
    textMessage:
      "Slardar enables the team to take Roshan down fairly early due to Corrosive Haze.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "slardar",
    audioFile: "enemyHero/Slardar_1_BashOfTheDeep",
    messageTime: -60,
    textMessage:
      "After every 3rd hit, Slardar will have Bash of the Deep charged up. Keep yourself at distance.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "slardar",
    audioFile: "enemyHero/Slardar_2_BlinkDagger",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Be aware of Slardar's Blink Dagger timing. Look to cancel his Dagger in the fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "slardar",
    audioFile: "enemyHero/Slardar_3_DispelItems",
    messageTime: 12 * 60,
    textMessage:
      "Items that provide dispel are great against Slardar's Corrosive Haze.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "slardar",
    audioFile: "enemyHero/Slardar_4_ArmorItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Armor items are great against Slardar's damage output and armor reduction.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "slardar",
    audioFile: "enemyHero/Slardar_5_Roshan",
    messageTime: [15 * 60 + 10, 20 * 60 + 10, 25 * 60 + 10],
    textMessage:
      "Slardar lineups are able to take Roshan early on. Ward around Roshpit and check.",
    audience: [Audience.ALL],
  },

  // 92. Slark
  {
    category: "OwnHero",
    npcHeroName: "slark",
    audioFile: "ownHero/Slark_1_ScoutWards",
    messageTime: -90,
    textMessage:
      `As you load into the game, start running to scout opponents placing wards as you have high night vision.`,
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "slark",
    audioFile: "ownHero/Slark_2_DamageDifference",
    messageTime: 15,
    textMessage:
      `Hit an opponent whenever you can to create a damage difference of 4. It'll help you with last hiting.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "slark_essence_shift" },
  },
  {
    category: "OwnHero",
    npcHeroName: "slark",
    audioFile: "ownHero/Slark_3_GoPounce",
    messageTime: 75,
    textMessage:
      `If you are able to build up a few Essence Shift stacks, look to commit for a kill attempt with Pounce.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "slark_pounce" },
  },
  {
    category: "OwnHero",
    npcHeroName: "slark",
    audioFile: "ownHero/Slark_4_NightAggression",
    messageTime: 4 * 60 + 55,
    repeatTime: 10 * 60,
    textMessage:
      "Play more aggressively during night time as you have increased vision.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "slark",
    audioFile: "ownHero/Slark_5_InTrouble",
    messageTime: [6 * 60, 13 * 60],
    textMessage:
      "Whenever you are in trouble, you can Pounce away or even Shadow Dance and teleport out.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slark_pounce" },
  },
  {
    category: "OwnHero",
    npcHeroName: "slark",
    audioFile: "ownHero/Slark_6_Deward",
    messageTime: [6 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Pick up a couple of sentries to deward when you sense with Shadow Dance you are being seen.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_sentry" },
  },
  {
    category: "OwnHero",
    npcHeroName: "slark",
    audioFile: "ownHero/Slark_7_StacksAggression",
    messageTime: [6 * 60 + 30, 16 * 60 + 30, 26 * 60 + 30],
    textMessage:
      "Whenever you have a decent amount of Essence Shift, play more aggressively and look for extra kills.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slark_essence_shift" },
  },
  {
    category: "OwnHero",
    npcHeroName: "slark",
    audioFile: "ownHero/Slark_8_PushSidelanes",
    messageTime: 12 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Whenever not much is happening, push out the sidelines as Slark is quite elusive.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "slark_dark_pact" },
  },
  {
    category: "OwnHero",
    npcHeroName: "slark",
    audioFile: "ownHero/Slark_9_AghanimsShard",
    messageTime: 15 * 60,
    textMessage:
      `Slarks Aghanims Shard is very good for man fighting and saving allies, consider purchasing after your 3 main items.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `slark`,
    audioFile: `ownHero/Slark_10_AghanimsShard`,
    messageTime: [45, 2 * 60 + 45, 4 * 60 + 45, 6 * 60 + 45],
    textMessage:
      `When low on HP, look to get out of enemy vision to gain some HP regen from your Barracuda innate.`,
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "slark",
    audioFile: "enemyHero/Slark_1_OfflaneMelee",
    messageTime: -90,
    textMessage:
      `Slark tends to do well against melee offlane heroes due to Essence Shift stacks. Check if you can send at least one ranged hero against him`,
    chatMessage:
      `Slark tends to do well against melee offlane heroes due to Essence Shift stacks. Send one ranged hero against him`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "slark",
    audioFile: "enemyHero/Slark_2_Wards",
    messageTime: [4 * 60 + 45, 10 * 60 + 45],
    textMessage:
      "Place wards in unusual spots and more defensively as Slark is able to sense vision with his ultimate",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "slark",
    audioFile: "enemyHero/Slark_3_DarkPact",
    messageTime: 6 * 60 + 30,
    textMessage:
      "Keep an eye on Slark's Dark Pact usage so that your spells and items don't get dispelled",
    audience: [Audience.ALL],
  },
  /* {
    category: "EnemyHero",
    npcHeroName: "slark",
    audioFile: "enemyHero/Slark_4_ForceStaff",
    messageTime: 8 * 60 + 30,
    textMessage: "Force Staff allows you to break away from Slark's Pounce",
    audience: [Audience.ALL],
  }, */

  {
    category: "EnemyHero",
    npcHeroName: "slark",
    audioFile: "enemyHero/Slark_5_NightVision",
    messageTime: 9 * 60 + 30,
    textMessage:
      "Slark has increased night vision so he's likely to spot you before you spot him. Use Smoke of Deceit to gank him more effectively during night",
    chatMessage:
      "Slark has increased night vision so use Smoke of Deceit to gank him more effectively during night",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "slark",
    audioFile: "enemyHero/Slark_6_EssenceShift",
    messageTime: [15 * 60 + 30, 30 * 60 + 30],
    textMessage:
      "Long fights are favoring Slark as he is able to acquire Essence Shift stacks. Keep an eye on it and avoid fighting him if his stacks are high",
    chatMessage:
      "Long fights are favoring Slark as he acquires Essence Shift stacks. Avoid fighting him when stacks are high",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "slark",
    audioFile: "enemyHero/Slark_7_CounterItems",
    messageTime: 20 * 60 + 30,
    textMessage:
      "Instant or near instant disables and burst damage are good at dealing with Slark",
    audience: [Audience.ALL],
  },

  // 93. Snapfire
  {
    category: "OwnHero",
    npcHeroName: "snapfire",
    audioFile: "ownHero/Snapfire_1_SecureRanged",
    messageTime: 15,
    textMessage:
      "Secure ranged creep last hits with Scatterblast and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_scatterblast" },
  },
  {
    category: "OwnHero",
    npcHeroName: "snapfire",
    audioFile: "ownHero/Snapfire_2_SecureRanged",
    messageTime: 75,
    textMessage:
      "Look for opportunities to cookie yourself in, or an ally or creep to stun opponents and apply follow-up damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_firesnap_cookie" },
  },
  {
    category: "OwnHero",
    npcHeroName: "snapfire",
    audioFile: "ownHero/Snapfire_3_CommunicateCookie",
    messageTime: 90,
    textMessage:
      "Communicate with your allies whenever you are going to use Firesnap Cookie.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_firesnap_cookie" },
  },
  {
    category: "OwnHero",
    npcHeroName: "snapfire",
    audioFile: "ownHero/Snapfire_4_ValuePoint",
    messageTime: 105,
    textMessage:
      "Pick up a point in Lil' Shredder if you are dealing with hit count spells like Tombstone, The Swarm and such.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_lil_shredder" },
  },
  {
    category: "OwnHero",
    npcHeroName: "snapfire",
    audioFile: "ownHero/Snapfire_5_InTrouble",
    messageTime: [2 * 60 + 45, 12 * 60 + 45, 22 * 60 + 45],
    textMessage:
      "When in trouble, use Firesnap Cookie to jump into a treeline or over a cliff.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_firesnap_cookie" },
  },
  {
    category: "OwnHero",
    npcHeroName: "snapfire",
    audioFile: "ownHero/Snapfire_6_ValuePoint",
    messageTime: [6 * 60 + 15, 12 * 60 + 15],
    textMessage:
      "It is very important that you land the first Mortimer Kiss to slow the opponents so it is easier to land follow-up ones.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_mortimer_kisses" },
  },
  {
    category: "OwnHero",
    npcHeroName: "snapfire",
    audioFile: "ownHero/Snapfire_7_PushSidelanes",
    messageTime: 12 * 60 + 15,
    textMessage: `When there is not much happening, push out the sidelines with Scatterblast and Firesnap Cookie.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_scatterblast" },
  },
  {
    category: "OwnHero",
    npcHeroName: "snapfire",
    audioFile: "ownHero/Snapfire_8_PushSidelanes",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanims Shard around the 15 minute mark to provide a layer of burst to Firesnap Cookie.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "snapfire",
    audioFile: "ownHero/Snapfire_9_Dewarding",
    messageTime: [3 * 60, 13 * 60, 23 * 60, 33 * 60],
    textMessage:
      "Use Lil Shredder to quickly hit enemy wards twice to deward them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "snapfire_lil_shredder" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `snapfire`,
    audioFile: `ownHero/Snapfire_10_FullBoreFacet`,
    messageTime: [-45, 45, 3 * 60 + 45, 8 * 60 + 45, 13 * 60 + 45],
    textMessage:
      `With the Full Bore facet, look to keep more than 650 units distance from enemy heroes when hitting them with Scatterblast to do maximum damage.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `snapfire_scatterblast` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "snapfire",
    audioFile: "enemyHero/Snapfire_1_Scatterblast",
    messageTime: -10,
    textMessage:
      `If Snapfire has the Ricochet II facet, avoid staying too close to Snapfire on the lane as her main harassing spell is Scatterblast which does 50% more damage if you are within 450 range`,
    chatMessage:
      `If Snapfire has the Ricochet II facet, avoid staying close to Snapfire as her Scatterblast which does 50% more damage if you are within 450 range`,
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "snapfire",
    audioFile: "enemyHero/Snapfire_2_FiresnapCookie",
    messageTime: 50,
    textMessage:
      "Firesnap Cookie stun can be dodged if you run quickly towards the hero or creep that cookie was used on",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "snapfire",
    audioFile: "enemyHero/Snapfire_3_LilsShredder",
    messageTime: 6 * 60 + 30,
    textMessage:
      "Be careful with spells that have hit counter as they are countered by Snapfire's Lil' Shredder",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "snapfire",
    audioFile: "enemyHero/Snapfire_4_MortimerKisses1",
    messageTime: [8 * 60 + 45, 28 * 60 + 45, 48 * 60 + 45],
    textMessage:
      "To dodge Snapfire's Mortimer Kisses, make sharp turns and change direction",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "snapfire",
    audioFile: "enemyHero/Snapfire_5_MagicDamage",
    messageTime: [18 * 60 + 45, 38 * 60 + 45],
    textMessage:
      "Snapfire's damage is primarily magical, getting magic resistance items or Black King Bar allows you to negate most of her impact in fights",
    chatMessage:
      "Snapfire's damage is primarily magical. Magic resistance items or Black King Bar is good",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "snapfire",
    audioFile: "enemyHero/Snapfire_6_MortimerKisses2",
    messageTime: [23 * 60 + 0, 33 * 60 + 0, 53 * 60 + 0],
    textMessage:
      "Canceling Snapfire's ultimate can be a fight winning move. Try to position yourself such that you can get to her as quickly as possible. Getting gap closing items helps as well",
    chatMessage:
      "Canceling Snapfire's ultimate can be a fight winning move. Getting gap closing items helps",
    audience: [Audience.ALL],
  },

  // 94. Sniper
  {
    category: "OwnHero",
    npcHeroName: "sniper",
    audioFile: "ownHero/Sniper_1_Minimap",
    messageTime: -30,
    textMessage:
      "Sniper gets easily ganked, always have an Observer Ward placed and pay attention to the minimap.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "sniper",
    audioFile: "ownHero/Sniper_2_Shrapnel1",
    messageTime: [
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
    npcHeroName: "sniper",
    audioFile: "ownHero/Sniper_3_Stack",
    messageTime: 2 * 60 + 45,
    textMessage: `Look to stack the nearby big jungle camp with Shrapnel whenever you can.`,
    audience: [Audience.ROLE_MID],
  },
  {
    category: "OwnHero",
    npcHeroName: "sniper",
    audioFile: "ownHero/Sniper_4_Push",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Sniper doesn't like to rotate too much, so focus on farming and pressure the tower if opponents' mid rotates.",
    audience: [Audience.ROLE_MID],
  },
  {
    category: "OwnHero",
    npcHeroName: "sniper",
    audioFile: "ownHero/Sniper_5_TeamFight",
    messageTime: 10 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Don't let opponents see you at the start of a fight. Let them focus on someone else.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "sniper",
    audioFile: "ownHero/Sniper_6_Shrapnel2",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "If you feel you might be ganked, Shrapnel the wave and move out.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "sniper",
    audioFile: "ownHero/Sniper_7_Shrapnel3",
    messageTime: 11 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Sniper is really strong at defending buildings with Shrapnel and his long attack range.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "sniper",
    audioFile: "ownHero/Sniper_9_TakeAim",
    messageTime: 11 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "When in trouble, often times the correct play is to press Take Aim and stand your ground.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "sniper",
    audioFile: "ownHero/Sniper_8_AghanimsShard",
    messageTime: [15 * 60, 20 * 60],
    textMessage:
      "Aghanim's Scepter and Aghanim's Shard are Core items. Take your time in between the fights to farm them.",
    audience: [Audience.ROLE_SUPPORT],
  },

  {
    category: "EnemyHero",
    npcHeroName: "sniper",
    audioFile: "enemyHero/Sniper_1_Gank",
    messageTime: [1 * 60 + 30, 4 * 60 + 30],
    textMessage:
      "Gank Sniper in early game. He doesn't have any escape mechanism and is very squishy",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sniper",
    audioFile: "enemyHero/Sniper_2_GapClosing",
    messageTime: [7 * 60 + 10, 15 * 60 + 20, 25 * 60 + 25],
    textMessage: "Buy gap-closing items against Sniper",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sniper",
    audioFile: "enemyHero/Sniper_3_SmokeAssassinate",
    messageTime: 8 * 60 + 30,
    textMessage:
      "Smoke of Deceit can be used to dodge Sniper's Assassinate ability",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sniper",
    audioFile: "enemyHero/Sniper_4_SmokeAttack",
    messageTime: [10 * 60 + 15, 20 * 60 + 15, 30 * 60 + 15],
    textMessage:
      "Use Smoke of Deceit to wrap around and catch Sniper off-guard",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sniper",
    audioFile: "enemyHero/Sniper_5_DeepWards",
    messageTime: [11 * 60 + 15, 23 * 60 + 15, 33 * 60 + 15],
    textMessage:
      "Deep observer wards allow you to spot Sniper on the backlines",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sniper",
    audioFile: "enemyHero/Sniper_6_HighGround",
    messageTime: [23 * 60 + 10, 32 * 60 + 10, 41 * 60 + 10],
    textMessage:
      "Be very careful when pushing high-ground against Sniper. Chip the tower and racks patiently and don't overextend. You might also want to give up on the high-ground siege and take a fight outside of their base",
    chatMessage:
      "Be careful when pushing high-ground against Sniper. Chip the tower and racks patiently and don't overextend",
    audience: [Audience.ALL],
  },

  // 95. Spectre
  {
    category: "OwnHero",
    npcHeroName: "spectre",
    audioFile: "ownHero/Spectre_1_SecureRanged",
    messageTime: 15,
    textMessage:
      "Use Spectral Dagger to secure ranged creep lasthits and damage the opponents.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spectre_spectral_dagger" },
  },
  {
    category: "OwnHero",
    npcHeroName: "spectre",
    audioFile: "ownHero/Spectre_2_Escape",
    messageTime: [3 * 60, 13 * 60, 23 * 60],
    textMessage:
      "When in trouble, use a Spectral Dagger to run over a cliff or a treeline, or even pop a defensive Haunt to escape.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spectre_spectral_dagger" },
  },
  {
    category: "OwnHero",
    npcHeroName: "spectre",
    audioFile: "ownHero/Spectre_3_LookAround",
    messageTime: 7 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Look around for Haunt opportunities. Spectre farms slowly so kills are necessary.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spectre_haunt" },
  },
  {
    category: "OwnHero",
    npcHeroName: "spectre",
    audioFile: "ownHero/Spectre_4_KillTargets",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Spectre's Haunt is amazing for killing backliners and supports. Focus on killing those at the start of the fight.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spectre_haunt" },
  },
  {
    category: "OwnHero",
    npcHeroName: "spectre",
    audioFile: "ownHero/Spectre_5_BreakEffects",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Check opponents for break effects. Adapt your playstyle and itemization accordingly.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "spectre",
    audioFile: "ownHero/Spectre_7_aghanims_shard",
    messageTime: 15 * 60,
    textMessage:
      "Consider aghanims shard versus heroes that do alot of burst damage.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "spectre",
    audioFile: "ownHero/Spectre_6_MantaSpike",
    messageTime: 16 * 60 + 15,
    textMessage:
      "With Manta Style, Spectre gains burst and Roshan potential as Desolate works on illusions.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "manta" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "spectre",
    audioFile: "enemyHero/Spectre_1_PressureEarly",
    messageTime: -60,
    textMessage:
      "Spectre is a weak laner. Look to pressure her early on. She's slow at recovering.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "spectre",
    audioFile: "enemyHero/Spectre_2_Desolate",
    messageTime: 30,
    textMessage:
      "Spectre's Desolate does no damage to you, if you are close to an allied unit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "spectre",
    audioFile: "enemyHero/Spectre_3_Focus",
    messageTime: 40,
    textMessage:
      "The closer you are to Spectre the more damage you take from Dispersion.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "spectre",
    audioFile: "enemyHero/Spectre_4_ProtectSupports",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Protect your supports from being killed during the Spectre's Haunt.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "spectre",
    audioFile: "enemyHero/Spectre_5_HauntCooldown",
    messageTime: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Spectre's Haunt has a long cooldown. Look to fight after it was used.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "spectre",
    audioFile: "enemyHero/Spectre_6_Break",
    messageTime: 12 * 60,
    textMessage:
      "Break effects remove Desolate and Dispersion and make Spectre much weaker.",
    audience: [Audience.ALL],
  },

  // 96. Spirit Breaker
  {
    category: "OwnHero",
    npcHeroName: "spirit_breaker",
    audioFile: "ownHero/SpiritBreaker_1_CreepEquilibrium",
    messageTime: 15,
    textMessage:
      "In order to pressure opponents on the lane, bring creep equilibrium closer to your tower.",
    audience: [Audience.ROLE_SUPPORT_SOFT, Audience.ROLE_OFFLANE],
  },
  {
    category: "OwnHero",
    npcHeroName: "spirit_breaker",
    audioFile: "ownHero/SpiritBreaker_2_ChargeFurtherTarget",
    messageTime: [90, 11 * 60 + 30, 21 * 60 + 30],
    textMessage:
      "Consider charging the furthest target in a line to bash all the opponents heroes on the way.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spirit_breaker_charge_of_darkness" },
  },
  {
    category: "OwnHero",
    npcHeroName: "spirit_breaker",
    audioFile: "ownHero/SpiritBreaker_3_MovementSpeedItems",
    messageTime: [2 * 60, 13 * 60, 24 * 60],
    textMessage:
      "Movement speed items are amazing for Spirit Breaker as they amplify the Greater Bash damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "phase_boots" },
  },
  {
    category: "OwnHero",
    npcHeroName: "spirit_breaker",
    audioFile: "ownHero/SpiritBreaker_4_PopCharge",
    messageTime: [2 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Pop Bulldoze and other movement speed-increasing items like Phase Boots or Shadow Blade before charge lands.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spirit_breaker_bulldoze" },
  },
  {
    category: "OwnHero",
    npcHeroName: "spirit_breaker",
    audioFile: "ownHero/SpiritBreaker_5_ProvideVision",
    messageTime: 7 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Use Charge of Darkness to provide vision over an opponent so he can't juke your allies.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spirit_breaker_charge_of_darkness" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "spirit_breaker",
    audioFile: "ownHero/SpiritBreaker_6_RoshCharge",
    messageTime: [7 * 60 + 30, 17 * 60 + 30],
    textMessage:
      "Careful about charging through Roshpit as you can get bashed.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spirit_breaker_charge_of_darkness" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "spirit_breaker",
    audioFile: "ownHero/SpiritBreaker_7_Backliners",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Charge of Darkness allows you to focus on the backliners and supports. Focus on those in the fights.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spirit_breaker_charge_of_darkness" },
  },
  {
    category: "OwnHero",
    npcHeroName: "spirit_breaker",
    audioFile: "ownHero/SpiritBreaker_8_FarmShadowBlade",
    messageTime: 10 * 60 + 30,
    textMessage:
      "Take your time to farm Shadow Blade as it provides even more burst and almost guarantees charge completion.",
    audience: [Audience.ALL],
    image: { type: "item", name: "invis_sword" },
  },
  {
    category: "OwnHero",
    npcHeroName: "spirit_breaker",
    audioFile: "ownHero/SpiritBreaker_9_PushSidelanes",
    messageTime: 11 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage: "When not much is happening, push out the sidelines.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "spirit_breaker_charge_of_darkness" },
  },
  {
    category: "OwnHero",
    npcHeroName: "spirit_breaker",
    audioFile: "ownHero/SpiritBreaker_10_AghanimsScepter",
    messageTime: [17 * 60 + 45, 21 * 60 + 45],
    textMessage:
      "Aghanim's Scepter is a must in the mid-late game as it deals with spell-immunity and makes charge more frequent.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "spirit_breaker",
    audioFile: "enemyHero/SpiritBreaker_1_ChargeOfDarkness",
    messageTime: -60,
    textMessage:
      "Charge of Darkness provides vision over you. Hiding in trees won't help once you're charged.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "spirit_breaker",
    audioFile: "enemyHero/SpiritBreaker_2_Bulldoze",
    messageTime: 30,
    textMessage: "Avoid wasting disables on Spirit Breaker buffed by Bulldoze.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "spirit_breaker",
    audioFile: "enemyHero/SpiritBreaker_3_Roam",
    messageTime: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Spirit Breaker roams a lot. Keep track of his movements and have a teleport ready.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "spirit_breaker",
    audioFile: "enemyHero/SpiritBreaker_4_CounterChargeItems",
    messageTime: 12 * 60,
    textMessage:
      "Spells and items that provide instant disable are great at stopping Charge of Darkness.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "spirit_breaker",
    audioFile: "enemyHero/SpiritBreaker_5_LinkensSphere",
    messageTime: 12 * 60 + 10,
    textMessage: "Linken's Sphere is great against Charge of Darkness.",
    audience: [Audience.ALL],
  },

  // 97. Storm Spirit
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_1_RuneControl",
    messageTime: [5 * 60 + 45, 15 * 60 + 45, 25 * 60 + 45],
    textMessage:
      "Rune control is very important. Arcane and Regeneration runes can easily win you the fight or allow you to get a pick-off.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_2_Stack",
    messageTime: 2 * 60 + 45,
    textMessage:
      "Stack the nearest jungle camp and clear it after addressing lane creeps. It is very important to hit level 6 as soon as possible to make yourself less gankable.",
    audience: [Audience.ROLE_MID],
  },
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_3_RushOrchid",
    messageTime: 5 * 60 + 30,
    textMessage:
      "If you have a really good start, get Orchid as soon as possible. It will allow you to pick-off most of the heroes on the map.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_4_BallLightning1",
    messageTime: 6 * 60 + 45,
    textMessage:
      "You can right-click and use spells and items during Ball Lightning, including teleport.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_5_ManaManagement",
    messageTime: 8 * 60,
    repeatTime: 15 * 60,
    textMessage:
      "Mana management is the key. The more mana you have the more damage you can do. Be full mana if you expect fight to break out.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_6_PreserveMana",
    messageTime: 9 * 60,
    repeatTime: 15 * 60,
    textMessage:
      "Don't spend all of your mana on initial jump. Preserve some to be able to disengage.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_7_LeavingFountain",
    messageTime: 11 * 60,
    repeatTime: 15 * 60,
    textMessage:
      "When leaving the fountain, you can Ball Lightning beyond tier 4 towers while bottling and still be full mana.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_8_JumpBackliners",
    messageTime: 12 * 60,
    repeatTime: 15 * 60,
    textMessage:
      "Target backliners. They are squishy and Storm has no issue gap-closing.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_8_StaticRemnant",
    messageTime: 13 * 60,
    repeatTime: 15 * 60,
    textMessage:
      "Static Remnant provides flying vision around itself which can be useful to scout Roshan or rune spawn and give you vision in tree lines.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_9_BallLightning2",
    messageTime: 14 * 60,
    repeatTime: 20 * 60,
    textMessage: "Ball Lightning destroys trees in its path.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_10_AegisCheese",
    messageTime: 18 * 60,
    repeatTime: 15 * 60,
    textMessage:
      "Storm Spirit is one of the best Aegis/Cheese carriers as he utilizes the mana he gets back really well.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_11_AghanimsScepter",
    messageTime: 24 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Level 20 Vortex talent along with Aghanim's Scepter mimics Reverse Polarity but on 16s cooldown.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "storm_spirit",
    audioFile: "ownHero/StormSpirit_12_StopPush",
    messageTime: 33 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "In late game you can fly over and kill the creeps that opponents are looking to push with.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "storm_spirit",
    audioFile: "enemyHero/StormSpirit_1_MagicStickWand",
    messageTime: -60,
    textMessage:
      "Storm Spirit uses Static Remnant frequently. Magic Stick and Wand will be charged up.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "storm_spirit",
    audioFile: "enemyHero/StormSpirit_2_ControlRunes",
    messageTime: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Control power runes against Storm. He likes to bottle and gank with those.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "storm_spirit",
    audioFile: "enemyHero/StormSpirit_3_LowMana",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Look to fight when Storm Spirit is low on mana as he won't be able to use Ball Lightning much.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "storm_spirit",
    audioFile: "enemyHero/StormSpirit_4_OrchidMalevolence",
    messageTime: 16 * 60 + 10,
    textMessage:
      "Be aware of Storm Spirit's Orchid timing. He can solo kill most heroes with it.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "storm_spirit",
    audioFile: "enemyHero/StormSpirit_5_CounterItems",
    messageTime: 12 * 60,
    textMessage:
      "Spells and items that provide instant disables and silences are great against Storm Spirit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "storm_spirit",
    audioFile: "enemyHero/StormSpirit_6_AntispellItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Magic resistance and spell immunity items are great against Storm Spirit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "storm_spirit",
    audioFile: "enemyHero/StormSpirit_7_Highground",
    messageTime: [20 * 60 + 10, 30 * 60 + 10, 40 * 60 + 10],
    textMessage:
      "Be quick on glyphing or piping the creepwave when pushing highground against Storm's Ball Lightning. ",
    audience: [Audience.ALL],
  },

  // 98. Sven
  {
    category: "OwnHero",
    npcHeroName: "sven",
    audioFile: "ownHero/Sven_1_SecureRanged",
    messageTime: 15,
    textMessage:
      "Use Storm Hammer to secure ranged creep lasthit and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "sven_storm_bolt" },
  },
  {
    category: "OwnHero",
    npcHeroName: "sven",
    audioFile: "ownHero/Sven_2_MakeStacks",
    messageTime: [3 * 60 + 30, 6 * 60 + 30],
    textMessage:
      "Alert your teammates to stack for you as you can clear those fairly early.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "sven_great_cleave" },
  },
  {
    category: "OwnHero",
    npcHeroName: "sven",
    audioFile: "ownHero/Sven_4_MaxCleave",
    messageTime: 1 * 60,
    textMessage:
      "Only put points into Great Cleave once you are ready to leave the lane, or keep it at one point for the Strength Bonus to sustain in lane until you are ready to leave.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "sven_great_cleave" },
  },
  {
    category: "OwnHero",
    npcHeroName: "sven",
    audioFile: "ownHero/Sven_3_DontOverlane",
    messageTime: 7 * 60 + 15,
    textMessage:
      "Don't overstay in lane. Consider moving out of the lane as laning opponents are getting closer to level 6.",
    audience: [Audience.ROLE_CARRY, Audience.ROLE_OFFLANE],
  },
  {
    category: "OwnHero",
    npcHeroName: "sven",
    audioFile: "ownHero/Sven_4_UltiStacks",
    messageTime: 8 * 60,
    textMessage:
      "Feel free to pop God's Strength off cooldown to farm after laning phase.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "sven_gods_strength" },
  },
  {
    category: "OwnHero",
    npcHeroName: "sven",
    audioFile: "ownHero/Sven_5_InitialJump",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "Your initial jump in the fights has to be well timed and precise. You don't want to be kited.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "sven",
    audioFile: "ownHero/Sven_6_CleaveAll",
    messageTime: 11 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "In the fights, position yourself in such a way so that you can cleave onto the opponents further away.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "sven",
    audioFile: "ownHero/Sven_7_Antikiting",
    messageTime: [11 * 60 + 45, 21 * 60 + 45],
    textMessage:
      "Itemize against kiting by purchasing Black King Bar, Blink Dagger, Shadow Blade, Aghanim's Scepter or Shard.",
    audience: [Audience.ROLE_CORE],
  },

  {
    category: "EnemyHero",
    npcHeroName: "sven",
    audioFile: "enemyHero/Sven_1_GreatCleave",
    messageTime: -60,
    textMessage:
      "Against Sven, avoid playing inside the creep wave as you will take damage from Great Cleave.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sven",
    audioFile: "enemyHero/Sven_2_ContestFarm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Sven farms quickly with Great Cleave. Smoke him, place deep wards and sentry off camps.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sven",
    audioFile: "enemyHero/Sven_3_GodsStrength",
    messageTime: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "God's Strength more than doubles Sven's damage. Look to disengage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sven",
    audioFile: "enemyHero/Sven_4_ClumpUp",
    messageTime: [12 * 60 + 10, 22 * 60 + 10, 32 * 60 + 10],
    textMessage:
      "Avoid clumping up in the fights for Storm Hammer and Great Cleave.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sven",
    audioFile: "enemyHero/Sven_5_ArmorItems",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Armor items are great against Sven's insane physical damage output.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "sven",
    audioFile: "enemyHero/Sven_6_AghanimsScepter",
    messageTime: 15 * 60,
    textMessage:
      "Be aware of Sven's Aghanim's Scepter timing. He becomes much more dangerous.",
    audience: [Audience.ALL],
  },

  // 99. Techies - Needs to be reworked. I removed the wrong messages
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_1_ExtraConsumables",
    messageTime: 2 * 60,
    textMessage:
      "Ferry some health consumables with your courier to use Blast Off! frequently.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_suicide" },
  },
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_2_DestroyTrees",
    messageTime: -30,
    textMessage:
      "Blast Off! destroys trees which can be useful against certain heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_suicide" },
  },
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_3_MinePortals",
    messageTime: [12 * 60, 22 * 60, 32 * 60, 42 * 60],
    textMessage:
      "Look to place a couple of Proximity Mines around portals for a surprise burst on enemies using them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_land_mines" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_4_SitOnMines",
    messageTime: [90, 5 * 60 + 30],
    textMessage: "You can make it harder for opponents to destroy mines by sitting on top of them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_land_mines" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_5_Efficiency",
    messageTime: [3 * 60, 13 * 60],
    textMessage:
      "Drop or backpack items that provide you with mana before using Arcane Boots or Soul Ring.",
    audience: [Audience.ALL],
    image: { type: "item", name: "arcane_boots" },
  },
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_6_Vision",
    messageTime: [9 * 60, 15 * 60, 21 * 60],
    textMessage: `Sticky Bombs and Proximity Mines provide limited vision so you can scout pillars, runes or Roshan pit.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_sticky_bomb" },
  },
  /*{
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_7_LookAround",
    messageTime: [9 * 60 + 15, 16 * 60 + 15],
    textMessage: "Look around frequently to timely detonate Remote Mines.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_remote_mines" },
  },*/
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_8_MineAggressively",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Consider smoking yourself onto the opponents' side of the map to mine aggressively. Bring an observer as well.",
    audience: [Audience.ALL],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_9_Signal",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "Look for pickoffs or join teamfights with your massive burst potential.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_10_FightAlong",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "If your teammates are pressuring, move with them, mine around them and Blast Off! when opponents clump up.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_11_Roshpit",
    messageTime: 14 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage: `Place a couple of Proximity Mines at the entrance of Roshan pit to scout enemy movement.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_land_mines" },
  },
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_12_AghanimsShard",
    messageTime: 14 * 60,
    textMessage:
      "Pick up Aghanims Shard in the late game for some extra damage on Reactive Tazer.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_13_ForceIntoMines",
    messageTime: 30 * 60 + 15,
    textMessage:
      "Consider using Force Staff on enemy heroes to push them onto high grounds where you have Proximity Mines.",
    audience: [Audience.ALL],
    image: { type: "item", name: "force_staff" },
  },
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_14_Aggression",
    messageTime: 12 * 60,
    textMessage:
      "Play aggressively in lanes and the enemy jungle with your level 7 as you have massive kill potential.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "techies_land_mines" },
  },
  {
    category: "OwnHero",
    npcHeroName: "techies",
    audioFile: "ownHero/Techies_15_Eblade",
    messageTime: 25 * 60,
    textMessage:
      "With your Ethereal Blade, you can burst down just about any hero on the map with your combo.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ethereal_blade" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "techies",
    audioFile: "enemyHero/Techies_1_ExtraConsumables",
    messageTime: -60,
    textMessage:
      "Against Techies, deliver extra consumables and an Observer Ward to keep track of him.",
    audience: [Audience.IN_LANE],
  },
  /*{
    category: "EnemyHero",
    npcHeroName: "techies",
    audioFile: "enemyHero/Techies_2_Quell",
    messageTime: -50,
    textMessage:
      "Quell the trees in the area so you can spot Proximity mines and see Techies doing Blast Off!",
    audience: [Audience.IN_LANE],
  },*/
  {
    category: "EnemyHero",
    npcHeroName: "techies",
    audioFile: "enemyHero/Techies_3_ProximityMines",
    messageTime: -40,
    textMessage:
      "Proximity Mines explode 1 seconds after you hear the beep. Destroy them or move away quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "techies",
    audioFile: "enemyHero/Techies_4_KeepTrack",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Keep track of Techies' movements and notice which part of the map is being mined.",
    audience: [Audience.ALL],
  },
  /*{
    category: "EnemyHero",
    npcHeroName: "techies",
    audioFile: "enemyHero/Techies_5_BringSentries",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage: "Bring sentries whenever you're making a move on the opponent side of the map.",
    audience: [Audience.ALL],
  },*/
  /*{
    category: "EnemyHero",
    npcHeroName: "techies",
    audioFile: "enemyHero/Techies_6_AvoidTrees",
    messageTime: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage: "Avoid being next to trees in the lane as he can hide the Remote Mines in there.",
    audience: [Audience.ALL],
  },*/
  {
    category: "EnemyHero",
    npcHeroName: "techies",
    audioFile: "enemyHero/Techies_7_Vision",
    messageTime: [10 * 60 + 30, 20 * 60 + 30, 30 * 60 + 30],
    textMessage:
      "Avoid walking up highground or in Roshpit without vision. You might run into mines.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "techies",
    audioFile: "enemyHero/Techies_8_AntispellItems",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance items, Black King Bar and Aeon Disk are great against Techies to avoid getting bursted.",
    audience: [Audience.ALL],
  },
  // {category: "EnemyHero", hero: "Techie", audioFile: "enemyHero/Techie_9_Necrobook 3", messageTime: (12*60+10), textMessage: "Consider buying Necrobook level3 on someone for true sight.", audience: [Audience.ALL]}, |patch 7.29| MESSAGE REMOVED
  /*{
    category: "EnemyHero",
    npcHeroName: "techies",
    audioFile: "enemyHero/Techies_10_Aegis",
    messageTime: [15 * 60 + 10, 25 * 60 + 10, 35 * 60 + 10],
    textMessage:
      "Getting Aegis of Immortal is great against Remote mines. Take Roshan as early as possible.",
    audience: [Audience.ALL],
  },*/
  /*{
    category: "EnemyHero",
    npcHeroName: "techies",
    audioFile: "enemyHero/Techies_11_Gem",
    messageTime: 20 * 60 + 10,
    textMessage: "Buy a Gem of True Sight around 20min when you start grouping up as team.",
    audience: [Audience.ALL],
  },*/
  {
    category: "EnemyHero",
    npcHeroName: "techies",
    audioFile: "enemyHero/Techies_12_DodgeStickyBomb",
    messageTime: [15, 2 * 60, 5 * 60, 9 * 60],
    textMessage:
      "Make it tricky for Techies to land Sticky Bombs on you by making sharp turns.",
    audience: [Audience.ALL],
  },

  // 100. Templar Assassin
  {
    category: "OwnHero",
    npcHeroName: "templar_assassin",
    audioFile: "ownHero/TemplarAssassin_0_ShareTraps",
    messageTime: -60,
    textMessage:
      "Before the game starts make sure to share your units with your team so they can use your traps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "templar_assassin_psionic_trap" },
  },
  {
    category: "OwnHero",
    npcHeroName: "templar_assassin",
    audioFile: "ownHero/TemplarAssassin_1_MeldMelee",
    messageTime: -30,
    textMessage: "Consider skilling Meld on level 1 against melee match-ups.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "templar_assassin_meld" },
  },
  {
    category: "OwnHero",
    npcHeroName: "templar_assassin",
    audioFile: "ownHero/TemplarAssassin_2_PsiBladeCleave",
    messageTime: 15,
    textMessage:
      "Keep repositioning to Psi Blade the opponent when lasthitting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "templar_assassin_psi_blades" },
  },
  {
    category: "OwnHero",
    npcHeroName: "templar_assassin",
    audioFile: "ownHero/TemplarAssassin_3_SecureRunes",
    messageTime: [1 * 60 + 30, 3 * 60 + 30],
    textMessage:
      "You can push the lane in faster with psi blades and refraction in order to secure river runes.",
    audience: [Audience.ROLE_MID],
    image: { type: "ability", name: "templar_assassin_psi_blades" },
  },
  {
    category: "OwnHero",
    npcHeroName: "templar_assassin",
    audioFile: "ownHero/TemplarAssassin_4_StackSmallCamp",
    messageTime: [105, 3 * 60 + 45],
    textMessage:
      "Try to get your level 6 as soon as possible and force your opponent out of the lane. ",
    audience: [Audience.ALL],
    image: { type: "ability", name: "templar_assassin_psi_blades" },
  },
  {
    category: "OwnHero",
    npcHeroName: "templar_assassin",
    audioFile: "ownHero/TemplarAssassin_5_Stacks",
    messageTime: [4 * 60 + 30, 7 * 60 + 30],
    textMessage:
      "Ask your teammates to stack for you, especially ancients as you can clear them early.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "templar_assassin_psi_blades" },
  },
  {
    category: "OwnHero",
    npcHeroName: "templar_assassin",
    audioFile: "ownHero/TemplarAssassin_6_TrapVision",
    messageTime: 6 * 60 + 15,
    repeatTime: 12 * 60,
    textMessage:
      "Psionic Traps provide vision, so place them on rune spots, Roshpit and other strategic spots.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "templar_assassin_psionic_trap" },
  },
  {
    category: "OwnHero",
    npcHeroName: "templar_assassin",
    audioFile: "ownHero/TemplarAssassin_7_TrapStacking",
    messageTime: [6 * 60 + 30, 8 * 60 + 30],
    textMessage:
      "You can stack with Psionic Traps but you need to be within the aggro range of neutral creeps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "templar_assassin_psionic_trap" },
  },
  {
    category: "OwnHero",
    npcHeroName: "templar_assassin",
    audioFile: "ownHero/TemplarAssassin_8_DontRotate",
    messageTime: [6 * 60 + 45, 9 * 60 + 45],
    textMessage:
      "Don't rotate unnecessarily. Focus on hitting your item timings and pressure opponents' tower.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "templar_assassin",
    audioFile: "ownHero/TemplarAssassin_9_Burst",
    messageTime: 11 * 60 + 15,
    textMessage:
      "Focus on bursting squishy backliners and supports, especially with Blink Dagger.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "templar_assassin",
    audioFile: "ownHero/TemplarAssassin_10_Roshan",
    messageTime: 15 * 60 + 15,
    textMessage:
      "Templar Assassin is great at taking Roshan early, Look for opportunities to rosh once you have desolator. ",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "templar_assassin",
    audioFile: "enemyHero/TemplarAssassin_1_Refraction",
    messageTime: -60,
    textMessage:
      "Damage over time spells and items are great at removing Templar's Refraction charges.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "templar_assassin",
    audioFile: "enemyHero/TemplarAssassin_2_PsiBlade",
    messageTime: -50,
    textMessage:
      "To dodge Templar's Psi Blade, play on your hero's max range and on the same side of the lane as Templar.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "templar_assassin",
    audioFile: "enemyHero/TemplarAssassin_3_GankEarlyGame",
    messageTime: 7 * 60,
    textMessage:
      "Templar assassin struggles against well coordinated ganks in the early game before her traps are online.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "templar_assassin",
    audioFile: "enemyHero/TemplarAssassin_4_PsionicTrap",
    messageTime: 5 * 60 + 10,
    textMessage:
      "Make sure to have sentry on the lane against Templar's Psionic Trap.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "templar_assassin",
    audioFile: "enemyHero/TemplarAssassin_5_ContestAncients",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Templar Assassin tends to stack and farm ancients early on. Block the camp or contest her.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "templar_assassin",
    audioFile: "enemyHero/TemplarAssassin_6_CarryDetection",
    messageTime: [10 * 60 + 20, 18 * 60 + 20, 26 * 60 + 20],
    textMessage: "Carry detection on multiple heroes against Templar.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "templar_assassin",
    audioFile: "enemyHero/TemplarAssassin_7_TowerDefense",
    messageTime: [12 * 60, 22 * 60, 32 * 60],
    textMessage:
      "Templar Assassin takes down buildings fast with Desolator. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "templar_assassin",
    audioFile: "enemyHero/TemplarAssassin_8_CounterItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Armor items, Ghost Scepter and Heaven's Halberd are great against Templar Assassin.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "templar_assassin",
    audioFile: "enemyHero/TemplarAssassin_9_DesolatorBlink",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Be aware of Templar Assassin's Desolator and Blink Dagger timing. She can solo kill most heroes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "templar_assassin",
    audioFile: "enemyHero/TemplarAssassin_10_Roshan",
    messageTime: [15 * 60 + 10, 20 * 60 + 10, 25 * 60 + 10],
    textMessage:
      "Templar Assassin is able to take Roshan early on. Ward and check Roshan.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "templar_assassin",
    audioFile: "enemyHero/TemplarAssassin_11_RoshpitPsionicTrap",
    messageTime: [15 * 60 + 20, 25 * 60 + 20, 35 * 60 + 20],
    textMessage: "Check the Roshpit for Psionic Trap before taking Roshan.",
    audience: [Audience.ALL],
  },

  // 101. Terrorblade
  {
    category: "OwnHero",
    npcHeroName: "terrorblade",
    audioFile: "ownHero/Terrorblade_1_ReflectionHarass",
    messageTime: 10,
    textMessage:
      "Use your reflection when your support is harrasing the opponents or in combination with Metamorphosis to inflict greater damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "terrorblade_reflection" },
  },
  {
    category: "OwnHero",
    npcHeroName: "terrorblade",
    audioFile: "ownHero/Terrorblade_2_MetamorphosisFarming",
    messageTime: 20,
    textMessage:
      "Feel free to pop Metamorphosis to give yourself an easier time lasthitting for two waves, Try to harras your opponent and deny they're creeps.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "terrorblade_metamorphosis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "terrorblade",
    audioFile: "ownHero/Terrorblade_0_Metamorphosis",
    messageTime: 1 * 60,
    textMessage:
      "Make sure you have 2 levels in metamorphosis before your second use of it in lane.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "terrorblade_metamorphosis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "terrorblade",
    audioFile: "ownHero/Terrorblade_3_StayHealthy",
    messageTime: [2 * 60 + 45, 8 * 60 + 45],
    textMessage:
      "Stay healthy as illusions will inherit your hero's current health.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "terrorblade_conjure_image" },
  },
  {
    category: "OwnHero",
    npcHeroName: "terrorblade",
    audioFile: "ownHero/Terrorblade_4_DontOverlane",
    messageTime: 7 * 60 + 15,
    textMessage:
      "Don't overlane. Consider moving to the jungle when laning opponents are about to hit level 6.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "terrorblade",
    audioFile: "ownHero/Terrorblade_5_InTrouble",
    messageTime: [7 * 60 + 45, 17 * 60 + 45],
    textMessage:
      "You can also Sunder an ally or illusion when in trouble. You can body block an opponent with illusions as well.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "terrorblade_sunder" },
  },
  {
    category: "OwnHero",
    npcHeroName: "terrorblade",
    audioFile: "ownHero/Terrorblade_6_IllusionUsage",
    messageTime: [7 * 60 + 45, 17 * 60 + 45],
    textMessage:
      "Farm dangerous areas with illusions, control runes and provide vision when opponents are missing.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "terrorblade_conjure_image" },
  },
  {
    category: "OwnHero",
    npcHeroName: "terrorblade",
    audioFile: "ownHero/Terrorblade_7_MetamorphosisInFights",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Pop Metamorphosis only when opponents are committed to the fight. It can get kited if you pop it too early.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "terrorblade_metamorphosis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "terrorblade",
    audioFile: "ownHero/Terrorblade_8_PushSidelanes",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Push out sidelines and farm opponents' jungle with illusions when not much is happening around the map.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "terrorblade_conjure_image" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "terrorblade",
    audioFile: "enemyHero/Terrorblade_1_PressureEarly",
    messageTime: -60,
    textMessage:
      "Terrorblade has high armor, but low HP and is weak against magical damage. Pressure him early on.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "terrorblade",
    audioFile: "enemyHero/Terrorblade_2_Metamorphosis",
    messageTime: [-50, 15 * 60 + 10, 25 * 60 + 10],
    textMessage:
      "Terrorblade is strong when he has Metamorphosis on. Look to escape and fight afterwards.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "terrorblade",
    audioFile: "enemyHero/Terrorblade_3_ConjurImage",
    messageTime: -40,
    textMessage: "Hexes, drains and Dagon destroy Conjure Images instantly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "terrorblade",
    audioFile: "enemyHero/Terrorblade_4_Sunder",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "If you are high on HP, avoid staying close to Terrorblade when he is low as he will Sunder you.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "terrorblade",
    audioFile: "enemyHero/Terrorblade_5_ContestFarm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Terrorblade farms quickly with Conjure Image. Smoke on him, place deep wards and sentry off camps.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "terrorblade",
    audioFile: "enemyHero/Terrorblade_6_AntiillusionItems",
    messageTime: 12 * 60,
    textMessage:
      "Items that provide AoE damage, especially magical damage, are great at dealing with Conjure Image.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "terrorblade",
    audioFile: "enemyHero/Terrorblade_7_CrimsonGuard",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard and armor items are great against Terrorblade's physical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "terrorblade",
    audioFile: "enemyHero/Terrorblade_8_AntisunderItems",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Black King Bar, Linken's sphere or a well timed Lotus Orb prevent you from being Sundered.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "terrorblade",
    audioFile: "enemyHero/Terrorblade_9_BootsOfTravel",
    messageTime: 12 * 60 + 30,
    textMessage:
      "Terrorblade is great at split-pushing and ratting. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },

  // 102. Tidehunter
  {
    category: "OwnHero",
    npcHeroName: "tidehunter",
    audioFile: "ownHero/Tidehunter_1_SecureLasthits",
    messageTime: 15,
    textMessage:
      "Use Anchor Smash to secure last hits and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tidehunter_anchor_smash" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tidehunter",
    audioFile: "ownHero/Tidehunter_2_ToughLane",
    messageTime: 75,
    textMessage:
      "The tougher the lane, the more points in Kraken Shell are needed.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "tidehunter_kraken_shell" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tidehunter",
    audioFile: "ownHero/Tidehunter_3_AntimagicItem",
    messageTime: [4 * 60, 8 * 60],
    textMessage: `Tidehunter is resilient against right clicks due to Kraken Shell. Typically you need a magic resistance item such as Mage Slayer, Pipe, or BKB.`,
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "hood_of_defiance" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tidehunter",
    audioFile: "ownHero/Tidehunter_4_Blink",
    messageTime: 11 * 60 + 15,
    textMessage:
      "Once you have Blink Dagger, make use of it before opponents are able to see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tidehunter",
    audioFile: "ownHero/Tidehunter_5_InitiationCheck",
    messageTime: 11 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Before initiating, make sure that your follow-up damage dealers are close enough and in position.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "tidehunter",
    audioFile: "enemyHero/Tidehunter_1_MagicStickWand",
    messageTime: -60,
    textMessage:
      "Tidehunter uses Anchor Smash frequently. Magic Stick and Wand will be charged up.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tidehunter",
    audioFile: "enemyHero/Tidehunter_2_AnchorSmash",
    messageTime: -50,
    textMessage:
      "Avoid being hit by Anchor Smash as you'll have decreased damage for last hitting or to fight back.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tidehunter",
    audioFile: "enemyHero/Tidehunter_3_KrakenShell",
    messageTime: 30,
    textMessage:
      "Only use dispellable spells or items on Tidehunter at the start of a fight or after Kraken Shell has procced.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tidehunter",
    audioFile: "enemyHero/Tidehunter_4_Ravage",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Tidehunter's Ravage has a long cooldown. Look to fight when it is down.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tidehunter",
    audioFile: "enemyHero/Tidehunter_5_BlinkDagger",
    messageTime: 12 * 60,
    textMessage:
      "Be aware of Tidehunter's Blink Dagger timing. Look to cancel it in the fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tidehunter",
    audioFile: "enemyHero/Tidehunter_6_BlackKingBar",
    messageTime: 12 * 60 + 10,
    textMessage: "Black King Bar will make you immune to Tidehunter's Ravage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tidehunter",
    audioFile: "enemyHero/Tidehunter_7_Break",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Break effects are great at removing Kraken Shell which makes Tidehunter much weaker.",
    audience: [Audience.ALL],
  },

  // 103. Timbersaw
  {
    category: "OwnHero",
    npcHeroName: "shredder",
    audioFile: "ownHero/Timbersaw_1_SecureLasthits",
    messageTime: 10,
    textMessage:
      "Use Whirling Death to secure last hits, harass opponents and at the same time cut some trees with it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shredder_whirling_death" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shredder",
    audioFile: "ownHero/Timbersaw_2_ToughLane",
    messageTime: 20,
    textMessage:
      "Consider putting a point in the Timber Chain early on tough lanes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shredder_timber_chain" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shredder",
    audioFile: "ownHero/Timbersaw_3_ArmorStacks",
    messageTime: [40, 7 * 60 + 10, 13 * 60 + 10],
    textMessage:
      "Keep Reactive Armor stacks high to be able to play aggressively and not fear for your life.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shredder_reactive_armor" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shredder",
    audioFile: "ownHero/Timbersaw_4_CheckSticks",
    messageTime: 3 * 60 + 45,
    textMessage:
      "Check how many stick charges opponents have when you are going for a kill.",
    audience: [Audience.ALL],
    image: { type: "item", name: "magic_stick" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shredder",
    audioFile: "ownHero/Timbersaw_5_TankTower",
    messageTime: [5 * 60 + 10, 10 * 60 + 10],
    textMessage: "Consider tanking tower shots to keep the catapult alive.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shredder_reactive_armor" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shredder",
    audioFile: "ownHero/Timbersaw_6_AvoidRotating",
    messageTime: [6 * 60 + 10, 12 * 60 + 10],
    textMessage:
      "Timbersaw isn't the best at rotating. You'd rather force opponents to come to you by playing aggressively.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shredder_reactive_armor" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shredder",
    audioFile: "ownHero/Timbersaw_7_DefendTowers",
    messageTime: [9 * 60 + 15, 14 * 60 + 15],
    textMessage:
      "Consider parking yourself in front of the tower opponents are looking to destroy. Build up armor stacks though.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "shredder_reactive_armor" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shredder",
    audioFile: "ownHero/Timbersaw_8_CounterItems",
    messageTime: [9 * 60 + 45, 14 * 60 + 45, 19 * 60 + 45],
    textMessage:
      "Items that reduce healing and break effects are a big problem. Itemize against them and adjust playstyle.",
    audience: [Audience.ALL],
    image: { type: "item", name: "spirit_vessel" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shredder",
    audioFile: "ownHero/Timbersaw_9_CounterItems",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines even out of vision if necessary.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "shredder_chakram" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shredder",
    audioFile: "ownHero/Timbersaw_10_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanims Shard later in the game as it improves DPS and provides much needed building damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "shredder",
    audioFile: "ownHero/Timbersaw_11_NoToLategame",
    messageTime: [22 * 60, 27 * 60],
    textMessage:
      `You do not necessarily want to go to late game, so try to close out the game before you fall off.`,
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "shredder",
    audioFile: "enemyHero/Timbersaw_1_SpiritVessel",
    messageTime: -60,
    textMessage:
      "One player should buy Spirit Vessel against Timbersaw's reactive armor",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shredder",
    audioFile: "enemyHero/Timbersaw_2_ReactiveArmor",
    messageTime: 30,
    textMessage:
      "Play agressively against Timbersaw before he reaches level 3, or only when his reactive armor stacks are low, otherwise avoid fighting him",
    chatMessage:
      "Play agressively against Timbersaw before he reaches level 3 or only when his reactive armor stacks are low",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shredder",
    audioFile: "enemyHero/Timbersaw_3_Trees",
    messageTime: 1 * 60 + 30,
    textMessage: "Stay away from trees against Timbersaw",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shredder",
    audioFile: "enemyHero/Timbersaw_4_AvoidLane",
    messageTime: 8 * 60,
    textMessage:
      "Timbersaw is strongest between 8 and 20 minutes, so avoid contesting him on the lane and try to pressure other lanes and heroes instead",
    chatMessage:
      "Timbersaw is strongest between 8 and 20 minutes, pressure other lanes and heroes",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "shredder",
    audioFile: "enemyHero/Timbersaw_5_SilverEdge",
    messageTime: 10 * 60,
    textMessage:
      "Buy Silver Edge against Timbersaw's reactive armor, if you need an additional item to deal with him",
    audience: [Audience.ALL],
  },

  // 104. Tinker
  {
    category: "OwnHero",
    npcHeroName: "tinker",
    audioFile: "ownHero/Tinker_1_SecureRanged",
    messageTime: 15,
    textMessage: `You can use Laser to blind the enemy hero and secure or deny creeps while your opponent cannot do any right click damage.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_laser" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tinker",
    audioFile: `ownHero/Tinker_2_LaserHarass`,
    messageTime: 30,
    textMessage:
      `If the enemy laner does not have great HP regeneration, you can whittle them down with Laser spam along with right clicks and March of the Machines.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `tinker_laser` },
  },
  {
    category: "OwnHero",
    npcHeroName: "tinker",
    audioFile: "ownHero/Tinker_3_Stacks",
    messageTime: [3 * 60 + 30, 6 * 60 + 30],
    textMessage:
      `Ask your teammates to stack and make some yourself. You can clear multiple jungle camps and ancients with March of the Machines.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `tinker_march_of_the_machines` },
  },
  {
    category: "OwnHero",
    npcHeroName: "tinker",
    audioFile: "ownHero/Tinker_4_LookAround",
    messageTime: [6 * 60 + 30, 12 * 60 + 30, 18 * 60 + 30],
    textMessage:
      "Look around the map to join fights or gank. Be careful not to expose yourself, especially before Blink Dagger.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_keen_teleport" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tinker",
    audioFile: "ownHero/Tinker_5_FarmBlink",
    messageTime: 7 * 60 + 45,
    textMessage:
      "Take your time and farm Blink Dagger as it greatly improves your survivability and kill potential.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tinker",
    audioFile: "ownHero/Tinker_6_DefenseMatrix",
    messageTime: [9 * 60 + 45, 19 * 60 + 45, 29 * 60 + 45],
    textMessage:
      "Make sure to apply Defense Matrix on yourself before teleporting out of the base.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_defense_matrix" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tinker",
    audioFile: "ownHero/Tinker_7_CantJoin",
    messageTime: [10 * 60 + 15, 17 * 60 + 15],
    textMessage:
      "Alert your teammates to not fight at places where you cannot join them quickly.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_keen_teleport" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tinker",
    audioFile: "ownHero/Tinker_8_Runes",
    messageTime: [11 * 60 + 45, 17 * 60 + 45, 23 * 60 + 45],
    textMessage:
      "Look for arcane and regeneration runes as you'll be able to pump in so much more damage in the fights.",
    audience: [Audience.ALL],
    image: { type: "rune", name: "arcane" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tinker",
    audioFile: "ownHero/Tinker_9_Vision",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      `Fight under your vision to position yourself in a safe spot for the Laser and March of the Machines spam. You can even place the wards yourself.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tinker",
    audioFile: "ownHero/Tinker_10_AvoidTinkerWards",
    messageTime: 14 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid trapping yourself in tree lines where the enemy team might have an observer ward on a cliff.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tinker",
    audioFile: "ownHero/Tinker_11_SmokeYourself",
    messageTime: 15 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "You can smoke yourself here and there as another layer of protection in the fights.",
    audience: [Audience.ALL],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tinker",
    audioFile: "ownHero/Tinker_12_KeepBuyback",
    messageTime: 15 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "Keep buyback available as you can rejoin the fights almost instantly.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tinker_keen_teleport" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tinker",
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
    npcHeroName: "tinker",
    audioFile: "enemyHero/Tinker_1_TranquilBoots",
    messageTime: -60,
    textMessage:
      "Tranquil Boots are great against Tinker as they don't break by his magical damage.",
    audience: [Audience.ALL],
  },
  // Added "midlane" in next textMessage as Tinker can be played as a support as well
  {
    category: "EnemyHero",
    npcHeroName: "tinker",
    audioFile: "enemyHero/Tinker_2_GankEarly",
    messageTime: 3 * 60 + 30,
    textMessage:
      "Look to gank midlane Tinker early on as he doesn't have an escape.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tinker",
    audioFile: "enemyHero/Tinker_11_Contest farm",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Tinker tends to make a lot of stacks in the jungle. Contest them or sentry off camps.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "tinker",
    audioFile: "enemyHero/Tinker_3_DefenseMatrix",
    messageTime: 4 * 60 + 30,
    textMessage:
      "Avoid using long lasting disables and debuffs on a hero shielded with Defense Matrix due to its high status resistance.",
    chatMessage:
      "Avoid using long lasting disables and debuffs on hero shielded by Defense Matrix.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "tinker",
    audioFile: "enemyHero/Tinker_4_Focus",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Tinker in fights as he's squishy but does insane amounts of damage.",
    audience: [Audience.ALL],
  },
  // Removed Boots of Travel from textMessage as Tinker doesn't need them anymore
  {
    category: "EnemyHero",
    npcHeroName: "tinker",
    audioFile: "enemyHero/Tinker_5_ItemTimings",
    messageTime: 12 * 60,
    textMessage: "Be aware of Tinker's Blink Dagger timing.",
    audience: [Audience.ALL],
  },
  /* {
    category: "EnemyHero",
    npcHeroName: "tinker",
    audioFile: "enemyHero/Tinker_6_AvoidTrees",
    messageTime: 12 * 60 + 10,
    textMessage:
      "You can dodge Tinker's Heat-Seeking Missile by using Smoke of Deceit or blinking away.",
    audience: [Audience.ALL],
  }, */
  {
    category: "EnemyHero",
    npcHeroName: "tinker",
    audioFile: "enemyHero/Tinker_7_AntispellItems",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Magic resistance items, Black King Bar or a well timed Lotus Orb are great against Tinker.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tinker",
    audioFile: "enemyHero/Tinker_8_GapClosingItems",
    messageTime: 12 * 60 + 30,
    textMessage: "Gap closing items are great at getting on top of Tinker.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tinker",
    audioFile: "enemyHero/Tinker_9_BootsOfTravel",
    messageTime: 12 * 60 + 40,
    textMessage:
      "Tinker is great at split-pushing. Consider getting Boots of Travel on a core.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tinker",
    audioFile: "enemyHero/Tinker_10_TinkerWards",
    messageTime: [15 * 60 + 10, 25 * 60, 35 * 60],
    textMessage:
      "Place Tinker wards at the outer jungles of the map. Consider camping those spots under the ward.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tinker",
    audioFile: "enemyHero/Tinker_11_FightOutsideBase",
    messageTime: [25 * 60 + 10, 35 * 60 + 10, 45 * 60 + 10],
    textMessage:
      "It is really hard to push highground against Tinker. Be patient and take fights outside the base.",
    audience: [Audience.ALL],
  },
  {
    category: `EnemyHero`,
    npcHeroName: `tinker`,
    audioFile: `enemyHero/Tinker_12_DisableAfterShield`,
    messageTime: [21 * 60 + 10, 31 * 60 + 10, 41 * 60 + 10, 51 * 60 + 10],
    textMessage:
      `Against the Translocator facet, try to disable Tinker only after you break through his Defense Matrix as he gets a strong dispel when the shield expires.`,
    audience: [Audience.ALL],
  },

  // 105. Tiny
  {
    category: "OwnHero",
    npcHeroName: "tiny",
    audioFile: "ownHero/Tiny_1_TossBack",
    messageTime: 15,
    textMessage:
      "Keep creep equilibrium close to your tower so you can do toss-back plays.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "tiny_toss" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tiny",
    audioFile: "ownHero/Tiny_2_CourierToss",
    messageTime: [30, 15 * 60 + 30],
    textMessage: "Tree toss can kill couriers.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tiny_tree_grab" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tiny",
    audioFile: "ownHero/Tiny_3_SecureLasthits",
    messageTime: 45,
    textMessage:
      "Use Avalanche or Tree Toss to secure last hits and harass opponents here and there.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tiny_avalanche" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tiny",
    audioFile: "ownHero/Tiny_4_SaveAlly",
    messageTime: [90, 11 * 60 + 30, 22 * 60 + 30],
    textMessage:
      "You can save an ally with Toss, especially once you have a Blink Dagger.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tiny_toss" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tiny",
    audioFile: "ownHero/Tiny_5_Stacks",
    messageTime: [4 * 60 + 30, 8 * 60 + 30],
    textMessage:
      "Alert your teammates to stack for you as you can clear those fairly early.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "tiny_tree_grab" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tiny",
    audioFile: "ownHero/Tiny_6_Blink",
    messageTime: 11 * 60 + 30,
    textMessage:
      "Once you have Blink Dagger, make use of it before opponents are able to see it in your inventory.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tiny",
    audioFile: "ownHero/Tiny_7_ComboChill1",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "In teamfights, you want to do blink into spells combo and then chill until cooldowns are ready.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tiny",
    audioFile: "ownHero/Tiny_8_ComboChill2",
    messageTime: 12 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Be quick at going for buildings when you get a pick off or win a fight. Tiny destroys buildings really fast.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "tiny_tree_grab" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tiny",
    audioFile: "ownHero/Tiny_9_PushSidelanes",
    messageTime: 12 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines with your spells.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tiny_avalanche" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tiny",
    audioFile: "ownHero/Tiny_11_TreeVolleyUsage",
    messageTime: 21 * 60 + 45,
    textMessage: `Once you have Aghanims Scepter, you can play in tree lines and start fights with Tree Volley instead of the Avalanche-Toss combo.`,
    audience: [Audience.ROLE_MID],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "tiny",
    audioFile: "enemyHero/Tiny_1_NoArmor",
    messageTime: -60,
    textMessage:
      "Tiny starts with 0 armor. Harass him with physical damage as much as you can.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tiny",
    audioFile: "enemyHero/Tiny_2_Toss",
    messageTime: -50,
    textMessage:
      "Toss is Tiny's main setup spell. Keep distance or play in creep wave to prevent easy Tosses.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tiny",
    audioFile: "enemyHero/Tiny_3_TossUnderTower",
    messageTime: -40,
    textMessage:
      "Avoid playing close to the opponent's tower as you can get Tossed underneath it by Tiny.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tiny",
    audioFile: "enemyHero/Tiny_4_Combo",
    messageTime: 3 * 60 + 30,
    textMessage:
      "Avalanche into Toss combo does a lot of magical damage. Get Infused Raindrops or a Cloak.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tiny",
    audioFile: "enemyHero/Tiny_5_BlinkDagger",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Be aware of Tiny's Blink Dagger timing. Cancel it in the fights.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tiny",
    audioFile: "enemyHero/Tiny_6_MagicResistance",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance items are great against Tiny's magical burst.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tiny",
    audioFile: "enemyHero/Tiny_7_TowerDefense",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Tiny takes down buildings fast with Tree Grab and Toss. Organize defense quickly.",
    audience: [Audience.ALL],
  },

  // 106. Treant Protector
  {
    category: "OwnHero",
    npcHeroName: "treant",
    audioFile: "ownHero/TreantProtector_1_BaseDamage",
    messageTime: 10,
    textMessage:
      "Treant has the highest base damage in the game at level 1 so make use of it to harass and deny.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "treant",
    audioFile: "ownHero/TreantProtector_2_CutOff",
    messageTime: 20,
    textMessage:
      "Look for angles to cut off opponents with Nature's Grasp. Make sure to catch a tree in its path.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_natures_grasp" },
  },
  {
    category: "OwnHero",
    npcHeroName: "treant",
    audioFile: "ownHero/TreantProtector_3_HealStill",
    messageTime: 60,
    textMessage:
      "Leech Seed continues healing even after the unit it was used on dies.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_leech_seed" },
  },
  {
    category: "OwnHero",
    npcHeroName: "treant",
    audioFile: "ownHero/TreantProtector_4_LookAround",
    messageTime: 2 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Look around the map to heal and save allies and buildings with Living Armor.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_living_armor" },
  },
  {
    category: "OwnHero",
    npcHeroName: "treant",
    audioFile: "ownHero/TreantProtector_5_DefendTowers",
    messageTime: [5 * 60 + 45, 15 * 60 + 45],
    textMessage:
      "Treant is great at defending towers safely with Nature's Grasp and Living Armor.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_living_armor" },
  },
  {
    category: "OwnHero",
    npcHeroName: "treant",
    audioFile: "ownHero/TreantProtector_6_DelayOvergrowth",
    messageTime: 12 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "Don't rush with Overgrowth in the fights as opponents are likely to have multiple ways to dispel it at the start.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_overgrowth" },
  },
  {
    category: "OwnHero",
    npcHeroName: "treant",
    audioFile: "ownHero/TreantProtector_7_Splitpush",
    messageTime: 13 * 60,
    repeatTime: 10 * 60,
    textMessage: `Treant is amazing at split pushing without even showing himself. Go ham on it when not much is happening.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_natures_grasp" },
  },
  {
    category: "OwnHero",
    npcHeroName: "treant",
    audioFile: "ownHero/TreantProtector_8_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage: `Pick up Aghanims Shard around minute 15 to become invisible near trees and lockdown enemy heroes and creeps on attack.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "treant",
    audioFile: "ownHero/TreantProtector_9_AghanimsScepter",
    messageTime: [25 * 60, 32 * 60],
    textMessage:
      "Aghanim's Scepter will win a vision game for your team in the late game.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "treant",
    audioFile: "ownHero/TreantProtector_10_ConnectTreeLines",
    messageTime: 20 * 60,
    textMessage: `With your Aghanims Shard, you can use Natures Grasp to connect between Tree Lines and stay invisible.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "treant_natures_grasp" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "treant",
    audioFile: "enemyHero/TreantProtector_1_QuellTrees",
    messageTime: -60,
    textMessage:
      "Quell trees in the lane so you can keep track of Treant Protector and stop Nature's Guise.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "treant",
    audioFile: "enemyHero/TreantProtector_2_KeepDistance",
    messageTime: -50,
    textMessage:
      "Keep distance from Treant Protector as he has the highest base damage in the game.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "treant",
    audioFile: "enemyHero/TreantProtector_3_TakeTowers",
    messageTime: [5 * 60 + 30, 15 * 60 + 30, 25 * 60 + 30],
    textMessage:
      "Take towers down in one go so Treant Protector can't heal them with Living Armor.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "treant",
    audioFile: "enemyHero/TreantProtector_4_MeteorHammer",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Be aware of Treant Protector's Meteor Hammer timing. He becomes good at splitpushing.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "treant",
    audioFile: "enemyHero/TreantProtector_5_Invisible",
    messageTime: 15 * 60 + 30,
    textMessage:
      "Treant Protector becomes invisible with his aghanims shard upgrade. Carry detection on multiple heroes.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "treant",
    audioFile: "enemyHero/TreantProtector_6_ObserverSentry",
    messageTime: [12 * 60 + 10, 20 * 60 + 20, 28 * 60 + 10],
    textMessage:
      "Observers and sentries at the outer jungles of the map are great at stopping Treant from splitpushing.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "treant",
    audioFile: "enemyHero/TreantProtector_7_DispelItems",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Items that apply dispel on you, are great against Treant's Overgrowth and Leech Seed.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "treant",
    audioFile: "enemyHero/TreantProtector_8_AghanimsScepter",
    messageTime: 20 * 60 + 10,
    textMessage:
      "Once Treant gets Aghanim's Scepter consider getting a Gem and cut Eyes in the Forest.",
    audience: [Audience.ALL],
  },

  // 107. Troll Warlord
  {
    category: "OwnHero",
    npcHeroName: "troll_warlord",
    audioFile: "ownHero/TrollWarlord_1_SecuredRanged",
    messageTime: 15,
    textMessage:
      "Use Whirling Axes to secure ranged creep lasthits and harass the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "troll_warlord_whirling_axes_ranged" },
  },
  {
    category: "OwnHero",
    npcHeroName: "troll_warlord",
    audioFile: "ownHero/TrollWarlord_2_DontSwitch",
    messageTime: 4 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid switching targets in engagements as you'll lose Fervor stacks.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "troll_warlord_fervor" },
  },
  {
    category: "OwnHero",
    npcHeroName: "troll_warlord",
    audioFile: "ownHero/TrollWarlord_3_NotEarly",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Avoid popping Battle Trance too early in fights as you might get kited. Use it later, on disabled unit or defensively.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "troll_warlord_battle_trance" },
  },
  {
    category: "OwnHero",
    npcHeroName: "troll_warlord",
    audioFile: "ownHero/TrollWarlord_4_Roshan",
    messageTime: [14 * 60 + 45, 18 * 60 + 45],
    textMessage:
      "Troll can take Roshan early on even by himself. Use Battle Trance if necessary to heal up.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "troll_warlord",
    audioFile: "ownHero/TrollWarlord_5_Antikiting",
    messageTime: [15 * 60, 22 * 60],
    textMessage:
      "Consider purchasing anti-kiting items so you can stick to the target and not waste Battle Trance.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "troll_warlord",
    audioFile: "ownHero/TrollWarlord_5_Antikiting",
    messageTime: [20 * 60],
    textMessage:
      "Consider aghanims shard around 20-30 minute mark to make your team stronger.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "troll_warlord",
    audioFile: "enemyHero/TrollWarlord_1_ExtraConsumables",
    messageTime: -60,
    textMessage:
      "Troll Warlord is a strong laner. Buy extra healing items and take good trades.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "troll_warlord",
    audioFile: "enemyHero/TrollWarlord_2_BattleTranceKite",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Avoid Troll when Battle Trance is on. Don't allow him to heal by hitting you.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "troll_warlord",
    audioFile: "enemyHero/TrollWarlord_3_BattleTranceDispel",
    messageTime: 9 * 60 + 10,
    textMessage:
      "Battle Trance applies basic dispel on Troll. Use dispellable spells and items afterwards.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "troll_warlord",
    audioFile: "enemyHero/TrollWarlord_4_KitingItems",
    messageTime: 10 * 60,
    textMessage:
      "Item's like euls and ghost scepter are really good at kiting Troll Warlord and battle trance.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "EnemyHero",
    npcHeroName: "troll_warlord",
    audioFile: "enemyHero/TrollWarlord_5_TowerDefense",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Troll Warlord takes down buildings fast with Fervor. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "troll_warlord",
    audioFile: "enemyHero/TrollWarlord_6_AntievasionItems",
    messageTime: 13 * 60,
    textMessage:
      "Items that pierce evasion are good against Troll's Whirling Axes (relevant for Melee heroes).",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "troll_warlord",
    audioFile: "enemyHero/TrollWarlord_7_Roshan",
    messageTime: [15 * 60 + 10, 25 * 60, 35 * 60],
    textMessage:
      "Troll Warlord is able to take Roshan early on. Ward and check Roshan.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "troll_warlord",
    audioFile: "enemyHero/TrollWarlord_8_AghanimsScepter",
    messageTime: 23 * 60,
    textMessage:
      "Aghanim's Scepter makes Troll's Whirling Axes apply basic dispel on him and opponents.",
    audience: [Audience.ALL],
  },

  // 108. Tusk
  {
    category: "OwnHero",
    npcHeroName: "tusk",
    audioFile: "ownHero/Tusk_1_ShardSetup",
    messageTime: 30,
    textMessage:
      "Most of your laning kills will come from well placed Ice Shards. Constantly look for opponents out of position.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tusk_ice_shards" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tusk",
    audioFile: "ownHero/Tusk_2_InTrouble1",
    messageTime: [90, 11 * 60 + 30],
    textMessage:
      "When you or your allies are in trouble, you can do a Snowball save or Ice Shard the opponents away.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tusk_snowball" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tusk",
    audioFile: "ownHero/Tusk_3_InTrouble2",
    messageTime: [4 * 60, 14 * 60],
    textMessage: `Ice Shards provide vision so you can use them to scout pillars for wards or Roshan pit.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "tusk_ice_shards" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tusk",
    audioFile: "ownHero/Tusk_4_MaxPunch",
    messageTime: [4 * 60, 14 * 60],
    textMessage:
      "Pop Tag Team before using Walrus Punch to maximize on damage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tusk_tag_team" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tusk",
    audioFile: "ownHero/Tusk_5_BlinkSnowball1",
    messageTime: [4 * 60, 14 * 60],
    textMessage: `Once you get a Blink Dagger, you want to use Snowball primarily to save an ally.`,
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tusk",
    audioFile: "ownHero/Tusk_6_BlinkSnowball2",
    messageTime: [14 * 60 + 30, 19 * 60 + 30],
    textMessage:
      "Tuskar enables the team to take an early Roshan due to the Tag Team.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "tusk_tag_team" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tusk",
    audioFile: "ownHero/Tusk_7_AghanimsScepter",
    messageTime: [24 * 60 + 30, 29 * 60 + 30],
    textMessage:
      "Pick up Aghanims Scepter as it is an amazing repositioning and kiting tool.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "tusk",
    audioFile: "ownHero/Tusk_8_SpellsDuringSnowball",
    messageTime: [6 * 60 + 30, 11 * 60 + 30, 21 * 60 + 30, 31 * 60 + 30],
    textMessage:
      "You can use both Tag Team and Ice Shard while Snowballed. Particularly helps in stopping enemy heroes fleeing from Snowball.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "tusk",
    audioFile: "enemyHero/Tusk_1_MovementSpeedItems",
    messageTime: -60,
    textMessage: "Movement speed items are great against Tusk's spells.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tusk",
    audioFile: "enemyHero/Tusk_2_ObserverWard",
    messageTime: -50,
    textMessage:
      "Bring an Observer Ward to lane to keep an eye on Tusk's aggressive movements.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tusk",
    audioFile: "enemyHero/Tusk_3_TagTeam",
    messageTime: -40,
    textMessage:
      "Keep distance from Tusk because Tag Team does extra damage on every hit.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tusk",
    audioFile: "enemyHero/Tusk_4_Roam",
    messageTime: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Tusk roams a lot. Keep an eye on his movements and be ready to help.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tusk",
    audioFile: "enemyHero/Tusk_5_BlinkDagger",
    messageTime: 12 * 60,
    textMessage:
      "Be aware of Tusk's Blink Dagger timing as he can easily save his allies with Snowball.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "tusk",
    audioFile: "enemyHero/Tusk_6_ForeStaff",
    messageTime: 12 * 60 + 10,
    textMessage: "Force Staff and Hurricane Pike are great against Tusk.",
    audience: [Audience.ALL],
  },

  // 109. Underlord
  {
    category: "OwnHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "ownHero/Underlord_1_Outlasthit",
    messageTime: 15,
    textMessage:
      "Capitalize on attack damage difference to win the lane last hit wise.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_atrophy_aura" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "ownHero/Underlord_2_AccelerateFarm",
    messageTime: 5 * 60,
    textMessage:
      "Once you have 3 points in Firestorm, consider Firestorming creep waves and farming neutrals afterwards.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "abyssal_underlord_firestorm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "ownHero/Underlord_3_ReplenishRift",
    messageTime: 7 * 60,
    textMessage:
      "Feel free to use Fiends Gate to replenish mana and hp during laning stage.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_dark_portal" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "ownHero/Underlord_4_DefendTowers",
    messageTime: [8 * 60, 14 * 60],
    textMessage:
      "Underlord is amazing at safely defending the towers. Your other cores can split push in the meantime.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_firestorm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "ownHero/Underlord_5_Combo",
    messageTime: [10 * 60, 16 * 60],
    textMessage:
      "Full combo would be: Firestorm, Pit of Malice, Rod of Atos into right-clicks. Adjust based on situation.",
    audience: [Audience.ALL],
    image: { type: "item", name: "rod_of_atos" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "ownHero/Underlord_6_FirestormCarefully",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Place Firestorm carefully in the fights and you might end up being highest damage dealer in the team.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_firestorm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "ownHero/Underlord_7_RiftImmediately",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Begin channeling Fiends Gate on a first sign of trouble. You can always come back if the situation improves.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_dark_portal" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "ownHero/Underlord_8_ObjectiveDamage",
    messageTime: [11 * 60, 18 * 60],
    textMessage:
      "If you win the teamfight and survive, you will have a lot of damage to take towers or Roshan down.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "abyssal_underlord_atrophy_aura" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "ownHero/Underlord_9_ObjectiveRift",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Consider using Fiends Gate to bring your team closer to objectives after pick-off or won fight.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_dark_portal" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "ownHero/Underlord_10_Splitpush1",
    messageTime: 11 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, you can easily split push with Firestorm without showing yourself.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_firestorm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "ownHero/Underlord_11_Splitpush2",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Purchase Aghanims Shard upgrade later in the game as it improves your overall damage output greatly.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "ownHero/Underlord_12_FirestormScaling",
    messageTime: 25 * 60,
    textMessage:
      "Firestorm scales well into late game due to percentage damage, shard upgrade and talents to enhance it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "abyssal_underlord_firestorm" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "enemyHero/Underlord_1_PressureEarly",
    messageTime: -60,
    textMessage: "Pressure Underlord early on as he is slow and has no escape.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "enemyHero/Underlord_2_ExtraConsumables",
    messageTime: 30,
    textMessage:
      "Bring extra consumables to the lane against Underlord's Firestorm spam.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "enemyHero/Underlord_3_DenyRangedCreeps",
    messageTime: 40,
    textMessage: "Denying range creeps is easy against Firestorm.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "enemyHero/Underlord_4_TowerSiege",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Underlord is really good at defending buildings. Respect that fact.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "abyssal_underlord",
    audioFile: "enemyHero/Underlord_5_ClumpUp",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Avoid clumping up and fighting in choke spots against Firestorm and Pit of Malice combo.",
    audience: [Audience.ALL],
  },

  // 110. Undying
  {
    category: "OwnHero",
    npcHeroName: "undying",
    audioFile: "ownHero/Undying_1_DoubleDecay",
    messageTime: 15,
    textMessage:
      "Catch both opponents on the lane with Decay and use the extra damage to harass or secure last hits.",
    audience: [Audience.ROLE_SUPPORT, Audience.ROLE_OFFLANE],
    image: { type: "ability", name: "undying_decay" },
  },
  {
    category: "OwnHero",
    npcHeroName: "undying",
    audioFile: "ownHero/Undying_2_CheckSticks",
    messageTime: [60, 5 * 60],
    textMessage:
      "Check for the number of stick charges opponents have before diving or committing for a kill.",
    audience: [Audience.ALL],
    image: { type: "item", name: "magic_stick" },
  },
  {
    category: "OwnHero",
    npcHeroName: "undying",
    audioFile: "ownHero/Undying_3_TombstonePlacement",
    messageTime: [90, 9 * 60 + 30, 17 * 60 + 30],
    textMessage:
      "Don't make it too easy for opponents to destroy Tombstone. Place it on pillars, cliffs and protect it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "undying_tombstone" },
  },
  {
    category: "OwnHero",
    npcHeroName: "undying",
    audioFile: "ownHero/Undying_4_TombTrees",
    messageTime: [105, 9 * 60 + 45, 17 * 60 + 45],
    textMessage: "Tombstone destroys trees and provides great vision.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "undying_tombstone" },
  },
  {
    category: "OwnHero",
    npcHeroName: "undying",
    audioFile: "ownHero/Undying_5_Reset",
    messageTime: [2 * 60 + 15, 5 * 60 + 15],
    textMessage:
      "When you drop low on resources consider suiciding into neutral camp or opponents towers to reset quickly.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "undying",
    audioFile: "ownHero/Undying_6_HitOnce",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Hit an opponent your cores are targeting at least once for damage amplification while in Flesh Golem form.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "undying_flesh_golem" },
  },
  {
    category: "OwnHero",
    npcHeroName: "undying",
    audioFile: "ownHero/Undying_7_EarlyRosh",
    messageTime: [14 * 60 + 45, 19 * 60 + 15],
    textMessage:
      "Undying allows the team to kill Roshan early due to zombie tanking and damage amplification from Flesh Golem.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "undying",
    audioFile: "ownHero/Undying_8_Aggression",
    messageTime: [11 * 60, 21 * 60, 31 * 60],
    textMessage:
      "Play as aggressively as you can in front of your team with Flesh Golem and Decay to absorb damage and chase down enemy heroes.",
    audience: [Audience.ROLE_OFFLANE],
    image: { type: "ability", name: "undying_flesh_golem" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "undying",
    audioFile: "enemyHero/Undying_1_MagicStickWand",
    messageTime: -60,
    textMessage:
      "Undying uses Decay frequently. Magic Stick and Wand will be charged up.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "undying",
    audioFile: "enemyHero/Undying_2_KeepDistance",
    messageTime: -40,
    textMessage:
      "Keep distance from Undying as he is likely to have high damage due to Decay stacks.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "undying",
    audioFile: "enemyHero/Undying_3_SoulRip",
    messageTime: 30,
    textMessage:
      "Keep an eye on your total HP against Decay spam. Soul Rip can finish you off.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "undying",
    audioFile: "enemyHero/Undying_4_Tombstone",
    messageTime: [5 * 60 + 20, 15 * 60 + 20, 25 * 60 + 20],
    textMessage:
      "Focus Tombstone in fights or you risk being slowed greatly and take a lot of damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "undying",
    audioFile: "enemyHero/Undying_5_KillZombies",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Consider killing off zombies chasing you or team mates in trouble.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "undying",
    audioFile: "enemyHero/Undying_6_FleshGolem",
    messageTime: 8 * 60,
    textMessage:
      "Avoid being hit by Undying in Flesh Golem form as you will take extra damage and be slowed.",
    audience: [Audience.ALL],
  },

  // 111. Ursa
  {
    category: "OwnHero",
    npcHeroName: "ursa",
    audioFile: "ownHero/Ursa_1_LasthitSetup",
    messageTime: 15,
    textMessage:
      "Ursa has low base damage so you might want to hit creep once or twice to apply Fury Swipes before lasthitting.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "ursa_fury_swipes" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ursa",
    audioFile: "ownHero/Ursa_2_EarthshockJump1",
    messageTime: [75, 11 * 60 + 15, 21 * 60 + 15],
    textMessage:
      "You can jump over walls, cliffs or into treelines with Earthshock.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "ursa_earthshock" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ursa",
    audioFile: "ownHero/Ursa_3_EarthshockJump2",
    messageTime: [6 * 60 + 45, 14 * 60 + 45, 22 * 60 + 45],
    textMessage:
      "Ursa typically farms very slowly so you need to play actively and look for kills to gain networth.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "ursa",
    audioFile: "ownHero/Ursa_4_Roshan",
    messageTime: [9 * 60 + 45, 13 * 60 + 45],
    textMessage:
      "Ursa can take Roshan on his own fairly early due to Fury Swipes stacking.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ursa",
    audioFile: "ownHero/Ursa_5_AntiKiting",
    messageTime: [12 * 60 + 45, 18 * 60 + 45],
    textMessage:
      "Itemize against kiting as you don't necessarily want to switch targets too often due to Fury Swipes stacking.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "diffusal_blade" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ursa",
    audioFile: "ownHero/Ursa_6_SecondRoshan",
    messageTime: [15 * 60],
    textMessage:
      "Consider buying aghanims shard after your 3 core items to help with tankiness.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "ursa",
    audioFile: "ownHero/Ursa_7_Tormentors",
    messageTime: [20 * 60, 30 * 60],
    textMessage:
      "Make sure to take tormentors with your team to secure the aghanims shards.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "aghanims_shard" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "ursa",
    audioFile: "enemyHero/Ursa_1_KeepDistance",
    messageTime: -60,
    textMessage:
      "Keep distance from Ursa as he is able to build up damage against you with Fury Swipes.",
    audience: [Audience.IN_LANE],
  },
  // @Alex: This one is hard to understand: Does this mean the player has to use them on Ursa when he has enrange or not to use it then? (I recorded it anyway) ANSWER: Consider NOT to use them while Enrage is active as the disables will last short due to status resistance from Enrage. Sometimes it is fine to use them despite diminished effect. That's why I was using word "consider".
  {
    category: "EnemyHero",
    npcHeroName: "ursa",
    audioFile: "enemyHero/Ursa_2_SaveDisables",
    messageTime: 8 * 60,
    textMessage:
      "Consider saving your disables against Ursa's Enrage status resistance increase.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ursa",
    audioFile: "enemyHero/Ursa_3_Euls",
    messageTime: 12 * 60,
    textMessage:
      "Eul's Scepter is great for kiting Enrage as it doesn't get affected by its status resistance.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ursa",
    audioFile: "enemyHero/Ursa_4_CounterItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Ghost Scepter, Force Staff and Hurricane Pike are great for kiting Ursa.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "ursa",
    audioFile: "enemyHero/Ursa_5_Roshan",
    messageTime: [15 * 60 + 10, 20 * 60 + 10, 25 * 60 + 10],
    textMessage: "Ursa is able to take Roshan early on. Ward and check Roshan.",
    audience: [Audience.ALL],
  },

  // 112. Vengeful Spirit
  {
    category: "OwnHero",
    npcHeroName: "vengefulspirit",
    audioFile: "ownHero/VengefulSpirit_1_SecureRanged",
    messageTime: 15,
    textMessage: `Use Wave of Terror to secure ranged creeps and harass the opponents at the same time.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "vengefulspirit_wave_of_terror" },
  },
  {
    category: "OwnHero",
    npcHeroName: "vengefulspirit",
    audioFile: "ownHero/VengefulSpirit_2_Stack",
    messageTime: [2 * 60 + 30, 9 * 60 + 30],
    textMessage:
      "You can stack multiple camps at the same time and help clear them with Wave of Terror.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "vengefulspirit_wave_of_terror" },
  },
  {
    category: "OwnHero",
    npcHeroName: "vengefulspirit",
    audioFile: "ownHero/VengefulSpirit_3_Vision",
    messageTime: [3 * 60 + 30, 13 * 60 + 30],
    textMessage:
      `Wave of Terror provides vision so you can scout pillars for wards and Roshan pit.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "vengefulspirit_wave_of_terror" },
  },
  {
    category: "OwnHero",
    npcHeroName: "vengefulspirit",
    audioFile: "ownHero/VengefulSpirit_4_BeReady",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "The most important thing in the fights is to be ready to swap an ally in trouble or an opponent out of position.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "vengefulspirit_nether_swap" },
  },
  {
    category: "OwnHero",
    npcHeroName: "vengefulspirit",
    audioFile: "ownHero/VengefulSpirit_5_Roshan",
    messageTime: [14 * 60 + 45, 18 * 60 + 45],
    textMessage: `Vengeful Spirit enables early Roshan kill due to Wave of Terror, Vengeance Aura and possibly minus armor items.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aegis" },
  },
  {
    category: "OwnHero",
    npcHeroName: "vengefulspirit",
    audioFile: "ownHero/VengefulSpirit_6_AghsShard",
    messageTime: 14 * 60 + 55,
    textMessage:
      "Pick up Aghanims Shard at the 15 minute mark to stun multiple heroes in teamfights.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `vengefulspirit`,
    audioFile: `ownHero/VengefulSpirit_7_SwapBarrier`,
    messageTime: [10 * 60 + 45, 22 * 60 + 45, 34 * 60 + 45],
    textMessage:
      `In fights, you can Swap an ally just to give them and yourself a damage barrier, as long as it does not put them in a bad position.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `vengefulspirit_nether_swap` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "vengefulspirit",
    audioFile: "enemyHero/VengefulSpirit_1_Focus",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Vengeful Spirit in the fights as she provides saves and empowers her Cores.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "vengefulspirit",
    audioFile: "enemyHero/VengefulSpirit_2_ArmorItems",
    messageTime: 12 * 60,
    textMessage:
      "Armor items are great against Vengeful Spirit's Wave of Terror and Vengeance Aura.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "vengefulspirit",
    audioFile: "enemyHero/VengefulSpirit_3_LinkensLotus",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Linken's Sphere and a well timed Lotus Orb are great against Magic Missile and Nether Swap.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "vengefulspirit",
    audioFile: "enemyHero/VengefulSpirit_4_AghanimsScpeter",
    messageTime: 15 * 60 + 10,
    textMessage:
      "If Vengeful bought Aghanim's Scepter, then you should ignore her in fights.",
    audience: [Audience.ALL],
  },

  // 113. Venomancer
  {
    category: "OwnHero",
    npcHeroName: "venomancer",
    audioFile: "ownHero/Venomancer_1_ToughLane",
    messageTime: 10,
    textMessage:
      "If the lane is tough, consider putting more points in Plague Wards and move to the jungle if necessary.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "venomancer_plague_ward" },
  },
  {
    category: "OwnHero",
    npcHeroName: "venomancer",
    audioFile: "ownHero/Venomancer_2_PoisonHarass",
    messageTime: 20,
    textMessage:
      "Hit opponents regularly to apply ticking damage from Poison Sting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_poison_sting" },
  },
  {
    category: "OwnHero",
    npcHeroName: "venomancer",
    audioFile: "ownHero/Venomancer_3_SecureKills",
    messageTime: 90,
    textMessage:
      "Galed opponents can be denied, so do your best to secure a last hit on a dying hero.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_venomous_gale" },
  },
  {
    category: "OwnHero",
    npcHeroName: "venomancer",
    audioFile: "ownHero/Venomancer_4_DenyWards",
    messageTime: 3 * 60,
    textMessage:
      "Deny low health Plague Wards to deprive opponents of extra gold.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_plague_ward" },
  },
  {
    category: "OwnHero",
    npcHeroName: "venomancer",
    audioFile: "ownHero/Venomancer_5_DefendTowers",
    messageTime: [8 * 60 + 45, 15 * 60 + 45],
    textMessage:
      "Venomancer is great at defending towers as you can place a bunch of Plague Wards around it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_plague_ward" },
  },
  {
    category: "OwnHero",
    npcHeroName: "venomancer",
    audioFile: "ownHero/Venomancer_6_SpamWards",
    messageTime: 9 * 60,
    repeatTime: 10 * 60,
    textMessage:
      "Use Plague Wards off cd when you are moving around to scout, control runes and block camps.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_plague_ward" },
  },
  {
    category: "OwnHero",
    npcHeroName: "venomancer",
    audioFile: "ownHero/Venomancer_7_FarmAggressively",
    messageTime: 9 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Farm aggressively, as Plague Wards provide vision and farm dangerous spots for you along with gale and sting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_plague_ward" },
  },
  {
    category: "OwnHero",
    npcHeroName: "venomancer",
    audioFile: "ownHero/Venomancer_8_Fights",
    messageTime: 10 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "In fights, look to affect as many heroes as possible with Venomous Gale.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_poison_nova" },
  },
  {
    category: "OwnHero",
    npcHeroName: "venomancer",
    audioFile: "ownHero/Venomancer_9_PushSidelanes",
    messageTime: 11 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the side lanes with Gale and Plague Wards.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_plague_ward" },
  },
  {
    category: "OwnHero",
    npcHeroName: "venomancer",
    audioFile: "ownHero/Venomancer_10_Aghanims",
    messageTime: 35 * 60,
    textMessage:
      `Pick up Aghanims Scepter in the late game to significantly increase your damage through right clicks and Plague Wards.`,
    audience: [Audience.ALL],
    image: { type: `item`, name: `ultimate_scepter` },
  },
  {
    category: "OwnHero",
    npcHeroName: "venomancer",
    audioFile: "ownHero/Venomancer_11_SnowballUltimate",
    messageTime: 9 * 60 + 30,
    textMessage:
      "Noxious Plague will snowball a teamfight in your favour if you can burst down the first hero affected by it.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "venomancer_noxious_plague" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "venomancer",
    audioFile: "enemyHero/Venomancer_1_ExtraConsumables",
    messageTime: -60,
    textMessage:
      "Bring extra consumables to the lane against Venomancer's Poison Sting harass.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "venomancer",
    audioFile: "enemyHero/Venomancer_2_Cloak",
    messageTime: 5 * 60 + 10,
    textMessage:
      "Cloak has a lot of value against Venomancer's insane magic damage output.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "venomancer",
    audioFile: "enemyHero/Venomancer_3_TeleportOut",
    messageTime: [5 * 60 + 20, 10 * 60 + 20, 15 * 60 + 20],
    textMessage:
      "Consider teleporting out quickly when you find yourself in trouble against Venomancer.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "venomancer",
    audioFile: "enemyHero/Venomancer_4_AntimagicItems",
    messageTime: 12 * 60,
    textMessage: `Debuff immunity and magic resistance items are great against Venomancer.`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "venomancer",
    audioFile: "enemyHero/Venomancer_5_DispelItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Items that provide dispels are able to remove Venomous Gale and Poison Sting.",
    audience: [Audience.ALL],
  },

  // 114. Viper
  {
    category: "OwnHero",
    npcHeroName: "viper",
    audioFile: "ownHero/Viper_1_FallsOff",
    messageTime: -30,
    textMessage:
      "Viper is very strong in early to mid game but drops off later on. Play actively while you're the strongest.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "viper",
    audioFile: "ownHero/Viper_2_AggressionMana",
    messageTime: 15,
    textMessage:
      "Look to stack up Poison Attacks on a single target and fix your mana issues early on.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "viper_poison_attack" },
  },
  {
    category: "OwnHero",
    npcHeroName: "viper",
    audioFile: "ownHero/Viper_3_Slow_v2",
    messageTime: [2 * 60 + 45, 7 * 60 + 45],
    textMessage:
      "Viper is insanely slow. Consider getting a casual Wind Lace and Boots of Travel in the long run.",
    audience: [Audience.ALL],
    image: { type: "item", name: "wind_lace" },
  },
  {
    category: "OwnHero",
    npcHeroName: "viper",
    audioFile: "ownHero/Viper_4_NethertoxinUsage_v2",
    messageTime: [8 * 60 + 45],
    textMessage: `You can kill tanky heroes around the map with the break effect from your Viper Strike.`,
    audience: [Audience.ALL],
    image: { type: `ability`, name: `viper_viper_strike` },
  },
  {
    category: "OwnHero",
    npcHeroName: "viper",
    audioFile: "ownHero/Viper_5_PushSidelanes",
    messageTime: 11 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage: `Push out the side lanes when not much is happening on the map. You can do it from fog with Nethertoxin.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "viper_nethertoxin" },
  },
  {
    category: "OwnHero",
    npcHeroName: "viper",
    audioFile: "ownHero/Viper_6_NotTanky",
    messageTime: 17 * 60 + 45,
    textMessage:
      "Although you are very tanky in early stages, you aren't nearly as tanky around the 20 minute mark.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "viper",
    audioFile: "ownHero/Viper_7_AghanimsShard_v2",
    messageTime: 14 * 60 + 50,
    textMessage: `Pick up Aghanims Shard later on to further increase your DPS and building damage.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "viper",
    audioFile: "ownHero/Viper_8_Bloodstone",
    messageTime: 18 * 60 + 50,
    textMessage: "Once you have Aghanims Scepter and Bloodstone, look to take fights and objectives around the map.",
    audience: [Audience.ALL],
    image: { type: "item", name: "travel_boots" },
  }, */
  /* {
    category: "OwnHero",
    npcHeroName: "viper",
    audioFile: "ownHero/Viper_9_Aggression",
    messageTime: 25 * 60,
    textMessage: "Start running at enemy heroes with your Aghanims Scepter, Bloodstone and Cloak.",
    audience: [Audience.ALL],
    image: { type: "item", name: "bloodstone" },
  }, */

  {
    category: "EnemyHero",
    npcHeroName: "viper",
    audioFile: "enemyHero/Viper_1_PoisonAttack",
    messageTime: -60,
    textMessage:
      "Don't allow Viper to stack more than 3 Poison Attacks on you.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "viper",
    audioFile: "enemyHero/Viper_2_Nethertoxin",
    messageTime: 7 * 60 + 10,
    textMessage: `Viper Strike breaks passives. Stay away from it until you have a Black King Bar.`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "viper",
    audioFile: "enemyHero/Viper_3_TeleportOut",
    messageTime: [5 * 60 + 10, 10 * 60 + 10, 15 * 60 + 10],
    textMessage:
      "Consider teleporting out quickly when you find yourself in trouble against Viper.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "viper",
    audioFile: "enemyHero/Viper_4_AntimagicItems",
    messageTime: 12 * 60,
    textMessage:
      "Magic resistance items are great against Viper's magic damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "viper",
    audioFile: "enemyHero/Viper_5_LinkensLotus",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Linken's Sphere and a well timed Lotus Orb are great against Viper Strike.",
    audience: [Audience.ALL],
  },
  {
    category: `EnemyHero`,
    npcHeroName: `viper`,
    audioFile: `enemyHero/Viper_6_PoisonBurstFacet`,
    messageTime: [1 * 60 + 15, 8 * 60 + 15, 19 * 60 + 15],
    textMessage:
      `When Viper has the Poison Burst facet, try not to stand next to the target he is attacking with Poison Attack to avoid its AoE burst damage.`,
    audience: [Audience.ALL],
  },

  // 115. Visage
  {
    category: "OwnHero",
    npcHeroName: "visage",
    audioFile: "ownHero/Visage_1_WeakLaner",
    messageTime: -30,
    textMessage:
      "Visage is fairly weak until level 6. Play for last hits and lane control.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "visage",
    audioFile: "ownHero/Visage_2_SquishyFamiliars",
    messageTime: 7 * 60,
    textMessage: "Familiars are fairly squishy when Visage is not around.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "visage_summon_familiars" },
  },
  {
    category: "OwnHero",
    npcHeroName: "visage",
    audioFile: "ownHero/Visage_3_FamiliarsUsage",
    messageTime: [7 * 60 + 30, 17 * 60 + 30, 27 * 60 + 30],
    textMessage:
      `With the Sepulchre facet, use familiars to control runes, stack camps, gank lanes even without your hero, drag and cut creepwaves.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "visage_summon_familiars" },
  },
  {
    category: "OwnHero",
    npcHeroName: "visage",
    audioFile: "ownHero/Visage_4_DontOverrotate",
    messageTime: [7 * 60 + 45, 11 * 60 + 45],
    textMessage:
      `Try not to over rotate. Work your way to Gleipnir as it allows you to solo kill most of the heroes.`,
    audience: [Audience.ROLE_CORE],
    image: { type: `item`, name: `gungir` },
  },
  {
    category: "OwnHero",
    npcHeroName: "visage",
    audioFile: "ownHero/Visage_5_FamiliarsStunChain",
    messageTime: [9 * 60 + 30, 19 * 60 + 30, 29 * 60 + 30],
    textMessage:
      "You can summon fresh familiars to be able to chain 4 stuns on opponents.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "visage_summon_familiars" },
  },
  {
    category: "OwnHero",
    npcHeroName: "visage",
    audioFile: "ownHero/Visage_6_AghanimsScepter",
    messageTime: 15 * 60 + 30,
    textMessage:
      "With Aghanim's Scepter, your burst and pick off potential further increases.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "visage",
    audioFile: "ownHero/Visage_7_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanims Shard later in the game as it allows you to survive jumps and provides another stun.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `visage`,
    audioFile: `ownHero/Visage_8_BootsofTravel`,
    messageTime: 25 * 60 + 30,
    textMessage:
      `With Boots of Travel, you can TP around the map to join fight or split push and bring your Familiars to you with the alternate cast of Summon Familiars.`,
    audience: [Audience.ALL],
    image: { type: `item`, name: `travel_boots` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "visage",
    audioFile: "enemyHero/Visage_1_GravekeepersCloak",
    messageTime: [90, 11 * 60 + 30],
    textMessage:
      "Instances of 40 damage and higher will remove a layer of Gravekeeper's Cloak.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "visage_gravekeepers_cloak" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "visage",
    audioFile: "enemyHero/Visage_2_Familiars",
    messageTime: 5 * 60 + 30,
    textMessage:
      "Visage's Familiars give a lot of gold and are easy to kill when Visage is not around.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "visage_gravekeepers_cloak" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "visage",
    audioFile: "enemyHero/Visage_3_Snowbally",
    messageTime: [10 * 60 + 10, 15 * 60 + 20, 20 * 60 + 20],
    textMessage:
      "Visage is snowbally hero and falls off in late game. Look to extend the game. Don't be greedy with items.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "visage",
    audioFile: "enemyHero/Visage_4_TowerDefense",
    messageTime: [10 * 60 + 20, 15 * 60 + 30, 20 * 60 + 30],
    textMessage:
      "Visage takes down buildings fast with Familiars. Organize defense quickly.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "visage",
    audioFile: "enemyHero/Visage_5_Break",
    messageTime: 12 * 60,
    textMessage:
      "Break effects are removing Gravekeeper's Cloak and Visage becomes much weaker.",
    audience: [Audience.ALL],
    image: { type: "item", name: "silver_edge" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "visage",
    audioFile: "enemyHero/Visage_6_CrimsonGuard",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Crimson Guard is great against the Familiar's physical damage.",
    audience: [Audience.ALL],
    image: { type: "item", name: "crimson_guard" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "visage",
    audioFile: "enemyHero/Visage_7_AghanimsScepter",
    messageTime: 15 * 60 + 10,
    textMessage:
      "Once Visage gets Aghanim's Scepter, place Observer wards and sentries and carry detection.",
    audience: [Audience.ALL],
    image: { type: "item", name: "SentryDustGem" },
  },

  // 116. Void Spirit
  {
    category: "OwnHero",
    npcHeroName: "void_spirit",
    audioFile: "ownHero/VoidSpirit_1_SecureRanged",
    messageTime: 15,
    textMessage:
      "Use Resonant Pulse to secure ranged creep and harass opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "void_spirit_resonant_pulse" },
  },
  {
    category: "OwnHero",
    npcHeroName: "void_spirit",
    audioFile: "ownHero/VoidSpirit_2_ToughLane",
    messageTime: 2 * 60,
    textMessage:
      "On tough lanes put more points in Dissimilate to be able push out waves and clear camps faster.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "void_spirit_dissimilate" },
  },
  {
    category: "OwnHero",
    npcHeroName: "void_spirit",
    audioFile: "ownHero/VoidSpirit_3_PlayActively",
    messageTime: [5 * 60 + 45, 9 * 60 + 45],
    textMessage:
      "Look to play actively, especially with good runes as Void Spirit has huge magical burst potential and low cooldowns.",
    audience: [Audience.ROLE_CORE],
    image: { type: "rune", name: "arcane" },
  },
  {
    category: "OwnHero",
    npcHeroName: "void_spirit",
    audioFile: "ownHero/VoidSpirit_4_FightTargets",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Void Spirit is great at killing supports and backliners in teamfights. Focus on those first.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "void_spirit_astral_step" },
  },
  {
    category: "OwnHero",
    npcHeroName: "void_spirit",
    audioFile: "ownHero/VoidSpirit_5_PushSidelanes",
    messageTime: 11 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage: "When not much is happening, push out the sidelines.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "void_spirit_dissimilate" },
  },
  {
    category: "OwnHero",
    npcHeroName: "void_spirit",
    audioFile: "ownHero/VoidSpirit_6_AghanimsScepter",
    messageTime: 14 * 60 + 45,
    textMessage:
      "Aghanim's Scepter is a game changer as it adds another utility in the form of silence among other things.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "void_spirit",
    audioFile: "ownHero/VoidSpirit_7_AggressionWithItems",
    messageTime: 18 * 60 + 45,
    textMessage:
      "Once you have both Echo Sabre and Spirit Vessel, look to play aggressively as you can solo kill pretty much any hero on the map.",
    audience: [Audience.ALL],
    image: { type: "item", name: "echo_sabre" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "void_spirit",
    audioFile: "enemyHero/VoidSpirit_1_ControlRunes",
    messageTime: [4 * 60 - 30, 6 * 60 - 30, 8 * 60 - 30],
    textMessage:
      "Control power runes against Void Spirit. He likes to bottle them and gank.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "void_spirit",
    audioFile: "enemyHero/VoidSpirit_2_InstantDisables",
    messageTime: 12 * 60,
    textMessage:
      "Instant disables and silences are great against the elusive Void Spirit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "void_spirit",
    audioFile: "enemyHero/VoidSpirit_3_AntispellItems",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Magic resistance and spell immunity items are great against Void Spirit.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "void_spirit",
    audioFile: "enemyHero/VoidSpirit_4_AghanimsScepter",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Be aware of Void Spirit's Aghanim's Scepter timing as he gets AoE silence of 4s.",
    audience: [Audience.ALL],
  },

  // 117. Warlock
  {
    category: "OwnHero",
    npcHeroName: "warlock",
    audioFile: "ownHero/Warlock_1_HealOverDamage",
    messageTime: 15,
    textMessage:
      "Prioritize using Shadow Word for healing instead for damage due to magic resistance.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "warlock_shadow_word" },
  },
  {
    category: "OwnHero",
    npcHeroName: "warlock",
    audioFile: "ownHero/Warlock_2_BondsLatching",
    messageTime: [75, 11 * 60 + 15],
    textMessage: "Fatal Bonds latch onto fogged units.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "warlock_fatal_bonds" },
  },
  {
    category: "OwnHero",
    npcHeroName: "warlock",
    audioFile: "ownHero/Warlock_3_BondsHarass",
    messageTime: 90,
    textMessage:
      "Use Fatal Bonds to harass if you can link 4 lane creeps and 2 opponents on the lane.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "warlock_fatal_bonds" },
  },
  {
    category: "OwnHero",
    npcHeroName: "warlock",
    audioFile: "ownHero/Warlock_4_ChaoticOfferingTrees",
    messageTime: [8 * 60 + 15, 18 * 60 + 15],
    textMessage: "Chaotic Offering destroys trees upon landing.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "warlock_rain_of_chaos" },
  },
  {
    category: "OwnHero",
    npcHeroName: "warlock",
    audioFile: "ownHero/Warlock_5_ActiveOffCooldown",
    messageTime: [10 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "Be active when Chaotic Offering is up, organize smokes and farm with golem after the fight.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "warlock_rain_of_chaos" },
  },
  {
    category: "OwnHero",
    npcHeroName: "warlock",
    audioFile: "ownHero/Warlock_6_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanim's Shard around minute 15 as it improves your waveclear and damage significantly.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "warlock",
    audioFile: "ownHero/Warlock_7_Farming",
    messageTime: 16 * 60,
    textMessage:
      "Once you have Aghanim Shard, you can use Upheavel to farm creep waves and jungle camps from a distance.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "warlock_upheaval" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "warlock",
    audioFile: "enemyHero/Warlock_1_ChaoticOffering",
    messageTime: [8 * 60, 18 * 60, 28 * 60],
    textMessage:
      "Warlock's Chaotic Offering has long cooldown. Look to fight when it is down.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "warlock",
    audioFile: "enemyHero/Warlock_2_ClumpUp",
    messageTime: [10 * 60 + 10, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Avoid clumping up and fighting in choke spots against Warlock's spells.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "warlock",
    audioFile: "enemyHero/Warlock_3_FatalBonds",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Most of Warlock's damage comes from Fatal Bonds. Dispel items are great at removing them.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "warlock",
    audioFile: "enemyHero/Warlock_4_SpellImmunity",
    messageTime: 12 * 60 + 20,
    textMessage: "Spell immunity is great against Warlock's spells.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "warlock",
    audioFile: "enemyHero/Warlock_5_AghanimRefresher",
    messageTime: 20 * 60 + 10,
    textMessage:
      "Be aware of Warlock's Aghanim's Scepter and Refresher Orb timings. He can carry the game.",
    audience: [Audience.ALL],
  },

  // 118. Weaver
  {
    category: "OwnHero",
    npcHeroName: "weaver",
    audioFile: "ownHero/Weaver_1_QuickWarding",
    messageTime: -90,
    textMessage:
      "Consider placing an observer for midlaner quickly with Shukuchi as you load into the game.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "OwnHero",
    npcHeroName: "weaver",
    audioFile: "ownHero/Weaver_2_CourierSniping",
    messageTime: -75,
    textMessage:
      "Sniping couriers with the help of a ward behind their tier 1 tower will reduce their available detection.",
    audience: [Audience.ROLE_SUPPORT_SOFT],
    image: { type: "item", name: "courier" },
  },
  {
    category: "OwnHero",
    npcHeroName: "weaver",
    audioFile: "ownHero/Weaver_3_CheckDetection",
    messageTime: -60,
    repeatTime: 10 * 60,
    textMessage: "Keep checking opponents' inventory for detection.",
    audience: [Audience.ALL],
    image: { type: "item", name: "SentryDustGem" },
  },
  {
    category: "OwnHero",
    npcHeroName: "weaver",
    audioFile: "ownHero/Weaver_4_SecureRanged",
    messageTime: 15,
    textMessage:
      "Use Shukuchi to secure ranged creep and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "weaver_shukuchi" },
  },
  {
    category: "OwnHero",
    npcHeroName: "weaver",
    audioFile: "ownHero/Weaver_5_JoinFights",
    messageTime: [8 * 60 + 45, 12 * 60 + 45],
    textMessage:
      "Weaver is already very strong in early to mid-game. Look around the map for opportunities to join the fights.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "weaver",
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
    npcHeroName: "weaver",
    audioFile: "ownHero/Weaver_7_PushSidelanes",
    messageTime: 12 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "When not much is happening, push out the sidelines aggressively as Weaver is elusive.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "weaver_shukuchi" },
  },
  {
    category: "OwnHero",
    npcHeroName: "weaver",
    audioFile: "ownHero/Weaver_8_EarlyRoshan",
    messageTime: [15 * 60 + 15, 19 * 60 + 15],
    textMessage:
      "Weaver enables the team to take Roshan fairly early due to Swarm armor reduction.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "weaver_the_swarm" },
  },
  {
    category: "OwnHero",
    npcHeroName: "weaver",
    audioFile: "ownHero/Weaver_9_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanims Shard once you have your damage items in the late game to further improve your dps.",
    audience: [Audience.ROLE_CARRY],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "weaver",
    audioFile: "ownHero/Weaver_10_AghanimsScepter",
    messageTime: [21 * 60 + 15, 25 * 60 + 15],
    textMessage:
      "Aghanim's Scepter is a game-changing pick up. In pair with Blink Dagger or Aether Lens, it becomes easier to use.",
    audience: [Audience.ROLE_SUPPORT, Audience.ROLE_OFFLANE],
    image: { type: "item", name: "ultimate_scepter" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "weaver",
    audioFile: "enemyHero/Weaver_1_SentryConsumables",
    messageTime: -60,
    textMessage:
      "Bring a sentry and extra consumables to the lane against Weaver.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "weaver",
    audioFile: "enemyHero/Weaver_2_TheSwarm",
    messageTime: 60 + 30,
    textMessage:
      "Remove The Swarm from yourself and from teammates or you will loose a lot of armor.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "weaver",
    audioFile: "enemyHero/Weaver_3_TimeLapse",
    messageTime: 8 * 60,
    textMessage: "Weaver's Time Lapse will remove Dust of Appearance.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "weaver",
    audioFile: "enemyHero/Weaver_4_ProtectSupports",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Weaver is really good at killing supports and backliners. Protect them.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "weaver",
    audioFile: "enemyHero/Weaver_5_Invisible",
    messageTime: 12 * 60,
    textMessage:
      "Becoming invisible removes The Swarm unless you are being detected or Weaver has Shard upgrade.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "weaver",
    audioFile: "enemyHero/Weaver_6_InstantDisablesSilences",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Instant disables and silences are great against the elusive Weaver.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "weaver",
    audioFile: "enemyHero/Weaver_7_CounterItems",
    messageTime: 12 * 60 + 20,
    textMessage:
      "Armor items, Heaven's Halberd and Ghost Scepter are great against Weaver's physical damage.",
    audience: [Audience.ALL],
  },

  // 119. Windranger
  {
    category: "OwnHero",
    npcHeroName: "windrunner",
    audioFile: "ownHero/Windranger_1_PowershotTraits",
    messageTime: [-60, 9 * 60, 19 * 60],
    textMessage: "Powershot provides brief vision and cuts trees in its path.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "windrunner_powershot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "windrunner",
    audioFile: "ownHero/Windranger_2_WindrunDispellable",
    messageTime: -45,
    textMessage:
      "Windrun is dispellable, so be careful when playing against certain heroes and items.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "windrunner_windrun" },
  },
  {
    category: "OwnHero",
    npcHeroName: "windrunner",
    audioFile: "ownHero/Windranger_3_SecureRanged",
    messageTime: 15,
    textMessage:
      "Use powershot to secure ranged creeps and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "windrunner_powershot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "windrunner",
    audioFile: "ownHero/Windranger_4_ProcItems",
    messageTime: [5 * 60, 12 * 60],
    textMessage:
      "Proc items like Javelin, Maelstrom or Monkey King Bar work really well with Focus Fire.",
    audience: [Audience.ALL],
    image: { type: "item", name: "javelin" },
  },
  {
    category: "OwnHero",
    npcHeroName: "windrunner",
    audioFile: "ownHero/Windranger_5_SoloKills",
    messageTime: [5 * 60 + 45, 11 * 60 + 45],
    textMessage:
      "Play actively, especially with a good rune as you can solo most of the heroes on the map.",
    audience: [Audience.ROLE_MID],
    image: { type: "rune", name: "double_damage" },
  },
  {
    category: "OwnHero",
    npcHeroName: "windrunner",
    audioFile: "ownHero/Windranger_6_Squishy",
    messageTime: [10 * 60 + 15, 20 * 60 + 15],
    textMessage:
      "Windranger is squishy. Don't let opponents surprise you. You want to be the one that starts the fight.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "windrunner",
    audioFile: "ownHero/Windranger_7_GuaranteeShackleshot",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "Take your time in the fights to guarantee Shackleshot lands, as most of your impact comes from that.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "ability", name: "windrunner_shackleshot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "windrunner",
    audioFile: "ownHero/Windranger_8_PushSidelanes",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage: `Push out the side lanes when not much is happening around the map.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "windrunner_powershot" },
  },
  {
    category: "OwnHero",
    npcHeroName: "windrunner",
    audioFile: "ownHero/Windranger_9_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanims Shard around minute 15 as it adds another control spell to your arsenal.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "windrunner",
    audioFile: "ownHero/Windranger_0_gungir",
    messageTime: 20 * 60,
    textMessage:
      "Consider turning your maelstrom into gleipnir to help lockdown enemy heroes and setup shackleshot.",
    audience: [Audience.ROLE_CORE],
    image: { type: "item", name: "gungir" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "windrunner",
    audioFile: "enemyHero/Windranger_1_SpellHarass",
    messageTime: 30,
    textMessage:
      "Windranger is susceptible to early game spell harass. Manage your mana and keep pressuring her",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "windrunner",
    audioFile: "enemyHero/Windranger_2_Powershot",
    messageTime: [1 * 60, 4 * 60],
    textMessage:
      "Windranger's Powershot does lots of damage. Avoid being hit or at least don't be the first unit being hit",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "windrunner",
    audioFile: "enemyHero/Windranger_3_UltAndJavelin",
    messageTime: [8 * 60 + 15, 13 * 60 + 15],
    textMessage:
      "Windranger can easily kill most heroes with her ultimate and a single Javelin. Be mindful about that",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "windrunner",
    audioFile: "enemyHero/Windranger_4_BladeMail",
    messageTime: 7 * 60 + 15,
    textMessage: "Blade Mail is a decent counter against her ultimate",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "windrunner",
    audioFile: "enemyHero/Windranger_5_Shackleshot",
    messageTime: [8 * 60 + 45, 18 * 60 + 45],
    textMessage:
      "To counter Windranger's Shackleshot, try to stay away from trees and make sure you don't have creeps or heroes behind you. Linken's Sphere is also helpful against Shackleshot",
    chatMessage:
      "To counter Windranger's Shackleshot stay away from trees and don't have creeps or heroes behind you",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "windrunner",
    audioFile: "enemyHero/Windranger_6_Windrun",
    messageTime: [6 * 60 + 15, 12 * 60 + 15],
    textMessage:
      "Windranger's Windrun ability is countered by items that pierce through evasion, cause magical damage and dispels such as Silver Edge",
    chatMessage:
      "Windranger's Windrun is countered by items that pierce through evasion, cause magical damage and dispels",
    audience: [Audience.ALL],
  },

  // 120. Winter Wyvern
  {
    category: "OwnHero",
    npcHeroName: "winter_wyvern",
    audioFile: "ownHero/WinterWyvern_1_ArcticBurn1",
    messageTime: -30,
    textMessage:
      "Make sure to hit each enemy at least once to apply the Arctic Burn debuff.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "winter_wyvern",
    audioFile: "ownHero/WinterWyvern_2_SplinterBlast",
    messageTime: 30,
    textMessage:
      "Avoid Splinter Blasting melee creeps until it reaches level 4 as you will put ranged creep in deny range.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "winter_wyvern",
    audioFile: "ownHero/WinterWyvern_3_ColdEmbrace",
    messageTime: 90,
    textMessage:
      "Be careful when using Cold Embrace as a save. Often it is better to use your slows or Winter's Curse.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "winter_wyvern",
    audioFile: "ownHero/WinterWyvern_4_ArcticBurn2",
    messageTime: 2 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "It is good to play close to trees or cliffs in dangerous spots on the map, so you can escape with Arctic Burn.",
    audience: [Audience.ALL],
  },
  //@Alex: What doy ou mean be "might be gone"? Might die? Might want to leave the fight?
  {
    category: "OwnHero",
    npcHeroName: "winter_wyvern",
    audioFile: "ownHero/WinterWyvern_5_WintersCurse1",
    messageTime: 10 * 60,
    repeatTime: 30 * 60,
    textMessage:
      "Avoid showing yourself early in fights. Stay hidden and play around your Winter's Curse and Cold Embrace. Use Arctic burn to reposition.",
    audience: [Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "winter_wyvern",
    audioFile: "ownHero/WinterWyvern_6_WintersCurse2",
    messageTime: 20 * 60,
    repeatTime: 30 * 60,
    textMessage:
      `Use Winters Curse carefully in the middle of fights as you might waste a lot of your ally's damage and cooldowns.`,
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "winter_wyvern",
    audioFile: "ownHero/WinterWyvern_7_Scepter",
    messageTime: 14 * 60,
    textMessage:
      "Aghanim's Scepter is crucial for right-click build. Make sure you take time to farm it.",
    audience: [Audience.ROLE_CORE],
  },
  {
    category: "OwnHero",
    npcHeroName: "winter_wyvern",
    audioFile: "ownHero/WinterWyvern_8_Blink",
    messageTime: 17 * 60,
    textMessage:
      "Having timely Blink Dagger will allow you to seize a moment and land multi-hero Winter's Curses.",
    audience: [Audience.ROLE_OFFLANE, Audience.ROLE_SUPPORT],
  },
  {
    category: "OwnHero",
    npcHeroName: "winter_wyvern",
    audioFile: "ownHero/WinterWyvern_9_WintersCurse3",
    messageTime: 30 * 60,
    repeatTime: 30 * 60,
    textMessage:
      "Fight around good vision so you can position well and land multi-hero Winter's Curses.",
    audience: [Audience.ALL],
  },

  {
    category: "EnemyHero",
    npcHeroName: "winter_wyvern",
    audioFile: "enemyHero/WinterWyvern_1_ArcticBurn",
    messageTime: -60,
    textMessage: "Winter Wyvern is bad at trading when Arctic Burn is down.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "winter_wyvern",
    audioFile: "enemyHero/WinterWyvern_2_ColdEmbrace",
    messageTime: 60 + 30,
    textMessage: "Cold Embrace prevents all physical damage.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "winter_wyvern",
    audioFile: "enemyHero/WinterWyvern_3_Focus",
    messageTime: [10 * 60 + 10, 20 * 60 + 10, 30 * 60 + 10],
    textMessage:
      "Focus Winter Wyvern in fights as she provides saves and disables for her team.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "winter_wyvern",
    audioFile: "enemyHero/WinterWyvern_4_ClumpUp",
    messageTime: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Avoid clumping up and fighting in choke spots against Winter's Curse.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "winter_wyvern",
    audioFile: "enemyHero/WinterWyvern_5_BlackKingBar",
    messageTime: 12 * 60,
    textMessage:
      "Black King Bar prevents you from hitting a Cursed unit, but you can still get cursed yourself.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "winter_wyvern",
    audioFile: "enemyHero/WinterWyvern_6_StatusResistance",
    messageTime: 12 * 60 + 10,
    textMessage:
      "Status resistance items shorten the duration of Winter's Curse.",
    audience: [Audience.ALL],
  },

  // 121. Witch Doctor
  /*   {
    category: "OwnHero",
    npcHeroName: "witch_doctor",
    audioFile: "ownHero/WitchDoctor_1_ParalyzingCaskDuration",
    messageTime: [-60, 10 * 60 + 10, 20 * 60 + 20],
    textMessage:
      "Paralyzing Cast lasts 5 seconds on creeps, summons and illusions.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_paralyzing_cask" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "witch_doctor",
    audioFile: "ownHero/WitchDoctor_2_SecureRanged",
    messageTime: 3 * 60,
    textMessage:
      "Use Paralyzing Cask to secure ranged creep and harass the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_paralyzing_cask" },
  },
  {
    category: "OwnHero",
    npcHeroName: "witch_doctor",
    audioFile: "ownHero/WitchDoctor_3_ToughLane",
    messageTime: 75,
    textMessage:
      `If you did not take the Voodoo Festeration facet, consider investing a point in Voodoo Restoration on tough lanes.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_voodoo_restoration" },
  },
  {
    category: "OwnHero",
    npcHeroName: "witch_doctor",
    audioFile: "ownHero/WitchDoctor_4_Powerspike",
    messageTime: 2 * 60,
    textMessage:
      `With the Voodoo Festeration facet, level 2 Voodoo Restoration is a big damage powerspike for the Witch Doctor. Communicate with laning partner to go for a kill.`,
    audience: [Audience.ROLE_SUPPORT],
    image: { type: `ability`, name: `witch_doctor_voodoo_restoration` },
  },
  {
    category: "OwnHero",
    npcHeroName: "witch_doctor",
    audioFile: "ownHero/WitchDoctor_5_Level6",
    messageTime: 8 * 60,
    textMessage:
      "Witch Doctor has one of the highest kill potential at level 6 and you can even solo some heroes.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_death_ward" },
  },
  {
    category: "OwnHero",
    npcHeroName: "witch_doctor",
    audioFile: "ownHero/WitchDoctor_6_Toggle",
    messageTime: [8 * 60 + 15, 18 * 60 + 15],
    textMessage:
      "You can toggle Voodoo Restoration on and off while channeling Death Ward or teleporting.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_voodoo_restoration" },
  },
  {
    category: "OwnHero",
    npcHeroName: "witch_doctor",
    audioFile: "ownHero/WitchDoctor_7_DontShow",
    messageTime: 10 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Don't show yourself at the start of the fight as you are squishy. Let opponents clump up and focus on your allies.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "witch_doctor",
    audioFile: "ownHero/WitchDoctor_8_TeamfightObjective",
    messageTime: 10 * 60 + 30,
    repeatTime: 10 * 60,
    textMessage:
      "In the fights, make sure that Paralyzing Cask bounces and at least one opponent is Maledicted.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_paralyzing_cask" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "witch_doctor",
    audioFile: "ownHero/WitchDoctor_9_DeathWardFallsOff",
    messageTime: [16 * 60 + 45, 22 * 60 + 45],
    repeatTime: 10 * 60,
    textMessage:
      "Death Ward's damage output falls off significantly due to opponents' increasing armor, so focus on landing other spells.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "witch_doctor_death_ward" },
  }, */
  {
    category: "OwnHero",
    npcHeroName: "witch_doctor",
    audioFile: "ownHero/WitchDoctor_10_AghanimsShard",
    messageTime: 14 * 60 + 50,
    textMessage:
      "Pick up Aghanim's Shard around minute 15 as it has a combination of defensive and offensive traits.",
    audience: [Audience.ALL],
    image: { type: "item", name: "aghanims_shard" },
  },
  {
    category: "OwnHero",
    npcHeroName: "witch_doctor",
    audioFile: "ownHero/WitchDoctor_11_AghanimsScepter",
    messageTime: [24 * 60, 29 * 60],
    textMessage:
      "In the late game, you can pump in a decent amount of damage with Aghanim's Scepter upgrade to Death Ward.",
    audience: [Audience.ROLE_SUPPORT],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: `OwnHero`,
    npcHeroName: `witch_doctor`,
    audioFile: `ownHero/WitchDoctor_12_VoodooRestorationFarming`,
    messageTime: [11 * 60 + 15, 21 * 60 + 15, 31 * 60 + 15],
    textMessage:
      `With the Voodoo Festeration facet, when not much is happening in the game, you can quickly farm creep waves and jungle camps with maxed out Voodoo Restoration.`,
    audience: [Audience.ROLE_SUPPORT],
    image: { type: `ability`, name: `witch_doctor_voodoo_restoration` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "witch_doctor",
    audioFile: "enemyHero/WitchDoctor_1_ParalyzingCask",
    messageTime: [-60, 10 * 60 + 10, 20 * 60 + 20],
    textMessage: "Don't clump up because of Witch Doctor's Paralyzing Cask.",
    audience: [Audience.ALL],
  },
  /* {
    category: "EnemyHero",
    npcHeroName: "witch_doctor",
    audioFile: "enemyHero/WitchDoctor_2_ParalyzingCaskSummons",
    messageTime: -50,
    textMessage:
      "Paralyzing Cask stuns creeps for 5 seconds. Keep your summons away from Witch Doctor.",
    audience: [Audience.ALL],
  }, */
  {
    category: "EnemyHero",
    npcHeroName: "witch_doctor",
    audioFile: "enemyHero/WitchDoctor_3_StrongLaner",
    messageTime: 2 * 60 + 20,
    textMessage:
      `Witch Doctor is a strong laner, especially when he gets a second point in Voodoo Restoration with his Voodoo Festeration facet.`,
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "witch_doctor",
    audioFile: "enemyHero/WitchDoctor_4_SoloKill",
    messageTime: 8 * 60,
    textMessage:
      "Witch Doctor can solo kill most heroes with Death Ward. Track his movements on the map.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "witch_doctor",
    audioFile: "enemyHero/WitchDoctor_6_AghanimsScepter",
    messageTime: 20 * 60 + 10,
    textMessage:
      "Be aware of Witch Doctor's Aghanim's Scepter purchase. Focus him in the fights or cancel his Ulti.",
    audience: [Audience.ALL],
  },

  // 122. Wraith King
  {
    category: "OwnHero",
    npcHeroName: "skeleton_king",
    audioFile: "ownHero/WraithKing_1_Powerspike",
    messageTime: -60,
    textMessage:
      "If you have a strong level 2 powerspike on the lane, skill Vampiric Spirit on level 2, build up skeletons, release them on level 2 and use Wraithfire Blast.",
    audience: [Audience.ROLE_CORE],
    image: { type: "ability", name: "skeleton_king_vampiric_aura" },
  },
  {
    category: "OwnHero",
    npcHeroName: "skeleton_king",
    audioFile: "ownHero/WraithKing_2_SecureRanged",
    messageTime: 15,
    textMessage:
      "Use Wraithfire Blast to secure ranged creep lasthits by either stunning the creep or an opponent.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skeleton_king_hellfire_blast" },
  },
  {
    category: "OwnHero",
    npcHeroName: "skeleton_king",
    audioFile: "ownHero/WraithKing_3_SaveSkeletons",
    messageTime: [4 * 60 + 45, 10 * 60 + 45],
    textMessage:
      "When farming jungle, don't let your skeletons tank neutral creeps too much.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skeleton_king_vampiric_aura" },
  },
  {
    category: "OwnHero",
    npcHeroName: "skeleton_king",
    audioFile: "ownHero/WraithKing_4_30Percent",
    messageTime: [5 * 60, 11 * 60],
    textMessage:
      "When neutral camp is at 30% of total health, move to the next camp to show your skeletons the way.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skeleton_king_vampiric_aura" },
  },
  {
    category: "OwnHero",
    npcHeroName: "skeleton_king",
    audioFile: "ownHero/WraithKing_0_VampiricAuraFarming",
    messageTime: [3 * 60],
    textMessage:
      "You should have vampiric spirit maxed out around level 7 to increase farming speed.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skeleton_king_vampiric_aura" },
  },
  {
    category: "OwnHero",
    npcHeroName: "skeleton_king",
    audioFile: "ownHero/WraithKing_5_KeepSkillPoint",
    messageTime: 6 * 60 + 45,
    textMessage:
      "Consider keeping a skill point on level 6 or invest it in spells that will improve your farming speed if you are jungling.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skeleton_king_reincarnation" },
  },
  {
    category: "OwnHero",
    npcHeroName: "skeleton_king",
    audioFile: "ownHero/WraithKing_6_Blink",
    messageTime: 13 * 60 + 45,
    textMessage:
      "Once you have a Blink Dagger, focus on killing backliners or supports first.",
    audience: [Audience.ALL],
    image: { type: "item", name: "blink" },
  },
  {
    category: "OwnHero",
    npcHeroName: "skeleton_king",
    audioFile: "ownHero/WraithKing_7_ManaBurn",
    messageTime: 14 * 60,
    textMessage:
      "Mana burn is a big problem for the Wraith King. Consider aghanims shard when playing against heroes that have mana burn or buy diffusal.",
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "skeleton_king",
    audioFile: "ownHero/WraithKing_8_SkeletonsBadInFights",
    messageTime: [14 * 60 + 15, 24 * 60 + 15],
    textMessage:
      "Skeletons are not super useful in teamfights. Use them to push out lanes or after fights to take the buildings.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "skeleton_king_vampiric_aura" },
  },

  {
    category: "EnemyHero",
    npcHeroName: "skeleton_king",
    audioFile: "enemyHero/WraithKing_1_LowArmor",
    messageTime: -60,
    textMessage: "Wraith King has low armor. Pressure him with right clicks.",
    audience: [Audience.IN_LANE],
  },
  {
    category: "EnemyHero",
    npcHeroName: "skeleton_king",
    audioFile: "enemyHero/WraithKing_2_ReincarnationCooldown",
    messageTime: [8 * 60, 10 * 60 + 30, 12 * 60 + 30],
    textMessage:
      "Reincarnation has a long cooldown on level 1. Look to pressure Wraith King while it is down.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "skeleton_king",
    audioFile: "enemyHero/WraithKing_3_ContestFarm",
    messageTime: 10 * 60 + 10,
    textMessage:
      "Wraith King farms quickly with skeletons. Smoke on him, place deep wards and sentry off camps.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "skeleton_king",
    audioFile: "enemyHero/WraithKing_4_BigCooldowns",
    messageTime: [10 * 60 + 20, 20 * 60 + 20, 30 * 60 + 20],
    textMessage:
      "Don't use all your energy on Wraith King's first life unless you are sure you can kill him once more.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "skeleton_king",
    audioFile: "enemyHero/WraithKing_5_ManaBurns",
    messageTime: 12 * 60,
    textMessage:
      "Mana burns are great at stopping Wraith King's Ulti until he gets Aghanim's Shard.",
    audience: [Audience.ALL],
  },
  {
    category: "EnemyHero",
    npcHeroName: "skeleton_king",
    audioFile: "enemyHero/WraithKing_6_Radiance",
    messageTime: 15 * 60 + 10,
    textMessage:
      "If wraith king seems to be saving gold he is most probably buying radiance, becareful of this timing and try punish this before he has it.",
    audience: [Audience.ALL],
  },

  // 123. Zeus
  {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_1_BoltVision",
    messageTime: -60,
    textMessage:
      "Lightning Bolt provides vision and reveals invisible heroes and wards.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_lightning_bolt" },
  },
  {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_2_Lasthitting",
    messageTime: 15,
    textMessage:
      "Use Arc Lightning to secure creep last hits and damage the opponents at the same time.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_arc_lightning" },
  },
  {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_3_ManaManagement",
    messageTime: [105, 5 * 60 + 45, 11 * 60 + 45],
    textMessage:
      "Mana management and rune control are key for Zeus to be able to farm and fight effectively.",
    audience: [Audience.ALL],
    image: { type: "rune", name: "arcane" },
  },
  {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_4_LookAround",
    messageTime: [5 * 60 + 30, 11 * 60 + 30, 17 * 60 + 30],
    textMessage:
      "Look around the map to kill opponents on low health with Thundergod's Wrath.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_thundergods_wrath" },
  },
  {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_5_UltiReveals",
    messageTime: [6 * 60, 18 * 60],
    textMessage:
      "Thundergod's Wrath reveals invisible heroes but doesn't damage them.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_thundergods_wrath" },
  },
  {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_6_UltiSmokes",
    messageTime: [11 * 60, 22 * 60],
    textMessage:
      "Thundergod's Wrath lightens the part of the map where opponents are smoked but doesn't damage them.",
    audience: [Audience.ALL],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_7_DontShow",
    messageTime: 11 * 60 + 15,
    repeatTime: 10 * 60,
    textMessage:
      "Don't show yourself at the start of the fight. Let opponents focus on your allies so you can get all of your spells off.",
    audience: [Audience.ALL],
  },
  {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_8_KeepBolting1",
    messageTime: 13 * 60 + 30,
    repeatTime: 12 * 60,
    textMessage:
      "As you are moving around, constantly check for opponents wards with Lightning Bolt.",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_lightning_bolt" },
  },
  {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_9_KeepBolting2",
    messageTime: [15 * 60 + 15, 25 * 60 + 15],
    textMessage:
      "You can pop smoke for yourself here and there and cast spells from it in the fights.",
    audience: [Audience.ALL],
    image: { type: "item", name: "smoke_of_deceit" },
  },
  {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_10_AghanimsScepter",
    messageTime: 16 * 60 + 15,
    textMessage:
      "Aghanims Scepter is a huge power spike against backliners and evasive heroes, such as Tinker.",
    audience: [Audience.ALL],
    image: { type: "item", name: "ultimate_scepter" },
  },
  {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_11_BlackKingBar",
    messageTime: [16 * 60 + 30, 22 * 60 + 30],
    textMessage: `Black King Bar on enemy heroes is problematic for your damage output. You need to kite those and prolong the fight.`,
    audience: [Audience.ALL],
    image: { type: "item", name: "black_king_bar" },
  },
  {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_12_ScoutingUltimate",
    messageTime: 28 * 60 + 45,
    repeatTime: 10 * 60,
    textMessage: `It is fine to use your ultimate here and there in late game to scout for opponents.`,
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_thundergods_wrath" },
  },
  /* {
    category: "OwnHero",
    npcHeroName: "zuus",
    audioFile: "ownHero/Zeus_13_MantaUsage",
    messageTime: 22 * 60 + 45,
    textMessage:
      "Once you have Manta Style with Aghanim Shard, use the illusions to safely shove lanes towards the enemy base.",
    audience: [Audience.ALL],
    image: { type: "item", name: "manta" },
  }, */
  {
    category: `OwnHero`,
    npcHeroName: `zuus`,
    audioFile: `ownHero/Zeus_14_AghanimsShard`,
    messageTime: 14 * 60 + 50,
    textMessage:
      `Pick up Aghanims Shard around the 15 minute mark to significantly increase your damage output and farm speed without expending your mana.`,
    audience: [Audience.ALL],
    image: { type: `item`, name: `aghanims_shard` },
  },

  {
    category: "EnemyHero",
    npcHeroName: "zuus",
    audioFile: "enemyHero/Zeus_1_MagicResistance",
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
    npcHeroName: "zuus",
    audioFile: "enemyHero/Zeus_2_Wards",
    messageTime: [-40, 4 * 60 + 40, 10 * 60 + 40],
    textMessage: "Place wards in unusual spots because of Zeus",
    audience: [Audience.ALL],
    image: { type: "item", name: "ward_observer" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "zuus",
    audioFile: "enemyHero/Zeus_3_HPThundergod",
    messageTime: 5 * 60 + 30,
    textMessage: "Keep your HP above Thundergod's Wrath damage of 300",
    audience: [Audience.ALL],
    image: { type: "ability", name: "zuus_thundergods_wrath" },
    // Note: Zeus ult does 300 damage but after redcutions it does around 225-230. I think it is fine to keep the message as it is.
  },
  {
    category: "EnemyHero",
    npcHeroName: "zuus",
    audioFile: "enemyHero/Zeus_4_PowerRunes",
    messageTime: 6 * 60,
    textMessage:
      "Control Power Runes to prevent Zeus from getting arcane or regeneration runes",
    audience: [Audience.ALL],
    image: { type: "rune", name: "arcane" },
  },
  {
    category: "EnemyHero",
    npcHeroName: "zuus",
    audioFile: "enemyHero/Zeus_5_SmokeOfDeceit",
    messageTime: 10 * 60,
    textMessage:
      "Smoke of Deceit can be useful to dodge Thundergod's Wrath or to wrap around Zeus to catch him off-guard",
    audience: [Audience.ALL],
    image: { type: "item", name: "smoke_of_deceit" },
  },
];
