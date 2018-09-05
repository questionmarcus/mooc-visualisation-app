# Glasgow University's Haskell MOOC visualisation App

Taking server output from AWS servers running [Glasgow's Haskell MOOC](https://www.futurelearn.com/courses/functional-programming-haskell), and transforming it into visualistions.
Providing insight into the ways in which students engage with the learning materials and the MOOC in general

You can see the live version of the site [here](https://questionmarcus.github.io/mooc-visualisation-app)

## Requirements
1. Node & npm or yarn
2. [The back-end api](https://www.github.com/questionmarcus/mooc-flask-api) (if running locally)

## Getting started
1. Install dependencies `npm install` or `yarn install`
2. Start the localhost version of the API ([see here](https://github.com/questionmarcus/mooc-flask-api#getting-started))
3. Start the developement server using `npm start` or `yarn start`

All source code for the application is in the `src/` folder, with container components (which hold other components) in the `src/containers/` directory.
Whilst the components are found in the `src/components/`.

CSS style sheets can be founf in the `src/styles/` directory.

## Background
This project was written as part of a Software Development Masters Thesis at the University of Glasgow.
More information on the MOOC and the tools used to parse the data can be found [here](https://github.com/questionmarcus/haskellmooc_logfiles#background)
