(function() {
  const IS_RUNNING_TESTS = typeof window === 'undefined' && global;
  const TEXT_HIGHLIGHT_DIRECTIVE_ID = 'text';
  const FRAGMENT_DIRECTIVE_SEPARATOR = ':~:';

  function getUrlWithoutHighlights(hrefInput) {
    let url;
    try {
      url = new URL(hrefInput);
    } catch(e) {
      return hrefInput;
    }
    const [ hash, fragmentDirectivesString ] = url.hash.split(FRAGMENT_DIRECTIVE_SEPARATOR);

    const fragmentDirectives = new URLSearchParams(fragmentDirectivesString);

    if (fragmentDirectives.get(TEXT_HIGHLIGHT_DIRECTIVE_ID) === null) {
      return hrefInput;
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

    return newHref;
  }

  /**
   * The links are completely replaced instead of just modifying URLs
   *
   * This is done in order to get rid of the original JS handlers
   * bound to the links
   */
  function recreateLink(link, newHref) {
    const EXCLUDED_ATTRIBUTES = ['ping'];
    const newLink = document.createElement('a');

    link.getAttributeNames().filter((attr) => {
      return !EXCLUDED_ATTRIBUTES.includes(attr);
    }).forEach((attr) => {
      newLink.setAttribute(attr, link.getAttribute(attr));
    });

    newLink.href = newHref;

    [...link.children].forEach(child => {
      newLink.appendChild(child);
    });

    link.parentNode.insertBefore(newLink, link);
    link.remove();
  }

  function resetLinks() {
    [...document.querySelectorAll(`a[href*="#${FRAGMENT_DIRECTIVE_SEPARATOR}"]`)]
      .forEach((link) => {
        try {
          const newHref = getUrlWithoutHighlights(link.href);

          // create alternative link element
          recreateLink(link, newHref);
        } catch(e) {};
      });
  }

  // AVOID IMPERATIVE PART IN TESTS
  if (IS_RUNNING_TESTS) {
    global.getUrlWithoutHighlights = getUrlWithoutHighlights;
    return;
  }

  resetLinks();
  setInterval(resetLinks, 100);
}());