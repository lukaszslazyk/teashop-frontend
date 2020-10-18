import { createMuiTheme } from "@material-ui/core/styles";

export const mainTheme = createMuiTheme({
    palette: {
        primary: {
            light: "#60ad5e",
            main: "#2e7d32",
            dark: "#005005",
            contrastText: "#fff",
        },
        secondary: {
            light: "#4c8c4a",
            main: "#1b5e20",
            dark: "#003300",
            contrastText: "#fff",
        },
    },
});
