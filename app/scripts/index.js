try {
  // See https://ipfs.io/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/List_of_Google_domains.html
  // for the full list of Google domains
  if (/google\.((com?\.)?\w+|)$/.test(location.hostname)) {
    [...document.querySelectorAll('a')].forEach((link) => {
      const regex = /#:~:.*$/;
      if (typeof link.href === 'string' && regex.test(link.href)) {
        link.href = link.href.replace(regex, '');
      }
    });
  }
} catch(e) {}
