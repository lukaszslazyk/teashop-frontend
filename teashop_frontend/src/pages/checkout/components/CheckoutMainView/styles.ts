import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        stepper: {
            backgroundColor: "transparent",
        },
    })
);

export default useStyles;
