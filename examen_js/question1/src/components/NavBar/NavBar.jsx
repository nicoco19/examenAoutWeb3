import {Link} from "react-router-dom";

const NavBar = () => {
  return(
      <nav>
        <Link to="/">Home</Link>
        <br/>
        <Link to="/books">Gestion de livres</Link>
        <br/>
        <Link to="/addBooks">Ajouter un livre</Link>
      </nav>
  );

};
export default NavBar;