# Map Random Coordinates

## About
Does what it says on the box - retrieves a list of coordinates from an API and plots them on a map. 

When the user moves the map (zooms in/out, or panning) a request is sent to the API containing the boundary box of the current map view, which will return 5 random points within that boundary box.  

## Scripts
`npm run dev` - Runs Express server and Webpack build. Will also watch for changes. 

## Tech
This repo was cloned from boilerplate that contains React, Typescript, Webpack, and Express so that my time could be spent on the task and not setting up Webpack :) This repo was originally cloned from here:
  `https://github.com/covalence-io/barebones-react-typescript-express`

I added the following libraries: 
* Leaflet - Mapping engine
* react-leaflet - A composable wrapper over Leaflet
* Any missing types

## Improvements
* Shared types - A marker is the same on the server and client (`{ lat: number, lng: number }`). When API and client are closely related like this there are opportunities to share types to ensure either the client or server does not make a change without accounting for how that would affect the other.
* Tests - For both client and server. 
* Mapping - I'm not confident (or know enough about mapping in general) to say this will behave predicably around the poles, equator, and when the entire world is in the viewport. A third party library might have been better used to cover these use cases. 
* UI - It's very barebones and there are opportunities for improvement. Random markers _should_ be generated on map load but they currently are not - it waits for the first user action (zoom/pan). A quick win for the user would be to give them the ability to specify how many markers they want to generate. There's also no feedback to the user when something has gone wrong (such as API returning a 500).
* API - No error handling :( Forbidden requests (such as trying to execute a GET on `/api/points`) should return an appropriate server response. 
