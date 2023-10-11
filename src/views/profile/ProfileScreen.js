import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../profile/styles/ProfileStyles.css"
import TabData from './components/TabData';
import TabPassword from './components/TabPassword';
import Header from '../header/Header';

function ProfileScreen() {

    var user = {
        "name": "Alejandra",
        "last_name": "San Martin",
        "profile_pic": "https://yt3.googleusercontent.com/VB0_8gPDwcKYd_wVCJdWcwjttoQu1Xle7EUInFxxfMM5kgYdoFJWyPJ6pdcdRy3FU2B6MHYOKw=s900-c-k-c0x00ffffff-no-rj",
        "email": "alejandrasanmartin2911@gmail.com",
        "nro_doc": "1234567",
        "tipo_documento": "DNI",
        "user":"wonwonderful",
        "celular":"953997647"
    }

    const [activeTab, setActiveTab] = useState("tab1");

    const handleTab1 = () => {
        setActiveTab("tab1");
    };

    const handleTab2 = () => {
        setActiveTab("tab2");
    };




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
                                <TabData user={user} />
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