import {
  Center,
  LoadingOverlay,
  Stack,
  Textarea,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef } from "react";
import { Button } from "src/components/Button";
import { Section } from "src/components/Section";
import { Layout } from "src/layouts";
import { microcms } from "src/lib/microcms";

const Contact: NextPage = () => {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      message: "",
    },
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  });

  const processing = useRef(false);

  const handleSubmit = async (values: typeof form.values) => {
    if (processing.current) {
      return;
    }

    processing.current = true;

    try {
      await microcms.create({
        endpoint: "contact",
        content: values,
      });
      router.push("/contact/completed");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      <Section title="Contact" mt={40}>
        <form
          onSubmit={form.onSubmit(handleSubmit)}
          style={{ position: "relative" }}
        >
          <LoadingOverlay visible={processing.current} />
          <Stack spacing="xl">
            <TextInput
              required
              label="Email"
              placeholder="your@email.com"
              {...form.getInputProps("email")}
            />
            <TextInput
              required
              label="Name"
              placeholder="Taro Yamada"
              {...form.getInputProps("name")}
            />
            <Textarea
              required
              label="Your message"
              placeholder="I want to order your goods"
              {...form.getInputProps("message")}
            />
            <Center>
              <Button type="submit">Send Message</Button>
            </Center>
          </Stack>
        </form>
      </Section>
    </Layout>
  );
};

export default Contact;
