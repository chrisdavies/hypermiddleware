const { loggerMiddleware } = require('./logger_middleware');

describe('loggerMiddleware', () => {
  const consoleLog = console.log;
  const noop = () => {};

  beforeEach(() => {
    console.log = jasmine.createSpy('log');
  });

  afterEach(() => {
    console.log = consoleLog;
  });

  it('Logs the action name', () => {
    const TestAction = () => {};

    loggerMiddleware(noop)(TestAction, 'testprops');

    expect(console.log).toHaveBeenCalledWith('action:', 'TestAction');
  });

  it('Logs the next state', () => {
    loggerMiddleware(() => 'foo!')(noop, 'testprops');

    expect(console.log).toHaveBeenCalledWith('next state:', 'foo!');
  });

  it('Handles action arrays', () => {
    const ActWithParams = () => {};

    loggerMiddleware(noop)([ActWithParams, 'a', 'b'], 'testprops');

    expect(console.log).toHaveBeenCalledWith('action:', 'ActWithParams', 'a', 'b');
  });
});
