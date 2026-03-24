# Mockpit

Mockpit is a UI-first mock API platform designed to help frontend developers build, test, and iterate without depending on a real backend.

Instead of spinning up servers or writing mock logic in code, Mockpit lets you define APIs directly from the browser. Create projects, add endpoints, and control exactly what each request returns - all through a simple interface.

## Features

* **Project-based organization**
  Group related endpoints under a single project for clean separation.

* **Custom endpoints**
  Define routes like `GET /products` or `POST /login` with full control.

* **Mock responses via UI**
  Write and edit JSON responses directly in the browser.

* **Request inspection**
  View incoming request data (body, params) when testing endpoints.

* **Multi-method support**
  Handle `GET`, `POST`, `PUT`, `DELETE`, and more.

## Use Cases

* Build and test frontend apps without a backend
* Prototype APIs quickly
* Share mock endpoints with teammates
* Simulate backend responses during development

## Example

Define an endpoint:

```
POST /login
```

Return:

```json
{
  "token": "mock-token-123"
}
```

Your frontend can now interact with it like a real API.

## Vision

Mockpit aims to make API mocking fast, visual, and accessible — removing the friction between frontend development and backend availability.

