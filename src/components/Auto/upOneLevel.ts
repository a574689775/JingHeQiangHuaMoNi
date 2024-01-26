import {getEquipInfo, strengthen} from '@/utils';
import {fix} from './fix';

export function upOneLevel(
    startLevel: number,
    fixOneStar: string, fixTwoStar: string, fixThreeStar: string,
    fixFourStar: string, fixFiveStar: string, fixSixStar: string,
    up: 'none' | 'big' | 'small'
) {

    // 累计消耗
    let coin = 0;
    let whiteCount = 0;
    let purpleCount = 0;
    let pinkCount = 0;
    let smallCount = 0;
    let bigCount = 0;

    // 强化失败记录
    const failList: any = [];

    // 获取当前装备信息
    const equipInfo = getEquipInfo(startLevel);

    // 先来一锤子
    let successFlag = strengthen(startLevel, equipInfo, up as any, failList);

    // 一锤子上了 直接返回一锤子的消耗
    if (successFlag) {
        return {
            coin: equipInfo.coin,
            whiteCount: equipInfo.whiteMeterialCount,
            purpleCount: equipInfo.purpleMeterialCount,
            pinkCount: equipInfo.pinkMeterialCount,
            smallCount: up === 'small' ? 1 : 0,
            bigCount: up === 'big' ? 1 : 0,
        };
    }

    // 一锤子没成功 先记录一次保底
    failList.push(startLevel);

    while (!successFlag) {
        // 计算修好需要多少消耗
        const {fixCoin, fixWhiteCount, fixPurpleCount, fixPinkCount, fixSmallCount, fixBigCount} = fix(
            equipInfo,
            fixOneStar, fixTwoStar, fixThreeStar,
            fixFourStar, fixFiveStar, fixSixStar
        );

        coin += fixCoin;
        whiteCount += fixWhiteCount;
        purpleCount += fixPurpleCount;
        pinkCount += fixPinkCount;
        smallCount += fixSmallCount;
        bigCount += fixBigCount;
        // 修好了再来一锤
        successFlag = strengthen(startLevel, equipInfo, up as any, failList);
        coin += equipInfo.coin;
        whiteCount += equipInfo.whiteMeterialCount;
        purpleCount += equipInfo.purpleMeterialCount;
        pinkCount += equipInfo.pinkMeterialCount;
        smallCount += up === 'small' ? 1 : 0;
        bigCount += up === 'big' ? 1 : 0;
    }

    return {
        coin,
        whiteCount,
        purpleCount,
        pinkCount,
        smallCount,
        bigCount,
    };

}
