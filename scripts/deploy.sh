#!/bin/bash

# Deployment script for CV Portfolio
set -e

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if .env file exists
if [ ! -f .env ]; then
    echo -e "${RED}❌ Error: .env file not found!${NC}"
    echo -e "${YELLOW}Please copy .env.example to .env and fill in your values${NC}"
    exit 1
fi

# Load environment variables
source .env

# Validate required environment variables
required_vars=("DOMAIN" "LETSENCRYPT_EMAIL" "SMTP_HOST" "SMTP_USER" "SMTP_PASS" "CONTACT_EMAIL")
for var in "${required_vars[@]}"; do
    if [ -z "${!var}" ]; then
        echo -e "${RED}❌ Error: $var is not set in .env file${NC}"
        exit 1
    fi
done

echo -e "${GREEN}✅ Environment variables validated${NC}"

# Build and start services
echo -e "${YELLOW}🔨 Building Docker images...${NC}"
docker compose -f docker-compose.prod.yml build --no-cache

echo -e "${YELLOW}🚀 Starting services...${NC}"
docker compose -f docker-compose.prod.yml up -d

# Wait for services to be healthy
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 30

# Check if services are running
if docker compose -f docker-compose.prod.yml ps | grep -q "running"; then
    echo -e "${GREEN}✅ Services are running successfully!${NC}"
    echo -e "${GREEN}🌐 Your site should be available at: https://${DOMAIN}${NC}"
    echo -e "${GREEN}🔧 API available at: https://api.${DOMAIN}${NC}"
else
    echo -e "${RED}❌ Some services failed to start${NC}"
    docker compose -f docker-compose.prod.yml logs
    exit 1
fi

echo -e "${GREEN}🎉 Deployment completed successfully!${NC}"
