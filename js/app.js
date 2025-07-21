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
    menuItems.reduce((categoryCounters, item) => {
        const section = document.getElementById(item.category);
        if (section) {
            if (!categoryCounters[item.category]) {
                categoryCounters[item.category] = 0;
            }
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            if (categoryCounters[item.category] % 2 === 0) {
                itemElement.style.backgroundColor = 'var(--blue)'; 
                itemElement.style.color = 'white';
            } else {
                itemElement.style.backgroundColor = 'var(--pink)'; 
                itemElement.style.color = 'white';
            }
            
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
        
        return categoryCounters;
    }, {}); 
}