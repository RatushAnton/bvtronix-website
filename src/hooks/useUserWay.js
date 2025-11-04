// src/hooks/useUserWay.js
import { useEffect, useRef } from "react";

/**
 * Robust UserWay loader that re-injects the widget on language change
 * and avoids the “icon disappears until reload” race.
 */
export default function useUserWay({
  account = "rQcJWhMFbI",
  lang = "en",
  position = "6",
  layout = "full",
} = {}) {
  const retryRef = useRef(null);

  useEffect(() => {
    // 1) Hard purge any previous widget traces
    function purgeUserWay() {
      // Remove script tags
      document
        .querySelectorAll('script[src*="cdn.userway.org/widget.js"]')
        .forEach((el) => el.parentNode?.removeChild(el));

      // Remove common widget containers / overlays
      const idsToRemove = [
        "userwayAccessibilityIcon",
        "uw-snackbar",
        "uw-aria-modal",
        "userwayModal",
        "uw-widget",
      ];
      idsToRemove.forEach((id) => {
        const el = document.getElementById(id);
        if (el?.parentNode) el.parentNode.removeChild(el);
      });

      // Remove any dynamically created nodes that start with uw-
      document.querySelectorAll('[id^="uw-"]').forEach((el) => {
        el.parentNode?.removeChild(el);
      });

      // Nuke globals if present
      try {
        // Different builds name this differently
        // eslint-disable-next-line no-undef
        if (window.UserWay) delete window.UserWay;
        // eslint-disable-next-line no-undef
        if (window.userway) delete window.userway;
      } catch (_) {}
    }

    function injectUserWay() {
      const s = document.createElement("script");
      // cache-bust to force a fresh load every language switch
      s.src = `https://cdn.userway.org/widget.js?ts=${Date.now()}`;
      s.async = true;

      s.setAttribute("data-account", account);
      s.setAttribute("data-language", lang);     // ← switch UI language
      s.setAttribute("data-position", position); // ← keep icon in same place
      s.setAttribute("data-widget_layout", layout);

      s.onload = () => {
        // After load, check that the icon actually appeared; retry once if not
        clearTimeout(retryRef.current);
        retryRef.current = setTimeout(() => {
          const hasIcon = !!document.getElementById("userwayAccessibilityIcon");
          if (!hasIcon) {
            // One retry: purge & re-inject (network hiccup or slow mount)
            purgeUserWay();
            injectUserWay();
          }
        }, 1200);
      };

      (document.body || document.head).appendChild(s);
    }

    purgeUserWay();
    injectUserWay();

    return () => {
      clearTimeout(retryRef.current);
      // Do NOT purge on unmount of this effect; the app shell stays mounted.
    };
  }, [account, lang, position, layout]);
}
