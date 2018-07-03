const applyClassNameBinding = (target, key, params) => {
  if (!target.localClassNameBindings) {
    const parentValue = target.localClassNameBindings;
    target.localClassNameBindings = Array.isArray(parentValue)
      ? [...parentValue]
      : [];
  }

  const binding = params.length > 0 ? `${key}:${params.join(':')}` : key;

  target.localClassNameBindings = [...target.localClassNameBindings, binding];
};

export const localClassNameBinding = function(...params) {
  if (typeof params[0] !== 'string') {
    applyClassNameBinding(params[0], params[1], []);
    return;
  }

  return function(target, key) {
    applyClassNameBinding(target, key, params);
  };
};
