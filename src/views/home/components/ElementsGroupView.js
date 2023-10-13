import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ElementsGrid from "./ElementsGrid";

function ElementsGroupView({ restaurants, turistics, activities }) {

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