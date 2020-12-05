import Home from './pages/Home'
import Posts from './pages/Posts'
import Layout from './components/Layout'
// Routing defination
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// Redux stuff
import { createStore } from 'redux'
import Reducer from './redux/Reducer'
import { Provider } from 'react-redux'

//store
const store = createStore(Reducer)

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/posts/:id'>
              <Posts />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </Provider>
  )
}

export default App
