export const localClassNames = function(...classNames) {
  return function(target) {
    target.prototype.localClassNames = [...classNames];
  };
};
