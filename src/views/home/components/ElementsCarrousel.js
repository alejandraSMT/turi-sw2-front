import ElementCard from "./ElementCard";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "../styles/ElementsGridStyle.css"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/bundle'
import { useState, useEffect } from "react";


<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js"></script>

// carrousel de cards por cada tipo de lugar (restaurante, lugar turístico o actividad)
function ElementsCarrousel({ elements, type }) {

    const [slides, setSlides] = useState(0)

    // el número de cards en el carrousel disminuye conforme disminuye el tamaño de la pantalla
    const setSlidesPerview = () => {
        setSlides(
            window.innerWidth <= 600 ? 1 :
                window.innerWidth <= 820 ? 2 :
                    window.innerWidth <= 900 || window.innerWidth < 1080? 3 :
                        window.innerWidth >= 1080 ? 4
                            : 0
        );
    }

    // en la carga del carrousel
    useEffect(() => {
        console.log("WINDOW SIZE: " + window.innerWidth)
        // Initially set the amount of slides on page load
        setSlidesPerview();
        // Add the event listener on component mount
        window.addEventListener("resize", setSlidesPerview);
        // Remove the listener on unmount
        return () => {
            window.removeEventListener("resize", setSlidesPerview);
        };
    }, []);

    // vista carrousel
    return (
        <>
            <h1 style={{ padding: "1rem 0 1rem 0" }}>{type}</h1>
            <Swiper
                spaceBetween={0}
                slidesPerView={slides}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <div class="container-fluid">
                    <div class="row d-flex justify-content-start">
                        <div class="col d-flex align-items-stretch">
                            {elements.map((element) => {
                                return (
                                    <>
                                        <SwiperSlide>
                                            <div key={element.id} className="">
                                                <ElementCard
                                                    id={element.id}
                                                    name={element.nombre}
                                                    distrito={element.distrito}
                                                    url={element.foto}
                                                    costo={element.costo}
                                                />
                                            </div>
                                        </SwiperSlide>
                                    </>
                                )
                            })
                            }
                        </div>
                    </div>
                </div>
            </Swiper>
        </>
    );
}

export default ElementsCarrousel;