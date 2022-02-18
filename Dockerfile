FROM node

ARG sources_dest="/src"
COPY ["src", "${sources_dest}"]
WORKDIR ${sources_dest}

RUN npm install
ENTRYPOINT ["npm", "start"]

