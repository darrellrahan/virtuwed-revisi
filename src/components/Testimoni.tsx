import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";


export const ElementTestimoni = () => {
    return (
        <div className='grid rounded-2xl bg-primary text-white p-4 mx-12'>
            <h4 className='text-xl'>Naufal Nabilansyah</h4>
            <span>Scout Boy</span>
            <p className='my-2.5'>⭐⭐⭐⭐⭐</p>
            <p>Terima kasih virtuwed, pelayanan yang gesit dan tidak perlu khawatir tentang pengalaman digital. Pernikahan tenang, Mahiru senang.</p>
        </div>
    )
}


const Testimoni = () => {


    return (
        <Swiper
            className='mySwiper w-full'
            navigation={true}
            modules={[Navigation]}
            spaceBetween={24}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            breakpoints={{
                576: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                1024: {
                    slidesPerView: 3,
                },
            }}
        >
            <SwiperSlide><ElementTestimoni /></SwiperSlide>
            <SwiperSlide><ElementTestimoni /></SwiperSlide>
            <SwiperSlide><ElementTestimoni /></SwiperSlide>
            <SwiperSlide><ElementTestimoni /></SwiperSlide>
            <SwiperSlide><ElementTestimoni /></SwiperSlide>
        </Swiper>
    )
}

export default Testimoni