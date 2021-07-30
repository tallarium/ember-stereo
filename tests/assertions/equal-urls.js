import StereoUrl from 'ember-stereo/-private/utils/stereo-url';

export default function equalUrls(context, arg1, arg2) {
  // use this.pushResult to add the assertion.
  // see: https://api.qunitjs.com/assert/pushResult for more information

  let actual = arg1 ? new StereoUrl(arg1).href : null;
  let expected = arg1 ? new StereoUrl(arg2).href : null

  let result = expected === actual && expected && actual

  this.pushResult({ result, actual, expected });
}
