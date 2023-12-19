import {Dropdown} from 'antd';
import type {MenuProps} from 'antd';
import {PlusOutlined} from '@ant-design/icons';

interface CatalystProps {
    catalyst: 'none' | 'small' | 'big' | '+12' | '+13' | '+14';
    setCatalyst: (catalyst: 'none' | 'small' | 'big' | '+12' | '+13' | '+14') => void;
    level: number;
}

export function Catalyst({catalyst, setCatalyst, level}: CatalystProps) {

    const items: MenuProps['items'] = [
        {
            key: 'none',
            label: (<div onClick={() => setCatalyst('none')}>就他妈干拉</div>),
        },
        {
            key: 'small',
            label: (<div onClick={() => setCatalyst('small')}>小催</div>),
        },
        {
            key: 'big',
            label: (<div onClick={() => setCatalyst('big')}>大催</div>),
        },
    ];

    if (level < 12) {
        items.push(
            {
                key: '+12',
                label: (<div onClick={() => setCatalyst('+12')}>+12强化券</div>),
            }
        );
    }

    if (level < 13) {
        items.push(
            {
                key: '+13',
                label: (<div onClick={() => setCatalyst('+13')}>+13强化券</div>),
            }
        );
    }

    if (level < 14) {
        items.push(
            {
                key: '+14',
                label: (<div onClick={() => setCatalyst('+14')}>+14强化券</div>),
            }
        );
    }

    return (
        <Dropdown menu={{items}} placement="topCenter" trigger={['click']}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                <div
                    style={
                        {
                            width: '50px',
                            height: '50px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: '1px solid #000',
                            padding: '10px',
                            cursor: 'pointer',
                        }}
                >
                    {catalyst === 'none' ? (<PlusOutlined />) : <></>}
                    {catalyst === 'small' ? '小催' : <></>}
                    {catalyst === 'big' ? '大催' : <></>}
                    {catalyst === '+12' ? '+12' : <></>}
                    {catalyst === '+13' ? '+13' : <></>}
                    {catalyst === '+14' ? '+14' : <></>}
                </div>
                <div>提升概率</div>
            </div>
        </Dropdown>
    );
}
