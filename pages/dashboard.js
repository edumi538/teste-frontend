import React, { useState } from "react";
import Navbar from "../components/navbar";
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/router";

export default function home() {
  const router = useRouter();
  return (
    <>
      <Navbar
        signOut={async () =>
          await signOut({ redirect: false })
            .then(() => {
              router.push("/login");
            })
            .catch((error) => {
              console.log(error);
            })
        }
        isHome={true}
        page={"Dashboard"}
      />
    </>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: { destination: "/unauthorized_page" },
    };
  }
  return {
    props: {},
  };
}
