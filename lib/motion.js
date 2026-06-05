export const luxuryEase = [0.16, 1, 0.3, 1];

export const reveal = {
  hidden: { opacity: 0, y: 42, filter: 'blur(18px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: luxuryEase },
  },
};

export const revealSlow = {
  hidden: { opacity: 0, y: 58, filter: 'blur(22px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.18, ease: luxuryEase },
  },
};

export const pageTransition = {
  initial: { opacity: 0, filter: 'blur(16px)' },
  animate: { opacity: 1, filter: 'blur(0px)', transition: { duration: 0.7, ease: luxuryEase } },
  exit: { opacity: 0, filter: 'blur(10px)', transition: { duration: 0.35, ease: luxuryEase } },
};
