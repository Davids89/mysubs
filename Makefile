PNPM ?= npx pnpm@latest
ANDROID_SDK ?= $(HOME)/Android/Sdk

.PHONY: help install dev backend-dev mobile-android up down test test-backend build clean

help:
	@echo "Available commands:"
	@echo "  make install       Install workspace dependencies"
	@echo "  make dev           Start all dev tasks with Turborepo"
	@echo "  make backend-dev   Start only the backend locally"
	@echo "  make mobile-android Launch the mobile app in the Android emulator"
	@echo "  make docker-up     Start the app with Docker Compose"
	@echo "  make docker-down   Stop Docker Compose services"
	@echo "  make test          Run all workspace tests"
	@echo "  make test-backend  Run backend tests"
	@echo "  make build         Build all workspace packages"
	@echo "  make clean         Remove generated build and cache folders"

install:
	$(PNPM) install

dev:
	$(PNPM) dev

backend-dev:
	$(PNPM) --filter @mysubs/backend dev

mobile-android:
	ANDROID_HOME="$(ANDROID_SDK)" \
	ANDROID_SDK_ROOT="$(ANDROID_SDK)" \
	PATH="$(ANDROID_SDK)/platform-tools:$(ANDROID_SDK)/emulator:$$PATH" \
	$(PNPM) --filter @mysubs/mobile exec expo start --android

up:
	docker compose up --build

down:
	docker compose down

test:
	$(PNPM) test

test-backend:
	$(PNPM) test:backend

build:
	$(PNPM) build

clean:
	rm -rf .turbo apps/backend/dist packages/*/dist
