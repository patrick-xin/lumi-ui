import { useEffect, useRef, useState } from "react";

export const useScrollToTop = ({ top = 20 }) => {
  const [visible, setVisible] = useState(false);
  const topRef = useRef(top);
  topRef.current = top;
  const isTicking = useRef(false);

  const onScroll = () => {
    if (!isTicking.current) {
      window.requestAnimationFrame(() => {
        setVisible(window.scrollY > topRef.current);
        isTicking.current = false;
      });
      isTicking.current = true;
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", onScroll, { passive: true });

    return () => document.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  };

  return { scrollToTop, visible };
};
