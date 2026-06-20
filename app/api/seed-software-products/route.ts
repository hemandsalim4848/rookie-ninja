import { NextResponse } from 'next/server'
import { connectDB } from '@/src/lib/mongodb'
import { Product } from '@/src/lib/models/Products'
import mongoose from 'mongoose'

const Brand = mongoose.models.Brand || mongoose.model('Brand', new mongoose.Schema({ name: String, slug: String }))

const products = [
  {
    brandSlug: 'kodak-alaris',
    name: 'KODAK Info Input Solution',
    slug: 'kodak-info-input-solution',
    sku: '',
    category: 'Softwares',
    images: ['https://products.rookie-ninja.com/wp-content/uploads/2026/05/KODAK-Info-Input-Solution-1.png.webp'],
    shortDescription: `AI-powered document processing
Automated data extraction
Advanced OCR technology
Paper & digital capture
Low-code workflow automation
Business system integration
Enterprise-scale deployment
Improved accuracy & efficiency`,
    description: `KODAK Info Input Solution is an advanced Intelligent Document Processing (IDP) platform designed to automate and streamline the journey from document capture to business-ready data. Built for organizations handling large volumes of documents, the solution transforms information from paper documents, emails, scanned files, mobile uploads, and digital forms into accurate, actionable data that integrates seamlessly with business applications and workflows.

Powered by AI-driven automation, KODAK Info Input Solution can automatically classify, extract, validate, and process information from structured, semi-structured, and unstructured documents. The platform reduces manual data entry, minimizes errors, accelerates processing times, and improves operational efficiency across departments such as finance, healthcare, insurance, legal, human resources, and government services.

Its flexible, browser-based architecture enables secure access from virtually anywhere while supporting enterprise-scale deployments. With low-code configuration tools, organizations can quickly create customized workflows without extensive development resources. Advanced OCR, ICR, barcode recognition, natural language processing, and intelligent data extraction technologies ensure accurate processing even for complex document types.

KODAK Info Input Solution also supports integration with leading cloud AI and business platforms, allowing organizations to automate invoice processing, claims management, onboarding workflows, records management, compliance operations, and other document-intensive processes.`,
    specs: [],
    downloads: [],
    featured: false,
  },
  {
    brandSlug: 'kodak-alaris',
    name: 'KODAK Capture Pro Software',
    slug: 'kodak-capture-pro-software',
    sku: '',
    category: 'Softwares',
    images: ['https://products.rookie-ninja.com/wp-content/uploads/2026/05/KODAK-Capture-Pro.png.webp'],
    shortDescription: `High-volume document capture
Advanced OCR & barcode recognition
Automated indexing and routing
Intelligent image processing
Supports multiple scanner brands
Enterprise workflow automation
Secure data capture and sharing
Improved efficiency and accuracy`,
    description: `KODAK Capture Pro Software is a powerful document capture solution designed to simplify and automate high-volume scanning workflows. It enables organizations to efficiently convert paper documents into searchable, high-quality digital files while reducing manual processing time and improving overall productivity. With advanced image enhancement, indexing, and data extraction capabilities, the software helps businesses transform document-intensive processes into streamlined digital workflows.

Key Features: High-speed document capture and batch processing, Advanced OCR, barcode, and patch code recognition, Automatic indexing and document separation, Intelligent image enhancement and quality control, Support for distributed and centralized scanning environments, Flexible export to ECM, ERP, SharePoint, and business systems, Secure document handling and workflow automation, Scalable architecture for enterprise deployments.

By automating document capture and data extraction, KODAK Capture Pro Software helps organizations reduce operational costs, improve data accuracy, accelerate information access, and increase employee productivity. Ideal for finance, healthcare, government, education, legal services, logistics, and enterprise records management.`,
    specs: [],
    downloads: [],
    featured: false,
  },
  {
    brandSlug: 'canon',
    name: 'Readiris PDF Essential',
    slug: 'readiris-pdf-essential',
    sku: '',
    category: 'Softwares',
    images: [
      'https://products.rookie-ninja.com/wp-content/uploads/2026/06/RIPDF25-new-eshop-660x660-01-en-min.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2026/06/RIPDF25-new-eshop-660x660-02-en-min.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2026/06/RIPDF25-new-eshop-660x660-04-en-min.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2026/06/RIPDF25-new-eshop-660x660-05-en-min.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2026/06/RIPDF25-new-eshop-660x660-03-en-min.webp',
    ],
    shortDescription: `OCR in 137 languages
Convert PDFs to editable formats
Create and edit PDF files
Merge and split PDFs
Rearrange and organize pages
Add annotations and comments
Create searchable PDFs
Batch-process multiple documents`,
    description: `Readiris PDF Essential is a powerful all-in-one PDF and OCR solution designed to simplify document management for professionals, students, and businesses. Whether you need to create, edit, convert, organize, or digitize documents, Readiris PDF Essential provides an intuitive toolkit that helps you work faster and more efficiently.

Transform scanned documents, images, and PDFs into fully searchable and editable files with advanced Optical Character Recognition (OCR) technology. Supporting recognition in over 138 languages, the software accurately converts paper documents and image-based PDFs into editable formats such as Microsoft Word, Excel, and other popular file types.

Easily create and manage PDFs with comprehensive editing tools that allow you to add text, images, annotations, highlights, comments, links, and watermarks. Organize your documents effortlessly by merging, splitting, rotating, deleting, extracting, and rearranging pages to suit your workflow.

Readiris PDF Essential also streamlines document conversion by enabling fast export to multiple formats, helping users reuse and repurpose content without manually retyping information. Batch processing capabilities allow multiple files to be converted simultaneously, saving valuable time when handling large volumes of documents.`,
    specs: [],
    downloads: [],
    featured: false,
  },
  {
    brandSlug: 'canon',
    name: 'Readiris PDF Elite',
    slug: 'readiris-pdf-elite',
    sku: '',
    category: 'Softwares',
    images: [
      'https://products.rookie-ninja.com/wp-content/uploads/2026/06/RIPDF25-new-eshop-660x660-04-en-min.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2026/06/RIPDF25-new-eshop-660x660-05-en-min.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2026/06/RIPDF25-new-eshop-660x660-03-en-min.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2026/06/RIPDF25-new-eshop-660x660-02-en-min.webp',
      'https://products.rookie-ninja.com/wp-content/uploads/2026/06/RIPDF25-new-eshop-660x660-01-en-min.webp',
    ],
    shortDescription: `OCR support for 137 languages
Convert PDFs to editable formats
Create and edit PDF files
Merge, split, and compress PDFs
Batch-process multiple documents
Add annotations and bookmarks
Secure PDFs with passwords and redaction
Support for e-signatures and PDF forms`,
    description: `Readiris PDF Elite is a comprehensive PDF management and OCR solution built for professionals, businesses, and power users who require advanced document processing capabilities. Combining intelligent OCR technology with a full-featured PDF editor, it enables users to create, edit, convert, annotate, secure, sign, and organize documents from a single platform.

Transform scanned documents, images, and PDFs into fully searchable and editable files with industry-leading OCR technology supporting 138 recognition languages. Easily convert documents to Word, Excel, PowerPoint, searchable PDF, HTML, EPUB, and many other formats while preserving the original layout and formatting.

Beyond standard PDF editing, Readiris PDF Elite includes advanced automation tools that streamline document workflows. Automatically separate documents using blank pages, barcodes, or OCR zones, batch-process large volumes of files, extract data, rename files intelligently, and manage complex document archives with ease.

The software also offers enterprise-grade PDF management features, including password protection, redaction, annotations, comments, bookmarks, form filling, digital signatures, PDF/A compliance, and cloud connectivity.`,
    specs: [],
    downloads: [],
    featured: false,
  },
]

export async function GET() {
  await connectDB()
  const results = []

  for (const p of products) {
    const brand = await Brand.findOne({ slug: p.brandSlug })
    if (!brand) { results.push({ slug: p.slug, status: 'brand not found' }); continue }

    const existing = await Product.findOne({ brandSlug: p.brandSlug, slug: p.slug })
    if (existing) { results.push({ slug: p.slug, status: 'already exists' }); continue }

    await Product.create({ ...p, brand: brand._id })
    results.push({ slug: p.slug, status: 'created' })
  }

  return NextResponse.json({ results })
}
