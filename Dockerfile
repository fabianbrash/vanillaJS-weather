FROM node:13.12.0-alpine
LABEL maintainer="Fabian Brash"
WORKDIR /app
COPY . ./
RUN npm i -g serve

# let's run as non-root
USER 1000
EXPOSE  5000
CMD ["serve", "-s"]
