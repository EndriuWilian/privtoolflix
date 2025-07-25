package com.privtoolflix.dto;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.Optional;

public class ListaResponse {
    private String response;
    private String error;
    private String totalResults;
    private List<SearchResponse> search;

    public ListaResponse(com.privtoolflix.model.Lista lista) {
        this.response = lista.getResponse();
        this.error = lista.getError();
        this.totalResults = lista.getTotalResults();
        this.search = Optional.ofNullable(lista.getSearch())
                .orElse(Collections.emptyList())
                .stream()
                .map(SearchResponse::new)
                .collect(Collectors.toList());
    }

    public String getResponse() {
        return response;
    }

    public String getError() {
        return error;
    }

    public String getTotalResults() {
        return totalResults;
    }

    public List<SearchResponse> getSearch() {
        return search;
    }

}
