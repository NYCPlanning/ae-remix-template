import { defineConfig } from "@kubb/core";
import createSwagger from "@kubb/swagger";
import createSwaggerTS from "@kubb/swagger-ts";
import createSwaggerZod from "@kubb/swagger-zod";
import createSwaggerClient from "@kubb/swagger-client";
import createSwaggerFaker from "@kubb/swagger-faker";
import createSwaggerMsw from "@kubb/swagger-msw";

export default defineConfig({
  root: ".",
  input: {
    path: "https://raw.githubusercontent.com/NYCPlanning/ae-zoning-api/stable/openapi/openapi.yaml",
  },
  output: {
    path: "./app/gen",
    clean: true,
  },
  plugins: [
    createSwagger({
      output: false,
    }),
    createSwaggerTS({}),
    createSwaggerZod({
      output: {
        path: "./zod",
      },
    }),
    createSwaggerClient({
      output: {
        path: "./axios",
      },
    }),
    createSwaggerFaker({}),
    createSwaggerMsw({
      output: {
        path: "./mocks",
      },
    }),
  ],
});
