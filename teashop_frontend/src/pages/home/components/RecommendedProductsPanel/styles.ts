import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        title: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        titleLeftIcon: {
            marginRight: theme.spacing(1),
        },
        titleRightIcon: {
            marginLeft: theme.spacing(1),
        },
    })
);

export default useStyles;
