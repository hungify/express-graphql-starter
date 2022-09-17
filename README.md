# Configs connection

## Run Postgres inside Docker only

1. Run command `docker inspect postgresql -f "{{json .NetworkSettings.Networks }}"`
   then pickup property `api get way` set into hostname/address connection

## Run Postgres inside Docker Compose

1. Key container_name of postgres service is a hostname/address connection
2 Use hostname or IP address

- Get the identifier of your Postgres container: `docker ps`
- Print the IP address of this docker image using its identifier:
  `Docker inspect Container ID | grep IPAddress`
