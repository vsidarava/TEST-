FROM mcr.microsoft.com/playwright:v1.47.1-jammy

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of your app's source code
COPY . .

# Install Playwright browsers and dependencies
RUN npx playwright install --with-deps

# Set the environment variable
ENV APP_URL=http://backend:4001

# Create a shell script to run tests and set exit code
RUN echo '#!/bin/sh\nnpx playwright test\nexit $?' > /app/run-tests.sh && chmod +x /app/run-tests.sh

# Command to run tests
CMD ["/app/run-tests.sh"]