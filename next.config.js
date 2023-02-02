const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  font-src 'self';
  img-src 'self' data:;
  media-src 'self' data: i.imgur.com v.redd.it;
`;

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  }, {
    key: 'X-XSS-Protection',
    value: '1; mode=block'
  }, {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN'
  }, {
    key: 'Permissions-Policy',
    value: ''
  }, {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }, {
    key: 'Referrer-Policy',
    value: 'no-referrer'
  }, {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy.replace(/\s{2,}/g, ' ').trim()
  }
];

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    domains: ["external-preview.redd.it", "preview.redd.it"],
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
};
