# wsk-restaurant aka Restauranto

Metropolia Web Application Course Project

## Team

- Riku Kuikka
- Topi Ahola
- Araz Muhammed
- Veijo Kasanen

## App Idea and Target Audience

### Idea

The purpose of the application is to provide restaurants with an easy way to showcase and manage their menus online. Restaurants can create profiles, add dishes, adjust prices, and update their selections in real time. Customers can browse restaurant menus, place orders, purchase gift cards, and keep track of their orders.

### Target Audience

The application is aimed at small and medium-sized restaurants that want to improve their online visibility and offer customers a convenient way to explore menus and place orders. It also serves customers who are looking for new restaurants and want to place orders easily on their mobile devices or computers.

## Features

- Create and manage restaurant profiles
- Create, edit, and update menus
- Place and manage customer orders
- Purchase and manage gift cards
- Create and manage user accounts for both restaurants and customers
- Real-time updates to menus and orders
- Real-time departures from nearby transit stops
- Real-time weather data and terrace open/close estimation

## Testing Instructions

### URL

The application is deployed to Azure:
<https://wsk-restaurant-server.norwayeast.cloudapp.azure.com/>

API URL:
<https://wsk-restaurant-server.norwayeast.cloudapp.azure.com/api>

API documentation:
<https://wsk-restaurant-server.norwayeast.cloudapp.azure.com/api/docs>

PHPMyAdmin:
<https://wsk-restaurant-server.norwayeast.cloudapp.azure.com/phpmyadmin>

#### Create Your Own User

You can create your own user in the login view.
Registration does not close the window, so you need to manually navigate back to the login form.

<figure>
<img src="./documentation/register.png" alt="register window" style="width: 40%"/>
</figure>

### Access Rights

- Admin: Full access (manage restaurants and users)
- User: Limited access (manage own orders and profile only)
- Guest: Read-only access (menus and restaurants)

### How to Test

1. Explore the pages first without logging in (Guest user)
2. Log in with the `user` account and test placing orders and managing your profile
3. Log in with the `admin` account and test managing restaurants and users
   - The admin panel can be found from the hamburger menu
4. Test different features and ensure everything works as expected

### Views

The application has two main views: the restaurant page and the admin management page.

<figure>
<img src="./documentation/nakymat.png" alt="views" style="width: 100%"/>
</figure>

When an admin logs in, links to the admin management page are shown.

<figure>
<img src="./documentation/admin_linkit.png" alt="links to admin dashboard" style="width: 100%"/>
</figure>

## Local Development Setup

1. Ensure you have Node.js, npm, and MariaDB installed locally

2. Install the MariaDB database locally

   - Creation scripts are located in the `database/` folder
   - Create the database and tables by running the scripts in MariaDB:
     - `create-database-v6.sql`
       - Database and tables only
     - `create-database-v6_with_mockdata.sql`
       - Database, tables, and mock data for testing

3. Clone the repository to your local machine

4. Navigate to the project root in your terminal

5. In the root, copy `.env.sample` to `.env` and fill in the required environment variables

6. Install dependencies with: `npm install` && `npm install --prefix client`

7. Start the backend with: `npm run dev`

8. Open a new terminal window and go to the project root

9. Navigate to the frontend folder: `cd client`

10. In the client root, copy `.env.sample` to `.env.local` and fill in the required client-side environment variables.

11. Start the frontend with: `npm run dev`

12. Open the browser and go to: <http://localhost:PORT> — you can find the port in the frontend console

## Wireframes and Mockups

Wireframe and mockup images can be found here:
<https://docs.google.com/document/d/1Sk6Vxy49TRysr0Mrw0YkQo964_d_KIdPZG91kDWra_Y/edit?tab=t.0#heading=h.51cn9iikw1m0>

## Technologies

- Frontend: React.js, HTML, Tailwind CSS
- Backend: Node.js, Express.js
- Database: MariaDB
- PHPMyAdmin: Database management
- OS: UBUNTU Server
- Real-time data: Third-party APIs:
  - Weather: Open Meteo API
  - Departures: DigiTransit / HSL API
  - Maps: Leaflet.js
- Authentication: JWT (JSON Web Tokens)
- Version control: Git and GitHub
- CI/CD: GitHub Actions
- Cloud: Microsoft Azure

## Recommendations

- Versions: Use at least Node.js v18+ and MariaDB v10.6+.
- Environment variables: Keep only required values in `.env`. Client-side variables (`VITE_*`) should be placed in `client/.env.local`.
- Demo accounts: These are test accounts. Remove or change in production.
- Security: Do not store secret keys in the repository. Use secret management (e.g., GitHub Secrets / Azure Key Vault).
- API keys: `HSL_API_KEY` is required for HSL/DigiTransit queries. Obtain a key from DigiTransit.
- .env example: Format values consistently and use only letters/numbers for secrets.

  #database
  DB_HOST=localhost
  DB_USER=appuser
  DB_PASSWORD=password
  DB_NAME=wsk_restaurant

  #server host
  SERVER_HOST=localhost
  SERVER_PORT=<CHOSEN_PORT>

  #JSON web token
  JWT_SECRET=<YOUR_SECRET_KEY>

  #API KEYS
  #DigiTransit
  HSL_API_KEY=<YOUR_API_KEY>

- env.local example (client folder):

  VITE_BASE_URL=/

  VITE_USE_LOCAL_SERVER=false

  VITE_SERVER_URL_LOCAL=<http://localhost>:<CHOSEN_PORT>
  VITE_API_URL_LOCAL=<http://localhost>:<CHOSEN_PORT>/api

  VITE_SERVER_URL=<https://wsk-restaurant-server.norwayeast.cloudapp.azure.com>
  VITE_API_URL=<https://wsk-restaurant-server.norwayeast.cloudapp.azure.com/api>

- Code quality: Run linter and formatter before commits (`npm run lint`, `npm run format` if available).
- Testing: Use the `tests/` folder for API testing and add your own scenarios.
- Database: Keep backups (`backup.bundle`) up to date and use mock data for development.
- Accessibility: Add descriptive `alt` texts for images and ensure good contrast/tags for accessibility.

## Todo

- Review system for dishes
- Customer feedback for restaurants
- Customer requests
- Add content to restaurant profiles (e.g., special offers, events)
- Notify customers about new menus or offers
- Support multiple locations
- Dark mode
