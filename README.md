# Notes

Project was created in another repo and this is a reupload, so that is why commits are messy.

# Ngrx Final Assignment 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.0.2.

# Assignment

Create a small clone of [Google Forms](https://www.google.com/forms/about/), which will allow users to:

- create a custom form with questions of different types:
    - text
    - number
    - select
- add as many questions as they want
- submit forms with answers
- View results for individual questions in the format "name of the question" - "individual answer"
- If a form is already submitted, when visiting it it should prefill the answers

## API

An `db.json` file is present with one example form with one example answer to it, which you can use to test your application. You can use [json-server](https://www.npmjs.com/package/json-server) to serve the data. There is a script you can run to automatically do this:

```bash
npm run api
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
