import { useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../configuration/reduxSetup/rootReducer";

const internationalPhoneNumberPattern =
    /^((\+\d{1,3}(-| )?\(?\d\)?(-| )?\d{1,5})|(\(?\d{2,6}\)?))(-| )?(\d{3,4})(-| )?(\d{4})(( x| ext)\d{1,5}){0,1}$/;

const useLogic = () => {
    const countries = useSelector(
        (state: RootState) => state.order.orderMeta.countries
    );
    const { register, errors, control } = useFormContext();

    const validatePhoneNumber = (input: string): string | undefined =>
        (!input.match(internationalPhoneNumberPattern)
            ? "Phone number is incorrect"
            : undefined);

    return {
        countries,
        errors,
        control,
        register,
        validatePhoneNumber,
    };
};

export default useLogic;
