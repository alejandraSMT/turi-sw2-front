import Header from '../header/Header.js';
import Favorite from './components/Favorite.js';
import './styles/Favorites.css';
import React, { useState, useEffect } from 'react';
function FavoritesScreen() {
  const userToken = window.sessionStorage.getItem('userToken');
  //const idUsuario = 19;
  /*const favoritePlaces = [
    { nombre: 'Tanta', id: 1, foto: 'https://i.pinimg.com/1200x/29/1c/b5/291cb59379301c2544dbb8816cf49ac1.jpg' },
    { nombre: 'Cafe Lima', id: 2, foto: 'https://sed.pe/wp-content/uploads/2021/10/sed21_web_proyectos_CDL-01-02-scaled.jpg' },
    { nombre: 'Siete Sopas', id: 3, foto: 'https://mir-s3-cdn-cf.behance.net/projects/404/5f7d3e155851719.Y3JvcCwyNDgwLDE5MzksMCww.jpg' },
    
  ];*/

  //se definen la variable para el array de favoritos y su setter para cuando se cambie el valor
  const [arrayFavorites, setArrayFavorites] = useState([]);

  useEffect(() => {

    getAllInfoPlace()

  }, []);


  //getAllFavorites: funcion donde se hace el llamado al endpoint "TraerTodosFav" enviando como parametro el idUsuario 
  //y poder buscar todos los favoritos que tenga agregados el usuario
  async function getAllFavorites() {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(userToken);
        const response = await fetch(`http://localhost:3000/api/v1/FavoritoRouter/TraerTodosFav?token=${userToken}`, {
          method: "GET"
        })
        const data = await response.json()
        resolve(data)
      } catch (error) {
        reject(error);

      }
    })
  }


  //getAllInfoPlace:funcion principal donde se llaman a las otras funciones en un orden especifico, 
  //ya que se ejecutan en simultaneo al cargar la pagina y para que no halla fallos al llamar los endpoints
  async function getAllInfoPlace() {

    try {
      //llama primero a la funcion "getAllFavorites" para traer todos los favoritos

      var AllFavorites = await getAllFavorites()
      console.log(AllFavorites)
      setArrayFavorites(AllFavorites)
      console.log(arrayFavorites)
      //se setea el array de favoritos con la lista de favoritos para ser mostrada luego en pantalla
    } catch (error) {
      console.log(error)
    }
  }
  console.log(arrayFavorites)

  let viewFavorites;
  if (!Array.isArray(arrayFavorites) || arrayFavorites.length <= 0) {
    viewFavorites =
      <>
        <h5 style={{ color: "gray", fontWeight: "normal", textAlign: "center", padding: "1rem" }}>Actualmente no tiene favoritos agregados</h5>
      </>
  } else {
    viewFavorites =
      <>
        {arrayFavorites.map((place) => (
          <div key={place.id}>
            <Favorite
              nombre={place.nombre}
              id={place.idLugar}
              foto={place.foto}

            />
            <br />
            <br />
          </div>
        ))}
      </>
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      <div class="container mt-5">
        <h1 className="PreviousText">Mis favoritos</h1>
      </div>
      <div class="container mt-5">
        {viewFavorites}
      </div>
    </div>
  );
}

export default FavoritesScreen;
