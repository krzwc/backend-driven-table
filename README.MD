# Backend driven table
To launch run `docker-compose up` and run `yarn start` in `/frontend`.<br>
The app should be running at [http://localhost:3000](http://localhost:3000).

## Tricky parts solved - for future reference
* using Python / Flask on the BE with PostgreSQL
* JWTs & auth
* immer (replaced immutable.js)
* http resource data modelling layer on the FE (I am not the author of the concept)
## Todo
- [ ] full containerization
- [ ] add custom middleware to wait for one action before starting another