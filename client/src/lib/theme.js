import { extendTheme } from "@chakra-ui/react";

const overrides = extendTheme({
  styles: {
    global: () => ({
      body: {
        fontFamily: '"Inter", "Roboto", sans-serif"',
      },
    }),
  },
});

const customTheme = extendTheme(overrides);

export default customTheme;
