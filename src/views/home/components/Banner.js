import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/bundle'
import BannerCard from './BannerCard';

<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js"></script>

let tanta = require("../resources/tanta.jpg")
let cafedelima = require("../resources/cafedelima.jpg")
let sietesopas = require("../resources/sietesopas.png")
let barbarian = require("../resources/barbarian.jpg")
let maregelato = require("../resources/marie.jpg")


function Banner({}) {

    const elements = [
        {
            "id": 1,
            "foto": tanta,
            "nombre": "Tanta",
            "puntaje": 4
        },
        {
            "id": 2,
            "foto": cafedelima,
            "nombre": "Cafe de Lima",
            "puntaje": 4.5
        },
        {
            "id": 3,
            "foto": sietesopas,
            "nombre": "Siete Sopas",
            "puntaje": 4.5
        },
        {
            "id": 4,
            "foto": barbarian,
            "nombre": "Barbarian",
            "puntaje": 4.5
        },
        {
            "id": 5,
            "foto": maregelato,
            "nombre": "Mare Di Gelato",
            "puntaje": 4.5
        }
    ]

    return (
        <>
            <Swiper
                spaceBetween={0}
                slidesPerView={1}
                pagination={true}
                navigation
                style={{
                    "--swiper-pagination-color": "#FFFF",
                    "--swiper-pagination-bullet-inactive-color": "#999999",
                    "--swiper-pagination-bullet-inactive-opacity": "1"
                }}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                loop={true}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false
                }}
            >
                <div class="container-fluid">
                    <div class="row d-flex justify-content-start">
                        <div class="col d-flex align-items-stretch">
                            {elements.map((element) => {
                                return (
                                    <>
                                        <SwiperSlide>
                                            <BannerCard
                                                element={element}
                                            />
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
    )

}

export default Banner;