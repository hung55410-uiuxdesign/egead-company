#!/bin/sh
set -e

SITE_DIR="$(CDPATH= cd -- "$(dirname "$0")/.." && pwd)"

cd "$SITE_DIR"

docker inspect egead-nginx >/dev/null
docker inspect egead_app >/dev/null

docker inspect egead-nginx --format '{{range $k, $v := .NetworkSettings.Networks}}{{println $k}}{{end}}' | while IFS= read -r net; do
  [ -n "$net" ] || continue
  echo "connect egead_app -> $net"
  docker network connect "$net" egead_app 2>/dev/null || true
done

docker exec egead-nginx rm -f /etc/nginx/conf.d/egeadcompany.com.conf
docker restart egead-nginx >/dev/null
docker exec egead-nginx nginx -t

echo "OK. Test:"
curl -sI -H "Host: egeadcompany.com" http://127.0.0.1 | head -n 15
