import { Box, Flex } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { colors } from "../theme/colors";
import { AiFillHome } from "react-icons/ai";
import { useRouter } from "next/router";

const navlinks = [
  { label: "Start", href: "/" },
  { label: "Alarme", href: "/alarms" },
  { label: "Alarmsysteme", href: "/alarmsystems" },
  { label: "Einstellungen", href: "/settings" },
];

export const Navbar = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    setIsOpen(false);
  }, [router.pathname]);

  return (
    <Flex direction="column">
      <Flex
        as="nav"
        justify="space-between"
        alignItems="center"
        wrap="wrap"
        width="100%"
        borderBottom="1px solid #eaeaea"
        p={{ base: 2, sm: 2 }}
        pr={{ base: 2, sm: 8 }}
        backgroundColor="black"
      >
        <Box borderRadius="1rem">
          <Link href="/">
            <a>
              <AiFillHome size={30} />
            </a>
          </Link>
        </Box>
        <Box>
          <Flex direction="row" display={{ base: "none", sm: "block" }}>
            {session ? (
              <Flex direction="row">
                {navlinks.map((navlink) => {
                  return (
                    <Box key={navlink.href} marginRight="1rem">
                      <Link href={navlink.href}>{navlink.label}</Link>
                    </Box>
                  );
                })}
                <Box
                  width="fit-content"
                  color={colors.headingColor}
                  onClick={() => signOut()}
                >
                  Abmelden
                </Box>
              </Flex>
            ) : (
              <Box
                width="fit-content"
                color={colors.headingColor}
                onClick={() => signIn()}
              >
                Anmelden / Registrieren
              </Box>
            )}
          </Flex>

          <HamburgerIcon
            w={6}
            h={6}
            display={{ base: isOpen ? "none" : "block", sm: "none" }}
            onClick={() => setIsOpen(!isOpen)}
          ></HamburgerIcon>
          <CloseIcon
            width={4}
            height={4}
            display={{ base: isOpen ? "block" : "none", sm: "none" }}
            onClick={() => setIsOpen(!isOpen)}
          ></CloseIcon>
        </Box>
      </Flex>
      <Flex
        backgroundColor="black"
        display={{ base: isOpen ? "block" : "none", sm: "none" }}
      >
        {session ? (
          <Flex direction="column" alignItems="center">
            {navlinks.map((navlink) => {
              return (
                <Box key={navlink.href} width="fit-content" margin="0.75rem">
                  <Link href={navlink.href}>{navlink.label}</Link>
                </Box>
              );
            })}
            <Box
              width="fit-content"
              color={colors.headingColor}
              onClick={() => signOut()}
              margin="0.75rem"
            >
              Abmelden
            </Box>
          </Flex>
        ) : (
          <Flex
            color={colors.headingColor}
            onClick={() => signIn()}
            margin="1rem"
            justifyContent="center"
          >
            <Box>Sign In</Box>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
