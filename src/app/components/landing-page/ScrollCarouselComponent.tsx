"use client";

import React from "react";
import ScrollCarousel from "scroll-carousel-react";
import { Image, Box, useColorModeValue, Center } from "@chakra-ui/react";

const brands = ["./adobe.png", "./ebay.png", "./hashicorp.png", "./loom.png", "./netflix.png", "./patreon.png"];

const ScrollCarouselComponent = () => {
  const imageStyles = {
    filter: useColorModeValue("invert(0%)", "invert(100%)"),
  };
  return (
    <Center>
      <Box maxW={"sm"} mx={"10px"}>
        <ScrollCarousel autoplay autoplaySpeed={2} speed={3} onReady={() => console.log("I am ready")}>
          {brands.map((src, index) => (
            <Box justifyContent={"center"} mx={"2"}>
              <Image boxSize="150px" objectFit="cover" src={`${src}`} style={imageStyles} />
            </Box>
          ))}
        </ScrollCarousel>
      </Box>
    </Center>
  );
};

export default ScrollCarouselComponent;
