import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | sound-duration', function (hooks) {
  setupRenderingTest(hooks);
  test('it renders duration of sound if loaded', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/10/silence.mp3';
    await service.load(this.url);
    await render(hbs`{{sound-duration this.url}}`);

    assert.equal(this.element.textContent.trim(), '10');
  });

  test('it can load sound and render duration if requested', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/10/silence.mp3';
    await render(hbs`{{sound-duration this.url load=true}}`);


    assert.equal(this.element.textContent.trim(), '10');
  });

  test('it renders nothing if not loaded', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/10/silence.mp3';
    await render(hbs`{{sound-duration this.url format=true}}`);

    assert.equal(this.element.textContent.trim(), '');
  });

  test('it renders infinity if stream', async function (assert) {
    let service = this.owner.lookup('service:stereo');
    service.loadConnections([{ name: 'DummyConnection' }]);
    this.url = '/good/stream/silence.mp3';

    await service.load(this.url)
    await render(hbs`{{sound-duration this.url}}`);
    assert.equal(this.element.textContent.trim(), '∞');
  });
});