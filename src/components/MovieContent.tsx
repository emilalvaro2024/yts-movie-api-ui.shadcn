import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";

interface Movie {
  id: number;
  title_long: string;
  medium_cover_image: string;
  genres: string[];
  description_full: string;
  url: string; // Note: This might be unused based on new button functionalities
  rating: number;
}

function MovieContent() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await fetch(
          `https://yts.mx/api/v2/movie_details.json?movie_id=${id}`
        );
        const data = await response.json();
        if (data.status === "ok") {
          setMovie(data.data.movie);
        } else {
          setMovie(null);
        }
      } catch (error) {
        console.error("Error fetching movie data:", error);
        setMovie(null);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="max-w-4xl px-5 mx-auto my-20">
        <div className="md:flex-row flex-col flex items-center md:items-start">
          <Skeleton className="w-[14.5rem] h-[22.5rem]"></Skeleton>
          <div>
            <CardHeader>
              <Skeleton className="h-5 w-20"></Skeleton>
              <Skeleton className="h-[10rem] w-[27rem] md:w-[40rem]"></Skeleton>
            </CardHeader>
            <CardContent className="flex flex-col justify-center gap-2">
              <Skeleton className="h-5 w-[4rem]"></Skeleton>
              <Skeleton className="h-5 w-[20rem]"></Skeleton>
            </CardContent>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl px-5 mx-auto my-6 sm:my-20">
      <div className="md:flex-row flex-col flex items-center md:items-start gap-6">
        <img
          className="rounded-md md:sticky md:top-16"
          src={movie.medium_cover_image}
          alt={movie.title_long}
        />
        <div>
          <CardTitle className="mb-3 text-sm sm:text-lg">
            {movie.title_long}
          </CardTitle>
          {movie.description_full ? (
            <CardDescription>{movie.description_full}</CardDescription>
          ) : (
            <CardDescription>No Description for this movie</CardDescription>
          )}
          <div className="sticky bottom-0 z-50 w-full p-3 rounded-t-2xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <p>Rating: {movie.rating}</p>
            <p className="my-5">
              <CardTitle className="mb-3">Watch Movie</CardTitle>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" onClick={() => window.location.href = "https://watch.streamflix.one/movie/${movie.id}/watch?server=1"}>
                  Play Now
                </Button>
              </div>
            </p>
            <CardTitle className="mb-1">Genre</CardTitle>
            <div className="flex flex-row gap-2">
              {movie.genres.map((genre, index) => (
                <CardDescription key={index}>{genre}</CardDescription>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieContent;
