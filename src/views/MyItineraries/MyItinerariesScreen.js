
import ItineraryItem from './components/ItineraryItem.js';
import './styles/Itinerary.css';
import React, { useState, useEffect } from 'react';

function MyItinerariesScreen() {
  const userToken = window.sessionStorage.getItem('userToken');
  const arrayItineraries = [
    { nombre: 'Primera Semana', id: 1, cantDias: 2},
    { nombre: 'Segunda Semana', id: 2, cantDias: 5},
    { nombre: 'Mi nuevo viaje', id: 3, cantDias: 4},
    
  ];
  

  return (
    <div>
      <h1 className='TittleScreen'>Mis Itinerarios</h1>
      <br/>
      <div>
        {arrayItineraries.map((itinerary) => (
          <div key={itinerary.id}>
            <ItineraryItem
              nombre={itinerary.nombre}
              id={itinerary.id}
              cantDias={itinerary.cantDias}
            />
            <br/>
            <br/>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyItinerariesScreen;
