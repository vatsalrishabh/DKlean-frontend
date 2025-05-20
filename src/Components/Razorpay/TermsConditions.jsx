import React from 'react';
import { FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';
import 'animate.css';

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <header className="text-center mb-12 animate__animated animate__fadeInDown">
        <h1 className="text-4xl font-bold text-blue-600 flex items-center justify-center gap-3">
          <FaInfoCircle className="text-blue-500" /> Terms and Conditions for Receiving Payment – Dklean Health Care Public Charitable Trust
        </h1>
        <p className="text-sm text-gray-600">Last updated on February 20, 2025</p>
      </header>

      <main className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeInUp space-y-6">
        
        <Section
          icon={<FaInfoCircle className="text-blue-500 text-xl" />}
          title="1. Introduction"
          text="These Terms and Conditions govern the receipt of payments by Dklean Health Care Public Charitable Trust, a non-profit organization registered under relevant laws. By making a payment or donation, the payer (“Donor” or “Sponsor”) agrees to abide by these Terms and Conditions."
        />

        <Section
          icon={<FaCheckCircle className="text-green-500 text-xl" />}
          title="2. Nature of Payment"
          text={
            <>
              Payments made to the NGO may be classified as:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Donations (voluntary, with or without specific purposes)</li>
                <li>Grants or Sponsorships (based on formal agreement or MOU)</li>
                <li>Project-Based Funding (subject to specific deliverables)</li>
              </ul>
            </>
          }
        />

        <Section
          icon={<FaCheckCircle className="text-green-500 text-xl" />}
          title="3. Purpose of Funds"
          text="Unless specified by the donor and agreed upon in writing, all payments received shall be used solely for the purposes outlined in the NGO’s mission and activities, including but not limited to education, healthcare, community development, and awareness programs."
        />

        <Section
          icon={<FaExclamationTriangle className="text-yellow-500 text-xl" />}
          title="4. Acknowledgment and Receipts"
          text={
            <>
              <p>Upon receipt of the payment, the NGO will issue an official receipt to the donor within 7 working days.</p>
              <p className="mt-2">Donations eligible for tax exemption under Section 80G or other applicable law will be provided the necessary certificates.</p>
            </>
          }
        />

        <Section
          icon={<FaExclamationTriangle className="text-yellow-500 text-xl" />}
          title="5. Refund Policy"
          text={
            <>
              <p>Donations once made are generally non-refundable.</p>
              <p className="mt-2">In exceptional cases (such as duplicate transactions), refunds may be processed upon written request within 15 days of payment, subject to management approval.</p>
            </>
          }
        />

        <Section
          icon={<FaCheckCircle className="text-green-500 text-xl" />}
          title="6. Banking and Payment Methods"
          text={
            <>
              Payments may be made via:
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Bank Transfer / NEFT / RTGS</li>
                <li>UPI / Wallets</li>
                <li>Cheques or Demand Drafts (in favor of “Dklean Health Care Public Charitable Trust”)</li>
                <li>Online payment through our official website/payment gateway</li>
              </ul>
            </>
          }
        />

        <Section
          icon={<FaInfoCircle className="text-blue-500 text-xl" />}
          title="7. Donor Privacy"
          text={
            <>
              <p>Donor information will be kept confidential and used solely for communication and statutory reporting.</p>
              <p className="mt-2">We will not share donor information with third parties without prior consent.</p>
            </>
          }
        />

        <Section
          icon={<FaCheckCircle className="text-green-500 text-xl" />}
          title="8. Compliance and Reporting"
          text="The NGO complies with all applicable laws and financial reporting requirements. Funds received will be accounted for transparently and reported in our annual financial statement and impact report."
        />

        <Section
          icon={<FaExclamationTriangle className="text-yellow-500 text-xl" />}
          title="9. Use of Donor Name and Logo"
          text="Use of a donor’s name or logo for publicity or acknowledgment will be done only with prior written permission."
        />

        <Section
          icon={<FaExclamationTriangle className="text-yellow-500 text-xl" />}
          title="10. Dispute Resolution"
          text="In case of any disputes, the matter will be resolved amicably. If not resolved, the jurisdiction shall lie with the courts of Delhi."
        />

        <div className="mt-10 flex justify-center">
          <img src="/assets/terms_conditions.svg" alt="Terms and Conditions" className="w-2/3 animate__animated animate__zoomIn" />
        </div>
      </main>
    </div>
  );
};

const Section = ({ icon, title, text }) => (
  <div className="flex items-start gap-4">
    <div className="pt-1">{icon}</div>
    <div>
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <div className="text-lg text-gray-700 leading-relaxed">{text}</div>
    </div>
  </div>
);

export default TermsConditions;
