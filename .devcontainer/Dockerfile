# syntax=docker/dockerfile:1
# Keep the official development tools and align the complete Node.js distribution
# (runtime, headers, npm and documentation) with the runtime stage.
FROM node:26.13.0-trixie-slim@sha256:e4db4c914bf8ad241bd24804fc25d272d89bad97e68cdc8a1414862790a02c39 AS runtime
FROM mcr.microsoft.com/devcontainers/typescript-node:5-26-trixie@sha256:56fa16455e6339820009b816a0ae9d63c76b3e75cbd3c50f0830e8196692baa2
COPY --from=runtime /usr/local/ /usr/local/
