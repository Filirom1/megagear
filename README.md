# Megagear

How to use

    git clone https://github.com/Filirom1/megagear.git
    cd megagear

## Simple usage

You will use `bin/local-test`, it's simplier than using `bin/control` directly.

First create a temporary directory

    mkdir /tmp/megagear

### NodeJs

Create a sample nodejs project

    sudo npm i -g express
    mkdir ~/express
    cd ~/express
    express
    cd -

Download nodeJs v0.10.0, build the project and launch the web server.

    export VERSION=0.10.0
    rm -fr /tmp/megagear/instance0 && cp -r ~/express/ /tmp/megagear/repo &&  ./bin/local-test metadatas/nodejs.yml 

### MongoDB 

Download mongodb 2.4.5, start 3 instances and configure them as a replicaset

    export VERSION=2.4.5
    rm -fr /tmp/megagear/instance* &&  ./bin/local-test metadatas/mongodb.yml

## Advanced usage

    cd megagear
    export PATH=`pwd`/bin:$PATH

### NodeJs


Create dir structure

    mkdir -p /tmp/instance/{tmp,data,build,admin,instance,repo}

Create a dummy nodejs app

    sudo npm i -g express
    cd /tmp/instance/repo
    express

    export VERSION="0.10.0"
    export IP="127.0.0.1"
    export PORT="1234"
    export BUILD_DIR="/tmp/instance/build"
    export ADMIN_DIR="/tmp/instance/admin"
    export REPO_DIR="/tmp/instance/repo"
    cd -
    ./bin/control admindo metadatas/nodejs.yml
    ./bin/control build metadatas/nodejs.yml
    ./bin/control start metadatas/nodejs.yml &
    ./bin/control status metadatas/nodejs.yml


### MongoDB

Create dir structure

    mkdir -p /tmp/mongodb/admin
    mkdir -p /tmp/mongodb0/{tmp,data,instance}
    mkdir -p /tmp/mongodb1/{tmp,data,instance}
    mkdir -p /tmp/mongodb2/{tmp,data,instance}

    export APP_NAME="test"
    export VERSION="2.4.4"
    export IP="127.0.0.1"
    export USERNAME="TOTO"
    export PASSWORD="T0T0"
    export INSTANCE_UUID="test"
    export INSTANCE_GROUP_NAME="mongodb"
    export INSTANCE_GROUP_HOSTS="localhost:27015,localhost:27016,localhost:27017"
    export TEMPLATE_DIR="metadatas/mongodb"
    export ADMIN_DIR="/tmp/mongodb/admin"
    ./bin/control admindo metadatas/mongodb.yml

    export PORT="27015"
    export INSTANCE_NUMBER="0"
    export DATA_DIR="/tmp/mongodb${INSTANCE_NUMBER}/data"
    export INSTANCE_DIR="/tmp/mongodb${INSTANCE_NUMBER}/instance"
    ./bin/control start metadatas/mongodb.yml &
    sleep 3
    ./bin/control post-start metadatas/mongodb.yml
    ./bin/control IS_MASTER metadatas/mongodb.yml
    ./bin/control status metadatas/mongodb.yml

    export PORT="27016"
    export INSTANCE_NUMBER="1"
    export DATA_DIR="/tmp/mongodb${INSTANCE_NUMBER}/data"
    export INSTANCE_DIR="/tmp/mongodb${INSTANCE_NUMBER}/instance"
    ./bin/control start metadatas/mongodb.yml &
    sleep 3
    ./bin/control post-start metadatas/mongodb.yml
    ./bin/control IS_MASTER metadatas/mongodb.yml
    ./bin/control status metadatas/mongodb.yml

    export PORT="27017"
    export INSTANCE_NUMBER="2"
    export DATA_DIR="/tmp/mongodb${INSTANCE_NUMBER}/data"
    export INSTANCE_DIR="/tmp/mongodb${INSTANCE_NUMBER}/instance"
    ./bin/control start metadatas/mongodb.yml &
    sleep 3
    ./bin/control post-start metadatas/mongodb.yml
    ./bin/control IS_MASTER metadatas/mongodb.yml
    ./bin/control status metadatas/mongodb.yml

    export PORT="27015"
    export INSTANCE_NUMBER="0"
    export DATA_DIR="/tmp/mongodb${INSTANCE_NUMBER}/data"
    export INSTANCE_DIR="/tmp/mongodb${INSTANCE_NUMBER}/instance"
    PEER_IP=localhost PEER_PORT=27016 IS_MASTER=true ./bin/control on-peer-start metadatas/mongodb.yml
    PEER_IP=localhost PEER_PORT=27017 IS_MASTER=true ./bin/control on-peer-start metadatas/mongodb.yml
