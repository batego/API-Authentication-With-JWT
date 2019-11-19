const router = require('express').Router();
const verifyToken = require('./verifyToken') 

router.get('/', verifyToken ,(req, resp) => {
    resp.json({ post: { title: 'my first post', description: ' ramdom data for you' } });
});

module.exports = router;