import { Button, Flex, Text } from "@chakra-ui/react";
import { Session } from "@prisma/client";
import Link from "next/link";

interface SessionUser {
  user: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } & {
    id: string;
  };
}
export const WelcomeHomeArea = ({ user }: SessionUser) => {
  return (
    <Flex direction="column" alignItems="center">
      <Text>{user?.name}</Text>
      <Button width="fit-content" margin="1rem" colorScheme="yellow">
        <Link href="/settings">
          <a>Einstellungen</a>
        </Link>
      </Button>
    </Flex>
  );
};
