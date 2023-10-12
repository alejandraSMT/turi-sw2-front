import React, { useState, useEffect } from 'react';
import "../styles/ProfileStyles.css"

function TabData({ activeUser, tipoDoc, onSubmit }) {

    const usuarioId = window.sessionStorage.getItem("usuarioId")

    const [name, setName] = useState(activeUser.nombre);
    const [lastName, setLastName] = useState(activeUser.apellido)
    const [email, setEmail] = useState(activeUser.correo)
    const [username, setUsername] = useState(activeUser.usuario)
    const [phone, setPhone] = useState(activeUser.celular)
    const [photo, setPhoto] = useState(activeUser.foto)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (activeUser) {
            setName(activeUser.nombre);
            setLastName(activeUser.apellido);
            setEmail(activeUser.correo);
            setUsername(activeUser.usuario);
            setPhone(activeUser.celular);
            setPhoto(activeUser.foto);
            setLoading(false);
        }
    }, [activeUser]);


    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
    };

    const handlePhotoChange = (e) => {
        setPhone(e.target.value);
    };

    function handleActivateChangesClick() {
        setChangeValues(false)
    }

    function handleActivateChangesClick() {
        setChangeValues(false)
    }

    function handleChangesClick() {
        handleSubmit()
    }

    function handleDeactivateChangesClick() {
        setName(activeUser.nombre)
        setLastName(activeUser.apellido)
        setEmail(activeUser.correo)
        setUsername(activeUser.usuario)
        setPhone(activeUser.celular)
        setPhoto(activeUser.foto)
        setChangeValues(true)
        setButtonSelectionProfile(0)
    }

    const [buttonSelectionProfile, setButtonSelectionProfile] = useState(0)

    const [changeValues, setChangeValues] = useState(true)

    function handleSubmit() {
        const submitValue = {
            id: usuarioId,
            nombre: name,
            usuario:username,
            apellido: lastName,
            correo: email,
            celular: phone,
            foto: photo
        };
        console.log(submitValue);
        onSubmit(submitValue);
    }

    let buttonView;
    if (changeValues) {
        buttonView =
            <div class="profile-buttons">
                <button class="btn btn-profile" onClick={handleActivateChangesClick}>Actualizar datos</button>
            </div>
    } else {
        buttonView =
            <div class="profile-buttons">
                <button class="btn btn-profile" style={{ backgroundColor: (buttonSelectionProfile == 0) ? "#588a4d" : "white", color: (buttonSelectionProfile == 0) ? "white" : "black" }} type="button" onClick={handleChangesClick} onMouseOver={() => setButtonSelectionProfile(0)}>Guardar cambios</button>
                <button class="btn btn-profile-cancel" style={{ backgroundColor: (buttonSelectionProfile == 0) ? "white" : "#588a4d", color: (buttonSelectionProfile == 0) ? "black" : "white" }} type="button" onClick={handleDeactivateChangesClick} onMouseOver={() => setButtonSelectionProfile(1)}>Cancelar</button>
            </div>
    }

    let view;
    if (loading) {
        view =
            <div>Cargando..</div>
    } else {
        view =
            <>
                <div class="container d-flex justify-content-center container-photo">
                    <div>
                        <img class="img-account-profile rounded-circle mb-2" width="160" height="70" src={photo} onChange={handlePhotoChange} alt="" />
                        <div>
                            <p><a class="link-profile" href='#'>Cambiar foto de perfil</a></p>
                        </div>
                    </div>
                </div>
                <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputFirstName">Nombre</label>
                        <input class="form-control" id="inputFirstName" type="text" placeholder="Ingrese su nombre" value={name} onChange={handleNameChange} disabled={changeValues} />
                    </div>
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputLastName">Apellido</label>
                        <input class="form-control" id="inputLastName" type="text" placeholder="Ingrese su apellido" value={lastName} onChange={handleLastNameChange} disabled={changeValues} />
                    </div>
                </div>

                <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputEmailAddress">Correo electrónico</label>
                        <input class="form-control" id="inputEmailAddress" type="email" placeholder="Ingrese su correo electrónico" value={email} onChange={handleEmailChange} disabled={changeValues} />
                    </div>
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputUsername">Usuario</label>
                        <input class="form-control" id="inputUsername" type="text" placeholder="Ingrese su usuario" value={username} onChange={handleUsernameChange} disabled={changeValues} />
                    </div>
                </div>
                <div class="row gx-3 mb-3">
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputNroDoc">Número de documento</label>
                        <input class="form-control" id="inputNroDoc" type="text" placeholder="" value={activeUser.numDoc} disabled={true} />
                    </div>
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputTypeDoc">Tipo de documento</label>
                        <input class="form-control" id="inputTypeDoc" type="text" placeholder="" value={tipoDoc} disabled={true} />
                    </div>
                </div>
                <div class="col-md-6 pb-3">
                    <label class="small mb-1" for="inputPhone">Teléfono</label>
                    <input class="form-control" id="inputPhone" type="text" placeholder="Ingrese su teléfono" value={phone} onChange={handlePhoneChange} disabled={changeValues} />
                </div>

                {buttonView}
            </>
    }

    return (
        <>
            <div class="card-header">Datos personales</div>
            <div class="card-body">
                <form>
                    {view}
                </form>
            </div>
        </>
    );
}

export default TabData;