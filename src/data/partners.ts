export type PartnerCategory = 'PROP FIRM' | 'BROKER' | 'EDUCATION PARTNER';

export type Partner = {
  name: string;
  category: PartnerCategory;
  logo: string;
  logoBackground: string;
  code: string;
  offer: string;
  url: string;
};

export const partners: Partner[] = [
  { name: 'FundedSquad', category: 'PROP FIRM', logo: '/images/partners/fundedsquad.png', logoBackground: '#212219', code: 'KNIGHTFX', offer: '', url: 'https://fundedsquad.com/?squad=3434' },
  { name: 'BlueGuardian', category: 'PROP FIRM', logo: '/images/partners/blueguardian.png', logoBackground: '#112C44', code: 'KNIGHTFX', offer: '', url: 'https://blueguardian.com/?afmc=KnightFx' },
  { name: 'Legion Funding', category: 'PROP FIRM', logo: '/images/partners/legion-funding.png', logoBackground: '#175A82', code: 'KNIGHTFX', offer: '', url: 'https://checkout.legionfunding.com/ref/2127/' },
  { name: 'Foraxis', category: 'PROP FIRM', logo: '/images/partners/foraxis.png', logoBackground: '#0A1E28', code: 'KNIGHTFX', offer: '', url: 'https://dashboard.foraxis.com/?ref=KNIGHTFX' },
  { name: 'FunderBlu', category: 'PROP FIRM', logo: '/images/partners/funderblu.png', logoBackground: '#1D242C', code: 'KNIGHTFX', offer: '', url: 'https://affiliates.funderblu.com/click?campaign_id=4&ref_id=644' },
  { name: 'Valetax', category: 'BROKER', logo: '/images/partners/valetax.png', logoBackground: '#141921', code: '', offer: '', url: 'https://ma.valetax.com/p/6882272' },
  { name: 'XM Global', category: 'BROKER', logo: '/images/partners/xm-global.png', logoBackground: '#FFFFFF', code: '', offer: '', url: 'https://affs.click/DneRX' },
  { name: 'Infinity Vision', category: 'EDUCATION PARTNER', logo: '/images/partners/infinity-vision.png', logoBackground: '#1B1F25', code: '', offer: '', url: 'https://www.infinityvisionfx.com/r/LNSHZG' },
];
