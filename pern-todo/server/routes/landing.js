const express = require('express');
const router = express();
const pool = require('../db');
const authorization = require('../middleware/authorization');
//const { route } = require('./jwtAuth'); 

router.get('/', authorization, async(req, res) => {
  try {
    const user = await pool.query("SELECT user_name FROM users WHERE user_id = $1", [
      req.user
    ]);
    res.json(user.rows[0]);
  }catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

module.exports = router;
