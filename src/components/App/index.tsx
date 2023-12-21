import {useState} from 'react';
import {Layout, Menu} from 'antd';
import type {MenuProps} from 'antd';
import {RiseOutlined, FireOutlined} from '@ant-design/icons';
import {Wrapper} from '@/components/Wrapper';

const {Footer, Content} = Layout;

export default function App() {
    const [current, setCurrent] = useState('1');

    const layoutStyle = {
        borderRadius: 8,
        overflow: 'hidden',
        height: '100vh',
    };

    const onClick: MenuProps['onClick'] = e => {
        setCurrent(e.key);
    };

    const items: MenuProps['items'] = [
        {
            label: '手动强化',
            key: '1',
            icon: <FireOutlined />,
        },
        {
            label: '自动强化',
            key: '2',
            icon: <RiseOutlined />,
        },
    ];

    return (
        <Layout style={layoutStyle}>
            <Menu
                // eslint-disable-next-line react/jsx-no-bind
                onClick={onClick}
                selectedKeys={[current]}
                mode="horizontal"
                items={items}
                theme="dark"
            />
            <Content style={{padding: '14px', backgroundColor: '#f0f2f5'}}>
                <Wrapper />
            </Content>
            {/* eslint-disable-next-line max-len */}
            <Footer style={{textAlign: 'center', backgroundColor: '#fff'}}>
                Version：V 1.1.0&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;更新时间：2023-12-21&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;版权所有：帅B橙子
            </Footer>
        </Layout>

    );
}
