FROM node:10.16.0

MAINTAINER suhong

RUN mkdir -p /webapp

WORKDIR /webapp

COPY . /webapp

RUN  npm install --registry=https://registry.npm.taobao.org

EXPOSE 7002

CMD npm run dev