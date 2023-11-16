import React, { useState, useEffect } from 'react';
import "../styles/ProfileStyles.css"

// tab 1 -----> Datos personales
function TabData({ activeUser, tipoDoc, onSubmit }) {

    const userToken = window.sessionStorage.getItem("userToken")

    // variables de estado de los datos del usuario en sesión
    const [name, setName] = useState(activeUser.nombre);
    const [lastName, setLastName] = useState(activeUser.apellido)
    const [email, setEmail] = useState(activeUser.correo)
    const [username, setUsername] = useState(activeUser.usuario)
    const [phone, setPhone] = useState(activeUser.celular)
    const [photo, setPhoto] = useState(activeUser.foto)
    const [loading, setLoading] = useState(true);

    // se ejecuta en la primera carga
    // si hay un usuario en sesión, se setean los datos traidos de la base de datos desde la vista de ProfileScreen
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

    // funciones handle para manejar el cambio de los textfields
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
        setPhoto(e.target.value);
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

    // si le da click al botón de cancelar, los datos regresan a como estaban antes -> los datos de la base de datos
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

    // variables para cambios en botones del tab
    const [buttonSelectionProfile, setButtonSelectionProfile] = useState(0)

    const [changeValues, setChangeValues] = useState(true)

    // función para armar el JSON que se enviará a la función en ProfileScreen que actualiza los datos del usuario
    function handleSubmit() {
        const submitValue = {
            token: userToken,
            nombre: name,
            usuario: username,
            apellido: lastName,
            correo: email,
            celular: phone,
            foto: photo
        };
        console.log(submitValue);
        onSubmit(submitValue);
    }

    let noPhoto = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    if(photo===""){
        setPhoto(noPhoto)
    }

    function handlePhotoChangeClick(){
        setChangeValues(false)
    }

    // en caso se quiera cambiar la foto de perfil, aparece un textfield para introducir el url de la nueva foto
    let url;
    if (!changeValues) {
        url =
            <>
                <p id="adjuntar">
                    <input
                        type="text"
                        placeholder="Ingrese la URL de la foto"
                        id="photoUrl"
                        onChange={handlePhotoChange}
                    />
                </p>
            </>
    }


    // cambios en los botones 1) Actualizar datos (si desea realizar cambios) 2) Guardar y Cancelar
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

    // vista general
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
                            <p><a class="link-profile" onClick={handlePhotoChangeClick} href='#'>Cambiar foto de perfil</a></p>
                            {url}
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