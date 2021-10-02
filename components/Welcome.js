import { Box, Button, Center, Flex, Text, Textarea } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import firebase from "firebase";
import { db } from "../firebase";

const Welcome = () => {
  const [session] = useSession();
  const router = useRouter();

  const [onMore, setOnMore] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const firstName = session?.user?.name.split(" ")[0];

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  console.log("time", new Date().toLocaleDateString());

  const journalEntry = () => {
    db.collection("userDocs")
      .doc(session.user.email)
      .collection("journal")
      .add({
        entryName: inputValue,
        entryDate: new Date().toLocaleDateString(),
        dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
      });

    setIsAdded(true);
    setInputValue("");

    router.push("dashboard");
  };

  const SelectMood = (
    <>
      <Text fontSize="md">
        Welcome, {firstName[0].toUpperCase() + firstName.substring(1)}
      </Text>
      <Text
        fontWeight="bold"
        textTransform="uppercase"
        marginTop="1.5"
        fontSize="4xl"
      >
        How are you?
      </Text>

      <Text fontSize="md">{new Date().toDateString()}</Text>
      <Button
        rightIcon={<ArrowForwardIcon />}
        colorScheme="teal"
        variant="outline"
        onClick={() => setOnMore(true)}
      >
        Tell me more
      </Button>
    </>
  );

  const MoreInfo = (
    <>
      <Text
        fontWeight="bold"
        textTransform="uppercase"
        marginTop="1.5"
        fontSize="4xl"
      >
        Tell me more
      </Text>

      <Textarea
        value={inputValue}
        onChange={handleInputChange}
        placeholder="How was your day?"
        size="sm"
        width="90%"
        backgroundColor="white"
        borderRadius="lg"
        border="1px"
        borderColor="black"
        marginY="20px"
      />
      <Button colorScheme="teal" variant="outline" onClick={journalEntry}>
        Submit
      </Button>
    </>
  );

  return (
    <>
      <Center height="100vh">
        <Box width="3xl" paddingY="40px" borderRadius="lg" bgColor="gray.300">
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            {onMore ? MoreInfo : SelectMood}
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default Welcome;
