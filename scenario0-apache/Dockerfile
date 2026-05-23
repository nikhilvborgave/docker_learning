FROM ubuntu:latest
LABEL "Author"="Nikhil"
RUN apt update && apt install git -y
RUN apt install apache2 -y
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]
EXPOSE 80
WORKDIR /var/www/html
VOLUME /var/log/apache2
ADD fireworks.tar.gz /var/www/html
#COPY fireworks.tar.gz /var/www/html
