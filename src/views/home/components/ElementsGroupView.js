import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ElementsGrid from "./ElementsGrid";

function ElementsGroupView({ elements, restaurants, turistics, activities }) {

    var rest_elements = elements.filter(element => element.idTipo === "1")
    var turist_elements = elements.filter(element => element.idTipo === "2")
    var act_elements = elements.filter(element => element.idTipo === "3")

    let rest;
    if (restaurants.length > 0) {
        rest =
            <ElementsGrid
                elements={restaurants}
                type="Restaurantes"
            />
    }

    let turist;
    if (turistics.length > 0) {
        turist =
            <ElementsGrid
                elements={turistics}
                type="Lugares turísticos"
            />
    }

    let act;
    if (activities.length > 0) {
        act =
            <ElementsGrid
                elements={activities}
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