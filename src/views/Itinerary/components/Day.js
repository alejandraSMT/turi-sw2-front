import 'bootstrap/dist/css/bootstrap.min.css';

import Form from 'react-bootstrap/Form';
import { Container, Col, Row,FormGroup, FormLabel, FormControl, Button} from 'react-bootstrap';
import React, { useState, useEffect } from 'react';


function Day(props){
const { content, index } = props;
const favorites = ["Lugar 1","Lugar 2", "Lugar 3"];
const times = ["Dia","Tarde","Noche"];

    return(
       <Container>
        <div id="header-day">
        <h2>Dia {index + 1}</h2>
        
        
        <select>
            
              {favorites.map((favorite, index) => (
                <option key={index} value={favorite}>
                  {favorite}
                </option>
              ))}
              
        </select>
        <select>
            
              {times.map((time, index) => (
                <option key={index} value={time}>
                  {time}
                </option>
              ))}
              
        </select>
        </div>
        <h2>Dia:</h2>
        <br/>
        
        <br/>
        <h3>Tarde:</h3>
        <br/>
        
        <br/>
        <h3>Noche:</h3>
        
        <br/>
        <br/>
        </Container>
    );
}
export default Day;