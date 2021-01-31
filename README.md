# Teashop Frontend

Single page application working as a frontend in Teashop application environment.

## Technologies used
- [React](https://reactjs.org/) - base frontend framework
- [Typescript](https://www.typescriptlang.org/) - programming language
- [Node.js](https://nodejs.org/en/) - runtime environment
- [Redux](https://redux.js.org/) - state container
- [Material UI](https://material-ui.com/) - UI styling framework
- [Notistack](https://github.com/iamhosseindhv/notistack) - notification display library
- [React Hook Form](https://react-hook-form.com/) - form validation library
- [React Material UI Carousel](https://github.com/Learus/react-material-ui-carousel) - UI carousel component library
- [Docker](https://www.docker.com/) - containerization

## Usage

This application is a part of Teashop application environment. To see the details of setting up the entire Teashop environment go to Teashop Ops repository.

### Local

To setup the application with default local server, go to teashop_frontend directory and run:

```
npm install
```

To run the application after setup:
s
```
npm start
```

The application will run on: [http://localhost:3000](http://localhost:3000)

### Docker container

To setup the application on docker container, first build container image by running the following command in main project directory:

```
docker build -t teashop_frontend . --build-arg API_ROOT=http://localhost:5000/api --build-arg CDN_ROOT=http://localhost:8080
```

where API_ROOT is a root URL path of backend's api endpoints and CDN_ROOT is a root URL path of CDN server.

Then to run the container:

```
docker run -p 3000:80 teashop_frontend
```

You can visit the application in a browser at: [http://localhost:3000](http://localhost:3000)

## Notes
- Additional commands are configured for linting with eslint in this project. You can run linting by using command: ```npm run lint``` in teashop_frontend directory. You can also run linting with automatix fixing by using command: ```npm run lint-fix```.
