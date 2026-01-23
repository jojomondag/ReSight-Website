import { setRequestLocale } from "next-intl/server";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TermsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-text-primary mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-invert max-w-none space-y-6 text-text-secondary">
          <p className="text-lg">
            Last updated: January 2025
          </p>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using ReSight, you agree to be bound by these Terms of Service.
            If you do not agree to these terms, please do not use the software.
          </p>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            2. License Grant
          </h2>
          <p>
            Upon purchase, you are granted a non-exclusive, non-transferable license to use
            ReSight on one (1) machine. This license is for personal use only.
          </p>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            3. Acceptable Use
          </h2>
          <p>
            ReSight is designed to enhance your gaming experience through visual overlays and
            convenience features. You agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Use ReSight in compliance with all applicable game terms of service</li>
            <li>Not use ReSight to gain unfair competitive advantages in games that prohibit such tools</li>
            <li>Not redistribute, resell, or share your license key</li>
            <li>Not reverse engineer, decompile, or modify the software</li>
          </ul>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            4. Disclaimer
          </h2>
          <p>
            ReSight is provided &quot;as is&quot; without warranty of any kind. We are not responsible
            for any consequences resulting from the use of this software, including but not
            limited to game bans or account suspensions. Always check your game&apos;s terms of
            service before using overlay software.
          </p>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            5. Refund Policy
          </h2>
          <p>
            Due to the digital nature of the product, all sales are final. However, if you
            experience technical issues that prevent you from using the software, please
            contact support.
          </p>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            6. Changes to Terms
          </h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the
            software after changes constitutes acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-semibold text-text-primary mt-8">
            7. Contact
          </h2>
          <p>
            For questions about these terms, please contact us through our Discord community.
          </p>
        </div>
      </div>
    </div>
  );
}
