import './App.css'
import FooterComponent from './components/FooterComponent'
import HeaderComponent from './components/HeaderComponent'
import ListUserComponent from './components/ListUserComponent'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
      <HeaderComponent />
        <Routes>
          {/* // http://localhost:4000 */}
          <Route path='/' element = { <ListUserComponent />}></Route>
          {/* // http://localhost:4000/users */}
          <Route path='/users' element =   { <ListUserComponent/>}></Route>
        </Routes>
      <FooterComponent />
    </BrowserRouter>
      
    </>
  )
}

export default App
