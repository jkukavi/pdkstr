const colors = {
  white: "#ffffff",
  gray30: "#d0d0d0",
  gray35: "#c7c7c7",
  gray65: "#6b6b6b",
  gray75: " #4b4b4b",
  gray85: "#525252",
  gray90: "#3d3d3d",
  gray100: "#393838",
  gray210: "#343434",
  darkGray95: " #292929",
  darkGray97: " #222222",
  darkGray99: "#000000c2",
  black: "#000000",
  orange50: "#db9134",
  purple50: "#5536d0",
} as const;

export const theme = {
  button: {
    backgroundColor: colors.gray100,
  },

  notifications: {
    backgroundColor: colors.gray210,
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
} as const;

export type Theme = typeof theme;
