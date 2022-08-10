import {
  Box,
  BoxProps,
  Container,
  createStyles,
  Divider,
  Text,
  Title,
} from "@mantine/core";
import { FC, ReactNode } from "react";

type SectionProps = BoxProps & {
  title: string;
  children?: ReactNode;
};

const useStyles = createStyles(() => ({
  root: { flex: 1 },
}));

export const Section: FC<SectionProps> = (props) => {
  const { children, title, className, ...others } = props;
  const { classes, cx } = useStyles();

  return (
    <Box
      component="section"
      className={cx(classes.root, className)}
      {...others}
    >
      <Container>
        <Title order={2}>
          <Text size={28}>{title}</Text>
        </Title>
        <Divider mt={20} />
        <Box py="xl">{children}</Box>
      </Container>
    </Box>
  );
};
