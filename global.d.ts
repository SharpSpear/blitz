// These reference imports provide type definitions for things like styled-jsx and css modules
/// <reference types="next" />
/// <reference types="next/types/global" />
declare module "*.svg" {
  const content: string
  export default content
}
