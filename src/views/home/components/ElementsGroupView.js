import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ElementsCarrousel from "./ElementsCarrousel";

function ElementsGroupView({ restaurants, turistics, activities }) {

    // por cada tipo de lugar se arma un carrousel
    let rest;
    if (restaurants.length > 0) {
        rest =
            <ElementsCarrousel
                elements={restaurants}
                type="Restaurantes"
            />
    }

    let turist;
    if (turistics.length > 0) {
        turist =
            <ElementsCarrousel
                elements={turistics}
                type="Lugares turísticos"
            />
    }

    let act;
    if (activities.length > 0) {
        act =
            <ElementsCarrousel
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