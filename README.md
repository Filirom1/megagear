# Megagear

Create dir structure

    mkdir -p /tmp/instance/{template,tmp,data,build,admin,app,repo}

Create a dummy nodejs app

    sudo npm i -g express
    cd /tmp/instance/repo
    express

How to use

    git clone https://github.com/Filirom1/megagear.git
    cd megagear

    export APP_NAME="test"
    export VERSION="0.10.0"
    export IP="127.0.0.1"
    export PORT="1234"
    export USERNAME="TOTO"
    export PASSWORD="T0T0"
    export TEMPLATE_DIR="/tmp/instance/template"
    export TMP_DIR="/tmp/instance/tmp"
    export DATA_DIR="/tmp/instance/data"
    export BUILD_DIR="/tmp/instance/build"
    export ADMIN_DIR="/tmp/instance/admin"
    export REPO_DIR="/tmp/instance/repo"
    export INSTANCE_DIR="/tmp/instance/app"
    export INSTANCE_NUMBER="0"
    export INSTANCE_UUID="test"
    export INSTANCE_GROUP_NAME="web"
    export INSTANCE_GROUP_HOSTS="localhost:1234"
    ./bin/control admindo metadatas/nodejs.yml
    ./bin/control build metadatas/nodejs.yml
    ./bin/control start metadatas/nodejs.yml &
    ./bin/control status metadatas/nodejs.yml

