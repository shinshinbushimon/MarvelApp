# amazonlinux(本場環境)にnode環境とnginxを用意する開発環境専用コンテナ

FROM amazonlinux:2023
EXPOSE 80

RUN yum update -y
RUN yum install -y nginx
RUN yum install -y nodejs
RUN npm install -g pm2
RUN yum clean all

WORKDIR /marvel-project

COPY package*.json ./
COPY ./nginx/webserver.conf /etc/nginx/conf.d/webserver.conf
RUN npm install --production

COPY ./startDevServer.sh ./
RUN chmod +x startDevServer.sh

CMD ["./startDevServer.sh"]