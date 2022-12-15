const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post");
// const bcrypt = require("bcrypt");

/**
 * 전체 게시글 목록 조회 API
 * 작성 날짜 기준으로 내림차순 정렬
 */
router.get("/posts", async (req, res) => {
    const result = await Posts.find().sort({ regDate: -1 });
    res.status(200).json(result);
});

// 게시글 작성 API
router.post("/posts", async (req, res) => {
    const { password, title, content, author } = req.body;
    const post = new Posts({
        title: title,
        password: password,
        content: content,
        author: author,
    });
    await post.save();
    // console.log(password);
    // console.log(post.password); // 암호화된 password
    res.status(201).json({ message: "게시글을 생성하였습니다." });
});

// 게시글 조회 API (id값 이용)
router.get("/posts/:postid", async (req, res) => {
    const { postid } = req.params;
    const post = await Posts.find({ postid });
    if (post.length) {
        const result = await Posts.find({ postid });
        res.status(200).json(result);
    } else {
        res.status(404).json({
            message: "해당하는 게시글이 없습니다",
        });
    }
});

/**
 * 게시글 수정 API
 * 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제
 * */
router.put("/posts/:postid", async (req, res) => {
    const { postid } = req.params;
    const { password, title, content, author } = req.body;
    // const post = await Posts.find({ id: id });
    // const passwordMatch = await bcrypt.compare(password, post.password);
    // if (!passwordMatch) {
    //     return res.status(400).json({ message: "비밀번호 불일치" });
    // }
    // await Posts.findOneAndUpdate(id, {
    //     $set: {
    //         title: title,
    //         content: content,
    //         author: author,
    //     },
    // });
    const post = await Posts.find({ postid });
    if (post.length) {
        await Posts.updateOne(
            { postid },
            {
                $set: {
                    title: title,
                    content: content,
                    author: author,
                },
            }
        );
        res.status(201).json({ message: "게시글을 수정하였습니다." });
    } else {
        res.status(404).json({ message: "해당하는 게시글이 없습니다." });
    }
});

/**
 * 게시글 삭제 API
 * - 입력된 비밀번호를 확인하여 삭제
 */
router.delete("/posts/:postid", async (req, res) => {
    const { postid } = req.params;
    const post = await Posts.find({ postid });
    if (post.length) {
        await Posts.deleteOne({ postid });
        res.status(200).json({ message: "게시글을 삭제하였습니다." });
    } else {
        res.status(404).json({ message: "해당하는 게시글이 없습니다." });
    }
});

module.exports = router;
