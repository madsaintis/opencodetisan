"use client";

import { Container, Flex, Heading, Icon, Image, SimpleGrid, Stack, Text, VStack, useColorModeValue } from "@chakra-ui/react";
import { ReactElement } from "react";
import { IoBuildOutline, IoGitBranchOutline, IoTerminalOutline } from "react-icons/io5";
import { PiNumberOneBold } from "react-icons/pi";

interface FeatureProps {
  icon?: ReactElement;
  heading: string;
  text: string;
}

const Feature = ({ icon, heading, text }: FeatureProps) => {
  return (
    <VStack align={{ base: "center", lg: "start" }}>
      <Flex w={12} h={12} align={"center"} justify={"center"} rounded={"lg"} bg={useColorModeValue("#fafafa", "#333333")} border={useColorModeValue("solid #eaeaea","")}>
        {icon}
      </Flex>
      <Heading size="xl" textAlign={{ base: "center", lg: "start" }}>
        {heading}
      </Heading>
      <Text color={useColorModeValue("#666666","#a1a1a1")} fontSize={"lg"} textAlign={{ base: "center", lg: "start" }}>
        {text}
      </Text>
    </VStack>
  );
};

export default function DevelopSection() {
  return (
    <Container maxW={"8xl"} py={12}>
      <Stack spacing={4} as={Container} maxW={"5xl"} textAlign={"center"} align={"center"} marginBottom={100}>
        <Flex w={12} h={12} align={"center"} justify={"center"} rounded={"full"} bgGradient="linear(to-l, #0061ff, #60efff)" >
          <Icon as={PiNumberOneBold} color={"#000000"} w={5} h={5} />
        </Flex>

        <Heading bgGradient="linear(to-l, #0061ff, #60efff)" bgClip="text" size="2xl">
          Develop
        </Heading>

        <Heading size="3xl">Build when inspiration strikes</Heading>

        <Text color={useColorModeValue("#666666","#a1a1a1")} fontSize={"xl"}>
          Free developers from time-consuming, unnecessary processes that slow your work, so you and your team can focus on creating.
        </Text>
      </Stack>

      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={100}>
        <Flex>
          <Image rounded={"md"} alt={"feature image"} src={"https://images.unsplash.com/photo-1554200876-56c2f25224fa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"} objectFit={"cover"} />
        </Flex>
        <Stack spacing={10} marginBottom={{ base: "50px" }} align={"left"}>
          <Feature icon={<Icon as={IoBuildOutline} color={"#888888"} w={9} h={9} />} heading={"The complete toolkit for the Web"} text={"Everything you need to build your site exactly how you imagine, from automatic API handling to built-in image and performance optimizations."} />
          <Feature icon={<Icon as={IoGitBranchOutline} color={"#888888"} w={9} h={9} />} heading={"Easy integration with your backend"} text={"Connect your pages to any data source, headless CMS, or API and make it work in everyone’s dev environment."} />
          <Feature icon={<Icon as={IoTerminalOutline} color={"#888888"} w={9} h={9} />} heading={"End-to-end testing on Localhost"} text={"From caching to Serverless Functions, all our cloud primitives work perfectly on localhost."} />
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
