import React from "react";
import ErrorInfo from "../../shared/components/ErrorInfo";
import MainLayout from "../../layouts/main";

const NotFoundPage = () => (
    <MainLayout>
        <ErrorInfo errorMessage="The page does not exist." />
    </MainLayout>
);

export default NotFoundPage;
