import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | home', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function(assert) {
    await visit('/');

    assert.equal(currentURL(), '/about');
  });
});

module('Acceptance | about', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /about', async function(assert) {
    await visit('/about');

    assert.equal(currentURL(), '/about');
  });
});

module('Acceptance | blogs', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /blogs', async function(assert) {
    await visit('/blogs');

    assert.equal(currentURL(), '/blogs');
  });
});

