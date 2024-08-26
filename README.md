# Project Title

small web-server that gives information on inbound and outbound flights from TLV airport.
It provides endpoints for querying data related to inbound, outbound, and delayed flights, popular destinations, and quick getaways

## Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (version 14 or higher)
- **npm** (version 6 or higher)

## Installation

To install the project, follow these steps:

1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/jonatanBuga/web-server.git
    ```

2. Navigate to the project directory:
    ```bash
    cd web-server
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```



# Running the Server

To start the server, run the following command in your terminal:

```bash
npm run start

```

## 

By default, the server will start on localhost at port 8080.

You can access the main page by navigating to:

http://localhost:8080

## API Endpoints

The API provides several routes for accessing flight data. Below is a list of the available endpoints:

### A. All Flights


1. 
- Endpoint: /allFlights/amount
- Method: GET
- URL: http://localhost:8080/allFlight/amount
- Get the total number of all inbound and outbound flights


2. 
- Endpoint: /allFlights/numberFromCountry
- Method: GET
- URL: http://localhost:8080/allFlight/numberFromCountry?country=<country_name>
- Parameters: country (string)
- Get the number of inbound and outbound flights from a specific country

3. 
- Endpoint: /allFlights/delayedNumber
- Method: GET
- URL: http://localhost:8080/allFlight/delayedNumber
- Get the number of delayed flights (inbound and outbound together)

4. 
- Endpoint: /allFlights/popular
- Method: GET
- URL: http://localhost:8080/allFlight/popular
- Get the most popular destination city


5. 
- Endpoint: /allFlights/quickFlight
- Method: GET
- URL: http://localhost:8080/allFlight/quickFlight
- Get a quick getaway flight (if available)

## B. Inbound Routes

1. 

- Endpoint: /inbound/amount
- Method: GET
- URL: http://localhost:8080/inbound/amount
- Get the total number of inbound flights


2. 
- Endpoint: /inbound/numberFromCountry
- Method: GET
- URL: http://localhost:8080/inbound/numberFromCountry?country=<country_name>
- Parameters: country (string)
- Get the number of inbound flights from a specific country:


## C. Outbound Routes

1. 
- Endpoint: /outbound/amount
- Method: GET
- URL: http://localhost:8080/outbound/amount
- Get the total number of outbound flights

2. 
- Endpoint: /outbound/numberFromCountry
- Method: GET
- URL: http://localhost:8080/outbound/numberFromCountry?country=<country_name>
- Parameters: country (string)
- Get the number of outbound flights from a specific country
