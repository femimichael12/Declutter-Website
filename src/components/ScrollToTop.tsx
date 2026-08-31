import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * ScrollToTop handles global route scroll restoration and scroll position resets.
 * - On PUSH/REPLACE navigation (clicking any product, link, category, related item):
 *   Resets window scroll to top (0, 0) immediately with zero flicker.
 * - On POP navigation (browser Back / Forward buttons):
 *   Restores the saved scroll position for that specific history entry naturally.
 * - On Hash navigation (e.g. #specs):
 *   Scrolls to the target element if present.
 */
export function ScrollToTop() {
  const location = useLocation();
  const navType = useNavigationType();
  const scrollPositions = useRef<Map<string, number>>(new Map());

  // Record scroll position continuously per history key
  useEffect(() => {
    const handleScroll = () => {
      if (location.key) {
        scrollPositions.current.set(location.key, window.scrollY);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.key]);

  // Execute scroll adjustment on route / search / hash change
  useLayoutEffect(() => {
    // 1. Handle anchor hash links
    if (location.hash) {
      const elem = document.querySelector(location.hash);
      if (elem) {
        elem.scrollIntoView();
        return;
      }
    }

    // 2. Handle browser Back / Forward (POP)
    if (navType === 'POP') {
      const savedY = scrollPositions.current.get(location.key);
      if (typeof savedY === 'number') {
        window.scrollTo(0, savedY);
      } else {
        window.scrollTo(0, 0);
      }
      return;
    }

    // 3. Handle standard navigation (PUSH / REPLACE): Reset to top instantly
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior,
    });
  }, [location.pathname, location.search, location.hash, location.key, navType]);

  return null;
}
