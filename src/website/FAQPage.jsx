import Header from "./components/Header";
import FAQ from "./components/FAQ";
import Comparision from "./components/Comparision";
import Footer from "./components/Footer";
import AboutComp from "./components/AboutComp";
import Contact from "./components/Contact";

export default function FAQPage() {
    return (
        <>
            <Header />
            <FAQ />
           
            <div style={{ marginTop: '-10%' }}>
                <Contact />
            </div>
             <div style={{ marginTop: '5%' }}>
                <AboutComp />
            </div>
            <Footer />
        </>
    )
}