import {upOneLevel} from './upOneLevel';

export const handleFinish = (values: any, setHistory: any) => {

    // 填写的表单信息
    const {
        startLevel, endLevel,
        fixOneStar, fixTwoStar, fixThreeStar,
        fixFourStar, fixFiveStar, fixSixStar,
        testCount, up,
    } = values;

    // 初始化一个历史记录
    const result: any = [];

    // 每次强化
    for (let i = 0; i < testCount; i++) {

        // 当前等级
        let currentLevel = startLevel;

        // 累计消耗
        const cost = {
            coin: 0,
            whiteCount: 0,
            purpleCount: 0,
            pinkCount: 0,
            smallCount: 0,
            bigCount: 0,
        };

        while (currentLevel < endLevel) {
            // 强化提升一个等级
            const {coin, whiteCount, purpleCount, pinkCount, smallCount, bigCount} = upOneLevel(
                currentLevel,
                fixOneStar, fixTwoStar, fixThreeStar,
                fixFourStar, fixFiveStar, fixSixStar,
                up
            );
            currentLevel += 1;
            cost.coin += coin;
            cost.whiteCount += whiteCount;
            cost.purpleCount += purpleCount;
            cost.pinkCount += pinkCount;
            cost.smallCount += smallCount;
            cost.bigCount += bigCount;
        }

        result.push(cost);
    }

    setHistory(result);
};
