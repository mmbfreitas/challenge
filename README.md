# Challenge


## Precondition
* Docker - Engine: 18.06.0-ce or higher
* Docker Compose - 1.22.0
* Node - version 8.11.4
* Npm -version v6.6.0
* Available ports: 4000 | 27019

** maybe you should use sudo for some commands if you are using ubuntu

## Instructions

```
Clone from github - git clone https://github.com/mmbfreitas/challenge.git
```
```
Go to the root path of project -> 'cd challenge'
```
```
Run 'npm install'
```

### Production
```
Run 'docker-compose up' - wait until show in log that server is up
```

``` 
Access http://localhost:4000 (http://localhost:4000/doc to see documentation)
```

### Tests

```
Run 'docker-compose down' if you have executed docker-compose up before

Run 'docker-compose -f docker-compose.test.yml up'

Run 'docker-compose -f docker-compose.test.yml run --rm api npm t'  to run unit and functional tests

if you want test in postman you could import the file Ambev-challenge.postman_collection. In this file there is a example of each call 
```
