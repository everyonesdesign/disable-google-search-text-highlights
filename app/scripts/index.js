try {
  [...document.querySelectorAll('a')].forEach((link) => {
    const regex = /#:~:.*$/;
    if (typeof link.href === 'string' && regex.test(link.href)) {
      link.href = link.href.replace(regex, '');
    }
  });
} catch(e) {}
