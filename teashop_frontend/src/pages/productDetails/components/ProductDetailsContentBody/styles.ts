import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        descriptionText: {
            textAlign: "justify",
        },
    })
);

export default useStyles;
