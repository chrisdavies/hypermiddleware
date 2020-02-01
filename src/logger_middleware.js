
function actionName(action) {
  if (typeof action === 'function') {
    return action.name;
  } else if (Array.isArray(action)) {
    return actionName(action[0]);
  }
}

module.exports = {
  loggerMiddleware(next) {
    return function (action, props) {
      const name = actionName(action);
      const newState = next(action, props);
  
      if (name) {
        const args = (Array.isArray(action) ? action : []).slice(1);
        console.group('action', name);
        console.log.apply(console, ['action:', name].concat(args));
        console.log('next state:', newState);
        console.groupEnd();
      }
  
      return newState;
    };
  },
};
