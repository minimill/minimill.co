#! /bin/bash
virtualenv --no-site-packages /tmp/venv
source /tmp/venv/bin/activate
/tmp/venv/bin/pip install -r config/requirements.txt
