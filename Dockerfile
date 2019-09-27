FROM node:latest
RUN git clone https://github.com/2b1q/hasher.git
COPY hasher.js .
ENTRYPOINT ["node", "hasher.js"]
