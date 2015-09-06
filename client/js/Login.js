var router = require('./App');
var fbid = '391288257734536';

var Login = React.createClass({  
  contextTypes: {
    router: React.PropTypes.func
  },

  componentDidMount: function() {
    localStorage.setItem('currentRoute', '/login');
  },

  login: function() {
    var self = this;
    window.fbAsyncInit = function() {
      FB.init({
        appId      : fbid,
        cookie     : true,  // enable cookies to allow the server to access
                          // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.1' // use version 2.1
      });
      // When user logins in, it should display a different page
      var self = this;
      FB.Event.subscribe('auth.login', function (response) {
        console.log(response,"Logged")
        self.context.router.transitionTo('/main', null, {id: FB.getUserID()});
        self.statusChangeCallback(response);
      });
    };
    FB.getLoginStatus(function(response){
      if (response.status === 'connected') {
        console.log("login PG")
        self.context.router.transitionTo('/main', null, {id: FB.getUserID()});
      } else {
        FB.login();
      }
    });

  },


  render: function(){
    return (
      <div className="container">
        <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3">
            <button type="button" className="btn btn-warning btn-lg btn-block fb-button" onClick={this.login}><img className="fb-logo" src={"../assets/facebooklogo.png"} />Login using Facebook</button>
        </div>
      </div>
    )
  }
});


module.exports = Login; 
