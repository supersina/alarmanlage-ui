import { FC } from "react";
import Image from "next/image";
import { Box } from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";

interface Props {
  // any props that come into the component
  src: string;
}

export const Hero: FC<Props> = ({ src, children }) => {
  return (
    <Box>
      <Box position="relative" width="100vw" height={{ base: "80vh" }}>
        <Image
          src={src}
          alt="hero-image"
          layout="fill"
          objectFit="cover"
          priority
        ></Image>
        <Flex
          direction="column"
          width="100%"
          position="absolute"
          justifyContent="space-between"
          float="right"
        >
          <Box>{children}</Box>
        </Flex>
      </Box>
    </Box>
  );
};
