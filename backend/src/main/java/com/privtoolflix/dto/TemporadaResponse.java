package com.privtoolflix.dto;

import com.privtoolflix.model.Temporada;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class TemporadaResponse {
    private String title;
    private String season;
    private String totalSeasons;
    private String response;
    private String error;
    private List<EpisodioResponse> episodes;

    public TemporadaResponse(Temporada temporada) {
        this.title = temporada.getTitle();
        this.season = temporada.getSeason();
        this.totalSeasons = temporada.getTotalSeasons();
        this.response = temporada.getResponse();
        this.error = temporada.getError();
        this.episodes = Optional.ofNullable(temporada.getEpisodes())
                .orElse(Collections.emptyList())
                .stream()
                .map(EpisodioResponse::new)
                .collect(Collectors.toList());
    }

    public String getTitle() {
        return title;
    }

    public String getSeason() {
        return season;
    }

    public String getTotalSeasons() {
        return totalSeasons;
    }

    public String getResponse() {
        return response;
    }

    public String getError() {
        return error;
    }

    public List<EpisodioResponse> getEpisodes() {
        return episodes;
    }
}
