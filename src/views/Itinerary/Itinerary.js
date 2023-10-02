import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/Itinerary.css';

import { Container, FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import React, { useState } from 'react';
import Day from './components/Day.js';

function Itinerary() {
    
    const [numberOfDays, setNumberOfDays] = useState(''); // Estado para la cantidad de días
    const [arrayDays, setArrayDays] = useState([]); // Estado para el array de dias
    
    // Función para generar los días
    const handleGenerateClick = () => {
        // Parsea la cantidad de días a un número
        const cantDays = numberOfDays;

        // Verifica si la entrada es un número válido y mayor que cero
        if (!isNaN(cantDays) && cantDays > 0) {
            // Genera un arreglo de números del 1 al número de días ingresados
            const arrayDays = Array.from({ length: cantDays }, (_, index) => index + 1);

            // Actualiza el estado con los días generados
            setArrayDays(arrayDays);
        }
    };

  
    return (
        <Container>
            <br/>
            <h1 id="tittle">Crea tu itinerario ahora con Turi!</h1>
            <h3 id="subtittle">Ingrese la cantidad de días para generar:</h3>
            <FormGroup id="cardDaysContainer">
                <FormLabel className="LabelBox">Días:</FormLabel>
                <FormControl
                    type="number"
                    id="days"
                    
                    value={numberOfDays}
                    onChange={(e) => setNumberOfDays(e.target.value)}
                />
                <Button onClick={handleGenerateClick} id="Buttons">Generar</Button>
            </FormGroup>
            <Container>
                {/* Mapea y renderiza los componentes "Day" del array de dias */}
                {arrayDays.map((day, index) => (
                    <div key={index}>
                    
                    <Day key={index} dayNumber={day} index={index}/>
                    
                    </div>
                ))}
            </Container>
            <Button id="ButtonSave">Guardar</Button>
        </Container>
    );
}

export default Itinerary;