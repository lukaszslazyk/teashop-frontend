# Teashop Frontend

Single page application working as a frontend in Teashop application environment.

## Technologies used
- [React](https://reactjs.org/) - base frontend framework
- [Typescript](https://www.typescriptlang.org/) - programming language
- [Node.js](https://nodejs.org/en/) - runtime environment
- [Redux](https://redux.js.org/) - state container
- [Material-UI](https://material-ui.com/) - UI styling framework
- [Notistack](https://github.com/iamhosseindhv/notistack) - notification display library
- [Docker](https://www.docker.com/) - containerization

## Usage

This application is a part of Teashop application environment. To see the details of setting up the entire Teashop environment go to Teashop Ops repository.

### Local

To setup the application with default local server, in project directory run:

```
npm install
```

To run the application after setup:

```
npm start
```

The application will run on: [http://localhost:3000](http://localhost:3000)

### Docker container

To setup the application on docker container, first build the container image by running the following command in project directory:

```
docker build -t teashop_frontend .
```

Then to run the container:

```
docker run -p 3000:80 teashop_frontend
```

You can visit the application in a browser at: [http://localhost:3000](http://localhost:3000)
