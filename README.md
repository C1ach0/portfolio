# Portfolio
> This is a personal portfolio website built with Nuxt.js, showcasing my skills and projects. The portfolio includes a dynamic project page where project details are fetched from an API, and each project is presented with markdown content, including images and code snippets. The admin panel allows easy editing of projects with markdown and image upload capabilities.

## Features
- **Dynamic Project Pages:** Projects are stored as markdown files, fetched from an API, and rendered with TailwindCSS typography and Prism.js for code syntax highlighting.
- **Admin Panel:** An admin interface for creating and editing projects using markdown, including image upload and project metadata management.

## Installation
### Prerequisites
- Docker
- Docker Compose

### Setup

1. Clone the repository
```bash
git clone https://github.com/C1ach0/portfolio.git
cd portoflio
```
2. Run the compose
```bash
docker compose -f docker-compose.dev.yml up
```

## Technologies Used
### Frontend (Website)
- **[Nuxt.js](https://nuxt.com):** A powerful framework for building server-side rendered Vue.js applications.
- **[NuxtUI](https://ui.nuxt.com):** A component library that integrates well with Nuxt.js for building modern and responsive UIs.
- **[TailwindCSS](https://tailwindcss.com):** A utility-first CSS framework for building custom designs quickly.
- **[Skills Icons](https://github.com/ixrzr/skills-icons):** A little API to display icons for skills.

### Backend (API)
- **[Nest.js](https://nestjs.com):** A progressive Node.js framework for building efficient, scalable, and reliable server-side applications.
- **[QuickDB](https://quickdb.js.org):** A simple and fast database for storing key-value pairs in JSON format, used for quick storage in the API.

### Server
- **[Docker](https://www.docker.com):** A platform for developing, shipping, and running applications in containers, ensuring consistency across different environments.
- **[Nginx](https://nginx.org):** A high-performance web server and reverse proxy used for serving the application and load balancing.

## License
This project is licensed under the MIT License - see the LICENSE file for details.