document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }

    // Set min date for date input to today
    const dateInput = document.getElementById('date');
    if(dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Modal Handling
    const ownerModal = document.getElementById('owner-modal');
    const sitterModal = document.getElementById('sitter-modal');
    const legalModal = document.getElementById('legal-modal');
    const adminModal = document.getElementById('admin-modal');
    
    const profileBtn = document.querySelector('.profile-btn');
    const ctaBtn = document.getElementById('cta-btn');
    const legalLinks = document.querySelectorAll('.legal-link');
    const adminLink = document.querySelector('.admin-link');

    const openModal = (modal) => {
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    const closeModal = (modal) => {
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    };
    
    profileBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(ownerModal);
    });

    ctaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(sitterModal);
    });

    legalLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openModal(legalModal);
        });
    });

    adminLink.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(adminModal);
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            closeModal(btn.closest('.modal-overlay'));
        });
    });

    // Sitter form conditional fields
    const guarderiaCheckbox = document.getElementById('service-guarderia');
    const peluqueriaCheckbox = document.getElementById('service-peluqueria');
    const guarderiaFields = document.getElementById('guarderia-fields');
    const peluqueriaFields = document.getElementById('peluqueria-fields');

    if (guarderiaCheckbox && guarderiaFields) {
        guarderiaCheckbox.addEventListener('change', () => {
            guarderiaFields.classList.toggle('hidden', !guarderiaCheckbox.checked);
        });
    }
    if (peluqueriaCheckbox && peluqueriaFields) {
        peluqueriaCheckbox.addEventListener('change', () => {
            peluqueriaFields.classList.toggle('hidden', !peluqueriaCheckbox.checked);
        });
    }

    // Custom File Input
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', (e) => {
            const fileName = e.target.files[0] ? e.target.files[0].name : 'Ningún archivo seleccionado';
            const fileNameDisplay = e.target.closest('.file-input-wrapper').querySelector('.file-name');
            if (fileNameDisplay) {
                if (e.target.files.length > 1) {
                    fileNameDisplay.textContent = `${e.target.files.length} archivos seleccionados`;
                } else {
                    fileNameDisplay.textContent = e.target.files[0] ? e.target.files[0].name : 'Ningún archivo seleccionado';
                }
            }
        });
    });

    // Add another pet form
    const addPetBtn = document.getElementById('add-pet-btn');
    const petsContainer = document.getElementById('pets-container');
    let petCount = 1;

    if (addPetBtn && petsContainer) {
        addPetBtn.addEventListener('click', () => {
            petCount++;
            const newPetForm = document.createElement('div');
            newPetForm.classList.add('pet-form-fields');
            newPetForm.innerHTML = `
                <hr>
                <h4>Mascota ${petCount}</h4>
                <div class="form-group">
                    <label for="pet-photo-${petCount}">Foto de tu mascota</label>
                    <div class="file-input-wrapper">
                        <label for="pet-photo-${petCount}" class="file-label">Seleccionar archivo</label>
                        <input type="file" id="pet-photo-${petCount}" name="pet-photo[]" accept="image/*" required>
                        <span class="file-name">Ningún archivo seleccionado</span>
                    </div>
                </div>
                <div class="form-group">
                    <label for="pet-name-${petCount}">Nombre de la mascota</label>
                    <input type="text" id="pet-name-${petCount}" name="pet-name[]" placeholder="Ej: Rocky" required>
                </div>
                <div class="form-group">
                    <label for="pet-breed-${petCount}">Raza</label>
                    <input type="text" id="pet-breed-${petCount}" name="pet-breed[]" placeholder="Ej: Mestizo" required>
                </div>
                <div class="form-group-inline">
                    <div class="form-group">
                        <label for="pet-gender-${petCount}">Sexo</label>
                        <select id="pet-gender-${petCount}" name="pet-gender[]" required>
                            <option value="" disabled selected>Selecciona el sexo</option>
                            <option value="macho">Macho</option>
                            <option value="hembra">Hembra</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="pet-age-${petCount}">Edad (años)</label>
                        <input type="number" id="pet-age-${petCount}" name="pet-age[]" placeholder="Ej: 3" min="0" required>
                    </div>
                </div>
            `;
            petsContainer.appendChild(newPetForm);

            // Re-attach event listeners for new file inputs
             newPetForm.querySelectorAll('input[type="file"]').forEach(input => {
                input.addEventListener('change', (e) => {
                    const fileName = e.target.files[0] ? e.target.files[0].name : 'Ningún archivo seleccionado';
                    const fileNameDisplay = e.target.closest('.file-input-wrapper').querySelector('.file-name');
                     if (fileNameDisplay) {
                        fileNameDisplay.textContent = fileName;
                    }
                });
            });
        });
    }

    // Prevent form submission for demo
    document.querySelectorAll('.modal-content form').forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('¡Gracias! Tu información ha sido enviada.');
            closeModal(form.closest('.modal-overlay'));
        });
    });

    // Admin form
    const adminForm = document.getElementById('admin-form');
    if (adminForm) {
        adminForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const password = adminForm.querySelector('#admin-password').value;
            if (password === 'admin123') { // Simple hardcoded password for demo
                alert('Acceso concedido.');
                closeModal(adminModal);
                // Here you would redirect to an admin panel or unlock admin features
            } else {
                alert('Clave incorrecta.');
            }
             adminForm.reset();
        });
    }

    // Search and booking simulation
    const searchForm = document.querySelector('.search-box form');
    const searchResultsSection = document.getElementById('search-results');
    const resultsGrid = document.getElementById('results-grid');
    const bookingModal = document.getElementById('booking-modal');

    const fakeResults = [
        { name: 'Ana', service: 'Paseadora de Perros', price: 15, rating: '★★★★☆', desc: 'Paseos divertidos y seguros por la zona norte. ¡Tu perro volverá feliz y cansado!' },
        { name: 'Guardería Patitas', service: 'Guardería de Mascotas', price: 50, rating: '★★★★★', desc: 'Casa con patio grande y seguro. Cuidado responsable y mucho amor para tu mascota.' },
        { name: 'Estilo Canino', service: 'Peluquería de Mascotas', price: 40, rating: '★★★★☆', desc: 'Servicios completos de baño, corte y estética. Dejamos a tu amigo peludo luciendo genial.' },
        { name: 'Carlos', service: 'Paseador de Perros', price: 12, rating: '★★★★★', desc: 'Amante de los animales con experiencia en perros de todas las razas y tamaños.' }
    ];

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            resultsGrid.innerHTML = ''; // Clear previous results
            
            fakeResults.forEach(result => {
                const resultCard = document.createElement('div');
                resultCard.classList.add('result-card');
                resultCard.innerHTML = `
                    <h3>${result.name}</h3>
                    <p><em>${result.service}</em></p>
                    <div class="rating">${result.rating}</div>
                    <p>${result.desc}</p>
                    <div class="price">$${result.price} / hora</div>
                    <button class="btn-primary book-btn" data-name="${result.name}" data-price="${result.price}" data-service="${result.service}">Reservar</button>
                `;
                resultsGrid.appendChild(resultCard);
            });
            
            searchResultsSection.classList.remove('hidden');
            searchResultsSection.scrollIntoView({ behavior: 'smooth' });

            // Add event listeners to new book buttons
            document.querySelectorAll('.book-btn').forEach(btn => {
                btn.addEventListener('click', () => openBookingModal(btn.dataset));
            });
        });
    }

    function openBookingModal(data) {
        const { name, price, service } = data;
        const fee = (price * 0.05).toFixed(2);
        const total = (parseFloat(price) + parseFloat(fee)).toFixed(2);
        
        document.getElementById('booking-details').innerHTML = `
            <p><strong>Servicio:</strong> ${service}</p>
            <p><strong>Proveedor:</strong> ${name}</p>
        `;
        document.getElementById('booking-subtotal').textContent = `$${price}`;
        document.getElementById('booking-fee').textContent = `$${fee}`;
        document.getElementById('booking-total').textContent = `$${total}`;

        openModal(bookingModal);
    }

    const payBtn = document.getElementById('pay-btn');
    if (payBtn) {
        payBtn.addEventListener('click', () => {
            alert('Serás redirigido a Mercado Pago para completar la transacción. (Simulación)');
            closeModal(bookingModal);
        });
    }
});