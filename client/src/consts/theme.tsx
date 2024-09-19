const colors = {
  white: "#ffffff",
  gray20: "#858585",
  gray30: "#d0d0d0",
  gray35: "#c7c7c7",
  gray60: " #6b6b6b",
  gray65: "#6b6b6b",
  gray70: " #454545",
  gray75: " #4b4b4b",
  gray85: "#525252",
  gray80: " #343434",
  gray90: "#3d3d3d",
  gray100: "#393838",
  gray220: "#525252",
  gray230: "#6e6e6e",
  gray240: "#555555",
  gray250: "#383838",
  black100: "#03030363",
  black110: "#131313",
  darkGray95: " #292929",
  darkGray97: " #222222",
  darkGray99: "#000000c2",
  black: "#000000",
  orange50: "#db9134",
  purple50: "#5536d0",
  purple60: "#4b36d0",
  purple70: "#5c2bf1",
} as const;

export const theme = {
  global: {
    background: {
      background1: colors.purple60,
      background2: colors.purple50,
      background3: colors.purple70,
    },
    scrollbar: {
      color1: colors.gray240,
      color2: colors.gray250,
      track: colors.gray250,
      thumb: { color: colors.gray20, colorHover: colors.gray240 },
    },
  },
  button: {
    backgroundColor: colors.gray100,
  },
  dropDown: {
    container: {
      backgroundColor: colors.gray80,
    },
    style: {
      border: colors.gray220,
      boxshadowColor: colors.black100,
      backgroundColor: colors.gray80,
    },
    icon: {
      borderColor: colors.gray220,
      dropShadowColor: colors.black110,
      hoverbackgroundColor: colors.gray230,
    },
  },
  settingsPage: {
    backgroundColor: colors.gray35,
  },

  notifications: {
    backgroundColor: colors.gray80,
  },
  searchbox: {
    borderBottomColor: colors.gray65,

    container: {
      backgroundColor: colors.gray100,
      boxShadowColor: colors.black,
    },

    button: {
      backgroundColor: colors.gray90,
      borderColor: colors.gray65,
    },

    icon: {
      boxShadowColor: colors.black,
    },
  },

  suggestions: {
    input: {
      color: colors.gray35,
      backgroundColor: colors.darkGray97,
      borderColor: colors.gray85,
    },
    container: {
      backgroundColor: colors.darkGray95,
      boxShadowColor: colors.darkGray99,
      textColor: colors.gray35,
      hoveredTextColor: colors.gray75,
    },
  },

  channelInfo: {
    textColor: colors.gray30,
    buttonTextColor: colors.gray35,
    hoverColor: colors.white,
    activeColor: colors.white,
  },

  loaders: {
    otherBorderColor: colors.orange50,
    tinyBorderColor: colors.purple50,
  },
  menu: {
    backgroundColor: colors.gray80,
    borderColor: colors.gray60,
    linkBackgroundColor: colors.gray70,
  },
} as const;

export type Theme = typeof theme;
