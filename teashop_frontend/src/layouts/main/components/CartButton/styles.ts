import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        iconButton: {
            color: "white",
        },
        progressIndicator: {
            color: "white",
        },
    })
);

export default useStyles;
