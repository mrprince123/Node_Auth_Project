import { app } from './app.js';
import { connectDB } from './Database/connection.js';

// This is for the Database
connectDB();

// This is for the Routes
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on the Port ${port} on mode ${process.env.NODE_ENV}`);
});