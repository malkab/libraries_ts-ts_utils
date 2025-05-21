# Configuración.
BASE_NAME = ts_utils
SRC_FOLDER = $(shell pwd)/src
DOCKER_VOLUMES_FOLDER = $(shell pwd)/000_docker_volumes
NETWORK_NAME = $(BASE_NAME)
PG_DOCKER_IMAGE = malkab/postgis:gargantuan_giraffe

# Ejecuta un script Yarn.
yarn:
	@docker exec -ti \
		--workdir $(shell pwd) \
		$(BASE_NAME)_typescript \
		yarn dev

# Sesión en el devcontainer principal TypeScript.
typescript_sesion:
	@docker exec -ti \
		--workdir $(shell pwd) \
		$(BASE_NAME)_typescript \
		/bin/bash

# Limpia activos.
clean:
	@read -p "¿Eliminar infraestructura Docker [s/N]? " confirm && \
	if [ "$$confirm" = "s" ]; then \
		docker ps --filter name=$(BASE_NAME)* -q | xargs docker stop -t0; \
		docker ps -a --filter name=$(BASE_NAME)* -q | xargs docker rm; \
		docker image ls --filter reference=*$(BASE_NAME)* -q | xargs docker image rm; \
		docker network ls --filter name=$(BASE_NAME) -q | xargs docker network rm; \
	fi

# Sesión a la base de datos.
psql:
	@docker run -ti --rm \
		--network $(NETWORK_NAME) \
		-v $(shell pwd):$(shell pwd) \
		--workdir $(shell pwd) \
		--entrypoint /bin/bash \
		$(PG_DOCKER_IMAGE) \
		-c "PGPASSWORD=postgres psql -h postgis -p 5432 -U postgres postgres"

# Lanza los tests.
# Sesión en el devcontainer principal TypeScript.
ejecutar_tests:
	@docker exec -ti \
		--workdir $(shell pwd) \
		$(BASE_NAME)_typescript \
		/bin/bash \
		-c "yarn test"
