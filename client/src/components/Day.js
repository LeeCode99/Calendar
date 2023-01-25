import React from "react";
import "./Day.css";
import Axios from 'axios'

export default function Day({ arr }) {

    const deleteReview = (id) => {
        console.log("Delete ID:", id);
        Axios.delete(`http://localhost:3001/api/delete/${id}`);
    };
    return <>
        {arr.map((val) => {
            return <div className="dayC">
                <h1 > {val.movie_name}</h1>
                <p>  {val.movie_review}</p>
                <button onClick={() => { deleteReview(val.id) }}> Delete reviews</button>
            </div>
        })}

    </>

}