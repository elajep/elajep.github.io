import React, { useMemo, useState, useRef, useLayoutEffect } from "react";

// Hook helper (INVARIATO)
function useContainerSize() {
  const ref = useRef(null);
  const [dims, setDims] =useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        const { width } = entries[0].contentRect;
        setDims({ width, height: 0 });
      }
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return [ref, dims];
}

// Pool di colori e Shuffle (INVARIATO)
const LARGE_COLOR_POOL = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b",
  "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#aec7e8", "#ffbb78",
  "#98df8a", "#ff9896", "#c5b0d5", "#c49c94", "#f7b6d2", "#c7c7c7",
  "#dbdb8d", "#9edae5"
];

function shuffle(array) {
  let newArray = [...array];
  let currentIndex = newArray.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [newArray[currentIndex], newArray[randomIndex]] = [
      newArray[randomIndex], newArray[currentIndex]];
  }
  return newArray;
}


// ==========================================================
// Inizio Componente
// ==========================================================

export default function ResponsiveFunctionPlot({
  functions = [],
  xMin = -10,
  xMax = 10,
  yMin = null,
  yMax = null,
  steps = 500,
  strokeWidth = 2,
  showGrid = true,
  paddingRatio = 0.05,
  axisColor = "#888",
  xLabel = "x",
  yLabel = "y",
  fontSize = 14,
  maxHeight = 450 
}) {
  const [containerRef, { width }] = useContainerSize(); 
  const shuffledColors = useMemo(() => shuffle(LARGE_COLOR_POOL), []);
  
  const clipId = useMemo(() => `clip-${Math.random().toString(36).substr(2, 9)}`, []);


  // ==========================================================
  // 1️⃣ Calcola range matematico + margini (INVARIATO)
  // ==========================================================
  const { pointsList, xMinM, xMaxM, yMinM, yMaxM } = useMemo(() => {
    
    let allXs_param = []; 
    let allYs = []; 

    const points = functions.map((fn, idx) => {
      let xs = [];
      let ys = [];

      if (fn.param) {
        const { x: fx, y: fy, tMin = 0, tMax = 2 * Math.PI } = fn.param;
        for (let i = 0; i < steps; i++) {
          const t = tMin + (i / (steps - 1)) * (tMax - tMin);
          const x = fx(t);
          const y = fy(t);
          xs.push(x);
          ys.push(y);
          if (isFinite(x) && isFinite(y)) {
            allXs_param.push(x);
            allYs.push(y);
          }
        }
      } else if (fn.f) {
        for (let i = 0; i < steps; i++) {
          const x = xMin + (i / (steps - 1)) * (xMax - xMin); 
          const y = fn.f(x);
          xs.push(x);
          ys.push(y);
          if (isFinite(y)) {
            allYs.push(y);
          }
        }
      }
      return { 
        xs, 
        ys, 
        color: fn.color || shuffledColors[idx % shuffledColors.length] 
      };
    });

    if (allYs.length === 0) {
        allYs = [-5, 5];
    }
    
    const xMinRaw_calc = Math.min(xMin, ...allXs_param);
    const xMaxRaw_calc = Math.max(xMax, ...allXs_param);
    const yMinRaw_calc = Math.min(...allYs);
    const yMaxRaw_calc = Math.max(...allYs);

    const xMinRaw = xMin ?? xMinRaw_calc;
    const xMaxRaw = xMax ?? xMaxRaw_calc;
    const yMinRaw = yMin ?? yMinRaw_calc;
    const yMaxRaw = yMax ?? yMaxRaw_calc;

    const xRange = xMaxRaw - xMinRaw || 1;
    const yRange = yMaxRaw - yMinRaw || 1;
    
    const xMargin = xRange * paddingRatio;
    const yMargin = yRange * paddingRatio;

    return {
      pointsList: points,
      xMinM: xMinRaw - xMargin,
      xMaxM: xMaxRaw + xMargin,
      yMinM: yMinRaw - yMargin,
      yMaxM: yMaxRaw + yMargin
    };
  }, [functions, xMin, xMax, yMin, yMax, steps, paddingRatio, fontSize, shuffledColors]);


  // ==========================================================
  // 2️⃣ Calcola scale e altezza (INVARIATO - "Stretch")
  // ==========================================================
  
  const rangeX = xMaxM - xMinM || 1;
  const rangeY = yMaxM - yMinM || 1;

  const unitPixelsX = width / rangeX;
  const idealHeight = rangeY * unitPixelsX;
  const finalHeight = Math.min(idealHeight, maxHeight);
  const unitPixelsY = finalHeight / rangeY;
  
  const sx = (x) => (x - xMinM) * unitPixelsX;
  const sy = (y) => finalHeight - (y - yMinM) * unitPixelsY;

  const yAxisX = sx(0);
  const xAxisY = sy(0);


  // ==========================================================
  // 3️⃣ Griglia (opzionale) - (INVARIATO)
  // ==========================================================
  const gridLines = [];
  if (showGrid && width > 0) { 
    
    const xStart = Math.ceil(xMinM);
    const xEnd = Math.floor(xMaxM);
    const yStart = Math.ceil(yMinM);
    const yEnd = Math.floor(yMaxM);

    for (let x = xStart; x <= xEnd; x++) {
      if (x === 0) continue; 
      const xx = sx(x);
      gridLines.push(
        <line
          key={"gx" + x}
          x1={xx} y1={0}
          x2={xx} y2={finalHeight} 
          stroke={axisColor} opacity="0.15"
        />
      );
    }

    for (let y = yStart; y <= yEnd; y++) {
      if (y === 0) continue; 
      const yy = sy(y);
      gridLines.push(
        <line
          key={"gy" + y}
          x1={0}
          y1={yy}
          x2={width}
          y2={yy}
          stroke={axisColor} opacity="0.15"
        />
      );
    }
  }

  // ==========================================================
  // 4️⃣ Disegno finale (MODIFICATO)
  // ==========================================================
  
  return (
    <div ref={containerRef} style={{ width: "100%", overflow: "hidden" }}>
      {width > 0 && ( 
        <svg 
          width={width} 
          height={finalHeight}
          className="graficiFunzioni" // <-- CLASSE AGGIUNTA
        >
          
          <defs>
            <clipPath id={clipId}>
              <rect 
                x={0} 
                y={0} 
                width={width} 
                height={finalHeight} 
              />
            </clipPath>
          </defs>

          <g> 
            {gridLines}
            <line
              x1={0} y1={xAxisY}
              x2={width} y2={xAxisY}
              stroke={axisColor} strokeWidth="1.5"
            />
            <line
              x1={yAxisX} y1={finalHeight} 
              x2={yAxisX} y2={0}
              stroke={axisColor} strokeWidth="1.5"
            />
            <text x={width - 15} y={xAxisY - 5} fill={axisColor} fontSize={fontSize} textAnchor="end">{xLabel}</text>
            <text x={yAxisX + 5} y={fontSize + 5} fill={axisColor} fontSize={fontSize}>{yLabel}</text>
          </g>

          <g clipPath={`url(#${clipId})`}>
            {pointsList.map((fn, idx) => {
              
              const pts = fn.xs.map((x, i) => {
                const y = fn.ys[i];
                const safeY = isFinite(y) ? y : NaN;
                return `${sx(x)},${sy(safeY)}`;
              }).join(" ");
              
              return (
                <polyline
                  key={idx}
                  points={pts}
                  fill="none"
                  stroke={fn.color}
                  strokeWidth={strokeWidth}
                />
              );
            })}
          </g>

        </svg>
      )}
    </div>
  );
}