const express = require('express');
const router = express.Router();
const pool = require('../config/db.js');

router.get('/users', async (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            throw err;
        }
        try {
            const qry = 'SELECT id, username FROM users order by username';
            conn.query(qry, (err, result) => {
                conn.release();
                if(err) {
                    console.log(err);
                    throw err;
                }
                res.send(JSON.stringify(result));
            });
        }
        catch(err){
            console.log(err);
            res.end();
        }
    });
});

router.get('/tweets', async (req, res) => {
    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            throw err;
        }
        try {
            const qry = 'SELECT u.username, u.fullname, t.id, t.tweet, t.post_date FROM users as u INNER JOIN tweets as t ON t.user_id = u.id ORDER BY t.id';
            conn.query(qry, (err, result) => {
                conn.release();
                if(err) {
                    console.log(err);
                    throw err;
                }
                res.send(JSON.stringify(result));
            });
        }
        catch(err){
            console.log(err);
            res.end();
        }
    });
});

router.post('/addTweet', async(req, res) => {
    const userTweet = req.body.tweetInput
    const userId = req.body.tweetUser;

    pool.getConnection((err, conn) => {
        if (err) {
            console.log(err);
            throw err;
        }

        const qry = 'INSERT INTO tweets (tweet, user_id) VALUES (?, ?)';
        conn.query(qry, [userTweet, userId], (err, result) => {
            conn.release();
            if(err) {
                console.log(err);
                throw err;
            }
            console.log('Tweet added!');
        });
        res.redirect('/tweets')
        res.end();
    });
});

module.exports = router;