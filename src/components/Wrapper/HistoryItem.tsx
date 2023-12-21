import {Badge, Card, Tag} from 'antd';

interface HistoryItemProps {
    successFlag: boolean;
    cost: number;
    whiteCost: number;
    purpleCost: number;
    pinkCost: number;
    usedCatalystList: string[];
}

export function HistoryItem({successFlag, cost, whiteCost, purpleCost, pinkCost, usedCatalystList}: HistoryItemProps) {

    return (
        <Badge.Ribbon text={successFlag ? '强化成功' : '强化失败'} color={successFlag ? 'green' : 'red'}>
            <Card title="消耗统计" size="small">
                <Tag color="gold">金币:{cost.toLocaleString()}</Tag>
                <Tag color="blue">普通材料:{whiteCost}</Tag>
                <Tag color="purple">高级材料:{purpleCost}</Tag>
                <Tag color="pink">稀有材料:{pinkCost}</Tag>
                <Tag color="orange">
                    {/* eslint-disable-next-line max-len */}
                    强化券: +12:{usedCatalystList.filter(item => item === '+12').length} +13:{usedCatalystList.filter(item => item === '+13').length}  +14:{usedCatalystList.filter(item => item === '+14').length}
                </Tag>
                <Tag color="magenta">小崔:{usedCatalystList.filter(item => item === 'small').length}</Tag>
                <Tag color="volcano">大崔:{usedCatalystList.filter(item => item === 'big').length}</Tag>
            </Card>
        </Badge.Ribbon>
    );
}
