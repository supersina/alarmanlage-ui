import { Box, Button, Flex, IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";
import { LargeContainer } from "./container";
import { User } from "@prisma/client";

async function saveUser(user: User) {
  const response = await fetch("/api/user", {
    method: "PATCH",
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

export const EditUsrDataForm = ({ initialUser }) => {
  console.log(initialUser);
  const {
    id,
    name,
    email,
    emailVerified,
    image,
    AlarmSystems,
    createdAt,
    updatedAt,
  } = initialUser;
  const [usr, setUsr] = useState({
    id: id,
    name: name,
    email: email,
    emailVerified: emailVerified,
    newEmail: email,
    image: image,
    AlarmSystems: AlarmSystems,
    createdAt: createdAt,
    updatedAt: updatedAt,
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
    <LargeContainer>
      <Flex
        direction="column"
        width="50%"
        margin="2rem"
        justifyContent="center"
        alignItems="center"
      >
        <Input
          name="name"
          value={usr.name ? usr.name : ""}
          onChange={updateData}
        />
        <Input
          name="newEmail"
          value={usr.newEmail ? usr.newEmail : ""}
          onChange={updateData}
        />

        <Button onClick={saveUpdates}>Änderungen speichern</Button>
      </Flex>
    </LargeContainer>
  );
};
