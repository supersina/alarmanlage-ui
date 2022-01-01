import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Input,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";
import { LargeContainer } from "./container";
import { AlarmSystem, User } from "@prisma/client";

async function saveAlarmSystem(alarmsystem) {
  const response = await fetch("/api/alarmsystems", {
    method: "PATCH",
    body: JSON.stringify(alarmsystem),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export const EditAlarmsystemDataForm = (initialAlarmsystem) => {
  const [alarmSystem, setAlarmSystem] = useState({
    id: initialAlarmsystem.alarmsystem.id,
    isActive: initialAlarmsystem.alarmsystem.isActive,
    name: initialAlarmsystem.alarmsystem.name,
    sensors: initialAlarmsystem.alarmsystem.sensors,
  });

  const updateData = (e) => {
    setAlarmSystem({
      ...alarmSystem,
      [e.target.name]: e.target.value,
    });
  };

  function saveUpdates() {
    saveAlarmSystem(alarmSystem);
  }

  return (
    <LargeContainer>
      <Flex
        direction="column"
        width="100%"
        margin="2rem"
        justifyContent="center"
        alignItems="center"
      >
        <Heading>{alarmSystem.name}</Heading>

        <Input
          name="name"
          value={alarmSystem.name ? alarmSystem.name : ""}
          placeholder="Name"
          onChange={updateData}
        />
        <Input
          name="isActive"
          value={alarmSystem.isActive ? alarmSystem.isActive : false}
          placeholder="isActive"
          onChange={updateData}
        />

        {alarmSystem.sensors ? (
          <Table>
            <Thead>
              <Tr>
                <Th> Sensor</Th>
                <Th>Code for Open</Th>
                <Th>Code for Closed</Th>
              </Tr>
            </Thead>
            <Tbody>
              {alarmSystem.sensors.map((sensor) => {
                return (
                  <Tr key={sensor.id}>
                    <Th>
                      <Input
                        name={sensor.name}
                        value={sensor.name}
                        placeholder="Name"
                        onChange={updateData}
                      />
                    </Th>
                    <Th>
                      <Input
                        name="codeOpen"
                        value={sensor.sensorCodeOpen}
                        placeholder="Code Open"
                        onChange={updateData}
                      />
                    </Th>
                    <Th>
                      <Input
                        name="codeClosed"
                        value={sensor.sensorCodeClosed}
                        placeholder="Code Closed"
                        onChange={updateData}
                      />
                    </Th>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        ) : (
          <>Keine Sensoren</>
        )}

        <Button onClick={saveUpdates}>Änderungen speichern</Button>
      </Flex>
    </LargeContainer>
  );
};
