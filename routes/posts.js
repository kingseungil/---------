const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post");

/**
 * 전체 게시글 목록 조회 API\
 * 작성 날짜 기준으로 내림차순 정렬
 */
router.get("/posts", async (req, res) => {
    const result = await Posts.find().sort({ regDate: -1 });
    res.json(result);
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
    res.json({ result: "success" });
});

// 게시글 조회 API

// 게시글 수정 API

// 게시글 삭제 API

module.exports = router;
