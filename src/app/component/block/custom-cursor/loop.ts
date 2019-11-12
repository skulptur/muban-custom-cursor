export const loop = (onUpdate: () => void) => {
  let isActive = true;

  const next = () => {
    if (!isActive) return;

    onUpdate();

    requestAnimationFrame(next);
  };

  next();

  return () => {
    isActive = false;
  };
};
