function menu() {
    return (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <img src="svg/logo.svg" alt="logo" width={40} />
            <input type="search" placeholder="Search" style={{ backgroundColor: 'white', border: 'solid 1px black', borderRadius: '1rem', padding: '0.5rem' }} />
        </div>
    )
}

export default menu;