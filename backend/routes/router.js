const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    const userData = [
        {
            "id": 1,
            "name": "John",
            "username": "John Smith",
            "email": "john@gmail.com",
            "address": {
                "street": "Kulatarest",
                "suite": "Apt. 556",
                "city": "Maine",
            }
        }
    ]

    res.send(userData);
})

module.exports = router;