# Docker section
.PHONY: db-up ## up services
db-up:
	@docker compose up -d rabbitmq mongodb

.PHONY: app-up ## up all services app
app-up:
	@docker compose run --service-ports app

.PHONY: dk-down ## down all services
dc-down:
	@docker compose down --remove-orphans -v