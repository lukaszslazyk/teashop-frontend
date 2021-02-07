import {
    FormControl,
    FormHelperText,
    MenuItem,
    Select,
} from "@material-ui/core";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../configuration/reduxSetup/rootReducer";
import { chooseSortOption } from "../../actions";
import { productsSortOptions } from "../../models";
import useStyles from "./styles";

interface Props {
    disabled: boolean;
}

const ProductSortOptionSelect = (props: Props) => {
    const chosenSortOptionName = useSelector(
        (state: RootState) => state.product.chosenSortOptionName
    );
    const dispatch = useDispatch();
    const classes = useStyles();

    const handleChange = (event: React.ChangeEvent<{ value: unknown }>) =>
        dispatch(chooseSortOption(event.target.value as string));

    return (
        <FormControl className={classes.root} disabled={props.disabled}>
            <Select
                value={chosenSortOptionName}
                onChange={handleChange}
                classes={{ select: classes.select }}
            >
                {productsSortOptions.map(sortOption => (
                    <MenuItem key={sortOption.name} value={sortOption.name}>
                        {sortOption.displayName}
                    </MenuItem>
                ))}
            </Select>
            <FormHelperText>Sort options</FormHelperText>
        </FormControl>
    );
};

export default ProductSortOptionSelect;
