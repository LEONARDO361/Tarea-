 // Función para obtener los datos del indicador seleccionado
 function obtenerDatosIndicador(indicador) {
    fetch(`https://mindicador.cl/api/${indicador}`)
      .then(response => response.json())
      .then(data => mostrarDatosIndicador(data));
  }
  
  // Función para mostrar los datos del indicador en la página
  function mostrarDatosIndicador(data) {
    const indicadorInfo = document.getElementById('indicadorInfo');
    indicadorInfo.innerHTML = `
      <h3>${data.nombre}</h3>
      <p>Unidad de medida: ${data.unidad_medida}</p>
      <p>Valor: ${data.serie[0].valor}</p>
      <p>Fecha: ${data.serie[0].fecha}</p>
    `;
    
    const historico = data.serie.map(item => item.valor);
    const fechas = data.serie.map(item => item.fecha);
    
    // Verificar si el gráfico ya existe y eliminarlo antes de crear uno nuevo
    const chartContainer = document.getElementById('myChart');
    if (window.chartInstance) {
      window.chartInstance.destroy();
    }
    
    // Crear el gráfico utilizando Chart.js
    const ctx = chartContainer.getContext('2d');
    window.chartInstance = new Chart(ctx, {
      type: 'line', 
      data: {
        labels: fechas,
        datasets: [{
          label: data.nombre,
          data: historico,
          backgroundcolor: ['#000fff'],
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false
          
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            display: true,
            title: 'Fecha',
            ticks: {
              color: '#f2f2f2'
              
            }
          },
          y: {
            display: true,
            title: 'Valor',
            ticks: {
              color: '#f2f2f2'
              
            }
          }
        }
      }
    });
  }
  
  // Event listener para el cambio de opción en el selector
  const selectorIndicador = document.getElementById('indicador');
  selectorIndicador.addEventListener('change', (event) => {
    const indicadorSeleccionado = event.target.value;
    obtenerDatosIndicador(indicadorSeleccionado);
  });