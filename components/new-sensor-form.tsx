import { Button, Input, Table, Tbody, Th, Tr } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { validateSensorPost } from "../validation/validation";

async function saveSensor(sensor: any, alarmSystemId: string) {
  if (!validateSensorPost(sensor)) {
    alert(
      "Achtung, Fehler! Dein neuer Sensor konnten nicht gespeichert werden!"
    );
    return;
  }
  const response = await fetch(`/api/alarmsystems/${alarmSystemId}/sensor`, {
    method: "POST",
    body: JSON.stringify(sensor),
  });
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

export const NewSensorForm = ({ alarmSystemId }: { alarmSystemId: string }) => {
  const [newSensor, setNewSensor] = useState({
    name: "",
    sensorCodeOpen: "",
    sensorCodeClosed: "",
  });

  const updateNewSensor = (e: ChangeEvent<HTMLInputElement>) => {
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
      saveSensor(newSensor, alarmSystemId);
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
