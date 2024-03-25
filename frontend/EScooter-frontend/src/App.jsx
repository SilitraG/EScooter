import './App.css'
import Authentication from './pages/Authentication/Authentication'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min'
import HomePage from './pages/HomePage/HomePage'

function App() {

  return (
    <Router>
      <div className="">
          
          <div className='content'>
            <Switch>
              <Route exact path="/home"> <HomePage/> </Route>
              <Route exact path="/*"> <Authentication/> </Route>
            </Switch>
          </div>
          
        </div>
    </Router>
    
  )
}

export default App
