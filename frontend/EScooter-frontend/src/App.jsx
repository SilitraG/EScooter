import './App.css'
import Authentication from './pages/Authentication/Authentication'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import HomePage from './pages/HomePage/HomePage'
import Footer from './pages/footer'

function App() {

  return (
    <Router>
      <div className="">
          
          <div className='content'>
            <Switch>
              <Route exact path="/home"> <HomePage/> </Route>
              <Route exact path="/ride"> <HomePage/> </Route>
              <Route exact path="/profile/:id"> <HomePage/> </Route>
              <Route exact path='/register'> <Authentication/> </Route>
              <Route exact path='/login'> <Authentication/> </Route>
              <Route exact path="/*"> <Authentication/> </Route>
            </Switch>
          </div>
          
          <Footer/>
          
      </div>

    </Router>
    
  )
}

export default App
