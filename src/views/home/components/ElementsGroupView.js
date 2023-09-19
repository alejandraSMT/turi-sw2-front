import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ElementsGrid from "./ElementsGrid";

function ElementsGroupView({ elements }) {

    var rest_elements = elements.filter(element => element.idTipo === "1")
    var turist_elements = elements.filter(element => element.idTipo === "2")
    var act_elements = elements.filter(element => element.idTipo === "3")

    let rest;
    if (rest_elements.length > 0) {
        rest =
            <ElementsGrid
                elements={rest_elements}
                type="Restaurantes"
            />
    }

    let turist;
    if (turist_elements.length > 0) {
        turist =
            <ElementsGrid
                elements={turist_elements}
                type="Lugares turísticos"
            />
    }

    let act;
    if (act_elements.length > 0) {
        act =
            <ElementsGrid
                elements={act_elements}
                type="Actividades"
            />
    }

    return (
        <>
            {rest}
            {turist}
            {act}
        </>
    );

}

export default ElementsGroupView;