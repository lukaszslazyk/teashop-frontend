import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        content: {
            justifyContent: "center",
            alignItems: "center",
            width: 200,
            height: 60,
        },
        grow: {
            flexGrow: 1,
        },
    })
);

export default useStyles;
