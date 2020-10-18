import { createStyles, makeStyles, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            width: 250,
        },
        cardMedia: {
            height: 200,
        },
    })
);

export default useStyles;
