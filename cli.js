#!/usr/bin/env node
'use strict'
var abbrev = require('abbrev')
var argv = require('minimist')(process.argv.slice(2), abbrev('help', 'version'))
var pkg = require('./package.json')
var icons = require('./')

function help () {
  console.log([
    pkg.description,
    '',
    'Use `--format json` to set output to JSON.',
    'Get specifc icon by size or name by using `--size`.',
    '',
    'Examples:',
    '  $ ios-icons --size 80',
    '  icon-40@2x.png,80',
    '',
    '  $ ios-icons --size 80 --format json',
    '  {"name":"icon-40@2x.png","width":80}',
    '',
    '  $ ios-icons --size small',
    '  icon-small.png,29'
  ].join('\n'))
}

function formatLog (icons, argv) {
  var format = (argv.format || 'csv').toLowerCase()
  if (format === 'json') {
    return JSON.stringify(icons)
  }
  if (!Array.isArray(icons)) {
    icons = [icons]
  }
  return icons.map(function (icon) {
    return icon.name + ',' + icon.width
  }).join('\n')
}

function cli () {
  if (argv.help) return help()

  if (argv.version) return console.log(pkg.version)

  var options = {
    size: argv.size || argv.s
  }

  var output = icons(options)
  if (output) console.log(formatLog(output, argv))
}

cli()
