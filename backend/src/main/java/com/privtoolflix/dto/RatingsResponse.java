package com.privtoolflix.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.privtoolflix.model.Ratings;

public class RatingsResponse {

    @JsonProperty("fonte")
    private String source;

    @JsonProperty("nota")
    private String value;

    public RatingsResponse(Ratings rating) {
        this.source = rating.getSource();
        this.value = rating.getValue();
    }

    public String getSource() {
        return source;
    }

    public String getValue() {
        return value;
    }
}
