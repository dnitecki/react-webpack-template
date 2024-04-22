#!/usr/bin/env node
const spawn = require("child_process").spawn;
const process = require("process");
const fs = require("fs");
const args = process.argv;
const repository = "https://github.com/dnitecki/react-app-template.git";
const newDir =
  args[2] === undefined ? "./my-react-app-template" : `./${args[2]}`;

const clone = function (repo, targetPath, opts, cb) {
  if (typeof opts === "function") {
    cb = opts;
    opts = null;
  }

  opts = opts || {};

  const git = opts.git || "git";
  const gitArgs = ["clone"];

  if (opts.shallow) {
    gitArgs.push("--depth");
    gitArgs.push("1");
  }

  gitArgs.push("--");
  gitArgs.push(repo);
  gitArgs.push(targetPath);

  const process = spawn(git, gitArgs);

  process.on("close", function (status) {
    if (status == 0) {
      if (opts.checkout) {
        gitCheckout();
      } else {
        cb && cb();
      }
    } else {
      cb && cb(new Error("'git clone' failed with status " + status));
    }
  });

  function gitCheckout() {
    const args = ["checkout", opts.checkout];
    const process = spawn(git, args, { cwd: targetPath });
    process.on("close", function (status) {
      if (status == 0) {
        cb && cb();
      } else {
        cb && cb(new Error("'git checkout' failed with status " + status));
      }
    });
  }
};

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
    console.log("Success! Your React template is ready.");
  });
};

copyTemplateToFolder();
