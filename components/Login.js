import Image from "next/image";
import { signIn } from "next-auth/client";
import { Button, Flex } from "@chakra-ui/react";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  return (
    <>
      <Flex
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Image
          src="/images/logo.png"
          alt="Moodie Logo"
          width="300px"
          height="200px"
        />
        <Button marginTop="50px" onClick={signIn} leftIcon={<FaGoogle />}>
          Continue with Google
        </Button>
      </Flex>
    </>
  );
};

export default Login;
