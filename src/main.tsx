import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.ts'
import { PersistGate } from 'redux-persist/es/integration/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
    <Provider store={store}>
   <App />
   </Provider>
    </PersistGate>
  </StrictMode>,
)
