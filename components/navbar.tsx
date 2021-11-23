import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/client";
import { colors } from "../theme/colors";

export const Navbar = () => {
  const [session] = useSession();

  return (
    <>
      <Flex
        as="nav"
        justify="space-between"
        wrap="wrap"
        width="100%"
        marginBottom="4rem"
        borderBottom="1px solid #eaeaea"
        p={{ base: 2, sm: 2 }}
        pr={{ base: 2, sm: 8 }}
      >
        <Box width="40px" height="40px">
          <Link href="/">
            <a>
              <Image src="/favicon.ico" width={50} height={50}></Image>
            </a>
          </Link>
        </Box>
        <Flex
          width={{ base: "80%", sm: "60%", md: "30%", lg: "30%" }}
          direction="row"
          alignItems="flex-end"
          //marginTop="2rem"
          justifyContent="space-between"
        >
          <Link href="/">
            <a>Start</a>
          </Link>
          {session ? (
            <Link href="/zuhause">
              <a>Zuhause</a>
            </Link>
          ) : (
            <></>
          )}
          <Link href="/about">
            <a>Über uns</a>
          </Link>
          <Link href="/">
            <a>Kontakt</a>
          </Link>
        </Flex>
      </Flex>
    </>
  );
};
