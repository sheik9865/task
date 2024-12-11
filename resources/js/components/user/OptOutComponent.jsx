import React, { useState } from "react";
import axios from "axios";

const OptOutComponent = () => {
    const [scheduleId, setScheduleId] = useState("");

    const handleOptOut = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/opt-out`,
                { schedule_id: scheduleId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(response.data.message);
            console.log(response.data.message);
        } catch (error) {
            console.error("Opt-out Error:", error.response?.data.message);
        }
    };

    return (
        <div>
            <input 
                type="number" 
                placeholder="Enter Schedule ID"
                value={scheduleId}
                onChange={(e) => setScheduleId(e.target.value)}
            />
            <button onClick={handleOptOut}>Opt Out</button>
        </div>
    );
};

export default OptOutComponent;
