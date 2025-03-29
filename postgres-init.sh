#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "myuser" --dbname "basecesizen" <<-EOSQL
	CREATE SCHEMA ZEN_SCHEMA;
EOSQL
