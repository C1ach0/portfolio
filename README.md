# Portfolio
> Welcome to my personal portfolio website! This project showcases my skills, experience, and projects as a web developer. Built with Nuxt.js and styled using TailwindCSS, the site features a modern, responsive design and smooth animations powered by GSAP. Explore my work, learn about the technologies I use, and discover how I approach web development.

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
2. Run the project
```bash
cd website/app
npm run dev

# OR

docker compose -f docker-compose.dev.yml up
```

## Use Intro

### **Why it's added**
This feature was added to make it easier to give **live presentations of the portfolio**, allowing you to guide viewers through projects and interface elements step by step in an interactive way.  

### **Available query parameters**
- `intro`: `true` (default `false`) → Activate the intro guide  
- `duration`: `10000` (default `10000`) → Set the duration for each step in milliseconds  
- `projects`: `rosy-rp,portfolio` → Comma-separated list of project **slugs** to include in the intro

### **Example**
```url
http://localhost:5173?intro=true&duration=15000&projects=rosy-rp,portfolio
```
This will start the interactive intro, set each step duration to 5000ms, and include the projects `rosy-rp` and `portfolio` in the tour.


## Technologies Used
### Frontend (Website)
- **[Nuxt.js](https://nuxt.com):** A powerful framework for building server-side rendered Vue.js applications.
- **[NuxtUI](https://ui.nuxt.com):** A component library that integrates well with Nuxt.js for building modern and responsive UIs.
- **[TailwindCSS](https://tailwindcss.com):** A utility-first CSS framework for building custom designs quickly.
- **[GSAP](https://gsap.com):** A robust JavaScript animation library for creating high-performance, complex animations with ease and flexibility.
- **[Skills Icons](https://github.com/ixrzr/skills-icons):** A little API to display icons for skills.
- **[IntroJS](https://introjs.com):** A lightweight, user-friendly JavaScript library that allows you to create interactive step-by-step guides and product tours for web applications, helping users understand your interface quickly and easily.

### Server
- **[Docker](https://www.docker.com):** A platform for developing, shipping, and running applications in containers, ensuring consistency across different environments.
- **[CloudFlare Tunnel](https://www.cloudflare.com):** A secure tunneling service that exposes local servers to the internet without opening ports, providing encrypted access and protection against DDoS attacks.

## License
MIT © Maxence Bessi