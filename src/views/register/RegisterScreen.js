import "./styles/RegisterScreen.css"
import RegisterForm from "./components/RegisterForm.js"

import fondomapa from './images/fondomapa.png'
function RegisterScreen(){
    return(
        
        <section class="vh-100" id="MainScreen">
            <h1 id="PreviousText">¿Estas interesado en utilizar Turi?</h1>
            <h3 id="PreviousText">Registrate en el siguiente formulario:</h3>
           
                <RegisterForm/>
        </section>
    );
}

export default RegisterScreen;