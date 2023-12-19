
// 获取各个等级的装备信息
// eslint-disable-next-line complexity
export function getEquipInfo(level: number) {

    let equipInfo = {} as any;

    switch (level)
    {
        case 10: {
            equipInfo = {
                'coin': 170000,
                'successRatio': 20,
                'whiteMeterialCount': 22,
                'purpleMeterialCount': 6,
                'pinkMeterialCount': 0,
            };
            break;
        }
        case 11: {
            equipInfo = {
                'coin': 180000,
                'successRatio': 20,
                'whiteMeterialCount': 24,
                'purpleMeterialCount': 7,
                'pinkMeterialCount': 0,
            };
            break;
        }
        case 12: {
            equipInfo = {
                'coin': 190000,
                'successRatio': 20,
                'whiteMeterialCount': 26,
                'purpleMeterialCount': 8,
                'pinkMeterialCount': 0,
            };
            break;
        }
        case 13: {
            equipInfo = {
                'coin': 200000,
                'successRatio': 20,
                'whiteMeterialCount': 28,
                'purpleMeterialCount': 9,
                'pinkMeterialCount': 0,
            };
            break;
        }
        case 14: {
            equipInfo = {
                'coin': 210000,
                'successRatio': 20,
                'whiteMeterialCount': 30,
                'purpleMeterialCount': 10,
                'pinkMeterialCount': 0,
            };
            break;
        }
    }

    return equipInfo;
}
