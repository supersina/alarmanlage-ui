import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/client";
import { Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

export default function Home() {
  const [session, loading] = useSession();

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
      {session ? (
        <>
          <Text>
            Du bist eingeloggt als
            {session.user.name ? session.user.name : session.user.email}
          </Text>
          <Button onClick={() => signOut()}>Sign out</Button>
        </>
      ) : (
        <>
          (
          <Button marginRight="1rem" onClick={() => signIn()}>
            Sign in
          </Button>
          <Button>Register</Button> )
        </>
      )}
    </>
  );
}
