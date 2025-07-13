// Blog page specific functionality
document.addEventListener('DOMContentLoaded', () => {
    initializeBlogFilters();
    initializePagination();
    addBlogPageStyles();
});

// Category filtering functionality
function initializeBlogFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postCards = document.querySelectorAll('.post-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter posts
            filterPosts(category, postCards);
        });
    });
}

function filterPosts(category, postCards) {
    postCards.forEach(card => {
        const postCategory = card.getAttribute('data-category');
        
        if (category === 'all' || postCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Pagination functionality
function initializePagination() {
    const paginationBtns = document.querySelectorAll('.pagination-btn');
    const paginationInfo = document.querySelector('.pagination-info');
    
    let currentPage = 1;
    const totalPages = 3;
    
    paginationBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.textContent === 'Previous' && currentPage > 1) {
                currentPage--;
            } else if (btn.textContent === 'Next' && currentPage < totalPages) {
                currentPage++;
            }
            
            updatePagination(currentPage, totalPages, paginationBtns, paginationInfo);
        });
    });
}

function updatePagination(currentPage, totalPages, buttons, info) {
    // Update pagination info
    info.textContent = `Page ${currentPage} of ${totalPages}`;
    
    // Update button states
    buttons[0].disabled = currentPage === 1;
    buttons[1].disabled = currentPage === totalPages;
    
    // In a real application, you would load different posts here
    // For now, we'll just show a notification
    showNotification(`Showing page ${currentPage} of ${totalPages}`, 'info');
}

// Add blog-specific styles
function addBlogPageStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .blog-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-align: center;
            padding: 120px 0 80px;
            margin-top: 70px;
        }
        
        .blog-header h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
            color: white;
        }
        
        .blog-header p {
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.9);
            margin: 0;
        }
        
        .all-posts {
            padding: 80px 0;
            background: var(--background-dark);
        }
        
        .categories-filter {
            margin-bottom: 3rem;
            text-align: center;
        }
        
        .categories-filter h3 {
            margin-bottom: 1.5rem;
            color: var(--text-dark);
        }
        
        .filter-buttons {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
        }
        
        .filter-btn {
            padding: 8px 20px;
            border: 2px solid var(--primary-color);
            background: transparent;
            color: var(--primary-color);
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .filter-btn:hover,
        .filter-btn.active {
            background: var(--primary-color);
            color: white;
            transform: translateY(-2px);
        }
        
        .pagination {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 2rem;
            margin-top: 3rem;
        }
        
        .pagination-btn {
            padding: 10px 20px;
            border: 2px solid var(--primary-color);
            background: transparent;
            color: var(--primary-color);
            border-radius: 25px;
            cursor: pointer;
            font-weight: 500;
            transition: all 0.3s ease;
        }
        
        .pagination-btn:hover:not(:disabled) {
            background: var(--primary-color);
            color: white;
            transform: translateY(-2px);
        }
        
        .pagination-btn:disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
        
        .pagination-info {
            font-weight: 500;
            color: var(--text-dark);
        }
        
        .nav-logo a {
            text-decoration: none;
            color: inherit;
        }
        
        @media (max-width: 768px) {
            .blog-header h1 {
                font-size: 2.5rem;
            }
            
            .filter-buttons {
                gap: 0.5rem;
            }
            
            .filter-btn {
                padding: 6px 15px;
                font-size: 0.9rem;
            }
            
            .pagination {
                flex-direction: column;
                gap: 1rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Advanced search functionality for blog page
function initializeAdvancedSearch() {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) return;
    
    const searchInput = searchContainer.querySelector('.search-input');
    const postCards = document.querySelectorAll('.post-card');
    
    // Add search by date functionality
    const dateFilter = document.createElement('input');
    dateFilter.type = 'month';
    dateFilter.placeholder = 'Filter by month';
    dateFilter.style.cssText = `
        padding: 12px 20px;
        border: 2px solid var(--border-color);
        border-radius: 25px;
        font-size: 16px;
        transition: border-color 0.3s ease;
        margin-left: 10px;
    `;
    
    searchContainer.appendChild(dateFilter);
    
    // Enhanced search function
    function performAdvancedSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedMonth = dateFilter.value;
        
        postCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const content = card.querySelector('p').textContent.toLowerCase();
            const category = card.querySelector('.post-category').textContent.toLowerCase();
            const dateText = card.querySelector('.post-date').textContent;
            
            // Parse date for comparison
            const postDate = new Date(dateText);
            const postMonth = postDate.toISOString().substring(0, 7); // YYYY-MM format
            
            const matchesSearch = title.includes(searchTerm) || 
                                content.includes(searchTerm) || 
                                category.includes(searchTerm);
            
            const matchesDate = !selectedMonth || postMonth === selectedMonth;
            
            if (matchesSearch && matchesDate) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease-out';
            } else {
                card.style.display = 'none';
            }
        });
    }
    
    searchInput.addEventListener('input', performAdvancedSearch);
    dateFilter.addEventListener('change', performAdvancedSearch);
}

