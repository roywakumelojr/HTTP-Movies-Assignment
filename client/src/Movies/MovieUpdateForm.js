import React, { useEffect, useState } from 'react';
import axios from 'axios';


const MovieUpdateForm = (props) => {
    const [movie, setMovie] = useState ({
        id: "",
        title: "",
        director: "",
        metascore: "",
        stars: []
    });

    useEffect (() => {
        const id = props.match.params.id;
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then( response => {
            setMovie({
                id: response.id,
                title: response.data.title,
                director: response.data.director,
                metascore: response.data.metaascore,
                stars: response.data.stars
            })
        })
        .catch( error => console.log(error));
    }, [props.match.params.id]);

    const handleChange = event => {
        setMovie ({
            ...movie,
            [event.target.name] : event.target.value
        });
    }

    const handleSubmit = event => {
        e.preventDefault();
            if ( movie.title !== "" && movie.director !== "" && movie.stars !== "" &&movie.metascore !== "") {
                console.log(movie);
                console.log("submit handler");
                if (typeof movie.stars === "string") {
                    const stars = movie.stars.split(",");

                    const newMovie = {
                    ...movie,
                    stars: stars
                    };

                    axios
                    .put(
                        `http://localhost:5000/api/movies/${props.match.params.id}`,
                        newMovie
                    )
                    .then(res => {
                        props.history.push("/");
                    })
                    .catch(err => {
                        console.log(err);
                    });
                } else {
                axios
                .put(
                    `http://localhost:5000/api/movies/${props.match.params.id}`,
                    movie
                )
                .then(res => {
                    props.history.push("/");
                })
                .catch(err => {
                    console.log(err);
                });
            }
        }
    }
    return (
        <Form onSubmit={handleSubmit}>
            <Input>
                type="text"
                name="title"
                placeholder="Title"
                onChange={handleChange}
                value={movie.title}
            </Input>

            <Input>
                type="text"
                name="director"
                placeholder="Director"
                onChange={handleChange}
                value={movie.director}
            </Input> 

            <Input>
                type="number"
                name="metascore"
                placeholder="Metascore"
                onChange={handleChange}
                value={movie.metascore}
            </Input>

            <TextArea>
                type="text"
                onChange={handleChange}
                value={movie.stars}
                name="stars"
                placeholder="Add a Comma After Every Star's Full Name"
            </TextArea>
          <Button>Submit Movie Update</Button>
        </Form>
    );

}

export default MovieUpdateForm