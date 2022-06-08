module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        searchbtn: "rgb(89, 160, 238)",
        background: "#005674",
        primary: "#21B6FF",
        secondary2: "#004858",
        secondary: "#001D4F",
        third: "#6CCEE31A",
        fourth: "#C4C4C4",
        fifth: "#323232",
        sixth: "#000000",
        seventh: "rgba(0, 0, 0, 0.2)",
        eight: "#EBEBEB",
        star: "#FFAB48",
        ninth: "#EC340C",
        tenth: "#1D0F89",
        eleventh: "#001D4F",
        twelfth: "#DBDAD9",
        thirteenth: "#eee",
        fourteenth: "#D8D8D8",
        fifteenth: "#AFAFAF",
        sixteenth: "#CB69294D",
        seventeenth: "#060058",
        eighteenth: "#0D5800",
        ninteenth: "#58002A",
        superadmin: "#7E52C3",
        admin: "#2CA0C8",
        viewer: "#27BC56",
        editor: "#CD6F40",
        active: "#2EAB5D",
        pending: "#A02EAB",
        declined: "#F14545",
        done: "#35C6DB",
      },
      fontFamily: {
        body: ["Montserrat"],
        poppins: ["'Poppins', sans-serif"],
        sans2: ["roboto"],
        alfa: ["Alfa Slab One"],
        allura:["Allura"],
        badscript:["Bad Script"],
        luckiest:["Luckiest Guy"],
        monofett:["Monofett"],
        elite:["Special Elite"],
        yellowtail:["Yellowtail"]
      },
      fontSize: {
        xxxs: ["0.5rem", { lineHeight: "0.7rem" }],
        xxs: ["0.625rem", { lineHeight: "0.9375rem" }],
        sme: ["0.875em", { lineHeight: "1.25em" }],
        "3.5xl": ["2rem", { lineHeight: "2rem" }],
        "1.5xl": ["1.3125rem", { lineHeight: "1.75rem" }],
        "6.5xl": ["4rem", { lineHeight: "6rem" }],
      },
      boxShadow: {
        card: "0px 4px 10px 5px rgba(230, 230, 230, 0.5)",
        bigCard: "0px 4px 10px 5px rgba(219, 219, 219, 0.25)",
      },
      borderRadius: {
        primary: "1.875rem",
        secondary: "50%",
        lgx: "0.625rem",
        third: "0.3125rem",
      },
      inset: {
        primary: "-4.5rem",
      },
      spacing: {
        1.3: "0.3rem",
        1.4: "0.3125",
        2.3: "0.60rem",
        2.7: "0.677rem",
        3.1: "0.75em",
        3.2: "0.9375",
        7.2: "1.8rem",
        13: "3.25rem",
        90: "22rem",
        100: "27rem",
        120: "31.25rem",
        spinner: "42.333333%",
      },
      zIndex: {
        1: "1",
      },
      flex: {
        2: "2 1 0%",
        3: "3 1 0%",
        4: "4 1 0%",
        5: "5 1 0%",
        6: "2 1 0%",
        7: "7 1 0%",
        8: "8 1 0%",
        9: "9 1 0%",
        10: "10 1 0%",
      },
      width: {
        primary: "18%",
        secondary: "60%",
        third: "24%",
        fourth: "48%",
        fifth: "15vw",
        sixth: "4.375rem",
        seventh: "23%",
        eight: "45%",
        ninth: "75vw",
        tenth: "95%",
        eleventh: "30%",
        twelfth: "40vw",
        thirteenth: "25vw",
      },
      height: {
        primary: "29.375rem",
        secondary: "80vh",
      },
      minHeight: {
        primary: "41.5rem",
      },
      objectPosition: {
        primary: "28% 0",
      },
      gridTemplateColumns: {
        "6a": "repeat(6, minmax(0, auto))",
        "7a": "repeat(7, minmax(0, auto))",
        "6s": "repeat(6, 1fr)",
        "8s": "repeat(8, 1fr)",
        "10s": "repeat(10, 1fr)",
        "13s": "repeat(13, 1fr)",
        "14s": "repeat(14, 1fr)",
      },
    },
  },
  plugins: [],
};
