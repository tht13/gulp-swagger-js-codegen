# gulp-swagger-js-codegen

A gulp library for Swagger-JS-Codegen

## Basic Usage

Either YAML or JSON can be piped

Local file example

```js
const gulp = require("gulp");
const swagger = require("gulp-swagger-js-codegen");

gulp.task("swagger", () => {
  return gulp.src("example.yaml")
    .pipe(swagger())
    .pipe(gulp.dest("./"));
});
```

Download example

```js
const gulp = require("gulp");
const swagger = require("gulp-swagger-js-codegen");
const download = require("gulp-download");

gulp.task("swagger", () => {
  return download("http://example.com/example.yaml")
    .pipe(swagger())
    .pipe(gulp.dest("./"));
});
```

## Options

Define out put type in the options argument

```js
options = {
  type: "tyescript" | "node" | "angular",
  name: string, # Output file name
  swaggerOptions: {
    # swagger-js-codegen options
  }
}

swagger(options)
```
