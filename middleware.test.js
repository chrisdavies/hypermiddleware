const { middleware } = require('./middleware');

describe('middleware', () => {
  it('Chains the functions together', () => {
    let result;
    const next = (action, props) => {
      result = { action, props };
    };
    const a = next => (action, props) => next(action + 'a', props + 'a');
    const b = next => (action, props) => next(action + 'b', props + 'b');
    const f = middleware([a, b]);

    f(next)('act_', 'prop_');

    expect(result).toEqual({ action: 'act_ab', props: 'prop_ab' });
  });

  it('Handles the empty case', () => {
    let result;
    const next = (action, props) => {
      result = { action, props };
    };
    const f = middleware([]);

    f(next)('act_', 'prop_');

    expect(result).toEqual({ action: 'act_', props: 'prop_' });
  });
});
