ARG VARIANT="18"
FROM mcr.microsoft.com/vscode/devcontainers/javascript-node:${VARIANT}

ENV DEBIAN_FRONTEND=noninteractive

#VSCode specific
RUN apt update -y \
    && apt install -y \
        libcurl4-openssl-dev \
    && rm -rf /var/lib/apt/lists/*