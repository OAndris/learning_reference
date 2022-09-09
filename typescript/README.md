# TypeScript

TypeScript is a statically typed superset of JavaScript (JS is dynamically typed, i.e. types are checked at runtime - TS is statically typed, i.e. types are checked at compile time).

Any JS code is also valid TS code. This allows gradually adapting TS into an existing JS codebase. It also allows importing JS code (e.g. 3rd party libraries written in JS) into a TS codebase.

TypeScript is like a combination of:

1.  a **language** (a superset of JS)
2.  a **linter** (autosuggests, warns, etc.)
3.  a **compiler** (compiles not only TS, but also modern JS/TS features to old, more compatible JS, like Babel does)
4.  and a **documentation tool** (more readable code, as well as auto-generated comments in the IDE, replacing JSDoc)

Pros & Cons:

-   more code, thus slower MVP
-   type safety leads to fewer bugs, easier maintenance (which can easily result in a faster overall development time), autosuggests, autodocs

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

**With React:**

`npx create-react-app my-project --template typescript` initialize a React-TypeScript project

## Links:

-   [Official TypeScript site](https://www.typescriptlang.org/)
-   [TypeScript Crash Course](https://www.youtube.com/watch?v=rAy_3SIqT-E) by Traversy Media
-   [How to use TypeScript with React... But should you?](https://www.youtube.com/watch?v=ydkQlJhodio) by Fireship
-   [The Story of TypeScript](https://www.youtube.com/watch?v=EUlM3wx546o) by uidotdev
-   [TypeScript - The Basics](https://www.youtube.com/watch?v=ahCwqrYpIuM) by Fireship
-   [Why TypeScript is Actually Good](https://www.youtube.com/watch?v=Ptrhz2zW--o) by Ben Awad
-   [All You Need To Know About TypeScript](https://www.youtube.com/watch?v=eCZhz0JCVx0) by Clément Mihailescu
-   [React Typescript Tutorial with Project | Learn React JS with Typescript [2021]](https://www.youtube.com/watch?v=knqz3_rPcKk) by RoadsideCoder
