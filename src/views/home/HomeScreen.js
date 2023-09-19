import "./styles/HomeScreenStyle.css"
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ElementsGroupView from "./components/ElementsGroupView";

function HomeScreen() {

    var elements = [
        {
            "id": "1",
            "nombre": "Tanta",
            "descripcion": "Descripcion sobre Tanta",
            "direccion": "Direccion 1",
            "horario": "L-V: 7am - 9pm",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "2",
            "nombre": "La Rosa Náutica",
            "descripcion": "Descripcion sobre La Rosa Náutica",
            "direccion": "Direccion 2",
            "horario": "L-V: 7am - 9pm",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "3",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        
        {
            "id": "4",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "5",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "6",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "7",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "8",
            "nombre": "Sarcletti",
            "descripcion": "Descripcion sobre Sarcletti",
            "direccion": "Direccion 3",
            "horario": "L-V: 7am - 9pm",
            "idTipo": "1",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "9",
            "nombre": "Lugar 1",
            "descripcion": "Descripcion sobre Lugar 1",
            "direccion": "Direccion 1",
            "horario": "L-V: 7am - 1pm",
            "idTipo": "2",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "10",
            "nombre": "Lugar 2",
            "descripcion": "Descripcion sobre Lugar 2",
            "direccion": "Direccion 2",
            "horario": "L-V: 7am - 1pm",
            "idTipo": "2",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        },
        {
            "id": "11",
            "nombre": "Actividad 1",
            "descripcion": "Descripcion sobre Actividad 1",
            "direccion": "Direccion 1",
            "horario": "L-V: 7am - 1pm",
            "idTipo": "3",
            "url": "https://www.horeca.pe/sites/default/files/tanta-lima-peru.jpg"
        }
    ]

    return (
        <>
            <div className="w-100">
                <div class="row" style={{padding:"7rem"}}>
                    <ElementsGroupView
                        elements={elements}
                    />
                </div>
            </div>
        </>
    );

}

export default HomeScreen;