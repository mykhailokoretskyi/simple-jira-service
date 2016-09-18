jest.mock('node-rest-client');

import JiraService from '../jira';

const jira = new JiraService({
    url: "someUrl",
    apiPath: "SomeApi/path",
    login: "token"
});

describe("Jira service",() => {
    it("successfully queries Jira with simple query", () => {
        return jira.jql('issue = NTR-71').then((response) => {
            expect(response.total).toBe(1);
        });
    });

    it("sets maxResult as a query param", () => {
        const maxResults = 1500;
        const options = {
            queryParams: {
                maxResults: maxResults
            }
        };
        return jira.jql('issue = NTR-71', options).then((response) => {
            expect(response.maxResults).toBe(1000);
        });
    });
});
