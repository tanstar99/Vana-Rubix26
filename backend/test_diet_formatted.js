
import fetch from 'node-fetch';

async function test() {
    try {
        const response = await fetch("http://localhost:5000/api/diet/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ plantNames: ["Tulsi", "Ginger"] }),
        });
        const data = await response.json();
        console.log("-- RAW RESPONSE --");
        // console.log(data);
        console.log("-- PARSED PLAN --");
        if (data.plan) {
            try {
                const plan = JSON.parse(data.plan);
                console.log(JSON.stringify(plan, null, 2));
            } catch (e) {
                console.log("Plan is not JSON:", data.plan);
            }
        }
    } catch (e) {
        console.error(e);
    }
}
test();
