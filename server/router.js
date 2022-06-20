const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send({ response: "Server está rodando." }).status(200);
});

module.exports = router;