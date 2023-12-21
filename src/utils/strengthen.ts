/* eslint-disable max-len */
import {getRatioAdded, tryOnce} from './index';

// 入参说明
// level: 强化等级
// equipInfo: 装备信息
// catalyst: 催化剂或者卷子的使用情况
// failList: 失败记录 用于计算保底

// 返回值说明
// success: 强化是否成功 true: 成功 false: 失败
export function strengthen(
    level: number,
    equipInfo: {coin: number, whiteMeterialCount: number, purpleMeterialCount: number, pinkMeterialCount: number, successRatio: number},
    catalyst: 'none' | '+12' | '+13' | '+14' | 'big' | 'small',
    failList: number[]
) {

    // 保底机制增加的概率
    const addRatio = getRatioAdded(level, failList);

    // 选择催化剂或者卷子增加的概率
    const catalystRatio = catalyst.startsWith('+')
        ? 100
        : catalyst === 'none' ? 0 : catalyst === 'big' ? 7 : 4;

    // 根据概率获取强化结果 成功或者失败
    return tryOnce(equipInfo.successRatio + addRatio + catalystRatio);

}
