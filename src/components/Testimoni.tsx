import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation } from "swiper";
// import required modules
import { Pagination } from "swiper";


const TestimoniData = [
    {
        name: 'Naufal Nabilansyah',
        profession: 'Scout Boy',
        message: 'Terima kasih virtuwed, pelayanan yang gesit dan tidak perlu khawatir tentang pengalaman digital. Pernikahan tenang, Mahiru senang.',
    },
    {
        name: 'Hasnat Ferdiananda',
        profession: 'Co Founder virtuwed.id ',
        message: 'Berkat layanan virtuwed, tamu undangan kami menjangkau banyak orang. Futaba dan Saya terbantu.',
    },
    {
        name: 'M Rafly Pratama',
        profession: 'CTO of Upgradia',
        message: 'Virtuwed pelayanannya memuaskan, ramah. Aku dan Nino sukaaa, pemakaiannya mudah banget.',
    },
    {
        name: 'Raka Putra Ramadhan',
        profession: 'UI/UX Designer',
        message: 'Gampang banget tinggal ke websitenya karena dia user friendly, thankyou virtuwed!.',
    },
]

type TestimoniProps = {
    name: string
    profession: string
    message: string
}
export const ElementTestimoni: React.FC<TestimoniProps> = (props) => {
    return (
        <div className='grid rounded-2xl bg-white border border-solid border-[#d5dfff] p-4'>
            <h4 className='text-xl lg:text-2xl'>{props.name}</h4>
            <p className='text-fontColor/50'>{props.profession}</p>
            <p className='my-2.5'>⭐⭐⭐⭐⭐</p>
            <p>{props.message}</p>
        </div>
    )
}


const Testimoni = () => {
    return (
        <Swiper
            className='mySwiper w-full'
            // navigation={true}
            pagination={true}
            modules={[Navigation, Pagination]}
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
            {TestimoniData.map((data, key) => {
                return (
                    <SwiperSlide className='px-12 lg:px-0 py-12' key={key}><ElementTestimoni name={data.name} profession={data.profession} message={data.message} /></SwiperSlide>
                )
            })}
        </Swiper>
    )
}

export default Testimoni