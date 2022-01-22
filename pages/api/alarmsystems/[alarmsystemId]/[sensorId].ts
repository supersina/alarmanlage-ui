//todo?

// //PATCH
// //GET

// import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
// import { prismaClient } from "../../../../prismaClient";

// const sensorHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { alarmSystemId, sensorId } = req.query;

//   if (
//     !alarmSystemId ||
//     !sensorId ||
//     typeof alarmSystemId !== "string" ||
//     typeof sensorId !== "string"
//   ) {
//     return res.status(405).json({ message: "data missing" });
//   }
//   const session = await getSession({ req });

//   if (req.method !== "GET" && req.method !== "PATCH") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   if (req.method == "PATCH") {
//     const alarmsystem = await prismaClient.alarmSystem.findFirst({
//       where: { userId: session?.user.id, id: alarmSystemId },
//       select: {
//         id: true,
//         sensors: {
//           select: {
//             id: true,
//             alarmSystemId: true,
//             name: true,
//             sensorCodeOpen: true,
//             sensorCodeClosed: true,
//             sensorEvents: {
//               select: {
//                 id: true,
//                 sensorId: true,
//                 sensorCode: true,
//               },
//             },
//           },
//         },
//       },
//     });

//     const sensor = alarmsystem?.sensors.find(
//       (sensor) => sensor.id === sensorId
//     );

//     if (sensor) {
//       prismaClient.sensor.update({
//         where: {
//           id: sensor.id,
//         },
//         data: {
//           //sensorCodeClosed: body
//         },
//       });
//     }
//   }
// };

// export default sensorHandler;
