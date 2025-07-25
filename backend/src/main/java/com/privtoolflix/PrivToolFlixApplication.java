package com.privtoolflix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class PrivToolFlixApplication {

	public static void main(String[] args) {
		SpringApplication.run(PrivToolFlixApplication.class, args);
	}

}
