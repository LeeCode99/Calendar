
import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios'
import Month from "./components/Month";
// import { BrowserRouter, Route, Routes } from "react-router-dom"


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

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
    console.log(movie);
  };

  return (
    <>
      <h1>Calendar</h1>
      <Month />

      <h1 id="intro">Add name and story </h1>
      <div className="form">
        <label>Movie Name</label>
        <input type="text" name="movieName" onChange={(e) => setMovieName(e.target.value)}></input>
        <label>Review</label>
        <input type="text" name="review" onChange={(e) => setReview(e.target.value)}></input>
        <button onClick={submitReview}> Submit</button>
      </div>

      {movieReviewList.map((val) => {
        return <> <div className="card">
          <h1> {val.movie_name}</h1>
          <p>  {val.movie_review}</p>
          <input type="text" id="updateInput" />
          <button>Update</button>
          <br />
          <button onClick={() => { deleteReview(val.movie_name) }}> Delete reviews</button>
        </div> </>
      })}

    </>


  );
};

export default App;

// npm i axios: install axios that allows api request to 