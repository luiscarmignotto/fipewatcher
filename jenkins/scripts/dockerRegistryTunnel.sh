#!/bin/bash

service_name="docker-registry"
namespace="docker-registry"
publish_port=5000

echo "Checking Tunnel"
pid=$(ps -ef | grep port-forward | grep ${service_name} | grep -v grep | awk '{print $2}')

if [ -z "${pid}" ]
then 
    echo "Creating Tunnel"
    service_port=$(minikube kubectl -- get services -n ${namespace} | grep ${service_name} | awk '{print $5}' | cut -d\/ -f1)
    minikube kubectl -- port-forward service/${service_name} ${publish_port}:${service_port} -n ${namespace} & 
fi 

echo "Tunnel is ready"