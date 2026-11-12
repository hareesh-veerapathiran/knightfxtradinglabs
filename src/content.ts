export type SitePage = 'home' | 'about' | 'mentorship' | 'partnerships' | 'community';

export const pages: { id: SitePage; label: string; path: string; title: string; description: string }[] = [
  { id: 'home', label: 'Home', path: '/', title: 'KNIGHTFX Trading Labs | Master the Market. Money Follows.', description: 'KNIGHTFX Trading Labs — trading education rooted in market understanding, discipline and structured practice.' },
  { id: 'about', label: 'About', path: '/about', title: 'About | KNIGHTFX Trading Labs', description: 'Discover the KNIGHTFX approach to market education, risk awareness and disciplined trading practice.' },
  { id: 'mentorship', label: 'Mentorship', path: '/mentorship', title: 'Mentorship | KNIGHTFX Trading Labs', description: 'Explore structured KNIGHTFX mentorship across market analysis, risk management and trading psychology.' },
  { id: 'partnerships', label: 'Partnerships', path: '/partnerships', title: 'Partnerships | KNIGHTFX Trading Labs', description: 'Connect with KNIGHTFX Trading Labs about considered education and market media partnerships.' },
  { id: 'community', label: 'Community', path: '/community', title: 'Community | KNIGHTFX Trading Labs', description: 'A learning environment for market discussion, mentorship and thoughtful trading development.' },
];

export const navItems = pages;

