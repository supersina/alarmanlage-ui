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
import { NewSensorForm } from "./new-sensor-form";

async function saveAlarmSystem(alarmsystem) {
  const response = await fetch(`/api/alarmsystems/${alarmsystem.id}`, {
    method: "PATCH",
    body: JSON.stringify(alarmsystem),
  });
  if (!response.ok) {
    alert("Achtung, Fehler! Änderungen konnten nicht gespeichert werden!");
    throw new Error(response.statusText);
  }
  //todo: alert with success message
  else {
    alert("Änderungen wurden gespeichert!");
    return response;
  }
}

async function deleteSensor(sensorId, alarmsystemId) {
  const response = await fetch(
    `/api/alarmsystems/${alarmsystemId}/${sensorId}`,
    {
      method: "DELETE",
      body: JSON.stringify(sensorId),
    }
  );
  if (!response.ok) {
    alert("Achtung, Fehler! Sensor konnte nicht gelöscht werden.");
    throw new Error(response.statusText);
  } else {
    alert("Sensor wurde erfolgreich gelöscht!");
    return response;
  }
}

async function deleteAlarmSystem(alarmsystem) {
  const alarmsystemId = alarmsystem.id;
  console.log("aufruf id: ", alarmsystemId);
  const response = await fetch(`/api/alarmsystems/${alarmsystemId}}`, {
    method: "DELETE",
    body: JSON.stringify(alarmsystem),
  });
  if (!response.ok) {
    alert("Achtung, Fehler! Alarmanlage konnte nicht gelöscht werden.");
    throw new Error(response.statusText);
  } else {
    alert("Alarmanlage wurde erfolgreich gelöscht!");
    return response;
  }
}

export const EditAlarmsystemDataForm = (initialAlarmsystem) => {
  const [alarmSystem, setAlarmSystem] = useState({
    id: initialAlarmsystem.alarmsystem.id,
    isActive: initialAlarmsystem.alarmsystem.isActive,
    name: initialAlarmsystem.alarmsystem.name,
    sensors: initialAlarmsystem.alarmsystem.sensors,
  });

  const [isEnabled, setIsEnabled] = useState(false);

  const updateData = (e) => {
    let valueToSet = e.target.value;
    if (e.target.name === "isActive") {
      valueToSet = e.target.checked;
    }

    setAlarmSystem({
      ...alarmSystem,
      [e.target.name]: valueToSet,
    });
  };

  const updateSensor = (
    sensorId: string,
    key: string,
    value: string | number
  ) => {
    const newSensors = alarmSystem.sensors.map((sensor) => {
      if (sensor.id === sensorId) {
        return { ...sensor, [key]: value };
      }
      return sensor;
    });

    setAlarmSystem({
      ...alarmSystem,
      sensors: newSensors,
    });
  };

  function setEnabled() {
    setIsEnabled(!isEnabled);
  }

  return (
    <Flex
      direction="column"
      width="100%"
      margin="2rem"
      justifyContent="center"
      alignItems="center"
      background="black"
    >
      <Flex direction="row">
        <Heading>
          <Input
            border="none"
            size="lg"
            name="name"
            value={alarmSystem.name ? alarmSystem.name : ""}
            placeholder="Name"
            onChange={updateData}
          />
        </Heading>

        <Flex justify="center" align="center">
          <Switch
            id="status-switch"
            name="isActive"
            isChecked={alarmSystem.isActive}
            onChange={updateData}
          />
          <Button onClick={() => deleteAlarmSystem(alarmSystem)} margin="2rem">
            Löschen
          </Button>
        </Flex>
      </Flex>

      {alarmSystem.sensors.length !== 0 ? (
        <>
          <>
            <Table>
              <Thead>
                <Tr>
                  <Th> Sensor</Th>
                  <Th>Code for Open</Th>
                  <Th>Code for Closed</Th>
                  <Th></Th>
                </Tr>
              </Thead>
              <Tbody>
                {alarmSystem.sensors.map((sensor) => {
                  return (
                    <Tr key={sensor.id}>
                      <Th>
                        <Input
                          name={`sensorName-${sensor.id}`}
                          value={sensor.name}
                          placeholder="Name"
                          onChange={(e) =>
                            updateSensor(sensor.id, "name", e.target.value)
                          }
                        />
                      </Th>
                      <Th>
                        <Input
                          name={`codeOpen-${sensor.id}`}
                          value={sensor.sensorCodeOpen}
                          placeholder="Code Open"
                          onChange={(e) =>
                            updateSensor(
                              sensor.id,
                              "sensorCodeOpen",
                              e.target.value
                            )
                          }
                        />
                      </Th>
                      <Th>
                        <Input
                          name={`codeClosed-${sensor.id}`}
                          value={sensor.sensorCodeClosed}
                          onChange={(e) =>
                            updateSensor(
                              sensor.id,
                              "sensorCodeClosed",
                              e.target.value
                            )
                          }
                        />
                      </Th>
                      <Th>
                        <Button
                          onClick={() =>
                            deleteSensor(sensor.id, alarmSystem.id)
                          }
                        >
                          Löschen
                        </Button>
                      </Th>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            <Button
              onClick={() => saveAlarmSystem(alarmSystem)}
              marginTop="2rem"
            >
              Änderungen speichern
            </Button>
          </>
        </>
      ) : (
        <>
          <Text>Keine Sensoren registriert</Text>
        </>
      )}

      <Button onClick={setEnabled} margin="2rem">
        Neuen Sensor anlegen
      </Button>
      {isEnabled ? (
        <NewSensorForm alarmSystemId={alarmSystem.id}></NewSensorForm>
      ) : (
        <></>
      )}
    </Flex>
  );
};
