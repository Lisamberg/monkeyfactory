# REST API MonkeyFactory test
This is the REST API for MonkeyFactory =)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start


## Test

```bash
# unit tests
$ npm run test
```

# REST API

The REST API is described below.

## Get Roman date and Paris min/max temp weather data

### Request
host: localhost:3000

`GET /?date='06/07/2021'`

### Response
  HTTP/1.1 200 OK
  Status: 200 OK
   'roman date : Paris : Min: temp° -  Max: temp°'

