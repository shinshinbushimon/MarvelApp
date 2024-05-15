import ExternalAPIRepository from "../Repository/ExternalAPIRepository";
import MovieRepository from "../Repository/MovieRepository";
import express from "express";

export class MovieController {
    constructor(
        private MovieRepo: MovieRepository,
        private APIFetcher: ExternalAPIRepository
    ) {}

    getMovie = async (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const results = await this.MovieRepo.getMovieData();
            res.status(200).json(results);
        } catch (e) {
            res.status(500).send("映画情報の取得に失敗しました");
            next(e);
        }
    }

    // https://api.themoviedb.org/3/movieがインスタンスとして設定されている予定
    movieAPIFetcher = async (
        req: express.Request, // movie番号が飛んでくる予定
        res: express.Response,
        next: express.NextFunction
    ): Promise<void> => {
        try {
            const apitkn = process.env.TMDb_API_KEY;
            const { movieId } = req.params;
            const endp = `/${movieId}/credits?api_key=${apitkn}`;
            const results = await this.APIFetcher.fetchData(endp);
            const castData = results.cast;
            const characters = castData.map(person => ({
                character: person.character, 
                actor: person.name 
            }));

            res.status(200).json(characters);

        } catch (e) {
            res.status(500).send("castデータの取得に失敗しました。");
            next(e);
        }
    }
}