#!/bin/bash
set -e
pm2-runtime start servers/server.js & 
nginx -g 'daemon off;'