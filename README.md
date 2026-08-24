# Pesa Tools - Quick Start

## Run locally Using Docker

1. Build the development image 
```
docker build -t pesa-tools-dev -f Dockerfile.dev .
```
2. Run the container 
```
docker run -p 5173:5173 pesa-tools-dev
```
