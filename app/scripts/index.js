try {
  if (/google\.\w+$/.test(location.hostname)) {
    [...document.querySelectorAll('a')].forEach((link) => {
      link.href = link.href.replace(/#:~:.*$/, '');
    });
  }
} catch(e) {}
