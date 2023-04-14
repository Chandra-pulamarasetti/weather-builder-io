import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Weather | Forecast</title>
      </Head>
    </>
  );
}

export function getServerSideProps() {
  return {
    redirect: {
      destination: "/weather",
    },
    props: {},
  };
}
