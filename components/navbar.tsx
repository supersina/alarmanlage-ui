import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export const Navbar = () => {
  const { data: session } = useSession();

  return (
    <>
      <Flex
        as="nav"
        justify="space-between"
        wrap="wrap"
        width="100%"
        borderBottom="1px solid #eaeaea"
        p={{ base: 2, sm: 2 }}
        pr={{ base: 2, sm: 8 }}
      >
        <Box width="40px" height="40px">
          <Link href="/">
            <a>
              <Image src="/favicon.ico" width={50} height={50} alt=""></Image>
            </a>
          </Link>
        </Box>

        {session ? (
          <Flex
            width={{ base: "80%", xs: "90%", sm: "80%", md: "50%", lg: "40%" }}
            direction="row"
            alignItems="flex-end"
            justifyContent="space-between"
          >
            <Link href="/">
              <a>Start</a>
            </Link>
            <Link href="/alarms">
              <a>Alarme</a>
            </Link>
            <Link href="/alarmsystems">
              <a>Alarmsysteme</a>
            </Link>
            <Link href="/settings">
              <a>Einstellungen</a>
            </Link>

            <Button
              width="fit-content"
              colorScheme="yellow"
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </Flex>
        ) : (
          <Button
            width="fit-content"
            colorScheme="yellow"
            onClick={() => signIn()}
          >
            Sign In
          </Button>
        )}
      </Flex>
    </>
  );
};
