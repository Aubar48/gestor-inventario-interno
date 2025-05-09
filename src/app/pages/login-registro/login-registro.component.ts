import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-registro',
  imports: [CommonModule, RouterModule],
  templateUrl: './login-registro.component.html',
  styleUrl: './login-registro.component.css'
})
export class LoginRegistroComponent {
 // Demo user credentials
 const DEMO_USER = {
    email: 'demo@inventariopro.com',
    password: 'demo123'
};


// Sample products data
const sampleProducts = [
    {
        id: 1,
        name: 'Laptop HP EliteBook',
        category: 'Electrónicos',
        stock: 15,
        price: 1200,
        description: 'Laptop empresarial con procesador i7 y 16GB RAM'
    },
    {
        id: 2,
        name: 'Monitor 24" Dell',
        category: 'Electrónicos',
        stock: 8,
        price: 250,
        description: 'Monitor Full HD con conexión HDMI y DisplayPort'
    },
    {
        id: 3,
        name: 'Silla de oficina ergonómica',
        category: 'Oficina',
        stock: 4,
        price: 180,
        description: 'Silla ajustable con soporte lumbar'
    },
    {
        id: 4,
        name: 'Café en grano Colombia',
        category: 'Alimentos',
        stock: 22,
        price: 12,
        description: 'Café 100% colombiano tostado medio'
    },
    {
        id: 5,
        name: 'Camisa de vestir blanca',
        category: 'Ropa',
        stock: 0,
        price: 45,
        description: 'Camisa de algodón 100%, talla M'
    }
];


       

        // DOM Elements
        const authContainer = document.getElementById('auth-container');
        const appContainer = document.getElementById('app-container');
        const authForm = document.getElementById('auth-form');
        const authTitle = document.getElementById('auth-title');
        const toggleAuth = document.getElementById('toggle-auth');
        const nameField = document.getElementById('name-field');
        const loginOptions = document.getElementById('login-options');
        const demoLoginBtn = document.getElementById('demo-login');
        const logoutBtn = document.getElementById('logout-btn');
        const toggleSidebar = document.getElementById('toggle-sidebar');
        const sidebar = document.getElementById('sidebar');
        const logoText = document.getElementById('logo-text');
        const userInfo = document.getElementById('user-info');
        const mainContent = document.getElementById('main-content');
        const productsTableBody = document.getElementById('products-table-body');
        const productModal = document.getElementById('product-modal');
        const modalTitle = document.getElementById('modal-title');
        const productForm = document.getElementById('product-form');
        const saveProductBtn = document.getElementById('save-product');
        const cancelProductBtn = document.getElementById('cancel-product');

        // Chart instances
        let inventoryChart, trendsChart;

        // App state
        let isLoginForm = true;
        let isSidebarCollapsed = false;
        let products = [...sampleProducts];
        let editingProductId = null;

        // Initialize the app
        function initApp() {
            // Check if user is already logged in (from localStorage)
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

            if (isLoggedIn) {
                showApp();
            } else {
                showAuth();
            }

            setupEventListeners();
            renderProductsTable();
            initCharts();
        }

        // Show authentication forms
        function showAuth() {
            authContainer.classList.remove('hidden');
            appContainer.classList.add('hidden');
        }

        // Show the main app
        function showApp() {
            authContainer.classList.add('hidden');
            appContainer.classList.remove('hidden');
        }

