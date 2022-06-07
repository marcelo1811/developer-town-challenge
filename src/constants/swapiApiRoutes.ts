const swapiApiRoutes = {
  listStarships: (page: number) =>
    `${process.env.REACT_APP_SWAPI_API_URL}/starships/?page=${Number(page)}`,
};

export default swapiApiRoutes;
