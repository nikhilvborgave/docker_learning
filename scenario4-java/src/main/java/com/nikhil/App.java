package com.nikhil;

import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

public class App {

    public static void main(String[] args) throws IOException {
        int port = 8080;
        HttpServer server = HttpServer.create(new InetSocketAddress(port), 0);

        // Route: /
        server.createContext("/", new HttpHandler() {
            public void handle(HttpExchange exchange) throws IOException {
                String response = "{\n" +
                    "  \"message\": \"Hey! This is Nikhil's Java API running in Docker!\",\n" +
                    "  \"status\": \"live\",\n" +
                    "  \"container\": \"openjdk:17-jre-slim\"\n" +
                    "}";
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        });

        // Route: /health
        server.createContext("/health", new HttpHandler() {
            public void handle(HttpExchange exchange) throws IOException {
                String response = "{\n" +
                    "  \"status\": \"healthy\",\n" +
                    "  \"language\": \"Java\",\n" +
                    "  \"port\": 8080\n" +
                    "}";
                exchange.getResponseHeaders().set("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, response.length());
                OutputStream os = exchange.getResponseBody();
                os.write(response.getBytes());
                os.close();
            }
        });

        server.setExecutor(null);
        server.start();
        System.out.println("Server running on port " + port);
    }
}
