# PesaTools

Pesatools is a web app that generates insights and enables searching, filtering, sorting, and exporting for M-Pesa statements.

## Tech stack
- React
- Vite

## Quick Start

### Run locally Using Docker

1. Clone this repo to your machine

```
git clone https://github.com/ezekiel-charo/pesa-tools.git
```

2. Build the development image

```
docker build -t pesa-tools-dev -f Dockerfile.dev .
```

2. Run the container

```
docker run -p 5173:5173 pesa-tools-dev
```
