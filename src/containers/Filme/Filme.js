import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CircularProgressbar } from 'react-circular-progressbar';

import styled from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';

import BasePage from '../../components/BasePage';
import TopBar from '../../components/TopBar';
import MovieCard from '../../components/MovieCard';
import CastCard from '../../components/CastCard';
import Trailer from '../../components/Trailer';

import { getMovie, getTrailers, getRecommendations, getCredits, getReleaseDates } from '../../service/ApiService';
import { formatCommonDate } from '../../helpers/formatDate';
import { convertMinutesToHours } from '../../helpers/convertMinutesToHours';

function Filme() {
  const { id } = useParams();

  const [movie, setMovie] = useState([]);
  const [genres, setGenres] = useState([]);
  const [trailer, setTrailer] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [casts, setCasts] = useState([]);
  const [crews, setCrews] = useState([]);
  const [genresName, setGenresName] = useState([]);
  const [releaseDates, setReleaseDates] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await getMovie(id);
      const filmKind = [];
      data.runtime = convertMinutesToHours(data.runtime);
      data.vote_average = data.vote_average * 10;
      setMovie(data);
      setGenres(data.genres)

      data.genres.map((genre) => {
        filmKind.push(genre.name);
      });
      setGenresName(filmKind);

      const videos = await getTrailers(id);
      setTrailer(videos.results.find((video) => { return video.official }));

      const otherMovies = await getRecommendations(id);
      setRecommendations(otherMovies.results);

      const credits = await getCredits(id);
      setCasts(credits.cast);
      setCrews(credits.crew.filter((crew) => { 
        return crew.job === 'Characters' || crew.job === 'Director' || crew.job === 'Screenplay'
      }));

      let releaseDates = await getReleaseDates(id);
      releaseDates = releaseDates.results.find((releaseDate) => { return releaseDate.iso_3166_1 === 'BR' });
      releaseDates.release_dates[0].release_date = formatCommonDate(releaseDates.release_dates[0].release_date);
      setReleaseDates(releaseDates.release_dates[0]);
    }
    fetchData();
  }, [id]);

  const posterPath = movie.poster_path ? `https://image.tmdb.org/t/p/w342/${movie.poster_path}` : '/no-big-poster.png';

  return (
    <>
      <BasePage>
        <TopBar>
          <Header>
            <MainPoster><img src={posterPath} alt="poster" /></MainPoster> 
            <Infos>
              <Title>{movie.title}</Title>
              <ResumeDesktop>
                  {releaseDates.certification && (releaseDates.certification === 'L' ? 'Livre ' : releaseDates.certification === undefined ? 'Sem classificação ' : `${releaseDates.certification} anos • `)}
                  {releaseDates.release_date && (`${releaseDates.release_date} (BR) • `)} 
                  {`${genresName.join(", ")} • `} 
                  {movie.runtime && (movie.runtime)}
              </ResumeDesktop>
              <ResumeMobile>
                <div>{releaseDates.certification && (releaseDates.certification === 'L' ? 'Livre ' : releaseDates.certification === undefined ? 'Sem classificação ' : `${releaseDates.certification} anos `)}</div>
                <div>{releaseDates.release_date && (`${releaseDates.release_date} (BR) `)} </div>
                <div>{genresName.join(", ")}</div>
                <div>{movie.runtime}</div>
              </ResumeMobile>
                <VoteCase>
                  <VoteAverage 
                    value={movie.vote_average} 
                    text={`${movie.vote_average}%`} 
                    styles={{
                      path: {stroke: "#14FF00", strokeWidth: 14},
                      trail: {strokeWidth: 0},
                      text: {fill: "#14FF00", fontSize: 25},
                    }} 
                  />
                  <span>Avaliações dos Usuários</span>
                </VoteCase>
              <Overview>
                {movie.overview && (
                  <>
                    <SectionSubtitle>Sinopse</SectionSubtitle>
                    {movie.overview}
                  </>
                )}
              </Overview>
              <GridCrew>
                {crews.sort(function (a, b) {
                  return (a.job > b.job) ? 1 : ((b.job > a.job) ? -1 : 0);
                }).map((crew) => (
                    <div>
                      <ActorName>{crew.name}</ActorName>
                      <div>{crew.job}</div>
                    </div>
                ))}
              </GridCrew>
            </Infos>
          </Header>
        </TopBar>
        <Body>
          {casts.length !== 0 && (
            <div>
              <SectionTitle>Elenco Original</SectionTitle>
              <GridCast>
                {casts.map((cast) => (
                  <CastCard data={cast} />
                ))}
              </GridCast>
            </div>
          )}
          {trailer && (
            <div>
              <SectionTitle>Trailer</SectionTitle>
              <Trailer trailer={trailer} />
            </div>
           )}
           {recommendations.length !== 0 && (
            <div>
              <SectionTitle>Recomendações</SectionTitle>
              <Grid>
                {recommendations.slice(0, 6).map((recommendation) => (
                  <MovieCard data={recommendation} />
                ))}
              </Grid>
            </div>
          )}
        </Body>
      </BasePage>
    </>
  );
}

