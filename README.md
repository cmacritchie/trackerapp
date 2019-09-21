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
