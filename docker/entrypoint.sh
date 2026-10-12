#!/bin/sh
set -e

su -s /bin/sh nextjs -c "cd /app && exec node_modules/.bin/next start -H 127.0.0.1 -p 3000" &

i=0
while [ "$i" -lt 30 ]; do
  if node -e "fetch('http://127.0.0.1:3000/').then(()=>process.exit(0)).catch(()=>process.exit(1))"; then
    break
  fi
  i=$((i + 1))
  sleep 1
done

exec nginx -g "daemon off;"
