import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function PrivacyPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-text-primary mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
          <p className="text-lg">
            Last updated: January 2025
          </p>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            1. Information We Collect
          </h2>
          <p>
            When you use ReSight, we collect minimal information necessary to provide our services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Account Information:</strong> Email address for account creation and license management</li>
            <li><strong>License Information:</strong> Machine identifier for license activation (hashed for privacy)</li>
            <li><strong>Payment Information:</strong> Processed securely by Stripe; we do not store payment details</li>
          </ul>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            2. How We Use Your Information
          </h2>
          <p>
            We use your information solely for:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Managing your account and license</li>
            <li>Providing customer support</li>
            <li>Sending important updates about the software</li>
          </ul>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            3. Data Security
          </h2>
          <p>
            We implement industry-standard security measures to protect your data. Passwords
            are hashed and never stored in plain text. All data transmission is encrypted
            using HTTPS.
          </p>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            4. Third-Party Services
          </h2>
          <p>
            We use the following third-party services:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Stripe:</strong> For secure payment processing</li>
            <li><strong>Google Analytics:</strong> For anonymous usage statistics</li>
          </ul>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            5. Data Retention
          </h2>
          <p>
            We retain your account information as long as your account is active. You may
            request deletion of your data by contacting us through Discord.
          </p>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            6. Your Rights
          </h2>
          <p>
            You have the right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Access your personal data</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            7. Cookies
          </h2>
          <p>
            We use essential cookies for authentication and session management. We also use
            analytics cookies to understand how visitors use our website.
          </p>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            8. Changes to This Policy
          </h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any
            significant changes via email.
          </p>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            9. Contact
          </h2>
          <p>
            For privacy-related questions, please contact us through our Discord community.
          </p>
        </div>
      </div>
    </div>
  );
}
