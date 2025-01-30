/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

function Likes() {

    const [seguidores, setSeguidores] = useState(0);
    const [seguidos, setSeguidos] = useState(0);

    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <label>
                    {seguidores}
                </label>
                <label>
                    Seguidores
                </label>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
                <label>
                    {seguidos}
                </label>
                <label>
                    Seguidos
                </label>
            </div>
        </div>
    )
}

export default Likes