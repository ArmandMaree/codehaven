up-dev:
	docker-compose -f docker-compose.yml -f docker-compose.development.yml up -d --build

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build

down: 
	docker-compose down