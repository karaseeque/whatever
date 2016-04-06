class WriteController {
  title = 'Your title here';
  
  constructor(Auth, $state, Post) {
    Auth.isLoggedIn(loggedIn => {
      if (!loggedIn) $state.go('login');
    });
    Auth.getCurrentUser(me => this.me = me);
    this.Post = Post;
    this.state = $state;
  }
  slugifyTitle() {
    /* globals slug */
    return slug(this.title, {lower: true});
  }
  submit() {
    this.Post.save({
      body: this.editor.value(),
      title: this.title,
      slug: this.slug || this.slugifyTitle(),
      tags: this.tags.map(t => t.text)
    }, res => {
      this.state.go('post', {name: this.me.name, slug: res.slug});
    });
  }
}

angular.module('whateverApp')
  .controller('WriteController', WriteController);

