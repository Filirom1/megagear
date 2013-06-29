# Megagear

Create dir structure

    mkdir -p /tmp/gear/{template,tmp,data,build,admin,app,repo}

Create a dummy nodejs app

    sudo npm i -g express
    cd /tmp/gear/repo
    express

How to use

    git clone https://github.com/Filirom1/megagear.git
    cd megagear

    export APP_NAME="test"
    export GEAR_UUID="test"
    export VERSION="0.10.0"
    export IP="127.0.0.1"
    export PORT="1234"
    export TEMPLATE_DIR="/tmp/gear/template"
    export TMP_DIR="/tmp/gear/tmp"
    export DATA_DIR="/tmp/gear/data"
    export BUILD_DIR="/tmp/gear/build"
    export ADMIN_DIR="/tmp/gear/admin"
    export APP_DIR="/tmp/gear/app"
    export REPO_DIR="/tmp/gear/repo"
    ./bin/admindo metadatas/nodejs.yml
    ./bin/build metadatas/nodejs.yml
    ./bin/start metadatas/nodejs.yml &
    ./bin/status metadatas/nodejs.yml

