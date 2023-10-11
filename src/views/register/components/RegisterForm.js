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
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [idDoc, setIdDocument] = useState('');
  const [photo, setPhoto] = useState('');
  const [error, setError] = useState('');

const handleUsernameChange = (e) => {
    setUsername(e.target.value);
};
const handleNameChange = (e) => {
  setName(e.target.value);
};
const handleLastnameChange = (e) => {
  setLastname(e.target.value);
};
const handlePhotoChange = (e) => {
  setPhoto(e.target.value);
};
const handlePhoneNumberChange = (e) => {
  setPhoneNumber(e.target.value);
};
const handleDocumentTypeChange = (e) => {
  setDocumentType(e.target.value)
  if(e.target.value==="DNI"){
    setIdDocument(1);
    
  }else if(e.target.value==="PASAPORTE"){
    setIdDocument(2);
    
  }else if(e.target.value==="CARNET DE EXTRANJERIA"){
    setIdDocument(3);
    
  }else{
    window.alert("Seleccione un tipo de documento")
  }
};
const handleDocumentChange = (e) => {
  setDocument(e.target.value);
};

const handleEmailChange = (e) => {
  setEmail(e.target.value);
};


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

    const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
    const [user, setUser] =useState('');
    const handleButtonClick = () => {
      const data = {
        "usuario": username,
        "correo": email,
        "contraseña": password,
        "nombre": name,
        "apellido": lastname,
        "idTipDoc": idDoc,
        "foto": photo,
        "celular": phonenumber

        
      };
  
      fetch('http://localhost:3000/usuarios/registro', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(data)
          window.alert("Usuario creado");
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrorMessage("Ocurrió un error al registrar el usuario.");
          window.alert("Error:", error);
        });
  };

    return(
            <Container className="ContainerRegister">
              
              <Form>
                    <h4 className="TitleBox">Registro</h4>
                    
                    <Row>

                    <Col>
                    <FormGroup>
                      <FormLabel className='LabelBox'>Usuario:</FormLabel>
                      <Form.Control type="text" id="username" className='TextBox' value={username} onChange={handleUsernameChange}/>
                    </FormGroup>
                    </Col>

                    <Col>
                    <FormGroup>
                      <FormLabel className='LabelBox'>Foto:</FormLabel>
                      <Form.Control type="text" id="urlphoto" className='TextBox' value={photo} onChange={handlePhotoChange}></Form.Control>
                    </FormGroup>
                    </Col>

                    </Row>
                    
                    <Row>

                    <Col>
                    <FormGroup>
                      <FormLabel className='LabelBox'>Nombre:</FormLabel>
                      <Form.Control type="text" id="name" className='TextBox' value={name} onChange={handleNameChange}/>
                    </FormGroup>
                    </Col>
                    
                    <Col>
                    <FormGroup>
                      <FormLabel className='LabelBox'>Apellido:</FormLabel>
                      <Form.Control type="text" id="lastname" className='TextBox' value={lastname} onChange={handleLastnameChange}/>
                    </FormGroup>
                    </Col>
                    
                    </Row>
                    
                    <Row>
                    
                    <Col>
                    <FormGroup>
                      <FormLabel className='LabelBox'>Correo:</FormLabel>
                      <Form.Control type="text" id="email" className='TextBox' value={email} onChange={handleEmailChange}/>
                    </FormGroup>
                    </Col>

                    <Col>
                    <FormGroup>
                      <FormLabel className='LabelBox'>Telefono:</FormLabel>
                      <Form.Control type="text" id="phone-number" className='TextBox' value={phonenumber} onChange={handlePhoneNumberChange}/>
                    </FormGroup>
                    </Col>
                    
                    </Row>

                    <Row>
                    
                    <Col>
                    <FormGroup>
                        <FormLabel className='LabelBox'>Tipo de Documento:</FormLabel>
                        <FormControl as="select" id="document-type" className='TextBox' value={documentType} onChange={handleDocumentTypeChange}>
                            <option>Escoge tu tipo de documento...</option>
                            <option>DNI</option>
                            <option>PASAPORTE</option>
                            <option>CARNET DE EXTRANJERIA</option>
                        </FormControl>
                    </FormGroup>
                    </Col>

                    <Col>
                    <FormGroup>
                      <FormLabel className='LabelBox'>Numero de Documento:</FormLabel>
                      <Form.Control type="text" id="document" className='TextBox' value={document} onChange={handleDocumentChange}/>
                    </FormGroup>
                    </Col>
                    
                    </Row>

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
                    
                    <div className="error-message">{error}</div>
                    </Col>
                    
                    </Row>

              </Form>
              <br/>
              <Button className="ButtonRegister" onClick = {handleButtonClick}>Aceptar</Button>
              <br/>
            </Container>
    );
}

export default RegisterForm;