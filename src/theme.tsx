import { extendTheme, ThemeConfig } from "@chakra-ui/react";

// Define the type for active label styles
const activeLabelStyles: Record<string, any> = {
  transform: "scale(0.85) translateY(-24px)",
};

// Define the theme configuration with proper type
const themeConfig: ThemeConfig = {
  useSystemColorMode: true,
  initialColorMode: "dark",
};

// Extend the theme with the configuration and component styles
const theme = extendTheme({
  config: themeConfig,
  components: {
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "var(--chakra-colors-chakra-body-bg)",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
              transformOrigin: "left top",
            },
          },
        },
      },
    },
  },
});

export default theme;
