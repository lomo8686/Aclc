const mongoose = require('mongoose');
const uri = 'mongodb://admin:pass@ac-azabxtn-shard-00-00.igg5ipn.mongodb.net:27017,ac-azabxtn-shard-00-01.igg5ipn.mongodb.net:27017,ac-azabxtn-shard-00-02.igg5ipn.mongodb.net:27017/?ssl=true&replicaSet=atlas-azabxtn-shard-0&authSource=admin&retryWrites=true&w=majority';

mongoose.connect(uri)
  .then(() => console.log('Connected!'))
  .catch(err => console.error('Error:', err.message));
