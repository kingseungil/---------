const express = require("express");
const router = express.Router();
// const User = require("../models/user");
const jwt = require("jsonwebtoken");

//~ 회원가입
const { Op } = require("sequelize");
const { User } = require("../models");

router.post("/signup", async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;

    // 비밀번호 확인
    if (password !== confirmPassword) {
        res.status(412).send({
            errorMessage: "패스워드가 일치하지 않습니다.",
        });
        return;
    }

    // 닉네임 중복확인
    const existNickname = await User.findAll({
        where: {
            [Op.or]: [{ nickname }],
        },
    });
    if (existNickname.length > 0) {
        res.status(412).send({
            errorMessage: "중복된 닉네임입니다.",
        });
    }
    await User.create({ nickname, password });
    res.status(201).send({
        message: "회원가입 완료!",
    });
});

//~ 로그인
router.post("/login", async (req, res) => {
    const { nickname, password } = req.body;

    const user = await User.findOne({
        where: {
            nickname,
        },
    });
    if (!user || password !== user.password) {
        res.status(412).send({
            errorMessage: "닉네임 또는 패스워드를 확인해주세요",
        });
        return;
    }
    res.send({
        token: jwt.sign({ userId: user.userId }, "sparta"),
    });
});

module.exports = router;
