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

// 게시글 조회 API

// 게시글 수정 API

// 게시글 삭제 API

module.exports = router;
