import app from './src/app.js';
const PORT = process.env.PORT || 8000;
import {connectDB} from './src/db/db.js'

const serverConnect = () => {
    try {
        connectDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log("Server start hone mein dikkat aayi:", error);
    }
};

serverConnect();
