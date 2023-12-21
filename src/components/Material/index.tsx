

interface MaterialProps {
    type: 'white' | 'purple' | 'pink';
    total: number | string;
    need: number;
}

export function Material({type, total, need}: MaterialProps) {

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
                        color: type === 'white' ? 'black' : type === 'purple' ? 'purple' : 'pink',
                    }}
            >
                {type === 'white' ? '普通零件' : type === 'purple' ? '高级零件' : '稀有零件'}
            </div>
            <div>{total} / {need}</div>
        </div>
    );
}
