import { Head as NextHead } from "next/Head";

const Head = () => {
  return (
    <NextHead>
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap"
        rel="stylesheet"
      ></link>
    </NextHead>
  );
};

export default Head;
