import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import img from "./Images/book.jpeg";

const API_URL = "https://api.dictionaryapi.dev/api/v2/entries/en/";

function App() {
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");
  const [error, setError] = useState("");

  const fetchMeaning = async () => {
    try {
      const response = await axios.get(API_URL + word);
      const firstMeaning =
        response.data[0].meanings[0].definitions[0].definition;
      setMeaning(firstMeaning);
      setError("");
    } catch (error) {
      setError("Word not found");
      setMeaning("");
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Dictionary</h1>
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            placeholder="Enter a word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button className="search-button" onClick={fetchMeaning}>
            Search
          </button>
        </div>
        {meaning && (
          <div className="result-container">
            <h2 className="result-heading">Meaning:</h2>
            <p className="result">{meaning}</p>
          </div>
        )}
        {error && <p className="error">{error}</p>}
      </div>
      <div className="image-container">
        <img
          src={img}
          alt="Dictionary Illustration"
          className="dictionary-image"
        />
      </div>
    </div>
  );
}

export default App;
