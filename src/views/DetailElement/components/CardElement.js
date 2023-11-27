//se llama a la libreria bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Review.css';
//se llama al CSS que le da diseño a esta pantalla
import '../styles/DetailElement.css';
import Review from './Review.js'
import { Form, Modal, Button } from 'react-bootstrap';
//importa elementos de react-bootstrap
import { Container } from 'react-bootstrap';


//importa elementos de react
import React, { useState, useEffect } from 'react';

//importa las imagenes de estrellas para las diferentes puntuaciones
import estrella05 from '../images/estrellas/0.5_estrellas.png';
import estrella1 from '../images/estrellas/1_estrellas.png';
import estrella15 from '../images/estrellas/1.5_estrellas.png';
import estrella2 from '../images/estrellas/2_estrellas.png';
import estrella25 from '../images/estrellas/2.5_estrellas.png';
import estrella3 from '../images/estrellas/3_estrellas.png';
import estrella35 from '../images/estrellas/3.5_estrellas.png';
import estrella4 from '../images/estrellas/4_estrellas.png';
import estrella45 from '../images/estrellas/4.5_estrellas.png';
import estrella5 from '../images/estrellas/5_estrellas.png';

import { useParams } from "react-router-dom"
import Header from '../../header/Header.js';

function CardElement() {

  /*
  const reviews = [
    { nombreUsuario: 'Frank Vicente',  comentario: 'Muy ricooooooooooo', id:1},
    { nombreUsuario: 'Jaz Nena rik',  comentario: 'Me encantaaaaaaaaaaaaaaaaaa',  id:2},
      { nombreUsuario: 'Alejandra y Franco Turist Couple',  comentario: 'amo aquiiiiiiiiiii',  id:3},
    
  ];
*/
  const userToken = window.sessionStorage.getItem("userToken");
  const [showModal, setShowModal] = useState(false);
  const [comentario, setComentario] = useState('');
  const [fecha, setFecha] = useState('');
  const [puntaje, setPuntaje] = useState('');
  const [arrayReviews, setArrayReviews] = useState([]);

  const [loaded, setLoaded] = useState(false)

  //se obtiene el id del usuario de la sesion actual

  //muestra el id en la consola para comprobar
  console.log("USUARIO TOKEN: " + userToken)

  //captura el id del lugar como parametro
  const { idLugar } = useParams();
  //const idLugar = 6;

  //se definen la variable donde se guardara la informacion del lugar y su setter para cuando se cambie el valor
  const [lugarData, setLugarData] = useState('');

  //se definen la variable donde se guardara si el lugar es favorito y su setter para cuando se cambie el valor
  const [isFavorite, setIsFavorite] = useState('');

  //se definen la variable donde se guardara la url de la estrella (pintada si es favorito / vacio si no es) 
  //y su setter para cuando se cambie el valor

  const [starFavorite, setStarFavorite] = useState('');

  //se definen la variable donde se guardaran las categorias del lugar y su setter para cuandos se cambie el valor

  const [Categories, setCategories] = useState([]);

  //se llama a la funcion getAllInfoPlace donde estan en orden las llamadas a los endpoints que se ejecutan
  // en simultaneo al cargar la pagina

  const handleGuardarReview = () => {
    // Aquí puedes realizar la lógica para enviar los datos al endpoint
    // Puedes utilizar fetch o axios para hacer la solicitud POST
    // Asegúrate de incluir el código necesario para enviar los datos
    // Después de enviar, cierra el modal y realiza cualquier acción adicional si es necesario

    if (comentario !== "" && comentario.length <= 90000 && puntaje >= 0.5 && puntaje <= 5) {

      // Ejemplo con fetch:
      fetch('http://localhost:3000/api/v1/ResenaRouter/crearResena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token: userToken,
          idLugar: idLugar,
          comentario: comentario,
          fechaCreacion: fecha,
          puntaje: puntaje,
          // Otros datos que necesites enviar
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          // Realiza acciones adicionales si es necesario
          console.log('Datos guardados:', data);

          // Cierra el modal después de guardar los datos
          setShowModal(false);

          // Puedes recargar la página o hacer otras actualizaciones según tus necesidades
          // window.location.reload();
        })
        .catch((error) => {
          console.error('Error al guardar los datos:', error);
        });
      resetValores();
      window.location.reload();
    } else {
      alert("Por favor, revise los campos ingresados.")
    }
  };


  useEffect(() => {

    getAllInfoPlace()

  }, []);


  //getInfoPlace: funcion donde se hace el llamado al endpoint "getLugarById" enviando como parametro el idLugar 
  //y poder buscar toda la informacion de ese lugar para ser mostrada en pantalla
  async function getInfoPlace() {
    //se retorna un Promise para que se traiga la informacion sin esperar que otra parte del codigo funcione
    return new Promise(async (resolve, reject) => {
      try {
        //llamada al endpoint "getLugarById"
        const response = await fetch(`http://localhost:3000/api/v1/LugarRouter/getLugarById?id=${idLugar}`, {
          method: "GET" //se usa GET porque se va a traer informacion
        })
        const data = await response.json()
        //se muestra la data del lugar en la consola
        console.log(data)
        //la promesa se ejecuto con exito (resolve)
        resolve(data)
      } catch (error) {
        //la promesa NO se ejecuto con exito (reject)
        reject(error)
      }
    })
  }

  //VerifyFavorite: funcion donde se verifica si el lugar es favorito para el usuario enviando como parametros
  // el idUsuario y el idLugar al endpoint "verificarFavorito"
  async function VerifyFavorite() {
    //se retorna un Promise para que se traiga la informacion sin esperar que otra parte del codigo funcione

    return new Promise(async (resolve, reject) => {
      try {
        //llamada al endpoint "verificarFavorito"
        const response = await fetch(`http://localhost:3000/api/v1/FavoritoRouter/verificarFavorito?token=${userToken}&idLugar=${idLugar}`, {
          method: "GET" //se usa GET porque se va a traer informacion
        })
        const data = await response.json()
        //la promesa se ejecuto con exito (resolve)
        resolve(data)
        //se muestra la data del lugar en la consola
        console.log(data)
      } catch (error) {
        //la promesa NO se ejecuto con exito (reject)
        reject(error)
      }
    })
  }

  //GetCategories: funcion donde se traen las categorias del lugar enviando como parametro
  //el idLugar al endpoint "lugares/categorias"
  async function GetCategories() {
    //se retorna un Promise para que se traiga la informacion sin esperar que otra parte del codigo funcione

    return new Promise(async (resolve, reject) => {
      try {
        //llamada al endpoint "lugares/categorias"

        const response = await fetch(`http://localhost:3000/api/v1/CategoriaLugarRouters/categorias?idLugar=${idLugar}`, {
          method: "GET" //se usa GET porque se va a traer informacion
        })
        const data = await response.json()
        //la promesa se ejecuto con exito (resolve)
        resolve(data)
        //se muestra la data del lugar en la consola
        console.log(data)
      } catch (error) {
        //la promesa NO se ejecuto con exito (reject)
        reject(error)
      }
    })
  }

  //funcion para realizar el cambio de imagen al darle click a la imagen de estrella de favorito
  //se llama declarandola en onClick
  const cambiarImagen = () => {
    //si el resultado del endpoint "VerificarFavorito" es 0 se cambiara a 1 y se pintaria la estrella
    //de amarillo al darle click representando que se marco el lugar como favorito para el usuario
    if (isFavorite === 0) {
      // Agregar el lugar a favoritos llamando al endpoint "favorito/agregarFavorito"
      fetch(`http://localhost:3000/api/v1/FavoritoRouter/agregarFavorito`, {
        method: 'POST', //metodo post porque se va a insertar data nueva
        headers: {
          'Content-Type': 'application/json',
        },
        //se crea el objeto JSON con el idLugar del lugar que sera agregado como favorito para un usuario enviando
        //su id (idUsuario)
        body: JSON.stringify({
          "token": userToken,
          "idLugar": idLugar,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          //si se hace bien la conexion se mostrara en pantalla un mensaje de que se agrego como favorito
          if (data.status === 'success') {

            console.log("Favorito agregado")
          }
        })
        .catch((error) => {
          //si NO se hace bien la conexion se mostrara en pantalla un mensaje de error 

          console.error('Error al agregar favorito:', error);
        });
      window.location.reload();
      //se vuelve a cargar la pagina para mostrar el cambio de la imagen simulando que se agrego (estrella amarilla)
    } else {
      //si el resultado del endpoint "VerificarFavorito" es 1 se cambiara a 0 y se pondra la estrella
      //vacio al darle click representando que se elimino el lugar como favorito para el usuario
      // Se llama al endpoint "favoritos/eliminar" enviando como parametros el idUsuario y el idLugar

      fetch(`http://localhost:3000/api/v1/FavoritoRouter/eliminar?token=${userToken}&idLugar=${idLugar}`, {
        method: 'DELETE', //metodo DELETE porque se va a eliminar data 
      })
        .then((response) => response.json())
        .then((data) => {
          //si se hace bien la conexion se mostrara en pantalla un mensaje de que se agrego como favorito

          if (data.status === 'success') {

            console.log("Favorito eliminado")
          }
        })
        .catch((error) => {
          //si NO se hace bien la conexion se mostrara en pantalla un mensaje de error 

          console.error('Error al eliminar favorito:', error);
        });
      //se vuelve a cargar la pagina para mostrar el cambio de la imagen simulando que se elimino (estrella vacia)
      window.location.reload();
    }
  };

  async function GetReviews() {
    //se retorna un Promise para que se traiga la informacion sin esperar que otra parte del codigo funcione

    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(`http://localhost:3000/api/v1/ResenaRouter/obtenerResenasPorLugar?idLugar=${idLugar}`, {
          method: "GET" //se usa GET porque se va a traer informacion
        })
        const data = await response.json()
        resolve(data);
      } catch (error) {
        reject(error);
      }
    })
  }

  //getAllInfoPlace:funcion principal donde se llaman a las otras funciones en un orden especifico, 
  //ya que se ejecutan en simultaneo al cargar la pagina y para que no halla fallos al llamar los endpoints
  async function getAllInfoPlace() {

    try {
      setLoaded(false)
      //llama primero a la funcion "getInfoPlace" para traer la informacion del lugar
      var InfoLugar = await getInfoPlace()
      //llama segundo a la funcion "VerifyFavorite" para verificar si el lugar es favorito
      var InfoFavorite = await VerifyFavorite()
      //llama tercero a la funcion "GetCategories" para traer las categorias de un lugar
      var Categories = await GetCategories()

      var Reviews = await GetReviews()
      //var photo = await verificarImagen()
      //se setea la inforamcion del lugar en la variable LugarData para ser mostrada luego en pantalla
      setLugarData(InfoLugar)
      //se setea el resultado (1 o 0) del lugar si es favorito en la variable IsFavorite 
      setIsFavorite(InfoFavorite.resultado)
      //se muestra el resultado (1 o 0) del lugar si es favorito en la consola
      console.log("Info Favorite:" + InfoFavorite.resultado)
      console.log(InfoFavorite.resultado)
      //se setean las categorias en la variable Categories
      setCategories(Categories)
      //console.log("isFavorite:" + isFavorite)
      console.log("REVIEWS RECIBIDOS: ", Reviews)
      setArrayReviews(Reviews)
      //si el resultado de InfoFavorite es 0 se mostrara la estrella vacia (no es favorito)
      if (InfoFavorite.resultado === 0) {
        //se setea IsFavorite como 0 al NO ser favorito
        setIsFavorite(0);
      } else {
        //se setea IsFavorite como 1 al ser favorito
        setIsFavorite(1);
      }
      //setStarFavorite(photo)
      //console.log(photo)
      console.log(starFavorite)
      setLoaded(true)
    } catch (error) {
      //se meustra un error en caso ocurra
      console.log(error)
      setLoaded(true)
    }

  }

  let favoriteStar;
  if (isFavorite === 0) {
    favoriteStar =
      <>
        <svg onClick={cambiarImagen} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="black" class="bi bi-star" viewBox="0 0 16 16">
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>
      </>
  } else if (isFavorite === 1) {
    favoriteStar =
      <>
        <svg onClick={cambiarImagen} xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#F4CE14" class="bi bi-star-fill" viewBox="0 0 16 16">
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      </>
  }

  console.log("LUGAR INFO: " + lugarData.foto)
  console.log("isFavorite:" + isFavorite)

  //verificarPuntuacion: funcion para mostrar la imagen de puntuacion en estrellas dependiendo del
  //puntaje que tenga el lugar
  const verificarPuntuacion = () => {

    if (lugarData.puntaje == 0.5) {
      return estrella05;
    } else if (lugarData.puntaje == 1) {
      return estrella1;
    } else if (lugarData.puntaje == 1.5) {
      return estrella15;
    } else if (lugarData.puntaje == 2) {
      return estrella2;
    } else if (lugarData.puntaje == 2.5) {
      return estrella25
    } else if (lugarData.puntaje == 3) {
      return estrella3
    } else if (lugarData.puntaje == 3.5) {
      return estrella35
    } else if (lugarData.puntaje == 4) {
      return estrella4
    } else if (lugarData.puntaje == 4.5) {
      return estrella45
    } else {
      return estrella5
    }

  }

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  }

  function roundToNearest(value, step) {
    const roundedValue = Math.round(value / step) * step;
    return Math.min(Math.max(roundedValue, parseFloat(step)), parseFloat(5));
  }

  const resetValores = () => {
    setComentario('');
    setPuntaje(null);
    setFecha('');
  };


  let reviewsView;
  if (Array.isArray(arrayReviews)) {
    reviewsView =
      <div>
        {Array.from(arrayReviews).map((review) => (
          <div key={review.id}>
            <Review
              nombreUsuario={review.nombre}
              usuario={review.usuario}
              id={review.idReseña}
              comentario={review.comentario}
              puntaje={review.puntaje}
              fechaCreacion={review.fechaCreacion}
              foto={review.foto}
            />
            <br />
            <br />
          </div>
        ))}
      </div>
  } else {
    reviewsView =
      <>
        <h5 class="pb-5" style={{ color: "gray", fontWeight: "normal", textAlign: "center", padding: "1rem" }}>Actualmente este elemento no tiene reseñas</h5>
      </>
  }

  let generalView;
  if (loaded) {
    generalView =
      <>
        <Container className="ContainerCardElement">

          <Container className="MainInfoElement">

            <Container className="HeaderElement d-flex" style={{ alignItems: "center" }}>
              <h1>{lugarData.nombre}</h1> {/* Nombre del lugar de lugarData (lo que se devuelve al traer 
la informacion del lugar del endpoint) */}

              <br />

              {/*icono de favorito */}
              <div class="ms-3">
                {favoriteStar}
              </div>

              <br />
              <br />
            </Container>

            <br />
            {/*muestra la foto del lugar */}
            <Container>
              <img src={lugarData.foto} className="PhotoPlace" /> {/* link de imagen*/}
            </Container>

            <br />
            <br />


            <Container>
              <h3>Puntuación:</h3>
              {/*muestra el puntaje del lugar mostrando la imagen que devuelve la funcion "verificarPuntuacion"*/}
              <div className="TitlePuntacion">{lugarData.puntaje}
                <img
                  src={verificarPuntuacion()}
                  className="EstrellasPuntuacion"
                  alt="Puntuacion Icon"
                />
              </div>

            </Container>



          </Container>

          <Container className="ElementMoreInfo" class="container">

            <Container className="InformationBox">
              <p>Dirección: {lugarData.direccion} {/* muestra la direccion del lugar*/}</p>

              {/*muestra la descripcion del lugar*/}
              <p>Descripción: {lugarData.descripcion}</p>

              {/*muestra el precio Promedio del lugar*/}
              <p>Precio promedio: s/.{lugarData.costo}</p>
              {/*muestra el horario del lugar desde su hora de inicio a hora de fin*/}
              <p>Horario: {lugarData.horaInicio} a {lugarData.horaFin}</p>

              {/* muestra el celular de contacto del lugar*/}
              <p>Contacto: {lugarData.celular} </p>

              {/* muestra el link del Website del lugar*/}
              <p>Para consultar más detalles visite el siguiente <a target="_blank" id="link_detail" href={lugarData.linkweb}>  enlace</a></p>

            </Container>

            <Container>
              {/* muestra las categorias del lugar recorriendo con un map el array Categoria donde estan guardados*/}

              <p className='TitleCategories'>
                Categorias: {Categories.map((categoria, index) => (<p className="CategoriasElement" key={index}>{categoria}
                </p>))}
              </p>

            </Container>

          </Container>




        </Container>

        <Container className="Reviews" class="container">
          <div className="HeaderReview">
            <div class="d-flex" style={{ alignItems: "center", alignContent: "center" }}>
              <h3>Reseñas: </h3>
              <Button style={{ margin: "1rem", textAlign: "center" }} onClick={() => setShowModal(true)} id="ButtonCrear">Agregar reseña</Button>
            </div>

            {/* Modal para agregar review */}
            <Modal show={showModal} onHide={() => { setShowModal(false); resetValores(); }}>
              <Modal.Header closeButton>
                <Modal.Title>Agregue una reseña</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                {/* Formulario dentro del modal */}
                <Form>
                  <Form.Group controlId="formComentario" style={{ marginBottom: "1rem" }}>
                    <Form.Label>Comentario</Form.Label>
                    <Form.Control
                      style={{ borderRadius: "20px" }}
                      as="textarea"
                      placeholder="Ingresa su comentario"
                      value={comentario}
                      rows={5}
                      onChange={(e) => setComentario(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formFecha" style={{ marginBottom: "1rem" }}>
                    <Form.Label>Fecha de visita: </Form.Label>
                    <Form.Control
                      type="date"
                      min="2000-01-02"
                      max={getDate()}
                      placeholder="Ingresa la fecha"
                      value={fecha}
                      onChange={(e) => setFecha(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group controlId="formPuntaje" style={{ marginBottom: "1rem" }}>
                    <Form.Label>Puntaje</Form.Label>
                    <Form.Control
                      type="number"
                      min={0.5}
                      step={0.5}
                      max={5}
                      placeholder="Ingresa el puntaje"
                      value={puntaje}
                      onChange={(e) => setPuntaje(e.target.value === '' ? null : roundToNearest(e.target.value, 0.5))}
                    />
                  </Form.Group>

                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button id="cancelButton" onClick={() => { setShowModal(false); resetValores(); }}>
                  Cerrar
                </Button>
                {/* Botón para guardar los datos */}
                <Button id="Button" onClick={handleGuardarReview}>
                  Guardar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <br />
        </Container>
        {reviewsView}
      </>
  } else {
    generalView =
      <>
        <div class="container vh-100 d-flex justify-content-center align-items-center">
          <div class="spinner-border" role="status">
            <span class="sr-only"></span>
          </div>
        </div>
      </>
  }

  return (
    <>
      <Container>
        {generalView}
      </Container>
    </>
  );
}
export default CardElement;