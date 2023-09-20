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

function ElementsGrid({ elements, type }) {

    const [slides, setSlides] = useState(0)

    const setSlidesPerview = () => {
        setSlides(
            window.innerWidth <= 550 ? 1 :
                window.innerWidth <= 720 ? 2 :
                    window.innerWidth <= 900 ? 3 :
                        window.innerWidth > 720 ? 4
                            : 0
        );
    }

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
                                            <div key={element.tipo} className="">
                                                <ElementCard
                                                    name={element.nombre}
                                                    description={element.descripcion}
                                                    url={element.url}
                                                    price={element.precio}
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

export default ElementsGrid;