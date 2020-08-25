try {
  if (/google\.\w+$/.test(location.hostname)) {
    [...document.querySelectorAll('a')].forEach((link) => {
      if (link.href) {
        link.href = link.href.replace(/#:~:.*$/, '');
      }
    });
  }
} catch(e) {}
