const del = require('del');

(async () => {
  del.sync(['./docs/components/*/*.ts(x)?', './docs/components/**/style']);
})();
