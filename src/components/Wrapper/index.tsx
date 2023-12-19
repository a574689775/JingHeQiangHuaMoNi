import {useState} from 'react';
import {Button, Card} from 'antd';
import {CaretRightOutlined} from '@ant-design/icons';
import {Material} from '@/components/Material';
import {Catalyst} from '@/components/Catalyst';

export function Wrapper() {

    const [historyList, setHistoryList] = useState(['这里会存放强化历史记录']);

    function handleClick() {
        setHistoryList([...historyList, '强化次数+1']);
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
                >
                    {
                        historyList.map(item => (
                            <div
                                key={item}
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
                        影·极黑之蒂亚 +17
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
                        <div>17</div>
                        <CaretRightOutlined style={{margin: '0 20px'}} />
                        <div>18</div>
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
                        <Material type="white" total={99999} need={36} />
                        <Material type="purple" total={99999} need={12} />
                        <Catalyst />
                    </div>
                    <div style={{marginTop: '50px', paddingLeft: '50px'}}>
                        <div style={{fontSize: '16px'}}>
                            13%成功率<span style={{color: 'orange'}}>(若失败，装备破损)</span>
                        </div>
                        {/* eslint-disable-next-line react/jsx-no-bind */}
                        <Button type="primary" style={{width: '300px', height: '60px'}} onClick={handleClick}>
                            强化
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    );
}
