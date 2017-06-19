## Initial commit

The initial commit contains a bare project created with [Create React App](https://github.com/facebookincubator/create-react-appr), the official React CLI. It provides a development environment and tools to generate production builds. 

I did some cleanup and moved some files around, such as moving the App to a components folder.

## Building the application frame

The first step was to create the screens for the application, using mock data. I could start adding logic once the mockup with basic navigation is done.

#### Dependencies:

- React Router v4
- Bootstrap v4
- rss-parser to parse rss feeds. It is actively maintained and is easy to use.

#### App structure

- The components are grouped by page. Any reusable component will go into a *src/components/common* folder.
- The main routes are declared in the App component. Nested routes are declared at page level.

## Retrieving information from the API

- The podcast list is initialized in the App component, and passed down to all views via props.
- The podcasts are stored normalized, in an Object that has the podcast IDs as keys.
- Improved and tested the *formatDuration* function, to cover more edge cases.
- Caches up to 50 podcast request using a service worker.
  - The service worker is the *public/api-cache-service-worker.js* file.
  - Uses the cache expiration mechanisms from [sw-toolbox](https://github.com/GoogleChrome/sw-toolbox).

## Filtering the podcast list

- The search box is a controlled property.

## UI fixes

Some UI mistakes of the first step are fixed. 
  - The appearance is more similar to the design.
  - Stops using REMs for dimensions. This was a mistake and now pixel dimensions are used. REMs are still used for font sizes.