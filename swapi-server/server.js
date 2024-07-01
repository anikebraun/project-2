import express from "express";
import { MongoClient, ObjectId } from "mongodb";
//import dotenv from "dotenv";
//import cors from "cors";

//dotenv.config();
const url = "mongodb://localhost:27017";
const dbName = "swapi";
const collectionFilms = "films";
const collectionPlanets = "planets";
const collectionCharacters = "characters";
const collectionFilmsCharacters = "films_characters";
const collectionFilmsPlanets = "films_planets";

const app = express();
const PORT = 3000;

//PLANETS
app.get("/api/planets", async (req, res) => {
  //done
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collPlans);
    const planets = await collection.find({}).toArray();
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("no planet found");
  }
});

//CHARACTERS
app.get("/api/characters", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collChars);
    const characters = await collection.find({}).toArray();
    res.json(characters);
  } catch (err) {
    console.error("Error:", err);
    res
      .status(500)
      .send("no character found");
  }
});


//FILMS
app.get("/api/films", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collFilms);
    const films = await collection.find({}).toArray();
    res.json(films);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("no film found");
  }
});

//CHARACTERS/:id
app.get("/api/characters/:id", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionCharacters);
    const characters = await collection.find({}).toArray();
    res.json(characters);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("error");
  }
});

//FILMS/:id
app.get("/api/films/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collFilms);
    const result = await collection.findOne({ id: id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("No film found");
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).send("no film found");
  }
});

//PLANETS/:id
app.get("/api/planets/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collPlans);
    const result = await collection.findOne({ id: id });
    if (result) {
      res.status(200).send(result);
    } else {
      res.status(404).send("No planet found");
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).send("no planet found");
  }
});

app.get("/api/films/:id/planets", async (req, res) => {
  //done
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionFilmsPlanets);
    const collection2 = db.collection(collectionPlanets);
    const output = await collection.find({ film_id: id }).toArray();
    let planets = [];
    for (const element of output) {
      const planet = await collection2
        .find({ id: parseInt(element.planet_id) })
        .toArray();
      planets.push(planet);
    }
    if (output.length) {
      console.log(planets);
      res.json(planets);
      res.status(200).send(planets);
    } else {
      res.status(404).send("No planets in this film :(");
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).send("error");
  }
});

app.get("/api/films/:id/characters", async (req, res) => {
  //done
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionFilmsCharacters);
    const collection2 = db.collection(collectionCharacters);
    const output = await collection.find({ film_id: id }).toArray();
    let characters = [];
    for (const element of output) {
      const character = await collection2
        .find({ id: parseInt(element.character_id) })
        .toArray();
      characters.push(character);
    }
    if (output.length) {
      console.log(characters);
      res.json(characters);
      res.status(200).send(characters);
    } else {
      res.status(404).send("No characters in this film :(");
    }
  } catch (err) {
    console.error("Error", err);
    res.status(500).send("error");
  }
});

app.get("/api/planets/:id/films", async (req, res) => {
  //done
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionFilmsPlanets);
    const collection2 = db.collection(collectionFilms);
    const output = await collection.find({ planet_id: id }).toArray();
    let films = [];
    for (const element of output) {
      const film = await collection2
        .find({ id: parseInt(element.film_id) })
        .toArray();
      films.push(film);
    }
    if (output.length) {
      console.log(films);
      res.json(films);
      res.status(200).send(films);
    } else {
      res.send("No films with this planet :(");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("error");
  }
});

app.get("/api/characters/:id/films", async (req, res) => {
  //done
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionFilmsCharacters);
    const collection2 = db.collection(collectionFilms);
    const output = await collection.find({ character_id: id }).toArray();
    let films = [];
    for (const element of output) {
      const film = await collection2
        .find({ id: parseInt(element.film_id) })
        .toArray();
      films.push(film);
    }
    if (output.length) {
      console.log(films);
      res.json(films);
      res.status(200).send(films);
    } else {
      res.send("No films with this character :(");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("error");
  }
});

app.get("/api/planets/:id/characters", async (req, res) => {
  //done
  try {
    const id = parseInt(req.params.id);
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionCharacters);
    const output = await collection.find({ homeworld: id }).toArray();
    if (output.length) {
      res.status(200).send(output);
    } else {
      res.send("No characters from this planet :(");
    }
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
