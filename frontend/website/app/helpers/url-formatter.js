import { helper } from '@ember/component/helper';

export function urlFormatter(text) {
  return encodeURI(text);
}

export default helper(urlFormatter);
