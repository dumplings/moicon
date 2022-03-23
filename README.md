# MOICON &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/dumplings/moicon/blob/main/LICENSE) [![npm version](https://img.shields.io/npm/v/moicon.svg?style=flat)](https://www.npmjs.com/package/moicon)

A modern solution for using SVG icons.

## Features

* Support CLI to generate inline script file.
* Support for colorful SVG icons.
* Vite plugin.

## Installation

```shell
$ npm install moicon
```

## Usage

### Colorful Config

If you want SVG icons to be colored and not be controlled by CSS, you can add `.c` to the suffix of the SVG file name,
like `heart.c.svg`.

### Command Line

Inline script file can be generated from the command line using `moicon`.

```shell
$ moicon input output
[MOICON Info] Finished:  /output/file/path/moicon.js
```

Type `moicon --help` for details:

```shell
$ moicon -h

moicon <input> <output> [options]

Commands to compile SVG files

Positionals:
  input   Directory of SVG files                                        [string]
  output  Output directory of js builder                                [string]

Options:
  -n, --name     Output builder name                [string] [default: "moicon"]
  -p, --prefix   The prefix of all icon class name      [string] [default: "mo"]
      --hash     Disable the hash                     [boolean] [default: false]
  -h, --help     Show help                                             [boolean]
  -v, --version  Show version number                                   [boolean]
```

### Vite Plugin

```javascript
// vite.config.js
import { vitePlugin } from 'moicon'

export default {
  plugins: [
    vue(),
    vitePlugin(svgFilesPath, svgClassPrefix),
  ]
}
```

#### Options

* `svgFilesPath` - Directory of SVG files, required.
* `svgClassPrefix` - The class prefix of svg tags, default is `mo`.

#### Examples

```vue
// create a `MoIcon.vue` file by yourself.
// MoIcon.vue
<template>
  <svg class="mo-icon">
    <use :href="`#mo-${name}`" />
  </svg>
</template>
<script>
export default {
  name: 'MoIcon',
  props: {
    name: {type:String, default: null, required: true}
  }
}
</script>

// App.vue
<mo-icon name="add" />
```