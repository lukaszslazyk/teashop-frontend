import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        media: {
            minHeight: 525,
            [theme.breakpoints.down("sm")]: {
                minHeight: 400,
            },
            [theme.breakpoints.down("xs")]: {
                minHeight: 300,
            },
        },
        mediaCaption: {
            position: "absolute",
            bottom: 30,
            width: "100%",
            padding: 25,
            [theme.breakpoints.up("md")]: {
                paddingLeft: 35,
            },
            backgroundColor: "black",
            color: "white",
            opacity: 0.7,
            transition: "0.3s",
            "&:hover": {
                opacity: 0.8,
                cursor: "pointer",
            },
        },
    })
);

export default useStyles;
