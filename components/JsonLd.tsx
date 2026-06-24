/**
 * Server-rendered JSON-LD. Renders structured data into the initial HTML so it
 * is parseable without client JS. Accepts one schema object or an array.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Schema is fully controlled by us (no user input) - safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
