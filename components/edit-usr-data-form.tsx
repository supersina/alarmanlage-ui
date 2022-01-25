import { Button, Flex, Input } from "@chakra-ui/react";
import { useState } from "react";
import { User } from "@prisma/client";

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

export const EditUsrDataForm = ({ initialUser }) => {
  const [usr, setUsr] = useState({
    id: initialUser.user.id,
    name: initialUser.user.name,
    email: initialUser.user.email,
    emailVerified: initialUser.user.emailVerified,
    newEmail: initialUser.user.email,
    image: initialUser.user.image,
    AlarmSystems: initialUser.user.AlarmSystems,
    createdAt: initialUser.user.createdAt,
    updatedAt: initialUser.user.updatedAt,
  });

  const updateData = (e) => {
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
