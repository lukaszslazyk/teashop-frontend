import React from "react";
import MainLayout from "../../layouts/main";
import ErrorInfo from "../../shared/components/ErrorInfo";

const NotFoundPage = () => (
    <MainLayout>
        <ErrorInfo errorMessage="The page does not exist." />
    </MainLayout>
);

export default NotFoundPage;
