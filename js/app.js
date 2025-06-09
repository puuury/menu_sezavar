document.addEventListener('DOMContentLoaded', () => {
    fetch('/data/item.json')
        .then(response => {
            if (!response.ok) throw new Error('Failed to load menu');
            return response.json();
        })
        .then(data => processMenuData(data))
        .catch(error => console.error(error));
});

function processMenuData(menuItems) {
    const categoryCounters = {};

    menuItems.forEach(item => {
        const section = document.getElementById(item.category);
        if (section) {
            // مقداردهی اولیه شمارنده اگر وجود نداشت
            if (!categoryCounters[item.category]) {
                categoryCounters[item.category] = 0;
            }

            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            
            // تعیین رنگ بر اساس زوج/فرد بودن شمارنده دسته
            if (categoryCounters[item.category] % 2 === 0) {
                itemElement.style.backgroundColor = '#3498db'; // آبی
                itemElement.style.color = 'white';
            } else {
                itemElement.style.backgroundColor = '#f1c40f'; // زرد
                itemElement.style.color = 'black';
            }
            
            // افزایش شمارنده برای این دسته
            categoryCounters[item.category]++;

            const titleWrap = document.createElement('div');
            titleWrap.className = 'title-wrap';
            itemElement.append(titleWrap);

            const priceWrap = document.createElement('div');
            priceWrap.className = 'price-wrap';
            itemElement.append(priceWrap);
            
            const titleElement = document.createElement('h3');
            titleElement.textContent = item.title;
            titleWrap.appendChild(titleElement);
            
            const priceElement = document.createElement('p');
            priceElement.textContent = `${item.price}`;
            priceWrap.appendChild(priceElement);
            
            section.appendChild(itemElement);
        }
    });
}
