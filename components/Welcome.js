import Image from "next/image";
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
  const [selectedMood, setSelectedMood] = useState(2);
  const [inputValue, setInputValue] = useState("");
  const firstName = session?.user?.name.split(" ")[0];

  // console.log("time", new Date().toLocaleDateString());

  // Add mood entry to Firestore
  const moodMultipliers = [0.4, 0.8, 1, 1.2, 1.6];
  // const onInputMoodFinish = () => {
  //   // db.collection("userDocs")
  //   //   .doc(session.user.email)
  //   //   .collection("moodEntries")
  //   //   .add({
  //   //     multiplier: moodMultipliers[selectedMood],
  //   //     entryDate: new Date().toLocaleDateString(),
  //   //     dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
  //   //   });

  //   setOnMore(true);
  // };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Add journal entry to Firestore
  const journalEntry = () => {
    if (!inputValue) return;

    db.collection("userDocs")
      .doc(session.user.email)
      .collection("journal")
      .add({
        entryName: inputValue,
        entryDate: new Date().toLocaleDateString(),
        dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        multiplier: moodMultipliers[selectedMood],
      });

    setInputValue("");

    router.push("dashboard");
  };

  const SelectMood = (
    <>
      <Text fontSize="md">
        Welcome, {firstName[0].toUpperCase() + firstName.substring(1)}
      </Text>
      <Text fontWeight="bold" marginTop="1.5" fontSize="4xl">
        How are you?
      </Text>

      <Text fontSize="md">{new Date().toDateString()}</Text>

      <Flex
        textAlign="center"
        justifyContent="space-evenly"
        width="80%"
        marginY="40px"
      >
        <div onClick={() => setSelectedMood(0)} style={{ cursor: "pointer" }}>
          <Image
            src={`/images/1-awful.png`}
            alt="Awful"
            width="50px"
            height="50px"
          />
          <Text>Awful</Text>
        </div>
        <div onClick={() => setSelectedMood(1)} style={{ cursor: "pointer" }}>
          <Image
            src={`/images/2-bad.png`}
            alt="Bad"
            width="50px"
            height="50px"
          />
          <Text>Bad</Text>
        </div>
        <div onClick={() => setSelectedMood(2)} style={{ cursor: "pointer" }}>
          <Image
            src={`/images/3-meh.png`}
            alt="Meh"
            width="50px"
            height="50px"
          />
          <Text>Meh</Text>
        </div>
        <div onClick={() => setSelectedMood(3)} style={{ cursor: "pointer" }}>
          <Image
            src={`/images/4-good.png`}
            alt="Good"
            width="50px"
            height="50px"
          />
          <Text>Good</Text>
        </div>
        <div onClick={() => setSelectedMood(4)} style={{ cursor: "pointer" }}>
          <Image
            src={`/images/5-happy.png`}
            alt="Happy"
            width="50px"
            height="50px"
          />
          <Text>Happy</Text>
        </div>
      </Flex>

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
    <div
      style={{
        height: "100vh",
        background: "#4158d0 linear-gradient(180deg, #CCFBFF 0%, #EF96C5 100%)",
      }}
    >
      <Center height="100vh">
        <Box
          className="glassbangsat"
          width="3xl"
          paddingY="40px"
          borderRadius="lg"
        >
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            {onMore ? MoreInfo : SelectMood}
          </Flex>
        </Box>
      </Center>
    </div>
  );
};

export default Welcome;
