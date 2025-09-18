function toggleDropdown(dataId, arrowId, event) {
    // Prevent dropdown from closing when filter is clicked
    if (event.target.closest('.filter-button-group')) {
        return;
    }
    const nestedData = document.getElementById(dataId);
    const arrowIcon = document.getElementById(arrowId);
    if (nestedData.classList.contains('hidden')) {
        nestedData.classList.remove('hidden');
        arrowIcon.classList.add('rotate-90');
    } else {
        nestedData.classList.add('hidden');
        arrowIcon.classList.remove('rotate-90');
    }
}

// --- Filter Logic ---

let currentGlobalFilter = 'all';

const summaryData = {
    peter: {
        target:    { all: '$1.92M',   my_target: '$400K', my_team: '$1.52M' },
        achieved:  { all: '$1.02M',   my_target: '$380K', my_team: '$640K' },
        gap:       { all: '-$900K',   my_target: '-$20K', my_team: '-$880K' },
        pipeline:  { all: '$2.0M',   my_target: '$500K', my_team: '$1.5M' },
        percentage:{ all: '53%',     my_target: '95%',   my_team: '42%' }
    },
    logan: {
        target:    { all: '$750.0K', my_target: '$200K', my_team: '$550.0K' },
        achieved:  { all: '$505.0K', my_target: '$195K', my_team: '$310.0K' },
        gap:       { all: '-$245K',   my_target: '-$5K',  my_team: '-$240K' },
        pipeline:  { all: '$590.0K', my_target: '$250K', my_team: '$340.0K' },
        percentage:{ all: '67%',     my_target: '98%',   my_team: '56%' }
    },
    jinil: {
        target:    { all: '$765.0K', my_target: '$210K', my_team: '$555.0K' },
        achieved:  { all: '$516.0K', my_target: '$205K', my_team: '$311.0K' },
        gap:       { all: '-$249K',   my_target: '-$5K',  my_team: '-$244K' },
        pipeline:  { all: '$600.0K', my_target: '$260K', my_team: '$340.0K' },
        percentage:{ all: '67%',     my_target: '98%',   my_team: '56%' }
    }
};

