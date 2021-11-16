import { FC } from "react";
import { Box } from "@chakra-ui/react";
import { Container } from "@chakra-ui/layout";
import React from "react";

interface Props {
  // any props that come into the component
}

export const SmallContainer: FC<Props> = ({ children }) => {
  return (
    <Container
      maxW="container.xl"
      width={["85%", "85%", "65%", "50%", "50%"]}
      marginTop="1.5rem"
    >
      {children}
    </Container>
  );
};

export const LargeContainer: FC<Props> = ({ children, ...props }) => {
  return (
    <>
      <Container
        maxW="container.xl"
        width={["95%", "95%", "75%", "70%", "70%"]}
        margin="auto"
        marginTop="1.5rem"
        {...props}
      >
        {children}
      </Container>
    </>
  );
};
