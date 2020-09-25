import { Top } from "src/components/Top";
import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Blog</title>
      </Head>
      <Top />
    </div>
  );
}
