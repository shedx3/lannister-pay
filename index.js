const express = require('express');
const cors = require('cors');
const router = require('./routes');

const PORT = 4000 || process.env.PORT;

const app = express();

// middlewares
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.get('/', async (req, res) => {
    console.log(req.body);
    res.json("hello world")
});
app.use('/split-payments', router);

app.listen(PORT, () => console.log(`Lannisterpay app running on port: ${PORT}`));