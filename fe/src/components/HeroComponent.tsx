// React
import React from "react";

// Hero Component
const HeroComponent = () => {
  return (
    <section
      className="relative h-96 bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/here-section-11.jpg')" }}
    >
      <div className="text-center text-white z-10">
        <h1 className="text-4xl font-bold">Find Your Dream Home</h1>
        <p className="mt-4 text-lg">Browse the best properties in your area</p>
      </div>
    </section>
  );
};

export default HeroComponent;
