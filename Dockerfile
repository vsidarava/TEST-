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

ENV APP_URL=http://host.docker.internal:4001

# Command to run tests
CMD ["npx", "playwright", "test"]