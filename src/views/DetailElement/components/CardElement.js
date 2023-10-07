import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/DetailElement.css'
import { Container, Col, Row} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

function RegisterForm(){
  const lugar = { id: '1', 
  nombre: 'Tanta', 
  foto: 'https://tanta.com.ar/img/logo-color.png', 
  favorite : false,
  direccion: 'Malecón de la Reserva 610, Miraflores'
  ,descripcion:'No hay nada que nos haga más felices que acompañarte día a día en el desayuno, almuerzo y comida, por eso ahora podrás disfrutar de todo el cariño de nuestra cocina por nuestra nueva plataforma pensada y diseñada especialmente para ti',
  precioPromedio:  'S/40',
  categorias: ['Comida Marina', 'Comida Criolla'],
  horario : '9 a.m. a 11 p.m.',
  contacto: '(511) 446-9357',
  siteweb: 'https://tantaperu.com/',
};

  const [elementName, setElementName] = useState('');
  const [direction, setDirection] = useState('');
  const [description, setDescription] = useState('');
  const [schedule, setSchedule] = useState('');
  const [siteWeb, setSiteWeb] = useState('');
  const [AveragePrice, setAveragePrice] = useState('');
  const [isFavorite, setIsFavorite] = useState(false); // Estado para controlar la imagen favorita
  

// Inicializa los estados con los valores de lugar
useEffect(() => {
  setElementName(lugar.nombre);
  setDirection(lugar.direccion);
  setDescription(lugar.descripcion);
  setSchedule(lugar.horario);
  setSiteWeb(lugar.siteweb);
  setAveragePrice(lugar.precioPromedio);
  setIsFavorite(lugar.favorite);
}, []);

const verificarImagen = () =>{
  
    if(isFavorite==false){
      return 'https://cdn-icons-png.flaticon.com/512/13/13595.png';
    }else{
      return 'https://static.vecteezy.com/system/resources/thumbnails/009/342/149/small/golden-stars-clipart-design-illustration-free-png.png';
    }
}

const cambiarImagen = () => {
  if(isFavorite==false){
    setIsFavorite(true);
  
  localStorage.setItem('isFavorite',true);
  
  }
  else{
  setIsFavorite(false);
  
  localStorage.setItem('isFavorite',false);

}
}


useEffect(() => {
  const storedIsFavorite = localStorage.getItem('isFavorite');
  if (storedIsFavorite === 'true') {
    setIsFavorite(true);
  }
}, []);

    return(
            
            <Container id="ContainerDetailElement">
            
              <Container id="MainInfo">
                <Container id="HeaderElement">
                    <h1>{lugar.nombre}</h1> {/* Nombre del restaurante*/}
                    
                    <br/>
                    
                    <img
                        src={verificarImagen()}
                        id="favorite"
                        onClick={cambiarImagen}
                        alt="Favorite Icon"
                      />
                      
                    <br/>
                    <br/>
                 </Container>
                 <br/>
                 <br/>
              <img src={lugar.foto}/> {/* se guardara el link de imagen en base*/}
              </Container>
              
              <Container id="informationBox">
                    <h3 id="details">Detalles:</h3>
                    <p>Direccion: {lugar.direccion} {/* Direccion*/}</p>

                    {/* Descripcion*/}
                    <p>Descripcion: {lugar.descripcion}</p>

                    {/* Precio Promedio*/}
                    <p>Precio Promedio: {lugar.precioPromedio}</p>

                    {/*Categoria*/}
                    <p>Categorias: {lugar.categorias.map((categoria, index) => (
                    <p id="categorias" key={index}>{categoria}</p>
                    ))}</p>
                    
                    {/* Horarios*/}
                    <p>Horario: {lugar.horario}</p>
                    
                    {/* Contacto*/}
                    <p>Contacto: {lugar.contacto} </p>
                    
                    {/* Website*/}
                    <p><a href={lugar.siteweb}>Enlace al sitio web</a></p>
                    
               </Container>
               
            </Container>
        
    );
}
export default RegisterForm;