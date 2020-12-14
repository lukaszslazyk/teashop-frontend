import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        hidden: {
            display: "none",
        },
    })
);

export default useStyles;
