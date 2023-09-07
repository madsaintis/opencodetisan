import { ChevronUpIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Flex, Container, Heading, Stack, Text, Button, useColorModeValue, useColorMode } from "@chakra-ui/react";
import React from "react";

export default function HeroSection() {
  const gradientAnimation = `
    @keyframes gradient {
      0% {
        -webkit-background-clip: text;
      }
      50% {
        background-position: 100% 50%;
        -webkit-background-clip: text;
      }
      100% {
        background-position: 0 50%;
        -webkit-background-clip: text;
      }
    }
  `;

  const textStyles = {
    background: "linear-gradient(to right, #ffdde1, #2193b0, #6dd5ed)",
    backgroundSize: "300%",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    animation: "gradient 10s ease-in-out infinite",
  };

  return (
    <Container maxW={"10xl"}>
      <Stack textAlign={"center"} align={"center"} spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={900}
          fontSize={{ base: "9rem", lg: "10xl" }}
        >
          Develop.
          <Text as={"span"} style={textStyles}>
            Preview.
          </Text>
          <Text as={"span"} color={"orange.400"}>
            Ship.
          </Text>
        </Heading>
       

        <Text color={"#a1a1a1"} maxW={"6xl"} fontSize={{ base: "4xl" }}>
          Vercel's frontend cloud gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized Web.
        </Text>
        <Stack spacing={6} direction={{ base: "column", sm: "row" }} direction-xs={"column"}>
          <Button leftIcon={<TriangleUpIcon />} rounded={"lg"} px={6} colorScheme={useColorModeValue('white','black')} bg={useColorModeValue('black','white')} _hover={{ bg: "#a1a1a1" }}>
            Start Deploying
          </Button>
          <Button rounded={"lg"} px={6}>
            Get a demo
          </Button>
        </Stack>
      </Stack>
      <style>{gradientAnimation}</style>
    </Container>
  );
}
