import Navbar from "@/src/components/common/Navbar";
import Hero   from "@/src/components/homepage/Hero";
import ClientLogos from "@/src/components/homepage/ClientLogos";
import Footer from "@/src/components/common/Footer";
import TrialSection from "@/src/components/homepage/TrialSection"
import SolutionsSection from "@/src/components/homepage/SolutionsOffer";
import StatementSection from "@/src/components/homepage/StatementSection";
import VideoTrial from "@/src/components/homepage/VideoTrial"
import ContactForm from "@/src/components/homepage/ContactForm";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero/>
      <ClientLogos/>
      <TrialSection/>
<SolutionsSection/>
<StatementSection/>
<VideoTrial/>
      <ContactForm/>
      <Footer/>
      
    </>
  );
}