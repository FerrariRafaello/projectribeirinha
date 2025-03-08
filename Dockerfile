# Use the official Python image
FROM python:3.9-slim

# Create the app directory
WORKDIR /app

# Copy all project files into /app
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r backend/requirements.txt

# Define environment variable for Flask
ENV FLASK_APP=backend/app.py

# Expose the port
EXPOSE 5000

# Run the app on container start
CMD ["flask", "run", "--host=0.0.0.0"]
