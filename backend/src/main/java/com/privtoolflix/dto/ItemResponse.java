package com.privtoolflix.dto;

import java.util.Collections;
//import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class ItemResponse {

    private String titulo;
    private String ano;
    private String tipo;
    private String sinopse;
    private String imdbId;
    private String genero;
    private String poster;
    private List<RatingsResponse> ratings;

    public ItemResponse(com.privtoolflix.model.Item item) {
        this.titulo = item.getTitle();
        this.ano = item.getYear();
        this.tipo = item.getType();
        this.sinopse = item.getPlot();
        this.imdbId = item.getImdbID();
        this.genero = item.getGenre();
        this.poster = item.getPoster();
        this.ratings = Optional.ofNullable(item.getRatings())
                .orElse(Collections.emptyList())
                .stream()
                .map(RatingsResponse::new)
                .collect(Collectors.toList());
    }

    public String getTitulo() {
        return titulo;
    }

    public String getAno() {
        return ano;
    }

    public String getTipo() {
        return tipo;
    }

    public String getSinopse() {
        return sinopse;
    }

    public String getImdbId() {
        return imdbId;
    }

    public String getGenero() {
        return genero;
    }

    public String getPoster() {
        return poster;
    }

    public List<RatingsResponse> getRatings() {
        return ratings;
    }

}
