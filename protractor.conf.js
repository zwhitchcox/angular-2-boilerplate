exports.config = {
  baseUrl: 'http://localhost:3000',
  specs: ["client/**/*.e2e.js"],
  capabilities: {
    'browserName': 'chrome'
  },
  framework: 'jasmine'
}
