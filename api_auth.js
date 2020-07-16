const express = require("express");
const router = express.Router();
const User = require("./models/User");
const bcrypt = require("bcryptjs");
router.post("/register", (req, res) => {
  const { name, email, password, password2 } = req.body;
  if (!name || !email || !password || !password2) {
    res.json({
      message: "กรุณากรอกข้อมูลให้ครบถ้วน",
    });
  }if (password !== password2) {
    res.json({
      message: "กรุณากรอกรหัสผ่านให้ถูกต้อง",
    });
  }if (password.length < 6) {
    res.json({
      message: "รหัสผ่านต้องมากกว่า 6 ตัวอักษร",
    });} else {
    User.findOne({ email: email }).then((user) => {
      if (user) {
        res.json({
          message: "มี Email นี้ในระบบแล้ว",
        }); } else {  const newUser = new User({
          name,
          email,
          password,
        }); bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then((user) => {
                res.json({
                  message: "สมัคสมาชิกสำเร็จแล้ว",
                });}).catch((err) => console.log(err));
          })); }}); }

  /* else {
  try {
    req.body.password = bcrypt.hashSync(req.body.password, 8);
    let result = await user.create(req.body);
    res.json({ result: constants.kResultOk, message: JSON.stringify(result) });
  } catch (err) {
    res.json({ result: constants.kResultNok, message: JSON.stringify(error) });
  }} */
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let result = await User.findOne({ email: email });
  if (result != null) {
    if (bcrypt.compareSync(password, result.password)) {
      res.json({ message: "เข้าสู่ระบบแล้ว" });
    } else {
      res.json({ message: "รหัสผ่านไม่ถูกต้อง" });
    }
  } else {
    res.json({ message: "อีเมลไม่ถูกต้อง" });
  }
});

router.get("/users", async (req, res) => {
  let result = await User.find();
  res.json(result);
});


module.exports = router;
