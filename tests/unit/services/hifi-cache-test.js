import Evented from '@ember/object/evented';
import EmberObject from '@ember/object';
import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | hifi cache', function(hooks) {
  setupTest(hooks);

  const Sound = EmberObject.extend(Evented, {
    play() {
      this.trigger('audio-played');
      this.set('isPlaying', true);
    },
    pause() {
      this.trigger('audio-paused');
      this.set('isPlaying', false);
    }
  });

  test("sounds can be retrieved by url from cache", function(assert) {
    assert.expect(3);
    let service = this.owner.lookup('service:hifi-cache');

    let sound1 = Sound.create({url: '/test/1'});
    let sound2 = Sound.create({url: '/test/2'});
    let sound3 = Sound.create({url: '/test/3'});

    service.cache(sound1);
    service.cache(sound2);
    service.cache(sound3);

    assert.deepEqual(service.find('/test/1'), sound1);
    assert.deepEqual(service.find('/test/2'), sound2);
    assert.deepEqual(service.find('/test/3'), sound3);
  });
});
