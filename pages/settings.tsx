import Head from "next/head";
import { useSession } from "next-auth/react";
import { Flex, Heading, Text } from "@chakra-ui/layout";
import { LargeContainer } from "../components/container";
import { Hero } from "../components/hero";
import { EditUsrDataForm } from "../components/edit-usr-data-form";
import useSWR from "swr";
import { AlarmSystem } from "@prisma/client";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type UserDataAreaProps = {
  alarmsystems: AlarmSystem[];
};

export default function Settings() {
  const { data: session } = useSession();

  const {
    data: userdata,
    error: userError,
    isValidating: isValidatingUser,
  } = useSWR<UserDataAreaProps, Error>("/api/user", fetcher);

  // if (userError) return <div>failed to load</div>;
  if (isValidatingUser) return <div>loading...</div>;

  return (
    <>
      <Head>
        <title>Settings</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Hero src={"/about1600x500.jpg"}>
        {session ? (
          <>
            <LargeContainer>
              <Flex
                direction="column"
                width="100%"
                justifyContent="center"
                alignItems="center"
              >
                <Heading as="h1" variant="large">
                  Einstellungen
                </Heading>
                <Text>Nimm Änderungen an deinen persönlichen Daten vor.</Text>
              </Flex>
            </LargeContainer>
          </>
        ) : (
          <LargeContainer>
            <Text>Bitte Logge dich ein, um Deine private Seite zu sehen!</Text>
          </LargeContainer>
        )}
      </Hero>

      {session ? (
        <>
          <LargeContainer>
            <Flex
              direction="column"
              width="100%"
              justifyContent="center"
              alignItems="center"
            >
              <Flex
                width={{ base: "90%", sm: "90%", md: "50%", lg: "50%" }}
                direction="column"
                margin="2rem"
                justifyContent="center"
                alignItems="center"
              >
                <Heading as="h2" variant="medium">
                  Deine persönlichen Daten
                </Heading>
                <EditUsrDataForm initialUser={userdata}></EditUsrDataForm>
              </Flex>
            </Flex>
          </LargeContainer>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
