export default function Empty({ title }) {

    return (
        <>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                width: '50%',
                margin: 'auto'
            }}>
                <center>
                    <img
                        style={{ width: 350, height: 350 }}
                        src="/images/empty.svg"
                    />
                    <h2 style={{
                        fontWeight: 500,
                        fontSize: 25,
                    }}>
                        {title}
                    </h2>
                </center>
            </div>
        </>
    )
}