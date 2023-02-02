(function(){
    const tabs= document.querySelectorAll(".js-tabs");
    Array.from(tabs, tab =>{
        const tabsLinks= tab.querySelectorAll(".js-tab-link");
        let currentActiveTab= tab.querySelector(".js-tab-link.active");

        const toggleTab= (toggledTabLink= currentActiveTab) => {
            currentActiveTab= toggledTabLink || currentActiveTab;
            toggledTabLink.classList.toggle("active");

            const toggledTabData= toggledTabLink.dataset.index;
            const toggledTabArea= tab.querySelector(`.js-tabarea[data-indexed=${toggledTabData}]`);
            toggledTabArea.classList.toggle("active");
        }

        if(!currentActiveTab){
            toggleTab(tabsLinks[0]);
        }

        tabsLinks.forEach(tabsLink => {
            tabsLink.addEventListener("click", function(event){
                if(currentActiveTab === this){
                    return;
                }
                if(currentActiveTab){
                    toggleTab();
                }
                toggleTab(this);
            })
        })
    })
})();