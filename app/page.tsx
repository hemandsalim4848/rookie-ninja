import Navbar from "@/src/components/Navbar";
import Hero   from "@/src/components/Hero";
import ClientLogos from "@/src/components/ClientLogos";
import Solutions from "@/src/components/Solutions";
import Footer from "@/src/components/Footer";
import TrialSection from "@/src/components/TrialSection"
import SolutionsSection from "@/src/components/SolutionsOffer";
import StatementSection from "@/src/components/StatementSection";
import VideoTrial from "@/src/components/VideoTrial"
import PartnerVendorSection from "@/src/components/PartnerVendorSection";
import MediaEventsSection from "@/src/components/MediaEvents";
import ContactForm from "@/src/components/ContactForm";
import StatementSectionII from "@/src/components/StatementSectionII";

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
<PartnerVendorSection/>
{/* <MediaEventsSection/> */}

      {/* <Solutions/> */}
      <StatementSectionII/>
      <ContactForm/>
      <Footer/>
      
    </>
  );
}