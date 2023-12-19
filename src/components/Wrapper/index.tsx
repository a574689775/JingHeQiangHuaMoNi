import {useState, useRef, useEffect} from 'react';
import {Button, Card} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import {Material} from '@/components/Material';
import {Catalyst} from '@/components/Catalyst';
import {getEquipInfo, strengthen, getRatioAdded} from '@/utils';

export function Wrapper() {

    const scrollRef: any = useRef(null);
    const [loading, setLoading] = useState(false);
    // 强化历史记录
    const [historyList, setHistoryList] = useState([<div key={Math.random()}>这里会存放强化历史记录</div>]);
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
    // 已冲击的失败记录 用于模拟保底
    const [failList, setFailList] = useState([] as number[]);

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

    function handleClick() {

        setLoading(true);
        // 模拟延时
        setTimeout(() => {
            // 消耗金币数、材料对应增加
            setCost(cost + equipInfo.coin);
            setWhiteCost(whiteCost + equipInfo.whiteMeterialCount);
            setPurpleCost(purpleCost + equipInfo.purpleMeterialCount);
            setPinkCost(pinkCost + equipInfo.pinkMeterialCount);

            // 保底机制增加的概率
            const addRatio = getRatioAdded(level, failList);

            // 根据概率获取强化结果 成功或者失败
            const result = strengthen(equipInfo.successRatio + addRatio);

            // 记录强化历史
            // eslint-disable-next-line max-len
            setHistoryList([
                ...historyList,
                <div key={Math.random()}>
                    <span><span style={{color: '#108cee'}}>强化</span>【影·极黑之蒂亚+{level}】</span>
                    <span style={{marginRight: '12px', color: result ? 'green' : 'red'}}>{result ? '成功' : '失败'}</span>
                    <span style={{marginRight: '12px'}}>
                        已消耗：<span style={{color: 'gold'}}>金币</span>【{cost.toLocaleString()}】
                    </span>
                    <span style={{marginRight: '12px'}}>普通材料【{whiteCost}个】</span>
                    <span style={{marginRight: '12px'}}>
                        <span style={{color: 'purple'}}>高级材料</span>【{purpleCost}个】
                    </span>
                    <span style={{marginRight: '12px'}}><span style={{color: 'pink'}}>稀有材料</span>【{pinkCost}个】</span>
                </div>,
            ]);

            // 更新强化等级和保底记录
            if (result) {
                setLevel(level + 1);
                // 强化成功了 删除比当前等级小的失败记录
                const newFailList = failList.filter(item => item > level);
                setFailList(newFailList);
            } else {
            // 强化失败了就记录在失败列表里
                setFailList([...failList, level]);
                if (level === 10) {
                    setLoading(false);
                    return;
                }
                setLevel(level - 1);
            }
            setLoading(false);
        }, 500);


    }

    return (
        <Card style={{height: '100%'}}>
            <div style={{display: 'flex'}}>
                <div
                    style={{
                        width: 'calc(100% - 400px)',
                        paddingRight: '20px',
                        overflowY: 'auto',
                        height: 'calc(100vh - 192px)',
                    }}
                    ref={scrollRef}
                >
                    {
                        historyList.map(item => (
                            <div
                                key={Math.random()}
                                style={{
                                    border: '1px solid #000',
                                    height: '40px',
                                    lineHeight: '40px',
                                    padding: '0 20px',
                                    marginBottom: '4px',
                                }}
                            >
                                {item}
                            </div>
                        ))
                    }
                </div>
                <div style={{width: '400px'}}>
                    <div style={{display: 'flex'}}>
                        <div style={{marginRight: '100px'}}>流动金：9999999999</div>
                        <div>绑金：9999999999</div>
                    </div>
                    <div
                        style={{
                            fontSize: '20px',
                            height: '80px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #000',
                            marginTop: '40px',
                            fontWeight: 600,
                        }}
                    >
                        影·极黑之蒂亚 +{level}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            marginTop: '40px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px',
                        }}
                    >
                        <div>{level}</div>
                        <CaretRightOutlined style={{margin: '0 20px'}} />
                        <div>{level + 1}</div>
                    </div>
                    <div style={{marginTop: '20px'}}>强化属性</div>
                    <div style={{display: 'flex'}}>
                        <div style={{marginRight: '160px'}}>破防物攻</div>
                        <div>2428<CaretRightOutlined style={{margin: '0 20px'}} />3010</div>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div style={{marginRight: '160px'}}>破防魔攻</div>
                        <div>2428<CaretRightOutlined style={{margin: '0 20px'}} />3010</div>
                    </div>
                    <div style={{marginTop: '50px', display: 'flex', justifyContent: 'space-around'}}>
                        <Material type="white" total={99999} need={equipInfo.whiteMeterialCount} />
                        <Material type="purple" total={99999} need={equipInfo.purpleMeterialCount} />
                        <Catalyst />
                    </div>
                    <div style={{marginTop: '50px', paddingLeft: '50px'}}>
                        <div style={{fontSize: '16px'}}>
                            {equipInfo.successRatio}%成功率<span style={{color: 'orange'}}>(若失败，强化等级 - 1)</span>
                        </div>
                        {/* eslint-disable-next-line react/jsx-no-bind */}
                        <Button
                            type="primary"
                            style={{width: '300px', height: '60px'}}
                            // eslint-disable-next-line react/jsx-no-bind
                            onClick={handleClick}
                            disabled={level === 15}
                            loading={loading}
                        >
                            强化（{equipInfo.coin.toLocaleString()}）
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
