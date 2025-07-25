package com.privtoolflix.controller;

import com.privtoolflix.service.ItemService;
import com.privtoolflix.service.ListaService;
import com.privtoolflix.service.TemporadaService;

import com.privtoolflix.dto.ItemRequest;
import com.privtoolflix.dto.ListaRequest;
import com.privtoolflix.dto.TemporadaRequest;
import com.privtoolflix.dto.ListaResponse;
import com.privtoolflix.dto.ItemResponse;
import com.privtoolflix.dto.TemporadaResponse;

import com.privtoolflix.dto.Response;

import com.privtoolflix.model.Item;
import com.privtoolflix.model.Lista;
import com.privtoolflix.model.Temporada;

import io.github.resilience4j.ratelimiter.annotation.RateLimiter;
import io.github.resilience4j.ratelimiter.RequestNotPermitted;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;

//@CrossOrigin(origins = "http://localhost:3000")
@CrossOrigin(origins = "*")

@RestController
public class ConsultaOmdbController {

  private final ItemService itemService;
  private final ListaService listaService;
  private final TemporadaService temporadaService;

  public ConsultaOmdbController(
      ItemService itemService,
      ListaService listaService,
      TemporadaService temporadaService) {
    this.itemService = itemService;
    this.listaService = listaService;
    this.temporadaService = temporadaService;
  }

  public ResponseEntity<Response<?>> rateLimitFallback(RequestNotPermitted ex) {
    Response<?> body = new Response<>(false, "Limite de requisições excedido. Tente novamente mais tarde.", null);
    return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body(body);
  }

  @RateLimiter(name = "consultaOmdbLimiter", fallbackMethod = "rateLimitFallback")
  @Cacheable("cacheItens")
  @PostMapping("/buscarItem")
  public ResponseEntity<Response<ItemResponse>> consultarItem(@RequestBody ItemRequest request) {
    System.out.println("Chegou aqui !!");
    String titulo = request.getTitulo();
    String imdbId = request.getImdbId();
    String tipo = request.getTipo();
    Integer ano = request.getAno();
    boolean fullSinopse = request.getFullSinopse();

    Item retornoService = itemService.buscarItem(titulo, imdbId, tipo, ano, fullSinopse);
    ItemResponse dtoResponse = new ItemResponse(retornoService);
    return ResponseEntity.ok(new Response<>(true, "Busca de item efetuada com sucesso", dtoResponse));
  }

  @RateLimiter(name = "consultaOmdbLimiter", fallbackMethod = "rateLimitFallback")
  @Cacheable("cacheLista")
  @PostMapping("/buscarLista")
  public ResponseEntity<Response<ListaResponse>> consultarLista(@RequestBody ListaRequest request) {
    String texto = request.getTexto();
    String tipo = request.getTipo();
    Integer pagina = request.getPagina();
    Integer ano = request.getAno();

    Lista retornoService = listaService.buscarLista(texto, tipo, ano, pagina);
    ListaResponse dtoResponse = new ListaResponse(retornoService);
    return ResponseEntity.ok(new Response<>(true, "Busca de lista efetuada com sucesso", dtoResponse));
  }

  @RateLimiter(name = "consultaOmdbLimiter", fallbackMethod = "rateLimitFallback")
  @Cacheable("cacheTemporada")
  @PostMapping("/buscarTemporada")
  public ResponseEntity<Response<TemporadaResponse>> consultarTemporada(@RequestBody TemporadaRequest request) {
    String imdbId = request.getImdbId();
    int temporada = request.getTemporada();
    Integer episodio = request.getEpisodio();

    Temporada retornoService = temporadaService.buscarTemporada(imdbId, temporada, episodio);
    TemporadaResponse dtoResponse = new TemporadaResponse(retornoService);
    return ResponseEntity.ok(new Response<>(true, "Busca de lista efetuada com sucesso", dtoResponse));
  }
}
