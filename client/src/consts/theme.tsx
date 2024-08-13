const colors = {
  gray100: "#393838",
  gray210: "#343434",
} as const;

export const theme = {
  button: {
    backgroundColor: colors.gray100,
  },

  notifications: {
    backgroundColor: colors.gray210,
  },
  searchbox: {
    icon: {
      boxShadowColor: colors.gray100,
    },
  },
} as const;

export type Theme = typeof theme;
