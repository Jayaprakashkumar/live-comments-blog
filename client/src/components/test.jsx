import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000/";


function Test() {
    const [response, setResponse] = useState("");

    useEffect(() => {
        const socket = io(ENDPOINT);
        socket.on("connected", (data) => {
            setResponse(data);
            console.log(data);
        });
    }, []);

    return (
        <div>

        </div>
    );
}












export default Test;