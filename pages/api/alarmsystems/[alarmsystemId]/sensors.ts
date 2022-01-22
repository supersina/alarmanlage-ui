// //todo?

import type { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import { prismaClient } from "../../prismaClient";

// //POST

// // REST API Design
// // GET /resource/<id>/relation/<id>
// // GET /alarmsystems --> response: await prismaClient.alarmSystem.findMany({where: {userId: session.user.id}});
// // GET /alarmsystems/12 --> response: prismaClient.alarmSystem.findUnique({where: {id: 12}})

// // POST /alarmsystems --> response: prismaClient.alarmSystem.create({where: {userId: session.user.id}})
// // PATCH /alarmsystems/12 --> response: prismaClient.alarmSystem.findUnique({where: {id: 12}})
// // Nicht machen: GET /users/1/alarmsystems

// // url: alarmsystems/alarmsystemId/sensors/sensorId?
// const sensorHandler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const session = await getSession({ req });
//   const { alarmsystemId } = req.query

//   if (req.method !== "GET" && req.method !== "PATCH") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   if (req.method == "PATCH") {
//     const sensorData = JSON.parse(req.body);

//     const updatedAlarmSystem = await prismaClient.user.update({
//       where: { id: session?.user.id },
//       //todo, inkludieren: userId: session?.user.id,

//       data: {
//         alarmSystems: {
//         update: {
//           data: {

//           },
//           where: {

//           }
//         }
//         }
//         name: sensorData.name,
//         isActive: sensorData.isActive,
//         sensors: {
//           update: {
//             data: {},
//             where: { id: "sensorId" },
//           },
//         },
//       },
//     });
//     res.json(updatedAlarmSystem);
//   }
// };

// export default sensorHandler;
