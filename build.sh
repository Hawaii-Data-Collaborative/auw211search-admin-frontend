#! /usr/bin/env bash

echo "[build] building ..."
yarn build
echo "[build] compressing ..."
tar czf build.tar.gz build
echo "[build] done"
