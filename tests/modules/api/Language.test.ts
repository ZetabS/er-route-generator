import { queryLanguageData } from '@/modules/api/Language';

describe('Language', () => {
  test('queryLanguageData', () => {
    const characterNames = queryLanguageData('Character/Name/*');
    expect(characterNames[14]).toBe('키아라');

    const itemNames = queryLanguageData('Item/Name/*');
    expect(itemNames[120402]).toBe('미스틸테인');

    const armorTypes = queryLanguageData('ArmorType/*');
    expect(armorTypes['Head']).toBe('머리');

    const armorTypeDesc = queryLanguageData('ArmorType/*/Desc');
    expect(armorTypeDesc['Head']).toBe('머리 방어구');
  });
});
