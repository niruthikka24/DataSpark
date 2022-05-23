import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from './Navbar';
import Review from './Review';

const DatasetDetails = (props) => {

	// need the following data about a dataset
	// 		1. Title
	// 		2. Description
	// 		3. Details to display the dataset itself
	// 		4. Other details about the dataset
	const params = useParams();

	const [dataset, setDataset] = useState(null);
	const [allReviews, setAllReviews] = useState([]);

	useEffect(() => {
		axios.get(`http://localhost:5000/getDatasetDetails?id=${params.id}`)
			.then((res) => {
				setAllReviews(res.data.reviews);
			})
			.catch(err => {
				console.log(err);
			});
	}, []);

	const reviewsLength = allReviews.length;

	const getReviews = () => {
		let content = [];
		for (let i = 0; i < reviewsLength; i++){
			content.push(
				<div className="col" key={i}>
					<div className="card review m-3" style={{width: '25rem'}}>
					{/* <img src="..." className="card-img-top" alt="..." /> */}
						<div className="card-body">
							<h5 className="card-title">{allReviews[i].reviewer}</h5>
							<div className="ratings"> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 1) ? "rating-color" : ""}`}></i> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 2) ? "rating-color" : ""}`}></i> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 3) ? "rating-color" : ""}`}></i> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 4) ? "rating-color" : ""}`}></i> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 5) ? "rating-color" : ""}`}></i> 
								<span className='mx-3'>{allReviews[i].rating}</span>
							</div>
							<p className="card-text">{allReviews[i].comment}</p>
						</div>
					</div>
				</div>
			);
		}
		return content;
	}

	return (
		<div>
			<Navbar status={props.status} />

			<div className="row my-4">
				<div className="col-10 mx-auto">
					<h4 className="title display-6 float-start">Dataset Name</h4>
				</div>
				<div className="col-10 mx-auto mt-3">
					<button className="btn btn-dark px-4 float-start shadow-lg"><i className="bi bi-download me-3"></i>Download</button>
				</div>
			</div>

			<div className="row mb-3 ratings">
				<div className="col-10 mx-auto">
					<div className="ratings"> 
						<i className="fa fa-star rating-color"></i> 
						<i className="fa fa-star rating-color"></i> 
						<i className="fa fa-star rating-color"></i> 
						<i className="fa fa-star"></i> 
						<i className="fa fa-star"></i> 
						<span className='mx-3'>3</span>
					</div>
				</div>
			</div>

			<div className="row my-4 mx-auto">
				<div className="card description text-white bg-dark my-3 mx-auto" style={{maxWidth: '95vw'}}>
					<div className="card-header">Description</div>
					<div className="card-body">
						<p className="card-text text-warning">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus minus accusantium recusandae illo amet ex animi modi soluta, numquam repellendus sint saepe officiis distinctio laborum voluptatibus magni? Ipsam pariatur adipisci, cumque animi natus suscipit? Alias, laudantium. Officia a harum sapiente.</p>
					</div>
				</div>
			</div>

			{/* dataset details will be displayed here */}
			<div className="row dataset-details mx-auto my-5 justify-content-center">
				Details Here
			</div>

			<div className="reviews row mx-auto my-4">
				<div className="col-10 mx-auto reviews-container d-flex flex-row flex-nowrap overflow-auto">
					{getReviews()}
				</div>
				<div className="col-10 col-md-4 mx-auto my-4 d-flex justify-content-center">
                    <button className={`btn btn-dark my-3 mx-auto px-4 shadow-lg ${(props.status) ? "" : "d-none"}`} data-bs-toggle="modal" data-bs-target="#addReview-modal" data-bs-dismiss="modal">+Add Review</button>
                </div>

				<Review datasetID={params.id} />
			</div>
			

		</div>
	);
}

export default DatasetDetails;
