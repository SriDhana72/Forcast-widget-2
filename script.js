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
