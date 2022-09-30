const randomBetween = (min, max) =>
	min + Math.floor(Math.random() * (max - min + 1));

const creatinChart = (categories_object, categories) => {
	let value = [];
	const colors = [];
	categories.forEach((element) => {
		value.push(categories_object[element]);
		const r = randomBetween(0, 255);
		const g = randomBetween(0, 255);
		const b = randomBetween(0, 255);
		colors.push(`rgb(${r},${g},${b})`);
	});
	value.pop(-1);
	categories.pop(-1);
	const ctx = document.querySelector('.chart');
	new Chart(ctx, {
		type: 'polarArea',
		data: {
			labels: categories,
			datasets: [
				{
					label: '# of Votes',
					data: value,
					backgroundColor: colors,
					borderColor: colors,
					borderWidth: 1,
				},
			],
		},
		options: {
			scales: {
				// y: {
				// 	beginAtZero: true,
				// },
			},
		},
	});
};
const createCanvas = () => {
	const div_chart = document.querySelector('.div_chart');
	const canvas = document.createElement('canvas');
	canvas.classList.add('chart');
	div_chart.appendChild(canvas);
};
const removeChart = () => {
	const ctx = document.querySelector('.chart');
	ctx.remove();
	createCanvas();
};
export const renderChart = (categories_object, categories) => {
	removeChart();
	creatinChart(categories_object, categories);
};
