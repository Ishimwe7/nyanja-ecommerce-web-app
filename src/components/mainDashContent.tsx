import { useEffect, useState } from 'react';
import '../CSS/adminMainContent.css';

const MainDashContent = () => {
    const [currentTime, setCurrentTime] = useState<string>('');

    useEffect(() => {
        // Fetch current time or any other dynamic content from an API
        const fetchCurrentTime = async () => {
            try {
                const response = await fetch('https://worldtimeapi.org/api/ip');
                if (response.ok) {
                    const data = await response.json();
                    const { datetime } = data;
                    setCurrentTime(new Date(datetime).toLocaleString());
                } else {
                    setCurrentTime('Error fetching current time');
                }
            } catch (error) {
                setCurrentTime('Error fetching current time');
            }
        };

        fetchCurrentTime();
    }, []);

    return (
        <div id="admin-main-content">
            <h1>Welcome back, Admin!</h1>
            <div className="welcome-content">
                <p>
                    You are logged in as an admin. This dashboard provides you with tools
                    and insights to manage your application effectively.
                </p>
                <div className="current-time">
                    <p>Current Time: {currentTime}</p>
                </div>
            </div>
        </div>
    );
}

export default MainDashContent;
