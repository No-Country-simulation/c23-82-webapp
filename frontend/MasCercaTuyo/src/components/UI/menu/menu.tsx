import Profile from "../profile/profile";

function menu() {
    return (
        <div style={{ display: "flex", gap: "1rem", width: "100%", padding: "1rem" }}>
            <img src="svg/logo.svg" alt="logo" width={40} />
            <input type="search" placeholder="Search" style={{ backgroundColor: 'white', border: 'solid 1px black', borderRadius: '1rem', padding: '0.5rem', width: '40%' }} />
            <Profile />
        </div>
    )
}

export default menu;