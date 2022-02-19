import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Head from "next/head";
import { Flex, Heading, Text } from "@chakra-ui/react";
import { LargeContainer } from "../components/container";
import { Hero } from "../components/hero";
import { Footer } from "../components/footer";

export default function Home() {
  const { data: session, status } = useSession();
  const loading = status === "loading";

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>Alarmanlage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero src={"/index1600x500.jpg"}>
        <LargeContainer>
          <Flex
            direction="column"
            width="100%"
            justifyContent="center"
            alignItems="center"
          >
            <Heading as="h1" variant="large">
              Ein sicheres Zuhause
            </Heading>
            <Text>
              Hier kannst Du für Dich und Dein Zuhause sorgen. Wir bieten Dir
              eine Alarmanlage, die einfach zu installieren ist und Dich
              bestmöglich vor Einbrechern schützt.
            </Text>
          </Flex>
        </LargeContainer>
      </Hero>
      <Footer />
    </>
  );
}
