# Megagear

How to use

    git clone https://github.com/Filirom1/megagear.git
    cd megagear
    export PATH=`pwd`/bin:$PATH

## NodeJs

Create dir structure

    mkdir -p /tmp/instance/{tmp,data,build,admin,instance,repo}

Create a dummy nodejs app

    sudo npm i -g express
    cd /tmp/instance/repo
    express

    cd megagear
    export VERSION="0.10.0"
    export IP="127.0.0.1"
    export PORT="1234"
    export BUILD_DIR="/tmp/instance/build"
    export ADMIN_DIR="/tmp/instance/admin"
    export REPO_DIR="/tmp/instance/repo"
    ./bin/control admindo metadatas/nodejs.yml
    ./bin/control build metadatas/nodejs.yml
    ./bin/control start metadatas/nodejs.yml &
    ./bin/control status metadatas/nodejs.yml

# MongoDB

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
    ./bin/control post-start metadatas/mongodb.yml
    ./bin/control IS_MASTER metadatas/mongodb.yml
    PEER_IP=localhost PEER_PORT=27016 IS_MASTER=true ./bin/control on-peer-start metadatas/mongodb.yml
    PEER_IP=localhost PEER_PORT=27017 IS_MASTER=true ./bin/control on-peer-start metadatas/mongodb.yml
    ./bin/control status metadatas/mongodb.yml

    export PORT="27016"
    export INSTANCE_NUMBER="1"
    export DATA_DIR="/tmp/mongodb${INSTANCE_NUMBER}/data"
    export INSTANCE_DIR="/tmp/mongodb${INSTANCE_NUMBER}/instance"
    ./bin/control start metadatas/mongodb.yml &
    ./bin/control post-start metadatas/mongodb.yml
    ./bin/control IS_MASTER metadatas/mongodb.yml
    ./bin/control status metadatas/mongodb.yml

    export PORT="27017"
    export INSTANCE_NUMBER="2"
    export DATA_DIR="/tmp/mongodb${INSTANCE_NUMBER}/data"
    export INSTANCE_DIR="/tmp/mongodb${INSTANCE_NUMBER}/instance"
    ./bin/control start metadatas/mongodb.yml &
    ./bin/control post-start metadatas/mongodb.yml
    ./bin/control IS_MASTER metadatas/mongodb.yml
    ./bin/control status metadatas/mongodb.yml
