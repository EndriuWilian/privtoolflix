package com.privtoolflix.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import com.privtoolflix.model.Lista;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

@Service
public class ListaService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${api.key}")
    private String apiKey;

    public Lista buscarLista(String texto, String tipo, Integer ano, Integer pagina) {
        if (texto == null || texto.isBlank()) {
            throw new IllegalArgumentException("Ausência de parâmetro obrigatório: texto");
        }
        if (ano != null && (ano < 1888 || ano > 2200)) {
            throw new IllegalArgumentException("Parâmetro 'ano' informado é inválido (" + ano + ")");
        }

        String url = "http://www.omdbapi.com/?apikey=" + apiKey;
        url += "&s=" + encode(texto);

        if (tipo != null && !tipo.isBlank()) {
            url += "&type=" + (tipo);
        }
        if (ano != null) {
            url += "&y=" + ano;
        }
        pagina = (pagina == null || pagina < 1) ? 1 : pagina;
        url += "&page=" + pagina;

        Lista response_api = restTemplate.getForObject(url, Lista.class);
        return response_api;
    }

    private String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

}
