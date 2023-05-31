const fetch = require('node-fetch');

fetch('https://www.google.com/supported_domains')
    .then(res => res.text())
    .then(body => {
      const domains = body
        .trim()
        .split(/\s/)
        .sort()
        .map(domain => `        "https://www${domain}/search?*"`)
        .join(',\n');
      console.log(domains);
    });
