import { getMimeType } from "./mime-types";
import { tracked } from '@glimmer/tracking';
import { isArray } from '@ember/array';
export default class StereoUrl {
  el = document.createElement('a')
  @tracked options = {}
  constructor(input, options = {}) {
    if (!input) {
      throw new Error("can't create URL without any input")
    }

    if (input) {
      if (isArray(input)) {
        input = input[0]
      }

      this.input = input;

      // assert("StereoUrl can not take a thennable as an input", input.then)
      if (input.url) {
        this.el.href = input.url
      }
      else if (typeof input === 'string') {
        this.el.href = input;
      }

      if (input.mimeType) {
        this.options = { mimeType: input.mimeType }
      }
      else if (options.mimeType) {
        this.options = { mimeType: options.mimeType }
      }
    }
  }

  get mimeType() {
    if (this.options.mimeType) {
      return this.options.mimeType;
    }
    else {
      return getMimeType(this.url)
    }
  }

  get key() {
    return `${this.el.origin}${this.el.pathname}`
  }

  get href() {
    return this.el.href
  }
  set href(u) {
    this.el.href = u
  }

  get pathname() {
    return this.el.pathname;
  }

  get url() {
    return this.el.href
  }
  set url(u) {
    this.el.href = u
  }

  toString() {
    return this.el.href;
  }
}
