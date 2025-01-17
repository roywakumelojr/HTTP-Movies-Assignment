import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  handleDelete() {
    const id = this.props.match.params.id;
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then( response => {
        this.props.history.push("/");
      })
    .catch(error => console.log (error));
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentDidUpdate(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    const id = this.props.match.params.id;
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>Save</div>
        <Link to={ `/update-movie/${id}` }>
          <button className="update-button">Edit Movie</button>
        </Link>
        <button className="delete-button" onClick={ () => this.handleDelete()}> Delete </button>
      </div>
    );
  }
}
