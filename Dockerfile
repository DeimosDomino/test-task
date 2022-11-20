FROM node:19

WORKDIR .

COPY . .

RUN yarn install

CMD ["yarn", "start"]