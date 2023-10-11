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
  const lugar = { 
  id: '1', 
  nombre: 'Tanta', 
  foto: 'https://tanta.com.ar/img/logo-color.png', 
  favorite : 0,
  direccion: 'Malecón de la Reserva 610, Miraflores',
  descripcion:'No hay nada que nos haga más felices que acompañarte día a día en el desayuno, almuerzo y comida, por eso ahora podrás disfrutar de todo el cariño de nuestra cocina por nuestra nueva plataforma pensada y diseñada especialmente para ti',
  precioPromedio:  'S/40',
  categorias: ['Comida Marina', 'Comida Criolla'],
  horario : '9 a.m. a 11 p.m.',
  horaInicio: '9',
  horaFin: '23',
  contacto: '(511) 446-9357',
  siteweb: 'https://tantaperu.com/',
  puntuacion: '4.5',
};

 
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar la imagen favorita

 
// Inicializa los estados con los valores de lugar
useEffect(() => {
  
  setIsFavorite(lugar.favorite);
}, []);

const verificarImagen = () =>{
  
    if(isFavorite==0){
      return 'https://cdn-icons-png.flaticon.com/512/13/13595.png';
    }else{
      return 'https://static.vecteezy.com/system/resources/thumbnails/009/342/149/small/golden-stars-clipart-design-illustration-free-png.png';
    }
}

const verificarPuntuacion = () =>{
  
  if(lugar.puntuacion==0.5){
    return estrella05;
  }else if(lugar.puntuacion==1){
    return estrella1;
  }else if(lugar.puntuacion==1.5){
    return estrella15;
  }else if(lugar.puntuacion==2){
    return estrella2;
  }else if(lugar.puntuacion==2.5){
    return estrella25
  }else if(lugar.puntuacion==3){
    return estrella3
  }else if(lugar.puntuacion==3.5){
    return estrella35
  }else if(lugar.puntuacion==4){
    return estrella4
  }else if(lugar.puntuacion==4.5){
    return estrella45
  }else{
    return estrella5
  }
    
}

const cambiarImagen = () => {
  if(isFavorite==0){
    setIsFavorite(1);
  
  localStorage.setItem('isFavorite',1);
  
  }
  else{
  setIsFavorite(0);
  
  localStorage.setItem('isFavorite',0);

}
}


useEffect(() => {
  const storedIsFavorite = localStorage.getItem('isFavorite');
  if (storedIsFavorite == 1) {
    setIsFavorite(1);
  }
}, []);

    return(
            
            <Container className="ContainerCardElement">
            
              <Container className="MainInfoElement">

                  <Container className="HeaderElement">
                    <h1>{lugar.nombre}</h1> {/* Nombre del lugar*/}
                    
                    <br/>
                    
                    <img
                        src={verificarImagen()}
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
                  <img src={lugar.foto}/> {/* link de imagen*/}
                  </Container>
                  
                  <br/>
                  <br/>
                  <br/>

                  <Container>
                    <h3>Puntuacion:</h3>
                    <div className="TitlePuntacion">{lugar.puntuacion} 
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
                {/*Categoria*/}
               <p className='TitleCategories'>Categorias: {lugar.categorias.map((categoria, index) => (
                    <p className="CategoriasElement" key={index}>{categoria}</p>
                    ))}</p>
               </Container>
               

              <Container className="InformationBox">
                    <h3 className="TitleDetails">Detalles:</h3>
                    <p>Direccion: {lugar.direccion} {/* Direccion*/}</p>

                    {/* Descripcion*/}
                    <p>Descripcion: {lugar.descripcion}</p>

                    {/* Precio Promedio*/}
                    <p>Precio Promedio: {lugar.precioPromedio}</p>
                    {/* Horarios*/}
                    <p>Horario: {lugar.horaInicio} a {lugar.horaFin}</p>
                    
                    {/* Contacto*/}
                    <p>Contacto: {lugar.contacto} </p>
                    
                    {/* Website*/}
                    <p><a href={lugar.siteweb}>Enlace al sitio web</a></p>
                    
               </Container>

               </Container>
               
                    
            </Container>
        
    );
}
export default CardElement;