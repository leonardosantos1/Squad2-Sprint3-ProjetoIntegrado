FROM ubuntu

MAINTAINER Vinicius Monteiro

COPY . /var/www

WORKDIR /var/www

RUN apt update 

RUN apt install node 
RUN apt install npm
RUN apt install mysql-server

ENV CHAVE_JWT=Z4GT4jlkArYmXnRxqPXE2ikBjaAVrhTI+7HI7Bx1+BlOPzX0gp35gWy3Al6d9PfURplZlXohLeqb73kwzNqujUfJs0dP3Dm/As3uSxKLb/bPh+EblqpvN2v/2dwsUo2ABxKhdI+K5TQIdp0URZEklt1HK/KFZDqHoBoK+wfMWaO0N+TyntdLETdsY5K55HpJ/1jKyxbsX8y4TSYsqZFUk7Stbm3EaCy5K8D+vv7lVJ+Lt0tOYSMknsAif6bwvhFYk22FEMQaSZwV3AE+FeOPePv5LGxtSEwB+6DLMHs8WytOv7DHEnsK4gW9D3NNjBg8kPD6wb505c6OFKqTgGyvfw==

RUN npm install

EXPOSE 3000