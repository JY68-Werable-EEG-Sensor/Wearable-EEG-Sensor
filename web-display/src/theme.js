import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

//color design token
export const tokens = (mode) => ({
    ...(mode === 'dark'
        ? {
            /* DARK MODE COLORS */
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414",
            },
            darkGrey: {
                100: "#d2d3d3",
                200: "#a5a6a7",
                300: "#777a7b",
                400: "#4a4d4f",
                500: "#1d2123",
                600: "#171a1c",
                700: "#111415",
                800: "#0c0d0e",
                900: "#060707"
            },
            //black
            primary: {
                100: "#cecfcf",
                200: "#9e9e9f",
                300: "#6d6e6e",
                400: "#3d3d3e",
                500: "#0c0d0e",
                600: "#0a0a0b",
                700: "#070808",
                800: "#050506",
                900: "#020303"
            },

            purpleAccent: {
                100: "#dfd2e6",
                200: "#bfa6cc",
                300: "#a079b3",
                400: "#804d99",
                500: "#602080",
                600: "#4d1a66",
                700: "#3a134d",
                800: "#260d33",
                900: "#13061a"
            },
            pinkAccent: {
                100: "#efd6ef",
                200: "#dfacdf",
                300: "#d083d0",
                400: "#c059c0",
                500: "#b030b0",
                600: "#8d268d",
                700: "#6a1d6a",
                800: "#461346",
                900: "#230a23"
            },
            blueAccent: {
                100: "#e2e9f2",
                200: "#c4d3e5",
                300: "#a7bdd9",
                400: "#89a7cc",
                500: "#6c91bf",
                600: "#567499",
                700: "#415773",
                800: "#2b3a4c",
                900: "#161d26"
            },
            greenAccent: {
                100: "#def4ef",
                200: "#bde9df",
                300: "#9ddecf",
                400: "#7cd3bf",
                500: "#5bc8af",
                600: "#49a08c",
                700: "#377869",
                800: "#245046",
                900: "#122823"
            },
        } : {
            /* LIGHT MODE COLORS */
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0",
            },
            darkGrey: {
                100: "#060707",
                200: "#0c0d0e",
                300: "#111415",
                400: "#171a1c",
                500: "#1d2123",
                600: "#4a4d4f",
                700: "#777a7b",
                800: "#a5a6a7",
                900: "#d2d3d3",
            },
            primary: {
                100: "#020303",
                200: "#050506",
                300: "#070808",
                400: "#0a0a0b",
                500: "#0c0d0e",
                600: "#3d3d3e",
                700: "#6d6e6e",
                800: "#9e9e9f",
                900: "#cecfcf",
            },
            //dark purple 
            purpleAccent: {
                100: "#13061a",
                200: "#260d33",
                300: "#3a134d",
                400: "#4d1a66",
                500: "#602080",
                600: "#804d99",
                700: "#a079b3",
                800: "#bfa6cc",
                900: "#dfd2e6",
            },
            //purple
            pinkAccent: {
                100: "#230a23",
                200: "#461346",
                300: "#6a1d6a",
                400: "#8d268d",
                500: "#b030b0",
                600: "#c059c0",
                700: "#d083d0",
                800: "#dfacdf",
                900: "#efd6ef",
            },
            //blue
            blueAccent: {
                100: "#161d26",
                200: "#2b3a4c",
                300: "#415773",
                400: "#567499",
                500: "#6c91bf",
                600: "#89a7cc",
                700: "#a7bdd9",
                800: "#c4d3e5",
                900: "#e2e9f2",
            },
            //green
            greenAccent: {
                100: "#122823",
                200: "#245046",
                300: "#377869",
                400: "#49a08c",
                500: "#5bc8af",
                600: "#7cd3bf",
                700: "#9ddecf",
                800: "#bde9df",
                900: "#def4ef",
            },
        }),
});

// mui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode);
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
              ? {
                  // palette values for dark mode
                  primary: {
                    main: colors.primary[500],
                  },
                  secondary: {
                    main: colors.greenAccent[500],
                  },
                  neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100],
                  },
                  background: {
                    //default: colors.primary[500],
                    default: colors.primary[500],
                  },
                }
              : {
                  // palette values for light mode
                  primary: {
                    main: colors.primary[100],
                  },
                  secondary: {
                    main: colors.greenAccent[500],
                  },
                  neutral: {
                    dark: colors.grey[700],
                    main: colors.grey[500],
                    light: colors.grey[100],
                  },
                  background: {
                    default: "#fcfcfc",
                  },
                }),
        },
            typography: {
                fontFamily: ["Encode Sans Expanded", "sans-serif"].join(","),
                fontSize: 12,
                h1: {
                  fontFamily: ["Encode Sans Expanded", "sans-serif"].join(","),
                  fontSize: 40,
                },
                h2: {
                  fontFamily: ["Encode Sans Expanded", "sans-serif"].join(","),
                  fontSize: 32,
                },
                h3: {
                  fontFamily: ["Encode Sans Expanded", "sans-serif"].join(","),
                  fontSize: 24,
                },
                h4: {
                  fontFamily: ["Encode Sans Expanded", "sans-serif"].join(","),
                  fontSize: 20,
                },
                h5: {
                  fontFamily: ["Encode Sans Expanded", "sans-serif"].join(","),
                  fontSize: 16,
                },
                h6: {
                  fontFamily: ["Encode Sans Expanded", "sans-serif"].join(","),
                  fontSize: 14,
                },
            },
    };
};
          
// context for color mode
export const ColorModeContext = createContext({
toggleColorMode: () => {},
});

export const useMode = () => {
const [mode, setMode] = useState("dark");

const colorMode = useMemo(
    () => ({
    toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
);

const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
return [theme, colorMode];
};
