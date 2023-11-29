/**
 * Component reports all core items of a build that have not i18n string.
 *
 * npx jest coreItemTooltips.test.ts
 *
 */
import { IntlShape } from "react-intl";
import { i18nLoader } from "@utilities/i18n/i18nLoader";
import { getTooltip } from "../access/heroBuilds";
import { heroBuilds } from "../content/heroBuilds";

let intl: IntlShape | undefined;
beforeAll(async () => {
  intl = await i18nLoader();
  //console.log(`intl: `, intl?.messages);
});

test("coreItemTooltips", () => {
  if (!intl) {
    console.error(`Could not load intl.`);
    return;
  }

  const foundTooltips = [];
  const missingTooltips = [];
  for (const [npcShortName, heroContent] of Object.entries(heroBuilds)) {
    for (let i = 0; i < heroContent.builds.length; i++) {
      const heroBuild = heroContent.builds[i];
      const coreItems = [
        ...heroBuild.items.core,
        ...(heroBuild.items.core_bear || []),
      ];
      for (const coreItem of coreItems) {
        const tooltip = getTooltip(npcShortName, i, coreItem, intl!);
        if (!tooltip) {
          missingTooltips.push(
            `${npcShortName}, build ${i}, item: ${coreItem}`
          );
        } else {
          foundTooltips.push(`${npcShortName}, build ${i}, item: ${coreItem}`);
        }
      }
    }
  }

  console.log(`Found tooltips:\n`, JSON.stringify(foundTooltips, null, 2));
  console.log(`Missing tooltips:\n`, JSON.stringify(missingTooltips, null, 2));

  expect(true).toBe(true);
});
