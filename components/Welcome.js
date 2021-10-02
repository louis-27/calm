import Image from "next/image";
import { Box, Button, Center, Flex, Text, Textarea } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { useState } from "react";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import firebase from "firebase";
import { db } from "../firebase";

import Sentiment from "sentiment";
import Face from "./Face";

const Welcome = () => {
  const [session] = useSession();
  const router = useRouter();
  const [onMore, setOnMore] = useState(false);
  const [selectedMood, setSelectedMood] = useState(2);
  const [inputValue, setInputValue] = useState("");
  const firstName = session?.user?.name.split(" ")[0];

  const sentiment = new Sentiment();
  const [generalSentiment, setGeneralSentiment] = useState("meh");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Add journal entry to Firestore
  const journalEntry = () => {
    if (!inputValue) return;

    const sentimentAnalysisResult = sentiment.analyze(inputValue);

    if (sentimentAnalysisResult.score <= -3) {
      setGeneralSentiment("awful");
    } else if (
      sentimentAnalysisResult.score >= -2 &&
      sentimentAnalysisResult.score <= -1
    ) {
      setGeneralSentiment("bad");
    } else if (sentimentAnalysisResult.score == 0) {
      setGeneralSentiment("meh");
    } else if (
      sentimentAnalysisResult.score >= 1 &&
      sentimentAnalysisResult.score <= 2
    ) {
      setGeneralSentiment("good");
    } else if (sentimentAnalysisResult.score >= 3) {
      setGeneralSentiment("happy");
    }

    db.collection("userDocs")
      .doc(session.user.email)
      .collection("journal")
      .add({
        entryName: inputValue,
        entryDate: new Date().toLocaleDateString(),
        dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
        moodScore: sentimentAnalysisResult.score,
      });

    console.log("Sentiment score: ", sentimentAnalysisResult.score);
    console.log("General Sentiment:", generalSentiment);
    console.log("Analysis Result:", sentimentAnalysisResult);
    setInputValue("");

    setOnMore(true);
  };

  const SelectMood = (
    <>
      <Text fontSize="md">{new Date().toDateString()}</Text>
      <Text fontWeight="bold" marginTop="1.5" fontSize="4xl">
        {firstName[0].toUpperCase() + firstName.substring(1)}, you seem to be
        feeling..
      </Text>

      <Flex
        textAlign="center"
        justifyContent="space-evenly"
        width="80%"
        marginY="40px"
      >
        <Face mood={generalSentiment} size="100px" />
      </Flex>

      <Button
        rightIcon={<ArrowForwardIcon />}
        colorScheme="teal"
        variant="outline"
        onClick={() => router.push("dashboard")}
      >
        Continue to Dashboard
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
        Tell me
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
          className="glassmorphism"
          width="3xl"
          paddingY="40px"
          borderRadius="lg"
        >
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            {!onMore ? MoreInfo : SelectMood}
          </Flex>
        </Box>
      </Center>
    </div>
  );
};

export default Welcome;
