import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'

const updates = [
  // ── SOFTWARE ────────────────────────────────────────────────────────────────
  {
    slug: 'kodak-capture-pro-software',
    description: `[stats: High-volume§Document capture | Multi-brand§Scanner support | ECM ready§System integration]

Kodak Capture Pro Software is a powerful document capture solution designed to help organisations efficiently convert paper documents into high-quality digital information. Built to enhance productivity and streamline document workflows, the software enables businesses to capture, process, index, and distribute documents with greater speed and accuracy — from small offices to large enterprise deployments.

## Enhance Scanning Efficiency
Organisations often face challenges when dealing with large volumes of paper records, forms, invoices, contracts, and customer documents. Kodak Capture Pro simplifies these processes by automating key capture tasks and optimising scanner performance. Its intuitive interface allows users to quickly scan, organise, and prepare documents for storage or further processing, helping teams work more efficiently and consistently across every department.

## Superior Image Quality and Accuracy
Document quality plays a critical role in successful digital transformation. Kodak Capture Pro incorporates advanced image processing technologies that automatically improve scanned images by enhancing clarity, correcting imperfections, and optimising readability. This ensures that captured documents are suitable for archiving, retrieval, OCR processing, and compliance requirements — while minimising the need for manual adjustments or re-scanning.

## Seamless Workflow Integration
Designed to fit into existing business environments, Kodak Capture Pro integrates with a wide range of document management systems, enterprise applications, and business workflows. Captured information can be routed directly to designated repositories, making it easier for teams to access, share, and manage critical business documents. This seamless integration helps organisations accelerate information flow and improve collaboration across departments.

## Scalable Solution for Growing Organisations
As business requirements evolve, document capture demands often increase. Kodak Capture Pro offers a scalable platform capable of supporting growing workloads without compromising performance. Whether managing daily office documents or processing large-scale archival projects, the software provides the flexibility and reliability needed to support long-term digital transformation initiatives without costly infrastructure changes.

## Improve Productivity and Reduce Costs
By automating document capture and reducing dependence on manual data entry, Kodak Capture Pro helps organisations improve operational efficiency while lowering administrative costs. Faster document processing, improved data accuracy, and streamlined workflows enable employees to focus on higher-value tasks — ultimately contributing to better business performance and a more connected, responsive workplace.`,
  },
  {
    slug: 'kodak-info-input-solution',
    description: `[stats: AI-powered§Document processing | Low-code§Workflow setup | End-to-end§Data automation]

KODAK Info Input Solution is an advanced Intelligent Document Processing platform designed to automate the entire journey from document capture to business-ready data. Built for organisations handling large volumes of documents from multiple sources, it transforms information from paper documents, emails, scanned files, mobile uploads, and digital forms into accurate, actionable data that integrates seamlessly with business applications and workflows.

## Automate the Entire Document Journey
Powered by AI-driven automation, Info Input Solution classifies, extracts, validates, and processes information from structured, semi-structured, and unstructured documents without manual intervention. It eliminates the bottlenecks that slow down paper-heavy teams by recognising document types automatically and routing each file to the correct destination — reducing errors and accelerating the flow of information across every operation.

## Advanced Recognition Technologies
At the core of Info Input Solution is a powerful combination of OCR, ICR, barcode recognition, natural language processing, and intelligent data extraction. These technologies work together to ensure accurate processing even for complex or inconsistent document types, building confidence in the data that reaches your business systems and significantly reducing the cost of manual review and correction.

## Flexible, Low-Code Configuration
Info Input Solution is built on a secure, browser-based architecture that enables access from virtually anywhere. Its low-code configuration tools allow teams to design and deploy customised workflows quickly, without extensive development resources. Organisations can adapt processes as their needs change — adding new document types, routing rules, or integration points without lengthy development cycles or heavy IT involvement.

## Integrates with Your Existing Systems
The platform connects with leading cloud AI services and major business applications, enabling end-to-end automation for invoice processing, claims management, HR onboarding, records management, and compliance workflows. Whether your organisation runs on ERP, ECM, SharePoint, or cloud-based platforms, Info Input Solution is designed to fit into the environment you already have rather than requiring you to rebuild around it.

## Built for Regulated and Document-Intensive Industries
From finance and healthcare to insurance, legal services, and government, Info Input Solution is trusted in environments where accuracy, security, and audit trails are non-negotiable. It helps organisations reduce operational costs, improve data accuracy, accelerate information access, and meet regulatory requirements — turning document-intensive processes into a competitive advantage rather than an operational burden.`,
  },

  // ── E1000 SERIES ────────────────────────────────────────────────────────────
  {
    slug: 'kodak-e1030-document-scanner',
    description: `[stats: 30 ppm§Scan speed | 600 dpi§Resolution | 4,000§Pages per day]

The Kodak E1030 Document Scanner is a compact, efficient, and reliable desktop scanner designed for businesses, home offices, workgroups, and reception areas. Part of the E1000 Series, it captures information from paper and sends it wherever it needs to go — integrating smoothly with your existing applications, network, and cloud services right out of the box.

## One-Touch Scanning for Up to Nine Jobs
The E1030 features a simple numeric display that enables one-touch scanning for up to nine different preconfigured jobs. Smart Touch technology makes it effortless to scan directly to file locations, popular cloud services, email, networked printers, and third-party applications — all from a single button press without navigating menus or switching between screens.

## Largest Feeder Capacity in Its Class
When you need to scan more in a single batch, the E1030 delivers with the largest automatic document feeder capacity in its class. This means fewer interruptions, less time reloading documents, and a smoother scanning experience for everyone who relies on it throughout the working day.

## Handle a Wide Range of Document Types
The E1030 is not limited to standard office paper. It handles a variety of document types and sizes — including passports and fragile documents via optional accessories. Multiple driver compatibility across TWAIN, ISIS, WIA, and SANE ensures it integrates cleanly with virtually any document management or business application in your environment.

## Extended Warranty for Peace of Mind
Kodak Alaris offers a 3-year limited warranty on the E1030, with a limited-time promotion that includes a 5-year Advanced Unit Replacement at no additional cost. That extended coverage reflects the confidence Kodak Alaris places in the reliability of this scanner and the commitment to keeping your team productive long after the initial purchase.`,
  },
  {
    slug: 'kodak-e1040-document-scanner',
    description: `[stats: 40 ppm§Scan speed | 600 dpi§Resolution | 5,000§Pages per day]

The Kodak E1040 Document Scanner makes it easy to digitise documents and get your data where it needs to be — quickly and accurately. Ideal for SMBs, remote offices, and paper-intensive environments such as healthcare, legal, financial, and government organisations, the E1040 combines a fast and powerful scanning engine with an interface that anyone on your team can use without training.

## Fast, Reliable Performance from the First Scan
The E1040 is ready to scan in less than 10 seconds of powering on. At 40 pages per minute with duplex capability, it handles multi-page batches efficiently and quietly, making it equally suited to busy reception desks and individual workstations. Compact enough not to dominate a desktop, it delivers performance that punches well above its footprint.

## Perfect Page Technology for Superior Image Quality
Built-in Perfect Page technology and Dual Illumination work together to produce images that are consistently better than the originals. Advanced OCR accuracy ensures your business data is extracted with speed and precision, while automatic corrections for skew, background, and contrast reduce the time spent post-processing and preparing documents for archiving or further use.

## Smart Touch for One-Touch Job Automation
Smart Touch technology enables one-touch scanning for up to nine different job functions, getting information to the right place every time. Scans can be saved automatically as searchable PDFs and routed to predefined destinations — reducing manual steps and helping teams process everything from onboarding forms to accounts payable invoices without leaving the scanner.

## Versatile Scanning for IDs, Passports, and Delicate Documents
The E1040 can dock with an optional flatbed accessory, offering a fast and easy solution for scanning ID cards, passports, and damaged or fragile documents. Multi-feed detection, Intelligent Document Protection, and a smooth paper path reliably protect originals, while seamless TWAIN and ISIS integration means only one driver is needed across all scanning tasks.`,
  },

  // ── i4000 SERIES ────────────────────────────────────────────────────────────
  {
    slug: 'kodak-i4650-scanner',
    description: `[stats: 130 ppm§Scan speed | 600 dpi§Resolution | 100,000§Pages per day]

The Kodak i4650 Scanner is built for the most demanding production environments — busy mailrooms, high-volume scanning departments, and service bureaus that need maximum productivity, accuracy, and reliability without compromise. As part of the award-winning i4000 Series, the i4650 combines continuous document feeding with exceptional image quality and intelligent paper handling to keep your operation moving at pace.

## Continuous Feeding for Uninterrupted Production
A 500-sheet input elevator allows documents to be fed continuously without stopping to reload, while a straight-through paper path accommodates a wide range of materials including cardboard, file folders, and extra-long documents. This combination minimises operator interruptions and keeps throughput consistently high across the longest scanning shifts.

## Exceptional Image Quality at Full Speed
Alaris Perfect Page image processing produces crisp, clear images even from challenging originals — with no loss of scanning speed. Dual LED technology delivers excellent OCR read rates for more precise data extraction, ensuring that the data leaving the scanner is as clean and accurate as the image it came from. This matters enormously when feeding downstream automation or ECM systems.

## Four Layers of Document Protection
The i4650 takes document protection seriously. Length detection guards against overlapping pages appearing as one long document, double document detection ensures only a single sheet enters at a time, Intelligent Document Protection listens for crumpling sounds and stops the process immediately, and metal detection prevents staples and paper clips from scratching the scanner glass — together providing unbeatable reliability for your most important originals.

## Intelligent Integration with Business Systems
Multi-zone barcode recognition reads barcode values to extract metadata automatically, enabling straightforward integration with line-of-business systems. Combined with Alaris Info Input Solution or Capture Pro Software, the i4650 supports centralised capture, application management, job setup, user control, and intelligent indexing — making it a core component of any serious enterprise capture workflow.`,
  },
  {
    slug: 'kodak-i4850-scanner',
    description: `[stats: 150 ppm§Scan speed | 600 dpi§Resolution | 150,000§Pages per day]

The Kodak i4850 Scanner is the fastest scanner in the i4000 Series, built for production departments and service bureaus that cannot afford to slow down. Combining a 150-page-per-minute engine with the reliability and intelligent features the i4000 Series is known for, the i4850 delivers a powerful combination of quality, productivity, and affordability for organisations that process documents at serious scale.

## Speed Through the Largest Jobs
At 150 pages per minute with a daily volume capacity of up to 150,000 scans, the i4850 is engineered to keep pace with the most demanding production workloads. A 500-sheet input tray and controlled stacking technology mean operators spend less time loading and more time processing, while the interactive control panel allows workflow adjustments without leaving the scanner for the host PC.

## Perfect Page Image Quality with Every Pass
The latest Perfect Page image processing technology ensures crisp, clear images even from challenging originals. Advanced Intelligent Document Protection and auto image rotation reduce the need for rescans, while multi-feed management protects documents and maintains accuracy across mixed-batch jobs. Scanning at this speed should not mean compromising on the quality of the output — and with the i4850, it does not.

## Advanced Barcode Reading for Complex Workflows
Control the most complicated production workflows with advanced barcode reading that works on the fly. Whether managing patch counting, front-side imprinting, or multi-batch document separation, the i4850 gives operators the tools to handle complex routing and indexing tasks without slowing the line or requiring manual document preparation beforehand.

## Software Integration and Flexible Service Contracts
KODAK Capture Pro Software Limited Edition is included with the i4850, enabling editing, enhancement, and management of all kinds of documents from day one. For longer-term investment protection, Kodak Alaris offers a full range of service and support contracts to keep productivity at peak levels and ensure the scanner continues to perform to specification throughout its working life.`,
  },

  // ── S2000 SERIES ────────────────────────────────────────────────────────────
  {
    slug: 'kodak-s2050-scanner',
    description: `[stats: 50 ppm§Scan speed | 600 dpi§Resolution | 6,000§Pages per day]

The Kodak S2050 Scanner delivers powerful desktop capture for businesses of any size, combining 50 pages per minute with the clarity and accuracy expected from Kodak Alaris. Whether you need to get invoices, contracts, forms, or correspondence into your business systems quickly and accurately, the S2050 provides a fast, reliable, and easy-to-use solution that earns its place on any busy desktop.

## Embedded Image Processing for Superior Results
The S2050 handles image processing directly within the scanner rather than relying on the host PC. This embedded approach delivers crisp, high-quality images at full scanning speed without placing demands on your computer's resources. Intelligent features automatically reduce manual pre- and post-scan tasks, saving time and improving consistency across every document that passes through the feeder.

## Active Feed Technology for Continuous Uptime
Active Feed technology automatically aligns the leading edges of pages before they enter the paper path, preventing misfeeds and keeping the scanner running without interruption. SurePath Paper Handling maintains reliable document flow, while Controlled Output Stacking places completed pages neatly in the output tray — meaning less time spent managing paper and more time focused on higher-value work.

## One-Touch Scanning with Advanced OCR
An intuitive colour display and support for up to 20 preconfigured job setups make the S2050 quick to operate for anyone. OCR read rates that are 10% more accurate than competing devices, combined with Perfect Page technology's 30-plus automatic enhancements, ensure that the information extracted from your documents is consistently reliable and ready for downstream processing or archiving.

## Broad Integration and Passport Scanning Support
Documents scanned by the S2050 can be sent to local and network folders, FTP destinations, cloud services such as SharePoint, or ECM systems. The S2050 is also designed to dock on top of the Alaris Passport Flatbed Accessory, providing a quick and seamless solution for scanning passports, ID cards, and other small or fragile documents — without the need for an additional power cord or USB port.`,
  },
  {
    slug: 'kodak-s2060w-scanner',
    description: `[stats: 60 ppm§Scan speed | 600 dpi§Resolution | 9,000§Pages per day]

The Kodak S2060W Scanner brings network-connected document capture to workgroups, combining built-in Wi-Fi and Ethernet connectivity with 60 pages per minute scanning speed. Multiple team members can share a single device across the network, capturing information at the point of entry with superior image quality — making it the ideal desktop scanning solution for reception areas, shared workspaces, and distributed office environments.

## Shared Network Access for the Whole Team
Unlike USB-only desktop scanners, the S2060W connects directly to your wired or wireless network, allowing multiple users to scan from their computers without physically moving the device. An easy-to-use touchscreen provides quick access to 20 preconfigured job setups, while standard TWAIN and ISIS drivers ensure smooth integration with existing professional document management systems across the office.

## Active Feed and Embedded Image Processing
Active Feed technology aligns page edges automatically to avoid misfeeds and keep the paper path clear, while SurePath Paper Handling and Controlled Output Stacking ensure a smooth, reliable scanning experience for every operator. Embedded Image Processing in the scanner itself delivers crisp, high-quality images without placing heavy demands on any individual user's PC — important in shared environments where host PCs vary in specification.

## OCR Accuracy That Keeps Data Clean
Perfect Page technology applies over 30 automatic image enhancements to deliver OCR read rates that outperform competing devices. Clean, accurate data at the point of capture reduces the need for corrections downstream, whether documents are heading into an ECM system, a shared folder, cloud storage, or a line-of-business application.

## RESTful API and Passport Flatbed Compatibility
Beyond standard driver integration, the S2060W supports a RESTful Web API for direct connection to business applications and web-based scanning tools — no device driver required on the host machine. Like other S2000 Series scanners, it also supports docking with the Alaris Passport Flatbed Accessory, adding the ability to scan passports, ID cards, and delicate documents without a second USB connection or driver.`,
  },
  {
    slug: 'kodak-s2070-scanner',
    description: `[stats: 70 ppm§Scan speed | 600 dpi§Resolution | 10,000§Pages per day]

The Kodak S2070 Scanner is designed for users who need speed, simplicity, and reliability in a compact desktop form. Scanning at 70 pages per minute with intelligent embedded processing, the S2070 captures information accurately at the point of entry and feeds it directly into the workflows your business depends on — with minimal setup time and no dependence on a high-powered host computer.

## Faster Scanning with Less Manual Effort
Embedded Image Processing handles image correction directly within the scanner, delivering crisp, high-quality results without taxing your PC. Active Feed technology aligns the leading edge of each page to prevent misfeeds and multi-feeds, while Controlled Output Stacking keeps the exit tray tidy. The result is a scanning experience that demands less of the operator and more of the machine — exactly where that trade-off should sit.

## Reliable Data Quality at the Point of Capture
Intelligent Document Protection and multi-feed sensor technology make the S2070 virtually jam-free and document-damage-free, protecting originals throughout every batch. Intelligent Exception Processing validates forms immediately at the point of scan, flagging missing information such as missing signatures before the document moves further into your workflow — catching errors at source rather than discovering them later.

## One Touch to the Right Destination
Predefined job setups allow users to change scanner configuration at the push of a button, or by scanning an auto-generated QR code. Documents can be routed to Dropbox, Salesforce, OneDrive, SharePoint, Google Drive, Box, and more — directly from the scanner's touchscreen without opening a separate application. Mobile scanning support extends this capability to smartphones and tablets for teams that work across locations.

## Built to Grow with Your Organisation
The S2070 integrates via standard drivers or the RESTful Web API, removing the need for device drivers on host computers, tablets, or mobile devices. Kodak Asset Management Software helps IT administrators monitor and manage scanners across the network, while network-ready models including wireless connectivity allow multiple users to share a single device without any physical relocation of hardware.`,
  },
  {
    slug: 'kodak-s2080w-scanner',
    description: `[stats: 80 ppm§Scan speed | 600 dpi§Resolution | 12,000§Pages per day]

The Kodak S2080W Scanner combines 80 pages per minute speed with built-in Wi-Fi and Ethernet connectivity, making it a high-performance shared scanning solution for modern workgroups. Built on the S2000 Series platform, it captures information wherever it originates and delivers it with accuracy and speed into the business processes, cloud destinations, and applications your team relies on every day.

## High-Speed Network Scanning for Workgroups
The S2080W connects to your wired or wireless network so multiple users can share a single device without moving hardware or juggling cables. Its intuitive colour touchscreen and support for up to 20 preconfigured job setups make it quick to operate for every member of the team, regardless of technical expertise. Industry-standard enterprise security protocols protect document images and data in transit across the network.

## Embedded Processing Keeps Your PCs Free
Image processing happens within the scanner itself, not on the host PC. This means the S2080W delivers consistently crisp, high-quality scans at full speed even in environments where host computers are shared or running other demanding applications. Active Feed technology and Controlled Output Stacking further reduce operator intervention, keeping the paper path clear and the output tray organised throughout long scanning runs.

## Accurate Data from the First Scan
Intelligent Barcode Reading extracts metadata accurately without complex document preparation, while Perfect Page technology applies automatic enhancements to ensure OCR accuracy remains high even with poor-quality originals. Intelligent Exception Processing validates forms at the moment of capture, so missing fields or signatures are flagged immediately — before documents reach downstream systems where corrections are far more costly.

## Scan to Anywhere, Integrate with Anything
Whether your team sends documents to SharePoint, network folders, FTP destinations, Dropbox, OneDrive, Box, or Google Drive, the S2080W handles routing from the touchscreen with a single touch. For deeper integration, the RESTful Web API connects directly to line-of-business applications and web-based scanning tools without requiring a device driver on the host machine, future-proofing the scanner for changing business needs.`,
  },
  {
    slug: 'kodak-s2085f-scanner',
    description: `[stats: 85 ppm§Scan speed | 600 dpi§Resolution | 20,000§Pages per day]

The Kodak S2085f Scanner brings together high-speed duplex scanning and an integrated A4 flatbed into a compact desktop unit built for document-heavy processes that cannot afford to slow down. With on-board image processing, a 300-sheet ADF, enterprise-grade networking, and Smart Touch distribution, the S2085f handles everything from everyday office batches to specialist exception documents — without asking anything of your host PC.

## Integrated Flatbed for Exception Documents
The built-in A4 book-edge flatbed handles the documents that won't feed through an ADF: oversized originals, fragile pages, bound materials, photos, and ID cards. This removes the need for a separate flatbed scanner in your workflow and ensures that no document — regardless of its condition or format — becomes an obstacle to getting information into your systems on time.

## Perfect Page Image Quality for Maximum OCR Accuracy
Perfect Page technology turns even poor-quality originals into crisp, highly readable images automatically. Streak removal, background smoothing, image edge fill, and dozens more enhancements work together to maximise data readability and OCR accuracy, reduce file sizes, and prepare your documents for downstream automation including RPA workflows — all without placing any demands on the host PC.

## Smooth, Mixed-Batch Document Handling
A straight-through paper path, adjustable feeders, and a 300-sheet ADF with controlled exit stacking allow the S2085f to handle mixed weights, sizes, and types in a single batch without misfeeds or manual sorting. Intelligent Document Protection detects issues before they become jams, while best-in-class multi-feed detection sensors safeguard originals and keep scanning on schedule.

## Network Sharing, Security, and Smart Distribution
The S2085f connects over Ethernet to share access across the team without moving hardware. HTTPS and TLS encryption protect documents in transit, and a secure-boot solution ensures only trusted firmware can run on the device. Smart Touch technology and a large colour touchscreen with personalised buttons mean scanned documents are distributed to the right destination — folder, FTP, SharePoint, ECM system, or email — from a single button press, with no post-scan steps required.`,
  },

  // ── S3000 SERIES ────────────────────────────────────────────────────────────
  {
    slug: 'kodak-s3060-scanner',
    description: `[stats: 60 ppm§Scan speed | 600 dpi§Resolution | 25,000§Pages per day]

The Kodak S3060 Scanner is a departmental scanning solution built for any document-heavy process that needs to convert paper into business-critical information at the edge of a workflow. Combining on-board image processing, reliable paper handling, enterprise-grade security, and flexible integration options, the S3060 improves the productivity of staff, the speed and accuracy of processes, and the profitability of the operations that depend on it.

## Perfect Page Image Quality at Departmental Speed
Perfect Page technology automatically converts even poor-quality originals into crisp, accurate images — applying streak removal, background smoothing, image edge fill, and more without slowing the scanner or loading the host PC. This level of image quality is essential for reliable OCR, searchable PDF generation, and barcode reading, and it prepares your documents for future automation technologies including RPA.

## Smooth Handling for Mixed-Batch Documents
A 300-sheet ADF with a straight-through paper path and adjustable feeders handles mixed weights and sizes without manual sorting or document preparation. Controlled exit stacking keeps the output tray organised during long runs, Intelligent Document Protection alerts operators to issues before they become jams, and multi-feed detection sensors prevent overlapping pages from corrupting a batch.

## Built-in Intelligence Without PC Dependency
The S3060's powerful embedded processor handles image enhancement at scanner speed, eliminating any reliance on the host PC for image quality. Intelligent Barcode Reading extracts metadata accurately and reduces the complexity of document preparation, while a large intuitive colour touchscreen and personalised user buttons keep operation simple for every member of the team.

## Multi-User Network Access and Enterprise Security
The network capability of the S3060 means it is visible to any PC on the network, allowing teams to share the scanner without moving hardware or purchasing additional equipment. HTTPS and TLS encryption secure document images and data in transit, and a secure-boot solution ensures only trusted firmware can load — making the S3060 a practical choice for IT environments with strict security requirements.

## Send Information Where It Needs to Go
Documents can be routed to network folders, FTP, SharePoint, ECM systems, and more — from the scanner's touchscreen with Smart Touch technology. TWAIN, ISIS, and Linux-based scanning applications are all supported, and the RESTful Web API enables direct integration with line-of-business applications and web-based scanning tools without requiring a device driver on the host machine.`,
  },
  {
    slug: 'kodak-s3060f-scanner',
    description: `[stats: 60 ppm§Scan speed | 600 dpi§Resolution | Flatbed§Included]

The Kodak S3060f Scanner adds an integrated A4 flatbed to the proven S3060 platform, creating a versatile departmental scanning solution for environments that handle both standard document batches and exception materials such as oversized originals, fragile pages, bound documents, and photographs. On-board image processing, a 300-sheet ADF, and enterprise network integration make the S3060f a complete, future-ready solution for document-intensive organisations.

## Integrated Flatbed for Complete Document Coverage
The built-in A4 book-edge flatbed handles what the ADF cannot — oversize and fragile documents, books, photos, passports, and ID cards — without requiring a separate device or interrupting the main scanning workflow. This flexibility means the S3060f serves as a single, consolidated scanning station for teams that routinely encounter a diverse range of document types throughout the working day.

## Perfect Page Image Quality
Perfect Page technology applies dozens of automatic enhancements — including streak removal, background smoothing, and image edge fill — to turn even poor-quality originals into clean, accurate images ready for OCR, searchable PDF creation, and barcode reading. The embedded image processor handles this entirely within the scanner, with no impact on rated speed and no demands placed on the host PC.

## Reliable Paper Handling with Intelligent Protection
A 300-sheet ADF with a straight-through paper path, adjustable feeders, and controlled exit stacking handles mixed-batch documents smoothly and safely. Intelligent Document Protection detects issues before they escalate into jams, while multi-feed detection sensors ensure only one document enters the paper path at a time — protecting originals and keeping scan quality consistent throughout every batch.

## Network Connectivity, Security, and Smart Distribution
The S3060f shares access across the team over a wired network without moving hardware or purchasing additional equipment. Scans are protected in transit with HTTPS and TLS encryption, and a secure-boot solution ensures only authorised firmware runs on the device. Smart Touch technology with personalised touchscreen buttons routes completed scans to the right destination — folders, FTP, SharePoint, or ECM systems — from a single button press, eliminating post-scan manual steps for every operator.`,
  },
  {
    slug: 'kodak-s3100-scanner',
    description: `[stats: 100 ppm§Scan speed | 600 dpi§Resolution | 45,000§Pages per day]

The Kodak S3100 Scanner is a powerful, connected departmental scanner built to meet your needs as your organisation grows. Scanning at 100 pages per minute with a daily capacity of up to 45,000 pages, it delivers the throughput of a production scanner in a form factor sized for the department — combining on-board intelligence, enterprise networking, and flexible integration to keep document-intensive teams productive without compromise.

## High-Throughput Performance with On-Board Processing
The S3100 processes images entirely within the scanner using a powerful embedded processor, delivering crisp, high-quality output at full speed without burdening the host PC. Perfect Page technology applies automatic corrections for streak removal, background smoothing, edge fill, and more — maximising OCR accuracy, reducing file sizes, and preparing documents for downstream systems including RPA automation platforms.

## Smooth Document Handling at Volume
A 300-sheet ADF with adjustable feeders and a straight-through paper path handles mixed weights and sizes without prior sorting or manual preparation. Controlled exit stacking keeps output organised during long uninterrupted runs, Intelligent Document Protection alerts operators to potential issues before jams occur, and multi-feed detection sensors ensure document integrity throughout every batch.

## Multi-User Network Sharing with Enterprise Security
The S3100's network capability makes it visible and accessible to any PC on the network, allowing teams to share a single high-performance scanner without physical relocation. HTTPS and TLS encryption protect documents and data in transit, while a secure-boot solution ensures only trusted firmware can run — giving IT administrators the confidence to deploy the S3100 across security-conscious environments without compromise.

## Smart Distribution and Broad Integration Support
Smart Touch technology and a large colour touchscreen with configurable user buttons allow operators to route completed scans to network folders, SharePoint, FTP destinations, or ECM systems with a single touch. TWAIN, ISIS, and Linux-based applications are all supported, and the RESTful Web API enables direct integration with line-of-business and web-based applications — making the S3100 a flexible hub for information capture in any environment.`,
  },
  {
    slug: 'kodak-s3100f-scanner',
    description: `[stats: 100 ppm§Scan speed | 600 dpi§Resolution | Flatbed§Included]

The Kodak S3100f Scanner combines 100 pages per minute throughput with an integrated A4 flatbed, offering departmental teams a single device capable of handling both high-volume document batches and exception materials that cannot pass through an automatic feeder. Built-in image processing, enterprise networking, and Smart Touch distribution make the S3100f a comprehensive capture solution for organisations that need speed, versatility, and long-term reliability.

## High-Speed Scanning with Flatbed Versatility
The integrated A4 book-edge flatbed extends the S3100f beyond standard ADF scanning to cover oversized originals, fragile documents, bound materials, photographs, and ID cards — all handled from the same device. This eliminates the need for a separate flatbed scanner and simplifies the scanning station for teams that regularly encounter documents outside standard office paper dimensions and conditions.

## Industry-Leading Image Quality On-Board
Perfect Page technology turns poor-quality originals into crisp, highly readable images through automatic corrections applied at scanner speed. Streak removal, background smoothing, image edge fill, and dozens more enhancements maximise data readability and OCR accuracy, reduce file sizes, and make captured documents ready for archiving, automation, and downstream business systems — all without relying on the host PC for processing power.

## Reliable Handling for Complex Mixed Batches
The 300-sheet ADF with a straight-through paper path, adjustable feeders, and controlled exit stacking manages mixed weights, sizes, and types without manual sorting. Intelligent Document Protection identifies issues before they become jams, while multi-feed detection sensors prevent overlapping documents from compromising batch accuracy. The combination of hardware reliability and intelligent sensing keeps the S3100f running at full efficiency throughout demanding scanning days.

## Secure Network Sharing and Smart Routing
Over a wired network connection, the S3100f is accessible to every PC in the environment without moving the device. HTTPS and TLS encryption secure all scanned data in transit, and a secure-boot mechanism ensures only trusted firmware can load. Smart Touch technology and configurable touchscreen buttons allow scans to be routed directly to TWAIN, ISIS, or Linux applications, cloud destinations, or ECM systems — or to Kodak Capture Pro Software and Info Input Solution for advanced indexing and workflow automation.`,
  },
  {
    slug: 'kodak-s3120-max-scanner',
    description: `[stats: 120 ppm§Scan speed | 600 dpi§Resolution | Max series§Embedded processing]

The Kodak S3120 Max Scanner is designed for departments that need maximum scanning speed without sacrificing image quality or data accuracy. At 120 pages per minute with 240 images per minute duplex capability, it keeps pace with the highest-demand document workflows while delivering the Perfect Page image quality and intelligent data extraction that Kodak Alaris is trusted for across the most demanding scanning environments.

## Maximum Speed, Maximum Accuracy
The S3120 Max operates at 120 pages per minute without making any trade-off on image quality. Perfect Page technology turns even poor-quality originals into crisp, accurate images automatically — applying streak removal, background smoothing, image edge fill, and other enhancements to maximise OCR accuracy, barcode reading reliability, and searchable PDF creation. Every scan that leaves this machine is ready to use.

## On-Board Intelligence with No PC Load
A powerful embedded processor handles all image processing within the scanner itself, eliminating dependence on the host PC and ensuring that scan speed is never throttled by computing resources. The built-in processor also drives Intelligent Barcode Reading, which produces highly accurate metadata extraction and significantly reduces the document preparation time typically required before batch scanning begins.

## Smooth, Reliable Document Handling Under Pressure
Adjustable feeders and a straight-through paper path deliver fast, smooth, and safe handling across mixed-batch documents. Minimal misfeeds keep operator time at the scanner low, while Intelligent Document Protection reduces the risk of document damage and data loss during high-volume runs — protecting originals that may be irreplaceable and maintaining the accuracy of every scan in the batch.

## Smart Distribution from a Single Touch
The S3120 Max includes an intuitive colour touchscreen that makes it easy to configure personalised scanning buttons for multiple users. Smart Touch technology allows operators to route completed scans to the right destination — whether that is a shared folder, FTP location, SharePoint, ECM system, or line-of-business application — from a single button press, cutting out the multi-step post-scan processes that slow down high-throughput environments.`,
  },
  {
    slug: 'kodak-s3140-max-scanner',
    description: `[stats: 140 ppm§Scan speed | 600 dpi§Resolution | 120,000§Pages per day]

The Kodak S3140 Max Scanner is the highest-capacity model in the S3000 Max Series, built for departments and production environments that process documents at serious daily volumes. With a duty cycle of up to 120,000 pages per day and the full suite of S3000 Max intelligent features, the S3140 Max delivers the throughput, accuracy, and reliability that high-demand scanning operations depend on without compromise.

## Built for the Highest Daily Volumes
At 120,000 pages per day, the S3140 Max is designed to run hard, run long, and keep delivering. A robust straight-through paper path and adjustable feeders handle mixed-batch documents smoothly, while minimal misfeeds ensure that operator time spent managing paper stays as low as possible throughout long production runs. This is a scanner sized for the workload, not the other way around.

## Perfect Page Image Quality at Production Scale
Perfect Page technology applies automatic image enhancements — streak removal, background smoothing, image edge fill, and more — to every document that passes through the feeder, producing consistently crisp, high-quality images regardless of original condition. This level of reliability is critical at scale: when thousands of pages are processed each day, image quality cannot be left to chance or manual correction.

## Intelligent Processing Without Host PC Dependency
The S3140 Max's powerful embedded processor handles all image enhancement within the scanner, significantly reducing the load requirements on connected PCs. Intelligent Barcode Reading produces accurate metadata extraction at scanner speed, and Smart Touch technology lets operators route scanned documents to the right destination from the touchscreen with a single touch — keeping the post-scan workflow as efficient as the scanning itself.

## Enterprise-Grade Reliability for Long-Term Operations
Like all S3000 Max Series scanners, the S3140 Max is backed by Kodak Alaris's award-winning service and support programmes. Extended warranty options and flexible service contracts protect the investment and maintain peak performance over the long term — important for any organisation that relies on this scanner as a core component of its daily document processing infrastructure.`,
  },

  // ── SCAN STATION ────────────────────────────────────────────────────────────
  {
    slug: 'kodak-scan-station-710-scanner',
    description: `[stats: 70 ppm§Scan speed | 600 dpi§Resolution | No PC§Required]

The Kodak Scan Station 710 Scanner connects directly to your network without requiring a host PC, delivering intuitive, integrated, and feature-rich document scanning straight to the people and systems that need the information. Ideal for reception areas, shared workspaces, and remote locations, it functions as a standalone information manager that gives any team member the ability to capture and distribute documents quickly and accurately.

## Network-Ready from Day One, No Host PC Required
Unlike desktop scanners that depend on a connected computer to function, the Scan Station 710 runs independently on your network. This makes it ideal for shared locations where a dedicated PC is impractical or unnecessary — freeing the device to serve multiple users across a floor, building, or branch office without installation complexity or ongoing PC management.

## Intuitive Operation for Any User
A bright, easy-to-navigate touchscreen puts the most common scanning functions within reach of every user, regardless of their technical background. The Scan Station 710 is designed so that staff can walk up, scan their documents, and send them to the right destination without instruction — reducing the reliance on IT support for routine scanning tasks and keeping information moving across the organisation.

## Seamless Integration with Business Systems
The Scan Station 710 integrates with the destinations and applications your business already uses — routing scanned documents to network folders, email, FTP, cloud storage, and line-of-business systems. Standard driver support combined with built-in OCR and barcode capabilities means documents arrive at their destination as clean, searchable, indexed digital files rather than raw image dumps.

## Reliable Performance Backed by Kodak Alaris Support
With 70 pages per minute scan speed and a 6,000-page daily duty cycle, the Scan Station 710 is built for sustained use in shared environments. Kodak Alaris supports the device with a comprehensive warranty and a range of service and support plans, ensuring that the scanner remains productive and properly maintained throughout its working life.`,
  },
  {
    slug: 'kodak-scan-station-730ex-plus-scanner',
    description: `[stats: 70 ppm§Scan speed | 600 dpi§Resolution | No PC§Required]

The Kodak Scan Station 730EX Plus Scanner delivers powerful features and broad integration options for organisations that need to capture critical business information at the edge of their processes. Combining a standalone network architecture, Windows 10 compatibility, integrated OCR, and robust remote management, it transforms the scanning station into an active part of the information workflow — putting less into the scanner and getting significantly more out into the business.

## Powerful Security and Simplified Access Control
The Scan Station 730EX Plus combines administration-level password protection with easy access for ad-hoc users — ensuring that only authorised configurations are available while keeping day-to-day operation friction-free. Automatic installation of the latest Microsoft security updates keeps the device protected without requiring manual IT intervention, and improved file naming capability helps classify and organise content efficiently at the point of capture.

## Truly User-Friendly for Every Operator
A bright, easy-to-navigate touchscreen puts scanning within reach of any team member without training. The integrated OCR engine converts documents to text-searchable PDFs and delivers them to configurable destinations from a single touch on the scanner — no separate PC, no additional steps. Built-in barcode reading automatically delivers data to downstream applications, eliminating manual data entry and reducing the risk of errors at the source.

## Remote Management Across Your Organisation
By networking multiple Scan Stations throughout the business, administrators can configure and maintain all devices from a single central location — without visiting each one individually. Retained control over available features means that the functionality available at each scanning station can be tuned to the specific needs of the team using it, keeping the user experience consistent and the management burden low.

## Turn Documents into Actionable Digital Data
The Scan Station 730EX Plus converts the information locked in paper documents into a valuable digital resource that connects directly to your business processes. Documents can be sent to multiple destinations simultaneously, and the Windows 10 architecture allows organisations to port their own applications and create custom scanning kiosks tailored to their specific workflows — providing a level of flexibility that extends well beyond standard document scanning.`,
  },
]

export async function GET() {
  await connectDB()
  const results = []

  for (const u of updates) {
    const result = await Product.findOneAndUpdate(
      { slug: u.slug },
      { $set: { description: u.description } },
      { new: true }
    )
    results.push({ slug: u.slug, status: result ? 'updated' : 'not found' })
  }

  return NextResponse.json({ results })
}
