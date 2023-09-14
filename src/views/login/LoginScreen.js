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
            <section class="vh-100">
                <div class="container-fluid">
                    <div class="row align-items-center">
                        <div class="login col-sm-6 h-custom-2 text-black">

                            <h1>¡TURI te da la bienvenida!</h1>
                            <Container className="LoginScreen align-items-center">
                                <br></br>
                                <Row>
                                    <Form.Group>
                                        <Form.Label id='correo'>Correo electrónico</Form.Label>
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

                                <div className="loginbuttons">
                                    <Button id="login" onClick={handleButtonClick}>
                                        Iniciar sesión
                                    </Button>
                                </div>

                                <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Olvidé mi contraseña</a></p>
                                <p>¿Aún no tiene cuenta?<a href="#!" class="link-success">¡Registrese aquí!</a></p>

                            </Container>

                        </div>
                        <div class="col-sm-6 px-0 d-none d-sm-block">
                            <img src={img} alt="Login image" class="imgLogin w-100 vh-100" />
                        </div>
                    </div>
                </div>
            </section>
        </>

    );

}

export default LoginScreen;