import { LargeContainer } from "./container";
import { Alarm } from "@prisma/client";
import { Flex, Text } from "@chakra-ui/react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";

export const AlarmTable = ({ alarms }) => {
  return (
    <>
      <LargeContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>ID</Th>
              <Th>Sensor</Th>
              <Th>Time</Th>
              <Th>UserID</Th>
            </Tr>
          </Thead>
          <Tbody>
            {alarms.map((alarm: Alarm) => {
              return (
                <Tr key={alarm.id}>
                  <Th>{alarm.id}</Th>
                  <Th>{alarm.sensor}</Th>
                  <Th>
                    {new Intl.DateTimeFormat("de", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(alarm.createdAt)}
                  </Th>
                  <Th>{alarm.userId}</Th>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </LargeContainer>
    </>
  );
};
