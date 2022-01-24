import {
  Button,
  Flex,
  Heading,
  Input,
  Switch,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState } from "react";

async function saveSensor(sensor) {
  const response = await fetch(
    `/api/alarmsystems/${sensor.alarmSystemId}/sensor`,
    {
      method: "POST",
      body: JSON.stringify(sensor),
    }
  );
  if (!response.ok) {
    alert(
      "Achtung, Fehler! Dein neuer Sensor konnten nicht gespeichert werden!"
    );
    throw new Error(response.statusText);
  } else {
    alert("Änderungen wurden gespeichert!");
    return response;
  }
}

export const NewSensorForm = ({ alarmSystemId }) => {
  const [newSensor, setNewSensor] = useState({
    name: "",
    sensorCodeOpen: "",
    sensorCodeClosed: "",
    alarmSystemId: alarmSystemId,
  });

  const updateNewSensor = (e) => {
    setNewSensor({
      ...newSensor,
      [e.target.name]: e.target.value,
    });
  };

  function saveNewSensor() {
    if (
      newSensor.name !== "" &&
      newSensor.sensorCodeOpen !== "" &&
      newSensor.sensorCodeClosed !== ""
    ) {
      saveSensor(newSensor);
    }
  }

  return (
    <>
      <Table>
        <Tbody>
          <Tr>
            <Th>
              <Input
                name="name"
                value={newSensor.name}
                placeholder="Name"
                onChange={(e) => updateNewSensor(e)}
              />
            </Th>
            <Th>
              <Input
                name="sensorCodeOpen"
                value={newSensor.sensorCodeOpen}
                placeholder="Code Open"
                onChange={(e) => updateNewSensor(e)}
              />
            </Th>
            <Th>
              <Input
                name="sensorCodeClosed"
                value={newSensor.sensorCodeClosed}
                placeholder="Code Closed"
                onChange={(e) => updateNewSensor(e)}
              />
            </Th>
          </Tr>
        </Tbody>
      </Table>
      <Button onClick={saveNewSensor} marginTop="2rem" marginBottom="2rem">
        Speichern
      </Button>
    </>
  );
};
