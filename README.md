# <div align="center">Geoportal</div>

<div align="center">
  <img src="/public/vite.svg" alt="Vite" title="Vite" style="height: 100px;">
</div>

1. [Introdution](#introdution)
2. [Setup](#setup)
3. [Technologies](#technologies)
4. [Testing](#testing)
5. [Deployment](#deployment)

## Introdution

Map application that allows easy viewing of interactive maps, access to geospatial data and providing users with quick access to geographic information.

### Key Features

-   An interactive layer tree that allows the user to manage and select data layers.
-   Add Layers - A tool that allows the user to add new layers of geospatial data to a map by providing a link to an external data source.
-   Cofigurator - A configurator is a module that allows users to customize the application interface to their own preferences. It allows you to enable or disable the availability of various tools and configure general application settings.
-    Dark/light theme - It allows you to change the color of the interface between a light and dark theme depending on the user's preferences. The light theme is easier on the eyes in well-lit conditions, while the dark theme may be more comfortable in low-light conditions.
-    Contrast - A function that regulates the contrast level of the interface, which may be important for people with different preferences in terms of readability and accessibility.
-    Base layer switcher - It allows you to select different base layers, e.g. map layers, such as a topographic map, satellite images or a street map.
-    Minimap - A small map placed on the interface showing the general area, allowing the user to understand the context and location of the current view.
-    Print map to pdf - A function that allows the user to generate a PDF file containing the current map view for documentation, presentation or sharing purposes.
-    Measurment - A tool that allows the user to measure distances, the length of a polygon and the area of ​​a polygon on a map, which may be useful for planning, measurement or field analysis purposes.

## Setup

To get started with the Geoportal App, follow these simple steps:

```bash
git clone [https://github.com/michal-1994/board-app.git](https://github.com/michal-1994/proj-map.git)
cd proj-map
npm install
npm run dev
```

## Technologies

-   **Vite** A fast and modern build tool.
-   **React** A library for building user interfaces.
-   **TypeScript** A typed programming language for increased code confidence.
-   **OpenLayers** Thanks to the integration of OpenLayers into the application, users can use interactive maps and developers have access to advanced functions related to geospatial visualization.
-   **Bootstrap** A CSS framework for quick interface styling.

## Testing

To run tests and ensure the reliability of the application, use the following command:

```bash
npm run test
```

## Deployment

To deploy the Geoportal App, use the following command:

```bash
npm run deploy
```
