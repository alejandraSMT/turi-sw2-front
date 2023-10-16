import Form from 'react-bootstrap/Form';
import '../styles/RegisterScreen.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'
import { Container, FormGroup, FormLabel, Row, Col, FormControl, Button } from 'react-bootstrap';
import React, { useState } from 'react';

let logo_black = require("./logo-turi-black.png")

function RegisterForm() {

  const navigate = useNavigate();


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
    if (e.target.value === "DNI") {
      setIdDocument(1);

    } else if (e.target.value === "PASAPORTE") {
      setIdDocument(2);

    } else if (e.target.value === "CARNET DE EXTRANJERIA") {
      setIdDocument(3);

    } else {
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
  const [user, setUser] = useState('');

  const handleButtonClick = () => {
    const data = {
      "usuario": username,
      "correo": email,
      "contraseña": password,
      "nombre": name,
      "apellido": lastname,
      "idTipDoc": idDoc,
      "foto": "",
      "celular": phonenumber,
      "numDoc": document

    };

    fetch('http://localhost:3001/usuarios/registro', {
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
        navigate("/")
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage("Ocurrió un error al registrar el usuario.");
        window.alert("Error:", error);
      });
  };

  return (
    <Container id="ContainerRegister">

      <Form>
        <div class="container d-flex" style={{alignItems:"center", justifyContent:"center"}}>
          <h1 className="PreviousText">¡Registrese en </h1>
          <img src={logo_black} style={{ width: "20%", height: "15%" }} />
          <h1 className="PreviousText">!</h1>
        </div>
        <Row>

          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Usuario:</FormLabel>
              <Form.Control type="text" id='TextBox' value={username} onChange={handleUsernameChange} />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Nombre:</FormLabel>
              <Form.Control type="text" id='TextBox' value={name} onChange={handleNameChange} />
            </FormGroup>
          </Col>

        </Row>

        <Row>

          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Apellido:</FormLabel>
              <Form.Control type="text" id='TextBox' value={lastname} onChange={handleLastnameChange} />
            </FormGroup>
          </Col>


          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Correo:</FormLabel>
              <Form.Control type="text" id='TextBox' value={email} onChange={handleEmailChange} />
            </FormGroup>
          </Col>

        </Row>

        <Row>

          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Telefono:</FormLabel>
              <Form.Control type="text" id='TextBox' value={phonenumber} onChange={handlePhoneNumberChange} />
            </FormGroup>
          </Col>

        </Row>

        <Row>

          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Tipo de Documento:</FormLabel>
              <FormControl as="select" id='TextBox' value={documentType} onChange={handleDocumentTypeChange}>
                <option>Escoge tu tipo de documento...</option>
                <option>DNI</option>
                <option>PASAPORTE</option>
                <option>CARNET DE EXTRANJERIA</option>
              </FormControl>
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Numero de Documento:</FormLabel>
              <Form.Control type="text" id='TextBox' value={document} onChange={handleDocumentChange} />
            </FormGroup>
          </Col>

        </Row>

        <Row>

          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Contraseña:</FormLabel>
              <FormControl
                type="password"
                id='TextBox'
                value={password}
                onChange={handlePasswordChange}
              />
            </FormGroup>
          </Col>

          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Repetir contraseña:</FormLabel>
              <FormControl
                type="password"
                id='TextBox'
                value={password2}
                onChange={handlePassword2Change}
              />
            </FormGroup>

            <div id="error-message">{error}</div>
          </Col>

        </Row>

      </Form>
      <br />
      <Button id="ButtonRegister" onClick={handleButtonClick}>Aceptar</Button>
      <br />
    </Container>
  );
}

export default RegisterForm;