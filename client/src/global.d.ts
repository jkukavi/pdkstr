interface VoidFunction {
  (...args: any | null): void;
}

type ItemType = "item" | "playlist" | "channel";

declare module "*.svg" {
  const content: string;
  export default content;
}

declare module "*.png" {
  const content: string;
  export default content;
}
