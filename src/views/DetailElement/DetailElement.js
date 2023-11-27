//importa el componente CardElement
import CardElement from "./components/CardElement.js"

//importa el Header
import Header from "../header/Header.js";


function DetailElement() {
    return (

        <div className="vh-100" >
            {/*agrega el Header */}
            <Header />
            <br />
            {/*Llama al componente CardElement donde se muestra toda la informacion del lugar */}
            <CardElement />
        </div>
    );
}

export default DetailElement;