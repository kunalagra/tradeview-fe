# Full Stack Coding Assignment

## 👋 Summary

Create a Full-Stack CRUD application using any tech stack, framework, or UI library which implements the requirements stated below.

## **Minimum Requirements**

The minimum requirements for the assignment would be to implement a single API using the mock data available in _historical_prices.csv (click to download)_ and display a chart in the frontend with the data.

[historical_prices.csv](https://github.com/kunalagra/tradeview-be/blob/main/data.csv)

This data contains the daily price for NIFTY and BANK NIFTY indices. \*\*

1. The data should be inserted into a SQL database (SQLite)
2. GET /historical-data API, must be created which queries the database and returns the data. The API should have query parameters for _symbol,_ _from_data_ and _to_date_ and should return data for a symbol between the input dates for the input symbol
3. The front-end should call the API and the returned time-series data should be displayed as a chart with prices on Y-axis and date on the X-axis. There should be an input to filter for symbol, and date selector inputs for from_date and to_date for the chart.

**Note: The remaining requirements mentioned below are optional but implementing them would substantially increase the strength of your submission**

**Mock Responses Provided**

1. The following JSON files are attached which have mock responses that should return from subsequent APIs

a) _profile_response.json_ - Mock response containing profile details

b) _holdings_response.json_ - Mock response containing holdings details

c) _place_order_response.json_ - Mock response from placing an order

### File: profile.json

```json
{
	"status": "success",
	"data": {
		"user_id": "AB1234",
		"user_type": "individual",
		"email": "xxxyyy@gmail.com",
		"user_name": "AxAx Bxx",
		"broker": "ZERODHA"
	}
}
```

### File: holdings.json

```json
{
	"status": "success",
	"data": [
		{
			"tradingsymbol": "GOLDBEES",
			"exchange": "BSE",
			"isin": "INF204KB17I5",
			"quantity": 2,
			"authorised_date": "2021-06-08 00:00:00",
			"average_price": 40.67,
			"last_price": 42.47,
			"close_price": 42.28,
			"pnl": 3.5999999999999943,
			"day_change": 0.18999999999999773,
			"day_change_percentage": 0.44938505203405327
		},
		{
			"tradingsymbol": "IDEA",
			"exchange": "NSE",
			"isin": "INE669E01016",
			"quantity": 5,
			"authorised_date": "2021-06-08 00:00:00",
			"average_price": 8.466,
			"last_price": 10,
			"close_price": 10.1,
			"pnl": 7.6700000000000035,
			"day_change": -0.09999999999999964,
			"day_change_percentage": -0.9900990099009866
		}
	]
}
```

### File: place_order_response.json

```json
{
	"status": "success",
	"data": {
		"message": "Order Placed Successfully",
		"order_id": "151220000000000"
	}
}
```

## **Additional Requirements**

**High-Level Requirements (Additional Requirements)**

A user should be able to

1. Register
2. Login
3. View Dashboard
    1. Display Table with data - holdings_response.json
    2. Displays Chart with -historical_prices.csv
    3. Display Profile information - profile_response.json
4. Place Order
    1. Simple form with inputs for Symbol, price and quantity with a button to submit trade which calls an API that returns place_order_response.json

### 🖥 Front End Requirements **(Additional Requirements)**

The basic requirements are as follows :

- Login Page
         It should have two inputs username and password and a button to log in
- Register Page
         Should have inputs for name, username, and password
- Dashboard Page
    - Should display profile information as returned by _profile_response.json_
    - A table that shows the response from _holdings_response.json_
    - Card to view Total Profit/Loss which is a sum of Profit and Loss from _holdings_response.json_
    - Chart which displays timeseries data from historical_prices.csv
    - Form to place an order which has an input for symbol, quantity, and price and a button to submit order

### 🗄 Backend Requirements **(Additional Requirements)**

The basic requirements are as follows :

- Create endpoints for user authentication
    - POST user/login
    - POST user/register
    - User details should be stored in a SQL database (SQLite)
- Create endpoints that return mock responses
    - GET portfolio/holdings - _holdings_response.json_
    - GET user/profile - _profile_response.json_
    - POST order/place_order -_place_order_response.json_

🔥 **Extra Points for:**

- [ ] Creating a WebSocket connection that publishes dummy price data from the backend which displays on the frontend
- [ ] Hosting it on a webserver/hosting service so that it can be viewed online
