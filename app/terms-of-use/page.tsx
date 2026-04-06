import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Read our terms of use to understand the rules and regulations of our service.",
};

export default function TermsOfUse() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Dark Header for Navbar visibility */}
      <div className="bg-[#0A163B] w-full">
        <Navbar />
      </div>
      
      <div className="flex-1 w-full max-w-4xl mx-auto px-6 py-16 md:py-24">
        <div className="prose prose-blue max-w-none prose-headings:text-[#0A163B] text-[#1A3FA8]">
          <h1 className="text-[#0A163B]">Terms of Use</h1>
          <p className="text-gray-500">Last updated: April 6, 2026</p>
          
          <p>Please read these Terms of Use (&quot;Terms&quot;, &quot;Terms of Use&quot;) carefully before using
          the holacxo.com website (the &quot;Service&quot;) operated by HolaCXO (&quot;us&quot;, &quot;we&quot;, or
          &quot;our&quot;).</p>
          
          <p>Your access to and use of the Service is conditioned upon your acceptance of and
          compliance with these Terms. These Terms apply to all visitors, users, and others
          who wish to access or use the Service. By accessing or using the Service you
          agree to be bound by these Terms. If you disagree with any part of these Terms,
          you do not have permission to access the Service.</p>
          
          <h2>Purchases Privacy Policy7</h2>
          <p>HolaCXO does not currently process payments directly through this website. All
          engagements are initiated and agreed upon through direct communication
          between HolaCXO and the client. Payment terms, amounts, and schedules are
          established through a separate project scope agreement signed by both parties
          prior to commencement of any work.</p>
          
          <p>HolaCXO intends to introduce online payment functionality in the future. When
          that functionality becomes available, these Terms will be updated accordingly and
          you will be notified of any material changes. Until that time, all financial
          transactions are handled offline and governed by the individual project scope
          agreement entered into between HolaCXO and the client.</p>
          
          <h2>Subscriptions</h2>
          <p>Some parts of the Service may in the future be offered on a subscription basis
          (&quot;Subscription(s)&quot;). When subscription billing becomes available through the
          Service, you will be billed in advance on a recurring and periodic basis (&quot;Billing
          Cycle&quot;). Billing cycles will be set on either a monthly or annual basis, depending
          on the type of subscription plan selected.</p>
          
          <p>At the end of each Billing Cycle, your Subscription will automatically renew under
          the exact same conditions unless you cancel it or HolaCXO cancels it. You may
          cancel your Subscription renewal either through your online account management
          page or by contacting the HolaCXO support team.</p>
          
          <p>A valid payment method will be required to process the payment for your
          Subscription. You shall provide HolaCXO with accurate and complete billing
          information including full name, address, state, zip code, telephone number, and
          valid payment method information. By submitting such payment information, you
          automatically authorise HolaCXO to charge all Subscription fees incurred through
          your account to any such payment instruments.</p>
          
          <p>Should automatic billing fail to occur for any reason, HolaCXO will issue an
          electronic invoice indicating that you must proceed manually, within a certain
          deadline date, with the full payment corresponding to the billing period as
          indicated on the invoice.</p>
          
          <h2>Trial Engagement and Commitment Deposit Privacy Policy8</h2>
          <p>HolaCXO may, at its sole discretion, offer prospective clients the opportunity to
          begin an engagement through a structured trial period (&quot;Trial Engagement&quot;). The
          Trial Engagement is designed to allow both parties to work together toward a
          defined set of outcomes before committing to a full engagement.</p>
          
          <h3>Commitment Deposit</h3>
          <p>To initiate a Trial Engagement, the client is required to pay a commitment deposit
          (&quot;Deposit&quot;). The Deposit is calculated as a percentage of the agreed total
          engagement value and is established in the project scope agreement (&quot;Scope
          Agreement&quot;) signed by both parties prior to the commencement of the Trial
          Engagement. The Deposit is not a payment for a deliverable — it is a mutual
          commitment that both HolaCXO and the client are entering the Trial Engagement in
          good faith with shared accountability for the outcome.</p>
          
          <h3>Measurable Outcomes</h3>
          <p>Prior to the commencement of any Trial Engagement, HolaCXO and the client will
          agree in writing on the specific, measurable outcomes that define success for the
          Trial Engagement (&quot;Success Metrics&quot;). These Success Metrics will be
          documented in the Scope Agreement and will serve as the sole basis for
          evaluating whether the Trial Engagement has been successfully completed.</p>
          <p>Success Metrics may include but are not limited to the number of enterprise
          introductions made, pipeline value generated, logos onboarded, or revenue
          milestones reached, as agreed between the parties.</p>
          
          <h3>Duration</h3>
          <p>The duration of the Trial Engagement will be defined in the Scope Agreement.
          HolaCXO will work toward the agreed Success Metrics within the defined timeline.</p>
          
          <h3>Modification</h3>
          <p>At any time and without notice, HolaCXO reserves the right to (i) modify the terms
          and conditions of the Trial Engagement offering, or (ii) discontinue the Trial
          Engagement offering entirely for future clients. Any Trial Engagement already in
          progress and governed by a signed Scope Agreement will not be affected by such
          changes.</p>
          
          <h2>Refunds Privacy Policy9</h2>
          <h3>Trial Engagement Deposit Refund</h3>
          <p>The Deposit paid to initiate a Trial Engagement is refundable solely in the event
          that HolaCXO fails to meet the Success Metrics defined in the Scope Agreement
          within the agreed timeline. In such circumstances, the full Deposit will be returned
          to the client within 14 business days of the conclusion of the Trial Engagement
          period.</p>
          
          <p>The Deposit is non-refundable in the following circumstances:</p>
          <ul>
            <li>The agreed Success Metrics are fully or substantially met as defined in the
          Scope Agreement</li>
            <li>The client voluntarily withdrew from the Trial Engagement prior to its
          conclusion for reasons unrelated to HolaCXO&apos;s performance</li>
            <li>The client fails to provide the access, information, introductions, or
          cooperation reasonably required by HolaCXO to deliver the agreed outcomes</li>
            <li>The client requests a refund after the agreed Trial Engagement period has
          concluded without raising a formal dispute during the engagement</li>
          </ul>
          
          <h3>Dispute Resolution</h3>
          <p>In the event of a dispute regarding whether the Success Metrics have been met,
          both parties agree to first attempt resolution through good faith discussion. If
          resolution cannot be reached within 14 business days of a written dispute being
          raised, both parties agree to refer the matter to a mutually agreed independent
          mediator before pursuing any legal remedy.</p>
          
          <h3>All Other Fees</h3>
          <p>Except when required by law or as stated above in relation to Trial Engagement
          Deposits, all fees paid to HolaCXO are non-refundable once work has commenced
          under a signed Scope Agreement.</p>
          
          <h3>Fee Changes</h3>
          <p>HolaCXO, in its sole discretion and at any time, may modify its engagement fees
          and pricing structure. Any fee changes will be communicated to existing clients
          with reasonable prior notice and will not affect engagements already in progress
          under a signed Scope Agreement. New fee structures will apply only to
          engagements initiated after the effective date of the change Privacy Policy10.</p>
          <p>Your continued engagement with HolaCXO after a fee change has been
          communicated and accepted constitutes your agreement to the modified fee
          structure.</p>
          
          <h2>Accounts</h2>
          <p>When you create an account with us, you guarantee that you are above the age of
          18 and that the information you provide us is accurate, complete, and current at all
          times. Inaccurate, incomplete, or obsolete information may result in the immediate
          termination of your account on the Service.</p>
          
          <p>You are responsible for maintaining the confidentiality of your account and
          password, including but not limited to the restriction of access to your computer
          and/or account. You agree to accept responsibility for any and all activities or
          actions that occur under your account and/or password, whether your password
          is with our Service or a third-party service.</p>
          
          <p>You must notify us immediately upon becoming aware of any breach of security or
          unauthorised use of your account. We reserve the right to refuse service,
          terminate accounts, remove or edit content, or cancel orders in our sole
          discretion.</p>
          
          <h2>Intellectual Property</h2>
          <p>The Service and its original content, features, and functionality are and will remain
          the exclusive property of HolaCXO and its licensors. The Service is protected by
          copyright, trademark, and other laws of both the United States and foreign
          countries.</p>
          
          <p>Our trademarks and trade dress may not be used in connection with any product
          or service without the prior written consent of HolaCXO.</p>
          
          <h2>Links to Other Websites Privacy Policy11</h2>
          <p>Our Service may contain links to third-party websites or services that are not
          owned or controlled by HolaCXO. HolaCXO has no control over and assumes no
          responsibility for the content, privacy policies, or practices of any third-party
          websites or services. We do not warrant the offerings of any of these entities or
          their websites.</p>
          
          <p>You acknowledge and agree that HolaCXO shall not be responsible or liable,
          directly or indirectly, for any damage or loss caused or alleged to be caused by or
          in connection with the use of or reliance on any such content, goods, or services
          available on or through any such third-party websites or services. We strongly
          advise you to read the terms and conditions and privacy policies of any third-party
          websites or services that you visit.</p>
          
          <h2>Indemnification</h2>
          <p>You agree to defend, indemnify, and hold harmless HolaCXO and its licensees and
          licensors, and their employees, contractors, agents, officers, and directors, from
          and against any and all claims, damages, obligations, losses, liabilities, costs or
          debt, and expenses (including but not limited to attorney&apos;s fees), resulting from or
          arising out of:</p>
          <p>(a) your use and access of the Service, by you or any person using your account
          and password, or</p>
          <p>(b) a breach of these Terms.</p>
          
          <h2>Limitation of Liability</h2>
          <p>In no event shall HolaCXO, nor its directors, employees, partners, agents,
          suppliers, or affiliates, be liable for any indirect, incidental, special, consequential,
          or punitive damages, including without limitation, loss of profits, data, use,
          goodwill, or other intangible losses, resulting from:</p>
          <p>(i) your access to or use of or inability to access or use the Service;</p>
          <p>(ii) any conduct or content of any third party on the Service;</p>
          <p>(iii) any content obtained from the Service; and</p>
          <p>(iv) unauthorised access, use, or alteration of your transmissions or content,
          whether based on warranty, contract, tort (including negligence) or any other legal
          theory, whether or not we have been informed of the possibility of such damage Privacy Policy12,
          and even if a remedy set forth herein is found to have failed of its essential
          purpose.</p>
          
          <h2>Disclaimer</h2>
          <p>Your use of the Service is at your sole risk. The Service is provided on an &quot;AS IS&quot;
          and &quot;AS AVAILABLE&quot; basis. The Service is provided without warranties of any
          kind, whether express or implied, including but not limited to implied warranties of
          merchantability, fitness for a particular purpose, non-infringement, or course of
          performance.</p>
          
          <p>HolaCXO, its subsidiaries, affiliates, and licensors do not warrant that:</p>
          <p>(a) the Service will function uninterrupted, secure, or available at any particular
          time or location;</p>
          <p>(b) any errors or defects will be corrected;</p>
          <p>(c) the Service is free of viruses or other harmful components; or</p>
          <p>(d) the results of using the Service will meet your requirements.</p>
          
          <h2>Exclusions</h2>
          <p>Some jurisdictions do not allow the exclusion of certain warranties or the
          exclusion or limitation of liability for consequential or incidental damages, so the
          limitations above may not apply to you.</p>
          
          <h2>Governing Law Privacy Policy13</h2>
          <p>These Terms shall be governed and construed in accordance with the laws of
          Delaware, United States, without regard to its conflict of law provisions.</p>
          
          <p>Our failure to enforce any right or provision of these Terms will not be considered
          a waiver of those rights. If any provision of these Terms is held to be invalid or
          unenforceable by a court, the remaining provisions of these Terms will remain in
          effect. These Terms constitute the entire agreement between us regarding our
          Service and supersede and replace any prior agreements we may have had
          between us regarding the Service.</p>
          
          <h2>Changes</h2>
          <p>We reserve the right, at our sole discretion, to modify or replace these Terms at
          any time. If a revision is material, we will provide at least 30 days&apos; notice prior to
          any new terms taking effect. What constitutes a material change will be
          determined at our sole discretion.</p>
          
          <p>By continuing to access or use our Service after any revisions become effective,
          you agree to be bound by the revised terms. If you do not agree to the new terms,
          you are no longer authorised to use the Service.</p>
          
          <h2>Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p>Email: tanushka@holacxo.com Website: holacxo.com Privacy Policy14</p>
        </div>
      </div>
      
      <Footer />
    </main>
  );
}
