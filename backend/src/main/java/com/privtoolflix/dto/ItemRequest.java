package com.privtoolflix.dto;

public class ItemRequest {

    private String titulo;
    private String imdbId;
    private String tipo;
    private Integer ano;
    private boolean fullSinopse;

    public ItemRequest() {
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getImdbId() {
        return imdbId;
    }

    public void setImdbId(String imdbId) {
        this.imdbId = imdbId;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    public Boolean getFullSinopse() {
        return fullSinopse;
    }

    public void setFullSinopse(Boolean fullSinopse) {
        this.fullSinopse = fullSinopse != null ? fullSinopse : false;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof ItemRequest))
            return false;

        ItemRequest that = (ItemRequest) o;

        if (fullSinopse != that.fullSinopse)
            return false;
        if (titulo != null ? !titulo.equals(that.titulo) : that.titulo != null)
            return false;
        if (imdbId != null ? !imdbId.equals(that.imdbId) : that.imdbId != null)
            return false;
        if (tipo != null ? !tipo.equals(that.tipo) : that.tipo != null)
            return false;
        return ano != null ? ano.equals(that.ano) : that.ano == null;
    }

    @Override
    public int hashCode() {
        int result = titulo != null ? titulo.hashCode() : 0;
        result = 31 * result + (imdbId != null ? imdbId.hashCode() : 0);
        result = 31 * result + (tipo != null ? tipo.hashCode() : 0);
        result = 31 * result + (ano != null ? ano.hashCode() : 0);
        result = 31 * result + (fullSinopse ? 1 : 0);
        return result;
    }
}
