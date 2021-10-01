import { signIn } from "next-auth/client";

const Login = () => {
  return (
    <div>
      <h1>I dont know you fuck off</h1>
      <button onClick={signIn}>Sign in</button>
    </div>
  );
};

export default Login;
