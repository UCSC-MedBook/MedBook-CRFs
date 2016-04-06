# export NODE_OPTIONS='--debug'
cd webapp

# mine
export MEBBOOK_APP_DIR=/Users/tedgoldstein/MedBook/MedBook-CRFs5
export MEBBOOK_APP_DATA=/Users/tedgoldstein/MedBook/MedBook-CRFs5/data
ROOT_URL=http://localhost/CRF/ MONGO_URL=mongodb://localhost:27017/MedBook meteor --port 10002
# ROOT_URL=http://localhost/CRF/ meteor --port 10002
