const fetch = require('node-fetch');

/*
 * Google removed these domains from the supported list
 * They're still kept here for 2 reasons:
 * - at some point Google might want to bring them back
 * - removing domains from manifest might trigger a redundant prompt from users to re-confirm permissions?
*/
const LEGACY_DOMAINS = [
  '.google.vg',
  '.google.ms',
  '.google.com.ai',
];

fetch('https://www.google.com/supported_domains')
    .then(res => res.text())
    .then(body => {
      const domains = body
        .trim()
        .split(/\s/)
        .concat(LEGACY_DOMAINS)
        .sort()
        .map(domain => `        "https://www${domain}/search?*"`)
        .join(',\n');
      console.log(domains);
    });