// Initialize advanced search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for the main search to be initialized
    setTimeout(initializeAdvancedSearch, 100);
});

// Blog post interaction tracking
function trackPostInteraction() {
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('h3').textContent;
            const category = card.querySelector('.post-category').textContent;
            
            // In a real application, you would send this data to analytics
            console.log(`Post clicked: ${title} (Category: ${category})`);
        });
    });
}

// Initialize post tracking
document.addEventListener('DOMContentLoaded', trackPostInteraction);

// Add reading time estimation
function addReadingTime() {
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        const content = card.querySelector('p').textContent;
        const wordCount = content.split(' ').length;
        const readingTime = Math.ceil(wordCount / 200); // Average reading speed
        
        const readingTimeElement = document.createElement('span');
        readingTimeElement.className = 'reading-time';
        readingTimeElement.textContent = `${readingTime} min read`;
        readingTimeElement.style.cssText = `
            font-size: 0.8rem;
            color: var(--text-light);
            margin-left: 10px;
        `;
        
        const postMeta = card.querySelector('.post-meta');
        postMeta.appendChild(readingTimeElement);
    });
}

// Initialize reading time
document.addEventListener('DOMContentLoaded', addReadingTime);

// Add tag functionality
function addTagSystem() {
    const tagData = {
        'react': ['hooks', 'components', 'state'],
        'backend': ['api', 'database', 'server'],
        'cloud': ['aws', 'deployment', 'scaling'],
        'python': ['data-structures', 'algorithms', 'frameworks'],
        'mobile': ['responsive', 'pwa', 'native'],
        'security': ['authentication', 'encryption', 'best-practices'],
        'web': ['css', 'javascript', 'html'],
        'ai': ['machine-learning', 'tensorflow', 'neural-networks']
    };
    
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        const category = card.getAttribute('data-category');
        const tags = tagData[category] || [];
        
        if (tags.length > 0) {
            const tagsContainer = document.createElement('div');
            tagsContainer.className = 'post-tags';
            tagsContainer.style.cssText = `
                margin-top: 10px;
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
            `;
            
            tags.forEach(tag => {
                const tagElement = document.createElement('span');
                tagElement.className = 'tag';
                tagElement.textContent = `#${tag}`;
                tagElement.style.cssText = `
                    background: rgba(102, 126, 234, 0.1);
                    color: var(--primary-color);
                    padding: 2px 8px;
                    border-radius: 12px;
                    font-size: 0.7rem;
                    font-weight: 500;
                `;
                tagsContainer.appendChild(tagElement);
            });
            
            const postContent = card.querySelector('.post-content');
            postContent.appendChild(tagsContainer);
        }
    });
}

// Initialize tag system
document.addEventListener('DOMContentLoaded', addTagSystem);

// Add sorting functionality
function addSortingOptions() {
    const categoriesFilter = document.querySelector('.categories-filter');
    
    const sortContainer = document.createElement('div');
    sortContainer.className = 'sort-container';
    sortContainer.style.cssText = `
        margin-top: 2rem;
        text-align: center;
    `;
    
    const sortLabel = document.createElement('label');
    sortLabel.textContent = 'Sort by: ';
    sortLabel.style.cssText = `
        color: var(--text-dark);
        font-weight: 500;
        margin-right: 10px;
    `;
    
    const sortSelect = document.createElement('select');
    sortSelect.style.cssText = `
        padding: 8px 15px;
        border: 2px solid var(--border-color);
        border-radius: 20px;
        font-size: 14px;
        background: white;
        cursor: pointer;
    `;
    
    const sortOptions = [
        { value: 'date-desc', text: 'Latest First' },
        { value: 'date-asc', text: 'Oldest First' },
        { value: 'title-asc', text: 'Title A-Z' },
        { value: 'title-desc', text: 'Title Z-A' }
    ];
    
    sortOptions.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.text;
        sortSelect.appendChild(optionElement);
    });
    
    sortContainer.appendChild(sortLabel);
    sortContainer.appendChild(sortSelect);
    categoriesFilter.appendChild(sortContainer);
    
    // Sort functionality
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const postsGrid = document.querySelector('.posts-grid');
        const posts = Array.from(postsGrid.querySelectorAll('.post-card'));
        
        posts.sort((a, b) => {
            if (sortValue.includes('date')) {
                const dateA = new Date(a.querySelector('.post-date').textContent);
                const dateB = new Date(b.querySelector('.post-date').textContent);
                return sortValue === 'date-desc' ? dateB - dateA : dateA - dateB;
            } else if (sortValue.includes('title')) {
                const titleA = a.querySelector('h3').textContent;
                const titleB = b.querySelector('h3').textContent;
                return sortValue === 'title-asc' ? 
                    titleA.localeCompare(titleB) : 
                    titleB.localeCompare(titleA);
            }
            return 0;
        });
        
        // Re-append sorted posts
        posts.forEach(post => postsGrid.appendChild(post));
    });
}

// Initialize sorting
document.addEventListener('DOMContentLoaded', addSortingOptions); 