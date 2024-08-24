const colors = {
  gray100: "#393838",
} as const;

export const theme = {
  button: {
    backgroundColor: colors.gray100,
  },
} as const;

export type Theme = typeof theme;
