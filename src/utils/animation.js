export const easing = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (--t) * t * t + 1,
};

export const animate = (from, to, duration, easingFunc = easing.linear) => {
  return new Promise((resolve) => {
    const start = Date.now();
    
    const frame = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = from + (to - from) * easingFunc(progress);
      
      if (progress === 1) {
        resolve(to);
      } else {
        requestAnimationFrame(frame);
      }
    };
    
    requestAnimationFrame(frame);
  });
};
