#!/usr/bin/env node
const process = require("process");
const fs = require("fs");
const path = require("path");
const args = process.argv;
const newDir =
  args[2] === undefined ? "./my-react-app-template" : `./${args[2]}`;

const createReactTemplateFolder = () => {
  return fs.mkdir(newDir, { recursive: true }, (err) => {
    if (err) throw err;
  });
};

const copyTemplateToFolder = () => {
  createReactTemplateFolder();
  return fs.cp("./react-app-template", newDir, { recursive: true }, (err) => {
    if (err) throw err;
  });
};

copyTemplateToFolder();
