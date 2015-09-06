var router = require('./App');
var fbid = '391288257734536';
// var fbid = '389293527934009';

var Login = React.createClass({  
  contextTypes: {
    router: React.PropTypes.func
  },
  componentWillMount: function() {
    window.fbAsyncInit = function() {
      console.log("FB.init");
      FB.init({
        appId      : fbid,
        cookie     : true,  // enable cookies to allow the server to access
                          // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
      });
      
      // var self = this;
      // FB.Event.subscribe('auth.login', function (response) {
      //   console.log(response,"Logged")
      //   self.context.router.transitionTo('/main', null, {id: FB.getUserID()});
      //   self.statusChangeCallback(response);
      // });
      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);
    (function(d, s, id) {
      console.log("document=== ", document)
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "http://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.4&appId=" + fbid;
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  },

  componentDidMount: function() {
    localStorage.setItem('currentRoute', '/login');
    
    
  },

  testAPI: function() {
    console.log("testAPI")
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    document.getElementById('status').innerHTML =
      'Thanks for logging in, ' + response.name + '!';
    });
  },

  statusChangeCallback: function(response) {
    console.log("FB === ", FB)
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      // console.log("route me to main!")
      this.context.router.transitionTo('/main', null, {id: FB.getUserID()});
      this.testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      console.log("you need to log in")
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
    }
  },

  checkLoginState: function() {
    console.log("checkLoginState")
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  },

  handleClick: function() {
    console.log("handleClick")
    FB.login(this.checkLoginState());
  },

  // login: function() {
  //   var self = this;
    
  //   FB.getLoginStatus(function(response){
  //     if (response.status === 'connected') {
  //       console.log("login PG")
  //       self.context.router.transitionTo('/main', null, {id: FB.getUserID()});
  //     } else {
  //       FB.login();
  //     }
  //   });

  // },


  render: function(){
    return (
      <div className="container">
        <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">
            <button type="button" className="btn btn-warning btn-lg btn-block fb-button" onClick={this.handleClick}><img className="fb-logo" src={"../assets/facebooklogo.png"} />Login using Facebook</button>
        </div>
      </div>
    )
  }
});


module.exports = Login; 
