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
      <Layout>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/posts/:id'>
              <Posts />
            </Route>
          </Switch>
        </Router>
      </Layout>
    </Provider>
  )
}

export default App
