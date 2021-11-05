import { colors } from "../../theme/colors";

export const CustomHeading = {
  baseStyle: {
    fontWeight: "normal",
    color: colors.headingColor,
    textTransform: "uppercase",
    fontStyle: "italic",
    fontSize: ["0.8rem", "0.9rem", "1rem", "1.1rem", "1.2rem"],
    marginTop: "1.5rem",
    marginBottom: "1.5rem",
  },
  variants: {
    xsmall: {
      fontSize: ["0.6rem", "0.8rem", "1rem", "1.1rem", "1.2rem"],
    },
    small: {
      fontSize: ["0.8rem", "0.9rem", "1rem", "1.1rem", "1.2rem"],
    },
    medium: {
      fontSize: ["1.2rem", "1.3rem", "1.5rem", "1.7rem", "1.9rem"],
    },

    large: {
      fontWeight: "bold",
      fontSize: ["1.3rem", "1.4rem", "1.5rem", "1.8rem", "2.1rem"],
    },
    xlarge: {
      fontSize: ["1.5rem", "1.7rem", "1.9rem", "2.1rem", "2.3rem"],
    },
  },
};
