const fs = require("fs").promises;
const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "src")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "src", "index.html"));
});

app.get("/get-data", async (req, res) => {
	const data = await fs.readFile("db.json", (error, data) => {
		if (error) res.send("error readFile");
	});
	res.send(data.toString());
});

app.post("/submit", async (req, res) => {
	const data = req.body;

	try {
		const file = await fs.readFile("db.json", "utf8");
		const db = JSON.parse(file);
		const id = db[db.length - 1].id + 1;
		db.push({ id, ...data });
		console.log(db);
		const write = await fs.writeFile("db.json", JSON.stringify(db));
		res.status(200).json(db);
	} catch (error) {
		console.log(error);
	}
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
