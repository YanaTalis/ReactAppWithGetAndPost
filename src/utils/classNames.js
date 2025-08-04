export const classNames = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

// Продвинутая функция для работы с объектами условий
export const cx = (...args) => {
  const classes = []

  args.forEach((arg) => {
    if (!arg) return // игнорируем falsy значения

    if (typeof arg === 'string') {
      // Обычная строка - добавляем как есть
      classes.push(arg)
    } else if (Array.isArray(arg)) {
      // Массив - рекурсивно обрабатываем
      classes.push(cx(...arg))
    } else if (typeof arg === 'object') {
      // Объект с условиями - добавляем ключи где значение truthy
      Object.keys(arg).forEach((key) => {
        if (arg[key]) {
          classes.push(key)
        }
      })
    }
  })

  return classes.join(' ')
}
