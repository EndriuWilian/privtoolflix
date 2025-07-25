package com.privtoolflix.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class Item {

    @JsonProperty("Response")
    private String response;

    @JsonProperty("Title")
    private String title;

    @JsonProperty("Year")
    private String year;

    @JsonProperty("Genre")
    private String genre;

    @JsonProperty("Released")
    private String released;

    @JsonProperty("Error")
    private String error;

    @JsonProperty("Poster")
    private String poster;

    @JsonProperty("Plot")
    private String plot;

    @JsonProperty("Type")
    private String type;

    @JsonProperty("imdbID")
    private String imdbId;

    @JsonProperty("Ratings")
    private List<Ratings> ratings;

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getYear() {
        return year;
    }

    public void setYear(String year) {
        this.year = year;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getReleased() {
        return released;
    }

    public void setReleased(String released) {
        this.released = released;
    }

    public List<Ratings> getRatings() {
        return ratings;
    }

    public void setRatings(List<Ratings> ratings) {
        this.ratings = ratings;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

    public String getPoster() {
        return poster;
    }

    public void setPoster(String poster) {
        this.poster = poster;
    }

    public String getPlot() {
        return plot;
    }

    public void setPlot(String plot) {
        this.plot = plot;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getImdbID() {
        return imdbId;
    }

    public void setImdbID(String imdbId) {
        this.imdbId = imdbId;
    }

};
