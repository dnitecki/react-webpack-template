#!/usr/bin/env node
const process = require("process");
const fs = require("fs");
const path = require("path");

const createReactTemplate = () => {
  const args = process.argv;
  const newDir = `./${args[2]}`;

  return fs.mkdir(newDir, { recursive: true }, (err) => {
    if (err) throw err;
  });
};

module.exports = createReactTemplate;
