import { Results } from './pages/Results';
import './App.css';
import { Home } from './pages/Home';
import {QueryClientProvider, QueryClient} from "@tanstack/react-query"
import {Provider} from "react-redux"
import { store } from './pages/store.ts';

const client = new QueryClient();

function App() {
  return (
    <div className="App">
      <QueryClientProvider client={client}>
        <Provider store={store}>
          <Home/>
          <Results/>
        </Provider>
      </QueryClientProvider>
      
    </div>
  );
}

export default App;
