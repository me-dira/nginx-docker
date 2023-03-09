#!/bin/bash
set -x

declare -A COMPOSE_FILES=(
  ["Simple"]="./1-simple/docker-compose.yml"
  ["Intermediate"]="./2-intermediate/docker-compose.yml"
  ["Sample"]="./sample-app/docker-compose.yml"
)


function stop_every_container {
  # docker compose -f $1 "${COMPOSE_FILES[@]}" stop
  for file in "${COMPOSE_FILES[@]}"; do
    docker-compose -f $file down
  done
}

function start_container {
  docker compose -f $1 up -d
}

function stop_container {
  docker compose -f $1 stop
}

compose_file_name=$(whiptail --title "Select Docker Compose file" \
                   --menu "Choose one of the following options:" 0 0 0 \
                   "Simple" " nginx" \
                   "Intermediate" " nginx" \
                   3>&1 1>&2 2>&3)

action=$(whiptail --title "Start/Stop Container" \
         --menu "Choose one of the following options:" 0 0 0 \
         "start" "Start ${container_name}" \
         "stop" "Stop ${container_name}" \
         3>&1 1>&2 2>&3)


# Run smaple app
docker compose -f "${COMPOSE_FILES["Sample"]}" up -d

case "$action" in 
    start)
        # stop_every_container
        start_container ${COMPOSE_FILES[$compose_file_name]};
        ;;
    stop)
        stop_container ${COMPOSE_FILES[$compose_file_name]};
        ;;
esac 

exit $?