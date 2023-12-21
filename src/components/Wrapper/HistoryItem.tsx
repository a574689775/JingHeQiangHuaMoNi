import {Badge, Card, Tag} from 'antd';

interface HistoryItemProps {
    successFlag: boolean;
    cost: number;
    whiteCost: number;
    purpleCost: number;
    pinkCost: number;
    usedCatalystList: string[];
    type?: string;
}

// eslint-disable-next-line max-len
export function HistoryItem({successFlag, cost, whiteCost, purpleCost, pinkCost, usedCatalystList, type}: HistoryItemProps) {

    return (
        <Badge.Ribbon
            text={type === 'fix' ? successFlag ? '修复进度提升' : '修复失败' : successFlag ? '强化成功' : '强化失败'}
            color={successFlag ? 'green' : 'red'}
        >
            <Card title={`${type === 'fix' ? '修复' : '强化'} 影·极黑之蒂亚  ${successFlag ? '成功' : '失败'}`} size="small">
                <Tag color="gold" style={{marginBottom: '10px'}}>金:{cost.toLocaleString()}</Tag>
                <Tag color="blue" style={{marginBottom: '10px'}}>普通:{whiteCost}</Tag>
                <Tag color="purple" style={{marginBottom: '10px'}}>高级:{purpleCost}</Tag>
                <Tag color="pink" style={{marginBottom: '10px'}}>稀有:{pinkCost}</Tag>
                <Tag color="magenta" style={{marginBottom: '10px'}}>
                    小催:{usedCatalystList.filter(item => item === 'small').length}
                </Tag>
                <Tag color="volcano" style={{marginBottom: '10px'}}>
                    大催:{usedCatalystList.filter(item => item === 'big').length}
                </Tag>
                <Tag color="orange" style={{marginBottom: '10px'}}>
                    {/* eslint-disable-next-line max-len */}
                    强化券: +12:{usedCatalystList.filter(item => item === '+12').length} +13:{usedCatalystList.filter(item => item === '+13').length}  +14:{usedCatalystList.filter(item => item === '+14').length}
                </Tag>
            </Card>
        </Badge.Ribbon>
    );
}
