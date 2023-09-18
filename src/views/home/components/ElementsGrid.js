import ElementCard from "./ElementCard";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/ElementsGridStyle.css"


function ElementsGrid({ elements }) {

    return (
        <>
            <div class="container">
                <div class="row d-flex justify-content-start">
                    {elements.map((element) => {
                        <p>{element.tipo}</p>
                        return (
                            <>
                                <div key={element.tipo} className="grid col-lg-3 col-md-4 col-sm-5 col-xs-6 p-3">
                                    <ElementCard
                                        name={element.nombre}
                                        description={element.descripcion}
                                        url={element.url}
                                    />
                                </div>
                            </>
                        )
                    })
                    }
                </div>
            </div>
        </>
    );
}

export default ElementsGrid;