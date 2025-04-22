import React from 'react';
import { Link } from 'react-router-dom';
import PaddingMarging from '../components/ui/PaddingMarging';

const PrivacyPolicy = () => {
  return (
    <div className='bg-bg'>
        <div className='pt-10'>
        <Link to="/" className='px-3 md:px-10 hover:text-accent'>Back to home</Link>
        </div>
      <div className="w-full md:w-[80%] lg:w-[70%] mx-auto py-10">
        <PaddingMarging>
        <div className=" text-black font-manrope p-6 text-xs md:text-base">
          <h1 className="text-lg md:text-xl font-bold mb-6">
            Privacy Policy & Terms of Service for EmpathyBot
          </h1>
          <p className="mb-6">Last Updated: 23/04/2025</p>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              1. What Information We Collect
            </h2>
            <p className="mb-2">
              We collect two types of memory to make your conversations more personal and helpful:
            </p>
            <ul className="list-disc pl-6 mb-2">
              <li>
                <strong>Core Memory:</strong> Important info like your name or preferences to keep
                conversations consistent.
              </li>
              <li>
                <strong>Long-Term Memory:</strong> Info remembered over time for deeper
                understanding and emotional support.
              </li>
            </ul>
            <p>
              We do not save full chat histories — only important pieces that help improve the
              experience.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">2. How We Use Your Data</h2>
            <ul className="list-disc pl-6">
              <li>To make the bot emotionally aware and consistent.</li>
              <li>To personalize your experience.</li>
              <li>To improve the bot using your feedback.</li>
            </ul>
            <p className="mt-2">We do not sell or share your data.</p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              3. Your Account and Email Communication
            </h2>
            <p>
              Your login details are encrypted. Upon signup, you agree to receive update and
              promotional emails. You can unsubscribe anytime.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">4. Your Rights Over Your Data</h2>
            <p>
              You can delete all stored memory from our backend at any time. You also give us
              permission to store memories as soon as you sign up.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              5. Use of Third-Party Technology
            </h2>
            <p>
              We use OpenAI’s language model. Their privacy policy also applies when using
              EmpathyBot.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">6. How We Keep Your Data Safe</h2>
            <p>
              We use encrypted storage and secure systems to keep your data safe. No system is 100%
              secure, but we do our best to protect your info.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">7. Age and Parental Consent</h2>
            <p>
              You must be 13+ to use EmpathyBot. If you are under 18, parental or guardian consent
              is required.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">8. For International Users</h2>
            <p>
              We operate from India. If you're outside India, you’re responsible for following your
              country’s data privacy laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">9. Feedback and Improvement</h2>
            <p>
              We use your feedback (not tied to your name or identity) to improve EmpathyBot’s
              responses and features.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              10. Changes in Features and Privacy Policy
            </h2>
            <p>
              EmpathyBot is in development. Features may change, and so can this policy. We'll
              notify you of any updates.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">
              11. No Subscription Right Now (But Maybe Later)
            </h2>
            <p>
              The product is currently free. We may add a subscription later and will inform you if
              we do.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">12. Legal Status and Disputes</h2>
            <p>
              EmpathyBot is not officially registered yet. Any issues will be resolved through
              mutual discussion.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-lg md:text-xl font-semibold mb-2">13. Contact Us</h2>
            <p>
              If you have questions, email us at{' '}
              <a href="mailto:paleriyapratham@gmail.com" className="text-blue-600 underline">
                paleriyapratham@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
        </PaddingMarging>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
