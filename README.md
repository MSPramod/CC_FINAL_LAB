# CC_FINAL_LAB
Repository containing the final lab of Cloud Computing

### DOCKER PULL REQUEST : docker pull mspd22/react_app_with_sso
### REPOSITORY LINK : https://hub.docker.com/r/mspd22/react_app_with_sso

# React App with SSO

Welcome to the **React App with SSO** project! This application includes a front-end React app, a back-end Express server, and a MongoDB database.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

You'll also need an internet connection to pull the Docker images from Docker Hub.

## Running the Application

1. **Clone this repository**:

    ```shell
    git clone https://github.com/your-username/react-app-with-sso.git
    ```

2. **Navigate to the project directory**:

    ```shell
    cd react-app-with-sso
    ```

3. **Pull Docker images from Docker Hub**:

    ```shell
    docker-compose pull
    ```

4. **Start the application**:

    ```shell
    docker-compose up
    ```

    The application will start running, and you can access the front-end app in your browser at `http://localhost:3000`.

## File Overview

- `docker-compose.yml`: Docker Compose configuration file.
- `client/`: Directory containing the front-end React app.
- `api/`: Directory containing the back-end Express server.
