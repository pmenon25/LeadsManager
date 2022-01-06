# ===   Python build   ===
FROM python:3.8-alpine as python-build

# set work directory
WORKDIR /backend
COPY . .

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Install Postgres and psycopg2 deps
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt