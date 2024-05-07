#!/bin/bash
set -e
pm2-runtime start server.js & 
nginx -g 'daemon off;'