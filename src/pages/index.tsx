import { Box } from "@mantine/core";
import type { NextPage } from "next";
import { Layout } from "src/layouts";

import { Hero } from "../components/Hero";

const Home: NextPage = () => {
  return (
    <Layout>
      <section>
        <Hero />
      </section>
      <section>
        <Box
          sx={{
            height: 1000,
            backgroundColor: "gray",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          tmp space
        </Box>
      </section>
    </Layout>
  );
};

export default Home;
