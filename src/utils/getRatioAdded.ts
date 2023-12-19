
// 根据失败记录获取概率增加值
export function getRatioAdded(level: number, failList: number[]) {
    return failList.filter(item => item === level).length * 7;
}
