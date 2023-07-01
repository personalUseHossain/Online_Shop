const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('hello this is home page')
})



// exporting all routes
module.exports = router;