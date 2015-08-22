#! /bin/bash
virtualenv --no-site-packages .
source bin/activate
pip install -r config/requirements.txt
