# Configs connection

## Postgres Docker only

1. Run command `docker inspect postgresql -f "{{json .NetworkSettings.Networks }}"`
   and get api get way set into hostname/address

## Postgres Docker Compose

1. Container name of postgres docker service is a hostname/address
