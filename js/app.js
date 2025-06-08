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
    menuItems.forEach(item => {
        const section = document.getElementById(item.category);
        if (section) {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            
            const titleElement = document.createElement('h3');
            titleElement.textContent = item.title;
            itemElement.appendChild(titleElement);
            
            const priceElement = document.createElement('p');
            priceElement.textContent = `${item.price} `;
            itemElement.appendChild(priceElement);
            
            section.appendChild(itemElement);
        }
    });
}
