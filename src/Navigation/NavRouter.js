import React, { Fragment } from 'react';

import { Route, Switch } from 'react-router-dom';
import Home from '../Pages/Home';
import About from '../Pages/About';
import ItemMaster from '../Pages/ItemMaster';
import SignIn from '../Login/SignIn';
import Register from '../Login/Register';

/* Reminders: BrowserRouter must be at the top level  */

const NavRouter = () => {
  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/itemmaster" component={ItemMaster} />
        <Route exact path="/signin" component={SignIn} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </Fragment>
  );
};

export default NavRouter;
