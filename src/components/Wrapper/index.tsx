/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import {useState, useRef, useEffect} from 'react';
import {Button, Card, Rate} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import {Material} from '@/components/Material';
import {Catalyst} from '@/components/Catalyst';
import {getEquipInfo, strengthen, repair} from '@/utils';
import {HistoryItem} from './HistoryItem';

// eslint-disable-next-line complexity
export function Wrapper() {

    const scrollRef: any = useRef(null);
    // 强化按钮是否加载中
    const [loading, setLoading] = useState(false);
    // 强化历史记录
    const [historyList, setHistoryList] = useState([<></>]);
    // 当前强化等级
    const [level, setLevel] = useState(10);
    // 当前强化等级的装备信息
    const equipInfo = getEquipInfo(level);
    // 已消耗金币数
    const [cost, setCost] = useState(equipInfo.coin);
    // 已消耗普通零件数
    const [whiteCost, setWhiteCost] = useState(equipInfo.whiteMeterialCount);
    // 已消耗高级零件数
    const [purpleCost, setPurpleCost] = useState(equipInfo.purpleMeterialCount);
    // 已消耗稀有零件数
    const [pinkCost, setPinkCost] = useState(equipInfo.pinkMeterialCount);
    // 已消耗道具
    const [usedCatalystList, setUsedCatalystList] = useState([] as string[]);
    // 当前选择的提升概率道具
    const [catalyst, setCatalyst] = useState('none' as any);
    // 已冲击的失败记录 用于模拟保底
    const [failList, setFailList] = useState([] as number[]);
    // 修复失败记录 用于模拟保底
    const [fixFailList, setFixFailList] = useState([] as number[]);
    // 账号总流金
    const [totalFlowGold, setTotalFlowGold] = useState(5000000000);
    // 账号总绑金
    const [totalBindGold, setTotalBindGold] = useState(5000000000);
    // 延迟函数
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    // 当前装备是否破损
    const [isBreak, setIsBreak] = useState(false);
    // 当前装备修复进度
    const [repairProgress, setRepairProgress] = useState(0);

    // 当子元素更新后，滚动到底部
    useEffect(
        () => {
            if (scrollRef.current) {
                const parentContainer = scrollRef.current;
                parentContainer.scrollTop = parentContainer.scrollHeight;
            }
        },
        [historyList]
    );

    // eslint-disable-next-line max-statements
    async function handleClick() {
        setLoading(() => true);
        await delay(1000);

        // 用卷子强化完清空提升概率道具
        if (catalyst.startsWith('+')) {
            setCatalyst(() => 'none');
        }

        // 消耗金币数、材料、道具对应增加
        const newCost = cost + equipInfo.coin;
        const newWhiteCost = whiteCost + equipInfo.whiteMeterialCount;
        const newPurpleCost = purpleCost + equipInfo.purpleMeterialCount;
        const newPinkCost = pinkCost + equipInfo.pinkMeterialCount;
        const newUsedCatalystList = [...usedCatalystList, catalyst];
        setCost(newCost);
        setWhiteCost(newWhiteCost);
        setPurpleCost(newPurpleCost);
        setPinkCost(newPinkCost);
        setUsedCatalystList(newUsedCatalystList);

        // 更新金币 优先花绑金
        setTotalFlowGold(totalFlowGold => (totalBindGold < equipInfo.coin ? totalFlowGold - equipInfo.coin + totalBindGold : totalFlowGold));
        setTotalBindGold(totalBindGold => (totalBindGold < equipInfo.coin ? 0 : totalBindGold - equipInfo.coin));

        // 破损的装备走修复
        if (isBreak) {
            const repairRes = repair(repairProgress, catalyst, fixFailList);
            if (repairRes) { // 修复成功
                if (repairProgress + 1 === equipInfo.star) { // 修复完成
                    setIsBreak(false);
                    setFailList([]); // 修复成功后清空失败记录
                } else { // 修复未完成
                    setFailList(failList => failList.filter(item => item > repairProgress)); // 删除比当前修复等级小的失败记录(重置保底)
                    setRepairProgress(repairProgress + 1); // 修复进度+1
                }
            } else { // 修复失败
                setFixFailList(fixFailList => [...fixFailList, repairProgress]); // 记录修复保底
                setRepairProgress(0); // 修复进度为0
            }

            // 记录修复历史
            setHistoryList(historyList => [
                ...historyList,
                <HistoryItem key={Math.random()} type="fix" successFlag={repairRes} cost={newCost} whiteCost={newWhiteCost} purpleCost={newPurpleCost} pinkCost={newPinkCost} usedCatalystList={newUsedCatalystList} />,
            ]);

            setLoading(() => false);
            return;
        }

        // 先来一锤子
        const successFlag = strengthen(level, equipInfo, catalyst, failList);

        if (successFlag) {// 成功逻辑
            setLevel(level => (catalyst.startsWith('+') ? Number(catalyst.split('+')[1]) : level + 1)); // 强化等级+1（用了卷子就变成卷子等级）
            setFailList(failList => failList.filter(item => item > level)); // 删除比当前等级小的失败记录(重置保底)
        } else {// 失败逻辑
            setFailList(failList => [...failList, level]); // 记录强化保底记录
            if (level > 14) {
                setIsBreak(true); // 装备破损
                setRepairProgress(0); // 修复进度为0
            } else {
                setLevel(level => (level === 10 ? 10 : level - 1));
            }
        }

        // 记录强化历史
        setHistoryList(historyList => [
            ...historyList,
            <HistoryItem key={Math.random()} successFlag={successFlag} cost={newCost} whiteCost={newWhiteCost} purpleCost={newPurpleCost} pinkCost={newPinkCost} usedCatalystList={newUsedCatalystList} />,
        ]);


        setLoading(() => false);
    }

    return (
        <Card style={{height: '100%'}}>
            <div style={{display: 'flex', gap: '40px'}}>
                <div ref={scrollRef} style={{width: 'calc(100% - 400px)', paddingRight: '40px', overflowY: 'auto', height: 'calc(100vh - 192px)'}}>
                    {
                        historyList.map(item => (
                            <div key={Math.random()} style={{lineHeight: '24px', marginBottom: '12px'}}>
                                {item}
                            </div>
                        ))
                    }
                </div>
                <div style={{width: '400px'}}>
                    <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '16px'}}>
                        <div>金币：{totalFlowGold.toLocaleString()}</div>
                        <div>绑定金币：{totalBindGold.toLocaleString()}</div>
                    </div>
                    <div style={{fontSize: '28px', height: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #000', marginTop: '40px', fontWeight: 600}}>
                        影·极黑之蒂亚 +{level}
                    </div>
                    {
                        isBreak ? (
                            <div style={{display: 'flex', marginTop: '40px', alignItems: 'center', justifyContent: 'center'}}>
                                <Rate disabled value={repairProgress} count={equipInfo.star} />
                            </div>
                        ) : (
                            <div style={{display: 'flex', marginTop: '40px', alignItems: 'center', justifyContent: 'center', fontSize: '16px'}}>
                                <div>{level}</div>
                                <CaretRightOutlined style={{margin: '0 20px'}} />
                                <div>{level + 1}</div>
                            </div>
                        )
                    }
                    <div style={{marginTop: '40px'}}>强化属性</div>
                    <div style={{display: 'flex'}}>
                        <div style={{marginRight: '160px'}}>破防物攻</div>
                        <div>{level * 100}<CaretRightOutlined style={{margin: '0 20px'}} />{(level + 1) * 100}</div>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div style={{marginRight: '160px'}}>破防魔攻</div>
                        <div>{level * 100}<CaretRightOutlined style={{margin: '0 20px'}} />{(level + 1) * 100}</div>
                    </div>
                    <div style={{marginTop: '50px', display: 'flex', justifyContent: 'space-around'}}>
                        <Material type="white" total={'无限'} need={equipInfo.whiteMeterialCount} />
                        <Material type="purple" total={'无限'} need={equipInfo.purpleMeterialCount} />
                        <Catalyst catalyst={catalyst} setCatalyst={setCatalyst} level={level} />
                    </div>
                    <div style={{marginTop: '50px', paddingLeft: '50px'}}>
                        <div style={{fontSize: '16px'}}>
                            {
                                catalyst.startsWith('+')
                                    ? 100
                                    : catalyst === 'none'
                                        ? isBreak ? 20 : equipInfo.successRatio
                                        : (isBreak ? 20 : equipInfo.successRatio) + (catalyst === 'big' ? 7 : 4)
                            }
                            %成功率
                            <span style={{color: 'orange'}}>(若失败，{isBreak ? '修复进度清空' : level > 14 ? '装备破损' : '强化等级 - 1'})</span>
                        </div>
                        <Button
                            type="primary"
                            style={{width: '300px', height: '60px', backgroundColor: '#ff6440', fontSize: '20px', fontWeight: 500}}
                            onClick={handleClick}
                            disabled={level === 25 || loading || totalFlowGold < equipInfo.coin}
                        >
                            {`${totalFlowGold < equipInfo.coin ? '金币不足' : isBreak ? '修复一次' : '强化'}（${equipInfo.coin.toLocaleString()}）`}
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
