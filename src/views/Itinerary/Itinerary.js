import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Itinerary.css';

import { Container, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import Day from './components/Day.js';
import Header from '../header/Header';
import { useNavigate } from 'react-router-dom';

function Itinerary() {
  //se definen la variable del id del viaje y su setter para cuando se cambie el valor
  const [idViaje, setIdViaje] = useState('');
  
  //se obtiene el idUsuario 
  const userToken = window.sessionStorage.getItem("userToken");
  const userId = window.sessionStorage.getItem("userId");

  //se definen la variable para el numero de dias y su setter para cuando se cambie el valor
  const [numberOfDays, setNumberOfDays] = useState(''); 

  //se definen la variable para el array de la cantidad de dias y su setter para cuando se cambie el valor
  const [arrayDays, setArrayDays] = useState([]);

  //se definen la variable para el array de favoritos y su setter para cuando se cambie el valor
  const [arrayFavorites, setArrayFavorites] = useState([]);

  //variable para el boton guardar y que aparezca
  const [appearSaveButton, setAppearSaveButton] = useState(false)
  const navigate = useNavigate()
  
  
  //se llama a la funcion getAllInfoPlace donde estan en orden las llamadas a los endpoints que se ejecutan
  // en simultaneo al cargar la pagina
  useEffect(() => {

    getAllInfoPlace()

  }, []);


//getAllFavorites: funcion donde se hace el llamado al endpoint "TraerTodosFav" enviando como parametro el idUsuario 
//y poder buscar todos los favoritos que tenga agregados el usuario
  async function getAllFavorites() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/FavoritoRouter/TraerTodosFav?token=${userToken}`, {
          method: "GET"
        })
        const data = await response.json()
        resolve(data)
        console.log(data)
        console.log(data)
      } catch (error) {
        reject(error)
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

      //se setea el array de favoritos con la lista de favoritos para ser mostrada luego en pantalla

      setArrayFavorites(AllFavorites)

    } catch (error) {
      console.log(error)
    }
  }

  console.log("FAVORITOS LISTA: " + arrayFavorites)

  //se muestra el mensaje al darle click al boton Guardar
  const MensajeGuardar = () => {
    window.alert("Itinerario Guardado")
  }

  // Función para generar los días
  const handleGenerateClick = () => {
    // Parsea la cantidad de días a un número
    const cantDays = numberOfDays;

    //se crea el objeto JSON que sera enviado al endpoint
    const viajeData = {
      token: userToken,
      cantDias: cantDays,
    };

    // Verifica si la entrada es un número válido y mayor que cero
    //el maximon de dias son 7 (1 semana)
    if (!isNaN(cantDays) && cantDays > 0 && cantDays < 8) {
      // Genera un arreglo de números del 1 al número de días ingresados
      const arrayDays = Array.from({ length: cantDays }, (_, index) => index + 1);

      // Actualiza el estado con los días generados
      setArrayDays(arrayDays);

      // Realizar una solicitud POST al servidor
      fetch('http://localhost:3000/api/v1/ViajeRouter/registro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //se envia el objeto JSON
        body: JSON.stringify(viajeData),
      })
        .then((response) => response.json())
        .then((data) => {
          //se setea el IdViaje con el que se genero al hacer la solicitud POST
          setIdViaje(data.idViaje);
          console.log('Nuevo ID del viaje:', idViaje);
          console.log(data);
          // Aquí puedes manejar la respuesta del servidor, como redirigir a una página de éxito o mostrar un mensaje.
        })
        .catch((error) => {
          console.error('Error al registrar el viaje:', error);
          // Maneja los errores, como mostrar un mensaje de error al usuario.
        });
    // se setea el boton Guardar para que se muestre
      setAppearSaveButton(true)

    } else {
      alert(
        //mensaje cuando se pone una cantidad de dias no permitida
        "EXCESO EN CANTIDAD DE DÍAS!!! \nPor favor, ingrese un numero entre 1 y 7"
      );
    }

  };

  console.log("ID VIAJE: ",idViaje)

  //funcion para volver al home
  function goHome() {
    navigate("/home")
  }

  //variable para ver si se muestra el boton de Guardar o no
  let save;
  if (appearSaveButton) {
    save =
      <div class="container d-flex justify-content-center mt-5 mb-10">
        <Button id="Button" onClick={MensajeGuardar}>Guardar</Button>
      </div>
  }

  //variabe para manejar si se permite crear el itinerario, ya que debe tener favoritos agregados para
  //poder generarlo, de lo contrario no tendra nada para ser agregado.
  let view;
  if (arrayFavorites.length > 0) {
    view =
      <>
        <Container style={{ marginBottom: "4rem" }}>
          <br />
          <h2 className="PreviousText">¡Crea tu itinerario ahora con Turi!</h2>
          <h3 className="PreviousText">Ingrese la cantidad de días para generar:</h3>
      {/*cuadro  para ingresar la cantidad de dia */}
          <FormGroup id="DaysPicker">
            <FormLabel id="NumberOfDays">Días:</FormLabel>
            <FormControl
              type="number"
              id="DaysBox"
              min="1"
              max="7"
              value={numberOfDays}
              onChange={(e) => setNumberOfDays(e.target.value)}
            />
            {/*Boton para Generar el itinerario */}
            <Button onClick={handleGenerateClick} id="Button">Generar</Button>
          </FormGroup>

          <Container className='DayContainer'>
            {/* Mapea y renderiza los componentes "Day" del array de dias para ir creando los dias con el 
            componente Day */}
            {arrayDays.map((day, index) => (
              <div key={index}>

                <Day key={index} dayNumber={day} index={index} days={arrayDays} arrayFavorites={arrayFavorites} idViaje={idViaje} />

              </div>
            ))}
          </Container>
          {save}
        </Container>
      </>
  } else {
    //variable con mensaje si no tiene favoritos
    view =
      <>
        <Container style={{ marginBottom: "4rem" }}>
          <br />
          <h2 className="PreviousText">Actualmente no tiene favoritos agregados para generar un itinerario</h2>
          <h3 className="PreviousText">Por favor, regrese a la pantalla principal y agregue las opciones de su agrado</h3>
          <div class="container d-flex justify-content-center mt-5 mb-10">
            <Button id="Button" onClick={goHome}>Ir a la pantalla principal</Button>
          </div>
        </Container>
      </>
  }


  return (
    <>
      <Header />
      {view}
    </>
  );
}

export default Itinerary;