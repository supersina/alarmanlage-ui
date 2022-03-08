import { Button, Flex, Input } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { User } from "@prisma/client";
import { UserGet } from "../pages/api/user";

async function saveUser(user: User) {
  const response = await fetch("/api/user", {
    method: "PATCH",
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    alert("Fehler, Daten konnten nicht gespeichert werden!");
    throw new Error(response.statusText);
  }
  alert("Daten wurden gespeichert!");
  return await response.json();
}

export const EditUsrDataForm = ({ initialUser }: { initialUser: UserGet }) => {
  console.log("init user", initialUser);
  const [usr, setUsr] = useState({
    id: initialUser.id,
    name: initialUser.name,
    email: initialUser.email,
    emailVerified: initialUser.emailVerified,
    newEmail: initialUser.email,
    image: initialUser.image,
    alarmSystems: initialUser.alarmSystems,
    createdAt: initialUser.createdAt,
    updatedAt: initialUser.updatedAt,
  });

  const updateData = (e: ChangeEvent<HTMLInputElement>) => {
    setUsr({
      ...usr,
      [e.target.name]: e.target.value,
    });
  };

  function saveUpdates() {
    saveUser(usr);
  }

  return (
    <>
      <Flex
        direction="column"
        width="100%"
        justifyContent="center"
        alignItems="center"
      >
        <Input
          size="lg"
          name="name"
          value={usr.name ? usr.name : ""}
          onChange={updateData}
        />
        <Input
          size="lg"
          name="newEmail"
          value={usr.newEmail ? usr.newEmail : ""}
          onChange={updateData}
        />

        <Button onClick={saveUpdates} margin="2rem">
          Änderungen speichern
        </Button>
      </Flex>
    </>
  );
};
