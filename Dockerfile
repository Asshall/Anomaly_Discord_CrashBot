FROM node

ARG sources_dest="/src"
COPY ["src", "${sources_dest}"]
WORKDIR ${sources_dest}
RUN apt update -y && apt install fortune-anarchism -y
RUN npm install
CMD ["npm", "start"]


