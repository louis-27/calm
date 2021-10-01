import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";

import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

const Welcome = () => {
  const [session] = useSession();
  const router = useRouter();

  return (
    <>
      <Center height="100vh">
        <Box width="3xl" paddingY="40px" borderRadius="lg" bgColor="gray.300">
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <Text fontSize="md">Welcome, {session.user.name}</Text>
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
              onClick={() => router.push("/dashboard")}
            >
              Tell me more
            </Button>
          </Flex>
        </Box>
      </Center>
    </>
  );
};

export default Welcome;
