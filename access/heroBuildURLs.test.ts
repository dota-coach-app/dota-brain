/**
 * clear ; npx jest access/heroBuildURLs.test.ts
 *
 */
import { getAllHeroAndBuildURLNames } from "./heroBuildURLs";

test("heroBuildURLs-getAll()", () => {
  let names = getAllHeroAndBuildURLNames();
  console.log(JSON.stringify(names, null, 2));
  //expect(heroBuild?.heroBuild?.steam_guide_workshop_ids.en).toBe(2725332187);
});
