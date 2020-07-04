import { Variants } from "framer-motion";

export default (staggerChildren = 0.3): Variants => ({
  animate: {
    transition: {
      staggerChildren,
    },
  },
});
