#!/bin/sh

set -e

. /venv/bin/activate

exec gunicorn --bind 0.0.0.0:8000 wsgi:application