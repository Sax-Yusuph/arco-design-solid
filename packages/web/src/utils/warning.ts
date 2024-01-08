export default function warning(condition: any, message: string) {
  if (process.env['NODE_ENV'] !== 'production') {
    if (condition) {
      // eslint-disable-next-line no-console
      console.error(`[@arco-design/web-solid]: ${message}`)
    }
  }
}
