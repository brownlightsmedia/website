import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowLeft } from 'lucide-react';
import Masonry from './Masonry';

const galleryPhotos = [
  { id: 1, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/A%20LOVE%20WRITTEN%20IN%20SILENCE.zip%20-%207.JPG' },
  { id: 2, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/A%20LOVE%20WRITTEN%20IN%20SILENCE.zip%20-%208.JPG' },
  { id: 3, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/A%20LOVE%20WRITTEN%20IN%20SILENCE.zip%20-%209.JPG' },
  { id: 4, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08020.jpg' },
  { id: 5, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08073.jpg' },
  { id: 6, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08154.jpg' },
  { id: 7, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08279.jpg' },
  { id: 8, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08302.jpg' },
  { id: 9, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08358.jpg' },
  { id: 10, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08391.jpg' },
  { id: 11, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08417.jpg' },
  { id: 12, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08482.jpg' },
  { id: 13, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08512.jpg' },
  { id: 14, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08545.jpg' },
  { id: 15, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08563.jpg' },
  { id: 16, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08577.jpg' },
  { id: 17, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08614.jpg' },
  { id: 18, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08780.jpg' },
  { id: 19, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/BLM08795.jpg' },
  { id: 20, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08454.jpg' },
  { id: 21, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08467.jpg' },
  { id: 22, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08517.jpg' },
  { id: 23, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08581.jpg' },
  { id: 24, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08612.jpg' },
  { id: 25, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08614.jpg' },
  { id: 26, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08635.jpg' },
  { id: 27, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08649.jpg' },
  { id: 28, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08653.jpg' },
  { id: 29, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08681.jpg' },
  { id: 30, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08686.jpg' },
  { id: 31, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08711.jpg' },
  { id: 32, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08721.jpg' },
  { id: 33, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08724.jpg' },
  { id: 34, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08752.jpg' },
  { id: 35, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08829.jpg' },
  { id: 36, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08861.jpg' },
  { id: 37, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08863.jpg' },
  { id: 38, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08930.jpg' },
  { id: 39, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08938.jpg' },
  { id: 40, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08967.jpg' },
  { id: 41, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC08981.jpg' },
  { id: 42, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09021.jpg' },
  { id: 43, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09045.jpg' },
  { id: 44, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09091.jpg' },
  { id: 45, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09111.jpg' },
  { id: 46, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09122.jpg' },
  { id: 47, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09127.jpg' },
  { id: 48, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09138.jpg' },
  { id: 49, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09156.jpg' },
  { id: 50, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09159.jpg' },
  { id: 51, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09164.jpg' },
  { id: 52, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09186.jpg' },
  { id: 53, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09220.jpg' },
  { id: 54, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09273.jpg' },
  { id: 55, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09285.jpg' },
  { id: 56, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09299.jpg' },
  { id: 57, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09367.jpg' },
  { id: 58, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09410-2.jpg' },
  { id: 59, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09673.jpg' },
  { id: 60, title: 'afu & manna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/afu%20%26%20manna/DSC09848.jpg' },
  { id: 61, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695254.jpg' },
  { id: 62, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695255.jpg' },
  { id: 63, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695256.jpg' },
  { id: 64, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695257.jpg' },
  { id: 65, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695262.jpg' },
  { id: 66, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695263.jpg' },
  { id: 67, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695264.jpg' },
  { id: 68, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695265.jpg' },
  { id: 69, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695266.jpg' },
  { id: 70, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695267.jpg' },
  { id: 71, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695268.jpg' },
  { id: 72, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695269.jpg' },
  { id: 73, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/1000695270.jpg' },
  { id: 74, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC04304.JPG' },
  { id: 75, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC04305.JPG' },
  { id: 76, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC04626.JPG' },
  { id: 77, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC04629.jpg' },
  { id: 78, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC04645.JPG' },
  { id: 79, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC04661.JPG' },
  { id: 80, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC04669.JPG' },
  { id: 81, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC04853.JPG' },
  { id: 82, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC04857.JPG' },
  { id: 83, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC04872.JPG' },
  { id: 84, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC05116.JPG' },
  { id: 85, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC05131.JPG' },
  { id: 86, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC05171.JPG' },
  { id: 87, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC05202.JPG' },
  { id: 88, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC05264.JPG' },
  { id: 89, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC05288.JPG' },
  { id: 90, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC05313.JPG' },
  { id: 91, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/DSC05330.JPG' },
  { id: 92, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_2098.JPG' },
  { id: 93, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7742%202.JPG' },
  { id: 94, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7743%202.JPG' },
  { id: 95, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7744%202.JPG' },
  { id: 96, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7745%202.JPG' },
  { id: 97, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7746%202.JPG' },
  { id: 98, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7747%202.JPG' },
  { id: 99, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7748%202.JPG' },
  { id: 100, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7749%202.JPG' },
  { id: 101, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7750%202.JPG' },
  { id: 102, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7751%202.JPG' },
  { id: 103, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7752%202.JPG' },
  { id: 104, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7754%202.JPG' },
  { id: 105, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7755%202.JPG' },
  { id: 106, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7765%202.JPG' },
  { id: 107, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7765.JPG' },
  { id: 108, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7766%202.JPG' },
  { id: 109, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7767%202.JPG' },
  { id: 110, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7768%202.JPG' },
  { id: 111, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7771.JPG' },
  { id: 112, title: 'akshay & nivya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/akshay%20%26%20nivya/IMG_7773.JPG' },
  { id: 113, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/anu_post_1.jpg' },
  { id: 114, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/anu_post_2.jpg' },
  { id: 115, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/anu_post_3.jpg' },
  { id: 116, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/anu_post_4.jpg' },
  { id: 117, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/anu_post_5.jpg' },
  { id: 118, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC00022.jpg' },
  { id: 119, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC00040.jpg' },
  { id: 120, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09736.JPG' },
  { id: 121, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09758.JPG' },
  { id: 122, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09760.JPG' },
  { id: 123, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09786.JPG' },
  { id: 124, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09788.jpg' },
  { id: 125, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09793.JPG' },
  { id: 126, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09808.JPG' },
  { id: 127, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09812.JPG' },
  { id: 128, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09820.JPG' },
  { id: 129, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09825.jpg' },
  { id: 130, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09828.JPG' },
  { id: 131, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09847.JPG' },
  { id: 132, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09881.JPG' },
  { id: 133, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09887.JPG' },
  { id: 134, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09907.jpg' },
  { id: 135, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/DSC09992.jpg' },
  { id: 136, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_3046.JPG' },
  { id: 137, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_3047.JPG' },
  { id: 138, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_3048.JPG' },
  { id: 139, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_3049.JPG' },
  { id: 140, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_3050.JPG' },
  { id: 141, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_3051.JPG' },
  { id: 142, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_3052.JPG' },
  { id: 143, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_3053.JPG' },
  { id: 144, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5055.JPG' },
  { id: 145, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5057.JPG' },
  { id: 146, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5058.JPG' },
  { id: 147, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5059.JPG' },
  { id: 148, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5060.JPG' },
  { id: 149, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5061.JPG' },
  { id: 150, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5062.JPG' },
  { id: 151, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5063.JPG' },
  { id: 152, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5065.JPG' },
  { id: 153, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5068.JPG' },
  { id: 154, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5072.JPG' },
  { id: 155, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5075.JPG' },
  { id: 156, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5076.JPG' },
  { id: 157, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5079.JPG' },
  { id: 158, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5080.JPG' },
  { id: 159, title: 'anu & vishnu', location: 'Kerala', category: 'weddings', src: '/website/assets/images/anu%20%26%20vishnu/IMG_5084.JPG' },
  { id: 160, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/DSC06192%202.JPG' },
  { id: 161, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6932%202.JPG' },
  { id: 162, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6933%202.JPG' },
  { id: 163, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6934%202.JPG' },
  { id: 164, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6935%202.JPG' },
  { id: 165, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6936%202.JPG' },
  { id: 166, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6937%202.JPG' },
  { id: 167, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6938%202.JPG' },
  { id: 168, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6939%202.JPG' },
  { id: 169, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6940%202.JPG' },
  { id: 170, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6941%202.JPG' },
  { id: 171, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6952%202.JPG' },
  { id: 172, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6953%202.JPG' },
  { id: 173, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6954%202.JPG' },
  { id: 174, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6955%202.JPG' },
  { id: 175, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_6956%202.JPG' },
  { id: 176, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_7040.JPG' },
  { id: 177, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_7041.JPG' },
  { id: 178, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_7048.JPG' },
  { id: 179, title: 'arjun & nithya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/arjun%20%26%20nithya/IMG_7051.JPG' },
  { id: 180, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02008.jpg' },
  { id: 181, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02057.jpg' },
  { id: 182, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02196.jpg' },
  { id: 183, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02258.jpg' },
  { id: 184, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02269.jpg' },
  { id: 185, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02271.jpg' },
  { id: 186, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02294.jpg' },
  { id: 187, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02331.jpg' },
  { id: 188, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02353.jpg' },
  { id: 189, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02363.jpg' },
  { id: 190, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02372.jpg' },
  { id: 191, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02382.jpg' },
  { id: 192, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02460.jpg' },
  { id: 193, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02465.jpg' },
  { id: 194, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02479.jpg' },
  { id: 195, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02497.jpg' },
  { id: 196, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02562.jpg' },
  { id: 197, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02584.jpg' },
  { id: 198, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02601.jpg' },
  { id: 199, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02613.jpg' },
  { id: 200, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02639.jpg' },
  { id: 201, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02657.jpg' },
  { id: 202, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02658.jpg' },
  { id: 203, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02670.jpg' },
  { id: 204, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02701.jpg' },
  { id: 205, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02723.jpg' },
  { id: 206, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02742.jpg' },
  { id: 207, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02764.jpg' },
  { id: 208, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02788.jpg' },
  { id: 209, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02795.jpg' },
  { id: 210, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02807.jpg' },
  { id: 211, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC02834.jpg' },
  { id: 212, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09567.jpg' },
  { id: 213, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09579.jpg' },
  { id: 214, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09601.jpg' },
  { id: 215, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09604.jpg' },
  { id: 216, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09614.jpg' },
  { id: 217, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09623.jpg' },
  { id: 218, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09627.jpg' },
  { id: 219, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09635.jpg' },
  { id: 220, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09641.jpg' },
  { id: 221, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09666.jpg' },
  { id: 222, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09669.jpg' },
  { id: 223, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09679.jpg' },
  { id: 224, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09681.jpg' },
  { id: 225, title: 'ashfak & siya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/ashfak%20%26%20siya/DSC09689.jpg' },
  { id: 226, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/1.JPEG' },
  { id: 227, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/10.JPEG' },
  { id: 228, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/16.JPEG' },
  { id: 229, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/17.JPEG' },
  { id: 230, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/18.JPEG' },
  { id: 231, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/19.JPEG' },
  { id: 232, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/21.JPEG' },
  { id: 233, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/22.JPEG' },
  { id: 234, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/25.JPEG' },
  { id: 235, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/3.JPEG' },
  { id: 236, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/5.JPEG' },
  { id: 237, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/6.JPEG' },
  { id: 238, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/9.JPEG' },
  { id: 239, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/DSC03479.JPEG' },
  { id: 240, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/DSC03485.JPEG' },
  { id: 241, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/DSC03508.JPEG' },
  { id: 242, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/DSC03803.JPEG' },
  { id: 243, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/DSC03918.JPEG' },
  { id: 244, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/DSC04040%202.JPEG' },
  { id: 245, title: 'manasa', location: 'Kerala', category: 'weddings', src: '/website/assets/images/manasa/DSC04357%203.JPEG' },
  { id: 246, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC00019.jpg' },
  { id: 247, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC00037.jpg' },
  { id: 248, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC00311.jpg' },
  { id: 249, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC07138.jpg' },
  { id: 250, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC07674.jpg' },
  { id: 251, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC07752.jpg' },
  { id: 252, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC07756.jpg' },
  { id: 253, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC07813.jpg' },
  { id: 254, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC07819.jpg' },
  { id: 255, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC07852.jpg' },
  { id: 256, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC07935.jpg' },
  { id: 257, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08344.jpg' },
  { id: 258, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08476.jpg' },
  { id: 259, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08557.jpg' },
  { id: 260, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08686.jpg' },
  { id: 261, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08694.jpg' },
  { id: 262, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08745.jpg' },
  { id: 263, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08755.jpg' },
  { id: 264, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08760.jpg' },
  { id: 265, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08762.jpg' },
  { id: 266, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08769.jpg' },
  { id: 267, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08776.jpg' },
  { id: 268, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08789.jpg' },
  { id: 269, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08864.jpg' },
  { id: 270, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC08945.jpg' },
  { id: 271, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC09303.jpg' },
  { id: 272, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC09318.jpg' },
  { id: 273, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC09322.jpg' },
  { id: 274, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC09328.jpg' },
  { id: 275, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC09805.jpg' },
  { id: 276, title: 'shahin & fathima', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahin%20%26%20fathima/DSC09962.jpg' },
  { id: 277, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01444.jpg' },
  { id: 278, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01466.jpg' },
  { id: 279, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01471.jpg' },
  { id: 280, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01487.jpg' },
  { id: 281, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01568.jpg' },
  { id: 282, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01653.jpg' },
  { id: 283, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01679.jpg' },
  { id: 284, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01684.jpg' },
  { id: 285, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01691.jpg' },
  { id: 286, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01697.jpg' },
  { id: 287, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01714.jpg' },
  { id: 288, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01717.jpg' },
  { id: 289, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01720.jpg' },
  { id: 290, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01738.jpg' },
  { id: 291, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01752.jpg' },
  { id: 292, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01799.jpg' },
  { id: 293, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01802.jpg' },
  { id: 294, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01863.jpg' },
  { id: 295, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01941.jpg' },
  { id: 296, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC01965.jpg' },
  { id: 297, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02004.jpg' },
  { id: 298, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02014.jpg' },
  { id: 299, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02062.jpg' },
  { id: 300, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02083.jpg' },
  { id: 301, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02160.jpg' },
  { id: 302, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02226.jpg' },
  { id: 303, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02249.jpg' },
  { id: 304, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02299.jpg' },
  { id: 305, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02468.jpg' },
  { id: 306, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02723.jpg' },
  { id: 307, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02859.jpg' },
  { id: 308, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02869.jpg' },
  { id: 309, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02910.jpg' },
  { id: 310, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02938.jpg' },
  { id: 311, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02944.jpg' },
  { id: 312, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02950.jpg' },
  { id: 313, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC02971.jpg' },
  { id: 314, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC03332.jpg' },
  { id: 315, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC03358.jpg' },
  { id: 316, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC03448.jpg' },
  { id: 317, title: 'shahzad & fiza', location: 'Kerala', category: 'weddings', src: '/website/assets/images/shahzad%20%26%20fiza/DSC03463.jpg' },
  { id: 318, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00004.jpg' },
  { id: 319, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00049.jpg' },
  { id: 320, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00060.jpg' },
  { id: 321, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00067.jpg' },
  { id: 322, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00102.jpg' },
  { id: 323, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00111.jpg' },
  { id: 324, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00167.jpg' },
  { id: 325, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00174.jpg' },
  { id: 326, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00180.jpg' },
  { id: 327, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00210.jpg' },
  { id: 328, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00220.jpg' },
  { id: 329, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00222.jpg' },
  { id: 330, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00237.jpg' },
  { id: 331, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC00269.jpg' },
  { id: 332, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09551.jpg' },
  { id: 333, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09570.jpg' },
  { id: 334, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09579.jpg' },
  { id: 335, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09589.jpg' },
  { id: 336, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09595.jpg' },
  { id: 337, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09616.jpg' },
  { id: 338, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09713.jpg' },
  { id: 339, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09815.jpg' },
  { id: 340, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09820.jpg' },
  { id: 341, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09823.jpg' },
  { id: 342, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09824.jpg' },
  { id: 343, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09827.jpg' },
  { id: 344, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09832.jpg' },
  { id: 345, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09854.jpg' },
  { id: 346, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09860.jpg' },
  { id: 347, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09872.jpg' },
  { id: 348, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09904.jpg' },
  { id: 349, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09935.jpg' },
  { id: 350, title: 'siyad & safna', location: 'Kerala', category: 'weddings', src: '/website/assets/images/siyad%20%26%20safna/DSC09999.jpg' },
  { id: 351, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1638.JPG' },
  { id: 352, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1639.JPG' },
  { id: 353, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1640.JPG' },
  { id: 354, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1641.JPG' },
  { id: 355, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1642.JPG' },
  { id: 356, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1643.JPG' },
  { id: 357, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1644.JPG' },
  { id: 358, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1645.JPG' },
  { id: 359, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1646.JPG' },
  { id: 360, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1647.JPG' },
  { id: 361, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1648.JPG' },
  { id: 362, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1649.JPG' },
  { id: 363, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1650.JPG' },
  { id: 364, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1651.JPG' },
  { id: 365, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1652.JPG' },
  { id: 366, title: 'vignesh & malavika', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vignesh%20%26%20malavika/IMG_1653.JPG' },
  { id: 367, title: 'vishnu & divya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vishnu%20%26%20divya/IMG_8632.JPG' },
  { id: 368, title: 'vishnu & divya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vishnu%20%26%20divya/IMG_8633.JPG' },
  { id: 369, title: 'vishnu & divya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vishnu%20%26%20divya/IMG_8634.JPG' },
  { id: 370, title: 'vishnu & divya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vishnu%20%26%20divya/IMG_8635.JPG' },
  { id: 371, title: 'vishnu & divya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vishnu%20%26%20divya/IMG_8636.JPG' },
  { id: 372, title: 'vishnu & divya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vishnu%20%26%20divya/IMG_8637.JPG' },
  { id: 373, title: 'vishnu & divya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vishnu%20%26%20divya/IMG_8638.JPG' },
  { id: 374, title: 'vishnu & divya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vishnu%20%26%20divya/IMG_8639.JPG' },
  { id: 375, title: 'vishnu & divya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vishnu%20%26%20divya/IMG_8640.JPG' },
  { id: 376, title: 'vishnu & divya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vishnu%20%26%20divya/IMG_8641.JPG' },
  { id: 377, title: 'vishnu & divya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vishnu%20%26%20divya/IMG_8642.JPG' },
  { id: 378, title: 'vishnu & divya', location: 'Kerala', category: 'weddings', src: '/website/assets/images/vishnu%20%26%20divya/IMG_8652.JPG' }
];

export default function Gallery({ isActive }) {
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  React.useEffect(() => {
    if (!isActive) {
      setActiveAlbum(null);
    }
  }, [isActive]);

  const albums = useMemo(() => {
    const realMap = {};
    galleryPhotos.forEach(photo => {
      // extract couple name from the path: /website/assets/images/couple name/...
      const parts = photo.src.split('/');
      const encodedCoupleName = parts[4];
      if (encodedCoupleName) {
        const coupleName = decodeURIComponent(encodedCoupleName);
        const formattedName = coupleName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        if (!realMap[formattedName]) {
          realMap[formattedName] = {
            id: `album-${formattedName}`,
            title: formattedName,
            coverSrc: photo.src,
            photoCount: 0
          };
        }
        realMap[formattedName].photoCount++;
      }
    });
    return Object.values(realMap);
  }, []);

  // When an album is active, filter all photos that belong to this couple (by path)
  const currentPhotos = useMemo(() => {
    if (!activeAlbum) return [];
    return galleryPhotos.filter(photo => {
      const parts = photo.src.split('/');
      const encodedCoupleName = parts[4];
      if (!encodedCoupleName) return false;
      const coupleName = decodeURIComponent(encodedCoupleName);
      const formattedName = coupleName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
      return formattedName === activeAlbum;
    });
  }, [activeAlbum]);

  return (
    <section className={`section-padding ${activeAlbum ? 'gallery-album-active' : ''}`} id="gallery" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', position: 'relative' }}>
      <div className="container" style={{ position: 'relative' }}>
        {activeAlbum && (
          <button 
            onClick={() => setActiveAlbum(null)}
            style={{
              position: 'absolute',
              top: '-1rem',
              right: '1rem',
              zIndex: 10,
              background: 'rgba(0,0,0,0.05)',
              border: '1px solid rgba(0,0,0,0.1)',
              color: 'gray',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              backdropFilter: 'blur(4px)',
              transition: 'background 0.3s ease'
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.1)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(0,0,0,0.05)'}
          >
            <span style={{ fontSize: '1.2rem', lineHeight: 1 }}>✕</span>
          </button>
        )}

        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <span className="section-tag">FINE ART PORTFOLIO</span>
          <h2 className="section-title">{activeAlbum ? activeAlbum : 'The Albums'}</h2>
        </div>

        {/* Gallery Grid */}
        <motion.div style={!activeAlbum ? {
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.8rem'
        } : { width: '100%', position: 'relative' }} layout>
          <AnimatePresence mode="popLayout">
            {!activeAlbum ? (
              // RENDER ALBUMS
              (showAllAlbums ? albums : albums.slice(0, 6)).map(album => (
                <motion.div
                  key={album.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  style={{
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    position: 'relative',
                    
                    cursor: 'pointer',
                    boxShadow: '0 10px 25px rgba(18,18,18,0.06)'
                  }}
                  onClick={() => setActiveAlbum(album.title)}
                >
                  <img
                    src={album.coverSrc}
                    alt={album.title}
                    
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(18,18,18,0.85), transparent 60%)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    color: '#fff'
                  }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontWeight: 700, letterSpacing: '0.2em' }}>
                      {album.photoCount} PHOTOS
                    </span>
                    <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 400 }}>
                      {album.title}
                    </h4>
                  </div>
                </motion.div>
              ))
            ) : (() => {
              const quotes = [
                "A love written in silence.",
                "To love and be loved is to feel the sun from both sides.",
                "Every moment matters.",
                "Forever begins today.",
                "Preserving the magic of your love story.",
                "Two souls, one heart."
              ];
              
              const heights = [600, 750, 500, 800, 550, 700];
              const masonryItems = [];
              
              currentPhotos.forEach((photo, index) => {
                masonryItems.push({
                  id: photo.id.toString(),
                  img: photo.src,
                  url: photo.src,
                  height: heights[index % heights.length],
                  photoRef: photo
                });
                
                if ((index + 1) % 15 === 0) {
                  masonryItems.push({
                    id: `quote-${index}`,
                    type: 'quote',
                    text: quotes[((index + 1) / 15 - 1) % quotes.length],
                    height: 350
                  });
                }
              });

              return (
                <div style={{ width: '100%' }}>
                  <div className="gallery-cols" style={{ columnCount: 3, columnGap: '1.5rem', width: '100%' }}>
                  <style>
                    {`
                      @media (max-width: 1024px) { .gallery-cols { column-count: 2 !important; } }
                      @media (max-width: 600px) { .gallery-cols { column-count: 1 !important; } }
                    `}
                  </style>
                  {currentPhotos.map((photo, index) => (
                    <div 
                      key={photo.id}
                      style={{ breakInside: 'avoid', marginBottom: '1.5rem', cursor: 'pointer' }}
                      onClick={() => onOpenLightbox(photo)}
                    >
                      <img 
                        src={photo.src} 
                        alt="Gallery" 
                        loading="lazy"
                        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: 'var(--radius-md)' }} 
                      />
                    </div>
                  ))}
                </div>
                </div>
              );
            })()}
          </AnimatePresence>
        </motion.div>

        {!activeAlbum && albums.length > 6 && !showAllAlbums && (
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <button 
              className="btn btn-outline" 
              onClick={() => setShowAllAlbums(true)}
              style={{ padding: '1rem 3rem', borderColor: 'rgba(255,255,255,0.2)' }}
            >
              VIEW FULL GALLERY
            </button>
          </div>
        )}
      </div>
    </section>
  );
}


