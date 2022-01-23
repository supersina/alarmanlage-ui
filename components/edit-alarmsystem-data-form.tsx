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
import { LargeContainer } from "./container";
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
    console.log(valueToSet);
    if (e.target.name === "isActive") {
      console.log("target name isActive", e.target.name);
      valueToSet = e.target.checked;
    }
    console.log("new value to set ", valueToSet);

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

  function saveUpdates() {
    saveAlarmSystem(alarmSystem);
  }

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
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
            <Button onClick={saveUpdates} marginTop="2rem">
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
