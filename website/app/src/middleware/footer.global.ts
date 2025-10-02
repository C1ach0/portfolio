export default defineNuxtRouteMiddleware((to) => {
  const showFooter = useState('showFooter')

  // Si l'URL commence par /admin/, on cache le footer
  showFooter.value = !to.path.startsWith('/admin/')
})