package com.privtoolflix.dto;

import com.privtoolflix.model.Search;

public class SearchResponse {
    private String titulo;
    private String ano;
    private String imdbId;
    private String tipo;
    private String poster;

    public SearchResponse(Search search) {
        this.titulo = search.getTitle();
        this.ano = search.getYear();
        this.imdbId = search.getImdbId();
        this.tipo = search.getType();
        this.poster = search.getPoster();
    }

    public String getTitulo() {
        return titulo;
    }

    public String getAno() {
        return ano;
    }

    public String getImdbId() {
        return imdbId;
    }

    public String getTipo() {
        return tipo;
    }

    public String getPoster() {
        return poster;
    }

}
