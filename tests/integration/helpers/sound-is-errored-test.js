import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-is-errored', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    let service = this.owner.lookup('service:stereo')
    service.loadConnections([{name: 'DummyConnection'}]);

    this.set('url', '/bad/10/silence.mp3')
    await render(hbs`{{#if (sound-is-errored this.url)}}sound-is-errored{{else}}is-not-errored{{/if}}`);
    assert.equal(this.element.textContent.trim(), 'is-not-errored', 'helper reports no error');
    await service.load(this.url);
    await settled();
    assert.equal(this.element.textContent.trim(), 'sound-is-errored', 'helper reports error');
  });
});