
import ItineraryItem from './components/ItineraryItem.js';
import './styles/Itinerary.css';
import React, { useState, useEffect } from 'react';
import Header from '../header/Header.js'
function MyItinerariesScreen() {
  const userToken = window.sessionStorage.getItem('userToken');
  /*
  const arrayItineraries = [
    { nombre: 'Primera Semana', id: 1, cantDias: 2},
    { nombre: 'Segunda Semana', id: 2, cantDias: 5},
    { nombre: 'Mi nuevo viaje', id: 3, cantDias: 4},
    
  ];
  */
 const [arrayItineraries, setArrayItineraries] = useState([]);
 useEffect(() => {

  getAllInfoPlace()

}, []);



async function getAllItineraries() {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(userToken);
      const response = await fetch(`http://localhost:3000/api/v1/ViajeRouter/traerViajes?token=${userToken}`, {
        method: "GET"
      });
      const data = await response.json();
      console.log(data); // Verifica la respuesta del servidor
      if (Array.isArray(data.viajes)) {
        resolve(data.viajes);
      } else {
        reject(new Error("La respuesta de la API no contiene el formato esperado"));
      }
    } catch (error) {
      reject(error);
    }
  });
}


//getAllInfoPlace:funcion principal donde se llaman a las otras funciones en un orden especifico, 
//ya que se ejecutan en simultaneo al cargar la pagina y para que no halla fallos al llamar los endpoints
async function getAllInfoPlace() {

  try {
    //llama primero a la funcion "getAllFavorites" para traer todos los favoritos

    var AllItineraries = await getAllItineraries()
    console.log(AllItineraries)
    setArrayItineraries(AllItineraries)
    console.log(arrayItineraries)
    //se setea el array de favoritos con la lista de favoritos para ser mostrada luego en pantalla

    
    
  } catch (error) {
    console.log(error)
  }
}
console.log(arrayItineraries)

  return (
    <div>
      <Header/>
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
