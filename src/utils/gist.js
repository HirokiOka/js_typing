const request = require('request');
const path = require('path');
const ENV_PATH = path.join(__dirname, '.env');
require('dotenv').config({ path: ENV_PATH });

const ACCESS_TOKEN = process.env.ACCESS_TOKEN;

//GitHub APIにアクセスしてJavaScriptのgistをとってくる関数

const getJS = (callback) => {
    const index = Math.floor(Math.random() * 30);
    const url = `https://api.github.com/gists/public?access_token=${ACCESS_TOKEN}&page=${index}&per_page=100`;
    const options = {
        url,
        json: true,
        method: 'get',
        headers: {
            'User-Agent': 'request'
        }
    };

    request(options, (err, {body}) => {
        if (err) {
            callback('Unable to connect GitHub API');
        } else {
            request({ url: selectGist(body), json: true }, (err, {body}) => {
                callback(body);
            });
        }
    });
};

const selectGist = (json) => {
    for (let i = 0; i < json.length; i++) {
        for (let filename in json[i].files) {
            if (json[i].files[filename].language == 'JavaScript') {
                return json[i].files[filename].raw_url;
            }
        }
    }
};

module.exports = getJS;

