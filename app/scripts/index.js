try {
  const TEXT_HIGHLIGHT_DIRECTIVE_ID = 'text';
  const FRAGMENT_DIRECTIVE_SEPARATOR = ':~:';

  [...document.querySelectorAll('a')].forEach((link) => {
    if (typeof link.href === 'string' && link.href.includes(FRAGMENT_DIRECTIVE_SEPARATOR)) {
      const url = new URL(link.href);
      const [ hash, fragmentDirectivesString ] = url.hash.split(FRAGMENT_DIRECTIVE_SEPARATOR);

      const fragmentDirectives = new URLSearchParams(fragmentDirectivesString);

      if (fragmentDirectives.get(TEXT_HIGHLIGHT_DIRECTIVE_ID) === null) {
        return;
      }

      fragmentDirectives.delete(TEXT_HIGHLIGHT_DIRECTIVE_ID);
      const newFragmentDirectivesString = fragmentDirectives.toString();

      url.hash = newFragmentDirectivesString ?
        `${hash}${FRAGMENT_DIRECTIVE_SEPARATOR}${newFragmentDirectivesString}` :
        hash;

      // remove trailing hash
      let newHref = url.href;
      if (/^[^#]+#$/.test(newHref)) {
        newHref = newHref.slice(0, -1);
      }

      link.href = newHref;
    }
  });
} catch(e) {}
