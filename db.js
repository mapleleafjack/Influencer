var starred = require('./exampleData/starred_influencers.json');
var suggested = require('./exampleData/suggested_influencers.json');
var response = require('./exampleData/add_influencer_response.json');

module.exports = function() {
  return {
    starred: starred,
    suggested: suggested,
    response: response
  }
}
