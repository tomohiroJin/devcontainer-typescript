# syntax=docker/dockerfile:1
# Keep the official development tools and align the complete Node.js distribution
# (runtime, headers, npm and documentation) with the runtime stage.
FROM node:26.13.1-trixie-slim@sha256:e6bedef217677b276c591795e169840edd9096dbf13f29df8ef8d1856b8820bc AS runtime
FROM mcr.microsoft.com/devcontainers/typescript-node:5.2.5-26-trixie@sha256:2c3598b6879cab98033bcad0952c7192f217265e2f7bdfa47a738acbde3e8355
COPY --from=runtime /usr/local/ /usr/local/
