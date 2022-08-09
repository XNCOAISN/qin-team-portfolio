import { Box } from "@mantine/core";
import type { NextPage } from "next";
import { Layout } from "src/layouts";

const Home: NextPage = () => {
  return (
    <Layout>
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
    </Layout>
  );
};

export default Home;
