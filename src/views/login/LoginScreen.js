import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button'
import '../login/style/LoginScreenStyle.css'
import { useNavigate } from 'react-router-dom'
let img = require('./miraflores_login.jpeg')
let logo_black = require("./logo-turi-black.png")


function LoginScreen() {

    const navigate = useNavigate();

    const [usuarioId, setUsuarioId] = useState('');
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

    const obtenerUsuarioLogin = (data) => {
        return new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(`http://localhost:3000/usuarios/login?usuario=${data.input}&contrasenia=${data.password}`, {
                    method: 'get',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                resolve(response)
            } catch (error) {
                reject(error)
            }
        })
    }

    const handleButtonClick = async () => {
        const data = {
            input: input,
            password: password,
        };
        try {
            const response = await obtenerUsuarioLogin(data)

            if (response.status !== 200) {
                alert("Ha ocurrido un error en el login")
                return
            }

            const usuarioData = await response.json()
            setUsuarioId(usuarioData)
            console.log(usuarioId)

            window.location = "/home"

        } catch (error) {
            console.log(error)
        }
    };

    window.sessionStorage.setItem('usuarioId', usuarioId);

    return (

        <>
            <section class="vh-100" style={{ backgroundClip: "#9A616D" }}>
                <div class="container py-4 h-100">
                    <div class="row d-flex justify-content-center align-items-center h-100">
                        <div class="col col-xl-10">
                            <div class="card card-login" style={{ borderRadius: "1rem" }}>
                                <div class="row g-0">
                                    <div class="col-md-6 col-lg-6 d-flex align-items-center">
                                        <div class="card-body p-4 p-lg-5 text-black">
                                            <div class="row" style={{ justifyContent: "center" }}>
                                                <img src={logo_black} style={{ width: "45%", height: "30%" }} />
                                            </div>
                                            <Container className="LoginScreen align-items-center container">
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

                                                <div className="loginbuttons pt-3 pb-2">
                                                    <Button id="login" onClick={handleButtonClick}>
                                                        Iniciar sesión
                                                    </Button>
                                                </div>

                                                <p class="small mb-5 pb-lg-2"><a class="text-muted" href="#!">Olvidé mi contraseña</a></p>
                                                <p>¿Aún no tiene cuenta?<a href="#!" class="link-success">¡Registrese aquí!</a></p>
                                            </Container>
                                        </div>
                                    </div>
                                    <div class="col-md-6 col-lg-6 d-none d-md-block">
                                        <img src={img}
                                            alt="login form" class="img-fluid h-100" style={{ borderRadius: "0rem 3rem 3rem 0rem", objectFit: "cover" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>

    );

}

export default LoginScreen;