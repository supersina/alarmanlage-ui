import { Button, Flex, IconButton, Input } from "@chakra-ui/react";
import { useState } from "react";

async function saveUser(user) {
  const response = await fetch("/api/user", {
    method: "PATCH",
    body: JSON.stringify(user),
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export const EditForm = ({ initialUser }) => {
  const { name, email, image } = initialUser;
  const [usr, setUsr] = useState({
    name: name,
    email: email,
    newEmail: email,
    image: image,
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
    <Flex direction="column" width="50%" margin="2rem">
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
      <Input
        name="image"
        value={usr.image ? usr.image : ""}
        onChange={updateData}
      />
      <Button onClick={saveUpdates}>Änderungen speichern</Button>
    </Flex>
  );
};
