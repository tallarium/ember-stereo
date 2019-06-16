import Service from '@ember/service';
import { A as emberArray, makeArray } from '@ember/array';
import DebugLogging from '../mixins/debug-logging';

export default Service.extend(DebugLogging, {
  debugName: 'hifi-cache',

  cachedCount: 0,

  init() {
    this.set('_cache', {});
    this._super(...arguments);
  },

  reset() {
    this.set('_cache', {});
  },

  find(urls) {
    urls = makeArray(urls);
    let cache = this.get('_cache');
    let keysToSearch = emberArray(urls).map(url => (url.url || url));
    let sounds       = emberArray(keysToSearch).map(url => cache[url]);
    let foundSounds  = emberArray(sounds).compact();

    if (foundSounds.length > 0) {
      this.debug(`cache hit for ${foundSounds[0].get('url')}`);
    }
    else {
      this.debug(`cache miss for ${keysToSearch.join(',')}`);
    }

    return foundSounds[0];
  },

  remove(sound) {
    if (this.isDestroyed) return;

    this.debug(`removing sound from cache with url: ${sound.get('url')}`);

    if (this._cache[sound.get('url')]) {
      delete this._cache[sound.get('url')]
      this.set('cachedCount', Object.keys(this._cache).length);
      this.notifyPropertyChange('_cache');
    }
  },

  cache(sound) {
    if (this.isDestroyed) return;

    this.debug(`caching sound with url: ${sound.get('url')}`);

    if (!this._cache[sound.get('url')]) {
      this._cache[sound.get('url')] = sound;
      this.set('cachedCount', Object.keys(this._cache).length);
      this.notifyPropertyChange('_cache');
    }
  }
});
