import "./styles/HomeScreenStyle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ElementsGrid from "./components/ElementsGrid";

function HomeScreen() {

    var elements = [
        { 
            "id": "1",
            "nombre": "Tanta",
            "descripcion": "Descripcion sobre Tanta",
            "direccion": "Direccion 1",
            "horario": "L-V: 7am - 9pm",
            "tipo": "Restaurantes",
            "url":"https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "2",
            "nombre": "La Rosa Náutica",
            "descripcion": "Descripcion sobre La Rosa Náutica",
            "direccion": "Direccion 2",
            "horario": "L-V: 7am - 9pm",
            "tipo": "Restaurantes",
            "url":"https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "3",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "tipo": "Restaurantes",
            "url":"https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "4",
            "nombre": "Lugar 1",
            "descripcion": "Descripcion sobre Lugar 1",
            "direccion": "Direccion 1",
            "horario": "L-V: 7am - 1pm",
            "tipo": "Lugares turísticos",
            "url":"https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "5",
            "nombre": "Lugar 2",
            "descripcion": "Descripcion sobre Lugar 2",
            "direccion": "Direccion 2",
            "horario": "L-V: 7am - 1pm",
            "tipo": "Lugares turísticos",
            "url":"https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "6",
            "nombre": "Actividad 1",
            "descripcion": "Descripcion sobre Actividad 1",
            "direccion": "Direccion 1",
            "horario": "L-V: 7am - 1pm",
            "tipo": "Actividades",
            "url":"https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        }
    ]

    return (
        <>
            <div className="w-100">
                <ElementsGrid
                    elements={elements} />
            </div>
        </>
    );

}

export default HomeScreen;