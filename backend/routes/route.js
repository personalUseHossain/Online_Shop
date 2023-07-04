const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

//collections
const { userCollection } = require('../db/schema')


//signup route
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPass = await bcrypt.hash(password, 10);
        const newUser = new userCollection({
            name: name,
            email: email,
            password: hashPass
        })
        const result = await newUser.save();
        res.json(result);
    } catch (err) {
        res.json(err)
    }
})


//login route
router.post('/login', async (req, res) => {
    const { allInput, sendJwt } = req.body;
    const { email, password } = allInput
    const findUser = await userCollection.findOne({ email })
    if (!findUser) return res.json({ error: "No user found with this email." })
    const matchPass = await bcrypt.compare(password, findUser.password)
    const token = jwt.sign({ _id: findUser._id }, process.env.JWT_SECRET_KEY);
    if (!matchPass) return res.json({ error: "Incorrent password." })
    if (sendJwt) return res.json({ findUser, token })
    if (!sendJwt) return res.json(findUser)
})





// exporting all routes
module.exports = router;