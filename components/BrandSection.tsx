import { Heading, Stack } from '@chakra-ui/react'
import React from 'react'

export default function BrandSection() {
  return (
    <Stack spacing={10} textColor={"#a1a1a1"} marginTop={{ base: "50px" }} marginBottom={{ base: "50px" }} align={"center"}>
          <Heading size="sm">TRUSTED BY THE BEST FRONTEND TEAMS</Heading>
          <Heading size="sm">EXPLORE THE VERCEL WAY</Heading>
        </Stack>
  )
}
