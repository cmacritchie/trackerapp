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
	 