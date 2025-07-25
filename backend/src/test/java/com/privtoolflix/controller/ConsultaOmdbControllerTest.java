package com.privtoolflix.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.privtoolflix.dto.ItemRequest;
import com.privtoolflix.dto.ListaRequest;
import com.privtoolflix.dto.TemporadaRequest;
import com.privtoolflix.model.Item;
import com.privtoolflix.model.Lista;
import com.privtoolflix.model.Temporada;
import com.privtoolflix.service.ItemService;
import com.privtoolflix.service.ListaService;
import com.privtoolflix.service.TemporadaService;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ConsultaOmdbController.class)
class ConsultaOmdbControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private ItemService itemService;

        @MockBean
        private ListaService listaService;

        @MockBean
        private TemporadaService temporadaService;

        @Autowired
        private ObjectMapper objectMapper;

        @Test
        void deveBuscarItemComSucesso() throws Exception {
                ItemRequest request = new ItemRequest();
                request.setTitulo("Matrix");
                request.setTipo("movie");
                request.setAno(1999);
                request.setFullSinopse(true);

                Item fakeItem = new Item(); // Adapte conforme seu modelo
                when(itemService.buscarItem(any(), any(), any(), any(), anyBoolean()))
                                .thenReturn(fakeItem);

                mockMvc.perform(post("/buscarItem")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.success").value(true));
        }

        @Test
        void deveBuscarListaComSucesso() throws Exception {
                ListaRequest request = new ListaRequest();
                request.setTexto("Batman");
                request.setTipo("movie");
                request.setPagina(1);
                request.setAno(2005);

                Lista fakeLista = new Lista();
                when(listaService.buscarLista(any(), any(), any(), any()))
                                .thenReturn(fakeLista);

                mockMvc.perform(post("/buscarLista")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.success").value(true));
        }

        @Test
        void deveBuscarTemporadaComSucesso() throws Exception {
                TemporadaRequest request = new TemporadaRequest();
                request.setImdbId("tt1234567");
                request.setTemporada(1);
                request.setEpisodio(1);

                Temporada fakeTemporada = new Temporada();
                when(temporadaService.buscarTemporada(any(), anyInt(), any()))
                                .thenReturn(fakeTemporada);

                mockMvc.perform(post("/buscarTemporada")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.success").value(true));
        }
}
