import React, { useState } from 'react'
import '../styles/SearchBar.css';
import gifBuscar from "../img/search.gif";

export default function SearchBar({onSearch}) {
  const [city, setCity] = useState("");
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSearch(city);

    }}>
      <input className='barraSearch'
        type="text"
        placeholder="Ingrese una ciudad.."
        value={city}
        onChange={e => setCity(e.target.value)}

      />

      <input className='botonAgregar' 
      type="image" src={gifBuscar} alt="buscar"  />
    </form>
  );
}