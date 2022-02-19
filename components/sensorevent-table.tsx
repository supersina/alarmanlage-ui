import { LargeContainer } from "./container";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";

export const SensorEventTable = ({ alarmsystemData, alarmsystemId }) => {
  const [data, setData] = useState([]);
  const [sortType, setSortType] = useState("date");

  let list: { name: string; event: string; date: any; full_date: string }[] =
    [];

  alarmsystemData.alarmsystems.map((alarmData) => {
    if (alarmData.id === alarmsystemId) {
      alarmData.sensors.map((sensor) => {
        const sensorCodeOpen = sensor.sensorCodeOpen;
        sensor.sensorEvents.map((sensorEvent) => {
          const date = sensorEvent.createdAt;
          const full_date = new Intl.DateTimeFormat("de", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(sensorEvent.createdAt));
          if (sensorEvent.sensorCode === sensorCodeOpen) {
            list.push({
              name: sensor.name,
              event: `${sensor.name} auf`,
              date: date,
              full_date: full_date,
            });
          } else
            list.push({
              name: sensor.name,
              event: `${sensor.name} zu`,
              date: date,
              full_date: full_date,
            });
        });
      });
    }
  });

  useEffect(() => {
    const sortArray = (type) => {
      const types = {
        name: "name",
        date: "date",
      };
      const sortProperty = types[type];
      let sorted = [];
      if (sortProperty === "date") {
        sorted = [...list].sort(
          (a, b) => new Date(b[sortProperty]) - new Date(a[sortProperty])
        );
      } else {
        sorted = [...list].sort((a, b) =>
          b[sortProperty] < a[sortProperty] ? 1 : -1
        );
      }
      setData(sorted);
    };

    sortArray(sortType);
  }, [sortType, alarmsystemId]);

  return (
    <>
      <LargeContainer>
        <Table>
          <Thead>
            <Tr>
              <Th
                onClick={() => setSortType("name")}
                style={{ cursor: "pointer" }}
              >
                Event <ChevronDownIcon />
              </Th>
              <Th
                onClick={() => setSortType("date")}
                style={{ cursor: "pointer" }}
              >
                Datum <ChevronDownIcon />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {data.map((entry) => (
              <Tr key={entry.date}>
                {console.log(entry)}
                <Td>{entry.event}</Td>
                <Td>{entry.full_date}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </LargeContainer>
    </>
  );
};
