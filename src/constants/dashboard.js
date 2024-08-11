export const line = {
  data: {
    labels: ["February", "March", "April", "May", "June", "July", "August"],
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  },
  options: {
    responsive: true, // 是否自適應寬高
    maintainAspectRatio: true, // 是否保持比例
  },
};
export const line2 = {
  data: {
    labels: [1500, 1600, 1700, 1750, 1800, 1850, 1900, 1950, 1999, 2050],
    datasets: [
      {
        data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
        label: "Africa",
        borderColor: "#3e95cd",
        fill: false,
      },
      {
        data: [282, 350, 411, 502, 635, 809, 947, 1402, 3700, 5267],
        label: "Asia",
        borderColor: "#8e5ea2",
        fill: false,
      },
      {
        data: [168, 170, 178, 190, 203, 276, 408, 547, 675, 734],
        label: "Europe",
        borderColor: "#3cba9f",
        fill: false,
      },
      {
        data: [40, 20, 10, 16, 24, 38, 74, 167, 508, 784],
        label: "Latin America",
        borderColor: "#e8c3b9",
        fill: false,
      },
      {
        data: [6, 3, 2, 2, 7, 26, 82, 172, 312, 433],
        label: "North America",
        borderColor: "#c45850",
        fill: false,
      },
    ],
  },
  options: line.options,
};
export const bar = {
  data: {
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Data One",
        backgroundColor: "#f87979",
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
      },
    ],
  },
  options: {
    responsive: true, // 是否自適應寬高
    maintainAspectRatio: true, // 是否保持比例
  },
};
export const bar2 = {
  data: {
    labels: ["1900", "1950", "1999", "2050"],
    datasets: [
      {
        label: "Europe",
        type: "line",
        borderColor: "#8e5ea2",
        data: [408, 547, 675, 734],
        fill: false,
      },
      {
        label: "Africa",
        type: "line",
        borderColor: "#3e95cd",
        data: [133, 221, 783, 2478],
        fill: false,
      },
      {
        label: "Europe",
        type: "bar",
        backgroundColor: "rgba(0,0,0,0.2)",
        data: [408, 547, 675, 734],
      },
      {
        label: "Africa",
        type: "bar",
        backgroundColor: "rgba(0,0,0,0.2)",
        backgroundColorHover: "#3e95cd",
        data: [133, 221, 783, 2478],
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: "Population growth (millions): Europe & Africa",
    },
    legend: { display: false },
    responsive: true, // 是否自適應寬高
    maintainAspectRatio: false, // 是否保持比例
  },
};
export const doughnut = {
  data: {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    responsive: true, // 是否自適應寬高
    maintainAspectRatio: true, // 是否保持比例
  },
};
export const doughnut2 = {
  data: {
    labels: ["Africa", "Asia", "Europe", "Latin America", "North America"],
    datasets: [
      {
        label: "Population (millions)",
        backgroundColor: [
          "#3e95cd",
          "#8e5ea2",
          "#3cba9f",
          "#e8c3b9",
          "#c45850",
        ],
        data: [2478, 5267, 734, 784, 433],
      },
    ],
  },
  options: doughnut.options,
};
export const pic = {
  data: {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  },
  options: {
    responsive: true, // 是否自適應寬高
    maintainAspectRatio: true, // 是否保持比例
  },
};
export const polar = {
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "My First Dataset",
        data: [11, 16, 7, 3, 14, 5],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
        ],
      },
    ],
  },
  options: {
    responsive: true, // 是否自適應寬高
    maintainAspectRatio: true, // 是否保持比例
  },
};
export const radar = {
  data: {
    labels: ["Running", "Swimming", "Eating", "Cycling", "Sleeping"], // 定義每個數據點的標籤
    datasets: [
      {
        label: "Person A", // 第一個數據集的標籤
        data: [65, 59, 90, 81, 56], // 對應每個標籤的數值
        backgroundColor: "rgba(255, 99, 132, 0.2)", // 數據集的背景顏色
        borderColor: "rgba(255, 99, 132, 1)", // 數據集的邊框顏色
        borderWidth: 1, // 邊框寬度
      },
      {
        label: "Person B", // 第二個數據集的標籤
        data: [28, 48, 40, 19, 96], // 第二個數據集的數值
        backgroundColor: "rgba(54, 162, 235, 0.2)", // 第二個數據集的背景顏色
        borderColor: "rgba(54, 162, 235, 1)", // 第二個數據集的邊框顏色
        borderWidth: 1, // 邊框寬度
      },
    ],
  },
  options: {
    responsive: true, // 是否自適應寬高
    maintainAspectRatio: true, // 是否保持比例
  },
};

export const allDashboard = {
  line,
  bar,
  doughnut,
  pic,
  polar,
  radar,
};

export default allDashboard;
