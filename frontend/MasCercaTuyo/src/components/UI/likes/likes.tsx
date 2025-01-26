/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";

function Likes() {

    const [seguidores, setSeguidores] = useState(0);
    const [seguidos, setSeguidos] = useState(0);

    return (
        <div style={{ display: "flex", gap: "1rem" }}>
            <div>{seguidores}</div>
            <div>{seguidos}</div>
        </div>
    )
}

export default Likes