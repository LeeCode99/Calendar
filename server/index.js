const express = require('express');
const app = express();
const cors = require('cors'); // npm install cors
// access mysql
const bodyParser = require('body-parser');
const mysql = require('mysql');

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "CRUDapp",
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());//middle ware, needs when requesting information from frontend to backend

app.get('/api/get', (req, res) => {
    const sqlSelect = "SELECT * FROM movie_review";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
        res.send(result);
    });
});

app.post('/api/insert', (req, res) => {

    const movieName = req.body.movieName;
    const movieReivew = req.body.movieReview;

    const sqlInsert = "INSERT INTO movie_review (movie_name, movie_review) VALUES (?,?);"
    db.query(sqlInsert, [movieName, movieReivew], (err, result) => {
        console.log(err);
    });
});

app.delete('/api/delete/:id', (req, res) => {
    const id = req.params.id;

    const sqlDelete = "DELETE FROM movie_review WHERE id = (?) ;";
    db.query(sqlDelete, id, (err, result) => {
        console.log(err);
    });
})


app.get("/", (req, res) => {

});

app.listen(3001, () => {
    console.log("running on port 3001");
});