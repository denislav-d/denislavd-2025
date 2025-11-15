import { ImageResponse } from "next/og";

async function loadGoogleFont(
  font: string,
  text: string,
  weight: number = 500,
) {
  const url = `https://fonts.googleapis.com/css2?family=${font}:wght@${weight}&text=${encodeURIComponent(text)}`;
  const css = await (await fetch(url)).text();
  const resource = css.match(
    /src: url\((.+)\) format\('(opentype|truetype)'\)/,
  );

  if (resource) {
    const response = await fetch(resource[1]);
    if (response.status == 200) {
      return await response.arrayBuffer();
    }
  }

  throw new Error("failed to load font data");
}

export async function GET() {
  const title = "Denislav Dimitrov";
  const subtitle = "A visionary in search of meaningful innovation.";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          gap: 20,
          fontFamily: "Plus Jakarta Sans",
          padding: "100px 50px",
          backgroundImage:
            "linear-gradient(36deg,rgba(255, 247, 247, 1) 0%, rgba(247, 247, 242, 1) 80%)",
        }}
      >
        <div
          style={{
            fontSize: 70,
            fontWeight: 600,
            lineHeight: 1.25,
            letterSpacing: "-0.03em",
            marginTop: 24,
            color: "#111111",
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 400,
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
            color: "#71717a",
          }}
        >
          {subtitle}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Plus Jakarta Sans",
          data: await loadGoogleFont(
            "Plus Jakarta Sans",
            title + subtitle,
            600,
          ),
          style: "normal",
          weight: 600,
        },
        {
          name: "Plus Jakarta Sans",
          data: await loadGoogleFont("Plus Jakarta Sans", subtitle, 400),
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
}
