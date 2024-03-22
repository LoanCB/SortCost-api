##########################
# BUILD FOR LOCAL DEV    #
##########################
# Base image
FROM node:18-alpine As development

# Create app directory
WORKDIR /srv/sortcost

# Set Timezone
ENV TZ=Europe/Paris
RUN apk add --no-cache tzdata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --chown=node:node package*.json ./

# Install app dependencies
RUN npm i

# Bundle app source
COPY --chown=node:node . .

RUN npm run build

RUN chown node:node /srv/sortcost
RUN chown -R node:node /srv/sortcost/dist

# avoid root user
USER node

CMD ["npm", "run", "start"]