const Header = styled.div`
  background-color: #2D0C5D;
  min-height: 29.5rem;
  display: grid;
  grid-template-columns: 1fr 3fr;

  @media(max-width: 600px) {
    height: 29.5rem;
    grid-template-columns: 1fr;
    height: 70rem;
  }
`;

const MainPoster = styled.div`
  position: absolute;
  width: 20rem;
  height: 30rem;
  border-radius: 0.2rem;
  margin: 1.5rem 0.2rem 0.2rem 5rem;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  img {
    width: 20rem;
    height: 30rem;
    border-radius: 0.2rem;
  }

  @media(max-width: 600px) {
    position: static;
    width: 12rem;
    height: 18rem;

    img {
      width: 12rem;
      height: 18rem;
      border-radius: 0.2rem;
    }
  }
`;

const Infos = styled.div`
  text-align: left;
  margin: 1.4rem 1rem 1.4rem 26rem;
  width: 67vw;

  @media(max-width: 600px) {
    margin: 1.4rem 1rem;
    width: auto;
  }

`;

const Title = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
  margin: 0.2rem 0 0.2rem 0;
`;

const ResumeDesktop = styled.span`
  font-size: 1rem;

  @media(max-width: 600px) {
    display: none;
  }
`;

const ResumeMobile = styled.span`
  display: none;

  @media(max-width: 600px) {
    display: initial;
    font-size: 1rem;
  }
`;

const VoteCase = styled.div`
  margin-top: 1rem;
  span {
    margin-left: 0.5rem;
  width: 1rem;
  }
`;

const VoteAverage = styled(CircularProgressbar)`
   width: 3.5rem;
   background-color: #FFFFFF1A;
   border-radius: 8rem;
   font-weight: bold;
`;

const Overview = styled.div`
  font-size: 1rem;
  margin-bottom: 1.5rem;
  color: #DDDDDD;
  line-height: 24px;
  letter-spacing: -0.005em;
`;

const SectionTitle = styled.h2`
  margin: 2rem 4rem 1rem 4rem;
  font-weight: 700;
  font-size: 1.4rem;
`;

const ActorName = styled.div`
  font-size: 1.2rem;
`;

const GridCrew = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns:repeat(3, 1fr);
  gap: 2rem; 
  font-size: 1rem;
  color: white;

  @media(max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const SectionSubtitle = styled.div`
  margin: 1rem 0 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
`;

const Body = styled.body`
  margin: 36rem 0 4rem 0;
  background-color: #F3F3F3;
  height: 100%;

  @media(max-width: 600px) {
    margin: 75rem 0 10rem 0;
  }
`;

const GridCast = styled.div`
  margin: 0 4rem;
  display: flex;
  column-gap: 1rem;
  width: 72rem;
  height: 24.5rem;
  overflow: auto;

  @media(max-width: 600px) {
    margin: 0;
    width: 100%;
  }

`;

const Grid = styled.div`
  margin: 0 4rem;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 3rem 1rem; 

  @media(max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
    margin: 0 0.2rem;
     gap: 3rem 0.5rem; 
  }
`;

export default Filme;
