import React, {Component} from 'react'
import {Navbar, Nav} from 'react-bootstrap'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


import About from '../pages/About'
import Listpage from '../pages/Listpage'
import Mappage from '../pages/Mappage'
const NavbarComp = function () {

    return (
        <Router>
            <div>
                <Navbar bg="dark" variant={"dark"} expand="lg">
                    <Navbar.Toggle aria-controls="navbarScroll"/>
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            // className="mr-auto my-2 my-lg-0"
                            // style={{maxHeight: '100px'}}
                            // navbarScroll
                        >
                            <Nav.Link as={Link} to="/">Map</Nav.Link>
                            <Nav.Link as={Link} to="/list">List</Nav.Link>
                            <Nav.Link as={Link} to="/about">About</Nav.Link>

                        </Nav>

                    </Navbar.Collapse>

                </Navbar>
            </div>

            <div>
                <Routes>
                    <Route path="/about" element={<About/>}>

                    </Route>
                    <Route path="/list" element={<Listpage/>}>

                    </Route>
                    <Route path="/" element={<Mappage/>}>

                    </Route>
                </Routes>
            </div>

        </Router>
    )

}
export default NavbarComp;