techteamApp.component('home', {
      controller: function() {

      },
      template: function ($element, $attrs) {
        return [
          '<div class="row">',
            '<div class="small-12 columns text-center">',
              '<h2>Home</h2>',
              '<a href="#/sample"><button class="button">',
                'Add Sample Event',
              '</button></a>',
            '</div>',
          '</div>'
        ].join('');
      }
    });
