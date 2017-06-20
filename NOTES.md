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

## Adding a loading indicator

- Redux is used because it makes easier and cleaner to make all application components aware of the loading status. Without it, the App component would have to pass down network callbacks as props to be aware of network requests.
- Uses redux-thunk to make the api calls inside the action creators.
- The v4 of React Router does not work properly with redux. The connected components have to be wrapped in the *withRouter* function. See [the issue](https://github.com/ReactTraining/react-router/issues/4671).
- The state of fetching is stored in both reducers, podcasts and episodes. Those reducers know if the application is loading data for them.
  - A fetch status is kept for each reducer, because having a common loading status would cause bugs. For example, when navigating straight to a podcast detail page, by pasting the url, the loading spinner would not be shown while fetching the episodes.
  - The state is kept in the resource reducers instead of on a single ui reducer because this way is simpler, and the extra complexity is not warranted.


## Future improvements

- The HTML shown in the episode description should be sanitized.