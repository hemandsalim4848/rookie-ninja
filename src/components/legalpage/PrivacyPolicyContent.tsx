import Animate from '../Animate';
import LegalHero from './LegalHero';
import QuickNav from './QuickNav';
import LegalSection from './LegalSection';
import { Bullets, InfoCards, IconGrid, ContactBlock } from './blocks';

const navItems = [
  { id: 'who-we-are', label: 'Who We Are' },
  { id: 'information-we-collect', label: 'What Information We Collect' },
  { id: 'how-we-use', label: 'How We Use Your Information' },
  { id: 'how-we-share', label: 'How We Share Your Information' },
  { id: 'cookies', label: 'Cookies & Tracking' },
  { id: 'data-retention', label: 'Data Retention' },
  { id: 'data-security', label: 'Data Security' },
  { id: 'your-rights', label: 'Your Rights' },
  { id: 'international-transfers', label: 'International Transfers' },
  { id: 'childrens-privacy', label: "Children's Privacy" },
  { id: 'third-party-websites', label: 'Third-Party Websites' },
  { id: 'changes', label: 'Changes to This Policy' },
  { id: 'contact', label: 'Contact Us' },
];

export default function PrivacyPolicyContent() {
  return (
    <main className="bg-white">
      <LegalHero
        title="Privacy Policy"
        meta="Effective Date: June 4, 2026  ·  Last Updated: June 4, 2026"
      />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <Animate type="fade-up">
          <p className="font-body text-[15px] text-gray-500 leading-[1.8] font-light mb-4">
            At Rookie Ninja Distribution, we respect your privacy and are committed to
            handling any personal information you share with us responsibly,
            transparently, and securely. This Privacy Policy explains what information
            we collect through our website at www.rookie-ninja.com, how we use it, who
            we may share it with, and what rights you have over it.
          </p>
          <p className="font-body text-[15px] text-gray-500 leading-[1.8] font-light mb-10">
            By using this Website, you acknowledge that you have read and understood
            this Privacy Policy. If you do not agree with how we handle personal data,
            please discontinue your use of the Website.
          </p>
        </Animate>

        <Animate type="fade-up" delay={100}>
          <QuickNav items={navItems} />
        </Animate>

        <LegalSection num="01" id="who-we-are" title="Who We Are">
          <p>
            Rookie Ninja Distribution is a value-added IT distributor headquartered in
            Dubai, UAE. We serve vendors, resellers, channel partners, and corporate
            clients across the Middle East, Africa, CIS regions, and India. We are the
            data controller responsible for the personal information collected through
            this Website.
          </p>
          <div className="text-navy/70 text-[13.5px] space-y-1">
            <p><strong className="text-navy">Registered Office:</strong> Al Nasr Sports Building 02, Oud Metha Road, Dubai – UAE</p>
            <p><strong className="text-navy">Warehouse:</strong> Jebel Ali Freezone, Dubai, United Arab Emirates</p>
            <p><strong className="text-navy">Phone:</strong> +971 4 296 5256</p>
            <p><strong className="text-navy">Website:</strong> www.rookie-ninja.com</p>
          </div>
        </LegalSection>

        <LegalSection num="02" id="information-we-collect" title="What Information We Collect">
          <p>
            We collect two categories of information through this Website: information
            you provide to us directly, and information we collect automatically.
          </p>

          <p className="font-semibold text-navy">2.1 Information You Provide Directly</p>
          <p>
            When you interact with our Website — whether by submitting a contact form,
            applying for a job, requesting a partnership, or reaching out to our team —
            you may provide us with:
          </p>
          <Bullets items={[
            'Identity information: Full name, job title, and company name',
            'Contact information: Email address, phone number, and mailing address',
            'Professional information: Resumes, LinkedIn profiles, or other career-related materials submitted through our careers section',
            'Business information: Company type, region of operation, product interest areas, and vendor requirements',
            'Inquiry content: The subject and body of any message submitted through our contact forms',
          ]} />
          <p>
            You are not required to provide personal information to browse the Website.
            However, failing to provide certain details may limit our ability to respond
            to your inquiry or process your request.
          </p>

          <p className="font-semibold text-navy">2.2 Information We Collect Automatically</p>
          <p>
            When you visit and navigate our Website, we may automatically collect
            certain technical and behavioral data, including:
          </p>
          <Bullets items={[
            'Device and browser information: Device type, operating system, browser type and version',
            'Usage data: Pages visited, time spent on each page, links clicked, and navigation paths',
            'IP address and location data: Your approximate geographic location based on your IP address',
            'Referral data: The website or search query that directed you to our Website',
          ]} />
          <p>
            This data is typically collected through cookies, web beacons, and similar
            tracking technologies, as described in Section 5 below.
          </p>

          <p className="font-semibold text-navy">2.3 Information from Third Parties</p>
          <p>
            In some cases, we may receive information about you from third parties,
            such as vendor partners who refer resellers or clients to us, publicly
            available professional directories used to verify partnership eligibility,
            or analytics and advertising service providers who support our website
            operations. We handle any third-party sourced data in accordance with this
            Privacy Policy and applicable law.
          </p>
        </LegalSection>

        <LegalSection num="03" id="how-we-use" title="How We Use Your Information">
          <p>Rookie Ninja uses the information we collect for the following purposes:</p>
          <InfoCards items={[
            { title: 'To respond to inquiries and communications', desc: 'When you contact us through the Website, we use your details to respond to your query in a timely and appropriate manner.' },
            { title: 'To evaluate partnership and vendor applications', desc: 'If you reach out about becoming a reseller, channel partner, or vendor, we use the information provided to assess compatibility and follow up accordingly.' },
            { title: 'To process career applications', desc: 'Information submitted through our careers section is used solely for recruitment evaluation and internal HR processes.' },
            { title: 'To improve our Website', desc: 'Automatically collected usage data helps us understand how visitors navigate the site, identify areas for improvement, and enhance the overall user experience.' },
            { title: 'To analyze website performance', desc: 'We use aggregated, anonymized analytics to monitor traffic patterns, content performance, and regional engagement.' },
            { title: 'To comply with legal obligations', desc: 'We may process or retain certain information as required under applicable UAE law, regulatory requirements, or legitimate business obligations.' },
            { title: 'To maintain security', desc: 'We use technical data to detect, investigate, and prevent fraudulent activity, unauthorized access, and other security threats.' },
          ]} />
          <p>
            We do not use personal information submitted through this Website for
            unsolicited marketing communications without your prior consent.
          </p>
        </LegalSection>

        <LegalSection num="04" id="how-we-share" title="How We Share Your Information">
          <p>
            Rookie Ninja does not sell, rent, or trade your personal information to
            third parties. We may share your information in the following limited
            circumstances:
          </p>
          <InfoCards items={[
            { title: 'Within our organization', desc: 'Information may be shared with relevant internal teams — such as sales, business development, HR, or management — strictly on a need-to-know basis relevant to your interaction with us.' },
            { title: 'With trusted service providers', desc: 'We may engage third-party providers to support our website operations, analytics, email infrastructure, or IT systems. These providers are permitted to use your data only as instructed by us and in accordance with this Privacy Policy.' },
            { title: 'With vendor and partner contacts', desc: "If your inquiry relates to a specific vendor we distribute for, we may share relevant details with that vendor's authorized representatives to facilitate a commercial discussion. We will inform you when this is the case." },
            { title: 'For legal compliance', desc: 'We may disclose personal information if required to do so by applicable law, regulation, court order, or governmental authority in the UAE or any jurisdiction in which we operate.' },
            { title: 'In a business reorganization', desc: 'In the event of a merger, acquisition, or transfer of business assets, personal data held by Rookie Ninja may be transferred to the successor entity, subject to equivalent data protection obligations.' },
          ]} />
          <p>
            In all cases, we take reasonable steps to ensure that any party receiving
            personal data from us handles it responsibly and securely.
          </p>
        </LegalSection>

        <LegalSection num="05" id="cookies" title="Cookies & Tracking Technologies">
          <p className="font-semibold text-navy">5.1 What Are Cookies</p>
          <p>
            Cookies are small text files placed on your device when you visit a
            website. They help the website recognize your device, remember your
            preferences, and understand how you interact with content. We also use
            similar technologies such as web beacons and analytics scripts.
          </p>

          <p className="font-semibold text-navy">5.2 Types of Cookies We Use</p>
          <InfoCards items={[
            { title: 'Strictly Necessary', desc: 'Essential for the Website to function correctly. Enable core features such as page navigation and security. These cannot be disabled.' },
            { title: 'Performance & Analytics', desc: 'Help us understand how visitors use our Website by collecting aggregated, anonymized data. We use tools such as Google Analytics for this purpose.' },
            { title: 'Functional', desc: 'Remember your preferences and settings to provide a more personalized experience during your visit.' },
            { title: 'Marketing & Targeting', desc: 'Help us deliver relevant content to audiences who have previously visited our Website. Only activated with your consent where required by applicable law.' },
          ]} />

          <p className="font-semibold text-navy">5.3 Managing Your Cookie Preferences</p>
          <p>
            You may adjust your cookie settings at any time through your browser
            preferences. Most browsers allow you to block or delete cookies. Please
            note that disabling certain cookies may affect the functionality of some
            areas of the Website. Where required by applicable law, we will request
            your consent before placing non-essential cookies on your device.
          </p>
        </LegalSection>

        <LegalSection num="06" id="data-retention" title="Data Retention">
          <p>
            We retain personal information only for as long as is necessary to fulfill
            the purpose for which it was collected, or as required under applicable
            UAE law and regulatory obligations.
          </p>
          <Bullets items={[
            'Inquiry & contact form data is typically retained for up to 2 years from the date of submission, unless an ongoing business relationship is established.',
            'Career application data is retained for 1 year from the date of submission, unless the applicant is engaged or specifically requests earlier deletion.',
            'Automatically collected analytics data is retained in anonymized or aggregated form and does not identify individual users.',
          ]} />
          <p>
            When personal data is no longer needed, we securely delete or anonymize it
            in line with our internal data management practices.
          </p>
        </LegalSection>

        <LegalSection num="07" id="data-security" title="Data Security">
          <p>
            Rookie Ninja takes the security of your personal information seriously. We
            implement appropriate technical and organizational measures to protect
            your data against unauthorized access, disclosure, alteration, or
            destruction.
          </p>
          <Bullets items={[
            'Secure HTTPS encryption across the Website',
            'Access controls restricting personal data to authorized personnel only',
            'Regular review of our data handling and security practices',
            'Use of reputable, security-certified third-party service providers',
          ]} />
          <p>
            While we take all reasonable precautions, no method of transmission over
            the internet is completely secure. We cannot guarantee the absolute
            security of information transmitted to or from our Website. If you believe
            your data has been compromised in connection with our Website, please
            contact us immediately.
          </p>
        </LegalSection>

        <LegalSection num="08" id="your-rights" title="Your Rights">
          <p>
            Depending on your location and applicable law, you may have the following
            rights in relation to your personal data:
          </p>
          <IconGrid items={[
            { icon: '⊙', title: 'Right of Access', desc: 'Request a copy of the personal information we hold about you.' },
            { icon: '✎', title: 'Right to Rectification', desc: 'Request that we correct any inaccurate or incomplete information we hold.' },
            { icon: '✕', title: 'Right to Erasure', desc: 'Request deletion of your personal data where it is no longer needed, subject to legal retention obligations.' },
            { icon: '⊘', title: 'Right to Restrict Processing', desc: 'Request that we limit how we use your data while a dispute is resolved.' },
            { icon: '⚑', title: 'Right to Object', desc: 'Object to processing of your personal data where we rely on legitimate interests as the legal basis.' },
            { icon: '↺', title: 'Right to Withdraw Consent', desc: 'Where processing is based on your consent, withdraw it at any time without affecting prior lawful processing.' },
          ]} />
          <p>
            To exercise any of the above rights, please contact us using the details in
            Section 13. We will respond in accordance with applicable UAE data
            protection law, including the UAE Federal Decree-Law No. 45 of 2021 on the
            Protection of Personal Data (PDPL).
          </p>
        </LegalSection>

        <LegalSection num="09" id="international-transfers" title="International Data Transfers">
          <p>
            Rookie Ninja operates primarily within the UAE, with business activity
            spanning the Middle East, Africa, CIS regions, and India. In the course of
            our operations, your personal data may be accessed or processed by our
            teams or service providers located outside the UAE.
          </p>
          <p>
            Where such international transfers occur, we take appropriate steps to
            ensure your data receives a comparable level of protection, including
            contractual safeguards with service providers as required under applicable
            law. We do not transfer personal data internationally for purposes beyond
            those described in this Privacy Policy.
          </p>
        </LegalSection>

        <LegalSection num="10" id="childrens-privacy" title="Children's Privacy">
          <p>
            This Website is intended for professional and business use and is not
            directed at individuals under the age of 18. We do not knowingly collect
            personal information from minors.
          </p>
          <p>
            If you believe that a minor has submitted personal information through our
            Website, please contact us and we will take prompt steps to delete that
            information from our records.
          </p>
        </LegalSection>

        <LegalSection num="11" id="third-party-websites" title="Third-Party Websites">
          <p>
            Our Website may contain links to external websites, including vendor
            portals, partner platforms, and product pages operated by third parties.
            This Privacy Policy applies only to our Website.
          </p>
          <p>
            We are not responsible for the privacy practices or content of any
            third-party websites. We encourage you to review the privacy policies of
            any external sites you visit before submitting personal information.
          </p>
        </LegalSection>

        <LegalSection num="12" id="changes" title="Changes to This Privacy Policy">
          <p>
            We may update this Privacy Policy from time to time to reflect changes in
            our data practices, applicable law, or Website functionality. When we make
            material changes, we will update the &quot;Last Updated&quot; date at the
            top of this page.
          </p>
          <p>
            We encourage you to review this page periodically to stay informed about
            how we protect your data. Your continued use of the Website following any
            update constitutes your acceptance of the revised Privacy Policy.
          </p>
        </LegalSection>

        <LegalSection num="13" id="contact" title="Contact Us">
          <p>
            If you have any questions, concerns, or requests related to this Privacy
            Policy or the handling of your personal data, please reach out to us using
            the details below.
          </p>
          <p>
            We are committed to addressing your privacy concerns and will respond to
            all legitimate requests as promptly as possible and in accordance with UAE
            data protection law.
          </p>
        </LegalSection>
      </div>

      <ContactBlock />
    </main>
  );
}
