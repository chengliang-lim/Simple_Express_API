docker swarm init

docker service create 

    --name express_poc_api 
    --replicas 3 
    --update-delay 2m 
    --publish 5001:5001 
    --update-parallelism 1 
    --update-failure-action rollback 
    --update-max-failure-ratio 0.2 

lseal98/express_poc_api:v1