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


<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js"></script>

function ElementsGrid({ elements, type }) {
    return (
        <>
            <h1 style={{ padding: "1rem 0 1rem 0" }}>{type}</h1>
            <Swiper
                spaceBetween={10}
                slidesPerView={4}
                navigation
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
            >
                <div class="container">
                    <div class="row d-flex justify-content-start">
                        {elements.map((element) => {
                            return (
                                <>
                                    <SwiperSlide>
                                        <div key={element.tipo} className="">
                                            <ElementCard
                                                name={element.nombre}
                                                description={element.descripcion}
                                                url={element.url}
                                            />
                                        </div>
                                    </SwiperSlide>
                                </>
                            )
                        })
                        }
                    </div>
                </div>
            </Swiper>
        </>
    );
}

export default ElementsGrid;