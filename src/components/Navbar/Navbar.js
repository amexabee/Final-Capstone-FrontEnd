import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import links, { logos } from './navData';
import logo from '../../images/logo.JPG';

const Navbar = () => {
  const { path } = useSelector((store) => store.swimClasses);
  return (
    <nav>
      <img src={logo} alt="" />
      <ul>
        {links.map((link) => (
          <li key={link.id} className="link">
            <NavLink
              to={link.path}
              className={path === link.path ? 'active' : ''}
            >
              <span key={link.path}>{link.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="m-2 d-flex">
        {logos.map((item) => (
          <div className="mx-2" key={item.id}>
            {item}
          </div>
        ))}
      </div>
      <p>© 2023 Amanuel Galema</p>
    </nav>
  );
};

export default Navbar;
