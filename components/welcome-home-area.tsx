import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { LargeContainer } from "./container";

export const WelcomeHomeArea = ({ user }) => {
  const { image, name, email } = user;
  console.log(user);
  return (
    <Flex direction="column" alignItems="center">
      <Text>{name}</Text>
      <Button width="fit-content" margin="1rem" colorScheme="yellow">
        <Link href="/settings">
          <a>Einstellungen</a>
        </Link>
      </Button>
    </Flex>
  );
};
