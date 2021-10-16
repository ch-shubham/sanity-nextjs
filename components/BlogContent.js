import BlockContent from "@sanity/block-content-to-react";

// https://www.sanity.io/docs/presenting-block-text
const serializers = {
  types: {
    code: ({ node: { language, code, filename } }) => (
      <pre data-language={language}>
        <code>{code}</code>
        <p>{filename}</p>
      </pre>
    ),
  },
};

export default function BlogContent({ content }) {
  return (
    <BlockContent
      imageOptions={{ w: 320, h: 240, fit: "max" }}
      serializers={serializers}
      blocks={content}
    />
  );
}
