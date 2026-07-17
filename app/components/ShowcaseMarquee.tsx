import Image from "next/image";

type ShowcaseItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const showcaseItems: ShowcaseItem[] = [
  {
    src: "/showcase/vyro-always.png",
    alt: "VYRO floating desktop companion preview",
    width: 1448,
    height: 1086,
  },
  {
    src: "/showcase/vyro-voice.png",
    alt: "VYRO voice commands preview",
    width: 1448,
    height: 1086,
  },
  {
    src: "/showcase/vyro-open-apps.png",
    alt: "VYRO opening Windows apps preview",
    width: 1448,
    height: 1086,
  },
  {
    src: "/showcase/vyro-emotions.png",
    alt: "VYRO emotions and personality preview",
    width: 1448,
    height: 1086,
  },
  {
    src: "/showcase/vyro-focus.png",
    alt: "VYRO Focus Mode preview",
    width: 1448,
    height: 1086,
  },
  {
    src: "/showcase/vyro-customizable.png",
    alt: "VYRO customization settings preview",
    width: 1535,
    height: 1024,
  },
];

function ShowcaseGroup({ items, duplicate = false }: { items: ShowcaseItem[]; duplicate?: boolean }) {
  return (
    <div className={`showcase-group${duplicate ? " showcase-group--duplicate" : ""}`} aria-hidden={duplicate || undefined}>
      {items.map((item) => (
        <div className="showcase-card" key={`${duplicate ? "duplicate-" : ""}${item.src}`}>
          <Image
            src={item.src}
            alt={duplicate ? "" : item.alt}
            width={item.width}
            height={item.height}
            sizes="(max-width: 640px) 20rem, (max-width: 1024px) 62vw, 35rem"
            className="showcase-image"
          />
        </div>
      ))}
    </div>
  );
}

export default function ShowcaseMarquee() {
  return (
    <div className="showcase-marquee" aria-label="VYRO product screenshots">
      <div className="showcase-track">
        <ShowcaseGroup items={showcaseItems} />
        <ShowcaseGroup items={showcaseItems} duplicate />
      </div>
    </div>
  );
}
