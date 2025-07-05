
import React from 'react';
import { useSelector } from 'react-redux';

const HeroSection = () => {
  const user = useSelector((store)=> store.user);
  return (
     !user && (
      <section className="relative z-10 flex flex-col items-center text-center space-y-6 pt-32 pb-24">
      <h1 className="text-5xl md:text-7xl font-bold leading-tight">
        Start something epic.
      </h1>

      <div className="flex flex-col md:flex-row gap-4">
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200">
          <img src="https://cdn-icons-png.flaticon.com/128/16566/16566128.png" alt="App Store" className="w-6 h-6" />
          App Store
        </button>
        <button className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-200">
          <img src="https://cdn-icons-png.flaticon.com/128/16076/16076057.png" alt="Google Play" className="w-6 h-6" />
          Google Play
        </button>
      </div>
    </section>
    )
  )
       
    };
   
  


export default HeroSection;
