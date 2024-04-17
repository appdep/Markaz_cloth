import React from 'react'
import {client} from '../lib/client'
import { HeroBanner, EventsBanner, Newsletter, FeaturesBanner, Product } from '../components'
import { Navigation, A11y, Lazy } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

const Home = ({products ,bannerData ,event1Data,event2Data,event3Data}) => {
  return (
    <>
      
     

      <div className='products-outer-container'>
        <div className='subtitle'>
          <span>PRODUCTS</span>
          <h2>Check What We Have</h2>
        </div>
        <Swiper
          breakpoints={{
              // width >= 300
              300: {
                slidesPerView: 1,
                spaceBetween: 100
              },
              // width >= 1000
              1000: {
                slidesPerView: 2,
                spaceBetween: 0
              },
              // width >= 1260
              1260: {
                slidesPerView: 3,
                spaceBetween: 0
              }
          }}
          modules={[Navigation, A11y]}
          spaceBetween={0}
          slidesPerView={3}
          navigation={true}
        >
          <div className='products-container'>
            {products?.map(product => (
              <SwiperSlide>
                <Product key={product._id} product={product} />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <EventsBanner event1={event1Data.length && event1Data[0]} event2={event2Data.length && event2Data[0]} event3={event3Data.length && event3Data[0]}/>
      <FeaturesBanner />
      <Newsletter />
    </>
  )
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
   const bannerData = await client.fetch(bannerQuery);

   //events

   const event1Query = '*[_type == "event1"]';
   const event1Data = await client.fetch(event1Query);

   const event2Query = '*[_type == "event2"]';
   const event2Data = await client.fetch(event2Query);

   const event3Query = '*[_type == "event3"]';
   const event3Data = await client.fetch(event3Query);

   
  return {
    props: { products, bannerData , event1Data,event2Data,event3Data}
  }
}

export default Home