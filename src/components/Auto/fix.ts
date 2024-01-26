import {repair} from '@/utils';

export function fix(
    equipInfo: any,
    fixOneStar: string, fixTwoStar: string, fixThreeStar: string,
    fixFourStar: string, fixFiveStar: string, fixSixStar: string
) {
    // 累计消耗
    let coin = 0;
    let whiteCount = 0;
    let purpleCount = 0;
    let pinkCount = 0;
    let smallCount = 0;
    let bigCount = 0;

    const catalystMap: any = {
        0: fixOneStar,
        1: fixTwoStar,
        2: fixThreeStar,
        3: fixFourStar,
        4: fixFiveStar,
        5: fixSixStar,
    };

    // 当前时几星
    let currentStart = 0;

    let fillList: any = [];

    // 没修好就一直修
    while (currentStart < equipInfo.star) {
        const successFlag = repair(currentStart, catalystMap[currentStart], fillList);
        coin += equipInfo.coin;
        whiteCount += equipInfo.whiteMeterialCount;
        purpleCount += equipInfo.purpleMeterialCount;
        pinkCount += equipInfo.pinkMeterialCount;
        smallCount += catalystMap[currentStart] === 'small' ? 1 : 0;
        bigCount += catalystMap[currentStart] === 'big' ? 1 : 0;
        if (successFlag) {
            // eslint-disable-next-line no-loop-func
            fillList = fillList.filter((item: any) => item === currentStart);
            currentStart++;
        } else {
            fillList.push(currentStart);
            currentStart = 0;
        }
    }

    return {
        fixCoin: coin,
        fixWhiteCount: whiteCount,
        fixPurpleCount: purpleCount,
        fixPinkCount: pinkCount,
        fixSmallCount: smallCount,
        fixBigCount: bigCount,
    };
}
