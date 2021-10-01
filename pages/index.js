import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

import { useSession, getSession, signOut } from "next-auth/client";

import Login from "../components/Login";
import Welcome from "../components/Welcome";

export default function Home() {
  const [session] = useSession();

  return (
    <>
      <Head>
        <title>{session?.user?.email}</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? <Welcome /> : <Login />}
    </>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
