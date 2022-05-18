// ----------------------------ТАБЫ СО СТИЛЯМИ ПИТАНИЯ ---------------------------------------
function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
    let tabs = document.querySelectorAll(tabsSelector);
    let tabsContent = document.querySelectorAll(tabsContentSelector);
    let tabHeaderParent = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.style.cssText = "display: none";
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].style.cssText = "display: block";
        tabs[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();

    tabHeaderParent.addEventListener('click', (event) => {
        if (event.target && event.target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if (event.target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}
export default tabs;