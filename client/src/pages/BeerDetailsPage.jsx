import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const API_URL = 'http://localhost:5000'


function BeerDetailsPage() {

  const [beer, setBeer] = useState()

  const { beerId } = useParams()

  useEffect(() => {
    loadBeer()
  }, [])

  const loadBeer = () => {
    axios
      .get(`${API_URL}/beers/${beerId}`)
      .then(({ data }) => setBeer(data))
      .catch(err => console.log(err))
  }

  return (
    <div className="d-inline-flex flex-column justify-content-center align-items-center w-100 p-4">
      {beer && (
        <>
          <img
            src={beer.image_url}
            alt="Beer Image"
            height="300px"
            width="auto"
          />
          <h3>{beer.name}</h3>
          <p>{beer.tagline}</p>
          <p>Attenuation level: {beer.attenuation_level}</p>
          <p>Description: {beer.description}</p>
          <p>Created by: {beer.contributed_by}</p>

          <Link to={'/beers'}>
            <button className="btn btn-primary">
              Volver al listado
            </button>
          </Link>

          <Link to={`/beers/edit/${beer.id}`}>
            <button className="btn btn-primary">
              Editar cerveza
            </button>
          </Link>
        </>
      )}
    </div>
  );
}

export default BeerDetailsPage;
