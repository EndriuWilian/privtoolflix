package com.privtoolflix.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class Lista {

    @JsonProperty("Response")
    private String response;

    @JsonProperty("Error")
    private String error;

    @JsonProperty("totalResults")
    private String totalResults;

    @JsonProperty("Search")
    private List<Search> search;

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getTotalResults() {
        return totalResults;
    }

    public void setTotalResults(String totalResults) {
        this.totalResults = totalResults;
    }

    public List<Search> getSearch() {
        return search;
    }

    public void setSearch(List<Search> search) {
        this.search = search;
    }

    public String getError() {
        return error;
    }

    public void setError(String error) {
        this.error = error;
    }

};
