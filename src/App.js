import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import store from './store/store';

// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// import Container from './Container/ContainerContent';
import Sidebar from './Elements/Drawer/SideDrawer';
// import Home from './Pages/Home';
// import About from './Pages/About';

function App() {
  return (
    <Provider store={store}>
      {/* <Router> */}
      <Sidebar />
      {/* <div className="App">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
          </Switch>
        </div> */}
      {/* </Router> */}
    </Provider>
  );
}

export default App;
