#!/usr/bin/env node
const process = require("process");
const createReactTemplate = () => {
  const args = process.argv;
  return args[2];
};

module.exports = createReactTemplate;
