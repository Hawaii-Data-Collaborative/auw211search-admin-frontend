#! /usr/bin/env bash

echo "[deploy] building ..."
yarn build
echo "[deploy] compressing ..."
tar czf build.tar.gz build
echo "[deploy] done"
