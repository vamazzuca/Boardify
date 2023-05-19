import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
import { motion, useAnimation } from "framer-motion";
import "../styles/home.scss"
import { easing, fadeInRight, fadeInUp } from "../animations/variants";

export default function Home() {
    return (
        <div className="home">
            <Banner />
            <Featured />
            <Categories />
            <About />
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
            <img src={require("../images/banner.avif")} alt="home-main"/>
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

function Categories() {
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
            
            <motion.h1 variants={fadeInUp}>Switch Categories</motion.h1>
            <div className="cards">
                <motion.div
                    className="card"
                    variants={fadeInUp}
                    
                    whileHover={{
                        scale: 1.1,
                        transition: { type: "easeInOut", duration: 0.1 },
                    }}>
                    <Link to="/shop">
                        <img className="switch" src={require("../images/red.webp")} alt="" />
                        
                    </Link>
                    <p>Red Switch</p>
                </motion.div>

                <motion.div
                    className="card"
                    variants={fadeInUp}
                    whileHover={{
                        scale: 1.1,
                        transition: { type: "easeInOut", duration: 0.1 },
                    }}>
                    <Link to="/shop">
                        <img className="switch" src={require("../images/blue.jpg")} alt="" />
                        
                    </Link>
                    <p>Blue Switch</p>
                </motion.div>

                <motion.div
                    className="card"
                    variants={fadeInUp}
                    whileHover={{
                        scale: 1.1,
                        transition: { type: "easeInOut", duration: 0.1 },
                    }}>
                    <Link to="/shop">
                        <img className="switch" src={require("../images/black.jpg")} alt="" />
                        
                    </Link>
                    <p>Black Switch</p>
                </motion.div>

                <motion.div
                    className="card"
                    variants={fadeInUp}
                    whileHover={{
                        scale: 1.1,
                        transition: { type: "easeInOut", duration: 0.1 },
                    }}>
                    <Link to="/shop">
                        <img className="switch" src={require("../images/brown.png")} alt="" />
                        
                    </Link>
                    <p>Brown Switch</p>
                </motion.div>
            </div>
        </motion.div>
    )
}

function About() {
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
        <motion.div
            className="about"
            
            initial="hidden"
            animate={controls}
            ref={ref}
            variants={{
                visible: {
                    transition: {
                        delayChildren: 0.5,
                        staggerChildren: 0.5,
                        easing,
                    },
                },
            }}>
            <motion.h1 variants={fadeInUp}>About</motion.h1>
            <div className="about-info">
                <motion.div variants={fadeInUp} className="info-para">
                    <img src={require("../images/keyboard.jpg")} alt="" />
                    <h2>High Quality</h2>
                    <p>
                        Mechanical keyboards are a type of computer keyboard that uses individual mechanical switches for each key.
                        These switches are typically made of high-quality materials and are designed to offer a more tactile and
                        responsive typing experience compared to the membrane-based keyboards found in most laptops and low-end desktop keyboards.
                    </p>
                </motion.div>
                <motion.div variants={fadeInUp} className="info-para">
                    <img src={require("../images/switches.jpg")} alt="" />
                    <h2>Switch Types</h2>
                    <p>
                        Switch colors are commonly used to denote different switch types and characteristics.
                        Red: Linear switch with a light and smooth keystroke. No tactile bump or audible click.
                        Blue: Tactile switch with a pronounced bump and audible click.
                        Brown: Tactile switch with a light bump for feedback. No audible click.
                        Black: Linear switch with a slightly heavier keystroke. No tactile bump or audible click.
                    </p>
                </motion.div>
                <motion.div variants={fadeInUp} className="info-para">
                    <img src={require("../images/gaming.webp")} alt="" />
                    <h2>Made for Gaming</h2>
                    <p>
                        Mechanical keyboards are popular among gamers due to their faster response times and improved accuracy.
                        The tactile feedback helps gamers to feel when a key press is registered, and the
                        durability ensures the keyboard can withstand intense gaming sessions.
                    </p>
                </motion.div>
            </div>
        </motion.div>
    )
}