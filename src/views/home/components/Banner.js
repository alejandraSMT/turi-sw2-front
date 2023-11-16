import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/bundle'
import BannerCard from './BannerCard';

<script src="https://cdn.jsdelivr.net/npm/swiper@10/swiper-element-bundle.min.js"></script>


function Banner({ elements }) {

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
                    enabled: true,
                    delay: 5000,
                    disableOnInteraction: false,
                    stopOnLastSlide: false
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