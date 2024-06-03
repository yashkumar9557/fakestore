const Loader = () => {
    return (
        <div
            className="loader"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: '#0000005e',
                zIndex: 9,
            }}
        >
            <div
                className="spinner-grow"
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    zIndex: 999,
                }}
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
export default Loader
