import {FaRegUserCircle} from 'react-icons/fa'

const Navbar = () => {
	return (
		<div className="nav-container">
			<nav>
				<ul className="left">
					<li>Movies</li>
					<li>TV Shows</li>
					<li>Kids</li>
				</ul>
				<ul className="right">
					<li><input type="text" placeholder="Search.." /></li>
					<li><FaRegUserCircle /></li>
				</ul>
			</nav>
		</div>
	)
}

export default Navbar