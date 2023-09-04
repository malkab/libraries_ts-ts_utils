#!/bin/bash

docker run -ti --rm \
  --name ts_utils_dev \
  --hostname ts_utils_dev \
  --user 1000:1000 \
  -v $(pwd)/../:$(pwd)/../ \
  -v ~/.npmrc:/root/.npmrc \
  -v ~/.npmrc:/home/node/.npmrc \
  --workdir $(pwd)/../node \
  registry.gitlab.com/sunnsaas/sunnsaas_v1/sunnsaas-worker-dev:v16
