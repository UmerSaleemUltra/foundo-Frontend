import Header from "./components/Header";
import FAQ from "./components/FAQ";
import Comparision from "./components/Comparision";
import Footer from "./components/Footer";
import AboutComp from "./components/AboutComp";
import Contact from "./components/Contact";

export default function ContactPage() {
    return (
        <>
            <Header />
            <div style={{ marginTop: '-6%', marginBottom: '3%' }}>
                <Contact screen='contact' />
            </div>
            <AboutComp />
            <Footer />
        </>
    )
}