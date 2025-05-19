#!/bin/bash

docker run -ti --rm \
  --name ts_utils_dev \
  --hostname ts_utils_dev \
  --user 1000:1000 \
  -v $(pwd)/../:$(pwd)/../ \
  -v ~/.npmrc:/root/.npmrc \
  -v ~/.npmrc:/home/node/.npmrc:ro \
  --workdir $(pwd)/../node \
  malkab/nodejs-dev:16.13.2
