import { Box, Button, Flex } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { colors } from "../theme/colors";

export const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <HamburgerIcon
        w={6}
        h={6}
        display={{ base: isOpen ? "none" : "block", sm: "none" }}
        style={{ position: "absolute", right: "1rem", top: "0.5rem" }}
        onClick={() => setIsOpen(!isOpen)}
      ></HamburgerIcon>
      <Box display={{ base: isOpen ? "block" : "none", sm: "block" }}>
        <Flex
          as="nav"
          justify="space-between"
          wrap="wrap"
          width="100%"
          borderBottom="1px solid #eaeaea"
          p={{ base: 2, sm: 2 }}
          pr={{ base: 2, sm: 8 }}
          backgroundColor="black"
        >
          <Box width="40px" height="40px">
            <Link href="/">
              <a>
                <Image
                  src="/favicon.ico"
                  width={50}
                  height={50}
                  alt="Logo"
                ></Image>
              </a>
            </Link>
          </Box>

          {session ? (
            <Flex
              width={{
                base: "100%",
                xs: "100%",
                sm: "80%",
                md: "50%",
                lg: "40%",
              }}
              height={{ base: "12rem", sm: "auto" }}
              direction={{ base: "column", sm: "row" }}
              alignItems={{ base: "center", sm: "flex-end" }}
              alignSelf="flex-end"
              style={{ order: 2 }}
              justifyContent="space-between"
              marginTop={isOpen ? "1rem" : "none"}
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

              <Box
                width="fit-content"
                color={colors.headingColor}
                onClick={() => signOut()}
              >
                Sign out
              </Box>
            </Flex>
          ) : (
            <Box
              width="fit-content"
              color={colors.headingColor}
              onClick={() => signIn()}
            >
              Sign In
            </Box>
          )}
          <Flex
            width="40px"
            height="40px"
            justifyContent="center"
            alignItems="center"
          >
            <CloseIcon
              width={4}
              height={4}
              display={{ base: isOpen ? "block" : "none", sm: "none" }}
              onClick={() => setIsOpen(!isOpen)}
            ></CloseIcon>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
