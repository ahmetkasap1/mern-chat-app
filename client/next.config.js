/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        domains : ["images.pexels.com", 'localhost', "cdn-icons-png.flaticon.com", "http://localhost:5000/"], //*ocalhost yerel sunucudan fotoğraf alırken.
    }
}

module.exports = nextConfig
