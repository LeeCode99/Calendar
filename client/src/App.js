
import React, { useState, useEffect } from "react";
import './App.css';
import Axios from 'axios'



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
    }).then(() => {
      alert("success insert");
    })
  };
  const deleteReview = () => {
    Axios.delete('http://localhost:3001/api/insert', {
      movieName: movieName,
      movieReview: review,
    }).then(() => {
      alert("success insert");
    })
  };

  return (
    <>
      <h1>Add name and story</h1>
      <div className="form">
        <label>Movie Name</label>
        <input type="text" name="movieName" onChange={(e) => setMovieName(e.target.value)}></input>
        <label>Review</label>
        <input type="text" name="review" onChange={(e) => setReview(e.target.value)}></input>
        <button onClick={submitReview}> Sutmit</button>
      </div>

      {movieReviewList.map((val) => {
        return <h1 key={val.id}>Movie Name: {val.movie_name} | Movie review: {val.movie_review} </h1>
      })}
        <button onClick={deleteReview}> Delete reviews</button>
    </>


  );
};

export default App;

// npm i axios: install axios that allows api request to 