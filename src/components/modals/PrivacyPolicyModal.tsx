import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Shield,
  ShieldCheck,
  Lock,
  FileText,
  Search,
  Printer,
  Copy,
  Check,
  ExternalLink,
  Mail,
  RefreshCw,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { db, doc, getDoc, setDoc, onSnapshot } from '../../lib/firebase';

export interface PrivacySection {
  id: string;
  title: string;
  summary: string;
  content: string[];
}

export interface PrivacyPolicyData {
  title: string;
  lastUpdated: string;
  effectiveDate: string;
  version: string;
  dpoEmail: string;
  googleComplianceStatement: string;
  sections: PrivacySection[];
}

export const DEFAULT_PRIVACY_POLICY: PrivacyPolicyData = {
  title: 'Marketing Tycoons Privacy Policy & Google Legal Compliance',
  lastUpdated: 'September 2026',
  effectiveDate: 'January 1, 2026',
  version: '2.4.0',
  dpoEmail: 'marketingtycoons.tech@gmail.com',
  googleComplianceStatement:
    'Marketing Tycoons strictly complies with Google API Services User Data Policy, including Limited Use requirements, GDPR, and CCPA/CPRA regulations.',
  sections: [
    {
      id: 'google-oauth',
      title: '1. Google User Data & OAuth Policy (Google Legal Compliance)',
      summary: 'Strict limited use and protection of data obtained through Google Sign-In and OAuth integrations.',
      content: [
        'Marketing Tycoons integrates official Google OAuth 2.0 and Firebase Authentication to provide verified client reviews and secure administrative portal access.',
        'When you authenticate using Google Sign-In, we access only basic profile information explicitly approved by you in the OAuth consent screen: your display name, primary email address, profile avatar URL, and unique Google identifier.',
        'Limited Use Affirmation: Marketing Tycoons strictly adheres to the Google API Services User Data Policy, including the Limited Use requirements. We do not use Google user data to train generalized AI/ML models, do not sell or monetize personal information, and do not transfer Google user data to data brokers or advertising networks.',
        'All tokens and authorization credentials are cryptographically secured and transmitted via TLS 1.3 encryption directly to Google Firebase Authentication servers.'
      ]
    },
    {
      id: 'data-collection',
      title: '2. Information We Collect',
      summary: 'Data collected directly from user interactions, project inquiries, and client submissions.',
      content: [
        'Client Inquiries & Briefs: When requesting agency quotes, website audits, or creative campaigns, we collect your name, business email, phone number, company name, and project specifications.',
        'Verified Reviews: When submitting client feedback, your name, rating, testimonial text, and optional Google verification badge are stored in our secure database.',
        'Technical & Usage Telemetry: Anonymous performance metrics, device type, browser platform, and aggregated session data collected via Google Analytics 4 and Cloud Run server logs to ensure optimal site reliability and security.'
      ]
    },
    {
      id: 'data-usage',
      title: '3. How We Use Collected Information',
      summary: 'Legitimate business purposes for processing client data.',
      content: [
        'To architect, develop, and deliver high-performance digital marketing campaigns, custom web applications, branding assets, and SEO strategies.',
        'To verify the authenticity of client testimonials and reviews through Google Authentication.',
        'To respond to inquiries, send campaign progress reports, and deliver contractual deliverables.',
        'To maintain enterprise security, prevent fraudulent submissions, and defend our cloud infrastructure against malicious activity.'
      ]
    },
    {
      id: 'data-protection',
      title: '4. Data Security, Cloud Firestore & Encryption',
      summary: 'Multi-layer security architecture protecting client confidentiality.',
      content: [
        'Data at Rest: All persistent data is hosted in Google Cloud Firestore with enterprise-grade AES-256 encryption.',
        'Data in Transit: All client-server communications are enforced over HTTPS with TLS 1.3 cipher suites.',
        'Access Controls: Strict Role-Based Access Control (RBAC) enforced by deployed Cloud Firestore Security Rules, ensuring unauthorized users cannot read or modify private inquiries or admin assets.',
        'Zero Credential Logging: We never store plaintext master passwords or private OAuth client secrets on public client bundles.'
      ]
    },
    {
      id: 'user-rights',
      title: '5. Client Rights & Data Deletion (GDPR / CCPA / Google Policy)',
      summary: 'Your comprehensive rights regarding your personal information and deletion requests.',
      content: [
        'Right to Access: You may request a complete digital copy of all personal records and inquiries associated with your identity.',
        'Right to Rectification: You may update or correct any inaccurate personal details on file.',
        'Right to Erasure (Data Deletion): You have the absolute right to request the permanent deletion of your user profile, reviews, and inquiry messages from our database.',
        'How to Request Deletion: Submit a formal data erasure request to our compliance team at marketingtycoons.tech@gmail.com with the subject line "Privacy / Data Deletion Request". We process and confirm verified deletion requests within 48 business hours.'
      ]
    },
    {
      id: 'third-party',
      title: '6. Third-Party Integrations & Service Providers',
      summary: 'Authorized enterprise platforms supporting our digital operations.',
      content: [
        'Google Cloud Platform & Firebase: Secure database hosting, authentication, and cloud infrastructure.',
        'Google Analytics 4: Anonymous website telemetry (IP anonymization enabled).',
        'Meta Business / Facebook Pixel: Conversion measurement for agency advertising campaigns upon user consent.',
        'We do not sell, rent, or trade your personal information to third parties under any circumstances.'
      ]
    },
    {
      id: 'contact',
      title: '7. Data Protection Officer & Compliance Contact',
      summary: 'Direct contact details for legal compliance and privacy governance.',
      content: [
        'Data Controller: Marketing Tycoons Legal & Compliance Desk',
        'Headquarters Domain: https://marketingtycoons.tech',
        'Compliance Email: marketingtycoons.tech@gmail.com',
        'Official WhatsApp & Calling Desk: +92 342 6793428 (03426793428)',
        'Physical Office: Office #402, Tycoons Executive Tower, Blue Area, Islamabad'
      ]
    }
  ]
};

