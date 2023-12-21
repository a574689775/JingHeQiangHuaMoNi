/* eslint-disable react/jsx-no-bind */
/* eslint-disable max-len */
import {useState, useRef, useEffect} from 'react';
import {Button, Card} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import {Material} from '@/components/Material';
import {Catalyst} from '@/components/Catalyst';
import {getEquipInfo, strengthen} from '@/utils';
import {HistoryItem} from './HistoryItem';

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
    // 账号总流金
    const [totalFlowGold, setTotalFlowGold] = useState(50000000000);
    // 账号总绑金
    const [totalBindGold, setTotalBindGold] = useState(50000000000);
    // 延迟函数
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));


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

        const successFlag = strengthen(level, equipInfo, catalyst, failList);

        // 更新强化等级和保底记录
        if (successFlag) {
            setLevel(level => (catalyst.startsWith('+') ? Number(catalyst.split('+')[1]) : level + 1));
            // 强化成功了 删除比当前等级小的失败记录
            setFailList(failList => failList.filter(item => item > level));
        } else {
            // 强化失败了就记录在失败列表里
            setFailList(failList => [...failList, level]);
            setLevel(level => (level === 10 ? 10 : level - 1));
        }

        // 记录强化历史
        // eslint-disable-next-line max-len
        setHistoryList(historyList => [
            ...historyList,
            <HistoryItem key={Math.random()} successFlag={successFlag} cost={newCost} whiteCost={newWhiteCost} purpleCost={newPurpleCost} pinkCost={newPinkCost} usedCatalystList={newUsedCatalystList} />,
        ]);

        setLoading(() => false);
    }

    return (
        <Card style={{height: '100%'}}>
            <div style={{display: 'flex'}}>
                <div ref={scrollRef} style={{width: 'calc(100% - 400px)', paddingRight: '80px', overflowY: 'auto', height: 'calc(100vh - 192px)'}}>
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
                    <div style={{display: 'flex', marginTop: '40px', alignItems: 'center', justifyContent: 'center', fontSize: '16px'}}>
                        <div>{level}</div>
                        <CaretRightOutlined style={{margin: '0 20px'}} />
                        <div>{level + 1}</div>
                    </div>
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
                                    : catalyst === 'none' ? equipInfo.successRatio : equipInfo.successRatio + (catalyst === 'big' ? 7 : 4)
                            }
                            %成功率
                            <span style={{color: 'orange'}}>(若失败，强化等级 - 1)</span>
                        </div>
                        <Button
                            type="primary"
                            style={{width: '300px', height: '60px', backgroundColor: '#ff6440', fontSize: '20px', fontWeight: 500}}
                            onClick={handleClick}
                            disabled={level === 15 || loading || totalFlowGold < equipInfo.coin}
                        >
                            {`${totalFlowGold < equipInfo.coin ? '金币不足' : '强化'}（${equipInfo.coin.toLocaleString()}）`}
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
