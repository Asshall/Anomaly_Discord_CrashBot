FROM node

RUN apt update -y && apt install fortune-anarchism -y

ARG sources_dest="/src"
COPY ["src", "${sources_dest}"]
WORKDIR ${sources_dest}
RUN npm install

CMD ["npm", "start"]


