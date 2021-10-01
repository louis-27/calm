import Image from "next/image";
import { signIn } from "next-auth/client";

const Login = () => {
  return (
    <>
      <Image
        src="https://cdn.worldvectorlogo.com/logos/new-youtube-logo.svg"
        alt="Moodie Logo"
        width="350"
        height="600"
      />
      <button onClick={signIn}>Sign in</button>
    </>
  );
};

export default Login;
