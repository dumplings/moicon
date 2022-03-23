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