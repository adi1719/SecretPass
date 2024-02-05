import bodyParser from "body-parser";
import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
//To get static files from /public
app.use(express.static(__dirname + '/public'));

var isAuth = false;
function passwordChecker(req, res, next) {
    const password = req.body["password"];
    if (password === "ilovelaptop") {
        isAuth = true;
    }
    next();
}
app.use(passwordChecker);
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
})
app.post("/check", (req, res) => {
    console.log(req.body);
    if (isAuth === true) {
        res.sendFile(__dirname + "/public/secret.html");
    }
    else {
        res.sendFile(__dirname + "/public/wrongpass.html")
    }
})

app.listen(port, () => {
    console.log(`Listening on Port ${port}`);
})