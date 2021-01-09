# Backend driven table
To launch db run `docker-compose up` then follow [README](./backend/README.md) to run the BE  and finally run `npm run start` in `/frontend`.<br>
The app should be running at [http://localhost:3000](http://localhost:3000).

## Tricky parts solved - for future reference
* using Python / Flask on the BE with PostgreSQL
* JWTs & auth
* immer (replaced immutable.js)
* http resource data modelling layer on the FE (I am not the author of the concept)
## Todo
- [ ] full containerization
- [ ] add custom middleware to wait for one action before starting another