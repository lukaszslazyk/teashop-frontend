import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        radioContainer: {
            display: "flex",
            alignItems: "center",
            marginTop: theme.spacing(2),
            padding: theme.spacing(1),
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            "&:nth-child(1)": {
                marginTop: 0,
            },
        },
        grow: {
            flexGrow: 1,
        },
    })
);

export default useStyles;
