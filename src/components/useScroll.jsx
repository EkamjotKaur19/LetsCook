import { useEffect } from "react";
import { useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

export const useScroll = (thresh = 0.1) => {
  const controls = useAnimation();
  const [element, view] = useInView({ threshold: thresh });

  useEffect(() => {
    if (view) {
      controls.start("show");
    } else {
      controls.start("hidden");
    }
  }, [controls, view]);

  return [element, controls];
};
