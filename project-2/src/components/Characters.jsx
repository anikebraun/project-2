import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Character = (props) => {
  const [character, setCharacter] = useState({});
  const { id } = useParams();

  useEffect(() => {
    console.log(id);

    const fetchData = async (id) => {
      try {
        const getCharacter = await fetch(
          `http://localhost:3000/api/characters/${id}`
        ).then((res) => res.json());
        setCharacter(getCharacter); // assign JSON response to the data variable.
        console.log(getCharacter);
      } catch (error) {
        console.error("Error fetching records: ", error);
      }
    };
    fetchData();
  }, []);

  console.log(character);

  return (
    <>
      <h1 id="name">{character.name}</h1>
      <section id="generalInfo">
        <p>
          Height: <span id="height">{character.height}</span> cm
        </p>
        <p>
          Mass: <span id={character.mass}></span> kg
        </p>
        <p>
          Born: <span id={character.birth_year}></span>
        </p>
      </section>
      <section id="planets">
        <h2>Homeworld</h2>
        <p>
          <span id="homeworld"></span>
        </p>
      </section>
      <section id="films">
        <h2>Films appeared in</h2>
        <ul></ul>
      </section>
    </>
  );
};

export default Character;
