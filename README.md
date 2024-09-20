The Low Level System design of the app is given by the below exalidraw diagram

![image](https://github.com/user-attachments/assets/95a197da-5753-4fc5-ad53-35f879a3a79a)

### API Endpoints

- **`POST /auth/register`**: Register a new user with email, username, and password.
- **`POST /auth/login`**: Log in an existing user and receive a JWT token for authentication.
- **`GET /auth/users`**: Retrieve a list of all users except the authenticated one (JWT required).
- **`POST /messages`**: Send a message from the authenticated user to another user (JWT required).
- **`GET /messages/{otherUserId}`**: Fetch the message history between the authenticated user and another user (JWT required).

The openapai(swagger) docs is available in [openapi.yml](openapi.yaml)

For the Frontend I have used `react` with `vite` and for routing i have used `react-router-dom`, the frontend code is made with `@shadcn/ui` components and is available in the `.client` folder.