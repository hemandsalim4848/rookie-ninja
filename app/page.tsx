import Navbar from "@/src/components/common/Navbar";
import Hero   from "@/src/components/homepage/Hero";
import ClientLogos from "@/src/components/homepage/ClientLogos";
import Footer from "@/src/components/common/Footer";
import TrialSection from "@/src/components/homepage/TrialSection"
import SolutionsSection from "@/src/components/homepage/SolutionsOffer";
import StatementSection from "@/src/components/homepage/StatementSection";
import VideoTrial from "@/src/components/homepage/VideoTrial"
import PartnerVendorSection from "@/src/components/homepage/PartnerVendorSection";
import MediaEventsSection from "@/src/components/homepage/MediaEvents";
import ContactForm from "@/src/components/homepage/ContactForm";
import StatementSectionII from "@/src/components/homepage/StatementSectionII";

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
      <StatementSectionII/>
      <ContactForm/>
      <Footer/>
      
    </>
  );
}