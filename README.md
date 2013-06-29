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

    APP_NAME="test" \
    GEAR_UUID="test" \
    VERSION="0.10.0" \
    IP="127.0.0.1" \
    PORT="1234" \
    TEMPLATE_DIR="/tmp/gear/template" \
    TMP_DIR="/tmp/gear/tmp" \
    DATA_DIR="/tmp/gear/data" \
    BUILD_DIR="/tmp/gear/build" \
    ADMIN_DIR="/tmp/gear/admin" \
    APP_DIR="/tmp/gear/app" \
    REPO_DIR="/tmp/gear/repo"\
    ./bin/admindo metadatas/nodejs.yml && \
    ./bin/build metadatas/nodejs.yml && \
    ./bin/start metadatas/nodejs.yml

