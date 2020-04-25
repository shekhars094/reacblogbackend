const express = require("express");
require("./middleware/db-connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());
app.use(cookieParser());

const port = process.env.PORT || 5000;

const userRouter = require("./controllers/auth");
const postRouter = require("./controllers/post");

app.get("/", (req, res) => {
	res.json((message: "Everything is fine"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", userRouter);
app.use("/api/v1", postRouter);

app.listen(port, () => {
	console.log("App is running on ", port);
});
