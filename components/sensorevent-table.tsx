import { LargeContainer } from "./container";
import { Table, Thead, Tbody, Tr, Th } from "@chakra-ui/react";

export const SensorEventTable = ({ alarmsystemData, alarmsystemId }) => {
  return (
    <>
      <LargeContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Event</Th>
              <Th>Datum</Th>
            </Tr>
          </Thead>
          <Tbody>
            {alarmsystemData.alarmsystems.map((alarmData) => {
              if (alarmData.id === alarmsystemId) {
                return alarmData.sensors.map((sensor) => {
                  return sensor.sensorEvents.map((sensorEvent) => {
                    return (
                      <Tr key={sensorEvent.id}>
                        {sensorEvent.sensorCode === sensor.sensorCodeOpen ? (
                          <Th>{sensor.name} auf</Th>
                        ) : (
                          <Th>{sensor.name} zu</Th>
                        )}
                        <Th>{sensorEvent.createdAt}</Th>
                      </Tr>
                    );
                  });
                });
              }
            })}
          </Tbody>
        </Table>
      </LargeContainer>
    </>
  );
};
