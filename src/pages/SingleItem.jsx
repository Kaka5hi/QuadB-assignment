import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Navbar from "../components/Navbar"
import Loader from "../components/Loader"
import TicketForm from "../components/TicketForm"
import Popup from "../components/Popup"

const SingleItem = () => {
	const param = useParams()

	const [singleShow, setSingleShow] = useState([])
	const [showLoader, setShowLoader] = useState(true)
	const [showForm, setShowForm] = useState(false)

	const [showPopup, setShowPopUp] = useState(false)

	const getData = async (id) => {
		const response = await fetch(`https://api.tvmaze.com/shows/${id}`)
		const data = await response.json()
		setSingleShow(data);
		setShowLoader(false)
	}

	useEffect(() => {
		setTimeout(() => {
			getData(param?.id)
		}, 500);
		
		setTimeout(() => {
			setShowPopUp(false)
		}, 1000)

	}, [showPopup])

	if(showLoader) {
		return (
			<>
				<Navbar />
				<Loader />
			</>
		)
	}

	return (
		<>
			<Navbar />
			<div id={param?.id} key={param?.id} className="single-item-container" style={{backgroundImage:`url(${singleShow?.image?.original})`, backgroundRepeat:'no-repeat', backgroundSize:'cover'}}>
				<div className="nav-links">
					<Link to={`/`}>home</Link>
					<span> 	&gt; </span>
					<span>{singleShow?.name}</span>
				</div>
				<div className="top">
					<div className="top-left">
						<img src={singleShow?.image?.original} alt={singleShow?.name} />
					</div>
					<div className="top-right">
						<h2>{singleShow?.name} 
							<span>
								{singleShow?.rating?.average ? `Rating: ${singleShow?.rating?.average}` :``}
							</span>
						</h2>
						<h4>show information</h4>
						<p>Premiered on: {singleShow?.premiered} 
							<span>Runtime: {singleShow?.runtime || singleShow?.averageRuntime}min</span>
						</p>
						<p>{singleShow?.genres?.length > 1 ? `Genres: ` : `Genre: `}{singleShow?.genres?.join(', ')}
							<span>language: {singleShow?.language}</span>
						</p>
						<p>schedule: {singleShow?.schedule?.days?.join(', ')}
							<span>time: {singleShow?.schedule?.time}</span>
						</p>

						<p>type: {singleShow?.type} <span>status: {singleShow?.status}</span></p>
						<a href={singleShow?.officialSite || singleShow?.network?.officialSite} target="_blank">Official site</a>
						<article dangerouslySetInnerHTML={{__html: singleShow?.summary}} />
						<button onClick={() => setShowForm(true)} >book a ticket</button>
					</div>

				</div>
				{
					showForm && <TicketForm showPopup={showPopup} setShowPopUp={setShowPopUp} setShowForm={setShowForm} data={singleShow}/>
				}

				{
					showPopup && <Popup />
				}
			</div>
		</>
	)
}

export default SingleItem