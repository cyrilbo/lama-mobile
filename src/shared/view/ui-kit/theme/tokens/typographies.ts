import { typographie } from "./lightTokens";

export const typographies = {
  Tagline: {
    L: {
      fontFamily: typographie.font.family.tagline,
      fontSize: typographie.font.size["3xl"],
      fontStyle: "normal",
      fontWeight: 800,
      lineHeight: typographie.font.size["3xl"] * 1.35,
    },
    M: {
      fontFamily: typographie.font.family.tagline,
      fontSize: typographie.font.size["2xl"],
      fontStyle: "normal",
      fontWeight: 800,
      lineHeight: typographie.font.size["2xl"] * 1.35,
    },
  },
  Title: {
    H1: {
      fontFamily: typographie.font.family.title,
      fontSize: typographie.font.size["xl"],
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: typographie.font.size["xl"] * 1.4,
    },
    H2: {
      fontFamily: typographie.font.family.title,
      fontSize: typographie.font.size["lg"],
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: typographie.font.size["lg"] * 1.4,
    },
    H3: {
      fontFamily: typographie.font.family.title,
      fontSize: typographie.font.size["md"],
      fontStyle: "normal",
      fontWeight: 700,
      lineHeight: typographie.font.size["md"] * 1.4,
    },
    H4: {
      fontFamily: typographie.font.family.title,
      fontSize: typographie.font.size["sm"],
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: typographie.font.size["sm"] * 1.45,
      letterSpacing: 0.32,
      textTransform: "uppercase",
    },
  },
  Text: {
    P1: {
      Label: {
        fontFamily: typographie.font.family.text,
        fontSize: typographie.font.size["sm"],
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: typographie.font.size["sm"] * 1.5,
      },
      Paragraph: {
        fontFamily: typographie.font.family.text,
        fontSize: typographie.font.size["sm"],
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: typographie.font.size["sm"] * 1.5,
      },
      Important: {
        fontFamily: typographie.font.family.text,
        fontSize: typographie.font.size["sm"],
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: typographie.font.size["sm"] * 1.5,
      },
      Specified: {
        fontFamily: typographie.font.family.text,
        fontSize: typographie.font.size["sm"],
        fontStyle: "italic",
        fontWeight: 400,
        lineHeight: typographie.font.size["sm"] * 1.5,
      },
    },
    P2: {
      Label: {
        fontFamily: typographie.font.family.text,
        fontSize: typographie.font.size["xs"],
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: typographie.font.size["xs"] * 1.4,
      },
      Paragraph: {
        fontFamily: typographie.font.family.text,
        fontSize: typographie.font.size["xs"],
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: typographie.font.size["xs"] * 1.4,
      },
      Important: {
        fontFamily: typographie.font.family.text,
        fontSize: typographie.font.size["xs"],
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: typographie.font.size["xs"] * 1.4,
      },
      Specified: {
        fontFamily: typographie.font.family.text,
        fontSize: typographie.font.size["xs"],
        fontStyle: "italic",
        fontWeight: 400,
        lineHeight: typographie.font.size["xs"] * 1.4,
      },
    },
    Caption: {
      Label: {
        fontFamily: typographie.font.family.text,
        fontSize: typographie.font.size["2xs"],
        fontStyle: "normal",
        fontWeight: 500,
        lineHeight: typographie.font.size["2xs"] * 1.4,
      },
      Paragraph: {
        fontFamily: typographie.font.family.text,
        fontSize: typographie.font.size["2xs"],
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: typographie.font.size["2xs"] * 1.4,
      },
      Important: {
        fontFamily: typographie.font.family.text,
        fontSize: typographie.font.size["2xs"],
        fontStyle: "normal",
        fontWeight: 600,
        lineHeight: typographie.font.size["2xs"] * 1.4,
      },
      Specified: {
        fontFamily: typographie.font.family.text,
        fontSize: typographie.font.size["2xs"],
        fontStyle: "italic",
        fontWeight: 400,
        lineHeight: typographie.font.size["2xs"] * 1.4,
      },
    },
  },
} as const;
