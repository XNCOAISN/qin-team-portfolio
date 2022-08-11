import { Center, Stack, Textarea, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import type { NextPage } from "next";
import { Button } from "src/components/Button";
import { Section } from "src/components/Section";
import { LayoutWithHero } from "src/layouts/LayoutWithHero";

const Contact: NextPage = () => {
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

  return (
    <LayoutWithHero>
      <Section title="Contact" mt={40}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
              label="Your Message"
              placeholder="I want to order your goods"
              {...form.getInputProps("message")}
            />
            <Center>
              <Button type="submit">Send Message</Button>
            </Center>
          </Stack>
        </form>
      </Section>
    </LayoutWithHero>
  );
};

export default Contact;
