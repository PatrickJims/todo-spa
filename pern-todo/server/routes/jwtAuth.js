const pool = require("../db");
//const router = require("express").Router;
const express = require('express');
const router = express();
const bcrypt = require('bcrypt');
const jwtGenerator = require('../utils/jwtGenerator');
const validInfo = require('../middleware/validInfo');
const authorization = require('../middleware/authorization');
//registering

router.post('/register', validInfo, async (req, res) => {
    try {
        //1. destructure the req.body (name, email, password)
        const { name, email, password } = req.body;
        //2. check if the user exists (if user exists then throw error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);

        if (user.rows.length !== 0) {
            return res.status(401).send('User already exists');
        }
        //3. Bcrypt the user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);

        const bcryptPassword = await bcrypt.hash(password, salt);

        //4. enter the new user inside the db
        const newUser = await pool.query("INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
            [name, email, bcryptPassword]);

        //5. generaring our jwt token
        const token = jwtGenerator(newUser.rows[0].user_id);
        res.json({ token })
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

router.post('/login', validInfo, async (req, res) => {
    try {
        //1. destructure the req.body
        const {email, password} = req.body;

        //2. check if user exists (if not throw an error)
        const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
            email
        ]);
        if(user.rows.length === 0){
            return res.status(401).json('Password or email is incorrect');
        }
        //3. check if incoming password matches the stored password

        const validPassword = await bcrypt.compare(password, user.rows[0].user_password);
        if(!validPassword){
            return res.status(401).json("Password or email is incorrect");
        }
        //4. give them the jwt token
        const token = jwtGenerator(user.rows[0].user_id);
        res.status(200).json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
})

router.get('/is-verify', authorization, async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('S error');
    }
});

//create a todo
router.post('/todos', async (req, res) => {
    try {
        const { description } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1) RETURNING *",
            [description]
        );

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get all todos
router.get('/todos', async (req, res) => {
    try {
        const allTodos = await pool.query('SELECT * FROM todo ORDER BY todo_id DESC');
        res.json(allTodos.rows);
    } catch (err) {
        console.error(err.message);
    }
})

//get a todo
router.get('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
        res.json(todo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//update a todo
router.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query(
            'UPDATE todo SET description = $1 WHERE todo_id = $2',
            [description, id]
        );
        res.json('todo was updated');
    } catch (err) {
        console.error(err.message);
    }
})

//delete a todo
router.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);

    res.json('Todo was deleted');
})

module.exports = router;