const app = require('./app');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then((con) => {
    console.log("Database connection successfull");
}).catch((err) => {
    console.log("connection error", err);
});
const port = 3000;
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});