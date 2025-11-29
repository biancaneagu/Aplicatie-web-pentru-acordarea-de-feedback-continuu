const express = require('express');
const app = express();

app.use(express.json());

app.get('/api', (req, res) => {
    res.json({status:"ok"});
});

app.listen(4000, () => {
    console.log('Server is running on port 4000');
});