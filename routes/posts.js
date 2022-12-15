const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post");

/**
 * 전체 게시글 목록 조회 API
 * 작성 날짜 기준으로 내림차순 정렬
 */
router.get("/posts", async (req, res) => {
    const result = await Posts.find().sort({ regDate: -1 });
    res.json(result);
});

// 게시글 작성 API
router.post("/posts", async (req, res) => {
    const { postId, password, title, content, author } = req.body;
    const posts = await Posts.find({ postId });
    if (posts.length) {
        return res
            .status(400)
            .json({ success: false, errorMessage: "이미 있는 데이터입니다" });
    }
    const post = new Posts({
        postId: postId,
        title: title,
        password: password,
        content: content,
        author: author,
    });
    await post.save();
    res.json({ result: "success" });
});

// 게시글 조회 API (author이용)
router.get("/posts/:author", async (req, res) => {
    const { author } = req.params;
    const result = await Posts.find({ author });
    res.json(result);
});

/**
 * 게시글 수정 API
 * 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제
 * */
router.put("/posts/:", async (req, res) => {});

// 게시글 삭제 API

module.exports = router;
