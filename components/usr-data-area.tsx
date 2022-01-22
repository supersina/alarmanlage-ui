import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
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
              <Table>
                <Thead>
                  <Tr>
                    <Th> Sensor</Th>
                    <Th>Code for Open</Th>
                    <Th>Code for Closed</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {alarmsystem.sensors.map((sensor) => {
                    return (
                      <Tr key={sensor.id}>
                        <Th>
                          {" "}
                          <Input
                            name="name"
                            value={sensor.name ? sensor.name : ""}
                          />
                        </Th>
                        <Th>{sensor.sensorCodeOpen}</Th>
                        <Th>{sensor.sensorCodeClosed}</Th>
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>
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
