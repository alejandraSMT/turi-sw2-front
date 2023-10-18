//se llama al CSS que le da diseño a esta pantalla
import '../styles/RegisterScreen.css';
//se llama al CSS de la libreria bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//importa elementos de react
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';

//importa elementos de react-bootstrap
import { Container, FormGroup, FormLabel, Row, Col, FormControl, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

let logo_black = require("./logo-turi-black.png")

function RegisterForm() {

  const navigate = useNavigate();

  //se definen la variable del dato nombre y su setter para cuando se cambie el valor
  const [name, setName] = useState('');
  //se definen la variable del dato apellido y su setter para cuando se cambie el valor
  const [lastname, setLastname] = useState('');
  //se definen la variable del dato email y su setter para cuando se cambie el valor
  const [email, setEmail] = useState('');
  //se definen la variable del dato tipo de documento y su setter para cuando se cambie el valor
  const [documentType, setDocumentType] = useState('');
  //se definen la variable del dato numero de documento y su setter para cuando se cambie el valor
  const [document, setDocument] = useState('');
  //se definen la variable del dato celular y su setter para cuando se cambie el valor
  const [phonenumber, setPhoneNumber] = useState('');
  //se definen la variable del dato nombre de usuario y su setter para cuando se cambie el valor
  const [username, setUsername] = useState('');
  //se definen la variable del dato del id del tipo de documento y su setter para cuando se cambie el valor
  const [idDoc, setIdDocument] = useState('');
  //se definen la variable del dato foto y su setter para cuando se cambie el valor
  const [photo, setPhoto] = useState('');
  //constantes para comparar que la contraseña ingresada sea igual a la que se pide para confirmar
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  //constante para manejar un posible error
  const [error, setError] = useState('');

  //funcion para cuando el usuario escriba otro nombre de usuario se actualice el valor
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  //funcion para cuando el usuario escriba otro nombre se actualice el valor
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  //funcion para cuando el usuario escriba otro apellido se actualice el valor
  const handleLastnameChange = (e) => {
    setLastname(e.target.value);
  };
  //funcion para cuando el usuario ingrese otra foto se actualice el valor
  const handlePhotoChange = (e) => {
    setPhoto(e.target.value);
  };
  //funcion para cuando el usuario escriba otro numero de celular se actualice el valor
  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };
  //funcion para cuando el usuario seleccione otro tipo de documento se actualice el valor
  //Tambien setea el IdDocument con el ID del que se selecciono
  const handleDocumentTypeChange = (e) => {
    setDocumentType(e.target.value)
    //si lo seleccionado es DNI el ID sera 1
    if (e.target.value === "DNI") {
      setIdDocument(1);
      //si lo seleccionado es PASAPORTE el ID sera 2
    } else if (e.target.value === "PASAPORTE") {
      setIdDocument(2);
      //si es CARNET DE EXTRANJERIA el ID sera 3
    } else if (e.target.value === "CARNET DE EXTRANJERIA") {
      setIdDocument(3);
      //si no es ninguno de los anteriores se mostrara un alert para que seleccione un tipo
    } else {
      window.alert("Seleccione un tipo de documento")
    }
  };
  //funcion para cuando el usuario ingrese otro numero de documento se actualice el valor
  const handleDocumentChange = (e) => {
    setDocument(e.target.value);
  };
  //funcion para cuando el usuario ingrese otro email se actualice el valor

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };


  const [showWarning, setShowWarning] = useState(false)

  //funcion para cuando el usuario ingrese otra contraseña para se actualice el valor
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
  //variable para el mensaje de error de la conexion con el endpoint
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error
  //variable donde se guardara el body JSON
  const [user, setUser] = useState('');

  //funcion para al dar click al boton se complete el registro y se inserte en la base de datos la informacion
  //del nuevo usuario creado usando la conexion con el endpoint "usuarios/registro"
  const handleSubmitData = () => {
    //la variable data es el body JSON que se enviara al endpoint y se definen las variables declaradas arriba
    //con los atributos de la clase Usuario
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
    //conexion con endpoint "usuarios/registro" para el registro de usuarios
    fetch('http://localhost:3000/usuarios/registro', {
      method: 'post', //metodo post porque se va a insertar data nueva
      //se conviere a objeto JSON lo declaro en data
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',

      },
    })
      .then((response) => response.json())
      .then((data) => {
        //si se hay buena conexion y se logra crear el nuevo usuario
        setUser(data)
        window.alert("Usuario creado");
        navigate("/")
      })
      .catch((error) => {
        console.error("Error:", error);
        //mensaje de error al no darse bien la conexion
        setErrorMessage("Ocurrió un error al registrar el usuario.");
        window.alert("Error:", error);
      });
  };

  // función para verificar si la contraseña contiene una mayúscula
  const hasUpperCase = str => /[A-Z]/.test(str);

  function handleButtonClick() {

    if (password === password2) {
      if (password.length >= 7) {
        if (hasUpperCase(password) === true) {
          handleSubmitData();
          setShowWarning(false)
          setError('')
        } else {
          alert("Error: La contraseña no contiene mayúscula.")
          setShowWarning(true);
        }
      } else {
        alert("Error: Contraseña menor a 7 caracteres.")
        setShowWarning(true);
      }
    } else {
      alert("Error: Las contraseñas no son iguales.")
      setShowWarning(false)
    }
  }

  let msg;
  if (showWarning && error === '' && password.length < 7) {
    msg =
      <>
        <div id="error-message">
          La contraseña debe contener:
          <br />
          - Mínimo 7 caracteres
          <br />
          - Mínimo una letra mayúscula
        </div>
      </>
  }

  return (
    <Container id="ContainerRegister">

      <Form>
        <div class="container d-flex" style={{ alignItems: "center", justifyContent: "center" }}>
          {/*Mensaje para registro */}
          <h1 className="PreviousText">¡Registrese en </h1>
          <img src={logo_black} style={{ width: "20%", height: "15%" }} />
          <h1 className="PreviousText">!</h1>
        </div>
        <Row>
          {/*cuadro de texto para escribir el username del usuario */}
          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Usuario:</FormLabel>
              <Form.Control type="text" id='TextBox' value={username} onChange={handleUsernameChange} />
            </FormGroup>
          </Col>

          {/*cuadro de texto para escribir el nombre del usuario*/}
          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Nombre:</FormLabel>
              <Form.Control type="text" id='TextBox' value={name} onChange={handleNameChange} />
            </FormGroup>
          </Col>

        </Row>

        <Row>
          {/*cuadro de texto para escribir el apellido del usuario */}
          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Apellido:</FormLabel>
              <Form.Control type="text" id='TextBox' value={lastname} onChange={handleLastnameChange} />
            </FormGroup>
          </Col>

          {/*cuadro de texto para escribir el correo del usuario */}

          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Correo:</FormLabel>
              <Form.Control type="text" id='TextBox' value={email} onChange={handleEmailChange} />
            </FormGroup>
          </Col>

        </Row>

        <Row>
          {/*cuadro de texto para escribir el telefono del usuario */}

          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Telefono:</FormLabel>
              <Form.Control type="text" id='TextBox' value={phonenumber} onChange={handlePhoneNumberChange} />
            </FormGroup>
          </Col>

        </Row>

        <Row>
          {/*cuadro de texto para seleccionar en opciones el tipo de documento del usuario */}

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

          {/*cuadro de texto para escribir el numero del documento del usuario */}

          <Col>
            <FormGroup>
              <FormLabel id='LabelBox'>Numero de Documento:</FormLabel>
              <Form.Control type="text" id='TextBox' value={document} onChange={handleDocumentChange} />
            </FormGroup>
          </Col>

        </Row>

        <Row>

          {/*cuadro de texto para escribir la contraseña del usuario */}

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

          {/*cuadro de texto para escribir la confirmacion de la contraseña del usuario */}

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

            {/*mensaje de error si no son iguales */}
            <div id="error-message">{error}</div>
            {msg}
          </Col>

        </Row>

      </Form>
      <br />
      {/*Boton para aceptar el registro del nuevo usuario y esta conectado al endpoint*/}

      <Button id="ButtonRegister" onClick={handleButtonClick}>Aceptar</Button>
      <br />
    </Container>
  );
}

export default RegisterForm;