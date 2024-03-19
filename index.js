import express, { response } from "express";
import bodyParser from "body-parser";
import fs from 'fs';

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

//Getting all movie list from data.json
var movieList;
fetch("http://localhost:3000/json/data.json")
.then(response => response.json())
.then(json => {movieList =  json});


app.get("/", (req, res) => {
    res.render("index.ejs", {movieList: movieList});
});

app.post("/save", (req, res) => {
    movieList.unshift({
        title: req.body["fTitle"],
        review: req.body["fReview"],
        rate: req.body["fRate"],
        date: new Date().toISOString().split('T')[0]
    });
    fs.writeFileSync('public/json/data.json', JSON.stringify(movieList));
    res.redirect("/");
});

app.post("/edit", (req, res) => {
    movieList[req.body["index"]].title = req.body["fTitle"];
    movieList[req.body["index"]].review = req.body["fReview"];
    movieList[req.body["index"]].rate = req.body["fRate"];
    fs.writeFileSync('public/json/data.json', JSON.stringify(movieList));
    res.redirect("/");
});

app.post("/delete", (req, res) => {
    movieList.splice(req.body["index"], 1);
    const newMovieList = movieList;
    fs.writeFileSync('public/json/data.json', JSON.stringify(movieList));
    res.redirect("/");
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});