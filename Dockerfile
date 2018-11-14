FROM node:latest
COPY hasher.js .
ENTRYPOINT ["node", "hasher.js"]
