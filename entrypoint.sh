#!/bin/sh
# Replace env variables from the env-config.template.js file
envsubst < /app/dist/env-config.template.js > /app/dist/env-config.js
# Remove the template file
rm /app/dist/env-config.template.js
exec "$@"
