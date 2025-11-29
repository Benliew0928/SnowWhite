const { GoogleGenerativeAI } = require("@google/generative-ai");

const apiKey = "AIzaSyD1ZFy8tnjf5Yb4P2kKQt5ZCU4txjPfZoY";

async function listModels() {
    const genAI = new GoogleGenerativeAI(apiKey);
    try {
        console.log("Testing gemini-1.5-flash...");
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const result = await model.generateContent("Hello");
            console.log("gemini-1.5-flash works!");
        } catch (e) {
            console.log("gemini-1.5-flash failed:", e.message);
        }

        console.log("Testing gemini-1.5-flash-001...");
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-001" });
            const result = await model.generateContent("Hello");
            console.log("gemini-1.5-flash-001 works!");
        } catch (e) {
            console.log("gemini-1.5-flash-001 failed:", e.message);
        }

        console.log("Testing gemini-pro...");
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await model.generateContent("Hello");
            console.log("gemini-pro works!");
        } catch (e) {
            console.log("gemini-pro failed:", e.message);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();
