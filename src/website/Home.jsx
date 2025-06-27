import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Brands from "./components/Brands";
import FAQ from "./components/FAQ";
import Comparision from "./components/Comparision";
import Footer from "./components/Footer";
import OneStopPricing from "./components/OneStopPricing";
import AddonServices from "./components/AddonServices";
import AboutComp from "./components/AboutComp";
import Contact from "./components/Contact";
import StateFee from "./components/StateFee";
import Testimonials from "./components/Testimonials";
import CouponModal from "./components/CouponModal";
import { useEffect, useState } from "react";
import LogoSlider from "./components/LogoSlider";

export default function Home() {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setTimeout(() => {
            setOpen(true)
        }, 5000);
    }, [])


    return (
        <>
            <CouponModal open={open} setOpen={setOpen} />
            <Header />
            <HeroSection />
            <OneStopPricing />
            <Brands />
            <Comparision />
            {/* <Testimonials />
            <LogoSlider /> */}
            <AddonServices />
            <StateFee />
            <FAQ />
            <Contact />
           <AboutComp />
            <Footer />
        </>
    )
}