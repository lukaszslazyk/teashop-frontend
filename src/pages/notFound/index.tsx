import React from "react";
import ErrorInfo from "../../common/components/ErrorInfo";
import MainLayout from "../../layout/main";

const NotFoundPage = () => {
    return (
        <MainLayout>
            <ErrorInfo errorMessage="The page does not exist." />
        </MainLayout>
    );
};

export default NotFoundPage;
