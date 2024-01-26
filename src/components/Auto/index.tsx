import {useState} from 'react';
import {Card, Form, InputNumber, Button, Select, Table, Row, Col} from 'antd';
import {handleFinish} from './handleFinish';

export function Auto() {

    const [history, setHistory] = useState<any[]>([]);

    return (
        <div>
            <Form
                // eslint-disable-next-line react/jsx-no-bind
                onFinish={(v: any) => handleFinish(v, setHistory)}
                initialValues={{
                    startLevel: 18, endLevel: 19,
                    fixOneStar: 'none', fixTwoStar: 'none', fixThreeStar: 'small',
                    fixFourStar: 'small', fixFiveStar: 'big', fixSixStar: 'big',
                    up: 'big', testCount: 1000,
                }}
            >
                <Card title="强化计划" style={{marginBottom: 16}}>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="强化起始等级" name="startLevel">
                                <Select
                                    options={
                                        [15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
                                            .map(v => ({label: `+${v}`, value: v}))
                                    }
                                    style={{width: 'calc(100% - 20px)'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="强化目标等级" name="endLevel">
                                <Select
                                    options={
                                        [16, 17, 18, 19, 20, 21, 22, 23, 24, 25]
                                            .map(v => ({label: `+${v}`, value: v}))
                                    }
                                    style={{width: '100%'}}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="修复一星方案" name="fixOneStar">
                                <Select
                                    options={[
                                        {label: '空拉', value: 'none'},
                                        {label: '小催', value: 'small'},
                                        {label: '大催', value: 'big'},
                                    ]}
                                    style={{width: 'calc(100% - 20px)'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="修复二星方案" name="fixTwoStar">
                                <Select
                                    options={[
                                        {label: '空拉', value: 'none'},
                                        {label: '小催', value: 'small'},
                                        {label: '大催', value: 'big'},
                                    ]}
                                    style={{width: 'calc(100% - 20px)'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="修复三星方案" name="fixThreeStar">
                                <Select
                                    options={[
                                        {label: '空拉', value: 'none'},
                                        {label: '小催', value: 'small'},
                                        {label: '大催', value: 'big'},
                                    ]}
                                    style={{width: '100%'}}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Form.Item label="修复四星方案" name="fixFourStar">
                                <Select
                                    options={[
                                        {label: '空拉', value: 'none'},
                                        {label: '小催', value: 'small'},
                                        {label: '大催', value: 'big'},
                                    ]}
                                    style={{width: 'calc(100% - 20px)'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="修复五星方案" name="fixFiveStar">
                                <Select
                                    options={[
                                        {label: '空拉', value: 'none'},
                                        {label: '小催', value: 'small'},
                                        {label: '大催', value: 'big'},
                                    ]}
                                    style={{width: 'calc(100% - 20px)'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item label="修复六星方案" name="fixSixStar">
                                <Select
                                    options={[
                                        {label: '空拉', value: 'none'},
                                        {label: '小催', value: 'small'},
                                        {label: '大催', value: 'big'},
                                    ]}
                                    style={{width: '100%'}}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12}>
                            <Form.Item label="强化方案" name="up">
                                <Select
                                    options={[
                                        {label: '空拉', value: 'none'},
                                        {label: '小催', value: 'small'},
                                        {label: '大催', value: 'big'},
                                    ]}
                                    style={{width: 'calc(100% - 20px)'}}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="模拟次数" name="testCount">
                                <InputNumber style={{width: '100%'}} />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                            开锤
                        </Button>
                    </Form.Item>
                </Card>
            </Form>
            <Card title="模拟结果" style={{marginBottom: 16}} bodyStyle={{fontSize: 16}}>
                <span style={{marginRight: 24}}>
                    共计实验
                    <span style={{fontSize: 24, fontWeight: 500, color: '#3875f6', margin: '0 4px'}}>
                        {history.length}
                    </span>
                    次
                </span>
                <div>
                    <span style={{marginRight: 24}}>
                        平均消耗金币
                        <span style={{fontSize: 24, fontWeight: 500, color: '#faad14', margin: '0 4px'}}>
                            ${(history.reduce((a, b) => a + b.coin, 0) / history.length).toLocaleString()}
                        </span>
                    </span>
                    <span style={{marginRight: 24}}>
                        平均消耗白色零件
                        <span style={{fontSize: 24, fontWeight: 500, color: '#bfbfbf', margin: '0 4px'}}>
                            {Math.floor(history.reduce((a, b) => a + b.whiteCount, 0) / history.length)}
                        </span>
                        个
                    </span>
                    <span style={{marginRight: 24}}>
                        平均消耗紫色零件
                        <span style={{fontSize: 24, fontWeight: 500, color: '#722ed1', margin: '0 4px'}}>
                            {Math.floor(history.reduce((a, b) => a + b.purpleCount, 0) / history.length)}
                        </span>
                        个
                    </span>
                    <span style={{marginRight: 24}}>
                        平均消耗粉色零件
                        <span style={{fontSize: 24, fontWeight: 500, color: '#eb2f96', margin: '0 4px'}}>
                            {Math.floor(history.reduce((a, b) => a + b.pinkCount, 0) / history.length)}
                        </span>
                        个
                    </span>
                </div>
                <div>
                    <span style={{marginRight: 24}}>
                        平均消耗小崔
                        <span style={{fontSize: 24, fontWeight: 500, color: '#f759ab', margin: '0 4px'}}>
                            {Math.floor(history.reduce((a, b) => a + b.smallCount, 0) / history.length)}
                        </span>
                        个
                    </span>
                    <span style={{marginRight: 24}}>
                        平均消耗大崔
                        <span style={{fontSize: 24, fontWeight: 500, color: '#fadb14', margin: '0 4px'}}>
                            {Math.floor(history.reduce((a, b) => a + b.bigCount, 0) / history.length)}
                        </span>
                        个
                    </span>
                </div>
            </Card>
            <Card title="历史记录">
                <Table
                    dataSource={history}
                    columns={[
                        {
                            title: '次数',
                            dataIndex: 'count',
                            render(text, record, index) {
                                return <div>第{index + 1}次</div>;
                            },
                        },
                        {
                            title: '消耗金币',
                            dataIndex: 'coin',
                            render(text) {
                                return <div>${text.toLocaleString()}</div>;
                            },
                        },
                        {title: '消耗白色零件', dataIndex: 'whiteCount'},
                        {title: '消耗紫色零件', dataIndex: 'purpleCount'},
                        {title: '消耗粉色零件', dataIndex: 'pinkCount'},
                        {title: '消耗小崔', dataIndex: 'smallCount'},
                        {title: '消耗大崔', dataIndex: 'bigCount'},
                    ]}
                    scroll={{x: true}}
                />
            </Card>
        </div>
    );
}
