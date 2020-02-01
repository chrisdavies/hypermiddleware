
module.exports = {
  middleware(fns) {
    return function middlewareChain(next) {
      const chain = fns.map(function (f, i) {
        return f(function (action, props) {
          return (chain[i + 1] || next)(action, props);
        });
      });

      return chain[0] || next;
    };
  },
};
