import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import "../styles/home.scss"
import { easing, fadeInDown, fadeInLeft, fadeInRight, fadeInUp } from "../animations/variants";

export default function Home() {
    return (
        <div className="home">
            <Banner />
            <Featured/>
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
    const [ref, inView] = useInView({ threshold: 0.4, triggerOnce: true });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [controls, inView]);
    return (
        <motion.div
            className="featured"
            
            initial="hidden"
            animate={controls}
            ref={ref}
            variants={{
                visible: {
                    transition: {
                        staggerChildren: 0.3,
                        easing,
                    },
                },
            }}>
            
            <motion.h1 variants={fadeInUp}>Featured Items</motion.h1>
            <div className="cards">
                <motion.div
                    className="card"
                    variants={fadeInUp}
                    
                    whileHover={{
                        scale: 1.1,
                        transition: { type: "easeInOut", duration: 0.1 },
                    }}>
                    <Link to="/shop">
                        <img src={require("../images/blackshark.png")} alt="" />
                        
                    </Link>
                    <p>Black Shark</p>
                </motion.div>

                <motion.div
                    className="card"
                    variants={fadeInUp}
                    whileHover={{
                        scale: 1.1,
                        transition: { type: "easeInOut", duration: 0.1 },
                    }}>
                    <Link to="/shop">
                        <img src={require("../images/corsairstrafe.png")} alt="" />
                        
                    </Link>
                    <p>Corsair Strafe</p>
                </motion.div>

                <motion.div
                    className="card"
                    variants={fadeInUp}
                    whileHover={{
                        scale: 1.1,
                        transition: { type: "easeInOut", duration: 0.1 },
                    }}>
                    <Link to="/shop">
                        <img src={require("../images/reddragon.png")} alt="" />
                        
                    </Link>
                    <p>Red Dragon</p>
                </motion.div>

                <motion.div
                    className="card"
                    variants={fadeInUp}
                    whileHover={{
                        scale: 1.1,
                        transition: { type: "easeInOut", duration: 0.1 },
                    }}>
                    <Link to="/shop">
                        <img src={require("../images/steelseriesapexpro.png")} alt="" />
                        
                    </Link>
                    <p>Steel Series Apex Pro</p>
                </motion.div>
            </div>
        </motion.div>
    )
}