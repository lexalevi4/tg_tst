import { Badge, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";



import React, {useState} from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    // lo
} from "react-router-dom";


// const history = useRouterHistory(createHistory)({
//     basename: '/basename'
// });


import About from '../pages/About'
// import ListPage from '../pages/ListPage'

import Mappage from '../pages/Mappage'
import SearchFormMu from "../pages/SearchFormMu";
import FlatList from "../pages/FlatList";



import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ViewListIcon from '@mui/icons-material/ViewList';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';



function MyBottomNav() {


    const pathname = window.location.pathname
    const [value, setValue] = useState(pathname)
    const onChange = (event, newValue) => {
        setValue(newValue);
    }


    return (
        <Router>
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 ,zIndex:5000}} elevation={5}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={onChange}
                >


                    <BottomNavigationAction LinkComponent={Link} href={'/'} to={'/'} value={'/'} label="Фильтр" icon={<ManageSearchIcon />} />
                    <BottomNavigationAction LinkComponent={Link}  href={'/list'}  to={'/list'} value={'/list'} label="Список" icon={<ViewListIcon />} />
                    {/* <BottomNavigationAction LinkComponent={Link}  href={'/map'}  to={'/map'} value={'/map'} label="Карта" icon={<LocationOnIcon />} /> */}
                    {/* */}
                    <BottomNavigationAction label="Избранное" icon={<Badge badgeContent={4} color="primary"> <FavoriteIcon /></Badge>} />
                    {/*  */}
                    <BottomNavigationAction label="Профиль" icon={<AccountCircleIcon />} />



                </BottomNavigation>
            </Paper>


            <Routes>
                <Route path="/about" element={<About />}>
                </Route>
                <Route path="/list" element={<FlatList />}>

                </Route>
                <Route path="/" element={<SearchFormMu />}>
                </Route>

                {/* <Route path="/map" element={<Mappage />}> */}

                {/* </Route> */}

            </Routes>

        </Router>
    );
}

export default MyBottomNav;