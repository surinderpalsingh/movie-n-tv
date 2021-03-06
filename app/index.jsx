import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import React from 'react'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import Router from './router'
import store from './store'
import WithStyles from './with-style-context'

if (process.env.NODE_ENV === 'production') {
  OfflinePluginRuntime.install()
}

const DefaultStore = store()

const renderNode = document.getElementById('app')

const renderIntoDOM = (Node) => {
  ReactDOM.hydrate(
    <Provider store={DefaultStore}>
      <AppContainer>
        <WithStyles onInsertCss={styles => styles._insertCss &&  styles._insertCss()}>
          <Node />
        </WithStyles>
      </AppContainer>
    </Provider>,
    renderNode,
  )
}

const renderPage = () => {
  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('./router.jsx', () => {
      /* eslint global-require: 0 */
      const NextRouter = require('./router.jsx').default
      renderIntoDOM(NextRouter)
    })
  }
  renderIntoDOM(Router)
}

export default renderPage()
