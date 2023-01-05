import React from 'react';
import '../styles/Card.css';
import { Link } from 'react-router-dom';


export default function Card ({min, max, name, img, onClose, id}) {
  return (
    <div className="card">
      <div id="closeIcon" className="row">
          <button onClick={onClose} className="boton-x">X</button>
      </div>
      <div>
        <Link to={`/ciudad/${id}`} className="card-title"> <h5>{name}</h5> </Link>
        <div className="row">
          <div className="min">
            <p>Min</p>
            <p>{min}°</p>
          </div>
          <div className="max">
            <p>Max</p>
            <p>{max}°</p>
          </div>
          <div className="img-clima">
            <img className="iconoClima" src={"http://openweathermap.org/img/wn/"+img+"@2x.png"} width="80" height="80" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};