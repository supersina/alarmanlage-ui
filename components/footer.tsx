import { Flex, Text, Link } from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";

import { colors } from "../theme/colors.js";

export const Footer = () => {
  return (
    <Flex
      as="footer"
      justify="center"
      wrap="wrap"
      width="100%"
      marginTop="4rem"
      borderTop="1px solid #eaeaea"
      style={{ bottom: 0 }}
      p={{ base: 2, sm: 2 }}
      pr={{ base: 2, sm: 8 }}
    >
      <Flex
        width={{ base: "80%", sm: "60%", md: "40%", lg: "40%" }}
        direction="column"
        alignItems="center"
        justifyContent="space-between"
      >
        <Text>Made by Sina</Text>
        <Link href="/about">
          <a>Über uns</a>
        </Link>
      </Flex>
    </Flex>
  );
};
