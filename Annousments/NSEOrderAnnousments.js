const axios = require("axios").default;
const { CookieJar } = require("tough-cookie");

// Create cookie jar
const jar = new CookieJar();

async function test() {
    try {
        const axiosInstance = axios.create({
            jar,
            withCredentials: true,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                "Accept": "text/html"
            }
        });

        // Step 1: Load NSE main page (sets cookies)
        await axiosInstance.get("https://www.nseindia.com");

        // Step 2: Call the announcements API
        const response = await axiosInstance.get(
            "https://www.nseindia.com/api/corporate-announcements?index=equities&from_date=22-10-2025&to_date=23-10-2025&reqXbrl=false&subject=Bagging%2FReceiving%20of%20orders%2Fcontracts",
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
                    "Accept": "application/json",
                    "Referer": "https://www.nseindia.com/"
                }
            }
        );

        console.log("DATA:", response.data);

    } catch (err) {
        console.error("ERROR:", err.message);
    }
}