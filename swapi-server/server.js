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

app.get("/api/planets", async (req, res) => {
  try {
    const client = await MongoClient.connect(url);
    const db = client.db(dbName);
    const collection = db.collection(collectionPlanets);
    const planets = await collection.find({}).toArray();
    res.json(planets);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("error☹️");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});