        // Setup all event listeners
        function setupEventListeners() {
            // Toggle between login and register forms
            toggleAuth.addEventListener('click', (e) => {
                e.preventDefault();
                isLoginForm = !isLoginForm;

                if (isLoginForm) {
                    authTitle.textContent = 'Iniciar sesión en InventarioPro';
                    toggleAuth.textContent = 'crear una nueva cuenta';
                    nameField.classList.add('hidden');
                    loginOptions.classList.remove('hidden');
                } else {
                    authTitle.textContent = 'Crear una cuenta en InventarioPro';
                    toggleAuth.textContent = 'iniciar sesión';
                    nameField.classList.remove('hidden');
                    loginOptions.classList.add('hidden');
                }
            });

            // Auth form submission
            authForm.addEventListener('submit', (e) => {
                e.preventDefault();

                const email = document.getElementById('email').value;
                const password = document.getElementById('password').value;

                // Simple validation
                if (!email || !password) {
                    alert('Por favor ingresa email y contraseña');
                    return;
                }

                // In a real app, you would validate with your backend here
                // For demo purposes, we'll just log the user in
                localStorage.setItem('isLoggedIn', 'true');
                showApp();
            });

            // Demo login
            demoLoginBtn.addEventListener('click', () => {
                document.getElementById('email').value = DEMO_USER.email;
                document.getElementById('password').value = DEMO_USER.password;

                // Simulate form submission
                setTimeout(() => {
                    localStorage.setItem('isLoggedIn', 'true');
                    showApp();
                }, 500);
            });

            // Logout
            logoutBtn.addEventListener('click', () => {
                localStorage.removeItem('isLoggedIn');
                showAuth();
            });

            // Toggle sidebar
            toggleSidebar.addEventListener('click', () => {
                isSidebarCollapsed = !isSidebarCollapsed;

                if (isSidebarCollapsed) {
                    sidebar.classList.remove('sidebar-expanded');
                    sidebar.classList.add('sidebar-collapsed');
                    logoText.classList.add('hidden');
                    userInfo.classList.add('hidden');
                    mainContent.style.marginLeft = '70px';

                    // Hide text in nav items
                    document.querySelectorAll('#sidebar nav ul li a span').forEach(el => {
                        el.classList.add('hidden');
                    });
                } else {
                    sidebar.classList.remove('sidebar-collapsed');
                    sidebar.classList.add('sidebar-expanded');
                    logoText.classList.remove('hidden');
                    userInfo.classList.remove('hidden');
                    mainContent.style.marginLeft = '250px';

                    // Show text in nav items
                    document.querySelectorAll('#sidebar nav ul li a span').forEach(el => {
                        el.classList.remove('hidden');
                    });
                }
            });

            // Product modal buttons
            saveProductBtn.addEventListener('click', saveProduct);
            cancelProductBtn.addEventListener('click', closeProductModal);
        }

