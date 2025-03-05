document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filters = document.querySelectorAll('.filter-item');
    const items = document.querySelectorAll('.gallery-item');
    const sections = document.querySelectorAll('.gallery-category-title');

    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Update active state
            filters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');

            const category = this.getAttribute('data-filter');

            // Show/hide items
            items.forEach(item => {
                if (category === 'all' || item.classList.contains(category)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });

            // Show/hide section titles
            sections.forEach(section => {
                if (category === 'all' || section.classList.contains(category + '-section')) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    // Gallery Modal
    const modal = document.querySelector('.gallery-modal');
    const modalImg = document.getElementById('gallery-modal-img');
    const closeBtn = document.querySelector('.gallery-close');
    const prevBtn = document.querySelector('.gallery-prev');
    const nextBtn = document.querySelector('.gallery-next');
    let currentCategory = '';
    let currentIndex = 0;
    let images = [];

    // Open modal
    document.querySelectorAll('.gallery-popup').forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const imgSrc = this.getAttribute('href');
            currentCategory = this.getAttribute('data-category');
            images = Array.from(document.querySelectorAll(`.gallery-popup[data-category="${currentCategory}"]`))
                .map(a => a.getAttribute('href'));
            currentIndex = images.indexOf(imgSrc);
            
            modalImg.src = imgSrc;
            modal.style.display = 'block';
        });
    });

    // Close modal
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Navigation
    prevBtn.onclick = function() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImg.src = images[currentIndex];
    }

    nextBtn.onclick = function() {
        currentIndex = (currentIndex + 1) % images.length;
        modalImg.src = images[currentIndex];
    }

    // Close on outside click
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    }
});