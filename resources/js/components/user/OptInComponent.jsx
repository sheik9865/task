import React, { useState } from "react";
import axios from "axios";

const OptInComponent = () => {
    const [scheduleId, setScheduleId] = useState("");
    
    const handleOptIn = async () => {
        try {
            const token = localStorage.getItem("token");  // Get the auth token
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/api/opt-in`,
                { schedule_id: scheduleId },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert(response.data.message);
            console.log(response.data.message);
        } catch (error) {
            console.error("Opt-in Error:", error.response?.data.message);
        }
    };

    return (
        <div style={{width:'100%'}}>
            <input 
                type="number" 
                placeholder="Enter Schedule ID" 
                value={scheduleId}
                onChange={(e) => setScheduleId(e.target.value)}
            />
            <button onClick={handleOptIn}>Opt In</button>
        </div>
    );
};

export default OptInComponent;
