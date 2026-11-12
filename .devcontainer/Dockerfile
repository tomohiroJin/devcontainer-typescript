# syntax=docker/dockerfile:1
# Keep the official development tools and align the complete Node.js distribution
# (runtime, headers, npm and documentation) with the runtime stage.
FROM node:26.13.0-trixie-slim@sha256:5adad64f9a1fca2d51972caa65983634c8a774eb300d72b20f7f2a0f60368072 AS runtime
FROM mcr.microsoft.com/devcontainers/typescript-node:5.2.5-26-trixie@sha256:2c3598b6879cab98033bcad0952c7192f217265e2f7bdfa47a738acbde3e8355
COPY --from=runtime /usr/local/ /usr/local/
