import React, { useContext } from 'react';
import { Route, BrowserRouter as Router, Switch as Routes, Redirect } from 'react-router-dom';
import Navbar from './components/Navbar';
import { userContext } from './context/userContext';
import AllRents from './pages/AllRents';
import AllBooks from './pages/AllBooks';
import AllAuthors from './pages/AllAuthors';
import AllLanguages from './pages/AllLanguages';
import AllEditorials from './pages/AllEditorials';
import AllGenders from './pages/AllGenders';
import AllUsers from './pages/AllUsers';
import Catalog from './pages/Catalog';
import Login from './pages/Login';
import MyRents from './pages/MyRents';
import Register from './pages/Register';
import Rent from './pages/Rent';
import './styles/App.scss';

function App() {

  const { isAuth, isAdmin } = useContext(userContext)

  return (
      <Router>
        <Navbar/>
        <Routes>
          <Route exact path="/login" >
            <Login/>
          </Route>
          <Route exact path="/register">
            <Register/>
          </Route>
          { isAuth && 
            <React.Fragment>
              <Route exact path="/getBooks">
                <Catalog/>
              </Route>
              <Route exact path="/rentBook/:idBook/:idAuthor">
                <Rent/>
              </Route>
              <Route exact path="/getRents">
                <MyRents/>
              </Route>
              { isAdmin &&
                <React.Fragment>
                  <Route exact path="/getAllRents">
                    <AllRents/>
                  </Route>
                  <Route exact path="/getAllBooks">
                    <AllBooks/>
                  </Route>
                  <Route exact path="/getAllAuthors">
                    <AllAuthors/>
                  </Route>
                  <Route exact path="/getAllLanguages">
                    <AllLanguages/>
                  </Route>
                  <Route exact path="/getAllEditorials">
                    <AllEditorials/>
                  </Route>
                  <Route exact path="/getAllGenders">
                    <AllGenders/>
                  </Route>
                  <Route exact path="/getAllUsers">
                    <AllUsers/>
                  </Route>
                </React.Fragment>
              }
            </React.Fragment>
          }
          <Redirect to="/login"/>
        </Routes>
      </Router>
  );
}

export default App;
