export default function handler(req, res) {
  const { amount, currency } = req.query
  const number = parseFloat(amount)

  if (isNaN(number)) return res.status(400).send('Invalid number')

  const toWords = num => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'name'
    }).format(num)
  }

  res.send(toWords(number))
}
