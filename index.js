const express = require('express');
const bodyParser = require('body-parser');
const { route } = require("./routes/routes")
// Load environment variables from .env file
require('dotenv').config();


const app = express();

app.use(bodyParser.json());
// console.log('STRIPE_SECRET_KEY:', process.env.STRIPE_SECRET_KEY);

app.use("/api/v1", route);




app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
