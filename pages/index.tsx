import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";

import Head from "next/head";
import { Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { LargeContainer } from "../components/container";
import { Hero } from "../components/hero";

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
          <Heading as="h1" variant="large">
            Wir sichern Dein Zuhause!
          </Heading>
          <Text>
            Hier kannst Du für Dich und Dein Zuhause sorgen. Wir bieten Dir eine
            Alarmanlage, die einfach zu installieren ist und Dich bestmöglich
            vor Einbrechern schützt.
          </Text>
        </LargeContainer>
        {session ? (
          <>
            <LargeContainer>
              <Text>
                Du bist eingeloggt als{" "}
                {session.user.name ? session.user.name : session.user.email}
              </Text>
              <Button
                marginTop="2rem"
                colorScheme="yellow"
                onClick={() => signOut()}
              >
                Sign out
              </Button>{" "}
            </LargeContainer>
          </>
        ) : (
          <>
            <LargeContainer>
              <Button
                marginTop="2rem"
                marginRight="2rem"
                colorScheme="yellow"
                onClick={() => signIn()}
              >
                Sign In
              </Button>
            </LargeContainer>
          </>
        )}
      </Hero>
    </>
  );
}
