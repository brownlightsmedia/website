import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, Play } from 'lucide-react';
import { Autoplay, EffectCreative, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-creative';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const videoItems = [
  { text: '1 MINUTE POST', videoUrl: '/assets/video/1 MINUTE POST.mp4', imageUrl: '/assets/images/afu & manna/BLM08020.jpg' },
  { text: 'IMG 1168', videoUrl: '/assets/video/IMG_1168.MP4', imageUrl: '/assets/images/anu & vishnu/anu_post_1.jpg' },
  { text: 'Timeline 1', videoUrl: '/assets/video/Timeline 1.mp4', imageUrl: '/assets/images/arjun & nithya/IMG_6932 2.JPG' },
  { text: 'Anu Vishnu', videoUrl: '/assets/video/anu vishnu.mp4', imageUrl: '/assets/images/anu & vishnu/DSC00022.jpg' },
  { text: 'Arjun Reel', videoUrl: '/assets/video/arjun reel .MP4', imageUrl: '/assets/images/arjun & nithya/IMG_6941 2.JPG' },
  { text: 'Ashiq Tie Lie', videoUrl: '/assets/video/ashiq tie lie.MP4', imageUrl: '/assets/images/ashfak & siya/DSC02008.jpg' },
  { text: 'Hana Day', videoUrl: '/assets/video/hana day.MP4', imageUrl: '/assets/images/manasa/1.JPEG' },
  { text: 'Highlight 1', videoUrl: '/assets/video/highlight (1).MP4', imageUrl: '/assets/images/shahin & fathima/DSC00019.jpg' },
  { text: 'Highlight 2', videoUrl: '/assets/video/highlight video 2.MP4', imageUrl: '/assets/images/shahzad & fiza/DSC01444.jpg' },
  { text: 'Highlight 3', videoUrl: '/assets/video/highlight.MP4', imageUrl: '/assets/images/siyad & safna/DSC00004.jpg' },
  { text: 'Javedh Post Reel', videoUrl: '/assets/video/javedh post reel 2.mp4', imageUrl: '/assets/images/afu & manna/DSC08454.jpg' },
];

export default function Highlights({ onOpenVideo }) {
  return (
    <section className="section-padding" id="highlights" style={{ backgroundColor: '#f5f4f3', color: '#000', position: 'relative' }}>
      <div className="container" style={{ padding: 0 }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-tag" style={{ color: '#C69B66' }}>CINEMATOGRAPHY</span>
          <h2 className="section-title" style={{ color: '#000' }}>Cinema Highlights</h2>
          <p style={{ color: 'rgba(0,0,0,0.6)', marginTop: '0.4rem', fontSize: '0.9rem' }}>
            Click on any film to play.
          </p>
        </div>
        
        <div className="flex h-full w-full items-center justify-center overflow-hidden" style={{ background: '#f5f4f3' }}>
          <Carousel_005 
            items={videoItems} 
            autoplay={true} 
            showPagination={true} 
            showNavigation={true}
            loop={true} 
            onOpenVideo={onOpenVideo}
          />
        </div>
      </div>
    </section>
  );
}

const Carousel_005 = ({
  items,
  className = '',
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
  onOpenVideo
}) => {
  const css = `
  .Carousal_005 {
    width: 100%;
    height: 500px;
    padding-bottom: 60px !important;
  }
  
  .Carousal_005 .swiper-slide {
    background-position: center;
    background-size: cover;
    border-radius: 25px;
    width: 80% !important;
    max-width: 800px;
    transition: transform 0.4s ease, opacity 0.4s ease;
  }

  .Carousal_005 .swiper-slide-active {
    opacity: 1;
  }
  
  .Carousal_005 .swiper-slide:not(.swiper-slide-active) {
    opacity: 0.5;
  }

  .Carousal_005 .swiper-pagination-bullet {
    background-color: #fff !important;
    opacity: 0.5;
  }
  
  .Carousal_005 .swiper-pagination-bullet-active {
    background-color: #C69B66 !important;
    opacity: 1;
  }

  .swiper-button-next, .swiper-button-prev {
    color: #fff !important;
    background: rgba(0,0,0,0.5);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    backdrop-filter: blur(4px);
  }
  
  .swiper-button-next::after, .swiper-button-prev::after {
    display: none;
  }

  .video-thumbnail-container:hover .play-overlay {
    opacity: 1 !important;
    transform: translate(-50%, -50%) scale(1.1) !important;
  }
  `;

  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className={`relative w-full px-5 ${className}`}
      style={{ maxWidth: '1200px', margin: '0 auto' }}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 10000,
                  disableOnInteraction: false,
                }
              : false
          }
          effect="creative"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={{ prevEl, nextEl }}
          className="Carousal_005"
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-120%", 0, -500],
              opacity: 0,
            },
            next: {
              shadow: true,
              translate: ["120%", 0, -500],
              opacity: 0,
            },
          }}
          modules={[EffectCreative, Pagination, Navigation, Autoplay]}
        >
          {items.map((item, index) => (
            <SwiperSlide key={index}>
              <div 
                className="video-thumbnail-container"
                onClick={() => onOpenVideo({ url: item.videoUrl, title: item.text })}
                style={{ width: '100%', height: '100%', position: 'relative', cursor: 'pointer', borderRadius: '25px', overflow: 'hidden' }}
              >
                <img
                  className="h-full w-full object-cover"
                  src={item.imageUrl}
                  alt={item.text}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0) 100%)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  padding: '2rem',
                }}>
                  <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 500, textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>
                    {item.text}
                  </h3>
                </div>
                <div className="play-overlay" style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80px',
                  height: '80px',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.8,
                  transition: 'opacity 0.3s ease, transform 0.3s ease'
                }}>
                  <Play size={36} fill="white" color="white" style={{ marginLeft: '4px' }} />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {showNavigation && (
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 20 }}>
            <div 
              ref={setPrevEl}
              className="swiper-button-prev after:hidden" 
              style={{ pointerEvents: 'auto', cursor: 'pointer', zIndex: 20 }}
            >
              <ChevronLeftIcon size={28} color="#fff" />
            </div>
            <div 
              ref={setNextEl}
              className="swiper-button-next after:hidden" 
              style={{ pointerEvents: 'auto', cursor: 'pointer', zIndex: 20 }}
            >
              <ChevronRightIcon size={28} color="#fff" />
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
