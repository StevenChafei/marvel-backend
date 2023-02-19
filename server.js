const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

// Création du serveur
const app = express();
app.use(express.json());
app.use(cors());

app.get("/characters", async (req, res) => {
  try {
    const name = req.query.name || "";
    const skip = req.query.skip || "0";
    const limit = req.query.limit || "100";

    console.log(name);
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.MARVEL_API_KEY}&name=${name}&skip=${skip}&limit=${limit}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/character/:characterId", async (req, res) => {
  try {
    const characterId = req.params.id;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(response.data);
    console.log(response.data);
    console.log(characterId);

    console.log("Je rentre dans ma route CharacterID");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(response.data);
    res.json(response.data);
    console.log("Je rentre dans ma route comics");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(response.data);
    res.json(response.data);
    console.log("Je rentre dans ma route comics");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get("/comic/:id", async (req, res) => {
  try {
    const comicId = req.params.id;
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comic/${comicId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    console.log(response.data);
    console.log(comicId);
    res.json(response.data);
    console.log("Je rentre dans ma route comic");
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
});

app.get("/comics/:id", async (req, res) => {
  try {
    if (!req.params) {
      return res.status(400).json({ message: error.message });
    }
    const characterId = req.params.id;
    const comicsByCharacter = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.MARVEL_API_KEY}`
    );
    res.status(200).json(comicsByCharacter.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started 🫶🏽");
});

// https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=7GBf9cBESmMyBIBX

// https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}

//https://lereacteur-marvel-api.herokuapp.com/character/${req.params.characterId}?apiKey=${process.env.MARVEL_API_KEY}
