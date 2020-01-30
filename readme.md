# Hypermiddleware

Middleware helpers for use with hyperapp.


## Installation

`npm install hypermiddleware`


## middleware

The `middleware` function takes an array of Hyperapp middleware functions, and returns a single middleware function. Hyperapp's middleware property takes a single function, but sometimes, you want to compose multiple middleware functions. The `middleware` function makes this simple:

Example:

```js
app({
  // ... other stuff ...
  middleware: middleware([middleware1, middleware2, middleware3]),
});
```

## loggerMiddleware

The `loggerMiddleware` function logs all actions and the resulting state out to the console, similar to [redux-logger](https://github.com/LogRocket/redux-logger) for Redux.

Example:

```js
app({
  // ... other stuff ...
  middleware: loggerMiddleware,
});
```


## Example application

The following is the Hyperapp add / subtract demo, but with two middleware functions composed into it.

```js
import { middleware, loggerMiddleware } from 'hypermiddleware';
import { h, app } from 'hyperapp';

// Just as an example...
function helloMiddleware(next) {
  return (action, props) => {
    console.log('HEYO!!!!!!!!!!!!!!!!!!');
    return next(action, props);
  };
}

const Add = x => x + 1;
const Sub = x => x - 1;

app({
  init: 0,
  view: state =>
    h('div', {}, [
      h('h1', {}, state),
      h('button', { onClick: Sub }, '-'),
      h('button', { onClick: Add }, '+')
    ]),
  middleware: middleware([loggerMiddleware, helloMiddleware]),
  node: document.getElementById('app')
});
```


## License MIT

Copyright (c) 2016 Chris Davies

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
