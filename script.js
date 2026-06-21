// ============================================================
// INDEX.HTML - SCRIPT PRINCIPAL EXPLORE PERU TRAVEL
// INTEGRADO Y CORREGIDO POR AVI CONNECTION
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // ========== SKELETON LOADER ==========
    const skeletonLoader = document.getElementById('skeletonLoader');
    if (skeletonLoader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                skeletonLoader.classList.add('hide');
                setTimeout(() => {
                    if (skeletonLoader && skeletonLoader.parentNode) {
                        skeletonLoader.remove();
                    }
                }, 500);
            }, 800);
        });
    }

    // ========== GSAP ANIMATIONS ==========
    if (typeof gsap !== 'undefined') {
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
        }

        const heroTitle = document.querySelector('.title');
        if (heroTitle) {
            gsap.from(heroTitle, {
                opacity: 0,
                y: 50,
                duration: 0.8,
                delay: 0.3,
                ease: "power2.out"
            });
        }

        const heroSubtitle = document.querySelector('.subtitle');
        if (heroSubtitle) {
            gsap.from(heroSubtitle, {
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: 0.6,
                ease: "power2.out"
            });
        }

        const cards = document.querySelectorAll('.tour-show-card, .popular-card, .testimonio-card, .identidad-card, .stat-card, .comentario-card, .exclusive-card, .aventura-card');
        if (cards.length > 0 && typeof ScrollTrigger !== 'undefined') {
            cards.forEach(card => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "bottom 60%",
                        toggleActions: "play none none reverse"
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.7,
                    ease: "power2.out"
                });
            });
        }
    }

    // ========== NAVBAR SCROLL EFFECT ==========
    const header = document.getElementById('mainHeader');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // ========== LIGHTBOX GALERÍA ==========
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentImages = [];
    let currentIndex = 0;

    const galleryImages = document.querySelectorAll('[data-lightbox]');
    if (galleryImages.length > 0) {
        galleryImages.forEach(img => {
            img.style.cursor = 'pointer';
            img.addEventListener('click', (e) => {
                currentImages = Array.from(galleryImages).map(i => i.src);
                currentIndex = currentImages.indexOf(img.src);
                openLightbox(currentIndex);
            });
        });
    }

    function openLightbox(index) {
        if (lightboxModal && lightboxImage) {
            lightboxImage.src = currentImages[index];
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        if (lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    function prevImage() {
        if (currentImages.length > 0) {
            currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
            if (lightboxImage) lightboxImage.src = currentImages[currentIndex];
        }
    }

    function nextImage() {
        if (currentImages.length > 0) {
            currentIndex = (currentIndex + 1) % currentImages.length;
            if (lightboxImage) lightboxImage.src = currentImages[currentIndex];
        }
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevImage);
    if (lightboxNext) lightboxNext.addEventListener('click', nextImage);

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (lightboxModal && lightboxModal.classList.contains('active')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        }
    });

    // ========== MAPA INTERACTIVO ==========
    const mapContainer = document.getElementById('travelMap');
    if (mapContainer && typeof L !== 'undefined') {
        const map = L.map('travelMap').setView([-13.53195, -71.96746], 6.5);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 18,
            minZoom: 4
        }).addTo(map);

        const destinations = [
            { coords: [-13.53195, -71.96746], name: 'Cusco', desc: 'Capital del Imperio Inca', icon: '🏔️' },
            { coords: [-13.16306, -72.54556], name: 'Machu Picchu', desc: 'Maravilla del Mundo', icon: '🏛️' },
            { coords: [-12.04637, -77.04275], name: 'Lima', desc: 'Capital del Perú', icon: '🌊' },
            { coords: [-13.69496, -76.22014], name: 'Paracas', desc: 'Islas Ballestas', icon: '🏝️' },
            { coords: [-14.06808, -75.72582], name: 'Ica', desc: 'Oasis de Huacachina', icon: '🏜️' },
            { coords: [-6.76265, -79.83609], name: 'Chiclayo', desc: 'Señor de Sipán', icon: '🏺' },
            { coords: [-4.10364, -81.04707], name: 'Máncora', desc: 'Playas del Norte', icon: '🏖️' },
            { coords: [-10.69462, -75.26293], name: 'Oxapampa', desc: 'Selva Central', icon: '🌳' },
            { coords: [-16.39882, -71.53688], name: 'Arequipa', desc: 'Ciudad Blanca', icon: '🏛️' }
        ];

        destinations.forEach(dest => {
            const customIcon = L.divIcon({
                html: `<div style="background: #b8860b; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.2); border: 2px solid white;">${dest.icon}</div>`,
                className: 'custom-marker',
                iconSize: [36, 36],
                popupAnchor: [0, -18]
            });

            L.marker(dest.coords, { icon: customIcon })
                .addTo(map)
                .bindPopup(`
                    <strong style="color: #b8860b;">${dest.name}</strong><br>
                    ${dest.desc}<br>
                    <a href="#tours-destacados" style="color: #b8860b; font-size: 0.8rem;">Ver tours →</a>
                `);
        });

        L.control.scale({ metric: true, imperial: false }).addTo(map);
        setTimeout(() => map.invalidateSize(), 500);
        window.addEventListener('resize', () => map.invalidateSize());
    }

    // ========== SISTEMA DE COMENTARIOS ==========
    let comentarios = JSON.parse(localStorage.getItem('comentariosViajeros')) || [];
    const comentariosGrid = document.getElementById('comentariosGrid');
    const comentarioForm = document.getElementById('comentarioForm');

    const stars = document.querySelectorAll('.star');
    const ratingInput = document.getElementById('comentarioRating');

    if (stars.length > 0 && ratingInput) {
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const value = parseInt(star.getAttribute('data-value'));
                ratingInput.value = value;
                stars.forEach(s => {
                    const starValue = parseInt(s.getAttribute('data-value'));
                    if (starValue <= value) {
                        s.classList.add('active');
                        s.innerHTML = '<i class="fas fa-star"></i>';
                    } else {
                        s.classList.remove('active');
                        s.innerHTML = '<i class="far fa-star"></i>';
                    }
                });
            });
        });
    }

    function renderComentarios() {
        if (!comentariosGrid) return;

        if (comentarios.length === 0) {
            comentariosGrid.innerHTML = '<div class="comentario-empty" style="grid-column: 1/-1; text-align: center; padding: 40px; color: #6b5b4a;">📝 Sé el primero en dejar un comentario</div>';
            return;
        }

        comentariosGrid.innerHTML = comentarios.slice().reverse().map(com => `
            <div class="comentario-card">
                <div class="comentario-header">
                    <span class="comentario-nombre">${escapeHtml(com.nombre)}</span>
                    <span class="comentario-destino">${escapeHtml(com.destino)}</span>
                </div>
                <div class="comentario-rating">
                    ${'<i class="fas fa-star"></i>'.repeat(com.rating)}${'<i class="far fa-star"></i>'.repeat(5 - com.rating)}
                </div>
                <p class="comentario-texto">${escapeHtml(com.texto)}</p>
                <div class="comentario-fecha">${com.fecha}</div>
            </div>
        `).join('');
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    if (comentarioForm && comentariosGrid) {
        comentarioForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('comentarioNombre');
            const destino = document.getElementById('comentarioDestino');
            const texto = document.getElementById('comentarioTexto');
            const rating = document.getElementById('comentarioRating');

            if (!nombre?.value.trim() || !texto?.value.trim() || !rating?.value) {
                alert('Por favor completa todos los campos');
                return;
            }

            const nuevoComentario = {
                id: Date.now(),
                nombre: nombre.value.trim(),
                destino: destino.value,
                texto: texto.value.trim(),
                rating: parseInt(rating.value),
                fecha: new Date().toLocaleDateString('es-PE', { day: 'numeric', month: 'long', year: 'numeric' })
            };

            comentarios.push(nuevoComentario);
            localStorage.setItem('comentariosViajeros', JSON.stringify(comentarios));
            renderComentarios();
            comentarioForm.reset();
            if (ratingInput) ratingInput.value = 5;

            if (stars.length > 0) {
                stars.forEach(s => {
                    s.classList.add('active');
                    s.innerHTML = '<i class="fas fa-star"></i>';
                });
            }

            const successMsg = document.createElement('div');
            successMsg.className = 'form-success show';
            successMsg.style.marginTop = '20px';
            successMsg.innerHTML = '<i class="fas fa-check-circle"></i><p>¡Gracias por tu comentario!</p>';
            comentarioForm.appendChild(successMsg);
            setTimeout(() => successMsg.remove(), 3000);
        });
    }

    renderComentarios();

    // ========== FORMULARIO DE CONTACTO ==========
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    function validateEmail(email) {
        const re = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
        return re.test(email);
    }

    function showError(inputId, message) {
        const errorSpan = document.getElementById(`${inputId}Error`);
        if (errorSpan) {
            errorSpan.textContent = message;
            errorSpan.style.color = '#e74c3c';
        }
    }

    function clearError(inputId) {
        const errorSpan = document.getElementById(`${inputId}Error`);
        if (errorSpan) errorSpan.textContent = '';
    }

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            let isValid = true;
            const nombre = document.getElementById('nombre');
            const email = document.getElementById('email');
            const destino = document.getElementById('destino');
            const terminos = document.getElementById('terminos');

            if (!nombre?.value.trim()) { showError('nombre', 'El nombre es requerido'); isValid = false; } else { clearError('nombre'); }
            if (!email?.value.trim()) { showError('email', 'El correo es requerido'); isValid = false; } else if (!validateEmail(email.value)) { showError('email', 'Correo inválido'); isValid = false; } else { clearError('email'); }
            if (!destino?.value) { showError('destino', 'Selecciona un destino'); isValid = false; } else { clearError('destino'); }
            if (!terminos?.checked) { showError('terminos', 'Acepta los términos'); isValid = false; } else { clearError('terminos'); }

            if (isValid) {
                const submitBtn = contactForm.querySelector('.btn-submit');
                const originalText = submitBtn?.innerHTML || 'Enviar';
                if (submitBtn) {
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                    submitBtn.disabled = true;
                }

                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.innerHTML = originalText;
                        submitBtn.disabled = false;
                    }
                    contactForm.reset();
                    if (formSuccess) formSuccess.classList.add('show');
                    setTimeout(() => { if (formSuccess) formSuccess.classList.remove('show'); }, 5000);
                }, 1500);
            }
        });
    }

    // ========== CARRUSEL DE TOURS CORTOS ==========
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselPrevBtn = document.getElementById('prevBtn');
    const carouselNextBtn = document.getElementById('nextBtn');
    const carouselDotsContainer = document.getElementById('carouselDots');

    if (carouselTrack && carouselTrack.children.length > 0) {
        const cards = Array.from(carouselTrack.children);
        let carouselCurrentIndex = 0;
        let autoSlideInterval;
        const autoSlideDelay = 4000;

        function getCardsPerView() {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        let cardsPerView = getCardsPerView();
        let totalDots = Math.ceil(cards.length / cardsPerView);

        function updateCardWidth() {
            if (!carouselTrack.parentElement) return;
            const containerWidth = carouselTrack.parentElement.clientWidth;
            const gap = 24;
            const cardWidth = (containerWidth - (gap * (cardsPerView - 1))) / cardsPerView;
            cards.forEach(card => {
                card.style.flex = `0 0 ${cardWidth}px`;
                card.style.minWidth = `${cardWidth}px`;
            });
        }

        function createDots() {
            if (!carouselDotsContainer) return;
            carouselDotsContainer.innerHTML = '';
            totalDots = Math.ceil(cards.length / cardsPerView);
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === carouselCurrentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => { stopAutoSlide(); goToSlide(i); startAutoSlide(); });
                carouselDotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            const dots = document.querySelectorAll('.dot');
            dots.forEach((dot, i) => dot.classList.toggle('active', i === carouselCurrentIndex));
        }

        function goToSlide(index) {
            if (cards.length === 0) return;
            carouselCurrentIndex = Math.max(0, Math.min(index, totalDots - 1));
            const slideWidth = cards[0].clientWidth + 24;
            carouselTrack.style.transform = `translateX(-${carouselCurrentIndex * slideWidth * cardsPerView}px)`;
            updateDots();
        }

        function nextSlide() { goToSlide(carouselCurrentIndex + 1 >= totalDots ? 0 : carouselCurrentIndex + 1); }
        function prevSlide() { goToSlide(carouselCurrentIndex - 1 < 0 ? totalDots - 1 : carouselCurrentIndex - 1); }
        function startAutoSlide() { stopAutoSlide(); autoSlideInterval = setInterval(nextSlide, autoSlideDelay); }
        function stopAutoSlide() { if (autoSlideInterval) clearInterval(autoSlideInterval); }

        function handleResize() {
            const newCardsPerView = getCardsPerView();
            if (newCardsPerView !== cardsPerView) {
                cardsPerView = newCardsPerView;
                totalDots = Math.ceil(cards.length / cardsPerView);
                carouselCurrentIndex = Math.min(carouselCurrentIndex, totalDots - 1);
                if (carouselCurrentIndex < 0) carouselCurrentIndex = 0;
                updateCardWidth();
                createDots();
                goToSlide(carouselCurrentIndex);
            } else {
                updateCardWidth();
                goToSlide(carouselCurrentIndex);
            }
        }

        if (carouselPrevBtn && carouselNextBtn) {
            carouselPrevBtn.addEventListener('click', () => { stopAutoSlide(); prevSlide(); startAutoSlide(); });
            carouselNextBtn.addEventListener('click', () => { stopAutoSlide(); nextSlide(); startAutoSlide(); });
        }

        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.addEventListener('mouseenter', stopAutoSlide);
            carouselContainer.addEventListener('mouseleave', startAutoSlide);
        }

        window.addEventListener('resize', () => { stopAutoSlide(); handleResize(); startAutoSlide(); });
        updateCardWidth();
        createDots();
        goToSlide(0);
        startAutoSlide();
    }

    // ========== CARRUSEL DE PAQUETES ESCOLARES ==========
    const escolarTrack = document.getElementById('carouselEscolarTrack');
    const escolarDotsContainer = document.getElementById('carouselEscolarDots');

    if (escolarTrack && escolarTrack.children.length > 0) {
        const escolarCards = Array.from(escolarTrack.children);
        let escolarCurrentIndex = 0;
        let escolarAutoSlideInterval;
        const escolarAutoSlideDelay = 5000;
        let escolarCardsPerView = 3;

        function getEscolarCardsPerView() {
            if (window.innerWidth >= 1024) return 3;
            if (window.innerWidth >= 768) return 2;
            return 1;
        }

        function updateEscolarCardWidth() {
            if (!escolarTrack.parentElement) return;
            const containerWidth = escolarTrack.parentElement.clientWidth;
            const gap = 28;
            const cardWidth = (containerWidth - (gap * (escolarCardsPerView - 1))) / escolarCardsPerView;
            escolarCards.forEach(card => {
                card.style.flex = `0 0 ${cardWidth}px`;
                card.style.minWidth = `${cardWidth}px`;
            });
        }

        function createEscolarDots() {
            if (!escolarDotsContainer) return;
            escolarDotsContainer.innerHTML = '';
            const totalDots = Math.ceil(escolarCards.length / escolarCardsPerView);
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('carousel-escolar-dot');
                if (i === escolarCurrentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => { stopEscolarAutoSlide(); goToEscolarSlide(i); startEscolarAutoSlide(); });
                escolarDotsContainer.appendChild(dot);
            }
        }

        function updateEscolarDots() {
            const dots = document.querySelectorAll('.carousel-escolar-dot');
            dots.forEach((dot, i) => dot.classList.toggle('active', i === escolarCurrentIndex));
        }

        function goToEscolarSlide(index) {
            if (escolarCards.length === 0) return;
            const totalDots = Math.ceil(escolarCards.length / escolarCardsPerView);
            escolarCurrentIndex = Math.max(0, Math.min(index, totalDots - 1));
            const slideWidth = escolarCards[0].clientWidth + 28;
            escolarTrack.style.transform = `translateX(-${escolarCurrentIndex * slideWidth * escolarCardsPerView}px)`;
            updateEscolarDots();
        }

        function nextEscolarSlide() {
            const totalDots = Math.ceil(escolarCards.length / escolarCardsPerView);
            goToEscolarSlide(escolarCurrentIndex + 1 >= totalDots ? 0 : escolarCurrentIndex + 1);
        }

        function startEscolarAutoSlide() { stopEscolarAutoSlide(); escolarAutoSlideInterval = setInterval(nextEscolarSlide, escolarAutoSlideDelay); }
        function stopEscolarAutoSlide() { if (escolarAutoSlideInterval) clearInterval(escolarAutoSlideInterval); }

        function handleEscolarResize() {
            const newCardsPerView = getEscolarCardsPerView();
            if (newCardsPerView !== escolarCardsPerView) {
                escolarCardsPerView = newCardsPerView;
                const totalDots = Math.ceil(escolarCards.length / escolarCardsPerView);
                escolarCurrentIndex = Math.min(escolarCurrentIndex, totalDots - 1);
                if (escolarCurrentIndex < 0) escolarCurrentIndex = 0;
                updateEscolarCardWidth();
                createEscolarDots();
                goToEscolarSlide(escolarCurrentIndex);
            } else {
                updateEscolarCardWidth();
                goToEscolarSlide(escolarCurrentIndex);
            }
        }

        const escolarContainer = document.querySelector('.carousel-escolar-container');
        if (escolarContainer) {
            escolarContainer.addEventListener('mouseenter', stopEscolarAutoSlide);
            escolarContainer.addEventListener('mouseleave', startEscolarAutoSlide);
        }

        window.addEventListener('resize', () => { stopEscolarAutoSlide(); handleEscolarResize(); startEscolarAutoSlide(); });
        updateEscolarCardWidth();
        createEscolarDots();
        goToEscolarSlide(0);
        startEscolarAutoSlide();
    }

    // ========== CARRUSEL DE CERTIFICACIONES ==========
    const certTrack = document.getElementById('certCarouselTrack');
    const certDotsContainer = document.getElementById('certCarouselDots');

    if (certTrack && certTrack.children.length > 0) {
        const certSlides = Array.from(certTrack.children);
        let certCurrentIndex = 0;
        let certAutoSlideInterval;
        const certAutoSlideDelay = 5000;
        let certCardsPerView = 5;

        function getCertCardsPerView() {
            if (window.innerWidth >= 1200) return 5;
            if (window.innerWidth >= 992) return 4;
            if (window.innerWidth >= 768) return 3;
            if (window.innerWidth >= 576) return 2;
            return 1;
        }

        function updateCertCardWidth() {
            if (!certTrack.parentElement) return;
            const containerWidth = certTrack.parentElement.clientWidth;
            const gap = 30;
            const cardWidth = (containerWidth - (gap * (certCardsPerView - 1))) / certCardsPerView;
            certSlides.forEach(slide => {
                slide.style.flex = `0 0 ${cardWidth}px`;
                slide.style.minWidth = `${cardWidth}px`;
            });
        }

        function createCertDots() {
            if (!certDotsContainer) return;
            certDotsContainer.innerHTML = '';
            const totalDots = Math.ceil(certSlides.length / certCardsPerView);
            for (let i = 0; i < totalDots; i++) {
                const dot = document.createElement('div');
                dot.classList.add('cert-dot');
                if (i === certCurrentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => { stopCertAutoSlide(); goToCertSlide(i); startCertAutoSlide(); });
                certDotsContainer.appendChild(dot);
            }
        }

        function updateCertDots() {
            const dots = document.querySelectorAll('.cert-dot');
            dots.forEach((dot, i) => dot.classList.toggle('active', i === certCurrentIndex));
        }

        function goToCertSlide(index) {
            if (certSlides.length === 0) return;
            const totalDots = Math.ceil(certSlides.length / certCardsPerView);
            certCurrentIndex = Math.max(0, Math.min(index, totalDots - 1));
            const slideWidth = certSlides[0].clientWidth + 30;
            certTrack.style.transform = `translateX(-${certCurrentIndex * slideWidth * certCardsPerView}px)`;
            updateCertDots();
        }

        function nextCertSlide() {
            const totalDots = Math.ceil(certSlides.length / certCardsPerView);
            goToCertSlide(certCurrentIndex + 1 >= totalDots ? 0 : certCurrentIndex + 1);
        }

        function startCertAutoSlide() { stopCertAutoSlide(); certAutoSlideInterval = setInterval(nextCertSlide, certAutoSlideDelay); }
        function stopCertAutoSlide() { if (certAutoSlideInterval) clearInterval(certAutoSlideInterval); }

        function handleCertResize() {
            const newCardsPerView = getCertCardsPerView();
            if (newCardsPerView !== certCardsPerView) {
                certCardsPerView = newCardsPerView;
                const totalDots = Math.ceil(certSlides.length / certCardsPerView);
                certCurrentIndex = Math.min(certCurrentIndex, totalDots - 1);
                if (certCurrentIndex < 0) certCurrentIndex = 0;
                updateCertCardWidth();
                createCertDots();
                goToCertSlide(certCurrentIndex);
            } else {
                updateCertCardWidth();
                goToCertSlide(certCurrentIndex);
            }
        }

        const certContainer = document.querySelector('.cert-carousel-container');
        if (certContainer) {
            certContainer.addEventListener('mouseenter', stopCertAutoSlide);
            certContainer.addEventListener('mouseleave', startCertAutoSlide);
        }

        window.addEventListener('resize', () => { stopCertAutoSlide(); handleCertResize(); startCertAutoSlide(); });
        updateCertCardWidth();
        createCertDots();
        goToCertSlide(0);
        startCertAutoSlide();
    }

    // ========== CONTADORES ANIMADOS ==========
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        function isElementInViewport(el) {
            const rect = el.getBoundingClientRect();
            return rect.top < window.innerHeight - 100 && rect.bottom > 0;
        }

        function animateNumbers() {
            counters.forEach(counter => {
                const target = parseFloat(counter.getAttribute('data-target'));
                if (isElementInViewport(counter) && !counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    let current = 0;
                    const increment = target / 40;
                    const decimals = counter.getAttribute('data-decimals') ? parseInt(counter.getAttribute('data-decimals')) : 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = decimals > 0 ? target.toFixed(decimals) : target;
                        }
                    };
                    updateCounter();
                }
            });
        }

        window.addEventListener('scroll', animateNumbers);
        animateNumbers();
    }

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === "#" || targetId === "") return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const headerHeight = document.getElementById('mainHeader')?.offsetHeight || 100;
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => window.scrollBy(0, -headerHeight), 100);
            }
        });
    });

    // ========== DROPDOWNS MÓVILES ==========
    // ¡CORREGIDO! Ya no habrá error en consola gracias al :scope
    function initMobileDropdowns() {
        const menuItems = document.querySelectorAll('.menu-item-has-children');
        if (menuItems.length === 0) return;

        if (window.innerWidth <= 768) {
            menuItems.forEach(item => {
                const link = item.querySelector(':scope > a');
                if (link && !link.hasAttribute('data-mobile-handler')) {
                    link.setAttribute('data-mobile-handler', 'true');
                    link.addEventListener('click', mobileDropdownHandler);
                }
            });
        } else {
            menuItems.forEach(item => {
                const link = item.querySelector(':scope > a');
                if (link && link.hasAttribute('data-mobile-handler')) {
                    link.removeEventListener('click', mobileDropdownHandler);
                    link.removeAttribute('data-mobile-handler');
                }
                item.classList.remove('active');
                const submenu = item.querySelector('.sub-menu');
                if (submenu) submenu.style.display = '';
            });
        }
    }

    function mobileDropdownHandler(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('active');
            const submenu = parent.querySelector('.sub-menu');
            if (submenu) {
                submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
            }
        }
    }

    initMobileDropdowns();
    window.addEventListener('resize', initMobileDropdowns);

    // ========== MENÚ HAMBURGUESA ==========
    const hamburger = document.getElementById('hamburger');
    if (hamburger && !document.querySelector('.mobile-menu')) {
        const mobileMenuOverlay = document.createElement('div');
        mobileMenuOverlay.className = 'mobile-menu-overlay';
        const mobileMenu = document.createElement('div');
        mobileMenu.className = 'mobile-menu';

        const closeBtn = document.createElement('button');
        closeBtn.className = 'mobile-menu-close';
        closeBtn.innerHTML = '<i class="fas fa-times"></i>';
        mobileMenu.appendChild(closeBtn);

        const navMenu = document.querySelector('.nav-menu');
        const mobileNavList = document.createElement('ul');
        mobileNavList.className = 'mobile-nav-list';

        if (navMenu) {
            const navLinks = navMenu.querySelectorAll('li');
            navLinks.forEach(li => {
                const a = li.querySelector('a');
                if (a) {
                    const liCopy = document.createElement('li');
                    const aCopy = document.createElement('a');
                    aCopy.href = a.href;
                    aCopy.innerHTML = a.innerHTML;
                    liCopy.appendChild(aCopy);
                    mobileNavList.appendChild(liCopy);
                }
            });
        }
        mobileMenu.appendChild(mobileNavList);

        const contactInfo = document.createElement('div');
        contactInfo.className = 'mobile-contact-info';
        contactInfo.innerHTML = `
            <p><i class="fab fa-whatsapp"></i> +51 930 164 904</p>
            <p><i class="far fa-envelope"></i> exploreperutravel@gmail.com</p>
            <a href="https://wa.me/51930164904" class="mobile-whatsapp-btn"><i class="fab fa-whatsapp"></i> WhatsApp</a>
        `;
        mobileMenu.appendChild(contactInfo);

        document.body.appendChild(mobileMenuOverlay);
        document.body.appendChild(mobileMenu);

        function toggleMobileMenu() {
            hamburger.classList.toggle('open');
            mobileMenu.classList.toggle('open');
            mobileMenuOverlay.classList.toggle('open');
            document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
        }

        hamburger.addEventListener('click', toggleMobileMenu);
        closeBtn.addEventListener('click', toggleMobileMenu);
        mobileMenuOverlay.addEventListener('click', toggleMobileMenu);
    }

    // ========== TRADUCCIONES EXCLUSIVAS PARA INDEX ==========
    const translations = {
        es: {
            contact: "Contáctenos",
            testimonials: "Testimonios",
            explore: "Explore Peru Travel",
            schedule: "Lun - Sab; 09:00 - 19:00 hrs",
            askNow: "PREGUNTAR AHORA",
            home: "INICIO",
            about: "NOSOTROS",
            tours: "TOURS",
            shortTours: "TOURS CORTOS",
            schoolTrips: "VIAJES ESCOLARES",
            adventure: "AVENTURA",
            heroTitle1: "Vive la magia de",
            heroTitle2: "Cusco y el Perú",
            heroSubtitle: "Experiencias auténticas diseñadas para aventureros de verdad.",
            shortPre: "EXPERIENCIAS BREVES",
            shortTitle1: "Tours",
            shortTitle2: "Cortos",
            shortDesc: "Descubre lo mejor de Cusco en tours de medio día o un día completo.",
            car1Title: "City Tour Cusco",
            car1Loc: "Cusco - Qorikancha - Sacsayhuamán",
            car1Days: "Medio Día",
            car1Min: "Mín. 2 personas",
            car2Title: "Tour Chinchero, Maras y Moray",
            car2Loc: "Valle Sagrado - Chinchero - Maras",
            car2Days: "Medio Día",
            car2Min: "Mín. 2 personas",
            car3Title: "Tour Valle Sur Cusco",
            car3Loc: "Cusco - Tipón - Pikillaqta - Andahuaylillas",
            car3Days: "Medio Día",
            car3Min: "Mín. 2 personas",
            car4Title: "Tour Valle Sagrado de los Incas",
            car4Loc: "Pisac - Urubamba - Ollantaytambo",
            car4Days: "Full Day",
            car4Min: "Mín. 2 personas",
            details: "Ver detalles",
            exclusivePre: "PAQUETES PREMIUM",
            exclusiveTitle1: "Tours",
            exclusiveTitle2: "exclusivos",
            exclusiveDesc: "Descubre nuestros paquetes exclusivos diseñados para ofrecerte la mejor experiencia en Perú.",
            viewOffer: "Ver Oferta",
            showcasePre: "PAQUETES ESCOLARES 2026",
            showcaseTitle1: "Conoce nuestros",
            showcaseTitle2: "Viajes escolares",
            showcaseDesc: "Desde la majestuosa Machu Picchu hasta la imponente Montaña de 7 Colores, estos recorridos son los favoritos por su calidad y experiencias inolvidables.",
            readMore: "LEER MÁS",
            aventuraPre: "ADVENTURE & EXTREME",
            aventuraTitle1: "Turismo de",
            aventuraTitle2: "Aventura",
            aventuraDesc: "Vive la adrenalina con nuestros tours extremos en Cusco.",
            viewMore: "Ver más",
            mapPre: "NUESTROS DESTINOS",
            mapTitle1: "Explora",
            mapTitle2: "Perú con Nosotros",
            mapDesc: "Descubre los lugares mágicos que te esperan en cada rincón de nuestro país.",
            andinBrand: "Explore Peru Travel",
            andinTitle1: "Agencia de viajes en",
            andinTitle2: "Perú",
            andinSubtitle: "Viajes Personalizados en el Corazón de los Andes",
            andinDesc: "Fundada en 2024, Explore Peru Travel se especializa en diseñar experiencias de viaje a medida, explorando los tesoros menos conocidos de Perú.",
            aboutUs: "Saber más de nosotros",
            comentariosPre: "OPINIONES DE VIAJEROS",
            comentariosTitle1: "Comparte tu",
            comentariosTitle2: "Experiencia",
            comentariosDesc: "Tu opinión es muy importante para nosotros. Deja tu comentario y ayuda a otros viajeros.",
            comentariosFormTitle: "Deja tu comentario",
            comentariosName: "Nombre *",
            comentariosDestination: "Destino visitado *",
            comentariosMessage: "Tu comentario *",
            comentariosRating: "Calificación *",
            comentariosSubmit: "PUBLICAR COMENTARIO",
            testPre: "LO QUE DICEN NUESTROS VIAJEROS",
            testTitle1: "Testimonios",
            testTitle2: "Inspiradores",
            testDesc: "Estamos muy orgullosos de cuidar las experiencias de nuestros pasajeros.",
            test1Text: '"Una experiencia increíble, el equipo hizo que nuestro viaje a Machu Picchu fuera inolvidable."',
            test1Name: "María González",
            test1From: "Viajera de Chile",
            test2Text: '"El tour a la Montaña de 7 Colores fue espectacular. Todo perfectamente organizado."',
            test2Name: "Carlos Ramírez",
            test2From: "Viajero de México",
            test3Text: '"Excelente servicio, muy profesionales. El Camino Inca fue una experiencia única."',
            test3Name: "Laura Fernández",
            test3From: "Viajera de España",
            identidadPre: "IDENTIDAD DE EXPLORE PERU TRAVEL",
            identidadTitle1: "Nuestra",
            identidadTitle2: "Esencia",
            identidadDesc: "El grupo humano a cargo de la operación en Explore Peru Travel tiene valores y ética en los que basa su trabajo.",
            identidadCard1Title: "Experiencias Personalizadas",
            identidadCard1Desc: "Cada viaje es único. Diseñamos itinerarios a medida.",
            identidadCard2Title: "Compromiso Sostenible",
            identidadCard2Desc: "Trabajamos con turismo responsable y sostenible.",
            identidadCard3Title: "Nuestros valores",
            identidadCard3Desc: "Nos guiamos por la honestidad, la responsabilidad y la pasión.",
            identidadCard4Title: "Destinos Imperdibles",
            identidadCard4Desc: "Te llevamos a los lugares más asombrosos de Perú.",
            stat1: "AÑOS DE EXPERIENCIA",
            stat2: "SEGUIDORES",
            stat3: "AVENTURAS PLANEADAS",
            stat4: "CLIENTES FELICES",
            certNote: "Turismo Responsable para prevenir la explotación sexual de niños, niñas y adolescentes.",
            formPre: "CONTACTO",
            formTitle1: "¿Listo para",
            formTitle2: "viajar con nosotros?",
            formDesc: "Completa el formulario y uno de nuestros asesores te contactará a la brevedad.",
            formName: "Nombre completo *",
            formEmail: "Correo electrónico *",
            formPhone: "Teléfono / WhatsApp",
            formDestination: "Destino de interés *",
            formSelectOption: "Selecciona un destino",
            formDate: "Fecha de viaje preferida",
            formMessage: "Mensaje o requisitos especiales",
            formTerms: "Acepto los términos y condiciones *",
            formSubmit: "ENVIAR SOLICITUD",
            formSuccessMsg: "¡Gracias por contactarnos! Te responderemos en menos de 24 horas.",
            expertBadge: "ASISTENCIA PERSONALIZADA",
            expertTitle1: "¿Necesitas consejos?",
            expertTitle2: "¿Un plan de viaje, una pregunta?",
            expertBtnText: "ESCRIBE A NUESTROS EXPERTOS",
            phoneNumber: "📞 +51 930 164 904",
            footerAboutTitle: "QUIENES SOMOS",
            footerAboutUs: "Sobre nosotros",
            footerConditions: "Condiciones de venta",
            footerPayments: "Formas de pago",
            footerMenuTitle: "MENÚ PRINCIPAL",
            footerContactTitle: "CONTÁCTENOS",
            footerAddress: "Urbanización Tito Z-26<br>Wanchag - Cusco",
            footerCopyright: "© 2025 EXPLORE PERU TRAVEL | Agencia de Viajes y Turismo",
            policiesTitle: "POLÍTICAS",
            policy1: "Políticas y Condiciones de Pago",
            policy2: "Protección de Datos Personales",
            policy3: "Prevención de la ESNNA en turismo",
            whatsappTooltip: "¿Necesitas ayuda?",
            tour1: "Paquete Cusco Básico (3 Días / 2 Noches)",
            tour2: "Paquete Cusco Clásico (4 Días / 3 Noches)",
            tour3: "Paquete Cusco Arqueológico (5 Días / 4 Noches)",
            tour4: "Paquete Experiencia Cusco Total (6 Días / 5 Noches)",
            tour5: "Paquete Aventura Extrema: Inka Jungle (4 Días / 3 Noches)",
            tour6: "Paquete Desafío Andino: Salkantay Trek (5 Días / 4 Noches)",
            shortTour1: "City Tour Cusco (Medio Día)",
            shortTour2: "Tour Chinchero, Maras y Moray",
            shortTour3: "Tour Valle Sur Cusco (Medio Día)",
            shortTour4: "Tour Valle Sagrado (Full Day)",
            school1: "🏔️ Ruta Imperial: Arequipa - Cusco - Oxapampa | 6D/5N",
            school2: "🇨🇱 Ruta al Sur: Chile - Santiago | 5D/4N",
            school3: "🇪🇨 Ruta al Norte: Tumbes - Guayaquil | 5D/4N",
            school4: "🏔️ Cusco - Machu Picchu - Selva Cusqueña | 5D/4N",
            school5: "🚂 Cusco - Machu Picchu (Tren Turístico) | 2D/1N",
            school6: "🏜️ Lima - Ica - Huacachina - Paracas | 3D/2N",
            school7: "🌊 Arica - Chile (Puno - Arequipa - Tacna) | 4D/3N",
            school8: "🏝️ Norte Peruano: Chiclayo - Máncora - Ecuador | 6D/5N",
            school9: "🌿 Lima y Oxapampa Aventura | 5D/4N",
            adv1: "Aventura en Cuatrimotos - Maras y Moray",
            adv2: "Vía Ferrata y Zipline en el Valle Sagrado",
            adv3: "Canotaje (Rafting) en el Río Vilcanota",
            adv4: "Bungee Jumping y Slingshot",
            adv5: "Parapente sobre el Valle Sagrado",
            exName1: "Paquete Cusco Básico",
            exName2: "Paquete Cusco Clásico",
            exName3: "Paquete Cusco Arqueológico",
            exName4: "Paquete Experiencia Cusco Total",
            exName5: "Paquete Aventura: Inka Jungle",
            exName6: "Paquete Desafío Andino: Salkantay Trek",
            exDays1: "3 Días / 2 Noches",
            exDays2: "4 Días / 3 Noches",
            exDays3: "5 Días / 4 Noches",
            exDays4: "6 Días / 5 Noches",
            exDays5: "4 Días / 3 Noches",
            exDays6: "5 Días / 4 Noches",
            exMin1: "Mínimo 2 personas",
            exMin2: "Mínimo 2 personas",
            exMin3: "Mínimo 2 personas",
            exMin4: "Mínimo 2 personas",
            exMin5: "Mínimo 2 personas",
            exMin6: "Mínimo 2 personas",
            schoolTitle1: "Ruta Imperial: Arequipa - Cusco - Oxapampa",
            schoolTitle2: "Ruta al Sur: Chile - Santiago",
            schoolTitle3: "Ruta al Norte: Tumbes - Guayaquil",
            schoolTitle4: "Cusco - Machu Picchu - Selva Cusqueña",
            schoolTitle5: "Cusco - Machu Picchu (Tren Turístico)",
            schoolTitle6: "Lima - Ica - Huacachina - Paracas",
            schoolTitle7: "Arica - Chile (Puno - Arequipa - Tacna)",
            schoolTitle8: "Norte Peruano: Chiclayo - Máncora - Ecuador",
            schoolTitle9: "Lima y Oxapampa Aventura",
            schoolLoc1: "Arequipa - Cusco - Oxapampa - Pozuzo",
            schoolLoc2: "Arequipa - Tacna - Arica - Santiago",
            schoolLoc3: "Tumbes - Guayaquil (Ecuador)",
            schoolLoc4: "Cusco - Quillabamba - Santa Teresa",
            schoolLoc5: "Cusco - Valle Sagrado - Machu Picchu",
            schoolLoc6: "Lima - Paracas - Ica",
            schoolLoc7: "Puno - Arequipa - Mollendo - Tacna - Arica",
            schoolLoc8: "Chiclayo - Máncora - Tumbes - Ecuador",
            schoolLoc9: "Lima - Oxapampa - Pozuzo - Valle del Perené",
            schoolDesc1: "Cusco imperial, Valle Sagrado, comunidad Asháninca, cataratas, Pozuzo y selva central.",
            schoolDesc2: "Playas de Chile, Cerro San Cristóbal, teleférico, Parque Bicentenario y tour safari.",
            schoolDesc3: "Manglares, criadero de cocodrilos, Malecón 2000, Cerro Santa Ana y teleférico.",
            schoolDesc4: "Valle Sagrado, Moray, Ollantaytambo, piscinas termales de Cocalmayo y Machu Picchu.",
            schoolDesc5: "Chincheros, Salineras de Maras, cataratas Poc Poc, Ollantaytambo y tren turístico.",
            schoolDesc6: "Real Felipe, Islas Ballestas, Huacachina, dunas, sandboarding y Parque de las Leyendas.",
            schoolDesc7: "Islas Uros, City Tour Arequipa, Monasterio Santa Catalina, playas de Mollendo.",
            schoolDesc8: "Manglares de Tumbes, playas, nado con tortugas, paseo en lancha y frontera con Ecuador.",
            schoolDesc9: "Centro de Lima, Pozuzo, comunidad Asháninca, cataratas, y selva central.",
            schoolDays1: "6 Días / 5 Noches",
            schoolDays2: "5 Días / 4 Noches",
            schoolDays3: "5 Días / 4 Noches",
            schoolDays4: "5 Días / 4 Noches",
            schoolDays5: "2 Días / 1 Noche",
            schoolDays6: "3 Días / 2 Noches",
            schoolDays7: "4 Días / 3 Noches",
            schoolDays8: "6 Días / 5 Noches",
            schoolDays9: "5 Días / 4 Noches",
            schoolMin1: "Min. 28 Pers.",
            schoolMin2: "Min. 28 Pers.",
            schoolMin3: "Min. 28 Pers.",
            schoolMin4: "Min. 28 Pers.",
            schoolMin5: "Min. 28 Pers.",
            schoolMin6: "Min. 28 Pers.",
            schoolMin7: "Min. 28 Pers.",
            schoolMin8: "Min. 28 Pers.",
            schoolMin9: "Min. 28 Pers.",
            advTitle1: "Aventura en Cuatrimotos",
            advTitle2: "Vía Ferrata y Zipline",
            advTitle3: "Canotaje (Rafting)",
            advTitle4: "Bungee Jumping",
            advDesc1: "Recorre Maras y Moray en un emocionante paseo en ATV.",
            advDesc2: "Ascenso vertical y vuelo en tirolesa en el Valle Sagrado.",
            advDesc3: "Aguas rápidas del río Vilcanota para los más atrevidos.",
            advDesc4: "Salta al vacío desde el puente más alto de Cusco.",
            dest1: "Cusco / Machu Picchu",
            dest2: "Lima / Paracas / Ica",
            dest3: "Norte Peruano",
            dest4: "Selva Central",
            dest5: "Arequipa / Puno",
            destCusco: "Cusco / Machu Picchu",
            destLima: "Lima / Paracas / Ica",
            destNorte: "Norte Peruano",
            destSelva: "Selva Central",
            destInternacional: "Viaje Internacional"
        },
        en: {
            contact: "Contact Us",
            testimonials: "Testimonials",
            explore: "Explore Peru Travel",
            schedule: "Mon - Sat; 09:00 - 19:00 hrs",
            askNow: "ASK NOW",
            home: "HOME",
            about: "ABOUT US",
            tours: "TOURS",
            shortTours: "SHORT TOURS",
            schoolTrips: "SCHOOL TRIPS",
            adventure: "ADVENTURE",
            heroTitle1: "Live the magic of",
            heroTitle2: "Cusco and Peru",
            heroSubtitle: "Authentic experiences designed for true adventurers.",
            shortPre: "SHORT EXPERIENCES",
            shortTitle1: "Short",
            shortTitle2: "Tours",
            shortDesc: "Discover the best of Cusco in half-day or full-day tours.",
            car1Title: "Cusco City Tour",
            car1Loc: "Cusco - Qorikancha - Sacsayhuaman",
            car1Days: "Half Day",
            car1Min: "Min. 2 people",
            car2Title: "Chinchero, Maras & Moray Tour",
            car2Loc: "Sacred Valley - Chinchero - Maras",
            car2Days: "Half Day",
            car2Min: "Min. 2 people",
            car3Title: "Cusco South Valley Tour",
            car3Loc: "Cusco - Tipón - Pikillaqta - Andahuaylillas",
            car3Days: "Half Day",
            car3Min: "Min. 2 people",
            car4Title: "Sacred Valley of the Incas Tour",
            car4Loc: "Pisac - Urubamba - Ollantaytambo",
            car4Days: "Full Day",
            car4Min: "Min. 2 people",
            details: "View details",
            exclusivePre: "PREMIUM PACKAGES",
            exclusiveTitle1: "Exclusive",
            exclusiveTitle2: "Tours",
            exclusiveDesc: "Discover our exclusive packages designed to offer you the best experience in Peru.",
            viewOffer: "View Offer",
            showcasePre: "SCHOOL PACKAGES 2026",
            showcaseTitle1: "Discover our",
            showcaseTitle2: "School Trips",
            showcaseDesc: "From majestic Machu Picchu to the impressive Rainbow Mountain, these tours are favorites for their quality and unforgettable experiences.",
            readMore: "READ MORE",
            aventuraPre: "ADVENTURE & EXTREME",
            aventuraTitle1: "Adventure",
            aventuraTitle2: "Tourism",
            aventuraDesc: "Experience the adrenaline with our extreme tours in Cusco.",
            viewMore: "View more",
            mapPre: "OUR DESTINATIONS",
            mapTitle1: "Explore",
            mapTitle2: "Peru with Us",
            mapDesc: "Discover the magical places that await you in every corner of our country.",
            andinBrand: "Explore Peru Travel",
            andinTitle1: "Travel Agency in",
            andinTitle2: "Peru",
            andinSubtitle: "Personalized Travel in the Heart of the Andes",
            andinDesc: "Founded in 2024, Explore Peru Travel specializes in designing customized travel experiences, exploring Peru's lesser-known treasures.",
            aboutUs: "Learn more about us",
            comentariosPre: "TRAVELER REVIEWS",
            comentariosTitle1: "Share your",
            comentariosTitle2: "Experience",
            comentariosDesc: "Your opinion is very important to us. Leave your comment and help other travelers.",
            comentariosFormTitle: "Leave your comment",
            comentariosName: "Name *",
            comentariosDestination: "Destination visited *",
            comentariosMessage: "Your comment *",
            comentariosRating: "Rating *",
            comentariosSubmit: "PUBLISH COMMENT",
            testPre: "WHAT OUR TRAVELERS SAY",
            testTitle1: "Inspiring",
            testTitle2: "Testimonials",
            testDesc: "We are very proud to take care of our passengers' experiences from start to finish.",
            test1Text: '"An incredible experience, the team made our trip to Machu Picchu unforgettable."',
            test1Name: "María González",
            test1From: "Traveler from Chile",
            test2Text: '"The Rainbow Mountain tour was spectacular. Everything perfectly organized."',
            test2Name: "Carlos Ramírez",
            test2From: "Traveler from Mexico",
            test3Text: '"Excellent service, very professional. The Inca Trail was a unique experience."',
            test3Name: "Laura Fernández",
            test3From: "Traveler from Spain",
            identidadPre: "IDENTITY OF EXPLORE PERU TRAVEL",
            identidadTitle1: "Our",
            identidadTitle2: "Essence",
            identidadDesc: "The human team behind the operation at Explore Peru Travel has values and ethics that guide their work.",
            identidadCard1Title: "Personalized Experiences",
            identidadCard1Desc: "Every journey is unique. We design custom itineraries.",
            identidadCard2Title: "Sustainable Commitment",
            identidadCard2Desc: "We work with responsible and sustainable tourism.",
            identidadCard3Title: "Our Values",
            identidadCard3Desc: "We are guided by honesty, responsibility, and passion.",
            identidadCard4Title: "Must-See Destinations",
            identidadCard4Desc: "We take you to the most amazing places in Peru.",
            stat1: "YEARS OF EXPERIENCE",
            stat2: "FOLLOWERS",
            stat3: "ADVENTURES PLANNED",
            stat4: "HAPPY CLIENTS",
            certNote: "Responsible Tourism to prevent the sexual exploitation of children and adolescents.",
            formPre: "CONTACT",
            formTitle1: "Ready to",
            formTitle2: "travel with us?",
            formDesc: "Fill out the form and one of our advisors will contact you shortly.",
            formName: "Full name *",
            formEmail: "Email address *",
            formPhone: "Phone / WhatsApp",
            formDestination: "Destination of interest *",
            formSelectOption: "Select a destination",
            formDate: "Preferred travel date",
            formMessage: "Message or special requirements",
            formTerms: "I accept the terms and conditions *",
            formSubmit: "SEND REQUEST",
            formSuccessMsg: "Thank you for contacting us! We will reply within 24 hours.",
            expertBadge: "PERSONALIZED ASSISTANCE",
            expertTitle1: "Need advice?",
            expertTitle2: "A travel plan, a question?",
            expertBtnText: "WRITE TO OUR EXPERTS",
            phoneNumber: "📞 +51 930 164 904",
            footerAboutTitle: "ABOUT US",
            footerAboutUs: "About us",
            footerConditions: "Terms and conditions",
            footerPayments: "Payment methods",
            footerMenuTitle: "MAIN MENU",
            footerContactTitle: "CONTACT US",
            footerAddress: "Urbanización Tito Z-26<br>Wanchag - Cusco",
            footerCopyright: "© 2025 EXPLORE PERU TRAVEL | Travel and Tourism Agency",
            policiesTitle: "POLICIES",
            policy1: "Payment Policies and Conditions",
            policy2: "Personal Data Protection",
            policy3: "Prevention of ESNNA in tourism",
            whatsappTooltip: "Need help?",
            tour1: "Cusco Basic Package (3 Days / 2 Nights)",
            tour2: "Cusco Classic Package (4 Days / 3 Nights)",
            tour3: "Cusco Archaeological Package (5 Days / 4 Nights)",
            tour4: "Cusco Total Experience Package (6 Days / 5 Nights)",
            tour5: "Extreme Adventure: Inka Jungle Package (4 Days / 3 Nights)",
            tour6: "Andean Challenge: Salkantay Trek Package (5 Days / 4 Nights)",
            shortTour1: "Cusco City Tour (Half Day)",
            shortTour2: "Chinchero, Maras and Moray Tour",
            shortTour3: "Cusco South Valley Tour (Half Day)",
            shortTour4: "Sacred Valley Tour (Full Day)",
            school1: "🏔️ Imperial Route: Arequipa - Cusco - Oxapampa | 6D/5N",
            school2: "🇨🇱 Southern Route: Chile - Santiago | 5D/4N",
            school3: "🇪🇨 Northern Route: Tumbes - Guayaquil | 5D/4N",
            school4: "🏔️ Cusco - Machu Picchu - Cusco Jungle | 5D/4N",
            school5: "🚂 Cusco - Machu Picchu (Tourist Train) | 2D/1N",
            school6: "🏜️ Lima - Ica - Huacachina - Paracas | 3D/2N",
            school7: "🌊 Arica - Chile (Puno - Arequipa - Tacna) | 4D/3N",
            school8: "🏝️ Northern Peru: Chiclayo - Máncora - Ecuador | 6D/5N",
            school9: "🌿 Lima and Oxapampa Adventure | 5D/4N",
            adv1: "ATV Adventure - Maras and Moray",
            adv2: "Via Ferrata and Zipline in Sacred Valley",
            adv3: "Rafting on Vilcanota River",
            adv4: "Bungee Jumping and Slingshot",
            adv5: "Paragliding over Sacred Valley",
            exName1: "Cusco Basic Package",
            exName2: "Cusco Classic Package",
            exName3: "Cusco Archaeological Package",
            exName4: "Cusco Total Experience",
            exName5: "Adventure Package: Inka Jungle",
            exName6: "Andean Challenge: Salkantay Trek",
            exDays1: "3 Days / 2 Nights",
            exDays2: "4 Days / 3 Nights",
            exDays3: "5 Days / 4 Nights",
            exDays4: "6 Days / 5 Nights",
            exDays5: "4 Days / 3 Nights",
            exDays6: "5 Days / 4 Nights",
            exMin1: "Minimum 2 people",
            exMin2: "Minimum 2 people",
            exMin3: "Minimum 2 people",
            exMin4: "Minimum 2 people",
            exMin5: "Minimum 2 people",
            exMin6: "Minimum 2 people",
            schoolTitle1: "Imperial Route: Arequipa - Cusco - Oxapampa",
            schoolTitle2: "Southern Route: Chile - Santiago",
            schoolTitle3: "Northern Route: Tumbes - Guayaquil",
            schoolTitle4: "Cusco - Machu Picchu - Cusco Jungle",
            schoolTitle5: "Cusco - Machu Picchu (Tourist Train)",
            schoolTitle6: "Lima - Ica - Huacachina - Paracas",
            schoolTitle7: "Arica - Chile (Puno - Arequipa - Tacna)",
            schoolTitle8: "Northern Peru: Chiclayo - Máncora - Ecuador",
            schoolTitle9: "Lima and Oxapampa Adventure",
            schoolLoc1: "Arequipa - Cusco - Oxapampa - Pozuzo",
            schoolLoc2: "Arequipa - Tacna - Arica - Santiago",
            schoolLoc3: "Tumbes - Guayaquil (Ecuador)",
            schoolLoc4: "Cusco - Quillabamba - Santa Teresa",
            schoolLoc5: "Cusco - Sacred Valley - Machu Picchu",
            schoolLoc6: "Lima - Paracas - Ica",
            schoolLoc7: "Puno - Arequipa - Mollendo - Tacna - Arica",
            schoolLoc8: "Chiclayo - Máncora - Tumbes - Ecuador",
            schoolLoc9: "Lima - Oxapampa - Pozuzo - Perené Valley",
            schoolDesc1: "Imperial Cusco, Sacred Valley, Asháninca community, waterfalls, Pozuzo and central jungle.",
            schoolDesc2: "Chilean beaches, San Cristóbal Hill, cable car, Bicentennial Park and safari tour.",
            schoolDesc3: "Mangroves, crocodile farm, Malecón 2000, Santa Ana Hill and cable car.",
            schoolDesc4: "Sacred Valley, Moray, Ollantaytambo, Cocalmayo hot springs and Machu Picchu.",
            schoolDesc5: "Chincheros, Maras Salt Mines, Poc Poc waterfalls, Ollantaytambo and tourist train.",
            schoolDesc6: "Real Felipe, Ballestas Islands, Huacachina, dunes, sandboarding and Parque de las Leyendas.",
            schoolDesc7: "Uros Islands, Arequipa City Tour, Santa Catalina Monastery, Mollendo beaches.",
            schoolDesc8: "Tumbes mangroves, beaches, turtle swimming, boat ride and Ecuador border.",
            schoolDesc9: "Downtown Lima, Pozuzo, Asháninca community, waterfalls, and central jungle.",
            schoolDays1: "6 Days / 5 Nights",
            schoolDays2: "5 Days / 4 Nights",
            schoolDays3: "5 Days / 4 Nights",
            schoolDays4: "5 Days / 4 Nights",
            schoolDays5: "2 Days / 1 Night",
            schoolDays6: "3 Days / 2 Nights",
            schoolDays7: "4 Days / 3 Nights",
            schoolDays8: "6 Days / 5 Nights",
            schoolDays9: "5 Days / 4 Nights",
            schoolMin1: "Min. 28 Pers.",
            schoolMin2: "Min. 28 Pers.",
            schoolMin3: "Min. 28 Pers.",
            schoolMin4: "Min. 28 Pers.",
            schoolMin5: "Min. 28 Pers.",
            schoolMin6: "Min. 28 Pers.",
            schoolMin7: "Min. 28 Pers.",
            schoolMin8: "Min. 28 Pers.",
            schoolMin9: "Min. 28 Pers.",
            advTitle1: "ATV Adventure",
            advTitle2: "Via Ferrata and Zipline",
            advTitle3: "White Water Rafting",
            advTitle4: "Bungee Jumping",
            advDesc1: "Explore Maras and Moray on an exciting ATV ride.",
            advDesc2: "Vertical ascent and zip line flight in the Sacred Valley.",
            advDesc3: "Rapid waters of the Vilcanota River for the daring.",
            advDesc4: "Jump into the void from the highest bridge in Cusco.",
            dest1: "Cusco / Machu Picchu",
            dest2: "Lima / Paracas / Ica",
            dest3: "Northern Peru",
            dest4: "Central Jungle",
            dest5: "Arequipa / Puno",
            destCusco: "Cusco / Machu Picchu",
            destLima: "Lima / Paracas / Ica",
            destNorte: "Northern Peru",
            destSelva: "Central Jungle",
            destInternacional: "International Trip"
        }
    };

    let currentLang = localStorage.getItem('preferredLang') || 'es';

    // ¡CORREGIDO! Ya no se romperán los iconos <i> de la barra de navegación.
    function applyTranslations(lang) {
        document.querySelectorAll('[data-key]').forEach(el => {
            const key = el.getAttribute('data-key');
            const translation = translations[lang]?.[key];
            if (translation) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    if (el.type !== 'checkbox' && el.type !== 'hidden') {
                        el.placeholder = translation;
                    }
                } else if (el.tagName === 'SELECT') {
                    const option = el.querySelector('option[value=""]');
                    if (option) option.textContent = translation;
                } else if (el.tagName === 'IMG') {
                    el.setAttribute('alt', translation);
                } else {
                    let hasChildren = el.children.length > 0;
                    if (hasChildren) {
                        let textNodeUpdated = false;
                        for (let node of el.childNodes) {
                            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
                                if (!textNodeUpdated) {
                                    node.textContent = translation + ' ';
                                    textNodeUpdated = true;
                                } else {
                                    node.textContent = '';
                                }
                            }
                        }
                        if (!textNodeUpdated) {
                            el.insertAdjacentText('afterbegin', translation + ' ');
                        }
                    } else {
                        el.textContent = translation;
                    }
                }
            }
        });

        currentLang = lang;
        localStorage.setItem('preferredLang', lang);

        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
        });
    }

    const langBtns = document.querySelectorAll('.lang-btn');
    if (langBtns.length > 0) {
        langBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const lang = btn.getAttribute('data-lang');
                applyTranslations(lang);
            });
        });
    }

    applyTranslations(currentLang);

    // ========== FAB WHATSAPP ANIMATION ==========
    const fab = document.querySelector('.fab-whatsapp');
    if (fab && typeof gsap !== 'undefined') {
        gsap.from(fab, {
            scale: 0,
            rotation: 360,
            duration: 0.6,
            delay: 2,
            ease: "back.out(1.5)"
        });
    }

    console.log('✅ Index - Script cargado correctamente y libre de errores');
});