const express = require("express");
const app = express();
const cors = require("cors");
const { getPokemon, deletePokemon } = require("./controller");
app.use(express.json());
app.use(cors());

//this goes in frontend js file - `http://localhost/4000/get-pokemon/?pokemon=${pokemon}` //

app.post("/get-pokemon", getPokemon);
app.delete("/pokemon/:name", deletePokemon);

app.listen(4000, () => console.log("server running on port 4000"));
