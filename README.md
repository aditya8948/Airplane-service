# Flight Info Service

Hi! Welcome to the **Flight Info Service**. This service is responsible for managing all the backend logic for airplanes, airports, cities, and flights. It is part of a larger flight booking system.

We built this project using a clean, modular architecture (specifically the **Repository-Services Pattern**). If you are new to this pattern, don't worry! Here is a simple breakdown of how the folders are organized and why we did it this way.

---

## 📂 Project Structure

Inside the `src` folder, you will find the following directories:

* **`config`**: Where all our setup and configurations live. For example, loading environment variables from `.env` or setting up database connection configurations.
* **`routes`**: This is the entry point for API requests. It maps URLs (like `/api/v1/flights`) to the correct middlewares and controllers.
* **`middlewares`**: The guards of our application. They intercept requests to validate input (e.g., checking if a request has a `modelNumber` before creating an airplane) before passing it to the controller.
* **`controllers`**: The handlers that receive the API request, pass the data to the service layer, and structure the final response (JSON) back to the client.
* **`services`**: This is where the actual **business logic** lives. If you need to calculate prices, validate booking rules, or orchestrate multiple database operations, it happens here.
* **`repositories`**: This layer is the only one that directly talks to our database using Sequelize (ORM). It keeps our database queries separated from our business logic.
* **`models`**: Outlines our database schemas (Airplanes, Airports, Cities, Flights, and Seats) using Sequelize.
* **`utils`**: Helper classes, custom error handlers (like `AppError`), and common response formats.

---

## 🛠️ How to Setup and Run Locally

Follow these quick steps to get the service running on your local machine:

### 1. Install Dependencies
Run this command in the root folder of the project to install all required packages:
```bash
npm install
```

### 2. Configure Environment Variables
Create a file named `.env` in the root directory (it is ignored by Git, so your credentials remain safe):
```env
PORT=3000

# Your Local Database Credentials
DB_USERNAME=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_DATABASE=flight
DB_HOST=127.0.0.1
DB_DIALECT=mysql
```

### 3. Set Up the Database
Make sure you have MySQL running locally. Then run the following Sequelize commands in your terminal to create the database, run migrations, and add some seed data:

```bash
# Create the database
npx sequelize-cli db:create

# Run the migrations to build tables
npx sequelize-cli db:migrate

# Seed the database with sample data (Airplanes, Seats, etc.)
npx sequelize-cli db:seed:all
```

### 4. Start the Server
Now, start the application in development mode (using nodemon so it auto-restarts when you make changes):
```bash
npm run dev
```
You should see: `Server is running on port 3000` and `succesfully started the server`.

### 5. Run with Docker
Build and run the service container:
```bash
docker build -t flight-info-service .
docker run --env-file .env -p 3000:3000 flight-info-service
```

The container exposes port `3000` by default. Update your `.env` database host as needed when connecting from Docker to a local MySQL instance.

---

## API Endpoints

Here are some of the main endpoints you can test using Postman:

### Airplanes
* `POST /api/v1/airplane` - Create a new airplane (`modelNumber`, `capacity`).
* `GET /api/v1/airplane` - Fetch all airplanes.
* `GET /api/v1/airplane/:id` - Fetch details of a specific airplane.
* `DELETE /api/v1/airplane/:id` - Delete an airplane.

### Cities & Airports
* `POST /api/v1/city` - Add a new city.
* `POST /api/v1/airport` - Add a new airport.

### Flights
* `POST /api/v1/flight` - Create a flight.
* `GET /api/v1/flight` - Query flights (you can filter by city, price range, etc., e.g., `/api/v1/flight?trips=MUM-DEL`).
* `PATCH /api/v1/flight/:id/seats` - Update remaining seats on a flight.
