import { LargeContainer } from "./container";
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

export const DataTable = (colnames, data) => {
  return (
    <>
      <LargeContainer>
        <Table>
          <Thead>
            <Tr>
              {colnames.map((colname: string) => {
                <Th>{colname}</Th>;
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data.map((entry) => {
              return (
                <Tr key={entry.id}>
                  <Th>{entry.id}</Th>
                  <Th>{entry.sensor}</Th>
                  <Th>
                    {new Intl.DateTimeFormat("de", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }).format(entry.createdAt)}
                  </Th>
                  <Th>{entry.userId}</Th>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </LargeContainer>
    </>
  );
};
