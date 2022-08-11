import { Stack, Text, Title } from "@mantine/core";
import type { NextPage } from "next";
import { Section } from "src/components/Section";
import { LayoutWithHero } from "src/layouts/LayoutWithHero";

const About: NextPage = () => {
  return (
    <LayoutWithHero>
      <Section title="About" mt={40}>
        <Stack spacing="xl">
          <Title order={3}>Lightsound Shimabu</Title>
          <Text>
            ITエンジニアYouTuber。神戸大学経営学部卒。未経験から独学でプログラミングを勉強し、新卒でヤフーに入社。2019年に株式会社GameHintを創業。
          </Text>
        </Stack>
      </Section>
    </LayoutWithHero>
  );
};

export default About;
