const express = require('express');
const router = express.Router();
const db = require('../server.cjs'); // DB 연결 설정 파일

// 특정 ID의 게시글과 댓글 가져오기
router.get('/:id', async (req, res) => {
    const postId = req.params.id;

    try {
        // DB에서 게시글 정보 가져오기
        const [postRows] = await db.query('SELECT * FROM posts WHERE post_id = ?', [postId]);

    if (postRows.length === 0) {
        return res.status(404).json({ message: 'Post not found' });
    }
    const post = postRows[0];

    // DB에서 해당 게시글의 댓글들 가져오기
    const [commentRows] = await db.query('SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC', [postId]);
    
    res.json({ post, comments: commentRows });

    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;