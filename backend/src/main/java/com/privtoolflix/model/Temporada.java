package com.privtoolflix.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class Temporada {

    @JsonProperty("Title")
    private String title;

    @JsonProperty("Season")
    private String season;

    @JsonProperty("totalSeasons")
    private String totalSeasons;

    @JsonProperty("Episodes")
    private List<Episodio> episodes;

    @JsonProperty("Response")
    private String response;

    @JsonProperty("Error")
    private String error;

    // Getters e Setters

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }

    public String getTotalSeasons() {
        return totalSeasons;
    }

    public void setTotalSeasons(String totalSeasons) {
        this.totalSeasons = totalSeasons;
    }

    public List<Episodio> getEpisodes() {
        return episodes;
    }

    public void setEpisodes(List<Episodio> episodes) {
        this.episodes = episodes;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }
}
