import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: 250,
        },
        select: {
            "&:focus": {
                backgroundColor: "rgba(0,0,0,0)",
            },
        },
    })
);

export default useStyles;
