package com.privtoolflix.dto;

public class TemporadaRequest {

    private String imdbId;
    private int temporada;
    private Integer episodio;

    public TemporadaRequest() {
    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public int getTemporada() {
        return temporada;
    }

    public void setTemporada(int temporada) {
        this.temporada = temporada;
    }

    public Integer getEpisodio() {
        return episodio;
    }

    public void setEpisodio(Integer episodio) {
        this.episodio = episodio;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof TemporadaRequest))
            return false;

        TemporadaRequest that = (TemporadaRequest) o;

        if (temporada != that.temporada)
            return false;
        if (imdbId != null ? !imdbId.equals(that.imdbId) : that.imdbId != null)
            return false;
        return episodio != null ? episodio.equals(that.episodio) : that.episodio == null;
    }

    @Override
    public int hashCode() {
        int result = imdbId != null ? imdbId.hashCode() : 0;
        result = 31 * result + temporada;
        result = 31 * result + (episodio != null ? episodio.hashCode() : 0);
        return result;
    }
}
