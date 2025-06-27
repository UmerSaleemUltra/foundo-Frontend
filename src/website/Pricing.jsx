import Start from "../user-dashboard/pages/Start";
import AboutComp from "./components/AboutComp";
import Comparison from "./components/Comparision";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function Pricing() {
    return (
        <>
            <Header />
            <Start />
            <Comparison />
         
            <div style={{ marginTop: '-10%' }}>
                <Contact />
            </div>
                        <AboutComp />

            <Footer />
        </>
    )
}