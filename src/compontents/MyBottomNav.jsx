// import { Badge, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";

import Badge from '@mui/material/Badge';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';

import React, { useState, lazy } from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    // lo
} from "react-router-dom";

import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ViewListIcon from '@mui/icons-material/ViewList';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
// import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSelector } from 'react-redux';
import FavPage from 'pages/FavPage';
// const history = useRouterHistory(createHistory)({
//     basename: '/basename'
// });


// import About from '../pages/About'
// import ListPage from '../pages/ListPage'

// import Mappage from '../pages/Mappage'
// import SearchFormMu from "../pages/SearchFormMu";
// import FlatList from "../pages/FlatList";

const Mappage = lazy(() => import('../pages/Mappage'));
const SearchFormMu = lazy(() => import('../pages/SearchFormMu'));
const FlatList = lazy(() => import('../pages/FlatList'));






function MyBottomNav() {


    const fav_count = useSelector(state => state.mapFlats.app_params.fav_count);
    const pathname = window.location.pathname
    const [value, setValue] = useState(pathname)
    const onChange = (event, newValue) => {
        setValue(newValue);
    }

    const closeApp = () => {
        try {
            window.Telegram.WebApp.close();
        } catch (e) {

        }
    }

    return (
        <Router>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 5000 }} elevation={5}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={onChange}
                >


                    <BottomNavigationAction LinkComponent={Link} href={'/'} to={'/'} value={'/'} label="Фильтр" icon={<ManageSearchIcon />} />
                    <BottomNavigationAction LinkComponent={Link} href={'/list'} to={'/list'} value={'/list'} label="Список" icon={<ViewListIcon />} />
                    <BottomNavigationAction LinkComponent={Link} href={'/map'} to={'/map'} value={'/map'} label="Карта" icon={<LocationOnIcon />} />
                    {/* */}
                    <BottomNavigationAction label="Избранное" 
                    LinkComponent={Link} href={'/fav'} to={'/fav'} value={'/fav'}
                    icon={
                        fav_count > 0
                            ? <Badge badgeContent={fav_count} color="primary"> <FavoriteIcon /></Badge>
                            : <FavoriteIcon />


                        // <Badge badgeContent={fav_count} color="primary"> <FavoriteIcon /></Badge>

                    } />
                    {/*  */}
                    <BottomNavigationAction onClick={closeApp} label="Выход" icon={<LogoutIcon />} />



                </BottomNavigation>
            </Paper>


            <Routes>
                {/* <Route path="/about" element={<About />}>
                </Route> */}
                <Route path="/list" element={<FlatList />}>

                </Route>
                <Route path="/" element={<SearchFormMu />}>
                </Route>

                <Route path="/map" element={<Mappage />}>

                </Route>

                <Route path="/fav" element={<FavPage />}>
                    
                </Route>

                
            </Routes>

        </Router>
    );
}

export default MyBottomNav;