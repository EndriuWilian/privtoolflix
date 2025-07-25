package com.privtoolflix.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import com.privtoolflix.model.Item;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Value;

@Service
public class ItemService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${api.key}")
    private String apiKey;

    public Item buscarItem(String titulo, String imdbId, String tipo, Integer ano, boolean fullSinopse) {
        if ((titulo == null || titulo.isBlank()) && (imdbId == null || imdbId.isBlank())) {
            throw new IllegalArgumentException("Ausência de parâmetros obrigatórios: título ou imdbId");
        }
        if (ano != null && (ano < 1888 || ano > 2200)) {
            throw new IllegalArgumentException("Parâmetro 'ano' informado é inválido (" + ano + ")");
        }
        String url = "http://www.omdbapi.com/?apikey=" + apiKey;

        if (titulo != null && !titulo.isBlank()) {
            url += "&t=" + encode(titulo);
        }
        if (imdbId != null && !imdbId.isBlank()) {
            url += "&i=" + encode(imdbId);
        }
        if (tipo != null && !tipo.isBlank()) {
            url += "&type=" + (tipo);
        }
        if (ano != null) {
            url += "&y=" + ano;
        }
        String plot = fullSinopse ? "full" : "short";
        url += "&plot=" + plot;

        Item response_api = restTemplate.getForObject(url, Item.class);
        return response_api;
    }

    private String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

}
