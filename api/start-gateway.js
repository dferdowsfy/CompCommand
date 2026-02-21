import { exec } from 'child_process';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Launch a new terminal window in Mac running the necessary command
    const command = `osascript -e 'tell application "Terminal" to do script "openclaw gateway"' -e 'tell application "Terminal" to activate'`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).json({ error: error.message });
        }
        return res.status(200).json({ success: true, message: 'Terminal launched' });
    });
}
