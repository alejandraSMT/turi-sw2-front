import React, { useState, useEffect } from 'react';
import "../styles/ProfileStyles.css"

function TabData({ user }) {

    const [name, setName] = useState(user.name);
    const [lastName, setLastName] = useState(user.last_name)
    const [email, setEmail] = useState(user.email)

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    function handleActivateChangesClick() {
        setChangeValues(false)
    }

    function handleActivateChangesClick() {
        setChangeValues(false)
    }

    function handleChangesClick() {
        alert("Cambios guardados satisfactoriamente")
    }

    function handleDeactivateChangesClick() {
        setName(user.name)
        setLastName(user.last_name)
        setEmail(user.email)
        setChangeValues(true)
        setButtonSelectionProfile(0)
    }

    const [buttonSelectionProfile, setButtonSelectionProfile] = useState(0)

    const [changeValues, setChangeValues] = useState(true)

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

    return (
        <>
            <div class="card-header">Datos personales</div>
            <div class="card-body">
                <form>
                    <div class="container d-flex justify-content-center container-photo">
                        <div>
                            <img class="img-account-profile rounded-circle mb-2" src={user.profile_pic} alt="" />
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

                    <div class="mb-3">
                        <label class="small mb-1" for="inputEmailAddress">Correo electrónico</label>
                        <input class="form-control" id="inputEmailAddress" type="email" placeholder="Ingrese su correo electrónico" value={email} onChange={handleEmailChange} disabled={changeValues} />
                    </div>
                    <div class="row gx-3 mb-3">
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputNroDoc">Número de documento</label>
                            <input class="form-control" id="inputNroDoc" type="text" placeholder="" value={user.nro_doc} disabled={true} />
                        </div>
                        <div class="col-md-6">
                            <label class="small mb-1" for="inputTypeDoc">Tipo de documento</label>
                            <input class="form-control" id="inputTypeDoc" type="text" placeholder="" value={user.tipo_documento} disabled={true} />
                        </div>
                    </div>

                    {buttonView}
                </form>
            </div>
        </>
    );
}

export default TabData;