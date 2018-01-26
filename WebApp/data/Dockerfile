FROM postgres:latest
RUN apt-get update
VOLUME /home/rezak/iot_project/data/
EXPOSE 5432
CMD ["postgres"]
# pour la creation de l'image
#sudo docker build -t pgsql:0.1 . 
#pour la creaction d'un container
#sudo docker run --name psgsql_1 -it -v /home/rezak/iot_project/data/:/data -p 9000:5432 pgsql:0.1

