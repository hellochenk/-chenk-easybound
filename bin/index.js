#!/usr/bin/env node
// go->>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
const Main = require("../lib/index.js").default;
let main = new Main();

// prod
main.cmd();

// dev
// main.testFn();
