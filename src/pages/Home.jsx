import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";


const Home = () => {

	const [fetchedData, setFetchedData] = useState([])
	const [showLoader, setShowLoader] = useState(true)

	const getData = async () => {
		const response = await fetch(`https://api.tvmaze.com/search/shows?q=all`)
		const data = await response.json()
		setFetchedData(data);
		setShowLoader(false)
	}

	useEffect(() => {
		setTimeout(() => {
			getData()
		}, 500)
	}, [])

	if(showLoader) {
		return (
			<>
				<Navbar />
				<Loader />
			</>
		)
	} else {
		return (
			<div className="outer-container">
				<Navbar />
				<main>
					<h1>TV Shows</h1>
					<div className="inner-container">
						{
							fetchedData?.map(item => {
								const {show} = item
								return(
									<div id={show?.id} key={show?.id} className="items">
										<img src={show?.image?.original} alt={show?.network?.name || show?.name} />
										<h4>{show?.network?.name || show?.name}</h4>
										<Link to={`/${show?.id}`}>Check more</Link>
									</div>
								)
							})
						}
					</div>
				</main>
			</div>
		)
	}
}

export default Home