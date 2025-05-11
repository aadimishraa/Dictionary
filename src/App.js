import React, { useState } from "react";
import './App.css'

function App() {

  const [input, setInput] = useState("");
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault()
    setWord(input);
    setInput("");


    try{
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${input}`);
      const data = await response.json();
      console.log(data);
      if (data[0]?.meanings[0]?.definitions[0]?.definition) {
        setMeaning(data[0].meanings[0].definitions[0].definition);
      } else {
        setMeaning('No definition found.');
      }

    }
    catch(error){
      setMeaning("Error Fetching Meaning")
    }

  }

  return (

    <div className="App">
      <p className="heading">Dictionary</p>
      <form className="formContainer" onSubmit={handleSubmit}>
        <label className="input">Enter the word</label>
        <input type = "text" className="inputContainer" onChange={(e) => setInput(e.target.value)}></input>
        <button type="submit" className="submitButton">Submit</button>
      </form>

      {word && (<div>
      <p className="meaning">
        The meaning of
        <span style={{ color: 'black', fontWeight: 'bold' }}>{word}</span>{' '}
        is{' '}
        <span style={{ color: 'black', fontWeight: 'bold' }}>{meaning}</span>
      </p>
      </div>)}

    </div>

  );
}

export default App;
