import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const Home = (props) => {
  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('hhtp://localhost:3000/api/characters').then(res => res.json());
        setData(response); // assign JSON response to the data variable.
      } catch (error) {
        console.error("Error fetching records: ", error);
      }
    };

    fetchData();
  }, []);

  const showCharacters = (characters) => {
    return  data.map((character) => (
          <div key={character._id} data={character} >
            <Link to={`/characters/${character.id}`}>{character.name}</Link>
          </div>
        ));
  }
  return (
    <>
      <h1>Star Wars Universe Lookup</h1>
      <label htmlFor="searchString">
        Who you looking for?{" "}
        <span className="small">(Regular expressions are cool here)</span>
      </label>
      <input
        id="searchString"
        value={searchString}
        //onChange={handleInputChange}
        autoComplete="off"
      />
      <section id="charactersList">
       {showCharacters(data)}
      </section>
    </>
  );
};

export default Home;