import Header from "./components/Header";
import FAQ from "./components/FAQ";
import Comparision from "./components/Comparision";
import Footer from "./components/Footer";
import AboutComp from "./components/AboutComp";
import Contact from "./components/Contact";

export default function AboutPage() {
    return (
        <>
            <Header />

            <div style={{ padding: '3% 10%' }}>
                <h2 style={{ fontWeight: 600 }}>About us</h2>

                <p>
                    {/* We help Businesses to set up their presence by providing our services of sales, advertising space, consultation. */}

                    We help businesses establish a strong presence by offering a range of professional services, including sales support, advertising space, and expert consultation. Our team assists in creating strategic marketing campaigns, optimizing brand visibility, and driving customer engagement. Whether you're looking to expand your reach, increase sales, or enhance your brand image, we provide tailored solutions to meet your business needs. With our expertise, we ensure that your business stands out in a competitive market and achieves long-term success.
                </p>
            </div>

            <Footer />
        </>
    )
}