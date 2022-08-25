import type { NextPage } from "next";
import { Section } from "src/components/Section";
import { Layout } from "src/layouts";

const Contact: NextPage = () => {
  return (
    <Layout>
      <Section title="Contact" mt={40}>
        お問い合わせありがとうございます。
      </Section>
    </Layout>
  );
};

export default Contact;
