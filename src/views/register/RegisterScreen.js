//se llama al CSS que le da diseño a esta pantalla
import "./styles/RegisterScreen.css"


//se llama al componente RegisterForm
import RegisterForm from "./components/RegisterForm.js"

import fondomapa from './images/fondomapa.png'
function RegisterScreen() {
    return (
        <>
            <br />
            <div className="RegisterScreen" class="py-4">
                {/* se llama al componente RegisterForm donde esta el cuestionario 
                para llenar la informacion del usuario*/}
                <RegisterForm />
            </div>
        </>
    );
}

export default RegisterScreen;