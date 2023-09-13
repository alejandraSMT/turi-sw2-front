import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import '../login/style/LoginScreenStyle.css'
let img = require('./miraflores_login.jpeg')


function LoginScreen() {

    const [usuario, setUsuario] = useState([]);
    const [input, setInput] = useState('');
    const [password, setPassword] = useState('');

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    function handleError(error) {
        console.log('Ocurrió un error:', error);
    }

    const handleButtonClick = async () => {
        const data = {
            input: input,
            password: password,
        };
        try {
            /*const response = await obtenerUsuarioLogin(data)

            if (response.status !== 200) {
                alert("Ha ocurrido un error en el login")
                return
            }

            const usuarioData = await response.json()
            setUsuario(usuarioData)

            window.location = "/bienvenida"*/

        } catch (error) {
            console.log(error)
        }
    };

    return (

        <>
            <div class="row d-flex justify-content-center align-items-center" className='loginScreen'>
                <div class="login col-md-8 col-lg-6">
                    <h1>¡TURI te da la bienvenida!</h1>
                    <Container className="LoginScreen">
                        <br></br>
                        <Row>
                            <Form.Group>
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control type="text" value={input} onChange={handleInputChange}>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group>
                                <Form.Label id='password'>Contraseña</Form.Label>
                                <Form.Control type="password" value={password} onChange={handlePasswordChange}>
                                </Form.Control>
                            </Form.Group>
                        </Row>

                        <span>
                            <p><a href="#!" class="text-body">Crear cuenta</a></p>
                            <p>&nbsp; -	&nbsp;</p>
                            <p><a href="#!" class="text-body">Olvidé mi contraseña</a></p>
                        </span>

                        <div className="loginbuttons">
                            <Button id="login" onClick={handleButtonClick}>
                                Iniciar sesión
                            </Button>
                        </div>

                    </Container>
                </div>

                <div className='imgContainer col-md-9 col-lg-6 col-xl-5'>
                    <img src={img} class="imgLogin img-fluid" className='imgLogin' />
                </div>

            </div>
        </>

    );

}

export default LoginScreen;