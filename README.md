# AUW 211 Search Frontend

This is the admin site frontend repo for https://search.auw211.org.

## Development

### Setup

Clone the repo, run `npm i`.

`cp .env.example .env` then edit accordingly.

### Running

Open a terminal, run `npm start` to start the server.

### Deploy

Run `./build.sh` to compile and zip the code. Run `./deploy.sh` to copy the
dist files to the production machine.

NOTE: `./deploy.sh` assumes you have an entry called `auw1` in your `~/.ssh/config` file.
