"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getCategoryImage } from "@/lib/getCategoryImage";

type DiscoverTile = {
  id: string;
  label: string;
  target: string;
};

type DiscoverSection = {
  title: string;
  eyebrow: string;
  seeAllTarget: string;
  items: DiscoverTile[];
};

const DISCOVERY_SECTIONS: DiscoverSection[] = [
  {
    title: "Indian Kitchen Staples",
    eyebrow: "Daily essentials",
    seeAllTarget: "all",
    items: [
      {
        id: "atta-rice-dal",
        label: "Atta, Rice & Dal",
        target: "rice-grains",
      },
      {
        id: "cooking-oil",
        label: "Cooking Oil",
        target: "edible-oils",
      },
      {
        id: "ghee-dairy",
        label: "Ghee & Dairy",
        target: "dairy",
      },
      {
        id: "masala-spices",
        label: "Masala & Spices",
        target: "spices",
      },
      {
        id: "dairy-breakfast",
        label: "Dairy & Breakfast",
        target: "dairy",
      },
      {
        id: "organic-health",
        label: "Organic & Health",
        target: "millets",
      },
    ],
  },
  {
    title: "Snacks & Drinks",
    eyebrow: "Tea-time favourites",
    seeAllTarget: "snacks",
    items: [
      {
        id: "biscuits-cookies",
        label: "Biscuits & Cookies",
        target: "snacks",
      },
      {
        id: "noodles-ready-to-eat",
        label: "Noodles & Ready-to-Eat",
        target: "snacks",
      },
      {
        id: "chips-namkeen",
        label: "Chips & Namkeen",
        target: "snacks",
      },
      {
        id: "tea-coffee",
        label: "Tea & Coffee",
        target: "beverages",
      },
      {
        id: "health-drinks",
        label: "Health Drinks",
        target: "beverages",
      },
      {
        id: "oats-breakfast",
        label: "Oats & Breakfast",
        target: "millets",
      },
    ],
  },
  {
    title: "Home & Personal Care",
    eyebrow: "Everyday care",
    seeAllTarget: "personal-care",
    items: [
      {
        id: "oral-care",
        label: "Oral Care",
        target: "personal-care",
      },
      {
        id: "bath-body",
        label: "Bath & Body",
        target: "personal-care",
      },
      {
        id: "hair-care",
        label: "Hair Care",
        target: "personal-care",
      },
      {
        id: "skin-face-care",
        label: "Skin & Face Care",
        target: "personal-care",
      },
      {
        id: "home-cleaning",
        label: "Home Cleaning",
        target: "household",
      },
      {
        id: "fabric-fresheners",
        label: "Fabric & Fresheners",
        target: "household",
      },
    ],
  },
];

function CategoryCover({ tile }: { tile: DiscoverTile }) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "clamp(132px, 15vw, 154px)",
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid rgba(116, 198, 157, 0.32)",
      }}
    >
      <Image
        src={getCategoryImage(tile.label)}
        alt={tile.label}
        width={300}
        height={200}
        className="object-cover rounded-xl"
        sizes="(max-width: 768px) 50vw, 300px"
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
      />
    </div>
  );
}

function SeeAllButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "transparent",
        border: "none",
        padding: 0,
        fontFamily: "Satoshi, sans-serif",
        fontWeight: 700,
        fontSize: "14px",
        cursor: "pointer",
        color: "#536471",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#0F766E";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.color = "#536471";
      }}
    >
      {label}
      <ArrowRight size={16} />
    </button>
  );
}

export function CategoryGrid({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <section
      style={{
        padding: "40px 0 28px",
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.72) 0%, rgba(250,250,247,1) 100%)",
      }}
    >
      <div className="max-w-screen">
        {DISCOVERY_SECTIONS.map((section, sectionIndex) => (
          <div
            key={section.title}
            style={{
              marginBottom:
                sectionIndex === DISCOVERY_SECTIONS.length - 1 ? 0 : "42px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: "16px",
                marginBottom: "18px",
                flexWrap: "wrap",
              }}
            >
              <div>
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#0F766E",
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    fontFamily: "Satoshi, sans-serif",
                    marginBottom: "4px",
                  }}
                >
                  {section.eyebrow}
                </span>
                <h2
                  className="font-display"
                  style={{
                    fontSize: "clamp(24px, 3vw, 34px)",
                    fontWeight: 800,
                    letterSpacing: "-0.03em",
                    color: "#0B0F14",
                  }}
                >
                  {section.title}
                </h2>
              </div>

              <SeeAllButton
                label="See all"
                onClick={() => onSelect(section.seeAllTarget)}
              />
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(145px, 1fr))",
                gap: "20px",
              }}
            >
              {section.items.map((tile, tileIndex) => (
                <button
                  key={tile.id}
                  type="button"
                  data-card
                  className="reveal"
                  onClick={() => onSelect(tile.target)}
                  style={{
                    border: "none",
                    background: "transparent",
                    padding: 0,
                    textAlign: "left",
                    cursor: "pointer",
                    animationDelay: `${tileIndex * 0.04}s`,
                  }}
                  onMouseEnter={(e) => {
                    const button = e.currentTarget as HTMLElement;
                    button.style.transform = "translateY(-4px)";
                    const panel = button.querySelector(".category-tile-panel") as HTMLElement | null;
                    if (panel) {
                      panel.style.boxShadow = "0 18px 40px rgba(15, 118, 110, 0.12)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    const button = e.currentTarget as HTMLElement;
                    button.style.transform = "translateY(0)";
                    const panel = button.querySelector(".category-tile-panel") as HTMLElement | null;
                    if (panel) {
                      panel.style.boxShadow = "none";
                    }
                  }}
                >
                  <div
                    className="category-tile-panel"
                    style={{
                      transition:
                        "transform 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.28s cubic-bezier(0.4,0,0.2,1)",
                    }}
                  >
                    <CategoryCover tile={tile} />
                  </div>
                  <div
                    style={{
                      marginTop: "12px",
                      textAlign: "center",
                      fontSize: "14px",
                      lineHeight: 1.3,
                      color: "#374151",
                      fontFamily: "Satoshi, sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {tile.label}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
