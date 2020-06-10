if (user === 'error logning in') {
         this.props.onRouteChange('register');
        }else{
           this.props.loadUser(user)
           this.props.onRouteChange('home');
        }