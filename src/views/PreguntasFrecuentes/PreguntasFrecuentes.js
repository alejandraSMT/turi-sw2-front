import Header from '../header/Header.js';
import React, { useState, useEffect } from 'react';
import './styles/Pregunta.css';
import Pregunta from './components/Pregunta.js'
function PreguntasFrecuentesScreen() {
  const userToken = window.sessionStorage.getItem('userToken');
  //const idUsuario = 19;
  /*const favoritePlaces = [
    { nombre: 'Tanta', id: 1, foto: 'https://i.pinimg.com/1200x/29/1c/b5/291cb59379301c2544dbb8816cf49ac1.jpg' },
    { nombre: 'Cafe Lima', id: 2, foto: 'https://sed.pe/wp-content/uploads/2021/10/sed21_web_proyectos_CDL-01-02-scaled.jpg' },
    { nombre: 'Siete Sopas', id: 3, foto: 'https://mir-s3-cdn-cf.behance.net/projects/404/5f7d3e155851719.Y3JvcCwyNDgwLDE5MzksMCww.jpg' },
    
  ];*/
  /*const arrayPreguntas = [
    {pregunta: 'hola', id: 1, respuesta:'chau'},{pregunta: 'hola2', id: 1, respuesta:'chau2'}
  ]*/
  //se definen la variable para el array de favoritos y su setter para cuando se cambie el valor
  const [arrayPreguntas, setArrayPreguntas] = useState([]);

  useEffect(() => {

    getAllInfo()

  }, []);


  //getAllFavorites: funcion donde se hace el llamado al endpoint "TraerTodosFav" enviando como parametro el idUsuario 
  //y poder buscar todos los favoritos que tenga agregados el usuario
  async function getPreguntasRespuestas() {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(userToken);
        const response = await fetch(`http://localhost:3000/api/v1/PreguntasRouter/preguntas`, {
          method: "GET"
        })
        const data = await response.json()
        resolve(data)
      } catch (error) {
        reject(error);

      }
    })
  }


  //getAllInfo:funcion principal donde se llaman a las otras funciones en un orden especifico, 
  //ya que se ejecutan en simultaneo al cargar la pagina y para que no halla fallos al llamar los endpoints
  async function getAllInfo() {

    try {


      var AllPreguntasRespuestas = await getPreguntasRespuestas()
      console.log(AllPreguntasRespuestas)
      setArrayPreguntas(AllPreguntasRespuestas)
      console.log(AllPreguntasRespuestas)
     
    } catch (error) {
      console.log(error)
    }
  }
  console.log(arrayPreguntas)
  return (
    <div>
      <div>
          <Header />
      </div>
      <h1 className='TittleScreen'>Preguntas Frecuentes</h1>
      <br/>
      <div>
        {arrayPreguntas.map((pregunta) => (
          <div key={pregunta.id} >
            <Pregunta pregunta={pregunta.pregunta} respuesta={pregunta.respuesta}/>
            <br />
        
          </div>
          
        ))}
      </div>
    </div>
  );
}

export default PreguntasFrecuentesScreen;