const quarterlyData = {
    peter: {
        all: [
            { q: 'Q1', target: '$450K', achievement: '$420K', gap: '-$30K', pipeline: '$500K', prediction: '$480K', percentage: '93%' },
            { q: 'Q2', target: '$480K', achievement: '$450K', gap: '-$30K', pipeline: '$550K', prediction: '$500K', percentage: '94%' },
            { q: 'Q3', target: '$500K', achievement: '$0',    gap: '-$500K', pipeline: '$600K', prediction: '$520K', percentage: '0%' },
            { q: 'Q4', target: '$500K', achievement: '$0',    gap: '-$500K', pipeline: '$650K', prediction: '$550K', percentage: '0%' }
        ],
        my_target: [
            { q: 'Q1', target: '$100K', achievement: '$95K', gap: '-$5K', pipeline: '$120K', prediction: '$110K', percentage: '95%' },
            { q: 'Q2', target: '$100K', achievement: '$98K', gap: '-$2K', pipeline: '$130K', prediction: '$115K', percentage: '98%' },
            { q: 'Q3', target: '$100K', achievement: '$0',   gap: '-$100K', pipeline: '$140K', prediction: '$120K', percentage: '0%' },
            { q: 'Q4', target: '$100K', achievement: '$0',   gap: '-$100K', pipeline: '$150K', prediction: '$125K', percentage: '0%' }
        ],
        my_team: [
             { q: 'Q1', target: '$350K', achievement: '$325K', gap: '-$25K', pipeline: '$380K', prediction: '$370K', percentage: '93%' },
            { q: 'Q2', target: '$380K', achievement: '$352K', gap: '-$28K', pipeline: '$420K', prediction: '$385K', percentage: '93%' },
            { q: 'Q3', target: '$400K', achievement: '$0',    gap: '-$400K', pipeline: '$460K', prediction: '$400K', percentage: '0%' },
            { q: 'Q4', target: '$400K', achievement: '$0',    gap: '-$400K', pipeline: '$500K', prediction: '$425K', percentage: '0%' }
        ]
    },
    logan: {
        all: [
            { q: 'Q1', target: '$180K', achievement: '$170K', gap: '-$10K', pipeline: '$200K', prediction: '$190K', percentage: '94%' },
            { q: 'Q2', target: '$185K', achievement: '$175K', gap: '-$10K', pipeline: '$210K', prediction: '$195K', percentage: '95%' },
            { q: 'Q3', target: '$190K', achievement: '$0',    gap: '-$190K', pipeline: '$220K', prediction: '$200K', percentage: '0%' },
            { q: 'Q4', target: '$195K', achievement: '$0',    gap: '-$195K', pipeline: '$230K', prediction: '$205K', percentage: '0%' }
        ],
        my_target: [
            { q: 'Q1', target: '$50K', achievement: '$48K', gap: '-$2K', pipeline: '$60K', prediction: '$55K', percentage: '96%' },
            { q: 'Q2', target: '$50K', achievement: '$49K', gap: '-$1K', pipeline: '$65K', prediction: '$58K', percentage: '98%' },
            { q: 'Q3', target: '$50K', achievement: '$0',   gap: '-$50K', pipeline: '$70K', prediction: '$60K', percentage: '0%' },
            { q: 'Q4', target: '$50K', achievement: '$0',   gap: '-$50K', pipeline: '$75K', prediction: '$62K', percentage: '0%' }
        ],
        my_team: [
            { q: 'Q1', target: '$130K', achievement: '$122K', gap: '-$8K', pipeline: '$140K', prediction: '$135K', percentage: '94%' },
            { q: 'Q2', target: '$135K', achievement: '$126K', gap: '-$9K', pipeline: '$145K', prediction: '$137K', percentage: '93%' },
            { q: 'Q3', target: '$140K', achievement: '$0',    gap: '-$140K', pipeline: '$150K', prediction: '$140K', percentage: '0%' },
            { q: 'Q4', target: '$145K', achievement: '$0',    gap: '-$145K', pipeline: '$155K', prediction: '$143K', percentage: '0%' }
        ]
    },
    jinil: {
         all: [
            { q: 'Q1', target: '$185K', achievement: '$178K', gap: '-$7K', pipeline: '$200K', prediction: '$195K', percentage: '96%' },
            { q: 'Q2', target: '$190K', achievement: '$182K', gap: '-$8K', pipeline: '$210K', prediction: '$200K', percentage: '96%' },
            { q: 'Q3', target: '$195K', achievement: '$0',    gap: '-$195K', pipeline: '$220K', prediction: '$210K', percentage: '0%' },
            { q: 'Q4', target: '$195K', achievement: '$0',    gap: '-$195K', pipeline: '$230K', prediction: '$215K', percentage: '0%' }
        ],
        my_target: [
            { q: 'Q1', target: '$50K', achievement: '$49K', gap: '-$1K', pipeline: '$60K', prediction: '$58K', percentage: '98%' },
            { q: 'Q2', target: '$50K', achievement: '$49K', gap: '-$1K', pipeline: '$65K', prediction: '$60K', percentage: '98%' },
            { q: 'Q3', target: '$55K', achievement: '$0',   gap: '-$55K', pipeline: '$70K', prediction: '$65K', percentage: '0%' },
            { q: 'Q4', target: '$55K', achievement: '$0',   gap: '-$55K', pipeline: '$75K', prediction: '$68K', percentage: '0%' }
        ],
        my_team: [
            { q: 'Q1', target: '$135K', achievement: '$129K', gap: '-$6K', pipeline: '$140K', prediction: '$137K', percentage: '96%' },
            { q: 'Q2', target: '$140K', achievement: '$133K', gap: '-$7K', pipeline: '$145K', prediction: '$140K', percentage: '95%' },
            { q: 'Q3', target: '$140K', achievement: '$0',    gap: '-$140K', pipeline: '$150K', prediction: '$145K', percentage: '0%' },
            { q: 'Q4', target: '$140K', achievement: '$0',    gap: '-$140K', pipeline: '$155K', prediction: '$147K', percentage: '0%' }
        ]
    }
}