export const PrivacyPolicyModal: React.FC = () => {
  const { isPrivacyModalOpen, setIsPrivacyModalOpen } = useApp();

  const [policyData, setPolicyData] = useState<PrivacyPolicyData>(() => {
    const cached = localStorage.getItem('mt_privacy_policy');
    if (cached) {
      try {
        return JSON.parse(cached);
      } catch {
        return DEFAULT_PRIVACY_POLICY;
      }
    }
    return DEFAULT_PRIVACY_POLICY;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isLiveFromFirestore, setIsLiveFromFirestore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSectionId, setSelectedSectionId] = useState<string>('all');
  const [copied, setCopied] = useState(false);

  // Fetch / Sync real-time Privacy Policy from Firestore
  useEffect(() => {
    if (!isPrivacyModalOpen) return;

    setIsLoading(true);
    const policyDocRef = doc(db, 'legal_documents', 'privacy_policy');

    const unsubscribe = onSnapshot(
      policyDocRef,
      snapshot => {
        setIsLoading(false);
        if (snapshot.exists()) {
          const remoteData = snapshot.data() as PrivacyPolicyData;
          setPolicyData(remoteData);
          setIsLiveFromFirestore(true);
          localStorage.setItem('mt_privacy_policy', JSON.stringify(remoteData));
        } else {
          // Initialize document in Firestore with standard Google Legal Compliance content
          setDoc(policyDocRef, DEFAULT_PRIVACY_POLICY, { merge: true }).catch(() => {});
          setPolicyData(DEFAULT_PRIVACY_POLICY);
          setIsLiveFromFirestore(true);
        }
      },
      error => {
        console.warn('Firestore Privacy Policy snapshot warning:', error);
        setIsLoading(false);
        setIsLiveFromFirestore(false);
      }
    );

    return () => unsubscribe();
  }, [isPrivacyModalOpen]);

  if (!isPrivacyModalOpen) return null;

  const handleCopyPolicy = () => {
    const text = `${policyData.title}\nLast Updated: ${policyData.lastUpdated}\n\n${policyData.sections
      .map(s => `${s.title}\n${s.content.join('\n')}`)
      .join('\n\n')}\n\nContact: ${policyData.dpoEmail}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const filteredSections = policyData.sections.filter(sec => {
    if (selectedSectionId !== 'all' && sec.id !== selectedSectionId) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sec.title.toLowerCase().includes(q) ||
      sec.summary.toLowerCase().includes(q) ||
      sec.content.some(c => c.toLowerCase().includes(q))
    );
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-policy-title"
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] flex flex-col rounded-3xl dark:bg-[#0c0d12] bg-white border dark:border-[#d4af37]/40 border-gray-300 shadow-2xl overflow-hidden text-left"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="p-6 pb-4 border-b dark:border-gray-800/80 border-gray-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3.5">
            <div className="relative w-12 h-12 rounded-2xl bg-black border border-[#d4af37]/60 overflow-hidden flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(212,175,55,0.35)]">
              <img src="/logo.png" alt="Marketing Tycoons" className="w-full h-full object-cover" />
              <div className="absolute -bottom-0.5 -right-0.5 p-1 bg-[#d4af37] rounded-full text-black">
                <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] uppercase tracking-widest text-[#d4af37] font-semibold">
                  Google Legal Compliance
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {isLiveFromFirestore ? 'Live Firestore Verified' : 'Standard Compliance'}
                </span>
              </div>
              <h2
                id="privacy-policy-title"
                className="font-display text-xl sm:text-2xl font-bold dark:text-white text-gray-950 mt-0.5"
              >
                Privacy Policy & User Data Rights
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyPolicy}
              title="Copy Full Policy"
              className="p-2.5 rounded-xl dark:bg-white/5 bg-gray-100 hover:bg-gray-200 dark:hover:bg-white/10 dark:text-gray-300 text-gray-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={handlePrint}
              title="Print Policy"
              className="hidden sm:inline-flex p-2.5 rounded-xl dark:bg-white/5 bg-gray-100 hover:bg-gray-200 dark:hover:bg-white/10 dark:text-gray-300 text-gray-700 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setIsPrivacyModalOpen(false)}
              className="p-2.5 rounded-full dark:bg-white/5 bg-gray-100 dark:hover:bg-white/10 hover:bg-gray-200 dark:text-gray-400 text-gray-600 dark:hover:text-white hover:text-gray-900 border dark:border-gray-800 border-gray-300 transition-colors cursor-pointer ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Meta Quick Bar */}
        <div className="px-6 py-3 bg-gray-50 dark:bg-[#08090d] border-b dark:border-gray-800/80 border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
            <span>
              <strong>Effective:</strong> {policyData.effectiveDate}
            </span>
            <span>•</span>
            <span>
              <strong>Last Updated:</strong> {policyData.lastUpdated}
            </span>
            <span>•</span>
            <span>
              <strong>Version:</strong> v{policyData.version}
            </span>
          </div>

          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search policy clauses..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs dark:bg-[#121319] bg-white border dark:border-gray-700 border-gray-300 dark:text-white text-gray-900 placeholder:text-gray-400 outline-none focus:border-[#d4af37]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white text-xs"
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Modal Body with Section Navigation & Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Google Limited Use Compliance Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#d4af37]/15 to-transparent border border-[#d4af37]/40 flex items-start gap-3.5">
            <div className="p-2 rounded-xl bg-[#d4af37]/20 text-[#d4af37] shrink-0 mt-0.5">
              <Lock className="w-4 h-4" />
            </div>
            <div className="space-y-1 text-xs">
              <div className="font-bold text-[#d4af37] uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <span>Google API Services User Data Policy Compliance</span>
                <Sparkles className="w-3.5 h-3.5" />
              </div>
              <p className="dark:text-gray-200 text-gray-800 leading-relaxed">
                {policyData.googleComplianceStatement} Marketing Tycoons does not sell or share user data obtained through Google OAuth, and all interactions comply with strict limited-use principles.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedSectionId('all')}
              className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedSectionId === 'all'
                  ? 'bg-[#d4af37] text-black shadow-xs'
                  : 'dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-700 hover:bg-gray-200 dark:hover:bg-white/10'
              }`}
            >
              All Sections ({policyData.sections.length})
            </button>
            {policyData.sections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setSelectedSectionId(sec.id)}
                className={`px-3 py-1.5 rounded-xl font-medium whitespace-nowrap transition-colors cursor-pointer ${
                  selectedSectionId === sec.id
                    ? 'bg-[#d4af37] text-black shadow-xs'
                    : 'dark:bg-white/5 bg-gray-100 dark:text-gray-300 text-gray-700 hover:bg-gray-200 dark:hover:bg-white/10'
                }`}
              >
                {sec.title.split('.')[0]}
              </button>
            ))}
          </div>

          {/* Sections List */}
          {filteredSections.length === 0 ? (
            <div className="text-center py-12 text-gray-500 space-y-2">
              <AlertCircle className="w-8 h-8 mx-auto text-gray-400" />
              <p className="text-sm font-semibold">No matching policy clauses found.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSectionId('all');
                }}
                className="text-xs text-[#d4af37] hover:underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {filteredSections.map(section => (
                <article
                  key={section.id}
                  className="p-5 sm:p-6 rounded-2xl dark:bg-[#121319] bg-gray-50 border dark:border-gray-800 border-gray-200 space-y-3"
                >
                  <div>
                    <h3 className="font-display text-base sm:text-lg font-bold dark:text-white text-gray-950">
                      {section.title}
                    </h3>
                    <p className="text-xs text-[#d4af37] font-medium mt-0.5">
                      {section.summary}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-1 text-xs sm:text-sm dark:text-gray-300 text-gray-700 leading-relaxed">
                    {section.content.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Data Deletion & Contact Action Box */}
          <div className="p-5 rounded-2xl dark:bg-black/50 bg-gray-100 border dark:border-gray-800 border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 text-xs">
              <div className="font-bold dark:text-white text-gray-900">
                Exercise Your Data Rights / Request Data Erasure
              </div>
              <div className="text-gray-500 dark:text-gray-400">
                Contact our Data Protection Officer for data export or deletion.
              </div>
            </div>

            <a
              href={`mailto:${policyData.dpoEmail}?subject=Marketing%20Tycoons%20Data%20Privacy%20Request`}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs tracking-wider uppercase shadow-xs hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all shrink-0"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Email DPO Officer</span>
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 border-t dark:border-gray-800/80 border-gray-200 bg-gray-50 dark:bg-[#08090d] flex items-center justify-between shrink-0">
          <div className="text-[11px] text-gray-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Encrypted via Cloud Firestore Database</span>
          </div>

          <button
            type="button"
            onClick={() => setIsPrivacyModalOpen(false)}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa820a] text-black font-bold text-xs tracking-wider uppercase cursor-pointer shadow-xs"
          >
            I Understand & Close
          </button>
        </div>
      </div>
    </div>
  );
};
