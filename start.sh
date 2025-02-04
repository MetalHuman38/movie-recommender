#!/bin/bash

# Start Flask backend
echo "Starting Flask backend..."
cd /home/bkalejaiye/movie_recommendations/server || { echo "Flask backend directory not found."; exit 1; }

# Ensure gunicorn is available in the current environment
if ! command -v gunicorn &> /dev/null; then
  echo "Gunicorn is not installed or not in PATH. Please install it using 'pip install gunicorn'."
  exit 1
fi

gunicorn -w 4 -b 0.0.0.0:5001 server:app &
FLASK_PID=$!  # Capture Flask process ID

# Start Next.js frontend
echo "Starting Next.js frontend..."
cd /home/bkalejaiye/movie_recommendations/ || { echo "Next.js frontend directory not found."; exit 1; }

npm run dev &
NEXTJS_PID=$!  # Capture Next.js process ID

# Wait for both processes to finish
wait $FLASK_PID $NEXTJS_PID
