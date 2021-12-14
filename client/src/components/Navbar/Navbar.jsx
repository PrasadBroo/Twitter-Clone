import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="main-header">
      <nav className="navbar">
        <h1 className="main-heading heading-1"><Link to='/'>Youtubepi</Link> </h1>
        <ul className="nav-links">
          <Link className="nav-link" to={"login"}>
            Login
          </Link>

          <Link className="nav-link" to={"plans"}>
            Plans
          </Link>

          <Link className="nav-link" to={"documentation"}>
            Documentation
          </Link>
        </ul>
      </nav>
    </header>
  );
}
