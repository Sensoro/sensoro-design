import del from 'del';

(async () => {
  del.sync(['./src/**/*.md', './src/*/demo']);
})();
