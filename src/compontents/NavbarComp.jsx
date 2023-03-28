// import {Navbar, Nav} from 'react-bootstrap'
// import React, {useState} from 'react'

// import {
//     BrowserRouter as Router,
//     Routes,
//     Route,
//     Link,
//     // lo
// } from "react-router-dom";


// // const history = useRouterHistory(createHistory)({
// //     basename: '/basename'
// // });


// import About from '../pages/About'
// // import ListPage from '../pages/ListPage'

// import Mappage from '../pages/Mappage'
// import SearchForm from "../pages/SearchForm";
// import FlatList from "../pages/FlatList";

// const NavbarComp = function () {

//     const [expanded, setExpanded] = useState(false);

//     return (
//         <Router>
//             <div>
//                 <Navbar

//                     expanded={expanded}
//                     bg="dark" variant={"dark"} expand="lg">
//                     <Navbar.Toggle
//                         onClick={() => setExpanded(expanded ? false : "expanded")}
//                         aria-controls="navbarScroll"/>
//                     <Navbar.Collapse id="navbarScroll">
//                         <Nav

//                             style={{
//                                 marginLeft: '20px'
//                             }
//                             }
//                             className="mr-auto my-2 my-lg-0"
//                             // style={{maxHeight: '100px'}}
//                             // navbarScroll
//                         >
//                             <Nav.Link
//                                 onClick={() => setExpanded(false)}
//                                 as={Link} to="/map">Map</Nav.Link>
//                             <Nav.Link
//                                 onClick={() => setExpanded(false)}
//                                 as={Link} to="/list">List</Nav.Link>
//                             <Nav.Link
//                                 onClick={() => setExpanded(false)}
//                                 as={Link} to="/about">About</Nav.Link>
//                             <Nav.Link
//                                 onClick={() => setExpanded(false)}
//                                 as={Link} to="/">Filters</Nav.Link>

//                         </Nav>

//                     </Navbar.Collapse>

//                 </Navbar>
//             </div>

//             <div>
//                 <Routes>
//                     <Route path="/about" element={<About/>}>
//                     </Route>
//                     <Route path="/list" element={<FlatList/>}>

//                     </Route>
//                     <Route path="/" element={<SearchForm/>}>
//                     </Route>

//                     <Route path="/map" element={<Mappage/>}>

//                     </Route>

//                 </Routes>
//             </div>

//         </Router>
//     )

// }
// export default NavbarComp;