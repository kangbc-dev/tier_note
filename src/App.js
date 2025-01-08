import { RecoilRoot } from "recoil";
import { GlobalStyle } from "./Styles/GlobalStyle";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./Pages/Main";
import client from "./client";

function App() {
	return (
		<>
			<RecoilRoot>
				<GlobalStyle />
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Main />} />
					</Routes>
				</BrowserRouter>
			</RecoilRoot>
		</>
	);
}

export default App;
