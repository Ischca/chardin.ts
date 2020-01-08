# Chardin.ts

[![npm version](https://badge.fury.io/js/chardin.ts.svg)](https://badge.fury.io/js/chardin.ts)

**Simple overlay instructions for your apps.**

[~~Check out a demo~~](http://ischca.github.com/chardin.ts/).

Chardin.ts is a restructured version of the jQuery plugin [Chardin.js](https://github.com/heelhook/chardin.js) with typescript.
There are no dependencies.

![chardin](https://raw.github.com/ischca/chardin.ts/master/example/img/chardin.png "chardin")  
[Jean-Baptiste-Siméon Chardin](http://en.wikipedia.org/wiki/Jean-Baptiste-Sim%C3%A9on_Chardin)

## Installing

```bash
# npm
npm i chardin.ts

# yarn
yarn add chardin.ts
```

## Adding data for the instructions

Add the instructions to your elements:

`data-intro`: Text to show with the instructions  
`data-position`: (`left`, `top`, `right`, `bottom`), where to place the text with respect to the element

```HTML
<img src="img/chardin.png" data-intro="An awesome 18th-century painter, who found beauty in everyday, common things." data-position="right" />
```

## Running

Once you have your elements ready you can show instructions running

```typescript
import {Chardin} from 'chardin.ts';
import 'chardin.ts/chardinjs.scss';

let chardin = new Chardin(document.querySelector('body'), 'au-target-id');
chardin.start();
```

If you would rather run ChardinJs confined to a particular container (instead of using the whole document) you can
change `body` to some other selector.

```typescript
let chardin = new Chardin(document.querySelector('.container'), 'au-target-id');
chardin.start();
```

You may also refresh instructions overlay any time to reflect whatever changes happened to the underlying page elements since the instructions overlay has been displayed.

```typescript
let chardin = new Chardin(document.querySelector('body'), 'au-target-id');
chardin.start();
...
chardin.refresh();
```

## Methods

### .start()

Start ChardinJs in the selector.

### .toggle()

Toggle ChardinJs.

### .stop()

Make your best guess. That's right! Stops ChardinJs in the selector.

## Events

### 'chardinJs:start'

Triggered when chardinJs is correctly started.

### 'chardinJs:stop'

Triggered when chardinJs is stopped.

## Author

[Pablo Fernandez][2]

### Contributors

 * [John Weir](https://github.com/jweir)
 * [felipeclopes](https://github.com/felipeclopes)
 * [Bobby Jack](https://github.com/fiveminuteargument)
 * [Maxim Syabro](https://github.com/syabro)
 * [nmeum](https://github.com/nmeum)
 * [printercu](https://github.com/printercu)
 * [Max Loginov](https://github.com/maxloginov)

## Contributions

If you want to contribute, please:

  * Fork the project.
  * Make your feature addition or bug fix.
  * Add yourself to the list of contributors in the README.md.
  * Send me a pull request on Github.

## License

Copyright 2019 Pablo Fernandez

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

 [2]: https://github.com/heelhook
