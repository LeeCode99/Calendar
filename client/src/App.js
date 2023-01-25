
import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios'

import Day from "./components/Day";



function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieReviewList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/api/get').then((response) => {
      setMovieReviewList(response.data);
    });
  });//call only once

  const submitReview = () => {
    Axios.post('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: review,
    });
    setMovieReviewList([...movieReviewList, { movieName: movieName, movieReview: review },]);
  };
  
  return (
    <>
      <h1>Reminder</h1>
      <h1 id="intro">Add name and story </h1>
      <div className="form">
        <label>Movie Name</label>
        <input type="text" name="movieName" onChange={(e) => setMovieName(e.target.value)}></input>
        <label>Review</label>
        <input type="text" name="review" onChange={(e) => setReview(e.target.value)}></input>
        <button onClick={submitReview}> Submit</button>
      </div>

      <Day arr={movieReviewList} />

    </>


  );
};

export default App;

// npm i axios: install axios that allows api request to 