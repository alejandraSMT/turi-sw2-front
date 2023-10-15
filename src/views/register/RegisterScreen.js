import "./styles/RegisterScreen.css"
import RegisterForm from "./components/RegisterForm.js"

import fondomapa from './images/fondomapa.png'
function RegisterScreen() {
    return (
        <>
            <br />
            <div className="RegisterScreen" class="py-4">
                <RegisterForm />
            </div>
        </>
    );
}

export default RegisterScreen;