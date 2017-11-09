FROM node:latest
RUN apt-get update
RUN apt-get install -y nodejs nodejs-legacy npm
#RUN npm install -g express-generator
#RUN npm install jade-bootstrap
#RUN npm install request
#RUN npm install express-mailer
#RUN npm install johnny-five

VOLUME /home/mouhab/Documents/iot_project
EXPOSE 49160
CMD /bin/bash

#pour la creation de l'image
#sudo docker build -t node:0.2 . 
#pour la creaction d'un container
#sudo docker run --name node-con_2 -it -v /home/pro/Documents/iot_project/:/host --device /dev/ttyACM0:/dev/ttyACM0 -p 4000:49160 node:0.2

