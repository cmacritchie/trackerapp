getting started npm init

npm run dev  (in src folder)

you need to connect mongodb to the current path
 point towards database path: 
.\mongodb\bin\mongod.exe --dbpath=\Users\747049\mongodb-data\


to do: write tests

in the config folder there is a dev.env folder that contains key value pairs. there should be no spaces The keys include:


npm files
 env-cmd: used for serving up the right files in development. in start script sent environment location

for nodemon and env cmd save npm i --save-dev       


ENV needs 
JWT Secret
link to URL

in the main directory put in NPX start client to create the client on  react. You can start the React server using npm start

to run server and client at the same time in the SERVER package.json you want to set up concurrently
next try running in the tracker app folder and run npm run dev

when package.json is changed, the whole server should be restarted

you need to set up proxy for local development but in prodiction you don't because everything is built together
set proxy in the server package json
when running npm run build


Steps to make this

BACKEND
set up an index router that uses express and mongodb
set up environment keys and don't forget gitignore. Now you can commit if you like
in the db file set up the configurationn for mongoose
next make all the different models for mongoose including the user
set up the routers for all CRUD operations, don't add middleware yet
you're going to have to set up some methods on the user for credentials, don't forget to encrypt passwords
and save the password key in the gitignore
add the middleware to the necessary routes
test the routes in POSTMAN and make sure to set the url and the authentication on login

Front End
use concurrently to run both front end and back end at the same time
set up proxy so that routes relative routes will run properly
start with login and reducers. make sure that you save JWT in cookies


ToDos:
Pagination / Lazy Loading
overall Stats
mobile View
set up Test Scripts

