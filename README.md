# Rick&Morty App

This is a web application developed with Angular that allows you to retrieve a list of Rick & Morty characters.
The characters are obtained from an API. To populate the initial table, we query the following using the REST API: https://rickandmortyapi.com/api/character
. This allows us to view the characters and complete a counter, which tallies the results, separating them by category: Species and Type.
Then, to view the details of each character, we query the following using GRAPHQL: https://rickandmortyapi.com/graphql
, which performs a simultaneous query to obtain the character's details.
We can also store favorites, using Redux - ngrx/component-store to manage their state.


## Main Features

* View the character list.
* Save favorite characters.
* Filter heroes by name or status.
* View character details.
* Integrate with an external API using REST and GRAPHQL to retrieve the character list.

## Technologies Used

* Angular 19: Front-end development framework.
* RxJS: Library for managing asynchronous operations and events.
* Angular HttpClient: For making HTTP requests to the API.
* Apollo Angular & Graphql: For making requests with Graphql.
* Angular Material: As a component library.
* Redux Ngrx/component-store: As a state management library.
* Ngx-Translate: As a translation and text-centralizing library.

## Prerequisites

Before you begin, make sure you have the following installed:

* Node.js (version 18 or higher).
* npm (Node.js package manager).
* Angular CLI (optional for fast development).

## Installation

Follow these steps to set up the project on your local machine:

1 - Clone the repository:

    git clone https://github.com/FacuGonzales/pruebaTecnicaAngular.
    cd prueba-tecnica-angular

2 - Install the project dependencies using npm:

    npm install

3 - Once the dependencies are installed, you can start the development server:

    npm start

This will start the application and a new window will automatically open at the url <http://localhost:4200/>.
