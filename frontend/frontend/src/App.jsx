import {RouterProvider} from "react-router-dom"
import './App.css'
import { router } from './routes'
import Context from "./context/Context"
function App() {

  return (
    <>
      <Context>
          <RouterProvider router={router} />
      </Context>
      
    </>
  )
}

export default App
