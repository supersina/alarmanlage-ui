import Head from "next/head";

import { Box, Flex, Heading, Text } from "@chakra-ui/react";

import { LargeContainer, SmallContainer } from "../components/container";
import { Hero } from "../components/hero";
import { Footer } from "../components/footer";

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
          <Flex
            direction="column"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Heading as="h1" variant="large">
              Über uns
            </Heading>
            <Text>
              Ein sicheres Zuhause war uns wichtig. Da wir gerne frickeln, haben
              wir uns eine Alarmanlage gebaut. Sie funktioniert so gut, dass wir
              sie auch Dir nicht vorenthalten wollen.
            </Text>
          </Flex>
        </LargeContainer>
      </Hero>
      <Footer></Footer>
    </>
  );
}
