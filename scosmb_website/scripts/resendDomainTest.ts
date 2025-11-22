import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); // Set your API key in .env.local

// 1. Add Domain
export async function addDomain(domain: string) {
  return await resend.domains.create({ name: domain });
}

// 2. Retrieve Domain
export async function getDomain(domainId: string) {
  return await resend.domains.get(domainId);
}

// 3. Verify Domain
export async function verifyDomain(domainId: string) {
  return await resend.domains.verify(domainId);
}

// 4. Update Domain
export async function updateDomain(domainId: string, openTracking: boolean, clickTracking: boolean) {
  return await resend.domains.update({
    id: domainId,
    openTracking,
    clickTracking,
  });
}

// 5. List Domains
export async function listDomains() {
  return await resend.domains.list();
}

// 6. Delete Domain
export async function deleteDomain(domainId: string) {
  return await resend.domains.remove(domainId);
}

// Example usage (uncomment to test):
// (async () => {
//   const added = await addDomain('sco-smb.com');
//   console.log('Added:', added);
//
//   const listed = await listDomains();
//   console.log('Domains:', listed);
//
//   // Replace with your real domain ID
//   // const domainId = 'your-domain-id';
//   // const retrieved = await getDomain(domainId);
//   // console.log('Retrieved:', retrieved);
// })();
