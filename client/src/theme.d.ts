import { Theme } from "./consts/theme";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
