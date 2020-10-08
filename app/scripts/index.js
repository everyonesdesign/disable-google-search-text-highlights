try {
  const TEXT_HIGHLIGHT_DIRECTIVE_ID = 'text';
  const FRAGMENT_DIRECTIVE_SEPARATOR = ':~:';

  [...document.querySelectorAll('a')].forEach((link) => {
    if (typeof link.href === 'string' && link.href.includes(FRAGMENT_DIRECTIVE_SEPARATOR)) {
      const url = new URL(link.href);
      const [ hash, fragmentDirectivesString ] = url.hash.split(FRAGMENT_DIRECTIVE_SEPARATOR);

      const fragmentDirectives = new URLSearchParams(fragmentDirectivesString);
      fragmentDirectives.delete(TEXT_HIGHLIGHT_DIRECTIVE_ID);
      const newFragmentDirectivesString = fragmentDirectives.toString();

      url.hash = newFragmentDirectivesString ?
        `${hash}${FRAGMENT_DIRECTIVE_SEPARATOR}${newFragmentDirectivesString}` :
        hash;

      link.href = url.href;
    }
  });
} catch(e) {}
