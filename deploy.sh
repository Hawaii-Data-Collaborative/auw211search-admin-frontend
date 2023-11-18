#! /usr/bin/env bash

echo "[deploy] scp'ing ..."
scp build.tar.gz auw1:/var/www/searchengine-admin-frontend/

echo "[deploy] ssh'ing ..."
ssh auw1 bash << EOF
cd /var/www/searchengine-admin-frontend
if [ -d "./build" ]; then
  echo "[deploy] moving existing build dir to build-old ..."
  rm -rf build-old
  mv build build-old
fi
echo "[deploy] uncompressing ..."
tar xzf build.tar.gz
EOF

echo "[deploy] done"
