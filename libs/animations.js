// Objects with animations specified for framer motion.

export const showAndDown = {
  hidden: { y: -100, opacity: 0, zIndex: -100 },
  show: { y: 0, opacity: 1, zIndex: 0, transition: { duration: 0.4 } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0 },
};

export const growFromLeft = {
  hidden: { x: -100, opacity: 0 },
  show: (i) => ({
    x: 0,
    opacity: 1,
    transition: { delay: 0.04 * i, duration: 0.4 },
  }),
  exit: { opacity: 0, x: -100, duration: 0.2 },
};

export const scaleY = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 0.4 },
  },
};
