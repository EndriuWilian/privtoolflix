package com.privtoolflix.dto;

import com.privtoolflix.model.Episodio;

public class EpisodioResponse {
    private String title;
    private String released;
    private String episode;
    private String imdbRating;
    private String imdbID;

    public EpisodioResponse(Episodio episodio) {
        this.title = episodio.getTitle();
        this.released = episodio.getReleased();
        this.episode = episodio.getEpisode();
        this.imdbRating = episodio.getImdbRating();
        this.imdbID = episodio.getImdbID();
    }

    public String getTitle() {
        return title;
    }

    public String getReleased() {
        return released;
    }

    public String getEpisode() {
        return episode;
    }

    public String getImdbRating() {
        return imdbRating;
    }

    public String getImdbID() {
        return imdbID;
    }
}
