import {PlusOutlined} from '@ant-design/icons';

export function Catalyst() {

    return (
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
                        fontSize: '40px',
                    }}
            >
                <PlusOutlined />
            </div>
            <div>提升概率</div>
        </div>
    );
}
