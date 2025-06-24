document.addEventListener('DOMContentLoaded', function() {
    // Toggle do menu mobile
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.overlay');
    
    mobileMenuButton.addEventListener('click', () => {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    });
    
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    overlay.addEventListener('click', () => {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    });
    
    // Toggle da busca
    const searchButton = document.getElementById('search-button');
    const searchBox = document.getElementById('search-box');
    
    searchButton.addEventListener('click', () => {
        searchBox.classList.toggle('hidden');
    });
    
    // Toggle do modo escuro
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        const icon = darkModeToggle.querySelector('i');
        if (body.classList.contains('dark-mode')) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
    
    // Modo escuro automático após 18h
    function verificarHora() {
        const agora = new Date();
        const horas = agora.getHours();
        if (horas >= 18 || horas <= 6) {
            body.classList.add('dark-mode');
            const icon = darkModeToggle.querySelector('i');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }
    
    verificarHora();
    
    // Busca por voz
    const voiceSearch = document.getElementById('voice-search');
    
    voiceSearch.addEventListener('click', () => {
        alert('Busca por voz ativada. Fale agora...');
    });
    
    // Tooltips
    const tooltips = document.querySelectorAll('.tooltip');
    
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', (e) => {
            const tooltipText = tooltip.getAttribute('data-tooltip');
            const tooltipElement = document.createElement('div');
            tooltipElement.className = 'absolute z-50 px-2 py-1 text-xs text-white bg-gray-800 rounded whitespace-nowrap';
            tooltipElement.textContent = tooltipText;
            
            const rect = tooltip.getBoundingClientRect();
            tooltipElement.style.top = `${rect.top - 30}px`;
            tooltipElement.style.left = `${rect.left + rect.width / 2}px`;
            tooltipElement.style.transform = 'translateX(-50%)';
            
            document.body.appendChild(tooltipElement);
            
            tooltip._tooltipElement = tooltipElement;
        });
        
        tooltip.addEventListener('mouseleave', () => {
            if (tooltip._tooltipElement) {
                document.body.removeChild(tooltip._tooltipElement);
                tooltip._tooltipElement = null;
            }
        });
    });
    
    // Gráficos
    // Gráfico de Vendas
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul'],
            datasets: [{
                label: 'Vendas',
                data: [6500, 5900, 8000, 8100, 5600, 5500, 4000],
                backgroundColor: 'rgba(236, 72, 153, 0.1)',
                borderColor: 'rgba(236, 72, 153, 1)',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        drawBorder: false
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
    
    // Gráfico de Tráfego
    const trafficCtx = document.getElementById('trafficChart').getContext('2d');
    const trafficChart = new Chart(trafficCtx, {
        type: 'doughnut',
        data: {
            labels: ['Direto', 'Orgânico', 'Referência', 'Social'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: [
                    'rgba(236, 72, 153, 0.8)',
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(245, 158, 11, 0.8)'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            cutout: '70%',
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        boxWidth: 10,
                        padding: 20
                    }
                }
            }
        }
    });
    
    // Atalhos de teclado
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'h') {
            e.preventDefault();
            alert('Navegando para o Histórico de Vendas');
        }
    });
});