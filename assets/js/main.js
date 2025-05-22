// Toggle Sidebar

const sidebar = document.querySelector(".sidebar");

function toggleMenu() {
  sidebar.classList.toggle("activeMenu");
}



// Search Feature

const activeSearch = document.querySelector(".activeSearch");
const searchImg = document.querySelector(".searchImg");

searchImg.addEventListener("click", () => {
  setTimeout(() => {
    activeSearch.style.display = "flex";
    searchImg.style.display = "none";
  }, 200);
});



// Image Picker

const imagePickerInput = document.querySelector(".imagePickerInput");
const imgPickerDP = document.querySelector(".imgPickerDP");

const storedImage = localStorage.getItem("User-Image");

if (storedImage) {
  imgPickerDP.src = storedImage;
}

imagePickerInput.addEventListener("change", (e) => {
  const img = e.target.files[0];

  const reader = new FileReader();

  reader.onload = (e) => {
    console.log("🚀 ~ imgPickerDP:", e.target.result);
    localStorage.setItem("User-Image", e.target.result);
    const getImg = localStorage.getItem("User-Image");
    imgPickerDP.src = getImg;
  };

  reader.readAsDataURL(img);
});



// Change Year

const yearText = document.querySelector(".showYear");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

function updateChartForYear(year) {
  const storedData = JSON.parse(localStorage.getItem("StackChartData"));
  const data = storedData[year];
  if (!data) return;


  myChart.data.datasets[0].data = data.Top;
  myChart.data.datasets[1].data = data.Top.map(() => 5);
  myChart.data.datasets[2].data = data.Bottom;
  myChart.update();


  myChart2.data.datasets[0].data = data.Pie;
  myChart2.update();


  const total = data.Pie.reduce((a, b) => a + b, 0);
  const wins = data.Pie[0];
  const percentage = ((wins / total) * 100).toFixed(1);

  document.querySelector('#chartCenterTitle').innerText = `${wins} Wins`;
  document.querySelector('#chartCenterPercent').innerText = `(${percentage}%)`;
}

leftArrow.addEventListener("click", () => {
  const year = parseInt(yearText.innerText);
  const newYear = year - 1;
  if (newYear >= 2000) {
    yearText.innerText = newYear;
    updateChartForYear(newYear);
  }
});

rightArrow.addEventListener("click", () => {
  const year = parseInt(yearText.innerText);
  const currentYear = new Date().getFullYear();
  if (year < currentYear) {
    const newYear = year + 1;
    yearText.innerText = newYear;
    updateChartForYear(newYear);
  }
});



function generateDummyChartData(startYear, endYear) {
  const StackChartData = {};
  for (let year = startYear; year <= endYear; year++) {
    StackChartData[year] = {
      Top: Array.from({ length: 12 }, () => Math.floor(Math.random() * 41) + 10),
      Bottom: Array.from({ length: 12 }, () => Math.floor(Math.random() * 41) + 10),
      Pie: [
        Math.floor(Math.random() * 51) + 25,
        Math.floor(Math.random() * 41) + 10,
        Math.floor(Math.random() * 41) + 10,
        Math.floor(Math.random() * 31) + 5
      ]
    };
  }
  localStorage.setItem("StackChartData", JSON.stringify(StackChartData));
}

generateDummyChartData(2000, new Date().getFullYear());

const localData = JSON.parse(localStorage.getItem("StackChartData"));
const initialYear = new Date().getFullYear();
const initialData = localData[initialYear];



// Stack Bar Chart

const ctx = document.getElementById('myChart').getContext('2d');

const gradient1 = ctx.createLinearGradient(0, 100, 0, 0);
gradient1.addColorStop(0, "#C059FF");
gradient1.addColorStop(1, "#4262FE");

const gradient2 = ctx.createLinearGradient(0, 0, 0, 300);
gradient2.addColorStop(0, "#F44771");
gradient2.addColorStop(1, "#FD29B5");

const myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
    datasets: [
      {
        label: 'Top',
        data: initialData.Top,
        backgroundColor: gradient2,
        stack: 'stack1',
        borderRadius: 50,
        barThickness: 8,
        borderColor: '#fff',
        borderWidth: 0.8,
        borderRadius: {
          topLeft: 50,
          topRight: 50,
          bottomLeft: 50,
          bottomRight: 50
        },
        borderSkipped: false,
      },
      {
        label: 'Spacer',
        data: initialData.Top.map(() => 5),
        backgroundColor: 'rgba(0,0,0,0)',
        stack: 'stack1',
        barThickness: 8,
        borderWidth: 0
      },
      {
        label: 'Bottom',
        data: initialData.Bottom,
        backgroundColor: gradient1,
        stack: 'stack1',
        barThickness: 8,
        borderRadius: 50,
        borderColor: '#fff',
        borderWidth: 0.8,
        borderSkipped: false,
      },
    ]
  },
  options: {
    devicePixelRatio: 5,
    plugins: {
      legend: { display: false },
      tooltip: {
        enabled: true,
        filter: function (tooltipItem) {
          return tooltipItem.dataset.label !== 'Spacer';
        }
      }
    },
    scales: {
      x: {
        stacked: true,
        ticks: {
          color: '#BACCFD',
        },
        grid: { display: false },
        border: { display: false }
      },
      y: {
        stacked: true,
        ticks: { display: false },
        grid: { display: false },
        border: { display: false }
      },
    }
  }
});



// Pie Chart

const ctx2 = document.getElementById('myChart2').getContext('2d');

const gradient3 = ctx2.createLinearGradient(0, 0, 300, 300);
gradient3.addColorStop(0, '#CE9FFC');
gradient3.addColorStop(1, '#7367F0');

const gradient4 = ctx2.createLinearGradient(0, 0, 0, 300);
gradient4.addColorStop(0, '#FFA9A5');
gradient4.addColorStop(1, '#FF6363');

const gradient5 = ctx2.createLinearGradient(0, 0, 0, 300);
gradient5.addColorStop(0, '#FFE985');
gradient5.addColorStop(1, '#FA742B');

const myChart2 = new Chart(ctx2, {
  type: 'doughnut',
  data: {
    datasets: [{
      data: initialData.Pie,
      backgroundColor: [gradient3, gradient4, gradient5, '#eff3fe'],
      borderWidth: 0,
      cutout: '60%',
      segment: {
        borderRadius: 20
      }
    }]
  },
  options: {
    devicePixelRatio: 5,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    }
  }
});



window.addEventListener('DOMContentLoaded', () => {
  const total = initialData.Pie.reduce((a, b) => a + b, 0);
  const wins = initialData.Pie[0];
  const percentage = ((wins / total) * 100).toFixed(1);
  document.querySelector('#chartCenterTitle').innerText = `${wins} Wins`;
  document.querySelector('#chartCenterPercent').innerText = `(${percentage}%)`;
});
