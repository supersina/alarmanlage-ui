import Head from "next/head";
import Image from "next/image";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { LargeContainer, SmallContainer } from "../components/container";
import { Hero } from "../components/hero";

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero src={"/about1600x500.jpg"}>
        <LargeContainer>
          <Heading as="h1" variant="large">
            Das sind wir!
          </Heading>
          <Text>
            Ein sicheres Zuhause war uns wichtig. Da wir gerne frickeln, haben
            wir uns eine Alarmanlage gebaut. Sie funktioniert so gut, dass wir
            sie auch Dir nicht vorenthalten wollen.
          </Text>
        </LargeContainer>
      </Hero>
      {/* <SmallContainer>
        <Flex height={400} margin="auto" justifyContent="space-around">
          <Box width="40%">
            <Image
              src={"/dummy500x500.jpg"}
              alt="me-image"
              width={500}
              height={500}
              objectFit="fill"
            ></Image>
          </Box>
          <Box width="40%">
            <Image
              src={"/dummy500x500.jpg"}
              alt="me-image"
              width={500}
              height={500}
              objectFit="fill"
            ></Image>
          </Box>
        </Flex>
      </SmallContainer> */}
    </>
  );
}