        // Initialize charts
        function initCharts() {
            const inventoryCtx = document.getElementById('inventoryChart').getContext('2d');
            inventoryChart = new Chart(inventoryCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Electrónicos', 'Oficina', 'Alimentos', 'Ropa'],
                    datasets: [{
                        data: [23, 4, 22, 5],
                        backgroundColor: [
                            '#3B82F6',
                            '#10B981',
                            '#F59E0B',
                            '#EF4444'
                        ],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'right'
                        }
                    }
                }
            });

            const trendsCtx = document.getElementById('trendsChart').getContext('2d');
            trendsChart = new Chart(trendsCtx, {
                type: 'line',
                data: {
                    labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                    datasets: [
                        {
                            label: 'Entradas',
                            data: [12, 19, 3, 5, 2, 3],
                            borderColor: '#10B981',
                            backgroundColor: 'rgba(16, 185, 129, 0.05)',
                            fill: true,
                            tension: 0.4
                        },
                        {
                            label: 'Salidas',
                            data: [8, 15, 10, 7, 12, 9],
                            borderColor: '#EF4444',
                            backgroundColor: 'rgba(239, 68, 68, 0.05)',
                            fill: true,
                            tension: 0.4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top'
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        }

        // Render products table
        function renderProductsTable() {
            productsTableBody.innerHTML = '';

            products.forEach(product => {
                const row = document.createElement('tr');

                // Determine stock status
                let statusClass, statusText;
                if (product.stock === 0) {
                    statusClass = 'bg-red-100 text-red-800';
                    statusText = 'Agotado';
                } else if (product.stock < 5) {
                    statusClass = 'bg-yellow-100 text-yellow-800';
                    statusText = 'Bajo stock';
                } else {
                    statusClass = 'bg-green-100 text-green-800';
                    statusText = 'En stock';
                }

                row.innerHTML = `
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <i class="fas fa-box text-blue-600"></i>
                            </div>
                            <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">${product.name}</div>
                                <div class="text-sm text-gray-500">${product.description.substring(0, 30)}...</div>
                            </div>
                        </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${product.category}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">${product.stock}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">$${product.price.toFixed(2)}</div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusClass}">
                            ${statusText}
                        </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button class="text-blue-600 hover:text-blue-900 mr-3 edit-product" data-id="${product.id}">Editar</button>
                        <button class="text-red-600 hover:text-red-900 delete-product" data-id="${product.id}">Eliminar</button>
                    </td>
                `;

                productsTableBody.appendChild(row);
            });

            // Add event listeners to edit and delete buttons
            document.querySelectorAll('.edit-product').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.getAttribute('data-id'));
                    openProductModal(productId);
                });
            });

            document.querySelectorAll('.delete-product').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    const productId = parseInt(e.target.getAttribute('data-id'));
                    deleteProduct(productId);
                });
            });
        }

        // Open product modal for editing or adding
        function openProductModal(productId = null) {
            editingProductId = productId;

            if (productId) {
                // Editing existing product
                const product = products.find(p => p.id === productId);
                modalTitle.textContent = 'Editar producto';

                document.getElementById('product-name').value = product.name;
                document.getElementById('product-category').value = product.category.toLowerCase();
                document.getElementById('product-stock').value = product.stock;
                document.getElementById('product-price').value = product.price;
                document.getElementById('product-description').value = product.description;
            } else {
                // Adding new product
                modalTitle.textContent = 'Agregar nuevo producto';
                productForm.reset();
            }

            productModal.classList.remove('hidden');
        }

        // Close product modal
        function closeProductModal() {
            productModal.classList.add('hidden');
            editingProductId = null;
        }

        // Save product (add or update)
        function saveProduct() {
            const name = document.getElementById('product-name').value;
            const category = document.getElementById('product-category').value;
            const stock = parseInt(document.getElementById('product-stock').value);
            const price = parseFloat(document.getElementById('product-price').value);
            const description = document.getElementById('product-description').value;

            // Simple validation
            if (!name || isNaN(stock) || isNaN(price)) {
                alert('Por favor completa todos los campos requeridos');
                return;
            }

            if (editingProductId) {
                // Update existing product
                const index = products.findIndex(p => p.id === editingProductId);
                if (index !== -1) {
                    products[index] = {
                        ...products[index],
                        name,
                        category: category.charAt(0).toUpperCase() + category.slice(1),
                        stock,
                        price,
                        description
                    };
                }
            } else {
                // Add new product
                const newProduct = {
                    id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
                    name,
                    category: category.charAt(0).toUpperCase() + category.slice(1),
                    stock,
                    price,
                    description
                };
                products.push(newProduct);
            }

            // Update UI
            renderProductsTable();
            updateCharts();
            closeProductModal();
        }

        // Delete product
        function deleteProduct(productId) {
            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                products = products.filter(p => p.id !== productId);
                renderProductsTable();
                updateCharts();
            }
        }

        // Update charts with new data
        function updateCharts() {
            // In a real app, you would recalculate these values based on the updated products
            // For demo purposes, we'll just update with random data
            const newInventoryData = [
                Math.floor(Math.random() * 30) + 10,
                Math.floor(Math.random() * 10) + 1,
                Math.floor(Math.random() * 30) + 10,
                Math.floor(Math.random() * 10) + 1
            ];

            inventoryChart.data.datasets[0].data = newInventoryData;
            inventoryChart.update();

            // Also update trends chart with some random data
            const newTrendsData1 = trendsChart.data.datasets[0].data.map(() => Math.floor(Math.random() * 20) + 1);
            const newTrendsData2 = trendsChart.data.datasets[1].data.map(() => Math.floor(Math.random() * 20) + 1);

            trendsChart.data.datasets[0].data = newTrendsData1;
            trendsChart.data.datasets[1].data = newTrendsData2;
            trendsChart.update();
        }

        // Initialize the app when DOM is loaded
        document.addEventListener('DOMContentLoaded', initApp);

}
