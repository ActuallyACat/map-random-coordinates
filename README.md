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
* Tests. 