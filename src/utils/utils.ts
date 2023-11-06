/** Получает координаты точки на окружности
 * @param centerX - координата "x" центра окружности
 * @param centerY - координата "y" центра окружности
 * @param radius - радиус окружности
 * @param angle - угол в градусах, на котором расположена точка на окружности
 * @returns {x: number, y: number} */
export const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees-90) * Math.PI / 180;

    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
}

/** Функция нахождения пути дуги
 * @param centerX - координата "x" центра окружности
 * @param centerY - координата "y" центра окружности
 * @param radius - радиус окружности
 * @param startAngle - угол в градусах начала
 * @param endAngle - угол в градусах конца
 * @returns string - путь дуги */
export const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const arcSweep = endAngle - startAngle <= 180 ? "0" : "1";
    const d = [
        "M", start.x, start.y,
        "A", radius, radius, 0, arcSweep, 0, end.x, end.y
    ];

    return d.join(" ");
}