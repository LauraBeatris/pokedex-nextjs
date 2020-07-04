import { Variant } from "framer-motion";

export default (staggerChildren = 0.3): Variant => ({
  animate: {
    transition: {
      staggerChildren,
    },
  },
});
