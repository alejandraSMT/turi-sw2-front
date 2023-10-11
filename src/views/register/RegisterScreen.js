import "./styles/RegisterScreen.css"
import RegisterForm from "./components/RegisterForm.js"

import fondomapa from './images/fondomapa.png'
function RegisterScreen(){
    return(
        
        <div className="RegisterScreen" >
           <h1 className="PreviousText">¿Estas interesado en utilizar Turi?</h1>
            <h3 className="PreviousText">Registrate en el siguiente formulario:</h3>
                <RegisterForm/>
        </div>
    );
}

export default RegisterScreen;