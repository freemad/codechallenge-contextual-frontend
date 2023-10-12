# Mouse Pointer Analytics Front-end

The front-end part of the Contextual code exercise, for grabbing  the mouse event in the front, analysing them in the back and finally show them as mouse statuses in a chart at front.

It's coded by React JS and have 3 major components:
- App
- MousePosEventComponent
- and ChartComponent

## Running Service:

In the project directory, run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

>**Note**
>
> Because the service doesn't interact with the user (except moving the pointer) it doesn't have much of test cases to cover.

### `npm run build`

If you need to build the app run the above command and it builds the app for production to the `build` folder.


## Project Design and Structure:

The project contains of a main Container "App" and two Components naming:
- MousePosEventComponent: which wraps all the capture and send mouse events to the server via API calls.
- ChartComponent: which contains all the objects and mechanism to fetch data from the server and show the chart(s).
- and the App Component: which acts as the app container and also have the base API calls like "logon" and "logoff".

The Chart JS is used for displaying data in chart(s) and for the API calls the "Axios" is utilised.

The base-data like "event granularity", "chart granularity", etc. are fetched and stored in the States. the "instance id" though is stored in local storage to be persisted for later use; because it's the glue part of the design to get all the events and statuses together.

### Suggestion

There are some suggestions are come to mind at this moment which are:
1. Add i18n for supporting locale instead of string constants, etc.
2. Add SCSS for handling UI theme.
