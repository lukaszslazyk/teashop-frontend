import React from "react";
import Carousel from "react-material-ui-carousel";
import routing from "../../../../configuration/routing";
import { getImageFullUrl } from "../../../../shared/services/imageService";
import CarouselPanel from "../CarouselPanel";

const MainCarousel = () => (
    <Carousel interval={5000}>
        <CarouselPanel
            imageSrc={getImageFullUrl("images/home_page_carousel_image_1.png")}
            imageTitle="Panel 1"
            titlePrimary="Welcome to Tea shop"
            titleSecondary="Home of world's finest tea"
            routePath={routing.home}
        />
        <CarouselPanel
            imageSrc={getImageFullUrl("images/home_page_carousel_image_2.png")}
            imageTitle="Panel 2"
            titlePrimary="Discover green tea"
            titleSecondary="Enjoy health benefits given to you by nature"
            routePath={routing.browseGreenTea}
        />
        <CarouselPanel
            imageSrc={getImageFullUrl("images/home_page_carousel_image_3.png")}
            imageTitle="Panel 3"
            titlePrimary="Enjoy rich taste of black tea"
            titleSecondary="Explore our carefully selected collection of flavours"
            routePath={routing.browseBlackTea}
        />
    </Carousel>
);

export default MainCarousel;
