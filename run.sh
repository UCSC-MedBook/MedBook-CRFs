# export NODE_OPTIONS='--debug'
cd webapp

# mine
ROOT_URL=http://localhost/CRF/ MONGO_URL=mongodb://localhost:27017/MedBook meteor --port 10002
# ROOT_URL=http://localhost/CRF/ meteor --port 10002
