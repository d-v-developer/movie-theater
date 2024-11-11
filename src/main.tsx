import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainMenu } from './layout/Menu/Layout';
import { Movies } from './pages/Movies/Movies';
import { Favorites } from './pages/Favorites/Favorites';
import { Login } from './pages/Login/Login';
import { Error } from './pages/Error/Error';
import { Movie } from './components/Movie/Movie';
import axios from 'axios';
import { PREFIX } from './helpers/Api';
import { PublicLayout } from './layout/AuthLayouts/PublicLayout';
import { PrivateLayout } from './layout/AuthLayouts/PrivateLayout';
import { Provider } from 'react-redux';
import { store } from './store/store';

const router = createBrowserRouter([
	{
		path: '/',
		element: <MainMenu />,
		children: [
			{
				element: <PublicLayout />,
				children: [
					{path: '/login', element: <Login />},
				]
			},
			{
				element: <PrivateLayout />,
				children: [
					{path: '/',element: <Movies />},
					{path: '/favorites',element: <Favorites />},
					{
						path: '/movie/:id',
						element: <Movie />, 
						errorElement: <>error</>,
						loader: async ({params}) => {
							const { data } = await axios.get(`${PREFIX}/?tt=${params.id}`);
							return ( data )
						}
					},
				]
			},
			{
				path: '*',
				element: <Error />
			}
		]
	}	
])

createRoot(document.getElementById('root')!).render(
		<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router}/>
			{/* <HistoryTracker /> */}
		</Provider>
	</StrictMode>
);
