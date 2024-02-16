// src/components/MovieContent.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton } from './ui/Skeleton'; // Ensure correct path
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'; // Verify the import path
import { Button } from './ui/Button'; // Ensure correct path

interface Movie {
  id: number;
  title_long: string;
  medium_cover_image: string;
  genres: string[];
  description_full: string;
  rating: number;
}

const MovieContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const apiUrl = `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.data.movie) {
          setMovie(data.data.movie);
        } else {
          setMovie(null);
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setMovie(null);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  if (!movie) {
    return <Skeleton />;
  }

  return (
    <div className="max-w-4xl px-5 mx-auto my-6 sm:my-20">
      <div>
        <img src={movie.medium_cover_image} alt={movie.title_long} className="w-full h-auto rounded-lg" />
        <CardHeader>
          <CardTitle>{movie.title_long}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{movie.description_full}</CardDescription>
          <p>Rating: {movie.rating}</p>
          <div className="mt-4">
            <Button variant="primary" size="lg" onClick={() => window.open(`https://watch-23eqf3-us-east.streamflix.one/player?id=${id}&server=3`, "_blank")}>
              Play Now
            </Button>
          </div>
        </CardContent>
      </div>
    </div>
  );
};

export default MovieContent;

