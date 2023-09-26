import React, { useState, useEffect } from 'react';
import "../styles/ProfileStyles.css"

function TabPassword() {

    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("")

    const [buttonSelection, setButtonSelection] = useState(0)

    const handleNewPassChange = (e) => {
        setNewPassword(e.target.value)
    }

    const handleNewPassConfirmChange = (e) => {
        setNewPasswordConfirm(e.target.value)
    }

    function handleChangesClick() {
        if(newPassword!="" && newPasswordConfirm!=""){
            if(newPassword===newPasswordConfirm){
                alert("Cambios guardados satisfactoriamente")
            }else{
                alert("ERROR: Las contraseñas sin diferentes")
            }
        }else{
            alert("Debe ingresar nueva contraseña")
        }
    }

    function handleCancelClick(){
        setNewPassword("")
        setNewPasswordConfirm("")
        setButtonSelection(0)
    }

    const [changePassword, setChangePassword] = useState(false)

    let cancelBtn;
    if(newPassword!="" || newPasswordConfirm!=""){
        cancelBtn = <button class="btn-profile btn" style={{ backgroundColor: (buttonSelection == 0) ? "white" : "#588a4d", color: (buttonSelection == 0) ? "black" : "white" }} type="button" onClick={handleCancelClick} onMouseOver={() => setButtonSelection(1)}>Cancelar</button>
    }

    let messageError;
    if (newPassword != newPasswordConfirm) {
        messageError =
            <span class="messageError">Las contraseñas no son iguales</span>
    }

    return (
        <>
            <div class="card-header">Cambiar contraseña</div>
            <div class="card-body">
                <div class="row gx-3">
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputNewPass">Contraseña nueva</label>
                        <input class="form-control" id="inputNewPass" type="password" placeholder="Ingrese su nueva contraseña" value={newPassword} onChange={handleNewPassChange} />
                    </div>
                    <div class="col-md-6">
                        <label class="small mb-1" for="inputNewPassConfirm">Repetir contraseña</label>
                        <input class="form-control" id="inputNewPassConfirm" type="password" name="newPassConfirm" placeholder="Ingrese de nuevo su nueva contraseña" value={newPasswordConfirm} onChange={handleNewPassConfirmChange} />
                    </div>
                </div>
                {messageError}
            </div>
            <div class="profile-password">
                <button class="btn-profile btn" style={{ backgroundColor: (buttonSelection == 0) ? "#588a4d" : "white", color: (buttonSelection == 0) ? "white" : "black" }} type="button" onClick={handleChangesClick} onMouseOver={() => setButtonSelection(0)}>Guardar cambios</button>
                {cancelBtn}
            </div>
        </>
    );
}

export default TabPassword;
