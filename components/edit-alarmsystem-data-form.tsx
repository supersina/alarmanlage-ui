import {
  Button,
  Flex,
  Input,
  Switch,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { AlarmSystemGet } from "../pages/api/alarmsystems/[alarmsystemId]";
import { NewSensorForm } from "./new-sensor-form";

async function saveAlarmSystem(alarmsystem: AlarmSystemGet) {
  const response = await fetch(`/api/alarmsystems/${alarmsystem.id}`, {
    method: "PATCH",
    body: JSON.stringify(alarmsystem),
  });
  if (!response.ok) {
    alert("Achtung, Fehler! Änderungen konnten nicht gespeichert werden!");
    throw new Error(response.statusText);
  } else {
    alert("Änderungen wurden gespeichert!");
    return response;
  }
}

async function deleteSensor(sensorId: string, alarmsystemId: string) {
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

async function deleteAlarmSystem(alarmsystem: AlarmSystemGet) {
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

export const EditAlarmsystemDataForm = ({
  alarmsystem,
}: {
  alarmsystem: AlarmSystemGet;
}) => {
  const [alarmSystem, setAlarmSystem] = useState({
    id: alarmsystem.id,
    isActive: alarmsystem.isActive,
    name: alarmsystem.name,
    sensors: alarmsystem.sensors,
  });

  const [isEnabled, setIsEnabled] = useState(false);

  const updateData = (e: ChangeEvent<HTMLInputElement>) => {
    let valueToSet;
    if (e.target.name === "isActive") {
      valueToSet = e.target.checked;
    } else {
      valueToSet = e.target.value;
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
    >
      <Button align="right" onClick={() => deleteAlarmSystem(alarmSystem)}>
        Alarmsystem löschen
      </Button>
      <Flex direction="row" margin="2rem" alignItems="center">
        <Text marginRight="1rem">Name</Text>
        <Input
          size="lg"
          marginRight="1rem"
          name="name"
          value={alarmSystem.name ? alarmSystem.name : ""}
          placeholder="Name"
          onChange={updateData}
        />

        <Flex justify="center" align="center">
          <Text marginRight="1rem">Status</Text>
          <Switch
            id="status-switch"
            name="isActive"
            marginRight="1rem"
            isChecked={alarmSystem.isActive}
            onChange={updateData}
          />
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
