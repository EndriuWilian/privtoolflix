package com.privtoolflix.dto;

public class ListaRequest {

    private String texto;
    private String tipo;
    private Integer ano;
    private Integer pagina;

    public ListaRequest() {
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto.replace(" ", "_");
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public Integer getPagina() {
        return pagina;
    }

    public void setPagina(Integer pagina) {
        this.pagina = pagina;
    }

    public Integer getAno() {
        return ano;
    }

    public void setAno(Integer ano) {
        this.ano = ano;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o)
            return true;
        if (!(o instanceof ListaRequest))
            return false;

        ListaRequest that = (ListaRequest) o;

        if (texto != null ? !texto.equals(that.texto) : that.texto != null)
            return false;
        if (tipo != null ? !tipo.equals(that.tipo) : that.tipo != null)
            return false;
        if (ano != null ? !ano.equals(that.ano) : that.ano != null)
            return false;
        return pagina != null ? pagina.equals(that.pagina) : that.pagina == null;
    }

    @Override
    public int hashCode() {
        int result = texto != null ? texto.hashCode() : 0;
        result = 31 * result + (tipo != null ? tipo.hashCode() : 0);
        result = 31 * result + (ano != null ? ano.hashCode() : 0);
        result = 31 * result + (pagina != null ? pagina.hashCode() : 0);
        return result;
    }

}
