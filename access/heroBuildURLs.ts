import { IHeroBuild, heroBuilds } from "../content/heroBuilds";
import dota2Heroes from "@gameData/out/dota2Heroes.json";

export type TURLName = {
  heroURLName: string;
  buildURLName: string;
};

/**
 *
 * @returns Array of url names for each hero
 */
export function getAllHeroAndBuildURLNames(): TURLName[] {
  const result: TURLName[] = [];
  for (const key of Object.keys(dota2Heroes)) {
    //console.log({ key });
    const heroURLName = dota2Heroes[key as keyof typeof dota2Heroes].url_name;
    const builds = heroBuilds[key.replace("npc_dota_hero_", "")].builds;
    for (const build of builds) {
      const buildURLName = getBuildURLName(build);
      result.push({ heroURLName, buildURLName });
    }
  }
  return result;
}

export function getBuildURLName(build: IHeroBuild): string {
  const elements: string[] = build.roles;

  build.type && elements.push(build.type);

  return elements.map((element) => element.toLowerCase()).join("-");
}
