import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import "../styles/home.scss"
import { easing, fadeInDown, fadeInLeft, fadeInRight, fadeInUp } from "../animations/variants";

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

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);
    return (
        <div className="banner" ref={ref}>
            <motion.div
                className="info"
                initial="hidden"
                animate={controls}
                variants={{
                    visible: {
                        transition: {
                            delayChildren: 0.5,
                            staggerChildren: 0.5,
                            easing,
                        },
                    },
                }}>
                <motion.h1 variants={fadeInRight}>
                    The Best Mechanical Keyboards for Work and Play
                </motion.h1>
                <motion.h2 variants={fadeInRight}>
                    Discover the latest in high-performace keyboards today
                </motion.h2>
                <Link to="/shop">
                    <motion.div className="shop-button" variants={fadeInUp}>
                        Shop Now
                    </motion.div>
                </Link>
            </motion.div>
            <img src={require("../images/banner.jpg")} alt="home-main"/>
        </div>
    )
}

function Featured() {
    return (
        <div className="featured">
            
        </div>
    )
}