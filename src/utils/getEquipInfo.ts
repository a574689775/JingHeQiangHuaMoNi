
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
                'star': 0,
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
                'star': 0,
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
                'star': 0,
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
                'star': 0,
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
                'star': 0,
            };
            break;
        }
        case 15: {
            equipInfo = {
                'coin': 220000,
                'successRatio': 15,
                'whiteMeterialCount': 32,
                'purpleMeterialCount': 11,
                'pinkMeterialCount': 0,
                'star': 3,
            };
            break;
        }
        case 16: {
            equipInfo = {
                'coin': 230000,
                'successRatio': 14,
                'whiteMeterialCount': 34,
                'purpleMeterialCount': 12,
                'pinkMeterialCount': 0,
                'star': 3,
            };
            break;
        }
        case 17: {
            equipInfo = {
                'coin': 240000,
                'successRatio': 13,
                'whiteMeterialCount': 36,
                'purpleMeterialCount': 13,
                'pinkMeterialCount': 0,
                'star': 3,
            };
            break;
        }
        case 18: {
            equipInfo = {
                'coin': 250000,
                'successRatio': 12,
                'whiteMeterialCount': 0,
                'purpleMeterialCount': 14,
                'pinkMeterialCount': 1,
                'star': 4,
            };
            break;
        }
        case 19: {
            equipInfo = {
                'coin': 260000,
                'successRatio': 11,
                'whiteMeterialCount': 0,
                'purpleMeterialCount': 15,
                'pinkMeterialCount': 2,
                'star': 4,
            };
            break;
        }
        case 20: {
            equipInfo = {
                'coin': 270000,
                'successRatio': 10,
                'whiteMeterialCount': 0,
                'purpleMeterialCount': 16,
                'pinkMeterialCount': 3,
                'star': 5,
            };
            break;
        }
        case 21: {
            equipInfo = {
                'coin': 280000,
                'successRatio': 9,
                'whiteMeterialCount': 0,
                'purpleMeterialCount': 17,
                'pinkMeterialCount': 4,
                'star': 5,
            };
            break;
        }
        case 22: {
            equipInfo = {
                'coin': 290000,
                'successRatio': 8,
                'whiteMeterialCount': 0,
                'purpleMeterialCount': 18,
                'pinkMeterialCount': 5,
                'star': 6,
            };
            break;
        }
        case 23: {
            equipInfo = {
                'coin': 300000,
                'successRatio': 7,
                'whiteMeterialCount': 0,
                'purpleMeterialCount': 19,
                'pinkMeterialCount': 6,
                'star': 6,
            };
            break;
        }
        case 24: {
            equipInfo = {
                'coin': 310000,
                'successRatio': 6,
                'whiteMeterialCount': 0,
                'purpleMeterialCount': 20,
                'pinkMeterialCount': 7,
                'star': 6,
            };
            break;
        }
    }

    return equipInfo;
}
