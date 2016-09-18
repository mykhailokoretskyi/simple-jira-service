var sampleResponse = {
    total: 1,
    maxResults: 1000
};

const node_rest_client = jest.genMockFromModule('node-rest-client');

node_rest_client.Client = function(){
    return {
        get: function(url, options, callback){
            callback(sampleResponse);
        }
    };
};

module.exports = node_rest_client;
