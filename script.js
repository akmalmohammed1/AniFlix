document.addEventListener('DOMContentLoaded', function() {
    const genreModalEl = document.getElementById('genreModal');
    if (genreModalEl) {
        const genreModal = new bootstrap.Modal(genreModalEl);
        
        document.querySelectorAll('.browse-genres').forEach(btn => {
            btn.addEventListener('click', () => genreModal.show());
        });

        genreModalEl.addEventListener('mouseenter', function(e) {
            const card = e.target.closest('.anime-card');
            if (card) {
                card.style.transform = 'translateY(-5px)';
                card.style.boxShadow = '0 10px 20px rgba(235, 87, 87, 0.3)';
                const watchBtn = card.querySelector('.watch-btn');
                if (watchBtn) watchBtn.style.opacity = '1';
            }
        }, true);

        genreModalEl.addEventListener('mouseleave', function(e) {
            const card = e.target.closest('.anime-card');
            if (card) {
                card.style.transform = '';
                card.style.boxShadow = '';
                const watchBtn = card.querySelector('.watch-btn');
                if (watchBtn) watchBtn.style.opacity = '0';
            }
        }, true);

        genreModalEl.addEventListener('click', function(e) {
            if (e.target.closest('.watch-btn')) {
                e.preventDefault();
                const animeTitle = e.target.closest('.anime-card').querySelector('.card-title').textContent;
                console.log(`Play ${animeTitle}`);
            }
        });
    }

    const watchButton = document.querySelector('.browse-genres');
    if (watchButton) {
        watchButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.backgroundColor = '#b81d24';
        });
        watchButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.backgroundColor = '#e50914';
        });
    }

    const feedbackForm = document.getElementById('feedbackForm');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const message = this.querySelector('[name="message"]').value.trim();
            
            if (!message) {
                alert('Please enter your feedback message');
                return;
            }

            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success mt-3';
            successAlert.textContent = 'Thank you for your feedback!';
            this.parentNode.insertBefore(successAlert, this.nextSibling);
            this.reset();
            setTimeout(() => successAlert.remove(), 3000);
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.className = 'btn btn-danger back-to-top';
    backToTop.style.cssText = 'position:fixed;bottom:20px;right:20px;display:none;z-index:1000';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        backToTop.style.display = window.scrollY > 500 ? 'block' : 'none';
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});