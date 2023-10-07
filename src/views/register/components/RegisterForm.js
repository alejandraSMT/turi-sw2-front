import Form from 'react-bootstrap/Form';
import '../styles/RegisterScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container, FormGroup, FormLabel, Row, Col, FormControl, Button } from 'react-bootstrap';
import React, { useState } from 'react';

function RegisterForm(){
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [document, setDocument] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  // Función para verificar si las contraseñas coinciden
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        const newPassword2 = password2; // Obtenemos la contraseña repetida
        setPassword(newPassword);

        // Verificamos si las contraseñas no coinciden y establecemos el mensaje de error
        if (newPassword !== newPassword2) {
        setError('Las contraseñas no coinciden');
        } else {
        setError('');
        }
    };

  // Función para manejar cambios en la segunda contraseña
    const handlePassword2Change = (e) => {
        const newPassword2 = e.target.value;
        const newPassword = password; // Obtenemos la primera contraseña
        setPassword2(newPassword2);

        // Verificamos si las contraseñas no coinciden y establecemos el mensaje de error
        if (newPassword !== newPassword2) {
        setError('Las contraseñas no coinciden');
        } else {
        setError('');
        }
    };

    const [error, setError] = useState(''); // Estado para el mensaje de error

    

    return(
            <Container id="ContainerRegister">
              
              <Form>
                    <h4 id="TitleBox">Registro</h4>
                    <Row>
                    <Col>
                    <FormGroup>
                      <FormLabel className='LabelBox'>Nombre:</FormLabel>
                      <Form.Control type="text" id="name" className='TextBox' />
                    </FormGroup>
                    </Col>
                    
                    <Col>
                    <FormGroup>
                      <FormLabel className='LabelBox'>Apellido:</FormLabel>
                      <Form.Control type="text" id="lastname" className='TextBox' />
                    </FormGroup>
                    </Col>
                    </Row>
                    <br/>
                    <Row>
                    <Col>
                    <FormGroup>
                      <FormLabel className='LabelBox'>Correo:</FormLabel>
                      <Form.Control type="text" id="email" className='TextBox' />
                    </FormGroup>
                    </Col>

                    

                    <Col>
                    <FormGroup>
                      <FormLabel className='LabelBox'>Telefono:</FormLabel>
                      <Form.Control type="text" id="phone-number" className='TextBox' />
                    </FormGroup>
                    </Col>
                    </Row>

                    <br/>

                    <Row>
                    <Col>
                    <FormGroup>
                        <FormLabel className='LabelBox'>Tipo de Documento:</FormLabel>
                        <FormControl as="select" id="document-type" className='TextBox'>
                            <option>Escoge tu tipo de documento...</option>
                            <option>DNI</option>
                            <option>PASAPORTE</option>
                            <option>CARNET DE EXTRANJERIA</option>
                        </FormControl>
                    </FormGroup>
                    </Col>
<br/>
                    <Col>
                    <FormGroup>
                      <FormLabel className='LabelBox'>Numero de Documento:</FormLabel>
                      <Form.Control type="text" id="document" className='TextBox'/>
                    </FormGroup>
                    </Col>
                    </Row>

                    <br/>
                    <Row>
                    <Col>
                    <FormGroup>
                        <FormLabel className='LabelBox'>Contraseña:</FormLabel>
                        <FormControl
                        type="password"
                        id="password"
                        className='TextBox'
                        value={password}
                        onChange={handlePasswordChange}
                        />
                    </FormGroup>
                    </Col>

                    <Col>
                    <FormGroup>
                        <FormLabel className='LabelBox'>Repetir contraseña:</FormLabel>
                        <FormControl
                        type="password"
                        id="password2"
                        className='TextBox'
                        value={password2}
                        onChange={handlePassword2Change}
                        />
                    </FormGroup>
                    
                    <div id="error-message">{error}</div>
                    </Col>
                    </Row>
              </Form>
              <br/>
              <Button id="ButtonRegister">Aceptar</Button>
            </Container>
    );
}

export default RegisterForm;