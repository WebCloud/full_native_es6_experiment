// Start with a webdriver instance:
var sw = require('selenium-webdriver');
var Builder = sw.Builder, By = sw.By, Capabilities = sw.Capabilities;
var driver = new Builder()
  .withCapabilities(Capabilities.phantomjs())
  .build();

// And then...
var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

describe('Array', function() {
  it('goes to github', function (done) {
    driver.get('http://github.com');
    driver.findElement(By.css('.js-site-search-focus')).then(function(element){
      console.log(element.getAttribute('value'));
      console.log('asdasdasd');
      done();
    });
    driver.quit();
  });
});
