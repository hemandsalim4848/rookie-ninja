import Animate from '../Animate';
import LegalHero from './LegalHero';
import QuickNav from './QuickNav';
import LegalSection from './LegalSection';
import { CheckCrossColumns, ContactBlock } from './blocks';

const navItems = [
  { id: 'introduction', label: 'Introduction & Acceptance' },
  { id: 'about', label: 'About This Website' },
  { id: 'eligibility', label: 'Eligibility' },
  { id: 'ip-rights', label: 'Intellectual Property Rights' },
  { id: 'permitted-use', label: 'Permitted & Prohibited Use' },
  { id: 'products-info', label: 'Products & Solutions Info' },
  { id: 'vendor-relationships', label: 'Vendor & Partner Relationships' },
  { id: 'contact-forms', label: 'Contact Forms & Inquiries' },
  { id: 'career-applications', label: 'Career Applications' },
  { id: 'third-party-links', label: 'Third-Party Links' },
  { id: 'cookies', label: 'Cookies & Tracking' },
  { id: 'disclaimer', label: 'Disclaimer of Warranties' },
  { id: 'liability', label: 'Limitation of Liability' },
  { id: 'indemnification', label: 'Indemnification' },
  { id: 'severability', label: 'Severability' },
  { id: 'entire-agreement', label: 'Entire Agreement' },
  { id: 'governing-law', label: 'Governing Law' },
  { id: 'contact', label: 'Contact Us' },
];

