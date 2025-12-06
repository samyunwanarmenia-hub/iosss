interface ScriptLDProps {
  json: Record<string, unknown> | Record<string, unknown>[];
}

const ScriptLD = ({ json }: ScriptLDProps) => {
  // Keep JSON intact for crawlers and guard against accidental script breaks
  const jsonString = JSON.stringify(json).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: jsonString }}
    />
  );
};

export default ScriptLD;
