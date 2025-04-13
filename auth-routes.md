# Authentication Routes Documentation

API_URL:
API_KEY: api-key-02f023f

## Headers

All requests must include the following header:

- **x-api-key**: `<your-api-key>`

  ```json
  {
    "x-api-key": "<your-api-key>"
  }
  ```

## Routes

### 1. Sign In

- **Endpoint**: `/signin`
- **Method**: POST

- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
  
- **Responses**:
  - `200`:

    ```json
    {
      "message": "Sign-in successful",
      "data": {},
      "token": "jwt-token",
      "status": 200
    }
    ```

  - `401`:

    ```json
    {
      "message": "Invalid credentials",
      "data": null,
      "status": 401
    }
    ```

---

### 2. Google Sign-In

- **Endpoint**: `/auth/google-signin`
- **Method**: POST

- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "name": "John Doe"
  }
  ```

- **Validation**:
  - `email`: Must be a valid email address.
  - `name`: Must be a non-empty string.

- **Responses**:
  - `200`:

    ```json
    {
      "message": "Google sign-in successful",
      "data": {},
      "token": "jwt-token",
      "status": 200
    }
    ```

  - `400`:

    ```json
    {
      "message": "Validation error: <error-message>",
      "data": null,
      "status": 400
    }
    ```

---

### 3. Create User

- **Endpoint**: `/users`
- **Method**: POST

- **Request Body**:

  ```json
  {
    "name": "John Doe",
    "email": "user@example.com",
    "password": "password123",
    "city": "New York",
    "country": "USA",
  }
  ```

- **Validation**:
  - `name`: Required, must be a string.
  - `email`: Required, must be a valid email address.
  - `password`: Required, must be a string, must be at least 6 characters long.
  - `city`: Required, must be a string.
  - `country`: Required, must be a string.

- **Responses**:
  - `201`:

    ```json
    {
      "message": "User created successfully",
      "data": {
        "id": "64b7f9f5e4b0c8a1d2e4f789",
        "name": "John Doe",
        "email": "user@example.com"
      },
      "status": 201
    }
    ```

  - `400`:

    ```json
    {
      "message": "Validation error: <error-message>",
      "data": null,
      "status": 400
    }
    ```

---

### 4. Validate Email

- **Endpoint**: `/validate-email/:validationToken`
- **Method**: GET
- **Headers**:
- **Responses**:
  - `200`:

    ```json
    {
      "message": "Email validated successfully",
      "data": {},
      "status": 200
    }
    ```

  - `404`:

    ```json
    {
      "message": "Code verification Invalid",
      "data": null,
      "status": 404
    }
    ```

---

### 5. Resend Validation Token

- **Endpoint**: `/auth/resend-validation-token/:email`
- **Method**: GET
- **Headers**:
- **Responses**:

    ```json
    {
      "message": "Validation token re-sent successfully",
      "data": null,
      "status": 200
    }
    ```

  - `404`:

    ```json
    {
      "message": "User not found",
      "data": null,
      "status": 404
    }
    ```

---

### 6. Send Password Reset Token

- **Endpoint**: `/send-reset-password-token/:email`
- **Method**: POST
- **Headers**:
- **Responses**:
  - `200`:

    ```json
    {
      "message": "Password change token sent successfully",
      "data": null,
      "status": 200
    }
    ```

  - `404`:

    ```json
    {
      "message": "User not found",
      "data": null,
      "status": 404
    }
    ```

---

### 7. Reset Password

- **Endpoint**: `/reset-password/:token`
- **Method**: POST
- **Headers**:

  ```json
  {
    "x-api-key": "<your-api-key>"
  }
  ```

- **Request Body**:

  ```json
  {
    "newPassword": "newPassword123"
  }
  ```

- **Responses**:
  - `200`:

    ```json
    {
      "message": "Password changed successfully",
      "data": null,
      "status": 200
    }
    ```

  - `400`:

    ```json
    {
      "message": "Invalid or expired token",
      "data": null,
      "status": 400
    }
    ```

  - `404`:

    ```json
    {
      "message": "User not found",
      "data": null,
      "status": 404
    }
    ```

---
