#! /usr/bin/env bash

echo "[deploy] scp'ing ..."
scp build.tar.gz wwa:/var/www/auwsearch.windwardapps.com/auw-admin-ui/

echo "[deploy] ssh'ing ..."
ssh wwa bash << EOF
cd /var/www/auwsearch.windwardapps.com/auw-admin-ui
if [ -d "./build" ]; then
  echo "[deploy] moving existing build dir to build-old ..."
  mv build build-old
fi
echo "[deploy] uncompressing ..."
tar xzf build.tar.gz
EOF

echo "[deploy] done"
