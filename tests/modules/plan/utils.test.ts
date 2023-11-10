import { ITEM, ITEM_BY_NAME } from '@/modules/api';
import { getSubItems } from '@/modules/plan/utils';

describe('plan/utils', () => {
  test('getSubMaterials', () => {
    expect(
      getSubItems([
        ITEM_BY_NAME['왕관'],
        ITEM_BY_NAME['지휘관의 갑옷'],
        ITEM_BY_NAME['황금']
      ]).toString()
    ).toBe(
      `[가위(101101): 1, 곡괭이(105102): 1.5, 쇠사슬(119101): 1, 모자(201102): 1, 베레모(201203): 1, 왕관(201401): 1, 천 갑옷(202106): 1, 가죽 갑옷(202201): 1, 사슬 갑옷(202302): 1, 지휘관의 갑옷(202412): 1, 가죽(401103): 1, 원석(401114): 1.5, 황금(401214): 3]`
    );

    expect(getSubItems([ITEM_BY_NAME['왕관'], ITEM_BY_NAME['지휘관의 갑옷']]).toString()).toBe(
      `[가위(101101): 1, 곡괭이(105102): 1, 쇠사슬(119101): 1, 모자(201102): 1, 베레모(201203): 1, 왕관(201401): 1, 천 갑옷(202106): 1, 가죽 갑옷(202201): 1, 사슬 갑옷(202302): 1, 지휘관의 갑옷(202412): 1, 가죽(401103): 1, 원석(401114): 1, 황금(401214): 2]`
    );

    expect(getSubItems([ITEM_BY_NAME['금팔찌']]).toString()).toBe(
      `[곡괭이(105102): 0.5, 팔찌(203104): 1, 금팔찌(203302): 1, 원석(401114): 0.5, 황금(401214): 1]`
    );
  });
});
