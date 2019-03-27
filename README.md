# Wren Kitchens Development Task

## Getting Started
The aim of the task is to read the scenario and produce an application that fulfills the requirements listed below and then submit the result as a tar.gz file to: robert.bollons@wrenkitchens.com.

We have included a base app as a starting point.

To build & run the app you should install [NodeJS](https://nodejs.org/en/) and then run the following:

```bash
npm install
npm start
```

The app is written using [TypeScript](https://www.typescriptlang.org/). The bundle is generated using [Webpack](https://webpack.js.org/) and the UI uses [ReactJS](https://reactjs.org/)

## Scenario
The fields are green and Wren are venturing out to become a shepherd.

Your task is to extend the provided code with functionality and logic to create a 'field', add sheep to the field and allow the sheep to breed.

### Requirements

The specification of what is required is as follows:

1) Create a field in which to add the sheep
2) You must be able to name and add a sheep into the field, each as a male or female
3) You must be able to brand a sheep at random (paint it green) that is currently living in the field
4) You must encourage two random sheep to breed and if successful, spawn a new sheep into the field
5) The 'Getting Started' steps must remain the same

Logic that must be factored in:

a) The probability of a female sheep giving birth after mating is 50%
b) Branded sheep must be highlighted in green
c) Branded sheep are not able to breed

It's up to you how you represent the field, this can be anything from a HTML table to a fully rendered WebGL canvas. Use common sense to define your rules about which sheep can breed with each other, and include them when you return your submission.

Good luck!
