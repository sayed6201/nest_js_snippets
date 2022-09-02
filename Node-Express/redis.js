/* ==================================================================
Redis project sample
    * fetches image data from server and caches it
    * stores data in redis cache and retrieves data from redis cache
    * adds expiry time
    * resource: https://www.sitepoint.com/using-redis-node-js/
================================================================== */

const express = require("express")
const axios = require("axios")
const cors = require("cors")
const Redis = require('redis')

const redisClient = Redis.createClient()

//the cache data will expire, in this time
const DEFAULT_EXPIRATION = 3600

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(cors())

//passing function in a method javascript
function getOrSetCache(key, cb) {
    //using promise to resolve or reject data
    return new Promise((resolve, reject) => {
        redisClient.get(key, async (error, data) => {
        if (error) return reject(error)
        if (data != null) return resolve (JSON.parse(data))

        //calls the call back function and returns data
        //this will only get called if the data is empty
        const freshData = await cb()

        //setting data to redis
        redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData))
        resolve(freshData)
        }
    })
}

//fetching and string data as cache in redis
app.get("/photos", async (req, res) => {
    const albumId = req.query.albumId 
    const photos = await getOrSetCache(`photos?albumId-${albumId}`,async()=>{ 
    const { data } = await axios.get( 
        "https://jsonplaceholder.typicode.com/photos" ,
        { params: { albumId } } 
    ) 
    return data 
    }) 
    res.json(photos) 
})

//fetching and string data as cache in redis
app.get("/photos/:id", async (req, res) => {

    const photos = await getOrSetCache(`photos?albumId-${albumId}`,async()=>{ 
        const { data } = await axios.get( 
            `https://jsonplaceholder.typicode.com/photos/${req.params.id}`)
        return data 
        }) 
        //returning the data
        res.json(photos) 
    })
app.listen(3000)



/* ==================================================================
Redis Snippets
================================================================== */

//----------------------------
//redis setup
//----------------------------
const redis = require('redis');

// By default, redis.createClient() will use 127.0.0.1 and 
// 6379 as the hostname and port respectively.
const client = redis.createClient(port, host);
// or use
const client = redis.createClient();


//gets called on connection to redis
client.on('connect', function() {
  console.log('Connected!');
});

//----------------------------
//string set and get
//----------------------------
client.set('framework', 'ReactJS', function(err, reply) {
    console.log(reply); // OK
  });
    
client.get('framework', function(err, reply) {
    console.log(reply); // ReactJS
  });

//-----------------------------
//deleting a key
//-----------------------------
client.del('frameworks_list', function(err, reply) {
    console.log(reply); // 1
  });

//-----------------------------
//Expiry setup
//----------------------------- 
  client.set('status', 'logged_in');
  client.expire('status', 300);

//To start, let’s first create a new publisher.js file in the root directory with the following content:

  const redis = require('redis');
  const publisher = redis.createClient();
  
  const channel = 'status';
  
  async function publish() {
    console.log(`Started ${channel} channel publisher...`)
    publisher.publish(channel, 'free');
  }


//-----------------------------
//publishing and subscribing to a channel
//-----------------------------
// publisher.js
    const redis = require('redis');
    const publisher = redis.createClient();

    const channel = 'status';

    async function publish() {
    console.log(`Started ${channel} channel publisher...`)
    publisher.publish(channel, 'free');
    }

    publish();

// subscriber.js
  const redis = require('redis');
  const subscriber = redis.createClient();
  
  const channel = 'status';
  
  subscriber.subscribe(channel, (error, channel) => {
    if (error) {
        throw new Error(error);
    }
    console.log(`Subscribed to ${channel} channel. Listening for updates on the ${channel} channel...`);
  });
  
  subscriber.on('message', (channel, message) => {
    console.log(`Received message from ${channel} channel: ${message}`);
  });

//-----------------------------
//setting and getting hashmap
//-----------------------------
  client.hmset('frameworks_hash', {
    'javascript': 'ReactJS',
    'css': 'TailwindCSS',
    'node': 'Express'
  });

//  client.hmset('frameworks_hash', 'javascript', 'ReactJS', 'css', 'TailwindCSS', 'node', 'Express');

    client.hgetall('frameworks_hash', function(err, object) {
    console.log(object); // { javascript: 'ReactJS', css: 'TailwindCSS', node: 'Express' }
    });


//-----------------------------
//setting and getting list
//-----------------------------
client.rpush(['frameworks_list', 'ReactJS', 'Angular'], function(err, reply) {
    console.log(reply); // 2
});

client.lrange('frameworks_list', 0, -1, function(err, reply) {
    console.log(reply); // [ 'ReactJS', 'Angular' ]
});


//-----------------------------
//setting and getting set
//-----------------------------
client.sadd(['frameworks_set', 'ReactJS', 'Angular', 'Svelte', 'VueJS', 'VueJS'], function(err, reply) {
    console.log(reply); // 4
  });

client.smembers('frameworks_set', function(err, reply) {
    console.log(reply); // [ 'Angular', 'ReactJS', 'VueJS', 'Svelte' ]
});





/* ==================================================================
Redis project sample -2
================================================================== */
  const redis = require('redis');
  const client = redis.createClient();
  const axios = require('axios');
  const express = require('express');
  
  const app = express();
  const USERS_API = 'https://jsonplaceholder.typicode.com/users/';
  
  app.get('/users', (req, res) => {
  
    try {
      axios.get(`${USERS_API}`).then(function (response) {
        const users = response.data;
        console.log('Users retrieved from the API');
        res.status(200).send(users);
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
  app.get('/cached-users', (req, res) => {
  
    try {
      client.get('users', (err, data) => {
  
        if (err) {
          console.error(err);
          throw err;
        }
  
        if (data) {
          console.log('Users retrieved from Redis');
          res.status(200).send(JSON.parse(data));
        } else {
          axios.get(`${USERS_API}`).then(function (response) {
            const users = response.data;
            client.setex('users', 600, JSON.stringify(users));
            console.log('Users retrieved from the API');
            res.status(200).send(users);
          });
        }
      });
    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  });
  
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
  });