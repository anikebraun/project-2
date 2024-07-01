import express from "express";
import { MongoClient, ObjectId } from "mongodb";
//import dotenv from "dotenv";
//import cors from "cors";

//dotenv.config();
const url = 'mongodb://localhost:27017';
const dbName = 'swapi';
const collectionFilms = 'films';
const collectionPlanets = 'planets';
const collectionCharacters = 'characters'; 
const collectionFilmsCharacter = "films_character"; 
const collectionFilmsPlanets = "films_planets"; 

const app = express();
const PORT = 3000;

//PLANETS
app.get("/api/planets", async (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});