function toggleDropdown(dataId, arrowId) {
    const nestedData = document.getElementById(dataId);
    const arrowIcon = document.getElementById(arrowId);
    if (nestedData.classList.contains('hidden')) {
        nestedData.classList.remove('hidden');
        arrowIcon.classList.remove('rotate-0');
        arrowIcon.classList.add('rotate-90');
    } else {
        nestedData.classList.add('hidden');
        arrowIcon.classList.remove('rotate-90');
        arrowIcon.classList.add('rotate-0');
    }
}
        // The ZOHO object is only available after the CRM's embedded app is ready.
        // The recommended way to handle this is to use ZOHO.embeddedApp.onReady()
        ZOHO.embeddedApp.onReady(function() {
            // Resize the Zoho CRM iframe to fit the content
            ZOHO.CRM.UI.Resize({
                height: "100%",
                width: "100%"
            }).then(function(data){
                console.log(data);
            });
        });
