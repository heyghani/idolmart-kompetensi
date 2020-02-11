import React, { Component } from "react";
import Slider from "react-slick";

const items = [
    {
        src: require("assets/img/theme/img-1-1200x1000.jpg"),
        altText: "",
        caption: "",
        header: ""
    },
    {
        src: require("assets/img/theme/img-2-1200x1000.jpg"),
        altText: "",
        caption: "",
        header: ""
    },
    {
        src: require("assets/img/idolmart.jpeg"),
        altText: "",
        caption: "",
        header: ""
    }
];

export default class Carousel extends Component {


    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true
        };
        return (
            <div>
                <Slider items={items} {...settings}>

                </Slider>
            </div>
        );
    }
}