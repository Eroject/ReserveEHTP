package com.ReserveEHTP.ReserveEHTP.Conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Applique la configuration à toutes les routes
                .allowedOrigins("http://localhost:3000") // Remplacez '*' par l'origine de votre front-end
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Permet les méthodes HTTP nécessaires
                .allowedHeaders("*") // Autorise tous les en-têtes
                .allowCredentials(true); // Permet d'envoyer des credentials
    }
}
