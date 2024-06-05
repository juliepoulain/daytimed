import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SitterList = ({ search }) => {
  const [sitters, setSitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/api/sitters")
      .then((response) => response.json())
      .then((data) => {
        setSitters(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const filteredSitters = sitters.filter(
    (sitter) =>
      sitter.name.toLowerCase().includes(search.toLowerCase()) ||
      sitter.address.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="sitter-ul">
      <ul>
        {filteredSitters.map((sitter) => (
          <li key={sitter.id} className="sitter-card">
            <Link to={`/sitters/${sitter.id}`}>
              <img
                className="sitter-home-image"
                src={`${sitter.image}`}
                alt={sitter.name}
              />
            </Link>
            <br />
            <div className="button-link-container">
              <Link to={`/sitters/${sitter.id}`} className="button-link">
                {sitter.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SitterList;
