
// 输入成功率 输出结果
export function strengthen(successRatio: number) {
    // 0-99的随机数
    const random = Math.floor(Math.random() * 100);
    if (random < successRatio) {
        return true;
    } else {
        return false;
    }
}
