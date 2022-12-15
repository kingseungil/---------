const express = require("express");
const router = express.Router();
const Posts = require("../schemas/post");
const bcrypt = require("bcrypt");

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
    res.status(200).json(post);
});

// 게시글 조회 API (author이용)
// router.get("/posts/:author", async (req, res) => {
//     const { author } = req.params;
//     const result = await Posts.find({ author });
//     res.json(result);
// });

// 게시글 조회 API (id값 이용)
router.get("/posts/:id", async (req, res) => {
    const { id } = req.params;

    const result = await Posts.find({ id: id });

    res.json(result);
});

/**
 * 게시글 수정 API
 * 입력된 비밀번호를 비교하여 동일할 때만 글이 삭제
 * */
router.put("/posts/:id", async (req, res) => {
    const { id } = req.params;
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
    await Posts.findOneAndUpdate(id, {
        $set: {
            title: title,
            content: content,
            author: author,
        },
    });
    res.json({ success: true });
});

/**
 * 게시글 삭제 API
 * - 입력된 비밀번호를 확인하여 삭제
 */
router.delete("/posts/:id", async (req, res) => {
    const { id } = req.params;
    const post = await Posts.find({ id });
    if (post) {
        await Posts.deleteOne({ id });
    }
    res.json({ success: true });
});

module.exports = router;
