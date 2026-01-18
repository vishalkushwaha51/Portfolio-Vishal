// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    

    // Check local storage for theme preference
    if (localStorage.getItem('theme') === 'dark') enableDarkMode();


    // --- EMAILJS CONTACT FORM ---
    emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your real Public Key

    const contactForm = document.getElementById('contactForm');
    const statusDiv = document.getElementById('formStatus');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = document.getElementById('submitBtn');
        btn.innerText = 'Sending...';
        btn.disabled = true;

        const params = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', params)
            .then(() => {
                statusDiv.innerText = 'Message sent successfully! ✅';
                statusDiv.className = 'mt-4 text-green-600 font-bold';
                statusDiv.classList.remove('hidden');
                contactForm.reset();
            })
            .catch((err) => {
                statusDiv.innerText = 'Failed to send. Please try again. ❌';
                statusDiv.className = 'mt-4 text-red-600 font-bold';
                statusDiv.classList.remove('hidden');
                console.error(err);
            })
            .finally(() => {
                btn.innerText = 'Send Message';
                btn.disabled = false;
            });
    });

    // --- MODAL LOGIC ---
    window.openModal = (src) => {
        const modal = document.getElementById('modal');
        const modalImg = document.getElementById('modalImage');
        modalImg.src = src;
        modal.classList.add('active');
    };

    document.getElementById('modal').addEventListener('click', function() {
        this.classList.remove('active');
    });

});
function openProjectPreview(url) {
    const modal = document.getElementById('projectModal');
    const frame = document.getElementById('projectFrame');
    const urlDisplay = document.getElementById('modalProjectUrl');
    
    urlDisplay.innerText = url;
    frame.src = url;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Scroll disable
}

function closeProjectPreview() {
    const modal = document.getElementById('projectModal');
    const frame = document.getElementById('projectFrame');
    
    modal.classList.remove('active');
    frame.src = ''; // Performance ke liye iframe clear karein
    document.body.style.overflow = 'auto'; // Scroll enable
}

// Esc key se modal band ho jaye
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectPreview();
});
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    // Toggle Menu
    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('active');
        // Icon change (Bars to X)
        const icon = menuBtn.querySelector('i');
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
    });

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
            menuBtn.querySelector('i').classList.add('fa-bars');
            menuBtn.querySelector('i').classList.remove('fa-times');
        });
    });
});
// Hardware Back Button handle karne ke liye (Android/Mobile browsers)
window.onpopstate = function() {
    const modal = document.getElementById('projectModal');
    if (modal.classList.contains('active')) {
        closeProjectPreview();
    }
};

