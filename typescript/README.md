# TypeScript

## Basic commands:

**Install:**

`npm install -g typescript` installs TypeScript globally (also giving access to the "tsc" CLI)

**Try out:**

`tsc types.ts` compiles the specified TypeScript file ("types.ts") to JavaScript

`tsc type.ts -w` compiles the file and then watches for changes (re-compiles whenever there are changes)

`tsc *.ts -w` compiles and watches all TypeScript files

**Setup:**

`tsc --init` generates the **"tsconfig.json"** file (in which, e.g. the "outDir" property can be defined, to create a build folder for JS files that are compiled by TS)

NOTE: The contents of the "tsconfig.json" file are only used if no files are passed to the "tsc" CLI (just run `tsc` itself). From the documentation: "When input files are specified on the command line, tsconfig.json files are ignored.".

`tsc -w` compile according to the settings file ("tsconfig.json") and watch for changes

## Links:

-   [Official TypeScript site](https://www.typescriptlang.org/)
-   [TypeScript Crash Course](https://www.youtube.com/watch?v=rAy_3SIqT-E) by Traversy Media