function updateActiveButton(buttonContainer, activeFilterType) {
    buttonContainer.querySelectorAll('button').forEach(btn => {
        btn.classList.remove('active');
    });
    const activeButton = buttonContainer.querySelector(`[data-filter-type="${activeFilterType}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
}

function updateQuarterlyTable(person, filterType) {
    const tableBody = document.getElementById(`${person}-q-data`);
    if (!tableBody || !quarterlyData[person] || !quarterlyData[person][filterType]) return;

    tableBody.innerHTML = ''; // Clear existing rows
    const dataSet = quarterlyData[person][filterType];

    dataSet.forEach(row => {
        const tr = document.createElement('tr');
        const percentageNum = parseFloat(row.percentage);
        const achievementClass = percentageNum > 90 ? 'table-row-achievement' : 'table-row-gap';
        const gapClass = parseFloat(row.gap) < 0 ? 'table-row-gap' : 'table-row-achievement';

        tr.innerHTML = `
            <td>${row.q}</td>
            <td>${row.target}</td>
            <td class="${achievementClass}">${row.achievement}</td>
            <td class="${gapClass}">${row.gap}</td>
            <td>${row.pipeline}</td>
            <td>${row.prediction}</td>
            <td class="${achievementClass}">${row.percentage}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function updateValues(person, filterType) {
    const dataContainer = document.querySelector(`[data-values-for="${person}"]`);
    if (!dataContainer || !summaryData[person]) return;

    Object.keys(summaryData[person]).forEach(metric => {
        const valueSpan = dataContainer.querySelector(`[data-metric="${metric}"]`);
        if (valueSpan) {
            const value = summaryData[person][metric][filterType] || summaryData[person][metric]['all'];
            valueSpan.textContent = value;
            
            valueSpan.classList.remove('text-green-600', 'text-red-500');
            const percentageValue = parseFloat(value);
            if (metric === 'achieved' || (metric === 'percentage' && percentageValue >= 90)) {
                 valueSpan.classList.add('text-green-600');
            } else if (metric === 'gap' || (metric === 'percentage' && percentageValue < 90)) {
                valueSpan.classList.add('text-red-500');
            }
        }
    });
}

function setGlobalFilter(filterType, element) {
    event.stopPropagation();
    currentGlobalFilter = filterType;
    updateActiveButton(element.parentElement, filterType);
    Object.keys(summaryData).forEach(person => {
        updateValues(person, currentGlobalFilter);
        updateQuarterlyTable(person, currentGlobalFilter);
        const individualFilterContainer = document.querySelector(`[data-filter-for="${person}"]`);
        if (individualFilterContainer) {
            updateActiveButton(individualFilterContainer, filterType);
        }
    });
}

function setIndividualFilter(person, filterType, element) {
    event.stopPropagation();
    updateActiveButton(element.parentElement, filterType);
    updateValues(person, filterType);
    updateQuarterlyTable(person, filterType);
}

document.addEventListener('DOMContentLoaded', () => {
    setGlobalFilter('all', document.querySelector('#global-filter-container button'));
});

// The ZOHO object is only available after the CRM's embedded app is ready.
document.addEventListener("DOMContentLoaded", function() {
    // ZOHO.embeddedApp.onReady(function() {
    //     ZOHO.CRM.UI.Resize({
    //         height: "100%",
    //         width: "100%"
    //     }).then(function(data){
    //         console.log("Widget resized successfully:", data);
    //     }).catch(function(error){
    //         console.error("Error resizing widget:", error);
    //     });
    // });
});
