import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        placementDateText: {
            fontSize: "1.1rem",
        },
    })
);

export default useStyles;
