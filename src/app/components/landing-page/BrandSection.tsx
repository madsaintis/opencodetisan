"use client";

import { Heading, Stack, Image, WrapItem, Wrap, useColorModeValue, Center, Box } from "@chakra-ui/react";
import React from "react";
import dynamic from "next/dynamic";

const brands = ["./adobe.png", "./ebay.png", "./hashicorp.png", "./loom.png", "./netflix.png", "./patreon.png"];

const ScrollCarousel = dynamic(() => import("./ScrollCarouselComponent"), { ssr: false });
export default function BrandSection() {
  const imageStyles = {
    filter: useColorModeValue("invert(0%)", "invert(100%)"),
  };

  return (
    <Stack spacing={10} textColor={useColorModeValue("#666666","#a1a1a1") } marginTop={{ base: "50px" }} marginBottom={{ base: "50px" }} align={"center"}>
      <Heading size="sm">TRUSTED BY THE BEST FRONTEND TEAMS</Heading>
      <Stack direction="row" maxW={"8xl"} display={{ base: "none", md: "flex" }}>
        <Wrap justify={"center"} direction={"row"} spacing={"20px"}>
          {brands.map((src, index) => (
            <WrapItem key={index}>
              <Image boxSize="150px" objectFit="cover" src={`${src}`} alt="Dan Abramov" style={imageStyles} />
            </WrapItem>
          ))}
        </Wrap>
      </Stack>
      <Center padding={"10"} display={{ base: "flex", md: "none" }}>
        <ScrollCarousel />
      </Center>

      <Heading size="sm">EXPLORE THE VERCEL WAY</Heading>
    </Stack>
  );
}
