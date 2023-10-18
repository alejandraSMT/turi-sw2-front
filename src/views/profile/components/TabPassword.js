import React, { useState, useEffect } from 'react';
import "../styles/ProfileStyles.css"

// tab 2 -----> Cambio de contraseña
function TabPassword() {

    const usuarioId = window.sessionStorage.getItem("usuarioId")

    // variables de estado, la nueva contraseña
    const [newPassword, setNewPassword] = useState("")
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("") 

    const [buttonSelection, setButtonSelection] = useState(0) // variable para los cambios de botones

    // error en caso de que las contraseñas no sean iguales
    const [error, setError] = useState('')

    // funciones handle para el cambio en los textfields de contraseña
    const handleNewPassChange = (e) => {
        const newPassword = e.target.value;
        const newPassword2 = newPasswordConfirm; // Obtenemos la contraseña repetida
        setNewPassword(newPassword);

        // se verifica que las contraseñas sean iguales mientras se digitan
        if (newPassword !== newPassword2) {
            setError('Las contraseñas no coinciden');
        } else {
            setError('');
        }

    }

    // lo mismo que arriba pero para el textfield de confirmación de contraseña
    const handleNewPassConfirmChange = (e) => {
        setNewPasswordConfirm(e.target.value)
        const newPassword2 = e.target.value;
        const newPassword1 = newPassword; // Obtenemos la contraseña repetida
        setNewPasswordConfirm(newPassword2);

        if (newPassword1 !== newPassword2) {
            setError('Las contraseñas no coinciden');
        } else {
            setError('');
        }
    }

    // función fetch tipo POST para enviar el JSON para el endpoint de cambio de contraseña
    async function handleSubmit(data) {
        try {
            const response = await fetch(`http://localhost:3000/usuarios/setContrasena`, {
                method: "POST", // or 'PUT'
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log("Success:", result);
            alert("Contraseña cambiada exitosamente")
            window.location.reload();
        } catch (error) {
            console.error("Error:", error);
        }
    }

    // para verificar que hay al menos una mayúscula en la contraseña
    const hasUpperCase = str => /[A-Z]/.test(str);

    // warning si la contraseña es menor a 7 o no contiene al menos una mayúscula
    const [showWarning, setShowWarning] = useState(false)

    // función que hace las verificaciones necesarias de la contraseña
    // si pasa todos los filtros, se envía el data JSON a la función handleSubmit (definida arriba) para enviar los cambios al backend
    function handleChangesClick() {
        // verificar que los campos no estén vacíos
        if (newPassword != "" && newPasswordConfirm != "") {
            // verificar que las contraseñas sean iguales
            if (newPassword === newPasswordConfirm) {
                // verificar que la contraseña es mayor o igual a 7 caracteres
                if (newPassword.length >= 7) {
                    // verificar si la contraseña contiene al menos 1 caracter en mayúscula
                    if (hasUpperCase(newPassword) === true) {
                        setError('')

                        const data = {
                            id: usuarioId,
                            contrasena: newPassword
                        }
                        handleSubmit(data)
                        alert("Contraseña cambiada exitosamente")

                        window.location.reload();

                    } else {
                        setError('')
                        setShowWarning(true)
                        alert("ERROR: : La contraseña no contiene mayúscula")
                    }
                } else {
                    setShowWarning(true)
                    alert("ERROR: Contraseña menor a 7 caracteres")
                }
            } else {
                setShowWarning(false)
                alert("ERROR: Las contraseñas son diferentes.")
            }
        } else {
            setShowWarning(false)
            alert("Debe ingresar nueva contraseña")
        }
    }

    // si cancela los cambios, todo regresa por default a como estaba
    function handleCancelClick() {
        setNewPassword("")
        setNewPasswordConfirm("")
        setButtonSelection(0)
        setShowWarning(false)
        setError('')
    }

    const [changePassword, setChangePassword] = useState(false)

    let cancelBtn;
    if (newPassword != "" || newPasswordConfirm != "") {
        cancelBtn = <button class="btn-profile btn" style={{ backgroundColor: (buttonSelection == 0) ? "white" : "#588a4d", color: (buttonSelection == 0) ? "black" : "white" }} type="button" onClick={handleCancelClick} onMouseOver={() => setButtonSelection(1)}>Cancelar</button>
    }

    // mensaje de error si al contraseña es menor a 7 o no contiene al menos una mayúscula
    let messageError;
    if (showWarning && error === '' && newPassword.length < 7) {
        messageError =
            <>
                <div class="messageError">
                    La contraseña debe contener:
                    <br />
                    - Mínimo 7 caracteres
                    <br />
                    - Mínimo una letra mayúscula
                </div>
            </>
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
                <div class="messageError">{error}</div>
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
