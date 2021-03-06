import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { getSession, useSession, signOut } from "next-auth/client";
import {
  Icon,
  Box,
  Center,
  CircularProgress,
  Flex,
  Image as ImageChakra,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { MdPlayArrow } from "react-icons/md";
import { HamburgerIcon } from "@chakra-ui/icons";
import Calendar from "../components/Dashboard/Calendar";
import { db } from "../firebase";
import DashboardNotesRow from "../components/Dashboard/DashboardNotesRow";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [session] = useSession();
  const router = useRouter();
  const [journals, setJournals] = useState([]);
  const [generalSentiment, setGeneralSentiment] = useState("meh");
  const [isLoaded, setIsLoaded] = useState(false);
  const today = new Date().toLocaleDateString();

  useEffect(() => {
    if (!session) {
      // if user session is null (user is not signed in), then:
      router.replace("/"); // redirect user from dashboard to index page
      return; // do not continue this useEffect hook
    }

    const unsub = db
      .collection("userDocs")
      .doc(session?.user?.email)
      .collection("journal")
      .orderBy("dateCreated", "desc")
      .onSnapshot((snapshot) => {
        const dailyJournals = snapshot.docs.map((journal) => {
          return {
            id: journal.id,
            ...journal.data(),
          };
        });

        setJournals(
          dailyJournals.filter(
            (journal) =>
              journal.dateCreated.toDate().toLocaleDateString() === today
          )
        );

        if (dailyJournals[0].moodScore <= -3) {
          setGeneralSentiment("awful");
        } else if (
          dailyJournals[0].moodScore >= -2 &&
          dailyJournals[0].moodScore <= -1
        ) {
          setGeneralSentiment("bad");
        } else if (dailyJournals[0].moodScore == 0) {
          setGeneralSentiment("meh");
        } else if (
          dailyJournals[0].moodScore >= 1 &&
          dailyJournals[0].moodScore <= 2
        ) {
          setGeneralSentiment("good");
        } else if (dailyJournals[0].moodScore >= 3) {
          setGeneralSentiment("happy");
        }

        setIsLoaded(true);
      });

    console.log(journals);
    return unsub;
    // }, []); // warning from ESLint when provided an empty array as dependency of this useEffect hook
  });

  const firstName = session?.user?.name.split(" ")[0];

  const handleClick = () => {
    window.open(
      "https://open.spotify.com/playlist/6HYxTAm2r9bjF6mbmKwNnu?si=1e365b45779c4e0e"
    );
  };

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session && (
        <div
          style={{
            height: "100vh",
            background:
              "#4158d0 linear-gradient(180deg, #CCFBFF 0%, #EF96C5 100%)",
          }}
        >
          <Box
            maxWidth="6xl"
            minWidth="md"
            mx="auto"
            paddingTop="80px"
            height="75vh"
          >
            <Flex justifyContent="space-between">
              <Text fontSize="3xl" fontWeight="bold">
                Hello, {firstName[0].toUpperCase() + firstName.substring(1)}!
              </Text>

              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  variant="outline"
                />
                <MenuList>
                  <MenuItem onClick={signOut}>
                    <ImageChakra
                      boxSize="2rem"
                      src={session.user.image}
                      borderRadius="full"
                      alt="User Avatar"
                      mr="10px"
                    />
                    <span>Sign out</span>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>

            <Flex justifyContent="space-between" marginTop="20px" height="100%">
              <Flex
                width="45%"
                flexDirection="column"
                justifyContent="space-between"
              >
                <Box className="glassmorphism" borderRadius="xl" height="35%">
                  {!isLoaded ? (
                    <Center height="100%">
                      <CircularProgress isIndeterminate color="blue.400" />
                    </Center>
                  ) : (
                    <>
                      <Box>
                        <Flex alignItems="center">
                          <Text
                            marginTop="15px"
                            marginLeft="20px"
                            fontSize="5xl"
                            fontWeight="bold"
                          >
                            You are feeling
                          </Text>

                          <Box marginTop="15px" marginLeft="15px">
                            <Image
                              src={`/images/${generalSentiment}.png`}
                              alt="mood"
                              width="50px"
                              height="50px"
                            />
                          </Box>
                        </Flex>
                        <Text
                          marginLeft="20px"
                          fontSize="xl"
                          fontWeight="light"
                        >
                          Listen to our music playlist!
                        </Text>
                      </Box>
                      <Box
                        position="absolute"
                        bottom="15px"
                        right="15px"
                        backgroundColor="black"
                        borderRadius="50%"
                        height="50px"
                        width="50px"
                        cursor="pointer"
                      >
                        <Icon
                          as={MdPlayArrow}
                          w={30}
                          h={30}
                          color="white"
                          marginTop="10px"
                          marginLeft="10px"
                          onClick={handleClick}
                        />
                      </Box>
                    </>
                  )}
                </Box>

                <Box height="50%">
                  <Text fontSize="2xl" fontWeight="bold">
                    Daily notes
                  </Text>

                  <Box
                    className="glassmorphism"
                    borderRadius="xl"
                    height="90%"
                    overflowX="hidden"
                  >
                    {!isLoaded ? (
                      <Center height="100%">
                        <CircularProgress isIndeterminate color="blue.400" />
                      </Center>
                    ) : (
                      journals.map((journal) => {
                        return (
                          <DashboardNotesRow
                            key={journal.id}
                            entry={journal.entryName}
                            time={journal.dateCreated
                              .toDate()
                              .toLocaleTimeString()}
                          />
                        );
                      })
                    )}
                  </Box>
                </Box>
              </Flex>

              <Box
                backgroundColor="white"
                borderRadius="xl"
                width="45%"
                height="90%"
              >
                <Calendar />
              </Box>
            </Flex>
          </Box>
        </div>
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context); // load user session

  return {
    props: {
      session,
    },
  };
}
