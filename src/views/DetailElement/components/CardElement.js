import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DetailElement.css'
import { Container, Col, Row} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
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
function CardElement(){
  const idUsuario = 19;
  const idLugar = 6;
  
  const [lugarData, setLugarData] = useState('');
  const [isFavorite, setIsFavorite] = useState(''); // Estado para controlar la imagen favorita
  const [starFavorite, setStarFavorite] = useState('');
  const [Categories, setCategories] = useState([]);
  useEffect(() => {
  
    getAllInfoPlace()
    
  },[]);



async function getInfoPlace(){
  return new Promise(async (resolve, reject) =>{
    try{
      const response = await fetch(`http://localhost:3001/lugar/getLugarById?id=${idLugar}`,{
        method: "GET"
      })
      const data = await response.json()
      resolve(data)
    }catch (error){
      reject(error)
    }
  })
}

async function VerifyFavorite(){
  return new Promise(async (resolve, reject) =>{
    try{
      const response = await fetch(`http://localhost:3001/verificarFavorito?idUsuario=${idUsuario}&idLugar=${idLugar}`,{
        method: "GET"
      })
      const data = await response.json()
      resolve(data)
      console.log(data)
    }catch(error){
      reject(error)
    }
  })
}

async function GetCategories(){
  return new Promise(async (resolve, reject)=>{
    try{
      const response = await fetch(`http://localhost:3001/lugares/categorias?idLugar=${idLugar}`,{
        method: "GET"
    })
    const data = await response.json()
    resolve(data)
    console.log(data)
    }catch(error){
      reject(error)
    }
  })
}

const cambiarImagen = () => {
  
  if (isFavorite === 0) {
    // Agregar el lugar a favoritos
    fetch(`http://localhost:3001/favorito/agregarFavorito`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUsuario,
        idLugar,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          
          console.log("Favorito agregado")
        }
      })
      .catch((error) => {
        console.error('Error al agregar favorito:', error);
      });
      window.location.reload();
  } else {
    // Eliminar el lugar de favoritos
    fetch(`http://localhost:3001/favoritos/eliminar?idUsuario=${idUsuario}&idLugar=${idLugar}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 'success') {
          
          console.log("Favorito eliminado")
        }
      })
      .catch((error) => {
        console.error('Error al eliminar favorito:', error);
      });
      window.location.reload();
  }
};

  async function getAllInfoPlace(){

    try{
      var InfoLugar = await getInfoPlace()
      var InfoFavorite = await VerifyFavorite()
      var Categories = await GetCategories()
      //var photo = await verificarImagen()
      setLugarData(InfoLugar)
      setIsFavorite(InfoFavorite.resultado)
      console.log("Info Favorite:" + InfoFavorite.resultado)
      console.log(InfoFavorite.resultado)
      setCategories(Categories)
      //console.log("isFavorite:" + isFavorite)

      if(InfoFavorite.resultado === 0){
        setStarFavorite('https://cdn-icons-png.flaticon.com/512/13/13595.png');
        setIsFavorite(0);
      }else {
        setStarFavorite('https://static.vecteezy.com/system/resources/thumbnails/009/342/149/small/golden-stars-clipart-design-illustration-free-png.png');
        setIsFavorite(1);
      }
      //setStarFavorite(photo)
      //console.log(photo)
      console.log(starFavorite)
      
    }catch(error){
      console.log(error)
    }
    
  }
  console.log("isFavorite:" + isFavorite)

const verificarPuntuacion = () =>{
  
  if(lugarData.puntaje==0.5){
    return estrella05;
  }else if(lugarData.puntaje==1){
    return estrella1;
  }else if(lugarData.puntaje==1.5){
    return estrella15;
  }else if(lugarData.puntaje==2){
    return estrella2;
  }else if(lugarData.puntaje==2.5){
    return estrella25
  }else if(lugarData.puntaje==3){
    return estrella3
  }else if(lugarData.puntaje==3.5){
    return estrella35
  }else if(lugarData.puntaje==4){
    return estrella4
  }else if(lugarData.puntaje==4.5){
    return estrella45
  }else{
    return estrella5
  }
    
}

    return(
            
            <Container className="ContainerCardElement">
            
              <Container className="MainInfoElement">

                  <Container className="HeaderElement">
                    <h1>{lugarData.nombre}</h1> {/* Nombre del lugar*/}
                    
                    <br/>
                    
                    <img
                        src={starFavorite}
                        className="favorite-icon"
                        onClick={cambiarImagen}
                        alt="Favorite Icon"
                        id="favorite"
                      />
                      
                    <br/>
                    <br/>
                  </Container>
                 
                  <br/>
                 
                  <Container>
                  <img src={lugarData.foto} className="PhotoPlace"/> {/* link de imagen*/}
                  </Container>
                  
                  <br/>
                  <br/>
                 

                  <Container>
                    <h3>Puntuacion:</h3>
                    <div className="TitlePuntacion">{lugarData.puntaje} 
                    <img
                        src={verificarPuntuacion()}
                        className="EstrellasPuntuacion"
                        alt="Puntuacion Icon"
                      />
                    </div>
                    
                  </Container>

              </Container>
              
              <Container className="ElementMoreInfo">
             
               <Container>
                 
                <p className='TitleCategories'>
                Categorias: {Categories.map((categoria, index) => ( <p className="CategoriasElement" key={index}>{categoria}
                </p>  ))}
                </p>
               
               </Container>
              

              <Container className="InformationBox">
                    <h3 className="TitleDetails">Detalles:</h3>
                    <p>Direccion: {lugarData.direccion} {/* Direccion*/}</p>

                    {/* Descripcion*/}
                    <p>Descripcion: {lugarData.descripcion}</p>

                    {/* Precio Promedio*/}
                    <p>Precio Promedio: S/.{lugarData.costo}</p>
                    {/* Horarios*/}
                    <p>Horario: {lugarData.horaInicio} a {lugarData.horaFin}</p>
                    
                    {/* Contacto*/}
                    <p>Contacto: {lugarData.celular} </p>
                    
                    {/* Website*/}
                    <p><a href={lugarData.linkweb}>Enlace al sitio web</a></p>
                    
               </Container>

               </Container>
               
                    
            </Container>
        
    );
}
export default CardElement;