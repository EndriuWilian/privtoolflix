package com.privtoolflix.service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import com.privtoolflix.model.Temporada;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class TemporadaService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${api.key}")
    private String apiKey;

    public Temporada buscarTemporada(String imdbId, int temporada, Integer episodio) {
        // System.out.println("Teste / chegou sem usar cache");
        if (imdbId == null || imdbId.isBlank()) {
            throw new IllegalArgumentException("Ausência de parâmetro obrigatório: imdbId");
        }

        String url = "http://www.omdbapi.com/?apikey=" + apiKey;
        url += "&i=" + encode(imdbId) + "&Season=" + (temporada > 0 ? temporada : 1);

        if (episodio != null) {
            url += "&episode=" + (episodio);
        }

        // System.out.println(url);
        Temporada response_api = restTemplate.getForObject(url, Temporada.class);
        return response_api;
    }

    private String encode(String value) {
        return URLEncoder.encode(value, StandardCharsets.UTF_8);
    }

}
