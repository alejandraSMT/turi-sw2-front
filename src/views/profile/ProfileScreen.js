import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../profile/styles/ProfileStyles.css"
import TabData from './components/TabData';
import TabPassword from './components/TabPassword';
import Header from '../header/Header';

function ProfileScreen() {

    const userId = window.sessionStorage.getItem("usuarioId");

    const [activeUser, setActiveUser] = useState([]);
    const [tipoDoc, setTipoDoc] = useState("");

    useEffect(() => {
        fetchProfile();
    }, []);

    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    };

    const handleTab2 = () => {
        setActiveTab("tab2");
    };

    async function getProfileInfo() {
        await fetch(`http://localhost:3000/usuarios/getDatosUsuario?id=${userId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Verificar los datos obtenidos desde el servidor
                setActiveUser(data);
            })
            .catch(error => console.log('Ocurrió un error:', error));
    }

    async function getTipoDoc() {
        await fetch(`http://localhost:3000/usuarios/getTipoDoc?id=${userId}`)
            .then(response => response.text())
            .then(data => {
                console.log(data); // Verificar los datos obtenidos desde el servidor
                setTipoDoc(data);
            })
            .catch(error => console.log('Ocurrió un error:', error));
    }

    async function fetchProfile(){
        try{
            await getProfileInfo();
            await getTipoDoc();
            console.log("TODO OK")
        }catch(error){
            console.log(error)
        }
    }

    async function handleSubmit(data) {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/actualizarDatosUsuario`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);
            alert("Datos cambiados exitosamente")
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }





    return (
        <>
            <Header />
            <div class="container-xl px-4 mt-4">
                <div class="row">
                    <div class="col-xl-4 col-lg-5 col-md-6 col-sm-4">
                        <div class="row">
                            <div class="col-lg-12 pb-3">
                                <div class="list-group" id="list-tab" role="tablist">
                                    <a class={activeTab === "tab1" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} id="list-datos-list" data-bs-toggle="list" href="#list-datos-personales" role="tab" aria-controls="list-datos-personales" onClick={handleTab1}>Datos personales</a>
                                    <a class={activeTab === "tab2" ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"} id="list-contraseña-list" data-bs-toggle="list" href="#list-contraseña" role="tab" aria-controls="list-contraseña" onClick={handleTab2}>Cambiar contraseña</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-8 col-lg-7 col-md-6 col-sm-8">
                        <div class="card mb-4">
                            {activeTab === "tab1" && (
                                <TabData
                                    onSubmit={handleSubmit}
                                    activeUser={activeUser}
                                    tipoDoc={tipoDoc}
                                />
                            )}
                            {activeTab === "tab2" && (
                                <TabPassword />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileScreen;