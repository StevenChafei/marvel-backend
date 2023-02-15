const express = require("express");
const axios = require("axios");

// Création du serveur
const app = express();

// Active la possibilité de récupérer les paramètres de type Body :
app.use(express.json());

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      "https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=7GBf9cBESmMyBIBX"
    );
    console.log(response.data);
    console.log("Je rentre dans ma route");
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "Cette route n'existe pas" });
});

app.listen(4000, () => {
  console.log("Server has started 🫶🏽");
});

// https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=7GBf9cBESmMyBIBX
