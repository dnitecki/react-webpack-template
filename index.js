#!/usr/bin/env node
const process = require("process");
const fs = require("fs");
const args = process.argv;
const clone = require("git-clone");
const repository = "https://github.com/dnitecki/react-app-template.git";
const newDir =
  args[2] === undefined ? "./my-react-app-template" : `./${args[2]}`;

const createReactTemplateFolder = () => {
  return fs.mkdir(newDir, { recursive: true }, (err) => {
    if (err) throw err;
  });
};

const copyTemplateToFolder = async () => {
  createReactTemplateFolder();
  clone(repository, newDir, [], (err) => {
    if (err) {
      console.log("Error cloning repository:", err);
    }
    console.log("Success!");
  });
};

copyTemplateToFolder();
