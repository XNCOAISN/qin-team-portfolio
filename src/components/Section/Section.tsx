import { Box, Container, Divider, Text, Title } from "@mantine/core";
import { FC, ReactNode } from "react";

type SectionProps = {
  title: string;
  children?: ReactNode;
};

export const Section: FC<SectionProps> = (props) => {
  const { children, title } = props;

  return (
    <section style={{ flex: 1 }}>
      <Container>
        <Title order={2}>
          <Text size={28}>{title}</Text>
        </Title>
        <Divider mt={20} />
        <Box py="xl">{children}</Box>
      </Container>
    </section>
  );
};
