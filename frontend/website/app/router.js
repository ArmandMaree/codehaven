import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('blogs');
  this.route('blog', {path: '/blog/:blog_title'});
  this.route('about');
});

export default Router;
