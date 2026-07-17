import Image from "next/image";

type ShowcaseItem = {
  src: string;
  title: string;
  description: string;
  width: number;
  height: number;
};

const showcaseRows: ShowcaseItem[][] = [
  [
    {
      src: "/showcase/vyro-always.png",
      title: "Always by your side",
      description: "Floating on your desktop, ready to help.",
      width: 1448,
      height: 1086,
    },
    {
      src: "/showcase/vyro-voice.png",
      title: "Voice commands",
      description: "Open apps, search, and control Windows with your voice.",
      width: 1448,
      height: 1086,
    },
    {
      src: "/showcase/vyro-open-apps.png",
      title: "Open apps instantly",
      description: "Launch your favorite apps and websites.",
      width: 1448,
      height: 1086,
    },
  ],
  [
    {
      src: "/showcase/vyro-emotions.png",
      title: "Emotions and personality",
      description: "VYRO shows emotions and reacts naturally.",
      width: 1448,
      height: 1086,
    },
    {
      src: "/showcase/vyro-focus.png",
      title: "Focus with VYRO",
      description: "Start focus sessions and get more done.",
      width: 1448,
      height: 1086,
    },
    {
      src: "/showcase/vyro-customizable.png",
      title: "Fully customizable",
      description: "Make VYRO yours with simple settings.",
      width: 1535,
      height: 1024,
    },
  ],
];

function ShowcaseGroup({ items, duplicate = false }: { items: ShowcaseItem[]; duplicate?: boolean }) {
  return (
    <div className={`showcase-group${duplicate ? " showcase-group--duplicate" : ""}`} aria-hidden={duplicate || undefined}>
      {items.map((item) => (
        <article className="showcase-card" key={`${duplicate ? "duplicate-" : ""}${item.src}`}>
          <div className="showcase-image-shell">
            <Image
              src={item.src}
              alt={duplicate ? "" : `${item.title} - ${item.description}`}
              width={item.width}
              height={item.height}
              sizes="(max-width: 640px) 18rem, (max-width: 1024px) 55vw, 32rem"
              className="showcase-image"
            />
          </div>
          <div className="showcase-card-copy">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export default function ShowcaseMarquee() {
  return (
    <div className="showcase-window" aria-label="VYRO product screenshots">
      {showcaseRows.map((items, rowIndex) => (
        <div className={`showcase-row showcase-row--${rowIndex === 0 ? "forward" : "reverse"}`} key={rowIndex}>
          <div className="showcase-track">
            <ShowcaseGroup items={items} />
            <ShowcaseGroup items={items} duplicate />
          </div>
        </div>
      ))}
    </div>
  );
}
