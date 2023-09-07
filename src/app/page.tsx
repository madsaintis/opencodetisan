"use client"
import { Button, useColorMode } from "@chakra-ui/react"
import BrandSection from "./components/BrandSection"
import DevelopSection from "./components/DevelopSection"
import HeroSection from "./components/HeroSection"

export default function LandingPage() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
    <HeroSection />
    <BrandSection />
    <DevelopSection />

    <Button onClick={toggleColorMode}>
        Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
      </Button>
    </>
  )
}
