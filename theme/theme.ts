import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { fonts } from "./fonts";
import { CustomText } from "../components/customization/custom-text";
import { CustomHeading } from "../components/customization/custom-heading";

const breakpoints = createBreakpoints({
  xs: "20rem",
  sm: "48rem",
  md: "60rem",
  lg: "75rem",
  xl: "90rem",
});

const overrides = {
  fonts,
  breakpoints,
  components: {
    Text: CustomText,
    Heading: CustomHeading,
  },
};
export const extendedTheme = extendTheme(overrides);
