import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import "../styles/home.scss"

export default function Home() {
    return (
        <div className="home">
            <Banner/>
        </div>
    )
}

function Banner() {
    const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
    const controls = useAnimation();
    return (
        <div className="banner" ref={ref}>
            <img src={require("../images/banner.jpg")} alt="home-main"/>
        </div>
    )
}