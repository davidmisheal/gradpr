import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams ,useNavigate} from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";


export default function ViewMore() {
    const { id } = useParams(); // Get the place ID from the URL
    const [place, setPlace] = useState(null);
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadImage = async () => {
            try {
                const imgModule = await import(`../imgs/${place.img}`);
                setImage(imgModule.default);
            } catch (error) {
                console.error('Error loading image:', error);
            }
        };

        loadImage();
    }, [place]);


    useEffect(() => {
        const fetchPlaceById = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/place/${id}`);
                setPlace(response.data);
                console.log('Fetched place:', response.data);
            } catch (error) {
                console.error('Error fetching place:', error);
            }
        };

        fetchPlaceById();
    }, [id]);

    if (!place) {
        return <p>Loading...</p>;
    }
    const handleAddToTrip = () => {
        navigate('/mytrips', { state: place})
    };
    return (
        <>
            <Nav />
            <div className="viewmore">
                <div className="viewmore-first">
                    <div className="viewmore-first-img">
                        <img src={image} />
                    </div>
                    <div className="viewmore-first-overlay">
                        <span>
                            <h2>{place.name}</h2>
                            <p>{place.location}</p>
                        </span>
                        <span className="viewmore-first-overlay-counters">
                            <i class="fa-solid fa-location-dot fa-xl"></i> <p>1000</p>    |    <i class="fa-solid fa-heart fa-xl"></i> <p>20000</p>
                        </span>
                    </div>
                </div>
                <div className="viewmore-second">
                    <div className="viewmore-second-left">
                        <h2>Description</h2>
                        <p className="viewmore-second-desc">
                            {place.description}
                        </p>
                        <p className="viewmore-second-desc">
                            {place.description2}
                        </p><p className="viewmore-second-desc">
                            {place.description3}
                        </p>
                    </div>
                    <div className="viewmore-second-right">
                        <div>
                            <img src={require('../imgs/khan-el-khalili1.jpg')} />
                        </div>
                        <div>
                            <img src={require('../imgs/Khan-El-Khalili2.jpg')} />
                        </div><div>
                            <img src={require('../imgs/khan3.jpg')} />
                        </div>
                    </div>
                </div>
                <div className="viewmore-third">
                    <h3> Price : {place.price}</h3>
                    <button class="button-28" role="button" onClick={()=>{handleAddToTrip()}}>Add</button>
                    </div>
            </div>
            <Footer name='footer-main' />
        </>
    );
}

