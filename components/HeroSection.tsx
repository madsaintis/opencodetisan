"use client";

import { ChevronUpIcon, TriangleUpIcon } from "@chakra-ui/icons";
import { Flex, Container, Heading, Stack, Text, Button, Icon, IconProps } from "@chakra-ui/react";

export default function HeroSection() {
  return (
    <Container maxW={"8xl"}>
      <Stack textAlign={"center"} align={"center"} spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }}>
        <Heading
          fontWeight={900}
          fontSize={{ base: "6xl", lg: "7xl" }}
          lineHeight={"110%"}
          whiteSpace={{ base: "normal", lg: "nowrap" }}
        >
          Develop.{" "}
          <Text as={"span"} color={"purple.400"}>
            Preview.{" "}
          </Text>
          <Text as={"span"} color={"orange.400"}>
            Ship.
          </Text>
        </Heading>

        <Text color={"#a1a1a1"} maxW={"3xl"} fontSize={{ base: "2xl" }}>
          Vercel's frontend cloud gives developers the frameworks, workflows, and infrastructure to build a faster, more personalized Web.
        </Text>
        <Stack spacing={6} direction={{ base: "column", sm: "row" }} direction-xs={"column"}>
          <Button leftIcon={<TriangleUpIcon />} rounded={"lg"} px={6} colorScheme={"gray"} bg={"white"} _hover={{ bg: "#a1a1a1" }}>
            Start Deploying
          </Button>
          <Button rounded={"lg"} px={6}>
            Get a demo
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
