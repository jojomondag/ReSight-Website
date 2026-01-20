import crypto from "crypto";

export function generateLicenseKey(): string {
  const segments = [];
  for (let i = 0; i < 4; i++) {
    const segment = crypto.randomBytes(4).toString("hex").toUpperCase().slice(0, 5);
    segments.push(segment);
  }
  return segments.join("-");
}

export function signLicenseData(data: {
  license_key: string;
  machine_id: string;
  activated_at: string;
}): string {
  const privateKey = process.env.RSA_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("Missing RSA_PRIVATE_KEY environment variable");
  }

  // Format must match what the app expects: licenseKey|machineId|activatedAt
  const dataString = `${data.license_key}|${data.machine_id}|${data.activated_at}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(dataString);
  sign.end();

  const signature = sign.sign(
    privateKey.replace(/\\n/g, "\n"),
    "base64"
  );

  return signature;
}

export function verifyLicenseSignature(
  data: {
    license_key: string;
    machine_id: string;
    activated_at: string;
  },
  signature: string
): boolean {
  const publicKey = process.env.RSA_PUBLIC_KEY;
  if (!publicKey) {
    throw new Error("Missing RSA_PUBLIC_KEY environment variable");
  }

  // Format must match: licenseKey|machineId|activatedAt
  const dataString = `${data.license_key}|${data.machine_id}|${data.activated_at}`;
  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(dataString);
  verify.end();

  return verify.verify(publicKey.replace(/\\n/g, "\n"), signature, "base64");
}
