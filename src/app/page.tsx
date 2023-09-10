"use client";
import BrandSection from "./components/landing-page/BrandSection";
import DevelopSection from "./components/landing-page/DevelopSection";
import HeroSection from "./components/landing-page/HeroSection";
import Navbar from "./components/landing-page/Navbar";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BrandSection />
      <DevelopSection />
    </>
  );
}
