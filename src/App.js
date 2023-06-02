import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Error from './pages/Error'
import SingleItem from './pages/SingleItem'

function App() {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={ <Home /> } />
				<Route path="/:id" element={ <SingleItem /> } />
				<Route path='*' element={<Error />}/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
