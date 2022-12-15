const express = require("express");
const { findOneAndDelete } = require("../schemas/comment.js");
const router = express.Router();
const Comments = require("../schemas/comment.js");

/**
 * 댓글 목록 조회 API
 * 조회하는 게시글에 작성된 모든 댓글을 목록 형식으로 볼 수 있게 하기
 * 작성 날짜 기준으로 내림차순 정렬
 */
router.get("/comments/:postId", async (req, res) => {
    const { postId } = req.params;
    const result = await Comments.find()
        .where("postId")
        .equals(postId)
        .sort({ regDate: -1 });
    res.status(200).json(result);
});

/**
 * 댓글 작성 API
 * 댓글 내용을 비워둔 채 댓글 작성 APi를 호출하면 "댓글 내용을 입력해주세요"라는 메세지를 return
 * 댓글 내용을 입력하고 댓글 작성 API를 호출한 경우 작성한 댓글 추가
 */
router.post("/comments", async (req, res) => {
    const { author, content, postId } = req.body;
    if (!content) {
        return res.status(400).json({
            success: false,
            message: "댓글 내용을 입력해주세요",
        });
    }
    const comment = new Comments({
        author,
        content,
        postId,
    });
    await comment.save();
    res.status(201).json({
        message: "댓글을 생성하였습니다",
    });
});

/**
 * 댓글 수정 API
 * 댓글 내용을 비워둔 채 댓글 수정 API를 호출하면 "댓글 내용을 입력해주세요" 라는 메세지를 return
 * 댓글 내용을 입력하고 댓글 수정 API를 호출한 경우 작성한 댓글을 수정하기
 */
router.put("/comments/:commentid", async (req, res) => {
    const { commentid } = req.params;
    const { content } = req.body;
    if (!content) {
        return res.status(400).json({
            success: false,
            message: "댓글 내용을 입력해주세요",
        });
    }
    const comment = await Comments.find({ commentid });
    if (!comment.length) {
        return res.status(404).json({
            message: "해당하는 댓글이 없습니다",
        });
    } else {
        await Comments.updateOne(
            { commentid },
            {
                $set: {
                    content: content,
                },
            }
        );
        res.status(201).json({ message: "댓글을 수정하였습니다." });
    }
});

/**
 * 댓글 삭제 API
 * 원하는 댓글 삭제
 */
router.delete("/comments/:commentid", async (req, res) => {
    const { commentid } = req.params;
    const comment = await Comments.find({ commentid });
    if (!comment.length) {
        return res.status(404).json({
            message: "해당하는 댓글이 없습니다",
        });
    } else {
        await Comments.deleteOne({ commentid });
        return res.status(200).json({ message: "댓글을 삭제하였습니다." });
    }
});

module.exports = router;
