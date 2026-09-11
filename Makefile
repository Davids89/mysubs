PNPM ?= npx pnpm@latest
ANDROID_SDK ?= $(HOME)/Android/Sdk

.PHONY: help install dev backend-dev mobile-android up upd down db-seed db-shell test test-backend build clean

help:
	@echo "Available commands:"
	@echo "  make install       Install workspace dependencies and build shared-types"
	@echo "  make dev           Start all dev tasks with Turborepo"
	@echo "  make backend-dev   Start only the backend locally"
	@echo "  make mobile-android Launch the mobile app in the Android emulator"
	@echo "  make up            Start the app with Docker Compose"
	@echo "  make upd           Start detached, then apply migrations and seed"
	@echo "  make down          Stop Docker Compose services"
	@echo "  make db-seed       Insert the dev user into the database"
	@echo "  make db-shell      Open a psql shell on the backend database"
	@echo "  make test          Run all workspace tests"
	@echo "  make test-backend  Run backend tests"
	@echo "  make build         Build all workspace packages"
	@echo "  make clean         Remove generated build and cache folders"

install:
	$(PNPM) install
	$(PNPM) --filter @subtrack/shared-types build

dev:
	$(PNPM) dev

backend-dev:
	$(PNPM) --filter @subtrack/backend dev

mobile-android:
	ANDROID_HOME="$(ANDROID_SDK)" \
	ANDROID_SDK_ROOT="$(ANDROID_SDK)" \
	PATH="$(ANDROID_SDK)/platform-tools:$(ANDROID_SDK)/emulator:$$PATH" \
	$(PNPM) --filter @subtrack/mobile exec expo start --android

up:
	docker compose up --build

upd:
	docker compose up --build --detach
	docker compose exec backend pnpm --filter @subtrack/backend db:deploy
	docker compose exec backend pnpm --filter @subtrack/backend db:seed

down:
	docker compose down

db-seed:
	$(PNPM) --filter @subtrack/backend db:seed

db-shell:
	docker compose exec db psql -U subtrack -d subtrack

test:
	$(PNPM) test

test-backend:
	$(PNPM) test:backend

build:
	$(PNPM) build

clean:
	rm -rf .turbo apps/backend/dist packages/*/dist
