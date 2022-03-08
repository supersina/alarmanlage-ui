import { LargeContainer } from "./container";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { AlarmSystemGetWithDate } from "../pages/api/alarmsystems";

interface ISensorEventData {
  name: string;
  event: string;
  date: Date;
  full_date: string;
}

type SortType = "date" | "name";

export const SensorEventTable = ({
  alarmsystemData,
  alarmsystemId,
}: {
  alarmsystemData: AlarmSystemGetWithDate;
  alarmsystemId: string;
}) => {
  const [data, setData] = useState<ISensorEventData[]>([]);
  const [sortType, setSortType] = useState<SortType>("date");

  let list: ISensorEventData[] = [];

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

          const event =
            sensorEvent.sensorCode === sensorCodeOpen
              ? `${sensor.name} auf`
              : `${sensor.name} zu`;

          list.push({
            name: sensor.name,
            event,
            date: date,
            full_date: full_date,
          });
        });
      });
    }
  });

  useEffect(() => {
    const sortArray = (type: SortType) => {
      let sorted: ISensorEventData[] = [];

      if (type === "date") {
        sorted = [...list].sort(
          (a, b) => new Date(b[type]).valueOf() - new Date(a[type]).valueOf()
        );
      } else {
        sorted = [...list].sort((a, b) => (b[type] < a[type] ? 1 : -1));
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
            {data.map((entry, index) => (
              <Tr key={index}>
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