export default function TermsOfUseContent() {
  return (
    <main className="bg-white">
      <LegalHero
        title="Terms of Use"
        meta="Governing Law: United Arab Emirates  ·  Jurisdiction: Courts of Dubai, UAE"
      />

      <div className="max-w-3xl mx-auto px-6 py-16">
        <Animate type="fade-up">
          <p className="font-body text-[15px] text-gray-500 leading-[1.8] font-light mb-4">
            Welcome to Rookie Ninja Distribution. By accessing or browsing our website
            at www.rookie-ninja.com, you acknowledge that you have read, understood,
            and agree to be legally bound by these Terms of Use, along with our{' '}
            <a href="/privacy-policy" className="text-accent hover:text-[#0d8fb8] transition-colors">
              Privacy Policy
            </a>, which is incorporated herein by reference.
          </p>
          <p className="font-body text-[15px] text-gray-500 leading-[1.8] font-light mb-10">
            If you do not agree to these Terms, you must immediately discontinue use
            of the Website. These Terms apply to all users, including vendors,
            resellers, channel partners, corporate clients, and general visitors.
          </p>
        </Animate>

        <Animate type="fade-up" delay={100}>
          <QuickNav items={navItems} />
        </Animate>

        <LegalSection num="01" id="introduction" title="Introduction and Acceptance">
          <p>
            Welcome to Rookie Ninja Distribution (&quot;Rookie Ninja&quot;,
            &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing or
            browsing our website at www.rookie-ninja.com (&quot;Website&quot;), you
            acknowledge that you have read, understood, and agree to be legally bound
            by these Terms of Use (&quot;Terms&quot;), along with our Privacy Policy,
            which is incorporated herein by reference.
          </p>
          <p>
            If you do not agree to these Terms, you must immediately discontinue use
            of the Website. These Terms apply to all users, including vendors,
            resellers, channel partners, corporate clients, and general visitors.
          </p>
          <p>
            We reserve the right to update these Terms at any time. Continued use of
            the Website following any update constitutes your acceptance of the
            revised Terms. We recommend reviewing this page periodically.
          </p>
        </LegalSection>

        <LegalSection num="02" id="about" title="About This Website">
          <p>
            This Website is owned and operated by Rookie Ninja Distribution, a
            value-added IT distributor headquartered in Dubai, UAE. The Website serves
            as an informational platform to showcase our solutions, vendor portfolio,
            partner programs, career opportunities, and contact channels across our
            operational regions spanning the Middle East, Africa, CIS regions, and
            India.
          </p>
          <div className="text-navy/70 text-[13.5px] space-y-1">
            <p><strong className="text-navy">Head Office:</strong> Al Nasr Sports Building 02, Oud Metha Road, Dubai – UAE</p>
            <p><strong className="text-navy">Warehouse:</strong> Jebel Ali Freezone, Dubai, United Arab Emirates</p>
          </div>
        </LegalSection>

        <LegalSection num="03" id="eligibility" title="Eligibility">
          <p>By using this Website, you represent and warrant that:</p>
          <ul className="space-y-2.5">
            {[
              'You are at least 18 years of age, or accessing the Website under the supervision of a parent or legal guardian',
              'You have the legal authority to agree to these Terms on behalf of yourself or the organization you represent',
              'Your use of the Website complies with all applicable laws and regulations in your jurisdiction',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            We do not knowingly collect information from minors. If you believe a
            minor has submitted personal data through this Website, please contact us
            immediately.
          </p>
        </LegalSection>

        <LegalSection num="04" id="ip-rights" title="Intellectual Property Rights">
          <p>
            All content published on this Website — including but not limited to
            text, graphics, logos, product images, solution descriptions, videos,
            icons, data, and software — is the exclusive property of Rookie Ninja
            Distribution or is used with the permission of respective rights holders,
            and is protected under applicable intellectual property laws.
          </p>
          <CheckCrossColumns
            allowTitle="You May"
            allowItems={[
              'View and browse pages for personal or professional informational purposes',
              'Print or download a reasonable number of pages for non-commercial reference',
            ]}
            denyTitle="You May Not"
            denyItems={[
              'Reproduce, republish, or redistribute any content without prior written consent',
              'Use Website content for any commercial purpose or financial gain',
              'Remove or alter any copyright, trademark, or proprietary notices',
              'Frame or mirror any part of the Website without authorization',
            ]}
          />
          <p>
            All vendor brand names, trademarks, and product names referenced on this
            Website belong to their respective owners. Their appearance does not imply
            any endorsement beyond the authorized distribution relationship with
            Rookie Ninja.
          </p>
        </LegalSection>

        <LegalSection num="05" id="permitted-use" title="Permitted and Prohibited Use">
          <CheckCrossColumns
            allowTitle="Permitted Use"
            allowItems={[
              "Learn about Rookie Ninja's product portfolio and distribution solutions",
              'Identify vendor and partner relationships',
              'Submit inquiries, job applications, or partnership requests',
              'Access training and product information in your capacity as a vendor, reseller, or partner',
            ]}
            denyTitle="Prohibited Use"
            denyItems={[
              'Use the Website in any unlawful, fraudulent, or deceptive manner',
              'Scrape, mine, or harvest data using automated tools without written consent',
              'Introduce malware, viruses, or disruptive code',
              'Impersonate any person, company, or entity',
              "Solicit business from Rookie Ninja's partners or vendors in bad faith",
              'Attempt to reverse-engineer or extract proprietary information',
              'Circumvent any security, access restriction, or authentication measure',
            ]}
          />
        </LegalSection>

        <LegalSection num="06" id="products-info" title="Product and Solutions Information">
          <p>
            The products, solutions, and pricing information displayed on this Website
            are for informational purposes only and are subject to change without
            prior notice. Product availability may vary by country and region.
          </p>
          <p>
            Rookie Ninja operates as a value-added distributor and does not sell
            directly to end consumers through this Website. All transactions, pricing
            negotiations, and order placements are managed through authorized
            resellers, channel partners, or directly with our sales team.
          </p>
          <p>
            Product specifications, images, and descriptions are provided by vendors
            and may not always reflect the latest updates. We make reasonable efforts
            to maintain accuracy but do not guarantee that all information is
            complete, current, or error-free.
          </p>
        </LegalSection>

        <LegalSection num="07" id="vendor-relationships" title="Vendor and Partner Relationships">
          <p>
            Rookie Ninja distributes products from a range of technology vendors
            across Print, Scan, Gaming, Components, Software, Audio-Visual, Consumer
            Electronics, and IT Accessories categories. References to these vendors
            and their products on this Website are made in the context of our
            authorized distribution agreements and do not imply co-ownership, joint
            venture, or any relationship beyond that of distributor and vendor.
          </p>
          <p>
            If you are a vendor or reseller interested in a commercial relationship
            with Rookie Ninja, please use our official contact channels. Submitting an
            inquiry through the Website does not constitute or guarantee a contractual
            agreement.
          </p>
        </LegalSection>

        <LegalSection num="08" id="contact-forms" title="Contact Forms and Inquiries">
          <p>
            When you submit a contact form, inquiry, or career application through
            this Website, you consent to being contacted by Rookie Ninja Distribution
            using the information you have provided. Submission of any form does not
            create a binding obligation on the part of Rookie Ninja to respond,
            engage, or enter into any agreement.
          </p>
          <p>
            You warrant that all information submitted through this Website is
            truthful, accurate, and up to date.
          </p>
        </LegalSection>

        <LegalSection num="09" id="career-applications" title="Career Applications">
          <p>
            Our careers section invites applications from professionals interested in
            joining Rookie Ninja. Submitting an application through the Website does
            not guarantee an interview, offer of employment, or any formal engagement.
            All applications are reviewed at our discretion.
          </p>
          <p>
            Personal data submitted in applications is handled in accordance with our{' '}
            <a href="/privacy-policy" className="text-accent hover:text-[#0d8fb8] transition-colors">
              Privacy Policy
            </a>.
          </p>
        </LegalSection>

        <LegalSection num="10" id="third-party-links" title="Third-Party Links and Vendor Websites">
          <p>
            This Website may contain links to third-party websites, including vendor
            portals, partner platforms, and product pages. These links are provided
            for convenience and informational purposes only.
          </p>
          <p>
            Rookie Ninja does not control, endorse, or assume responsibility for the
            content, privacy practices, security, or accuracy of any third-party
            website. Accessing any linked website is done entirely at your own risk.
          </p>
        </LegalSection>

        <LegalSection num="11" id="cookies" title="Cookies and Tracking">
          <p>
            This Website uses cookies and similar tracking technologies to improve
            user experience, analyze traffic, and understand how visitors interact
            with our content. By continuing to use the Website, you consent to our use
            of cookies as described in our{' '}
            <a href="/privacy-policy" className="text-accent hover:text-[#0d8fb8] transition-colors">
              Privacy Policy
            </a>.
          </p>
          <p>
            You may disable cookies through your browser settings; however, doing so
            may affect the functionality of certain parts of the Website.
          </p>
        </LegalSection>

        <LegalSection num="12" id="disclaimer" title="Disclaimer of Warranties">
          <p>
            To the fullest extent permitted by applicable law, this Website and all
            its content are provided on an &quot;as is&quot; and &quot;as
            available&quot; basis without warranties of any kind, whether express or
            implied. Rookie Ninja does not warrant that:
          </p>
          <ul className="space-y-2.5">
            {[
              'The Website will be uninterrupted, timely, or free from errors',
              'Any information on the Website is complete, accurate, or current',
              'The Website or its servers are free from viruses or other harmful components',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </LegalSection>

        <LegalSection num="13" id="liability" title="Limitation of Liability">
          <p>
            To the maximum extent permitted under the laws of the United Arab
            Emirates, Rookie Ninja Distribution, its directors, employees, and
            representatives shall not be liable for:
          </p>
          <ul className="space-y-2.5">
            {[
              'Any indirect, incidental, consequential, or punitive damages arising from your use of, or inability to use, the Website',
              'Any loss of data, revenue, profits, or business opportunity resulting from reliance on information published on the Website',
              'Any unauthorized access to or alteration of your data or transmissions',
              'Any events beyond our reasonable control, including technical failures, cyberattacks, or force majeure',
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p>
            Nothing in these Terms shall limit Rookie Ninja&apos;s liability for
            fraud, gross negligence, or any matter that cannot be excluded or
            restricted under applicable UAE law.
          </p>
        </LegalSection>

        <LegalSection num="14" id="indemnification" title="Indemnification">
          <p>
            You agree to indemnify, defend, and hold harmless Rookie Ninja
            Distribution and its affiliates, officers, employees, and agents from and
            against any claims, liabilities, damages, losses, or expenses (including
            reasonable legal fees) arising out of or related to your violation of
            these Terms or misuse of the Website.
          </p>
        </LegalSection>

        <LegalSection num="15" id="severability" title="Severability">
          <p>
            If any provision of these Terms is found to be invalid, unlawful, or
            unenforceable under applicable law, that provision shall be deemed
            modified to the minimum extent necessary to make it enforceable, or
            severed if modification is not possible. The remaining provisions shall
            continue in full force and effect.
          </p>
        </LegalSection>

        <LegalSection num="16" id="entire-agreement" title="Entire Agreement">
          <p>
            These Terms, together with our Privacy Policy, constitute the entire
            agreement between you and Rookie Ninja Distribution with respect to your
            use of this Website and supersede all prior agreements, representations,
            and understandings on the same subject matter.
          </p>
        </LegalSection>

        <LegalSection num="17" id="governing-law" title="Governing Law and Jurisdiction">
          <ul className="space-y-2.5">
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span>These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates, as applied in the Emirate of Dubai</span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
              <span>Any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE</span>
            </li>
          </ul>
        </LegalSection>

        <LegalSection num="18" id="contact" title="Contact Us">
          <p>
            For any questions, concerns, or notices relating to these Terms of Use,
            please contact us using the details below.
          </p>
          <p>
            We are committed to addressing your concerns regarding these Terms. All
            formal notices relating to these Terms of Use should be directed to us in
            writing at the address above.
          </p>
        </LegalSection>
      </div>

      <ContactBlock />
    </main>
  );
}
