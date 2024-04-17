import React, { useRef } from 'react';
import { client } from '../lib/client';
import { HeroBanner, EventsBanner, Newsletter, FeaturesBanner, Product } from '../components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import backIcon from '../src/assets/Back.png';
import nextIcon from '../src/assets/Next.png';

const Home = ({ products, bannerData, event1Data, event2Data, event3Data }) => {
  const swiperRef = useRef(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <>
      <div className='products-outer-container'>
        <div className='subtitle'></div>
        <Swiper
          
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          breakpoints={{
            300: {
              slidesPerView: 1,
              spaceBetween: 100
            },
            1000: {
              slidesPerView: 2,
              spaceBetween: 0
            },
            1260: {
              slidesPerView: 3,
              spaceBetween: 0
            }
          }}
          spaceBetween={0}
          slidesPerView={3}
          ref={swiperRef}
        >
          <div className='products-container'>
            {products?.map(product => (
              <SwiperSlide key={product._id}>
                <Product product={product} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
        <div className="swiper-button-prev" onClick={goPrev}>
          <img src={backIcon} alt="Previous" />
        </div>
        <div className="swiper-button-next" onClick={goNext}>
          <img src={nextIcon} alt="Next" />
        </div>
      </div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <EventsBanner event1={event1Data.length && event1Data[0]} event2={event2Data.length && event2Data[0]} event3={event3Data.length && event3Data[0]} />
      <FeaturesBanner />
      <Newsletter />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  // Events
  const event1Query = '*[_type == "event1"]';
  const event1Data = await client.fetch(event1Query);

  const event2Query = '*[_type == "event2"]';
  const event2Data = await client.fetch(event2Query);

  const event3Query = '*[_type == "event3"]';
  const event3Data = await client.fetch(event3Query);

  return {
    props: { products, bannerData, event1Data, event2Data, event3Data }
  };
};

export default Home;
