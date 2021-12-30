import {
  Box,
  Button,
  Flex,
  Heading,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { AlarmSystem } from "@prisma/client";
import Link from "next/link";
import { LargeContainer } from "./container";

type UserDataAreaProps = {
  alarmsystems: {
    alarmsystems: AlarmSystem[];
  };
};
export const UserDataArea = ({ alarmsystems }: UserDataAreaProps) => {
  console.log("UserDataArea alarmSystems: ", alarmsystems);
  console.log("UserDataArea alarmSystems: ", !alarmsystems.alarmsystems);

  return (
    <LargeContainer>
      <Flex
        direction="column"
        width="50%"
        margin="2rem"
        justifyContent="center"
        alignItems="center"
      >
        {alarmsystems.alarmsystems.map((alarmsystem) => {
          return (
            <Box key={alarmsystem.id}>
              <Heading>{alarmsystem.name}</Heading>
              <Text>
                Die Alarmanlage ist {alarmsystem.isActive ? "an" : "aus"}
              </Text>
            </Box>
          );
        })}

        {!alarmsystems.alarmsystems.length ? (
          <>
            <Text>Du hast noch kein Alarmsystem</Text>
            <Button width="fit-content" margin="1rem" colorScheme="yellow">
              <Link href="/settings">
                <a>Alarmsystem registrieren</a>
              </Link>
            </Button>
          </>
        ) : (
          <></>
        )}
      </Flex>
    </LargeContainer>
  );
};

// <Table>
//                 <Thead>
//                   <Tr>
//                     <Th> </Th>
//                     <Th>isActive</Th>
//                   </Tr>
//                 </Thead>
//                 <Tbody>
//                   <Tr>
//                     <Th>{alarmsystem.name}</Th>
//                     <Th>{alarmsystem.isActive ? "true" : "false"}</Th>
//                   </Tr>
//                 </Tbody>
//               </Table>
