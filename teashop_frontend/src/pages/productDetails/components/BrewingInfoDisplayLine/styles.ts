import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        lineContainer: {
            display: "flex",
            alignItems: "center",
            flexWrap: "nowrap",
        },
        icon: {
            fontSize: "1.5rem",
            display: "flex",
            color: "white",
        },
        iconContainer: {
            width: "3.25rem",
            height: "3.25rem",
            display: "flex",
            flexShrink: 0,
            justifyContent: "center",
            alignItems: "center",
            marginRight: theme.spacing(2),
            backgroundColor: theme.palette.primary.main,
            borderRadius: "50%",
        },
        text: {
            wordBreak: "break-word",
        },
    })
);

export default useStyles;
