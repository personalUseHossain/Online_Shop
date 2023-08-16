const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const multer = require('multer')
const fs = require('fs')
const path = require('path')

//collections
const { userCollection } = require('../db/schema')


// userImage send
router.get('/public/:id', (req, res) => {
    res.setHeader('Content-Type', 'image/*')
    res.sendFile(path.resolve(`./public/UserImages/${req.params.id}`))
})


//send otp
router.post('/signup/otp', (req, res) => {
    const { email } = req.body;
    let emailTemplate = fs.readFileSync('./public/email.html', 'utf-8');
    const OTP = Math.floor(Math.random() * 100000);
    emailTemplate = emailTemplate.replace('{{%otp%}}', OTP)
    const token = jwt.sign({ otp: OTP }, process.env.OTP_VERIFY_JWT_SECREAT, { expiresIn: '5m' })

    //creating email and send it 
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GOOGLE_USER,
            pass: process.env.GOOGLE_PASSWORD
        }
    });

    async function main() {
        const info = await transporter.sendMail({
            from: '"Online Shop" <personal.mdhossain@gmail.com>',
            to: email,
            subject:
                "Secure Your Account: One-Time Password (OTP) Verification Required || Online Shop",
            html: emailTemplate,
        });

        res.json({ status: 'ok', message: "OTP Send to you email.", otp: token })
    }

    main().catch((err) => res.json({ status: failed, message: "something went wrong please try again later" }));
})

//signup route
router.post('/signup', async (req, res) => {
    try {
        const { name, otp, password, token, email } = req.body;
        let decodeToken = jwt.verify(token, process.env.OTP_VERIFY_JWT_SECREAT)
        decodeToken = decodeToken.otp.toString()
        if (decodeToken !== otp) return res.json({ status: "failed", message: "Invalid OTP." })
        const hashPass = await bcrypt.hash(password, 10);
        console.log('password hased')
        const newUser = new userCollection({
            name: name,
            email: email,
            password: hashPass
        })
        console.log('user created but not save')
        const result = await newUser.save();
        console.log('user created and save on database')
        res.json({ status: "ok", message: "successfully user created.", data: result });
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



//update user data

const uploadDirectory = './public/UserImages';
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory, { recursive: true });
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + 'userImage.jpg');
    },
});
const upload = multer({ storage: storage })

router.post('/update/user/info', upload.single('image'), async (req, res) => {
    const { userData, name } = req.query;
    if (userData.img) {
        fs.unlink(path.resolve(`./public/UserImages/${userData.img}`), (err) => {
            if (err) {
                console.error('Error while unlinking the file:', err);
            } else {
                console.log('File successfully unlinked.');
            }
        });
    }
    const findUserandUpdate = await userCollection.findByIdAndUpdate({ _id: userData._id },
        { name: name, img: req.file.filename },
        { new: true });
    res.json(findUserandUpdate)
})





// exporting all routes
module.exports = router;