import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Search from "../components/Search";
import axios from "axios";

const API_URL = 'http://localhost:5000'

function AllBeersPage() {

  const [beers, setBeers] = useState([])

  useEffect(() => {
    loadBeers()
  }, [])

  const loadBeers = () => {
    axios
      .get(`${API_URL}/beers`)
      .then(({ data }) => setBeers(data))
      .catch(err => console.log(err))
  }

  const filterBeers = beerNameQuery => {
    axios
      .get(`${API_URL}/beers?name_like=${beerNameQuery}`)
      .then(({ data }) => setBeers(data))
      .catch(err => console.log(err))
  }

  return (
    <>
      <Search filterBeers={filterBeers} />

      <div className="d-inline-flex flex-wrap justify-content-center align-items-center w-100 p-4">
        {
          beers &&
          beers.map((beer, i) => {
            return (
              <div key={beer.id}>
                <Link to={"/beers/" + beer.id}>
                  <div className="card m-2 p-2 text-center" style={{ width: "24rem", height: "18rem" }}>
                    <div className="card-body">
                      <img
                        src={beer.image_url}
                        style={{ height: "6rem" }}
                        alt={"image of" + beer.name}
                      />
                      <h5 className="card-title text-truncate mt-2">{beer.name}</h5>
                      <h6 className="card-subtitle mb-3 text-muted">
                        <em>{beer.tagline}</em>
                      </h6>
                      <p className="card-text">
                        Created by: {beer.contributed_by}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default AllBeersPage;
