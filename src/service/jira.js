'use strict';

import { Client } from 'node-rest-client';
import _ from 'lodash';

const config = Config.getConfig();

export default class JiraService {
    constructor(config) {
        this.config = config;
        this.options = {
            headers: {
                'Authorization': 'Basic ' + this.config.login,
                'Content-Type': 'application/json'
            }
        };

        this.baseUrl = `${this.config.url}${this.config.apiVersion}`;
    }

    jql(query, options) {
        return new Promise((resolve, reject) => {
            let queryParams = '';
            if (options && options.queryParams) {
                queryParams = _.map(options.queryParams, function(value, key) {
                    return key + '=' + value;
                }).join('&');
            }

            let url = `${this.baseUrl}/search?jql=${query}`;

            if (queryParams) {
                url += '&' + queryParams;
            }
            new Client().get(url, this.options, (response) => {
                resolve(response);
            });
        });
    }
}
